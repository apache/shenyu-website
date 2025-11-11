---
title: McpTool Service Integration  
keywords: ["Mcp"]  
description: McpTool Service Integration  
---

This document is intended to help the `mcpTool` service access the `Apache ShenYu` gateway. The `Apache ShenYu` gateway uses the `mcpServer` plugin to connect with `mcpTool` services.

Before the connection, start `shenyu-admin` correctly, start both `mcpServer` plugin and the `proxy` plugin used by the `mcpTool` service are enabled. Also, and add related dependencies on the gateway and `mcpTool` application client service side. You can refer to the previous [Quick Start with McpServer](../../quick-start/quick-start-McpServer).

This article demonstrates integrating `mcpTool` with the gateway over HTTP. In the following, the `proxy` plugin refers to the `divide` plugin as an example. If you need to use other protocols, please enable the corresponding plugin for request proxying. You can refer to docs -> User guide -> Quick Connect to Your Service.

For details about client access configuration, see [Application Client Access Config](../property-config/register-center-access.md) .

For details about data synchronization configurations, see [Data Synchronization Config](../property-config/use-data-sync.md) .

## Add mcpServer and proxy plugins in gateway

* Add the following dependencies to the gateway’s `pom.xml` file:

```xml
    <!--Mcp Server Plugin Start-->
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-plugin-mcp-server</artifactId>
        <version>${project.version}</version>
    </dependency>
    <!--Mcp Server Plugin End-->
```

* Add the required dependencies for the `divide` plugin in the gateway’s `pom.xml` file:

```xml  
    <!--If you use HTTP proxy, add these-->
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-plugin-divide</artifactId>
        <version>${project.version}</version>
    </dependency>
    
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-plugin-httpclient</artifactId>
        <version>${project.version}</version>
    </dependency>
```

## Integrate mcpTool with the gateway (for springMvc)

Refer to the example project: [shenyu-examples-mcp](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-mcp)

* `SpringBoot` Users

    1. Add the following dependencies to your `mcpTool` service’s `pom.xml` file:

  ```xml
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-client-mcp</artifactId>
      <version>${shenyu.version}</version>
  </dependency>
  ```

  ```xml
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-client-mvc</artifactId>
      <version>${shenyu.version}</version>
  </dependency>
  ```

    2. Add the following configuration in `application.yaml`:

  ```yaml
  shenyu:
    register:
      registerType: http #zookeeper #etcd #nacos #consul
      serverLists: http://localhost:9095 #localhost:2181 #http://localhost:2379 #localhost:8848
      props:
        username: admin
        password: 123456
    client:
      mcp:
        props:
          contextPath: /mcp
          appName: mcp
      http:
        props:
          contextPath: /mcp
          appName: mcp
  ```

* `Spring` Users

  Add the following dependencies to your HTTP service’s `pom.xml` file:

  ```xml
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-client-mcp</artifactId>
      <version>${shenyu.version}</version>
  </dependency>
  
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-client-springmvc</artifactId>
      <version>${shenyu.version}</version>
  </dependency>
  ```

  Then add the following bean definitions to your XML configuration file:

  ```xml
  <bean id="clientConfig" class="org.apache.shenyu.register.common.config.PropertiesConfig">
      <property name="props">
        <map>
          <entry key="contextPath" value="/yourContextPath"/>
          <entry key="appName" value="yourAppName"/>
        </map>
      </property>
  </bean>
  
  <bean id="shenyuRegisterCenterConfig" class="org.apache.shenyu.register.common.config.ShenyuRegisterCenterConfig">
     <property name="registerType" value="http"/>
     <property name="serverList" value="http://localhost:9095"/>
  </bean>
  
  <bean id="shenyuClientRegisterRepository" class="org.apache.shenyu.client.core.register.ShenyuClientRegisterRepositoryFactory" factory-method="newInstance">
         <property name="shenyuRegisterCenterConfig" ref="shenyuRegisterCenterConfig"/>
   </bean>
  
  <bean id="McpServiceEventListener" class="org.apache.shenyu.client.mcp.McpServiceEventListener">
     <constructor-arg name="clientConfig" ref="clientConfig"/>
     <constructor-arg name="shenyuClientRegisterRepository" ref="shenyuClientRegisterRepository"/>
     <constructor-arg name="env" ref="environment"/>  
  </bean>
  
  <bean id="springMvcClientBeanPostProcessor" class="org.apache.shenyu.client.springmvc.init.SpringMvcClientBeanPostProcessor">
      <constructor-arg ref="clientPropertiesConfig"/>
      <constructor-arg ref="clientRegisterRepository"/>
  </bean>
      
  <!-- Client properties configuration -->
  <bean id="clientPropertiesConfig"
        class="org.apache.shenyu.register.common.config.ShenyuClientConfig.ClientPropertiesConfig">
    <property name="props">
        <map>
            <entry key="contextPath" value="/yourContextPath"/>
            <entry key="appName" value="yourAppName"/>
            <entry key="port" value="yourPort"/>
            <entry key="isFull" value="false"/>
        </map>
    </property>
  </bean>

  <!-- Configure client register repository according to your register type -->
  <bean id="clientRegisterRepository" class="org.apache.shenyu.register.client.http.HttpClientRegisterRepository">
      <constructor-arg ref="shenyuRegisterCenterConfig"/>
  </bean>
  
  <bean id="shenyuClientShutdownHook" class="org.apache.shenyu.client.core.shutdown.ShenyuClientShutdownHook">
      <constructor-arg ref="shenyuRegisterCenterConfig"/>
      <constructor-arg ref="clientRegisterRepository"/>
  </bean>
  
  <bean id="contextRegisterListener" class="org.apache.shenyu.client.springmvc.init.ContextRegisterListener">
      <constructor-arg ref="clientPropertiesConfig"/>
  </bean>
  ```

  Add the `@ShenyuMcpTool` and `@ShenyuSpringMvcClient` annotations to your controller interfaces.

  You need to add the `@ShenyuMcpTool` annotation on the `Controller` class. Only controllers annotated with `@ShenyuMcpTool` will be recognized as `mcpTool`.

### Example 1

This example demonstrates full McpTool configuration. You can fully customize your configuration by annotations, including parameter information defined in the operation.

```java
@GetMapping("/findById")
@ShenyuMcpTool(
        operation = @Operation(
                method = "GET", description = "find order by id"
        ),
        requestConfig = @ShenyuMcpRequestConfig(
                bodyToJson = "false",
                headers = {
                        @ShenyuMcpHeader(key = "aaa", value = "bbb")
                }
        ),
        enabled = true, toolName = "findOrderById"
)
@ShenyuSpringMvcClient("/findById")
@ApiDoc(desc = "findById")
public OrderDTO findById(@ShenyuMcpToolParam(
        parameter = @Parameter(
                name = "id",
                in = ParameterIn.PATH,
                description = "the id of order",
                required = true,
                schema = @Schema(
                        type = "string",
                        defaultValue = "1"
                )
        )
) @RequestParam("id") final String id) {
        OrderDTO dto = new OrderDTO();
        dto.setId(id);
        return dto;
}
```

### Example 2

This example shows the configuration for a McpTool function without parameters.

```java
@GetMapping("/findAll")
@ShenyuMcpTool(
        operation = @Operation(
                method = "GET", description = "find all order"
        ),
        requestConfig = @ShenyuMcpRequestConfig(
                bodyToJson = "false",
                headers = {
                        @ShenyuMcpHeader(key = "aaa", value = "bbb")
                }
        ),
        enabled = true, toolName = "findAllOrder"
)
@ShenyuSpringMvcClient("/findAll")
@ApiDoc(desc = "findAll")
public String findAll() {
        return "hello apache shenyu , mcp findAll success";
}
```

### Example 3

This is a simplified usage that requires only a simple annotation to register the `McpTool` to the gateway.

> Special note: Currently only supports `@RequestMapping`, `@GetMapping`, `@PostMapping`, `@DeleteMapping`, and `@PutMapping` annotations. Only the first path of the `@XXXMapping` annotation is effective.

```java
@GetMapping("/findByName")
@ShenyuMcpTool
@ShenyuSpringMvcClient("/findByName")
@ApiDoc(desc = "findName")
public OrderDTO findByName(@ShenyuMcpToolParam final String name) {
        OrderDTO dto = new OrderDTO();
        dto.setName(name);
        return dto;
}
```

* Start your project. Your service interfaces will be connected to the gateway. In the `shenyu-admin` backend management system, go to `Plugin List -> HTTP process -> mcpServer`, and you will see the automatically created endpoints and Tools.

## McpTool integration with gateway (Other Languages, Non-SpringMvc)

* First, find the `mcpServer` plugin in `shenyu-admin`, then add selectors and rules to filter traffic accordingly.

* If you are unsure how to configure, please refer to [Selector and Rule Management](../admin-usage/selector-and-rule).

## User requests

After your `mcpTool` service is connected to the `Apache ShenYu` gateway, you can use the `endPoint` configured in the `Selector` as the request interface for your `McpClient`.

* Firstly, the domain name of your previous `endPoint` was your own service; now it should be replaced with the gateway’s domain name. Refer to [Quick Start with McpServer](../../quick-start/quick-start-McpServer).

* Secondly, the `Apache ShenYu` gateway requires a route prefix configured as the `contextPath` in your integration project.

    * In the `mcpServer` plugin, this `contextPath` corresponds to your `endPoint`.

    * For example, if you configured `contextPath` as `mcp`, then your `endPoint` should be configured as: `http://localhost:9195/mcp/sse`.

    * Here, `localhost:9195` is the IP and port of your gateway (default port is `9195`), and `/mcp` is the `contextPath` configured during integration.

Then you can invoke tools via the `mcpClient` through the gateway easily.
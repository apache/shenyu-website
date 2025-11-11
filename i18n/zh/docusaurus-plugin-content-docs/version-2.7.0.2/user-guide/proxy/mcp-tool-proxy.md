---
title: McpTool服务接入
keywords: ["Mcp"]
description: McpTool服务接入
---

本文档旨在帮助 `mcpTool` 服务接入到 `Apache ShenYu` 网关。`Apache ShenYu` 网关使用 `mcpServer` 插件来接入 `mcpTool` 服务。

接入前，请正确启动 `shenyu-admin`，并开启`mcpServer`和`mcpTool`服务使用的`proxy`插件，在网关端和`McpTool`服务端引入相关依赖。可以参考前面的 [McpServer快速开始](../../quick-start/quick-start-McpServer)。

本篇文章以 http 的方式将`mcpTool`接入网关，下文中`proxy`插件均以`divide`插件为例，如果需要使用其他的协议，请启动与之对应的插件做请求代理。可以参考docs -> User guide -> Quick Connect to Your Service

应用客户端接入的相关配置请参考：[客户端接入配置](../../../../../../versioned_docs/version-2.7.0.2/user-guide/property-config/register-center-access.md)。

数据同步的相关配置请参考：[数据同步配置](../../../../../../versioned_docs/version-2.7.0.2/user-guide/property-config/use-data-sync.md)。

## 在网关中引入 mcpServer 和相关 proxy 插件

* 在网关的 `pom.xml` 文件中增加如下依赖：

```xml
        <!--Mcp Server Plugin Start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-mcp-server</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!--Mcp Server Plugin end-->
```

* 在网关的 `pom.xml` 文件中添加 `divide` 插件所需依赖，

```xml  
        <!--if you use http proxy start this-->
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

## mcpTool接入网关

可以参考：[shenyu-examples-mcp](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-mcp)

* `SpringBoot` 用户

    1. 在你的`mcpTool`服务中的 `pom.xml`文件 新增如下依赖:

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
  
    2. 在 application.yaml 增加如下配置：

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

* `Spring` 用户

  在你的`http`服务中的 `pom.xml`文件 新增如下依赖:

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

  并在你的 `bean` 定义的 `xml` 文件中新增如下：

  ```xml
  <bean id="clientConfig" class="org.apache.shenyu.register.common.config.PropertiesConfig">
      <property name="props">
        <map>
          <entry key="contextPath" value="/你的contextPath"/>
          <entry key="appName" value="你的名字"/>
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
  
  <bean id ="McpServiceEventListener" class ="org.apache.shenyu.client.mcp.McpServiceEventListener">
     <constructor-arg name="clientConfig" ref="clientConfig"/>
     <constructor-arg name="shenyuClientRegisterRepository" ref="shenyuClientRegisterRepository"/>
     <constructor-arg name="env" ref="environment"/>  
  </bean>
  
  <bean id="springMvcClientBeanPostProcessor" class="org.apache.shenyu.client.springmvc.init.SpringMvcClientBeanPostProcessor">
      <constructor-arg ref="clientPropertiesConfig"/>
      <constructor-arg ref="clientRegisterRepository"/>
  </bean>
      
  <!-- 客户端属性配置 -->
  <bean id="clientPropertiesConfig"
        class="org.apache.shenyu.register.common.config.ShenyuClientConfig.ClientPropertiesConfig">
    <property name="props">
        <map>
            <entry key="contextPath" value="/你的contextPath"/>
            <entry key="appName" value="你的app名字"/>
            <entry key="port" value="你的端口"/>
            <entry key="isFull" value="false"/>
        </map>
    </property>
  </bean>

  <!-- 根据实际的注册类型配置客户端注册仓库 -->
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

  在你的 `controller` 的接口上加上 `@ShenyuMcpTool` 和 `@ShenyuSpringMvcClient` 注解。

  你需要将`@ShenyuMcpTool`注解加到 `Controller` 类上面，只有添加了`@ShenyuMcpTool`的`Controller`才会被识别为 mcpTool。

示例一

下面演示的是 McpTool 完整配置，你可以通过注解完全自定义你的配置，其中 parameter 信息也可以在 operation 中配置。

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

示例二

下面表示的是：McpTool 函数没有参数时的配置。

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

示例三：这是一种简化的使用方式，只需要一个简单的注释即可将`McpTool`注册到网关.
特别说明：目前只支持`@RequestMapping、@GetMapping、@PostMapping、@DeleteMapping、@PutMapping`注解，并且只对`@XXXMapping`中的第一个路径有效

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

* 启动你的项目，你的服务接口接入到了网关，进入`shenyu-admin`后台管理系统的`插件列表 -> http process -> mcpServer`，看到自动创建的 endpoint 和 Tool。

## McpTool 接入网关（其他语言，非springMvc体系）

* 首先在 `shenyu-admin` 找到 `mcpServer` 插件，进行选择器，和规则的添加，进行流量的匹配筛选。

* 如果不懂怎么配置，请参考 [选择器和规则管理](../admin-usage/selector-and-rule)。

## 用户请求

当你的`McpTool`服务接入到`Apache ShenYu`网关后，你就可以用 `Selector` 上配置的 `endPoint` 作为 `McpClient` 的请求接口。

* 第一点，你之前`endPoint`的域名是你自己的服务，现在要换成网关的域名。可以参考[McpServer快速开始](../../quick-start/quick-start-McpServer)。

* 第二点，`Apache ShenYu` 网关需要有一个路由前缀，这个路由前缀就是你接入项目进行配置 `contextPath`。

    * 在 McpServer 插件中，这个 `contextPath` 就是你的 `endPoint`

    * 比如你配置了`contextPath`为`mcp`,那么你的`endPoint`应该配置为`http://localhost:9195/mcp/sse`。

    * 其中 `localhost:9195` 为网关的`ip`端口，默认端口是`9195` ，`/mcp` 是你接入网关配置的 `contextPath`。

然后你就可以通过`mcpClient` 进行工具调用了

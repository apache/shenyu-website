---
title: Http Proxy
keywords: ["Http"]
description: Integrate Http with shenyu gateway
---


This document is intended to help the `Http` service access the `Apache ShenYu` gateway. The `Apache ShenYu` gateway uses the `Divide` plugin to handle `Http` requests.

Before the connection, start `shenyu-admin` correctly, start `Divide` plugin, and add related dependencies on the gateway and `Http` application client. Refer to the previous [Quick start with Http](../../quick-start/quick-start-http) .

For details about client access configuration, see [Application Client Access Config](../property-config/register-center-access.md) .

For details about data synchronization configurations, see [Data Synchronization Config](../property-config/use-data-sync.md) .

## Add divide plugin in gateway

* Add the following dependencies to the gateway's `pom.xml` file:

  ```xml
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

## Http request access gateway (for springMvc)

* SpringBoot  

  Please refer this：[shenyu-examples-http](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-http)

  1. Add the following dependencies to the `pom.xml` file in your `Http` service:

  ```xml
      <dependency>
          <groupId>org.apache.shenyu</groupId>
          <artifactId>shenyu-spring-boot-starter-client-springmvc</artifactId>
          <version>${shenyu.version}</version>
      </dependency>
   ```

  2. Add the following configuration to application.yaml:

  ```yaml
  shenyu:
    register:
      registerType: http #zookeeper #etcd #nacos #consul
      serverLists: http://localhost:9095 #localhost:2181 #http://localhost:2379 #localhost:8848
      props:
        username: admin
        password: 123456
    client:
      http:
        props:
          contextPath: /http
          appName: http
    #      port: 8189
  ```

* SpringMvc

  Please refer this：[shenyu-examples-springmvc](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-springmvc)

  Add the following dependencies to the `pom.xml` file in your `Http` service:  

  ```xml
      <dependency>
          <groupId>org.apache.shenyu</groupId>
          <artifactId>shenyu-client-springmvc</artifactId>
          <version>${shenyu.version}</version>
      </dependency>
   ```  

  Add the following to the `XML` file defined by your `bean` :

   ```xml
      <bean id="springMvcClientBeanPostProcessor" class="org.apache.shenyu.client.springmvc.init.SpringMvcClientBeanPostProcessor">
          <constructor-arg ref="clientPropertiesConfig"/>
          <constructor-arg ref="clientRegisterRepository"/>
      </bean>
          
      <!-- Config register center according to your register type-->
      <bean id="shenyuRegisterCenterConfig" class="org.apache.shenyu.register.common.config.ShenyuRegisterCenterConfig">
          <property name="registerType" value="http"/>
          <property name="serverLists" value="http://localhost:9095"/>
      </bean>
  
      <!-- Client properties config -->
      <bean id="clientPropertiesConfig"
            class="org.apache.shenyu.register.common.config.ShenyuClientConfig.ClientPropertiesConfig">
        <property name="props">
            <map>
                <entry key="contextPath" value="/your contextPath"/>
                <entry key="appName" value="your appName"/>
                <entry key="port" value="your port"/>
                <entry key="isFull" value="false"/>
            </map>
        </property>
      </bean>
  
      <!-- Config register repository according to your register type -->
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

  Add this annotation `@ShenyuSpringMvcClient` in your `controller` interface.

  You can apply the annotation to class-level in a controller. The name of the `path` variable is prefix and `/**` will apply proxy for entire interfaces.


Example(1)

The following indicates that `/test/payment`, `/test/findByUserId` will be proxy by the gateway.

```java
  @RestController
  @RequestMapping("/test")
  @ShenyuSpringMvcClient(path = "/test/**")
  public class HttpTestController {

      @PostMapping("/payment")
      public UserDTO post(@RequestBody final UserDTO userDTO) {
          return userDTO;
      }

      @GetMapping("/findByUserId")
      public UserDTO findByUserId(@RequestParam("userId") final String userId) {
          UserDTO userDTO = new UserDTO();
          userDTO.setUserId(userId);
          userDTO.setUserName("hello world");
          return userDTO;
      }
   }
```



Example(2)


The following indicates that `/order/save` is proxied by the gateway, while `/order/findById` is not.


```java
  @RestController
  @RequestMapping("/order")
  @ShenyuSpringMvcClient(path = "/order")
  public class OrderController {

      @PostMapping("/save")
      @ShenyuSpringMvcClient(path = "/save")
      public OrderDTO save(@RequestBody final OrderDTO orderDTO) {
          orderDTO.setName("hello world save order");
          return orderDTO;
      }

      @GetMapping("/findById")
      public OrderDTO findById(@RequestParam("id") final String id) {
          OrderDTO orderDTO = new OrderDTO();
          orderDTO.setId(id);
          orderDTO.setName("hello world findById");
          return orderDTO;
      }
  }
```

example (3)：This is a simplified way to use it, just need a simple annotation to register to the gateway using metadata.
Special note: currently only supports `@RequestMapping, @GetMapping, @PostMapping, @DeleteMapping, @PutMapping` annotations, and only valid for the first path in `@XXXMapping`

```java
  @RestController
  @RequestMapping("new/feature")
  public class NewFeatureController {
  
    /**
     * no support gateway access api.
     *
     * @return result
     */
    @RequestMapping("/gateway/not")
    public EntityResult noSupportGateway() {
      return new EntityResult(200, "no support gateway access");
    }
  
    /**
     * Do not use shenyu annotation path. used request mapping path.
     *
     * @return result
     */
    @RequestMapping("/requst/mapping/path")
    @ShenyuSpringCloudClient
    public EntityResult requestMappingUrl() {
      return new EntityResult(200, "Do not use shenyu annotation path. used request mapping path");
    }
  
    /**
     * Do not use shenyu annotation path. used post mapping path.
     *
     * @return result
     */
    @PostMapping("/post/mapping/path")
    @ShenyuSpringCloudClient
    public EntityResult postMappingUrl() {
      return new EntityResult(200, "Do not use shenyu annotation path. used post mapping path");
    }
  
    /**
     * Do not use shenyu annotation path. used post mapping path.
     *
     * @return result
     */
    @GetMapping("/get/mapping/path")
    @ShenyuSpringCloudClient
    public EntityResult getMappingUrl() {
      return new EntityResult(200, "Do not use shenyu annotation path. used get mapping path");
    }
  }

```

* Start your project, your service interface is connected to the gateway, go to the `shenyu-admin` management system plugin list `->` HTTP process `->` Divide, see automatically created selectors and rules.


## Http request access gateway(other framework)

* First, find `divide` plugin in `shenyu-admin`, add selector, and rules, and filter traffic matching.
* If you don't know how to configure, please refer to [Selector Detailed Explanation](../admin-usage/selector-and-rule).
* You can also develop your customized http-client，refer to [multi-language Http client development](../../developer/developer-shenyu-client)。

## User request

* Send the request as before, only two points need to notice.
* Firstly, the domain name that requested before in your service, now need to replace with gateway's domain name.
* Secondly, `Apache ShenYu` Gateway needs a route prefix which comes from `contextPath`, it configured during the integration with gateway, you can change it freely in `divide` plugin of `shenyu-admin`, if you are familiar with it.
  * for example, if you have an `order` service, and it has an interface, the request url: `http://localhost:8080/test/save`

  * Now need to change to:  `http://localhost:9195/order/test/save`

  * We can see `localhost:9195` is your gateway's `ip` port，default port number is `9195` ，`/order` is your `contextPath` which you configured with gateway.

  * Other parameters doesn't change in request method.


* Then you can visit, very easy and simple.

---
title: Spring Cloud Proxy
keywords: ["Spring Cloud"]
description: springCloud with shenyu gateway
---

This document is intended to help the `Spring Cloud` service access the `Apache ShenYu` gateway. The `Apache ShenYu` gateway uses the `springCloud` plugin to handle `Spring Cloud` service.

Before the connection, start `shenyu-admin` correctly, start `springCloud` plugin, and add related dependencies on the gateway and `springCloud` application client. Refer to the previous [Quick start with Spring Cloud](../quick-start/quick-start-springcloud) .

For details about client access configuration, see [Application Client Access Config](property-config/register-center-access.md) .

For details about data synchronization configurations, see [Data Synchronization Config](property-config/use-data-sync.md) .


## Add springcloud plugin in gateway

* add these dependencies in gateway's pom.xml:


```xml
  <!-- apache shenyu springCloud plugin start-->
  <dependency>
       <groupId>org.apache.shenyu</groupId>
       <artifactId>shenyu-spring-boot-starter-plugin-springcloud</artifactId>
        <version>${project.version}</version>
  </dependency>

  <dependency>
       <groupId>org.apache.shenyu</groupId>
       <artifactId>shenyu-spring-boot-starter-plugin-httpclient</artifactId>
       <version>${project.version}</version>
   </dependency>
   <!-- apache shenyu springCloud plugin end-->

   <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-commons</artifactId>
        <version>2.2.0.RELEASE</version>
   </dependency>
```

* If you use `eureka` as SpringCloud registry center.

  add these dependencies:

 ```xml
   <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        <version>2.2.0.RELEASE</version>
   </dependency>
   ```

add these config values in gateway's yaml file:

 ```yaml
    eureka:
      client:
        serviceUrl:
          defaultZone: http://localhost:8761/eureka/ #your eureka address
      instance:
        prefer-ip-address: true
   ```

* if you use `nacos` as Spring Cloud registry center.

  add these dependencies:

 ```xml
  <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        <version>2.1.0.RELEASE</version>
  </dependency>
   ```

add these config values in gateway's yaml file:

 ```yaml
   spring:
      cloud:
        nacos:
          discovery:
             server-addr: 127.0.0.1:8848 # your nacos address
   ```

Special note: Please ensure that the spring Cloud registry service discovery configuration is enabled

* Configuration method

```yml
spring:
  cloud:
    discovery:
      enabled: true
```

* code method

```java
@SpringBootApplication
@EnableDiscoveryClient
public class ShenyuBootstrapApplication {
    
    /**
     * Main Entrance.
     *
     * @param args startup arguments
     */
    public static void main(final String[] args) {
        SpringApplication.run(ShenyuBootstrapApplication.class, args);
    }
}
```

* restart your gateway service.

## SpringCloud service access gateway

Please refer to [shenyu-examples-springcloud](https://github.com/apache/incubator-shenyu/tree/v2.5.0/shenyu-examples/shenyu-examples-springcloud)

* Add the following dependencies to your `Spring Cloud` microservice :

```xml
 <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-client-springcloud</artifactId>
      <version>${shenyu.version}</version>
 </dependency>
```

* Add the annotation `@ShenyuSpringCloudClient` in your `controller` interface. you can apply the annotation to class-level in a controller.the name of the path variable is prefix and '/**' will apply proxy for entire interfaces.

* example (1)：both `/test/payment` and `/test/findByUserId` will be handled by gateway.

 ```java
  @RestController
  @RequestMapping("/test")
  @ShenyuSpringCloudClient(path = "/test/**")
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

example (2)：`/order/save` will be handled by gateway, and `/order/findById` won't.

 ```java
  @RestController
  @RequestMapping("/order")
  @ShenyuSpringCloudClient(path = "/order")
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

example (3)：  `isFull`：`true`  represents that all service will be represented by the gateway.

```yaml
shenyu:
  register:
    registerType: http #zookeeper #etcd #nacos #consul
    serverLists: http://localhost:9095 #localhost:2181 #http://localhost:2379 #localhost:8848
    props:
      username: admin
      password: 123456
  client:
    springCloud:
      props:
        contextPath: /springcloud
        isFull: true
#        port: 8884
# registerType : service registre type, see the application client access document
# serverList: server list, see the application client access document
# contextPath: route prefix for your project in ShenYu gateway.
# isFull: set true to proxy your all service and false to proxy some of your controllers
```

 ```java
  @RestController
  @RequestMapping("/order")
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

example (4)：This is a simplified way to use it, just need a simple annotation to register to the gateway using metadata.
Special note: currently only supports `@RequestMapping, @GetMapping, @PostMapping, @DeleteMapping, @PutMapping` annotations, and only valid for the first path in `@XXXMapping`.

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

* After successfully registering your service, go to the backend management system PluginList -> rpc proxy -> springCloud ', you will see the automatic registration of selectors and rules information.



## User Request

* Send the request as before, only two points need to notice.

* firstly,the domain name that requested before in your service, now need to replace with gateway's domain name.

* secondly, Apache ShenYu gateway needs a route prefix which comes from `contextPath`, it configured during the integration with gateway, you can change it freely in divide plugin of `shenyu-admin`, if your familiar with it.

> For example, your have an `order` service and it has a interface, the request url: `http://localhost:8080/test/save` .
>
> Now need to change to：`http://localhost:9195/order/test/save` .
>
> We can see `localhost:9195` is the gateway's ip port, default port number is `9195` , `/order` is the `contextPath` in your config yaml file.
>
> The request of other parameters doesn't change. Then you can visit, very easy and simple.


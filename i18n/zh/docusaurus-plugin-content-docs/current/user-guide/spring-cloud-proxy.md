---
title: Spring Cloud服务接入
keywords: ["Spring Cloud"]
description: SpringCloud接入ShenYu网关
---

此篇文章是介绍 `springCloud` 服务接入到 `Apache ShenYu` 网关，`Apache ShenYu` 网关使用 `springCloud` 插件来接入`Spring Cloud`服务。

接入前，请正确启动 `shenyu-admin`，并开启`springCloud`插件，在网关端和`springCloud`服务端引入相关依赖。可以参考前面的 [Spring Cloud快速开始](../quick-start/quick-start-springcloud)。

应用客户端接入的相关配置请参考：[客户端接入配置](property-config/register-center-access.md)。

数据同步的相关配置请参考：[数据同步配置](property-config/use-data-sync.md)。

## 在网关中引入 springCloud 插件

* 在网关的 `pom.xml` 文件中引入如下依赖。

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

* 如果你使用 `eureka` 作为 `springCloud`的注册中心

  * 在网关的`pom.xml`文件中，新增如下依赖：

 ```xml
   <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        <version>2.2.0.RELEASE</version>
   </dependency>
   ```

* 在网关的`yml`文件中，新增如下配置：

 ```yaml
    eureka:
      client:
        serviceUrl:
          defaultZone: http://localhost:8761/eureka/ # 你的eureka地址
      instance:
        prefer-ip-address: true
   ```

* 如果你使用 `nacos` 作为 `springCloud`的注册中心

  * 在网关的`pom.xml`文件中，新增如下依赖：

 ```xml
  <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        <version>2.1.0.RELEASE</version>
  </dependency>
   ```

* 在网关的`yml`文件中 新增如下配置：

 ```yaml
   spring:
      cloud:
        nacos:
          discovery:
             server-addr: 127.0.0.1:8848 # 你的nacos地址
   ```

特别提示：请确保spring Cloud注册中心服务发现配置开启

* 配置方式

```yml
spring:
  cloud:
    discovery:
      enabled: true
```

* 代码方式

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

* 重启你的网关服务。

## SpringCloud服务接入网关

可以参考：[shenyu-examples-springcloud](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-springcloud)


* 在由`SpringCloud`构建的微服务中，引入如下依赖：

```xml
 <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-client-springcloud</artifactId>
      <version>${shenyu.version}</version>
 </dependency>
```


* 在 `controller`接口上加上 `@ShenyuSpringCloudClient` 注解。 注解可以加到类或方法上面，`path`属性为前缀，如果含有 `/**` 代表你的整个接口需要被网关代理。

* 示例一：
  代表 `/test/payment`, `/test/findByUserId` 都会被网关代理。

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

* 示例二：
  代表 `/order/save`，会被网关代理，而`/order/findById` 则不会。

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


* 示例三：
  `isFull`：`true`  代表整个服务都会被网关代理。

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
# registerType : 服务注册类型，请参考应用客户端接入文档
# serverList: 服务列表，请参考应用客户端接入文档
# contextPath: 为你的项目在shenyu网关的路由前缀。 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由。
# appName：你的应用名称，不配置的话，会默认取application 中的名称
# isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller
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


示例四：这是一种简化的使用方式，只需要一个简单的注解，使用元数据注册到网关。
特别说明：目前只支持`@RequestMapping、@GetMapping、@PostMapping、@DeleteMapping、@PutMapping`注解，并且只对`@XXXMapping`中的第一个路径有效。

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

* 启动你的服务成功注册后，进入后台管理系统的`插件列表 -> rpc proxy -> springCloud`，会看到自动注册的选择器和规则信息。


## 用户请求

和之前的访问方式没有大的改变，需要注意的是：

* 你之前请求的域名是你自己的服务，现在要换成网关的域名。

* 网关需要有一个路由前缀，这个路由前缀就是你接入项目进行配置 `contextPath`，可以在 `shenyu-admin` 中的 `springCloud`插件进行更改。

> 比如你有一个 `order` 服务 它有一个接口，请求路径 `http://localhost:8080/test/save`
>
> 现在就需要换成：`http://localhost:9195/order/test/save`
>
> 其中 `localhost:9195` 为网关的 `ip` 端口，默认端口是 `9195` ，`/order` 是你接入网关配置的 `contextPath`
>
> 其他参数，请求方式不变。然后你就可以进行访问了，如此的方便与简单。

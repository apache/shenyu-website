---
title: Http Proxy
keywords: ["Http"]
description: Integrate Http with shenyu gateway
---


This document is intended to help the `Http` service access the `Apache ShenYu` gateway. The `Apache ShenYu` gateway uses the `Divide` plugin to handle `Http` requests.

Before the connection, start `shenyu-admin` correctly, start `Divide` plugin, and add related dependencies on the gateway and `Http` application client. Refer to the previous [Quick start with Http](../quick-start/quick-start-http) .

For details about client access configuration, see [Application Client Access Config](./register-center-access) .

For details about data synchronization configurations, see [Data Synchronization Config](./use-data-sync) .

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


Please refer this：[shenyu-examples-http](https://github.com/apache/incubator-shenyu/tree/v2.4.0/shenyu-examples/shenyu-examples-http)


* SpringBoot

  Add the following dependencies to the `pom.xml` file in your `Http` service:

```xml
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-client-springmvc</artifactId>
        <version>${shenyu.version}</version>
    </dependency>
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

* Start your project, your service interface is connected to the gateway, go to the `shenyu-admin` management system plugin list `->` HTTP process `->` Divide, see automatically created selectors and rules.


## Http request access gateway(other framework)

* First, find `divide` plugin in `shenyu-admin`, add selector, and rules, and filter traffic matching.
* If you don't know how to configure, please refer to [Selector Detailed Explanation](../user-guide/admin-usage/selector-and-rule).
* You can also develop your customized http-client，refer to [multi-language Http client development](../developer/developer-shenyu-client)。

## User request

* Send the request as before, only two points need to notice.
* Firstly, the domain name that requested before in your service, now need to replace with gateway's domain name.
* Secondly, `Apache ShenYu` Gateway needs a route prefix which comes from `contextPath`, it configured during the integration with gateway, you can change it freely in `divide` plugin of `shenyu-admin`, if you are familiar with it.
  * for example, if you have an `order` service, and it has an interface, the request url: `http://localhost:8080/test/save`

  * Now need to change to:  `http://localhost:9195/order/test/save`

  * We can see `localhost:9195` is your gateway's `ip` port，default port number is `9195` ，`/order` is your `contextPath` which you configured with gateway.

  * Other parameters doesn't change in request method.


* Then you can visit, very easy and simple.

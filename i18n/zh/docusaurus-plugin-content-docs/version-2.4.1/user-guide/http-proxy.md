---
title: Http服务接入
keywords: ["Http"]
description: Http服务接入
---

本文档旨在帮助 `http` 服务接入到 `Apache ShenYu` 网关。`Apache ShenYu` 网关使用 `divide` 插件来处理 `http` 请求。

接入前，请正确启动 `shenyu-admin`，并开启`divide`插件，在网关端和`Http`服务端引入相关依赖。可以参考前面的 [Http快速开始](../quick-start/quick-start-http)。

应用客户端接入的相关配置请参考：[客户端接入配置](./register-center-access)。

数据同步的相关配置请参考：[数据同步配置](./use-data-sync)。

## 在网关中引入 divide 插件

* 在网关的 `pom.xml` 文件中增加如下依赖：

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

## Http请求接入网关（springMvc 体系用户）

* `SpringBoot` 用户  
  
  可以参考：[shenyu-examples-http](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-http)

  在你的`http`服务中的 `pom.xml`文件 新增如下依赖:

  ```xml
      <dependency>
          <groupId>org.apache.shenyu</groupId>
          <artifactId>shenyu-spring-boot-starter-client-springmvc</artifactId>
          <version>${shenyu.version}</version>
      </dependency>
   ```

  在你的 `controller` 的接口上加上 `@ShenyuSpringMvcClient` 注解。

  你可以把注解加到 `Controller` 类上面，里面的`path`属性则为前缀，如果含有 `/**` 代表你的整个接口需要被网关代理。

示例一

下面表示的是 `/test/payment`，`/test/findByUserId` 都会被网关代理。

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

示例二

下面表示的是： `/order/save` 会被网关代理，而 `/order/findById` 则不会。


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

* 启动你的项目，你的服务接口接入到了网关，进入`shenyu-admin`后台管理系统的`插件列表 -> http process -> divide`，看到自动创建的选择器和规则。

## Http请求接入网关（其他语言，非springMvc体系）

* 首先在 `shenyu-admin` 找到 `divide` 插件，进行选择器，和规则的添加，进行流量的匹配筛选。

* 如果不懂怎么配置，请参考 [选择器和规则管理](../user-guide/admin-usage/selector-and-rule)。

* 您也可以自定义开发属于你的 `http-client`，参考 [多语言 Http 客户端开发](../developer/developer-shenyu-client)。

## 用户请求

当你的`Http`服务接入到`Apache ShenYu`网关后，请求方式没有很大的变动，小的改动有两点。

* 第一点，你之前请求的域名是你自己的服务，现在要换成网关的域名。

* 第二点，`Apache ShenYu` 网关需要有一个路由前缀，这个路由前缀就是你接入项目进行配置 `contextPath`，如果熟的话，可以在 `shenyu-admin` 中的`divide`插件进行自由更改。
  * 比如你有一个 `order` 服务 它有一个接口，请求路径 `http://localhost:8080/test/save`。

  * 现在就需要换成：`http://localhost:9195/order/test/save`。

  * 其中 `localhost:9195` 为网关的`ip`端口，默认端口是`9195` ，`/order` 是你接入网关配置的 `contextPath`。

  * 其他参数，请求方式不变。

然后你就可以进行访问了，如此的方便与简单。

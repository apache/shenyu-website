---
title: Http服务接入
keywords: ["Http"]
description: Http服务接入
---

本文档旨在帮助 `http` 服务接入到 `Apache ShenYu` 网关。`Apache ShenYu` 网关使用 `divide` 插件来处理 `http` 请求。

接入前，请正确启动 `shenyu-admin`，并开启`divide`插件，在网关端和`Http`服务端引入相关依赖。可以参考前面的 [Http快速开始](../quick-start/quick-start-http)。

应用客户端接入的相关配置请参考：[客户端接入配置](../property-config/register-center-access.md)。

数据同步的相关配置请参考：[数据同步配置](../property-config/use-data-sync.md)。

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

  1. 在你的`http`服务中的 `pom.xml`文件 新增如下依赖:

  ```xml
      <dependency>
          <groupId>org.apache.shenyu</groupId>
          <artifactId>shenyu-spring-boot-starter-client-springmvc</artifactId>
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
      http:
        props:
          contextPath: /http
          appName: http
    #      port: 8189
  ```

* `SpringMvc` 用户

  可以参考：[shenyu-examples-springmvc](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-springmvc)

  在你的`http`服务中的 `pom.xml`文件 新增如下依赖:

  ```xml
      <dependency>
          <groupId>org.apache.shenyu</groupId>
          <artifactId>shenyu-client-springmvc</artifactId>
          <version>${shenyu.version}</version>
      </dependency>
   ```

  并在你的 `bean` 定义的 `xml` 文件中新增如下：

   ```xml
      <bean id="springMvcClientBeanPostProcessor" class="org.apache.shenyu.client.springmvc.init.SpringMvcClientBeanPostProcessor">
          <constructor-arg ref="clientPropertiesConfig"/>
          <constructor-arg ref="clientRegisterRepository"/>
      </bean>
          
      <!-- 根据实际的注册类型配置注册中心 -->
      <bean id="shenyuRegisterCenterConfig" class="org.apache.shenyu.register.common.config.ShenyuRegisterCenterConfig">
          <property name="registerType" value="http"/>
          <property name="serverLists" value="http://localhost:9095"/>
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

示例三：这是一种简化的使用方式，只需要一个简单的注释即可使用元数据注册到网关.
特别说明：目前只支持`@RequestMapping、@GetMapping、@PostMapping、@DeleteMapping、@PutMapping`注解，并且只对`@XXXMapping`中的第一个路径有效

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

---
title: "【Release the first version of Apache ShenYu(Incubating)2.4.0】 Make API gateway easy" 
author: "xiaoyu"
description: "【Release the first version of Apache ShenYu(Incubating)2.4.0】 Make API gateway easy" 
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2021-08-01
cover: "/img/architecture/shenyu-framework.png"
---  


## 【Apache ShenYu(incubating) 2.4.0】: 让API网关更简单

> 声明:本文中的`Apache ShenYu` 都指的是 `Apache ShenYu (incubating)`
> 本人作者：肖宇 Apache ShenYu(incubating) Founder && PPMC
> 2.4.0 Release Manager ： 张永伦 Apache ShenYu(incubating) PPMC  && Apache ShardingSphere PMC

`Apache ShenYu`网关是原 `Dromara/soul` 网关捐献给`Apache`基金会后改名而来，
此次发布的 `2.4.0` 版本是 `Apache ShenYu` 网关进入`Apache孵化器`后的首个版本。这个版本涉及很多新功能的增加，
项目名称,包名以及`maven`依赖坐标的变更。

## Apache ShenYu 是什么？

`Apache ShenYu`是使用`Java reactor`编程方式开发的，具有`异步`，`高性能`，`跨语言`等特性的 `API 网关`。
在流量控制方面，有精美的Admin控制台，能够`精准`，`动态`控制流量，满足复杂的业务场景。
在功能方面，它使用插件化的设计思想，支持许多常见的协议：如 `http/https`， `Dubbo`、 `Spring Cloud`、 `GRPC`、 `Motan`、` Sofa`、 `Tars` 等。
同时内置十分丰富的功能插件，如 `熔断`，`限流`，`鉴权`，`黑白名单`，`防火墙`，`监控`，`参数更改`等等插件。其架构图如下:

 ![](https://shenyu.apache.org/img/architecture/shenyu-framework.png)


## 流量控制

对流量的控制是网关的灵魂，针对流量控制，`Apache ShenYu` 设计了`选择器`，`规则` 2个概念，来控制流量。

`选择器`和 `规则`是 `Apache ShenYu` 网关中最`灵魂`的东西。掌握好它，你可以对任何流量进行管理。

一个插件有多个选择器，一个选择器对应多种规则。选择器相当于是对流量的一级筛选，规则就是最终的筛选。

对一个插件而言，我们希望根据我们的配置，达到满足条件的流量，插件才会被执行。

选择器和规则就是为了让流量在满足特定的条件下，才去执行我们想要的，这种规则首先要明白。

插件、选择器和规则执行逻辑如下，当流量进入到Apache ShenYu网关之后，会先判断是否有对应的插件，该插件是否开启；然后判断流量是否匹配该插件的选择器。

然后再判断流量是否匹配该选择器的规则。如果请求流量能满足匹配条件才会执行该插件，否则插件不会被执行，处理下一个。

Apache ShenYu网关就是这样通过层层筛选完成流量控制。其流程图如下 :

![](https://shenyu.apache.org/img/shenyu/plugin/plugin-chain-execute.png)

## 流量筛选

流量筛选，是`选择器`和`规则`的`灵魂`，对应为选择器与规则里面的匹配条件(conditions)，根据不同的流量筛选规则，我们可以处理各种复杂的场景。

流量筛选可以从`Header`, `URI`, `Query`, `Cookie` 等等Http请求获取数据，

然后可以采用 `Match`，`=`，`SpEL`，`Regex`，`Groovy`等匹配方式，匹配出你所预想的数据。

多组匹配添加可以使用`And/Or`的匹配策略。上述都是采用`SPI的设计思想`，用户可以`自主进行扩展` :更多的请查看 : https://shenyu.apache.org/zh/projects/shenyu/selector-and-rule/

其过程图如下 :

![](https://shenyu.apache.org/img/shenyu/design/flow-condition.png)


## 数据同步与缓存

为了提升网关的`性能`，`Apache ShenYu` 网关会将所有的流量控制规则缓存在`JVM` 内存里面。在`集群部署/分布式`场景中，`Apache ShenYu` 自主研发了一套 `将 Admin 控制台的数据，远程同步到每一个 Apache ShenYu 网关节点 JVM内存 的方案`。

每一种方案，采用 `SPI` 设计思想，以供用户`灵活`的选择。目前支持的方案有 `HttpLongPull`, `Websocket`, `Zookeeper`, `Nacos`, `Consul`, `ETCD`。 其整体流程如下 :

![](https://shenyu.apache.org/img/shenyu/dataSync/config-strategy-processor-zh.png)


## Admin控制台

为了方便用户快速便捷的控制流量以及网关的所有功能特性，`Apache ShenYu` 提供了 一个十分精美的`Admin控制台`，用户可以`中英文切换`,在这上面，可以随意的`控制流量`，`启停插件`，`配置不同的参数与策略`，这些操作更改通过上述的`数据同步原理`，同步到网关的 `JVM内存`。其后台示意图如下:
![](https://shenyu.apache.org/img/community/admin.png)


##### 菜单/数据权限

 网关的后台管理是十分重要的，为了针对企业级的用户，跨部门应用代理，`Apache ShenYu`设计了一整套的`权限控制体系`，它包含`按钮级别的菜单权限`，以及`行数据级别的数据权限`。并且这些权限控制在 `Admin控制台` 自主自动可配。

 ![](https://shenyu.apache.org/img/community/admin-permission.png)


## 协议代理

协议代理是网关最核心的功能，目前 `Apache ShenYu` 支持 `http` 转成 `http/https`， `Websocket`,`Dubbo`、 `Spring Cloud`、 `GRPC`、 `Motan`、` Sofa`、 `Tars` 等协议的转换，未来将支持 `TCP`, `MQTT`,`MQTT` 等协议。

#### Divide插件

 `Divide`插件,是用来专门代理 `http/https/websocket` 等方式请求 `Apache ShenYu` 网关的插件。 它具有 `负载均衡`，`流量预热`, `节点发现`，`超时重试`，`超时控制` 等功能。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` -->`Divide插件`将其设置为 `开启`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/http-proxy/

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

#### Dubbo插件

 `Dubbo`插件，是`Apache ShenYu`网关将 `http/https` 请求转换成 `dubbo`协议的插件 。 它采用了`Dubbo泛化`调用的机制，整合了 `Dubbo的客户端`，具有`服务发现`，`负载均衡` 等功能。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `dubbo插件`将其设置为 `开启`,并且配置上`注册中心`, 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/dubbo-proxy/

```xml
 <!-- apache shenyu alibaba dubbo plugin start-->
 <dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-spring-boot-starter-plugin-alibaba-dubbo</artifactId>
    <version>${project.version}</version>
 </dependency>
 <!-- apache shenyu apache dubbo plugin start-->
 <dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-spring-boot-starter-plugin-apache-dubbo</artifactId>
    <version>${project.version}</version>
 </dependency>
```

#### SpringCloud插件

 `SpringCloud`插件，是`Apache ShenYu`网关代理 `SpringCloud`微服务业务的插件 。 它整合了 `SpringCloud`的注册中心，以及负载均衡服务，实现了服务的代理。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `SpringCloud插件`将其设置为 `开启`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/spring-cloud-proxy/

```xml
 <dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-spring-boot-starter-plugin-springcloud</artifactId>
    <version>${project.version}</version>
 </dependency>
```

#### GRPC插件

 `GRPC`插件，是`Apache ShenYu`网关将 `http/https` 请求转换成 `GRPC`协议的插件 。 它整合了 `GRPC` 客户端，实现了 `GRPC`服务的代理。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `GRPC插件`将其设置为 `开启`。 更详细的介绍请看 :https://shenyu.apache.org/zh/projects/shenyu/grpc-proxy/

```xml
 <dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-spring-boot-starter-plugin-grpc</artifactId>
    <version>${project.version}</version>
 </dependency>
```

#### Tars插件

  `Tars`插件，是`Apache ShenYu`网关将 `http/https` 请求转换成 `Tars`协议的插件 。 `Tars`是腾讯开源的 RPC框架， 该插件整合了 `Tars-JAVA` 客户端，实现了 `Tars`服务的代理。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `Tars插件`将其设置为 `开启`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/tars-proxy/

```xml
  <dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-tars</artifactId>
     <version>${project.version}</version>
  </dependency>
```


#### Sofa插件

  `Sofa`插件，是`Apache ShenYu`网关将 `http/https` 请求转换成 `Sofa-RPC`协议的插件 。 它采用了`Sofa泛化`调用的机制，整合了 `Sofa-RPC的客户端`，具有`服务发现`，`负载均衡` 等功能。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `sofa插件`将其设置为 `开启`，并且配置上`注册中心`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/sofa-proxy/

```xml
  <dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-sofa</artifactId>
     <version>${project.version}</version>
  </dependency>
```

## 熔断限流

#### Hystrix插件

`Hystrix`插件，是`Apache ShenYu`网关整合`Hystrix`框架，提供请求熔断的功能，`Hystrix`熔断参数可动态化配置。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `Hystrix插件`将其设置为 `开启`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/hystrix-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-hystrix</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### Sentinel插件

`Sentinel`插件，是`Apache ShenYu`网关整合`Sentinel`框架，提供请求熔断限流的功能，`Sentinel`熔断限流参数可动态化配置。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `Sentinel插件`将其设置为 `开启`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/sentinel-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-sentinel</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### Resilience4j插件

`Resilience4j`插件，是`Apache ShenYu`网关整合`Resilience4j`框架，提供请求熔断限流的功能，`Resilience4j`熔断限流参数可动态化配置。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `Resilience4j插件`将其设置为 `开启`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/resilience4j-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-resilience4j</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### RateLimiter插件

`RateLimiter`插件，是`Apache ShenYu`网关使用`redis`，提供请求集群限流的功能，限流算法策略有：`令牌桶算法`,`并发限流`，`漏桶算法`，`滑动窗口算法`。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `RateLimiter插件`将其设置为 `开启`，并且配置上`redis`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/rate-limiter-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-ratelimiter</artifactId>
   <version>${project.version}</version>
</dependency>
```

## 安全/权限认证

#### Waf插件

`Waf`插件，是`Apache ShenYu`网关，用来对流量实现防火墙，主要用来拦截非法请求，或者异常请求，并且给与相关的拒绝策略，它提供了黑白名单配置的功能。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `Waf插件`将其设置为 `开启`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/waf-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-waf</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### Sign插件

`Sign`插件，是`Apache ShenYu`网关，用来对请求进行签名认证。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `Sign插件`将其设置为 `开启`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/sign-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-sign</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### JWT插件

`JWT`插件，是`Apache ShenYu`网关，是针对 `http` 请求头的 `token` 属性或者是 `authorization` 属性携带值进行鉴权判断，兼容 `OAuth2.0`。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `jwt插件`将其设置为 `开启`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/jwt-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-jwt</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### OAuth2插件

`OAuth2`插件，是`Apache ShenYu`网关，使用 `Webflux OAuth2`客户端实现，用于支持 `OAuth2` 协议。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `oauth2插件`将其设置为 `开启`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/oauth2-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-oauth2</artifactId>
   <version>${project.version}</version>
</dependency>
```

## 个性化处理

#### Rewrite插件

`Rewrite`插件，是`Apache ShenYu`网关，支持使用正则表达式来重写`URI`的插件。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `rewrite插件`将其设置为 `开启`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/rewrite-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-rewrite</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### Redirect插件

`Redirect`插件，是`Apache ShenYu`网关，将请求进行重定向的插件，支持网关内部接口与外部地址。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `redirect插件`将其设置为 `开启`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/redirect-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-redirect</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### Request插件

`Request`插件，是`Apache ShenYu`网关容许用户对`请求参数`、`请求头` 以及 `Cookie` 进行`添加`、`修改`、`删除`等功能。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `request插件`将其设置为 `开启`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/request-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-request</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### Context-Path插件

`Context-Path`插件，是`Apache ShenYu`网关，容许用户对请求路径上的 `Context-Path`,进行 `添加`、`修改`、`删除`等功能。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `context_path插件`将其设置为 `开启`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/context-path-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-context-path</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### Param-Mapping插件

`Param-Mapping`插件，是`Apache ShenYu`网关，容许用户对请求体中的 `Body`,进行 `添加`、`修改`、`删除`字段等功能。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `param_mapping插件`将其设置为 `开启`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/param-mapping-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-param-mapping</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### ModifyResponse插件

`ModifyResponse`插件，是`Apache ShenYu`网关，用来对请求响应体中的 `响应头`,`状态码`，`响应内容`,进行 `添加`、`修改`、`删除`等功能。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `modifyResponse插件`将其设置为 `开启`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/modify-response-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-modify-response</artifactId>
   <version>${project.version}</version>
</dependency>
```

## 可观测性

#### Monitor插件

`Monitor`插件，是`Apache ShenYu`网关，使用 `prometheus`来完成对`请求量`，`QPS`, `JVM`等相关`metrics`进行监控的插件。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `monitor插件`将其设置为 `开启`, 并且配置 `prometheus`相关参数。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/monitor-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-monitor</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### Logging插件

`Monitor`插件，是`Apache ShenYu`网关，容许用户日志中打印本次`请求信息`，包含 `请求路径`、`请求方法`、`请求参数` 、`响应头`、`响应体`等信息。用户想要使用它，请在网关添加如下依赖， 然后在 `Admin控制台` --> `插件管理` --> `logging插件`将其设置为 `开启`。 更详细的介绍请看 : https://shenyu.apache.org/zh/projects/shenyu/logging-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-logging</artifactId>
   <version>${project.version}</version>
</dependency>
```

## 下一个版本规划

* RPC框架灰度发布增强，包含 `SpringCloud`，`GRPC`，`Dubbo`，`Sofa-RPC`，`Tars`等。

* 新增`ShenYu-Agent`模块，打造网关`metrics`, `tracing`, `logging` 等可观测性体系。

* 自定义插件动态加载，方便用户快速，不停机扩展与更新。

* 集成测试 + 单元测试 全面覆盖。


## 社区
`Apache ShenYu` 是完全由国人主导的自主性社区开源项目，目前处在高速发展时期，
`功能开发`，`文档完善`，`BUG修复` 等大量的事情需要完成。
`Apache ShenYu` 社区遵循 `Apache Way`的社区理念，打造一个`完全开放`，`治理`的社区。
每半个月，会进行一次全体社区会议，社区的committers,contributors, users都会参与其中，
在会议上大家可以畅所欲言，提出自己的观点和看法，比如对不同的功能，不同的代码进行讨论，最好达成一致性的观点。
在Apache ShenYu 社区中，我们推崇邮件列表 > Github Issue > 微信群的沟通优先级的原则。 
主要的目的是让每一个问题，没一个观点，都有记录存档，更好的帮助他人，以推进社区的可持续发展。



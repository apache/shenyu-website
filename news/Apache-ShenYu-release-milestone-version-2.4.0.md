---
title: "【Release the first version of Apache ShenYu(Incubating)2.4.0】 Make API gateway easy"
author: "xiaoyu"
description: "【Release the first version of Apache ShenYu(Incubating)2.4.0】 Make API gateway easy"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2021-08-01
cover: "/img/architecture/shenyu-framework.png"
---


## [Release the first version of Apache - 2.4.0] Make API Gateway Simple

> Disclaimer: In this article, `Apache ShenYu` refers to `Apache ShenYu (incubating)`
> Author: Xiao Yu Apache ShenYu(incubating) Founder && PPMC
> 2.4.0 Release Manager: Zhang Yonglun Apache ShenYu(incubating) PPMC && Apache ShardingSphere PMC

The `Apache ShenYu` gateway is renamed from the original `Dromara/soul` gateway after donated to the `Apache` foundation.
The `2.4.0` version released this time is the first version after the `Apache ShenYu` gateway enters the `Apache Incubator`. This version involves many new features,The project name, package name, and `maven` coordinates are changed.

## What Is Apache ShenYu?

`Apache ShenYu` is developed using the `Java reactor` programming method, and is an `API gateway` with features such as `asynchronous`, `high performance`, and `cross-language`.
In terms of flow control, there is an exquisite Admin console, which can `precise` and `dynamic` control flow to meet complex business scenarios.
In terms of functions, it uses plug-in design ideas and supports many common protocols: such as `http/https`, `Dubbo`, `Spring Cloud`, `gRPC`, `Motan`, `Sofa`, `Tars`, etc.
And built-in very rich function plug-ins, such as `circuit breaking`, `current limit`, `authentication`, `access control`, `firewall`, `monitoring`, `parameter change` and so on. Its architecture diagram is as follows:

![](/img/architecture/shenyu-framework.png)

## Flow Control

The control of flow is the soul of the gateway. For flow control, `Apache ShenYu` has designed two concepts of `selector` and `rule` to control the flow.

`Selector` and `Rule` are the most soulful things in the `Apache ShenYu` gateway. Master it, you can manage any traffic.

A plug-in has multiple selectors, and a selector has multiple rules. The selector is equivalent to the first-level screening of traffic, and the rule is the final screening.

For a plug-in, we hope that according to our configuration, the plug-in will be executed only if the traffic meets the conditions.

The purpose of selectors and rules is to allow traffic to perform what we want when certain conditions are met. This kind of rules must first be understood.

The plug-in, selector, and rule execution logic are as follows. When traffic enters the Apache ShenYu gateway, it will first determine whether there is a corresponding plug-in and whether the plug-in is enabled; then it will determine whether the traffic matches the plug-in's selector.

Then determine whether the traffic matches the rule of the selector. If the requested traffic meets the matching conditions, the plug-in will be executed, otherwise the plug-in will not be executed and the next one will be processed.

This is how the Apache ShenYu gateway completes flow control through layers of filtering. The flow chart is as follows:

<img src="/img/shenyu/plugin/plugin-chain-execute-en.jpg" width="80%" height="70%"/>

## Traffic filtering

Traffic filtering is the soul of `selectors` and `rules`, corresponding to the matching `conditions` in the selectors and rules. According to different traffic filtering rules, we can handle various complex scenarios.

Traffic filtering can obtain data from Http requests such as `Header`, `URI`, `Query`, `Cookie`,

Then you can use `Match`, `=`, `SpEL`, `Regex`, `Groovy` and other matching methods to match the data you expected.

You can use the matching strategy of `And/Or` to add multiple sets of matching. The above are all using `SPI design ideas`, users can `self-expand`: For more, please see: https://shenyu.apache.org/docs/user-guide/admin-usage/selector-and-rule

The process diagram is as follows:

![](/img/shenyu/design/flow-condition.png)

## Data synchronization and caching

In order to improve the `performance` of the gateway, the `Apache ShenYu` gateway will cache all flow control rules in the `JVM` memory.

In the `cluster deployment/distributed` scenario, `Apache ShenYu` independently developed a set of Remote synchronization of Admin console data to the JVM memory of each Apache ShenYu gateway node.

Each scheme adopts the design idea of SPI, so that users can choose flexibly. Currently supported schemes are `HttpLongPull`, `Websocket`, `Zookeeper`, `Nacos`, `Consul`, `ETCD`.

The overall process is as follows:

![](/img/shenyu/dataSync/config-strategy-processor-zh.png)

## Admin console

In order to facilitate the user to quickly and conveniently control the flow and all the functional characteristics of the gateway, `Apache ShenYu` provides a very beautiful `Admin console`, the user can `Chinese and English switch`, on this, you can freely `control the flow` , `Start-stop plug-in`, `Configure different parameters and strategies`, these operation changes are synchronized to the gateway's `JVM memory` through the aforementioned `data synchronization principle`. The background diagram is as follows:

<img src="/img/community/admin_homepage_en.jpg"/>

##### Menu/data permissions

The background management of the gateway is agent. For enterprise-level users and cross-departmental applications, `Apache Shenyu` designs a common `authorization control system`, including `button level menu permissions`, and `row data level data Permissions`. And these permissions are automatically configurable by the `administrator`.

<img src="/img/community/admin-permission-en.jpg"/>

## Protocol Proxy

Protocol proxy is the core function of the gateway. Currently `Apache ShenYu` supports `http` to `http/https`, `Websocket`, `Dubbo`, `Spring Cloud`, `gRPC`, `Motan`, `Sofa` The conversion of protocols such as `Tars`, etc. will support `TCP`, `MQTT`, `MQTT` and other protocols in the future.

#### Divide Plugin

The `Divide` plug-in is a plug-in used to specifically proxy `http/https/websocket` and other methods to request the `Apache ShenYu` gateway. It has functions such as `load balancing`, `traffic preheating`, `node discovery`, `timeout retry`, `timeout control` and so on. If users want to use it, please add the following dependencies in the gateway, and then set it to `on` in `Admin console` --> `Plugin management` --> `Divide plugin`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/user-guide/proxy/http-proxy/

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

#### Dubbo Plugin

`Dubbo` plug-in is a plug-in used by `Apache ShenYu` gateway to convert `http/https` requests into `dubbo` protocol. It adopts the mechanism of `Dubbo generalization` call, integrates `Dubbo client`, and has functions such as `service discovery`, `load balancing` and so on. To use it, please add the following dependencies in the gateway, and then set it to `on` in `Admin console` --> `Plugin management` --> `dubbo plugin`, and configure the `Registry Center`, For a more detailed introduction, please see: https://shenyu.apache.org/docs/user-guide/proxy/dubbo-proxy/

```xml
 <!-- apache shenyu alibaba dubbo plugin start-->
 <dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-spring-boot-starter-client-alibaba-dubbo</artifactId>
    <version>${project.version}</version>
 </dependency>
 <!-- apache shenyu apache dubbo plugin start-->
 <dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-spring-boot-starter-client-apache-dubbo</artifactId>
    <version>${project.version}</version>
 </dependency>
```

#### SpringCloud Plugin

The `SpringCloud` plugin is a plugin for `Apache ShenYu` gateway proxy `SpringCloud` microservice business. It integrates the registration center of `SpringCloud`, and load balancing service, and realizes the proxy of the service. To use it, please add the following dependency in the gateway, and then set it to `on` in `Admin console` --> `Plugin management` --> `SpringCloud plugin`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/user-guide/proxy/spring-cloud-proxy/

```xml
 <dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-spring-boot-starter-plugin-springcloud</artifactId>
    <version>${project.version}</version>
 </dependency>
```

#### gRPC Plugin

The `gRPC` plug-in is a plug-in used by the `Apache ShenYu` gateway to convert the `http/https` request into the `GRPC` protocol. It integrates the `GRPC` client and implements the proxy of the `GRPC` service. To use it, please add the following dependency in the gateway, and then set it to `on` in `Admin console` --> `Plugin management` --> `GRPC plugin`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/user-guide/proxy/grpc-proxy/

```xml
 <dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-spring-boot-starter-plugin-grpc</artifactId>
    <version>${project.version}</version>
 </dependency>
```

#### Tars Plugin

`Tars` plug-in is a plug-in used by `Apache ShenYu` gateway to convert `http/https` requests into `Tars` protocol. `Tars` is Tencent's open source RPC framework. The plug-in integrates the `Tars-JAVA` client and implements the proxy of the `Tars` service. If users want to use it, please add the following dependency in the gateway, and then set it to `on` in `Admin console` --> `Plugin management` --> `Tars plugin`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/user-guide/proxy/tars-proxy/

```xml
  <dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-tars</artifactId>
     <version>${project.version}</version>
  </dependency>
```

#### Sofa Plugin

The `Sofa` plug-in is a plug-in used by the `Apache ShenYu` gateway to convert the `http/https` request into the `Sofa-RPC` protocol. It uses the `Sofa generalization` call mechanism, integrates the `Sofa-RPC client`, and has functions such as `service discovery`, `load balancing` and so on. To use it, please add the following dependencies in the gateway, and then set it to `on` in `Admin Console` --> `Plugin Management` --> `Sofa Plugin`, and configure the `Registry Center`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/user-guide/proxy/sofa-rpc-proxy/

```xml
  <dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-sofa</artifactId>
     <version>${project.version}</version>
  </dependency>
```

## Circuit Breaking and Rate Limiting

#### Hystrix Plugin

The `Hystrix` plug-in is the `Hystrix` framework integrated with the `Apache ShenYu` gateway, which provides the function of requesting fuse. The `Hystrix` fuse parameters can be dynamically configured. To use it, please add the following dependency in the gateway, and then set it to `on` in `Admin console` --> `Plugin management` --> `Hystrix plugin`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/plugin-center/fault-tolerance/hystrix-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-hystrix</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### Sentinel Plugin

The `Sentinel` plug-in is the `Apache ShenYu` gateway integrated with the `Sentinel` framework, providing the function of requesting fuse current limiting. The `Sentinel` fuse current limiting parameters can be dynamically configured. If users want to use it, please add the following dependencies in the gateway, and then set it to `on` in `Admin Console` --> `Plugin Management` --> `Sentinel Plugin`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/plugin-center/fault-tolerance/sentinel-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-sentinel</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### Resilience4j Plugin

The `Resilience4j` plug-in is the `Apache ShenYu` gateway integrated with the `Resilience4j` framework, providing the function of requesting fuse current limiting. The `Resilience4j` fuse current limiting parameters can be dynamically configured. To use it, please add the following dependency in the gateway, and then set it to `on` in `Admin console` --> `Plugin management` --> `Resilience4j plugin`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/plugin-center/fault-tolerance/resilience4j-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-resilience4j</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### RateLimiter Plugin

The `RateLimiter` plug-in is the `Apache ShenYu` gateway using `redis` to provide the function of requesting cluster current limiting. The current limiting algorithm strategies include: `Token Bucket Algorithm`, `Concurrent Current Limiting`, `Leaky Bucket Algorithm`, `Sliding window algorithm`. To use it, please add the following dependencies in the gateway, and then set it to `on` in `Admin console` --> `Plugin management` --> `RateLimiter plugin`, and configure `redis`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/plugin-center/fault-tolerance/rate-limiter-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-ratelimiter</artifactId>
   <version>${project.version}</version>
</dependency>
```

## Security/Authorization

#### Waf Plugin

The `Waf` plug-in is an `Apache ShenYu` gateway, which is used to implement a firewall for traffic. It is mainly used to intercept illegal requests or abnormal requests, and to provide related denial policies. It provides the function of black and white list configuration. If users want to use it, please add the following dependency in the gateway, and then set it to `on` in `Admin console` --> `Plugin management` --> `Waf plugin`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/plugin-center/security/waf-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-waf</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### Sign Plugin

The `Sign` plug-in is the `Apache ShenYu` gateway, which is used to sign the request. If users want to use it, please add the following dependencies in the gateway, and then set it to `Enable` in `Admin Console` --> `Plugin Management` --> `Sign Plugin`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/plugin-center/security/sign-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-sign</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### JWT Plugin

The `JWT` plug-in is an `Apache ShenYu` gateway, which performs authentication judgments based on the `token` attribute of the `http` request header or the value carried by the `authorization` attribute, and is compatible with `OAuth2.0`. If users want to use it, please add the following dependency in the gateway, and then set it to `on` in `Admin console` --> `Plugin management` --> `jwt plugin`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/plugin-center/security/jwt-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-jwt</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### OAuth2 Plugin

The `OAuth2` plug-in is the `Apache ShenYu` gateway, which is implemented using the `Webflux OAuth2` client to support the `OAuth2` protocol. To use it, please add the following dependency in the gateway, and then set it to `on` in `Admin console` --> `Plugin management` --> `oauth2 plugin`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/plugin-center/security/oauth2-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-oauth2</artifactId>
   <version>${project.version}</version>
</dependency>
```

## Personalized Processing

#### Rewrite Plugin

The `Rewrite` plug-in is the `Apache ShenYu` gateway, which supports the use of regular expressions to rewrite the `URI`. To use it, please add the following dependency in the gateway, and then set it to `on` in `Admin console` --> `Plugin management` --> `rewrite plugin`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/plugin-center/http-process/rewrite-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-rewrite</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### Redirect Plugin

The `Redirect` plug-in is a plug-in for the `Apache ShenYu` gateway to redirect requests. It supports the internal interface and external address of the gateway. To use it, please add the following dependencies to the gateway, and then set it to `on` in `Admin console` --> `Plugin management` --> `redirect plugin`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/plugin-center/http-process/redirect-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-redirect</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### Request Plugin

The `Request` plug-in is the `Apache ShenYu` gateway that allows users to perform functions such as `add`, `modify`, and `delete` to `request parameters`, `request headers` and `Cookies`. If users want to use it, please add the following dependency in the gateway, and then set it to `on` in `Admin console` --> `Plugin management` --> `request plugin`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/plugin-center/http-process/request-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-request</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### Context-Path Plugin

The `Context-Path` plug-in is an `Apache ShenYu` gateway, which allows users to perform `add`, `modify`, and `delete` functions on the `Context-Path` on the request path. To use it, please add the following dependency in the gateway, and then set it to `on` in `Admin console` --> `plugin management` --> `context_path plugin`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/plugin-center/http-process/contextpath-plugin/

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-context-path</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### Param-Mapping Plugin

The `Param-Mapping` plug-in is an `Apache ShenYu` gateway, allowing users to perform functions such as `add`, `modify`, and `delete` fields in the `Body` in the request body. To use it, please add the following dependency in the gateway, and then set it to `on` in `Admin console` --> `Plugin management` --> `param_mapping plugin`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/plugin-center/http-process/parammapping-plugin

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-param-mapping</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### ModifyResponse Plugin

The `ModifyResponse` plug-in is an `Apache ShenYu` gateway, which is used to perform functions such as `add`, `modify`, and `delete` on the `response header`, `status code`, and `response content` in the request response body. If users want to use it, please add the following dependency in the gateway, and then set it to `on` in `Admin Console` --> `Plugin Management` --> `modifyResponse Plugin`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/plugin-center/http-process/modifyresponse-plugin

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-modify-response</artifactId>
   <version>${project.version}</version>
</dependency>
```

## Observability

#### Monitor Plugin

The `Monitor` plug-in is a `Apache ShenYu` gateway. It uses `prometheus` to complete the plug-in for monitoring `requests`, `QPS`, `JVM` and other related `metrics`. To use it, please add the following dependencies in the gateway, and then set it to `on` in `Admin console` --> `Plugin management` --> `monitor plugin`, and configure the relevant parameters of `prometheus`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/plugin-center/observability/metrics-plugin

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-monitor</artifactId>
   <version>${project.version}</version>
</dependency>
```

#### Logging Plugin

The `Logging` plug-in is the `Apache ShenYu` gateway, which allows the user log to print this `request information`, including `request path`, `request method`, `request parameters`, `response header`, `response body`, etc. Information. To use it, please add the following dependencies to the gateway, and then set it to `on` in `Admin console` --> `Plugin management` --> `Logging plugin`. For a more detailed introduction, please see: https://shenyu.apache.org/docs/plugin-center/observability/logging-plugin

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-logging</artifactId>
   <version>${project.version}</version>
</dependency>
```

## Planning For The Next Version

* RPC framework grayscale release enhancement, including `SpringCloud`, `gRPC`, `Dubbo`, `Sofa-RPC`, `Tars`, etc.
* Added the `ShenYu-Agent` module to create observability systems such as the gateway `metrics`, `tracing`, and `logging`.
* Custom plug-ins are dynamically loaded, which is convenient for users to expand and update quickly and without stopping.
* Comprehensive coverage of integration testing and unit testing.

## Community

`Apache ShenYu` is an autonomous community open source project completely dominated by Chinese people. It is currently in a period of rapid development.
`Function development` `Complete documentation`, `fix BUG` and many other things need to be completed.
The `Apache ShenYu` community follows the community philosophy of `Apache Way` and creates a `completely open` and `government` community. Every half month, a full community meeting will be held, and the community’s committers, contributors, and users will participate in it,
At the meeting, everyone can speak freely and put forward their own views and opinions, such as discussing different functions and different codes, and it is best to reach a consistent point of view.
In the Apache ShenYu community, we respect the principle of communication priority of mailing list `>` GitHub Issue `>` WeChat group. The main purpose is to keep a record of every problem, no point of view, to better help others, to promote the sustainable development of the community.


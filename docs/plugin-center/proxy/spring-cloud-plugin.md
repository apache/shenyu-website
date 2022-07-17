---
title: Spring Cloud Plugin
keywords: ["SpringCloud"]
description: SpringCloud Plugin
---

# 1. Overview

## 1.1 Plugin Name

* SpringCloud Plugin

## 1.2 Appropriate Scenario

* transform http to springcloud
* springcloud 

## 1.3 Plugin functionality

* transform http protocol into springCloud protocol.

## 1.4 Plugin code

* Core Module `shenyu-plugin-springcloud`

* Core Class `org.apache.shenyu.plugin.springcloud.SpringCloudPlugin`

## 1.5 Added Since Which shenyu version

Since ShenYu 2.4.0


# 2. How to use plugin

## 2.1 Plugin-use procedure chart

![](/img/shenyu/plugin/logging/logging-console/loggingConsole-use-en.png)

## 2.2 Import pom

* Eureka Register Center
```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-springcloud</artifactId>
  <version>${project.version}</version>
</dependency>

<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
  <version>${eureka-client.version}</version>
</dependency>

<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-commons</artifactId>
  <version>${spring-cloud-commons.version}</version>
</dependency>
```

* Nacos Register Center

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-springcloud</artifactId>
  <version>${project.version}</version>
</dependency>

<dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
  <version>${nacos-discovery.version}</version>
</dependency>

<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-commons</artifactId>
  <version>${spring-cloud-commons.version}</version>
</dependency>
```

## 2.3 Enable plugin

- In shenyu-admin --> BasicConfig --> Plugin --> `springCloud` set Status enable.

## 2.4 Config plugin

### 2.4.1 Plugin config

### 2.4.2 Selector Config

### 2.4.3 Rule Config

## 2.5 Gray Routing 


## 2.5 Examples

### 2.5.1 examples1, text and snapshot, detail describe every page config item, request, result

### 2.5.2 examples2, text and snapshot, detail describe every page config item, request, result

# 3. How to disable plugin











## Explanation

* This plugin is the core of transforming `http` protocol into `springCloud protocol`.

## Introducing Plugin Support of SpringCould Gateway

* Introducing those dependencies in the pom.xml file of the gateway.

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

## Plugin Setting

* Add related dependencies and enable plugin, please refer to: [Quick start with Spring Cloud](../../quick-start/quick-start-springcloud) .

* `Spring Cloud` client access, please refer to: [Spring Cloud Proxy](../../user-guide/spring-cloud-proxy) .


## Plugin Detail


After the client accesses the `ShenYu` gateway, it will automatically register the selector and rule information. For details about the selector and rule configuration, see [Selector and Rule Config](../../user-guide/admin-usage/selector-and-rule) .



#### Selector Handler

<img src="/img/shenyu/plugin/springcloud/selector_en_new.png" width="80%" height="80%" />


Selector Handler, the `handle` field, is an operation that can be processed by the gateway after matching the traffic. For more information, please refer to [Plugin handle management](../plugin-handle-explanation) in Plugin Config.



* details：

  * `serviceId`：service id.
    
  * `gray`：enable gray routing.
    
    * `protocol`：protocol default is 'http'.
      
    * `upstreamUrl`：the server instance host.
      
    * `weight`：the server instance and participate in load balancing calculation.
      
    * `status`：true: the server is available，false: the server is unavailable.
      
    * `timestamp`：the server's start time.
      
    * `warmup`：the server's warm up time and and participate in load balancing calculation.
  
Gray routing

if you want to user gray route in springCloud-plugin, you can click the `gray` button.

<img src="/img/shenyu/plugin/springcloud/gray_en.png" width="80%" height="80%" />

* Gray level publishing can customize and control the traffic proportion of new version applications when publishing new version applications, gradually complete the full launch of new version applications, maximize the business risk caused by new version publishing, reduce the impact surface caused by faults, and support rapid roll back.


when the gray is open,Gateway load balancing will select one node from the current node list for routing and you can modify node weights to change the weight of nodes in the load balancing algorithm.

<img src="/img/shenyu/plugin/springcloud/gray.png" width="80%" height="80%" />

It should be noted that,if your business instance not use the client jar of 'shenyu-client-springcloud', You should add gray node information manually on this selector page.

#### Rule Handler

<img src="/img/shenyu/plugin/springcloud/rule_en.png" width="80%" height="80%" />

Rule Handler, the `handle` field, can be performed by the gateway after the final matching of traffic. For more information, please refer to [Plugin handle management](../plugin-handle-explanation) in Plugin Config.

* details：

  * `path`：request path.
  * `timeout`：set time out.

* Application name: it is your specific application name that needs to be invoked after the conditions are matched.
* Apache ShenYu will obtain the real IP of the corresponding service and initiate http proxy calls from registration center of springCloud.

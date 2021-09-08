---
title: Spring Cloud Plugin
keywords: ["SpringCloud"]
description: SpringCloud Plugin
---

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
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
    <version>2.2.0.RELEASE</version>
</dependency>
```

## Plugin Setting

* Add related dependencies and enable plugin, please refer to: [Quick start with Spring Cloud](../../quick-start/quick-start-springcloud) .

* `Spring Cloud` client access, please refer to: [Spring Cloud Proxy](../../user-guide/spring-cloud-proxy) .


## Plugin Detail


After the client accesses the `ShenYu` gateway, it will automatically register the selector and rule information. For details about the selector and rule configuration, see [Selector and Rule Config](../../user-guide/admin-usage/selector-and-rule) .



#### Selector Handler

<img src="/img/shenyu/plugin/springcloud/selector_en.png" width="80%" height="80%" />


Selector Handler, the `handle` field, is an operation that can be processed by the gateway after matching the traffic. For more information, please refer to [Plugin handle management](../plugin-handle-explanation) in Plugin Config.



* details：

  * `serviceId`：service id.

#### Rule Handler

<img src="/img/shenyu/plugin/springcloud/rule_en.png" width="80%" height="80%" />

Rule Handler, the `handle` field, can be performed by the gateway after the final matching of traffic. For more information, please refer to [Plugin handle management](../plugin-handle-explanation) in Plugin Config.

* details：


  * `path`：request path.
  * `timeout`：set time out.

* Application name: it is your specific application name that needs to be invoked after the conditions are matched.
* Apache ShenYu will obtain the real IP of the corresponding service and initiate http proxy calls from registration center of springCloud.
   


---
title: SpringCloud Plugin
keywords: SpringCloud
description: SpringCloud Plugin
---

## Explanation

* This plugin is the core of transforming `http protocol` into `springCloud protocol`.

## Introducing Plugin Support of SpringCould Gateway

* Introducing those dependencies in the pom.xml file of the gateway. 

```xml
<!--shenyu springCloud plugin start-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-springcloud</artifactId>
    <version>${last.version}</version>
</dependency>

<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-httpclient</artifactId>
    <version>${last.version}</version>
</dependency>
<!--shenyu springCloud plugin end-->

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

* In `shenyu-admin` --> plugin management-> springCloud, set to enable. 
* This plugin needs to cooperate with `starter` dependency, please refer to:[user-spring](../spring-cloud-proxy).
* Selectors and rules, please refer to: [selector](../selector-and-rule).

## Detail

* Application name: it is your specific application name that needs to be invoked after the conditions are matched.
* Shenyu will obtain the real IP of the corresponding service and initiate http proxy calls from registration center of springCloud.
   

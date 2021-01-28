---
title: plugin-springcloud
keywords: springcloud
description: springcloud plugin
---

## Explanation

* This plugin is the core of transforming `http protocol` into `springCloud protocol`.

## Introducing Plugin Support of SpringCould Gateway

* Introducing those dependencies in the pom.xml file of the gateway. 

```xml
  <!--soul springCloud plugin start-->
  <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-spring-boot-starter-plugin-springcloud</artifactId>
        <version>${last.version}</version>
  </dependency>

  <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-spring-boot-starter-plugin-httpclient</artifactId>
       <version>${last.version}</version>
   </dependency>
   <!--soul springCloud plugin end-->

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

* In `soul-admin` --> plugin management-> springCloud ,set to enable. 

* This plugin needs to cooperate with `starter` dependency, please refer to:[user-spring](../spring-cloud-proxy).

* Selectors and rules, please refer to: [selector](../selector-and-rule)。

## Detail

* Application name: it is your specific application name that needs to be invoked after the conditions are matched.

* Soul will obtain the real IP of the corresponding service and initiate http proxy calls from registration center of springCloud.
   

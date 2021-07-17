---
title: Custom Deployment
keywords: Apache ShenYu Deployment
description: Custom Deployment
---

This article describes how to build your own gateway based on `Apache ShenYu`.


### Start Apache ShenYu Admin

* docker reference docker deployment Apache ShenYu Admin 

* liunx/windows reference source code deployment Apache ShenYu Admin

### Build your own gateway (recommended)

* first create an empty `springboot` project, you can refer to `shenyu-bootstrap`, or you can create it on [spring official website](https://spring.io/quickstart).

* introduce the following `jar` package:

```xml
<dependencies>
   <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webflux</artifactId>
        <version>2.2.2.RELEASE</version>
   </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
        <version>2.2.2.RELEASE</version>
   </dependency>
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-gateway</artifactId>
        <version>${project.version}</version>
   </dependency>
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-sync-data-websocket</artifactId>
        <version>${project.version}</version>
   </dependency>
</dependencies>
```

among them, `${project.version}` please use the current latest version.

* add the following configuration to your `application.yaml` file:

```yaml
spring:
  main:
    allow-bean-definition-overriding: true
management:
  health:
    defaults:
      enabled: false
shenyu:
  sync:
    websocket:
      urls: ws://localhost:9095/websocket  //set to your shenyu-admin address
```











---
sidebar_position: 6
title: Custom Deployment
keywords: ["Custom"]
description: Custom Deployment
---

This article describes how to build your own gateway based on `Apache ShenYu`.

> Before you read this document, you need to complete some preparations before deploying ShenYu according to the [Deployment Prerequisites document](./deployment-before.md).

### Start Apache ShenYu Admin

* docker reference docker deployment Apache ShenYu Admin

* liunx/windows reference binary packages deployment Apache ShenYu Admin

### Build your own gateway (recommended)

* first create an empty `springboot` project, you can refer to `shenyu-bootstrap`, or you can create it on [spring official website](https://spring.io/quickstart).

* introduce the following `jar` package:

```xml
<parent>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu</artifactId>
    <version>2.7.2</version>
    <relativePath/>
</parent>

<dependencies>
   <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webflux</artifactId>
   </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
   </dependency>
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-gateway</artifactId>
        <version>2.7.2</version>
   </dependency>
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-sync-data-websocket</artifactId>
        <version>2.7.2</version>
   </dependency>
</dependencies>
```

This example inherits the 2.7.2 release parent, including its Spring Boot 3.5.16 baseline and explicit dependency overrides. If your application must keep another parent, reproduce the release dependency management and validate the resolved dependencies; importing the Spring Boot BOM alone does not include all ShenYu overrides.

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
      allowOrigin: ws://localhost:9195
```

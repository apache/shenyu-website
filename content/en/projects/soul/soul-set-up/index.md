---
title: Environment Setup
keywords: soul
description: Environment Setup
---

## Features

* Soul is an open source plugin framework, which is flexibility and extensibility since 2.2.0 version.
  With soul you can easily create application with your own gateway.
* System Requirement: JDK 1.8+, Mysql 5.0 +.

## Invoke `Soul-Admin`

* Download `soul-admin.jar`, then run it with arguments.

```yaml
> wget  https://yu199195.github.io/jar/soul-admin.jar

> java -jar soul-admin.jar --spring.datasource.url="jdbc:mysql://yoururl:3306/soul?useUnicode=true&characterEncoding=utf-8&useSSL=false"  
  --spring.datasource.username='you username'  --spring.datasource.password='you password'
```
* Visit `http://localhost:9095/index.html ` default username：admin  password: 123456.

## Build your own gateway（recommend）

* First of all, create a new Spring Boot project, pls refer to soul-bootstrap, or visit Spring Initializr:[https://spring.io/quickstart]

* Add these JAR into your local Maven repository:
   
```xml
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

  <!--soul gateway start-->
  <dependency>
        <groupId>org.dromara</groupId>
        <artifactId>soul-spring-boot-starter-gateway</artifactId>
        <version>${last.version}</version>
  </dependency>
  
   <!--soul data sync start use websocket-->
   <dependency>
        <groupId>org.dromara</groupId>
        <artifactId>soul-spring-boot-starter-sync-data-websocket</artifactId>
        <version>${last.version}</version>
   </dependency>
```

* Add these config values into your `application.yaml`：
    
```yaml
  spring:
     main:
       allow-bean-definition-overriding: true
  
  management:
    health:
      defaults:
        enabled: false
  soul :
      sync:
          websocket :
               urls: ws://localhost:9095/websocket  //设置成你的soul-admin地址
```
* Environment Setup has finished, kick off your project.











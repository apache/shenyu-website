---
title: 自定义搭建网关
keywords: Apache ShenYu Deployment
description: 自定义搭建网关
---

本文介绍如何基于 `Apache ShenYu` 搭建属于你自己的网关。


### 启动Apache ShenYu Admin

* docker 用户参考 docker部署 Apache ShenYu Admin

* liunx/windows 用户参考源码部署 Apache ShenYu Admin

### 搭建自己的网关（推荐）

* 首先新建一个空的 `springboot` 项目，可以参考 `shenyu-bootstrap`， 也可以在 [spring 官网](https://spring.io/quickstart) 创建。

* 引入如下`jar`包：

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

    <!--shenyu gateway start-->
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-gateway</artifactId>
        <version>${project.version}</version>
    </dependency>
  
    <!--shenyu data sync start use websocket-->
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-sync-data-websocket</artifactId>
        <version>${project.version}</version>
    </dependency>
```

其中， `${project.version}` 请使用当前最新版本。

* 在你的 `application.yaml` 文件中加上如下配置：

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
    websocket :
      urls: ws://localhost:9095/websocket  //设置成你的 shenyu-admin 地址
```











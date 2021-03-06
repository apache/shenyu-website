---
title: use register center
keywords: soul
description: use register center
---

## Description

* register：service discover

* principle，please look：[register center design](../register-center-design)。

## HTTP register config

### Soul-Admin config

Add the config in your application.yml.

```yaml
soul:
  register:
    registerType: http
```

### integration server

Add the config in your application.yml.

- registerType : set http
- serverLists : Soul-Admin address list
- contextPath : your project's route prefix through soul gateway, such as /order ，/product etc，gateway will route based on it.
- appName : your project name,default value is the application name in dubbo config.
- port ： your project port number
- isFull : set true means providing proxy for your entire service, or only a few controller.

```yaml
soul:
  client:
    registerType: http
    serverLists: http://localhost:9095
    props:
      contextPath: /http
      appName: http
      port: 8188
      ifFull: false
```

## Zookeeper config
### Soul-Admin config
Add these dependencies in your local maven repository `pom.xml`:

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>soul-register-server-zookeeper</artifactId>
            <version>${project.version}</version>
        </dependency>
```

Add the config in your application.yml.

```yaml
soul:
  register:
    registerType: zookeeper
    serverLists : localhost:2181
    props:
      sessionTimeout: 5000
      connectionTimeout: 2000
```

### integration server

Add the config in your application.yml.

- registerType : set zookeeper
- serverLists : Zookeeper address list
- contextPath : your project's route prefix through soul gateway, such as /order ，/product etc，gateway will route based on it.
- appName : your project name,default value is the application name in dubbo config.
- port ： your project port number
- isFull : set true means providing proxy for your entire service, or only a few controller.

```yaml
soul:
  client:
    registerType: zookeeper
    serverLists: localhost:2181
    props:
      contextPath: /http
      appName: http
      port: 8188
      ifFull: false
```
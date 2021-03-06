---
title: 使用不同的注册中心
keywords: soul
description: 使用不同的注册中心
---

## 说明

* 注册中心：用于服务接入

* 实现原理，请看：[注册中心设计](../register-center-design)。

## HTTP配置
### Soul-Admin 配置
在application.yml进行配置，设置如下：

```yaml
soul:
  register:
    registerType: http
```

### 需要接入的服务配置
在application.yml进行配置，设置如下,不同类型的服务配置稍有差异，具体查看用户文档中各接入类型代理文档：

- registerType : 填写zookeeper
- serverLists : Soul-Admin的地址列表,多个地址之间用英文逗号分隔
- contextPath : 为你的这个项目在soul网关的路由前缀
- appName : 你的应用名称，不配置的话，会默认取配置中application 中的名称
- port ： 你本项目的启动端口
- isFull : 设置true 代表代理你的整个服务，false表示代理你其中某几个controller

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

## Zookeeper配置
### Soul-Admin配置
pom.xml 添加依赖

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>soul-register-server-zookeeper</artifactId>
            <version>${project.version}</version>
        </dependency>
```

在application.yml进行配置，设置如下：

```yaml
soul:
  register:
    registerType: zookeeper
    serverLists : localhost:2181
    props:
      sessionTimeout: 5000
      connectionTimeout: 2000
```

### 需要接入的服务配置
在application.yml进行配置，设置如下,不同类型的服务配置稍有差异，具体查看用户文档中各接入类型代理文档：

- registerType : 填写zookeeper
- serverLists : Zookeeper的地址列表,多个地址之间用英文逗号分隔
- contextPath : 为你的这个项目在soul网关的路由前缀
- appName : 你的应用名称，不配置的话，会默认取配置中application 中的名称
- port ： 你本项目的启动端口
- isFull : 设置true 代表代理你的整个服务，false表示代理你其中某几个controller

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
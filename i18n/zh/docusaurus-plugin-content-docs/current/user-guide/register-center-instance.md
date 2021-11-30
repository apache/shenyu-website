---
title: 注册中心配置
description: 注册中心配置
---

本篇将介绍如何将网关实例注册到注册中心。`Apache ShenYu` 网关目前支持注册到 `zookeeper`、`etcd`。

### 添加Maven依赖

首先，在网关的 `pom.xml` 文件中引入如下依赖。

```xml
<!--shenyu instance start-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-instance</artifactId>
    <version>${project.version}</version>
</dependency>
<!--shenyu instance end-->
```

### 使用zookeeper

在网关的 `yml` 文件中添加如下配置：
```yaml
instance:
    enabled: true
    registerType: zookeeper
    serverLists: localhost:2181 #配置成你的 zookeeper 地址，集群环境请使用（,）分隔
    props:
      sessionTimeout: 3000 #可选，默认3000
      connectionTimeout: 3000 #可选，默认3000
```
 
### 使用etcd

在网关的 `yml` 文件中添加如下配置：
```yaml
instance:
    enabled: true
    registerType: etcd
    serverLists: http://localhost:2379 #配置成你的 etcd 地址，集群环境请使用（,）分隔。
    props:
      etcdTimeout: 3000 #可选，默认3000
      etcdTTL: 5 #可选，默认5
```

> 配置完成后，启动网关，就会成功注册到相应注册中心。

---
title: 注册中心配置
description: 注册中心配置
---

本篇将介绍如何将网关实例注册到注册中心。`Apache ShenYu` 网关目前支持注册到 `zookeeper`、`etcd`。

### 添加Maven依赖

首先，在网关的 `pom.xml` 文件中引入如下依赖。

```xml
<!--shenyu registry start-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-registry</artifactId>
    <version>${project.version}</version>
</dependency>
<!--shenyu registry end-->
```

### 使用zookeeper

> 请注意，从 ShenYu 2.5.0 起将不再支持 Zookeeper 3.4.x 或更低版本。如果您已经使用了 Zookeeper 3.4.x 或更低的版本，您需要使用更高的 Zookeeper 版本并重新初始化数据。

在网关的 `yml` 文件中添加如下配置：

```yaml
registry:
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
registry:
    enabled: true
    registerType: etcd
    serverLists: http://localhost:2379 #配置成你的 etcd 地址，集群环境请使用（,）分隔。
    props:
      etcdTimeout: 3000 #可选，默认3000
      etcdTTL: 5 #可选，默认5
```

### 使用consul

在网关的 `yml` 文件中添加如下配置：

```yaml
registry:
    enabled: true
    registerType: consul
    serverLists: localhost:8848 #配置成你的 consul 地址，集群环境请使用（,）分隔。
    props:
      consulTimeout: 3000 #可选，默认3000
      consulTTL: 3000 #可选，默认3000
```

> 配置完成后，启动网关，就会成功注册到相应注册中心。

---
title: 注册中心设计
keywords: soul
description: 注册中心设计
---

## 说明

* 本篇主要讲解注册中心原理


### Client

![](/img/soul/register/client.png)

启动后使用SPI根据配置的注册方式加载相应的注册中心客户端（HTTP/Zookeeper等

在Spring容器加载过程中，将需要注册的服务数据放入Disruptor中

注册客户端收到注册数据，调用注册逻辑将服务注册到Soul-Admin

Disruptor在其中起数据与操作解耦的作用，利于扩展

### Server 

![](/img/soul/register/server.png)

Soul-Admin启动时，使用SPI更加配置的注册中心类型，启动加载相应的注册中心服务端（HTTP/Zookeeper等）

注册中心服务端接收到注册请求或者数据，将其放入Disruptor中

Disruptor消费者受到数据后，调用相应的服务注册处理逻辑

Disruptor在其中起到数据与操作解耦，利于扩展；同时比较注册请求过多，导致注册异常，有数据缓冲作用

## Http 注册

HTTP服务注册原理较为简单，在Soul-Client启动后，会调用Soul-Admin的相关服务注册接口，上传数据进行注册

Soul-Admin web服务接口收到请求后进行数据更新和数据同步事件发布

## Zookeeper 注册

Zookeeper存储结构如下：

```
soul
   ├──regsiter
   ├    ├──metadata
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────contextPath}
   ├    ├     ├               ├──${ruleName} : save metadata data of MetaDataRegisterDTO
   ├    ├──uri
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────contextPath}
   ├    ├     ├               ├──${ip:prot} : save uri data of URIRegisterDTO
   ├    ├     ├               ├──${ip:prot}
```

Zookeeper客户端在Soul-Client启动时，将注册的元数据MetaDataRegisterDTO写到zookeeper节点。

Soul-Admin会监听配置的节点，依赖于Zookeeper的Watch机制。

在收到MetaDataRegisterDTO节点变更后，触发selector和rule的数据变更和数据同步事件发布。

收到URIRegisterDTO节点变更后，触发selector的upstream的更新和数据同步事件发布。

## SPI 扩展

| *SPI 名称*                       | *详细说明*               |
| -------------------------------- | --------------------------- |
| SoulClientRegisterRepository     | Soul网关客户端接入注册服务资源      |

| *已知实现类*                      | *详细说明*               |
| -------------------------------- | --------------------------- |
| HttpClientRegisterRepository     | 基于Http请求的实现 |
| ZookeeperClientRegisterRepository| 基于Zookeeper注册的实现 |


| *SPI 名称*                       | *详细说明*                 |
| -------------------------------- | ----------------------------- |
| SoulServerRegisterRepository     | Soul网关客户端注册的后台服务资源      |

| *已知实现类*                       | *详细说明*                 |
| -------------------------------- | ----------------------------- |
| SoulHttpRegistryController       | 使用Http服务接口来处理客户端注册请求        |
| ZookeeperServerRegisterRepository| 使用Zookeeper来处理客户端注册节点 |
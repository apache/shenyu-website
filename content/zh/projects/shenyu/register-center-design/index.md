---
title: 注册中心设计
keywords: shenyu
description: 注册中心设计
---

## 说明

* 本篇主要讲解注册中心原理

## Client

![](/img/soul/register/client.png)

配置中声明使用的注册中心客户端类型，如HTTP/Zookeeper

应用程序启动时使用SPI方式加载并初始化对应注册中心客户端

通过实现Spring Bean相关的后处理器接口，在其中获取需要进行注册的服务接口信息，将获取的信息放入Disruptor中

注册中心客户端从Disruptor中读取数据，并将接口信息注册到Shenyu-Admin

Disruptor在其中起数据与操作解耦的作用，利于扩展

## Server 

![](/img/soul/register/server.png)

在Shenyu-Admin配置中声明使用的注册中心服务端类型，如HTTP/Zookeeper

Shenyu-Admin启动时，更加配置的类型，加载并初始化对应的注册中心服务端

注册中心服务端收到Shenyu-Client注册的接口信息后，将其放入Disruptor中，然后会触发注册处理逻辑，将服务接口信息更新并发布同步事件

Disruptor在其中起到数据与操作解耦，利于扩展；同时比较注册请求过多，导致注册异常，有数据缓冲作用

## Http 注册

HTTP服务注册原理较为简单，在Shenyu-Client启动后，会调用Shenyu-Admin的相关服务注册接口，上传数据进行注册

Shenyu-Admin web服务接口收到请求后进行数据更新和数据同步事件发布

## Zookeeper 注册

Zookeeper存储结构如下：

```
shenyu
   ├──regsiter
   ├    ├──metadata
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────${contextPath}
   ├    ├     ├               ├──${ruleName} : save metadata data of MetaDataRegisterDTO
   ├    ├──uri
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────${contextPath}
   ├    ├     ├               ├──${ip:prot} : save uri data of URIRegisterDTO
   ├    ├     ├               ├──${ip:prot}
```

Shenyu-Client启动时，将服务接口信息（MetaDataRegisterDTO/URIRegisterDTO）写到如上的zookeeper节点中。

Shenyu-Admin使用Zookeeper的Watch机制，对数据的更新和删除等事件进行监听，数据变更后触发对应的注册处理逻辑。

在收到MetaDataRegisterDTO节点变更后，触发selector和rule的数据变更和数据同步事件发布。

收到URIRegisterDTO节点变更后，触发selector的upstream的更新和数据同步事件发布。

## Etcd 注册

Etcd的键值存储结构如下：

```
shenyu
   ├──regsiter
   ├    ├──metadata
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────${contextPath}
   ├    ├     ├               ├──${ruleName} : save metadata data of MetaDataRegisterDTO
   ├    ├──uri
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────${contextPath}
   ├    ├     ├               ├──${ip:prot} : save uri data of URIRegisterDTO
   ├    ├     ├               ├──${ip:prot}
```

Shenyu-Client启动时，将服务接口信息（MetaDataRegisterDTO/URIRegisterDTO）以Ephemeral方式写到如上的Etcd节点中。

Shenyu-Admin使用Etcd的Watch机制，对数据的更新和删除等事件进行监听，数据变更后触发对应的注册处理逻辑。

在收到MetaDataRegisterDTO节点变更后，触发selector和rule的数据变更和数据同步事件发布。

收到URIRegisterDTO节点变更后，触发selector的upstream的更新和数据同步事件发布。

## Consul 注册

Consul的Metadata和URI分两部分存储，URIRegisterDTO随着服务注册记录在服务的metadata里，服务下线时随着服务节点一起消失。

![](/img/soul/register/Consul-ui.png)

Consul的MetaDataRegisterDTO存在Key/Value里，键值存储结构如下：

```
shenyu
   ├──regsiter
   ├    ├──metadata
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────${contextPath}
   ├    ├     ├               ├──${ruleName} : save metadata data of MetaDataRegisterDTO

```

Shenyu-Client启动时，将服务接口信息（MetaDataRegisterDTO/URIRegisterDTO）分别放在ServiceInstance的Metadata（URIRegisterDTO）和KeyValue（MetaDataRegisterDTO），按照上述方式进行存储。

Shenyu-Admin通过监听Catalog和KeyValue的index的变化，来感知数据的更新和删除，数据变更后触发对应的注册处理逻辑。

在收到MetaDataRegisterDTO节点变更后，触发selector和rule的数据变更和数据同步事件发布。

收到URIRegisterDTO节点变更后，触发selector的upstream的更新和数据同步事件发布。

## Nacos 注册

Nacos分为两部分：URI 和 Metadata。

URI 使用实例注册方式，在服务异常的情况下，相关URI数据节点会自动进行删除，并发送事件到订阅端，订阅端进行相关的下线处理。

Metadata 使用配置注册方式，没有相关上下线操作，当有URI实例注册时，会相应的发布Metadata配置，订阅端监听数据变化，进行更新处理。

URI 实例注册命令规则如下：

```
shenyu.register.service.${rpcType}
```

初始监听所有的RpcType节点，其下的{contextPath}实例会对应注册到其下，根据IP和Port进行区分，并携带其对应的contextPath信息。

URI 实例上下线之后，触发selector的upstream的更新和数据同步事件发布。

URI 实例上线时，会发布对应的 Metadata 数据，其节点名称命令规则如下：

```
shenyu.register.service.${rpcType}.${contextPath}
```

订阅端会对所有的Metadata配置继续监听，当初次订阅和配置更新后，触发selector和rule的数据变更和数据同步事件发布。

## SPI 扩展

| *SPI 名称*                       | *详细说明*               |
| -------------------------------- | --------------------------- |
| ShenyuClientRegisterRepository     | Shenyu网关客户端接入注册服务资源      |

| *已知实现类*                      | *详细说明*               |
| -------------------------------- | --------------------------- |
| HttpClientRegisterRepository     | 基于Http请求的实现 |
| ZookeeperClientRegisterRepository| 基于Zookeeper注册的实现 |
| EtcdClientRegisterRepository     | 基于etcd注册的实现 |
| ConsulClientRegisterRepository   | 基于consul注册的实现 |
| NacosClientRegisterRepository    | 基于Nacos注册的实现 |


| *SPI 名称*                       | *详细说明*                 |
| -------------------------------- | ----------------------------- |
| ShenyuServerRegisterRepository     | Shenyu网关客户端注册的后台服务资源      |

| *已知实现类*                       | *详细说明*                 |
| -------------------------------- | ----------------------------- |
| ShenyuHttpRegistryController       | 使用Http服务接口来处理客户端注册请求        |
| ZookeeperServerRegisterRepository| 使用Zookeeper来处理客户端注册节点 |
| EtcdServerRegisterRepository     | 使用etcd来处理客户端注册节点 |
| ConsulServerRegisterRepository   | 使用consul来处理客户端注册节点 |
| NacosServerRegisterRepository    | 使用Nacos来处理客户端注册节点 |

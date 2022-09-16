---
title: 客户端注册设计
keywords: ["客户端接入"]
description: 客户端接入原理
---

应用客户端接入是指将你的微服务接入到`Apache ShenYu`网关，当前支持`Http`、 `Dubbo`、 `Spring Cloud`、 `gRPC`、 `Motan`、 `Sofa`、 `Tars`等协议的接入。


将应用客户端接入到`Apache ShenYu`网关是通过注册中心来实现的，涉及到客户端注册和服务端同步数据。注册中心支持`Http`、`Zookeeper`、`Etcd`、`Consul`和`Nacos`。


<img src="/img/shenyu/register/register-center-dir-zh.png" width="70%" height="60%" />

客户端接入的相关配置请参考用户文档中的 [客户端接入配置](../user-guide/property-config/register-center-access.md) 。


## 设计原理

### 注册中心客户端

![](/img/shenyu/register/client.png)

在你的微服务配置中声明注册中心客户端类型，如`Http`或`Zookeeper`。
应用程序启动时使用`SPI`方式加载并初始化对应注册中心客户端，通过实现`Spring Bean`相关的后置处理器接口，在其中获取需要进行注册的服务接口信息，将获取的信息放入`Disruptor`中。

注册中心客户端从`Disruptor`中读取数据，并将接口信息注册到`shenyu-admin`，`Disruptor`在其中起数据与操作解耦的作用，利于扩展。

### 注册中心服务端

![](/img/shenyu/register/server.png)

在`shenyu-admin`配置中声明注册中心服务端类型，如`Http`或`Zookeeper`。当`shenyu-admin`启动时，读取配置类型，加载并初始化对应的注册中心服务端，注册中心服务端收到`shenyu-client`注册的接口信息后，将其放入`Disruptor`中，然后会触发注册处理逻辑，将服务接口信息更新并发布同步事件。

`Disruptor`在其中起到数据与操作解耦，利于扩展。如果注册请求过多，导致注册异常，也有数据缓冲作用。

### Http注册原理

`Http`服务注册原理较为简单，在`shenyu-client`启动后，会调用`shenyu-admin`的相关服务注册接口，上传数据进行注册。

`shenyu-admin` 收到请求后进行数据更新和数据同步事件发布，将接口信息同步到`Apache ShenYu`网关。

### Zookeeper注册原理

`Zookeeper`存储结构如下：

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

`shenyu-client`启动时，将服务接口信息（`MetaDataRegisterDTO/URIRegisterDTO`）写到如上的`zookeeper`节点中。

`shenyu-admin`使用`Zookeeper`的`Watch`机制，对数据的更新和删除等事件进行监听，数据变更后触发对应的注册处理逻辑。在收到`MetaDataRegisterDTO`节点变更后，触发`selector`和`rule`的数据变更和数据同步事件发布。收到`URIRegisterDTO`节点变更后，触发`selector`的`upstream`的更新和数据同步事件发布。

## Etcd注册原理

`Etcd`的键值存储结构如下：

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

`shenyu-client`启动时，将服务接口信息（`MetaDataRegisterDTO/URIRegisterDTO`）以`Ephemeral`方式写到如上的`Etcd`节点中。

`shenyu-admin`使用`Etcd`的`Watch`机制，对数据的更新和删除等事件进行监听，数据变更后触发对应的注册处理逻辑。在收到`MetaDataRegisterDTO`节点变更后，触发`selector`和`rule`的数据变更和数据同步事件发布。收到`URIRegisterDTO`节点变更后，触发`selector`的`upstream`的更新和数据同步事件发布。

## Consul注册原理

`Consul`的`Metadata`和`URI`分两部分存储，`URIRegisterDTO`随着服务注册记录在服务的`metadata`里，服务下线时随着服务节点一起消失。

`Consul`的`MetaDataRegisterDTO`存在`Key/Value`里，键值存储结构如下：

```
shenyu
   ├──regsiter
   ├    ├──metadata
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────${contextPath}
   ├    ├     ├               ├──${ruleName} : save metadata data of MetaDataRegisterDTO

```

`shenyu-client`启动时，将服务接口信息（`MetaDataRegisterDTO/URIRegisterDTO`）分别放在`ServiceInstance`的`Metadata`（`URIRegisterDTO`）和`KeyValue`（`MetaDataRegisterDTO`），按照上述方式进行存储。

`shenyu-admin`通过监听`Catalog`和`KeyValue`的`index`的变化，来感知数据的更新和删除，数据变更后触发对应的注册处理逻辑。在收到`MetaDataRegisterDTO`节点变更后，触发`selector`和`rule`的数据变更和数据同步事件发布。收到`URIRegisterDTO`节点变更后，触发`selector`的`upstream`的更新和数据同步事件发布。

## Nacos注册原理

`Nacos`注册分为两部分：`URI` 和 `Metadata`。`URI` 使用实例注册方式，在服务异常的情况下，相关`URI`数据节点会自动进行删除，并发送事件到订阅端，订阅端进行相关的下线处理。`Metadata` 使用配置注册方式，没有相关上下线操作，当有`URI`实例注册时，会相应的发布`Metadata`配置，订阅端监听数据变化，进行更新处理。

`URI`实例注册命令规则如下：

```
shenyu.register.service.${rpcType}
```

初始监听所有的`RpcType`节点，其下的`${contextPath}`实例会对应注册到其下，根据`IP`和`Port`进行区分，并携带其对应的`contextPath`信息。`URI` 实例上下线之后，触发`selector`的`upstream`的更新和数据同步事件发布。

`URI` 实例上线时，会发布对应的 `Metadata` 数据，其节点名称命令规则如下：

```
shenyu.register.service.${rpcType}.${contextPath}
```

订阅端会对所有的`Metadata`配置继续监听，当初次订阅和配置更新后，触发`selector`和`rule`的数据变更和数据同步事件发布。

### SPI扩展

| *SPI 名称*                       | *详细说明*               |
| -------------------------------- | --------------------------- |
| ShenyuClientRegisterRepository     | ShenYu网关客户端接入注册服务资源      |

| *已知实现类*                      | *详细说明*               |
| -------------------------------- | --------------------------- |
| HttpClientRegisterRepository     | 基于Http请求的实现 |
| ZookeeperClientRegisterRepository| 基于Zookeeper注册的实现 |
| EtcdClientRegisterRepository     | 基于Etcd注册的实现 |
| ConsulClientRegisterRepository   | 基于Consul注册的实现 |
| NacosClientRegisterRepository    | 基于Nacos注册的实现 |


| *SPI 名称*                       | *详细说明*                 |
| -------------------------------- | ----------------------------- |
| ShenyuServerRegisterRepository     | ShenYu网关客户端注册的后台服务资源      |

| *已知实现类*                       | *详细说明*                 |
| -------------------------------- | ----------------------------- |
| ShenyuHttpRegistryController       | 使用Http服务接口来处理客户端注册请求        |
| ZookeeperServerRegisterRepository| 使用Zookeeper来处理客户端注册节点 |
| EtcdServerRegisterRepository     | 使用Etcd来处理客户端注册节点 |
| ConsulServerRegisterRepository   | 使用Consul来处理客户端注册节点 |
| NacosServerRegisterRepository    | 使用Nacos来处理客户端注册节点 |


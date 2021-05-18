---
title: Register Center Design
keywords: shenyu
description: register center design
---

## Description

* This article mainly explains three ways of register center and their principles.

#### Client

![](/img/shenyu/register/client.png)

When client server start, the register center client will be loaded by spi.

Put data to Disruptor when spring bean load.

ShenYu register client get data from Disruptor, and it will send request to register server.

Disruptor can decouple data from operation and facilitate expansion.

#### Server 

![](/img/shenyu/register/server.png)

When Shenyu-Admin server start, register center server will be loaded by spi. Meanwile Disruptor will be inited too.

ShenYu register server get data from register client, and then put then to Disruptor.

Shenyu-Admin Disruptor consumer get data from register server by Disruptor queue,  then save them to database and publish data synchronize event.

Disruptor can decouple data from operation and buffering.


## Http Registry

Principle of http register center is simple

Call interface of register server when Shenyu-Client start.

Shenyu-Admin accept request, then save to database and publish data synchronize event.

## Zookeeper Registry

Zookeeper storage struct is:

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

Zookeeper register client will save data to zookeeper when shenyu client is started.

Zookeeper register server will keep watching the change of data node.

Trigger selector and rule data update and event will be published, when metadata data node update.

Trigger selector and upstream update and event will be published, when uri data node update.

## Etcd Registry

Etcd storage struct is:

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

Etcd register client will save data to etcd when shenyu client is started.

Etcd register server will keep watching the change of data node.

Trigger selector and rule data update and event will be published, when metadata data node update.

Trigger selector and upstream update and event will be published, when uri data node update.

## Consul Registry

Consul register client will save URIRegisterDTO to service instance metadata, and URIRegisterDTO will disappear with service unregister. 

![](/img/shenyu/register/Consul-ui.png)

And Consul register client will save MetaDataRegisterDTO to Key/Value store, storage struct is:

```
shenyu
   ├──regsiter
   ├    ├──metadata
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────${contextPath}
   ├    ├     ├               ├──${ruleName} : save metadata data of MetaDataRegisterDTO

```

Consul register client will save data to consul when shenyu client is started.

Consul register server will keep watching the change of data node.

Trigger selector and rule data update and event will be published, when metadata data node update.

Trigger selector and upstream update and event will be published, when uri data node update.

## Nacos Register

Nacos register have two parts：URI and Metadata。

URI is instance register. URI instance node will be deleted when server is down.

URI service's instance name will be named like below. Every URI instance has ip, port and contextPath as identifiers.

```
shenyu.register.service.${rpcType}
```

When URI instance up, it will publish metadata config. It's name like below.

```
shenyu.register.service.${rpcType}.${contextPath}
```

Trigger selector and upstream update and event will be published, when URI service up or down.

Trigger selector and rule data update and event will be published, when metadata config update.

## SPI

| *SPI Name*                       | *Description*               |
| -------------------------------- | --------------------------- |
| ShenyuClientRegisterRepository   | ShenYu client register SPI       |

| *Implementation Class*           | *Description*               |
| -------------------------------- | --------------------------- |
| HttpClientRegisterRepository     | Http client register repository |
| ZookeeperClientRegisterRepository| Zookeeper client register repository |
| EtcdClientRegisterRepository     | Etcd client register repository |
| ConsulClientRegisterRepository   | Consul client register repository |
| NacosClientRegisterRepository    | Nacos client register repository |


| *SPI Name*                       | *Description*                 |
| -------------------------------- | ----------------------------- |
| ShenyuServerRegisterRepository     | ShenYu server register SPI      |

| *Implementation Class*           | *Description*                 |
| -------------------------------- | ----------------------------- |
| ShenyuHttpRegistryController       | Http server repository        |
| ZookeeperServerRegisterRepository| Zookeeper server registry repository |
| EtcdServerRegisterRepository     | Etcd server registry repository |
| ConsulServerRegisterRepository   | Consul server registry repository |
| NacosServerRegisterRepository    | Nacos server registry repository |

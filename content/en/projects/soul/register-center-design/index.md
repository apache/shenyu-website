---
title: register center design
keywords: soul
description: register center design
---

## Description

* This article mainly explains three ways of register center and their principles.

### Client

![](/img/soul/register/client.png)

When client server start, load register center client by spi.

Put data to Disruptor when spring bean load.

Soul register client get data from Disruptor, send request to register server.

Disruptor can decouple data from operation and facilitate expansion.

### Server 

![](/img/soul/register/server.png)

When Soul-Admin server start, load register center server by spi. Disruptor inited.

Soul register server get data from register client, then put to Disruptor.

Soul-Admin Disruptor consumer get data of register server from Disruptor queue,  then save to database and publish data synchronize event.

Disruptor can decouple data from operation and buffering.


## Http Registry

Principle of http register center is simple

Call interface of register server when Soul-Client start.

Soul-Admin accept request,  then save to database and publish data synchronize event.

## Zookeeper Registry

Zookeeper storage struct is:

```
soul
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

Zookeeper register client will save data to zookeeper when soul client start.

Zookeeper register server will watch data node.

Trigger selector and rule data update and event publish, when metadata data node update.

Trigger selector and upstream update and event publish, when uri data node update.


## SPI

| *SPI Name*                       | *Description*               |
| -------------------------------- | --------------------------- |
| SoulClientRegisterRepository     | Soul client register SPI       |

| *Implementation Class*           | *Description*               |
| -------------------------------- | --------------------------- |
| HttpClientRegisterRepository     | Http client register repository |
| ZookeeperClientRegisterRepository| Zookeeper client register repository |


| *SPI Name*                       | *Description*                 |
| -------------------------------- | ----------------------------- |
| SoulServerRegisterRepository     | Soul server register SPI      |

| *Implementation Class*           | *Description*                 |
| -------------------------------- | ----------------------------- |
| SoulHttpRegistryController       | Http server repository        |
| ZookeeperServerRegisterRepository| Zookeeper server registry repository |

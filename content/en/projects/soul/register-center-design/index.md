---
title: register center design
keywords: soul
description: register center design
---

## Description

* This article mainly explains three ways of register center and their principles.


## Principle analysis
The registry is primarily used for dynamic discovery of services, and the registration flow chart is shown below

![register-center](https://gitee.com/free-love/SE-Notes/blob/master/profession/%E7%BC%96%E7%A8%8B%E7%B1%BB/%E5%BC%80%E6%BA%90/soul/picture/register-center.png)

### Client

When client server start, load register center client by spi. Distrupt inited.

Put data to distrupt when spring bean load.

Soul register client get data from distrupt, send request to register server.

distrupt can decouple data from operation and facilitate expansion.

### Server 

When Soul-Admin server start, load register center server by spi. Distrupt inited.

Soul register server get data from register client, then put to distrupt.

Soul-Admin distrupt consumer get data of register server from distrupt queue,  then save to database and publish data synchronize event.

distrupt can decouple data from operation and buffering.

## Http register center

Principle of http register center is simple

Call interface of register server when Soul-Client start.

Soul-Admin accept request,  then save to database and publish data synchronize event.

## Zookeeper register center

Zookeeper storage struct is:

```angular2html
/soul/register/metadata/{rpcTyep}/{contextPath}/{contextPath-rule}：save metadata data of MetaDataRegisterDTO

              /uri     /{rpcType}/{contextPath}/{ip:port}:save uri data of URIRegisterDTO
```

Zookeeper register client will save data to zookeeper when soul client start.

Zookeeper register server will watch data node.

Trigger selector and rule data update and event publish, when metadata data node update.

Trigger selector and upstream update and event publish, when uri data node update.
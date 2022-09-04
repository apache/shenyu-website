---
title: Client Property Config
keywords: ["Config"]
description: Client Property Config
---

This paper mainly explains how to configure the properties of Apache ShenYu when the client accesses the gateway.


Set the `shenyu` property in your microservice, for example, in [shenyu-examples-http](https://github.com/apache/shenyu/tree/v2.4.2/shenyu-examples/shenyu-examples-http) :

<img src="/img/shenyu/config/shenyu_client_application_config.png" width="80%" height="70%" />

### Property Config

```yaml
shenyu:
  client:
    registerType: http #zookeeper #etcd #nacos #consul
    serverLists: http://localhost:9095 #localhost:2181 #http://localhost:2379 #localhost:8848
    props:
      contextPath: /http
      appName: http
      port: 8189
      nacosNameSpace: ShenyuRegisterCenter

```


### Property Detail

##### shenyu.client config

This section describes configurations related to client access. For details about client access principles, see: [Application Client Access](../../design/register-center-design) , for client access configuration, see: [Application Client Access Config](../register-center-access) .



|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|registerType                   |String |  http      | Yes     | Which mode to use for registry. Currently, http, zookeeper, etcd, consul and nacos are supported.|
|serverLists                |String |  null    |  No  |Configure the address of the registry. In clustering, multiple addresses are separated by commas (,).|
|props    | | |   | The value of the property varies according to the registerType.|



- `props` config

When microservices are built by different protocols, the property configuration is slightly different. The general attributes are as follows:



|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|contextPath                   |String |  null      | Yes     |The route prefix of the microservice in the gateway.|
|appName                |String |  null    |  Yes  |microservice name. `springcloud` service don't set, please set `spring.application.name`.|
|host    |String | null | Yes  | microservice address|
|port    |int | null | Yes  | microservice port|
|isFull    |boolean | false | No  | Whether to proxy the all service, currently just applies to `springmvc`/ `springcloud`|
|ipAndPort    |String | null | No  | Service IP and port address, currently just applies to `gRPC` Proxy.|
|shutdownWaitTime    |int | 3000 | No  | shutdown wait time(millisecond)|
|delayOtherHooksExecTime    |int | 2000 | No  | `hook` execute time(millisecond)|
|applicationShutdownHooksClassName    |String | `java.lang.ApplicationShutdownHooks` | No  | `hook` execute class name|
|applicationShutdownHooksFieldName    |String | `hooks` | No  | `hook` execute field name |


The value of the property varies according to the `registerType`.

When the registerType is `nacos`, there has no other properties.



When the registerType is `zookeeper`, the supported properties are as follows.

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|sessionTimeout                   | int |  30000      | No     |session time out(millisecond)|
|connectionTimeout                | int |  3000    |  No  |connection time out(millisecond)|

When the registerType is `etcd`, the supported properties are as follows.

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|etcdTimeout                   | int |  30000      | No     |etcd time out(millisecond)|
|etcdTTL                | int |  5    |  No  |client lease time to live(second)|

When the registerType is `nacos`, the supported properties are as follows.

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|nacosNameSpace            | String |  null      | Yes     |namespace  |
|username                | String | ""   |  No  |username|
|password                | String |  ""    |  No  |password|
|accessKey                | String |  ""    |  No  |accessKey|
|secretKey                | String |  ""    |  No  |secretKey|


When the registerType is `consul`, no other property configuration is provided. please set `spring.cloud.consul` for the configuration.

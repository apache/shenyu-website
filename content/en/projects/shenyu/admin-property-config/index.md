---
title: Admin Property Config
keywords: Apache ShenYu
description: Admin Property Config
---

This paper mainly explains how to configure Apache ShenYu properties on the admin side.

<img src="/img/shenyu/config/shenyu_admin_application_config.png" width="80%" height="70%" />

### Property Config

```yaml
shenyu:
  register:
    registerType: http #http #zookeeper #etcd #nacos #consul
    serverLists: #localhost:2181 #http://localhost:2379 #localhost:8848
    props:
      sessionTimeout: 5000
      connectionTimeout: 2000
      checked: true
      zombieCheckTimes: 5
      scheduledTime: 10
      nacosNameSpace: ShenyuRegisterCenter
  database:
    dialect: mysql
    init_script: "META-INF/schema.sql"
    init_enable: true
  sync:
    websocket:
      enabled: true
#      zookeeper:
#        url: localhost:2181
#        sessionTimeout: 5000
#        connectionTimeout: 2000
#      http:
#        enabled: true
#      nacos:
#        url: localhost:8848
#        namespace: 1c10d748-af86-43b9-8265-75f487d20c6c
#        username:
#        password:
#        acm:
#          enabled: false
#          endpoint: acm.aliyun.com
#          namespace:
#          accessKey:
#          secretKey:
#    etcd:
#      url: http://localhost:2379
#    consul:
#      url: http://localhost:8500
  aes:
    secret:
      key: 2095132720951327
      iv: 6075877187097700
  ldap:
    enabled: false
    url: ldap://xxxx:xxx
    bind-dn: cn=xxx,dc=xxx,dc=xxx
    password: xxxx
    base-dn: ou=xxx,dc=xxx,dc=xxx
    object-class: person
    login-field: cn
  jwt:
    expired-seconds: 86400000
  shiro:
    white-list:
      - /
      - /favicon.*
      - /static/**
      - /index**
      - /plugin
      - /platform/**
      - /websocket
      - /configs/**
      - /shenyu-client/**
      - /error
      - /actuator/health
      - /swagger-ui.html
      - /webjars/**
      - /swagger-resources/**
      - /v2/api-docs
      - /csrf
  swagger:
    enable: true

```


### Property Detail

##### shenyu.register config


This section describes configurations related to client access. For details about client access principles, see: [Application Client Access](../register-center-design) , for client access configuration, see: [Application Client Access Config](../register-center-access) .

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|registerType                   |String |  http      | Yes     | Which mode to use for registry. Currently, http, zookeeper, etcd, consul and nacos are supported.|
|serverLists                |String |  null    |  No  |Configure the address of the registry. If `http` is used, you do not need to enter this parameter. In clustering, multiple addresses are separated by commas (,).|
|props    | | |   | The value of the property varies according to the registerType.|



- `props` config

The value of the attribute varies according to the registerType.

When the registerType is `http`, the supported properties are as follows.


|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|checked                   |boolean |  false      | No     |is checked|
|zombieCheckTimes                |int |  5    |  No  |how many times does it fail to detect the service.|
|scheduledTime    |int | 10 | No  | timed detection interval time|

When the registerType is `zookeeper`, the supported properties are as follows.

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|sessionTimeout                   | int |  30000      | No     |session timeout(millisecond)|
|connectionTimeout                | int |  3000    |  No  |connection timeout(millisecond)|

When the registerType is `etcd`, no properties are provided for the time being.

When the registerType is `nacos`, the supported properties are as follows.

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|nacosNameSpace            | String |  null      | Yes     |namespace|
|username                | String | ""   |  No  |username|
|password                | String |  ""    |  No  |password|
|accessKey                | String |  ""    |  No  |accessKey|
|secretKey                | String |  ""    |  No  |secretKey|

When the registerType is `consul`, the supported properties are as follows.

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|delay            | int |  1      | No     |The interval of each polling of monitoring metadata, in seconds, the default value is 1 second.|
|wait-time                | int | 55   |  No  |# wait-time: The waiting time for each polling of metadata monitoring, in seconds, the default value is 55 second .|
|metadata-path                | String |  `shenyu/register`    |  No  |Metadata path name, default is `shenyu/register`.|


##### shenyu.database config

Database configuration when `shenyu-admin` is started.


|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|dialect            | String |  h2      | No     |which database is used when admin is started.|
|init_script               | String | `META-INF/schema.h2.sql`   |  No  |database initialization script.|
|init_enable                | boolean |  true    |  No  |whether to initialize.|


##### shenyu.sync config

The Admin System and the Apache ShenYu gateway use data synchronization configurations.


The following properties are configured for data synchronization using `websocket` :

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|enabled                | boolean |  true    |  No  |whether to enable websocket for data synchronization.|

The following properties are configured for data synchronization using `zookeeper` :


|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|url                | String |  null    |  Yes  |zookeeper server url|
|sessionTimeout                | int |  null    |  Yes  |session timeout(millisecond)|
|connectionTimeout                | int |  null    |  Yes  |connection timeout(millisecond)|


The following properties are configured for data synchronization using `http long polling` :

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|enabled                | boolean |  true    |  No |whether to enable.|
|refreshInterval                | int |  5(minute)    |  No  |Periodically fetch data from the database and load it into memory.|
|notifyBatchSize                | int |  100    |  No  |notify clients in batches|


The following properties are configured for data synchronization using `nacos` :

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|url                | String |  null    | 是 |nacos url|
|namespace                | String |  null    |  Yes  |namespace|
|username                | String |  null   |  No  |username|
|password                | String |  null    |  No  |password|
|acm                |    |        |  No  |aliyun ACM service configuration|

- `acm` config

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|enabled                | boolean |  false    |  No |whether to enable|
|endpoint                | String |  null    |  No  |ACM service address|
|namespace                | String |  null    |  No  |namespace|
|accessKey                | String |  null    |  No  |accessKey|
|secretKey                | String |  null    |  No  |secretKey|


The following properties are configured for data synchronization using `etcd` :

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|url                | String |  null    | Yes |etcd url|



The following properties are configured for data synchronization using `consul` :

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|url                | String |  null    | Yes |consul url|


##### shenyu.aes.secret config

aes secret properties: 


|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|key | String |  `2095132720951327`    |  No  |key|
|iv | String |  null    |  No  |iv|


##### shenyu.ldap config

Spring ldap properties:


|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|enabled | boolean |  true    |  No  |whether to enable|
|url | String |  null    |  No  |ldap url|
|bind-dn | String |  null    |  No  | UserDn |
|password | String |  null    |  No  |password|
|base-dn | String |  null    |  No  | searchBase |
|object-class | String |  `person`    |  No  | filter |
|login-field | String |  `cn`    |  No  | searchBase|
|connectTimeout | int |  3000   |  No  |connect timeout(millisecond)|
|readTimeout | int |  3000     |  No  |read timeout(millisecond)|


##### shenyu.jwt config

`jwt` properties:


|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| expired-seconds | long |  24 * 60 * 60 * 1000L    |  No  |expiration time(millisecond)|


##### shenyu.shiro config

`shiro` properties:


|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| white-list | List |  null  | No  |white list|
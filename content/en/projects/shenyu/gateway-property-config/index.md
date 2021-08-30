---
title: Gateway Property Config
keywords: Apache ShenYu
description: Gateway Property Config
---

This paper mainly explains how to configure `Apache ShenYu` properties on the gateway side.

<img src="/img/shenyu/config/shenyu_gateway_application_config.jpg" width="80%" height="70%" />

### Property Config

```yaml
shenyu:
  file:
    enabled: true
  cross:
    enabled: true
  exclude:
    enabled: false
    paths:
      - /favicon.ico
  sync:
    websocket:
      urls: ws://localhost:9095/websocket
#    zookeeper:
#      url: localhost:2181
#      sessionTimeout: 5000
#      connectionTimeout: 2000
#    http:
#      url: http://localhost:9095
#    nacos:
#      url: localhost:8848
#      namespace: 1c10d748-af86-43b9-8265-75f487d20c6c
#      username:
#      password:
#      acm:
#        enabled: false
#        endpoint: acm.aliyun.com
#        namespace:
#        accessKey:
#        secretKey:
#    etcd:
#      url: http://localhost:2379
#    consul:
#      url: http://localhost:8500
#      waitTime: 1000
#      watchDelay: 1000
```


### Property Detail

##### Filter Configuration

- `shenyu.file` config

File filter properties: 

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| enabled | Boolean |  false  |    No    | enable file size filtering |




- `shenyu.cross` config

Cross filter properties: 


|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| enabled | Boolean |  false  |    No    | allow cross-domain requests |



- `shenyu.exclude` config

Exculde filter properties: 

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| enabled | Boolean |  false  |    No    | whether to enable `exclude filter` and reject the specified request to pass through the gateway |
| paths   | Array   |  null   |   Yes    | Requests matching this list can not pass through the gateway (support Path-Matching) |



##### shenyu.sync config

The Apache ShenYu gateway and the Admin System use data synchronization configurations.


The following properties are configured for data synchronization using `websocket` :

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| urls | String |  null   |   Yes    | The websocket server address of `Admin`, separate multiple addresses with `,` |



The following properties are configured for data synchronization using `zookeeper` :


|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|url                | String |  null    |  Yes  |zookeeper server url|
|sessionTimeout                | int |  null    |  Yes  |session timeout (millisecond)|
|connectionTimeout                | int |  null    |  Yes  |connection timeout (millisecond)|



The following properties are configured for data synchronization using `http long polling` :

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| url  | String |  null   |   Yes    | `Admin` server address |



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
|url                | String |  null    | Yes |`etcd` server url|



The following properties are configured for data synchronization using `consul` :

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|url                | String |  null    | Yes |`consul` server url|
| waitTime   | int    |  null   |   Yes    | the timeout period for requesting consul service to pull configuration information (milliseconds) |
|watchDelay | int | null | Yes |Synchronization interval (milliseconds)|

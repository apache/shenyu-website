---
title: Gateway Property Config
keywords: ["Config"]
description: Gateway Property Config
---

This paper mainly explains how to configure `Apache ShenYu` properties on the gateway side.

<img src="/img/shenyu/config/shenyu_gateway_application_config.jpg" width="80%" height="70%" />

### Property Config

```yaml
shenyu:
  httpclient:
    strategy: webClient
    connectTimeout: 45000
    readTimeout: 3000
    writeTimeout: 3000
    wiretap: false
    pool:
      type: ELASTIC
      name: proxy
      maxConnections: 16
      acquireTimeout: 45000
    proxy:
      host:
      port:
      username:
      password:
      nonProxyHostsPattern:
    ssl:
      useInsecureTrustManager: false
      trustedX509Certificates:
      handshakeTimeout: 10000
      closeNotifyFlushTimeout: 3000
      closeNotifyReadTimeout: 0
      defaultConfigurationType: TCP
  cross:
    enabled: true
    allowedHeaders:
    allowedMethods: "*"
    allowedOrigin: "*"
    allowedExpose: "*"
    maxAge: "18000"
    allowCredentials: true
  switchConfig:
    local: true
  file:
    enabled: true
    maxSize : 10
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
  exclude:
    enabled: false
    paths:
      - /favicon.ico
  extPlugin:
    path:
    enabled: true
    threads: 1
    scheduleTime: 300
    scheduleDelay: 30
  scheduler:
    enabled: false
    type: fixed
    threads: 16
  upstreamCheck:
    enabled: false
    timeout: 3000
    healthyThreshold: 1
    unhealthyThreshold: 1
    interval: 5000
    printEnabled: true
    printInterval: 60000

```

### Property Detail

##### shenyu.httpclient config

This is the HttpClient configuration used to send proxy requests after proxying the Http and SpringCloud protocols in the `ShenYu` gateway.

| Name           |  Type   |    Default    | Required | Description                                                  |
| :------------- | :-----: | :-----------: | :------: | :----------------------------------------------------------- |
| strategy       | String  | webcwebClient |    No    | The strategy of httpClientPlugin                             |
| connectTimeout |   int   |     45000     |    No    | Connection timeout (millisecond), the default value is 45000. |
| readTimeout    |   int   |     3000      |    No    | Read timeout (millisecond), the default value is 3000.       |
| writeTimeout   |   int   |     3000      |    No    | Write timeout (millisecond), the default value is 3000.      |
| wiretap        | Boolean |     false     |    No    | Enables wiretap debugging for Netty HttpClient, the default value is 'false'. |
| pool           |         |               |          | HttpClient connection pool config                            |
| proxy          |         |               |          | HttpClient proxy config                                      |
| ssl            |         |               |          | HttpClient ssl config                                        |

- `pool` config

HttpClient connection pool configuration:

| Name           |  Type  |              Default              | Required | Description                                                  |
| :------------- | :----: | :-------------------------------: | :------: | :----------------------------------------------------------- |
| type           | String |              ELASTIC              |    No    | Type of pool for HttpClient to use, defaults to ELASTIC.<br /> - ELASTIC: The connection pool can be cached and grown on demand<br />- FIXED: The connection pool cache and reuse a fixed maximum The number of connections.<br />- DISABLED: The connection pool will always create a new connection. |
| name           | String |               proxy               |    No    | The channel pool map name, defaults to proxy.                |
| maxConnections |  int   | the maximum value of 2*CPU and 16 |    No    | Only for type FIXED, the maximum number of connections before starting pending acquisition on existing ones.<br />the default value is available number of processors*2. <br /> (but with a minimum value of 16) |
| acquireTimeout |  int   |               45000               |    No    | Only for type FIXED, the maximum time in millis to wait for aquiring. the default value is 45000 |

- `proxy` config

Netty HttpClient proxy configuration:

| Name                 |  Type  | Default | Required | Description                                                  |
| :------------------- | :----: | :-----: | :------: | :----------------------------------------------------------- |
| host                 | String |  null   |    No    | Hostname for proxy configuration of Netty HttpClient.        |
| port                 | String |  null   |    No    | Port for proxy configuration of Netty HttpClient.            |
| username             | String |  null   |    No    | Username for proxy configuration of Netty HttpClient.        |
| password             | String |  null   |    No    | Password for proxy configuration of Netty HttpClient.        |
| nonProxyHostsPattern | String |  null   |    No    | Regular expression (Java) for a configured list of hosts. that should be reached directly, bypassing the proxy |

- `SSL` config

Gateway routing can support routing to http and https back-end services at the same time. The following is the SSL-related configuration:

| Name                     |  Type   | Default | Required | Description                                                  |
| :----------------------- | :-----: | :-----: | :------: | :----------------------------------------------------------- |
| useInsecureTrustManager  | Boolean |  false  |    No    | Installs the netty InsecureTrustManagerFactory. This is insecure and not suitable for production. |
| trustedX509Certificates  | String  |  Null   |    No    | Trusted certificates for verifying the remote endpoint's certificate.(Use `,` to separate multiple values) |
| handshakeTimeout         |   int   |  10000  |    No    | SSL handshake timeout. Default to 10000 ms                   |
| closeNotifyFlushTimeout  |   int   |  3000   |    No    | SSL close_notify flush timeout. Default to 3000 ms.          |
| closeNotifyReadTimeout   |   int   |    0    |    No    | SSL close_notify read timeout. Default to 0 ms.              |
| defaultConfigurationType | String  |   TCP   |    No    | The default ssl configuration type. Defaults to TCP.<br />- H2: SslProvider will be set depending on OpenSsl.isAlpnSupported(), SslProvider.HTTP2_CIPHERS, ALPN support, HTTP/1.1 and HTTP/2 support.<br />- TCP: [`SslProvider`](https://netty.io/4.1/api/io/netty/handler/ssl/SslProvider.html?is-external=true) will be set depending on `OpenSsl.isAvailable()`<br />- NONE: There will be no default configuration |



##### Filter Configuration

- `shenyu.cross` config

Cross-domain configuration: 

| Name             | Type    | Default | Required | Description                                                  |
| :--------------- | :------ | :-----: | :------: | :----------------------------------------------------------- |
| enabled          | Boolean |  false  |    No    | Whether to support cross-domain requests                     |
| allowedHeaders   | String  |  Null   |    No    | Used to set response header parameters <br />`Access-Control-Allow-Headers`(Comma-separated)<br />The following fields are included by default:<br />x-requested-with<br />authorization<br />Content-Type<br />Authorization<br />credential<br />X-XSRF-TOKEN<br />token<br />username<br />client |
| allowedMethods   | String  |   `*`   |    No    | Used to set response header parameters<br />`Access-Control-Allow-Methods`(Comma-separated)<br />The default value is `*` |
| allowedOrigin    | String  |   `*`   |    No    | Used to set response header parameters<br />`Access-Control-Allow-Origin`(Comma-separated)<br />The default value is `*` |
| allowedExpose    | String  |   `*`   |    No    | Used to set response header parameters<br />`Access-Control-Expose-Headers`(Comma-separated)<br />The default value is  `*` |
| maxAge           | int     |  18000  |    No    | Used to set response header parameters<br />`Access-Control-Max-Age`，The default value is `18000` |
| allowCredentials | Boolean |  true   |    No    | Used to set response header parameters<br />`Access-Control-Allow-Credentials`(Comma-separated)<br />The default value is `true` |



- `shenyu.switchConfig` config

Local request filter configuration: 

| Name  | Type    | Default | Required | Description                                                  |
| :---- | :------ | :-----: | :------: | :----------------------------------------------------------- |
| local | Boolean |  true   |    No    | After opening, the request whose path match `/shenyu/**` will not be proxied, but will be processed by the gateway's controller. |



- `shenyu.file` config

File filter properties: 

| Name    | Type    | Default | Required | Description                |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| enabled | Boolean | false  |    No    | Whether to enable file size filtering |
| maxSize | int     |   Null   |    Yes    | Maximum allowable file transfer size (MB) |



- `shenyu.exclude` config

Exculde filter properties: 

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| enabled | Boolean |  false  |    No    | whether to enable `exclude filter` and reject the specified request to pass through the gateway |
| paths   | Array   |  null   |   Yes    | Requests matching this list can not pass through the gateway (support Path-Matching) |



- `shenyu.extPlugin` config

Plug-in hot loading configuration: 

| Name          | Type    | Default | Required | Description                                                  |
| :------------ | :------ | :-----: | :------: | :----------------------------------------------------------- |
| enabled       | Boolean |  true   |    No    | Whether to enable plug-in hot reloading, enabled by default  |
| path          | String  |  Null   |   Yes    | Plug-in path, please put the plug-in in the `/ext-lib` folder under this path |
| threads       | int     |    1    |    No    | Plug-in check thread number, the default value is `1`        |
| scheduleTime  | int     |   300   |    No    | Plug-in check interval (seconds), the default value is 300 seconds |
| scheduleDelay | int     |   30    |    No    | The first check delay time after startup (seconds), the default value is 30 seconds |



- `shenyu.scheduler` config

Plug-in chain thread pool configuration: 

| Name    | Type    |                 Default                  | Required | Description                                                  |
| :------ | :------ | :--------------------------------------: | :------: | :----------------------------------------------------------- |
| enabled | Boolean |                   true                   |    No    | Whether to customize the plug-in chain thread pool, it is closed by default |
| type    | String  |                 `fixed`                  |    No    | Plug-in chain thread pool type: <br />- fixed: Fixed thread number of thread pool<br />- elastic: Create a reusable unbounded thread pool |
| threads | int     | 2*CPU+1 or 16 (whichever is the largest) |    No    | When the thread pool type is `fixed`, specify the maximum number of threads, the default value is `2*CPU+1 or 16 (whichever is the maximum)` |



- `shenyu.upstreamCheck` config

Health check related configuration, check upstream services regularly, and eliminate abnormal nodes: 

| Name               | Type    | Default | Required | Description                                                  |
| :----------------- | :------ | :-----: | :------: | :----------------------------------------------------------- |
| enabled            | Boolean |  false  |    No    | Whether to enable health check, it is disabled by default    |
| timeout            | int     |  3000   |    No    | Upstream check timeout                                       |
| healthyThreshold   | int     |    1    |    No    | If the check is passed `N` consecutive times, it is a health service. The default value is 1 |
| unhealthyThreshold | int     |    1    |    No    | If the check fails for `N` consecutive times, it is an unhealthy service. The default value is 1 |
| interval           | int     |  5000   |    No    | Health check interval (milliseconds), the default value is 5000 |
| printEnabled       | Boolean |  true   |    No    | Whether to print the health service address, it is enabled by default |
| printInterval      | int     |  60000  |    No    | The interval of printing of health service addresses (milliseconds), the default value is 60000 |



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


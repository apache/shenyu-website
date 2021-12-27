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
  netty:
    tcp:
      webServerFactoryEnabled: true
      selectCount: 1
      workerCount: 4
      serverSocketChannel:
        soRcvBuf: 87380
        soBackLog: 128
        soReuseAddr: false
        connectTimeoutMillis: 10000
        writeBufferHighWaterMark: 65536
        writeBufferLowWaterMark: 32768
        writeSpinCount: 16
        autoRead: true
        allocType: "pooled"
      socketChannel:
        soKeepAlive: false
        soReuseAddr: false
        soLinger: -1
        tcpNoDelay: true
        soRcvBuf: 87380
        soSndBuf: 16384
        ipTos: 0
        allowHalfClosure: false
        connectTimeoutMillis: 10000
        writeBufferHighWaterMark: 65536
        writeBufferLowWaterMark: 32768
        writeSpinCount: 16
        autoRead: true
        allocType: "pooled"
  instance:
    enabled: false
    registerType: zookeeper #etcd #consul
    serverLists: localhost:2181 #http://localhost:2379 #localhost:8848
    props:
#  httpclient:
#    strategy: webClient
#    connectTimeout: 45000
#    readTimeout: 3000
#    writeTimeout: 3000
#    wiretap: false
#    pool:
#      type: ELASTIC
#      name: proxy
#      maxConnections: 16
#      acquireTimeout: 45000
#    proxy:
#      host:
#      port:
#      username:
#      password:
#      nonProxyHostsPattern:
#    ssl:
#      useInsecureTrustManager: true
#      keyStoreType: PKCS12
#      keyStorePath: classpath:keystore.p12
#      keyStorePassword: 123456
#      keyPassword: 123456
#      trustedX509Certificates:
#      handshakeTimeout:
#      closeNotifyFlushTimeout:
#      closeNotifyReadTimeout:
#      defaultConfigurationType:
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

##### shenyu.NettyTcpProperties config

`ShenYu` Netty config

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|webServerFactoryEnabled | Boolean | true | No | Whether to enable custom parameters. True-enable. False-NettyReactiveWebServerFactory Can be configured by yourself. |
| selectCount | Integer |  1  |    No    | Number of netty selectors. |
| workerCount | Integer | 4 | No | Number of netty workers. |
| **ServerSocketChannelConfig** |  |  |  |  |
| soRcvBuf                      | Integer |  87380  |    No    | Socket config, the size of the socket receive buffer.        |
| soBackLog                     | Integer |   128   |    No    | Socket config, maximum length of the accept queue.           |
| soReuseAddr                   | Boolean |  false  |    No    | Socket config, allow reuse of local addresses.               |
| connectTimeoutMillis          | Integer |  10000  |    No    | Netty config, the connect timeout of the channel in milliseconds. |
| writeBufferHighWaterMark      | Integer |  65536  |    No    | Netty config, the high water mark of the write buffer.       |
| writeBufferLowWaterMark       | Integer |  32768  |    No    | Netty config, the low water mark of the write buffer.        |
| writeSpinCount | Integer | 16 | No | Netty config, the maximum loop count for a write operation. |
| autoRead | Boolean | true | No | Netty config,  channel read method will be invoked automatically so that a user application doesn't need to call it at all. |
| allocType                     | String  | pooled  |    No    | Netty config, set the ByteBufAllocator which is used for the channel to allocate buffers. |
| **SocketChannelConfig** |  |  |  |  |
| soKeepAlive | Boolean | false | No | Socket config, enable tcp keepalive. |
| soReuseAddr | Boolean | false | No | Socket config, allow reuse of local addresses. |
| soLinger | Integer | -1 | No | Socket config, the delay time for closing the socket. |
| tcpNoDelay | Boolean | true | No | Socket config, enable Nagle algorithm. |
| soRcvBuf | Integer | 87380 | No | Socket config, the size of the socket receive buffer. |
| soSndBuf | Integer | 128 | No | Socket config, the size of the socket send buffer. |
| ipTos | Integer | 0 | No | IP config, the Type of Service (ToS) octet in the Internet Protocol (IP) header. |
| allowHalfClosure | Boolean | false | No | Netty config, Sets whether the channel should not close itself when its remote peer shuts down output to make the connection half-closed. |
| connectTimeoutMillis | Integer | 10000 | No | Netty config, the connect timeout of the channel in milliseconds. |
| writeBufferHighWaterMark | Integer | 65536 | No | Netty config, the high water mark of the write buffer. |
| writeBufferLowWaterMark | Integer | 32768 | No | Netty config, the low water mark of the write buffer. |
| writeSpinCount | Integer | 16 | No | Netty config, the maximum loop count for a write operation. |
| autoRead | Boolean | true | No | Netty config,  channel read method will be invoked automatically so that a user application doesn't need to call it at all. |
| allocType | String | pooled | No | Netty config, set the ByteBufAllocator which is used for the channel to allocate buffers. |

##### shenyu.instance config

This is the relevant configuration for the `ShenYu` gateway to register to the registration center. For the configuration of the registration center, please refer to [Register Center Instance Config](../register-center-instance.md).

| Name         |  Type   |    Default     | Required | Description                                                  |
| :----------- | :-----: | :------------: | :------: | :----------------------------------------------------------- |
| enabled      | boolean |     false      |   Yes    | Whether to start                                             |
| registerType | String  |   zookeeper    |   Yes    | Which registry to use, currently supports zookeeper, etcd    |
| serverLists  | String  | localhost:2181 |   Yes    | The address of the register center. If using clusters, separate with `,` |
| props        |         |                |          | When using different register types, the attribute values are different. |

- `props` config

When using different register center, the attribute values are different.

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
| keyStoreType             | String  |  PKCS12 |    No    | SSL key store type. |
| keyStorePath             | String  |         |    No    | SSL key store path.|
| keyStorePassword         | String  |         |    No    | SSL key store pass word. |
| keyPassword              | String  |         |    No    | SSL key pass word. |
| trustedX509Certificates  | String  |  Null   |    No    | Trusted certificates for verifying the remote endpoint's certificate.(Use `,` to separate multiple values) |
| handshakeTimeout         |   int   |  10000  |    No    | SSL handshake timeout. Default to 10000 ms                   |
| closeNotifyFlushTimeout  |   int   |  3000   |    No    | SSL close_notify flush timeout. Default to 3000 ms.          |
| closeNotifyReadTimeout   |   int   |    0    |    No    | SSL close_notify read timeout. Default to 0 ms.              |
| defaultConfigurationType | String  |   TCP   |    No    | The default ssl configuration type. Defaults to TCP.<br />- H2: SslProvider will be set depending on OpenSsl.isAlpnSupported(), SslProvider.HTTP2_CIPHERS, ALPN support, HTTP/1.1 and HTTP/2 support.<br />- TCP: [`SslProvider`](https://netty.io/4.1/api/io/netty/handler/ssl/SslProvider.html?is-external=true) will be set depending on `OpenSsl.isAvailable()`<br />- NONE: There will be no default configuration |


##### Filter Configuration

- `shenyu.file` config

File filter properties: 

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| enabled | Boolean |  false  |    No    | enable file size filtering |
| maxSize | Integer |  10  |    No    | upload file maxSize （MB） |


- `shenyu.cross` config

Cross filter properties: 


|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| enabled | Boolean |  false  |    No    | allow cross-domain requests |
| allowedHeaders | String | x-requested-with, authorization, Content-Type, Authorization, credential,  X-XSRF-TOKEN, token, username, client |    No    | allowedHeaders, Use "," split in multiple cases. the new "allowedHeaders" will append to "Access-Control-Allow-Headers" based on the default value and remove the reduplicative header. |
| allowedMethods | String |   "*"  |    No    | allowedMethods |
| allowedOrigin | String |  "*"  |    No    | allowedOrigin，if the value is empty, use `request.getHeaders().getOrigin()` set to `Access-Control-Allow-Origin` |
| allowedExpose | String |  "*"  |    No    | allowedExpose |
| maxAge | String |  "18000"  |    No    | maxAge (ms) |
| allowCredentials | Boolean |  true  |    No    | allowCredentials |


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


##### shenyu.extPlugin config

The Apache ShenYu Supports dynamic loading of custom plug-ins with the following configuration

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| enabled | Boolean |  true  |    No    | open dynamic loading of custom plug-ins |
| path | String |     |   False    | custom plugins path, if not config, the path is /ext/lib |
| threads | Integer |    1 |   False    | threads for dynamic loading custom plug-ins |
| scheduleTime | Integer |    300 |   False    | schedule time (s) for dynamic loading custom plug-ins |
| scheduleDelay | Integer |    30 |   False    |  schedule delay when app startup|

##### shenyu.scheduler config

scheduler config for Apache ShenYu Scheduler Thread Model 

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| enabled | Boolean |  false  |    No    | Whether to turn on Scheduler Thread Model |
| type | String |   fixed  |   False    | fixed Thread Pool or elastic  Scheduler Thread Model|
| threads | Integer |    Math.max((Runtime.getRuntime().availableProcessors() << 1) + 1, 16) |   False    | threads for fixed Thread Pool |


##### shenyu.upstreamCheck config

upstreamCheck config is the configuration used by  Apache ShenYu to detect upstream

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| enabled | Boolean |  false  |    No    | Whether to turn on upstreamCheck |
| timeout | Integer |    3000 |   False    | timeout （ms） |
| healthyThreshold | Integer |    1 |   False    | healthyThreshold  |
| unhealthyThreshold | Integer |    1 |   False    | unhealthyThreshold |
| interval | Integer |    5000 |   False    | schedule time (ms) for checked |
| printEnabled | Boolean |  true  |    No    | Whether to turn on print logs |
| printInterval | Integer |    60000 |   False    | schedule time (ms) for print logs |

##### shenyu.switchConfig config

Apache ShenYu Switch Config

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| local | Boolean |  true  |    No    | Whether to open local mode, if so, local operation data, default open |

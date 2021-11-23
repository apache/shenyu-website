---
title: 网关属性配置
keywords: ["配置"]
description: 网关属性配置
---

本篇主要讲解如何在 `Apache Shenyu` 网关配置 `ShenYu` 的相关属性。

<img src="/img/shenyu/config/shenyu_gateway_application_config.jpg" width="80%" height="70%" />

### 属性配置

```yaml
netty:
  tcp:
    select:
      count: 1
    worker:
      count: 4
    connect_timeout_millis: 10000
    write_buffer_high_water_mark: 65536
    write_buffer_low_water_mark: 32768
    so_keepalive: false
    so_reuseaddr: false
    so_linger: -1
    so_backlog: 128
    tcp_nodelay: true
shenyu:
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
#      useInsecureTrustManager: false
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

### 属性详解

##### shenyu.NettyTcpConfig config

`ShenYu` Netty 配置

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| select.count | int |  1  |    No    | Netty 选择器个数 |
| worker.count | int | 4 | No | Netty 工作线程个数 |
| connect_timeout_millis | int | 10000 | No | Netty 参数，连接超时时间 |
| write_buffer_high_water_mark | int | 65536 | No | Netty 参数，通道水位线上限 |
| write_buffer_low_water_mark | int | 32768 | No | Netty 参数，通道水位线下限 |
| so_keepalive | boolean | false | No | Socket 参数，是否启用心跳保活机制 |
| so_reuseaddr | boolean | false | No | Socket 参数，是否复用地址 |
| so_linger | int | -1 | No | Socket 参数，关闭 Socket 的延迟时间 |
| so_backlog | int | 128 | No | Socket 参数，accept 队列的最大长度 |
| tcp_nodelay | boolean | true | No | Socket 参数，是否启用 Nagle 算法 |

##### shenyu.httpclient 配置

这是 `ShenYu` 网关中代理Http及SpringCloud协议后，用于发送代理请求的HttpClient配置。

| Name           |  Type   |    Default    | Required | Description                                                  |
| :------------- | :-----: | :-----------: | :------: | :----------------------------------------------------------- |
| strategy       | String  | webcwebClient |    No    | HttpClientPlugin实现策略（默认使用webClietn）：<br />- `webClient`：使用WebClientPlugin<br />- `netty`：使用NettyHttpClientPlugin |
| connectTimeout |   int   |     45000     |    No    | 连接超时时间 (毫秒)，默认值为 `45000`.                       |
| readTimeout    |   int   |     3000      |    No    | 读取超时 (毫秒)，默认值为 `3000`.                            |
| writeTimeout   |   int   |     3000      |    No    | 输出超时 (millisecond)，默认值为 `3000`.                     |
| wiretap        | Boolean |     false     |    No    | 启用 Netty HttpClient 的窃听调试，默认值为 `false`。         |
| pool           |         |               |          | HttpClient连接池配置                                         |
| proxy          |         |               |          | HttpClient代理配置                                           |
| ssl            |         |               |          | HttpClient SSL配置                                           |

- `pool` config

HttpClient连接池配置：

| Name           |  Type  |          Default           | Required | Description                                                  |
| :------------- | :----: | :------------------------: | :------: | :----------------------------------------------------------- |
| type           | String |          ELASTIC           |    No    | HttpClient连接池类型，默认值为`ELASTIC`。<br /> - `ELASTIC`: 连接池可以按需缓存和增长。<br />- `FIXED`: 连接池缓存并重用，有固定的最大连接数。<br />- `DISABLED`: 连接池总是会创建一个新的连接。 |
| name           | String |           proxy            |    No    | 连接池映射名称，默认为`proxy`。                              |
| maxConnections |  int   | 2*可用处理器数，最小值为16 |    No    | 仅适用于 `FIXED` 类型，在现有连接上开始挂起获取之前的最大连接数。<br />默认值为可用处理器数*2。<br /> (最小值为 16) |
| acquireTimeout |  int   |           45000            |    No    | 仅适用于 `FIXED` 类型，等待获取连接的最长时间（毫秒）。默认值为 45000 |

- `Proxy` config

Netty HttpClient 代理的相关配置：

| Name                 |  Type  | Default | Required | Description                         |
| :------------------- | :----: | :-----: | :------: | :---------------------------------- |
| host                 | String |  null   |    No    | Netty HttpClient 代理配置的主机名。 |
| port                 | String |  null   |    No    | Netty HttpClient 的代理配置端口。   |
| username             | String |  null   |    No    | Netty HttpClient 代理配置的用户名。 |
| password             | String |  null   |    No    | Netty HttpClient 代理配置的密码。   |
| nonProxyHostsPattern | String |  null   |    No    | 直连的主机列表的正则表达式 (Java)。 |

- `SSL` config

网关路由可以同时支持路由到http和https的后端服务，以下为SSL相关配置：

| Name                     |  Type   | Default | Required | Description                                                  |
| :----------------------- | :-----: | :-----: | :------: | :----------------------------------------------------------- |
| useInsecureTrustManager  | Boolean |  false  |    No    | 是否信任所有下游证书，默认`false`                            |
| trustedX509Certificates  |  Array  |  Null   |    No    | 配置自己的信任的证书列表。                                   |
| handshakeTimeout         |   int   |  10000  |    No    | SSL握手超时时间（毫秒），默认值为10000                       |
| closeNotifyFlushTimeout  |   int   |  3000   |    No    | SSL close_notify 刷新超时（毫秒）默认值为 3000.              |
| closeNotifyReadTimeout   |   int   |    0    |    No    | SSL close_notify 读取超时（毫秒）默认值为 0.                 |
| defaultConfigurationType | String  |   TCP   |    No    | SslContextBuilder 的默认配置， 默认为 TCP.<br />- H2: SslProvider 将根据 OpenSsl.isAlpnSupported()、SslProvider.HTTP2_CIPHERS、ALPN 支持、HTTP/1.1 和 HTTP/2 支持进行设置<br />- TCP: SslProvider 将根据 OpenSsl.isAvailable() 设置<br />- NONE: 不会有默认配置 |



##### 过滤器相关配置

- `shenyu.file` 配置

文件过滤器的相关配置。

| 名称    | 类型    | 默认值 | 是否必填 | 说明                 |
| :------ | :------ | :----: | :------: | :------------------- |
| enabled | Boolean | false  |    否    | 是否开启文件大小过滤 |
| maxSize | Integer |  10    |    No    | 上传文件最大值 ，（单位:MB） |


- `shenyu.cross` 配置

跨域相关配置。

| 名称    | 类型    | 默认值 | 是否必填 | 说明             |
| :------ | :------ | :----: | :------: | :--------------- |
| enabled | Boolean | false  |    否    | 是否支持跨域请求 |
| allowedHeaders | String | x-requested-with, authorization, Content-Type, Authorization, credential,  X-XSRF-TOKEN, token, username, client |    No    | 允许的Header头，多个请用 "," 分割。新的"allowedHeaders"会在默认值基础上，去除重复的追加到"Access-Control-Allow-Headers"。 |
| allowedMethods | String |   "*"  |    No    | 允许的方法 |
| allowedOrigin | String |  "*"  |    No    | 允许的Origin |
| allowedExpose | String |  "*"  |    No    | 允许的Expose |
| maxAge | String |  "18000"  |    No    | 最大年龄 (ms) |
| allowCredentials | Boolean |  true  |    No    | 允许认证 |


- `shenyu.exclude` 配置

拒绝指定请求经过网关的相关配置

| 名称    | 类型    | 默认值 | 是否必填 | 说明                                       |
| :------ | :------ | :----: | :------: | :----------------------------------------- |
| enabled | Boolean | false  |    否    | 是否拒绝指定请求经过网关                   |
| paths   | Array   |   无   |    是    | 匹配该列表的请求不经过网关（支持路径匹配） |



##### shenyu.sync 配置

网关和`Admin`端使用数据同步的相关配置。

使用`websocket`进行数据同步的属性配置如下：

| 名称 | 类型   | 默认值 | 是否必填 | 说明                                               |
| :--- | :----- | :----: | :------: | :------------------------------------------------- |
| urls | String |   无   |    是    | `Admin`的websocket服务地址，多个地址用 `,` 分开 。 |



使用`zookeeper`进行数据同步的属性配置如下：

| 名称              | 类型   | 默认值 | 是否必填 | 说明                        |
| :---------------- | :----- | :----: | :------: | :-------------------------- |
| url               | String |   无   |    是    | `zookeeper`的连接地址       |
| sessionTimeout    | int    |   无   |    是    | `session`的超时时间（毫秒） |
| connectionTimeout | int    |   无   |    是    | 连接超时时间（毫秒）        |



使用`http长轮询`进行数据同步的属性配置如下：

| 名称 | 类型   | 默认值 | 是否必填 | 说明              |
| :--- | :----- | :----: | :------: | :---------------- |
| url  | String |   无   |    是    | `Admin`的服务地址 |



使用`nacos`进行数据同步的属性配置如下：

| 名称      | 类型   | 默认值 | 是否必填 | 说明              |
| :-------- | :----- | :----: | :------: | :---------------- |
| url       | String |   无   |    是    | `nacos`连接地址   |
| namespace | String |   无   |    是    | 命名空间          |
| username  | String |   无   |    否    | 用户名            |
| password  | String |   无   |    否    | 密码              |
| acm       |        |        |    否    | 阿里云ACM服务配置 |

- `acm`配置

| 名称      | 类型    | 默认值 | 是否必填 | 说明        |
| :-------- | :------ | :----: | :------: | :---------- |
| enabled   | boolean | false  |    否    | 是否启用    |
| endpoint  | String  |   无   |    是    | ACM服务地址 |
| namespace | String  |   无   |    否    | namespace   |
| accessKey | String  |   无   |    否    | accessKey   |
| secretKey | String  |   无   |    否    | secretKey   |



使用`etcd`进行数据同步的属性配置如下：

| 名称 | 类型   | 默认值 | 是否必填 | 说明           |
| :--- | :----- | :----: | :------: | :------------- |
| url  | String |   无   |    是    | `etcd`连接地址 |



使用`consul`进行数据同步的属性配置如下：

| 名称       | 类型   | 默认值 | 是否必填 | 说明                                         |
| :--------- | :----- | :----: | :------: | :------------------------------------------- |
| url        | String |   无   |    是    | `consul`连接地址                             |
| waitTime   | int    |   无   |    是    | 请求consul服务拉取配置信息的超时时间（毫秒） |
| watchDelay | int    |   无   |    是    | 同步间隔（毫秒）                             |


##### shenyu.extPlugin config

Apache ShenYu对于动态加载自定义插件的配置

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| enabled | Boolean |  true  |    No    | 是否开启动态加载自定义插件，默认开启 |
| path | String |     |   False    | 动态加载自定义插件的路径，如果没配，默认为相对于当前网关路径下的 ：/ext/lib，用户也可以使用-Dplugin-ext指定 |
| threads | Integer |    1 |   False    | 动态加载自定义插件的线程数 |
| scheduleTime | Integer |    300 |   False    | 动态加载自定义插件的间隔时间 ，单元：秒|
| scheduleDelay | Integer |    30 |   False    |  网关启动多久后去动态加载，单元：秒|

##### shenyu.scheduler config

Apache ShenYu 调度线程模型配置

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| enabled | Boolean |  false  |    No    | 是否开启使用调度线程 |
| type | String |   fixed  |   False    | 调度线程池类型，默认为fixed，不配置或者其他则为弹性线程池|
| threads | Integer |    Math.max((Runtime.getRuntime().availableProcessors() << 1) + 1, 16) |   False    | 固定线程池类型时候的线程数量 |


##### shenyu.upstreamCheck config

Apache ShenYu动态检测upstream的配置

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| enabled | Boolean |  false  |    No    | 是否检测 |
| timeout | Integer |    3000 |   False    | 超时配置 （ms） |
| healthyThreshold | Integer |    1 |   False    | 健康因子  |
| unhealthyThreshold | Integer |    1 |   False    | 不健康因子 |
| interval | Integer |    5000 |   False    | 检测的调度间隔时间|
| printEnabled | Boolean |  true  |    No    | 是否打印日志 |
| printInterval | Integer |    60000 |   False    | 打印日志的间隔调度时间 |

##### shenyu.switchConfig config

Apache ShenYu开关配置

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| local | Boolean |  true  |    No    | 是否开启本地模式，如果开启，本地操作数据，默认开启 |

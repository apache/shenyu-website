---
title: 网关属性配置
keywords: ["配置"]
description: 网关属性配置
---

本篇主要讲解如何在 `Apache Shenyu` 网关配置 `ShenYu` 的相关属性。

<img src="/img/shenyu/config/shenyu_gateway_application_config.jpg" width="80%" height="70%" />

### 属性配置

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

### 属性详解

#### shenyu.httpclient 配置

这是 `ShenYu` 网关中代理Http及SpringCloud协议后，用于发送代理请求的HttpClient配置。

| Name           |  Type   |    Default    | Required | Description                                                  |
| :------------- | :-----: | :-----------: | :------: | :----------------------------------------------------------- |
| strategy       | String  |     webClient |    No    | HttpClientPlugin实现策略（默认使用webClietn）：<br />- `webClient`：使用WebClientPlugin<br />- `netty`：使用NettyHttpClientPlugin |
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



#### 过滤器相关配置

- `shenyu.cross` 配置

跨域相关配置。

| 名称             | 类型    | 默认值 | 是否必填 | 说明                                                         |
| :--------------- | :------ | :----: | :------: | :----------------------------------------------------------- |
| enabled          | Boolean | false  |    否    | 是否支持跨域请求                                             |
| allowedHeaders   | String  |   无   |    否    | 用于设置响应头参数<br />`Access-Control-Allow-Headers`（多个值使用逗号`,`分隔）<br />默认包含以下字段：<br />x-requested-with<br />authorization<br />Content-Type<br />Authorization<br />credential<br />X-XSRF-TOKEN<br />token<br />username<br />client |
| allowedMethods   | String  |  `*`   |    否    | 用于设置响应头参数<br />`Access-Control-Allow-Methods`（多个值使用逗号`,`分隔）<br />默认值为 `*` |
| allowedOrigin    | String  |  `*`   |    否    | 用于设置响应头参数<br />`Access-Control-Allow-Origin`（多个值使用逗号`,`分隔）<br />默认值为 `*` |
| allowedExpose    | String  |  `*`   |    否    | 用于设置响应头参数<br />`Access-Control-Expose-Headers`（多个值使用逗号`,`分隔）<br />默认值为 `*` |
| maxAge           | int     | 18000  |    否    | 用于设置响应头参数<br />`Access-Control-Max-Age`，默认值为 `18000` |
| allowCredentials | Boolean |  true  |    否    | 用于设置响应头参数<br />`Access-Control-Allow-Credentials`（多个值使用逗号`,`分隔）<br />默认值为 `true` |



- `shenyu.switchConfig` 配置

本地请求过滤器相关配置。

| 名称  | 类型    | 默认值 | 是否必填 | 说明                                                         |
| :---- | :------ | :----: | :------: | :----------------------------------------------------------- |
| local | Boolean |  true  |    否    | 开启后路径为`/shenyu/**的请求不进行代理，由网关的控制器处理， |



- `shenyu.file` 配置

文件过滤器的相关配置。

| 名称    | 类型    | 默认值 | 是否必填 | 说明                                 |
| :------ | :------ | :----: | :------: | :----------------------------------- |
| enabled | Boolean | false  |    否    | 是否开启文件大小过滤                 |
| maxSize | int     |   无   |    是    | 允许文件传输大小的最大值（单位：MB） |



- `shenyu.exclude` 配置

拒绝指定请求经过网关的相关配置

| 名称    | 类型    | 默认值 | 是否必填 | 说明                                       |
| :------ | :------ | :----: | :------: | :----------------------------------------- |
| enabled | Boolean | false  |    否    | 是否拒绝指定请求经过网关                   |
| paths   | Array   |   无   |    是    | 匹配该列表的请求不经过网关（支持路径匹配） |



- `shenyu.extPlugin` 配置

插件热加载相关配置

| 名称          | 类型    | 默认值 | 是否必填 | 说明                                             |
| :------------ | :------ | :----: | :------: | :----------------------------------------------- |
| enabled       | Boolean |  true  |    否    | 是否开启插件热加载，默认开启                     |
| path          | String  |   无   |    是    | 插件路径，请将插件放于该路径下`/ext-lib`文件夹内 |
| threads       | int     |   1    |    否    | 插件检查线程数，默认值为`1`                        |
| scheduleTime  | int     |  300   |    否    | 插件检查间隔（秒），默认值为300秒                |
| scheduleDelay | int     |   30   |    否    | 启动后首次检查延迟时间（秒），默认值为30秒       |



- `shenyu.scheduler` 配置

插件链线程池相关配置

| 名称    | 类型    |             默认值             | 是否必填 | 说明                                                         |
| :------ | :------ | :----------------------------: | :------: | :----------------------------------------------------------- |
| enabled | Boolean |              true              |    否    | 是否自定义插件链线程池，默认关闭                             |
| type    | String  |             fixed              |    否    | 插件链线程池类型<br />- fixed: 固定数量线程池<br />- elastic: 创建一个可重用的线程池，线程数无上限 |
| threads | int     | 2*CPU+1 或 16 （取两者最大值） |    否    | 线程池类型为`fixed`时，指定最大线程数，默认值为`2*CPU+1 或 16 （取两者最大值）` |



- `shenyu.upstreamCheck` 配置

健康检查相关配置，定时对上游服务探活，剔除异常节点。

| 名称               | 类型    | 默认值 | 是否必填 | 说明                                                |
| :----------------- | :------ | :----: | :------: | :-------------------------------------------------- |
| enabled            | Boolean | false  |    否    | 是否开启健康检查，默认关闭                          |
| timeout            | int     |  3000  |    否    | 探活超时时间                                        |
| healthyThreshold   | int     |   1    |    否    | 连续多少次探活成功，则为健康服务，默认值为1         |
| unhealthyThreshold | int     |   1    |    否    | 连续多少次探活失败，则为不健康服务，默认值为1       |
| interval           | int     |  5000  |    否    | 健康检查间隔时间（毫秒），默认值为5000              |
| printEnabled       | Boolean |  true  |    否    | 是否定时打印健康服务地址，默认开启                  |
| printInterval      | int     | 60000  |    否    | 定时打印健康服务地址间隔时间（毫秒），默认值为60000 |



#### shenyu.sync 配置

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

---
title: Hmily-Config-Apollo
keywords: config
description: apollo配置中心模式
---

### 本地配置

 * 文件名为 : `hmily.yml`。
 
 * 路径： 默认路径为项目的 `resource`目录下，也可以使用 `-Dhmily.conf` 指定，也可以把配置放在 `user.dir` 目录下。
         优先级别 `-Dhmily.conf` > `user.dir` > `resource`
         
 * 具体的全内容如下 : 注意设置 `hmily.server.configMode = apollo` 
 
 * 框架的或首先根据你的 `apollo` 配置，然后从 `apollo` 获取配置   

```yaml
hmily:
  server:
    configMode: apollo
    appName: 
  #  如果server.configMode eq local 的时候才会读取到这里的配置信息.

remote:
  apollo:
    configService: 127.0.0.1:8080 # apollo服务地址
    namespace: test  # namespace
    appId: test # group
    secret: xxxx #秘钥
    env: dev #环境
    fileExtension: yml  #apollo上配置文件的格式（properties或者yml）二选一
```

* 然后，你可以在`apollo`上添加配置，配置格式如果下（yml）：

```yaml
hmily:
  config:
    appName: xiaoyu
    serializer: kryo
    contextTransmittalMode: threadLocal
    scheduledThreadMax: 16
    scheduledRecoveryDelay: 60
    scheduledCleanDelay: 60
    scheduledPhyDeletedDelay: 600
    scheduledInitDelay: 30
    recoverDelayTime: 60
    cleanDelayTime: 180
    limit: 200
    retryMax: 10
    bufferSize: 8192
    consumerThreads: 16
    asyncRepository: true
    autoSql: true
    phyDeleted: true
    storeDays: 3
    repository: mysql

repository:
  database:
    driverClassName: com.mysql.jdbc.Driver
    url :
    username:
    password:
    maxActive: 20
    minIdle: 10
    connectionTimeout: 30000
    idleTimeout: 600000
    maxLifetime: 1800000
  file:
    path:
    prefix: /hmily
  mongo:
    databaseName:
    url:
    userName:
    password:
  zookeeper:
    host: localhost:2181
    sessionTimeOut: 1000
    rootPath: /hmily
  redis:
    cluster: false
    sentinel: false
    clusterUrl:
    sentinelUrl:
    masterName:
    hostName:
    port:
    password:
    maxTotal: 8
    maxIdle: 8
    minIdle: 2
    maxWaitMillis: -1
    minEvictableIdleTimeMillis: 1800000
    softMinEvictableIdleTimeMillis: 1800000
    numTestsPerEvictionRun: 3
    testOnCreate: false
    testOnBorrow: false
    testOnReturn: false
    testWhileIdle: false
    timeBetweenEvictionRunsMillis: -1
    blockWhenExhausted: true
    timeOut: 1000

metrics:
  metricsName: prometheus
  host:
  port: 9091
  async: true
  threadCount : 16
  jmxConfig:
```

* 注意 `repository`的配置是SPI的扩展方式，几种方式由你去选择一种，并不需要全部配置。

* `metrics` 配置可有可无，如果不配置，则代表不开启`metrics`

 
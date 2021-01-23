---
title: Hmily-Config-Apollo
keywords: config
description: apollo configuration centre mode
---

### Local Configuration

 * File Name : `hmily.yml`.
 
 * Path： The default path is the `resource` directory of the project, which can be specified by `-Dhmily.conf`, and you can also put the configuration in `user.dir` directory. 
         Priority: `-Dhmily.conf` > `user.dir` > `resource`         
         
 * The specific contents are as follows : Notice setting  `hmily.server.configMode = apollo` 
 
 * The framework will pull the configuration according to your configured `apollo`.   
  

```yaml
hmily:
  server:
    configMode: apollo
    appName: 
  #  The following configuration will be read when server.configMode equals apollo.

remote:
  apollo:
    configService: 127.0.0.1:8080 # apollo service address
    namespace: test  # namespace
    appId: test # group
    secret: xxxx # the secret key
    env: dev # environment
    fileExtension: yml  # format of configuration file of apollo (properties or yml）
```

* You can add configurations in `apollo`, and the format is as follows(yml):
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

* Notice that the configurations of `repository` are extensions of SPI, you can select one from those modes, which don't have to be configured all.

* `metrics` is optional; If it is not configured，it means you don't enable `metrics`.

 
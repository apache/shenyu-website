---
title: Hmily-Config-Consul
keywords: hmily-config
description: Consul configuration centre mode
---

### Local Configuration  

- File Name: `hmily.yml`。

- Path: The default path is the `resource` directory of the project, which can be specified by `-Dhmily.conf`, and you can also put the configuration in `user.dir` directory. 
         Priority: `-Dhmily.conf` > `user.dir` > `resource` 

- The specific contents are as follows : Notice setting `hmily.server.configMode = consul`

- The framework will pull the configuration according to your configured `consul`.

```yml
hmily:
  server:
    configMode: consul
    appName: xxxxx

remote:
  consul:
    hostAndPort: 127.0.0.1:8500 # consul service address
    hostAndPorts: 
    key: test # the key of consul
    blacklistTimeInMillis: 6000
    fileExtension: yml # the format of the configuration of consul (properties or yml)
    passive: true # enable automatic update

```
- Pay attention to consul service address configuration, if it is cluster, please configure hostAndPorts Nodes, configure hostAndPort to standalone mode. You have to set one of them, if the two is empty, it will adopt cluster configuration.    

- And you need to add hmily configuration in the above configured key, the configuration is as follows:

```yml
hmily:
  config:
    appName: 
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


 
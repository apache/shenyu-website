---
title: Hmily-Config
keywords: configuration
description: Hmily配置详解
---

###  配置详解：

 * 文件名为 : `hmily.yml`。

 * 路径： 默认路径为项目的 `resource`目录下，也可以使用 `-Dhmily.conf` 指定，也可以把配置放在 `user.dir` 目录下。
         优先级别 `-Dhmily.conf` > `user.dir` > `resource`

```yaml
hmily:
  server:
    configMode: local
    appName: xiaoyu
  #  如果server.configMode eq local 的时候才会读取到这里的配置信息.
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

### hmily.server配置
|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|configMode                |String |  local   | 必填     |配置模式，现在支持local,zookeeper,nacos,apollo,配置为local，则会读取yml文件里的配置，其他模式，则会读取配置中心的|
|appName                   |String |  无   | 必填     |应用的名称，如果hmilyConfig中也配置了appName则会覆盖此配置|

### hmily.config配置

 * 这是整个框架的核心配置

|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|appName                   |String |  无      | 必填     |一般填你微服务的应用名称，请不要重复|
|serializer                |String |  kryo    |  非必填  |这是指定事务日志的序列化方式，目前支持填写 `kryo`, `hessian`, `jdk`, `protostuff`|
|contextTransmittalMode    |String |threadLocal| 非必填  |这是事务上下文传递的模式，目前支持填写 `threadLocal`, `transmittable` (跨线程模式) |
|scheduledThreadMax        |int    |CPU * 2    | 非必填  |调度线程数最大线程数量 |
|scheduledRecoveryDelay    |int(单位:秒) | 60   | 非必填  |事务日志自动恢复调度周期 |
|scheduledCleanDelay       |int(单位:秒) | 60   | 非必填  |事务日志清理调度周期 |
|scheduledPhyDeletedDelay  |int(单位:秒) | 60   | 非必填  |事务日志物理删除调度周期 |
|scheduledInitDelay        |int(单位:秒) | 30   | 非必填  |调度任务启动延迟时间 |
|recoverDelayTime          |int(单位:秒) | 60   | 非必填  |事务日志恢复迟延时间 |
|cleanDelayTime            |int(单位:秒) | 60   | 非必填  |事务日志清理迟延时间 |
|limit                     |int         | 100   | 非必填  |获取事务日志行数大小 |
|retryMax                  |int         | 10   | 非必填  |最大重试次数 |
|bufferSize                |int         | 4096 * 2 * 2 | 非必填  |disruptor的bufferSize大小 |
|consumerThreads           |int         | CPU * 2 | 非必填  |disruptor消费者线程数量 |
|asyncRepository           |boolean     | true | 非必填  | 是否异步存储事务日志，设置为false则为同步 |
|autoSql                   |boolean     | true | 非必填  | 是否自动执行框架自动建库建表SQL语句（如果已经创建可以设置为false） |
|phyDeleted                |boolean     | true | 非必填  | 在运行过程中，是否物理删除日志。设置为false，则只会更改日志状态 |
|storeDays                 |int(单位:天) | 3    | 非必填  | 如果 phyDeleted 设置为false的时候，日志存储天数|
|repository                |String |  mysql    |  必填   |这是指定事务日志的存储方式，目前支持填写 `mysql`, `oracle`, `postgresql`, `sqlserver`, `mongo`, `redis`, `file` |

### repository配置

repository是Hmily用来存储事务日志的配置，目前支持:database(mysql, oracle, postgresql, sqlserver), file(本地模式，测试，开发环境用), mongodb, zookeeper, redis。

* database配置(默认使用hikari连接池):

|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|driverClassName           |String |  com.mysql.jdbc.Driver     | 必填     |数据库的驱动类名称|
|url                       |String |  无 | 必填     |数据库的url连接|
|username                  |String |  无 | 必填     |数据库的用户名密码|
|password                  |String |  无 | 必填     |数据库的密码|
|maxActive                 |int    |  20 | 非必填   |连接池连接最大活跃数|
|minIdle                   |int    |  10 | 非必填   |连接池最小空闲数|
|connectionTimeout         |long   |  30000 | 非必填 |数据库的连接超时时间|
|idleTimeout               |long   |  60000 | 非必填 |一个连接idle状态的最大时长（毫秒），超时则被释放（retired），缺省:10分钟|
|maxLifetime               |long   |  1800000 | 非必填 |一个连接的生命时长（毫秒），超时而且没被使用则被释放（retired），缺省:30分钟，建议设置比数据库超时时长少30秒，参考MySQL wait_timeout参数（show variables like '%timeout%';|
|idleTimeout               |long   |  60000 | 非必填 |一个连接idle状态的最大时长（毫秒），超时则被释放（retired），缺省:10分钟|
|dataSourcePropertyMap     |Map<String,Object> |  无 | 非必填     |hikari连接池的其他属性配置|

* mongo配置:

|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|databaseName              |String |  无 | 必填     |mongo数据库名称|
|url                       |String |  无 | 必填     |mongo数据库的url连接|
|userName                  |String |  无 | 必填     |mongo数据库的用户名密码|
|password                  |String |  无 | 必填     |mongo数据库的密码|

* file配置:

|名称                      | 类型  |  默认值  | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------:|:-------:|:----------------------------|
|path                      |String |     无  |   非必填 |文件存储路径|
|prefix                    |String |      无 |   非必填 |文件存储前缀|

* zookeeper配置:

|名称                      | 类型  |  默认值  | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------:|:-------:|:----------------------------|
|host                      |String | localhost:2181    |   必填   |zk服务ip与端口|
|sessionTimeOut            |int(ms)|  1000   |   非必填 |  session超时时间|
|rootPath                  |String |  /hmily |   必填   |存储根路径|

* redis配置:

|名称                      | 类型  |  默认值  | 是否必填  | 说明                        |
|:------------------------ |:-----  |:-------:|:-------:|:----------------------------|
|cluster                   |boolean |false    |   非必填   |是否是集群|
|sentinel                  |boolean |false    |   非必填   |是否是哨兵模式|
|clusterUrl                |String |  无      |   非必填   |集群url，多个节点使用 `;` 分隔|
|sentinelUrl                |String |  无      |   非必填   |哨兵url，多个节点使用 `;` 分隔|
|masterName                |String |  无      |   非必填   |主节点名称，没有设置可以不填|
|hostName                  |String |  无      |   非必填   |redis单机模式下的host|
|port                      |int    |  无      |   非必填   |redis单机模式下的端口|
|password                  |String |  无      |   非必填   |redis服务密码|
|maxTotal                  |int    |  8       |   非必填   |最大连接数|
|maxIdle                   |int    |  8       |   非必填   |最大空闲的连接数|
|minIdle                   |int    |  0       |   非必填   |最少空闲的连接数|
|maxWaitMillis             |int    |  -1      |   非必填   |当资源池连接用尽后，调用者的最大等待时间(单位为毫秒)-1：表示永不超时 不建议使用默认值|
|minEvictableIdleTimeMillis      |int    |  1800000      |   非必填   |资源池中资源最小空闲时间(单位为毫秒)，达到此值后空闲资源将被移除, 默认值1000*60 *30 = 30分钟|
|softMinEvictableIdleTimeMillis  |int    |  1800000      |   非必填   |对象空闲多久后逐出, 当空闲时间>该值 且 空闲连接>最大空闲数 时直接逐出,不再根据MinEvictableIdleTimeMillis判断  (默认逐出策略)|
|numTestsPerEvictionRun          |int    |  3      |   非必填   |每次逐出检查时 逐出的最大数目 如果为负数就是 : 1/abs(n), 默认3|
|timeBetweenEvictionRunsMillis   |int    |  -1      |   非必填   |逐出扫描的时间间隔(毫秒) 如果为负数,则不运行逐出线程, 默认-1|
|timeOut                      |int    |  1000      |   非必填   |超时时间|
|testOnCreate                      |boolean    |  false      |   非必填   |在获取连接时,是否验证有效性|
|testOnBorrow                      |boolean    |  false      |   非必填   |在borrow一个jedis实例时，是否提前进行alidate操作；如果为true，则得到的jedis实例均是可用的|
|testOnReturn                      |boolean    |  false      |   非必填   |在return给pool时，是否提前进行validate操作|
|testWhileIdle                     |boolean    |  false      |   非必填   |如果为true，表示有一个idle object evitor线程对idle object进行扫描，如果validate失败，此object会被从pool中drop掉；这一项只有在timeBetweenEvictionRunsMillis大于0时才有意义|
|blockWhenExhausted                |boolean    |  true       |   非必填   |连接耗尽时是否阻塞, false报异常,true阻塞直到超时, 默认true|

### metrics配置  

metrics是指在hmily框架运行中，会记录调用量，耗时，事务提交与失败等等信息，目前只支持 `prometheus`.

|名称                      | 类型  |  默认值  | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------:|:-------:|:----------------------------|
|metricsName               |String | prometheus |   必填   |支持的类型，目前只支持prometheus|
|host                      |String |  localhost  |   非必填 |  暴露的http服务的host，不填则会取localhost|
|port                      |int    | 9091        |   必填   |暴露的http服务的端口|
|async                     |boolean| true        |   非必填   |是否异步模式记录|
|threadCount               |int    | 2 * cpu      |   非必填   |异步模式下线程数大小|
|jmxConfig                 |String |  无  |   非必填 |  jmxConfig配置，是一个json格式，具体可以参考prometheus官网|

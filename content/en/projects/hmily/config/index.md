---
title: Hmily-Config
keywords: configuration
description: Hmily Configuration Detail
---

###  Configuration Detail：

 * File Name: `hmily.yml`。

 * Path： The default path is the `resource` directory of the project, which can be specified by `-Dhmily.conf`, and you can also put the configuration in `user.dir` directory. 
          Priority: `-Dhmily.conf` > `user.dir` > `resource` 

```yaml
hmily:
  server:
    configMode: local
    appName: xiaoyu  
  #  The following configuration will be read when server.configMode equals local
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

### Hmily.server Configuration
 |Name                      | Type  |  Default  | Required  | Description                        |
 |:------------------------ |:----- |:-------: |:-------:|:----------------------------|
 |configMode                |String |  local   | yes     |Configuration mode supports local,zookeeper,nacos, and apollo now. If configuration is local, it will read the configuration from yml file;If the configuration is other modes, it will get the configuration form configuration centre.
 |appName                   |String |  null   | yes     |Application name. AppName will be overwritten if also configured in hmilyConfig. 

### Hmily.config Configuration

 * This is the core configuration of the whole framework

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|appName                   |String |  null      | yes     | It filled in your Microservices application's name generally, but don't repeat it|
|serializer                |String |  kryo    |  no  |This is mode of serializing the specified transaction log，and currently supports filling in `kryo`, `hessian`, `jdk`, `jdk`, `protostuff`|
|contextTransmittalMode    |String |threadLocal| no  |This is the mode of transaction context transfer, and currently supports filling in `threadLocal`, `transmittable` (Cross-thread mode) |
|scheduledThreadMax        |int    |CPU * 2    | no  |Maximum number of scheduled threads |
|scheduledRecoveryDelay    |int(unit:sec) | 60   | no  |Scheduling cycle of auto recovering transaction log |
|scheduledCleanDelay       |int(unit:sec) | 60   | no  |Scheduling cycle of cleaning transaction log |
|scheduledPhyDeletedDelay  |int(unit:sec) | 60   | no  |Scheduling cycle of deleting transaction log |
|scheduledInitDelay        |int(unit:sec) | 30   | no  |Delay time of starting scheduled task |
|recoverDelayTime          |int(unit:sec) | 60   | no  |Delay time of recovering transaction log |
|cleanDelayTime            |int(unit:sec) | 60   | no  |Delay time of cleaning  transaction log |
|limit                     |int         | 100   | no  |Transaction log row size |
|retryMax                  |int         | 10   | no  |Maximum number of retries |
|bufferSize                |int         | 4096 * 2 * 2 | no  |Buffer size of disruptor |
|consumerThreads           |int         | CPU * 2 | no  |The number of consumer thread of disruptor |
|asyncRepository           |boolean     | true | no  | Whether to store the transaction log asynchronously or not; If set to false, it will be synchronous |
|autoSql                   |boolean     | true | no  | Whether automatically execute the SQL statement to create databases and tables （If they have been created, you can set false） |
|phyDeleted                |boolean     | true | no  | In running time，whether delete logs physically. Setting false will change the state of log. |
|storeDays                 |int(unit:day) | 3    | no  | If phyDeleted set false，storeDays means days of storage |
|repository                |String |  mysql    |  yes   | This is specified storage mode of transaction log，and currently supports filling in `mysql`, `oracle`, `postgresql`, `sqlserver`, `mongo`, `redis`, `file` |

### Repository Configuration

Repository is a configuration for storing transaction logs by Hmily, and currently supports: database(mysql, oracle, postgresql, sqlserver), file(dev, test, prod), mongodb, zookeeper, redis.

* database configuration(The default pool is hikari):

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|driverClassName           |String |  com.mysql.jdbc.Driver     | yes     |driver name of your connection|
|url                       |String |  null | yes     |url connection of your database|
|username                  |String |  null | yes     |username of your database|
|password                  |String |  null | yes     |password of your database|
|maxActive                 |int    |  20 | no   |Maximum active number of connections of pool|
|minIdle                   |int    |  10 | no   |Minimum idle number of connections of pool|
|connectionTimeout         |long   |  30000 | no |A timeout of connecting to your database|
|idleTimeout               |long   |  60000 | no |Maximum time(ms) of a idle connection，it will be retired when timeout，default:10 minutes |
|maxLifetime               |long   |  1800000 | no |Maximum lifespan of a connection(ms)，it will be retired when it is timeout and don't be used，default:30 minutes; Suggest less 30 sec than timeout of database, please refer to MySQL wait_timeout parameter（show variables like '%timeout%';|
|idleTimeout               |long   |  60000 | no | Maximum time(ms) of timeout ，it will be retired when timeout，default:10 minutes|
|dataSourcePropertyMap     |Map<String,Object> |  null | no     |The other property configuration of hikari |

* mongo configuration:

|Name                      | Type  |  Default   | Required  | Description                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|databaseName              |String |  null | yes     |mongo name|
|url                       |String |  null | yes     |mongo url|
|userName                  |String |  null | yes     |mongo username|
|password                  |String |  null | yes     |mongo password|

* file configuration:

|Name                      | Type  |  Default  | Required  | Description                        |
|:------------------------ |:----- |:-------:|:-------:|:----------------------------|
|path                      |String |   null  |   no |the storage path to the file|
|prefix                    |String |   null  |   no |prefix of file storage|

* zookeeper configuration:

|name                      | Type  |  Default  | Required  | Description                        |
|:------------------------ |:----- |:-------:|:-------:|:----------------------------|
|host                      |String | localhost:2181    |   yes   |zookeeper service ip and port|
|sessionTimeOut            |int(ms)|  1000   |   yes | the timeout of session|
|rootPath                  |String |  /hmily |   no   |root storage path|

* redis configuration:

|Name                      | Type  |  Default  | Required  | Description                        |
|:------------------------ |:-----  |:-------:|:-------:|:----------------------------|
|cluster                   |boolean |false    |   no   |Is it cluster?|
|sentinel                  |boolean |false    |   no   |Is it sentinel mode?|
|clusterUrl                |String |  null      |   no   |Cluster url，multiple nodes use `;` to separate|
|sentinelUrl                |String |  null      |   no   |Sentinel url，multiple nodes use `;` to separate|
|masterName                |String |  null      |   no   |Main node name, and it can be empty if no setting|
|hostName                  |String |  null      |   yes   |Redis host in redis standalone mode|
|port                      |int    |  null      |   yes   |Redis port in standalone mode|
|password                  |String |  null      |   yes   |Password of redis service|
|maxTotal                  |int    |  8       |   no   |Maximum number of connections|
|maxIdle                   |int    |  8       |   no   |Maximum number of idle connections|
|minIdle                   |int    |  0       |   no   |Minimum number of idle connections|
|maxWaitMillis             |int    |  -1      |   no   |When connections of the resource pool is exhausted, the maximum wait time of caller (ms); -1：never timeout, don't suggest setting it|
|minEvictableIdleTimeMillis      |int    |  1800000      |   no   |Minimum idle time of resource pool (ms)，idle resource will be removed when reaching to the value;The default is 1000*60 *30 = 30 minutes|
|softMinEvictableIdleTimeMillis  |int    |  1800000      |   no   |How long evicted idle object, when idle time > the value and idle connection numbers > maximum idle connections, it will be evicted directly, no longer based on MinEvictableIdleTimeMillis to judge  (Default eviction policy)|
|numTestsPerEvictionRun          |int    |  3      |   no   |Maximum number of evictions at each eviction check; If it is negative, it is : 1/abs(n), the default is 3|
|timeBetweenEvictionRunsMillis   |int    |  -1      |   no   |Time interval of eviction scan (milliseconds) If it is negative, the eviction thread will not run, and the default is -1|
|timeOut                      |int    |  1000      |   no   |timeout|
|testOnCreate                      |boolean    |  false      |   no   |Is the validity verified when obtaining the connection|
|testOnBorrow                      |boolean    |  false      |   no   |Whether process alidate operation in advance when borrow a jedis instance; If it is true，the returned jedis instances are all avaiable|
|testOnReturn                      |boolean    |  false      |   no   |Whether process validate operation in advance before return to pool |
|testWhileIdle                     |boolean    |  false      |   no   |If it is true，it means there is a idle object evitor thread that is scanning idle object; If validate fail，the object will be dropped from pool;This item only take effect when timeBetweenEvictionRunsMillis is greater than 0|
|blockWhenExhausted                |boolean    |  true       |   no   |Whether block the connection when resource is exhausted, false will throw exception, true will block until timeout|

### Metrics Configuration  

Metrics will record call numbers, runtime, transaction submission and failure in the runtime of the hmily framework，only supports `prometheus` currently.

|Name                      | Type  |  Default  | Required  | Description                        |
|:------------------------ |:----- |:-------:|:-------:|:----------------------------|
|metricsName               |String | prometheus |   yes   |Supported type，only supports prometheus currently|
|host                      |String |  localhost  |   no |  Exposed http services host; |
|port                      |int    | 9091        |   yes   |Exposed http services port; |
|async                     |boolean| true        |   no   |Asynchronous mode record or not|
|threadCount               |int    | 2 * cpu      |   no   |Number of threads in asynchronous mode|
|jmxConfig                 |String |  null  |   no |  jmxConfig configuration，is a json format，and please refer to prometheus official website for details|
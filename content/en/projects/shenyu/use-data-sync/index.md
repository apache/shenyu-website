---
title: Data Synchronization Config
keywords: Apache ShenYu
description: use different data-sync strategy
---

This document focuses on how to use different data synchronization strategies. Data synchronization refers to the strategy used to synchronize data to ShenYu gateway after shenyu-admin background operation data. ShenYu gateway currently supports ZooKeeper, WebSocket, HTTP Long Polling, Nacos, Etcd and Consul for data synchronization.

<img src="/img/shenyu/dataSync/data-sync-config-en-1.png" width="70%" height="60%" />


For details about the data synchronization principles, see [Data Synchronization Design](../data-sync) in the design document.

### WebSocket Synchronization Config（default strategy, recommend）

* `Apache ShenYu` gateway config

   Add these dependencies in `pom.xml`：

```xml
    <!-- apache shenyu data sync start use websocket-->
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-sync-data-websocket</artifactId>
        <version>${project.version}</version>
    </dependency>
```

  <img src="/img/shenyu/dataSync/shenyu-data-sync-websocket-pom.png" width="80%" height="70%" />


  Add these config values in  yaml file:

```yaml
shenyu:
  sync:
    websocket :
      urls: ws://localhost:9095/websocket
      #urls: address of shenyu-admin，multi-address will be separated with (,).
```

  <img src="/img/shenyu/dataSync/shenyu-data-sync-websocket-yml.png" width="80%" height="70%" />

* `shenyu-admin` config

  Add these config values in  yaml file:
   
```yml
shenyu:
  sync:
    websocket:
      enabled: true
```

  <img src="/img/shenyu/dataSync/shenyu-data-sync-websocket-admin-yml.png" width="80%" height="70%" />

After the connection is established, the data will be fully obtained once, and the subsequent data will be updated and added increments, with good performance. It also supports disconnection (default: `30` seconds). This mode is recommended for data synchronization and is the default data synchronization strategy of ShenYu.


### Zookeeper Synchronization Config

* `Apache ShenYu` gateway config

   Add these dependencies in `pom.xml`：

 ```xml
        <!-- apache shenyu data sync start use zookeeper-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-sync-data-zookeeper</artifactId>
            <version>${project.version}</version>
        </dependency>
 ```

  <img src="/img/shenyu/dataSync/shenyu-data-sync-zk-pom.png" width="80%" height="70%" />


   Add these config values in  yaml file:
    
    
```yaml
shenyu:
  sync:
    zookeeper:
      url: localhost:2181
       #url: config with your zk address, used by the cluster environment, separated with (,).
      sessionTimeout: 5000
      connectionTimeout: 2000
```

  <img src="/img/shenyu/dataSync/shenyu-data-sync-zk-yml.png" width="80%" height="70%" />


* `shenyu-admin` config

 Add these config values in  yaml file:


```yaml
shenyu:
  sync:
    zookeeper:
      url: localhost:2181
       #url: config with your zk address, used by the cluster environment, separated with (,).
      sessionTimeout: 5000
      connectionTimeout: 2000
```


  <img src="/img/shenyu/dataSync/shenyu-data-sync-admin-zk-yml.png" width="80%" height="70%" />


 It is a good idea to use ZooKeeper synchronization mechanism with high timeliness, but we also have to deal with the unstable environment of ZK, cluster brain splitting and other problems.



### HTTP Long Polling Synchronization Config

* `Apache ShenYu` gateway config

 Add these dependencies in `pom.xml`：

```xml
        <!-- apache shenyu data sync start use http-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-sync-data-http</artifactId>
            <version>${project.version}</version>
        </dependency>
```

  <img src="/img/shenyu/dataSync/shenyu-data-sync-http-pom.png" width="80%" height="70%" />


  Add these config values in  yaml file:

```yaml
shenyu:
    sync:
        http:
             url: http://localhost:9095
        #url: config your shenyu-admin  ip and port，cluster IP by split by (,)
```

   <img src="/img/shenyu/dataSync/shenyu-data-sync-http-yml.png" width="80%" height="70%" />


* `shenyu-admin` config

  Add these config values in  yaml file:

```yaml
shenyu:
  sync:
    http:
      enabled: true
```

   <img src="/img/shenyu/dataSync/shenyu-data-sync-admin-http-yml.png" width="80%" height="70%" />


HTTP long-polling makes the gateway lightweight, but less time-sensitive. It pulls according to the group key, if the data is too large, it will have some influences, a small change under a group will pull the entire group.



### Nacos Synchronization Config

* `Apache ShenYu` gateway config


 Add these dependencies in `pom.xml`：

```xml
        <!-- apache shenyu data sync start use nacos-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-sync-data-nacos</artifactId>
            <version>${project.version}</version>
        </dependency>
```
  <img src="/img/shenyu/dataSync/shenyu-data-sync-nacos-pom.png" width="80%" height="70%" />


  Add these config values in  yaml file:

```yaml
shenyu:
  sync:
    nacos:
      url: localhost:8848
         # url: config with your nacos address, please use (,) to split your cluster environment.
      namespace: 1c10d748-af86-43b9-8265-75f487d20c6c
      username:
      password:
      acm:
        enabled: false
        endpoint: acm.aliyun.com
        namespace:
        accessKey:
        secretKey:
     # other configure，please refer to the naocs website.
```
  <img src="/img/shenyu/dataSync/shenyu-data-sync-nacos-yml.png" width="80%" height="70%" />


* `shenyu-admin` config

  Add these config values in  yaml file:

```yaml
shenyu:
  sync:
      nacos:
        url: localhost:8848
        namespace: 1c10d748-af86-43b9-8265-75f487d20c6c
        username:
        password:
        acm:
          enabled: false
          endpoint: acm.aliyun.com
          namespace:
          accessKey:
          secretKey:
        # url: config with your nacos address, pls use (,) to split your cluster environment.
        # other configure，pls refer to the naocs website.
```

  <img src="/img/shenyu/dataSync/shenyu-data-sync-admin-nacos-yml.png" width="80%" height="70%" />


### Etcd Synchronization Config

* `Apache ShenYu` gateway config

  Add these dependencies in `pom.xml`：
  
```xml
        <!-- apache shenyu data sync start use etcd-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-sync-data-etcd</artifactId>
            <version>${project.version}</version>
            <exclusions>
                <exclusion>
                    <groupId>io.grpc</groupId>
                    <artifactId>grpc-grpclb</artifactId>
                </exclusion>
                <exclusion>
                    <groupId>io.grpc</groupId>
                    <artifactId>grpc-netty</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
```
  <img src="/img/shenyu/dataSync/shenyu-data-sync-etcd-pom.png" width="80%" height="70%" />


  Add these config values in  yaml file:

```yaml
shenyu:
    sync:
       etcd:
         url: http://localhost:2379
       #url: config with your etcd address, used by the cluster environment, separated with (,).
```

  <img src="/img/shenyu/dataSync/shenyu-data-sync-etcd-yml.png" width="80%" height="70%" />


* `shenyu-admin` config

  Add these config values in  yaml file:

```yaml
shenyu:
  sync:
    etcd:
      url: http://localhost:2379
       #url: config with your etcd address, used by the cluster environment, separated with (,).
```

  <img src="/img/shenyu/dataSync/shenyu-data-sync-admin-etcd-yml.png" width="80%" height="70%" />


### Consul Synchronization Config

* `Apache ShenYu` gateway config

 Add these dependencies in `pom.xml`：

```xml
<!-- apache shenyu data sync start use consul-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-sync-data-consul</artifactId>
  <version>${project.version}</version>
</dependency>
```

  <img src="/img/shenyu/dataSync/shenyu_consul_sync_gateway.jpg" width="80%" height="70%" />


  Add these config values in  yaml file:

```yaml
shenyu:
    sync:
      consul:
				url: http://localhost:8500
        waitTime: 1000	# query wait time
        watchDelay: 1000	# Data synchronization interval                             
```

  <img src="/img/shenyu/dataSync/shenyu_consul_gateway_sync_config.jpg" width="80%" height="70%" />


* `shenyu-admin` config

  Add these config values in  yaml file:

```yaml
shenyu:
  sync:
    consul:
      url: http://localhost:8500
```

  <img src="/img/shenyu/dataSync/shenyu_consul_admin_sync_config.jpg" width="80%" height="70%" />



> After the data synchronization strategy of Apache ShenYu gateway and shenyu-admin is reconfigured, the microservice needs to be restarted.
>
> the Apache ShenYu gateway and shenyu-admin must use the same synchronization strategy.

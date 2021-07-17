---
title: 数据同步配置
keywords: shenyu
description: 使用不同的数据同步策略
---

本篇主要讲解如何配置数据同步策略，数据同步是指在 `shenyu-admin` 后台操作数据以后，使用何种策略将数据同步到 `ShenYu` 网关。`ShenYu` 网关当前支持`ZooKeeper`、`WebSocket`、`Http长轮询`、`Nacos`和`Etcd`进行数据同步。

<img src="/img/shenyu/dataSync/data-sync-2.png" width="60%" height="50%" />


数据同步原理请参考设计文档中的 [数据同步原理](../data-sync) 。

### WebSocket同步配置（默认方式，推荐）

* `ShenYu`网关配置

    首先在 `pom.xml` 文件中引入以下依赖：

```xml
    <!--shenyu data sync start use websocket-->
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-sync-data-websocket</artifactId>
        <version>${project.version}</version>
    </dependency>
```
  
  <img src="/img/shenyu/dataSync/shenyu-data-sync-websocket-pom.png" width="80%" height="70%" />

   然后在 `yml` 文件中进行如下配置:

```yaml
    shenyu:
        sync:
            websocket :
                 urls: ws://localhost:9095/websocket
               #urls:是指 shenyu-admin的地址，如果有多个，请使用（,）分割。  
```
  
  <img src="/img/shenyu/dataSync/shenyu-data-sync-websocket-yml.png" width="80%" height="70%" />

* `shenyu-admin 配置`

   在 `yml` 文件中进行如下配置:
   
```yml
shenyu:
  sync:
    websocket:
      enabled: true
```
  
  <img src="/img/shenyu/dataSync/shenyu-data-sync-websocket-admin-yml.png" width="80%" height="70%" />

当建立连接以后会全量获取一次数据，以后的数据都是增量的更新与新增，性能好。而且也支持断线重连 （默认`30`秒）。推荐使用此方式进行数据同步，也是`ShenYu`默认的数据同步策略。


### Zookeeper同步配置

* `ShenYu`网关配置

    首先在 `pom.xml` 文件中引入以下依赖：

 ```xml
        <!--shenyu data sync start use zookeeper-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-sync-data-zookeeper</artifactId>
            <version>${project.version}</version>
        </dependency>
 ```

  <img src="/img/shenyu/dataSync/shenyu-data-sync-zk-pom.png" width="80%" height="70%" />


   然后在 `yml` 文件中进行如下配置:
    
```yaml
shenyu:
    sync:
        zookeeper:
             url: localhost:2181
             sessionTimeout: 5000
             connectionTimeout: 2000
        #url: 配置成你的 zookeeper 地址，集群环境请使用（,）分隔
```

  <img src="/img/shenyu/dataSync/shenyu-data-sync-zk-yml.png" width="80%" height="70%" />


* `shenyu-admin` 配置

 在 `yml` 文件中进行如下配置:
 
```yaml
shenyu:
  sync:
    zookeeper:
        url: localhost:2181
        sessionTimeout: 5000
        connectionTimeout: 2000
    #url: 配置成你的 zookeeper 地址，集群环境请使用（,）分隔
```

  <img src="/img/shenyu/dataSync/shenyu-data-sync-admin-zk-yml.png" width="80%" height="70%" />


 使用`zookeeper`同步机制也是非常好的，时效性也高，但是要处理`zookeeper`环境不稳定，集群脑裂等问题。



### Http长轮询同步配置

* `ShenYu`网关配置

 首先在 `pom.xml` 文件中引入以下依赖：

```xml
        <!--shenyu data sync start use http-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-sync-data-http</artifactId>
            <version>${project.version}</version>
        </dependency>
```

  <img src="/img/shenyu/dataSync/shenyu-data-sync-http-pom.png" width="80%" height="70%" />


 然后在 `yml` 文件中进行如下配置:

```yaml
shenyu:
    sync:
        http:
             url: http://localhost:9095
        #url: 配置成你的 shenyu-admin 的 ip 与端口地址，多个admin集群环境请使用（,）分隔。
```
 
   <img src="/img/shenyu/dataSync/shenyu-data-sync-http-yml.png" width="80%" height="70%" />
 
  
* `shenyu-admin` 配置

 在 `yml` 文件中进行如下配置:
 
```yaml
shenyu:
  sync:
      http:
        enabled: true
```

   <img src="/img/shenyu/dataSync/shenyu-data-sync-admin-http-yml.png" width="80%" height="70%" />


使用`Http长轮询`进行数据同步，会让网关很轻量，但时效性略低。它是根据分组`key`来拉取，如果数据量过大，过多，会有一定的影响。 原因是一个组下面的一个小地方更改，都会拉取整个组的数据。


### Nacos同步配置

* `ShenYu`网关配置

 首先在 `pom.xml` 文件中引入以下依赖：

```xml
        <!--shenyu data sync start use nacos-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-sync-data-nacos</artifactId>
            <version>${project.version}</version>
        </dependency>
```
  <img src="/img/shenyu/dataSync/shenyu-data-sync-nacos-pom.png" width="80%" height="70%" />


 然后在 `yml` 文件中进行如下配置:

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
        # url: 配置成你的 nacos地址，集群环境请使用（,）分隔。
        # 其他参数配置，请参考 naocs官网。
```

  <img src="/img/shenyu/dataSync/shenyu-data-sync-nacos-yml.png" width="80%" height="70%" />

  
* `shenyu-admin` 配置

 在 `yml` 文件中进行如下配置:
 
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
      # url: 配置成你的 nacos地址，集群环境请使用（,）分隔。
      # 其他参数配置，请参考 naocs官网。
```

  <img src="/img/shenyu/dataSync/shenyu-data-sync-admin-nacos-yml.png" width="80%" height="70%" />


### Etcd 同步配置

* `ShenYu`网关配置

 首先在 `pom.xml` 文件中引入以下依赖：

```xml
        <!--shenyu data sync start use etcd-->
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


 然后在 `yml` 文件中进行如下配置:

```yaml
shenyu:
    sync:
       etcd:
         url: http://localhost:2379
       #url: 配置成你的 etcd，集群环境请使用（,）分隔。
```

  <img src="/img/shenyu/dataSync/shenyu-data-sync-etcd-yml.png" width="80%" height="70%" />

  
* `shenyu-admin` 配置

 在 `yml` 文件中进行如下配置:
 
```yaml
shenyu:
  sync:
    etcd:
      url: http://localhost:2379
      #url: 配置成你的 etcd，集群环境请使用（,）分隔。
```

  <img src="/img/shenyu/dataSync/shenyu-data-sync-admin-etcd-yml.png" width="80%" height="70%" />



> 在`ShenYu`网关和`shenyu-admin` 重新配置数据同步策略后，需要重启服务。
>
> `ShenYu`网关 和 `shenyu-admin` 必须使用相同的同步策略。

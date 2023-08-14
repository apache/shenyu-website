---
sidebar_position: 6
title: Use Different Data-Sync Strategy
keywords: ["soul"]
description: use different data-sync strategy
---

## Features

* Data synchronization is the key of gateway high performance, which is to sync 'soul-admin' config data into the JVM memory of soul cluster.
* Implementation principles, pls refer to：[dataSync](../design/data-sync)。
* In the article, the gateway is the environment you setup. please refer to：[Environment Setup](../users-guide/soul-set-up).

## Websocket sync（default method，recommend）

* gateway setting（note:restart）

  * Add these dependencies in `pom.xml`：
    
    ```xml
    <!--soul data sync start use websocket-->
    <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-sync-data-websocket</artifactId>
      <version>${last.version}</version>
    </dependency>
    ```
    
  * add these config values in springboot yaml file:
    
    ```yaml
    soul :
      sync:
          websocket :
            # urls: address of soul-admin，multi-address will be splitted with (,).
            urls: ws://localhost:9095/websocket
            allowOrigin: ws://localhost:9195
    ```

  * soul-admin config, enable this parameter `--soul.sync.websocket=''` in soul admin, then restart service.

    ```yaml
    soul:
      sync:
         websocket:
    ```

* When the connection is established, getting the full data once,then adding and upating data subsequently, which is a good performance.
* Support disconnection and reconnection (default 30 sec).

## Zookeeper Sync

* gateway setting（note: restart）

  * Add these dependencies in `pom.xml`:

    ```xml
    <!--soul data sync start use zookeeper-->
      <dependency>
           <groupId>org.dromara</groupId>
            <artifactId>soul-spring-boot-starter-sync-data-zookeeper</artifactId>
            <version>${last.version}</version>
      </dependency>
    ```

  * Add these dependencies in  springboot yaml file:
   
    ```yaml
    soul :
      sync:
          zookeeper:
               url: localhost:2181
               sessionTimeout: 5000
               connectionTimeout: 2000
    #url: config with your zk address, used by the cluster environment, splitted with (,).
    ```

  * soul-admin config: configure the soul-admin's starting parameter with `--soul.sync.zookeeper.url='your address'`,then restart the service.
    
    ```yaml
    soul:
      sync:
        zookeeper:
            url: localhost:2181
            sessionTimeout: 5000
            connectionTimeout: 2000
    ```
    
  * It is  good to use ZooKeeper synchronization mechanism with high timeliness, but we also have to deal with the unstable environment of ZK, cluster brain splitting and other
  problems.

## Http long-polling sync

* gateway setting（note:restart）

  * Add these dependencies in `pom.xml`：

    ```xml
    <!--soul data sync start use http-->
      <dependency>
           <groupId>org.dromara</groupId>
            <artifactId>soul-spring-boot-starter-sync-data-http</artifactId>
            <version>${last.version}</version>
      </dependency>
    ```

  * add these config values in your springboot yaml file:
   
      ```yaml
      soul :
          sync:
              http:
                   url: http://localhost:9095
      #url: config with your soul-admin's ip and port url, pls use (,) to split multi-admin cluster environment.
       ```
    
  * soul-admin config, configure the soul-admin's starting parameter with `--soul.sync.http=''`, then restart service.

    ```yaml
    soul:
      sync:
         http:
    ```

* HTTP long-polling makes the gateway lightweight, but less time-sensitive.

* It pulls according to the group key, if the data is too large, it will have some influences, a small change under a group will pull the entire group.

* it may hit bug in soul-admin cluster.

## Nacos sync

* gateway setting（note:restart）

  * Add these dependencies in your `pom.xml`：
    
    ```xml
    <!--soul data sync start use nacos-->
      <dependency>
           <groupId>org.dromara</groupId>
            <artifactId>soul-spring-boot-starter-sync-data-nacos</artifactId>
            <version>${last.version}</version>
      </dependency>
    ```

  * add these config values in the springboot yaml file:
  
     ```yaml
      soul :
          sync:
             nacos:
                  url: localhost:8848
                  namespace: 1c10d748-af86-43b9-8265-75f487d20c6c
                  acm:
                    enabled: false
                    endpoint: acm.aliyun.com
                    namespace:
                    accessKey:
                    secretKey:
      # url: config with your nacos address, pls use (,) to split your cluster environment.
      # other configure，pls refer to the naocs website.
     ```

    * soul-admin config: passing values one by one with '--' operator in the soul-Admin startup parameter.

    ```yaml
    soul :
          sync:
             nacos:
                  url: localhost:8848
                  namespace: 1c10d748-af86-43b9-8265-75f487d20c6c
                  acm:
                    enabled: false
                    endpoint: acm.aliyun.com
                    namespace:
                    accessKey:
                    secretKey:
    ```

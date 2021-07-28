---
title: Use Different Data-Sync Strategy
keywords: shenyu
description: use different data-sync strategy
---

## Features

* Data synchronization is the key of gateway high performance, which is to sync 'shenyu-admin' config data into the JVM memory of ShenYu cluster.
* Implementation principles, pls refer to：[dataSync](../data-sync)。
* In the article, the gateway is the environment you setup. please refer to：[Environment Setup](../shenyu-set-up).

## Websocket sync(default method，recommend)

* gateway setting（note:restart）

    * Add these dependencies in `pom.xml`：

    ```xml
    <!--shenyu data sync start use websocket-->
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-sync-data-websocket</artifactId>
        <version>${last.version}</version>
    </dependency>
    ```
   * add these config values in springboot yaml file:

    ```yaml
    shenyu:
      sync:
        websocket :
          urls: ws://localhost:9095/websocket
          # urls: address of shenyu-admin，multi-address will be splitted with (,).
    ```

    * shenyu-admin config, enable this parameter `--shenyu.sync.websocket='' ` in shenyu admin, then restart service.

    ```yaml
    shenyu:
      sync:
        websocket:
          enabled: true
    ```

* When the connection is established, getting the full data once,then adding and upating data subsequently, which is a good performance.
* Support disconnection and reconnection (default 30 sec).

## Zookeeper Sync

* gateway setting（note: restart）

    * Add these dependencies in `pom.xml`:

    ```xml
    <!--shenyu data sync start use zookeeper-->
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-sync-data-zookeeper</artifactId>
        <version>${last.version}</version>
    </dependency>
    ```

   * Add these dependencies in  springboot yaml file:

    ```yaml
    shenyu:
      sync:
        zookeeper:
          url: localhost:2181
          # url: config with your zk address, used by the cluster environment, splitted with (,).
          sessionTimeout: 5000
          connectionTimeout: 2000
    ```

    * shenyu-admin config: configure the shenyu-admin's starting parameter with `--shenyu.sync.zookeeper.url='your address' `,then restart the service.

    ```yaml
    shenyu:
      sync:
        zookeeper:
          url: localhost:2181
          sessionTimeout: 5000
          connectionTimeout: 2000
    ```
    * It is good to use ZooKeeper synchronization mechanism with high timeliness, but we also have to deal with the unstable environment of ZK, cluster brain splitting and other problems.

## Http long-polling sync

* gateway setting（note:restart）

    * Add these dependencies in `pom.xml`：

    ```xml
    <!--shenyu data sync start use http-->
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-sync-data-http</artifactId>
        <version>${last.version}</version>
    </dependency>
    ```

   * add these config values in your springboot yaml file:

      ```yaml
      shenyu:
        sync:
          http:
            url: http://localhost:9095
            # url: config with your shenyu-admin's ip and port url, pls use (,) to split multi-admin cluster environment.
       ```
   * shenyu-admin config, configure the shenyu-admin's starting parameter with `--shenyu.sync.http='' `, then restart service.

    ```yaml
    shenyu:
      sync:
        http:
          enabled: true
    ```

* HTTP long-polling makes the gateway lightweight, but less time-sensitive.

* It pulls according to the group key, if the data is too large, it will have some influences, a small change under a group will pull the entire group.

* it may hit bug in shenyu-admin cluster.

## Nacos sync

* gateway setting（note:restart）

    * Add these dependencies in your `pom.xml`：

    ```xml
    <!--shenyu data sync start use nacos-->
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-sync-data-nacos</artifactId>
        <version>${last.version}</version>
    </dependency>
    ```

  * add these config values in the springboot yaml file:

     ```yaml
     shenyu:
       sync:
         nacos:
           url: localhost:8848
           # url: config with your nacos address, pls use (,) to split your cluster environment.
           namespace: 1c10d748-af86-43b9-8265-75f487d20c6c
           username:
           password:
           acm:
             enabled: false
             endpoint: acm.aliyun.com
             namespace:
             accessKey:
             secretKey:
           # other configure，pls refer to the naocs website.
     ```
    * shenyu-admin config: passing values one by one with '--' operator in the shenyu-admin startup parameter.

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
    ```

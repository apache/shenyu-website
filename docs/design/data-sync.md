---
sidebar_position: 2
title: Data Synchronization Design
keywords: ["Apache ShenYu"]
description: Data Synchronization Design
---

This document explains the principle of data synchronization. Data synchronization refers to the strategy used to synchronize data to ShenYu gateway after shenyu-admin background operation data. ShenYu gateway currently supports ZooKeeper, WebSocket, HTTP Long Polling, Nacos, Etcd and Consul for data synchronization.

See [Data Synchronization Configuration](../user-guide/use-data-sync)  for configuration information about data synchronization.


<img src="/img/shenyu/dataSync/data-sync-dir-en.png" width="90%" height="80%" />


## Preface {#preface}

Gateway is the entrance of request and it is a very important part in micro service architecture, therefore the importance of gateway high availability is self-evident. When we use gateway, we have to change configuration such as flow rule, route rule for satisfying business requirement. Therefore, the dynamic configuration of the gateway is an important factor to ensure the high availability of the gateway. 

In the actual use of Apache ShenYu Gateway, users also feedback some problems:

* Apache ShenYu depends on ZooKeeper, how to use Etcd, Consul, Nacos and other registry center?

* Apache ShenYu depends on Redis and InfluxDB, and do not use limiting plugins or monitoring plugins. Why need these?

* Why not use configuration center for configuration synchronization?

* Why can't updates be configured dynamically?

* Every time you want to query the database, Redis is a better way.

According to the feedback of users, we have also partially reconstructed ShenYu. The current data synchronization features are as follows:


* All configuration is cached in ShenYu gateway memory, each request uses local cache, which is very fast.

* Users can modify any data in the background of shenyu-admin, and immediately synchronize to the gateway memory.

* Support ShenYu plugin, selector, rule data, metadata, signature data and other data synchronization.

* All plugin selectors and rules are configured dynamically and take effect immediately, no service restart required.

* Data synchronization mode supports Zookeeper, HTTP long polling, Websocket, Nacos, Etcd and Consul.


## Principle Analysis {#principle-analysis}

The following figure shows the process of data synchronization of ShenYu. ShenYu Gateway will synchronize configuration data from configuration service at startup, and support push-pull mode to get configuration change information, and then update local cache. The administrator can change the user permissions, rules, plugins and traffic configuration in the admin system(shenyu-admin), and synchronize the change information to ShenYu Gateway through the push-pull mode. Whether the mode is push or pull depends on the synchronization mode used.

<img src="/img/shenyu/dataSync/shenyu-config-processor-en.png" width="90%" height="80%" />


In the original version, the configuration service relied on the Zookeeper implementation to manage the back-end push of changes to the gateway. Now, WebSocket, HTTP long polling, ZooKeeper, Nacos, Etcd, and Consul can now be supported by specifying the corresponding synchronization policy by setting `shenyu.sync.${strategy}` in the configuration file. The default WeboSocket synchronization policy can be used to achieve second level data synchronization. However, it is important to note that Apache ShenYu Gateway and shenyu-admin must use the same synchronization policy.



As showing picture below,`shenyu-admin` will issue a configuration change notification through `EventPublisher` after users change configuration,`EventDispatcher` will handle this modification and send configuration to corresponding event handler according to configured synchronization strategy.

- If it is a `websocket` synchronization strategy,it will push modified data to `shenyu-web`,and corresponding `WebsocketDataHandler` handler will handle `shenyu-admin` data push at the gateway layer
- If it is a  `zookeeper` synchronization strategy,it will push modified data to `zookeeper`,and the `ZookeeperSyncCache` will monitor the data changes of `zookeeper` and process them
- If it is a  `http` synchronization strategy,`shenyu-web` proactively initiates long polling requests,90 seconds timeout by default,if there is no modified data in `shenyu-admin`,http request will be blocked,if there is a data change, it will respond to the changed data information,if there is no data change after 60 seconds,then respond with empty data,gateway continue to make http request after getting response,this kind of request will repeat.

<img src="/img/shenyu/dataSync/config-strategy-processor-en.png" width="90%" height="80%" />

### Zookeeper Synchronization {#zookeeper-synchronization}

The zookeeper-based synchronization principle is very simple,it mainly depends on `zookeeper` watch mechanism,`shenyu-web` will monitor the configured node,when `shenyu-admin` starts,all the data will be written to `zookeeper`,it will incrementally update the nodes of `zookeeper` when data changes,at the same time, `shenyu-web` will monitor the node for configuration information, and update the local cache once the information changes

![Zookeeper Node Design](https://yu199195.github.io/images/soul/soul-zookeeper.png)

`Apache ShenYu` writes the configuration information to the zookeeper node,and it is meticulously designed. If you want to learn more about the code implementation, refer to the source code `ZookeeperSyncDataService`.

### WebSocket Synchronization {#websocket-synchronization}

The mechanism of `websocket` and `zookeeper` is similar,when the gateway and the `shenyu-admin` establish a `websocket` connection,`shenyu-admin` will push all data at once,it will automatically push incremental data to `shenyu-web` through `websocket` when configured data changes

When we use websocket synchronization,pay attention to reconnect after disconnection,which also called keep heartbeat.`Apache ShenYu` uses `java-websocket` ,a third-party library,to connect to `websocket`. If you want to learn more about the code implementation, refer to the source code `WebsocketSyncDataService`.

### Http Long Polling {#http-long-polling}

The mechanism of zookeeper and websocket data synchronization is relatively simple,but http synchronization will be relatively complicated.ShenYu borrows the design ideas of `Apollo` and `Nacos` and realizes `http` long polling data synchronization using their advantages.Note that this is not traditional ajax long polling.

<img src="/img/shenyu/dataSync/http-long-polling-en.png" width="90%" height="80%" />

http long polling mechanism as above,shenyu-web gateway requests shenyu-admin configuration services,timeout is 90 seconds,it means gateway layer request configuration service will wait at most 90 seconds,this is convenient for shenyu-admin configuration service to respond modified data in time,and therefore we realize near real-time push.

After the http request reaches shenyu-admin, it does not respond immediately,but uses the asynchronous mechanism of Servlet3.0 to asynchronously respond to the data.First of all,put long polling request task `LongPollingClient` into `BlocingQueue`,and then start scheduling task,execute after 60 seconds,this aims to remove the long polling request from the queue after 60 seconds,even there is no configured data change.Because even if there is no configuration change,gateway also need to know,otherwise it will wait,and there is a 90 seconds timeout when the gateway requests configuration services.


If the administrator changes the configuration data during this period,the long polling requests in the queue will be removed one by one, and respond which group’s data has changed(we distribute plugins, rules, flow configuration , user configuration data into different groups).After gateway receives response,it only knows which Group has changed its configuration,it need to request again to get group configuration data.Someone may ask,why don't you write out the changed data directly?We also discussed this issue deeply during development, because the http long polling mechanism can only guarantee quasi real-time,if gateway layer does not handle it in time,or administrator updates configuration frequently,we probably missed some configuration change push.For security, we only inform that a certain Group information has changed.


When `shenyu-web` gateway layer receives the http response information,pull modified information(if exists),and then request `shenyu-admin` configuration service again,this will repeatedly execute.   If you want to learn more about the code implementation, refer to the source code `HttpSyncDataService`.

### Nacos Synchronization {#nacos-synchronization}


The synchronization principle of Nacos is basically similar to that of ZooKeeper, and it mainly depends on the configuration management of Nacos. The path of each configuration node is similar to that of ZooKeeper.

ShenYu gateway will monitor the configured node. At startup, if there is no configuration node in Nacos, it will write the synchronous full amount of data into Nacos. When the sequential data send changes, it will update the configuration node in Nacos in full amount. The local cache is updated.

If you want to learn more about the code implementation, please refer to the source code `NacosSyncDataService` and the official documentation for [Nacos](https://nacos.io/zh-cn/docs/sdk.html) .

### Etcd Synchronization {#etcd-synchronization}

Etcd data synchronization principle is similar to Zookeeper, mainly relying on Etcd's watch mechanism, and each configuration node path is the same as that of Zookeeper.

The native API for Etcd is a bit more complicated to use, so it's somewhat encapsulated.

ShenYu gateway will listen to the configured node. When startup, if there is no configuration node in Etcd, it will write the synchronous full amount of data into Etcd. When the sequential data send changes, it will update the configuration node in Etcd incrementally.

If you want to learn more about the code implementation, refer to the source `EtcdSyncDataService`.

### Consul Synchronization {#consul-synchronization}


Consul data synchronization principle is that the gateway regularly polls Consul's configuration center to get the configuration version number for local comparison.

ShenYu gateway will poll the configured nodes regularly, and the default interval is 1s. When startup, if there is no configuration node in Consul, write the synchronous full amount of data into Consul, then incrementally update the configuration node in Consul when the subsequent data is sent to change. At the same time, Apache ShenYu Gateway will regularly polls the node of configuration information and pull the configuration version number for comparison with the local one. The local cache is updated when the version number is changed.

If you want to learn more about the code implementation, refer to the source `ConsulsyncDataService`.

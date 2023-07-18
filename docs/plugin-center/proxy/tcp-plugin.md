---
title: Tcp Plugin
keywords: [ "Tcp" ]
description: TcpPlugin
---

# 1. Overview

## 1.1 Plugin name

- Tcp Plugin

## 1.2 Appropriate Scenario

- A service that handles Tcp requests and forwards them to other Tcp protocols on the backend
- Service load balancing

## 1.3 Plugin functionality

* Supports tcp proxy based on configured upstream list
* The upstream list can be hot-synchronized to the gateway by the admin module
* Support setting load balancing policy for requests, currently support shenyu load balancing module policy __Note__: When a connection is established with the gateway, after the connection is established, the traffic continues to stay in the upstream that has been selected by the load balancing module
* Configurable open port for listening, configurable reactor-netty parameter
* Enable multiple proxy selectors

## 1.4 Plugin code

- Core Module`shenyu-plugin-tcp` `shenyu-protocol-tcp`

## 1.5 Added since which shenyu version

- 2.6.0

# 2. How to use plugin

Start admin server search BasicConfig-Plugin for tcp plugins and click Resource to activate the current tcp module

![init-tcp](/img/shenyu/plugin/tcp/init-tcp.png)

## 2.1 Plugin Config

Plugin configuration

```json
{
  "loadBalanceAlgorithm": "random",
  "bossGroupThreadCount": "1",
  "workerGroupThreadCount": "12",
  "clientMaxConnections": "20",
  "clientMaxIdleTimeMs": "30000",
  "clientMaxLifeTimeMs": "60000",
  "clientPendingAcquireTimeout": "5",
  "clientPendingAcquireMaxCount": "5"
}
```

loadBalanceAlgorithm : shenyu load balancing algorithm is random by default
bossGroupThreadCount , workerGroupThreadCount
ReactorNetty TcpServer For configuration details, see  `shenyu-protocol-tcp#TcpBootstrapServer#start`
clientMaxConnections , clientMaxIdleTimeMs , clientMaxLifeTimeMs , clientPendingAcquireTimeout ,
clientPendingAcquireMaxCount
ReactorNetty `ConnectionProvider` For configuration details, see `shenyu-protocol-tcp#ConnectionContext`

## 2.2 Discovery Module Support

Discovery `Zookeeper` and `Local` modes are currently supported

### 2.2.1 Zookeeper Mode

![zookeeper.png](/img/shenyu/plugin/tcp/zookeeper.png)
Configure the zookeeper link
When you want to be registered to shenyu tcp proxy services registered to ListenerNode(default is `/shenyu/discovery`) under the temporary node

data json:

```json
{
  "protocol": "tcp",
  "url": "127.0.0.1:6379",
  "status": 1,
  "weight": 1,
  "props": "{}"
}
```

If the registered data is not in the default json format: aliases can be set

```json
{
  "${yourProtocol}": "tcp",
  "${yourUrl}": "127.0.0.1:6379",
  "${yourStatus}": 1,
  "${yourWeight}": 1,
  "${yourProps}": "{}"
}
```
The discovery module will automatically listen to your zookeeper registry and automatically maintain discovery_upstream



### 2.2.2 Local Mode

discovery#Local config

```json
{
  "baseSleepTimeMilliseconds": "1000",
  "maxRetries": "3",
  "maxSleepTimeMilliseconds": "1000",
  "connectionTimeoutMilliseconds": "1000",
  "sessionTimeoutMilliseconds": "1000",
  "namespace": "",
  "digest": null
}
```

For details, see `shenyu-discovery-zookeeper#ZookeeperDiscoveryService#init`

discovery#Local config
Manually configure the forwarding port and downstream nodes
![local.png](/img/shenyu/plugin/tcp/local.png)

### 2.3 Shenyu log

shenyu-gateway port start log
![gateway_start_port_log.png](/img/shenyu/plugin/tcp/gateway_start_port_log.png)

shenyu-gateway proxy upstreamList‘s success log
![gateway_upstream_list.png](/img/shenyu/plugin/tcp/gateway_upstream_list.png)

## 2.3 Using validation

Take the proxy redis for example
use `redis-cli -p {forwardPort}` 

![connection.png](/img/shenyu/plugin/tcp/redis-connection.png)

If there is a difference between the current admin's UpstreamList and the gateway's , you can click Refresh to force synchronization to the gateway
![refresh_upstream.png](/img/shenyu/plugin/tcp/refresh_upstream.png)

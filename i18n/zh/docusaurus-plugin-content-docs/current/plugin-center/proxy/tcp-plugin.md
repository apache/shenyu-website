---
title: Tcp插件
keywords: [ "Tcp" ]
description: Tcp插件
---

# 1. 概述

## 1.1 插件名称

- Tcp插件

## 1.2 适用场景

- 处理 Tcp协议 请求，将其转发到后端其他 Tcp 协议的服务
- 服务负载均衡

## 1.3 插件功能

* 支持根据 配置的 upstream list 做tcp代理
* upstream list 可在 admin 模块自行配置 热同步到 gateway
* 支持设置请求的负载均衡策略，目前支持 shenyu 负载均衡模块的策略 注意: 负载均衡作用与和gateway建立连接时,当连接建立后续的流量继续保持
  负载均衡模块 已经选定的upstream
* 支持配置开启端口进行监听, 可配置 reactor-netty 参数
* 支持开启多个代理选择器

## 1.4 插件代码

- 核心模块`shenyu-plugin-tcp` `shenyu-protocol-tcp`

## 1.5 添加自哪个shenyu版本

- 2.6.0

# 2. 如何使用插件

启动 admin server 在 BasicConfig - Plugin 中 搜索 tcp 插件 并且 点击 Resource 激活当前 tcp 模块

![init-tcp](/img/shenyu/plugin/tcp/init-tcp.png)

## 2.1 插件配置

插件配置

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

loadBalanceAlgorithm : shenyu负载均衡算法 默认random
bossGroupThreadCount , workerGroupThreadCount
ReactorNetty TcpServer 配置 详情见  `shenyu-protocol-tcp#TcpBootstrapServer#start`
clientMaxConnections , clientMaxIdleTimeMs , clientMaxLifeTimeMs , clientPendingAcquireTimeout ,
clientPendingAcquireMaxCount
ReactorNetty `ConnectionProvider` 配置 详情见 `shenyu-protocol-tcp#ConnectionContext`

## 2.2 Discovery 支持

目前 支持 Discovery Zookeeper 和 Local 模式

### 2.2.1 Zookeeper 模式

![zookeeper.png](/img/shenyu/plugin/tcp/zookeeper.png)
配置 zookeeper 链接地址
当你要被注册到 shenyu tcp代理的 服务 注册到 ListenerNode 若不配置自动为 `/shenyu/discovery` 下的 临时节点

数据为:

```json
{
  "protocol": "tcp",
  "url": "127.0.0.1:6379",
  "status": 1,
  "weight": 1,
  "props": "{}"
}
```

若注册的数据与 默认的json格式不同时: 可以设置别名  

```json
{
  "${yourProtocol}": "tcp",
  "${yourUrl}": "127.0.0.1:6379",
  "${yourStatus}": 1,
  "${yourWeight}": 1,
  "${yourProps}": "{}"
}
```
discovery 模块会自动 监听到 你的 zookeeper 注册中心 自动维护 discovery_upstream



### 2.2.2 Local 模式

discovery#Local 配置

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

详情见 `shenyu-discovery-zookeeper#ZookeeperDiscoveryService#init`

discovery#Local 配置
手动配置 转发端口 和 下游节点
![local.png](/img/shenyu/plugin/tcp/local.png)

shenyu-gateway 端口启动log
![gateway_start_port_log.png](/img/shenyu/plugin/tcp/gateway_start_port_log.png)

shenyu-gateway 代理列表同步log
![gateway_upstream_list.png](/img/shenyu/plugin/tcp/gateway_upstream_list.png)

## 使用

以 代理 redis 为例
使用 `redis-cli -p {forwardPort}` 访问

![connection.png](/img/shenyu/plugin/tcp/redis-connection.png)

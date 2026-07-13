---
title: Tcp插件
keywords: [ "Tcp" ]
description: Tcp插件
---

# 1. 概述

## 1.1 插件名称

- TCP插件

## 1.2 适用场景

- 处理 TCP 协议请求，将其转发到后端其他 TCP 协议的服务
- 服务负载均衡

## 1.3 插件功能

* 支持根据配置的 upstream list 做 TCP 代理；
* upstream list 可在 admin 模块自行配置，热同步到 gateway；
* 支持设置请求的负载均衡策略，目前支持 shenyu 负载均衡模块的策略；
* 支持配置开启端口进行监听，可配置 reactor-netty 参数；
* 支持开启多个代理选择器

> __注意__: 负载均衡作用与gateway建立连接时，当连接建立，后续的流量继续保持负载均衡模块已经选定的upstream

## 1.4 插件代码

- 核心模块：`shenyu-plugin-tcp` `shenyu-protocol-tcp`

## 1.5 添加自哪个shenyu版本

- 2.6.0

# 2. 如何使用插件

## 2.1 启用插件

- 初次使用时，启动 admin server，在 `shenyu-admin` --> 基础配置 --> 插件管理 中， 搜索 tcp 插件 并且点击“资源”激活 TCP 插件模块

![init-tcp-zh](/img/shenyu/plugin/tcp/init_tcp_zh.png)

- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `tcp`，设置为开启

![start-tcp-zh](/img/shenyu/plugin/tcp/start_tcp_zh.png)

## 2.2 配置插件

- TCP 插件是以代理选择器（proxy-selector）为单位创建的，因此配置插件即是配置代理选择器的属性。 创建代理选择器时，点击页面的“添加选择器按钮”，在弹出的选择器表单中，即可对选择器属性进行配置：

![selector_props](/img/shenyu/plugin/tcp/selector_props.png)

 默认配置如下：

```json
{
  "loadBalance": "random",
  "bossGroupThreadCount": "1",
  "workerGroupThreadCount": "12",
  "clientMaxConnections": "20",
  "clientMaxIdleTimeMs": "30000",
  "clientMaxLifeTimeMs": "60000",
  "clientPendingAcquireTimeout": "5",
  "clientPendingAcquireMaxCount": "5"
}
```

- `loadBalanceAlgorithm` : shenyu负载均衡算法，默认为random
- `bossGroupThreadCount` , `workerGroupThreadCount`：
ReactorNetty TcpServer 配置，详情见  `shenyu-protocol-tcp#TcpBootstrapServer#start`
- `clientMaxConnections` , `clientMaxIdleTimeMs` , `clientMaxLifeTimeMs` , `clientPendingAcquireTimeout` ,
`clientPendingAcquireMaxCount`: ReactorNetty `ConnectionProvider` 配置，详情见 `shenyu-protocol-tcp#ConnectionContext`


用户可以在`shenyu-admin` --> 基础配置 --> 插件处理管理 中，搜索 tcp 插件，对默认配置进行修改编辑：

![plugin_handle_zh](/img/shenyu/plugin/tcp/plugin_handle_zh.png)

## 2.3 配置服务发现

TCP 插件支持插件级别、选择器级别两种级别的服务发现配置：

服务发现 详情 见  [discovery-mode](../discovery/discovery-mode.md)

① 用户点击页面上的“服务发现配置”按钮，便可以在弹出的表单中配置插件级别的服务发现。配置完成后，再次打开表单，可以修改或删除之前的配置。
插件级别discovery配置后，选择器的discovery设置默认与插件级别保持一致：

![discovery_config](/img/shenyu/plugin/tcp/discovery_config.png)

② 如果用户没有配置插件级别的服务发现，在每次创建代理选择器（proxy-selector)时，都可以对该选择器的discovery进行配置：

![selector_discovery](/img/shenyu/plugin/tcp/selector_discovery.png)


目前，TCP 插件支持 Zookeeper 模式和 Local 模式的服务发现。

### 2.3.1 Zookeeper 模式

- 当服务发现的类型选择zookeeper时，需要填写 Discovery-Zookeeper 配置 培训详情见 [discovery-mode](../discovery/discovery-mode.md)

- zookeeper模式下，discovery模块会自动监听用户的 zookeeper 注册中心，自动维护 discovery_upstream 

![zookeeper.png](/img/shenyu/plugin/tcp/zookeeper.png)


### 2.3.2 Local 模式

- 当服务发现的类型选择local时，需要手动填写服务下游列表。如图所示，服务下游列表为可编辑表格，
双击每一个单元格可以进行表格内容的修改:

![local_selector_zh.png](/img/shenyu/plugin/tcp/local_selector_zh.png)


## 2.4 配置选择器

- 除了上文中的服务发现配置外，创建选择器时，还需要填写选择器的“基本配置”部分，包括名称与代理端口等。为了提升填写的便捷性，
可以点击“复制选择器”，拷贝已经创建的选择器的部分信息。

> __注意__：选择器的名称唯一标识选择器，不能重复

![selector_basic.png](/img/shenyu/plugin/tcp/selector_basic.png)

- 创建完选择器后，选择器以卡片的形式展现，鼠标悬停于卡片上，将会展示选择器的创建时间、更新时间与属性。
卡片下方有三个图标按钮，从左至右依次为同步、编辑与删除选择器：

![card_list_zh.png](/img/shenyu/plugin/tcp/card_list_zh.png)

- 如果当前 admin 的 UpstreamList 与 gateway 出现差异时，可以点击“同步”图标，强制同步到gateway。

## 2.5 日志

- shenyu-gateway 端口启动log

![gateway_start_port_log.png](/img/shenyu/plugin/tcp/gateway_start_port_log.png)

- shenyu-gateway 代理列表同步log

![gateway_upstream_list.png](/img/shenyu/plugin/tcp/gateway_upstream_list.png)

## 2.6 示例

以代理 redis 为例，使用 `redis-cli -p {forwardPort}` 访问

![connection.png](/img/shenyu/plugin/tcp/redis_connection.png)





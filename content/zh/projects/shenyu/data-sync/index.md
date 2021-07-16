---
title: 数据同步原理
keywords: shenyu
description: 数据同步
---

本篇主要讲解数据同步原理，数据同步是指在 `shenyu-admin` 后台操作数据以后，使用何种策略将数据同步到 `ShenYu` 网关。`ShenYu` 网关当前支持`ZooKeeper`、`WebSocket`、`Http长轮询`、`Nacos`和`Etcd`。

<img src="/img/shenyu/dataSync/data-sync-1.png" width="60%" height="50%" />


### 背景

网关是流量请求的入口，在微服务架构中承担了非常重要的角色，网关高可用的重要性不言而喻。在使用网关的过程中，为了满足业务诉求，经常需要变更配置，比如流控规则、路由规则等等。因此，网关动态配置是保障网关高可用的重要因素。


在实际使用 `ShenYu` 网关过程中，用户也反馈了一些问题：

 * 依赖 `Zookeeper`，怎么使用 `Etcd`、`Consul`、`Nacos`等其他注册中心？
 * 依赖 `Redis`、`influxdb`，没有使用限流插件、监控插件，为什么需要这些？
 * 配置同步为什么不使用配置中心？
 * 为什么不能动态配置更新？
 * 每次都要查询数据库，使用`Redis`不就行了吗？

根据用户的反馈信息，我们对 `ShenYu` 也进行了部分的重构，当前数据同步特性如下：

- 所有的配置都缓存在 `ShenYu` 网关内存中，每次请求都使用本地缓存，速度非常快。
- 用户可以在 `shenyu-admin` 后台任意修改数据，并马上同步到网关内存。
- 支持 `ShenYu` 的插件、选择器、规则数据、元数据、签名数据等数据同步。
- 所有插件的选择器，规则都是动态配置，立即生效，不需要重启服务。
- 数据同步方式支持 `Zookeeper`、`Http 长轮询`、`Websocket`、`Nacos`和`Etcd`。

### 原理分析

下图展示了 `ShenYu` 数据同步的流程，`ShenYu` 网关在启动时，会从配置服务同步配置数据，并且支持推拉模式获取配置变更信息，然后更新本地缓存。管理员可以在管理后台（`shenyu-admin`），变更用户权限、规则、插件、流量配置，通过推拉模式将变更信息同步给 `ShenYu` 网关，具体是 `push` 模式，还是 `pull` 模式取决于使用哪种同步方式。
 
 ![](/img/shenyu/dataSync/plugin-data.png)

在最初的版本中，配置服务依赖 `Zookeeper` 实现，管理后台将变更信息 `push` 给网关。而现在可以支持 `WebSocket`、`Http长轮询`、`Zookeeper`、`Nacos`和`Etcd`，通过在配置文件中设置 `shenyu.sync.${strategy}` 指定对应的同步策略，默认使用 `webosocket` 同步策略，可以做到秒级数据同步。但是，有一点需要注意的是，`ShenYu`网关 和 `shenyu-admin` 必须使用相同的同步策略。

如下图所示，`shenyu-admin` 在用户发生配置变更之后，会通过 `EventPublisher` 发出配置变更通知，由 `EventDispatcher` 处理该变更通知，然后根据配置的同步策略(`http、weboscket、zookeeper、naocs、etcd`)，将配置发送给对应的事件处理器。

- 如果是 `websocket` 同步策略，则将变更后的数据主动推送给 `shenyu-web`，并且在网关层，会有对应的 `WebsocketCacheHandler` 处理器来处理 `shenyu-admin` 的数据推送。
- 如果是 `zookeeper` 同步策略，将变更数据更新到 `zookeeper`，而 `ZookeeperSyncCache` 会监听到 `zookeeper` 的数据变更，并予以处理。
- 如果是 `http` 同步策略，由网关主动发起长轮询请求，默认有 `90s` 超时时间，如果 `shenyu-admin` 没有数据变更，则会阻塞 `http` 请求，如果有数据发生变更则响应变更的数据信息，如果超过 `60s` 仍然没有数据变更则响应空数据，网关层接到响应后，继续发起 `http` 请求，反复同样的请求。

<img src="/img/shenyu/dataSync/config-strategy-processor-zh.png" width="90%" height="80%" />

### Zookeeper同步原理

基于 `zookeeper` 的同步原理很简单，主要是依赖 `zookeeper` 的 `watch` 机制。`ShenYu`网关会监听配置的节点，`shenyu-admin` 在启动的时候，会将数据全量写入 `zookeeper`，后续数据发生变更时，会增量更新 `zookeeper` 的节点，与此同时，`ShenYu`网关会监听配置信息的节点，一旦有信息变更时，会更新本地缓存。

![zookeeper节点设计](https://yu199195.github.io/images/soul/soul-zookeeper.png)

`ShenYu` 将配置信息写到`zookeeper`节点，是通过精心设计的，如果您想深入了解代码实现，请参考源码 `ZookeeperSyncDataService`。

### WebSocket同步原理

`websocket` 和 `zookeeper` 机制有点类似，将网关与 `shenyu-admin` 建立好 `websocket` 连接时，`shenyu-admin` 会推送一次全量数据，后续如果配置数据发生变更，则以增量形式将变更数据通过 `websocket` 主动推送给 `ShenYu`网关。

使用 `websocket` 同步的时候，特别要注意断线重连，也就是要保持心跳。`ShenYu`使用`java-websocket` 这个第三方库来进行`websocket`连接。
如果您想深入了解代码实现，请参考源码 `WebsocketSyncDataService`。


### Http长轮询同步原理

`Zookeeper`和`WebSocket` 数据同步的机制比较简单，而 `Http长轮询`则比较复杂。 `ShenYu` 借鉴了 `Apollo`、`Nacos` 的设计思想，取其精华，自己实现了 `Http长轮询`数据同步功能。注意，这里并非传统的 `ajax` 长轮询！

<img src="/img/shenyu/dataSync/http-long-polling-zh.png" width="90%" height="80%" />

`Http长轮询` 机制如上所示，`ShenYu`网关主动请求 `shenyu-admin` 的配置服务，读取超时时间为 `90s`，意味着网关层请求配置服务最多会等待 `90s`，这样便于 `shenyu-admin` 配置服务及时响应变更数据，从而实现准实时推送。

`http` 请求到达 `shenyu-admin` 之后，并非立马响应数据，而是利用 `Servlet3.0` 的异步机制，异步响应数据。首先，将长轮询请求任务 `LongPollingClient` 扔到 `BlockingQueue` 中，并且开启调度任务，`60s` 后执行，这样做的目的是 `60s` 后将该长轮询请求移除队列。因为即便是没有配置变更，也需要让网关知道，不能一直等待。而且网关请求配置服务时，也有 `90s` 的超时时间。


如果这段时间内，管理员在 `shenyu-admin` 变更了配置数据，此时，会挨个移除队列中的长轮询请求，并响应数据，告知是哪个 `Group` 的数据发生了变更（我们将插件、规则、流量配置、用户配置数据分成不同的组）。网关收到响应信息之后，只知道是哪个 `Group` 发生了配置变更，还需要再次请求该 `Group` 的配置数据。这里可能会存在一个疑问：为什么不是直接将变更的数据写出？我们在开发的时候，也深入讨论过该问题，因为 `http 长轮询` 机制只能保证准实时，如果在网关层处理不及时，或者管理员频繁更新配置，很有可能便错过了某个配置变更的推送，安全起见，我们只告知某个 `Group` 信息发生了变更。

当 `shenyu-web` 网关层接收到 `http` 响应信息之后，拉取变更信息（如果有变更的话），然后再次请求 `shenyu-admin` 的配置服务，如此反复循环。
如果您想深入了解代码实现，请参考源码 `HttpSyncDataService`。


### Nacos同步原理

`Nacos`的同步原理与Zookeeper基本类似，主要依赖于`Nacos`的`配置管理`,各个配置节点的路径与Zookeeper类似。

`ShenYu`网关会监听配置的节点，启动时，如果`Nacos`中不存在配置节点，将同步全量的数据写入`Nacos`中，后序数据发送变更时，全量更新`Nacos`中的配置节点，与此同时，`ShenYu`网关会监听配置信息的节点，一旦有信息变更时，会更新本地缓存。

如果您想深入了解代码实现，请参考源码 `NacosSyncDataService`和`Nacos`的[官方文档](https://nacos.io/zh-cn/docs/sdk.html)。


### Etcd同步原理

`Etcd` 数据同步原理与Zookeeper类似，主要依赖于`Etcd`的`watch`机制，各个配置节点路径与`Zookeeper`相同。

`Etcd`的原生API使用稍有点复杂，所有对其进行了一定的封装。

`ShenYu`网关会监听配置的节点，启动时，如果`Etcd`中不存在配置节点，将同步全量的数据写入`Etcd`中，后序数据发送变更时，增量更新`Etcd`中的配置节点，与此同时，`ShenYu`网关会监听配置信息的节点，一旦有信息变更时，会更新本地缓存。

如果您想深入了解代码实现，请参考源码 `EtcdSyncDataService`。


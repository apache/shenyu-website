---
title: Divide插件
keywords: ["divide"]
description: divide插件
---

## 说明

`divide`插件是网关用于处理 `http协议`请求的核心处理插件。

## 插件设置

* 引入相关依赖，开启插件，请参考：[Http快速开始](../quick-start-http) 。
 
* `Http`应用客户端接入，请参考：[Http服务接入](../http-proxy) 。

## 插件讲解

`divide`插件是进行`http`正向代理的插件，所有`http`类型的请求，都是由该插件进行负载均衡的调用。

<img src="/img/shenyu/basicConfig/pluginHandle/selector_example.png" width="80%" height="80%" />

客户端接入`Apache ShenYu`网关后，会自动注册选择器和规则信息，关于选择器和规则配置，请参考：[选择器和规则管理](../selector-and-rule)。


#### 选择器处理

<img src="/img/shenyu/basicConfig/pluginHandle/selector_add.png" width="80%" height="80%" />


选择器处理: 对应[选择器和规则管理](../selector-and-rule)的`handle`字段，是网关匹配到流量以后，真实调用的`http`配置，可以配置多个，设置负载均衡权重，具体的负载均衡策略，在规则中指定。更多信息请参考插件管理中的 [插件处理管理](../plugin-handle-explanation) 。

* 处理配置详解：

  * `host`：填写 `localhost`，该字段暂时没使用。

  * `ip:port`：`ip` 与端口，这里填写你真实服务的 `ip` + 端口。

  * `protocol`：：`http` 协议，填写 `http://` 或者 `https://` ，不填写默认为:`http://`

  * `startupTime`： 启用时间。

  * `weight`：负载均衡权重。

  * `warmupTime`：预热时间。

  * `status`：开启或关闭。

  * `ip + port` 检测

    * 在 `shenyu-admin` 会有一个定时任务来扫描 配置的`ip`端口，如果发现下线，则会删除该 `ip + port`

    * 可以进行如下配置 ：
     
```yaml
shenyu:
  register:
    registerType: http 
    serverLists: 
    props:
      sessionTimeout: 5000
      connectionTimeout: 2000
      checked: true  # 默认为 ture，设置为false，不检测
      zombieCheckTimes: 5
      scheduledTime: 10 # 定时检测时间间隔，默认10秒

 ```  
 
#### 规则处理

 <img src="/img/shenyu/basicConfig/pluginHandle/rule_handle.png" width="80%" height="80%" />

规则处理，即`handle`字段，是网关对流量完成最终匹配后，采取何种处理规则。更多信息请参考插件管理中的 [插件处理管理](../plugin-handle-explanation) 。

* 处理配置详解：
    * `loadStrategy`：如果`http`客户端是一个集群，`Apache ShenYu`网关调用时采取哪种负载均衡策略，当前支持 `roundRobin`、`random`和`hash`。
    * `retryCount`：调用`http`客户端的重试次数。
    * `timeout`：调用`http`客户端的超时时间。
    * `headerMaxSize`：请求的`header`的最大值。
    * `requestMaxSize`：请求体的最大值。

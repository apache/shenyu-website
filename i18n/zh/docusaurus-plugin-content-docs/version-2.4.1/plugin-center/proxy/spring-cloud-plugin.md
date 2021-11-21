---
title: Spring Cloud插件
keywords: ["SpringCloud"]
description: Spring Cloud插件
---

## 说明

* 该插件是用来将`http协议` 转成 `Spring Cloud协议`。

## 插件设置

* 引入相关依赖，开启插件，请参考：[Spring Cloud快速开始](../../quick-start/quick-start-springcloud) 。

* `Spring Cloud`应用客户端接入，请参考：[Spring Cloud服务接入](../../user-guide/spring-cloud-proxy) 。

## 插件详解

客户端接入`Apache ShenYu`网关后，会自动注册选择器和规则信息，关于选择器和规则配置，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule) 。

#### 选择器处理

<img src="/img/shenyu/plugin/springcloud/selector_zh_new.png" width="80%" height="80%" />

选择器处理，即`handle`字段，是网关匹配到流量以后，可以进行处理的操作。更多信息请参考插件管理中的 [插件处理管理](../../user-guide/admin-usage/plugin-handle-explanation) 。

* 处理配置详解：

  * `serviceId`:serviceId。

  * `gray`：启用灰度路由。

    * `protocol`：协议默认值为'http'。
 
    * `upstreamUrl`: 服务器节点地址。

    * `weight`: 服务器节点权重。

    * `status`:true：服务器可用，false：服务器不可用。

    * `timestamp`：节点的启动时间。
  
    * `warmup`：节点的预热时间，参与负载均衡计算。

灰度路由

如果您想在springCloud插件中使用灰色路由，可以单击“灰色”按钮。

<img src="/img/shenyu/plugin/springcloud/gray_zh.png" width="80%" height="80%" />

* 灰度发布可以在发布新版本应用时，自定义控制新版本应用流量比重，渐进式完成新版本应用的全量上线，最大限度地控制新版本发布带来的业务风险，降低故障带来的影响面，同时支持快速回滚。

当开启灰度是，网关的负载平衡算法将从当前节点列表中选择一个节点进行路由，并且您可以通过修改节点权重以更改负载平衡算法中节点的权重。

<img src="/img/shenyu/plugin/springcloud/gray.png" width="80%" height="80%" />

需要注意的是，如果您的业务实例没有使用'shenyu-client-springcloud'的客户端进行业务注册发现，您应该在当前选择器页面上手动添加节点信息进行灰度路由。

#### 规则处理

<img src="/img/shenyu/plugin/springcloud/rule_zh.png" width="80%" height="80%" />

规则处理，即`handle`字段，是网关对流量完成最终匹配后，可以进行处理的操作。更多信息请参考插件管理中的 [插件处理管理](../../user-guide/admin-usage/plugin-handle-explanation) 。

* 处理配置详解：

  * `path`：请求路径。
  * `timeout`：设置请求超时时间。

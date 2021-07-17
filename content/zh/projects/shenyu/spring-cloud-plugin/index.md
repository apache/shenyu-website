---
title: Spring Cloud插件
keywords: SpringCloud
description: Spring Cloud插件
---

## 说明

* 该插件是用来将`http协议` 转成 `Spring Cloud协议`。

## 插件设置

* 引入相关依赖，开启插件，请参考：[Spring Cloud快速开始](../quick-start-springcloud) 。
 
* `Spring Cloud`应用客户端接入，请参考：[Spring Cloud服务接入](../spring-cloud-proxy) 。

## 插件详解

客户端接入`ShenYu`网关后，会自动注册选择器和规则信息，关于选择器和规则配置，请参考：[选择器和规则管理](../selector-and-rule) 。

#### 选择器处理

<img src="/img/shenyu/plugin/springcloud/springcloud-1.png" width="80%" height="80%" />

选择器处理，即`handle`字段，是网关匹配到流量以后，可以进行处理的操作。更多信息请参考插件管理中的 [插件处理管理](../plugin-handle-explanation) 。

* 处理配置详解：

     * `serviceId`：服务Id。
     
#### 规则处理
<img src="/img/shenyu/plugin/springcloud/springcloud-1.png" width="80%" height="80%" />

规则处理，即`handle`字段，是网关对流量完成最终匹配后，可以进行处理的操作。更多信息请参考插件管理中的 [插件处理管理](../plugin-handle-explanation) 。

* 处理配置详解：

     * `path`：请求路径。
     * `timeout`：设置请求超时时间。
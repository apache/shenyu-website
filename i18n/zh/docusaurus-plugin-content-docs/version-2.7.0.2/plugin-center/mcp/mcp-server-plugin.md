---
title: McpServer插件
keywords: ["mcpServer"]
description: mcp Server插件
---

## 说明

* `mcpServer`插件是启动 Shenyu 网关`mcpServer`功能的插件，启动该插件后，允许用户将`Tool`注册到网关统一管理。

* `mcpServer`插件需要配合`proxy`插件才能实现`Tool`的调用。

## 插件设置

* 引入相关依赖，开启插件，请参考：[McpServer快速开始](../../quick-start/quick-start-mcpServer) 。

* `McpTool`客户端接入，请参考：[McpTool服务接入](../../user-guide/proxy/mcp-tool-proxy.md) 。

* 选择器和规则配置，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。

## 插件详解

客户端接入`Apache ShenYu`网关后，会自动注册选择器和规则信息，关于选择器和规则配置，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule) 。

#### 选择器处理

<img src="/img/shenyu/plugin/mcpServer/selector_new.png" width="80%" height="80%" />

选择器处理，在当前版本仅支持`Condition`中的条件为startWith，`endpoint`等于网关路由加`Condition`配置的url加请求协议sse/streamablehttp

点击 SSE配置 Streamable配置 可以进入Json编辑页面，可以更方便的帮助用户编辑Mcp客户端需要使用的Json配置

<img src="/img/shenyu/plugin/mcpServer/mcp_client_config_zh.png" width="80%" height="80%" />

#### 工具处理

<img src="/img/shenyu/plugin/mcpServer/tool_config.png" width="80%" height="80%" />

<img src="/img/shenyu/plugin/mcpServer/request_config.png" width="80%" height="80%" />

工具处理，即`handle`字段，是网关对流量完成最终匹配后，可以进行处理的操作。更多信息请参考插件管理中的 [插件处理管理](../../user-guide/admin-usage/plugin-handle-explanation) 。

* tool配置详解：

    * `Description`：定义了工具的用途。

    * `Parameter`： 定义了工具需要的参数类型

* requestConfig配置详解

    * `url`：定义了context-path + 工具真实url

    * `method`：定义了工具方法的请求类型

    * `argsPosition`：定义了所有参数和参数位置的对应关系

    * `argsToJsonBody`：如果为true则会将所有参数添加到body中

    * `headers`：可以在此处添加Tool需要的header

## 如何禁用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `mcpServer` 设置为禁用。

![](/img/shenyu/plugin/mcpServer/disable.png)

---
title: McpServer Plugin
keywords: ["mcpServer"]
description: mcp Server Plugin
---

## Explanation

* The `mcpServer` plugin is used to enable the `mcpServer` functionality in the ShenYu gateway. After enabling this plugin, users can register `Tools` for unified management by the gateway.

* The `mcpServer` plugin must be used together with a `proxy` plugin to enable Tool invocation.

## Plugin Setting

* To add the necessary dependencies and enable the plugin, please refer to: [Quick Start with McpServer](../../quick-start/quick-start-mcpServer).

* For McpTool client integration, please refer to: [McpTool Service Integration](../../user-guide/proxy/mcp-tool-proxy.md).

* For selector and rule configuration, please refer to: [Selector and Rule Management](../../user-guide/admin-usage/selector-and-rule).

## Plugin Details

After the client is connected to the `Apache ShenYu` gateway, selector and rule information will be automatically registered. For details about selector and rule configuration, please refer to: [Selector and Rule Management](../../user-guide/admin-usage/selector-and-rule).

#### Selector Handling

<img src="/img/shenyu/plugin/mcpServer/selector_new.png" width="80%" height="80%" />

For selector handling, the current version only supports the `startWith` condition in `Condition`. The `endpoint` is equal to the gateway route plus the URL configured in `Condition` and the request protocol (sse/streamablehttp).

Click "SSE Configuration" or "Streamable Configuration" to enter the JSON editing page, which helps users conveniently edit the JSON configuration required by the Mcp client.

<img src="/img/shenyu/plugin/mcpServer/mcp_client_config_en.png" width="80%" height="80%" />

#### Tool Handling

<img src="/img/shenyu/plugin/mcpServer/tool_config.png" width="80%" height="80%" />

<img src="/img/shenyu/plugin/mcpServer/request_config.png" width="80%" height="80%" />

Tool handling refers to the `handle` field, which allows you to perform operations after the gateway has completed traffic matching. For more information, please refer to [Plugin Handle Explanation](../../user-guide/admin-usage/plugin-handle-explanation) in plugin management.

* Details of tool configuration:

  * `Description`: Defines the purpose of the tool.

  * `Parameter`: Defines the type of parameters required by the tool.

* Details of requestConfig configuration:

  * `url`: Defines context-path + the actual URL of the tool.

  * `method`: Defines the request type of the tool method.

  * `argsPosition`: Defines the correspondence between all parameters and their positions.

  * `argsToJsonBody`: If true, all parameters will be added to the body.

  * `headers`: You can add headers required by the Tool here.

## How to disable plugin

- In `shenyu-admin` --> Basic Configuration --> Plugin Management --> set `mcpServer` to disabled.

![](/img/shenyu/plugin/mcpServer/disable.png)

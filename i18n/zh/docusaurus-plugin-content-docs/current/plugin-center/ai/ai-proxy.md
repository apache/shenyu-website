---
title: AiProxy 插件
keywords: ["AiProxy"]
description: AiProxy 插件
---

## 说明

`aiProxy` 插件用于代理大模型请求。客户端将请求发送到 ShenYu 网关后，插件会根据规则中配置的 `provider`、`baseUrl`、`model`、`apiKey` 等信息调用对应的大模型服务，并将响应返回给客户端。

该插件可用于代理 OpenAI 协议兼容服务、阿里云等大模型服务，也可以代理本地部署且协议兼容的大模型服务。

## 插件配置

在 ShenYu Admin 中启用 `aiProxy` 插件后，需要先创建选择器，再创建规则。选择器用于匹配请求路径、请求头等条件，规则用于配置大模型服务参数。选择器和规则的通用配置请参考[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。

常用规则字段如下：

| 字段 | 说明 |
| --- | --- |
| `provider` | 大模型服务提供方，例如 `OpenAI`。 |
| `baseUrl` | 大模型服务 API 地址。 |
| `model` | 模型名称。 |
| `apiKey` | 上游大模型服务鉴权密钥。 |

配置示例：

![](/img/shenyu/plugin/ai-proxy/ai-proxy-selector-en.png)

![](/img/shenyu/plugin/ai-proxy/ai-proxy-rule-en.png)

> 注意：如果匹配路径中包含网关前缀，还需要配置 `contextPath` 插件移除前缀并组装正确的调用地址。详情请参考 [contextPath 插件](../http-process/contextpath-plugin)。

## API 调用

启用插件后，可以向 ShenYu 网关发送大模型请求：

```bash
curl --location --request POST 'http://localhost:9195/ai/proxy/v1/chat/completions' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "model": "gpt-4o-mini",
    "messages": [
      {
        "role": "system",
        "content": "You are a translation assistant. Please translate the input content into English."
      },
      {
        "role": "user",
        "content": "I bloom amidst slaughter, like a flower at dawn."
      }
    ]
  }'
```

![](/img/shenyu/plugin/ai-proxy/ai-proxy-api.png)

## Proxy API Key 管理

`aiProxy` 插件支持在 ShenYu Admin 中维护代理 API Key。每个代理 API Key 绑定到指定选择器，并映射到真实上游 API Key。

管理接口基础路径为 `/selector/{selectorId}/ai-proxy-apikey`：

| 方法 | 路径 | 说明 | 权限 |
| --- | --- | --- | --- |
| `POST` | `/selector/{selectorId}/ai-proxy-apikey` | 创建代理 API Key 映射 | `system:aiProxyApiKey:add` |
| `GET` | `/selector/{selectorId}/ai-proxy-apikey` | 分页查询代理 API Key 映射 | `system:aiProxyApiKey:list` |
| `PUT` | `/selector/{selectorId}/ai-proxy-apikey/{id}` | 更新代理 API Key 映射 | `system:aiProxyApiKey:edit` |
| `POST` | `/selector/{selectorId}/ai-proxy-apikey/batchDelete` | 批量删除映射 | `system:aiProxyApiKey:delete` |
| `POST` | `/selector/{selectorId}/ai-proxy-apikey/batchEnabled` | 批量启用或禁用映射 | `system:aiProxyApiKey:disable` |

当选择器配置中的 `proxyEnabled` 为 `true` 时，请求必须携带代理 API Key：

```text
X-API-KEY: <proxy-api-key>
```

代理模式开启后，真实上游 API Key 不会暴露给客户端。插件会在转发前根据代理 API Key 查找真实 API Key 并完成替换。

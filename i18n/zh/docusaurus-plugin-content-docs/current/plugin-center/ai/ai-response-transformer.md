---
title: AI 响应转换插件
keywords: ["AiResponseTransformer", "AI", "响应转换"]
description: 使用 LLM 转换上游 HTTP 响应。
---

## 概述

`aiResponseTransformer` 使用大语言模型（LLM）转换上游 HTTP 响应。匹配选择器和规则后，插件将请求上下文、上游响应及规则中的提示词发给模型，再将转换结果返回给客户端。常见用途包括统一响应格式，以及将旧接口返回的字段映射成客户端需要的结构。

## 引入与启用

在自定义网关中添加依赖，并在 Admin 的插件管理中启用 `aiResponseTransformer`：

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-ai-response-transformer</artifactId>
    <version>2.7.2</version>
</dependency>
```

为需要转换的路由创建[选择器和规则](../../user-guide/admin-usage/selector-and-rule.md)。插件的核心模块是 `shenyu-plugin-ai-response-transformer`，核心类是 `org.apache.shenyu.plugin.ai.transformer.response.AiResponseTransformerPlugin`。

## 规则配置

规则中提供的字段会覆盖对应的插件级配置。未提供的字段沿用插件级配置。

| 字段 | 用途 |
| --- | --- |
| `provider` | 模型提供者名称，例如 `OpenAI`。 |
| `baseUrl` | 模型服务的基础地址。OpenAI 示例填写 `https://api.openai.com`，客户端会拼接 `/v1/chat/completions`。 |
| `apiKey` | 调用模型所需的 API 密钥。 |
| `model` | 使用的模型名称。 |
| `content` | 描述响应转换方式的提示词。 |

以下规则将成功响应的原始 JSON 放入 `data` 字段，并保留上游状态码：

```json
{
  "provider": "OpenAI",
  "baseUrl": "https://api.openai.com",
  "apiKey": "your_api_key",
  "model": "gpt-4o-mini",
  "content": "For a successful upstream response, keep the HTTP status and wrap the original JSON body as the data field of an object with code 200 and message success."
}
```

## 响应处理

- 有效配置中的 `provider`、`baseUrl` 或 `apiKey` 缺失时，插件记录配置缺失并跳过转换。
- 插件缓冲完整的上游响应后才调用模型，适用于有限的 HTTP 响应。不支持 SSE 或其他需要逐块发送的流式响应。
- 模型输出可以改变响应头、响应体和状态码。模型调用失败时，插件会回退到上游响应。模型返回有效的 `204` 或 `304` 响应时，网关按无响应体处理。
- 提示词会包含请求和响应的头部及正文。请只对允许把这些数据发送给所配置模型服务的路由启用该插件。

## 示例

假设上游响应体为：

```json
{
  "id": "1001",
  "name": "Tom"
}
```

使用上面的规则并命中路由时，客户端可能收到：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "1001",
    "name": "Tom"
  }
}
```

转换结果取决于模型输出。生产中应缩小提示词的修改范围，并用下游契约测试验证转换后的响应。实现细节见 [v2.7.2 插件源码](https://github.com/apache/shenyu/tree/v2.7.2/shenyu-plugin/shenyu-plugin-ai/shenyu-plugin-ai-response-transformer)。

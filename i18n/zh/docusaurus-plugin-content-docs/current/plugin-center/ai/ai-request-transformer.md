---
title: AI 请求转换插件
keywords: ["AiRequestTransformer", "AI", "request transformer"]
description: 使用 LLM 转换请求，并了解 2.7.2 的请求体重放和失败处理。
---

## 概述

`aiRequestTransformer` 根据规则中的提示词调用 LLM，在请求继续进入插件链之前转换请求头、路径、查询参数、JSON 请求体或表单请求体。适合请求格式规范化、旧接口适配等场景。

## 引入与启用

在自定义网关中添加依赖，并在 Admin 的插件管理中启用 `aiRequestTransformer`：

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-ai-request-transformer</artifactId>
    <version>2.7.2</version>
</dependency>
```

创建[选择器和规则](../../user-guide/admin-usage/selector-and-rule.md)。核心实现为 `org.apache.shenyu.plugin.ai.transformer.request.AiRequestTransformerPlugin`。

## 规则配置

规则配置可覆盖插件级配置：

| 字段 | 必填 | 含义 |
| --- | --- | --- |
| `provider` | 是 | LLM 提供者名称，例如 `OpenAI`。 |
| `baseUrl` | 是 | LLM 提供者的对话补全端点。 |
| `apiKey` | 是 | 调用模型的 API Key。 |
| `model` | 是 | 模型名称。 |
| `content` | 是 | 描述请求转换方式的提示词。 |

```json
{
  "provider": "OpenAI",
  "baseUrl": "https://api.openai.com/v1/chat/completions",
  "apiKey": "your_api_key",
  "model": "gpt-4o-mini",
  "content": "Transform the request body to {\"name\":\"<original userName>\",\"id\":\"<original userId>\"} and keep the original path."
}
```

## 请求处理与失败行为

匹配选择器和规则后，插件读取模型配置，根据原始请求构造提示词，将模型响应解析为请求修改，再交给下游插件和上游服务。缺少 `provider`、`baseUrl` 或 `apiKey` 时，会记录配置缺失并跳过转换。

2.7.2 只读取一次入站请求体，并通过缓冲字节执行转换或回退。提示词准备、模型调用或应用转换失败时，完整重放原始请求体。下游插件或上游服务产生的错误会正常传播，不会触发插件链再次执行。

请求体缓冲上限为 5 MiB。声明的 `Content-Length` 超过该值时，直接跳过转换并转发；读取过程中超过上限则失败，不会重放已经部分消耗的请求体。这也适用于事先无法确定大小的超大分块请求。

## 示例

```bash
curl --location 'http://localhost:9195/http/order' \
  --header 'Content-Type: application/json' \
  --data-raw '{"userId":"1001","userName":"Tom"}'
```

在匹配规则及模型返回正确转换结果的情况下，下游可以收到：

```json
{
  "id": "1001",
  "name": "Tom"
}
```

转换结果依赖模型响应。提示词应限制修改范围，并通过下游契约测试验证结果。实现细节见 [v2.7.2 插件源码](https://github.com/apache/shenyu/tree/v2.7.2/shenyu-plugin/shenyu-plugin-ai/shenyu-plugin-ai-request-transformer)。

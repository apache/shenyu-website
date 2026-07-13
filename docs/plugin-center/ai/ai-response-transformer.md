---
title: AiResponseTransformer Plugin
keywords: ["AiResponseTransformer", "AI", "response transformer"]
description: AiResponseTransformer plugin
---

## Description

The **aiResponseTransformer** plugin uses an LLM to transform upstream HTTP responses before they are returned to the client. It decorates the response, sends the response content and transformation prompt to the configured LLM provider, and writes the transformed result back to the client response.

Typical use cases include standardizing upstream response formats, masking or summarizing response fields, and adapting a response body to a client-specific schema.

## Plugin Code

- Core module: `shenyu-plugin-ai-response-transformer`
- Starter module: `shenyu-spring-boot-starter-plugin-ai-response-transformer`
- Core class: `org.apache.shenyu.plugin.ai.transformer.response.AiResponseTransformerPlugin`
- Plugin name: `aiResponseTransformer`

## Import Dependency

Add the dependency to the `shenyu-bootstrap` module.

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-ai-response-transformer</artifactId>
    <version>${project.version}</version>
</dependency>
```

## Enable Plugin

In `shenyu-admin` --> BasicConfig --> Plugin, enable `aiResponseTransformer`.

For Selector and Rule configuration, see the Selector and Rule Management document.

## Rule Configuration

The rule configuration can override the plugin-level configuration. The following fields are supported:

| Field | Required | Description |
| :---- | :------- | :---------- |
| `provider` | Yes | LLM provider name, for example `OpenAI`. |
| `baseUrl` | Yes | Chat completion endpoint of the LLM provider. |
| `apiKey` | Yes | API key used to call the LLM provider. |
| `model` | Yes | Model name. |
| `content` | Yes | Prompt that describes how to transform the upstream response. |

Example rule handle:

```json
{
  "provider": "OpenAI",
  "baseUrl": "https://api.openai.com/v1/chat/completions",
  "apiKey": "your_api_key",
  "model": "gpt-4o-mini",
  "content": "Transform the upstream response to {\"code\":200,\"message\":\"success\",\"data\":<original body>}."
}
```

## Response Behavior

When a request matches the Selector and Rule:

1. ShenYu proxies the request to the upstream service.
2. The plugin captures the upstream response body.
3. The configured LLM transforms the response according to `content`.
4. ShenYu returns the transformed response to the client.

If `provider`, `baseUrl`, or `apiKey` is missing, the plugin logs the missing configuration and returns the upstream response without transformation.

## Example

Upstream response:

```json
{
  "id": "1001",
  "name": "Tom"
}
```

With a matching rule prompt, the client can receive:

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

Use narrow prompts and stable response schemas for production traffic. The final response depends on the LLM output, so downstream clients should still validate the response contract.

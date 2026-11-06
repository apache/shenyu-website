---
title: AiRequestTransformer Plugin
keywords: ["AiRequestTransformer", "AI", "request transformer"]
description: AiRequestTransformer plugin
---

## Description

The **aiRequestTransformer** plugin uses an LLM to transform incoming HTTP requests before they continue through the ShenYu plugin chain. It can rewrite request headers, request paths, query parameters, JSON bodies, and form bodies according to the prompt configured in the plugin rule.

Typical use cases include normalizing client request formats, adapting legacy request bodies to a new upstream API, and generating a target request shape from natural-language transformation instructions.

## Plugin Code

- Core module: `shenyu-plugin-ai-request-transformer`
- Starter module: `shenyu-spring-boot-starter-plugin-ai-request-transformer`
- Core class: `org.apache.shenyu.plugin.ai.transformer.request.AiRequestTransformerPlugin`
- Plugin name: `aiRequestTransformer`

## Import Dependency

Add the dependency to the `shenyu-bootstrap` module.

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-ai-request-transformer</artifactId>
    <version>${project.version}</version>
</dependency>
```

## Enable Plugin

In `shenyu-admin` --> BasicConfig --> Plugin, enable `aiRequestTransformer`.

For Selector and Rule configuration, see the Selector and Rule Management document.

## Rule Configuration

The rule configuration can override the plugin-level configuration. The following fields are supported:

| Field | Required | Description |
| :---- | :------- | :---------- |
| `provider` | Yes | LLM provider name, for example `OpenAI`. |
| `baseUrl` | Yes | Chat completion endpoint of the LLM provider. |
| `apiKey` | Yes | API key used to call the LLM provider. |
| `model` | Yes | Model name. |
| `content` | Yes | Prompt that describes how to transform the request. |

Example rule handle:

```json
{
  "provider": "OpenAI",
  "baseUrl": "https://api.openai.com/v1/chat/completions",
  "apiKey": "your_api_key",
  "model": "gpt-4o-mini",
  "content": "Transform the request body to {\"name\":\"<original userName>\",\"id\":\"<original userId>\"} and keep the original path."
}
```

## Request Behavior

When a request matches the Selector and Rule:

1. ShenYu reads the configured LLM provider, endpoint, key, model, and prompt.
2. The plugin builds a transformation prompt from the original request.
3. The LLM response is parsed and applied to the current request.
4. The transformed request continues to downstream plugins and the upstream service.

If `provider`, `baseUrl`, or `apiKey` is missing, the plugin logs the missing configuration and lets the request continue without transformation.

## Example

Original request:

```bash
curl --location 'http://localhost:9195/http/order' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "userId": "1001",
    "userName": "Tom"
  }'
```

With a matching rule prompt, the plugin can transform the body before proxying it:

```json
{
  "id": "1001",
  "name": "Tom"
}
```

Use clear and deterministic prompts for production traffic. The transformed request depends on the LLM response, so keep prompts narrow and validate the downstream contract.

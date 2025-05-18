---
title: AiPrompt Plugin
keywords: ["aiPrompt"]
description: aiPrompt plugin
---

## Explanation

The **aiPrompt** plugin is used to dynamically inject preset prompt content (such as system-role messages or contextual information) into requests before forwarding them. When a request configured with aiPrompt reaches the gateway, the plugin first adds the specified prompt text to the request body (for example, inserting a **system** message at the beginning of the message list). This is useful for unified context control or preset roles—for instance, automatically adding a “You are a translation assistant” system prompt to every request. Used together with aiProxy, it’s primarily for enhancing prompts.

## Plugin Configuration

In the ShenYu admin interface, you first create a **Selector** and then a **Rule**. A Selector matches incoming requests (by path, headers, etc.), while a Rule configures plugin parameters or forwarding targets. For more on Selector and Rule setup, see [Selector and Rule Management](../../user-guide/admin-usage/selector-and-rule).

When configuring aiPrompt, pay attention to:

- **Selector**: Defines which requests to match. For example, set `Pattern` to `/**` to match all requests, or specify a particular route.
- **Rule**: Specify plugin parameters at the rule level:
    - `prepend`: **Prepend prompt content.** This text is inserted before the user’s original messages as the first message sent to the LLM. Typically used to inject global system instructions or context, e.g., “You are a translation assistant; translate user input into English.”
    - `preRole`: **Role for the prepend prompt.** Sets the `role` field for the `prepend` message (same options as the OpenAI Chat API).
    - `append`: **Append prompt content.** Text added after the user’s messages.
    - `postRole`: **Role for the append prompt.** Sets the `role` field for the `append` message.

Below are example screenshots of aiPrompt plugin configuration in the admin UI:

![](/img/shenyu/plugin/ai-prompt/ai-prompt-selector-en.png)

![](/img/shenyu/plugin/ai-prompt/ai-prompt-rule-en.png)

> **Note:** The aiPrompt plugin depends on aiProxy. In a typical request flow, apply **AiPrompt** first (if injecting prompts), then **AiTokenLimiter** for token counting/rate limiting (if needed), and finally **AiProxy** to forward the request to the LLM service. Ensure **AiTokenLimiter**’s **sort** value is **less than** **AiProxy** and **greater than** **AiPrompt** in the “Plugin Management” order.

## API Usage

After enabling the aiProxy plugin, you can send requests to the ShenYu gateway (e.g., via Postman) to obtain LLM responses through the proxy:

```bash
curl --location --request POST 'http://localhost:9195/ai/proxy/v1/chat/completions' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "model": "gpt-4o-mini",
    "messages": [
      {
        "role": "user",
        "content": "I bloom amidst slaughter, like a flower at dawn."
      }
    ]
  }'
```
![](/img/shenyu/plugin/ai-prompt/ai-prompt-api.png)
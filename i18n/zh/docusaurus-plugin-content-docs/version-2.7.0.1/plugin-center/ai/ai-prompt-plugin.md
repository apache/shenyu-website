---
title: AiPmompt插件
keywords: ["AiPmompt"]
description: AiPmompt插件
---


## 说明

aiPrompt 插件用于在转发请求之前动态注入预设的 Prompt 内容（如 system 角色语句、上下文信息等）。配置了 aiPrompt 插件的请求到达网关后，插件会先将指定的提示文本添加到请求体（例如在消息列表前插入一个 system 消息）。这对于统一的上下文控制或预设角色很有用，例如可以在所有请求前自动添加“你是一个 AI 翻译助手”之类的 system 提示。配合aiProxy进行使用， 主要用于提示词增强。

## 插件设置

在 ShenYu 管理界面配置插件时，需要先创建 **Selector**（选择器）再创建 **Rule**（规则）。Selector 通常用于匹配请求条件（如路径、Header 等），Rule 用于配置插件参数或转发目标。关于选择器和规则配置，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。

使用aiPrompt插件主要关注以下字段：

- **Selector**: 选择器通常指定匹配的路径或请求特征。如可设置 `Pattern` 为 `/**` 以匹配所有请求，或指定特定路由路径。

- **Rule**: 在规则层面为各插件填写参数。各插件常见字段如下：

  - `prepend：`**前置提示内容**。会被插入到用户原始消息之前，作为第一个消息发给大模型。通常用于注入全局的系统指令或上下文说明，例如“你是一个翻译助手，帮我将用户输入翻译为英文。”。;
  - `preRole:`**前置提示的角色**。指定 `prepend` 这条消息的 `role` 字段，可选值同 OpenAI Chat API;
  - `append:` 后置提示内容;
  - `postRole:` 后置提示角色;

以下给出aiPrompt插件的配置示例截图在 （admin 界面）：

**注意**：aiPrompt插件依赖于aiProxy插件， 常的调用流程中，应先用 **AiPrompt**（如果需要注入 prompt），再用 **AiTokenLimiter** 做令牌统计/限流（如果需要token限流），最后由 **AiProxy** 将请求转发给 LLM 服务。确保在 “插件管理” 中，**AiTokenLimiter** 的 **sort** 值 **小于** **AiProxy**，并 **大于** **AiPrompt**。

![](/static/img/shenyu/plugin/ai-prompt/ai-prompt-selector-zh.png)

![ai-proxy-rule-zh](/static/img/shenyu/plugin/ai-prompt/ai-prompt-rule-zh.png)



## API调用说明

启用AiProxy插件后， 通过postman等工具请求shenyu网关， 即可通过网关代理获取LLM响应

```bash
curl --location --request POST 'http://localhost:9195/ai/proxy/v1/chat/completions' \
--header 'Content-Type: application/json' \
--data-raw '{
    "model": "gpt-4o-mini",
    "messages": [
        {
            "role": "user",
            "content": "我于杀戮之中盛放，亦如黎明中的花朵"
        }
    ]
}'
```

示例截图

![ai-proxy-api](/static/img/shenyu/plugin/ai-proxy/ai-proxy-api.png)

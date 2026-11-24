---
title: 敏感词插件
keywords: ["sensitiveWord", "AI", "Redis"]
description: 配置 Apache ShenYu 2.7.2 的请求体敏感词检查。
---

## 概述

`sensitiveWord` 插件使用 Redis 集合和可选的规则内词表检查请求体。命中敏感词时返回 HTTP 403。插件检查原始请求体及解码后的 JSON 字符串值，包括 Unicode 转义，因此转义文本不能绕过对应词条。检查通过的请求会保留请求体，供下游插件继续读取。

## 启用插件

自定义网关需添加以下 Starter；使用发行包时，先确认是否已包含该依赖：

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-ai-sensitive-word</artifactId>
    <version>2.7.2</version>
</dependency>
```

在 Admin 中启用 `sensitiveWord`，并配置 Redis 连接，例如：

```json
{
  "mode": "standalone",
  "url": "localhost:6379",
  "database": 0
}
```

地址应能被网关访问。Redis 启用认证时，还需配置 `password`。将词条存入 Redis 集合，规则也可通过 `words` 添加以逗号或换行分隔的词条。

## 规则配置

创建匹配请求的[选择器和规则](../../user-guide/admin-usage/selector-and-rule.md)，并配置规则 handle：

| 字段 | 默认值 | 含义 |
| --- | --- | --- |
| `redisKey` | `shenyu:sensitive:words` | 保存词条的 Redis 集合键。 |
| `refreshIntervalSeconds` | `300` | 词库缓存有效期，单位为秒；非正值表示每次请求重新读取。 |
| `words` | 无 | 规则内词条，与 Redis 词库合并使用。 |
| `failClosed` | `false` | 无法执行检查时是否拒绝请求，避免放行未检查的请求。 |
| `maxBodySize` | `0` | 扫描大小限制；缓冲前检查声明的字节数，读取后检查字符数。`0` 表示不限。它不是分块请求或多字节请求体的严格缓冲上限。 |

```json
{
  "redisKey": "shenyu:sensitive:words",
  "refreshIntervalSeconds": 300,
  "words": "blocked-example",
  "failClosed": true,
  "maxBodySize": 1048576
}
```

## Redis 失败与请求拒绝

* Redis 模板尚未初始化时，`failClosed: true` 返回 HTTP 403；`false` 放行未检查的请求。
* Redis 刷新失败时，优先复用已有词库缓存；没有缓存时，仍可使用规则内词条执行检查。只有没有这些可用词库时，`failClosed` 才决定是否拒绝，因此 Redis 故障并不总是导致拒绝。
* 检测到请求体超过 `maxBodySize` 时，`failClosed: true` 拒绝请求，`false` 跳过检查并转发。声明的 `Content-Length` 已超限时，不会缓冲请求体。
* 拒绝响应不回显命中的词条，但服务端警告日志可能记录命中的词条。

用于生产流量前，验证正常请求、字面词条、对应的 JSON Unicode 转义文本，以及 Redis 不可用时的行为。该插件检查请求体，不提供响应过滤或任意结构化数据授权。

行为及默认值以 [v2.7.2 实现](https://github.com/apache/shenyu/tree/v2.7.2/shenyu-plugin/shenyu-plugin-ai/shenyu-plugin-ai-sensitive-word)和 [`SensitiveWordHandle`](https://github.com/apache/shenyu/blob/v2.7.2/shenyu-common/src/main/java/org/apache/shenyu/common/dto/convert/rule/SensitiveWordHandle.java) 为准。

---
title: Sensitive Word Plugin
keywords: ["sensitiveWord", "AI", "Redis"]
description: Configure request-body sensitive-word inspection in Apache ShenYu 2.7.2.
---

## Overview

The `sensitiveWord` plugin inspects request bodies against a Redis set and optional rule-local words. A match rejects the request with HTTP 403. It checks the raw body and decoded JSON string values, including Unicode escapes, so escaped text cannot bypass a literal dictionary word. Accepted requests retain their body for downstream plugins.

## Enable the plugin

Add the starter to a custom gateway, or check that it is already included in your distribution:

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-ai-sensitive-word</artifactId>
    <version>2.7.2</version>
</dependency>
```

Enable `sensitiveWord` in Admin and configure its Redis connection, for example:

```json
{
  "mode": "standalone",
  "url": "localhost:6379",
  "database": 0
}
```

Use the address reachable from the gateway and configure `password` when Redis requires authentication. Store dictionary entries as Redis set members. A rule can also add comma-separated or newline-separated `words`.

## Rule configuration

Create a matching [selector and rule](../../user-guide/admin-usage/selector-and-rule.md), then configure the rule handle:

| Field | Default | Meaning |
| --- | --- | --- |
| `redisKey` | `shenyu:sensitive:words` | Redis set containing dictionary words. |
| `refreshIntervalSeconds` | `300` | Dictionary cache lifetime in seconds; a non-positive value reloads on every request. |
| `words` | None | Rule-local words, merged with the Redis dictionary. |
| `failClosed` | `false` | Reject when inspection is unavailable rather than passing an uninspected request. |
| `maxBodySize` | `0` | Scan-size bound, checked against declared bytes before buffering and character count after reading; `0` means unlimited. It is not a strict buffering bound for chunked or multibyte bodies. |

```json
{
  "redisKey": "shenyu:sensitive:words",
  "refreshIntervalSeconds": 300,
  "words": "blocked-example",
  "failClosed": true,
  "maxBodySize": 1048576
}
```

## Redis failures and request rejection

* Before the Redis template is initialized, `failClosed: true` rejects with HTTP 403; `false` lets the uninspected request continue.
* If refreshing Redis fails, an existing cached dictionary is reused. If none exists, rule-local words can still be checked. `failClosed` rejects only when no such dictionary is available; a Redis outage does not always imply rejection.
* A body detected above `maxBodySize` is rejected when `failClosed` is true, or forwarded without scanning when false. Requests with a known oversized `Content-Length` are not buffered.
* The rejection response does not echo dictionary matches. Matching words can appear in server-side warning logs.

Verify a clean request, a matching literal, its JSON Unicode-escaped equivalent, and Redis-unavailable behavior before enabling a rule for production traffic. This plugin inspects request bodies; it does not provide response filtering or arbitrary structured-data authorization.

Behavior and defaults are defined by the [v2.7.2 implementation](https://github.com/apache/shenyu/tree/v2.7.2/shenyu-plugin/shenyu-plugin-ai/shenyu-plugin-ai-sensitive-word) and [`SensitiveWordHandle`](https://github.com/apache/shenyu/blob/v2.7.2/shenyu-common/src/main/java/org/apache/shenyu/common/dto/convert/rule/SensitiveWordHandle.java).

---
title: Logging插件
keywords: ["logging"]
description: logging插件
---

# 1. 概述

## 1.1 插件名称

* 请求日志记录插件

## 1.2 适用场景

* 开发时调试或者线上排查问题等情况下，需要在网关侧查看本次请求在转发过程中的相关信息，如请求头、请求参数或响应头、响应体等。

## 1.3 插件功能

* 通过logback或者log4j收集请求的url，请求头，请求体，响应信息和响应体，并将请求信息存储在本地。

## 1.4 插件代码

* 核心模块 `shenyu-pluign-logging-console`.

* 核心类 `org.apache.shenyu.plugin.logging.console.LoggingConsolePlugin`

## 1.5 添加自哪个shenyu版本

* ShenYu 2.4.0

# 2. 如何使用插件

## 2.1 插件使用流程图

![](/img/shenyu/plugin/logging/logging-console/loggingConsole-use-en.png)

## 2.2 导入pom

- 在ShenYu-Bootstrap导入对应的pom依赖。

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-logging-console</artifactId>
    <version>${project.version}</version>
</dependency>
```

## 2.3 启用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理-> logging ，设置为开启。

## 2.4 配置插件

* 插件和选择器配置。请查看: [Selector and rule config](../../user-guide/admin-usage/selector-and-rule.md).

## 2.5 示例

## 2.5.1 收集http请求信息

> 在你使用日志之前请在`ShenYuAdmin`开启日志插件.

### 2.5.1.1 选择器配置

![](/img/shenyu/plugin/logging/logging-console/log-selector-zh.jpg)

### 2.5.1.2 规则配置

![](/img/shenyu/plugin/logging/logging-console/log-rule-zh.jpg)

### 2.5.1.3 调用服务

![](/img/shenyu/plugin/logging/logging-console/call-service.png)

### 2.5.1.4 验证结果

如果请求成功，你将会在控制台看到如下信息。

```
Request Uri: http://localhost:9195/test/payment
Request Method: POST

[Request Headers Start]
Content-Type: application/json
Content-Length: 46
Host: localhost:9195
Connection: Keep-Alive
User-Agent: Apache-HttpClient/4.5.13 (Java/11.0.11)
Cookie: JSESSIONID=CD325CE813F61BB37783A1D0835959DD
Accept-Encoding: gzip,deflate
[Request Headers End]

[Request Body Start]
{
  "userId": "11",
  "userName": "xiaoming"
}
[Request Body End]

Response Code: 200 OK

[Response Headers Start]
transfer-encoding: chunked
Content-Length: 37
Content-Type: application/json
[Response Headers End]

[Response Body Start]
{"userId":"11","userName":"xiaoming"}
[Response Body End]
```

# 3. 如何禁用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理-> logging ，设置为关闭。

![](/img/shenyu/plugin/logging/logging-console/unenable-log-plugin-zh.jpg)

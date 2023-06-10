---
title: Logging Plugin
keywords: ["logging"]
description: logging plugin
---

# 1. Overview

## 1.1 Plugin Name

* Logging-Console Plugin

## 1.2 Appropriate Scenario

* Users may want to view the information about request(including request headers, request parameters, response headers, response body...etc) where in the side of gateway when debugging during development or troubleshooting problems online.

## 1.3 Plugin functionality

* Collect http request url, header, request body, response and response body by logback or log4j, the log file will be saved locally. 

## 1.4 Plugin code

* Core Module `shenyu-pluign-logging-console`.

* Core Class `org.apache.shenyu.plugin.logging.console.LoggingConsolePlugin`

## 1.5 Added Since Which shenyu version

* Since shenyu 2.4.0

# 2. How to use plugin

## 2.1 Plugin-use procedure chart

![](/img/shenyu/plugin/logging/logging-console/loggingConsole-use-en.png)

## 2.2 Import pom

- import maven config in shenyu-bootstrap project's `pom.xml` file.

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-logging-console</artifactId>
    <version>${project.version}</version>
</dependency>
```

## 2.3 Enable plugin

- In shenyu-admin --> BasicConfig --> Plugin --> loggingConsole set Status enable.

## 2.4 Config plugin

* Selector and rule Config. Please refer: [Selector and rule config](../../user-guide/admin-usage/selector-and-rule.md).

## 2.5 Examples

## 2.5.1 Collect all http request log

> you must open loggingConsole plugin before you use loggingConsole plugin.

### 2.5.1.1 Selector Configuration

![](/img/shenyu/plugin/logging/logging-console/log-selector-en.jpg)

### 2.5.1.2 Rule Configuration

![](/img/shenyu/plugin/logging/logging-console/log-rule-en.jpg)

### 2.5.1.3 Call Http Service

![](/img/shenyu/plugin/logging/logging-console/call-service.png)

### 2.5.1.4 Check Result

if the request arrived successfully, you will see request information as follow.

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

# 3. How to disable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `loggingConsole` set Status disable.

![](/img/shenyu/plugin/logging/logging-console/unenable-log-plugin-en.jpg)

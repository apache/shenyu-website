---
title: Logging Aliyun Sls Plugin
keywords: ["logging"]
description: logging plugin
---

# 1. Overview

## 1.1 Plugin Name

* Logging-AliyunSls Plugin

## 1.2 Appropriate Scenario

* collect http request information to aliyun sls, analysis request information by aliyun sls platform.

## 1.3 Plugin functionality

* The gateway receives requests from the client, forwards them to the server, and returns the server results to the client. The gateway can record the details of each request，
* the plugin records access logs and sends to aliyun sls platform.

## 1.4 Plugin code

* Core Module `shenyu-plugin-logging-aliyun-sls`

* Core Class `org.apache.shenyu.plugin.aliyun.sls.LoggingAliYunSlsPlugin`
* Core Class `org.apache.shenyu.plugin.aliyun.sls.client.AliyunSlsLogCollectClient`

## 1.5 Added Since Which shenyu version

ShenYu 2.5.0

# 2. How to use plugin

## 2.1 Plugin-use procedure chart

![](/img/shenyu/plugin/logging/logging-console/loggingConsole-use-en.png)

## 2.2 Import pom

- import maven config in shenyu-bootstrap project's `pom.xml` file.

```xml
<!-- shenyu logging-aliyunsls plugin start -->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-logging-aliyun-sls</artifactId>
  <version>${project.version}</version>
</dependency>
<!-- shenyu logging-aliyunsls plugin end -->
```

## 2.3 Enable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `loggingAliyunSls` set Status enable.

## 2.4 Config plugin

### 2.4.1 Plugin configuration

![](/img/shenyu/plugin/logging/logging-aliyun-sls/plugin-config-en.jpg)

| config-item     | type    | description                                                  | remarks                  |
| :-------------- | :------ | :----------------------------------------------------------- | :-----------------       |
| accessId        | String  | accessId                                                     | must                     |
| accesskey       | String  | accesskey                                                    | must                     |
| host            | String  | host name, example:cn-guangzhou.log.aliyuncs.com             | must                     |
| projectName     | String  | log project name                                             | optional, default shenyu |
| logStoreName    | String  | log store name                                               | optional, default shenyu-logstore |
| topic           | String  | aliyun sls log topic                                         | optional, default shenyu-topic    |
| ttlInDay        | Integer | ttl times in one day                                         | optional, default 3 |
| shardCount      | Integer | aliyun sls log shard count                                   | optional, default 10 |
| sendThreadCount | Integer | send log to aliyun sls thread number                         | optional, default 1 |
| ioThreadCount   | Integer | io thread count                                              | optional, default 1 |
| sampleRate      | String  | sample consume rate                                          | optional, default 1 |
| maxRequestBody  | Integer | max request body                                             | optional, default 524288 |
| maxResponseBody | Integer | max response body                                            | optional, default 524288 |
| bufferQueueSize | Integer | consume log queue size                                       | optional, default 50000  |


### 2.4.2 Configuration Selectors and Rules

* Selector and rule Config. Please refer: [Selector and rule config](../../user-guide/admin-usage/selector-and-rule.md).

## 2.5 Logging Info

collect request info as follows

| Field Name                  |                                                                               Meaning                                                                               | Description                            | Remarks   |
|:----------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------|:----|
| clientIp              |                                                                              Client IP                                                                              |                               |     |
| timeLocal             |                                                        Request time string, format: yyyy-MM-dd HH:mm:ss.SSS                                                         |                               |     |
| method                | request method (different rpc type is not the same, http class for: get, post wait, rpc class for the interface name) |                               |     |
| requestHeader         |                                                                    Request header (json format)                                                                     |                               |     |
| responseHeader        |                                                                    Response header (json format)                                                                    |                               |     |
| queryParams           |                                                                      Request query parameters                                                                       |                               |     |
| requestBody           |                                                       Request Body (body of binary type will not be captured)                                                       |                               |     |
| requestUri            |                                                                             Request uri                                                                             |                               |     |
| responseBody          |                                                                            Response body                                                                            |                               |     |
| responseContentLength |                                                                         Response body size                                                                          |                               |     |
| rpcType               |                                                                              rpc type                                                                               |                               |     |
| status                |                                                                           response status                                                                           |                               |     |
| upstreamIp            |                                                                            Upstream (program providing the service) IP                                                                              |                               |     |
| upstreamResponseTime  |                                                                      Time taken by the upstream (program providing the service) to respond to the request (ms ms)                                                                         |                               |     |
| userAgent             |                                                                                Requested user agent                                                                                |                               |     |
| host                  |                                                                               The requested host                                                                               |                               |     |
| module                |                                                                                Requested modules                                                                                |                               |     |
| path                  |                                                                             The requested path                                                                              |                               |     |
| traceId                |                                                                              Requested Link Tracking ID                                                                              | Need to access link tracking plugins, such as skywalking,zipkin |     |

## 2.6 Examples

### 2.6.1 Collect Http Log by aliyun sls platform

#### 2.6.1.1 Plugin Configuration

* Open the plugin and configure aliyun-sls, configure it as follows.

![](/img/shenyu/plugin/logging/logging-aliyun-sls/plugin-config-en.jpg)

#### 2.6.1.2 Selector Configuration

![](/img/shenyu/plugin/logging/logging-aliyun-sls/aliyun-sls-log-selector-en.png)

#### 2.6.1.3 Rule Configuration

![](/img/shenyu/plugin/logging/logging-aliyun-sls/aliyun-sls-log-rule-en.png)

#### 2.6.1.4 Send Request

![](/img/shenyu/plugin/logging/logging-aliyun-sls/call-service.png)

#### 2.6.1.5 Aliyun sls Platform Display

![](/img/shenyu/plugin/logging/logging-aliyun-sls/aliyun-sls-log.jpg)

# 3. How to disable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `loggingAliyunSls` set Status disable.

---
title: Logging-Tencent-Cls Plugin
keywords: ["Logging"]
description: logging plugin
---

# 1. Overview

## 1.1 Plugin Name

* Logging-TencentCls Plugin

## 1.2 Appropriate Scenario

* collect http request information to tencent cls, analysis request information by tencent cls platform.

## 1.3 Plugin functionality

* The gateway receives requests from the client, forwards them to the server, and returns the server results to the client. The gateway can record the details of each request，
* the plugin records access logs and sends to tencent cls platform.

## 1.4 Plugin code

* Core Module `shenyu-plugin-logging-tencent-cls`

* Core Class `org.apache.shenyu.plugin.tencent.cls.LoggingTencentClsPlugin`
* Core Class `org.apache.shenyu.plugin.tencent.cls.client.TencentClsLogCollectClient`

## 1.5 Added Since Which shenyu version

ShenYu 2.5.1

# 2. How to use plugin

## 2.1 Plugin-use procedure chart

![](/img/shenyu/plugin/plugin_use_en.jpg)

## 2.2 Import pom

- import maven config in shenyu-bootstrap project's `pom.xml` file.

```xml
<!-- shenyu logging-tencent-cls plugin start -->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-logging-tencent-cls</artifactId>
  <version>${project.version}</version>
</dependency>
<!-- shenyu logging-tencent-cls plugin end -->
```

## 2.3 Enable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `loggingTencentCls` set Status enable.

## 2.4 Config plugin

### 2.4.1 Plugin configuration

![](/img/shenyu/plugin/logging/logging-tencent-cls/plugin-config-en.jpg)

| config-item         | type    | remarks                              | description                                                                                                                                                                                                                                                                                                                                  |
|:--------------------|:--------|:-------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| secretId            | String  | must                                 | secretId                                                                                                                                                                                                                                                                                                                                     |
| secretKey           | String  | must                                 | secretKey                                                                                                                                                                                                                                                                                                                                    |
| endpoint            | String  | must                                 | host name, example:ap-guangzhou.cls.tencentcs.com                                                                                                                                                                                                                                                                                            |
| topic               | String  | optional, default shenyu-topic       | topic                                                                                                                                                                                                                                                                                                                                        |
| sendThreadCount     | String  | optional, default 1                  | Number of core threads for log consumption callback                                                                                                                                                                                                                                                                                          |
| TotalSizeInBytes    | Integer | optional, default 104857600          | The maximum log size that the instance can cache                                                                                                                                                                                                                                                                                             |
| MaxSendThreadCount  | Integer | optional, default 50                 | The maximum number of "goroutines" that the client can concurrently                                                                                                                                                                                                                                                                          |
| MaxBlockSec         | Integer | optional, default 60000 ms           | The maximum amount of time the caller can block on the send method if the client is running out of free space. <br/> If the required space cannot be satisfied after this time, <br/>the send method will throw a TimeoutException. Set this value to a negative number if you want the send method to block until the required space is met |
| MaxBatchSize        | Integer | optional, default 512 * 1024 (512KB) | When the cached log size in a Batch is greater than or equal to batchSizeThresholdInBytes, the batch will be sent, and the maximum size can be set to 5MB                                                                                                                                                                                    |
| MaxBatchCount       | Integer | optional, default 4096               | When the number of logs cached in a batch is greater than or equal to batchCountThreshold, the batch will be sent and the maximum can be set to 40960                                                                                                                                                                                        |
| LingerMs            | Integer | optional, default 2000 ms            | The duration of the batch from the creation to the time it can be sent, the minimum can be set to 100 milliseconds                                                                                                                                                                                                                           |
| Retries             | Integer | optional, default 10                 | If a Batch fails to be sent for the first time, the number of times it can be retried, if the retries is less than or equal to 0, the ProducerBatch will directly enter the failure queue after the first failure of sending                                                                                                                 |
| MaxReservedAttempts | Integer | optional, default 11                 | Each batch that is attempted to be sent corresponds to an Attemp. This parameter is used to control the number of attempts returned to the user. By default, only the latest 11 attempts are retained. A larger parameter allows you to trace more information, but also consumes more memory                                                |
| BaseRetryBackoffMs  | Integer | optional, default 100 ms             | Backoff time for the first retry The client samples the exponential backoff algorithm, and the planned waiting time for the Nth retry is baseRetryBackoffMs * 2^(N-1                                                                                                                                                                         |
| MaxRetryBackoffMs   | Integer | optional, default 50 s               | Maximum backoff time for retries                                                                                                                                                                                                                                                                                                             |

- get `topic`

![](/img/shenyu/plugin/logging/logging-tencent-cls/tencent-topic.png)

### 2.4.2 Configuration Selectors and Rules

* Selector and rule Config. Please refer: [Selector and rule config](../../user-guide/admin-usage/selector-and-rule.md).

## 2.5 Logging Info

collect request info as follows

| Field Name            |                                                        Meaning                                                        | Description                                                     | Remarks |
|:----------------------|:---------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------|:--------|
| clientIp              |                                                       Client IP                                                       |                                                                 |         |
| timeLocal             |                                 Request time string, format: yyyy-MM-dd HH:mm:ss.SSS                                  |                                                                 |         |
| method                | request method (different rpc type is not the same, http class for: get, post wait, rpc class for the interface name) |                                                                 |         |
| requestHeader         |                                             Request header (json format)                                              |                                                                 |         |
| responseHeader        |                                             Response header (json format)                                             |                                                                 |         |
| queryParams           |                                               Request query parameters                                                |                                                                 |         |
| requestBody           |                                Request Body (body of binary type will not be captured)                                |                                                                 |         |
| requestUri            |                                                      Request uri                                                      |                                                                 |         |
| responseBody          |                                                     Response body                                                     |                                                                 |         |
| responseContentLength |                                                  Response body size                                                   |                                                                 |         |
| rpcType               |                                                       rpc type                                                        |                                                                 |         |
| status                |                                                    response status                                                    |                                                                 |         |
| upstreamIp            |                                      Upstream (program providing the service) IP                                      |                                                                 |         |
| upstreamResponseTime  |             Time taken by the upstream (program providing the service) to respond to the request (ms ms)              |                                                                 |         |
| userAgent             |                                                 Requested user agent                                                  |                                                                 |         |
| host                  |                                                  The requested host                                                   |                                                                 |         |
| module                |                                                   Requested modules                                                   |                                                                 |         |
| path                  |                                                  The requested path                                                   |                                                                 |         |
| traceId               |                                              Requested Link Tracking ID                                               | Need to access link tracking plugins, such as skywalking,zipkin |         |

## 2.6 Examples

### 2.6.1 Collect Http Log by tencent cls platform

#### 2.6.1.1 Plugin Configuration

* Open the plugin and configure tencent-cls, configure it as follows.

![](/img/shenyu/plugin/logging/logging-tencent-cls/plugin-config-en.jpg)

#### 2.6.1.2 Selector Configuration

![](/img/shenyu/plugin/logging/logging-tencent-cls/tencent-cls-log-selector-en.png)

#### 2.6.1.3 Rule Configuration

![](/img/shenyu/plugin/logging/logging-tencent-cls/tencent-cls-log-rule-en.png)

#### 2.6.1.4 Send Request

![](/img/shenyu/plugin/logging/logging-tencent-cls/call-service.png)

#### 2.6.1.5 Tencent cls Platform Display

![](/img/shenyu/plugin/logging/logging-tencent-cls/tencent-cls-log.jpg)

# 3. How to disable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `loggingTencentCls` set Status disable.

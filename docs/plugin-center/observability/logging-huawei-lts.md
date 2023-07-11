---
title: Logging-Huawei llts日志插件
keywords: ["Logging"]
description: logging plugin

---

# 1. Overview

## 1.1 Plugin Name

* Logging-HuaweiLts Plugin

##   1.2 Appropriate Scenario

* collect http request information to huawei  lts, analysis request information by huawei lts platform.

##   1.3 Plugin functionality

- The gateway receives requests from the client, forwards them to the server, and returns the server results to the client. The gateway can record the details of each request，

* the plugin records access logs and sends to huawei lts platform.

##   1.4 Plugin code

* Core Module `shenyu-plugin-logging-huawei-lts`

* Core Class `org.apache.shenyu.plugin.huawei.lts.LoggingHuaweiLtsPlugin`
* Core Class `org.apache.shenyu.plugin.huawei.lts.client.HuaweiLtsLogCollectClient`

##   1.5 Added Since Which shenyu version

ShenYu 2.6.0

# 2. How to use plugin

## 2.1 Plugin-use procedure chart

![](/img/shenyu/plugin/plugin_use_en.jpg)

- ## 2.2 Import pom

  - import maven config in shenyu-bootstrap project's `pom.xml` file.

```xml
<!-- shenyu logging-huaweilts plugin start -->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-logging-huawei-lts</artifactId>
    <version>${project.version}</version>
</dependency>
<!-- shenyu logging-huaweilts plugin end -->
```

## 2.3 Enable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `loggingHuaweiLts` set Status enable.

## 2.4 Config plugin

### 2.4.1 Plugin configuration

### ![](/img/shenyu/plugin/logging/logging-huawei-cls/plugin-config-en.jpg)

| config-item               | description                                                  | type    | remarks  |
| ------------------------- | ------------------------------------------------------------ | ------- | -------- |
| projectId                 | The project ID of the HUAWEI CLOUD account（project id）     | String  | must     |
| accessKeyId               | AK of the HUAWEI CLOUD account                               | String  | must     |
| accessKeySecret           | SK of HUAWEI CLOUD account                                   | String  | must     |
| regionName                | Regions of Cloud Log Service                                 | String  | must     |
| logGroupId                | The log group ID of the LTS                                  | String  | must     |
| logStreamId               | The log stream ID of the LTS                                 | String  | must     |
| totalSizeInBytes          | The upper limit of the log size that can be cached by a single producer instance | int     | optional |
| maxBlockMs                | If the producer has insufficient free space, the caller's maximum block time on the send method, in milliseconds. The default is 60 seconds (60000 milliseconds), and 0 seconds is recommended. When the maxBlockMs value >= 0, it will block until the set time. If the blocking time is reached, the memory cannot be obtained, that is, an error will be reported and the log will be discarded. When the value of maxBlockMs=-1, it will be blocked until the sending is successful, and the log will not be discarded | long    | optional |
| ioThreadCount             | The thread pool size for executing log sending tasks         | int     | optional |
| batchSizeThresholdInBytes | When the cached log size in a ProducerBatch is greater than or equal to batchSizeThresholdInBytes, the batch will be sent | int     | optional |
| batchCountThreshold       | When the number of cached logs in a ProducerBatch is greater than or equal to batchCountThreshold, the batch will be sent | int     | optional |
| lingerMs                  | The lingering time of a ProducerBatch from creation until it is sendable | int     | optional |
| retries                   | If a ProducerBatch fails to send for the first time, the number of times it can be retried is recommended to be 3 times. If retries is less than or equal to 0, the ProducerBatch will directly enter the failure queue after the first sending failure | int     | optional |
| baseRetryBackoffMs        | The backoff time for the first retry                         | long    | optional |
| maxRetryBackoffMs         | Maximum backoff time for retries                             | long    | optional |
| giveUpExtraLongSingleLog  | For logs exceeding 1M, the data larger than 1M will be discarded after splitting | boolean | optional |
| enableLocalTest           | 是否开启跨云上报日志                                         | boolean | optional |

- get `regionName`

![](/img/shenyu/plugin/logging/logging-huawei-cls/huawei-lts-regionName.png)

| **区域名称** | **RegionName** |
| ------------ | -------------- |
| 华北-北京二  | cn-north-2     |
| 华北-北京四  | cn-north-4     |
| 华北-北京一  | cn-north-1     |
| 华东-上海二  | cn-east-2      |
| 华东-上海一  | cn-east-3      |
| 华南-广州    | cn-south-1     |
| 华南-深圳    | cn-south-2     |
| 西南-贵阳一  | cn-southwest-2 |

- get  `projectId`

![](/img/shenyu/plugin/logging/logging-huawei-cls/huawei-lts-projectId.png)

- get  `accessKeyId` and `accessKeySecret`

![](/img/shenyu/plugin/logging/logging-huawei-cls/huawei-lts-access.png)

- get`logGroupId ` and `logStreamId`

![](/img/shenyu/plugin/logging/logging-huawei-cls/huawei-lts-logGroupId.png)

![](/img/shenyu/plugin/logging/logging-huawei-cls/huawei-lts-logStreamId.png)

### 2.4.2 Configuration Selectors and Rules

* Selector and rule Config. Please refer: [Selector and rule config](../../user-guide/admin-usage/selector-and-rule.md).

## 2.5 Logging Info

collect request info as follows

| Field Name            |                           Meaning                            | Description                                                  | Remarks |
| :-------------------- | :----------------------------------------------------------: | :----------------------------------------------------------- | :------ |
| clientIp              |                          Client IP                           |                                                              |         |
| timeLocal             |     Request time string, format: yyyy-MM-dd HH:mm:ss.SSS     |                                                              |         |
| method                | request method (different rpc type is not the same, http class for: get, post wait, rpc class for the interface name) |                                                              |         |
| requestHeader         |                 Request header (json format)                 |                                                              |         |
| responseHeader        |                Response header (json format)                 |                                                              |         |
| queryParams           |                   Request query parameters                   |                                                              |         |
| requestBody           |   Request Body (body of binary type will not be captured)    |                                                              |         |
| requestUri            |                         Request uri                          |                                                              |         |
| responseBody          |                        Response body                         |                                                              |         |
| responseContentLength |                      Response body size                      |                                                              |         |
| rpcType               |                           rpc type                           |                                                              |         |
| status                |                       response status                        |                                                              |         |
| upstreamIp            |         Upstream (program providing the service) IP          |                                                              |         |
| upstreamResponseTime  | Time taken by the upstream (program providing the service) to respond to the request (ms ms) |                                                              |         |
| userAgent             |                     Requested user agent                     |                                                              |         |
| host                  |                      The requested host                      |                                                              |         |
| module                |                      Requested modules                       |                                                              |         |
| path                  |                      The requested path                      |                                                              |         |
| traceId               |                  Requested Link Tracking ID                  | Need to access link tracking plugins, such as skywalking,zipkin |         |

## 2.6 Examples

### 2.6.1 Collect Http Log by tencent cls platform

#### 2.6.1.1 Plugin Configuration

* Open the plugin and configure huawei lts, configure it as follows.

![](/img/shenyu/plugin/logging/logging-huawei-cls/plugin-config-en.png)

####   2.6.1.2 Selector Configuration

![](/img/shenyu/plugin/logging/logging-huawei-cls/huawei-lts-log-selector-en.png)

####   2.6.1.3 Rule Configuration

![](/img/shenyu/plugin/logging/logging-huawei-cls/huawei-lts-log-rule-en.png)

####   2.6.1.4 Send Request

![](/img/shenyu/plugin/logging/logging-huawei-cls/call-service.png)

####   2.6.1.5 Tencent cls Platform Display

![](/img/shenyu/plugin/logging/logging-huawei-cls/huawei-lts-log.png)

# 3. How to disable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin -->`loggingHuaweiLts`set Status disable.
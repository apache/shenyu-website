---
title: Logging-Tencent-Cls插件
keywords: ["Logging"]
description: logging插件
---

# 1. 概述

## 1.1 插件名称

* Tencent cls 日志插件

## 1.2 适用场景

* 收集日志到`Tencent cls`日志平台，并通过`Tencent cls`日志平台进行数据分析

## 1.3 插件功能

* 网关接收客户端请求，向服务端转发请求，并将服务端结果返回给客户端.网关可以记录下每次请求对应的详细信息。
* 插件便是记录访问日志并将访问日志发送到Tencent cls的插件.

## 1.4 插件代码

* 核心模块 `shenyu-plugin-logging-tencent-cls`

* 核心类 `org.apache.shenyu.plugin.tencent.cls.LoggingTencentClsPlugin`
* 核心类 `org.apache.shenyu.plugin.tencent.cls.client.TencentClsLogCollectClient`

## 1.5 添加自哪个shenyu版本

ShenYu 2.5.1

# 2. 如何使用插件

## 2.1 插件使用流程图

![](/img/shenyu/plugin/plugin_use_zh.jpg)

## 2.2 导入pom

- 在ShenYu-Bootstrap导入对应的pom依赖。

```xml
<!-- shenyu logging-tencent-cls plugin start -->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-logging-tencent-cls</artifactId>
    <version>${project.version}</version>
</dependency>
<!-- shenyu logging-tencent-cls plugin end -->
```

## 2.3 启用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理-> `loggingTencentCls` ，设置为开启。

## 2.4 配置插件

### 2.4.1 插件配置

![](/img/shenyu/plugin/logging/logging-tencent-cls/plugin-config-zh.jpg)

| 配置项                 | 类型      | 备注                     | 描述                                                                                                                              |
|:--------------------|:--------|:-----------------------|:--------------------------------------------------------------------------------------------------------------------------------|
| secretId            | String  | 必填                     | secretId                                                                                                                        |
| secretKey           | String  | 必填                     | secretKey                                                                                                                       |
| endpoint            | String  | 必填                     | 主机名,例如:ap-guangzhou.cls.tencentcs.com                                                                                           |
| topic               | String  | 可选, 默认值:shenyu-topic   | 日志存储topic                                                                                                                       |
| sendThreadCount     | String  | 可选, 默认值:1              | 日志消费回调核心线程数                                                                                                                     |
| TotalSizeInBytes    | Integer | 默认为 104857600          | 实例能缓存的日志大小上限，                                                                                                                   |
| MaxSendThreadCount  | Integer | 默认为 50 个               | client能并发的最多"goroutine"的数量，                                                                                                     |
| MaxBlockSec         | Integer | 默认为 60000 毫秒           | 如果client可用空间不足，调用者在 send 方法上的最大阻塞时间。<br/> 如果超过这个时间后所需空间仍无法得到满足，send 方法会抛出TimeoutException。如果您希望 send 方法一直阻塞直到所需空间得到满足，可将该值设为负数。 |
| MaxBatchSize        | Integer | 默认为 512 * 1024 (512KB) | 当一个Batch中缓存的日志大小大于等于 batchSizeThresholdInBytes 时，该 batch 将被发送，最大可设置成 5MB                                                        |
| MaxBatchCount       | Integer | 默认为 4096               | 当一个Batch中缓存的日志条数大于等于 batchCountThreshold 时，该 batch 将被发送最大可设置成 40960                                                             |
| LingerMs            | Integer | 默认为 2000 毫秒            | Batch从创建到可发送的逗留时间，最小可设置成 100 毫秒                                                                                                 |
| Retries             | Integer | 默认为 10 次               | 如果某个Batch首次发送失败，能够对其重试的次数，如果 retries 小于等于 0，该 ProducerBatch 首次发送失败后将直接进入失败队列                                                    |
| MaxReservedAttempts | Integer | 默认只保留最近的 11 次          | 每个Batch每次被尝试发送都对应着一个Attemp，此参数用来控制返回给用户的 attempt 个数，默认只保留最近的 11 次 attempt 信息。该参数越大能让您追溯更多的信息，但同时也会消耗更多的内存                       |
| BaseRetryBackoffMs  | Integer | 默认为 100 毫秒             | 首次重试的退避时间 client采样指数退避算法，第 N 次重试的计划等待时间为 baseRetryBackoffMs * 2^(N-1                                                            |
| MaxRetryBackoffMs   | Integer | 默认为 50 秒               | 重试的最大退避时间                                                                                                                       |

- 获取 `topic`

![](/img/shenyu/plugin/logging/logging-tencent-cls/tencent-topic.png)

### 2.4.2 规则和选择器配置

* 插件和选择器配置。请查看: [Selector and rule config](../../user-guide/admin-usage/selector-and-rule.md).

## 2.5 Logging信息

采集的access log的字段如下：

| 字段名称                  |                       含义                       | 说明                            | 备注  |
|:----------------------|:----------------------------------------------:|:------------------------------|:----|
| clientIp              |                     客户端IP                      |                               |     |
| timeLocal             |      请求时间字符串,  格式：yyyy-MM-dd HH:mm:ss.SSS      |                               |     |
| method                | 请求方法(不同rpc类型不一样，http类的为:get,post等待，rpc类的为接口名称) |                               |     |
| requestHeader         |                  请求头(json格式)                   |                               |     |
| responseHeader        |                  响应头(json格式)                   |                               |     |
| queryParams           |                     请求查询参数                     |                               |     |
| requestBody           |             请求Body（二进制类型的body不会采集）             |                               |     |
| requestUri            |                     请求uri                      |                               |     |
| responseBody          |                     响应body                     |                               |     |
| responseContentLength |                    响应body大小                    |                               |     |
| rpcType               |                     rpc类型                      |                               |     |
| status                |                      响应码                       |                               |     |
| upstreamIp            |                 上游(提供服务的程序)IP                  |                               |     |
| upstreamResponseTime  |            上游(提供服务的程序)响应请求的耗时(毫秒ms)            |                               |     |
| userAgent             |                    请求的用户代理                     |                               |     |
| host                  |                    请求的host                     |                               |     |
| module                |                     请求的模块                      |                               |     |
| path                  |                   请求的路径path                    |                               |     |
| traceId                |                   请求的链路追踪ID                    | 需要接入链路追踪插件，如skywalking,zipkin |     |


## 2.6 示例

### 2.6.1 通过腾讯云cls日志平台收集日志

#### 2.6.1.1 插件配置

* 开启插件，并配置 tencent cls插件,配置如下：

![](/img/shenyu/plugin/logging/logging-tencent-cls/plugin-config-zh.jpg)

#### 2.6.1.2 选择器配置

![](/img/shenyu/plugin/logging/logging-tencent-cls/tencent-cls-log-selector-zh.png)

#### 2.6.1.3 规则配置

![](/img/shenyu/plugin/logging/logging-tencent-cls/tencent-cls-log-rule-zh.png)

#### 2.6.1.4 发送请求

![](/img/shenyu/plugin/logging/logging-tencent-cls/call-service.png)

#### 2.6.1.5 tencent sls 日志平台展示

![](/img/shenyu/plugin/logging/logging-tencent-cls/tencent-cls-log.jpg)

# 3. 如何禁用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理-> `loggingTencentCls` ，设置为关闭。

---
title: Logging-Huawei-Lts插件
keywords: ["Logging", "HuaweiLts"]
description: Logging-HuaweiLts插件
---

# 1. 概述

## 1.1 插件名称

- Huawei Lts 日志插件

## 1.2 适用场景

- 收集日志到`Huawei lts`日志平台，并通过`Huawei lts`日志平台进行数据分析

## 1.3 插件功能

- 网关接收客户端请求，向服务端转发请求，并将服务端结果返回给客户端.网关可以记录下每次请求对应的详细信息。
- 插件便是记录访问日志并将访问日志发送到Huawei lts的插件.

## 1.4 插件代码

- 核心模块 `shenyu-plugin-logging-huawei-lts`
- 核心类 `org.apache.shenyu.plugin.huawei.lts.LoggingHuaweiLtsPlugin
- 核心类 `org.apache.shenyu.plugin.huawei.lts.client.HuaweiLtsLogCollectClient

## 1.5 添加自哪个shenyu版本

ShenYu 2.6.0

# 2. 如何使用插件

## 2.1 插件使用流程图

![](/img/shenyu/plugin/plugin_use_zh.jpg)

## 2.2 导入pom

- 在ShenYu-Bootstrap导入对应的pom依赖。

```xml
<!-- shenyu logging-huaweilts plugin start -->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-logging-huawei-lts</artifactId>
    <version>${project.version}</version>
</dependency>
<!-- shenyu logging-huaweilts plugin end -->
```

## 2.3 启用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理-> `loggingHuaweiLts` ，设置为开启。

## 2.4 配置插件

### 2.4.1 插件配置

### ![](/img/shenyu/plugin/logging/logging-huawei-lts/plugin-config-zh.png)

| 配置项                    | 描述                                                         | 类型    | 备注 |
| ------------------------- | ------------------------------------------------------------ | ------- | ---- |
| projectId                 | 华为云帐号的项目ID（project id）。                           | String  | 必填 |
| accessKeyId               | 华为云帐号的AK。                                             | String  | 必填 |
| accessKeySecret           | 华为云帐号的SK。                                             | String  | 必填 |
| regionName                | 云日志服务的区域。                                           | String  | 必填 |
| logGroupId                | LTS的日志组ID。                                              | String  | 必填 |
| logStreamId               | LTS的日志流ID。                                              | String  | 必填 |
| totalSizeInBytes          | 单个producer实例能缓存的日志大小上限。                       | int     | 选填 |
| maxBlockMs                | 如果 producer 可用空间不足，调用者在 send 方法上的最大阻塞时间，单位为毫秒。默认为 60 秒（60000毫秒），建议为0秒。当maxBlockMs值>=0时，则阻塞到设置的时间，如果到达阻塞时间，还是不能获取到内存，即报错且丢弃日志。当maxBlockMs值=-1时，则一直阻塞到发送成功，且不会丢弃日志。 | long    | 选填 |
| ioThreadCount             | 执行日志发送任务的线程池大小。                               | int     | 选填 |
| batchSizeThresholdInBytes | 当一个 ProducerBatch 中缓存的日志大小大于等于 batchSizeThresholdInBytes 时，该 batch 将被发送。 | int     | 选填 |
| batchCountThreshold       | 当一个 ProducerBatch 中缓存的日志条数大于等于 batchCountThreshold 时，该 batch 将被发送。 | int     | 选填 |
| lingerMs                  | 一个 ProducerBatch 从创建到可发送的逗留时间。                | int     | 选填 |
| retries                   | 如果某个 ProducerBatch 首次发送失败，能够对其重试的次数，建议为 3 次。如果 retries 小于等于 0，该 ProducerBatch 首次发送失败后将直接进入失败队列。 | int     | 选填 |
| baseRetryBackoffMs        | 首次重试的退避时间。                                         | long    | 选填 |
| maxRetryBackoffMs         | 重试的最大退避时间。                                         | long    | 选填 |
| giveUpExtraLongSingleLog  | 超过1M的日志, 拆分后丢弃大于1M的数据。                       | boolean | 选填 |
| enableLocalTest           | 是否开启跨云上报日志                                         | boolean | 选填 |

- 获取 `regionName`

![](/img/shenyu/plugin/logging/logging-huawei-lts/huawei-lts-regionName.png)

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

- 获取 `projectId`


![](/img/shenyu/plugin/logging/logging-huawei-lts/huawei-lts-projectId.png)

- 获取 `accessKeyId`与`accessKeySecret`

![](/img/shenyu/plugin/logging/logging-huawei-lts/huawei-lts-access.png)

- 获取 `logGroupId`与`logStreamId`

![](/img/shenyu/plugin/logging/logging-huawei-lts/huawei-lts-logGroupId.png)

![](/img/shenyu/plugin/logging/logging-huawei-lts/huawei-lts-logStreamId.png)

### 2.4.2 规则和选择器配置

- 插件和选择器配置。请查看: [Selector and rule config](https://shenyu.apache.org/zh/docs/user-guide/admin-usage/selector-and-rule).

## 2.5 Logging信息

采集的access log的字段如下：

| 字段名称              | 含义                                                         | 说明                                      | 备注 |
| --------------------- | ------------------------------------------------------------ | ----------------------------------------- | ---- |
| clientIp              | 客户端IP                                                     |                                           |      |
| timeLocal             | 请求时间字符串, 格式：yyyy-MM-dd HH:mm:ss.SSS                |                                           |      |
| method                | 请求方法(不同rpc类型不一样，http类的为:get,post等待，rpc类的为接口名称) |                                           |      |
| requestHeader         | 请求头(json格式)                                             |                                           |      |
| responseHeader        | 响应头(json格式)                                             |                                           |      |
| queryParams           | 请求查询参数                                                 |                                           |      |
| requestBody           | 请求Body（二进制类型的body不会采集）                         |                                           |      |
| requestUri            | 请求uri                                                      |                                           |      |
| responseBody          | 响应body                                                     |                                           |      |
| responseContentLength | 响应body大小                                                 |                                           |      |
| rpcType               | rpc类型                                                      |                                           |      |
| status                | 响应码                                                       |                                           |      |
| upstreamIp            | 上游(提供服务的程序)IP                                       |                                           |      |
| upstreamResponseTime  | 上游(提供服务的程序)响应请求的耗时(毫秒ms)                   |                                           |      |
| userAgent             | 请求的用户代理                                               |                                           |      |
| host                  | 请求的host                                                   |                                           |      |
| module                | 请求的模块                                                   |                                           |      |
| path                  | 请求的路径path                                               |                                           |      |
| traceId               | 请求的链路追踪ID                                             | 需要接入链路追踪插件，如skywalking,zipkin |      |

## 2.6 示例

### 2.6.1 通过华为云lts日志平台收集日志

#### 2.6.1.1 插件配置

- 开启插件，并配置 huawei lts插件,配置如下：

![](/img/shenyu/plugin/logging/logging-huawei-lts/plugin-config-zh.png)

#### 2.6.1.2 选择器配置

![](/img/shenyu/plugin/logging/logging-huawei-lts/huawei-lts-log-selector-zh.png)

#### 2.6.1.3 规则配置

![](/img/shenyu/plugin/logging/logging-huawei-lts/huawei-lts-log-rule-zh.png)

#### 2.6.1.4 发送请求

![](/img/shenyu/plugin/logging/logging-huawei-lts/call-service.png)

#### 2.6.1.5 hauwei lts日志平台展示

![](/img/shenyu/plugin/logging/logging-huawei-lts/huawei-lts-log.png)

# 3. 如何禁用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理-> `loggingHuaweiLts` ，设置为关闭。

---
title: Aliyun Sls日志插件
keywords: ["logging"]
description: logging插件
---

# 1. 概述

## 1.1 插件名称

* Aliyun sls 日志插件

## 1.2 适用场景

* 收集日志到`aliyun sls`日志平台，并通过`aliyun sls`日志平台进行数据分析

## 1.3 插件功能

* 网关接收客户端请求，向服务端转发请求，并将服务端结果返回给客户端.网关可以记录下每次请求对应的详细信息。
* 插件便是记录访问日志并将访问日志发送到Aliyun sls的插件.

## 1.4 插件代码

* 核心模块 `shenyu-plugin-logging-aliyun-sls`

* 核心类 `org.apache.shenyu.plugin.aliyun.sls.LoggingAliYunSlsPlugin`
* 核心类 `org.apache.shenyu.plugin.aliyun.sls.client.AliyunSlsLogCollectClient`

## 1.5 添加自哪个shenyu版本

ShenYu 2.5.0

# 2. 如何使用插件

## 2.1 插件使用流程图

![](/img/shenyu/plugin/logging/logging-console/loggingConsole-use-en.png)

## 2.2 导入pom

- 在ShenYu-Bootstrap导入对应的pom依赖。

```xml
<!-- shenyu logging-aliyunsls plugin start -->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-logging-aliyun-sls</artifactId>
  <version>${project.version}</version>
</dependency>
<!-- shenyu logging-aliyunsls plugin end -->
```

## 2.3 启用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理-> `loggingAliyunSls` ，设置为开启。

## 2.4 配置插件

### 2.4.1 插件配置

![](/img/shenyu/plugin/logging/logging-aliyun-sls/plugin-config-zh.jpg)

| 配置项     | 类型    | 描述                                                  | 备注                  |
| :-------------- | :------ | :----------------------------------------------------------- | :-----------------       |
| accessId        | String  | accessId                                                     | 必填                    |
| accesskey       | String  | accesskey                                                    | 必填                     |
| host            | String  | 主机名，例如：:cn-guangzhou.log.aliyuncs.com             | 必填                     |
| projectName     | String  | 项目名                                             | 可选, 默认值:shenyu |
| logStoreName    | String  | 存储store名称                                               | 可选, 默认值:shenyu-logstore |
| topic           | String  | 日志存储topic                                         | 可选, 默认值:shenyu-topic    |
| ttlInDay        | Integer | 每天的ttl次数                                         | 可选, 默认值:3 |
| shardCount      | Integer | 阿里云日志的shard总数                                   | 可选, 默认值:10 |
| sendThreadCount | Integer | 发送日志的线程数                         | 可选, 默认值:1 |
| ioThreadCount   | Integer | io记录日志的线程数                                              | 可选, 默认值:1 |
| sampleRate      | String  | 样本消费速率                                          | 可选, 默认值:1 |
| maxRequestBody  | Integer | 最大请求体                                             | 可选, 默认值:524288 |
| maxResponseBody | Integer | 最大响应体                                            | 可选, 默认值:524288 |
| bufferQueueSize | Integer | 消费队列大小                                       | 可选, 默认值:50000  |

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

### 2.6.1 通过阿里云sls日志平台收集日志

#### 2.6.1.1 插件配置

* 开启插件，并配置aliyun sls插件,配置如下：

![](/img/shenyu/plugin/logging/logging-aliyun-sls/plugin-config-zh.jpg)

#### 2.6.1.2 选择器配置

![](/img/shenyu/plugin/logging/logging-aliyun-sls/aliyun-sls-log-selector-zh.png)

#### 2.6.1.3 规则配置

![](/img/shenyu/plugin/logging/logging-aliyun-sls/aliyun-sls-log-rule-zh.png)

#### 2.6.1.4 发送请求

![](/img/shenyu/plugin/logging/logging-aliyun-sls/call-service.png)

#### 2.6.1.5 aliyun sls 日志平台展示

![](/img/shenyu/plugin/logging/logging-aliyun-sls/aliyun-sls-log.jpg)

# 3. 如何禁用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理-> `loggingAliyunSls` ，设置为关闭。

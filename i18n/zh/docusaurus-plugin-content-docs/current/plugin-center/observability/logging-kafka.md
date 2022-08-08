---
title: Logging-Kafka插件
keywords: ["Logging", "Kafka"]
description: Logging-kafka插件
---

# 1. 概述

## 1.1 插件名称

* Logging-Kafka Plugin

## 1.2 适用场景

* 通过Kafka收集网关http请求日志，通过其他应用消费Kafka消息，并且对日志进行分析。

## 1.3 插件功能

>`Apache ShenYu` 网关接收客户端请求，向服务端转发请求，并将服务端结果返回给客户端.网关可以记录下每次请求对应的详细信息，  
> 列如： 请求时间、请求参数、请求路径、响应结果、响应状态码、耗时、上游IP、异常信息等待.  
> Logging-Kafka插件便是记录访问日志并将访问日志发送到Kafka集群的插件.

## 1.4 插件代码

* 核心模块 `shenyu-plugin-logging-kafka`.

* 核心类 `org.apache.shenyu.plugin.logging.kafka.LoggingKafkaPlugin`
* 核心类 `org.apache.shenyu.plugin.logging.kafka.client.KafkaLogCollectClient`

## 1.5 添加自哪个shenyu版本

* ShenYu 2.5.0

## 1.6 技术方案

* 架构图  
  ![](/img/shenyu/plugin/logging/logging-kafka/logging-kafka-arch.jpg)

* 在 `Apache ShenYu` 网关里面进行 `Logging` 全程异步采集、异步发送

* 日志平台通过消费`Kafka`集群中的日志进行落库

# 2. 如何使用插件

## 2.1 插件使用流程图

![](/img/shenyu/plugin/logging/logging-console/loggingConsole-use-en.png)

## 2.2 导入pom

* 在网关的 `pom.xml` 文件中添加 `Logging-Kafka` 的依赖。

```xml
 <!--shenyu logging-kafka plugin start-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-logging-kafka</artifactId>
    <version>${project.version}</version>
</dependency>
<!--shenyu logging-kafka plugin end-->
```

## 2.3 启用插件

* 在 `shenyu-admin`--> 基础配置 --> 插件管理-> `loggingKafka` ，配置kafka参数，并设置为开启。

## 2.4 配置插件

### 2.4.1 开启插件，并配置Kafka，配置如下

![](/img/shenyu/plugin/logging/logging-kafka/logging-kafka-config-cn.jpg)

* 各个配置项说明如下：

| 配置项                                  | 类型                     | 说明                                | 备注                                   |
|:-------------------------------------|:-----------------------|:----------------------------------|:-------------------------------------|
| config-item                          | type                   | description                       | remarks                              |
| topic                | String                 | 消息队列主题                            | 必须                                   |
| namesrvAddr           | String                 | 消息队列命名服务器地址                       | 必须                                   |
| sampleRate        | String                 | 采样率，范围0~1，0：关闭，0.01:采集1%，1：采集100% | 可选，默认1，全部采集                          |
| compressAlg        | String                 | 压缩算法，默认不压缩，目前支持LZ4压缩              | 可选，默认不压缩                             |
| maxResponseBody        | Ingeter                | 最大响应体大小，超过阈值将不采集响应体               | 可选，默认512KB                           |
| maxRequestBody       | Ingeter              | 最大请求体大小，超过阈值将不采集请求体               | 可选，默认512KB  |
*除了topic、namesrvAddr其它都是可选*，大部分情况下只需要配置这2项就可以了。默认的Group-id是"shenyu-access-logging"。

### 2.4.2 配置选择器和规则器

* 选择器和规则详细配置，请参考: [选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。

另外有时候一个大网关集群对应多个应用程序（业务），不同应用程序（业务）对应不同的主题，相关隔离，这时候可以按选择器配置不同的主题(可选)和采样率(可选)，配置项的含义如上表所示。  
操作如下图：  
![](/img/shenyu/plugin/logging/logging-option-topic.png)


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

### 2.6.1 通过Kafka收集请求日志

#### 2.6.1.1 插件配置

开启插件，并配置Kafka,配置如下：

![](/img/shenyu/plugin/logging/logging-config.png)

#### 2.6.1.2 选择器配置

* 选择器和规则详细配置，请参考: [选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。

另外有时候一个大网关集群对应多个应用程序（业务），不同应用程序（业务）对应不同的主题，相关隔离，这时候可以按选择器配置不同的主题(可选)和采样率(可选)，配置项的含义如上表所示。  
操作如下图：  
![](/img/shenyu/plugin/logging/logging-option-topic.png)

#### 2.6.1.3 规则配置

![](/img/shenyu/plugin/logging/logging-kafka/log-rule-zh.jpg)

#### 2.6.1.4 请求服务

![](/img/shenyu/plugin/logging/logging-kafka/call-service.png)

#### 2.6.1.5 消费以及展示Logging

由于各个日志平台有差异，如存储可用clickhouse,ElasticSearch等待，可视化有自研的或开源的Grafana、Kibana等。  
Logging-Kafka插件利用Kafka进行生产和消费解耦，同时以json格式输出日志，消费和可视化需要用户结合自身情况选择不同的技术栈来实现。

# 3. 如何禁用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理-> loggingKafka ，设置为关闭。



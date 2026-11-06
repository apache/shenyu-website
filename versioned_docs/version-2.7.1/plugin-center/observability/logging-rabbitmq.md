---
title: Logging-RabbitMQ Plugin
keywords: ["Logging", "RabbitMQ"]
description: Logging-RabbitMQ Plugin
---

# 1. Overview

## 1.1 Plugin Name

* Logging-RabbitMQ Plugin

## 1.2 Appropriate Scenario

* collect http request log to rabbitmq, consume rabbitmq message to another application and analysis.

## 1.3 Plugin functionality

>`Apache ShenYu` The gateway receives requests from the client, forwards them to the server, and returns the server results to the client. The gateway can record the details of each request，    
> The list includes: request time, request parameters, request path, response result, response status code, time consumption, upstream IP, exception information waiting.    
> The Logging-RabbitMQ plugin is a plugin that records access logs and sends them to the RabbitMQ cluster.

## 1.4 Plugin code

* Core Module `shenyu-plugin-logging-rabbitmq`.

* Core Class `org.apache.shenyu.plugin.logging.rabbitmq.LoggingRabbitmqPlugin`
* Core Claas `org.apache.shenyu.plugin.logging.rabbitmq.client.RabbitmqLogCollectClient`

## 1.5 Added Since Which shenyu version

* Since ShenYu 2.5.0

## 1.6 Technical Solutions

* Architecture Diagram  

![](/img/shenyu/plugin/logging/shenyu-agent-logging-arch.png)

* Full asynchronous collection and delivery of `Logging` inside the `Apache ShenYu` gateway

* Logging platform by consuming the logs in the `RabbitMQ` cluster for repository, and then using `Grafana`, `Kibana` or other visualization platform to display


# 2. How to use plugin

## 2.1 Plugin-use procedure chart

![](/img/shenyu/plugin/plugin_use_en.jpg)

## 2.2 Import pom

* Add the `Logging-RabbitMQ` dependency to the gateway's `pom.xml` file.

```xml
<!--shenyu logging-rabbitmq plugin start-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-logging-rabbitmq</artifactId>
    <version>${project.version\}</version>
</dependency>
<!--shenyu logging-rabbitmq plugin end-->
```

## 2.3 Enable plugin

* In `shenyu-admin` --> Basic Configuration --> Plugin Management --> `loggingRabbitMQ`, configure the rabbitMQ parameter and set it to on.

## 2.4 Config plugin

### 2.4.1 Open the plugin and configure rabbitmq, configure it as follows.

![](/img/shenyu/plugin/logging/logging-rabbitmq/logging-config-rabbitmq-en.png)

* The individual configuration items are described as follows:

| config-item     | type    | description                                         | remarks     |
|:----------------|:--------|:----------------------------------------------------|:------------|
| host            | type    | IP                                                  | 必须          |
| port            | type    | PORT                                                | 必须          |
| username        | String  | rabbitmq username                                   | 可选          |
| password        | String  | rabbitmq password                                   | 可选          |
| virtualHost     | String  | rabbitmq virtualHost                                | 必须，默认/      |
| exchangeType    | String  | rabbitmq exchange type                              | 必须，默认direct |
| exchangeName    | String  | rabbitmq exchange name                              | 必须          |
| queueName       | String  | rabbitmq queue name                                 | 必须          |
| routingKey      | String  | rabbitmq routing key                                | 必须          |
| durable         | Boolean | message durable                                     | 必须，默认true   |
| exclusive       | Boolean | message exclusive                                   | 必须，默认false  |                                   | 必须，默认false  |
| autoDelete      | String  | message auto delete                                 | 必须，默认false  |
| args            | String  | rabbitmq args，exaple：\{"x-delay":"1000"\}，delay queue | 可选          |
| sampleRate                        | String               | Sampling rate, range 0~1, 0: off, 0.01: acquisition 1%, 1: acquisition 100% | Optional, default 1, all collection |
| maxResponseBody                   | Ingeter              | Maximum response size, above the threshold no response will be collected                | Optional, default 512KB |
| maxRequestBody                    | Ingeter              | Maximum request body size, above the threshold no request body will be collected               | Optional, default 512KB  |
Except for host,port,virtualHost,exchangeType,exchangeName,queueName,routingKey,durable,exclusive,autoDelete, all others are optional.

### 2.4.2 Configuring Selectors and Rulers

* For detailed configuration of selectors and rules, please refer to: [Selector and rule management](../../user-guide/admin-usage/selector-and-rule)。

In addition, sometimes a large gateway cluster corresponds to multiple applications (business), different applications (business) corresponds to different topics, related to isolation,  
then you can configure different topics (optional) and sampling rate (optional) by selector, the meaning of the configuration items as shown in the table above.   
The operation is shown below:
![](/img/shenyu/plugin/logging/logging-rabbitmq/logging-option-topic-en.png)

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

### 2.6.1 Collect Http Log by RabbitMQ

#### 2.6.1.1 Plugin Configuration

Open the plugin and configure rabbitmq, configure it as follows.

![](/img/shenyu/plugin/logging/logging-rabbitmq/logging-config-rabbitmq-en.png)

#### 2.6.1.2 Selector Configuration

For detailed configuration of selectors and rules, please refer to: [Selector and rule management](../../user-guide/admin-usage/selector-and-rule)。

In addition, sometimes a large gateway cluster corresponds to multiple applications (business), different applications (business) corresponds to different topics, related to isolation,  
then you can configure different topics (optional) and sampling rate (optional) by selector, the meaning of the configuration items as shown in the table above.   
The operation is shown below:
![](/img/shenyu/plugin/logging/logging-option-topic-en.png)

#### 2.6.1.3 Rule Configuration

![](/img/shenyu/plugin/logging/logging-rabbitmq/log-rule-en.jpg)

#### 2.6.1.4 Request Service

![](/img/shenyu/plugin/logging/logging-rabbitmq/call-service.png)

#### 2.6.1.5 Consumption and display of Logging

As each logging platform has differences, such as storage available clickhouse, ElasticSearch, etc., visualization has self-developed or open source Grafana, Kibana, etc..  
Logging-RabbitMQ plugin uses RabbitMQ to decouple production and consumption, while outputting logs in json format,
consumption and visualization require users to choose different technology stacks to achieve their own situation.


#### 2.6.1.6 Panel Display

Users can choose to visualize the implementation according to their own situation.   
The following shows the effect of `Grafana`:  
[Grafana Sandbox Experience](https://play.grafana.org)

![](/img/shenyu/plugin/logging/grafana-loki-gateway.png)

# 3. How to disable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `loggingRabbitMQ` set Status disable.

![](/img/shenyu/plugin/logging/logging-rabbitmq/logging-rabbitmq-disabled-en.jpg)



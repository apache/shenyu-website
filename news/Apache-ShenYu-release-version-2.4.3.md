---
title: "[Apache ShenYu 2.4.3 Version Release]"
description: "Apache ShenYu 2.4.3 Version Release"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2022-04-18
slug: Apache-ShenYu-release-version-2.4.3
---  

After 3 months, Apache ShenYu released version 2.4.3 again. The content of this version has 200+ pull requests, 30+ contributors participated, many new functions have been added, many bugs have been fixed, and many optimizations have been made.

### new features

- Added retry mechanism for Http registration client.
- Support Content-Type of type octet-stream.
- Support redirection of Bootstrap URIs.
- Added local API authorization.
- Support configuring Dubbo consumer thread pool size.
- Support failure retry mechanism for Divide plugin.
- Supports client configuration for Webscoket.
- Support MemoryLimitedLinkedBlockingQueue.
- Support Alibaba Dubbo plugin to share thread pool.
- Support gRPC plugin shared thread pool.
- Added Metrics plugin.
- Added Cache plugin.
- Added Logging RocketMQ plugin.

### Optimizations

- Updated JUnit4 to JUnit5.
- Optimize password encryption.
- Optimize and verify the interface parameters of the shenyu-admin module.
- Optimize the code for initializing data when synchronizing data.
- Added integration tests for LoggingRocketMQ plugin.
- Use the timing wheel algorithm in the ScheduledExecutorService class.
- Refactored the buildHandle method of the registered URI in admin.
- Optimized the Spring Cloud client to automatically set the port.
- Refactored JWT plugin to support multi-level Tokens.
- Optimized gateway netty parameter customization and configurable

### Fix Bug

- Fix the null pointer exception when the CommonUpstreamUtils class is initialized.
- Fix the judgment when Nacos registration fails.
- Fixed null pointer exception when logging in unregistered users.
- Fixed the problem of repeatedly printing the startup log.
- Fixed the problem that the number of retries and the timeout period did not take effect.
- Fixed Token parsing error.
- Fixed the problem that Websocket transmits large data abnormally.
- Fixed NettyHttpClient plugin not retrying on failure.
- Fixed CVE-2021-41303 vulnerability.
  -Fixed the problem that judging all plugin inclusion conditions did not take effect.
- Fixed Http Headers losing data.
- Fixed Rewrite plugin not supporting URL placeholders.
- Fixed the problem of abnormal synchronization data in Nacos.
- Fix Websocket proxy failure or null pointer exception when ContextPath plugin is open.
- Fixed port occupancy check for Http registered clients.

### remove item

- Remove Monitor plugin.
- Remove shenyu-agent module.

### Metrics Plugin Instructions

Metrics plugin The plugin is used by the gateway to monitor its own running status (JVM related), request response delay, QPS, TPS and other related metrics.

#### Use of plugins

Add the metrics dependency in the gateway's pom.xml file.

````xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-metrics</artifactId>
    <version>${project.version}</version>
</dependency>
````

Edit the following in the gateway's configuration yaml file

````yaml
shenyu:
  metrics:
    enabled: false #Set to true to enable
    name : prometheus
    host: 127.0.0.1 #exposed ip
    port: 8090 #Exposed port
    jmxConfig: #jmxConfiguration
    props:
      jvm_enabled: true #Enable jvm monitoring indicators
````

For specific metrics information, please check the official website description: https://shenyu.apache.org/zh/docs/plugin-center/observability/metrics-plugin

### Cache plugin instructions

The Cache plugin can cache the results of the target service, and also allows the user to configure the expiration time of the cached results.

#### Use of plugins

Add the Cache dependency in the gateway's pom.xml file.

````xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-cache</artifactId>
    <version>${project.version}</version>
</dependency>
````

It is suitable for scenarios where data is not frequently updated, requires a large number of calls, and does not require high data consistency.

### Logging RocketMQ plugin instructions

The Apache ShenYu gateway receives the client request, forwards the request to the server, and returns the server result to the client. The gateway can record the detailed information corresponding to each request, such as: request time, request parameters, request path, response result, response status code, time-consuming, upstream IP, exception information, etc.

Logging-RocketMQ plugin is a plugin that records and sends access logs to the RocketMQ cluster.

#### Use of plugins

Add dependencies in the gateway's pom.xml file.

````xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-logging-rocketmq</artifactId>
    <version>${project.version}</version>
</dependency>
````

The specific configuration and the function of each parameter can be found on the official website: https://shenyu.apache.org/zh/docs/plugin-center/observability/logging-rocketmq

### Next version planning

#### Add cluster plan

- Added shenyu-proxy module to support ShenYu's cluster mode and dynamic expansion and contraction of gateways
- Added shenyu-nginx sub-project to connect to Nginx-upstream module

#### Added multi-language SDK

The multi-language SDK is mainly to allow other types of languages to quickly access the shenyu gateway

> https://github.com/apache/incubator-shenyu-client-donet
> 
> https://github.com/apache/incubator-shenyu-client-golang
> 
> https://github.com/apache/incubator-shenyu-client-python

#### Added Helm Chart

> https://github.com/apache/incubator-shenyu-helm-chart

![helm-ci-pipeline](/img/news/helm-ci-pipeline.png)

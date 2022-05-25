---
title: "【Apache ShenYu 2.4.3 版本发布】"
description: "Apache ShenYu 2.4.3 版本发布"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2022-04-18
---  

时隔3个月，Apache ShenYu再次发布2.4.3版本，本次版本内容，有200+的pull Request，30+的贡献者参与，新增了非常多的功能，修复了很多bug，以及优化了很多内容。

### 新增功能

- 增加 Http 注册客户端的重试机制。
- 支持 Content-Type 类型为 octet-stream。
- 支持 Bootstrap 的URIs 的重定向。
- 增加本地 API 授权。
- 支持配置 Dubbo消费者线程池大小。
- 支持 Divide 插件的失败重试机制。
- 支持 Webscoket 的客户端配置。
- 支持 MemoryLimitedLinkedBlockingQueue。
- 支持 Alibaba Dubbo 插件共享线程池。
- 支持 gRPC 插件共享线程池。
- 增加 Metrics 插件。
- 增加 Cache 插件。
- 增加 Logging RocketMQ 插件。

### 优化项

- 更新 JUnit4 为 JUnit5。
- 优化 password encryption。
- 优化和校验 shenyu-admin 模块的接口参数。
- 优化同步数据时，初始化数据的代码。
- 增加 LoggingRocketMQ 插件的集成测试。
- 在 ScheduledExecutorService 类中使用定时轮算法。
- 重构admin 中注册 URI 的 buildHandle 方法。
- 优化 Spring Cloud 客户端自动设置端口。
- 重构 JWT 插件支持多等级 Tokens。
- 优化网关netty参数自定义可配置

### Fix Bug

- 修复 CommonUpstreamUtils 类初始化时的空指针异常。
- 修复 Nacos 注册失败时进行判断。
- 修复登录未注册用户时的空指针异常。
- 修复重复打印启动日志的问题。
- 修复重试次数，超时时间不生效的问题。
- 修复 Token 解析报错的问题。
- 修复 Websocket 传输大数据异常的问题。
- 修复 NettyHttpClient 插件在失败时未重试的问题。
- 修复 CVE-2021-41303 漏洞。
- 修复判断所有插件包含条件不生效的问题。
- 修复 Http Headers 丢失数据的问题。
- 修复 Rewrite 插件不支持 URL 占位符的问题。
- 修复 Nacos 同步数据异常的问题。
- 修复当 ContextPath 插件打开时，Websocket 代理失败或者空指针异常的问题。
- 修复 Http 注册客户端的端口占用检查。

### 移除项

- 移除 Monitor 插件。
- 移除 shenyu-agent 模块。

### Metrics 插件使用说明

Metrics 插件 插件是网关用来监控自身运行状态（JVM 相关），请求的响应迟延，QPS、TPS等相关 metrics。

#### 插件的使用

在网关的 pom.xml 文件中添加 metrics 的依赖。

```xml
<dependency>
    <groupId>org.apache.shenyugroupId>
    <artifactId>shenyu-spring-boot-starter-plugin-metricsartifactId>
    <version>${project.version}version>
</dependency>
```

在网关的配置 yaml 文件中编辑如下内容

```yaml
shenyu:
  metrics:
    enabled: false  #设置为 true 表示开启
    name : prometheus 
    host: 127.0.0.1 #暴露的ip
    port: 8090 #暴露的端口
    jmxConfig: #jmx配置
    props:
      jvm_enabled: true #开启jvm的监控指标
```

具体 Metrics 的指标信息可查看官网说明：https://shenyu.apache.org/zh/docs/plugin-center/observability/metrics-plugin

### Cache 插件使用说明

Cache 插件能够缓存目标服务的结果，还可以允许用户配置缓存结果失效时间。

#### 插件的使用

在网关的 pom.xml 文件中添加 Cache 的依赖。

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-cache</artifactId>
    <version>${project.version}</version>
</dependency>
```

适用于数据不会频繁更新、需要大量调用、对于数据一致性要求不高的场景。

### Logging RocketMQ 插件使用说明

Apache ShenYu 网关接收客户端请求，向服务端转发请求，并将服务端结果返回给客户端。网关可以记录下每次请求对应的详细信息，例如：请求时间、请求参数、请求路径、响应结果、响应状态码、耗时、上游IP、异常信息等。  

Logging-RocketMQ 插件是记录访问日志并将访问日志发送到 RocketMQ 集群的插件.

#### 插件的使用

在网关的 pom.xml 文件中添加依赖。

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-logging-rocketmq</artifactId>
    <version>${project.version}</version>
</dependency>
```

具体配置以及各个参数的作用等信息可查看官网说明：https://shenyu.apache.org/zh/docs/plugin-center/observability/logging-rocketmq

### 下个版本规划

#### 新增集群方案

- 新增shenyu-proxy模块，支持ShenYu的集群模式，以及网关的动态扩缩容
- 新增shenyu-nginx子项目，对接Nginx-upstream模块

#### 新增多语言SDK

多语言的SDK主要是为了让其他类型的语言快速的接入shenyu网关

> https://github.com/apache/incubator-shenyu-client-donet
> 
> https://github.com/apache/incubator-shenyu-client-golang
> 
> https://github.com/apache/incubator-shenyu-client-python

#### 新增 Helm Chart

> https://github.com/apache/incubator-shenyu-helm-chart

![helm-ci-pipeline](/img/news/helm-ci-pipeline.png)

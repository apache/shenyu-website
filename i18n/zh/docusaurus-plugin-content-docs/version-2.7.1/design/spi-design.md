---
title: SPI扩展设计
keywords: ["spi design"]
description:  对ShenYu网关中SPI的使用进行介绍
---

`SPI` 全称为 `Service Provider Interface`, 是 `JDK` 内置的一种服务提供发现功能, 一种动态替换发现的机制。

[shenyu-spi](https://github.com/apache/shenyu/tree/master/shenyu-spi) 是`Apache ShenYu`网关自定义的`SPI`扩展实现，设计和实现原理参考了`Dubbo`的 [SPI扩展实现](https://dubbo.apache.org/zh/docs/v2.7/dev/impls/) 。


### 注册中心扩展

通过哪种方式实现服务的注册，当前支持`Consul`、`Etcd`、`Http`、`Nacos`和`Zookeeper`。注册中心的扩展包括客户端和服务端，接口分别为 `ShenyuServerRegisterRepository` 和 `ShenyuClientRegisterRepository` 。

### 监控中心扩展

负责服务的监控，通过`SPI`加载具体实现，当前支持`Prometheus` ，服务接口是 `MetricsService` 。

### 负载均衡扩展

从多个服务提供方中选择一个进行调用，当前支持的算法有`Hash`、`Random` 和 `RoundRobin`，扩展接口是 `LoadBalance` 。


### RateLimiter扩展

在`RateLimiter`插件中，使用何种限流算法，当前支持`Concurrent`、`LeakyBucket`、`SlidingWindow` 和 `TokenBucket`，扩展接口是 `RateLimiterAlgorithm` 。


### 匹配方式扩展

在添加选择器和规则时，使用哪种匹配方式，当前支持`And`、`Or`，扩展接口是 `MatchStrategy` 。


### 条件参数扩展

在添加选择器和规则时，使用哪种条件参数，当前支持`URI`、`RequestMethod`、`Query`、`Post`、`IP`、`Host`、`Cookie` 和 `Header`，扩展接口是 `ParameterData` 。


### 条件策略扩展

在添加选择器和规则时，使用哪种条件策略，当前支持`Match`、`Contains`、`Equals`、`Regex`、`TimerAfter`、`TimerBefore`和`Exclude`，扩展接口是 `PredicateJudge` 。

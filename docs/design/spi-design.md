---
title: SPI Design
keywords: ["spi design"]
description:  spi-design
---


SPI, called Service Provider Interface, is a built-in JDK Service that provides discovery function and a dynamic replacement discovery mechanism.


[shenyu-spi](https://github.com/apache/incubator-shenyu/tree/master/shenyu-spi) is a custom SPI extension implementation for Apache Shenyu gateway. The design and implementation principles refer to [SPI Extension Implementations](https://dubbo.apache.org/en/docs/v2.7/dev/impls/) .


### Registry Center

`Consul`, `Etcd`, `Http`, `Nacos` and `Zookeeper` are supported. The expansion of the registry including client and server, interface respectively `ShenyuServerRegisterRepository` and `ShenyuClientRegisterRepository`.

### Metrics Center

Responsible for service monitoring, loading concrete implementation through `SPI`, currently support `Prometheus`, service interface is `MetricsBootService`.



### Load Balance

Select one of the service providers to call. Currently, the supported algorithms are `Has`, `Random`, and `RoundRobin`, and the extended interface is `LoadBalance`.

### RateLimiter


In the `RateLimiter` plugin, which stream limiting algorithm to use, currently supporting `Concurren`, `LeakyBucke`, `SlidingWindow` and `TokenBucket`, the extension interface is `RateLimiterAlgorithm`.


### Match Strategy

Which matching method to use when adding selectors And rules, currently supports `And`, `Or`, And the extension interface is `MatchStrategy`.


### Parameter Data


Currently, `URI`,`RequestMethod`, `Query`, `Post`, `IP`, `Host`, `Cookie`, and `Header` are supported. The extended interface is `ParameterData`.


### Predicate Judge

Which conditional policy to use when adding selectors and rules currently supports `Match`, `Contains`,`Equals`, `Groovy`, `Regex`, `SpEL`, `TimerAfter`, `TimerBefore` and `Exclude`. The extension interface is `PredicateJudge`.



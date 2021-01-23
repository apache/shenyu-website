---
title: Hmily-Metrics
keywords: Metrics
description: Metrics
---

### Metrics

目前hmily的metrics模块，采用 prometheus来进行采集，使用pull模式对外暴露metrics信息接口。

收集的metrics主要分为二个大类。

* 应用的JVM信息：内存，cpu，线程使用等等

* 事务信息：包括事务的总数，事务的迟延，事务的状态，事务的角色


### 指标详解




### 如何展示

* 用户可以使用 `Grafana` 从应用里面的`metrics`配置拉取的metrics信息

---
title: Thread Model
keywords: ["Thread"]
description: thread model
---

## Description

* This article gives an introduction to thread models in ShenYu and usage in various scenarios.

## IO And Work Thread

* `spring-webflux` is one of dependencies of ShenYu, and it uses Netty thread model in lower layer.

## Business Thread

* Use scheduling thread to execute by default.
* A fixed thread pool manages business threads, the number of threads is count in this formula: cpu * 2 + 1.


## Type Switching

* `reactor.core.scheduler.Schedulers`.
* `-Dshenyu.scheduler.type=fixed` is a default config. If set to other value, a flexible thread pool will take place it.`Schedulers.elastic()`.
* `-Dshenyu.work.threads = xx` is for configuring number of threads, the default value calculates in following formula `cpu * 2 + 1` with a minimum of 16 threads.






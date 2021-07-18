---
title: 线程模型
keywords: shenyu
description: 线程模型
---

## 说明

* 本文主要介绍 `ShenYu` 的线程模型，以及各种场景的使用。

## IO与Work线程

* `ShenYu` 内置依赖 `spring-webflux`， 而其底层是使用的是 `netty`，这一块主要是使用的 `netty` 线程模型。

## 业务线程

* 默认使用调度线程来执行。
* 默认使用固定的线程池来执行，其线程数为 `cpu * 2 + 1`。

## 切换类型

* `reactor.core.scheduler.Schedulers`。
* 可以使用 `-Dshenyu.scheduler.type=fixed` 这个是默认。 设置其他的值 就会使用弹性线程池来执行`Schedulers.elastic()`。
* 可以使用 `-Dshenyu.work.threads = xx` 来指定线程数量，默认为 `cpu * 2 + 1`，最小为`16`个线程。






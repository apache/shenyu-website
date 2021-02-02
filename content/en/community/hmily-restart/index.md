---
title: "Hmily distributed transaction restart monthly report"
author: "xiaoyu"
description: "Monthly report after Hmily restart"
categories: "hmily"
tags: ["hmily"]
date: 2020-09-08
cover: "../../img/architecture/hmily-framework.png"
---

Hmily is a flexible distributed transaction architecture with high performance, high avalibility and ease to use. At present, it provides support for Dubbo, Spring-Cloud, Motan, GRPC and other RPC frameworks. In terms of ease of use, it provides zero-intrusive rapid integration of Spring-Boot and Spring-Namespace, with the goal of building a distributed transaction solution of financial level.

## Adjust Hmily architecture with more reasonable module partition

**Architecture: **

![全景图](hmily-2.0.2.png)

**Architecture adjustment:**

- Pull out the core execution module, support a variety of transaction mode and mixed use of TCC mode, TAC mode.
- The core module removes dependencies on Spring.
- Define implementations of various SPI interfaces.
- New `hmily-rpc` : aggregates support for various RPC frameworks.
- Added `hmily-spi` : Hmily framework custom SPI mechanism implementation.
- New `hmily-bom` : resolves version dependency management conflicts.
- Added `hmily-metrics`: monitoring JVM, thread, transaction health, time, etc.
- New `hmily-TCC` : Core implementation of TCC pattern.
- Added `hmily-TCC` : Core implementation of TAC mode.

**SPI module partition: **

- Added `hmily-repository`: transaction log storage module with support (MySQL, Oracle, PostgreSQL, SQL Server, ZooKeeper, Redis, MongoDB, File).
- Added `hmily-serializer`:  transaction log serializer module, support (Hessian, JDK, Kryo, Protobuf)
- Added `hmily-config`: config module to support (local mode, Zookeeper, Nacos, Apollo, Etcd).
- Added `hmily-tac-SQLParser`: SQL parsing module under TAC mode

### Gather the Hmily Community Issue and solve bugs.
![hmily-bug](hmily-bug.png)

For example, in the community, it is gather the problems reported by the community, as well as to cooperate with the community for developing new version.

**Solve bug: **

- Dubbo framework does not support annotation (spring-boot-starter-dubbo)
- The Motan framework does not support the use of annotations
- Exceptions in Spring-Cloud users when integrating Hmily with Hystrix using Feign.
- Transaction log serialization exception.
- Timeout exception transaction suspension bug.
- Transaction timing recovers bugs.

**Added function: **

- `build`: Added travis-ci feature
- Transaction log support: Oracle, PostgreSQL, Sqlsever, Mongo, Zookeeper, File, Redis.
- Configuration module: new configuration center support for Apollo, ETCD, and Nacos
- Demo: Added Motan-RPC to use Hmily distributed transaction.

### Community building

- The community adheres to the principles of simplicity, pleasure, elegance, and harmony.

  - Code guidelines: The code follows the HMILY-CHECKSTYLE standard, and there is plenty of room for flexibility. Talk is cheap,show you code.
  - Open rule: I hope everyone here can offer good ideas, we can discuss together, review code repeatedly, think about solving bugs, grow happily.

### Recently

Hmily-2.1.0 of the latest architecture will be released (TCC mode only will be supported).

**Configuration module**

- Configuration dynamic refresh function, support all configuration centers.

**TAC mode:**

- `sql-parser`: accessing Apache-Shardingsphere, Apache-Calcite.
- ` SQL-revert `: Under development.

### At last

Good to be here for the season, at this point in time, Hmily-2.2.0 will be released, which will fully support TAC, TCC modes.
TAC(Transaction Auto Rollback): With this mode, users no longer have to worry about writing reverse cancel methods like TCC. Greatly reduce the use cost and learning cost.
TCC : Stability, reliability has been greatly strengthened, completely solve the problem of transaction suspension.

- More RPC framework support: BRPC and more.
-  Support XA mode.

Github: https://github.com/dromara/hmily

Gitee: https://github.com/shuaiqiyu/hmily

QQ group: 162614487


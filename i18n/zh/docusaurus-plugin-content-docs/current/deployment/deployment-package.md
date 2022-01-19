---
sidebar_position: 2
title: 二进制包部署
keywords: ["二进制", "部署"]
description: 二进制包部署
---

本文介绍使用二进制包部署 `Apache ShenYu` 网关。


### 启动 Apache ShenYu Admin

* 下载 `apache-shenyu-incubating-2.4.2-admin-bin.tar.gz`

* 解压缩 `apache-shenyu-incubating-2.4.2-admin-bin.tar.gz`。 进入 `bin` 目录。

* 使用 `h2` 来存储后台数据：

```
> windows: start.bat --spring.profiles.active = h2

> linux: ./start.sh --spring.profiles.active = h2
```

* 使用 `MySQL` 来存储后台数据， 进入 `/conf` 目录，修改 `application.yaml` 中 `mysql` 的配置。

```
> windows: start.bat 

> linux: ./start.sh 
```

* 使用 `PostgreSql` 来存储后台数据， 进入 `/conf` 目录，修改 `application.yaml` 中 `spring.profiles.active` 的配置为 `pg`。

```
> windows: start.bat 

> linux: ./start.sh 
```

### 启动 Apache ShenYu Bootstrap

* 下载 `apache-shenyu-incubating-2.4.2-bootstrap-bin.tar.gz`

* 解压缩 `apache-shenyu-incubating-2.4.2-bootstrap-bin.tar.gz`。 进入 bin 目录。

```
> windwos : start.bat 

> linux : ./start.sh 
```

### 启动 ShenYu Bootstrap 的同时，启动 ShenYu Agent

> 2.4.2版本开始支持shenyu-agent ([可观测性](../user-guide/observability/observability.md))

agent 相关配置在 `./agent/conf`。

如果你想使用 shenyu-agent，只需要在启动时添加一个参数：agent

```shell
./start.sh agent
```

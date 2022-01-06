---
sidebar_position: 2
title: 二进制包部署
keywords: ["二进制", "部署"]
description: 二进制包部署
---

本文介绍使用二进制包部署 `Apache ShenYu` 网关。


### 启动 Apache ShenYu Admin

* 下载 `apache-shenyu-incubating-2.4.1-admin-bin.tar.gz`

* 解压缩 `apache-shenyu-incubating-2.4.1-admin-bin.tar.gz`。 进入 `bin` 目录。

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

* 下载 `apache-shenyu-incubating-2.4.1-bootstrap-bin.tar.gz`

* 解压缩 `apache-shenyu-incubating-2.4.1-bootstrap-bin.tar.gz`。 进入 bin 目录。

```
> windwos : start.bat 

> linux : ./start.sh 
```










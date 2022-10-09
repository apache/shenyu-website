---
sidebar_position: 2
title: 二进制包部署
keywords: ["二进制", "部署"]
description: 二进制包部署
---

本文介绍使用二进制包部署 `Apache ShenYu` 网关。

> 在阅读本文档前，你需要先阅读[部署先决条件](./deployment-before.md)文档来完成部署 `shenyu` 前的环境准备工作。

### 启动 Apache ShenYu Admin

* 下载 [apache-shenyu-incubating-${current.version}-admin-bin.tar.gz](https://archive.apache.org/dist/incubator/shenyu/2.4.3/apache-shenyu-incubating-2.4.3-admin-bin.tar.gz)

* 解压缩 `apache-shenyu-incubating-${current.version}-admin-bin.tar.gz`。 进入 `bin` 目录。

* 使用 `h2` 来存储后台数据：

```
> windows: start.bat --spring.profiles.active = h2

> linux: ./start.sh --spring.profiles.active = h2
```

* 使用 `MySQL` 来存储后台数据，需按照 [指引文档](./deployment-before.md#mysql) 初始化数据库，将 [mysql-connector.jar](https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.18/mysql-connector-java-8.0.18.jar) 拷贝到 `/${your_work_dir}/ext-lib`， 进入 `/conf` 目录修改 `application-mysql.yaml` 中 `jdbc` 的配置。

```
> windows: start.bat --spring.profiles.active = mysql

> linux: ./start.sh --spring.profiles.active = mysql
```

* 使用 `PostgreSql` 来存储后台数据，需按照 [指引文档](./deployment-before.md#postgresql) 初始化数据库， 进入 `/conf` 目录修改 `application-pg.yaml` 中 `jdbc` 的配置。

```
> windows: start.bat --spring.profiles.active = pg

> linux: ./start.sh --spring.profiles.active = pg
```

* 使用 `Oracle` 来存储后台数据，需按照 [指引文档](./deployment-before.md#oracle) 初始化数据库， 进入 `/conf` 目录修改 `application-oracle.yaml` 中 `jdbc` 的配置。

```
> windows: start.bat --spring.profiles.active = oracle

> linux: ./start.sh --spring.profiles.active = oracle
```

### 启动 Apache ShenYu Bootstrap

* 下载 [`apache-shenyu-incubating-${current.version}-bootstrap-bin.tar.gz`](https://archive.apache.org/dist/incubator/shenyu/2.4.3/apache-shenyu-incubating-2.4.3-bootstrap-bin.tar.gz)

* 解压缩 `apache-shenyu-incubating-${current.version}-bootstrap-bin.tar.gz`。 进入 bin 目录。

```
> windwos : start.bat 

> linux : ./start.sh 
```

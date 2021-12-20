---
sidebar_position: 3
title: Docker Deployment
keywords: ["docker-compose", "Deployment"]
description: Docker Deployment
---

本文介绍使用 `docker-compose` 来部署 `Apache ShenYu` 网关。

### 准备

首先，你需要创建文件夹。

```shell
mkdir -p {shenyu-bootstrap,shenyu-admin}/{conf,logs}
```

选择一个作为数据源。可以是 `h2` 或者 `mysql` 或者 `pg`。

* 利用 `h2`

```shell
curl -sSl https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/stand-alone-h2/docker-compose.yaml > docker-compose.yaml
(cd shenyu-admin/conf/ && curl -OOO https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-admin/src/main/resources/{application-h2.yml,logback.xml,application.yml})
(cd shenyu-bootstrap/conf/ && curl -OOO https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-bootstrap/src/main/resources/{application-local.yml,logback.xml,application.yml})
```

* 利用 `mysql`

```shell
curl -sSl https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/stand-alone-mysql/docker-compose.yaml > docker-compose.yaml
mkdir -p shenyu-admin/ext-lib
(cd shenyu-admin/ext-lib && curl -O https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.18/mysql-connector-java-8.0.18.jar > mysql-connector.jar)
(cd shenyu-admin/conf/ && curl -OOO https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-admin/src/main/resources/{application-mysql.yml,logback.xml,application.yml})
(cd shenyu-bootstrap/conf/ && curl -OOO https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-bootstrap/src/main/resources/{application-local.yml,logback.xml,application.yml})
```

* 利用 `pg`

```shell
curl -sSl https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/stand-alone-pg/docker-compose.yaml > docker-compose.yaml
(cd shenyu-admin/conf/ && curl -OOO https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-admin/src/main/resources/{application-pg.yml,logback.xml,application.yml})
(cd shenyu-bootstrap/conf/ && curl -OOO https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-bootstrap/src/main/resources/{application-local.yml,logback.xml,application.yml})
```

### 启动 admin 和 bootstrap

```shell
docker-compose up
```

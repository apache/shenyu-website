---
sidebar_position: 3
title: Docker Deployment
keywords: ["docker-compose", "Deployment"]
description: Docker Deployment
---

This article introduces the use of `docker-compose` to deploy the `Apache ShenYu` gateway.

### prepare

First, you need to create a folder.

```shell
mkdir -p {shenyu-bootstrap,shenyu-admin}/{conf,logs}
```

Choose one as the data source. It can be `h2` or `mysql` or `pg`.

* use `h2`

```shell
curl -sSl https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/stand-alone-h2/docker-compose.yaml > docker-compose.yaml
(cd shenyu-admin/conf/ && curl -OOO https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-admin/src/main/resources/{application-h2.yml,logback.xml,application.yml})
(cd shenyu-bootstrap/conf/ && curl -OOO https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-bootstrap/src/main/resources/{application-local.yml,logback.xml,application.yml})
```

* use `mysql`

```shell
curl -sSl https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/stand-alone-mysql/docker-compose.yaml > docker-compose.yaml
mkdir -p shenyu-admin/ext-lib
(cd shenyu-admin/ext-lib && curl -sSl https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.18/mysql-connector-java-8.0.18.jar > mysql-connector.jar)
(cd shenyu-admin/conf/ && curl -OOO https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-admin/src/main/resources/{application-mysql.yml,logback.xml,application.yml})
(cd shenyu-bootstrap/conf/ && curl -OOO https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-bootstrap/src/main/resources/{application-local.yml,logback.xml,application.yml})
```

* use `pg`

```shell
curl -sSl https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/stand-alone-pg/docker-compose.yaml > docker-compose.yaml
(cd shenyu-admin/conf/ && curl -OOO https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-admin/src/main/resources/{application-pg.yml,logback.xml,application.yml})
(cd shenyu-bootstrap/conf/ && curl -OOO https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-bootstrap/src/main/resources/{application-local.yml,logback.xml,application.yml})
```

### start admin and bootstrap

```shell
docker-compose up
```

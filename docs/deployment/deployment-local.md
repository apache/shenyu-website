---
sidebar_position: 1
title: Local Deployment
keywords: ["Deployment"]
description: Local Deployment
---

This article introduces how to start the `Apache ShenYu` gateway in the local environment.

> Before you read this document, you need to complete some preparations before deploying Shenyu according to the [Deployment Prerequisites document](./deployment-before.md).

### Environmental preparation

* Install JDK1.8+ locally
* Install Git locally
* Install Maven locally
* Choose a development tool, such as IDEA

### Download the compiled code

* Download

```
> git clone https://github.com/apache/incubator-shenyu.git
> cd shenyu
> mvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests
```

* use the development tool to start `org.apache.shenyu.admin.ShenyuAdminBootstrap`，Visit http://localhost:9095, the default username and password are: `admin` and `123456` respectively.

  * If you use `h2` for storage, set the variable `--spring.profiles.active = h2` and start the server.

  * If you use `MySQL` for storage, follow the [guide document](./deployment-before.md#mysql) to initialize the database and modify the `JDBC` configuration in `application-mysql.yml`, set the variable `--spring.profiles.active = mysql` and start the server.

  * If you use `PostgreSql` for storage, follow the [guide document](./deployment-before.md#postgresql) to initialize the database and modify the `JDBC` configuration in `application-pg.yml`, set the variable `--spring.profiles.active = pg` and start the server.

  * If you use `Oracle` for storage, follow the [guide document](./deployment-before.md#oracle) to initialize the database and modify the `JDBC` configuration in `application-oracle.yml`, set the variable `--spring.profiles.active = oracle`.

* use the development tool to start `org.apache.shenyu.bootstrap.ShenyuBootstrapApplication`.












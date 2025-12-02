---
sidebar_position: 2
title: Binary Packages Deployment
keywords: ["Deployment"] 
description: Binary Packages Deployment
---

This article introduces the deployment of the `Apache ShenYu` gateway using the binary packages.

> Before you read this document, you need to complete some preparations before deploying Shenyu according to the [Deployment Prerequisites document](./deployment-before.md).

### Start Apache ShenYu Admin

* download [apache-shenyu-$\{current.version}-admin-bin.tar.gz](https://archive.apache.org/dist/shenyu/2.5.1/apache-shenyu-2.5.1-admin-bin.tar.gz)

* unzip `apache-shenyu-$\{current.version}-admin-bin.tar.gz`。 go to the `bin` directory.

> After version 2.5.1, `start.sh` started to support custom JVM startup parameters through the environment variable `ADMIN_JVM`.

* use `h2` to store data：

```
> windows: start.bat

> linux: ./start.sh
```

* use `MySQL` to store data, follow the [guide document](./deployment-before.md#mysql) to initialize the database, copy [mysql-connector.jar](https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.18/mysql-connector-java-8.0.18.jar) to /$(your_work_dir)/ext-lib, go to the `/conf` directory, and modify the `JDBC` configuration in `application-mysql.yml`.

* Modify `spring.profiles.active` in `conf/application.yml` to `mysql`

```
> windows: start.bat

> linux: ./start.sh
```

* use `PostgreSql` to store data, follow the [guide document](./deployment-before.md#postgresql) to initialize the database, go to the `/conf` directory, and modify the `JDBC` configuration in `application-pg.yml`.

* Modify `spring.profiles.active` in `conf/application.yml` to `pg`

```
> windows: start.bat

> linux: ./start.sh --spring.profiles.active = pg
```

* use `Oracle` to store data, follow the [guide document](./deployment-before.md#oracle) to initialize the database, go to the `/conf` directory, and modify the `JDBC` configuration in `application-oracle.yml`.

* Modify `spring.profiles.active` in `conf/application.yml` to `oracle`

```
> windows: start.bat

> linux: ./start.sh
```

### Start Apache ShenYu Bootstrap

* download [apache-shenyu-$\{current.version}-bootstrap-bin.tar.gz](https://archive.apache.org/dist/shenyu/2.5.1/apache-shenyu-2.5.1-bootstrap-bin.tar.gz)

* unzip `apache-shenyu-$\{current.version}-bootstrap-bin.tar.gz`。 go to the `bin` directory.

> After version 2.5.1, `start.sh` started to support custom JVM startup parameters through the environment variable `BOOT_JVM`.

```
> windwos : start.bat 

> linux : ./start.sh 
```


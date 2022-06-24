---
sidebar_position: 2
title: Binary Packages Deployment
keywords: ["Deployment"] 
description: Binary Packages Deployment
---

This article introduces the deployment of the `Apache ShenYu` gateway using the binary packages.

> Before you read this document, you need to complete some preparations before deploying Shenyu according to the [Deployment Prerequisites document](./deployment-before.md).

### Start Apache ShenYu Admin

* download [apache-shenyu-incubating-2.4.3-admin-bin.tar.gz](https://archive.apache.org/dist/incubator/shenyu/2.4.3/apache-shenyu-incubating-2.4.3-admin-bin.tar.gz)

* unzip `apache-shenyu-incubating-${current.version}-admin-bin.tar.gz`. go to the `bin` directory.

* use `h2` to store data：

```
> windows: start.bat --spring.profiles.active = h2

> linux: ./start.sh --spring.profiles.active = h2
```

* use `MySQL` to store data, follow the [guide document](./deployment-before.md#mysql) to initialize the database, copy [mysql-connector.jar](https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.18/mysql-connector-java-8.0.18.jar) to /$(your_work_dir)/ext-lib, go to the `/conf` directory, and modify the `JDBC` configuration in `application-mysql.yml`.

```
> windows: start.bat --spring.profiles.active = mysql

> linux: ./start.sh --spring.profiles.active = mysql
```

* use `PostgreSql` to store data, follow the [guide document](./deployment-before.md#postgresql) to initialize the database, go to the `/conf` directory, and modify the `JDBC` configuration in `application-pg.yml`.

```
> windows: start.bat --spring.profiles.active = pg

> linux: ./start.sh --spring.profiles.active = pg
```

* use `Oracle` to store data, follow the [guide document](./deployment-before.md#oracle) to initialize the database, go to the `/conf` directory, and modify the `JDBC` configuration in `application-oracle.yml`.

```
> windows: start.bat --spring.profiles.active = oracle

> linux: ./start.sh --spring.profiles.active = oracle
```

### Start Apache ShenYu Bootstrap

* download [apache-shenyu-incubating-${current.version}-bootstrap-bin.tar.gz](https://archive.apache.org/dist/incubator/shenyu/2.4.3/apache-shenyu-incubating-2.4.3-bootstrap-bin.tar.gz)

* unzip `apache-shenyu-incubating-${current.version}-bootstrap-bin.tar.gz`。 go to the `bin` directory.

```
> windwos : start.bat 

> linux : ./start.sh 
```


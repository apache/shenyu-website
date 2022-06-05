---
sidebar_position: 0
title: Deployment Prerequisites
keywords: ["Deployment Prerequisites"]
description: Deployment Prerequisites
---

This article describes some of the prerequisites you need to prepare before deploying the Apache ShenYu gateway.

## Database Initialize

Before deploying the `Shenyu-admin` project, initialize the database it uses (databases currently support: Mysql, PostgreSql, Oracle), which used the script files are stored in db directory [project root directory](https://github.com/apache/incubator-shenyu/tree/master/db), The following describes the initial steps for each database.

### Mysql

In [the mysql initialization scripts directory](https://github.com/apache/incubator-shenyu/tree/master/db/init/mysql) found in the initialization script ` schema.sql`, Use the client connection tool to connect to your Mysql service and execute, so you get a database named `shenyu`, which can later be used as the database for the `Shenyu-admin` project.

### PostgreSql

In [the pg initialization scripts directory](https://github.com/apache/incubator-shenyu/tree/master/db/init/pg) found in the initialization script `create-database.sql`、 `create-table.sql`, and use the client connection tool to connect to your PostgreSql service. so you get a database named `shenyu`, which can later be used as a database for the `Shenyu-admin` project.

### Oracle

In [the oracle initialization scripts directory](https://github.com/apache/incubator-shenyu/blob/master/db/init/oracle) found in the initialization script `schema.sql`, Use the client connection tool to connect to your Oracle service to create a database, execute the `schema.sql` script on this database, and initialize the `Shenyu-admin` database. After can be [project configuration file](https://github.com/apache/incubator-shenyu/blob/master/shenyu-admin/src/main/resources/application-oracle.yml) to adjust your Oracle environment configuration.


---
sidebar_position: 0
title: Deployment Prerequisites
keywords: ["Deployment Prerequisites"]
description: Deployment Prerequisites
---

This article describes some of the prerequisites you need to prepare before deploying the Apache ShenYu gateway.

## 2.7.2 runtime

Use JDK 17 or later. New installations use the `v2.7.2` initialization scripts below. Existing installations must first follow [Upgrade to 2.7.2](./upgrade-2.7.2.md), including schema migrations and Bootstrap/Admin upgrade order. Do not rerun initialization scripts against an existing database.

## Admin signing key {#admin-signing-key}

2.7.2 requires an explicit `shenyu.jwt.secret-key`, which can also be supplied through `SHENYU_JWT_SECRETKEY`. Admin refuses to start with a blank key or the old public/default keys. Generate a private value with `openssl rand -base64 48`, store it in the deployment's secret configuration, and use the same value on every Admin instance. Docker examples pass the configured environment variable with `-e SHENYU_JWT_SECRETKEY`; Kubernetes examples use a Secret. Log in again after upgrade or rollback.

## Database Initialize

Before deploying the `Shenyu-admin` project, initialize the database it uses (databases currently support: Mysql, PostgreSql, Oracle), which used the script files are stored in db directory [project root directory](https://github.com/apache/shenyu/tree/v2.7.2/db), The following describes the initial steps for each database.

### Mysql

In [the mysql initialization scripts directory](https://github.com/apache/shenyu/tree/v2.7.2/db/init/mysql) found in the initialization script `schema.sql`, Use the client connection tool to connect to your Mysql service and execute, so you get a database named `shenyu`, which can later be used as the database for the `Shenyu-admin` project.

* sql script: https://github.com/apache/shenyu/tree/v2.7.2/db/init/mysql

* driver:

  * maven repository: https://repo1.maven.org/maven2/com/mysql/mysql-connector-j/8.3.0/
  * homepage: https://www.mysql.com/products/connector/

### PostgreSql

In [the pg initialization scripts directory](https://github.com/apache/shenyu/tree/v2.7.2/db/init/pg) found in the initialization script `create-database.sql`, `create-table.sql`, and use the client connection tool to connect to your PostgreSql service. so you get a database named `shenyu`, which can later be used as a database for the `Shenyu-admin` project.

* sql script: https://github.com/apache/shenyu/tree/v2.7.2/db/init/pg

* driver:

  * maven repository: https://mvnrepository.com/artifact/org.postgresql/postgresql/42.5.0
  * homepage: https://jdbc.postgresql.org/download/

### Oracle

In [the oracle initialization scripts directory](https://github.com/apache/shenyu/blob/v2.7.2/db/init/oracle) found in the initialization script `schema.sql`, Use the client connection tool to connect to your Oracle service to create a database, execute the `schema.sql` script on this database, and initialize the `Shenyu-admin` database. After can be [project configuration file](https://github.com/apache/shenyu/blob/v2.7.2/shenyu-admin/src/main/resources/application-oracle.yml) to adjust your Oracle environment configuration.

* sql script: https://github.com/apache/shenyu/blob/v2.7.2/db/init/oracle

* driver:

  * maven repository: https://mvnrepository.com/artifact/com.oracle.database.jdbc/ojdbc8/19.3.0.0
  * homepage:  https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html

### OpenGauss

In 2.7.2, openGauss uses the canonical [PostgreSQL initialization directory](https://github.com/apache/shenyu/tree/v2.7.2/db/init/pg): run `create-database.sql`, then `create-table.sql`. Keep the `og` Admin profile, `application-og.yml`, the `jdbc:opengauss://` URL, and `org.opengauss.Driver`. Existing installations use the corresponding `*-og.sql` migrations instead of initialization scripts.

* sql script: https://github.com/apache/shenyu/tree/v2.7.2/db/init/pg

* driver:

  * maven repository: https://mvnrepository.com/artifact/org.opengauss/opengauss-jdbc/5.0.0-og
  * homepage:  https://gitee.com/opengauss/openGauss-connector-jdbc

## Deployment Security Checklist

Before deploying Apache ShenYu in production, verify the following Admin-plane network controls:

- [ ] Restrict the ShenYu Admin listening port to trusted internal networks and authorized operators or Gateway nodes by using firewall rules, security groups, Kubernetes `NetworkPolicy`, or equivalent controls.
- [ ] Do not expose the Admin `/websocket` endpoint to public or otherwise untrusted networks. The endpoint is unauthenticated by design because it is used for data synchronization between ShenYu Admin and Gateway nodes, so it must be protected by network-level access controls.
- [ ] Expose the Gateway data plane separately, and do not publish the Admin plane through a public load balancer or Ingress.

---
sidebar_position: 0
title: 部署先决条件
keywords: ["Prerequisites"]
description: 部署先决条件
---

本文介绍在部署 `Apache ShenYu` 网关前, 所需要准备的一些先决条件。

## 数据库环境准备

在部署`shenyu-admin`项目前, 需初始化其所使用的数据库（数据库目前支持: Mysql、PostgreSql、Oracle）, 其中所用到的脚本文件都存放在 [项目根目录下的db目录](https://github.com/apache/incubator-shenyu/tree/master/db) 中, 以下介绍了各数据库的初始步骤.

### Mysql

在[项目mysql初始化脚本目录](https://github.com/apache/incubator-shenyu/tree/master/db/init/mysql) 中找到初始化脚本`schema.sql`, 使用客户端连接工具连接您的Mysql服务并执行, 由此您会得到一个名为`shenyu`的数据库, 它之后可作为`shenyu-admin`项目的数据库使用.

* sql脚本: https://github.com/apache/shenyu/tree/master/db/init/mysql

* 驱动:

    * maven repository: https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.30/
    * homepage: https://www.mysql.com/products/connector/

### PostgreSql

在[项目pg初始化脚本目录](https://github.com/apache/incubator-shenyu/tree/master/db/init/pg) 中找到初始化脚本`create-database.sql`、`create-table.sql`, 并使用客户端连接工具连接您的PostgreSql服务依次执行，由此您会得到一个名为shenyu的数据库, 它之后可作为`shenyu-admin`项目的数据库使用.

* sql脚本: https://github.com/apache/shenyu/tree/master/db/init/pg

* 驱动:

    * maven repository: https://mvnrepository.com/artifact/org.postgresql/postgresql/42.5.0
    * homepage: https://jdbc.postgresql.org/download/

### Oracle

在[项目oracle初始化脚本目录](https://github.com/apache/incubator-shenyu/blob/master/db/init/oracle) 中找到初始化脚本`schema.sql`, 使用客户端连接工具连接您的Oracle服务创建一个数据库, 在此数据库上执行`schema.sql`脚本, 由此您便初始化了`shenyu-admin`的数据库, 之后可在[项目配置文件](https://github.com/apache/incubator-shenyu/blob/master/shenyu-admin/src/main/resources/application-oracle.yml) 中调整您的oracle环境配置.

* sql脚本: https://github.com/apache/shenyu/blob/master/db/init/oracle

* 驱动:

    * maven repository: https://mvnrepository.com/artifact/com.oracle.database.jdbc/ojdbc8/19.3.0.0
    * homepage:  https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html


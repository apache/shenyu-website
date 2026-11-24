---
sidebar_position: 0
title: 部署先决条件
keywords: ["Prerequisites"]
description: 部署先决条件
---

本文介绍在部署 `Apache ShenYu` 网关前, 所需要准备的一些先决条件。

## 2.7.2 运行环境

使用 JDK 17 或更高版本。全新安装使用本页的 `v2.7.2` 初始化脚本；已有部署应先阅读[升级到 2.7.2](./upgrade-2.7.2.md)，完成数据库迁移和 Bootstrap/Admin 升级顺序检查。不要对已有数据库重复执行初始化脚本。

## Admin 签名密钥 {#admin-signing-key}

2.7.2 必须显式配置 `shenyu.jwt.secret-key`，也可通过环境变量 `SHENYU_JWT_SECRETKEY` 提供。密钥为空或使用旧版公开密钥、默认密钥时，Admin 会拒绝启动。可使用 `openssl rand -base64 48` 生成私有值，保存到部署环境的密钥配置，并在所有 Admin 实例中使用同一个值。Docker 示例通过 `-e SHENYU_JWT_SECRETKEY` 传入已设置的环境变量；Kubernetes 示例通过 Secret 注入。升级和回滚后需要重新登录。

## 数据库环境准备

在部署`shenyu-admin`项目前, 需初始化其所使用的数据库（数据库目前支持: Mysql、PostgreSql、Oracle）, 其中所用到的脚本文件都存放在 [项目根目录下的db目录](https://github.com/apache/shenyu/tree/v2.7.2/db) 中, 以下介绍了各数据库的初始步骤.

### Mysql

在[项目mysql初始化脚本目录](https://github.com/apache/shenyu/tree/v2.7.2/db/init/mysql) 中找到初始化脚本`schema.sql`, 使用客户端连接工具连接您的Mysql服务并执行, 由此您会得到一个名为`shenyu`的数据库, 它之后可作为`shenyu-admin`项目的数据库使用.

* sql脚本: https://github.com/apache/shenyu/tree/v2.7.2/db/init/mysql

* 驱动:

    * maven repository: https://repo1.maven.org/maven2/com/mysql/mysql-connector-j/8.3.0/
    * homepage: https://www.mysql.com/products/connector/

### PostgreSql

在[项目pg初始化脚本目录](https://github.com/apache/shenyu/tree/v2.7.2/db/init/pg) 中找到初始化脚本`create-database.sql`、`create-table.sql`, 并使用客户端连接工具连接您的PostgreSql服务依次执行，由此您会得到一个名为shenyu的数据库, 它之后可作为`shenyu-admin`项目的数据库使用.

* sql脚本: https://github.com/apache/shenyu/tree/v2.7.2/db/init/pg

* 驱动:

    * maven repository: https://mvnrepository.com/artifact/org.postgresql/postgresql/42.5.0
    * homepage: https://jdbc.postgresql.org/download/

### Oracle

在[项目oracle初始化脚本目录](https://github.com/apache/shenyu/blob/v2.7.2/db/init/oracle) 中找到初始化脚本`schema.sql`, 使用客户端连接工具连接您的Oracle服务创建一个数据库, 在此数据库上执行`schema.sql`脚本, 由此您便初始化了`shenyu-admin`的数据库, 之后可在[项目配置文件](https://github.com/apache/shenyu/blob/v2.7.2/shenyu-admin/src/main/resources/application-oracle.yml) 中调整您的oracle环境配置.

* sql脚本: https://github.com/apache/shenyu/blob/v2.7.2/db/init/oracle

* 驱动:

    * maven repository: https://mvnrepository.com/artifact/com.oracle.database.jdbc/ojdbc8/19.3.0.0
    * homepage:  https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html

### OpenGauss

openGauss 在 2.7.2 中复用 [PostgreSQL 初始化目录](https://github.com/apache/shenyu/tree/v2.7.2/db/init/pg)的 `create-database.sql` 和 `create-table.sql`，依次创建数据库和表。启动 Admin 时仍使用 `og` profile，并配置 `application-og.yml`、`jdbc:opengauss://` URL 和 `org.opengauss.Driver`。已有数据库使用对应的 `*-og.sql` 升级脚本，不要重跑初始化脚本。

* sql脚本: https://github.com/apache/shenyu/tree/v2.7.2/db/init/pg

* 驱动:

  * maven repository: https://mvnrepository.com/artifact/org.opengauss/opengauss-jdbc/5.0.0-og
  * homepage:  https://gitee.com/opengauss/openGauss-connector-jdbc

## 部署安全检查清单

在生产环境部署 Apache ShenYu 前，请确认管理平面已采取以下网络安全措施：

- [ ] 通过防火墙规则、安全组、Kubernetes `NetworkPolicy` 或同等措施，将 ShenYu Admin 监听端口限制在可信内部网络，并仅允许授权运维人员或 Gateway 节点访问。
- [ ] 不要将 Admin 的 `/websocket` 端点暴露到公网或其他不可信网络。该端点用于 ShenYu Admin 与 Gateway 节点之间的数据同步，因此按设计不进行身份认证，必须依靠网络层访问控制进行保护。
- [ ] 将 Gateway 数据平面与 Admin 管理平面分开暴露，不要通过公网负载均衡器或 Ingress 发布 Admin 管理平面。

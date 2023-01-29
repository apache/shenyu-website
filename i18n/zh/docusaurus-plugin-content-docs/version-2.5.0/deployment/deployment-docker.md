---
sidebar_position: 3
title: Docker部署
keywords: ["Docker", "部署"]
description: docker部署
---

本文介绍使用 `docker` 来部署 `Apache ShenYu` 网关。

> 在阅读本文档前，你需要先阅读[部署先决条件](./deployment-before.md)文档来完成部署 `shenyu` 前的环境准备工作。

### 启动Apache ShenYu Admin

```
docker pull apache/shenyu-admin:${current.version}
docker network create shenyu
```

* 使用 `h2` 来存储后台数据：

```
docker run -d -p 9095:9095 \
--net shenyu apache/shenyu-admin:${current.version}
```

* 使用 `MySQL` 来存储后台数据, 按照 [指引文档](./deployment-before.md#mysql) 初始化数据库, 将 [mysql-connector.jar](https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.29/mysql-connector-java-8.0.29.jar) 拷贝到 `/${your_work_dir}/ext-lib`：

```
docker run -v /${your_work_dir}/ext-lib:/opt/shenyu-admin/ext-lib \
-e "SPRING_PROFILES_ACTIVE=mysql" \
-e "spring.datasource.url=jdbc:mysql://${your_ip_port}/shenyu?useUnicode=true&characterEncoding=utf8 \
&useSSL=false&serverTimezone=Asia/Shanghai&zeroDateTimeBehavior=convertToNull" \
-e "spring.datasource.username=${your_username}" \
-e "spring.datasource.password=${your_password}" \
-d -p 9095:9095 --net shenyu apache/shenyu-admin:${current.version}
```

另外一种方式, 从 [配置文件地址](https://github.com/apache/incubator-shenyu/blob/master/shenyu-admin/src/main/resources/) 中把 `application.yml`、`application-mysql.yml`配置放到`${your_work_dir}/conf` ， 调整`application.yml`中的配置`spring.profiles.active = mysql`，然后执行以下语句：

```          
docker run -v ${your_work_dir}/conf:/opt/shenyu-admin/conf \
-v /${your_work_dir}/ext-lib:/opt/shenyu-admin/ext-lib \
-d -p 9095:9095 --net shenyu apache/shenyu-admin:${current.version}
```

* 使用 `PostgreSql` 来存储后台数据, 按照 [指引文档](./deployment-before.md#postgresql) 初始化数据库, 执行以下语句：

```
docker run -e "SPRING_PROFILES_ACTIVE=pg" \
-e "spring.datasource.url=jdbc:postgresql://${your_ip_port}/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
-e "spring.datasource.username=${your_username}" \
-e "spring.datasource.password=${your_password}" \
-d -p 9095:9095 --net shenyu apache/shenyu-admin:${current.version}
```

另外一种方式, 从 [配置文件地址](https://github.com/apache/incubator-shenyu/blob/master/shenyu-admin/src/main/resources/) 中把 `application.yml`、`application-pg.yml`配置放到`${your_work_dir}/conf`， 调整`application.yml`中的配置`spring.profiles.active = pg`，然后执行以下语句：

```
docker run -v ${your_work_dir}/conf:/opt/shenyu-admin/conf \
-d -p 9095:9095 --net shenyu apache/shenyu-admin:${current.version}
```

* 使用 `Oracle` 来存储后台数据, 按照 [指引文档](./deployment-before.md#oracle) 初始化数据库, 执行以下语句：

```
docker run -e "SPRING_PROFILES_ACTIVE=oracle" \
-e "spring.datasource.url=jdbc:oracle:thin:@localhost:1521/shenyu" \
-e "spring.datasource.username=${your_username}" \
-e "spring.datasource.password=${your_password}" \
-d -p 9095:9095 --net shenyu apache/shenyu-admin:${current.version}
```

另外一种方式, 从 [配置文件地址](https://github.com/apache/incubator-shenyu/blob/master/shenyu-admin/src/main/resources/) 中把 `application.yml`、`application-oracle.yml` 配置放到`${your_work_dir}/conf`， 调整`application.yml`中的配置`spring.profiles.active = oracle`，然后执行以下语句：

```
docker run -v ${your_work_dir}/conf:/opt/shenyu-admin/conf \
-d -p 9095:9095 --net shenyu apache/shenyu-admin:${current.version}
```

### 启动Apache ShenYu Bootstrap

宿主机中，bootstrap的[配置文件](https://github.com/apache/incubator-shenyu/tree/master/shenyu-bootstrap/src/main/resources)所在目录记为 `$BOOTSTRAP_CONF`。

```shell
docker run -d \
  -p 9195:9195 \
  -v $BOOTSTRAP_CONF:/opt/shenyu-bootstrap/conf \
  --name shenyu-bootstrap \
  --net shenyu \
  --env SHENYU_SYNC_WEBSOCKET_URLS=ws://shenyu-admin:9095/websocket \
  apache/shenyu-bootstrap:${current.version}
```

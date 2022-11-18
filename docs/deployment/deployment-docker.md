---
sidebar_position: 3
title: Docker Deployment
keywords: ["docker", "Deployment"]
description: Docker Deployment
---

This article introduces the use of `docker` to deploy the `Apache ShenYu` gateway.

> Before you read this document, you need to complete some preparations before deploying Shenyu according to the [Deployment Prerequisites document](./deployment-before.md).

### Create Docker Network

```
> docker network create shenyu
```

### Start Apache ShenYu Admin

```
> docker pull apache/shenyu-admin:${current.version}
```

> After version 2.5.1, when `docker run`, we can customize JVM startup parameters by adding `-e ADMIN_JVM="xxxx"`

* use `h2` to store data:

```
> docker run -d -p 9095:9095 --name shenyu-admin --net shenyu apache/shenyu-admin:${current.version}
```

* use `MySQL` to store data, follow the [guide document](./deployment-before.md#mysql) to initialize the database, copy [mysql-connector.jar](https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.29/mysql-connector-java-8.0.29.jar) to `/$(your_work_dir)/ext-lib`：

```
docker run --name shenyu-admin -v /${your_work_dir}/ext-lib:/opt/shenyu-admin/ext-lib -e "SPRING_PROFILES_ACTIVE=mysql" -e "spring.datasource.url=jdbc:mysql://${your_ip_port}/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=Asia/Shanghai&zeroDateTimeBehavior=convertToNull" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:${current.version}
```

another way is to put the `application.yml`、`application-mysql.yml` configuration in  ${your_work_dir}/conf from [Configure address](https://github.com/apache/shenyu/blob/master/shenyu-admin/src/main/resources/) , modify the configuration `spring.profiles.active = mysql` in `application.yml`, and then execute the following statement：

```          
docker run --name shenyu-admin -v ${your_work_dir}/conf:/opt/shenyu-admin/conf -v /${your_work_dir}/ext-lib:/opt/shenyu-admin/ext-lib -d -p 9095:9095 --net shenyu apache/shenyu-admin:${current.version}
```

* use `PostgreSql` to store data, follow the [guide document](./deployment-before.md#postgresql) to initialize the database, execute the following statement：

```
docker run --name shenyu-admin -e "SPRING_PROFILES_ACTIVE=pg" -e "spring.datasource.url=jdbc:postgresql://${your_ip_port}/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:${current.version}
```

another way is to put the `application.yml`、`application-pg.yml` configuration in ${your_work_dir}/conf, modify the configuration `spring.profiles.active = pg` in `application.yml`,and then execute the following statement：

```
docker run --name shenyu-admin -v ${your_work_dir}/conf:/opt/shenyu-admin/conf -d -p 9095:9095 --net shenyu apache/shenyu-admin:${current.version}
```

* use `Oracle` to store data, follow the [guide document](./deployment-before.md#oracle) to initialize the database, execute the following statement：

```
docker run --name shenyu-admin -e "SPRING_PROFILES_ACTIVE=oracle" -e "spring.datasource.url=jdbc:oracle:thin:@localhost:1521/shenyu" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:${current.version}
```

another way is to put the `application.yml`、`application-oracle.yml` configuration in ${your_work_dir}/conf, modify the configuration `spring.profiles.active = oracle` in `application.yml`, and then execute the following statement：

```
docker run --name shenyu-admin -v ${your_work_dir}/conf:/opt/shenyu-admin/conf -d -p 9095:9095 --net shenyu apache/shenyu-admin:${current.version}
```

### Start Apache ShenYu Bootstrap

> After version 2.5.1, when `docker run`, we can customize JVM startup parameters by adding `-e BOOT_JVM="xxxx"`

First, pull the docker image

```shell
> docker pull apache/shenyu-bootstrap:${current.version}
```

If you don't need to modify the configuration, just use the command below to run the application

```shell
> docker run -d \
  -p 9195:9195 \
  --name shenyu-bootstrap \
  --net shenyu \
  --env SHENYU_SYNC_WEBSOCKET_URLS=ws://shenyu-admin:9095/websocket \
  apache/shenyu-bootstrap:${current.version}
```

> `SHENYU_SYNC_WEBSOCKET_URLS` indicates the websocket address that shenyu-bootstrap used to communicate with shenyu-admin

If you need to modify the configuration, copy the configuration from the Github directory where the bootstrap [configuration file](https://github.com/apache/shenyu/tree/master/shenyu-bootstrap/src/main/resources) is located, then recorded it as `$BOOTSTRAP_CONF`. After your modification, execute the command below to run the application

```shell
> docker run -d \
  -p 9195:9195 \
  -v $BOOTSTRAP_CONF:/opt/shenyu-bootstrap/conf \
  --name shenyu-bootstrap \
  --net shenyu \
  --env SHENYU_SYNC_WEBSOCKET_URLS=ws://shenyu-admin:9095/websocket \
  apache/shenyu-bootstrap:${current.version}
```

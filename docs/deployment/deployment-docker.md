---
sidebar_position: 3
title: Docker Deployment
keywords: ["docker", "Deployment"]
description: Docker Deployment
---

This article introduces the use of `docker` to deploy the `Apache ShenYu` gateway.

> Before you read this document, you need to complete some preparations before deploying ShenYu according to the [Deployment Prerequisites document](./deployment-before.md).

### Prepare 2.7.2 images {#prepare-images}

As of November 24, 2026, the public `apache/shenyu-admin:2.7.2` and `apache/shenyu-bootstrap:2.7.2` tags are unavailable. Build the images locally from published binary distributions and the release Dockerfiles before using the commands below. For deployment without an image build, use [binary packages](./deployment-package.md).

```bash
git clone --depth 1 --branch v2.7.2 https://github.com/apache/shenyu.git shenyu-2.7.2
cd shenyu-2.7.2
mkdir -p shenyu-dist/shenyu-admin-dist/target shenyu-dist/shenyu-bootstrap-dist/target
curl -fL https://downloads.apache.org/shenyu/2.7.2/apache-shenyu-2.7.2-admin-bin.tar.gz -o shenyu-dist/shenyu-admin-dist/target/apache-shenyu-2.7.2-admin-bin.tar.gz
curl -fL https://downloads.apache.org/shenyu/2.7.2/apache-shenyu-2.7.2-bootstrap-bin.tar.gz -o shenyu-dist/shenyu-bootstrap-dist/target/apache-shenyu-2.7.2-bootstrap-bin.tar.gz
```

Verify both archives using the signatures and checksums on the [download page](/download), then build:

```bash
docker build --build-arg APP_NAME=apache-shenyu-2.7.2-admin-bin -t apache/shenyu-admin:2.7.2 -f shenyu-dist/shenyu-admin-dist/docker/Dockerfile shenyu-dist/shenyu-admin-dist
docker build --build-arg APP_NAME=apache-shenyu-2.7.2-bootstrap-bin -t apache/shenyu-bootstrap:2.7.2 -f shenyu-dist/shenyu-bootstrap-dist/docker/Dockerfile shenyu-dist/shenyu-bootstrap-dist
```

The release images run as UID/GID `10001:10001`. Mounted configuration and dependency files must be readable by this user; mounted log directories and `/tmp` must be writable. See the [release container runtime guide](https://github.com/apache/shenyu/blob/v2.7.2/docs/container-runtime.md).

Set `SHENYU_JWT_SECRETKEY` in the shell before running the Admin commands. Generate a private value, for example with `openssl rand -base64 48`, and use the same value across Admin instances. See [deployment prerequisites](./deployment-before.md#admin-signing-key). Existing installations must first follow the [upgrade guide](./upgrade-2.7.2.md).

### Create Docker Network

```
docker network create shenyu
```

### Start Apache ShenYu Admin

```
docker image inspect apache/shenyu-admin:2.7.2
```

> After version 2.5.1, when `docker run`, we can customize JVM startup parameters by adding `-e ADMIN_JVM="xxxx"`

* use `h2` to store data:

```
docker run -e SHENYU_JWT_SECRETKEY -d -p 9095:9095 --name shenyu-admin --net shenyu apache/shenyu-admin:2.7.2
```

* use `MySQL` to store data, follow the [guide document](./deployment-before.md#mysql) to initialize the database, copy [mysql-connector.jar](https://repo1.maven.org/maven2/com/mysql/mysql-connector-j/8.3.0/mysql-connector-j-8.3.0.jar) to `/$(your_work_dir)/ext-lib`:

```
docker run -e SHENYU_JWT_SECRETKEY --name shenyu-admin -v /${your_work_dir}/ext-lib:/opt/shenyu-admin/ext-lib -e "SPRING_PROFILES_ACTIVE=mysql" -e "spring.datasource.url=jdbc:mysql://${your_ip_port}/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=Asia/Shanghai&zeroDateTimeBehavior=convertToNull" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.7.2
```

another way is to put the `application.yml`,`application-mysql.yml` configuration in  $\{your_work_dir}/conf from [Configure address](https://github.com/apache/shenyu/blob/v2.7.2/shenyu-admin/src/main/resources/) , modify the configuration `spring.profiles.active = mysql` in `application.yml`, and then execute the following statement:

```          
docker run -e SHENYU_JWT_SECRETKEY --name shenyu-admin -v ${your_work_dir}/conf:/opt/shenyu-admin/conf -v /${your_work_dir}/ext-lib:/opt/shenyu-admin/ext-lib -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.7.2
```

* use `PostgreSql` to store data, follow the [guide document](./deployment-before.md#postgresql) to initialize the database, execute the following statement:

```
docker run -e SHENYU_JWT_SECRETKEY --name shenyu-admin -e "SPRING_PROFILES_ACTIVE=pg" -e "spring.datasource.url=jdbc:postgresql://${your_ip_port}/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.7.2
```

another way is to put the `application.yml`,`application-pg.yml` configuration in $\{your_work_dir}/conf, modify the configuration `spring.profiles.active = pg` in `application.yml`,and then execute the following statement:

```
docker run -e SHENYU_JWT_SECRETKEY --name shenyu-admin -v ${your_work_dir}/conf:/opt/shenyu-admin/conf -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.7.2
```

* use `Oracle` to store data, follow the [guide document](./deployment-before.md#oracle) to initialize the database, execute the following statement:

```
docker run -e SHENYU_JWT_SECRETKEY --name shenyu-admin -e "SPRING_PROFILES_ACTIVE=oracle" -e "spring.datasource.url=jdbc:oracle:thin:@localhost:1521/shenyu" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.7.2
```

another way is to put the `application.yml`,`application-oracle.yml` configuration in $\{your_work_dir}/conf, modify the configuration `spring.profiles.active = oracle` in `application.yml`, and then execute the following statement:

```
docker run -e SHENYU_JWT_SECRETKEY --name shenyu-admin -v ${your_work_dir}/conf:/opt/shenyu-admin/conf -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.7.2
```

* use `OpenGauss` to store data, follow the [guide document](./deployment-before.md#opengauss) to initialize the database, execute the following statement:

```
docker run -e SHENYU_JWT_SECRETKEY --name shenyu-admin -e "SPRING_PROFILES_ACTIVE=og" -e "spring.datasource.url=jdbc:opengauss://localhost:5432/shenyu" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.7.2
```

another way is to put the `application.yml`,`application-og.yml` configuration in $\{your_work_dir}/conf, modify the configuration `spring.profiles.active = og` in `application.yml`, and then execute the following statement:

```
docker run -e SHENYU_JWT_SECRETKEY --name shenyu-admin -v ${your_work_dir}/conf:/opt/shenyu-admin/conf -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.7.2
```

### Start Apache ShenYu Bootstrap

> After version 2.5.1, when `docker run`, we can customize JVM startup parameters by adding `-e BOOT_JVM="xxxx"`

First, pull the docker image

```shell
docker image inspect apache/shenyu-bootstrap:2.7.2
```

If you don't need to modify the configuration, just use the command below to run the application

```shell
docker run -d \
  -p 9195:9195 \
  --name shenyu-bootstrap \
  --net shenyu \
  --env SHENYU_SYNC_WEBSOCKET_URLS=ws://shenyu-admin:9095/websocket \
  apache/shenyu-bootstrap:2.7.2
```

> `SHENYU_SYNC_WEBSOCKET_URLS` indicates the websocket address that shenyu-bootstrap used to communicate with shenyu-admin

If you need to modify the configuration, copy the configuration from the Github directory where the bootstrap [configuration file](https://github.com/apache/shenyu/tree/v2.7.2/shenyu-bootstrap/src/main/resources) is located, then recorded it as `$BOOTSTRAP_CONF`. After your modification, execute the command below to run the application

```shell
docker run -d \
  -p 9195:9195 \
  -v $BOOTSTRAP_CONF:/opt/shenyu-bootstrap/conf \
  --name shenyu-bootstrap \
  --net shenyu \
  --env SHENYU_SYNC_WEBSOCKET_URLS=ws://shenyu-admin:9095/websocket \
  apache/shenyu-bootstrap:2.7.2
```

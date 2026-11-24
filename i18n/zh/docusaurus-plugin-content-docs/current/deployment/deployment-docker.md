---
sidebar_position: 3
title: Docker部署
keywords: ["Docker", "部署"]
description: docker部署
---

本文介绍使用 `docker` 来部署 `Apache ShenYu` 网关。

> 在阅读本文档前，你需要先阅读[部署先决条件](./deployment-before.md)文档来完成部署 `shenyu` 前的环境准备工作。

### 准备 2.7.2 镜像 {#prepare-images}

截至 2026 年 11 月 24 日，公开仓库尚未提供 `apache/shenyu-admin:2.7.2` 和 `apache/shenyu-bootstrap:2.7.2` 标签。执行下方命令前，请使用已发布的二进制包和发行版 Dockerfile 在本地构建镜像。不构建镜像时，可使用[二进制包部署](./deployment-package.md)。

```bash
git clone --depth 1 --branch v2.7.2 https://github.com/apache/shenyu.git shenyu-2.7.2
cd shenyu-2.7.2
mkdir -p shenyu-dist/shenyu-admin-dist/target shenyu-dist/shenyu-bootstrap-dist/target
curl -fL https://downloads.apache.org/shenyu/2.7.2/apache-shenyu-2.7.2-admin-bin.tar.gz -o shenyu-dist/shenyu-admin-dist/target/apache-shenyu-2.7.2-admin-bin.tar.gz
curl -fL https://downloads.apache.org/shenyu/2.7.2/apache-shenyu-2.7.2-bootstrap-bin.tar.gz -o shenyu-dist/shenyu-bootstrap-dist/target/apache-shenyu-2.7.2-bootstrap-bin.tar.gz
```

按照[下载页面](/download)的说明验证两个包的签名和校验和，然后构建镜像：

```bash
docker build --build-arg APP_NAME=apache-shenyu-2.7.2-admin-bin -t apache/shenyu-admin:2.7.2 -f shenyu-dist/shenyu-admin-dist/docker/Dockerfile shenyu-dist/shenyu-admin-dist
docker build --build-arg APP_NAME=apache-shenyu-2.7.2-bootstrap-bin -t apache/shenyu-bootstrap:2.7.2 -f shenyu-dist/shenyu-bootstrap-dist/docker/Dockerfile shenyu-dist/shenyu-bootstrap-dist
```

发行版镜像使用 UID/GID `10001:10001` 运行。挂载的配置和依赖文件必须允许该用户读取，日志目录和 `/tmp` 必须允许其写入。详见[发行版容器运行指南](https://github.com/apache/shenyu/blob/v2.7.2/docs/container-runtime.md)。

运行 Admin 命令前，在当前 shell 中设置 `SHENYU_JWT_SECRETKEY`。可使用 `openssl rand -base64 48` 生成私有密钥，并在所有 Admin 实例间使用同一个值。详见[部署先决条件](./deployment-before.md#admin-signing-key)。已有部署需先完成[升级指南](./upgrade-2.7.2.md)中的迁移。

### 创建 Docker Network

```
docker network create shenyu
```

### 启动 Apache ShenYu Admin

```
docker image inspect apache/shenyu-admin:2.7.2
```

> 在 2.5.1 版本之后，在 `docker run` 时，可以通过添加 `-e ADMIN_JVM="xxxx"` 来自定义 JVM 启动参数

* 使用 `h2` 来存储后台数据：

```
docker run -e SHENYU_JWT_SECRETKEY -d -p 9095:9095 --name shenyu-admin --net shenyu apache/shenyu-admin:2.7.2
```

* 使用 `MySQL` 来存储后台数据, 按照 [指引文档](./deployment-before.md#mysql) 初始化数据库, 将 [mysql-connector.jar](https://repo1.maven.org/maven2/com/mysql/mysql-connector-j/8.3.0/mysql-connector-j-8.3.0.jar) 拷贝到 `/${your_work_dir}/ext-lib`：

```
docker run -e SHENYU_JWT_SECRETKEY --name shenyu-admin -v /${your_work_dir}/ext-lib:/opt/shenyu-admin/ext-lib -e "SPRING_PROFILES_ACTIVE=mysql" -e "spring.datasource.url=jdbc:mysql://${your_ip_port}/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=Asia/Shanghai&zeroDateTimeBehavior=convertToNull" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.7.2
```

另外一种方式, 从 [配置文件地址](https://github.com/apache/shenyu/blob/v2.7.2/shenyu-admin/src/main/resources/) 中把 `application.yml`、`application-mysql.yml`配置放到`${your_work_dir}/conf` ， 调整`application.yml`中的配置`spring.profiles.active = mysql`，然后执行以下语句：

```          
docker run -e SHENYU_JWT_SECRETKEY --name shenyu-admin -v ${your_work_dir}/conf:/opt/shenyu-admin/conf -v /${your_work_dir}/ext-lib:/opt/shenyu-admin/ext-lib -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.7.2
```

* 使用 `PostgreSql` 来存储后台数据, 按照 [指引文档](./deployment-before.md#postgresql) 初始化数据库, 执行以下语句：

```
docker run -e SHENYU_JWT_SECRETKEY --name shenyu-admin -e "SPRING_PROFILES_ACTIVE=pg" -e "spring.datasource.url=jdbc:postgresql://${your_ip_port}/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.7.2
```

另外一种方式, 从 [配置文件地址](https://github.com/apache/shenyu/blob/v2.7.2/shenyu-admin/src/main/resources/) 中把 `application.yml`、`application-pg.yml`配置放到`${your_work_dir}/conf`， 调整`application.yml`中的配置`spring.profiles.active = pg`，然后执行以下语句：

```
docker run -e SHENYU_JWT_SECRETKEY --name shenyu-admin -v ${your_work_dir}/conf:/opt/shenyu-admin/conf -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.7.2
```

* 使用 `Oracle` 来存储后台数据, 按照 [指引文档](./deployment-before.md#oracle) 初始化数据库, 执行以下语句：

```
docker run -e SHENYU_JWT_SECRETKEY --name shenyu-admin -e "SPRING_PROFILES_ACTIVE=oracle" -e "spring.datasource.url=jdbc:oracle:thin:@localhost:1521/shenyu" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.7.2
```

另外一种方式, 从 [配置文件地址](https://github.com/apache/shenyu/blob/v2.7.2/shenyu-admin/src/main/resources/) 中把 `application.yml`、`application-oracle.yml` 配置放到`${your_work_dir}/conf`， 调整`application.yml`中的配置`spring.profiles.active = oracle`，然后执行以下语句：

```
docker run -e SHENYU_JWT_SECRETKEY --name shenyu-admin -v ${your_work_dir}/conf:/opt/shenyu-admin/conf -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.7.2
```

* 使用 `OpenGauss` 来存储后台数据, 按照 [指引文档](./deployment-before.md#opengauss) 初始化数据库, 执行以下语句：

```
docker run -e SHENYU_JWT_SECRETKEY --name shenyu-admin -e "SPRING_PROFILES_ACTIVE=opengauss" -e "spring.datasource.url=jdbc:opengauss://localhost:5432/shenyu" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.7.2
```

另外一种方式, 从 [配置文件地址](https://github.com/apache/shenyu/blob/v2.7.2/shenyu-admin/src/main/resources/) 中把 `application.yml`、`application-og.yml` 配置放到`${your_work_dir}/conf`， 调整`application.yml`中的配置`spring.profiles.active = og`，然后执行以下语句：

```
docker run -e SHENYU_JWT_SECRETKEY --name shenyu-admin -v ${your_work_dir}/conf:/opt/shenyu-admin/conf -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.7.2
```

### 启动Apache ShenYu Bootstrap

> 在 2.5.1 版本之后，在 `docker run` 时，可以通过添加 `-e BOOT_JVM="xxxx"` 来自定义 JVM 启动参数

首先拉取 Docker 镜像

```shell
docker image inspect apache/shenyu-bootstrap:2.7.2
```

如果不需要修改配置，可以直接使用以下命令启动

```shell
docker run -d \
  -p 9195:9195 \
  --name shenyu-bootstrap \
  --net shenyu \
  --env SHENYU_SYNC_WEBSOCKET_URLS=ws://shenyu-admin:9095/websocket \
  apache/shenyu-bootstrap:2.7.2
```

> 使用 SHENYU_SYNC_WEBSOCKET_URLS 环境变量可以为 bootstrap 指定与 admin 通信的 Websocket 地址

如果需要修改配置，可以从 Github 中拉取 bootstrap 的[配置文件](https://github.com/apache/shenyu/tree/v2.7.2/shenyu-bootstrap/src/main/resources)，将其所在目录记为 `$BOOTSTRAP_CONF`，并进行配置修改。修改完毕后，使用以下命令启动

```shell
docker run -d \
  -p 9195:9195 \
  -v $BOOTSTRAP_CONF:/opt/shenyu-bootstrap/conf \
  --name shenyu-bootstrap \
  --net shenyu \
  --env SHENYU_SYNC_WEBSOCKET_URLS=ws://shenyu-admin:9095/websocket \
  apache/shenyu-bootstrap:2.7.2
```

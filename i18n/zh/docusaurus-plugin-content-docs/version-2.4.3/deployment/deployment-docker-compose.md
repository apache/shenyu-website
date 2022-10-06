---
sidebar_position: 3
title: Docker-compose 部署
keywords: ["docker-compose", "Deployment"]
description: Docker-compose Deployment
---

本文介绍使用 `docker-compose` 来部署 `Apache ShenYu` 网关。

> 在阅读本文档前，你需要先阅读[部署先决条件](./deployment-before.md)文档来完成部署 `shenyu` 前的环境准备工作。

### 下载 shell 脚本

```shell
curl -O https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/install.sh
```

### 执行脚本

这个脚本会下载需要的配置文件、mysql-connector，如果发现下载失败可以重复执行。

```shell
sh ./install.sh #默认拉取最新配置，如果需要部署已发布版本，可增加一个参数表示版本号，比如：v2.4.2 或 latest
```

### 初始化`shenyu-admin`存储数据源

参考[数据库初始文档](./deployment-before.md#数据库环境准备) 初始化数据库环境 。

### 修改配置文件

修改脚本下载的配置文件来设置`JDBC`等配置。

### 执行 docker-compose

```shell
docker-compose -f ./shenyu-${VERSION}/docker-compose.yaml up -d
```

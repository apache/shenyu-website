---
sidebar_position: 3
title: Docker-compose 部署
keywords: ["docker-compose", "Deployment"]
description: Docker-compose Deployment
---

本文介绍使用 `docker-compose` 来部署 `Apache ShenYu` 网关。

### 下载 shell 脚本

```shell
curl -O https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/install.sh
```

### 执行脚本

这个脚本会下载需要的配置文件、mysql-connector，如果发现下载失败可以重复执行。

```shell
sh ./install.sh v2.4.2 #默认拉取最新配置，如果需要部署已发布版本，可增加一个参数表示版本号，比如：v2.4.2 或 latest
```

### 修改配置文件

可以修改脚本下载的配置文件。

### 执行 docker-compose

```shell
cd shenyu-${VERSION}
docker-compose -f ./docker-compose.yaml up -d
```

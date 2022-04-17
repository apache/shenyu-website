---
sidebar_position: 3
title: Docker-compose Deployment
keywords: ["docker-compose", "Deployment"]
description: Docker-compose Deployment
---

This article introduces the use of `docker-compose` to deploy the `Apache ShenYu` gateway.

### Download shell script

```shell
curl -O https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/install.sh
```

### execute script

This script will download the required configuration files and mysql-connector, and can be executed repeatedly if the download fails.

```shell
sh ./install.sh v2.4.2 #The latest configuration is pulled by default. If you need to deploy the released version, you can add a parameter to indicate the version number, such as: v2.4.2 or latest
```

### Modify the configuration file

The configuration file downloaded by the script can be modified.

### Execute docker-compose

```shell
cd shenyu-${VERSION}
docker-compose -f ./shenyu-${VERSION}/docker-compose.yaml up -d
```

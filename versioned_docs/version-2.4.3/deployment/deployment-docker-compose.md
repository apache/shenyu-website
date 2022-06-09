---
sidebar_position: 3
title: Docker-compose Deployment
keywords: ["docker-compose", "Deployment"]
description: Docker-compose Deployment
---

This article introduces the use of `docker-compose` to deploy the `Apache ShenYu` gateway.

> Before you read this document, you need to complete some preparations before deploying Shenyu according to the [Deployment Prerequisites document](./deployment-before.md).

### Download shell script

```shell
curl -O https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/install.sh
```

### execute script

This script will download the required configuration files and mysql-connector, and can be executed repeatedly if the download fails.

```shell
sh ./install.sh #The latest configuration is pulled by default. If you need to deploy the released version, you can add a parameter to indicate the version number, such as: v2.4.2 or latest
```

### Initialize the `shenyu-admin` database

Refer to the [database initialization documentation](./deployment-before.md#database-initialize) to initialize the database.

### Modify the configuration file

Modify the configuration file downloaded by the script to set up configurations such as `JDBC`.

### Execute docker-compose

```shell
cd shenyu-${VERSION}
docker-compose -f ./shenyu-${VERSION}/docker-compose.yaml up -d
```

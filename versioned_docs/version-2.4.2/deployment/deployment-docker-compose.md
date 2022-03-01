---
sidebar_position: 3
title: Docker-compose Deployment
keywords: ["docker-compose", "Deployment"]
description: Docker-compose Deployment
---

This article introduces the use of `docker-compose` to deploy the `Apache ShenYu` gateway.

### start admin and bootstrap

Choose one as the data source. It can be `h2` or `mysql` or `pg`.

* use `h2`

```shell
curl https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/install.sh | bash -s v2.4.2 h2
```

* use `mysql`

```shell
curl https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/install.sh | bash -s v2.4.2 mysql
```

* use `pg`

```shell
curl https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/install.sh | bash -s v2.4.2 pg
```

---
sidebar_position: 3
title: Docker-compose Deployment
keywords: ["docker-compose", "Deployment"]
description: Docker-compose Deployment
---

本文介绍使用 `docker-compose` 来部署 `Apache ShenYu` 网关。

### 启动 admin 和 bootstrap

选择一个作为数据源。可以是 `h2` 或者 `mysql` 或者 `pg`。

* 利用 `h2`

```shell
curl https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/install.sh | bash -s master h2
```

* 利用 `mysql`

```shell
curl https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/install.sh | bash -s master mysql
```

* 利用 `pg`

```shell
curl https://raw.githubusercontent.com/apache/incubator-shenyu/master/shenyu-dist/shenyu-docker-compose-dist/src/main/resources/install.sh | bash -s master pg
```

---
sidebar_position: 3
title: Docker部署
keywords: ["Docker", "部署"]
description: docker部署
---

本文介绍使用 `docker` 来部署 `Apache ShenYu` 网关。

### 启动Apache ShenYu Admin

```
> docker pull apache/shenyu-admin:2.4.2
> docker network create shenyu
```

* 使用 `h2` 来存储后台数据：

```
> docker run -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.2
```

* 使用 `MySQL` 来存储后台数据,将`mysql-connector.jar` 拷贝到 `/${your_work_dir}/ext-lib`：

```
docker run -v /${your_work_dir}/ext-lib:/opt/shenyu-admin/ext-lib -e "SPRING_PROFILES_ACTIVE=mysql" -e "spring.datasource.url=jdbc:mysql://${your_ip_port}/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.2
```

另外一种方式, 从 [配置文件地址](https://github.com/apache/incubator-shenyu/blob/master/shenyu-admin/src/main/resources/) 中把 `application.yml`、`application-mysql.yml`、`application-pg.yml` 配置放到`${your_work_dir}/conf` ， 然后执行以下语句：

```          
docker run -v ${your_work_dir}/conf:/opt/shenyu-admin/conf -v /${your_work_dir}/ext-lib:/opt/shenyu-admin/ext-lib -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.2
```

* 使用 `PostgreSql` 来存储后台数据, 执行以下语句：

```
docker run -e "SPRING_PROFILES_ACTIVE=pg" -e "spring.datasource.url=jdbc:postgresql://${your_ip_port}/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.2
```

另外一种方式, 从 [配置文件地址](https://github.com/apache/incubator-shenyu/blob/master/shenyu-admin/src/main/resources/) 中把 `application.yml`、`application-mysql.yml`、`application-pg.yml` 配置放到`${your_work_dir}/conf` ， 然后执行以下语句：

```
docker run -v ${your_work_dir}/conf:/opt/shenyu-admin/conf -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.2
```

### 启动Apache ShenYu Bootstrap

宿主机中，bootstrap的[配置文件](https://github.com/apache/incubator-shenyu/tree/master/shenyu-bootstrap/src/main/resources)所在目录记为 `$BOOTSTRAP_CONF`。

```shell
> docker network create shenyu
> docker pull apache/shenyu-bootstrap:2.4.2
> docker run -d \
  -p 9195:9195 \
  -v $BOOTSTRAP_CONF:/opt/shenyu-bootstrap/conf \
  apache/shenyu-bootstrap:2.4.2
```

### 启动 ShenYu Bootstrap 的同时，启动 ShenYu Agent

> 2.4.2版本开始支持shenyu-agent

* 编辑配置文件

agent相关配置文件位于 [shenyu-dist/shenyu-agent-dist/src/main/resources/conf/](https://github.com/apache/incubator-shenyu/tree/master/shenyu-dist/shenyu-agent-dist/src/main/resources/conf) ，编辑好 `shenyu-agent.yaml` 和 `tracing-point.yaml` 后，将这两个文件放在同一目录下，记为 `$AGENT_CONF`。

详细配置请参考 [可观测性](../user-guide/observability/observability.md)

* 拉取docker镜像并启动

附带参数 `agent` 表示启动 `shenyu-agent`。

```shell
> docker network create shenyu
> docker pull apache/shenyu-bootstrap:2.4.2
> docker run -d \
  -p 9195:9195 \
  -v $AGENT_CONF:/opt/shenyu-bootstrap/agent/conf \
  -v $BOOTSTRAP_CONF:/opt/shenyu-bootstrap/conf \
  apache/shenyu-bootstrap:2.4.2 agent
```

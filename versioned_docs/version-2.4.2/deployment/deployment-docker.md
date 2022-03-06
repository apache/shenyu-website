---
sidebar_position: 3
title: Docker Deployment
keywords: ["docker", "Deployment"]
description: Docker Deployment
---

This article introduces the use of `docker` to deploy the `Apache ShenYu` gateway.

### Start Apache ShenYu Admin

```
> docker pull apache/shenyu-admin:2.4.2
> docker network create shenyu
```

* use `h2` to store data:

```
> docker run -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.2
```

* use `MySQL` to store data, copy [mysql-connector.jar](https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.18/mysql-connector-java-8.0.18.jar) to `/$(your_work_dir)/ext-lib`：

```
docker run -v /${your_work_dir}/ext-lib:/opt/shenyu-admin/ext-lib -e "SPRING_PROFILES_ACTIVE=mysql" -e "spring.datasource.url=jdbc:mysql://${your_ip_port}/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.2
```

another way is to put the `application.yml`、`application-mysql.yml`、`application-pg.yml` configuration in  ${your_work_dir}/conf from [Configure address](https://github.com/apache/incubator-shenyu/blob/master/shenyu-admin/src/main/resources/) , and then execute the following statement：

```          
docker run -v ${your_work_dir}/conf:/opt/shenyu-admin/conf -v /${your_work_dir}/ext-lib:/opt/shenyu-admin/ext-lib -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.2
```

* use `PostgreSql` to store data, execute the following statement：

```
docker run -e "SPRING_PROFILES_ACTIVE=pg" -e "spring.datasource.url=jdbc:postgresql://${your_ip_port}/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.2
```

another way is to put the `application.yml` configuration in ${your_work_dir}/conf, and then execute the following statement：

```
docker run -v ${your_work_dir}/conf:/opt/shenyu-admin/conf -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.2
```

### Start Apache ShenYu Bootstrap

In the host, the directory where the bootstrap [configuration file](https://github.com/apache/incubator-shenyu/tree/master/shenyu-bootstrap/src/main/resources) is located is recorded as `$BOOTSTRAP_CONF`.

```shell
> docker network create shenyu
> docker pull apache/shenyu-bootstrap:2.4.2
> docker run -d \
  -p 9195:9195 \
  -v $BOOTSTRAP_CONF:/opt/shenyu-bootstrap/conf \
  apache/shenyu-bootstrap:2.4.2
```

### Start ShenYu Bootstrap with ShenYu Agent

> 2.4.2 version started to support shenyu-agent

* Edit configuration file

Agent related configuration files are located at [shenyu-dist/shenyu-agent-dist/src/main/resources/conf/](https://github.com/apache/incubator-shenyu/tree/master/shenyu-dist/shenyu-agent-dist/src/main/resources/conf), after editing `shenyu-agent.yaml` and `tracing-point.yaml`, put these two files in the same directory, record them as `$AGENT_CONF`.

For detailed configuration, please refer to [Observability](../user-guide/observability/observability.md)

* Pull the docker image and run

The additional parameter `agent` means to start `shenyu-agent`.

```shell
> docker network create shenyu
> docker pull apache/shenyu-bootstrap:2.4.2
> docker run -d \
  -p 9195:9195 \
  -v $AGENT_CONF:/opt/shenyu-bootstrap/agent/conf \
  -v $BOOTSTRAP_CONF:/opt/shenyu-bootstrap/conf \
  apache/shenyu-bootstrap:2.4.2 agent
```

---
sidebar_position: 3
title: Docker部署
keywords: ["Docker", "部署"]
description: docker部署
---

本文介绍使用 `docker` 来部署 `Apache ShenYu` 网关。

### 启动Apache ShenYu Admin

```
> docker pull apache/shenyu-admin:2.4.0
> docker network create shenyu
```

* 使用 `h2` 来存储后台数据：

```
> docker run -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.0
```

* 使用 `MySQL` 来存储后台数据,将 [mysql-connector.jar](https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.18/mysql-connector-java-8.0.18.jar) 拷贝到 `/${your_work_dir}/ext-lib`：

```
docker run -v /${your_work_dir}/ext-lib:/opt/shenyu-admin/ext-lib -e "SPRING_PROFILES_ACTIVE=mysql" -e "spring.datasource.url=jdbc:mysql://${your_ip_port}/shenyu?useUnicode=true&characterEncoding=utf-8&useSSL=false" -e "spring.datasource.username=${your_username}" -e "spring.datasource.password=${your_password}" -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.0
```

另外一种方式把 `application.yml` 配置放到`${your_work_dir}/conf`， 然后执行以下语句：

```          
docker run -v ${your_work_dir}/conf:/opt/shenyu-admin/conf/ -v /${your_work_dir}/ext-lib:/opt/shenyu-admin/ext-lib -d -p 9095:9095 --net shenyu apache/shenyu-admin:2.4.0
```

### 启动Apache ShenYu Bootstrap

```
> docker network create shenyu
> docker pull apache/shenyu-bootstrap:2.4.0
> docker run -d -p 9195:9195 --net shenyu apache/shenyu-bootstrap:2.4.0
```                       





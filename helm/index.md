---
title: Helm Deployment
description: Helm Deployment
---

This article introduces the use of `helm` to deploy the `Apache ShenYu` gateway.

> Before you read this document, you need to complete some preparations before deploying Shenyu according to the [Deployment Prerequisites document](https://shenyu.apache.org/docs/deployment/deployment-before/).

## Add Helm repository

```shell
helm repo add shenyu https://apache.github.io/shenyu-helm-chart
helm repo update
```

## Install

### Deployment prerequisites

Before reading this document, you need to read [Deployment prerequisites](https://shenyu.apache.org/docs/deployment/deployment-before/) to complete the environment preparation before deploying ShenYu.

### Instructions

* **Install the application**: By default, both admin and bootstrap are installed.
* **Service Exposure**: Use NodePort to expose the service, the default port is `31095` for admin and `31195` for bootstrap.
* **Database**: Currently supports h2, MySQL, PostgreSQL, Oracle as database. Default is h2.

### h2 as database

Running the following command will install admin and bootstrap under shenyu namespace and create namespace.

```shell
helm install shenyu shenyu/shenyu -n=shenyu --create-namespace
```

### MySQL as database

Modify and copy the following command and execute:

```shell
helm install shenyu shenyu/shenyu -n=shenyu --create-namespace \
      --set dataSource.active=mysql \
      --set dataSource.mysql.ip=127.0.0.1 \
      --set dataSource.mysql.port=3306 \
      --set dataSource.mysql.username=root \
      --set dataSource.mysql.password=123456 
```

### PostgreSQL as database(Version of ShenYu > 2.5.0)

Modify the following command and copy it to execute:

```shell
helm install shenyu shenyu/shenyu -n=shenyu --create-namespace \
      --set dataSource.active=pg \
      --set dataSource.pg.ip=127.0.0.1 \
      --set dataSource.pg.port=5432 \
      --set dataSource.pg.username=postgres \
      --set dataSource.pg.password=123456
```

### Oracle as database

Modify the following command and copy it to execute:

```shell
helm install shenyu shenyu/shenyu -n=shenyu --create-namespace \
      --set dataSource.active=oracle \
      --set dataSource.oracle.ip=127.0.0.1 \
      --set dataSource.oracle.port=1521 \
      --set dataSource.oracle.serviceName=shenyu \
      --set dataSource.oracle.username=root \
      --set dataSource.oracle.password=123456
```

## Q&A

### 1. you need to modify a lot of configuration information, such as modify the application.yml, how to install

1. download the complete values.yaml
* Latest chart version: `helm show values shenyu/shenyu > values.yaml`
* Specific chart version, e.g. `0.2.0`: `helm show values shenyu/shenyu --version=0.2.0 > values.yaml`
2. modify the values.yaml file
3. Change the corresponding configuration and execute the `helm install` command with the format `-f values.yaml`.
   For example: `helm install shenyu shenyu/shenyu -n=shenyu --create-namespace -f values.yaml`

> P.S.
> [bootstrap configuration description](https://shenyu.apache.org/zh/docs/user-guide/property-config/gateway-property-config)
> [admin configuration description](https://shenyu.apache.org/zh/docs/user-guide/property-config/admin-property-config)

### 2. How to install only admin or bootstrap

* Install only admin: add `-set bootstrap.enabled=false` to the end of the helm install command
* Install only bootstrap: add `--set admin.enabled=false` to the end of the helm install command

### 3. How to install old version ShenYu

```shell
helm search repo shenyu -l
```

You will get output similar to

```shell
NAME CHART VERSION APP VERSION DESCRIPTION
shenyu/shenyu 0.2.0 2.5.0 Helm Chart for deploying Apache ShenYu in Kubernetes
...
...
```

where `APP_VERSION` is the version of ShenYu and `CHART_VERSION` is the version of Helm Chart.

Select the corresponding Chart version according to the version of ShenYu you want to install, and add the `-version=CHART_VERSION` parameter at the end of the command. For example

```shell
helm install shenyu shenyu/shenyu -n=shenyu --version=0.2.0 --create-namespace
```

### How to configure JVM options and modify Kubernetes resource quotas(Version of ShenYu > 2.5.0)

* Configure JVM parameters via `admin.jvmOpts` and `bootstrap.jvmOpts`
* Configure Kubernetes resource quotas via `admin.resources` and `bootstrap.resources`.

e.g.

```shell
helm install shenyu shenyu/shenyu -n=shenyu --create-namespace \
      --set admin.javaOpts="-Xms256m -Xmx512m" \
      --set admin.resources.requests.memory=512Mi \
      --set admin.resources.limits.memory=1Gi \
      --set admin.resources.requests.cpu=500m \
      --set admin.resources.limits.cpu=1 \
```

## Values configuration instructions

### Global Configuration

| configuration item | type   | default   | description                                                                                        |
|--------------------|--------|-----------|----------------------------------------------------------------------------------------------------|
| replicas           | int    | `1`       | Number of replicas                                                                                 |
| version            | string | `"2.5.0"` | shenyu version, it is not recommended to modify, please install the corresponding version directly |

### shenyu-admin configuration

| configuration item | type   | default                                                                                                     | description        |
|--------------------|--------|-------------------------------------------------------------------------------------------------------------|--------------------|
| admin.nodePort     | int    | `31095`                                                                                                     | NodePort port      |
| admin.javaOpts     | string | [see here](https://github.com/apache/shenyu/blob/master/shenyu-dist/shenyu-admin-dist/docker/entrypoint.sh) | JVM parameters     |
| admin.resources    | dict   | omit                                                                                                        | K8s resource quota |

### shenyu-bootstrap configuration

| configuration item  | type   | default                                                                                                         | description        |
|---------------------|--------|-----------------------------------------------------------------------------------------------------------------|--------------------|
| bootstrap.nodePort  | int    | `31195`                                                                                                         | NodePort Port      |
| bootstrap.javaOpts  | string | [see here](https://github.com/apache/shenyu/blob/master/shenyu-dist/shenyu-bootstrap-dist/docker/entrypoint.sh) | JVM parameters     |
| bootstrap.resources | dict   | `{}`                                                                                                            | K8s resource quota |

### Database configuration

#### General database configuration

| configuration item     | type   | default | description                                     |
|------------------------|--------|---------|-------------------------------------------------|
| dataSource.active      | string | `"h2"`  | Database to use, supports `h2`, `mysql`, `pg`   |
| dataSource.initEnabled | bool   | `true`  | Initialize the database, only `h2` is available |

#### h2

| configuration item     | type   | default | description |
|------------------------|--------|---------|-------------|
| dataSource.h2.username | string | `"sa"`  | username    |
| dataSource.h2.password | string | `"sa"`  | password    |

#### MySQL

| configuration item                | Type   | Default                      | Description                                                                                           |
|-----------------------------------|--------|------------------------------|-------------------------------------------------------------------------------------------------------|
| dataSource.mysql.ip               | string | `""`                         | IP                                                                                                    |
| dataSource.mysql.port             | int    | `3306`                       | port                                                                                                  |
| dataSource.mysql.username         | string | `"root"`                     | Username                                                                                              |
| dataSource.mysql.password         | string | `""`                         | Password                                                                                              |
| dataSource.mysql.driverClass      | string | `"com.mysql.cj.jdbc.Driver"` | mysql driver class name                                                                               |
| dataSource.mysql.connectorVersion | string | `"8.0.23"`                   | connector version([maven connector list](https://repo1.maven.org/maven2/mysql/mysql-connector-java/)) |

### PostgreSQL

| configuration item             | type   | default                   | description                                                                                           |
|--------------------------------|--------|---------------------------|-------------------------------------------------------------------------------------------------------|
| dataSource.pg.ip               | string | `""`                      | IP                                                                                                    |
| dataSource.pg.port             | int    | `5432`                    | port                                                                                                  |
| dataSource.pg.username         | string | `"postgres"`              | username                                                                                              |
| dataSource.pg.password         | string | `"postgres"`              | password                                                                                              |
| dataSource.pg.driverClass      | string | `"org.postgresql.Driver"` | PostgreSQL driver class name                                                                          |
| dataSource.pg.connectorVersion | string | `"42.2.18"`               | connector version ([maven connector list](https://repo1.maven.org/maven2/org/postgresql/postgresql/)) |

### Oracle

| configuration item                 | type   | default                      | description                                                                                        |
|------------------------------------|--------|------------------------------|----------------------------------------------------------------------------------------------------|
| dataSource.oracle.ip               | string | `""`                         | IP                                                                                                 |
| dataSource.oracle.port             | int    | `1521`                       | port                                                                                               |
| dataSource.oracle.username         | string | `"root"`                     | username                                                                                           |
| dataSource.oracle.password         | string | `""`                         | password                                                                                           |
| dataSource.oracle.serviceName      | string | `"shenyu"`                   | Oracle service name                                                                                |
| dataSource.oracle.driverClass      | string | `"oracle.jdbc.OracleDriver"` | Oracle driver class name                                                                           |
| dataSource.oracle.connectorVersion | string | `"19.3.0.0"`                 | connector version([maven connector list](https://repo1.maven.org/maven2/com/oracle/ojdbc/ojdbc8/)) |

### application.yml configuration

| configuration-item          | type   | default  | description                                                                                                                                          |
|-----------------------------|--------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| applicationConfig.bootstrap | string | slightly | bootstrap configuration, [bootstrap configuration description](https://shenyu.apache.org/zh/docs/user-guide/property-config/gateway-property-config) |
| applicationConfig.admin     | string | omit     | admin configuration, [admin configuration description](https://shenyu.apache.org/zh/docs/user-guide/property-config/admin-property-config)           |

## GitHub Repository

Welcome to contribute to [shenyu-helm-chart](https://github.com/apache/shenyu-helm-chart).

---
title: Helm部署
keywords: ["Helm"]
description: Helm部署
---

本文介绍使用 `helm` 来部署 `Apache ShenYu` 网关。

## 先决条件

### 工具

* [Kubernetes &＆ Kubectl](https://kubernetes.io/zh-cn/docs/setup/)
* [Helm](https://helm.sh/zh/docs/intro/install/)

### 数据库

> 在阅读本文档前，你需要先阅读[部署先决条件](https://shenyu.apache.org/zh/docs/deployment/deployment-before)文档来完成部署 `shenyu` 前的环境准备工作。

## 添加 Helm 仓库

```shell
helm repo add shenyu https://apache.github.io/shenyu-helm-chart
helm repo update
```

## 安装

### 说明

* **安装应用**：默认同时安装 admin 与 bootstrap。
* **服务暴露**：使用 NodePort 暴露服务，admin 默认端口为 `31095`, bootstrap 为 `31195`。
* **数据库**：目前支持 h2, MySQL, PostgreSQL, Oracle 作为数据库。默认使用 h2。

### h2 作为数据库

运行以下命令，会在 shenyu namespace 下安装 admin 与 bootstrap ，并创建命名空间。

```shell
helm install shenyu shenyu/shenyu -n=shenyu --create-namespace
```

### MySQL 作为数据库

修改以下命令并复制，执行：

```shell
helm install shenyu shenyu/shenyu -n=shenyu --create-namespace \
      --set dataSource.active=mysql \
      --set dataSource.mysql.ip=127.0.0.1 \
      --set dataSource.mysql.port=3306 \
      --set dataSource.mysql.username=root \
      --set dataSource.mysql.password=123456 
```

### PostgreSQL 作为数据库(ShenYu 版本 > 2.5.0)

修改以下命令并复制，执行：

```shell
helm install shenyu shenyu/shenyu -n=shenyu --create-namespace \
      --set dataSource.active=pg \
      --set dataSource.pg.ip=127.0.0.1 \
      --set dataSource.pg.port=5432 \
      --set dataSource.pg.username=postgres \
      --set dataSource.pg.password=123456
```

### Oracle 作为数据库

修改以下命令并复制，执行：

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

### 1. 需要大量修改配置信息，如修改 application.yml ，如何安装

1. 下载完整 values.yaml
* 最新 chart 版本：`helm show values shenyu/shenyu > values.yaml`
* 特定 chart 版本, 如 `0.2.0`: `helm show values shenyu/shenyu --version=0.2.0 > values.yaml`
2. 修改 values.yaml 文件
3. 更改相应配置，使用 `-f values.yaml` 的格式执行 `helm install` 命令。
   如：`helm install shenyu shenyu/shenyu -n=shenyu --create-namespace -f values.yaml`

> 附：
> [bootstrap 配置说明](https://shenyu.apache.org/zh/docs/user-guide/property-config/gateway-property-config)
> [admin 配置说明](https://shenyu.apache.org/zh/docs/user-guide/property-config/admin-property-config)

### 2. 如何只安装 admin 或 bootstrap

* 只安装 admin:     在 helm 安装命令末尾加上 `--set bootstrap.enabled=false`
* 只安装 bootstrap: 在 helm 安装命令末尾加上 `--set admin.enabled=false`

### 3. 如何安装旧版本 ShenYu

```shell
helm search repo shenyu -l
```

你会得到类似的输出：

```shell
NAME            CHART VERSION	APP VERSION	  DESCRIPTION
shenyu/shenyu   0.2.0           2.5.0         Helm Chart for deploying Apache ShenYu in Kubernetes
...
...
```

其中 `APP_VERSION` 是 ShenYu 的版本，`CHART_VERSION` 是 Helm Chart 的版本。

根据要安装的 ShenYu 版本来选择对应的 Chart 版本，在命令末尾加上 `--version=CHART_VERSION` 参数即可。例如：

```shell
helm install shenyu shenyu/shenyu -n=shenyu --version=0.2.0 --create-namespace
```

### 如何配置 JVM 参数以及修改 Kubernetes 资源配额(ShenYu 版本 > 2.5.0)

* 通过 `admin.javaOpts` 和 `bootstrap.javaOpts` 来配置 JVM 参数
* 通过 `admin.resources` 和 `bootstrap.resources` 来配置 Kubernetes 资源配额。

例：

```shell
helm install shenyu shenyu/shenyu -n=shenyu --create-namespace \
      --set admin.javaOpts="-Xms256m -Xmx512m" \
      --set admin.resources.requests.memory=512Mi \
      --set admin.resources.limits.memory=1Gi \
      --set admin.resources.requests.cpu=500m \
      --set admin.resources.limits.cpu=1 \
```

## Values 配置说明

### 全局配置

| 配置项   | 类型    | 默认值     | 描述                                   |
|---------|--------|-----------|---------------------------------------|
| version | string | `"2.5.1"` | shenyu 版本，不建议修改，请直接安装对应版本 |

### shenyu-admin 配置

| 配置项           | 类型    | 默认值                                                                                                      | 描述                                 |
|-----------------|--------|------------------------------------------------------------------------------------------------------------|-------------------------------------|
| admin.enabled   | bool   | `true`                                                                                                     | 是否安装 admin                       |
| admin.replicas  | int    | `1`                                                                                                        | 副本数量                             |
| admin.image     | string | `"apache/shenyu-admin"`                                                                                    | 镜像名称（可以修改此字段以支持定制化镜像） |
| admin.nodePort  | int    | `31095`                                                                                                    | NodePort 端口                        |
| admin.javaOpts  | string | [详见这里](https://github.com/apache/shenyu/blob/master/shenyu-dist/shenyu-admin-dist/docker/entrypoint.sh) | JVM 参数                             |
| admin.resources | dict   | `{}`                                                                                                       | K8s 资源配额                         |

### shenyu-bootstrap 配置

| 配置项               | 类型    | 默认值                                                                                                          | 描述                                 |
|---------------------|--------|----------------------------------------------------------------------------------------------------------------|-------------------------------------|
| bootstrap.enabled   | bool   | `true`                                                                                                         | 是否安装 bootstrap                   |
| bootstrap.replicas  | int    | `2`                                                                                                            | 副本数量                             |
| bootstrap.image     | string | `"apache/shenyu-bootstrap"`                                                                                    | 镜像名称（可以修改此字段以支持定制化镜像） |
| bootstrap.nodePort  | int    | `31195`                                                                                                        | NodePort 端口                        |
| bootstrap.javaOpts  | string | [详见这里](https://github.com/apache/shenyu/blob/master/shenyu-dist/shenyu-bootstrap-dist/docker/entrypoint.sh) | JVM 参数                             |
| bootstrap.resources | dict   | `{}`                                                                                                           | K8s 资源配额                         |

### 数据库配置

#### 数据库总配置

| 配置项                  | 类型    | 默认值  | 描述                                 |
|------------------------|--------|--------|-------------------------------------|
| dataSource.active      | string | `"h2"` | 使用的数据库，支持 `h2`, `mysql`, `pg` |
| dataSource.initEnabled | bool   | `true` | 初始化数据库，仅 `h2` 有效             |

#### h2

| 配置项                  | 类型    | 默认值  | 描述                                                                             |
|------------------------|--------|--------|---------------------------------------------------------------------------------|
| dataSource.h2.username | string | `"sa"` | 用户名                                                                           |
| dataSource.h2.password | string | `"sa"` | 密码                                                                             |
| dataSource.h2.url      | string | ``     | 自定义 url, 默认的 h2 url 是 "jdbc:h2:mem:~/shenyu;DB_CLOSE_DELAY=-1;MODE=MySQL;" |

#### MySQL

| 配置项                             | 类型    | 默认值                        | 描述                                                                                               |
|-----------------------------------|--------|------------------------------|---------------------------------------------------------------------------------------------------|
| dataSource.mysql.urlOverride      | string | `""`                         | 自定义完整url，并忽略IP等字段的配置，格式：jdbc:mysql://xxxxxxx                                         |
| dataSource.mysql.ip               | string | `""`                         | IP                                                                                                |
| dataSource.mysql.port             | int    | `3306`                       | 端口                                                                                               |
| dataSource.mysql.username         | string | `"root"`                     | 用户名                                                                                             |
| dataSource.mysql.password         | string | `""`                         | 密码                                                                                               |
| dataSource.mysql.driverClass      | string | `"com.mysql.cj.jdbc.Driver"` | mysql driver class 名字                                                                            |
| dataSource.mysql.connectorVersion | string | `"8.0.23"`                   | connector 版本([maven connector 列表](https://repo1.maven.org/maven2/mysql/mysql-connector-java/)) |

### PostgreSQL

| 配置项                          | 类型    | 默认值                     | 描述                                                                                              |
|--------------------------------|--------|---------------------------|--------------------------------------------------------------------------------------------------|
| dataSource.pg.urlOverride      | string | `""`                      | 自定义完整url，并忽略IP等字段的配置，格式：jdbc:postgresql://xxxxxxx                                   |
| dataSource.pg.ip               | string | `""`                      | IP                                                                                               |
| dataSource.pg.port             | int    | `5432`                    | 端口                                                                                              |
| dataSource.pg.username         | string | `"postgres"`              | 用户名                                                                                            |
| dataSource.pg.password         | string | `""`                      | 密码                                                                                              |
| dataSource.pg.driverClass      | string | `"org.postgresql.Driver"` | PostgreSQL driver class 名字                                                                      |
| dataSource.pg.connectorVersion | string | `"42.2.18"`               | connector 版本([maven connector 列表](https://repo1.maven.org/maven2/org/postgresql/postgresql/)) |

### Oracle

| 配置项                              | 类型    | 默认值                        | 描述                                                                                            |
|------------------------------------|--------|------------------------------|------------------------------------------------------------------------------------------------|
| dataSource.oracle.urlOverride      | string | `""`                         | 自定义完整url，并忽略IP等字段的配置，格式：jdbc:oracle:xxx                                           |
| dataSource.oracle.ip               | string | `""`                         | IP                                                                                             |
| dataSource.oracle.port             | int    | `1521`                       | 端口                                                                                            |
| dataSource.oracle.username         | string | `"root"`                     | 用户名                                                                                          |
| dataSource.oracle.password         | string | `""`                         | 密码                                                                                            |
| dataSource.oracle.serviceName      | string | `"shenyu"`                   | 服务名                                                                                          |
| dataSource.oracle.driverClass      | string | `"oracle.jdbc.OracleDriver"` | Oracle driver class 名字                                                                        |
| dataSource.oracle.connectorVersion | string | `"19.3.0.0"`                 | connector 版本([maven connector 列表](https://repo1.maven.org/maven2/com/oracle/ojdbc/ojdbc8/)) |

### application.yml 配置

| 配置项                       | 类型    | 默认值 | 描述                                                                                                                      |
|-----------------------------|--------|-------|--------------------------------------------------------------------------------------------------------------------------|
| applicationConfig.bootstrap | string | 略    | bootstrap 配置，[bootstrap 配置说明](https://shenyu.apache.org/zh/docs/user-guide/property-config/gateway-property-config) |
| applicationConfig.admin     | string | 略    | admin 配置，[admin 配置说明](https://shenyu.apache.org/zh/docs/user-guide/property-config/admin-property-config)           |

## GitHub 仓库

欢迎贡献！代码仓库地址：[shenyu-helm-chart](https://github.com/apache/shenyu-helm-chart) 。

---
sidebar_position: 7
title: 集群部署
keywords: ["网关集群", "集群部署"]
description: 集群部署
---

文本是介绍在集群环境中快速部署`ShenYu`网关。

> 在阅读本文档时，你可以先阅读[二进制包部署](./deployment-package.md)。

### 环境准备

* 至少准备两台已经安装了JDK1.8+的服务器用于部署网关启动器。
* 准备一台已经安装了mysql、pgsql、h2和JDK1.8+的服务器用于部署网关管理端。
* 准备一台服务器用于部署Nginx。

### 启动 Apache ShenYu Admin

* 在你的网关管理端服务器下载并解压 [apache-shenyu-incubating-2.4.0-admin-bin.tar.gz](https://archive.apache.org/dist/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-admin-bin.tar.gz) 。

* 配置你的数据库，进入`/conf`目录，在`application.yaml`文件中修改`spring.profiles.active`节点为`mysql`, `pg` or `h2`。

* 配置你的数据同步方式，进入`/conf`目录，在`application.yaml`文件中修改`shenyu.sync`节点为`websocket`, `http`, `zookeeper`, `etcd`, `consul` 或者 `nacos`。

* 进入`bin`目录，启动ShenYu Bootstrap。

```
> windows: start.bat 

> linux: ./start.sh 
```

### 启动 Apache ShenYu Boostrap

* 在你的网关启动器服务器下载并解压 [apache-shenyu-incubating-2.4.0-bootstrap-bin.tar.gz](https://archive.apache.org/dist/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-bootstrap-bin.tar.gz) 。

* 配置你的数据同步方式，进入`/conf`目录，在`application.yaml`文件中修改`shenyu.sync`节点为`websocket`, `http`, `zookeeper`, `etcd`, `consul` 或者 `nacos`，这个配置必须与`ShenyYu Admin`的配置保持相同。

* 进入`bin`目录，启动ShenYu Admin。

```
> windwos : start.bat 

> linux : ./start.sh 
```

> 在完成这些操作后，你将成功部署`ShenYu Boostrap`集群。
>
> 假如你`10.1.1.1`和`10.1.1.2`两台服务器在将部署`ShenYu Bootstrap`，并且在`10.1.1.3`部署nginx。

### 启动 Nginx

* 下载并安装nginx。

* 在`nginx.conf`文件中修改`upstream`和`server`节点的配置。

```conf
upstream shenyu_gateway_cluster {
  ip_hash;
  server 10.1.1.1:9195 max_fails=3 fail_timeout=10s weight=50;
  server 10.1.1.2:9195 max_fails=3 fail_timeout=10s weight=50;
}
```

```conf
server {
  location / {
		proxy_pass http://shenyu_gateway_cluster;
		proxy_set_header HOST $host;
		proxy_read_timeout 10s;
		proxy_connect_timeout 10s;
  }
}
```

* 启动 nginx.

```
> windows: ./nginx.exe

> linux: /usr/local/nginx/sbin/nginx 
```

* 验证nginx配置是否生效，在`ShenYu Bootstrap`或者`Nginx`的日志文件中查看请求被分发到那台服务器上。

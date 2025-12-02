---
sidebar_position: 7
title: Cluster Deployment
keywords: ["Gateway Cluster Enviroment", "Cluster Enviroment"]
description: Cluster Delopyment
---

This aritcle introduces how to delopy the `Shenyu` gateway in cluster enviroment.

> In this part, you can see  [ShenYu Binary Packages Deployment](./deployment-package.md) before deploying.

### Enviromental Preparation

* Two or more Gateway Boostrap servers, these servers must install JDK1.8+.
* A server for Gateway Admin, this server must install mysql/pgsql/h2 and JDK1.8+.
* A server for nginx.

### Start Apache ShenYu Admin

* download and unzip [apache-shenyu-incubating-2.4.0-admin-bin.tar.gz](https://archive.apache.org/dist/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-admin-bin.tar.gz) in your Gateway Admin server.

* config your database, go to the `/conf` directory, and  modify `spring.profiles.active` of the configuration in `application.yaml` to `mysql`, `pg` or `h2`.

* config your way of synchronization, go to the `/conf` directory, and modify `shenyu.sync` of configuration in `application.yaml` to `websocket`, `http`, `zookeeper`, `etcd`, `consul` or `nacos`.

* start Apache ShenYu Admin in `bin` directory.

```
> windows: start.bat 

> linux: ./start.sh 
```

### Start Apache ShenYu Boostrap

* download and unzip [apache-shenyu-incubating-$\{current.version}-bootstrap-bin.tar.gz](https://archive.apache.org/dist/incubator/shenyu/2.4.0/apache-shenyu-incubating-2.4.0-bootstrap-bin.tar.gz) in your Gateway Boostrap server.

* config your synchronization, go to the `/conf` directory, and modify `shenyu.sync` of configuration in `application.yaml` to `websocket`, `http`, `zookeeper`, `etcd`, `consul` or `nacos`, this configuaration must remain the same of `ShenyYu Admin`.

* repeat above-mentioned operations in each `ShenYu Bootstrap` server.

* start Apache ShenYu Bootstrap in `bin` directory.

```
> windwos : start.bat 

> linux : ./start.sh 
```

> After completing these operations, you will deploy `ShenYu Boostrap` Cluster.
>
> For example. you will deploy `ShenYu Bootstrap` in `10.1.1.1` and `10.1.1.2` and deploy nginx in `10.1.1.3`.

### Start Nginx

* download and install `nginx`.

* modify `upstream` and `server` of configuration in `nginx.conf`.

```nginx
upstream shenyu_gateway_cluster {
  ip_hash;
  server 10.1.1.1:9195 max_fails=3 fail_timeout=10s weight=50;
  server 10.1.1.2:9195 max_fails=3 fail_timeout=10s weight=50;
}
```

```nginx
server {
  location / {
		proxy_pass http://shenyu_gateway_cluster;
		proxy_set_header HOST $host;
		proxy_read_timeout 10s;
		proxy_connect_timeout 10s;
  }
}
```

* start nginx.

```
> windows: ./nginx.exe

> linux: /usr/local/nginx/sbin/nginx 
```

* verify nginx, looking at your `ShenYu Bootstrap` log or `Nginx` log, Where will the verification request go.

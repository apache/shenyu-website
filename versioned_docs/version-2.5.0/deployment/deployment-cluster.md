---
sidebar_position: 7
title: Cluster Deployment
keywords: ["Gateway Cluster Enviroment", "Cluster Enviroment"]
description: Cluster Delopyment
---

> Before you read this document, you need to complete some preparations before deploying Shenyu according to the [Deployment Prerequisites document](./deployment-before.md).

This aritcle introduces how to delopy the `Shenyu` gateway in cluster enviroment.

> In this part, you can see  [ShenYu Binary Packages Deployment](./deployment-package.md) before deploying.

### Enviromental Preparation

* Two or more Gateway Boostrap servers, these servers must install JDK1.8+.
* A server for Gateway Admin, this server must install mysql/pgsql/h2 and JDK1.8+.
* A server for nginx.

### Start Apache ShenYu Admin

* download and unzip [apache-shenyu-${current.version}-admin-bin.tar.gz](https://archive.apache.org/dist/incubator/shenyu/2.5.0/apache-shenyu-2.5.0-admin-bin.tar.gz) in your Gateway Admin server.

* config your database, go to the `/conf` directory, and  modify `spring.profiles.active` of the configuration in `application.yaml` to `mysql`, `pg` or `h2`.

* config your way of synchronization, go to the `/conf` directory, and modify `shenyu.sync` of configuration in `application.yaml` to `websocket`, `http`, `zookeeper`, `etcd`, `consul` or `nacos`.

* start Apache ShenYu Admin in `bin` directory.

```
> windows: start.bat 

> linux: ./start.sh 
```

### Start Apache ShenYu Boostrap

* download and unzip [apache-shenyu-${current.version}-bootstrap-bin.tar.gz](https://archive.apache.org/dist/shenyu/2.5.0/apache-shenyu-2.5.0-bootstrap-bin.tar.gz) in your Gateway Boostrap server.

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

```conf
upstream shenyu_gateway_cluster {
  ip_hash;
  server 10.1.1.1:9195 max_fails=3 fail_timeout=10s weight=50;
  server 10.1.1.2:9195 max_fails=3 fail_timeout=10s weight=50;
}

server {
  listen 9195;
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

Apache ShenYu Nginx Module
---

This module provided SDK to watch available ShenYu instance list as upstream nodes by Service Register Center for OpenResty.
1. [ETCD](#greeting-etcd) (Supported)
2. [Nacos](#greeting-nacos) (Supported)
3. [Zookeeper](#greeting-zookeeper) (Supported)
4. Consul (TODO)

In the cluster mode, Apache ShenYu supports the deployment of multiple ShenYu instances, which may have new instances joining or leaving at any time.
Hence, Apache ShenYu introduces Service Discovery modules to help client to detect the available instances.
Currently, Apache ShenYu Bootstrap already supports Apache Zookeeper, Nacos, Etcd, and consul. Client or LoadBalancer can get the available ShenYu instances by those Service register center.

## Getting Started

- Prerequisite:
1. Luarocks
2. OpenResty

### Build from source

The first, clone the source from GitHub.
```
git clone https://github.com/apache/shenyu-nginx
```

Then, build from source and install.
```
cd shenyu-nginx
luarocks make rockspec/shenyu-nginx-main-0.rockspec
```

### Greeting ETCD

Modify the Nginx configure, create and initialize the ShenYu Register to connect to the target register center.
The module will fetch the all of ShenYu instances which are registered to Etcd in the same cluster.
It works like Etcd client to watch(based on long polling) ShenYu instance lists.

Here is an example for Etcd.
```
init_worker_by_lua_block {
    local register = require("shenyu.register.etcd")
    register.init({
        balancer_type = "chash",
        etcd_base_url = "http://127.0.0.1:2379",
    })
}
```

1. `balancer_type` specify the balancer. It has supported `chash` and `round robin`.
2. `etcd_base_url` specify the Etcd server.(Currently, authentication is not supported.)

Add an `upstream block` for ShenYu and enable to update upstream servers dynamically. This case will synchronize the ShenYu instance list with register center.
And then pick one up for handling the request.
```
upstream shenyu {
    server 0.0.0.1; -- bad 
    
    balancer_by_lua_block {
        require("shenyu.register.etcd").pick_and_set_peer()
    }
}
```

Finally, restart OpenResty.
```
openresty -s reload
```

Here is a completed [example](https://github.com/apache/shenyu-nginx/blob/main/example/etcd/nginx.conf) working with ETCD.

### Greeting Nacos

Modify the Nginx configure, create and initialize the ShenYu Register to connect to target register center.  Here is an example for Nacos.
```
init_worker_by_lua_block {
    local register = require("shenyu.register.nacos")
    register.init({
        shenyu_storage = ngx.shared.shenyu_storage,
        balancer_type = "chash",
        nacos_base_url = "http://127.0.0.1:8848",
        username = "nacos",
        password = "naocs",
    })
}
```

1. `balancer_type` specify the balancer. It has supported `chash` and `round robin`.
2. `nacos_base_url` specify the Nacos server address.
3. `username` specify the username to log in Nacos. (it is only required when Nacos auth enable)
4. `password` specify the password to log in Nacos.

Modify the `upstream` to enable to update upstream servers dynamically. This case will synchronize the ShenYu instance list with register center.
And then pick one up for handling the request.
```
upstream shenyu {
    server 0.0.0.1; -- bad 
    
    balancer_by_lua_block {
        require("shenyu.register.nacos").pick_and_set_peer()
    }
}
```

Finally, restart OpenResty.
```
openresty -s reload
```

Here is a completed [example](https://github.com/apache/shenyu-nginx/blob/main/example/nacos/nginx.conf) working with Nacos.

## Greeting Zookeeper
Modify the Nginx configure, create and initialize the ShenYu register to connect to target register center.
Listen for changes to the node via the zookeeper watch event. Here is an example of the zookeeper configuration.
```
init_worker_by_lua_block {
        local register = require("shenyu.register.zookeeper")
        register.init({
           servers = {"127.0.0.1:2181","127.0.0.1:2182"},
           shenyu_storage = ngx.shared.shenyu_storage,
           balancer_type = "roundrobin"
        });
    }
```
1. `servers` zookeeper cluster address.
2. ``balancer_type`` specify the balancer. It has supported `chash` and `round robin`.

Modify the upstream to enable to update upstream servers dynamically. This case will synchronize the ShenYu instance list with register center. And then pick one up for handling the request.
```
 upstream shenyu {
        server 0.0.0.1;
        balancer_by_lua_block {
            require("shenyu.register.zookeeper").pick_and_set_peer()
        }
    }
```
Finally, restart OpenResty.
```
openresty -s reload
```
Here is a completed [example](https://github.com/apache/shenyu-nginx/blob/main/example/zookeeper/nginx.conf) working with Zookeeper.

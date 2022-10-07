---
sidebar_position: 7
title: 集群部署
keywords: ["网关集群", "集群部署"]
description: 集群部署
---

> 在阅读本文档前，你需要先阅读[部署先决条件](./deployment-before.md)文档来完成部署`shenyu`前的环境准备工作.

本文是介绍在集群环境中快速部署`ShenYu`网关。

> 在阅读本文档时，你可以先阅读[二进制包部署](./deployment-package.md)。

### 环境准备

* 至少准备两台已经安装了JDK1.8+的服务器用于部署网关启动器。
* 准备一台已经安装了mysql、pgsql、h2和JDK1.8+的服务器用于部署网关管理端。
* 准备一台服务器用于部署Nginx。

### 启动 Apache ShenYu Admin

* 在你的网关管理端服务器下载并解压[apache-shenyu-${current.version}-admin-bin.tar.gz](https://archive.apache.org/dist/incubator/shenyu/2.5.0/apache-shenyu-2.5.0-admin-bin.tar.gz) 。

* 配置你的数据库，进入`/conf`目录，在`application.yaml`文件中修改`spring.profiles.active`节点为`mysql`, `pg` or `h2`。

* 配置你的数据同步方式，进入`/conf`目录，在`application.yaml`文件中修改`shenyu.sync`节点为`websocket`, `http`, `zookeeper`, `etcd`, `consul` 或者 `nacos`。

* 进入`bin`目录，启动ShenYu Bootstrap。

```
> windows: start.bat 

> linux: ./start.sh 
```

### 启动 Apache ShenYu Boostrap

* 在你的网关启动器服务器下载并解压[apache-shenyu-${current.version}-bootstrap-bin.tar.gz](https://archive.apache.org/dist/incubator/shenyu/2.5.0/apache-shenyu-2.5.0-bootstrap-bin.tar.gz) 。

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

```nginx
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

* 启动 nginx.

```
> windows: ./nginx.exe

> linux: /usr/local/nginx/sbin/nginx 
```

* 验证nginx配置是否生效，在`ShenYu Bootstrap`或者`Nginx`的日志文件中查看请求被分发到那台服务器上。

### Apache Shenyu-nginx模块实现集群

> 该模块提供SDK，用于通过注册中心为OpenResty自动监听Apache Shenyu可用的实例节点。
>在集群模式下，Apache Shenyu支持部署多个Shenyu实例，随时可能有新的实例上线或下线。因此，Apache Shenyu引入了服务发现
> OpenResty 模块来帮助客户端检测可用Shenyu实例。目前Apache Shenyu已经支持Zookeeper、Nacos、Etcd和Consul。Client或LoadBalancer
> 可以通过这些Service注册中心获取可用的Shenyu实例。
1. [Etcd](#Etcd开始)(支持)
2. [Nacos](#Nacos开始)(支持)
3. [Zookeeper](#Zookeeper开始)(支持)
4. Consul(进行中)

#### 入门

* 先决条件
1. Luarocks
2. OpenResty

#### 从源码构建

首先，从GitHub clone源码。

```
git clone https://github.com/apache/shenyu-nginx
```

然后，从源代码构建并安装。

```
cd shenyu-nginx
luarocks make rockspec/shenyu-nginx-main-0.rockspec
```

#### Etcd开始

修改Nginx配置，创建并初始化Shenyu register模块,连接至目标注册中心。该模块将获取在同一个集群中注册到Etcd的
所有Shenyu实例。它与Etcd客户端一样监视(基于长轮询)Shenyu实例列表。
*Etcd示例：*

```
init_worker_by_lua_block {
    local register = require("shenyu.register.etcd")
    register.init({
        balancer_type = "chash",
        etcd_base_url = "http://127.0.0.1:2379",
    })
}
```

1. `balancer_type`指定负载均衡模式。它支持`chash`和`round` `robin`。
2. `etcd_base_url`指定 `Etcd` 服务器。（目前不支持身份验证）。

最后，重启OpenResty。

```
openresty -s reload
```

这就是一个完整的Etcd的使用[示例](https://github.com/apache/shenyu-nginx/blob/main/example/etcd/nginx.conf) 。

#### Nacos开始

修改Nginx配置，创建并初始化Shenyu register模块，连接至目标注册中心。以下是Nacos的示例：

**Nacos示例:**

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

1. `balancer_type`指定负载均衡模式。它支持`chash`和`round` `robin`。
2. `nacos_base_url`指定 `Nacos` 服务器地址。
3. `username`指定登录 `Nacos` 的用户名。（仅在启用 Nacos auth 时才需要）
4. `password`指定登录 `Nacos` 的密码。

修改`upstream`启用动态更新shenyu实例列表。本案例将Shenyu实例列表与注册中心同步。

```
upstream shenyu {
    server 0.0.0.1; -- bad 
    
    balancer_by_lua_block {
        require("shenyu.register.nacos").pick_and_set_peer()
    }
}
```

最后，重启OpenResty。

```
openresty -s reload
```

这就是一个完整的Nacos的使用[example](https://github.com/apache/shenyu-nginx/blob/main/example/nacos/nginx.conf) 。

#### Zookeeper开始

修改Nginx配置，创建并初始化Shenyu register模块，连接目标注册中心。
通过 zookeeper watch 事件监听Shenyu实例列表的变化。下面是 zookeeper 配置的示例。

**Zookeeper示例:**

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

1. `servers` zookeeper 集群地址。
2. `balancer_type`指定负载均衡模式。它支持chash和round robin。

修改`upstream`启用动态更新Shenyu实例列表。本案例将Shenyu实例列表与注册中心同步。

```
upstream shenyu {
        server 0.0.0.1;
        balancer_by_lua_block {
            require("shenyu.register.zookeeper").pick_and_set_peer()
        }
    }
```

最后，重启 OpenResty。

```
openresty -s reload
```

这是一个使用 Zookeeper的完整[示例](https://github.com/apache/incubator-shenyu-nginx/blob/main/example/zookeeper/nginx.conf) 。

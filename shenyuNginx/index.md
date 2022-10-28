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
```shell
git clone https://github.com/apache/shenyu-nginx
```

Then, build from source and install.
```shell
cd shenyu-nginx
luarocks make rockspec/shenyu-nginx-1.0.0-1.rockspec
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
```shell
openresty -s reload
```

Here provides a completed [examples](https://github.com/apache/shenyu-nginx/tree/main/example).
=======
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
```shell
openresty -s reload
```

Here is a completed [example](https://github.com/apache/shenyu-nginx/blob/main/example/nacos/nginx.conf) working with Nacos.

## Greeting Zookeeper
Modify the Nginx configure, create and initialize the ShenYu register to connect to target register center.
Listen for changes to the node via the zookeeper watch event. Here is an example of the zookeeper configuration.
```shell
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
```shell
 upstream shenyu {
        server 0.0.0.1;
        balancer_by_lua_block {
            require("shenyu.register.zookeeper").pick_and_set_peer()
        }
    }
```
Finally, restart OpenResty.
```shell
openresty -s reload
```
Here is a completed [example](https://github.com/apache/shenyu-nginx/blob/main/example/zookeeper/nginx.conf) working with Zookeeper.

## Contributor and Support

* [How to Contributor](https://shenyu.apache.org/community/contributor-guide)
* [Mailing Lists](mailto:dev@shenyu.apache.org)

## License

[Apache License 2.0](https://apache.org/licenses/LICENSE-2.0)

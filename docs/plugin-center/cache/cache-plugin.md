---
title: Cache Plugin keywords: ["Cache"]
description: Cache Plugin
---

## Description

* The `Cache`plugin is able to cache theesults of the target service, allowing the user to configure the expiration
  time of the cached results.

## Plugin Setting

In `shenyu-admin` --> BasicConfig --> plugin --> `Cache` set to enable.
![](/img/shenyu/plugin/cache/cache-plugin-en.png)

Cache currently supports two modes of caching data.

* memory：local memory mode

* redis：redis mode
  ![](/img/shenyu/plugin/cache/cache-plugin-handle-en.png)

The current default is `local memory mode`, the results of the target service are stored in the local memory, if the
gateway is deployed by way of cluster, it is not recommended to use `local memory mode`, it is recommended to
use `redis mode`, the data of the target service are cached in redis.

If you are using `local memory mode`, you only need to select memory in cacheType, no other configuration is needed.

If you are using `redis mode`, select redis in cacheType, and the parameters are as follows

* database: which database the cache results are stored in, the default is index database 0.

* master: default is master.

* mode: the working mode of redis, the default is single-point mode: `standalone`, in addition to cluster
  mode: `cluster`, sentinel mode: `sentinel`.

* url: configure the IP and port of the redis database, configured by colon connection, example: `192.168.1.1:6379`.

* password: the password of the redis database, if not, you can not configure.

* maxldle: the maximum free connections in the connection pool

* minldle: minimum idle connections in the connection pool

* maxActive: the maximum number of connections in the connection pool

* maxWait: the maximum blocking wait time for the connection pool (use negative values to indicate no limit) default -1

## Plugin Use

* Add support for `Cache` in the `pom.xml` file of shenyu-bootstrap.

```xml
        <!--shenyu cache plugin start-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-cache</artifactId>
    <version>${project.version}</version>
</dependency>
        <!--shenyu cache plugin end-->
```

* Selectors and rules, please refer
  to: [Selector And Rule Config](https://shenyu.apache.org/docs/plugin-center/user-guide/admin-usage/selector-and-rule "Selector And Rule Config")
  .

* Only matching requests will be cached by the Cache plugin for the results of the target service.

The parameter `timeoutSecods` in the rule, the value is the target service result data cache time, the default is 60,
in `seconds`.
![](/img/shenyu/plugin/cache/cache-plugin-rule-en.png)

Note: The current version of the Cache plugin uses the url as a unique key to identify the same request.

## Situation

* Situation where data is not updated frequently and a large number of calls are required.

* For Situation where data consistency is not required.

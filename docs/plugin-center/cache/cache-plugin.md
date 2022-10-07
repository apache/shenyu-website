---
title: Cache Plugin
keywords: ["Cache"]
description: Cache Plugin
---

# 1. Overview

## 1.1 Plugin Name

* Cache Plugin

## 1.2 Appropriate Scenario

* Situation where data is not updated frequently and a large number of calls are required.

* For Situation where data consistency is not required.

## 1.3 Plugin functionality

* The `Cache` plugin is able to cache the results of the target service, allowing the user to configure the expiration
  time of the cached results.

## 1.4 Plugin code

* Core Module `shenyu-plugin-cache-handler`.
* Core Module `shenyu-plugin-cache-redis`.
* Core Module `shenyu-plugin-cache-memory`.

* Core Class `org.apache.shenyu.plugin.cache.CachePlugin`
* Core Class `org.apache.shenyu.plugin.cache.redis.RedisCache`
* Core Class `org.apache.shenyu.plugin.cache.memory.MemoryCache`

## 1.5 Added Since Which shenyu version

* Since 2.4.3

# 2. How to use plugin

## 2.1 Plugin-use procedure chart

![](/img/shenyu/plugin/plugin_use_en.jpg)

## 2.2 Import pom

* Import cache plugin dependency in `ShenYu Bootstrap`.

```xml
<!--shenyu cache plugin start-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-cache</artifactId>
  <version>${project.version}</version>
</dependency>
<!--shenyu cache plugin end-->
```

## 2.3 Enable plugin

- In shenyu-admin --> BasicConfig --> Plugin --> `cache` set Status enabled.

## 2.4 Config plugin

### 2.4.1 Plugin Config

![](/img/shenyu/plugin/cache/cache-plugin-config-en.png)

* `cacheType`: Cache currently supports two modes of caching data.

* memory：local memory mode

* redis：redis mode

The current default is `local memory mode`, the results of the target service are stored in the local memory, if the
gateway is deployed by way of cluster, it is not recommended to use `local memory mode`, it is recommended to
use `redis mode`, the data of the target service are cached in redis.

If you are using `local memory mode`, you only need to select memory in cacheType, no other configuration is needed.

If you are using `redis mode`, select redis in cacheType, and the parameters are as follows

* `database`: which database the cache results are stored in, the default is index database 0.

* `master`: default is master.

* `mode`: the working mode of redis, the default is single-point mode: `standalone`, in addition to cluster
  mode: `cluster`, sentinel mode: `sentinel`.

* `url`: configure the IP and port of the redis database, configured by colon connection, example: `192.168.1.1:6379`.

* `password`: the password of the redis database, if not, you can not configure.

* `maxldle`: the maximum free connections in the connection pool

* `minldle`: minimum idle connections in the connection pool

* `maxActive`: the maximum number of connections in the connection pool

* `maxWait`: the maximum blocking wait time for the connection pool (use negative values to indicate no limit) default -1

### 2.4.2 Selector Config

* Selectors and rules, please refer to: [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule) .

### 2.4.3 Rule Config

![](/img/shenyu/plugin/cache/cache-plugin-rule-en.png)

* Only matching requests will be cached by the Cache plugin for the results of the target service.

`timeoutSecods`: the value is the target service result data cache time, the default is 60, in `seconds`.

Notice: The current version of the Cache plugin uses the url as a unique key to identify the same request.

## 2.5 Examples

### 2.5.1 Use redis cache request result

#### 2.5.1.1 Plugin Config

![](/img/shenyu/plugin/cache/cache-plugin-config-example-en.png)

select redis cache type, config redis database, url, mode, password

#### 2.5.1.2 Selector Config

![](/img/shenyu/plugin/cache/cache-plugin-selector-en.png)

#### 2.5.1.3 Rule Config

![](/img/shenyu/plugin/cache/cache-plugin-rule-en.png)

#### 2.5.1.4 Send Request

* send http request to cache result.

```http title="request"
### shengyu getway proxy orderSave
GET http://localhost:9195/http/order/findById?id=123
Accept: application/json
Content-Type: application/json
```

#### 2.5.1.5 Check Result

![](/img/shenyu/plugin/cache/cache-result.jpg)

![](/img/shenyu/plugin/cache/cache-result-check.png)

# 3. How to disable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `cache` set Status disable.

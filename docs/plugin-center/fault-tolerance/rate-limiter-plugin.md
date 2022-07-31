---
title: RateLimiter Plugin
keywords: ["rateLimiter"]
description: rateLimiter plugin
---

# 1. Overview

## 1.1 Plugin Name

* RateLimiter Plugin

## 1.2 Appropriate Scenario

* traffic control in gateway cluster environment
* rate limiting according to specific rules
* You can set to the interface level, or the parameter level. How to use it depends on your traffic configuration.

## 1.3 Plugin functionality

* use redis to control gateway traffic

## 1.4 Plugin code

* Core Module `shenyu-plugin-ratelimiter`.

* Core Class `org.apache.shenyu.plugin.ratelimiter.RateLimiterPlugin`
* Core Class `org.apache.shenyu.plugin.ratelimiter.executor.RedisRateLimiter`

## 1.5 Added Since Which shenyu version

* Since ShenYu 2.4.0

## 1.6 Technical Solution

### 1.6.1 Using redis token bucket algorithm to limit traffic.

- The system generates the token at a constant rate, and then puts the token into the token bucket.
- The token bucket's capacity. When the bucket is full, the token put into it will be discarded.
- Each time requests come, you need to obtain a token from the token bucket. If there are tokens, the service will be provided; if there are no tokens, the service will be rejected.

* Flow Diagram：
  ![](/img/shenyu/plugin/ratelimiter/tokenbucket.png)


### 1.6.2 Using redis leaky bucket algorithm to limit traffic.

- water (request) go to the leaky bucket first. The leaky bucket goes out at a fixed speed. When the flow speed is too fast, it will overflow directly (reject service)

* Flow Diagram：
  ![](/img/shenyu/plugin/ratelimiter/leakybucket.png)


### 1.6.3 Using redis sliding time window algorithm to limit traffic.

- The sliding time window maintains the count value of unit time. Whenever a requests pass, the count value will be increased by 1. When the count value exceeds the preset threshold, other requests in unit time will be rejected. If the unit time has ended, clear the counter to zero and start the next round counting.

* Flow Diagram：
  ![](/img/shenyu/plugin/ratelimiter/sldingwindow.png)

# 2. How to use plugin

## 2.1 Plugin-use procedure 

![](/img/shenyu/plugin/plugin_use_en.jpg)

## 2.2 Import pom

* Add `rateLimiter` dependency in `pom.xml` file of the gateway.

```xml
<!-- apache shenyu ratelimiter plugin start-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-ratelimiter</artifactId>
  <version>${project.version}</version>
</dependency>
<!-- apache shenyu ratelimiter plugin end-->
``` 

## 2.3 Enable plugin

* In `shenyu-admin`--> BasicConfig --> Plugin --> `rateLimiter` set to enable.

## 2.4 Config plugin

### 2.4.1 Plugin Config

![](/img/shenyu/plugin/ratelimiter/ratelimiter-plugin-en.png)

* `mode`: the working mode of redis, the default is single-point mode: `standalone`, in addition to cluster
  mode: `cluster`, sentinel mode: `sentinel`.

* `master`: default is master.

* `url`: configure the IP and port of the redis database, configured by colon connection, example: `192.168.1.1:6379`.

* `password`: the password of the redis database, if not, you can not configure.

### 2.4.2 Selector Config

* Selectors and rules, please refer to: [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule)

### 2.4.3 Rule Config

![](/img/shenyu/plugin/ratelimiter/ratelimiter-plugin-rule-en.png)

* TokenBucket/Concurrent

  * `algorithmName`: `tokenBucket`/`concurrent`.

  * `replenishRate`: It is how many requests you allow users to execute per second, while not discarding any requests. This is the filling rate of token bucket.

  * `burstCapacity`: it is the maximum number of requests that users are allowed to execute in one second. This is token bucket can save the number of token.

  * `keyResolverName`: `whole` indicates that the traffic is limited by gateway per second, and `remoteAddress` indicates that the traffic is limited by IP per second.

* LeakyBucket

  * `algorithmName`: `leakyBucket`.

  * `replenishRate`: The rate at which requests are executed per unit time, and the rate at which water droplets leak out of the leaky bucket.

  * `burstCapacity`: The maximum number of requests that users are allowed to execute in one second. This is the amount of water in the bucket.

  * `keyResolverName`: `whole` indicates that the traffic is limited by gateway per second, and `remoteAddress` indicates that the traffic is limited by IP per second.

* SlidingWindow

  * `algorithmName`: `slidingWindow`.

  * `replenishRate`: The rate of requests per unit time, used to calculate the size of the time window.

  * `burstCapacity`: The maximum number of requests in the time window (per unit time).

  * `keyResolverName`: `whole` indicates that the traffic is limited by gateway per second, and `remoteAddress` indicates that the traffic is limited by IP per second.
  
## 2.5 Examples

### 2.5.1 Limit traffic with `RateLimiter` plugin in gateway cluster environment

#### 2.5.1.1 Preparation

- Start ShenYu Admin on `10.10.10.10:9095`
- Start two ShenYu Bootstrap on `10.10.10.20:9195` and `10.10.10.30:9195`, and config data sync center on `10.10.10.10:9095`
- config nginx, for example:

```conf
upstream shenyu_gateway_cluster {
  ip_hash;
  server 10.1.1.1:9195 max_fails=3 fail_timeout=10s weight=50;
  server 10.1.1.2:9195 max_fails=3 fail_timeout=10s weight=50;
}

server {
  location / {
        proxy_pass http://shenyu_gateway_cluster;
        proxy_set_header HOST $host;
        proxy_read_timeout 10s;
        proxy_connect_timeout 10s;
  }
}
```

#### 2.5.1.2 Plugin/Selector/Rule Configuration

- config redis configuration with ratelimiter plugin

- config selector

- config rule

![](/img/shenyu/plugin/ratelimiter/rule-example-en.png)

replenishRate is 3, burstCapacity is 10

#### 2.5.1.3 Send Request to `Ngin`x by `Apache Jmeter`

* jmeter thread group configuration

![](/img/shenyu/plugin/ratelimiter/jmeter-thread-group.png)

* jmeter http request configuration

![](/img/shenyu/plugin/ratelimiter/jmeter-http-request.png)

#### 2.5.1.4 Check Result

![](/img/shenyu/plugin/ratelimiter/jmeter-result.png)

# 3. How to disable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `rateLimiter` set Status disable.

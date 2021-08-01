---
title: RateLimiter Plugin
keywords: rateLimiter
description: rateLimiter plugin
---

## Description

* RateLimiter is core implementation of gateway restrictions on network traffic.

* the Apache ShenYu gateway provides a variety of current limiting algorithms, including `token bucket algorithm`, `concurrent token bucket algorithm`, `leaky bucket algorithm` and `sliding time window algorithm`.

* The implementation of current limiting algorithm of Apache ShenYu gateway is based on `redis`.

* You can set to the interface level or the parameter level. How to use it depends on your traffic configuration.


## Technical Solution

#### Using redis token bucket algorithm to limit traffic.

- The system generates the token at a constant rate, and then puts the token into the token bucket.
- The token bucket's capacity. When the bucket is full, the token put into it will be discarded.
- Each time requests come, you need to obtain a token from the token bucket. If there are tokens, the service will be provided; if there are no tokens, the service will be rejected.

* Flow Diagram：
  ![](https://yu199195.github.io/images/soul/limiting.png)


#### Using redis leaky bucket algorithm to limit traffic.

- water (request) go to the leaky bucket first. The leaky bucket goes out at a fixed speed. When the flow speed is too fast, it will overflow directly (reject service)

* Flow Diagram：
  ![](/img/shenyu/plugin/ratelimiter/leakybucket.png)


#### Using redis sliding time window algorithm to limit traffic.

- The sliding time window maintains the count value of unit time. Whenever a requests pass, the count value will be increased by 1. When the count value exceeds the preset threshold, other requests in unit time will be rejected. If the unit time has ended, clear the counter to zero and start the next round counting.

* Flow Diagram：
  ![](/img/shenyu/plugin/ratelimiter/sldingwindow.png)


## Plugin Setting

* In `shenyu-admin`--> BasicConfig --> Plugin --> `rate_limiter` set to enable.

* Configure redis in the plugin.

* Currently, supporting redis patterns of single, sentinel, and cluster.

* If it is a sentinel, cluster and other multi-node configuration in URL, please use `;` for each instance; Division. For example, 192.168.1.1:6379; 192.168.1.2:6379。

* If the user don't use, please disable the plugin in the background.

## Plugin Detail

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

For more information on selectors and rules configuration, see [Selector And Rule Config](../selector-and-rule) , only some of the fields are covered here.




* Rules Handler Details

<img src="/img/shenyu/plugin/ratelimiter/ratelimiter-plugin-en-1.png" width="80%" height="80%" />


* TocketBucket/Concurrent

  * `algorithmName`: tocketBucket/concurrent.

  * `replenishRate`: It is how many requests you allow users to execute per second, while not discarding any requests. This is the filling rate of token bucket.

  * `burstCapacity`: it is the maximum number of requests that users are allowed to execute in one second. This is token bucket can save the number of token.

  * `keyResolverName`: `whole` indicates that the traffic is limited by gateway per second, and `remoteAddress` indicates that the traffic is limited by IP per second.

* LeakyBucket

  * `algorithmName`: leakyBucket.

  * `replenishRate`: The rate at which requests are executed per unit time, and the rate at which water droplets leak out of the leaky bucket.

  * `burstCapacity`: The maximum number of requests that users are allowed to execute in one second. This is the amount of water in the bucket.

  * `keyResolverName`: `whole` indicates that the traffic is limited by gateway per second, and `remoteAddress` indicates that the traffic is limited by IP per second.

* SildingWindow

  * `algorithmName`: sildingWindow.

  * `replenishRate`: The rate of requests per unit time, used to calculate the size of the time window.

  * `burstCapacity`: The maximum number of requests in the time window (per unit time).

  * `keyResolverName`: `whole` indicates that the traffic is limited by gateway per second, and `remoteAddress` indicates that the traffic is limited by IP per second.

---
title: RateLimiter Plugin
keywords: ["rateLimiter"]
description: rateLimiter plugin
---

## Explanation

* rateLimiter is core implementation of gateway restrictions on network traffic.

* The soul gateway provides a variety of current limiting algorithms, including `token bucket algorithm`, `concurrent token bucket algorithm`, `leaky bucket algorithm` and `sliding time window algorithm`.

* The implementation of current limiting algorithm of soul gateway is based on `redis`.

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
  ![](/img/soul/plugin/ratelimiter/leakybucket.png)


#### Using redis sliding time window algorithm to limit traffic.

- The sliding time window maintains the count value of unit time. Whenever a requests pass, the count value will be increased by 1. When the count value exceeds the preset threshold, other requests in unit time will be rejected. If the unit time has ended, clear the counter to zero and start the next round counting.

* Flow Diagram：
  ![](/img/soul/plugin/ratelimiter/sldingwindow.png)


## Plugin Setting

* In `soul-admin`--> plugin management--> `rate_limiter` set to enable.
 
* Configure redis in the plugin.

* Currently, supporting redis patterns of single, sentinel, and cluster.

* If it is a sentinel, cluster and other multi-node configuration in URL, please use `;` for each instance; Division. For example, 192.168.1.1:6379; 192.168.1.2:6379。

* If the user don't use, please disable the plugin in the background.
 
## Plugin Detail

* Introduce `rateLimiter` dependency in pom.xml file of the gateway.

```xml
  <!-- soul ratelimiter plugin start-->
  <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-ratelimiter</artifactId>
      <version>${last.version}</version>
  </dependency>
  <!-- soul ratelimiter plugin end-->
``` 

* Selectors and rules, please refer to: [selector](../selector-and-rule)。

* Detailed description of the rules

* * Token bucket algorithm/Concurrent token bucket algorithm


lgorithmName：tocketBucket/concurrent

replenishRate：It is how many requests you allow users to execute per second, while not discarding any requests. This is the filling rate of token bucket.

burstCapacity：it is the maximum number of requests that users are allowed to execute in one second. This is token bucket can save the number of token.


* * Leaky bucket algorithm


algorithmName：leakyBucket

replenishRate：The rate at which requests are executed per unit time, and the rate at which water droplets leak out of the leaky bucket.

burstCapacity：The maximum number of requests that users are allowed to execute in one second. This is the amount of water in the bucket.

  
* * Sliding time window algorithm


algorithmName：sildingWindow

replenishRate：The rate of requests per unit time, used to calculate the size of the time window.

burstCapacity：The maximum number of requests in the time window (per unit time).


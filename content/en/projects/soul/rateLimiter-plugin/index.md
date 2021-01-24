---
title: plugin-rateLimiter
keywords: rateLimiter
description: rateLimiter plugin
---

## Explanation

* rateLimiter is core implementation of gateway restrictions on network traffic.

* You can set to the interface level or the parameter level. How to use it depends on your traffic configuration.


## Technical Solution

* Using redis token bucket algorithm to limit traffic.

* Flow Diagram：
  ![](https://yu199195.github.io/images/soul/limiting.png)

  
## Plugin Setting

* In `soul-admin`--> plugin management--> `rate_limiter` set to enable.
 
* Configure redis in the plugin.

* Currently, supporting redis patterns of single, sentinel, and cluster.

* If it is a sentinel, cluster and other multi-node configuration in URL, please use `;` for each instance; Division. For example, 192.168.1.1:6379; 192.168.1.2:6379。

* If the user don't use, please disable the plugin in the backgroud.
 
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

* Selectors and rules, please refer to: [selector](docs/en-us/soul/selector.md)。

* Rate: It is how many requests you allow users to execute per second, while not discarding any requests. This is the filling rate of token bucket.
  
* Capacity: it is the maximum number of requests that users are allowed to execute in one second. This is token bucket can save the number of token.
  

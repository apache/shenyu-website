---
title: rateLimiter插件
keywords: rateLimiter
description: rateLimiter插件
---

## 说明

* 限流插件，是网关对流量管控限制核心的实现。

* soul网关提供了多种限流算法的实现，包括`令牌桶算法`、`并发的令牌桶算法`、`漏桶算法`、`滑动时间窗口算法`。

* soul网关的限流算法实现都是基于`redis`。

* 可以到接口级别，也可以到参数级别，具体怎么用，还得看你对流量配置。



## 技术方案

#### 采用redis令牌桶算法进行限流。

- 系统以恒定的速率产⽣令牌，然后将令牌放⼊令牌桶中。
- 令牌桶有⼀个容量，当令牌桶满了的时候，再向其中放⼊的令牌就会被丢弃。
- 每次⼀个请求过来，需要从令牌桶中获取⼀个令牌，如果有令牌，则提供服务；如果没有令牌，则拒绝服务。

* 流程图：
  ![](https://yu199195.github.io/images/soul/limiting.png)


#### 采用redis漏桶算法进行限流。

- ⽔（请求）先进⼊到漏桶⾥，漏桶以⼀定的速度出⽔，当⽔流⼊速度过⼤会直接溢出（拒绝服务）

* 流程图：
  ![](/img/soul/plugin/ratelimiter/leakybucket.png)


#### 基于redis实现的滑动窗口算法

- 滑动时间窗口通过维护⼀个单位时间内的计数值，每当⼀个请求通过时，就将计数值加1，当计数值超过预先设定的阈值时，就拒绝单位时间内的其他请求。如果单位时间已经结束，则将计数器清零，开启下⼀轮的计数。

* 算法图：
  ![](/img/soul/plugin/ratelimiter/huadongwindow.jpg)

* 流程图：
  ![](/img/soul/plugin/ratelimiter/sldingwindow.png)

  
## 插件设置

* 在 `soul-admin`--> 插件管理--> `rate_limiter` 将其设置为开启。

* 在插件中，对redis进行配置。

* 目前支持redis的单机，哨兵，以及集群模式。

* 如果是哨兵，集群等多节点的，在URL中的配置，请对每个实列使用 `;` 分割. 如 192.168.1.1:6379;192.168.1.2:6379。

* 如果用户无需使用，在admin后台把插件禁用。 
 
## 插件使用

* 在网关的 pom.xml 文件中添加 rateLimiter的支持。

```xml
  <!-- soul ratelimiter plugin start-->
  <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-ratelimiter</artifactId>
      <version>${last.version}</version>
  </dependency>
  <!-- soul ratelimiter plugin end-->
``` 

* 选择器和规则，请详细看：[选择器规则](../selector-and-rule)。
  
* 规则详细说明

* * 令牌桶算法/并发令牌桶算法


algorithmName（算法名）：tocketBucket/concurrent

replenishRate（速率）：是你允许用户每秒执行多少请求，而丢弃任何请求。这是令牌桶的填充速率。

burstCapacity（容量）：是允许用户在一秒钟内执行的最大请求数。这是令牌桶可以保存的令牌数。


* * 漏桶算法 

algorithmName（算法名）：leakyBucket

replenishRate（速率）：单位时间内执行请求的速率，漏桶中水滴漏出的速率。

burstCapacity（容量）：是允许用户在一秒钟内执行的最大请求数。这是桶中的水量。


* * 滑动窗口算法

algorithmName（算法名）：sildingWindow

replenishRate（速率）：单位时间内执行请求的速率，用于计算时间窗口大小。

burstCapacity（容量）：时间窗口内（单位时间内）最大的请求数量。

---
title: RateLimiter插件
keywords: ["rateLimiter"]
description: rateLimiter插件
---

# 1. 概述

## 1.1 插件名称

* RateLimiter 插件

## 1.2 适用场景

* 在网关集群环境下进行流量控制
* 根据特定规则进行流量控制
* 可以到接口级别，也可以到参数级别。

## 1.3 插件功能

* 基于redis进行流量控制

## 1.4 插件代码

* 核心模块 `shenyu-plugin-ratelimiter`.

* 核心类 `org.apache.shenyu.plugin.ratelimiter.RateLimiterPlugin`
* 核心类 `org.apache.shenyu.plugin.ratelimiter.executor.RedisRateLimiter`

## 1.5 添加自哪个shenyu版本

* ShenYu 2.4.0

## 1.6 技术方案

### 1.6.1 采用redis令牌桶算法进行限流

- 系统以恒定的速率产⽣令牌，然后将令牌放⼊令牌桶中。
- 令牌桶有⼀个容量，当令牌桶满了的时候，再向其中放⼊的令牌就会被丢弃。
- 每次⼀个请求过来，需要从令牌桶中获取⼀个令牌，如果有令牌，则提供服务；如果没有令牌，则拒绝服务。

* 流程图：
  ![](/img/shenyu/plugin/ratelimiter/tokenbucket.png)

### 1.6.2 采用redis漏桶算法进行限流。

- ⽔（请求）先进⼊到漏桶⾥，漏桶以⼀定的速度出⽔，当⽔流⼊速度过⼤会直接溢出（拒绝服务）

* 流程图：
  ![](/img/shenyu/plugin/ratelimiter/leakybucket.png)


### 1.6.3 基于redis实现的滑动窗口算法

- 滑动时间窗口通过维护⼀个单位时间内的计数值，每当⼀个请求通过时，就将计数值加1，当计数值超过预先设定的阈值时，就拒绝单位时间内的其他请求。如果单位时间已经结束，则将计数器清零，开启下⼀轮的计数。

* 算法图：
  ![](/img/shenyu/plugin/ratelimiter/huadongwindow.jpg)

* 流程图：
  ![](/img/shenyu/plugin/ratelimiter/sldingwindow.png)

# 2. 如何使用插件

## 2.1 插件使用流程图

![](/img/shenyu/plugin/plugin_use_zh.jpg)

## 2.2 导入pom

* 在网关的 `pom.xml` 文件中添加 `rateLimiter` 的依赖。

```xml
<!-- apache shenyu ratelimiter plugin start-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-ratelimiter</artifactId>
  <version>${project.version}</version>
</dependency>
<!-- apache shenyu ratelimiter plugin end-->
```

## 2.3 启用插件

在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `Cache` 设置为开启。

## 2.4 配置插件

### 2.4.1 插件配置

![](/img/shenyu/plugin/ratelimiter/ratelimiter-plugin-zh.png)

* `mode`：redis的工作模式，默认为单点模式：`standalone`，此外还有集群模式：`cluster`，哨兵模式：`sentinel`。

* `master`：默认为master。

* `url` :配置 redis 数据库的IP和端口，通过冒号连接配置，示例：`192.168.1.1:6379`。

* `password`: redis 数据库的密码，如果没有的话，可以不配置。

### 2.4.2 选择器配置

* 选择器和规则设置，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。

### 2.4.3 规则配置

![](/img/shenyu/plugin/ratelimiter/ratelimiter-plugin-rule-zh.png)

* 令牌桶算法/并发令牌桶算法

  * `algorithmName`（算法名）：`tokenBucket/concurrent`。

  * `replenishRate`（速率）：允许用户每秒执行多少请求，而丢弃任何请求。这是令牌桶的填充速率。

  * `burstCapacity`（容量）：允许用户在一秒钟内执行的最大请求数。这是令牌桶可以保存的令牌数。

  * `keyResolverName`（限流依据）：`whole`表示按网关每秒限流，`remoteAddress`表示按IP每秒限流。

* 漏桶算法

  * `algorithmName`（算法名）：`leakyBucket`。

  * `replenishRate`（速率）：单位时间内执行请求的速率，漏桶中水滴漏出的速率。

  * `burstCapacity`（容量）：允许用户在一秒钟内执行的最大请求数。这是桶中的水量。

  * `keyResolverName`（限流依据）：`whole`表示按网关每秒限流，`remoteAddress`表示按IP每秒限流。

* 滑动窗口算法

  * `algorithmName`（算法名）：`slidingWindow`。

  * `replenishRate`（速率）：单位时间内执行请求的速率，用于计算时间窗口大小。

  * `burstCapacity`（容量）：时间窗口内（单位时间内）最大的请求数量。

  * `keyResolverName`（限流依据）：`whole`表示按网关每秒限流，`remoteAddress`表示按IP每秒限流。


## 2.5 示例

### 2.5.1 使用`RateLimiter`插件在网关集群环境中进行流量控制

#### 2.5.1.1 准备工作

- 在`10.10.10.10:9095`启动`ShenYu Admin`
- 在`10.10.10.20:9195`和`10.10.10.30:9195`启动`ShenYu Bootstrap`, 配置`ShenYu Bootstrap`配置同步`10.10.10.10:9095`
- 配置nginx，例如：

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

#### 2.5.1.2 插件、选择器、规则配置

- 配置ratelimiter插件的redis的配置

- 配置插件的选择器

- 配置规则

![](/img/shenyu/plugin/ratelimiter/rule-example-zh.png)

replenishRate为3, burstCapacity为10

#### 2.5.1.3 使用`Apache Jmeter`发送请求到Nginx

* jmeter线程组配置

![](/img/shenyu/plugin/ratelimiter/jmeter-thread-group.png)

* jmeter http request配置

![](/img/shenyu/plugin/ratelimiter/jmeter-http-request.png)

#### 2.5.1.4 验证结果

![](/img/shenyu/plugin/ratelimiter/jmeter-result.png)

# 3. 如何禁用插件

在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `Cache` 设置为关闭。

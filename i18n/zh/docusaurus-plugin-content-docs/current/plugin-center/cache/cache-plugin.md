---
title: 缓存插件
keywords: ["缓存"]
description: 缓存插件
---


# 1. 概述

## 1.1 插件名称

* 缓存插件

## 1.2 适用场景

* 数据不会频繁更新，而且需要大量调用的场景。

* 对于数据一致性要求不高的场景。

## 1.3 插件功能

* `Cache`插件能够缓存目标服务的结果，允许用户配置缓存结果的失效时间。

## 1.4 插件代码

* 核心模块 `shenyu-plugin-cache-handler`.
* 核心模块 `shenyu-plugin-cache-redis`.
* 核心模块 `shenyu-plugin-cache-memory`.

* 核心类 `org.apache.shenyu.plugin.cache.CachePlugin`
* 核心类 `org.apache.shenyu.plugin.cache.redis.RedisCache`
* 核心类 `org.apache.shenyu.plugin.cache.memory.MemoryCache`

## 1.5 添加自哪个shenyu版本

* 2.4.3

# 2. 如何使用插件

## 2.1 插件使用流程图

![](/img/shenyu/plugin/plugin_use_zh.jpg)

## 2.2 导入pom

* 在`ShenYu Bootstrap`导入cache插件的依赖。

```xml
<!--shenyu cache plugin start-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-cache</artifactId>
  <version>${project.version}</version>
</dependency>
<!--shenyu cache plugin end-->
```

## 2.3 启用插件

在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `Cache` 设置为开启。

## 2.4 配置插件

### 2.4.1 插件配置

![](/img/shenyu/plugin/cache/cache-plugin-config-zh.png)

* `cacheType`: Cache目前支持两种模式缓存数据

* memory：本地内存模式

* redis：redis模式

目前默认的是`本地内存模式`，目标服务的结果都存储在本地内存中，如果网关是通过集群的方式部署的，不建议使用`本地内存模式`，推荐使用`redis模式`，目标服务的数据都缓存到redis中。

如果使用的是`本地内存模式`，只需要在cacheType中选择memory即可，其他配置都不需要配置。

如果使用的是`redis模式`，在cacheType中选择redis，参数介绍：

* `database`：缓存结果存储到哪个数据库中，默认是索引库0。

* `master`：默认为master。

* `mode`：redis的工作模式，默认为单点模式：`standalone`，此外还有集群模式：`cluster`，哨兵模式：`sentinel`。

* `url` :配置 redis 数据库的IP和端口，通过冒号连接配置，示例：`192.168.1.1:6379`。

* `password`: redis 数据库的密码，如果没有的话，可以不配置。

* `maxldle`：连接池中最大空闲连接

* `minldle`：连接池中最小空闲连接

* `maxActive`：连接池最大连接数

* `maxWait`：连接池最大阻塞等待时间（使用负值表示没有限制）默认 -1

### 2.4.2 选择器配置

* 选择器和规则设置，请参考：[选择器和规则管理](https://shenyu.apache.org/zh/docs/user-guide/admin-usage/selector-and-rule "选择器和规则管理")。

### 2.4.3 规则配置

![](/img/shenyu/plugin/cache/cache-plugin-rule-zh.png)

* 只有匹配的请求，`Cache`插件才会对目标服务的结果进行缓存。

`timeoutSecods`，该值为目标服务结果数据缓存时间，默认是60，单位`秒`。

注意：当前版本的Cache插件是把url作为唯一key，标识同一个请求的。

## 2.5 示例

### 2.5.1 使用redis缓存请求结果

#### 2.5.1.1 插件配置

![](/img/shenyu/plugin/cache/cache-plugin-config-example-zh.png)

选择redis缓存模式，并且配置redis的数据库，url，模式和密码。

#### 2.5.1.2 选择器配置

![](/img/shenyu/plugin/cache/cache-plugin-selector-zh.png)

#### 2.5.1.3 规则配置

![](/img/shenyu/plugin/cache/cache-plugin-rule-zh.png)

#### 2.5.1.4 发送请求

* 发送请求并且缓存结果

```http request
### shengyu getway proxy orderSave
GET http://localhost:9195/http/order/findById?id=123
Accept: application/json
Content-Type: application/json
```

#### 2.5.1.5 核验缓存结果

![](/img/shenyu/plugin/cache/cache-result.jpg)

![](/img/shenyu/plugin/cache/cache-result-check.png)

# 3. 如何禁用插件

在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `Cache` 设置为关闭。

---
title: 缓存插件
keywords: ["缓存"]
description: 缓存插件
---

## 说明

*   `Cache`插件能够缓存目标服务的结果，允许用户配置缓存结果的失效时间。

## 插件配置

在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `Cache` 设置为开启。

![](/img/shenyu/plugin/cache/cache-plugin-zh.png)

Cache目前支持两种模式缓存数据：

*   memory：本地内存模式

*   redis：redis模式

![](/img/shenyu/plugin/cache/cache-plugin-handle-zh.png)

目前默认的是`本地内存模式`，目标服务的结果都存储在本地内存中，如果网关是通过集群的方式部署的，不建议使用`本地内存模式`，推荐使用`redis模式`，目标服务的数据都缓存到redis中。

如果使用的是`本地内存模式`，只需要在cacheType中选择memory即可，其他配置都不需要配置。

如果使用的是`redis模式`，在cacheType中选择redis，参数介绍：

*   database：缓存结果存储到哪个数据库中，默认是索引库0。

*   master：默认为master。

*   mode：redis的工作模式，默认为单点模式：`standalone`，此外还有集群模式：`cluster`，哨兵模式：`sentinel`。

*   url:配置 redis 数据库的IP和端口，通过冒号连接配置，示例：`192.168.1.1:6379`。

*   password: redis 数据库的密码，如果没有的话，可以不配置。

*   maxldle：连接池中最大空闲连接

*   minldle：连接池中最小空闲连接

*   maxActive：连接池最大连接数

*   maxWait：连接池最大阻塞等待时间（使用负值表示没有限制）默认 -1

## 插件使用

*   在网关的 `pom.xml` 文件中添加 `Cache` 的支持。

```xml
        <!--shenyu cache plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-cache</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!--shenyu cache plugin end-->
```

*   选择器和规则设置，请参考：[选择器和规则管理](https://shenyu.apache.org/zh/docs/user-guide/admin-usage/selector-and-rule "选择器和规则管理")。

*   只有匹配的请求，`Cache`插件才会对目标服务的结果进行缓存。

规则中参数 `timeoutSecods`，该值为目标服务结果数据缓存时间，默认是60，单位`秒`。

![](/img/shenyu/plugin/cache/cache-plugin-rule-zh.png)

注意：当前版本的Cache插件是把url作为唯一key，标识同一个请求的。

## 使用场景

*   数据不会频繁更新，而且需要大量调用的场景。

*   对于数据一致性要求不高的场景。
---
title: "ShenYu网关学习(1)环境配置"
author: "陈曦"
description: "ShenYu网关学习(1)环境配置"
categories: "Soul"
tags: ["Soul"]
date: 2021-01-15
cover: "/img/architecture/soul-framework.png"
---

# Soul源码分析（1） 环境配置

> soul is a High-Performance Java API Gateway
> 
> GitHub：https://github.com/dromara/soul
> 
> 官方文档：https://dromara.org/zh-cn/docs/soul/soul.html

## 1. 源代码准备

### 1.1. fork [dromara/soul](https://github.com/dromara/soul.git)源代码至自己的仓库[cchenxi/soul](https://github.com/cchenxi/soul.git)

### 1.2. clone自己仓库中的soul源代码至本地

```shell
git clone https://github.com/cchenxi/soul.git
```

### 1.3.使用idea打开soul源代码

### 1.4.编译soul源代码

执行以下maven命令，等待编译完成

![-w1723](/img/soul/01/16106054898861.jpg)


```shell
mvn clean package install -Dmaven.test.skip=true -Dmaven.javadoc.skip=true -Drat.skip=true -Dcheckstyle.skip=true
```

## 2. 启动 `soul`

### 2.1. 启动`soul-admin`模块

> `soul-admin`是soul网关的后台管理系统

选择使用MySQL数据库存储网关数据，修改数据源配置为自己的数据库配置。

![-w1186](/img/soul/01/16106065488032.jpg)


运行启动类 `org.dromara.soul.admin.SoulAdminBootstrap`。

启动成功后，访问地址 http://localhost:9095/ ，跳转到登录页↓

![-w593](/img/soul/01/16106069731233.jpg)

使用用户名`admin`，密码 `123456` 登录。

![-w1262](/img/soul/01/16106073045599.jpg)



### 2.2. 启动`soul-bootstrap`模块

> `soul-bootstrap`是网关系统的核心

检查`soul-bootstrap`的配置

![-w917](/img/soul/01/16106076385761.jpg)

这里需要配置成 `soul-admin`的ip和端口

控制台输出如下内容表示 `soul-bootstrap`启动成功

```plain text
2021-01-14 15:01:15.832  INFO 17943 --- [           main] b.s.s.d.w.WebsocketSyncDataConfiguration : you use websocket sync soul data.......
2021-01-14 15:01:15.924  INFO 17943 --- [           main] o.d.s.p.s.d.w.WebsocketSyncDataService   : websocket connection is successful.....
2021-01-14 15:01:16.113  INFO 17943 --- [           main] o.s.b.a.e.web.EndpointLinksResolver      : Exposing 2 endpoint(s) beneath base path '/actuator'
log4j:WARN No appenders could be found for logger (com.alibaba.dubbo.common.logger.LoggerFactory).
log4j:WARN Please initialize the log4j system properly.
log4j:WARN See http://logging.apache.org/log4j/1.2/faq.html#noconfig for more info.
2021-01-14 15:01:17.150  INFO 17943 --- [           main] o.s.b.web.embedded.netty.NettyWebServer  : Netty started on port(s): 9195
2021-01-14 15:01:17.154  INFO 17943 --- [           main] o.d.s.b.SoulBootstrapApplication         : Started SoulBootstrapApplication in 5.508 seconds (JVM running for 6.762)
```

## 3. 测试http请求转发

> 为了方便测试，把`soul-examples`模块添加到soul的pom里

### 3.1. 启动一个服务

启动`soul-examples-http`项目

`soul-examples-http`的pom中引入了依赖

```xml
<dependency>
    <groupId>org.dromara</groupId>
    <artifactId>soul-spring-boot-starter-client-springmvc</artifactId>
    <version>${soul.version}</version>
</dependency>
```

在 `application.yml`中配置

```yaml
soul:
  http:
    adminUrl: http://localhost:9095
    port: 8188
    contextPath: /http
    appName: http
    full: false
```

如果soul.http.full=false，则需要在具体的http接口上配置 `@SoulSpringMvcClient` 注解

#### 3.1.1. 测试http服务

执行http请求 `http://localhost:8188/test/findByUserId?userId=1` 结果如下图

![-w684](/img/soul/01/16106235724795.jpg)

#### 3.1.2. 测试网关转发

执行http请求 `http://localhost:9195/http/test/findByUserId?userId=1` 结果如下图

![-w665](/img/soul/01/16106237733891.jpg)
在`soul-bootstrap`的控制台中输出如下信息

```shell
2021-01-14 20:42:57.123  INFO 29812 --- [work-threads-11] o.d.soul.plugin.base.AbstractSoulPlugin  : divide selector success match , selector name :/http
2021-01-14 20:42:57.125  INFO 29812 --- [work-threads-11] o.d.soul.plugin.base.AbstractSoulPlugin  : divide selector success match , selector name :/http/test/**
2021-01-14 20:42:57.126  INFO 29812 --- [work-threads-11] o.d.s.plugin.httpclient.WebClientPlugin  : The request urlPath is http://172.27.121.155:8188/test/findByUserId?userId=1, retryTimes is 0
```

可以观察到网关可以将请求正常转发。

### 3.2. 启动两个服务模拟负载均衡

勾选 `Allow parallel run`，修改端口为`8189`，再次启动`soul-examples-http`项目

![-w1104](/img/soul/01/16106249542903.jpg)

#### 3.2.1. 测试http服务

执行http请求 `http://localhost:8189/test/findByUserId?userId=1` 结果如下图

![-w693](/img/soul/01/16106250513285.jpg)

#### 3.2.2. 测试负载均衡

![-w1096](/img/soul/01/16106266610601.jpg)

将8188和8189两个端口对应的服务配置到选择器中

多次执行http请求 `http://localhost:9195/http/test/findByUserId?userId=1` 结果如下图

![-w595](/img/soul/01/16106267572581.jpg)
在`soul-bootstrap`的控制台中输出如下信息

```shell
2021-01-14 20:48:34.460  INFO 29812 --- [work-threads-21] o.d.soul.plugin.base.AbstractSoulPlugin  : divide selector success match , selector name :/http
2021-01-14 20:48:34.460  INFO 29812 --- [work-threads-21] o.d.soul.plugin.base.AbstractSoulPlugin  : divide selector success match , selector name :/http/test/**
2021-01-14 20:48:34.460  INFO 29812 --- [work-threads-21] o.d.s.plugin.httpclient.WebClientPlugin  : The request urlPath is http://172.27.121.155:8189/test/findByUserId?userId=1, retryTimes is 0
2021-01-14 20:48:35.147  INFO 29812 --- [work-threads-22] o.d.soul.plugin.base.AbstractSoulPlugin  : divide selector success match , selector name :/http
2021-01-14 20:48:35.147  INFO 29812 --- [work-threads-22] o.d.soul.plugin.base.AbstractSoulPlugin  : divide selector success match , selector name :/http/test/**
2021-01-14 20:48:35.147  INFO 29812 --- [work-threads-22] o.d.s.plugin.httpclient.WebClientPlugin  : The request urlPath is http://172.27.121.155:8188/test/findByUserId?userId=1, retryTimes is 0
2021-01-14 20:48:38.755  INFO 29812 --- [work-threads-23] o.d.soul.plugin.base.AbstractSoulPlugin  : divide selector success match , selector name :/http
2021-01-14 20:48:38.756  INFO 29812 --- [work-threads-23] o.d.soul.plugin.base.AbstractSoulPlugin  : divide selector success match , selector name :/http/test/**
2021-01-14 20:48:38.756  INFO 29812 --- [work-threads-23] o.d.s.plugin.httpclient.WebClientPlugin  : The request urlPath is http://172.27.121.155:8188/test/findByUserId?userId=1, retryTimes is 0
2021-01-14 20:48:39.609  INFO 29812 --- [work-threads-24] o.d.soul.plugin.base.AbstractSoulPlugin  : divide selector success match , selector name :/http
2021-01-14 20:48:39.609  INFO 29812 --- [work-threads-24] o.d.soul.plugin.base.AbstractSoulPlugin  : divide selector success match , selector name :/http/test/**
2021-01-14 20:48:39.609  INFO 29812 --- [work-threads-24] o.d.s.plugin.httpclient.WebClientPlugin  : The request urlPath is http://172.27.121.155:8189/test/findByUserId?userId=1, retryTimes is 0
2021-01-14 20:48:40.317  INFO 29812 --- [work-threads-25] o.d.soul.plugin.base.AbstractSoulPlugin  : divide selector success match , selector name :/http
2021-01-14 20:48:40.317  INFO 29812 --- [work-threads-25] o.d.soul.plugin.base.AbstractSoulPlugin  : divide selector success match , selector name :/http/test/**
2021-01-14 20:48:40.317  INFO 29812 --- [work-threads-25] o.d.s.plugin.httpclient.WebClientPlugin  : The request urlPath is http://172.27.121.155:8188/test/findByUserId?userId=1, retryTimes is 0
2021-01-14 20:48:40.976  INFO 29812 --- [-work-threads-1] o.d.soul.plugin.base.AbstractSoulPlugin  : divide selector success match , selector name :/http
2021-01-14 20:48:40.976  INFO 29812 --- [-work-threads-1] o.d.soul.plugin.base.AbstractSoulPlugin  : divide selector success match , selector name :/http/test/**
2021-01-14 20:48:40.977  INFO 29812 --- [-work-threads-1] o.d.s.plugin.httpclient.WebClientPlugin  : The request urlPath is http://172.27.121.155:8188/test/findByUserId?userId=1, retryTimes is 0
```

可以观察到请求既有转发到8188端口的，也有转发到8189的，可以实现负载均衡

#### 3.2.3. 压测

简单对直连和使用网关两种方式的请求进行压测

```shell
➜  soul git:(master) ✗ wrk -t8 -c40 -d30s http://localhost:8189/test/findByUserId\?userId\=1
Running 30s test @ http://localhost:8189/test/findByUserId?userId=1
  8 threads and 40 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     6.06ms   28.81ms 442.25ms   98.22%
    Req/Sec     2.05k   493.86     2.84k    74.82%
  486269 requests in 30.05s, 51.01MB read
Requests/sec:  16179.68
Transfer/sec:      1.70MB
➜  soul git:(master) ✗ wrk -t8 -c40 -d30s http://localhost:9195/http/test/findByUserId\?userId\=1
Running 30s test @ http://localhost:9195/http/test/findByUserId?userId=1
  8 threads and 40 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    14.37ms   18.11ms 255.66ms   93.06%
    Req/Sec   459.41    139.11     1.01k    74.23%
  109533 requests in 30.09s, 11.49MB read
Requests/sec:   3639.60
Transfer/sec:    390.98KB
```

可以发现，使用网关后性能有些下降，主要是因为多了一层转发。

#### 3.2.4. 问题

在启动8189端口时，注册的客户端端口还是8188

![-w1675](/img/soul/01/16106270140398.jpg)

先手动配置选择器的配置，后来在群友的帮助下定位到是 `soul.http.port`没有改

修改后的配置如下

![-w520](/img/soul/01/16106405075031.jpg)

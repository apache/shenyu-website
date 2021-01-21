---
title: "Soul Learning(1) Environment Configuration"
author: "chenxi"
description: "Soul Learning(1) Environment Configuration"
categories: "Soul"
tags: ["Soul"]
date: 2021-01-15
cover:
---

# Analysis of soul (1) Set up soul environment

> soul is a High-Performance Java API Gateway
>
> GitHub：https://github.com/dromara/soul
>
> document：https://dromara.org/zh-cn/docs/soul/soul.html

## 1. Prepare source code

### 1.1. Fork [dromara/soul](https://github.com/dromara/soul.git) repository to my github [cchenxi/soul](https://github.com/cchenxi/soul.git)

### 1.2. Clone the repository

```shell
git clone https://github.com/cchenxi/soul.git
```

### 1.3.Open the source code with idea

### 1.4. Compile the soul source code

You can compile the project as follows.

```shell
mvn clean package install -Dmaven.test.skip=true -Dmaven.javadoc.skip=true -Drat.skip=true -Dcheckstyle.skip=true
```

![-w1723](/img/soul/01/16106054898861.jpg)

## 2. Startup `soul`

### 2.1. Startup `soul-admin` module

> `soul-admin` is the management system for soul.

Choose to use `MySQL` to storage gateway data and modify the datasource config.

![-w1186](/img/soul/01/16106065488032.jpg)


Run `org.dromara.soul.admin.SoulAdminBootstrap`.

When success, please visit the website `http://localhost:9095/`, then jump to the login page, and input the corresponding user name and password to log in.

The user name is `admin` and the password is `123456`.

![-w593](/img/soul/01/16106069731233.jpg)

![-w1262](/img/soul/01/16106073045599.jpg)



### 2.2. Startup `soul-bootstrap` module

> `soul-bootstrap` is the core of soul.

Check the configuration of `soul-bootstrap`.

![-w917](/img/soul/01/16106076385761.jpg)

Please make sure the ip and the port has been configured for `soul-admin`.

If the console output as follows, it means the startup is successful.

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

## 3. Test

> Add the `soul-examples` module to soul's pom.xml for test.

### 3.1. Startup an HTTP backend service

Startup `soul-examples-http`

You can see the dependency in `soul-examples-http`'s pom.xml.

```xml
<dependency>
    <groupId>org.dromara</groupId>
    <artifactId>soul-spring-boot-starter-client-springmvc</artifactId>
    <version>${soul.version}</version>
</dependency>
```

Configure the `application.yml`

```yaml
soul:
  http:
    adminUrl: http://localhost:9095
    port: 8188
    contextPath: /http
    appName: http
    full: false
```

If `soul.http.full`=false, you need to add the `@SoulSpringMvcClient` annotation in controller or controller method.

#### 3.1.1. Test the service

Visit `http://localhost:8188/test/findByUserId?userId=1` and the result as follows.

![-w684](/img/soul/01/16106235724795.jpg)

#### 3.1.2. Test forward HTTP request

Visit `http://localhost:9195/http/test/findByUserId?userId=1` and the result as follows.

![-w665](/img/soul/01/16106237733891.jpg)

You can see the following information in the console of `soul-bootstrap`. It means the forward HTTP request is successful.

```shell
2021-01-14 20:42:57.123  INFO 29812 --- [work-threads-11] o.d.soul.plugin.base.AbstractSoulPlugin  : divide selector success match , selector name :/http
2021-01-14 20:42:57.125  INFO 29812 --- [work-threads-11] o.d.soul.plugin.base.AbstractSoulPlugin  : divide selector success match , selector name :/http/test/**
2021-01-14 20:42:57.126  INFO 29812 --- [work-threads-11] o.d.s.plugin.httpclient.WebClientPlugin  : The request urlPath is http://172.27.121.155:8188/test/findByUserId?userId=1, retryTimes is 0
```

### 3.2. Startup two HTTP backend services to simulate load balance

Choose `Allow parallel run`

Change the port to `8189`

Startup `soul-examples-http` again

![-w1104](/img/soul/01/16106249542903.jpg)

#### 3.2.1. Test the service

Visit `http://localhost:8189/test/findByUserId?userId=1` and the result as follows.

![-w693](/img/soul/01/16106250513285.jpg)

#### 3.2.2. Test load balance

![-w1096](/img/soul/01/16106266610601.jpg)

Configure two HTTP service in selector

Visit `http://localhost:9195/http/test/findByUserId?userId=1` more and more and result as follows.

![-w595](/img/soul/01/16106267572581.jpg)
You can see the following information in the console of `soul-bootstrap`. It means the load balance is successful.

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

#### 3.2.3. Press test

Use `wrk` to press test and compare the two ways as follows.

1. Visit the backend service directly.
2. Visit the service via soul.

The performance drops slightly after using the gateway, probably because of the extra layer of forwarding.

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

#### 3.2.4. Problem in the process

When startup the port of `8189`，but the output of console is still `8188`.

![-w1675](/img/soul/01/16106270140398.jpg)

After modify the value of `soul.http.port`, the problem solved.

![-w520](/img/soul/01/16106405075031.jpg)

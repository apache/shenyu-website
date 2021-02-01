---
title: "【Soul gateway version2.2.0 release】Make high-performance gateways so easy!"
author: "xiaoyu"
description: "Soul released version 2.2.0 with new architecture that makes gateways so easy. "
categories: "Soul"
tags: ["Soul"]
date: 2020-06-17
cover: "../../img/architecture/soul-framework.png"
---

Let's take a look at the new features first, and then I would like to share my story.

- Completely pluggable architecture design, plug-in hot swap. 
- Fully supports all versions of Dubbo, Alibaba-Dubbo, Apache-Dubbo. 
- Support Dubbo generalization call, multi-parameter, complex parameter interface.
- Enhance the monitor plug-in and remove the Influxdb, add metrics such as memory, CPU, QPS, TPS, response delay, and support access to Prometheus. 
- The SpringCloud plugin supports Eureka and Nacos two registration centers. 
- The waf plugin is enhanced to support black or white lists and mixed modes. 
- Remove the Hystrix circuit breaker to be a independent plug-in. 
- Fix the Zookeeper data synchronization bug, and add the data synchronization method implemented by Nacos. 
- Support multiple kinds of soul-client, such as traditional Spring and Springboot. 
- Optimize the soul-admin user interface. 
- Fix load balancing algorithm bug. 
- Fix uploading large files bug. 
- etc.

## Experience the new architecture and get a high-availability and high-performance gateway in 10 minutes. 

### Bootstrap soul-admin

- Please Download soul-admin.jar, and bootstrap it.
```shell
> wget  https://yu199195.github.io/jar/soul-admin.jar
> java -jar soul-admin.jar --spring.datasource.url="jdbc:mysql://你的url:3306/soul?useUnicode=true&characterEncoding=utf-8&useSSL=false"  
  --spring.datasource.username='you username'  --spring.datasource.password='you password'
```
- Please access http://localhost:9095/index.html , and the default user name is `admin`, password is `123456`。

### Build your own gateway

- Firstly, you should create an empty springboot project, please refer to `soul-bootstrap`. You can also visit the spring official website :[https://spring.io/quickstart]
- Secondly, please add Maven dependency like follows：

```xml
  <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webflux</artifactId>
        <version>2.2.2-RELEASE</version>
  </dependency>

  <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
        <version>2.2.2-RELEASE</version>
  </dependency>

  <!--soul gateway start-->
  <dependency>
        <groupId>org.dromara</groupId>
        <artifactId>soul-spring-boot-starter-gateway</artifactId>
        <version>2.2.0</version>
  </dependency>

   <!--soul data sync start use websocket-->
   <dependency>
        <groupId>org.dromara</groupId>
        <artifactId>soul-spring-boot-starter-sync-data-websocket</artifactId>
        <version>2.2.0</version>
   </dependency>
```

- Please add the following configuration to your `application.yaml` file: 
```yml
spring:
   main:
     allow-bean-definition-overriding: true

management:
  health:
    defaults:
      enabled: false
soul :
    sync:
        websocket :
             urls: ws://localhost:9095/websocket  //Set to youe soul-admin address.
```

- In this way, the gateway environment has been set up.

## Experience plug-in hot swap under the new architecture
- Q: If I want to use circuit breaker, what should I do?

- A: You can add the following dependencies in the `pom.xml` file, please access https://dromara.org/zh-cn/docs/soul/soul.html for details.
```xml
  <!-- soul hystrix plugin start-->
  <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-hystrix</artifactId>
      <version>2.2.0</version>
  </dependency>
  <!-- soul hystrix plugin end-->
```
- Q: How can I use dubbo service?
- A: If you are using alibaba-dubbo, then you should add the following dependencies in the `pom.xml` file.
```xml
   <!--soul alibaba dubbo plugin start-->
    <dependency>
          <groupId>org.dromara</groupId>
          <artifactId>soul-spring-boot-starter-plugin-alibaba-dubbo</artifactId>
          <version>2.2.0</version>
    </dependency>
   <!-- soul alibaba dubbo plugin end-->
```
 If you are using apache-dubbo, then you should add the following dependencies in the `pom.xml` file.

```xml
   <!--soul apache dubbo plugin start-->
    <dependency>
          <groupId>org.dromara</groupId>
          <artifactId>soul-spring-boot-starter-plugin-apache-dubbo</artifactId>
          <version>2.2.0</version>
    </dependency>
   <!-- soul apache dubbo plugin end-->
```
For your inference: https://dromara.org/zh-cn/docs/soul/user-dubbo.html

- Q: What if I want to use the current limiting function?

- A: You can add the following dependencies, for your inference: https://dromara.org/zh-cn/docs/soul/plugin-rateLimiter.html 
```xml
  <!-- soul ratelimiter plugin start-->
  <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-ratelimiter</artifactId>
      <version>2.2.0</version>
  </dependency>
  <!-- soul ratelimiter plugin end-->
```
All in all, If you want to use some plug-ins, then you can add the Mave dependency in the `pom.xml`, but this is not called hot pluggable.

- Q: What should I do if I don’t want to use some plug-ins? 
- A: You can disable or enable the plug-in in the soul-admin. That is hot pluggable.

## Features of Soul Gateway

* I think the biggest feature is in traffic screening and control. No matter how complex the request is, traffic can be filtered, filtered, and processed according to various conditions, rules, and matching methods. This process is completely visualized, customized and effective immediately, without any changes to the program.

- Each configuration is configured in the soul-admin console and will be synchronized to the JVM memory of each Soul gateway node. This is also the key point of the high performance of the Soul cluster. Inside the soul gateway, http long polling, websocket, Zookeeper are used In other ways.
- Soul gateway uses Reactor code to achieve the independent thread scheduling, low consumption. When we open 10 plug-ins, the delay of all traffic passing through the gateway is 1~2ms.
- The plug-in mechanism provides functions such as rate limiting, circuit breaker, black and white list, authentication, etc.
- Support A/B test, blue and green release (because all traffic is controlled, this is easy to do).

## What scenarios of Soul gateway are common, and what should you pay attention to?

First of all, I think we should follow pragmatism, when you need to use it , then you have monmentum to know it. Thus, where are you need Soul?

### Scenario1: Adimistration backend

- First of all, as rising popularity of microservices, our back-end is divided into many micro-services. I believe that your companies has a back-end management system. I guess they generally have the following architecture .
![soul-admin](soul-admin.png)
- It may cause some troubles as follows:
    - The developers of every microservice are developing on this, which will become more and more cumbersome.

    - How to publish without downtime? If you want to publish the commodity module, all other modules will not be able to work at this time.

    - If a certain module interface requires a lot of requests (multiple deployments are required), and another module does not need it, how can you split it?
- Some people may say I can disassemble them into a few web projects. But this will bring a new trouble, where to do load balance? Where to do unified certification? 
- Soul gateway solves all the above problems very well, just register your microservice to Soul gateway. You can do whatever you want. For example, the order module has 2 nodes, and you want to release a new version, you can send request to one of them in the gateway, and update the version in the other node. When update complete, let the request go though both two nodes. So Java programmer can also do the jod of maintaner's.
- If you need unified authentication, you only need to add an authentication plug-in suitable for your business to the gateway.

### Scenario2: Company entrance gateway (open platform)

- If a company wants to do open-platform or an entry gateway, authentication, rate limiting, circuit breaker, monitoring are required.
- If your company is in Dubbo system, after the developers have written the dubbo service, should they add a new web project to provide an interface for others?
-  If an interface attacked by a large amount of traffic, how do you deal with it?
- Soul is here to do this kind of thing at the beginning of the design. Let’s take a look at the overall architecture diagram. 

![soul-framework](soul-framework.png)

- Soul gateway is implemented using reactive programming.  Just look at the weather vane Spring, responsive programming is definitely an important direction in the future. When I was in 2014, I wrote for loop  every day. The leader told me to use lambda expressions, which is the trend of the future. Nowadays, if you are a java programmer but don't know lambda expression, you are out.
## From the release of 2.2.0, I want to share my open source experience in these years. 
I started writing open source projects when I was in 2017. At first, I discussed  LCN project distributed transactions with Wang Liang. Later, I wrote distributed transaction middleware such as Hmily, Raincat, Myth, etc., and then wrote the Soul gateway, I encountered many interesting things along the way, and suffered from many novice users. The general feeling is that a good open source project, high extensiable, and pluggable design are really important.

- Case 1: Soul gateway only supports Zookeeper mode at the beginning of data synchronization. Some users have reported that we do not have zk, What should we do?
- Case 2: Soul gateway supports Dubbo, but some users are alibaba-dubbo and some users are apache-dubbo, What should we do?
- Case 3: The clients provided by soul at the beginning are all based on Springboot. Some users are traditional Spring. What should we do?

So plug-in design, SPI pluggable design is imperative.

**SPI VS pluggability**

It is true that the SPI expansion method is the cornerstone of pluggability, but they are not completely equivalent. Give an example: If we store a piece of data first, you have set the SPI interface, and there are many ways to achieve it, such as Mysql, Mongodb, Elasticseach, Zookeeper, etc. Now you have to consider whether to combine it in the project or put it in different Projects, packaged and loaded on demand? These are all things to be considered, so the SPI method cannot be a sure card.

**checkStyle**

- Strict code specification is a respect for framework users in source code learning, and it is an open source attitude.

- Strict code specifications make people look comfortable and make it easier for people to understand the entire code.

- I also hope that when you submit a PR, at least the local installation must be successful. Some PRs before, in order not to discourage their enthusiasm, we shed tears after the merger.

**Participate in open source**

- At present, I mainly focus on Apache ShardingSphere, which is the first top-level project on database sub-database and table organized by Chinese in Apache. Welcome everyone to participate. https://github.com/apache/shardingsphere.

- The Chinese people lag far behind in terms of open source and technology as large as chips and as small as MATLAB. I also hope that everyone has an open source mentality, participates in open source, learns technology, propagates ideas, and continues to learn for the future! 


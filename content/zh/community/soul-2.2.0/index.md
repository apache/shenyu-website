---
title: "【ShenYu网关发布2.2.0】让高性能网关变得如此简单！"
author: "xiaoyu"
description: "Soul发布全新的架构2.2.0版本 让网关变得如此简单"
categories: "ShenYu"
tags: ["ShenYu"]
date: 2020-06-17
cover: "/img/architecture/shenyu-framework.png"
---

我们还是先来看看新增功能，然后再讲故事。

- 完全的插件化架构设计，插件热插拔。
- 完整支持dubbo所有版本，alibaba-dubbo ，apache-dubbo。
- 支持dubbo泛化调用，多参数，复杂参数接口。
- 增强monitor插件，移除influxdb支持，新增内存，CPU，QPS，TPS，响应迟延等metrics，支持接入Prometheus。
- springCloud插件支持eureka与nacos二种注册中心。
- waf插件增强,支持黑白名单，以及混合模式。
- 抽离Hystrix熔断功能，独立成插件支持。
- 修护Zookeeper数据同步方式bug，新增nacos同步数据方式。
- 多种soul-client支持，提供传统spring，以及springboot等方式接入。
- 优化 soul-admin后台控制界面。
- 负载均衡算法bug修护。
- 修护大文件上传时候的bug。
- …….太多了不一一列举了。

## 体验新架构，10分钟搞定一个高可用高性能网关。

**启动 soul-admin**
- 下载soul-admin.jar包，并启动.
```
> wget  https://yu199195.github.io/jar/soul-admin.jar
> java -jar soul-admin.jar --spring.datasource.url="jdbc:mysql://你的url:3306/soul?useUnicode=true&characterEncoding=utf-8&useSSL=false"  
  --spring.datasource.username='you username'  --spring.datasource.password='you password'
```
- 访问 http://localhost:9095/index.html 默认的用户名：admin  密码:123456。

**搭建属于你的网关**

- 首先你新建一个空的springboot项目，可以参考 soul-bootstrap. 也可以在spring官网:[https://spring.io/quickstart]
- 引入如下jar包：

```
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

- 在你的 `application.yaml` 文件中加上如下配置：
```
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
             urls: ws://localhost:9095/websocket  //设置成你的soul-admin地址
```

- 这样网关的环境就已经搭建完成。

## 体验新架构下的插件热插拔
- 问：我想使用熔断功能，应该如何做呢？

- 答：你可以在pom.xml文件 引入以下依赖,更多的还请看：https://dromara.org/zh-cn/docs/soul/soul.html
```
  <!-- soul hystrix plugin start-->
  <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-hystrix</artifactId>
      <version>2.2.0</version>
  </dependency>
  <!-- soul hystrix plugin end-->
```
- 问:我怎么接入dubbo服务呢？

- 答：
1）如果你使用的是alibaba-dubbo，那么你应该引入如下：
```
   <!--soul alibaba dubbo plugin start-->
    <dependency>
          <groupId>org.dromara</groupId>
          <artifactId>soul-spring-boot-starter-plugin-alibaba-dubbo</artifactId>
          <version>2.2.0</version>
    </dependency>
   <!-- soul alibaba dubbo plugin end-->
   ```
2） 如果你使用apache-dubbo，那么你应该引入如下：
```
   <!--soul apache dubbo plugin start-->
    <dependency>
          <groupId>org.dromara</groupId>
          <artifactId>soul-spring-boot-starter-plugin-apache-dubbo</artifactId>
          <version>2.2.0</version>
    </dependency>
   <!-- soul apache dubbo plugin end-->
   ```
3) 更多的使用请你参考：https://dromara.org/zh-cn/docs/soul/user-dubbo.html
- 问：如果我想使用限流功能呢？

- 答：你可以引入以下依赖，具体的参考：https://dromara.org/zh-cn/docs/soul/plugin-rateLimiter.html
```
  <!-- soul ratelimiter plugin start-->
  <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-ratelimiter</artifactId>
      <version>2.2.0</version>
  </dependency>
  <!-- soul ratelimiter plugin end-->
  ```
- 总而言之，你想要使用什么插件，你就新增该插件的依赖。就这？是热插拔么。。
- 问：那有些插件我不想用了怎么办？
- 答：在soul-admin后台禁用该插件即可，想用就开启。

## ShenYu网关的特性

- 我觉得最大的特色是在流量筛选和管控方面。无论多复杂的请求，可以根据各种条件，规则，匹配方式，来进行流量过滤，筛选，处理。这个过程完全是可视化，自定义，即时生效的，程序无需任何更改。
- 每个配置都在soul-admin 控制台配置，会同步到每个ShenYu网关节点的JVM内存，这也是Soul集群高性能的关键之一，在soul网关内部，使用了http长轮询，websocket，zookeeper等方式，独立实现了分布式配置中心的功能。
- ShenYu网关使用Reactor编程方式来实现，独立了线程调度，低消耗，经过网关的流量，我们在开启10个插件都处理的情况下，延迟是1~2ms。
- 插件机制，默认提供了限流，熔断，黑白名单，认证等等插件。
- 支持A/B test，蓝绿发布（因为掌控了所有流量这个很容易做）。

## ShenYu网关有哪些使用场景，又有哪些值得你关注或者学习的？

首先我觉得还是实用主义，需要用到,才会去了解。那么在什么场景下，你需要用到呢？

**后台管理web**

- 首先随便微服务的流行，我们的后台都划分成很多的微服务，我相信你们每个公司都有一个后台管理系统吧，如果我没猜错的话，他们大体上是如下架构。
![soul-admin](soul-admin.png)

- 它会有什么问题呢？大家思考一下。
    - 每个微服务项目的开发人员都在这上面进行开发，会越来越笨重。

    - 如何不停机发布的问题？你要发布商品模块的接口，会造成所有其他的模块使用不了。

    - 假如某一个模块接口的请求量很大（需要部署多个），另一个模块不需要，你又怎么拆分呢？

- 有人又会说，那我把他们拆处理，拆成一个一个web不就行了么？但是这样又会带来一个新的问题，负载均衡在哪里做？统一的认证在哪里做？
- ShenYu网关就很好了解决了以上所有问题，只需要把你的微服务注册到ShenYu网关。你想怎么玩都可以，不重样的.. 比如 order模块有2个应用，你要发布新的版本，你可以在网关里面，把流量先打到其中一个，另一个进行更新，更新完了以后，再把流量放过去。改变了以前运维掌控一切的观念，java程序员，也可以玩的更好，运维都省了，向老板申请加薪指日可待。
- 需要统一鉴权？你只需要在网关新增一个适合自己业务的鉴权插件就OK。
**公司入口网关（开放平台）**
- 如果一个公司要做开放平台或者入口网关，鉴权，限流，监控，熔断肯定少不了。
- 如果贵公司是dubbo体系，开发人员写了dubbo服务后，还要傻乎乎的新增一个web项目，来提供接口给别人调用吗？
- 如果一个接口被攻击，你怎么处理呢？如果被大流量攻击，你怎么处理呢？
- 不巧，soul 在设计之初就是来干这种事情的，我们来看一下整体的架构图。

![soul-framework](/img/architecture/shenyu-framework.png)

- ShenYu网关是使用响应式编程实现的，响应式编程绝对是未来 java邻域的重要方向，看风向标Spring体系就好了。我在14年的时候，天天写for循环操作集合，溜的一笔。领导对我说，要使用lambda表达式，这是未来的重点，今天来看，如果你是java程序员，你不会lambda函数式编程，你好意思么。
## 从发布2.2.0，谈谈近几年的开源体会。
我是17年左右的时候，开始写开源项目的，最开始我和王亮一起讨论设计了LCN分布式事务，后面自己又陆续写了Hmily，Raincat，Myth等分布式事务中间件，再后来写了ShenYu网关，这一路走来，遇到很多很有意思的事，也遭受很多小白用户的摧残。总的感觉，一个好的开源项目，高扩展，可插拔的设计实在太重要了。

- 案例一：ShenYu网关刚开始数据同步只支持Zookeeper方式，有些用户反馈，我们没有zk，那怎么办？
- 案例二 ：ShenYu网关是支持Dubbo的，但是有些用户是alibaba-dubbo，有些用户apache-dubbo，你又怎么说？
- 案例三 ：soul刚开始提供的客户端都是基于Springboot的，有些用户是传统的Spring，你又怎么说？

所以插件化设计，SPI可插拔设计势在必行。

**SPI VS 可插拔**

诚然SPI扩展方式，是可插拔的基石，但是他们又不完全等同。举个列子：假如我们先存储一条数据，你定好了SPI接口，也有Mysql，mongodb，elasticseach，zookeeper等等多种方式实现，现在你要考虑的是把它组合在一起项目里面，还是放在不同的项目，按需打包和加载呢？这些都是要考虑的，所以不能一股脑的SPI方式。

**checkStyle**

- 严格的代码规范，是对源码学习中，框架使用者的尊重，更是一种开源的态度。

- 严格的代码规范，让人看起来舒服，也更容易让人理解整个代码。

- 也希望各位小伙伴提交PR的时候，至少本地要Install成功，之前有些PR，为了不打击他们的积极性，合并之后流着泪修改。

**参与开源**

- 目前我主要专注于Apache ShardingSphere，这是中国人在apache组织的第一个关于数据库分库分表的顶级项目，欢迎大家参与进来。https://github.com/apache/shardingsphere。

- 国人在开源方面，技术方面大到芯片，小到MATLAB ，都落后挺多的，也希望大家拥有开源的心态，多参与开源，学习技术，宣传思想，为往圣继绝学！

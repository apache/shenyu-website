---
title: "Raincat 介绍"
aliases: "/raincat/docs/Home"
---

Raincat
================

强一致性分布式事务，是基于二阶段提交+本地事务补偿机制来实现。[原理介绍](http://www.hollischuang.com/archives/681)

基于java语言来开发（JDK1.8），支持dubbo,motan,springcloud进行分布式事务。

#####  因为文件名太长，大家在拉取代码的时候执git命令：git config --global core.longpaths true

 # Features

  * **框架特性**

      * 无缝集成spring 或 spring boot。

      * 支持dubbo,motan,springcloud,等rpc框架进行分布式事务。

      * 事务发起者，参与者与协调者底层基于netty长连接通信,稳定高效。

      * 协调者采用eureka做注册中心，支持集群模式。

      * 采用Aspect AOP 切面思想与Spring无缝集成。

      * 配置简单，集成简单，源码简洁，稳定性高，已在生产环境使用。

      * 内置经典的分布式事务场景demo工程，并有swagger-ui可视化界面可以快速体验。


 * ***事务角色***

   * 事务发起者（可理解为消费者 如：dubbo的消费者,springcloud的调用方）,发起分布式事务

   * 事务参与者（可理解为提供者 如：dubbo的提供者,springcloud的rest服务提供者),参与事务发起者的事务

   * 事务协调者（tx-manager），协调分布式事务的提交，回滚等。

 * ***技术方案***

   * 协调者（tx-manager）采用eureka作为注册中心，集群配置，达到服务的高可用，采用redis集群来分布式存储事务数据, springboot 提供rest服务，采用netty与参与者，发起者进行长连接通信。

   * 发起者与协调者，采用Aspect AOP 切面思想，SPI，多线程，异步回调，线程池，netty通信等技术。


 * ***SPI扩展***
     * 本地事务恢复，支持redis，mogondb，zookeeper，file，mysql等关系型数据库
     * 本地事务序列化保存，支持java，hessian，kryo，protostuff
     * netty通信序列化方式，支持 hessian，kryo，protostuff

# Prerequisite

  *   #### JDK 1.8+

  *   #### Maven 3.2.x

  *   #### Git

  *   ####  RPC framework dubbo or motan or springcloud。

# 架构设计

* 架构设计图 ：
![架构设计图](https://raw.githubusercontent.com/wiki/yu199195/happylifeplat-transaction/design.png)

* 流程图 ：
  
     ![流程图](https://yu199195.github.io/images/Raincat/2pc.png)

# 视频源码分析

 ### [环境搭建](http://www.iqiyi.com/w_19s0ngjah5.html)
 
 ### [启动过程](http://www.iqiyi.com/w_19s0ndc5vh.html)
 
 ### [事务提交](http://www.iqiyi.com/w_19s0ndc8f1.html)
 
 ### [回滚恢复](http://www.iqiyi.com/w_19s0nmod9t.html)
 
 ### [管理后台](http://www.iqiyi.com/w_19s0nj1bjx.html)


# Support

 * ###  如有任何问题欢迎加入QQ群进行讨论
   ![](https://yu199195.github.io/images/qq.png)

 * ###  微信公众号
   ![](https://yu199195.github.io/images/public.jpg)

 # Contribution

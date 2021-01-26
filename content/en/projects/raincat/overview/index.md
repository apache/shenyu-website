---
title: "Raincat Introduction"
aliases: "/raincat/docs/Home"
description: Raincat is a strongly consistent distributed transaction framework based on a two-phase commit + local transaction compensation mechanism.
---

# Raincat

Strongly consistent distributed transactions are implemented based on two-phase commit + local transaction compensation mechanism. [Principle ](http://www.hollischuang.com/archives/681)

and it is based on Java language (JDK1.8), supports dubbo, motan, springcloud for distributed transactions.

Because the file name is too long, you can executes `git config --global core.longpaths true` when pulling the code.

## Features

  * **Frame features**
* Seamlessly integrate spring or spring boot.
      
* Support dubbo, motan, springcloud, and other RPC frameworks for distributed transactions.
      
* Transaction initiator, participant and coordinator are based on bottom layer netty long connection communication which is stable and efficient.
      
* The coordinator uses eureka as the registry center and supports cluster mode.
      
* Use Aspect AOP to integrate seamlessly with Spring.
      
* The configuration, integration and source code are concise. It has been used in the production environment with high stability.
      
* It has been provided built-in classic distributed transaction scenario demo, and you can use swagger-ui visual interface for quick experience.


 * **The role in transaction**
* The transaction initiator which can be understood as a consumer, such as: dubbo consumer, springcloud caller, used for initiating a distributed transaction.
   
* Transaction participants which can be understood as providers such as: dubbo provider, springcloud rest service provider, participating in the transaction of the transaction initiator.
   
* Transaction coordinator (tx-manager), which coordinates the submission and rollback of distributed transactions.
   
 * **Technical solutions**
* The coordinator (tx-manager) uses Eureka as the registry center to do cluster configuration for high availability, and use Redis cluster to storage distributed transaction data. Rest services is provided by Springboot, and Netty is used to communicate with participants and initiators for long connections.
   
* The initiator and the coordinator use Aspect AOP, SPI, multi-threading, asynchronous callback, thread pool, netty communication, etc.


 * **SPI扩展**
     * Local transaction recovery support Redis, Mogondb, Zookeeper, File, Mysql and other relational databases.
     * Local transaction serialization support Java, Hessian, Kryo, Protostuff.
     * Netty communication serialization support Hessian, Kryo, Protostuff.

## Prerequisite

* **JDK 1.8+**

* **Maven 3.2+**

* **Git**

* **RPC framework Dubbo or Motan or Springcloud**

## Architecture

* **Architecture**：
![架构设计图](https://raw.githubusercontent.com/wiki/yu199195/happylifeplat-transaction/design.png)

* 流程图 ：
  
     ![流程图](https://yu199195.github.io/images/Raincat/2pc.png)

## Video

 ### [Environment ](http://www.iqiyi.com/w_19s0ngjah5.html)

 ### [Bootstrap](http://www.iqiyi.com/w_19s0ndc5vh.html)

 ### [Commitment ](http://www.iqiyi.com/w_19s0ndc8f1.html)

 ### [Rollback](http://www.iqiyi.com/w_19s0nmod9t.html)

 ### [Administration ](http://www.iqiyi.com/w_19s0nj1bjx.html)


# Support

 * ###  If you have any questions, please join the QQ group for discussion 
   ![](https://yu199195.github.io/images/qq.png)

 * ###  WeChat public account 
   ![](https://yu199195.github.io/images/public.jpg)

 # Contribution

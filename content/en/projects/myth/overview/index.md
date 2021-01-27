---
title: Myth Introduction
description: Myth Introduction
---

An open source framework that uses message queue to solve distributed transactions. Developed based on Java language (JDK1.8), it supports Dubbo, SpringCloud, Motan and other RPC frameworks for distributed transactions.

## Features

* Integrate  spring-boot-starter.
* RPC framework support: dubbo,motan,springcloud.
* Message middleware suooprt : jms(activimq), amqp(rabbitmq), kafka, roceketmq.
* Local transaction storage support: redis, mogondb, zookeeper, file, mysql.
* Transaction log serialization support ：java，hessian，kryo，protostuff.
* Aspect AOP facets are used to integrate with Spring and support clustering, high availability and high concurrency.
* Simple configuration, simple integration, simple source code, high stability, has been used in the production environment.
* Built-in classic distributed transaction scene Demo project, and Swagger-UI visual interface can be quickly experienced.


## Parsing the source code

* https://juejin.im/post/5a5c63986fb9a01cb64ec517 

## Video

* [Setup  environment and running](http://www.iqiyi.com/w_19rw5zuigl.html)
* [Explain principle(one)](http://www.iqiyi.com/w_19rw5ztpkh.html)
* [Explain principle(two)](http://www.iqiyi.com/w_19rw5zslm1.html)

## Prerequisite

* JDK 1.8+
* Maven 3.2.x
* Git
* RPC framework dubbo or motan or springcloud。
* Message Oriented Middleware

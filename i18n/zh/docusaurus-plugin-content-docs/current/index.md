---
sidebar_position: 1
title: Apache ShenYu 介绍
keywords: ["Apache shenyu"]
description: Apache ShenYu 是一个异步的，高性能的，跨语言的，响应式的`API`网关。
---

# 什么是 Apache ShenYu

这是一个异步的，高性能的，跨语言的，响应式的 `API` 网关。

# 功能

* 支持各种语言(http 协议)，支持 Dubbo、 Spring Cloud、 gRPC、 Motan、 Sofa、 Tars 等协议。
* 插件化设计思想，插件热插拔，易扩展。
* 灵活的流量筛选，能满足各种流量控制。
* 内置丰富的插件支持，鉴权，限流，熔断，防火墙等等。
* 流量配置动态化，性能极高。
* 支持集群部署，支持 A/B Test，蓝绿发布。

# 架构图

![](/img/architecture/shenyu-framework.png)

# 脑图

![](https://shenyu.apache.org/img/shenyu/activite/shenyu-xmind.png)


# 模块

 * shenyu-admin : 插件和其他信息配置的管理后台

 * shenyu-bootstrap : 用于启动项目，用户可以参考

 * shenyu-client : 用户可以使用 Spring MVC，Dubbo，Spring Cloud 快速访问
 
 * shenyu-disruptor : 基于disruptor的封装
  
 * shenyu-register-center : shenyu-client提供各种rpc接入注册中心的支持
  
 * shenyu-common : 框架的通用类

 * shenyu-dist : 构建项目

 * shenyu-metrics : prometheus（普罗米修斯）实现的 metrics

 * shenyu-plugin : ShenYu 支持的插件集合

 * shenyu-spi : 定义 ShenYu spi

 * shenyu-spring-boot-starter : 支持 spring boot starter

 * shenyu-sync-data-center : 提供 ZooKeeper，HTTP，WebSocket，Nacos 的方式同步数据

 * shenyu-examples : RPC 示例项目

 * shenyu-web : 包括插件、请求路由和转发等的核心处理包


# 关于

Apache ShenYu 已经被很多公司广泛使用在越来越多的业务系统，它能以高性能和灵活性让我们方便快捷的集成自己的服务和 API 。

在中国的双 11 购物狂欢节中，Apache ShenYu集群成功支撑了海量的互联网业务。

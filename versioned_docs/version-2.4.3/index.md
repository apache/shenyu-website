---
sidebar_position: 1
title: Overview
keywords: ["Apache shenyu"]
description: This is an asynchronous, high-performance, cross-language, responsive API gateway.
aliases: "/shenyu/docs/Home"
---

# What is the Apache ShenYu?

This is an asynchronous, high-performance, cross-language, responsive API gateway.

# Features

* Support various languages (http protocol), support Dubbo, Spring Cloud, gRPC, Motan, Sofa, Tars and other protocols.
* Plugin design idea, plugin hot swap, easy to expand.
* Flexible flow filtering to meet various flow control.
* Built-in rich plugin support, authentication, limiting, fuse, firewall, etc.
* Dynamic flow configuration, high performance.
* Support cluster deployment, A/B Test, blue-green release.

# Architecture Diagram

![](/img/architecture/shenyu-architecture-3d.png)


# Mind maps

 ![](/img/shenyu/activite/shenyu-xmind.png)

--------------------------------------------------------------------------------  

# Modules

 * shenyu-admin : plugins and other configuration information management background

 * shenyu-bootstrap : with the startup project, users can refer to

 * shenyu-client : user fast access with Spring MVC, Dubbo, Spring Cloud.

 * shenyu-common : framework common class

 * shenyu-disruptor : based on disruptor Enclosure

 * shenyu-register-center : rpc type register for shenyu-client

 * shenyu-dist : build project

 * shenyu-metrics : metrics impl by prometheus.

 * shenyu-plugin : ShenYu provider plugin collection.

 * shenyu-spi : ShenYu spi define.

 * shenyu-spring-boot-starter : support for the spring boot starter

 * shenyu-sync-data-center : provider ZooKeeper, HTTP, WebSocket, Nacos to sync data

 * shenyu-examples : the RPC examples project

 * shenyu-web : core processing packages including plugins, request routing and forwarding, and so on


# About

Apache ShenYu has been used widely in more and more systems in many companies, and it's simple and convenient to integrate Services/APIs with the high performance and flexibility.

In double eleven online shopping carnival of China, ShenYu clusters successfully supported a large volume of internet business.

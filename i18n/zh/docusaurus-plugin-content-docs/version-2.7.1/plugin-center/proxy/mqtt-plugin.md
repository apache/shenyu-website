---
title: Mqtt 插件
keywords: ["Mqtt"]
description: Mqtt 插件
---

## 描述

* 当前 MQTT 协议实现为 3.1 版本，实现的标识值为 `connect`、`publish`、`subscribe`、`unsubscribe`、`disconnect`、`PingReq`、`PingResp`，以及 QoS 0。
  
* 缺少 retain、Qos（1，2） 实现，以及集群模式。

* 具体请看 http://public.dhe.ibm.com/software/dw/webservices/ws-mqtt/mqtt-v3r1.html 内容

## 引入 Mqtt 网关的插件支持

* 在网关的 pom.xml 文件中引入这些依赖项。

```xml
<!-- apache shenyu mqtt plugin start-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-mqtt</artifactId>
    <version>${project.version}</version>
</dependency>
```

## 插件配置

* port：Mqtt监听端口。

* bossGroupThreadCount：Netty主线程池大小，默认为1。

* maxPayloadSize：最大有效载荷大小。

* workerGroupThreadCount：Netty子线程池大小，默认为12。

* username：用户名，默认为`shenyu`。

* password：密码，默认为`shenyu`。

* isEncryptPassword：是否加密密码，默认为 false 。

* encryptMode：加密模式，目前仅支持MD5，其他加密方式可以自行实现，相关可以参考`org.apache.shenyu.protocol.mqtt.utils.EncryptUtil`这个加密工具类的实现。

* leakDetectorLevel：资源泄露检测级别，默认DISABLED。

## 注意

* Mqtt插件没有选择器配置和规则配置。

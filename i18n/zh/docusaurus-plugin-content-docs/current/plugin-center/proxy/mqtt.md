---
title: Mqtt 插件
keywords: ["Mqtt"]
description: Mqtt 插件
---

## 描述

* 当前 MQTT 协议实现为 3.1 版本，实现的标识值为 `connect`、`publish`、`subscribe`、`unsubscribe`、`disconnect`，以及 QoS 0。
  
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

* port：指定 MQTT BS 端口。

* bossGroupThreadCount：默认 1。

* maxPayloadSize：最大报文大小。

* workerGroupThreadCount：默认 12。

* userName：默认 shenyu。

* password：默认 shenyu。

* isEncryptPassword：默认 false ，是否加密密码。

* encryptMode：加密模式，当前实现只有MD5，可自定义加密模式，`org.apache.shenyu.protocol.mqtt.utils.EncryptUtil` 查看这个类的实现。

* leakDetectorLevel：默认 DISABLED ，资源泄露检测级别。

## 注意

mqtt 没有 selector 以及 ruler 这些配置。

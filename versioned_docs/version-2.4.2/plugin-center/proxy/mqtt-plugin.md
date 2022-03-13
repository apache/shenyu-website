---
title: Mqtt Plugin
keywords: ["Mqtt"]
description: Mqtt access shenyu gateway
---

## Description

* After the plugin is used, it will give the ability of mqtt.

## Introducing Plugin Support of Mqtt Gateway

* Introducing those dependencies in the pom.xml file of the gateway.

```xml
<!-- apache shenyu mqtt plugin start-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-mqtt</artifactId>
    <version>${project.version}</version>
</dependency>
```

## Plugin Setting

* Port: MQTT BS port designation.

* bossGroupThreadCount: default 1.

* maxPayloadSize: Maximum packet size.

* workerGroupThreadCount: default 12.

* Username: default shenyu.

* Password: default shenyu.

* isEncryptPassword: The default is false , whether to encrypt the password.

* encryptMode: encryption mode, currently only MD5 is implemented, the encryption mode can be customized, `org.apache.shenyu.protocol.mqtt.utils.EncryptUtil` view the implementation of this encryption class.

* Leak level: disabled by default, resource target detection or detection level.
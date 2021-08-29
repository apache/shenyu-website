---
title: Sofa Plugin
keywords: ["sofa"]
description: sofa access soul gateway
---

## Description

* The sofa plug-in is a plug-in that converts the HTTP protocol into the sofa protocol, and it is also the key to the gateway to realize the sofa generalization call.
* sThe sofa plug-in needs to cooperate with metadata to realize the call of Dubbo. Please refer to: [Metadata](../design/meta-data)。

```xml
<dependency>
    <groupId>org.dromara</groupId>
    <artifactId>soul-spring-boot-starter-plugin-sofa</artifactId>
    <version>${last.version}</version>
</dependency>
```

## Plugin Settings

* First, go to `soul-admin` --> plug-in management->  setting `sofa` is open.
* Then, in the configuration of sofa plug-in, config sofa's register center like this: 
```yaml
{"protocol":"zookeeper","register":"127.0.0.1:2181"}
```
* The plug-in needs to be used with a dependent `starter`. For details, please see: [user-sofa](../users-guide/sofa-rpc-proxy).

* Selector's rules，see : [selector](../admin/selector-and-rule)。

## Plugin Metadata

* Each sofa interface method corresponds to a piece of metadata, which can be viewed in the soul-admin > metadata management.
* `url`: It's your http urls.
* RPC extension parameter, corresponding to some configuration of sofa interface.If you wanna be modify it, please modify it here. Support JSON format. The following fields:

```yaml
{"loadbalance":"hash","retries":3,"timeout":-1}
```



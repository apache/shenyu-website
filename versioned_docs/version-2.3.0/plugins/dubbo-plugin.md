---
sidebar_position: 2
title: Dubbo Plugin
keywords: ["dubbo"]
description: dubbo plugin
---

## Explanation

* Dubbo is a plugin that converts `http protocol` into `Dubbo protocol` and it is also the key for gateway to realize dubbo generic service.
* Dubbo plugin needs to cooperate with metadata to realize dubbo calls, please refer to: [metaData](../design/meta-data).
* Apache dubbo and alibaba dubbo users both use the same plugin.

```xml
  <!--if you use dubbo start this-->
   <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-spring-boot-starter-plugin-alibab-dubbo</artifactId>
       <version>${last.version}</version>
   </dependency>

   <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-spring-boot-starter-plugin-apache-dubbo</artifactId>
       <version>${last.version}</version>
   </dependency>
```

## Plugin Setting

* In `soul-admin` --> plugin management-> `dubbo` setting enable.

* In the configuration of dubbo plugin, the configuration is as follows: Configure the registration center of dubbo.

```yaml
{"register":"zookeeper://localhost:2181"} or {"register":"nacos://localhost:8848"} 
```
* Plugin needs to cooperate with `starter` to take effect, please refer to: [user-dubbo](../users-guide/dubbo-proxy).

* Selectors and rules, please refer to: [selector](../admin/selector-and-rule).

## Metadata

* Every dubbo interface method corresponds to a piece of metadata, which can be found in soul-admin -->metadata management.
* Path: your http request.
* RPC extension parameters, corresponding to some configurations of dubbo interface; If you want to adjust, please modify here, which support json format like the following fields:

```yaml
{"timeout":10000,"group":"",version":"","loadbalance":"","retries":1}
```



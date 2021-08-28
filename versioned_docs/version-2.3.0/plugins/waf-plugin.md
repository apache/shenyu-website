---
title: Waf Plugin
keywords: ["waf"]
description: waf plugin
---

## Explanation

* Waf is the core implementation of gateway to realize firewall function for network traffic.

## Plugin Setting

* In `soul-admin` --> plugin management-> `waf` set to enable.
* If the user don't use, please disable the plugin in the background.
* Add configuration mode in plugin editing.

```yaml
{"model":"black"}  
# The default mode is blacklist mode; If setting is mixed, it will be mixed mode. We will explain it specifically below.
```

## Plugin Setting

* Introducing `waf` dependency in the pom.xml of the gateway.

```xml
  <!-- soul waf plugin start-->
  <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-waf</artifactId>
      <version>${last.version}</version>
  </dependency>
  <!-- soul waf plugin end-->
``` 

* Selectors and rules, please refer to : [selector](../selector-and-rule)
* When `model` is set to `black` mode, only the matched traffic will execute the rejection policy, and the unmatched traffic will be skipped directly.
* When `model` is set to `mixed` mode, all traffic will pass through waf plugin. For different matching traffic, users can set whether to reject or pass.

## Situation

* Waf is also the pre-plugin of soul, which is mainly used to intercept illegal requests or exception requests and give relevant rejection policies.
* When faced with replay attacks, you can intercept illegal ip and host, and set reject strategy according to matched ip or host.
* How to determine ip and host, please refer to: [parsing-ip-and-host](../custom-parsing-ip-and-host)

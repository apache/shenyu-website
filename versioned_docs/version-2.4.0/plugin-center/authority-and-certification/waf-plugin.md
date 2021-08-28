---
title: Waf Plugin
keywords: ["waf"]
description: waf plugin
---

## Description

* `Waf` is the core implementation of gateway to realize firewall function for network traffic.

## Plugin Setting

Please refer to the `deployment` document, choose a way to start `shenyu-admin`. For example, through [Local Deployment](../deployment-local) to start the `Apache ShenYu` management system.

* In `shenyu-admin` BasicConfig --> plugin -> `waf` set to enable.If you don't want to use this function, please disable this plugin in the `shenyu-admin`.

  <img src="/img/shenyu/plugin/waf/waf_open_en.jpg" width="80%" height="80%" />

* Add configuration mode in plugin editing.

```yaml
{"model":"black"}
# model can be 'black' or 'mixed'
# The default mode is blacklist mode; If setting is mixed, it will be mixed mode. We will explain it specifically below.
```

## Add Dependency

* Introducing `waf` dependency in the pom.xml of the gateway.

```xml
  <!-- apache shenyu waf plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-waf</artifactId>
      <version>${project.version}</version>
  </dependency>
  <!-- apache shenyu waf plugin end-->
```

## Waf Plugin Configuration

For more instructions on selector and rule configuration, please refer to: [Selector And Rule Config](../selector-and-rule), here only some fields are introduced.

`Waf` plugin rule configuration page:

<img src="/img/shenyu/plugin/waf/waf_rule_en.jpg" width="80%" height="80%" />

For requests that are denied access by `Waf` , the response header status code is: `403`.

#### Black Model

* When `model` is set to `black` mode, only the matched traffic will execute the rejection policy, and the unmatched traffic will be skipped directly.
* The `Handler` feild in the rule configuration is invalid and can be configured to be empty.

#### Mixed Model

* When `model` is set to `mixed` mode, all traffic will pass through waf plugin. For different matching traffic, users can set whether to reject or pass.

* The `Handler` feild  in the rule configuration must be configured:

    * `permission`: The handle logic that matches the rule. `reject`: deny access, `allow`: allow access.

    * `statusCode`: When access is denied, the value of the code field in the response body. <font color=red>Will not modify the status code of the response header</font>.

      e.g.：`statusCode=10001`，The rejected response body is :

      ```json
      {"code":10001,"message":"You are forbidden to visit"}
      ```

## Situation

* `Waf` is also the pre-plugin of `ShenYu`, which is mainly used to intercept illegal requests or exception requests and give relevant rejection policies.
* When faced with replay attacks, you can intercept illegal `ip` and `host`, and set reject strategy according to matched `ip` or `host`.
* How to determine `ip` and `host`, please refer to: [parsing-ip-and-host](../custom-parsing-ip-and-host)

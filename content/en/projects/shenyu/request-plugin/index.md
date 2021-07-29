---
title: RequestPlugin
keywords: RequestPlugin
description:  RequestPlugin
---

## Explanation

* When ShenYu gateway makes proxy call to target service, it also allows users to add, modify and remove request headers by using 'request' plugin to request parameters, request headers and cookies.

## Plugin Setting

* In `shenyu-admin` --> BasicConfig --> Plugin --> `request` , set to enable.
* Introduce `request` support in the pox.xml file of the gateway.
* If the user don't use, please disable the plugin in the background.

```xml
  <!-- shenyu request plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-request</artifactId>
     <version>${project.version}</version>
  </dependency>
  <!-- shenyu request plugin end-->
```

* Selectors and rules, please refer to: [Selector And Rule Config](../selector-and-rule).
* The custom request parameter modification function is performed only for matching requests.

## Situation

* As the name implies, a request plugin is a custom modification of a URI request parameter.
* When a request is matched, the custom modification rule is set to change the parameters accepted by the downstream service.
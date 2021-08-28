---
title: Logging Plugin
keywords: ["logging"]
description: logging plugin
---

## Description

* When making invokes to the target service, Apache ShenYu gateway also allows users to print the request information in the log that includes the request path, request method, request parameters, response header, response body ...etc.

## Plugin Setting

* In `shenyu-admin` --> BasicConfig --> Plugin --> `logging`, set to enable.
* Introduce `logging` support in the pox.xml file of the gateway.
* If the user don't use, please disable the plugin in the background.

```xml
   <!-- apache shenyu logging plugin start-->
    <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-logging</artifactId>
      <version>${project.version}</version>
    </dependency>
   <!-- apache shenyu logging plugin end-->
```

* Selectors and rules, please refer to: [Selector And Rule Config](../selector-and-rule)。
* Only those matched requests can print the information about this request.

## Situation

* Users may want to view the information about request(including request headers, request parameters, response headers, response body...etc) where in the side of gateway when debugging during development or troubleshooting problems online.

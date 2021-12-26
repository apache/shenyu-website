---
title: GeneralContext Plugin
keywords: ["generalContext"]
description: generalContext plugin
---

## Description

* When making invokes to the target service, Apache ShenYu gateway also allows users to use the `generalContext` plugin to pass the service context parameters by reading the header in this request.

## Plugin Setting

* In `shenyu-admin` --> BasicConfig --> Plugin --> `generalContext`, set to enable.
* If the user don't use, please disable the plugin in the background.

<img src="/img/shenyu/plugin/general-context/general-context-open-en.png" width="70%" height="60%" />

* Introduce `generalContext` support in the pox.xml file of the gateway.

```xml
        <!-- apache shenyu general context plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-general-context</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- apache shenyu general context plugin end-->
```

* Selectors and rules, please refer to: [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule).
* Only those matched requests can print the information about this request.

## Situation

* The parameters in the request header need to be passed to the proxy server;

* Need to replace a key in the request header and pass it to the proxy server;
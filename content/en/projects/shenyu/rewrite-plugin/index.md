---
title: Rewrite Plugin
keywords: rewrite
description: rewrite plugin
---

## Explanation

* When making proxy invokes to the target service, ShenYu Gateway also allows users to rewrite the request path using the `rewrite` plugin.

## Plugin Setting

* In `shenyu-admin` --> plugin management --> `rewrite` ,set to enable.
* Introduce `rewrite` support in the pox.xml file of the gateway.
* If the user don't use, please disable the plugin in the background.

```xml
  <!-- shenyu rewrite plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-rewrite</artifactId>
     <version>${last.version}</version>
  </dependency>
  <!-- shenyu rewrite plugin end-->
```

* Selectors and rules, please refer to: [selector](../selector-and-rule).
* Only those matched request will be rewritten.

## Situation

* As the name suggests, rewrite is a redefinition of URI.

* When the request is matched, set the user-defined path, and the user-defined path will overwrite the previous real path.

* When invoking, the user-defined path will be used.

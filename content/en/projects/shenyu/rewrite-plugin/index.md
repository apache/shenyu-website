---
title: Rewrite Plugin
keywords: rewrite
description: rewrite plugin
---

## Explanation

* When making proxy invokes to the target service, ShenYu gateway also allows users to rewrite the request path using the `rewrite` plugin.

## Plugin Setting

* In `shenyu-admin` --> BasicConfig --> Plugin --> `rewrite` , set to enable.
* Add `rewrite` support in the `pom.xml` file of the gateway.
* If the user don't use, please disable the plugin in the background.

<img src="/img/shenyu/plugin/rewrite/rewrite-enable-en-1.png" width="80%" height="80%" />


```xml
  <!-- shenyu rewrite plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-rewrite</artifactId>
     <version>${project.version}</version>
  </dependency>
  <!-- shenyu rewrite plugin end-->
```

* Selectors and rules, please refer to: [Selector And Rule Config](../selector-and-rule).
* Only those matched request will be rewritten.

## Situation

* As the name suggests, rewrite is a redefinition of URI.

* When the request is matched, set the user-defined path, and the user-defined path will overwrite the previous real path.

* When invoking, the user-defined path will be used.

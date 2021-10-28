---
title: Context-Path Plugin
keywords: ["context_path"]
description: context_path plugin
---

## Explanation

* When making invokes to the target service, `Apache ShenYu` Gateway also allows users to customize the `contextPath` using the `context_path` plugin.

## Plugin Setting

* In `shenyu-admin` --> BasicConfig --> Plugin --> `context_path` , set to enable.
* Introduce `context_path` support in the `pom.xml` file of the gateway.
* If the user don't use, please disable the plugin in the background.

```xml
   <!-- apache shenyu context_path plugin start-->
   <dependency>
       <groupId>org.apache.shenyu</groupId>
       <artifactId>shenyu-spring-boot-starter-plugin-context-path</artifactId>
      <version>${project.version}</version>
   </dependency>
   <!-- apache shenyu context_path plugin end-->
```

* Selectors and rules, please refer to: [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule) .

## Situation

* As the name suggests,the context_path plugin redefines the contextPath of URI.
* When the request is matched, the custom `contextPath` is set, then the custom `contextPath` will be intercepted according to the requested Url to obtain the real Url, for example, the request path is `/shenyu/http/order`,
  The configured contextPath is `/shenyu/http`, then the requested `url` is `/order`.

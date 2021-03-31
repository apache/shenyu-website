---
title: plugin-context-path-mapping
keywords: context_path
description: context_path plugin
---

## Explanation

* When making invokes to the target service, soul Gateway also allows users to customize the context using the `context_path` plugin.

## Plugin Setting

* In `soul-admin` --> plugin management --> `context_path`, set to enable.
* Introduce `context_path` support in the pox.xml file of the gateway.
* If the user don't use, please disable the plugin in the background.

```xml
   <!-- soul context_path plugin start-->
   <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-spring-boot-starter-plugin-context-path</artifactId>
      <version>${last.version}</version>
   </dependency>
   <!-- soul context_path plugin end-->
``` 

* Selectors and rules, please refer to: [selector](../selector-and-rule)。
 
## Situation

* As the name suggests,the context_path plugin redefines the contextPath of URI.
* When the request is matched, the custom `contextPath` is set, then the custom `contextPath` will be intercepted according to the requested Url to obtain the real Url, for example, the request path is `/soul/http/order`,
  The configured contextPath is `/soul/http`, then the requested url is `/order`.

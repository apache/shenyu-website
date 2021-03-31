---
title: redirect-plugin
keywords: redirect
description: redirect plugin
---

## Explanation

When the soul gateway makes proxy calls to the target service, it also allows users to use the `redirect` plugin to redirect requests.

## Plugin Setting

* In `soul-admin` --> plugin management --> `redirect` ,set to enable。
* Introduce `redirect` support in the pox.xml file of the gateway.
* If the user don't use, please disable the plugin in the background.
* Selectors and rules, only matching requests will be forwarded and redirected, please see: [Selector rules](../selector-and-rule)。

## Maven Dependency

Add the plugin dependency in the pom.xml file of the soul-bootstrap project.

```xml
  <!-- soul redirect plugin start-->
  <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-redirect</artifactId>
     <version>${last.version}</version>
  </dependency>
  <!-- soul redirect plugin end-->
```

## Situation

> As the name suggests, the `redirect` plugin is to re-forward and redirect `uri`.

### Redirect

* When we configure a custom path in `Rule`, it should be a reachable service path.
* When the request is matched, the `Soul Gateway` will perform the `308` service jump according to the customized path.

![Redirect](/img/soul/plugin/redirect/redirect-01.png)

### Gateway's own interface forwarding

* When the matching rules are met, the service will use the `DispatcherHandler` internal interface for forwarding.
* To implement the gateway's own interface forwarding, we need to use `/` as the prefix in the configuration path. The specific configuration is as shown in the figure below.

![Forwarding](/img/soul/plugin/redirect/redirect-02.png)

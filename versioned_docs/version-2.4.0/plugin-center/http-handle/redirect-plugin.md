---
title: Redirect Plugin
keywords: ["redirect"]
description: redirect plugin
---

## Explanation

When the Apache ShenYu gateway makes proxy calls to the target service, it also allows users to use the `redirect` plugin to redirect requests.

## Plugin Setting

* In `shenyu-admin` --> BasicConfig --> Plugin --> `redirect` , set to enable.
* If the user don't use, please disable the plugin in the background.
* Selectors and rules, only matching requests will be forwarded and redirected, please see: [Selector And Rule Config](../selector-and-rule) .


<img src="/img/shenyu/plugin/redirect/redirect-plugin-enable-en.png" width="70%" height="60%" />


## Maven Dependency

Add the plugin dependency in the pom.xml file of the shenyu-bootstrap project.

```xml
  <!-- apache shenyu redirect plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-redirect</artifactId>
     <version>${project.version}</version>
  </dependency>
  <!-- apache shenyu redirect plugin end-->
```

## Situation

> As the name suggests, the `redirect` plugin is to re-forward and redirect `uri`.

### Redirect

* When we configure a custom path in `Rule`, it should be a reachable service path.
* When the request is matched, the `ShenYu Gateway` will perform the `308` service jump according to the customized path.

<img src="/img/shenyu/plugin/redirect/redirect-plugin-rule-en.png" width="70%" height="60%" />


### Gateway's own interface forwarding

* When the matching rules are met, the service will use the `DispatcherHandler` internal interface for forwarding.
* To implement the gateway's own interface forwarding, we need to use `/` as the prefix in the configuration path. The specific configuration is as shown in the figure below.

<img src="/img/shenyu/plugin/redirect/redirect-plugin-forward-rule-en.png" width="70%" height="60%" />

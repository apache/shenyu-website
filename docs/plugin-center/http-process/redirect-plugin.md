---
title: Redirect Plugin
keywords: ["redirect"]
description: redirect plugin
---

# 1. Overview

## 1.1 Plugin Name

  - Redirect Plugin

## 1.2 Appropriate Scenario

  - As the name suggests, the `redirect` plugin is to re-forward and redirect `uri`.

## 1.3 Plugin functionality

  - When the Apache ShenYu gateway makes proxy calls to the target service, it also allows users to use the `redirect` plugin to redirect requests.

## 1.4 Plugin code

  Core module ```shenyu-plugin-context-redirect```
  Core class ```org.apache.shenyu.plugin.redirect.RedirectPlugin```

## 1.5 Added Since Which shenyu version

  before 2.2.0 .

# 2. How to use plugin

## 2.1 Plugin-use procedure chart

  <img src="/img/shenyu/plugin/redirect/redirect-procedure-en.png" width="40%" height="30%" />

## 2.2 Import pom

  - import maven config in shenyu-bootstrap project's `pom.xml` file.

  ```xml
  <!-- apache shenyu redirect plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-redirect</artifactId>
     <version>${project.version}</version>
  </dependency>
  <!-- apache shenyu redirect plugin end-->
  ```

## 2.3 Enable plugin

  - In `shenyu-admin` --> BasicConfig --> Plugin --> `Redirect` set Status enable.

    <img src="/img/shenyu/plugin/redirect/redirect-plugin-enable-en.png" width="70%" height="60%" />

## 2.4 Config plugin

  - Selector and rule config, please refer: [Selector and rule config](../../user-guide/admin-usage/selector-and-rule).
  - In `shenyu-admin` --> `PluginList` --> `HttpProcess` --> `Redirect`, add selector config first，then add rule config：
    - Add selector config

      <img src="/img/shenyu/plugin/redirect/redirect-plugin-forward-rule-en.png" width="80%" height="60%" />
    - Add rule config

      <img src="/img/shenyu/plugin/redirect/redirect-plugin-rule-en.png" width="80%" height="60%" />

## 2.5 Examples

### 2.5.1 Redirect

  - When we configure a custom path in `Rule`, it should be a reachable service path.
  - When the request is matched, the `ShenYu Gateway` will perform the `308` service jump according to the customized path.
  1. Refer [Local Deployment](https://shenyu.apache.org/docs/deployment/deployment-local/) to start admin and bootstrap.
  2. Refer 2.2 to import pom and restart bootstrap.
  3. Refer 2.3 to enable plugin.
  4. Refer 2.4 and [Selector and rule config](../../user-guide/admin-usage/selector-and-rule).
  5. Invoke interface: [demo](http://localhost:9195/http)
  - Invoke the interface declared by selectors and rules will redirect to the specified path.
  - In this demo, it will jump to [ShenYu official website](https://shenyu.apache.org)

    <img src="/img/shenyu/plugin/redirect/redirect.png" width="70%" height="60%" />

### 2.5.2 Gateway's own interface forwarding

  - When the matching rules are met, the service will use the `DispatcherHandler` internal interface for forwarding.
  - To implement the gateway's own interface forwarding, we need to use `/` as the prefix in the configuration path. The specific configuration is as shown in the figure below.

    <img src="/img/shenyu/plugin/redirect/demo2-en.png" width="70%" height="60%" />

# 3. How to disable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `Redirect` set Status disable.

  <img src="/img/shenyu/plugin/redirect/disable-redirect-plugin-zh.png" width="70%" height="60%" />

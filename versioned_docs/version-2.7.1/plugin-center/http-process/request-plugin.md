---
title: Request Plugin
keywords: ["request"]
description: request plugin
---

# 1. Overview

## 1.1 Plugin Name

* Request Plugin

## 1.2 Appropriate Scenario

* The request plugin is able to make customized changes to the request parameters of `uri`.

## 1.3 Plugin functionality

* The `Apache ShenYu` gateway allows users to use the `request` plugin to add, modify, and remove request headers to request parameters, request headers, and `Cookie` when proxying a target service.

## 1.4 Plugin code

* Core Module `shenyu-plugin-request`

* Core Class `org.apache.shenyu.plugin.request.RequestPlugin`

## 1.5 Added Since Which shenyu version

* Since ShenYu 2.4.0

# 2. How to use plugin

## 2.1 Plugin-use procedure chart

<img src="/img/shenyu/plugin/request/request-plugin-procedure-en.png" width="40%" height="30%" />

## 2.2 Import pom

- Import maven config in shenyu-bootstrap project's `pom.xml` file, which is already added by default.

```xml
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-request</artifactId>
      <version>${project.version}</version>
  </dependency>
```

## 2.3 Enable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `request` set Status enabled.

  > If there is an option to configure a `ruleHandlePageType` on the page here, you can configure any string, e.g. `custom`, which has no effect on the request, and will be removed in later versions.

  <img src="/img/shenyu/plugin/request/request-plugin-enable-en.png" width="70%" height="60%" />


## 2.4 Config plugin

- selectors and rules, only requests that match are forwarded and redirected, see the [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule)
- `shenyu-admin` Plugin --> `HttpProcess` --> `Request`. Add the selector first, then add the rule：
- Add the selector:

  <img src="/img/shenyu/plugin/request/request-plugin-selector-en.png" width="70%" height="60%" />

- Add the rule

  <img src="/img/shenyu/plugin/request/request-plugin-rule-en.png" width="70%" height="60%" />

## 2.5 Examples

### 2.5.1 Adding request parameters

- When we configure a custom path in `Rules`, it should be a reachable service path.
- When a request is matched, based on the customized path, the `Apache ShenYu` gateway performs a service hop.

1. Refer to [Local Deployment](https://shenyu.apache.org/docs/deployment/deployment-local)启动 admin 和网关
2. Refer to 2.2 importing pom and restarting the gateway.
3. Refer to 2.3 enabling Plugin
4. Start the project [shenyu-examples-http](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-http) 
5. Refer to 2.4 and [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule), configuring plugin rules.
6. Call interface：[http-test-api.http](https://github.com/apache/shenyu/blob/master/shenyu-examples/shenyu-examples-http/src/main/http/http-test-api.http)
- Calling the interface declared by the selector and rule will see the request parameters configured in the request plugin.

  <img src="/img/shenyu/plugin/request/request-plugin-example-zh.png" width="70%" height="60%" />

# 3. How to disable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `request` set Status disable.
- 
  <img src="/img/shenyu/plugin/request/request-plugin-disable-en.png" width="70%" height="60%" />

---
title: BasicAuth Plugin
keywords: ["BasicAuth", "authentication"]
description: BasicAuth plugin
---

# 1. Overview

## 1.1 Plugin Name

* `basicAuth` plugin

## 1.2 Appropriate Scenario

* Requires HTTP Basic authentication at the gateway.

## 1.3 Plugin Functionality

The `basicAuth` plugin reads credentials from the HTTP `Authorization` header or from URI user information, then validates them against the matched rule configuration. If authentication fails, ShenYu returns an authentication error and does not proxy the request to the upstream service.

## 1.4 Plugin Code

* Core module: `shenyu-plugin-basic-auth`
* Starter module: `shenyu-spring-boot-starter-plugin-basic-auth`
* Core class: `org.apache.shenyu.plugin.basic.auth.BasicAuthPlugin`

# 2. How to Use Plugin

## 2.1 Import Dependency

Add the dependency to the `shenyu-bootstrap` module.

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-basic-auth</artifactId>
    <version>${project.version}</version>
</dependency>
```

## 2.2 Enable Plugin

In `shenyu-admin` --> BasicConfig --> Plugin, enable `basicAuth`.

## 2.3 Rule Configuration

For Selector and Rule configuration, see the Selector and Rule Management document.

The default rule handle uses the `authorization` field:

```json
{
  "authorization": "test:test123"
}
```

The value is the expected `username:password` pair. Clients can pass it through the standard Basic authentication header.

## 2.4 Request Example

```bash
curl --location 'http://localhost:9195/http/order/findById?id=1' \
  --header 'Authorization: Basic dGVzdDp0ZXN0MTIz'
```

The decoded value of `Basic dGVzdDp0ZXN0MTIz` is `test:test123`, which matches the example rule handle above.

# 3. How to Disable Plugin

In `shenyu-admin` --> BasicConfig --> Plugin, disable `basicAuth`.

---
title: KeyAuth Plugin
keywords: ["KeyAuth", "authentication"]
description: KeyAuth plugin
---

# 1. Overview

## 1.1 Plugin Name

* `keyAuth` plugin

## 1.2 Appropriate Scenario

* Requires lightweight key-based authentication at the gateway.

## 1.3 Plugin Functionality

The `keyAuth` plugin validates a configured key from either an HTTP request header or query parameter. If the request key does not match the rule configuration, ShenYu returns an authentication error and stops proxying the request.

## 1.4 Plugin Code

* Core module: `shenyu-plugin-key-auth`
* Starter module: `shenyu-spring-boot-starter-plugin-key-auth`
* Core class: `org.apache.shenyu.plugin.key.auth.KeyAuthPlugin`

# 2. How to Use Plugin

## 2.1 Import Dependency

Add the dependency to the `shenyu-bootstrap` module.

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-key-auth</artifactId>
    <version>${project.version}</version>
</dependency>
```

## 2.2 Enable Plugin

In `shenyu-admin` --> BasicConfig --> Plugin, enable `keyAuth`.

## 2.3 Rule Configuration

For Selector and Rule configuration, see the Selector and Rule Management document.

Rule handle fields:

| Field | Required | Description |
| :---- | :------- | :---------- |
| `keyName` | Yes | Header name or query parameter name used to carry the key. |
| `key` | Yes | Expected key value. |

Example rule handle:

```json
{
  "keyName": "apiKey",
  "key": "test-key"
}
```

## 2.4 Request Example

Pass the key as a header:

```bash
curl --location 'http://localhost:9195/http/order/findById?id=1' \
  --header 'apiKey: test-key'
```

Or pass the key as a query parameter:

```bash
curl --location 'http://localhost:9195/http/order/findById?id=1&apiKey=test-key'
```

# 3. How to Disable Plugin

In `shenyu-admin` --> BasicConfig --> Plugin, disable `keyAuth`.

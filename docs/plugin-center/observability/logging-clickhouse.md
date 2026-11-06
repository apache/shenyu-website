---
title: Logging-ClickHouse Plugin
keywords: ["Logging", "ClickHouse"]
description: Logging-ClickHouse Plugin
---

# 1. Overview

## 1.1 Plugin Name

* `loggingClickHouse` plugin

## 1.2 Appropriate Scenario

* Collect gateway access logs and write them to ClickHouse for query and analysis.

## 1.3 Plugin Functionality

The `loggingClickHouse` plugin records ShenYu gateway access logs and sends them to ClickHouse. The collected fields are consistent with the common logging plugin model, including request path, request headers, response status, response body, upstream IP, response time, and trace ID.

## 1.4 Plugin Code

* Core module: `shenyu-plugin-logging-clickhouse`
* Starter module: `shenyu-spring-boot-starter-plugin-logging-clickhouse`
* Core class: `org.apache.shenyu.plugin.logging.clickhouse.LoggingClickHousePlugin`
* Collect client: `org.apache.shenyu.plugin.logging.clickhouse.client.ClickHouseLogCollectClient`

# 2. How to Use Plugin

## 2.1 Import Dependency

Add the dependency to the `shenyu-bootstrap` module.

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-logging-clickhouse</artifactId>
    <version>${project.version}</version>
</dependency>
```

## 2.2 Enable Plugin

In `shenyu-admin` --> BasicConfig --> Plugin, configure `loggingClickHouse` and set Status enable.

## 2.3 Plugin Configuration

| Config item | Type | Required | Description |
| :---------- | :--- | :------- | :---------- |
| `host` | String | Yes | ClickHouse host. |
| `port` | String | Yes | ClickHouse HTTP port, commonly `8123`. |
| `username` | String | No | ClickHouse username. |
| `password` | String | No | ClickHouse password. |
| `database` | String | Yes | Database used to store access logs. |
| `clusterName` | String | No | ClickHouse cluster name. |
| `engine` | String | No | Table engine. |
| `ttl` | String | No | TTL expression for log retention. |

Example plugin configuration:

```json
{
  "host": "127.0.0.1",
  "port": "8123",
  "database": "shenyu-gateway",
  "username": "",
  "password": ""
}
```

## 2.4 Selector and Rule Configuration

For detailed configuration of selectors and rules, see the Selector and Rule Management document.

Selectors and rules can be used to control which traffic is collected. Use narrow match conditions when only part of the gateway traffic should be logged.

# 3. Log Fields

The captured access log fields follow the common logging plugin. For field meanings, see the Logging Plugin document.

# 4. How to Disable Plugin

In `shenyu-admin` --> BasicConfig --> Plugin, disable `loggingClickHouse`.

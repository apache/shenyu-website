---
title: ParamTransform Plugin
keywords: ["paramTransform", "RPC", "parameter transform"]
description: ParamTransform plugin
---

## Description

The **paramTransform** plugin converts HTTP request parameters into the intermediate parameter format consumed by RPC proxy plugins. It supports Dubbo, gRPC, Sofa, and Tars traffic.

The plugin reads parameters from different request shapes:

- JSON request body.
- `application/x-www-form-urlencoded` request body.
- Query string.

After parsing, the result is stored in the ShenYu exchange context and used by downstream RPC proxy plugins.

## Plugin Code

- Core module: `shenyu-plugin-transform`
- Starter module: `shenyu-spring-boot-starter-plugin-transform`
- Core class: `org.apache.shenyu.plugin.transform.RpcParamTransformPlugin`
- Plugin name: `paramTransform`

## Import Dependency

Add the dependency to the `shenyu-bootstrap` module.

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-transform</artifactId>
    <version>${project.version}</version>
</dependency>
```

## Enable Plugin

In `shenyu-admin` --> BasicConfig --> Plugin, enable `paramTransform`.

The plugin only applies to RPC request types:

- `dubbo`
- `grpc`
- `sofa`
- `tars`

For Selector and Rule configuration, see the Selector and Rule Management document.

## Request Examples

JSON body:

```bash
curl --location 'http://localhost:9195/dubbo/findById' \
  --header 'Content-Type: application/json' \
  --data-raw '{"id":"1001"}'
```

Form body:

```bash
curl --location 'http://localhost:9195/dubbo/findById' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'id=1001'
```

Query string:

```bash
curl --location 'http://localhost:9195/dubbo/findById?id=1001'
```

## Notes

Place `paramTransform` before the target RPC proxy plugin in the plugin chain. The default plugin order is designed for this: `paramTransform` runs before Dubbo, gRPC, Sofa, and Tars proxy plugins.

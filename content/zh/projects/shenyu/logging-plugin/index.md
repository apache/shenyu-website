---
title: Logging插件
keywords: logging
description: logging插件
---

## 说明

* shenyu网关在对目标服务调用的时候，还容许用户使用 `logging` 插件在日志中打印本次请求信息，包含请求路径、请求方法、请求参数和响应头、响应体等信息。

## 插件设置

* 在 `shenyu-admin` --> 插件管理 --> `logging` 设置为开启。
* 在网关的 pom.xml 文件中添加 `logging` 的支持。
* 如果用户不需要，可以把插件禁用。

```xml
  <!-- shenyu logging plugin start-->
  <dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-logging</artifactId>
    <version>${last.version}</version>
  </dependency>
  <!-- shenyu logging plugin end-->
``` 

* 选择器和规则，请详细看：[选择器规则](../selector-and-rule)。
* 只有匹配的请求，并且配置规则才会打印本次请求相关信息。

## 场景

* 开发时调试或者线上排查问题等情况下，需要在网关侧查看本次请求在转发过程中的相关信息，如请求头、请求参数或响应头、响应体等。

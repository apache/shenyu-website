---
title: Request插件
keywords: RequestPlugin
description:  RequestPlugin
---

## 说明

* `Apache ShenYu` 网关在对目标服务进行代理调用的时候，还容许用户使用 `request` 插件对请求参数、请求头以及 `Cookie` 来添加、修改、移除请求头。

## 插件设置

* 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `request`，设置为开启。


* 在网关的 `pom.xml` 文件中添加 `request` 的支持。

* 如果用户不需要，可以把插件禁用。

```xml
  <!-- apache shenyu request plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-request</artifactId>
     <version>${project.version}</version>
  </dependency>
  <!-- apache shenyu request plugin end-->
```

* 选择器和规则设置，请参考：[选择器和规则管理](../selector-and-rule)。

* 只有匹配的请求，才会进行自定义请求参数修改功能。

## 场景

* 顾名思义，请求插件就是对 `uri` 请求参数进行自定义修改。
* 当匹配到请求后，设置自定义修改规则，就会改变下游服务接受到的参数。
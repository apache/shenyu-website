---
title: Rewrite插件
keywords: ["rewrite"]
description: rewrite插件
---

## 说明

* `Apache ShenYu` 网关在对目标服务进行代理调用的时候，允许用户使用 `rewrite` 插件来重写请求路径 。


## 插件设置

* 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `rewrite`，设置为开启。

* 在网关的 `pom.xml` 文件中添加 `rewrite` 的支持。

* 如果用户不需要，可以把插件禁用。

<img src="/img/shenyu/plugin/rewrite/rewrite_open.png" width="80%" height="80%" />


```xml
  <!-- apache shenyu rewrite plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-rewrite</artifactId>
     <version>${project.version}</version>
  </dependency>
  <!-- apache shenyu rewrite plugin end-->
```

* 选择器和规则设置，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。

  * 只有匹配的请求，才会进行重写。

## 场景

* 顾名思义，重写插件就是对 `uri` 的重新定义。
* 当匹配到请求后，设置自定义的路径，那么自定义的路径就会覆盖之前的真实路径。
* 在调用的时候，就会使用用户自定义的路径。

---
title: Context Path插件
keywords: ["context_path"]
description: context_path插件
---

## 说明

* `Apache ShenYu` 网关在对目标服务调用的时候，还容许用户使用 `context_path` 插件来重写请求路径的 `contextPath`

## 插件设置

- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `context_path` 设置为开启。
- 如果用户不需要，可以把插件禁用。

## 插件使用

- 在网关的 `pom.xml` 文件中添加 `context_path` 的支持。

```xml
  <!-- apache shenyu context_path plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-context-path</artifactId>
     <version>${project.version}</version>
  </dependency>
  <!-- apache shenyu context_path plugin end-->
```

- 选择器和规则设置，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。
- 只有匹配的请求，并且配置规则才会进行重写`contextPath`。

## 场景

* 顾名思义，`context_path`插件就是对uri的`contextPath`重新定义。
* 当匹配到请求后，设置自定义的`contextPath`，那么就会根据请求的Url截取自定义的`contextPath`获取真正的 `url` ，例如请求路径为`/shenyu/http/order`，
  配置的contextPath为`/shenyu/http`，那么真正请求的url为`/order`。

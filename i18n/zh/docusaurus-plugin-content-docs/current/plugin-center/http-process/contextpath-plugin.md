---
title: Context Path插件
keywords: ["contextPath"]
description: contextPath插件
---

## 1. 概述
### 1.1 插件名称
* 上下文路径插件
### 1.2 适用场景
* 定义应用访问的上下文路径
* 匹配上下文路径，获取用户真实的请求地址
* 当匹配到请求后，设置自定义的`contextPath`，那么就会根据请求的Url截取自定义的`contextPath`获取真正的 `url` ，例如请求路径为`/shenyu/http/order`，
  配置的contextPath为`/shenyu/http`，那么真正请求的url为`/order`
### 1.3 插件功能
* 对请求修改路径
* `Apache ShenYu` 网关在对目标服务调用的时候，还容许用户使用 `contextPath` 插件来重写请求路径的 `contextPath`
### 1.4 插件代码
* 核心模块 ```shenyu-plugin-context-path```
* 核心类 ```org.apache.shenyu.plugin.context.path.ContextPathPlugin```
### 1.5 添加自哪个 shenyu 版本
* 2.3.0

## 2. 如何使用插件
# 2.1 插件使用流程图
# 2.2 导入pom
- 在网关的 `pom.xml` 文件中添加 `contextPath` 插件 maven 配置。

```xml
  <!-- apache shenyu context_path plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-context-path</artifactId>
     <version>${project.version}</version>
  </dependency>
  <!-- apache shenyu context_path plugin end-->
```
# 2.3 启用插件
- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `contextPath` 设置为开启。
# 2.4 配置插件
- 选择器和规则设置，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。
- 只有匹配的请求，并且配置规则才会进行重写`contextPath`。
# 2.5 示例

## 3. 如何禁用插件
- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `contextPath` 设置为禁用。
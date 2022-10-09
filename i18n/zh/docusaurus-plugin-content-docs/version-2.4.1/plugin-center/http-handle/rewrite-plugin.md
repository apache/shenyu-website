---
title: Rewrite插件
keywords: ["rewrite"]
description: rewrite插件
---

# 1. 概述

## 1.1 插件名称

* Rewrite插件

## 1.2 适用场景

* 通过重写请求路径, 可以使用与目标服务不同的uri。

## 1.3 插件功能

* 该插件用于重写请求uri。

## 1.4 插件代码

* 核心模块 `shenyu-plugin-rewrite`

* 核心类 `org.apache.shenyu.plugin.rewrite.RewritePlugin`

## 1.5 添加自哪个Shenyu版本

* 2.4.0

# 2. 如何使用插件

## 2.1 插件使用流程图

![](/img/shenyu/plugin/rewrite/rewrite_use_zh.png)

## 2.2 导入pom

- 在网关的 `pom.xml` 文件中添加插件 maven 配置。

```xml
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-rewrite</artifactId>
      <version>${project.version}</version>
  </dependency>
```

## 2.3 启用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `rewrite` 设置为开启。
![](/img/shenyu/plugin/rewrite/rewrite_open.png)

## 2.4 配置插件

### 2.4.1 插件配置

* 在使用前要启用插件。
* 如果不再使用插件需要禁用。 

### 2.4.2 选择器配置

* 请参考: [选择器和规则管理](../../user-guide/admin-usage/selector-and-rule).

### 2.4.3 规则配置

![](/img/shenyu/plugin/rewrite/rewrite_rule_config.png)

* 参数解释:
  * `regex` : 匹配uri中要重写部分的正则表达式。
  * `replace` : 替换的内容

## 2.5 示例

### 2.5.1 重新uri示例

#### 2.5.1.1 运行 `shenyu-examples-http` 项目

* 使用[shenyu-examples-http](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-http), 参考[](../../quick-start/quick-start-http#运行shenyu-examples-http项目)

#### 2.5.1.1 插件配置

* 参考[2.4.1](#241-插件配置)配置插件.

#### 2.5.1.2 选择器配置

* 参考[2.4.2](#242-选择器配置)配置选择器

#### 2.5.1.3 规则配置

![](/img/shenyu/plugin/rewrite/rewrite_example_rule.png)

请求 `/http/hello` 将被重写成`/hi`。

#### 2.5.1.4 验证结果

使用工具（如Postman）发起请求：

![](/img/shenyu/plugin/rewrite/rewrite_example_result.png)

# 3. 如何禁用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `rewrite` 设置为关闭。

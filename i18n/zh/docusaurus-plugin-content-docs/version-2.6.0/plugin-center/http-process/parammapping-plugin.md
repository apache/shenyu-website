---
title: ParamMapping插件
keywords: ["ParamMapping"]
description:  ParamMapping插件
---

# 1. 概述

## 1.1 插件名称

* paramMapping插件

## 1.2 适用场景

* 添加/删除/替换请求体中固定的参数

## 1.3 插件功能

* 用来对你的请求参数进行修改的插件。

## 1.4 插件代码

* 核心模块 `shenyu-plugin-param-mapping`

* 核心类 `org.apache.shenyu.plugin.param.mapping.ParamMappingPlugin`

## 1.5 添加自哪个shenyu版本

* Since ShenYu 2.4.0

# 2. 如何使用插件

## 2.1 插件使用流程图

![](/img/shenyu/plugin/plugin_use_zh.jpg)

## 2.2 导入pom

* 在网关的 `pom.xml` 文件中添加 `paramMapping` 的支持。

```xml
<!-- apache shenyu param_mapping plugin start-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-param-mapping</artifactId>
    <version>${project.version}</version>
</dependency>
<!-- apache shenyu param_mapping plugin end-->
```

## 2.3 启用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `paramMapping` 设置为开启。

## 2.4 配置插件

### 2.4.1 插件配置

* 再使用插件时应该开启插件！

### 2.4.2 选择器配置

* 选择器和规则设置，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。

* 只有匹配的请求，才会修改请求体。

### 2.4.3 规则配置

![](/img/shenyu/plugin/param-mapping/param-mapping.png)
* 参数解析:
  * `addParameterKeys`: 在请求体中增加一个 `key-value`
  * `replaceParameterKeys`: 替换请求体中的某一个 `key` ，`key` 是要被替换的值，`value` 是替换后的值
  * `removeParameterKeys`: 移除请求体中的某一个 `key`

* 修改请求体是通过 `JSONPath` 来实现的， `$.` 代表根目录

## 2.5 示例

### 2.5.1 在请求中添加参数

#### 2.5.1.1 配置插件

* 使用该插件时应先开启插件！

#### 2.5.1.2 选择器配置

#### 2.5.1.3 规则配置

![](/img/shenyu/plugin/param-mapping/param-mapping.png)

上面的配置，插件开启前，请求内容为

```json
{"id":3,"data":{"value":"18","age":"36"}}
```

#### 2.5.1.4 验证结果

插件开启后，请求内容为

```json
{"name":"shenyu","userId":3,"data":{"age":"36"}}
```

上述操作，增加一个`name:shenyu`，把`id`替换为`userId`，移除`data`中的`value` 。

# 3. 如何禁用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `paramMapping` 设置为关闭。

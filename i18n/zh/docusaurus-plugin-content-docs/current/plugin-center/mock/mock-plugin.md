---
title: Mock 插件
keywords: ["mock"]
description: mock插件
---

# 1. 概述

## 1.1 插件名称

* Mock插件

## 1.2 适用场景

* 为请求指定响应状态码和响应体方便进行测试。

## 1.3 插件功能

* 设置请求的响应状态码和响应体。
* 支持配置 `${}` 占位符自动生成数据。

## 1.4 插件代码

* 核心模块 ```shenyu-plugin-mock```
* 核心类 ```org.apache.shenyu.plugin.mock.MockPlugin```

## 1.5 添加自哪个 shenyu 版本

* 2.5.0

# 2. 如何使用插件

## 2.1 导入 pom

- 在网关的 `pom.xml` 文件中添加插件 maven 配置。

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-mock</artifactId>
    <version>${project.version}</version>
</dependency>
```

## 2.2 启用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `mock` 设置为开启。

![](/img/shenyu/plugin/mock/enable-mock-plugin-zh.png)

## 2.3 配置插件

- 选择器和规则设置，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。
- shenyu-admin mock 插件配置，支持配置 httpStatusCode 和 responseContent：
  - httpStatusCode:配置请求的响应码。
  - responseContent:配置响应体内容，支持配置 `${}` 占位符生成随机数据  。

![](/img/shenyu/plugin/mock/mock-rule-configuration-zh.png)

## 2.4 `${}` 支持的语法

**`${int|min-max}`**  
 - **说明：** 生成 `min` 到 `max` 的随机整数，包含 `min` 和 `max` 。 
 - **示例：** `${int|10-20}`

**`${double|min-max|format}`**
- **说明：** 生成 `min` 到 `max` 的随机浮点数 ，包含 `min` 和 `max`，并按照 `format` 进行格式化。
- **示例：** `${double|10-20}` , `${double|10-20.5|%.2f}`

**`${email}`**
- **说明：** 生成随机的邮箱地址。

**`${phone}`**
- **说明：** 生成随机的13位手机号码。

**`${zh|min-max}`**
- **说明：** 生成长度为 `min` 到 `max` （包含 `min` 和 `max`）的随机中文字符串。
- **示例：** `${zh|10-20}`

**`${en|min-max}`**
- **说明：** 生成长度为 `min` 到 `max` （包含 `min` 和 `max`）的随机英文字符串。
- **示例：** `${en|10-20}`

**`${bool}`**
- **说明：** 生成随机的`boolean` 类型的值 即 `true` 或 `false`。

**`${list|[arg1,arg2...]}`**
- **说明：** 随机返回列表中的任意一个值
- **示例：** `${list|[gril,boy]}` 会返回 girl 或 boy 中任意一个。

**`${current|format}`**
- **说明：** 返回当前时间并使用 `format` 格式化，`format` 可缺省，默认是 `YYYY-MM-dd HH:mm:ss`。
- **示例：** `${current}`，`${current|YYYY-MM-dd}`

**`${array|item|length}`**
- **说明：** 按照 `item` 格式定义生成长度为 `length` 的数组, `item` 中可以嵌套使用上述的所有数据生成规则，结果会自动添加`[]`。
- **示例：** `${array|{"name":"test"}|3}` 会生成 `[{"name":"test"},{"name":"test"},{"name":"test"}]`，`${array|{"age":${int|18-65}}|3}`

**注意：不要使用 `""` 包裹 `${}` ,mock插件会根据 `generator`的定义增加前缀和后缀。**


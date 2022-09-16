---
title: ParamMapping插件
keywords: ["ParamMapping"]
description:  ParamMapping插件
---

## 说明

* `paramMapping`插件是 `Apache ShenYu` 网关自带的，用来对你的请求参数进行修改的插件。



## 插件设置

- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `paramMapping` 设置为开启。

## 插件使用

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

* 选择器和规则设置，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。

  * 只有匹配的请求，才会修改请求体。

## 修改请求插件使用指南

* 1.配置选择器
* 2.配置规则
* 3.修改请求体
  ![](/img/shenyu/plugin/param-mapping/param-mapping.png)
* 参数解析:
  * `addParameterKeys`: 在请求体中增加一个 `key-value`
  * `replaceParameterKeys`: 替换请求体中的某一个 `key` ，`key` 是要被替换的值，`value` 是替换后的值
  * `removeParameterKeys`: 移除请求体中的某一个 `key`

修改请求体是通过 `JSONPath` 来实现的， `$.` 代表根目录

上面的配置，插件开启前，请求内容为

```json
{"id":3,"data":{"value":"18","age":"36"}}
```

插件开启后，请求内容为

```json
{"name":"shenyu","userId":3,"data":{"age":"36"}}
```

上述操作，增加一个`name:shenyu`，把`id`替换为`userId`，移除`data`中的`value` 。

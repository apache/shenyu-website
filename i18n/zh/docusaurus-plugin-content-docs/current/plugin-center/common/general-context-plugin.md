---
title: GeneralContext插件
keywords: ["generalContext"]
description: generalContext插件
---

## 说明

* `Apache ShenYu` 网关在对目标服务调用的时候，还容许用户使用 `generalContext` 插件在本次请求中通过读取header，进行服务上下文参数传递。

## 插件设置

* 在 `shenyu-admin`--> 基础配置 --> 插件管理-> `generalContext` ，设置为开启。

* 如果用户不需要，可以把插件禁用。


<img src="/img/shenyu/plugin/general-context/general-context-open-zh.png" width="70%" height="60%" />


* 在网关的 `pom.xml` 文件中添加 `generalContext` 的支持。


```xml
        <!-- apache shenyu general context plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-general-context</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- apache shenyu general context plugin end-->
```

* 选择器和规则配置，请参考: [选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。
* 只有匹配的请求，并且配置规则才会传递上下文信息。

## 场景

* 需要对请求header中的参数传递至代理服务端；

* 需要对请求header中的某个key进行替换后传递至代理服务端；
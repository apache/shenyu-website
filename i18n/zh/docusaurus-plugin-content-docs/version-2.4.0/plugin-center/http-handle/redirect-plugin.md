---
title: 重定向插件
keywords: ["redirect"]
description: redirect插件
---

## 说明

- Apache ShenYu 网关在对目标服务进行代理调用的时候，还容许用户使用 `redirect` 插件来重定向请求。

## 插件设置

- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `redirect`，设置为开启。
- 如果用户不需要，可以把插件禁用。


<img src="/img/shenyu/plugin/redirect/redirect-plugin-enable-zh.png" width="70%" height="60%" />


## 插件使用

- 在网关的 `pom.xml` 文件中添加 `redirect` 的支持。

```xml
  <!-- apache shenyu redirect plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-redirect</artifactId>
     <version>${project.version}</version>
  </dependency>
  <!-- apache shenyu redirect plugin end-->
```

- 选择器和规则，只有匹配的请求，才会进行转发和重定向，请参考：[选择器规则管理](../../user-guide/admin-usage/selector-and-rule)。

## 场景

> 顾名思义，`redirect` 插件就是对 `uri` 的重新转发和重定向。

#### 重定向

* 我们在 `Rule` 配置自定义路径时，应该为一个可达的服务路径。
* 当匹配到请求后，根据自定义的路径，`Apache ShenYu`网关会进行 `308` 服务跳转。

<img src="/img/shenyu/plugin/redirect/redirect-plugin-rule-zh.png" width="70%" height="60%" />


#### 网关自身接口转发

* 当满足匹配规则时，服务内部会使用 `DispatcherHandler` 内部接口转发。
* 要实现网关自身接口转发，我们需要在配置路径使用 `/` 作为前缀开始，具体配置如下图。

<img src="/img/shenyu/plugin/redirect/redirect-plugin-forward-rule-zh.png" width="70%" height="60%" />

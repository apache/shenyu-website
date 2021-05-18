---
title: 重定向插件
keywords: redirect
description: redirect插件
---

## 说明

> shenyu网关在对目标服务进行代理调用的时候，还容许用户使用 `redirect` 插件来重定向请求。

## 插件设置

* 在 `shenyu-admin` --> 插件管理 --> `redirect`，设置为开启。
* 在网关的 `pom.xml` 文件中添加 `redirect` 的支持。
* 如果用户不需要，可以把插件禁用。
* 选择器和规则，只有匹配的请求，才会进行转发和重定向，请详细看：[选择器规则](../selector-and-rule)。

## Maven 依赖

在 `shenyu-bootstrap` 工程的 `pom.xml` 文件中添加插件依赖。

```xml
  <!-- shenyu redirect plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-redirect</artifactId>
     <version>${last.version}</version>
  </dependency>
  <!-- shenyu redirect plugin end-->
```

## 场景

> 顾名思义，`redirect` 插件就是对 `uri` 的重新转发和重定向。

#### 重定向

* 我们在 `Rule` 配置自定义路径时，应该为一个可达的服务路径。
* 当匹配到请求后，根据自定义的路径，`ShenYu 网关`会进行 `308` 服务跳转。

![重定向配置](/img/soul/plugin/redirect/redirect-01.png)

#### 网关自身接口转发

* 当满足匹配规则时，服务内部会使用 `DispatcherHandler` 内部接口转发。
* 要实现网关自身接口转发，我们需要在配置路径使用 `/` 作为前缀开始，具体配置如下图。

![自身接口转发](/img/soul/plugin/redirect/redirect-02.png)

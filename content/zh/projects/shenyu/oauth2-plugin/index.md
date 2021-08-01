---
title: OAuth 2插件
keywords: OAuth 2
description:  OAuth 2插件
---

## 说明

- OAuth2插件使用Webflux OAuth2实现，用于支持OAuth协议。

## 插件设置

请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](../deployment-local) 启动`Apache ShenYu`后台管理系统。

* 在 `shenyu-admin` 基础配置 --> 插件管理 --> `oauth2` ，设置为开启。如果用户不想使用此功能，请在admin后台停用此插件。

  <img src="/img/shenyu/plugin/oauth2/oauth2_open_zh.jpg" width="80%" height="80%" />

## 插件使用

- 在网关的pom文件中添加`oauth2`的支持
  
```xml
  <!-- apache shenyu oauth2 plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-oauth2</artifactId>
      <version>${project.version}</version>
  </dependency>
  <!-- apache shenyu oauth2 plugin end-->
  
```

- 在网关的配置文件中配置 `spring.security.oauth2` 的相关配置，详细配置说明可参考 [Spring Webflux OAuth2](https://docs.spring.io/spring-security/site/docs/current/reference/html5/#webflux-oauth2)
- 配置选择器和规则作为您需要OAuth2授权的请求地址，默认放行所有请求。关于选择器和规则配置的更多说明，请参考：[选择器和规则管理](../selector-and-rule)


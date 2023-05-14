---
title: OAuth2插件
keywords: ["OAuth2"]
description:  OAuth 2插件
---

## 说明

- `OAuth2` 插件使用 `Webflux OAuth2` 实现，用于支持 `OAuth` 协议。

## 插件设置

请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](../../deployment/deployment-local) 启动`Apache ShenYu`后台管理系统。

* 在 `shenyu-admin` 基础配置 --> 插件管理 --> `oauth2` ，设置为开启。如果用户不想使用此功能，请在 `admin` 后台停用此插件。

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
  <!-- spring security oauth2 client start-->
  <dependency>
      <groupId>org.springframework.security</groupId>
      <artifactId>spring-security-oauth2-client</artifactId>
      <version>${spring-security.version}</version>
  </dependency>
  <!-- spring security oauth2 client start-->
```

- 在`shenyu-bootstrap`模块配置`oauth2`

```yml

spring:
 security:
   oauth2:
     client:
       registration:
         <这里填入你的 client-registration-id>:
           client-id: <这里填入你的 client-id>
           client-secret: <这里填入你的 client-secret>
           # 下面这部分是授权服务器的配置
       provider:
         <这里填入你的 client-registration-id>:
           authorization-uri: <这里填入你的 authorization-uri>
           token-uri: <这里填入 access-token-uri>
           user-info-uri: <这里填入 user-info-uri>
           jwk-set-uri: <这里填入 jwk-set-uri>
```

- 在网关的配置文件中配置 `spring.security.oauth2` 的相关配置，详细配置说明可参考 [Spring Webflux OAuth2](https://docs.spring.io/spring-security/site/docs/current/reference/html5/#webflux-oauth2)
- 配置选择器和规则作为您需要 `OAuth2` 授权的请求地址，默认放行所有请求。关于选择器和规则配置的更多说明，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)


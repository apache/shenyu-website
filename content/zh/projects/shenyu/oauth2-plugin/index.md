---
title: OAuth 2插件
keywords: OAuth 2
description:  OAuth 2插件
---

## **说明**

- OAuth2插件使用Webflux OAuth2实现，所以其配置可以参考[Spring Webflux OAuth2](https://docs.spring.io/spring-security/site/docs/current/reference/html5/#webflux-oauth2)的配置。**使用OAuth2插件有2个前提条件缺一不可**
  - 确保网关的pom中添加了OAuth2依赖
  - 确保网关yml配置文件中存在相应的OAuth2配置

## 插件设置

- 在`shenyu-admin` -> 插件管理 -> `oauth2`设置为开启
- 如果用户不想使用此功能，请在admin后台停用此插件。
- 插件编辑里面新增配置模式。

## 插件使用

- 在网关的pom文件中添加`oauth2`的支持
  

```xml
  <!-- shenyu jwt plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-oauth2</artifactId>
      <version>${last.version}</version>
  </dependency>
  <!-- shenyu jwt plugin end-->
  
``` 
- 配置选择器和规则作为您需要OAuth2授权的请求地址，默认放行所有请求。
  
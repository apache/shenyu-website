---
title: Jwt插件
keywords: Jwt
description: Jwt插件
---

## 说明

* jwt 插件，是针对 http 请求头的 `token`属性或者是`authorization`属性携带值进行鉴权判断，兼容 OAuth2.0 。

## 插件设置

请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](../deployment-local) 启动`ShenYu`后台管理系统。

* 在 `shenyu-admin` 基础配置 --> 插件管理 --> `jwt` ，设置为开启。如果用户不想使用此功能，请在admin后台停用此插件。

  <img src="/img/shenyu/plugin/jwt/jwt_open_zh.jpg" width="80%" height="80%" />

* 插件编辑里面新增配置。

  `{"secretKey":"","filterPath":""} `

  - secretKey：使用 jwt 生成 token 的时候的私钥，必填项。

  - filterPath：鉴权白名单列表，填请求接口的 API 路径，半角逗号 `,` 分隔。 

    例如：白名单路径如下，则filterPath 设置为 `/cloud/shenyu/user,/cloud/shenyu/role`
    - http://127.0.0.1:8080/cloud/shenyu/user
    - http://127.0.0.1:8080/cloud/shenyu/role

## 插件使用

* 在网关的 pom.xml 文件中添加 `jwt` 的支持。

```xml
  <!-- shenyu jwt plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-jwt</artifactId>
      <version>${last.version}</version>
  </dependency>
  <!-- shenyu jwt plugin end-->
  
```
* 选择器和规则，只有匹配的请求，才会进行 `jwt` 鉴权判断，请详细看：[选择器和规则管理](../selector-and-rule)。

## 场景

* 需要在网关统一鉴权。



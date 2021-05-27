---
title: Jwt插件
keywords: Jwt
description: Jwt插件
---

## 说明

* jwt 插件，是针对 http 请求头的 ** token ** 属性或者是 ** authorization ** 属性携带值进行鉴权判断，兼容 auth2.0 。

## 插件设置

* 在 `soul-admin` --> 插件管理-> `jwt` 设置为开启。

* 如果用户不想使用此功能，请在admin后台停用此插件。

* 插件编辑里面新增配置模式。

```yaml
# secretKey 如果开启了，必填项
{"secretKey":"","filterPath":[]} 
```

## 插件使用

* 在网关的 pom.xml 文件中添加 `jwt` 的支持。

```xml
  <!-- soul jwt plugin start-->
  <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-jwt</artifactId>
      <version>${last.version}</version>
  </dependency>
  <!-- soul jwt plugin end-->
  
``` 
* 不需要配置选择器和规则。

* secretKey 使用 jwt 生成 token 的时候，写的私钥。必填项。

* filterPath 鉴权白名单列表，填请求接口的 API 路径。 例如：http://127.0.0.1:8080/cloud/soul , filterPath 添加 /cloud/soul 即可。

## 场景

* 需要在网关鉴权的 API 接口，统一鉴权。



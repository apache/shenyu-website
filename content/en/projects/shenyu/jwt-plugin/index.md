---
title: Jwt plugin
keywords: Jwt
description: Jwt plugin
---

## Explanation

* The jwt plug-in is for the `token` attribute or `authorization` of the http request header to carry the attribute value for authentication judgment and judge auth2.0 .

## Plugin Setting

Please refer to the `deployment` document, choose a way to start `shenyu-admin`. For example, [local deployment](../deployment-local).

* In `shenyu-admin` BasicConfig --> plugin -> `jwt` set to enable.If you don't want to use this function, please disable this plugin in the `shenyu-admin`.

  <img src="/img/shenyu/plugin/jwt/jwt_open_en.jpg" width="80%" height="80%" />

* Add configuration mode in plugin editing.

  `{"secretKey":"","filterPath":[]} `

  - secretKey: The private key when using jwt to generate token, it is required.

  - filterPath：Authentication whitelist list, fill in the API path of the request interface.

    e.g. http://127.0.0.1:8080/cloud/shenyu , filterPath just add `/cloud/shenyu`.

## Plugin Use

* Add support for `jwt` in the pom.xml file of the shenyu.

```xml
  <!-- shenyu jwt plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-jwt</artifactId>
      <version>${last.version}</version>
  </dependency>
  <!-- shenyu jwt plugin end-->
  
```
* For more instructions on selector and rule configuration, please refer to: [Selector And Rule Configu](../selector-and-rule). 


## Situation

* Requires unified authentication at the gateway.



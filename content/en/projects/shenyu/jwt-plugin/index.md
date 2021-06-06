---
title: Jwt plugin
keywords: Jwt
description: Jwt plugin
---

## Explanation

* The jwt plug-in is for the ** token ** attribute or authorization ** of the http request header to carry the attribute value for authentication judgment and judge auth2.0 **.

## Plugin Setting

* In `shenyu-admin` --> plugin management-> `jwt`, set to enable.

* If the user don't use, please disable the plugin in the background.

* Edit configuration properties in the plugin.

```yaml
# secretKey 
If enabled, required
{"secretKey":"","filterPath":[]} 
```

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
* You need to configure the selector before you can use it.

* **secretKey** The private key written when using jwt to generate token. Required field.

* **filterPath** Authentication whitelist list, fill in the API path of the request interface. For example: http://127.0.0.1:8080/cloud/shenyu, add /cloud/shenyu to **filterPath**.

## Situation

* Requires unified authentication at the gateway.



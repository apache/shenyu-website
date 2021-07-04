---
title: ModifyResponse Plugin
keywords: modifyResponse
description: modifyResponse Plugin
---

## 说明

* modifyResponse is a native plugin of ShenYu Gateway and is used to edit response header and body and statusCode.


## 插件设置

* 在 `shenyu-admin` -> plugin management --> `modifyResponse`set to enable.

## 插件使用

* Introduce `modifyResponse` dependency in the pom.xml file of the gateway.

```xml
  <!-- shenyu modify response plugin start-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-modify-response</artifactId>
  <version>${project.version}</version>
</dependency>
        <!-- shenyu modify response plugin end-->
```

* Selectors and rules, please refer to:[selector](../selector-and-rule)。

  * nly those matched requests can be modify response.


## ModifyResponsePlugin Guide
* 1.Configuration selector
* 2.Configuration rule
* 3.modify response header
  ![](/img/shenyu/plugin/modify-response/modifyHeader-en.png)
* 4.modify response body
  ![](/img/shenyu/plugin/modify-response/modifyBody-en.png)
* 参数详情:
  * addHeaders: 添加请求头，键值对形式
  * setHeaders: 添加请求头，键值对形式
  * replaceHeaderKeys: 替换请求头key的name，key是要被替换的值，value是替换后的值
  * removeHeaderKeys: 移除的请求头的key
  * statusCode: 响应状态码
  * addBodyKeys: 添加响应内容
  * replaceBodyKeys: 替换响应内容，key是要被替换的值，value是替换后的值
  * removeBodyKeys: 移除的响应内容的key

修改响应体是通过JSONPath来实现的，`$.` 代表根目录

上面的配置，插件开启前，响应内容为
```json
"id":3,"name":"hello world findById"}
```
插件开启后，响应内容为
```json
"id2":3,"add":"4"}
```


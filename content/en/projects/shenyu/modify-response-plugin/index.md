---
title: ModifyResponse Plugin
keywords: modifyResponse
description: modifyResponse Plugin
---

## Description

* `modifyResponse` is a native plugin of Apache ShenYu gateway and is used to edit response header and body and statusCode.


## Plugin Setting

* In `shenyu-admin` --> BasicConfig --> Plugin --> `modifyResponse` , set to enable.

## Plugin Use

* Introduce `modifyResponse` dependency in the pom.xml file of the gateway.

```xml
  <!-- apache shenyu modify response plugin start-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-modify-response</artifactId>
  <version>${project.version}</version>
</dependency>
        <!-- apache shenyu modify response plugin end-->
```

* Selectors and rules, please refer to:[Selector And Rule Config](../selector-and-rule)。

  * only those matched requests can be modify response.


## ModifyResponsePlugin Guide
* 1.Configuration selector
* 2.Configuration rule
* 3.modify response statusCode
  ![](/img/shenyu/plugin/modify-response/modifyStatus-en.png)
* 4.modify response header
  ![](/img/shenyu/plugin/modify-response/modifyHeader-en.png)
* 5.modify response body
  ![](/img/shenyu/plugin/modify-response/modifyBody-en.png)
* param details:
  * addHeaders: add response header，key-value.
  * setHeaders: set response header，key-value.
  * replaceHeaderKeys: replace response header name，key is the value to be replaced，value is the value after replacement
  * removeHeaderKeys: remove response header key
  * statusCode: response status code
  * addBodyKeys: add response body
  * replaceBodyKeys: replace response body ，key is the value to be replaced，value is the value after replacement
  * removeBodyKeys: remove response body key

modify response body is achieved through JSONPath,`$.` represents the root directory.

use the configuration，unopened the plugin，response body is
```json
{"id":3,"name":"hello world findById"}
```
open the plugin，response body is
```json
{"id2":3,"add":"4"}
```


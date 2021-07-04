---
title: ModifyResponse Plugin
keywords: modifyResponse
description: modifyResponse Plugin
---

## Description

* modifyResponse is a native plugin of ShenYu Gateway and is used to edit response header and body and statusCode.


## Plugin Setting

* 在 `shenyu-admin` -> plugin management --> `modifyResponse`set to enable.

## Plugin Use

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
"id":3,"name":"hello world findById"}
```
open the plugin，response body is
```json
"id2":3,"add":"4"}
```


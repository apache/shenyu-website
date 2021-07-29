---
title: Param-mapping Plugin
keywords: param-mapping-plugin
description:  param-mapping-plugin
---

## Description

* `param_mapping` is a native plugin of ShenYu Gateway and is used to edit your request param.


## Plugin Setting

* In `shenyu-admin` --> BasicConfig --> Plugin --> `param_mapping` , set to enable.

## Plugin Use

* Introduce `param_mapping` dependency in the pom.xml file of the gateway.

```xml
  <!-- shenyu param_mapping plugin start-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-param-mapping</artifactId>
  <version>${project.version}</version>
</dependency>
        <!-- shenyu param_mapping plugin end-->
```

* Selectors and rules, please refer to:[Selector And Rule Config](../selector-and-rule)。

  * Only those matched requests can be modify your request body.


## ParamMappingPlugin Guide
* 1.Configuration selector
* 2.Configuration rule
* 3.modify request body
  ![](/img/shenyu/plugin/param-mapping/param-mapping.png)
* param details:
  * addParameterKeys: add a new key-value on body
  * replaceParameterKeys: replace request body's key ，key is the value to be replaced，value is the value after replacement
  * removeParameterKeys: remove a body key

param_mapping modify the request body is achieved through JSONPath, `$.` represents the root directory.

use the configuration，unopened the plugin，request body is:
```json
{"id":3,"data":{"value":"18","age":"36"}}
```
open the plugin，the final request body is 
```json
{"name":"shenyu","userId":3,"data":{"age":"36"}}
```
add a new key-value `name:shenyu`,replace the key `id` to `userId`, remove the key `data.value` .

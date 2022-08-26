---
title: ParamMapping Plugin
keywords: ["paramMapping-plugin"]
description:  paramMapping-plugin
---

## Description

* `paramMapping` is a native plugin of Apache ShenYu Gateway and is used to edit your request param.

## Plugin Setting

* In `shenyu-admin` --> BasicConfig --> Plugin --> `paramMapping` , set to enable.

## Plugin Use

* Introduce `paramMapping` dependency in the pom.xml file of the gateway.

```xml
  <!-- apache shenyu param_mapping plugin start-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-param-mapping</artifactId>
  <version>${project.version}</version>
</dependency>
        <!-- apache shenyu param_mapping plugin end-->
```

* Selectors and rules, please refer to:[Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule)。

  * Only those matched requests can be modified your request body.


## ParamMappingPlugin Guide

* 1.Configuration selector
* 2.Configuration rule
* 3.modify request body
  ![](/img/shenyu/plugin/param-mapping/param-mapping.png)
* param details:
  * `addParameterKeys`: add a new `key-value` on body
  * `replaceParameterKeys`: replace request body's `key` ，`key` is the value to be replaced，`value` is the value after replacement
  * `removeParameterKeys`: remove a body `key`

param_mapping modify the request body is achieved through `JSONPath` , `$.` represents the root directory.

use the configuration，unopened the plugin，request body is:

```json
{"id":3,"data":{"value":"18","age":"36"}}
```

open the plugin，the final request body is

```json
{"name":"shenyu","userId":3,"data":{"age":"36"}}
```

add a new key-value `name:shenyu`,replace the key `id` to `userId`, remove the key `data.value` .

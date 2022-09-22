---
title: ModifyResponse Plugin
keywords: ["modifyResponse"]
description: modifyResponse plugin
---

# 1. Overview

## 1.1 Plugin Name

* ModifyResponse Plugin

## 1.2 Appropriate Scenario

* This plugin is used for modifying HTTP response status code, response headers or response body parameters.

## 1.3 Plugin functionality

* Reset HTTP response status code
* Add, set, replace or remove HTTP response headers.
* Add, replace or remove HTTP response body(JSON) parameters.

## 1.4 Plugin Code

* Core module ```shenyu-plugin-modify-response```
* Core class ```org.apache.shenyu.plugin.modify.response.ModifyResponsePlugin```

## 1.5 Added since which shenyu version

* 2.4.0

# 2. How to use plugin

## 2.1 Plugin-use procedure chart

![](/img/shenyu/plugin/modify-response/procedure-en.png)

## 2.2 Import pom

- import maven config in shenyu-bootstrap project's `pom.xml` file.

```xml
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-gateway</artifactId>
     <version>${project.version}</version>
  </dependency>
```

## 2.3 Enable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `modifyResponse` set Status enable.
- 
![](/img/shenyu/plugin/modify-response/enable-en.png)

## 2.4 Config plugin

* Selector and rule config, please refer: [Selector and rule config](../../user-guide/admin-usage/selector-and-rule).
* In `shenyu-admin` --> `PluginList` --> `HttpProcess` --> `modifyResponse`, add selector config first，then add rule config：
  * Add selector config
    ![](/img/shenyu/plugin/modify-response/plugin-selector-config-en.png)
  * Add rule config
    ![](/img/shenyu/plugin/modify-response/plugin-rule-config-en.png)

## 2.5 Examples

Here is an example of client project [shenyu-examples-http](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-http).

### 2.5.1 Example reset HTTP response status code

#### 2.5.1.1 Refer [Local Deployment](https://shenyu.apache.org/docs/deployment/deployment-local/) to start admin and bootstrap.

#### 2.5.1.2 Refer 2.2 to import pom and restart bootstrap.

#### 2.5.1.3 Refer 2.3 to enable plugin.

#### 2.5.1.4 Refer 2.4 to add plugin config.

Add plugin config:

![](/img/shenyu/plugin/modify-response/status-code-rule-config-en.png)

#### 2.5.1.5 Call Interface

![](/img/shenyu/plugin/modify-response//status-code-invoke-interface.png)

### 2.5.2 Example modify HTTP response headers

#### 2.5.2.1 Refer [Local Deployment](https://shenyu.apache.org/docs/deployment/deployment-local/) to start admin and bootstrap.

#### 2.5.2.2 Refer 2.2 to import pom and restart bootstrap.

#### 2.5.2.3 Refer 2.3 to enable plugin.

#### 2.5.2.4 Refer 2.4 to add plugin config.

Add plugin config:

![](/img/shenyu/plugin/modify-response/header-rule-config-en.png)

#### 2.5.2.5 Call Interface

![](/img/shenyu/plugin/modify-response/header-invoke-interface.png)

### 2.5.3 Example modify HTTP response body

#### 2.5.3.1 Refer [Local Deployment](https://shenyu.apache.org/docs/deployment/deployment-local/) to start admin and bootstrap.

#### 2.5.3.2 Refer 2.2 to import pom and restart bootstrap.

#### 2.5.3.3 Refer 2.3 to enable plugin.

#### 2.5.3.4 Refer 2.4 to add plugin config.

Add plugin config:

![](/img/shenyu/plugin/modify-response/body-rule-config-en.png)

#### 2.5.3.5 Call Interface

![](/img/shenyu/plugin/modify-response/body-invoke-interface.png)

## 3. How to disable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `modifyResponse` set Status disable.

![](/img/shenyu/plugin/modify-response/disable-en.png)

## 4. rule parameter list

for modifying status code:

* `statusCode`: reset response status code

for modifying response headers:

* `addHeaders`: add response headers, `k-v` format
* `setHeaders`: set response headers, `k-v` format
* `replaceHeaderKeys`: replace response headers，`key` is matching to the header key that should be replacing, value is target value after replacing 
* `removeHeaderKeys`: remove response headers，`key` is matching to the header key that should be removing

for modifying response body:

* `addBodyKeys`: add response body parameters
* `replaceBodyKeys`: replace response body parameters，`key` is matching to the body(JSON) key that should be replacing, value is target value after replacing
* `removeBodyKeys`: remove response body parameters，`key` is matching to the body(JSON) key that should be removing

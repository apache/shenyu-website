---
title: Rewrite Plugin
keywords: ["rewrite"]
description: rewrite plugin
---

# 1. Overview

## 1.1 Plugin Name

* Rewrite Plugin

## 1.2 Appropriate Scenario

* The request uri can be different from the target service by rewriting the path.

## 1.3 Plugin functionality

* This plugin is used to rewrite the request uri.

## 1.4 Plugin code

* Core Module `shenyu-plugin-rewrite`

* Core Class `org.apache.shenyu.plugin.rewrite.RewritePlugin`

## 1.5 Added Since Which shenyu version

* Since ShenYu 2.4.0

# 2. How to use plugin

## 2.1 Plugin-use procedure chart

![](/img/shenyu/plugin/rewrite/rewrite_use_en.png)

## 2.2 Import pom

- Import maven config in shenyu-bootstrap project's `pom.xml` file..

```xml
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-rewrite</artifactId>
      <version>${project.version}</version>
  </dependency>
```

## 2.3 Enable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `rewrite` set Status enabled.
![](/img/shenyu/plugin/rewrite/rewrite_open_en.png)

## 2.4 Config plugin

### 2.4.1 Plugin Config

* Enable the plugin before using.
* Disable the plugin if don't use. 

### 2.4.2 Selector Config

* Please refer to: [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule).

### 2.4.3 Rule Config

![](/img/shenyu/plugin/rewrite/rewrite_rule_config.png)

* Param details:
  * `regex`: The regular expression that matches the part of uri to be rewrited.
  * `replace`: The content of replacement.
  * `percentage` : The percentage of rewriting, 100 represents 100%.
  * `rewriteMetaData`: Whether to rewrite metadata, true indicates that it is enabled, and once enabled, the uri can be rewritten across plugins.

## 2.5 Examples

### 2.5.1 Example for rewriting uri

#### 2.5.1.1 Run the shenyu-examples-http project

* Use [shenyu-examples-http](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-http), please refer to [Run the shenyu-examples-http project](../../quick-start/quick-start-http#run-the-shenyu-examples-http-project)

#### 2.5.1.1 Plugin Config

* Refer to [2.4.1](#241-plugin-config) to configure plugin.

#### 2.5.1.2 Selector Config

* Refer to [2.4.2](#242-selector-config) to configure selector

#### 2.5.1.3 Rule Config

![](/img/shenyu/plugin/rewrite/rewrite_example_rule.png)

The request `/http/hello` would be rewritten to `/hi`

#### 2.5.1.4 Check Result

Use some tool (such as Postman) to make a request:

![](/img/shenyu/plugin/rewrite/rewrite_example_result.png)

# 3. How to disable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `rewrite` set Status disable.

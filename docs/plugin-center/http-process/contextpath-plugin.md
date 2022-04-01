---
title: ContextPath Plugin
keywords: ["contextPath"]
description: contextPath plugin
---

# 1. Overview

## 1.1 Plugin Name

* ContextPath Plugin

## 1.2 Appropriate Scenario

* Different services can do traffic governance of services by setting different context paths.

## 1.3 Plugin functionality

* Set the context path for service.
* When the interface is called, the plug-in uniformly prefixes the interface address of the service.

## 1.4 Plugin Code

* Core module ```shenyu-plugin-context-path```
* Core class ```org.apache.shenyu.plugin.context.path.ContextPathPlugin```

## 1.5 Added since which shenyu version

* 2.3.0

# 2. How to use plugin

## 2.1 Plugin-use procedure chart

![](/img/shenyu/plugin/context-path/procedure-en.png)

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

- In `shenyu-admin` --> BasicConfig --> Plugin --> `contextPath` set Status enable.

![](/img/shenyu/plugin/context-path/enable-en.png)

## 2.4 Config plugin

- Set client project's contextPath.

![](/img/shenyu/plugin/context-path/client-project-config.png)

- Selector and rule config, please refer: [Selector and rule config](../../user-guide/admin-usage/selector-and-rule).
- shenyu-admin contextPath plugin config, config contextPath and addPrefix, contextPath defines the value of contextPath, 
- and addPrefix defines the prefix that needs to be automatically added when the interface is called.

![](/img/shenyu/plugin/context-path/plugin-config-en.png)

## 2.5 Examples

### 2.5.1 Example set service context path

#### 2.5.1.1 Refer [Local Deployment](https://shenyu.apache.org/docs/deployment/deployment-local/) to start admin and bootstrap.

#### 2.5.1.2 Refer 2.2 to import pom and restart bootstrap.

#### 2.5.1.3 Refer 2.3 to enable plugin.

#### 2.5.1.4 Client project config contextPath.

Client project can directly use [shenyu-examples-http](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-http), and config contextPath in application.yml.

![](/img/shenyu/plugin/context-path/client-project-config.png)

- After the configuration is completed, and start client project, you can see that there is an additional context selector and rule configuration in shenyu-admin.

![](/img/shenyu/plugin/context-path/context-path-selector-and-rule-en.png)

#### 2.5.1.5 Call Interface

![](/img/shenyu/plugin/context-path/invoke-interface.png)

### 2.5.2 Example add prefix

#### 2.5.2.1 Refer [Local Deployment](https://shenyu.apache.org/docs/deployment/deployment-local/) to start admin and bootstrap.

#### 2.5.2.2 Refer 2.2 to import pom and restart bootstrap.

#### 2.5.2.3 Refer 2.3 to enable plugin.

#### 2.5.2.4 Client project config contextPath.

For client project we can directly use [shenyu-examples-http](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-http), and config contextPath in application.yml.

![](/img/shenyu/plugin/context-path/client-project-config.png)

- After the configuration is completed, start client project, you can see that there is an additional context selector and rule configuration in shenyu-admin.

![](/img/shenyu/plugin/context-path/context-path-selector-and-rule-en.png)

#### 2.5.2.5 Config addPrefix

![](/img/shenyu/plugin/context-path/add-prefix-en.png)
 
#### 2.5.2.6 Modify the value of uri in the selector and condition configuration to delete the addPrefix part. 

Since this example uses the service of the http protocol, we need to modify the divide plugin.

![](/img/shenyu/plugin/context-path/remove-add-prefix-en.png)

#### 2.5.2.5 Call Interface

![](/img/shenyu/plugin/context-path/invoke-interface-add-prefix.png)

# 3. How to disable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `contextPath` set Status disable.

![](/img/shenyu/plugin/context-path/disable-en.png)

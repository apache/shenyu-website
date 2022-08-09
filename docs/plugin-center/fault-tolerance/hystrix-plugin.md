---
title: Hystrix Plugin
keywords: ["Hystrix"]
description: hystrix plugin
---



# 1. Overview

## 1.1 Plugin Name

* Hystrix Plugin

## 1.2 Appropriate Scenario

* The backend service is unstable, use hystrix for protection

## 1.3 Plugin functionality

* Fusing the flow
* Protect the application behind ShenYu Gateway
* Isolation mode supports `thread` and `semaphore`.

## 1.4 Plugin code

* Core Module: `shenyu-plugin-hystrix`

* Core Class: `org.apache.shenyu.plugin.hystrix.HystrixPlugin`

## 1.5 Added Since Which shenyu version

* Since ShenYu 2.4.0

# 2. How to use plugin

## 2.1 Plugin-use procedure chart

![](/img/shenyu/plugin/plugin_use_en.jpg)

## 2.2 Import pom

* Add `hystrix` dependency in the `pom.xml` file of the gateway.

```xml
<!-- apache shenyu hystrix plugin start-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-hystrix</artifactId>
  <version>${project.version}</version>
</dependency>
<!-- apache shenyu hystrix plugin end-->
```

## 2.3 Enable plugin

* In `shenyu-admin`--> BasicConfig --> Plugin --> `hystrix` set to enable.

## 2.4 Config plugin

### 2.4.1 Plugin Config

* No Config, but you should open hystrix plugin.

### 2.4.2 Selector Config

It is used to filter traffic for the first time and does not require handle fields.

For more information on selectors and rules configuration, see [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule) , only some of the fields are covered here.

![](/img/shenyu/plugin/hystrix/selector_en.png)

### 2.4.3 Rule Config

* For the final filtering of traffic, there is a rule handler logic, isolation mode supports `thread` and `semaphore`.

![](/img/shenyu/plugin/hystrix/rule_en.png)

* Hystrix handler details:

  * `MinimumRequests`: the minimum number of requests required to trigger a circuit breaker.

  * `ErrorThresholdPercentage`: percentage of exception occurring during that time.

  * `MaxConcurrentRequests`: max concurrent requests.

  * `Sleep`(ms): The recovery time after the circuit breaker.

  * `GroupKey`: It is generally set to: `contextPath`.

  * `CallBackUrl`: default url `/fallback/hystrix`.

  * `CommandKey`: generally, it is set to a specific path interface.

## 2.5 Examples

### 2.5.1 use hystrix protect application

#### 2.5.1.1 Preparation

- Start ShenYu Admin
- Start ShenYu Bootstrap
- Start a backend service

#### 2.5.1.2 Selector Config

![](/img/shenyu/plugin/hystrix/selector_en.png)

#### 2.5.1.3 Rule Config

#### 2.5.1.4 Send Request With `Apache Jmeter`

#### 2.5.1.5 Check Result


# 3. How to disable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `hystrix` set Status disable.

## Description

* `Hystrix` plugin is the core implementation used by gateway to fuse traffic.
* Support `thread` and `semaphore` .

## Plugin Setting

Select a mode to start shenyu-admin. For details, see  deployment. For example, with [Local Deployment](../../deployment/deployment-local) starts the `Apache ShenYu` background management system.

* In BasicConfig --> Plugin --> hystrix, set to enable.
* If the user don't use, please disable the plugin in the background.

<img src="/img/shenyu/plugin/hystrix/hystrix_open_en.png" width="80%" height="80%" />


## Add hystrix plugin dependency

* Add `hystrix` dependency in the `pom.xml` file of the gateway.

```xml
        <!-- apache shenyu hystrix plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-hystrix</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- apache shenyu hystrix plugin end-->
``` 



## Hystrix Config


For more information on selectors and rules configuration, see [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule) , only some of the fields are covered here.

#### Selector Config

It is used to filter traffic for the first time and does not require handle fields.

<img src="/img/shenyu/plugin/hystrix/selector_en.png" width="80%" height="80%" />

#### Rule Config

For the final filtering of traffic, there is a rule handler logic, isolation mode supports `thread` and `semaphore`.

<img src="/img/shenyu/plugin/hystrix/rule_en.png" width="80%" height="80%" />



* Hystrix handler details:

  * `MinimumRequests`: the minimum number of requests required to trigger a circuit breaker.

  * `ErrorThresholdPercentage`: percentage of exception occurring during that time.

  * `MaxConcurrentRequests`: max concurrent requests.

  * `Sleep`(ms): The recovery time after the circuit breaker.

  * `GroupKey`: It is generally set to: `contextPath`.

  * `CallBackUrl`: default url `/fallback/hystrix`.

  * `CommandKey`: generally, it is set to a specific path interface.
                  

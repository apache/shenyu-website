---
title: Hystrix Plugin
keywords: ["Hystrix"]
description: hystrix plugin
---

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
                  

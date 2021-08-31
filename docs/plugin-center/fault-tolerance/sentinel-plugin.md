---
title: Sentinel Plugin
keywords: ["Sentinel"]
description: sentinel plugin
---


## Description

* Sentinel is one of the options that supports flow control and circuit breaking.
* Sentinel supports flow control and circuit breaking functions for gateway.


## Plugin Setting

Select a mode to start shenyu-admin. For details, see  deployment. For example, with [Local Deployment](../../deployment/deployment-local) starts the `Apache ShenYu` background management system.

* In BasicConfig --> Plugin --> sentinel, set to enable.
* If the user don't use, please disable the plugin in the background.

<img src="/img/shenyu/plugin/sentinel/sentinel_open_en.png" width="80%" height="80%" />


## Add sentinel plugin dependency

* Add `sentinel` dependency in the `pom.xml` file of the gateway.

```xml
        <!-- apache shenyu sentinel plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-sentinel</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- apache shenyu sentinel plugin end-->
``` 


## Sentinel Config

For more information on selectors and rules configuration, see [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule) , only some of the fields are covered here.

#### Selector Config

It is used to filter traffic for the first time and does not require `handle` fields.


<img src="/img/shenyu/plugin/sentinel/selector_en.png" width="80%" height="80%" />

#### Rule Config

For the final filtering of traffic, there is a rule handler logic.


<img src="/img/shenyu/plugin/sentinel/rule_en.png" width="80%" height="80%" />



* sentinel handler details:

  * `degradeRuleCount`: threshold.

  * `degradeRuleEnable (1 or 0)`: whether enable circuit breaking function of `sentinel`.

  * `degradeRuleGrade`: circuit breaker strategy, support RT of seconds level/ Error Ratio of seconds level/ Error Count of minutes level strategy.

  * `degradeRuleMinRequestAmount`: circuit breaker min request amount.

  * `degradeRuleSlowRatioThreshold`: slow ratio threshold of degrading.

  * `getDegradeRuleStatIntervals`: status intervals of degrade.

  * `degradeRuleTimeWindow`: time of degrading(unit: second).

  * `flowRuleControlBehavior`: effect(reject directly/ queue/ slow start up), it do not support flow control by invocation relation.

  * `flowRuleCount`:  sentinel flow control count.

  * `flowRuleEnable (1 or 0)`: whether enable sentinel flow control function.

  * `flowRuleGrade`: type of current limit threshold(QPS or Thread Count)。

  * `fallbackUri`: degraded uri after circuit breaking.


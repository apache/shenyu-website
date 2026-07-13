---
title: Resilience4j Plugin
keywords: ["Resilience4j"]
description: resilience4j plugin
---

## Description

* `Resilience4j` is one of the options that supports flow control and circuit breaking.
* `Resilience4j` supports flow control and circuit breaking functions for gateway.

## Plugin Setting

Select a mode to start shenyu-admin. For details, see  deployment. For example, with [Local Deployment](../../deployment/deployment-local) starts the `Apache ShenYu` background management system.

* In BasicConfig --> Plugin --> resilience4j, set to enable.
* If the user don't use, please disable the plugin in the background.

<img src="/img/shenyu/plugin/resilience4j/resilience4j-plugin-en-1.png" width="80%" height="80%" />



## Add resilience4j plugin dependency

* Add `resilience4j` dependency in the `pom.xml` file of the gateway.

```xml
        <!-- apache shenyu resilience4j plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-resilience4j</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- apache shenyu resilience4j plugin end-->
``` 

## Resilience4j Config

For more information on selectors and rules configuration, see [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule) , only some of the fields are covered here.

#### Selector Config

It is used to filter traffic for the first time and does not require handle fields.


<img src="/img/shenyu/plugin/resilience4j/resilience4j-plugin-en-2.png" width="80%" height="80%" />

#### Rule Config

For the final filtering of traffic, there is a rule handler logic.

<img src="/img/shenyu/plugin/resilience4j/resilience4j-plugin-en-3.png" width="80%" height="80%" />

* Resilience4j Processing Details

  * `limitForPeriod` ：Configures the number of permissions available during one limit refresh period,default value:`50`.

  * `limitRefreshPeriod` ：Configures the period of a limit refresh. After each period the rate limiter sets its permissions count back to the limitForPeriod value,default value:`500`.

  * `timeoutDurationRate` ：Configures wait time(ms) a thread waits for a permission,default value:`5000`.

  * `circuitEnable` ：Configures circuitBreaker enable, `0`:OFF ,`1`:ON ,default value:`0`.

  * `failureRateThreshold` ：Configures the failure rate threshold in percentage,When the failure rate is equal or greater than the threshold the CircuitBreaker transitions to open and starts short-circuiting calls,default value:`50`.

  * `fallbackUri` ：Configures the fallback uri.

  * `minimumNumberOfCalls` ：Configures the minimum number of calls which are required (per sliding window period) before the CircuitBreaker can calculate the error rate or slow call rate,default value:`100`.

  * `bufferSizeInHalfOpen`：Configures the number of permitted calls when the CircuitBreaker is half open,default value:`10`.

  * `slidingWindowSize` ：Configures the size of the sliding window which is used to record the outcome of calls when the CircuitBreaker is closed,default value:`100`.

  * `slidingWindowType` ：Configures the type of the sliding window which is used to record the outcome of calls when the CircuitBreaker is closed,
      Sliding window can either be `0`:count-based or `1`:time-based.,default value:`0`.

  * `timeoutDuration` ：Configures request CircuitBreaker timeout(ms),default value:`30000`.

  * `waitIntervalInOpen` ：Configures the circuitBreaker time(ms) of duration,default value:`10`.

  * `automaticTransitionFromOpenToHalfOpenEnabled` ：Configures automatically transition from open state to half open state,`true`:ON, `false`:OFF, default value:`false`.

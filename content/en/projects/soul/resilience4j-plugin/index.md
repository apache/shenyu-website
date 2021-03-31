---
title: plugin-resilience4j
keywords: soul
description: resilience4j plugin
---

## Explanation

* Resilience4j is one of the options that supports flow control and circuit breaking.
* Resilience4j supports flow control and circuit breaking functions for gateway.

## Plugin Setting

* In `soul-admin` -->  plugin management --> `resilience4j` set to enable.
* If you don't want to use it, please close the plugin in `soul-admin`.

## Plugin Usage

* Introducing the follow supports to the pom.xml file of soul project.

```xml
  <!-- soul resilience4j plugin start-->
  <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-resilience4j</artifactId>
       <version>${last.version}</version>
  </dependency>
  <!-- soul resilience4j plugin end-->
``` 

* Selectors and rules, please refer to: [selector](../selector-and-rule)

* Resilience4j Processing Details

    * timeoutDurationRate ：Configures wait time(ms) a thread waits for a permission,default value:5000。
    
    * limitRefreshPeriod ：Configures the period of a limit refresh. After each period the rate limiter sets its permissions count back to the limitForPeriod value,default value:500。
    
    * limitForPeriod ：Configures the number of permissions available during one limit refresh period,default value:50。
    
    * circuitEnable ：Configures circuitBreaker enable,0:OFF,1:ON ,default value:0。
    
    * timeoutDuration ：Configures request CircuitBreaker timeout(ms),default value:30000。
    
    * fallbackUri ：Configures the fall back uri。
    
    * slidingWindowSize ：Configures the size of the sliding window which is used to record the outcome of calls when the CircuitBreaker is closed,default value:100。
    
    * slidingWindowType ：Configures the type of the sliding window which is used to record the outcome of calls when the CircuitBreaker is closed,
                          Sliding window can either be 0:count-based or 1:time-based.,default value:0。
   
    * minimumNumberOfCalls ：Configures the minimum number of calls which are required (per sliding window period) before the CircuitBreaker can calculate the error rate or slow call rate,default value:100。

    * waitIntervalFunctionInOpenState ：Configures the circuitBreaker time(ms) of duration,default value:10。

    * permittedNumberOfCallsInHalfOpenState ：Configures the number of permitted calls when the CircuitBreaker is half open,default value:10。

    * failureRateThreshold ：Configures the failure rate threshold in percentage,When the failure rate is equal or greater than the threshold the CircuitBreaker transitions to open and starts short-circuiting calls,default value:50。

    * automaticTransitionFromOpenToHalfOpenEnabled ：Configures automatically transition from open state to half open state,true:ON,false:OFF,default value:false。

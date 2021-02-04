---
title: plugin-sentinel
keywords: soul
description: sentinel plugin
---

## Explanation

* Sentinel is one of the options that supports flow control and circuit breaking.

* Sentinel supports flow control and circuit breaking functions for gateway.


## Plugin Setting

* In `soul-admin` -->  plugin management --> `sentinel` set to enable.

* If you don't want to use it, please close the plugin in `soul-admin`.


## Plugin Usage

* Introducing the follow supports to the pom.xml file of soul project.

```xml
  <!-- soul sentinel plugin start-->
  <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-sentinel</artifactId>
       <version>${last.version}</version>
  </dependency>
  <!-- soul sentinel plugin end-->
``` 

* Selectors and rules, please refer to: [selector](../selector-and-rule)

* Sentinel Processing Details
    
    * `flowRuleEnable (1 or 0)`: whether enable sentinel flow control function.
    
    * `flowRuleControlBehavior`: effect(reject directly/ queue/ slow start up), it do not support flow control by invocation relation. 
    
    * `flowRuleGrade`: type of current limit threshold(QPS or Thread Count)。
        
    * `degradeRuleEnable (1 or 0)`: whether enable circuit breaking function of `sentinel`.
        
    * `degradeRuleGrade`: circuit breaker strategy, support RT of seconds level/ Error Ratio of seconds level/ Error Count of minutes level strategy.
        
    * `degradeRuleCount`: threshold.
      
    * `degradeRuleTimeWindow`: time of degrading(unit: second).
        
    * `fallbackUri`: degraded uri after circuit breaking.


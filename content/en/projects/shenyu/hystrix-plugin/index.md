---
title: Hystrix Plugin
keywords: Apache ShenYu
description: hystrix plugin
---

## Explanation

* Hystrix plugin is the core implementation used by gateway to fuse traffic.
* Use semaphores to process requests.

## Plugin Setting

* In `shenyu-admin` --> plugin management --> `hystrix`, set to enable.
* If the user don't use, please disable the plugin in the background.

## Plugin Instruction

* Introduce `hystrix` dependency in the pom.xml file of the gateway.

```xml
  <!-- apache shenyu hystrix plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-hystrix</artifactId>
       <version>${last.version}</version>
  </dependency>
  <!-- apache shenyu hystrix plugin end-->
``` 

* Selectors and rules, please refer to: [selector](../selector-and-rule).

* Hystrix processing details:
    
    * Trip minimum request quantity: the minimum request quantity, which must be reached at least before the fuse is triggered
    * Error half-score threshold: the percentage of exceptions in this period of time.
    * Maximum concurrency: the maximum concurrency
    * Trip sleep time (ms): the recovery time after fusing.
    * Grouping Key: generally set as: contextPath
    * Command Key: generally set to specific path interface.
    * CallBackUrl: default url: /fallback/hystrix.

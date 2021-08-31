---
sidebar_position: 6
title: Hystrix Plugin
keywords: ["soul"]
description: hystrix plugin
---

## Explanation

* Hystrix plugin is the core implementation used by gateway to fuse traffic.
* Use semaphores to process requests.

## Plugin Setting

* In `soul-admin` --> plugin management --> `hystrix`, set to enable.
* If the user don't use, please disable the plugin in the background.

## Plugin Instruction

* Introduce `hystrix` dependency in the pom.xml file of the gateway.

```xml
  <!-- soul hystrix plugin start-->
  <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-hystrix</artifactId>
       <version>${last.version}</version>
  </dependency>
  <!-- soul hystrix plugin end-->
``` 

* Selectors and rules, please refer to: [selector](../admin/selector-and-rule).

* Hystrix processing details:
    
    * Trip minimum request quantity: the minimum request quantity, which must be reached at least before the fuse is triggered
    * Error half-score threshold: the percentage of exceptions in this period of time.
    * Maximum concurrency: the maximum concurrency
    * Trip sleep time (ms): the recovery time after fusing.
    * Grouping Key: generally set as: contextPath
    * Command Key: generally set to specific path interface.
    * CallBackUrl: default url: /fallback/hystrix.

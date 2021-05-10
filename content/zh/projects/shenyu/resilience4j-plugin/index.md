---
title: Resilience4j插件
keywords: shenyu
description: resilience4j插件
---

## 说明

* resilience4j插件是网关用来对流量进行限流与熔断的可选选择之一。
* resilience4j为网关熔断限流提供能力。

## 插件设置

* 在 `shenyu-admin` -->  插件管理 --> `resilience4j`，设置为开启。
* 如果用户不使用，则在 `shenyu-admin` 后台把此插件停用。

## 插件使用

* 在网关的 pom.xml 文件中添加 resilience4j的支持。

```xml
  <!-- shenyu resilience4j plugin start-->
  <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-resilience4j</artifactId>
       <version>${last.version}</version>
  </dependency>
  <!-- shenyu resilience4j plugin end-->
``` 

* 选择器和规则，请详细看：[选择器规则](../selector-and-rule)

* Resilience4j处理详解：

    * timeoutDurationRate：等待获取令牌的超时时间，单位ms，默认值：5000。
    
    * limitRefreshPeriod：刷新令牌的时间间隔，单位ms，默认值：500。
    
    * limitForPeriod：每次刷新令牌的数量，默认值：50。
    
    * circuitEnable：是否开启熔断，0：关闭，1：开启，默认值：0。
    
    * timeoutDuration：熔断超时时间，单位ms，默认值：30000。
    
    * fallbackUri：降级处理的uri。
    
    * slidingWindowSize：滑动窗口大小，默认值：100。
    
    * slidingWindowType：滑动窗口类型，0：基于计数，1：基于时间，默认值：0。
   
    * minimumNumberOfCalls：开启熔断的最小请求数，超过这个请求数才开启熔断统计，默认值：100。

    * waitIntervalFunctionInOpenState：熔断器开启持续时间，单位ms，默认值：10。

    * permittedNumberOfCallsInHalfOpenState：半开状态下的环形缓冲区大小，必须达到此数量才会计算失败率，默认值：10。

    * failureRateThreshold：错误率百分比，达到这个阈值，熔断器才会开启，默认值50。

    * automaticTransitionFromOpenToHalfOpenEnabled：是否自动从open状态转换为half-open状态，,true：是，false：否，默认值：false。

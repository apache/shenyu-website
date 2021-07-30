---
title: Resilience4j插件
keywords: Apache ShenYu
description: resilience4j插件
---

## 说明

* `resilience4j`插件是网关用来对流量进行限流与熔断的可选选择之一。
* `resilience4j`为网关熔断限流提供能力。


## 插件设置

请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](../deployment-local) 启动`Apache ShenYu`后台管理系统。

* 在 基础配置 `-->`  插件管理 `-->` `resilience4j`，设置为开启。 如果用户不使用，可以将其关闭。

<img src="/img/shenyu/plugin/resilience4j/resilience4j-1.png" width="80%" height="80%" />


## 在网关中引入 resilience4j 插件

* 在网关的 `pom.xml` 文件中添加 `resilience4j`的依赖。

```xml
        <!-- apache shenyu resilience4j plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-resilience4j</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- apache shenyu resilience4j plugin end-->
``` 

##  resilience4j 插件配置

关于选择器和规则配置的更多说明，请参考：[选择器和规则管理](../selector-and-rule)， 这里只对部分字段进行了介绍。

####  选择器配置

用于对流量第一次筛选，不需要特殊处理字段。

<img src="/img/shenyu/plugin/resilience4j/resilience4j-2.png" width="80%" height="80%" />

####  规则配置

用于对流量最终筛选，有规则处理逻辑。 

<img src="/img/shenyu/plugin/resilience4j/resilience4j-3.png" width="80%" height="80%" />


* `resilience4j`处理详解：

    * timeoutDurationRate：等待获取令牌的超时时间，单位ms，默认值：5000。
    
    * limitRefreshPeriod：刷新令牌的时间间隔，单位ms，默认值：500。
    
    * limitForPeriod：每次刷新令牌的数量，默认值：50。
    
    * circuitEnable：是否开启熔断，0：关闭，1：开启，默认值：0。
    
    * timeoutDuration：熔断超时时间，单位ms，默认值：30000。
    
    * fallbackUri：降级处理的uri。
    
    * slidingWindowSize：滑动窗口大小，默认值：100。
    
    * slidingWindowType：滑动窗口类型，0：基于计数，1：基于时间，默认值：0。
   
    * minimumNumberOfCalls：开启熔断的最小请求数，超过这个请求数才开启熔断统计，默认值：100。

    * waitIntervalInOpen：熔断器开启持续时间，单位ms，默认值：60000。

    * bufferSizeInHalfOpen：半开状态下的环形缓冲区大小，必须达到此数量才会计算失败率，默认值：10。

    * failureRateThreshold：错误率百分比，达到这个阈值，熔断器才会开启，默认值50。

    * automaticTransitionFromOpenToHalfOpenEnabled：是否自动从open状态转换为half-open状态，,true：是，false：否，默认值：false。

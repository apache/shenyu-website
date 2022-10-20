---
title: Sentinel Plugin
keywords: ["Sentinel"]
description: sentinel plugin
---

# 1. Overview

## 1.1 Plugin Name

* Sentinel Plugin

## 1.2 Appropriate Scenario

* `Sentinel` is one of the options that supports flow control and circuit breaking.
* `Sentinel` supports flow control and circuit breaking functions for gateway.

## 1.3 Plugin functionality

* flow control
* request circuit breaker and service degrade

## 1.4 Plugin code

* Core Module `shenyu-plugin-sentinel`.

* Core Class `org.apache.shenyu.plugin.sentinel.SentinelPlugin`

## 1.5 Added Since Which shenyu version

* Since 2.4.0

# 2. How to use plugin

## 2.1 Plugin-use procedure chart

![](/img/shenyu/plugin/plugin_use_en.jpg)

## 2.2 Import pom

* Add `sentinel` dependency in the `pom.xml` file of the gateway(shenyu-bootstrap).

```xml
<!-- apache shenyu sentinel plugin start-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-sentinel</artifactId>
  <version>${project.version}</version>
</dependency>
<!-- apache shenyu sentinel plugin end-->
``` 

## 2.3 Enable plugin

* In `shenyu-admin`--> BasicConfig --> Plugin --> `sentinel` set to enable.

## 2.4 Config plugin

### 2.4.1 Plugin configuration

### 2.4.2 Selector configuration

It is used to filter traffic for the first time and does not require `handle` fields.

<img src="/img/shenyu/plugin/sentinel/selector_en.png" width="80%" height="80%" />

### 2.4.3 Rule configuration

For the final filtering of traffic, there is a rule handler logic.

<img src="/img/shenyu/plugin/sentinel/rule_en.png" width="80%" height="80%" />

| field                                               | default value      | field type | desc                                                                                                                       |
|-----------------------------------------------------|--------------------|------------|----------------------------------------------------------------------------------------------------------------------------|
| degradeRuleCount                                    |                    | Doule      | degrade threshold                                                                                                          |
| degradeRuleEnable                                   | 1(enabled)         | Integer    | whether enable circuit breaking function of `sentinel`                                                                     |
| degradeRuleGrade                                    | 0(slow call ratio) | Integer    | circuit breaker strategy, support RT of seconds level/ Error Ratio of seconds level/ Error Count of minutes level strategy |
| degradeRuleMinRequestAmount                         | 5                  | Integer    | circuit breaker min request amount                                                                                         |
| degradeRuleSlowRatioThreshold                       | 1.0d               | Double     | slow ratio threshold of degrading                                                                                          |
| degradeRuleStatIntervals                            | 1                  | Integer    | status intervals of degrade                                                                                                |
| degradeRuleTimeWindow                               |                    | Integer    | time of degrading(unit: second)                                                                                            |
| flowRuleControlBehavior                             | 0(direact reject)  | Integer    | effect(reject directly/ queue/ slow start up), it do not support flow control by invocation relation.                      |
 | flowRuleControlBehavior-direct rejection by default |                    |            |                                                                                                                            |
| flowRuleControlBehavior-warm up                     |                    |            | |
| flowRuleControlBehavior-constant speed queuing      |                    |            | |
| flowRuleControlBehavior-preheating uniformly queued |                    |            | |
| flowRuleMaxQueueingTimeMs                           | 500ms              | Integer    | Maximum queuing time (valid in "preheating uniformly queued", "constant speed queuing" mode)                               |
| flowRuleWarmUpPeriodSec                             | 10                 | Integer    | Cold start warm-up time (seconds) (valid in "preheating uniformly queued" "warm up" mode)                                  |
| flowRuleCount                                       |                    | Integer    | sentinel flow control count                                                                                                |
| flowRuleEnable                                      | 1(enabled)         | Integer    | whether enable sentinel flow control function.                                                                             |
| flowRuleGrade                                       | 1(QPS)             | Integer    | type of current limit threshold(QPS or Thread Count)。                                                                      |
| fallbackUri                                         |                    | String     | degraded uri after circuit breaking.                                                                                                                           |

## 2.5 Examples

### 2.5.1 Using sentinel for flow control

#### 2.5.1.1 Plugin configuration

For more information on selectors and rules configuration, see [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule) , only some of the fields are covered here.

* In `shenyu-admin`--> BasicConfig --> Plugin --> `sentinel` set to enable.

#### 2.5.1.2 Selector configuration

![](/img/shenyu/plugin/sentinel/example-selector-en.png)

#### 2.5.1.3 Rule configuration

![](/img/shenyu/plugin/sentinel/example-rule-en.png)

just use qps flow control strategy, and qps is 10, reject strategy is directly reject.

the code is as follows:

```java
@RestController
@RequestMapping("/order")
@ShenyuSpringMvcClient("/order")
public class OrderController {

    /**
     * Save order dto.
     *
     * @param orderDTO the order dto
     * @return the order dto
     */
    @PostMapping("/save")
    @ShenyuSpringMvcClient("/save")
    public OrderDTO save(@RequestBody final OrderDTO orderDTO) {
        orderDTO.setName("hello world save order");
        return orderDTO;
    }
}
```

#### 2.5.1.4 request by `Apache Jmeter`

* Jmeter thead group config

![](/img/shenyu/plugin/sentinel/sentinel-flow-control-config.png)

* Jmeter http request config

![](/img/shenyu/plugin/sentinel/sentinel-flow-control-http.png)

#### 2.5.1.5 Check result

![](/img/shenyu/plugin/sentinel/sentinel-flow-control.png)

### 2.5.2 Using sentinel for request circuit breaker

#### 2.5.2.1 Plugin configuration

* In `shenyu-admin`--> BasicConfig --> Plugin --> `sentinel` set to enable.

#### 2.5.2.2 Selector configuration

![](/img/shenyu/plugin/sentinel/example-selector-en.png)

#### 2.5.2.3 Rule configuration

![](/img/shenyu/plugin/sentinel/example-circuitbreaker-rule.png)

when degrade strategy is `exception number`, `degradeRuleSlowRatioThreshold` is not effective. When the minimum number of requests per unit of time is 5, and the request happens exception great than 3, it will trigger the circuit breaker.

when degrade strategy is `slow call ratio`, `degradeRuleSlowRatioThreshold` is effective, `degradeRuleCount` means RT(e.g. 200).

the code is as follows:

```java
@RestController
@RequestMapping("/order")
@ShenyuSpringMvcClient("/order")
public class OrderController {

    /**
     * Save order dto.
     *
     * @param orderDTO the order dto
     * @return the order dto
     */
    @PostMapping("/save")
    @ShenyuSpringMvcClient("/save")
    public OrderDTO save(@RequestBody final OrderDTO orderDTO) {

        Random random = new Random();
        int num = random.nextInt(100);
        if (num > 40) {
            throw new RuntimeException("num great than 20");
        }
        orderDTO.setName("hello world save order");
        return orderDTO;
    }

}
```

#### 2.5.2.4 request by `Apache Jmeter`

* Jmeter thead group config

![](/img/shenyu/plugin/sentinel/sentinel-flow-control-config.png)

* Jmeter http request config

![](/img/shenyu/plugin/sentinel/sentinel-flow-control-http.png)

#### 2.5.2.5 Check result

![](/img/shenyu/plugin/sentinel/example-circuitbreaker.png)

# 3. How to disable plugin 

- In `shenyu-admin` --> BasicConfig --> Plugin --> `sentinel` set Status disable.

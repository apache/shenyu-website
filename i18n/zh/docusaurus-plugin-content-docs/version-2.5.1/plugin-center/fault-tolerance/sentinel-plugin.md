---
title: Sentinel插件
keywords: ["Sentinel"]
description: sentinel插件
---

# 1. 概述

## 1.1 插件名称

* Sentinel插件

## 1.2 适用场景

* `sentinel`插件是网关用来对流量进行限流与熔断的可选选择之一。
* `sentinel`插件为网关熔断限流提供能力。

## 1.3 插件功能

* 流量控制
* 请求熔断和服务降级

## 1.4 插件代码

* 核心包 `shenyu-plugin-sentinel`.

* 核心类 `org.apache.shenyu.plugin.sentinel.SentinelPlugin`

## 1.5 添加自哪个shenyu版本

* 2.4.0

# 2. 如何使用插件

## 2.1 插件使用流程图

![](/img/shenyu/plugin/plugin_use_zh.jpg)

## 2.2 导入pom

* 在网关的 `pom.xml` 文件中添加 `sentinel` 依赖。

```xml
<!-- apache shenyu sentinel plugin start-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-sentinel</artifactId>
  <version>${project.version}</version>
</dependency>
<!-- apache shenyu sentinel plugin end-->
```

## 2.3 启用插件

* 在 基础配置 `-->`  插件管理 `-->` `sentinel`，设置为开启。

## 2.4 配置插件

### 2.4.1 插件配置

### 2.4.2 选择器配置

用于对流量第一次筛选，不需要特殊处理字段。

<img src="/img/shenyu/plugin/sentinel/selector_zh.png" width="80%" height="80%" />

### 2.4.3 规则配置

用于对流量最终筛选，有规则处理逻辑。

<img src="/img/shenyu/plugin/sentinel/rule_zh.png" width="80%" height="80%" />

| field                                               | default value      | field type | desc                                                                                                                       |
|-----------------------------------------------------|--------------------|------------|----------------------------------------------------------------------------------------------------------------------------|
| degradeRuleCount                                    |                    | Doule      | 降级阈值                                                                                                                       |
| degradeRuleEnable                                   | 1(enabled)         | Integer    | (是否开启流控 (1或0) ) ：是否开启`sentinel`的流控。                                                                     |
| degradeRuleGrade                                    | 0(slow call ratio) | Integer    | (断路器策略): 支持秒级RT/秒级Error Ratio/分钟级Error Count策略。 |
| degradeRuleMinRequestAmount                         | 5                  | Integer    | 断路器最小请求量。                                                                                        |
| degradeRuleSlowRatioThreshold                       | 1.0d               | Double     | 退化的慢比率阈值。                                                                                          |
| degradeRuleStatIntervals                            | 1                  | Integer    | 降级的状态间隔。                                                                                                |
| degradeRuleTimeWindow                               |                    | Integer    | 退化时间（单位：秒）。                                                                                            |
| flowRuleControlBehavior                             | 0(direact reject)  | Integer    | 效果（直接拒绝/排队/慢启动/冷启动+匀速器），不支持调用关系流控。                      |
| flowRuleControlBehavior-direct rejection by default |                    |            | direct rejection by default （直接拒绝）                                                                                                                           |
| flowRuleControlBehavior-warm up                     |                    |            | warm up （冷启动）                                                                                                                           |
| flowRuleControlBehavior-constant speed queuing      |                    |            | constant speed queuing （匀速排队，漏桶算法 ）                                                                                                                           |
| flowRuleControlBehavior-preheating uniformly queued |                    |            | 冷启动+匀速器，除了让流量缓慢增加，还还控制的了请求的间隔时间，让请求均匀速度通过。）                                                                                                                           |
| flowRuleMaxQueueingTimeMs                           | 500ms              | Integer    | 最大排队等待时长（在 “preheating uniformly queued“, “constant speed queuing“ 模式生效）。                               |
| flowRuleWarmUpPeriodSec                             | 10                 | Integer    | 冷启动预热时长（秒）  (在 “preheating uniformly queued” “warm up” 模式下生效)                                  |
| flowRuleCount                                       |                    | Integer    | 哨兵流控制计数。                                                                                                |
| flowRuleEnable                                      | 1(enabled)         | Integer    | 是否开启哨兵流控功能。                                                                             |
| flowRuleGrade                                       | 1(QPS)             | Integer    | 限流阈值的类型（QPS 或 Thread Count）。                                                                      |
| fallbackUri                                         |                    | String     | 断路后降级的uri。                                                                                       |

## 2.5 示例

### 2.5.1 使用sentinel进行流量控制

#### 2.5.1.1 插件配置

* 在 基础配置 `-->`  插件管理 `-->` `sentinel`，设置为开启。

#### 2.5.1.2 选择器配置

![](/img/shenyu/plugin/sentinel/example-selector-zh.png)

#### 2.5.1.3 规则配置

关于选择器和规则配置的更多说明，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)， 这里只对部分字段进行了介绍。

![](/img/shenyu/plugin/sentinel/example-rule-zh.png)

使用qps限流策略，并且qps为10，拒绝策略为直接拒绝。

代码如下：

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

#### 2.5.1.4 通过`Apache Jmeter`请求网关

* Jmeter线程组配置

![](/img/shenyu/plugin/sentinel/sentinel-flow-control-config.png)

* Jmeter http请求配置

![](/img/shenyu/plugin/sentinel/sentinel-flow-control-http.png)

#### 2.5.1.5 验证结果

![](/img/shenyu/plugin/sentinel/sentinel-flow-control.png)

### 2.5.2 使用sentinel进行熔断降级控制

#### 2.5.2.1 插件配置

* 在 基础配置 `-->`  插件管理 `-->` `sentinel`，设置为开启。

#### 2.5.2.2 选择器配置

![](/img/shenyu/plugin/sentinel/example-selector-zh.png)

#### 2.5.2.3 规则配置

![](/img/shenyu/plugin/sentinel/example-circuitbreaker-rule.png)

当degrade strategy为`exception number`时，`degradeRuleSlowRatioThreshold`无效。 当单位时间内的最小请求数为 5，且请求发生的异常大于 3 时，将触发断路器。

当degrade strategy为`slow call ratio`时，`degradeRuleSlowRatioThreshold`有效，`degradeRuleCount`表示RT（例如200）。


代码如下：

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

#### 2.5.2.4 通过`Apache Jmeter`请求网关

* Jmeter线程组配置

![](/img/shenyu/plugin/sentinel/sentinel-flow-control-config.png)

* Jmeter http请求配置

![](/img/shenyu/plugin/sentinel/sentinel-flow-control-http.png)

#### 2.5.2.5 验证结果

![](/img/shenyu/plugin/sentinel/example-circuitbreaker.png)

# 3. 如何禁用插件

* 在 基础配置 `-->`  插件管理 `-->` `sentinel`，设置为关闭。

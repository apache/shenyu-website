---
title: Sentinel插件
keywords: ["Sentinel"]
description: sentinel插件
---

## 说明

* `sentinel`插件是网关用来对流量进行限流与熔断的可选选择之一。
* `sentinel`插件为网关熔断限流提供能力。

## 插件设置

请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](../../deployment/deployment-local) 启动`Apache ShenYu`后台管理系统。

* 在 基础配置 `-->`  插件管理 `-->` `sentinel`，设置为开启。 如果用户不使用，可以将其关闭。

<img src="/img/shenyu/plugin/sentinel/sentinel_open_zh.png" width="80%" height="80%" />



## 在网关中引入 sentinel 插件

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


## sentinel 插件配置

关于选择器和规则配置的更多说明，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)， 这里只对部分字段进行了介绍。

#### 选择器配置

用于对流量第一次筛选，不需要特殊处理字段。

<img src="/img/shenyu/plugin/sentinel/selector_zh.png" width="80%" height="80%" />

#### 规则配置

用于对流量最终筛选，有规则处理逻辑。

<img src="/img/shenyu/plugin/sentinel/rule_zh.png" width="80%" height="80%" />



* `sentinel`处理详解：

  * `degradeRuleCount`:临界点

  * `degradeRuleEnable`(是否开启流控 (1或0) ) ：是否开启`sentinel`的流控。

  * `degradeRuleGrade`(断路器策略): 支持秒级RT/秒级Error Ratio/分钟级Error Count策略。

  * `degradeRuleMinRequestAmount`：断路器最小请求量。

  * `degradeRuleSlowRatioThreshold`：退化的慢比率阈值。

  * `getDegradeRuleStatIntervals`: 降级的状态间隔。

  * `degradeRuleTimeWindow`：退化时间（单位：秒）。

  * `flowRuleControlBehavior`：效果（直接拒绝/排队/慢启动），不支持调用关系流控。

  * `flowRuleCount`：哨兵流控制计数。

  * `flowRuleEnable (1 or 0)`：是否开启哨兵流控功能。

  * `flowRuleGrade`: 限流阈值的类型（QPS 或 Thread Count）。

  * `fallbackUri`：断路后降级的uri。

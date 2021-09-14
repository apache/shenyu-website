---
title: "MatchStrategy--基于SPI的代码分析"
author: "Huihui Yin"
author_title: Apache ShenYu Contributor
categories: "Apache ShenYu"
tags: ["SPI","Apache ShenYu"]
date: 2021-09-14
---

`Apache Shenyu` 网关的各个`Plugin`（包括`Dubbo`, `gRPC`,`Spring-cloud`等) 中，`routing`参数均设计为可以接受多个条件的组合。 为了实现这样的目的，遵循其`SPI`的机制进行将参数及行为抽象为如下三部分，这些`SPI` 在***shenyu-plugin-base***模组中实现

- `ParameterData`-参数资料
- `PredictJudge`-断言
- `MatchStrategy`-匹配策略

相对而言，匹配策略是需要扩展点最少的部分。想象一下，对多个条件的组合判断，最常见的几种规则是：全部都满足、至少满足一个条件、至少满足第一个，或者大部分满足等等。 并且要做到对各种`plugin`的不同类型的参数，如`IP`, `header`, `uri`等。针对这些需求，如何将`MatchStrategy`设计得简单易用且容易扩展？

## MatchStrategy

`MatchStrategy`的实现代码在***shenyu-plugin-base***模组中，基于`Apache Shenyu`的`SPI`创建机制， 设计上结合了工厂模式和策略模式，整体`MatchStrategy`的设计类图如下下：

![MatchStrategy-class-diagram](/img/activities/code-analysis-matchstrategy-spi/MatchStrategy-class-diagram.PNG)

以接口`MatchStrategy`为基础，设计实现类，并由抽象类`AbstractMatchStrategy`实现公共方法，由工厂类`MatchStrategyFactory`提供创建和外部调用功能。

## MatchStrategy Interface

首先来看`MatchStrategy` `SPI`接口的定义：

```java
@SPI
public interface MatchStrategy {

    Boolean match(List<ConditionData> conditionDataList, ServerWebExchange exchange);
}
```

@`SPI` `annotation`代表这是一个`SPI`接口。`ServerWebExchange` 是 `org.springframework.web.server.ServerWebExchange` ,代表`HTTP`的 `request-response`  的交互内容。`ConditionData`的代码如下，更多说明可以参考`PredicateJudge`[代码分析](http://shenyu.apache.org/blog/PredicateJudge-SPI)中的说明，

```java
public class ConditionData {

    private String paramType;
    private String operator;

    private String paramName;
    private String paramValue;
}
```

## AbstractMatchStrategy

在抽象类`AbstractMatchStrategy`中，定义`MatchStrategy`的公共方法， 用`buildRealData`方法中，用`ParameterData`工厂类`ParameterDataFactory`，将多种参数如  `Ip`, `Cookie`, `Header`,`uri`等资料都以统一的接口方法来呈现。这些参数格式及规则的修改，不会影响到对参数规则匹配`MatchStrategy`的调用。

```java
public abstract class AbstractMatchStrategy {

    public String buildRealData(final ConditionData condition, final ServerWebExchange exchange) {
        return ParameterDataFactory.builderData(condition.getParamType(), condition.getParamName(), exchange);
    }
}
```

## 实现类及Profile

基于上述接口定义, ***shenyu-plugin-base*** 模组提供了两个`MatchStrategy`实现类

- `AndMatchStrategy`-多个条件 AND

- `OrMatchStrategy`- 多个条件 OR

  并在`SHENYU_DIRECTORY`目录下的配置文件中，对实作类做了配置。在系统启动时会由顶层`SPI`以`key-value`形式加载并`cache`起来。

```properties
and=org.apache.shenyu.plugin.base.condition.strategy.AndMatchStrategy
or=org.apache.shenyu.plugin.base.condition.strategy.OrMatchStrategy
```

 两个实现类`AndMatchStrategy` 继承`AbstractMatchStrategy` 并实做了`MatchStrategy`。

### AndMatchStrategy-  “与”的关系

  由于`PredicateJudge`封装了条件判断的多样性，`ConditionData`和`ParameData`封装了多种参数。那么对于多个条件的匹配来说，采用`Stream`流处理及`lamda`表达式，非常简洁高效达成了：全部条件都满足，即"AND"的逻辑。

```java
@Join
public class AndMatchStrategy extends AbstractMatchStrategy implements MatchStrategy {

    @Override
    public Boolean match(final List<ConditionData> conditionDataList, final ServerWebExchange exchange) {
        return conditionDataList
                .stream()
                .allMatch(condition -> PredicateJudgeFactory.judge(condition, buildRealData(condition, exchange)));
    }
}
```

`OrMatchStrategy`是同样的实现方式，实现: 至少满足一个条件"OR"的规则，在此不做赘述。

## MatchStrategyFactory

这是`MatchStrategy`的工厂类，实现了两个方法，一个是`newInstance()`方法根据策略代码和名称，返回由`SPI` `ExtensionLoader`按key来加载对应的`MatchStrategy`实现类。

```java
    public static MatchStrategy newInstance(final Integer strategy) {
        String matchMode = MatchModeEnum.getMatchModeByCode(strategy);
        return ExtensionLoader.getExtensionLoader(MatchStrategy.class).getJoin(matchMode);
    }
```

在`MatchModeEnum` 中定义了match策略的code和name。 调用时由策略名称，如"and","or"，根据启动时SPI加载的key-value资料，找到对应的实现类：

```java
AND(0, "and"),  
OR(1, "or");
```

另一个是`match()`方法，调用实作类的`match`方法。

```java
    public static boolean match(final Integer strategy, final List<ConditionData> conditionDataList, final ServerWebExchange exchange) {
        return newInstance(strategy).match(conditionDataList, exchange);
    }
```

## 调用方式

在`shenyu-plugin`模组的各个`plugin`的基类`AbstractShenyuPlugin` 中，定义了两个选择的方法：`filterSelector` 和`filterRule` 它们都调用了`MatchStrategyFactory` 方法，下面是`AbstractShenyuPlugin`中`filterSelector`方法的代码：

```java
    private Boolean filterSelector(final SelectorData selector, final ServerWebExchange exchange) {        if (selector.getType() == SelectorTypeEnum.CUSTOM_FLOW.getCode()) {            if (CollectionUtils.isEmpty(selector.getConditionList())) {                return false;            }            return MatchStrategyFactory.match(selector.getMatchMode(), selector.getConditionList(), exchange);        }        return true;    }
```

这段代码中，先检测参数匹配条件`SelectorData`是否为空，之后调用`MatchStrategyFactory`的`match`方法，工厂方法将调用对应的实作类的`match`方法。同理，如下是`AbstractShenyuPlugin`中 `filterRule` 方法

```java
    private Boolean filterRule(final RuleData ruleData, final ServerWebExchange exchange) {        return ruleData.getEnabled() && MatchStrategyFactory.match(ruleData.getMatchMode(), ruleData.getConditionDataList(), exchange);    }
```

也同样是调用`MatchStrategyFactory`的`match`方法，看上去是不是特别的简洁甚至是简单？ 在`PredicteJudge`的[代码分析](http://shenyu.apache.org/blog/PredicateJudge-SPI)文中，对`shenyu-plugin`如何做参数调用方面做了更进一步的描述。

## Summary

由于应用了`Apache shenyu`的`SPI`框架，使得整体上具有松耦合、易于扩展的特点。在多个参数规则策略方面，`MatchStrategy`提供了良好的设计，虽然目前只提供了两个AND 和OR的实现类，但未来可以很轻松地扩展为更多`MatchStrategy`规则，例如 `firstOf`：即必须满足第一个条件，或`mostOf`-满足大部分条件等更多复杂策略，而其他调用部分的代码完全不受影响。 

有兴趣的读者可以去阅读`Shenyu plugin`的源码了解更多内容。

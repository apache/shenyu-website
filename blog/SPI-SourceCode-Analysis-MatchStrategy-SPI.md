---
title: "MatchStrategy  -- analyze the design based on SPI"
author: "Huihui Yin"
author_title: Apache ShenYu Contributor
tags: ["SPI","Apache ShenYu"]
---

In most of the `plugins` ( such as `Dubbo`, `gRPC`,`Spring-cloud`, etc) of `Apache Shenyu`, the `routing`parameters are designed to support the combination of multiple conditions. In order to realize such requirements,  the parameters and behaviors are abstracted to three parts according to its `SPI` mechanism,  and implemented in ***shenyu-plugin-base***  module.

- `ParameterData`-parameters
- `PredictJudge`-predicate
- `MatchStrategy`-matching strategy

Relatively speaking, the `MatchStrategy` is the part that needs the least extension points. For the combined judgement of multiple conditions, the common selection rules are: All conditions are matched, at least one is matched, at least the first is met, or most of conditions  satisfied.  As well  need to handle various types of parameters, for example: `IP`, `header`, `uri`, etc.  How to make the `MatchStrategy` to be simple to use and extensible?

## MatchStrategy

The implementation of `MatchStrategy` is in ***shenyu-plugin-base*** module. It has based on the SPI creation mechanism, and used factory pattern and strategy design pattern. The class diagram of `MatchStrategy` `is` showed as follows.

![MatchStrategy-class-diagram](/img/activities/code-analysis-matchstrategy-spi/MatchStrategy-class-diagram.PNG)

Base on the interface `MatchStrategy` to design the implementation classes, and the  abstract class `AbstractMatchStrategy` supplies common method, while the factory class `MatchStrategyFactory` provides creation  functions.

## MatchStrategy Interface

First, let's look at the `MatchStrategy` `SPI` interface

```java
@SPI
public interface MatchStrategy {

    Boolean match(List<ConditionData> conditionDataList, ServerWebExchange exchange);
}
```

The annotation `@SPI` means that this is an `SPI` interface. Where `ServerWebExchange` is `org.springframework.web.server.ServerWebExchange`, represents the request-response  interactive content of of HTTP. Following is the code of `ConditionData`, the more detail about this class can refer to [code analysis](http://shenyu.apache.org/blog/PredicateJudge-SPI) of `PredicteJudge`

```java
public class ConditionData {

    private String paramType;
    private String operator;

    private String paramName;
    private String paramValue;
}
```

## AbstractMatchStrategy

Second, let's look at the abstract class `AbstractMatchStrategy`，it has defined a `buildRealData`  method，in this method wrapped various parameters to a unified interface  through the functionality of `ParameterDataFactory`,  which is the factory class of `ParameterData`. There supports a variety  types of  parameters , such as `Ip`, `Cookie`, `Header`,`uri`, etc.  Modifications of such parameters will not impact the calling of matching rules of `MatchStrategy`.

```java
public abstract class AbstractMatchStrategy {

    public String buildRealData(final ConditionData condition, final ServerWebExchange exchange) {
        return ParameterDataFactory.builderData(condition.getParamType(), condition.getParamName(), exchange);
    }
}
```

## Implementation class and profile

Then, let's look at the two implementation class based on the above interface in  ***shenyu-plugin-base*** module , that is:

- `AndMatchStrategy`- `AND` -All conditions are matched

- `OrMatchStrategy`-   `OR` -at least one is match

  The profile  is shown as follows, which locates at the `SHENYU_DIRECTORY`directory. When starting up, the top-level SPI classes will read the key-value and  load the classes and cache them.

```properties
and=org.apache.shenyu.plugin.base.condition.strategy.AndMatchStrategy
or=org.apache.shenyu.plugin.base.condition.strategy.OrMatchStrategy
```

These two implementation classes inherit `AbstractMatchStrategy` and implement `MatchStrategy`.

### AndMatchStrategy-  “AND” relation

Because `PredicateJudge` encapsulates the diversity of Predicate , and `ConditionData` and `ParameData` can present variety of parameters, for treating of multiple conditions, using`stream` and `lambda` expression, It can be very simple and efficient to process "AND" logic- all conditions must be matched.

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

The `OrMatchStrategy` similarly implements the "OR" logic- at least one is match.

## MatchStrategyFactory

This is the factory class of `MatchStrategy`，there are  two methods,  one is `newInstance()`, which will return the `MatchStrategy` implementation class instance cached by the `SPI` `ExtensionLoader` indexed by the key-value.

```java
    public static MatchStrategy newInstance(final Integer strategy) {
        String matchMode = MatchModeEnum.getMatchModeByCode(strategy);
        return ExtensionLoader.getExtensionLoader(MatchStrategy.class).getJoin(matchMode);
    }
```

the `matchMode` will be the name of strategy, the value will be "and" or "or". The `MatchModeEnum` defines the code and name of match strategy as follows.

```java
AND(0, "and"), 
OR(1, "or");
```

Another method is `match()` method, which will invoke the `match()` method of  implementation class. 

```java
    public static boolean match(final Integer strategy, final List<ConditionData> conditionDataList, final ServerWebExchange exchange) {
        return newInstance(strategy).match(conditionDataList, exchange);
    }
```

## How it works

`AbstractShenyuPlugin` is the base class of `plugins` in `shenyu-plugin` module. In this class two selection method are defined: `filterSelector()` and `filterRule()` , Both of them call the  `match()` method of `MatchStrategyFactory`. The code  of `filterSelector()` is shown as follows.

```java
    private Boolean filterSelector(final SelectorData selector, final ServerWebExchange exchange) {
        if (selector.getType() == SelectorTypeEnum.CUSTOM_FLOW.getCode()) {
            if (CollectionUtils.isEmpty(selector.getConditionList())) {
                return false;
            }
            return MatchStrategyFactory.match(selector.getMatchMode(), selector.getConditionList(), exchange);
        }
        return true;
    }
```

In `filterSelector`() method, after validation of  the `SelectorData`, calls the `match` method of `MatchStrategyFactory`, and then this factory class will invokes the `match` method of corresponding implementation class. 

```java
    private Boolean filterRule(final RuleData ruleData, final ServerWebExchange exchange) {
        return ruleData.getEnabled() && MatchStrategyFactory.match(ruleData.getMatchMode(), ruleData.getConditionDataList(), exchange);
    }
```

In `filterRule()` it is also calls the  `match()` method of `MatchStrategyFactory`.  Does it look particularly concise or even simple?  In the [code analysis](http://shenyu.apache.org/blog/PredicateJudge-SPI) of  `PredicteJudge` , you can  see more detail about parameter processing in `shenyu-plugin`.

## Summary

Due to the use of  `SPI` mechanism of `Apache Shen`, the parameter selection module has the characteristic of loose coupling and extensibility. In terms of  the combination of multiple conditions, `MatchStrategy` provides a good design.  Although currently only two implementation classes are present, it can be easily develop more complex `MatchStrategy` rules in the future,  such as "`firstOf`"-first condition must matched, or "`mostOf`"- most of the conditions must be matched, etc.

Interested readers can read the source code of `'shenyu-plugin'` to learn more.

---
title: Custom Predicate Judge
keywords: ["PredicateJudge"]
description: Custom Predicate Judge
---

## Introduction

* This paper describes how to customize the extension of  `org.apache.shenyu.plugin.base.condition.judge.PredicateJudge`.
* The conditional predicate is the bridge between data and rules in the selector and serves to filter out requests that match the conditions.
* There are already seven conditional predicates including match, =, regex, contains, TimeBefore, TimeAfter, exclude.
* Please refer to [judge](https://github.com/apache/shenyu/tree/v2.4.3/shenyu-plugin/shenyu-plugin-base/src/main/java/org/apache/shenyu/plugin/base/condition/judge) module, add your own conditional predicates, or submit `pr` to the official website if you have a good common plugin.

## Extension

* Create a new project and introduce the following dependencies:

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-plugin-base</artifactId>
        <version>${project.version}</version>
    </dependency>
</dependencies>
```

* Create a new class `CustomPredicateJudge`, implements `org.apache.shenyu.plugin.base.condition.judge.PredicateJudge`, add annotation `org.apache.shenyu.spi.Join`.

```java
/**
 * custom predicate judge.
 */
@Join
public class CustomPredicateJudge implements PredicateJudge {

    @Override
    public Boolean judge(final ConditionData conditionData, final String realData) {
        // Custom Predicate Judge
    }
}

```

* In the project's META-INF/services directory, create `org.apache.shenyu.plugin.base.condition.judge.PredicateJudge` file, add key-value as following:

```shell script
${spi name} = ${custom class path}
``` 

`${spi name}` represents the name of `spi` and `${custom class path}` represents the fully qualified name of the class. Such as:

```shell script
custom=xxx.xxx.xxx.CustomPredicateJudge
```

* Package the project and copy it to the `lib` or `ext-lib` directory of the gateway (bootstrap-bin).

* In the `Apache ShenYu` gateway management system --> BasicConfig --> Dictionary, find the dictionary code as `OPERATOR`, add a new piece of data, pay attention to the dictionary name: `${spi name}`.

<img src="/img/shenyu/custom/custom_predicate_judge_en.png" width="70%" height="60%" />

> DictionaryType: `operator`;
>
> DictionaryCode: `OPERATOR`;
>
> DictionaryName: `${spi name}`, input your custom spi name;
>
> DictionaryValue: When used, the value of the drop-down box, do not repeat with the existing;
>
> DictionaryDescribe: desc your custom match strategy;
>
> Sort: to sort;
>
> Status: open or close.

* When adding selectors or rules, you can use custom predicate judge:

<img src="/img/shenyu/custom/use_custom_predicate_judge_en.png" width="80%" height="70%" />

## Example

* Add `GroovyPredicateJudge` and `SpELPredicateJudge` extension.

```java
/**
 * Groovy predicate judge.
 */
@Join
public class GroovyPredicateJudge implements PredicateJudge {
    
    @Override
    public Boolean judge(final ConditionData conditionData, final String realData) {
        return (Boolean) Eval.me(conditionData.getParamName(), realData, conditionData.getParamValue());
    }
}
```

```java
/**
 * SpEL predicate judge.
 */
@Join
public class SpELPredicateJudge implements PredicateJudge {
    
    private static final ExpressionParser EXPRESSION_PARSER = new SpelExpressionParser();
    
    @Override
    public Boolean judge(final ConditionData conditionData, final String realData) {
        Expression expression = EXPRESSION_PARSER.parseExpression(conditionData.getParamValue().replace('#' + conditionData.getParamName(), realData));
        return expression.getValue(Boolean.class);
    }
}
```

* Update `org.apache.shenyu.plugin.base.condition.judge.PredicateJudge`:

```shell script
Groovy=xxx.xxx.xxx.GroovyPredicateJudge
SpEL=xxx.xxx.xxx.SpELPredicateJudge
```

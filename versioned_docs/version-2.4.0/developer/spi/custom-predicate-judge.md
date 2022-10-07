---
title: Custom Predicate Judge
keywords: ["PredicateJudge"]
description: Custom Predicate Judge
---


* This paper describes how to customize the extension of  `org.apache.shenyu.plugin.base.condition.judge.PredicateJudge`.


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



* In `org.apache.shenyu.plugin.base.condition.judge.PredicateJudge` file, add key-value as following:

```shell title="script"
${spi name} = ${custom class path}
``` 

`${spi name}` represents the name of `spi` and `${custom class path}` represents the fully qualified name of the class. Such as:


```shell title="script"
custom=org.apache.shenyu.examples.http.judge.CustomPredicateJudge
```



* Add enum in `org.apache.shenyu.common.enums.OperatorEnum` class:

```java

    /**
     * custom operator enum.
     */
    CUSTOM("custom", true),
```


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




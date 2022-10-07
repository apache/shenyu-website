---
title: Custom Match Mode
keywords: ["MatchStrategy"]
description: custom match mode
---


* This paper describes how to customize the extension of  `org.apache.shenyu.plugin.base.condition.strategy.MatchStrategy`.

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

* Create a new class `CustomMatchStrategy`, extends `org.apache.shenyu.plugin.base.condition.strategy.AbstractMatchStrategy`, implements `org.apache.shenyu.plugin.base.condition.strategy.MatchStrategy`, add annotation `org.apache.shenyu.spi.Join`.

```java
/**
 * This is custom match strategy.
 */
@Join
public class CustomMatchStrategy extends AbstractMatchStrategy implements MatchStrategy {

    @Override
    public Boolean match(final List<ConditionData> conditionDataList, final ServerWebExchange exchange) {
        // custom match strategy
    }
}
```

* In the project's META-INF/services directory, create `org.apache.shenyu.plugin.base.condition.strategy.MatchStrategy` file.

```shell title="script"
${spi name} = ${custom class path}
``` 

`${spi name}` represents the name of `spi` and `${custom class path}` represents the fully qualified name of the class. Such as:

```shell title="script"
custom = xxx.xxx.xxx.CustomMatchStrategy
```

* Package the project and copy it to the `lib` or `ext-lib` directory of the gateway (bootstrap-bin).

* In the `Apache ShenYu` gateway management system --> BasicConfig --> Dictionary,  find the dictionary code as `MATCH_MODE`, add a new piece of data, pay attention to the dictionary name: `${spi name}`.

<img src="/img/shenyu/custom/custom_match_strategy_en.png" width="70%" height="60%" />

> DictionaryType: `matchMode`;
>
> DictionaryCode: `MATCH_MODE`;
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

* When adding selectors or rules, you can use custom MatchType:

<img src="/img/shenyu/custom/use_custom_match_strategy_en.png" width="80%" height="70%" />

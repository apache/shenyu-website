---
title: 自定义条件策略
keywords: ["PredicateJudge"]
description: 自定义条件策略
---

## 说明

* 本文介绍如何对 `org.apache.shenyu.plugin.base.condition.judge.PredicateJudge` 进行自定义扩展。
* 条件谓语是选择器中连接数据和规则的桥梁，作用是筛选出符合条件的请求。
* 目前已经存在包括 match, =, regex, contains, TimeBefore, TimeAfter, exclude 共七个条件谓语。
* 用户可以参考 [judge](https://github.com/apache/shenyu/tree/v2.4.2/shenyu-plugin/shenyu-plugin-base/src/main/java/org/apache/shenyu/plugin/base/condition/judge) 模块，新增自己的条件谓语，如果有好的公用插件，可以向官网提交 `pr`。

## 扩展

* 新建一个工程，引入如下依赖：

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-plugin-base</artifactId>
        <version>${project.version}</version>
    </dependency>
</dependencies>
```

* 新增类 `CustomPredicateJudge`，实现 `org.apache.shenyu.plugin.base.condition.judge.PredicateJudge` 接口，添加注解 `org.apache.shenyu.spi.Join`。

```java
/**
 * custom predicate judge.
 */
@Join
public class CustomPredicateJudge implements PredicateJudge {

    @Override
    public Boolean judge(final ConditionData conditionData, final String realData) {
        // 自定义条件策略
    }
}
```

* 在工程的META-INF/services目录创建 `org.apache.shenyu.plugin.base.condition.judge.PredicateJudge` 文件，并添加如下内容：

```shell script
${spi name}=${custom class path}
``` 

`${spi name}` 表示 `spi` 的名称， `${custom class path}` 表示该类的全限定名。比如：

```shell script
custom=xxx.xxx.xxx.CustomPredicateJudge
```

* 将工程打包，拷贝到网关 (bootstrap-bin) 的 `lib` 或 `ext-lib` 目录。

* 在 `Apache ShenYu` 网关管理系统 --> 基础配置 --> 字典管理， 找到字典编码为 `OPERATOR`，新增一条数据，注意字典名称要为: `${spi name}`，图中的示例是 `custom`。

<img src="/img/shenyu/custom/custom_predicate_judge_zh.png" width="70%" height="60%" />

> 字典类型：`operator`；
>
> 字典编码：`OPERATOR`；
>
> 字典名称：`${spi name}`，填写自定义`spi`的名称；
>
> 字典值：使用时，下拉框的值，不要和现有的重复；
>
> 字典描述或备注信息：描述信息；
>
> 排序： 排序；
>
> 状态：打开或关闭。

* 在添加选择器或规则时，就可以使用自定义的条件策略：

<img src="/img/shenyu/custom/use_custom_predicate_judge_zh.png" width="80%" height="70%" />

## 示例

* 添加 `GroovyPredicateJudge` 和 `SpELPredicateJudge` 扩展。

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

* 更新 `org.apache.shenyu.plugin.base.condition.judge.PredicateJudge`， 添加：

```shell script
Groovy=xxx.xxx.xxx.GroovyPredicateJudge
SpEL=xxx.xxx.xxx.SpELPredicateJudge
```

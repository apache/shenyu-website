---
title: 自定义条件策略
keywords: ["PredicateJudge"]
description: 自定义条件策略
---


* 本文介绍如何对 `org.apache.shenyu.plugin.base.condition.judge.PredicateJudge` 进行自定义扩展。


* 新增一个类 `CustomPredicateJudge`，实现 `org.apache.shenyu.plugin.base.condition.judge.PredicateJudge` 接口 ，添加注解`org.apache.shenyu.spi.Join`。

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

* 在 `org.apache.shenyu.plugin.base.condition.judge.PredicateJudge` 文件中添加如下内容：

```shell script
${spi name}=${custom class path}
``` 

`${spi name}`表示`spi`的名称，`${custom class path}`表示该类的全限定名。比如：

```shell script
custom=org.apache.shenyu.examples.http.judge.CustomPredicateJudge
```


* 在 `org.apache.shenyu.common.enums.OperatorEnum` 类中添加枚举类型：

```java
    /**
     * custom operator enum.
     */
    CUSTOM("custom", true),
```


* 在`Apache ShenYu`网关管理系统 --> 基础配置 --> 字典管理， 找到字典编码为 `OPERATOR`，新增一条数据，注意字典名称要为: `${spi name}`，图中的示例是`custom`。

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



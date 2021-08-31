---
title: 自定义匹配方式
keywords: Apache ShenYu
description: 自定义匹配方式
---


## 说明

* 在自定义开发前，请先搭建好网关环境，请参考: [自定义搭建网关](../deployment-custom)

* 本文介绍如何对 `org.apache.shenyu.plugin.base.condition.strategy.MatchStrategy` 进行自定义扩展。

## 扩展实现

* 新增一个类 `CustomMatchStrategy`，继承`org.apache.shenyu.plugin.base.condition.strategy.AbstractMatchStrategy`，实现 `org.apache.shenyu.plugin.base.condition.strategy.MatchStrategy` ，添加注解`org.apache.shenyu.spi.Join`。

```java
/**
 * This is custom match strategy.
 */
@Join
public class CustomMatchStrategy extends AbstractMatchStrategy implements MatchStrategy {

    @Override
    public Boolean match(final List<ConditionData> conditionDataList, final ServerWebExchange exchange) {
        // 匹配逻辑实现
    }
}
```

* 在你的网关项目 `resources` 目录下，新建 `META-INF/shenyu` 目录， 并且新增文件名为 : `org.apache.shenyu.plugin.base.condition.strategy.MatchStrategy`.
内容如下：

```shell script
${spi name} = ${custom class path}
``` 

`${spi name}`表示`spi`的名称，`${custom class path}`表示该类的全限定名。比如：

```shell script
custom = org.apache.shenyu.examples.http.strategy.CustomMatchStrategy
```

* 在`Apache ShenYu`网关管理系统 --> 基础配置 --> 字典管理， 找到字典编码为 `MATCH_MODE`，新增一条数据，注意字典名称要为: `${spi name}`，图中的示例是`custom`。

<img src="/img/shenyu/custom/custom_match_strategy_zh.png" width="70%" height="60%" />

 > 字典类型：`matchMode`；
>
 > 字典编码：`MATCH_MODE`；
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



* 在添加选择器或规则时，就可以使用自定义的匹配方式：

<img src="/img/shenyu/custom/use_custom_match_strategy_zh.png" width="80%" height="70%" />



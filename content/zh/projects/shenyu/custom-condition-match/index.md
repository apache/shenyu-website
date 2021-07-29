---
title: 自定义匹配条件策略
keywords: ShenYu
description: 自定义匹配条件策略
---


## 说明

* 在自定义开发前，请先自定义搭建好网关环境，请参考: [自定义部署](../deployment-custom)

* 本文介绍如何对 `org.apache.shenyu.plugin.base.condition.strategy.MatchStrategy` 进行自定义扩展。

## 扩展实现

* 新增一个类 `${you class}`，实现 `org.apache.shenyu.plugin.base.condition.strategy.MatchStrategy`

```
public class ${you class} implements MatchStrategy {
    
    @Override
    public Boolean match(final List<ConditionData> conditionDataList, final ServerWebExchange exchange) {
        //开发你的匹配逻辑，返回结果
        return true;
    }
}
```

* 在项目 `resources` 目录下，新建 META-INF/shenyu目录， 并且新增文件名为 : `org.apache.shenyu.plugin.base.condition.strategy.MatchStrategy`.
内容新增 `${you spi name}` = `${you class path}`:

```
${you spi name} = ${you class path}
``` 

* 在Admin后台 ---> 基础管理 ---> 字典管理 ,  找到字典编码为 `MATCH_MODE`，新增一条数据，注意字典名称要为: `${you spi name}`。

<img src="/img/shenyu/custom/custmo-condition-match-zh.png" width="40%" height="30%" />

* 或者执行以下自定义`SQL`语句：

```
INSERT IGNORE INTO `shenyu_dict` (`id`, `type`,`dict_code`, `dict_name`, `dict_value`, `desc`, `sort`, `enabled`, `date_created`, `date_updated`) VALUES ('you id', 'matchMode', 'MATCH_MODE', 'you spi name', 'you value', 'you spi name', 0, 1, '2021-05-30 19:29:10', '2021-05-30 20:15:23');
```








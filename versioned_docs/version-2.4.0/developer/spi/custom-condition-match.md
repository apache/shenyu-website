---
title: Custom Condition Match
keywords: ["Condition"]
description: custom condition match
---


## Explanation

* Before custom development, please customize and build the gateway environment first, please refer to: [custom deployment](../../deployment/deployment-custom)

* This article describes how to customize the extension of  `org.apache.shenyu.plugin.base.condition.strategy.MatchStrategy`.

## Extension

* Create a new class `${you class}`，implements `org.apache.shenyu.plugin.base.condition.strategy.MatchStrategy`

```
public class ${you class} implements MatchStrategy {
    
      @Override
      public Boolean match(final List<ConditionData> conditionDataList, final ServerWebExchange exchange) {
        //coding and return
        return true;
      }
}
```

* In the project  `resources` directory，Create a new `META-INF/shenyu` directory， and the new file name is : `org.apache.shenyu.plugin.base.condition.strategy.MatchStrategy`.
  add `${you spi name}` = `${you class path}`:

```
${you spi name} = ${you class path}
``` 

* In the `Admin` service ---> BasicConfig ---> Dictionary ,  Find the dictionary code as `MATCH_MODE`, add a new piece of data, pay attention to the dictionary name: `${you spi name}`.

<img src="/static/img/shenyu/custom/custom-condition-match-en.png" width="40%" height="30%" />

* Or execute the following custom `SQL` statement：

```sql
INSERT IGNORE INTO `shenyu_dict` (
        `id`,
        `type`,
        `dict_code`,
        `dict_name`,
        `dict_value`,
        `desc`,
        `sort`,
        `enabled`,
        `date_created`,
        `date_updated`
    )
VALUES (
        'you id',
        'matchMode',
        'MATCH_MODE',
        'you spi name',
        'you value',
        'you spi name',
        0,
        1,
        '2021-05-30 19:29:10',
        '2021-05-30 20:15:23'
    );
```








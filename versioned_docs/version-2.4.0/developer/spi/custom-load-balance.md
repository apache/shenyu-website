---
title: Custom Load Balance
keywords: ["LoadBalance"]
description: Custom Load Balance
---

## Explanation

* Before custom development, please customize and build the gateway environment first, please refer to: [custom deployment](../deployment-custom).

* This article describes how to customize the extension of `org.apache.shenyu.plugin.divide.balance.LoadBalance` .

## Extension

* Create a new class `${you class}`, implements `org.apache.shenyu.plugin.divide.balance.LoadBalance`

```java
public class ${you class} implements LoadBalance {
   
    /**
     * select one from upstream list.
     *
     * @param upstreamList upstream list
     * @param ip ip
     * @return divide upstream
     */
    @Override
    public DivideUpstream doSelect(final List<DivideUpstream> upstreamList, 
                                   final String ip) {
        //coding and return
    }
}
```

* In the project  `resources` directory，Create a new `META-INF/shenyu` directory， and the new file name is : `org.apache.shenyu.plugin.divide.balance.LoadBalance`.
add `${you spi name}` = `${you class path}`:

```
${you spi name} = ${you class path}
```

* In the `Admin` service ---> BasicConfig ---> Dictionary ,  Find the dictionary code as `LOAD_BALANCE`, add a new piece of data, pay attention to the dictionary name: `${you spi name}`.

<img src="/img/shenyu/custom/custom-load-balance-en.jpg" width="40%" height="30%" />

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
        '2021-08-30 19:29:10',
        '2021-08-30 20:15:23'
    );
```








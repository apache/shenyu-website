---
title: Custom Rate Limiter
keywords: Apache ShenYu
description: Custom Rate Limiter
---

## Explanation

* Before custom development, please customize and build the gateway environment first, please refer to: [custom deployment](../deployment-custom).

* This article describes how to customize the extension of `org.apache.shenyu.plugin.ratelimiter.algorithm.RateLimiterAlgorithm` .

## Extension

* Create a new class `${you class}`, implements `org.apache.shenyu.plugin.ratelimiter.algorithm.RateLimiterAlgorithm`

```java
public class ${you class} implements RateLimiterAlgorithm<T> {
   
    /**
     * Gets script.
     *
     * @return the script
     */
    RedisScript<T> getScript();
    
    /**
     * Gets keys.
     *
     * @param id the id
     * @return the keys
     */
    List<String> getKeys(String id);
    
    /**
     * Callback string.
     *
     * @param script the script
     * @param keys the keys
     * @param scriptArgs the script args
     */
    default void callback(final RedisScript<?> script, final List<String> keys, final List<String> scriptArgs) {
    }
}
```

* In the project  `resources` directory，Create a new `META-INF/shenyu` directory， and the new file name is : `org.apache.shenyu.plugin.ratelimiter.algorithm.RateLimiterAlgorithm`.
add `${you spi name}` = `${you class path}`:

```
${you spi name} = ${you class path}
```

* In the `Admin` service ---> BasicConfig ---> Dictionary ,  Find the dictionary code as `ALGORITHM_*`, add a new piece of data, pay attention to the dictionary name: `${you spi name}`.

<img src="/img/shenyu/custom/custom-rate-limiter-en.jpg" width="40%" height="30%" />

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








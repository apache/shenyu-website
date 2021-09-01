---
title: 自定义负载均衡策略
description: 自定义负载均衡策略
---


## 说明

* 在自定义开发前，请先自定义搭建好网关环境，请参考: [自定义部署](../../deployment/deployment-custom)

* 本文介绍如何对 `org.apache.shenyu.plugin.divide.balance.LoadBalance` 进行自定义扩展。

## 扩展实现

* 新增一个类 `${you class}`，实现 `org.apache.shenyu.plugin.divide.balance.LoadBalance`

```java
public class ${you class} implements LoadBalance {
   
    /**
     * 从上游列表中选择一个服务返回
     *
     * @param upstreamList 上游列表
     * @param ip 请求的远程地址
     * @return divide upstream
     */
    @Override
    public DivideUpstream doSelect(final List<DivideUpstream> upstreamList, 
                                   final String ip) {
        //开发你的选择逻辑，返回结果
    }
}
```

* 在项目 `resources` 目录下，新建 `META-INF/shenyu` 目录， 并且新增文件名为 : `org.apache.shenyu.plugin.divide.balance.LoadBalance`.
内容新增 `${you spi name}` = `${you class path}`:

```
${you spi name} = ${you class path}
```

* 在 `Admin` 后台 ---> 基础管理 ---> 字典管理 ,  找到字典编码为 `LOAD_BALANCE`，新增一条数据，注意字典名称要为: `${you spi name}`。

<img src="/static/img/shenyu/custom/custom-load-balance-zh.jpg" width="40%" height="30%" />

* 或者执行以下自定义`SQL`语句：

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







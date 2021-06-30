---
title: 插件处理详解
keywords: plugin
description: 插件处理详解
---

## 说明

* 在shenyu-admin后台，每个插件都用handle（json格式）字段来表示不同的处理，而插件处理是就是用来管理编辑json里面的自定义处理字段。
* 该功能主要是用来支持插件处理模板化配置的

### 表设计

* sql
```sql
CREATE TABLE IF NOT EXISTS `plugin_handle` (
  `id` varchar(128) NOT NULL,
  `plugin_id` varchar(128) NOT NULL COMMENT '插件id',
  `field` varchar(100) NOT NULL COMMENT '字段',
  `label` varchar(100) DEFAULT NULL COMMENT '标签',
  `data_type` smallint(6) NOT NULL DEFAULT '1' COMMENT '数据类型 1 数字 2 字符串 3 下拉框',
  `type` smallint(6) NULL COMMENT '类型,1 表示选择器，2 表示规则',
  `sort` int(4)  NULL COMMENT '排序',
  `ext_obj` varchar(1024) DEFAULT NULL COMMENT '额外配置（json格式数据）',
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `plugin_id_field_type` (`plugin_id`,`field`,`type`)
) ENGINE=InnoDB;
```

### 使用教程

比如开发springCloud插件时规则表需要存一些配置到handle字段，配置对应的实体类如下：

```java
    public class SpringCloudRuleHandle implements RuleHandle {
    
        /**
         * this remote uri path.
         */
        private String path;
    
        /**
         * timeout is required.
         */
        private long timeout = Constants.TIME_OUT;
        
    }
```

第一步，我们可以直接在 `PluginHandle` 界面 `http://localhost:9095/#/config/pluginhandle` 新增/编辑handle字段

![](/img/shenyu/basicConfig/pluginHandle/01.png)

第二步，例如给springCloud新增一个字符串类型字段path和一个数字类型字段timeout

![](/img/shenyu/basicConfig/pluginHandle/02.png)

第三步，在插件规则配置页面新增规则时就可以直接输入path、timeout然后提交保存到handle字段了

![](https://yu199195.github.io/images/soul/springcloud-rule-handle.png)

*注意：如果配置了data_type为3 选择框，则规则新增页面里输入框下拉选择是通过field字段去[字典表（shenyu_dict）](../dictionary-management)查出所有可选项出来展示选择。*

* 比如sentinel插件包含多种数据类型的字段，如下图：

![](https://yu199195.github.io/images/soul/sentinel-rule-handle.png)

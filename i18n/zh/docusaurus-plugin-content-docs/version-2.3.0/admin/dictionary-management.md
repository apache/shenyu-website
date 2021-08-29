---
title: 字典管理
keywords: ["dict"]
description: 字典管理详解
---

## 说明

* 字典管理主要用来维护和管理公用数据字典

## 表设计

* sql
```sql
CREATE TABLE IF NOT EXISTS `soul_dict` (
   `id` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键id',
   `type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '类型',
   `dict_code` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '字典编码',
   `dict_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '字典名称',
   `dict_value` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '字典值',
   `desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '字典描述或备注',
   `sort` int(4) NOT NULL COMMENT '排序',
   `enabled` tinyint(4) DEFAULT NULL COMMENT '是否开启',
   `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

* 目前使用场景是插件处理配置`data_type=3`下拉框时使用 

假如`sentinel`插件处理字段中的`degradeRuleGrade`

那么新增规则时，编辑`degradeRuleGrade`字段时会自动从`字典表`查出`type=degradeRuleGrade`的所有字典作为下拉选项。



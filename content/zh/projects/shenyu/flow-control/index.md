---
title: 流量控制
keywords: ShenYu
description:  介绍ShenYu网关如何对流量进行控制
---


## 插件

* 在shenyu-admin后台，每个插件都用handle（json格式）字段来表示不同的处理，而插件处理是就是用来管理编辑json里面的自定义处理字段。
* 该功能主要是用来支持插件处理模板化配置的

#### 表设计

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



## 选择器和规则

* 选择器和规则是 ShenYu 网关中最灵魂的东西。掌握好它，你可以对任何流量进行管理。
* 本篇主要详解 ShenYu 网关中，选择器与规则的概念，以及如何使用。


#### 大体理解

* 一个插件有多个选择器，一个选择器对应多种规则。选择器相当于是对流量的一级筛选，规则就是最终的筛选。
* 我们想象一下，在一个插件里面，我们是不是希望根据我们的配置，达到满足条件的流量，我们插件才去执行它？
* 选择器和规则就是为了让流量在满足特定的条件下，才去执行我们想要的，这种规则我们首先要明白。
* 数据结构可以参考之前的 [数据库设计](../database-design)。

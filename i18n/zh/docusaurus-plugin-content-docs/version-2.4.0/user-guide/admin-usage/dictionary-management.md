---
title: 字典管理
keywords: ["字典"]
description: 字典管理详解
---

本文档将介绍`Apache ShenYu`后台管理系统中字典管理的使用，字典管理主要用来维护和管理公用数据字典。

请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](../deployment-local) 启动`Apache ShenYu`后台管理系统。 启动成功后，可以直接访问 http://localhost:9095 ，默认用户名和密码分别为: `admin` 和 `123456`。


目前使用场景是在 [插件处理管理](../plugin-handle-explanation) 时，选择数据类型是 `下拉框` 时使用：

<img src="/img/shenyu/basicConfig/pluginHandle/dict_box_add.png" width="80%" height="50%" />

在字典管理中，你可以新增字典类型，供其他地方使用：

<img src="/img/shenyu/basicConfig/pluginHandle/dict_box_type.png" width="80%" height="50%" />

* 字典类型：在插件处理管理时，使用的字段名称。
* 字典编码：标识字典数据。
* 字典名称：在添加插件、选择器或规则时`handle`字段的名称。
* 字典值：字典数据实际取值。
* 字典描述或备注：描述信息。
* 排序：字典数据顺序。

例如， `sentinel` 插件处理字段中的 `degradeRuleGrade`。当新增规则时，编辑 `degradeRuleGrade` 字段时，会自动从字典管理中查出 `type='degradeRuleGrade'` 的所有字典数据作为下拉选项：


<img src="/img/shenyu/basicConfig/pluginHandle/dict_box_use.png" width="80%" height="50%" />

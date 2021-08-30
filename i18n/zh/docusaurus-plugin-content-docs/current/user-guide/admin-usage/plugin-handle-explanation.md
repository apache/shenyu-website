---
title: 插件配置
keywords: ["插件"]
description: 插件配置
---

本文档将介绍`Apache ShenYu`后台管理系统中插件的使用，包括插件管理和插件处理管理。


请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](../../deployment/deployment-local) 启动`Apache ShenYu`后台管理系统。 启动成功后，可以直接访问 http://localhost:9095 ，默认用户名和密码分别为: `admin` 和 `123456`。

## 插件管理

在插件管理中，你可以对所有插件进行统一管理，比如关闭或开启插件：

<img src="/img/shenyu/basicConfig/pluginHandle/divide_plugin_open.png" width="80%" height="50%" />

也可以对某些插件设置配置信息，比如给`Dubbo`插件设置注册中心：

<img src="/img/shenyu/basicConfig/pluginHandle/dubbo_plugin_registry.png" width="80%" height="50%" />

## 插件处理管理

在插件处理管理中，你可以对插件、选择器和规则添加`handle`字段。

比如给`springCloud`插件的规则列表新增一个字符串类型的字段`path`和一个数字类型的字段`timeout`。


第一步，在 `插件处理管理` 界面新增/编辑`handle`字段：

![](/img/shenyu/basicConfig/pluginHandle/plugin_handle_edit.png)

第二步，填写字段信息：

![](/img/shenyu/basicConfig/pluginHandle/plugin_handle_info.png)

* 插件名：需要给哪个插件添加`handle`字段，下拉选择。
* 字段：添加字段的名称。
* 描述：字段描述信息。
* 数据类型：数字、字符串、下拉框。如果选择了`下拉框`，则规则新增页面里输入框下拉选择是通过字段名称去字典表中查出所有可选项进行下来选择，所以需要提前在 [字典管理](../dictionary-management) 中录入信息。
* 字段所属类型：插件、选择器、规则。
* 排序：字段顺序。
* 是否必填：是、否。
* 默认值：为该字段指定一个默认值。
* 输入提示：用户填写该字段时，出现的提示信息。
* 校验规则(正则) ：用户填写该字段时，使用校验规则。

第三步，在`插件列表 -> rpc proxy -> springCloud -> 添加规则`时，就可以输入`path`、`timeout`的信息：

![](/img/shenyu/basicConfig/pluginHandle/springcloud_rule_handler.png)


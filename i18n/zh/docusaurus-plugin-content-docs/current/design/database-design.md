---
sidebar_position: 1
title: 管理后台数据结构设计
keywords: ["db"]
description: ShenYu Admin数据结构
---

`Apache ShenYu Admin` 是网关的后台管理系统，能够可视化管理所有插件、选择器和规则，设置用户、角色，控制资源。

## 插件、选择器和规则

* 插件：`Apache ShenYu` 使用插件化设计思想，实现插件的热插拔，极易扩展。内置丰富的插件，包括 `RPC` 代理、熔断和限流、权限认证、监控等等。
* 选择器：每个插件可设置多个选择器，对流量进行初步筛选。
* 规则：每个选择器可设置多个规则，对流量进行更细粒度的控制。
* 数据库 `UML` 类图:

<img src="/img/shenyu/db/shenyu-plugin-table.png" width="80%" height="60%" />

* 设计详解:
  
  * 一个插件对应多个选择器，一个选择器对应多个规则。

  * 一个选择器对应多个匹配条件，一个规则对应多个匹配条件。

  * 每个规则在对应插件下，有不同的处理能力。

## 资源权限     

* 资源代表的是 `shenyu-admin` 用户后台中的菜单或者按钮。

* 资源权限数据表用来存储用户名称、角色、资源数据以及对应关系。
   
* 数据库 `UML` 类图：

<img src="/img/shenyu/db/shenyu-permission-table.png" width="80%" height="60%" />

* 设计详解:
  * 一个用户对应多个角色，一个角色对应多个资源。


## 数据权限

* 数据权限表用来存储用户，选择器、规则对应关系。
* 数据库 `UML` 类图：

<img src="/img/shenyu/db/shenyu-data_permission-table.png" width="80%" height="60%" />

* 设计详解：
  * 数据权限的表为： `data_permission`，一个用户对应多条数据权限。
  * 数据权限表中字段 `data_type` 区分不同的类型数据， 具体对应关系如下：`0 -> 选择器, 1 -> 规则`。
  * 数据权限表中字段 `data_id` 存放相应类型的主键`id`。
    
## 元数据

* 元数据主要是用于网关的泛化调用。
* 每个接口方法，对应一条元数据。
* 数据库 `UML` 类图：

<img src="/img/shenyu/db/mata_data_table.png" width="30%" height="30%" />


* 设计详解：
  * `path`：在请求网关的时候，会根据 `path` 来匹配到一条数据，然后进行后续的流程。

  * `rpc_ext`：用于保存`RPC`代理中的扩展信息。
   
## 字典管理

* 字典管理主要用来维护和管理公用数据字典。
* 数据库 `UML` 类图：

<img src="/img/shenyu/db/shenyu_dict.png" width="30%" height="30%" />



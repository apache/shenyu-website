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

## API文档

* API文档表用来维护和管理API文档。
* 常见规范(如OpenApi3.0规范、yapi规范)的api doc(如json、md、html等)可以导入`shenyu-admin`，并最终存储到API文档表。
* 通过API文档表可以生成其他常见规范的api doc。
* 数据库 `UML` 类图：

  <img src="/img/shenyu/db/shenyu-api-doc-table.png" width="30%" height="30%" />

* 设计详解：
  * 一个tag可以有多个子tag，tag的层级无限，最下面的叶子节点是API。
  * 相同path、支持多种http_method的接口，算多个API。
  * 一个API有多个请求参数、多个响应字段。
  * 一个参数/字段有它自己的类型(也就是model)，每个类型由多个字段构成。
  * 一个字段有它自己的类型，对应多个值。
  * 一个值既可以作为请求示例值，也可以描述响应示例值(比如200表示OK、400表示非法参数)。
  * `mock_request_record`表的`query`、`header`、`body`都存储json，但是`body`不支持存储特殊类型(比如文件)。
  * `tag`表的`ext`存储它父tag(包括父tag的父tag，以此类推)的全量json数据。
  * `api`表的`ext`可能存储ip列表、SpringCloud的service name。
  * `parameter`表的`type`主要包括`requestUrlParam`、`requestHeader`、`requestBody`、`requestPathVariable`、`responseHeader`和`responseBody`；如果返回的类型是特殊类型(如文件)，则不用关联`model_id`。
  * `field`表的`ext`以json格式(方便后续扩展)存储泛型，如`{"genericTypes":[model_id1,model_id2]}`；`model_id`表示该字段属于哪个类型，`self_model_id`表示该字段自身是什么类型。
  * `detail`表的`is_example`表示一个值是否是请求示例值，true是请求示例值，false是响应值。

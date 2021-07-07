---
title: Apache ShenYu Admin数据结构
keywords: db
description: Apache ShenYu Admin数据结构
---

## 插件设计
* 插件采用数据库设计，来存储插件，选择器，规则配置数据，以及对应关系。
* 数据库表 UML 类图:

 ![](/img/shenyu/db/shenyu-db.png)

* 设计详解:
  
   * 一个插件对应多个选择器，一个选择器对应多个规则。

   * 一个选择器对应多个匹配条件，一个规则对应多个匹配条件。

   * 每个规则在对应插件下，不同的处理表现为 handle 字段，handle 字段就是一个 json 字符串。具体的可以在 shenyu-admin 使用过程中进行查看。

## 资源权限设计     
* 资源代表的是 shenyu-admin 用户后台中的菜单或者按钮。

* 资源权限数据表用来存储用户名称、角色、资源数据以及对应关系。
   
* 数据库UML类图：

![](/img/shenyu/db/shenyu-permission-db.png)

* 设计详解:
   * 一个用户对应多个角色,一个角色对应多个资源。


## 数据权限设计
* 数据权限数据表用来存储用户，选择器、规则对应的关系。
* 数据库 UML 类图

![数据权限表设计](/img/shenyu/db/data_permission.png)

* 设计详解
   * 数据权限的表为： `data_permission`; 其中一个用户对应多条数据权限。
   * 数据权限表中字段 `data_type` 区分不同的类型数据， 具体对应关系如下：0 -> 选择器, 1 -> 规则。
   * 数据权限表中字段 `data_id` 存放相应类型的主键id。
    
## 元数据设计

* 在数据库中，新增了一张表，然后通过数据同步的方案，会把这张表的数据同步到网关JVM内存。

* 表结构如下：

```sql
CREATE TABLE  IF NOT EXISTS `meta_data` (
  `id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'id',
  `app_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '应用名称',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '路径,不能重复',
  `path_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '路径描述',
  `rpc_type` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'rpc类型',
  `service_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '服务名称',
  `method_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '方法名称',
  `parameter_types` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '参数类型 多个参数类型 逗号隔开',
  `rpc_ext` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'rpc的扩展信息，json格式',
  `date_created` datetime(0) NOT NULL COMMENT '创建时间',
  `date_updated` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `enabled` tinyint(4) NOT NULL DEFAULT 0 COMMENT '启用状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

```

* 元数据设计，目前最主要的是对 dubbo 的泛化调用上进行使用。

* 我重点讲一下 `path` 字段，在请求网关的时候，会根据你的 path 字段来匹配到一条数据，然后进行后续的流程。

* 重点讲一下 `rpc_ext`字段，如果是 dubbo 类型的服务接口，如果服务接口设置了 group 和 version 字段的时候，会存在这个字段。

* dubbo 类型 字段结构是 如下，那么存储的就是 json 格式的字符串。

  ```java
   public static class RpcExt {
      private String group;
      private String version;
      private String loadbalance;
      private Integer retries;
      private Integer timeout;
   }
  ```

#### 元数据存储

* 每个 dubbo 接口方法，对应一条元数据。

* springcloud 协议，只会存储一条数据， path为 `/contextPath/**`。

* http 服务，则不会有任何数据。
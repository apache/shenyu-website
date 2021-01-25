---
title: MetaData Concept Design
keywords: soul
description: MetaData Concept Design
---

## Description

* This article mainly explains the concept,design of metadata and how to connect in the soul gateway.

## Technical solutions

* Add a new table in the database,and data can synchronize to the JVM memory of gateway according to the data synchronization scheme.

* Table Structure:
```sql
CREATE TABLE  IF NOT EXISTS `meta_data` (
  `id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'id',
  `app_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'application name',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'path,not repeatable',
  `path_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'path description',
  `rpc_type` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'rpc type
  `service_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'service name',
  `method_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'method name',
  `parameter_types` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'multiple parameter types, split by comma',
  `rpc_ext` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'rpc extension information,json format',
  `date_created` datetime(0) NOT NULL COMMENT 'create date',
  `date_updated` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT 'update date',
  `enabled` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'enable status',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

```

* Metadata design as below,the most important is using it in dubbo's generalization call.

* Pay attention to the field `path`,we will match specific data according to your field path during requesting gateway,and then carry out the follow-up process.

* Pay attention to the field `rpc_ext`,if it is a dubbo service interface and service interface has group and version field,this field exists.

* dubbo field structure as below,then we store json format string.
  
  ```java
     public static class RpcExt {  
        private String group;
        private String version;
        private String loadbalance;
        private Integer retries;
        private Integer timeout;
     }
    ```

## MetaData Storage

* a dubbo interface corresponds to a meta data.

* spring cloud protocol,only store one record, path: `/contextPath/**`.

* http service,no data.



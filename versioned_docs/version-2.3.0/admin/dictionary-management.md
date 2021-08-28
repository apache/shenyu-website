---
title: Dict Management
keywords: ["dict"]
description: dict management explanation
---

## Explanation

* Dictionary management is primarily used to maintain and manage common data dictionaries.

### Table design

* sql

```sql
CREATE TABLE IF NOT EXISTS `soul_dict` (
   `id` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'primary key id',
   `type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'type',
   `dict_code` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'dictionary encoding',
   `dict_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'dictionary name',
   `dict_value` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'dictionary value',
   `desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'dictionary description or remarks',
   `sort` int(4) NOT NULL COMMENT 'sort',
   `enabled` tinyint(4) DEFAULT NULL COMMENT 'whether it is enabled',
   `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'create time',
   `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'update time',
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

* The current usage scenario is when the plugin `handle` configuring the `data_type=3` `(select box)`

eg. `degradeRuleGrade` is one of fields of sentinel's `handle` json

When it adds rules, it automatically looks up all the general dictionaries of `type='degradeRuleGrade'` in the `soul_dict` table as a select-box when you edit the General rules field



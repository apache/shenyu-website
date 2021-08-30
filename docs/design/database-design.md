---
sidebar_position: 1
title: Apache ShenYu Admin Database Design
keywords: ["db"]
description: Database Design
---

Apache Shenyu Admin is the management system of the gateway, which can manage all plugins, selectors and rules visually, set users, roles and resources.

## Plugin, Selector And Rule {#plugin-selector-and-rule}
* Plugin: ShenYu uses the plugin design idea to realize the hot plug of the plugin, which is easy to expand. Built-in rich plugins, including RPC proxy, circuit breaker and current limiting, authority and certification, monitoring, and more.
* Selector: Each plugin can set multiple selectors to carry out preliminary filtering of traffic.
* Rule: Multiple rules can be set per selector for more fine-grained control of flow.

* The Database Table UML Diagram:

![](/img/shenyu/db/shenyu-db.png)

* Detailed design:

  * One plugin corresponds to multiple selectors,one selector corresponds to multiple rules.
  
  * One selector corresponds to multiple match conditions,one rule corresponds to multiple match conditions.
  
  * Each rule handles differently in corresponding plugin according to field handler,field handler is a kind of data of JSON string type.You can view detail during the use of shenyu-admin.
  
## Resource Permission {#resource-permission}
* The resource are the menus and buttons in the shenyu-admin console.

* Resource Permission use database to store user name,role,resource data and relationship. 

* The Resource Permission Table UML Diagram:
![](/img/shenyu/db/shenyu-permission-db.png)

* Detailed design:
  - one user corresponds to multiple role,one role corresponds to multiple resources.

## Data Permissin {#data-permissin}
* Data Permission use database to store the relationship between users, selectors and rules.

* The Data Permission Table UML Diagram:
![data perission uml](/img/shenyu/db/data_permission.png)


* Detailed design:
  * The most important table is `data_permission`, where a user corresponds to multiple data permissions.
  * The field `data_type` distinguishes between different types of data, which corresponds to the following: 0 -> selector, 1 -> rule.
  * The field `data_id` holds the primary key id of the corresponding type.

## Meta Data {#meta-data}

* Metadata is used for generic invoke by gateway.
* For each interface method, there is one piece of metadata.
* The Database Table UML Diagram:

<img src="/img/shenyu/db/mata_data_table.png" width="30%" height="30%" />


* Detailed design：
   * `path`: When the gateway is requested, a piece of data will be matched according to `path`, and then the subsequent process will be carried out.

   * `rpc_ext`: Used to hold extended information for the RPC proxy.。
   
## Dictionary Management {#dictionary-management}

* Dictionary management is used to maintain and manage public data dictionaries.
* The Database Table UML Diagram:

<img src="/img/shenyu/db/shenyu_dict.png" width="30%" height="30%" />



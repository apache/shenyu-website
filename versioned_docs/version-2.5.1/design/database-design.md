---
sidebar_position: 1
title: Admin Database Design
keywords: ["db"]
description: ShenYu Admin Database Design
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

## API Documentation {#API-documentation}

* The API document tables used to maintain and manage API documents.
* The API document (such as json, md, html, etc.) of common specifications (such as OpenApi3.0 and yapi) can be imported into `shenyu-admin` and finally stored in the API document tables.
* API documents of other common specifications can be generated through the API document tables.
* The Database Table UML Diagram:

<img src="/img/shenyu/db/shenyu-api-doc-table.png" width="105%" height="105%" />

* Detailed design:
  * A tag can have multiple child tags, the level of tags is unlimited, the lowest leaf node is API.
  * Interfaces with the same path but supporting multiple http methods, they are counted as multiple APIs.
  * An API has multiple request parameters and response fields.
  * A parameter/field has its own type (model), and each type have multiple fields.
  * A field has its own type, which corresponds to multiple values.
  * A value can be used as either a request example value, or a response example value (for example, 200 indicates OK, and 400 indicates illegal parameters).
  * The `query`, `header` and `body`, all of them are `json` stored in `mock_request_record`，but `body` does not support special types such as file。
  * The `ext` of the `tag` table stores the full amount of json data of its parent tag (including the parent tag of the parent tag, and so on).
  * The `ext` of the `api` table may store the IP list and the service name of `SpringCloud`.
  * The `type` of the `parameter` table mainly includes `requestUrlParam`, `requestHeader`, `requestBody`, `requestPathVariable`, `responseHeader`, and `responseBody`; If the returned type is a special type (such as file), do not associate `model_id`.
  * The `ext` of the `field` table stores generic type in json format (convenient for subsequent expansion), such as `{"genericTypes": [model_id1, model_id2]}`; `model_id` indicates which type has this field, `self_model_id` indicates which type of this field.
  * The `is_example` of `detail` table indicates whether a value is a request sample value, true is a request sample value, and false is a response value.

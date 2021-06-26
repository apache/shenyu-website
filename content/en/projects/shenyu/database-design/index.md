---
title: Database Design
keywords: db
description: Database Design
---

## Plugin Design
* Plugin use database to store plugin, selector, rule configuration data and relationship.

* The Database Table UML Diagram:
![](/img/shenyu/db/shenyu-db.png)

* Detailed design:

  * One plugin corresponds to multiple selectors,one selector corresponds to multiple rules.
  
  * One selector corresponds to multiple match conditions,one rule corresponds to multiple match conditions.
  
  * Each rule handles differently in corresponding plugin according to field handler,field handler is a kind of data of JSON string type.You can view detail during the use of shenyu-admin.
  
## Resource Permission Desgin
* The resource are the menus and buttons in the shenyu-admin console.

* Resource Permission use database to store user name,role,resource data and relationship. 

* The Resource Permission Table UML Diagram:
![](/img/shenyu/db/shenyu-permission-db.png)

* Detailed design:
  - one user corresponds to multiple role,one role corresponds to multiple resources.

## Data Permissin Design
* Data Permission use database to store the relationship between users, selectors and rules.

* The Data Permission Table UML Diagram:
![data perission uml](/img/shenyu/db/data_permission.png)


* Detailed design:
  * The most important table is `data_permission`, where a user corresponds to multiple data permissions.
  * The field `data_type` distinguishes between different types of data, which corresponds to the following: 0 -> selector, 1 -> rule.
   * The field `data_id` holds the primary key id of the corresponding type.


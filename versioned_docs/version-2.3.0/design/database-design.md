---
sidebar_position: 1
title: Database Design
keywords: ["db"]
description: Database Design
---

* Plugin use database to store plugin, selector, rule configuration data and relationship.

* The Database Table UML Diagram:
![](/img/soul/db/soul-db.png)

* Detailed design:

  * One plugin corresponds to multiple selectors,one selector corresponds to multiple rules.
  
  * One selector corresponds to multiple match conditions,one rule corresponds to multiple match conditions.
  
  * Each rule handles differently in corresponding plugin according to field handler,field handler is a kind of data of JSON string type.You can view detail during the use of admin.
  
  * Plugin use database to store user name,role,resource data and relationship. 

* The Permission Table UML Diagram:
![](/img/soul/db/soul-permission-db.png)

* Detailed design:
  - one user corresponds to multiple role,one role corresponds to multiple resources.

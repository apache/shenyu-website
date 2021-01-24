---
title: Database Design
keywords: db
description: Database Design
---


* Plugin use database to store plugin,selector,rule configuration data and relationship.

* Database Table UML Diagram:

 ![](https://yu199195.github.io/images/soul/soul-db.png)

* Detailed design:
  
   * one plugin corresponds to multiple selectors,one selector corresponds to multiple rules.

   * one selector corresponds to multiple match conditions,one rule corresponds to multiple match conditions.

   * Each rule handles differently in corresponding plugin according to field handler,field handler is a json string.You can view detail during the use of admin.
---
title: 术语
keywords: Hmily
description: 术语
aliases: "/hmily/docs/Term"
---

### 术语

* 发起者：全局事务的发起者，在一个请求链路资源方法里面，最先需要对分布式资源进行事务处理的地方，在Hmily框架里面 可以表示为：一个请求最先遇到 @HmilyTCC or @HmilyTAC 注解的方法，该所属方法应用被称为发起者。

* 参与者：分布式服务或者资源，需要与其他服务一起参与到一次分布式事务场景下。在Hmily框架里面，表现为一个RPC框架的接口被加上@Hmily注解。

* 协调者：用来协调分布式事务到底是commit，还是 rollback的角色，他可以是远程的，也可以是本地的，可以是中心化的，也可以是去中心化的。在Hmily框架里面的协调者是本地去中心化的角色。

* TCC ：`Try`, `Confirm`, `Cancel` 3个阶段的简称。

* TAC ：Try Auto Cancel的简称。Try阶段预留资源后，会由框架自动生成反向的操作资源的行为。
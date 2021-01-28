---
title: "Hmily Introduction"
aliases: "/hmily/docs/Home"
description: Hmily is Finance-level distributed transaction solutions, Supports multiple RPC frameworks, such as Dubbo, SpringCloud, Motan, GRPC, BRPC, Tars.
---

What's Hmily？
================

Hmily is a high-performance, zero penetration, financial-level distributed transactions solution. At present, it mainly provides support for flexible transactions, including `TCC`, `TAC` (in which, it will automatically generate rollback SQL) schemes, and `XA` and more schemes will be supported in the future.

 ![](/img/architecture/hmily-framework.png) 

# Features

   * High reliability : It supports abnormal transaction rollback and transaction overtime abnormal recovery to prevent transaction suspension in distributed scenarios.
   
   * Ease of use : It provides zero penetration `Spring-Boot` and `Spring-Namespace` schemes to integrate with business systems quickly.
   
   * High performance : Decentralized design, fully integrated with business systems, and naturally supports cluster deployment.
   
   * Observability : Performance monitoring of multiple metrics will be collected by Metrics, performance metrics is able to display in admin management system.
   
   * Multiple RPC Framework support : It supports well-known RPC frameworks such as `Dubbo`, `SpringCloud`, `Motan`, `brpc`, `tars`, etc.
   
   * Multiple log store medium support : It supports many mediums as log store, such as `mysql`, `oracle`, `mongodb`, `redis`, `zookeeper`, etc.
   
   * Complex business scene : It supports transaction around nested RPC calls.
   

# Requirements

  * The `JDK` version must be `JDK8` or later. 
  
  * In `TCC` mode, you must use a `RPC` framework, such as: `Dubbo`, `SpringCloud`, `Motan`
  
  * In `TAC` mode, you must use relational databases, such as: `mysql`, `oracle`, `sqlsever`

# TCC Mode

 ![](https://yu199195.github.io/images/hmily/hmily-tcc.png) 
 
   When using the `TCC` mode, you should provide three methods: `try`, `confirm`, and `cancel` according to your business requirements, 
   and the `confirm` and `cancel` methods should be implemented by yourselves, the framework is only responsible for calling them to achieve transaction consistency.

# TAC Mode  

   ![](https://yu199195.github.io/images/hmily/hmily-tac.png) 
   
   When using the `TAC` mode, you must use a relational database for business operations, and the framework will automatically generate a `rollback SQL`.
       When the business is abnormal, the `rollback SQL` will be executed to achieve transaction consistency
   
  
# About 
    
   Hmily is a flexible distributed transaction solution that provides `TCC` and `TAC` modes.
      
   It can be easily integrated by business with zero intrusion and rapid integration.
      
   In terms of performance, log storage is asynchronous (optional) and uses asynchronous execution, without sacrificing business methods.
      
   It was previously developed by myself personally, and it is currently restarted at JD Digital Technique Group, and it will become JD Digital Technique Group's distributed transaction
    solution in the future.

# Support

 * ###  If you have any questions, please join the QQ group for discussion
   ![](https://yu199195.github.io/images/qq.png)


 * ###  WeChat public account
   ![](https://yu199195.github.io/images/public.jpg)

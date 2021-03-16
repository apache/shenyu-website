---
title: "Hmily released 2.0.2-Release"
author: "xiaoyu"
description: "Hmily released 2.0.2-Release"
categories: "hmily"
tags: ["hmily"]
date: 2019-04-05
cover: "/img/architecture/hmily-framework.png"
---

## Hmily released 2.0.2-Release
* Resolved the issue of SpringCloud using Hystrix to configure thread pool.
* New issue with SpringCloud embedded transaction calls.

* Added Hmily load balancing strategy.

* Other bug fixes and code optimizations.

* Remove unnecessary third-party JAR packages.

* Introduction of zero intrusion mode.

## Hmily's support for the popular RPC framework and Spring.

* Dubbo 2.7.0 for all versions below.
* SpringCloud Dalston and above, including support for Finchley and Greenwich

* All versions of Motan.

* All Spring versions up to 3.0.

## Hmily has a load-balancing policy for user RPC clusters in version 2.0.2.

 * Hmily provides its own implementation of the load-balancing strategy, only for interfaces with @Hmily added

   Dubbo cluster configuration with loadbalance="hmily"

```xml
 <dubbo:reference timeout="50000" 
       interface="org.dromara.hmily.demo.dubbo.account.api.service.AccountService"          
             id="accountService"
                 retries="0" check="false" actives="20" loadbalance="hmily"/>
```

Spring Cloud added to the caller's YML configuration file:

```yml
hmily ：
   ribbon:
      rule
        enabled : true
```
## Documents

* Official document: https://dromara.org/website/zh-cn/docs/hmily/index.html

* Github: https://github.com/yu199195/hmily

* Gitee:  https://gitee.com/dromara/hmily

  Welcome to Star Fork, provide excellent code and suggestions.

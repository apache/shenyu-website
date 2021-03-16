---
title: "Hmily发布2.0.2-RELEASE版本"
author: "xiaoyu"
description: "Hmily发布2.0.2-RELEASE版本"
categories: "hmily"
tags: ["hmily"]
date: 2019-04-05
cover: "/img/architecture/hmily-framework.png"
---

## Hmily 发布2.0.2-RELEASE 版本
* 解决SpringCloud 使用hystrix 配置线程池策略的问题。

* 新增对springcloud 内嵌事务调用的问题。

* 新增Hmily负载均衡策略。

* 其他bug的修护，与代码的优化。

* 去除不必须的第三方jar包。

* 零侵入方式的引入。

## Hmily对现在流行RPC框架以及Spring的支持情况。

* dubbo 2.7.0以下所有版本。

* Springcloud Dalston以上版本，包括支持现在的Finchley 与 Greenwich

* Motan 所有版本。

* 3.0以上所有Spring版本。

## Hmily 在2.0.2版本对使用者RPC集群时候负载均衡策略。
 
 * hmily提供了自己实现的负载均衡策略，只是针对加了@Hmily的接口

dubbo 集群配置,配置负载方式为：loadbalance="hmily"
```xml
 <dubbo:reference timeout="50000" 
       interface="org.dromara.hmily.demo.dubbo.account.api.service.AccountService"          
             id="accountService"
                 retries="0" check="false" actives="20" loadbalance="hmily"/>
```                 

Springcloud 在调用方的yml配置文件中新增：

```yml
hmily ：
   ribbon:
      rule
        enabled : true
```
## Hmily的具体使用文档：

* 官网文档 ：https://dromara.org/website/zh-cn/docs/hmily/index.html

* github地址: https://github.com/yu199195/hmily

* gitee地址： https://gitee.com/dromara/hmily

* 欢迎大家star fork ，提供优秀的代码与建议。

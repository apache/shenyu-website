---
layout: singlepage
title: "Dromara 社区"
---

## 事件 & 新闻
### Hmily 发布2.0.2-RELEASE 版本
* 解决SpringCloud 使用hystrix 配置线程池策略的问题。

* 新增对springcloud 内嵌事务调用的问题。

* 新增Hmily负载均衡策略。

* 其他bug的修护，与代码的优化。

* 去除不必须的第三方jar包。

* 零侵入方式的引入。

#### Hmily对现在流行RPC框架以及Spring的支持情况。

* dubbo 2.7.0以下所有版本。

* Springcloud Dalston以上版本，包括支持现在的Finchley 与 Greenwich

* Motan 所有版本。

* 3.0以上所有Spring版本。

#### Hmily 在2.0.2版本对使用者RPC集群时候负载均衡策略。
 
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

#### Hmily的具体使用文档：

* 官网文档 ：https://dromara.org/website/zh-cn/docs/hmily/index.html

* github地址: https://github.com/yu199195/hmily

* gitee地址： https://gitee.com/shuaiqiyu/hmily

* 欢迎大家star fork ，提供优秀的代码与建议。

### Soul网关发布1.0.4-RELEASE版本

* 修复在1.0.3版本的后台管理中，出现的bug。
* 配置信息序列化方式支持自定义扩展。默认的序列化方式由kroy 改为了java序列化方式。
* dubbo框架支持的更改。

#### 对dubbo用户使用的更改。

* 在以前的版本中（1.0.2 or 1.0.3），dubbo的参数是通过header头上传递，在1.0.4版本中是通过body传递

* 更新了相关的文档信息。

#### 关于使用1.0.4版本的建议。

* 1.0.4 版本支持用户自定义插件开发，支持正则表达式的匹配。

* dubbo参数传递的更改，我觉得这样会更加友好。

#### 如果您之前使用的1.0.2版本，想要更新到1.0.4版本。
 
 * 在插件表新增role字段。

 * 重新启动1.0.4版本的管理后台。

 * 执行同步所有插件（因为序列化方式的更改）

 * 启动1.0.4版本的soul-web服务。

#### 遇到问题？

 * 添加qq群（429951241）

 * 官网文档：https://dromara.org/website/zh-cn/docs/soul/soul.html

 * github地址: https://github.com/Dromara/soul

 * gitee地址： https://gitee.com/shuaiqiyu/soul

## 生态系统


## 联系我们


## 贡献指南


---
title: Sofa Plugin
keywords: sofa
description: sofa access shenyu gateway
---

## Description

* The sofa plugin is a plugin that converts the Http protocol into the sofa protocol, and it is also the key to the gateway to realize the sofa generalization call.
* The sofa plugin needs to cooperate with metadata to realize the call of Sofa.


## Plugin Setting

* Add related dependencies and enable plugin, please refer to: [Quick start with Sofa](../quick-start-sofa) .
 
* `Sofa` client access, please refer to: [Sofa Proxy](../sofa-proxy) .

* Set selector and rule, please refer to: [Selector And Rule Config](../selector-and-rule) .


## Metadata


Each `sofa` interface method, will correspond to a metadata, when the `sofa` application client access to the `ShenYu` gateway, will be automatically registered, can be viewed in the `shenyu-admin` background management system of the BasicConfig --> Metadata management.



<img src="/img/shenyu/plugin/sofa/sofa-plugin-en-1.png" width="80%"/>


* AppName: specifies the name of the application to which the metadata belongs.

* MethodName: the name of the method to call.
             
* Path: http request path.

* PathDescribe: the description of the path is easy to view.
               
* ParamsType: the parameters are separated by commas (,) in the order of interface parameter types.
             
* RpcExpand: other configurations of the `sofa` interface, which support the `JSON` format, are as follows:
             


```yaml
{"loadbalance":"hash","retries":3,"timeout":-1}
```

* Interface: The fully qualified class name of the `sofa` interface.
           
* RpcType：choose `sofa`.


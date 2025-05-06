---
title: Dubbo Plugin
keywords: ["dubbo"]
description: dubbo plugin
---

## Explanation

* Dubbo is a plugin that converts `http protocol` into `Dubbo protocol` and it is also the key for gateway to realize dubbo generic service.
* Dubbo plugin needs to cooperate with metadata to realize dubbo calls.
* Apache Dubbo and Alibaba Dubbo users both use the same plugin.

## Plugin Setting

* Add related dependencies and enable plugin, please refer to: [Quick start with Dubbo](../../quick-start/quick-start-dubbo) .

* `Dubbo` client access, please refer to: [Dubbo Proxy](../../user-guide/proxy/dubbo-proxy.md) .

* Set selector and rule, please refer to: [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule) .

* Since `version 2.4.3`, the new fields and meanings of the dubbo plugin:

<img src="/img/shenyu/plugin/dubbo/dubbo_plugin.png" width="80%" height="80%" />

  * `corethreads`：The number of core threads in the business thread pool。

  * `queues`：The length of the blocking queue of the business thread pool, 0 means `unbounded blocking queue`。

  * `threadpool`：There are five types of business thread pools: `fixed`, `eager`, `cached`, `limited` and `shared`. The first 4 types correspond to the thread pools officially provided by dubbo. Let's talk about `shared`, as its name implies, `all proxy plugins` share a `shared` thread pool, the advantage of this is that it can reduce the number of thread pools, thereby reducing memory and improving resource utilization。

  * `threads`：The maximum number of threads in the business thread pool。

## Plugin Detail

After the client accesses the `ShenYu` gateway, it will automatically register the selector and rule information. For details about the selector and rule configuration, see [Selector and Rule Config](../../user-guide/admin-usage/selector-and-rule) .

#### Selector Handler

<img src="/img/shenyu/plugin/dubbo/selector_en_new.png" width="80%" height="80%" />

Selector Handler, the `handle` field, is an operation that can be processed by the gateway after matching the traffic. For more information, please refer to [Plugin handle management](../../user-guide/admin-usage/plugin-handle-explanation) in Plugin Config.

* details：

  * `host`：host string.
  
  * `ip:port`：ip+port string.
    
  * `protocol`：protocol default is 'http'.
  
  * `group`：the group of dubbo service.
  
  * `version`：the version of dubbo service.
  
  * `weight`：the server instance and participate in load balancing calculation.
  
  * `warmupTime`：the server's warm up time and and participate in load balancing calculation.
  
  * `startupTime`：the server's start time.
  
  * `status`：true: the server is available，false: the server is unavailable.
      
  * `gray`：enable gray routing.
  
Gray routing

if you want to user gray route in dubbo-plugin, you can click the `gray` button.

* Gray level publishing can customize and control the traffic proportion of new version applications when publishing new version applications, gradually complete the full launch of new version applications, maximize the business risk caused by new version publishing, reduce the impact surface caused by faults, and support rapid roll back.

when the gray is open,Gateway load balancing will select one node from the current node list for routing and you can modify node weights to change the weight of nodes in the load balancing algorithm.
It should be noted that,if your business instance not use the client jar of 'shenyu-client-apache-dubbo' or 'shenyu-client-alibaba-dubbo', You should add gray node information manually on this selector page.

#### Rule Handler

<img src="/img/shenyu/plugin/dubbo/rule_en.png" width="80%" height="80%" />

Rule Handler, the `handle` field, can be performed by the gateway after the final matching of traffic. For more information, please refer to [Plugin handle management](../../user-guide/admin-usage/plugin-handle-explanation) in Plugin Config.

* details：

  * `loadbalance`：the loadbalance of dubbo service, if the gray node selection fails, the default load balancing method will be used.

* Apache ShenYu will obtain the real IP of the corresponding service and initiate rpc proxy calls from registration center of dubbo.


## Metadata

* Every dubbo interface method corresponds to a piece of metadata, which can be found in `shenyu-admin` --> BasicConfig -> Metadata .

<img src="/img/shenyu/plugin/dubbo/dubbo-metadata-en.jpg" width="50%"/>

* AppName: The name of the application to which this piece of metadata belongs.

* MethodName: The name of the method that needs to be called.

* Path: your http request path.

* PathDescribe: Description of the path, for easy viewing.

* ParamsType: List of parameter types of dubbo interface, there are two declaration methods here:
  e.g. we have an interface `update(Integer id, String name, Integer age)`

  * Type list

        ```yaml
        java.lang.Integer,java.lang.String,java.lang.Integer
        ```

    * According to the order of the parameter types of the interface, separated by `,`

    * When requesting to pass parameters, **the parameters must be passed in strictly in accordance with the order of the parameter types**, if a parameter without value use `null` as a placeholder.

          Request body example: `{"id":1,"name": null,"age":18}`

  * Name mapping

      ```yaml
      {"id":"java.lang.Integer","name":"java.lang.String","age":"java.lang.Integer"}      
      ```

    * Use `"parameter name":"parameter type"` to represent a parameter, set in order of interface parameter type, separated by `,`

    * No need to pay attention to the order when requesting, and no need to use null placeholders.

          Request body example: `{"name":"Mike","id":1}`

* RpcExpand: corresponding to some configurations of dubbo interface; If you want to adjust, please modify here, which support json format like the following fields:

```yaml
{"timeout":10000,"group":"",version":"","loadbalance":"","retries":1}
```

* Interface: The fully-qualified name for dubbo interface .

* RpcType: Choose `dubbo` .


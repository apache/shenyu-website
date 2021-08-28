---
title: Tars Plugin
keywords: ["tars-plugin"]
description:  tars-plugin
---


## Description

* The tars plugin is a plugin that converts the Http protocol into the tars protocol.


## Plugin Setting

* Add related dependencies and enable plugin, please refer to: [Quick start with Tars](../quick-start-tars) .

* `Tars` client access, please refer to: [Tars Proxy](../tars-proxy) .



## Plugin Detail

After the client accesses the `Apache ShenYu` gateway, it will automatically register the selector and rule information. You can see it in PluginList -> rpc proxy -> tars. For details about the selector and rule configuration, see [Selector And Rule Config](../selector-and-rule) .



#### Selector Handler

<img src="/img/shenyu/plugin/tars/selector_en.png" width="80%" height="80%" />


Selector Handler, the `handle` field is the tars service that is actually invoked after the gateway matches the traffic. You can configure multiple load balancing weights and specify the specific load balancing policy in the rules. For more information, see [Plugin Handle Management](../plugin-handle-explanation) .


* config details：

    * `host`：generally, enter `localhost`.

    * `ip:port`：enter the ip:port of your real service .

    * `protocol`：indicates the Http protocol. Generally, the value is `http://` or `https://`. If the value is not specified, the default value is `http://` .

    * `startupTime`： start up time.

    * `weight`： load balancing weight.

    * `warmupTime`：warm up time.

    * `status`：open or close.


#### Rule Handle

<img src="/img/shenyu/plugin/tars/rule_en.png" width="80%" height="80%" />

Rule Handle, the `handle` field indicates the processing rule adopted by the gateway after the final matching of traffic. For more information, see [Plugin Handle Management](../plugin-handle-explanation) .

* config details:
    * `loadStrategy`: if the `Http` client is a cluster, Apache ShenYu gateway uses the load balancing policy when calling, currently supporting `roundRobin`, `random`, and `hash`.
    * `retryCount`: the number of retries to invoke the client.
    * `timeout`: time out to invoke the client.

## Metadata


Each `tars` interface method, will correspond to a metadata, when the `tars` application client access to the `Apache ShenYu` gateway, will be automatically registered, can be viewed in the `shenyu-admin` background management system of the BasicConfig --> Metadata management.

<img src="/img/shenyu/plugin/tars/metadata_en.png" width="80%" height="80%" />


* AppName: specifies the name of the application to which the metadata belongs.

* MethodName: the name of the method to call.

* Path: http request path.

* PathDescribe: the description of the path is easy to view.

* ParamsType: the parameters are separated by commas (,) in the order of interface parameter types.

* RpcExpand: describes each interface in a `tars` service. For example, here are the two interfaces for the `tars` service:

```json
{
  "methodInfo": [
    {
      "methodName": "helloInt",
      "params": [
        {
          "left": "int",
          "right": "no"
        },
        {
          "left": "java.lang.String",
          "right": "name"
        }
      ],
      "returnType": "int"
    },
    {
      "methodName": "hello",
      "params": [
        {
          "left": "int",
          "right": "no"
        },
        {
          "left": "java.lang.String",
          "right": "name"
        }
      ],
      "returnType": "java.lang.String"
    }
  ]
}
```


* Interface: The `serviceName` specified in the `@ShenyuTarsService` annotation.

* RpcType：choose `tars`.

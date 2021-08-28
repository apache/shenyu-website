---
title: Motan Plugin
keywords: ["motan-plugin"]
description:  motan-plugin
---


## Description

* The motan plugin is a plugin that converts the Http protocol into the motan protocol.


## Plugin Setting

* Add related dependencies and enable plugin, please refer to: [Quick start with Motan](../quick-start-motan) .

* `Motan` client access, please refer to: [Motan Proxy](../motan-proxy) .



## Plugin Detail

After the client accesses the `Apache ShenYu` gateway, it will automatically register the selector and rule information.

You can see it in PluginList -> rpc proxy -> motan. For details about the selector and rule configuration, see [Selector And Rule Config](../selector-and-rule) .

## Metadata

Each `motan` interface method, will correspond to a metadata, when the `motan` application client access to the `Apache ShenYu` gateway, will be automatically registered, can be viewed in the `shenyu-admin` background management system of the BasicConfig --> Metadata management.

<img src="/img/shenyu/plugin/motan/metadata_en.png" width="60%" height="50%" />


* AppName: specifies the name of the application to which the metadata belongs.

* MethodName: the name of the method to call.

* Path: http request path.

* PathDescribe: the description of the path is easy to view.

* ParamsType: the parameters are separated by commas (,) in the order of interface parameter types.

* RpcExpand: description of each interface in a `motan` service. For example, here is the interface information for the `motan` service:



```json
{
  "methodInfo": [
    {
      "methodName": "hello",
      "params": [
        {
          "left": "java.lang.String",
          "right": "name"
        }
      ]
    }
  ],
  "group": "motan-shenyu-rpc"
}
```


* Interface: The fully qualified class name of the `motan` interface.

* RpcType：choose `motan`.

---
title: gRPC Plugin
keywords: ["grpc-plugin"]
description:  grpc-plugin
---


## Description

* The grpc plugin is a plugin that converts the Http protocol into the grpc protocol.


## Plugin Setting

* Add related dependencies and enable plugin, please refer to: [Quick start with gRPC](../../quick-start/quick-start-grpc) .

* `gRPC` client access, please refer to: [gRPC Proxy](../../user-guide/grpc-proxy) .



## Plugin Detail


After the client accesses the `Apache ShenYu` gateway, it will automatically register the selector and rule information. You can see it in PluginList -> rpc proxy -> grpc. For details about the selector and rule configuration, see [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule) .


### Selector Handler

<img src="/img/shenyu/plugin/grpc/selector_en.png" width="80%" height="80%" />

Selector Handler, the `handle` field, is the processing operation that the gateway can perform after matching the traffic.

* config details：

  * `ip:port`：enter the ip:port of your real service .

  * `protocol`：indicates the Http protocol. Generally, the value is `http://` or `https://`. If the value is not specified, the default value is `http://` .

  * `weight`：service weight.

  * `status`：open or close.


## Metadata

Each `grpc` interface method, will correspond to a metadata, when the `grpc` application client access to the `Apache ShenYu` gateway, will be automatically registered, can be viewed in the `shenyu-admin` background management system of the BasicConfig --> Metadata management.

<img src="/img/shenyu/plugin/grpc/metadata_en.png" width="80%" height="80%" />


* AppName: specifies the name of the application to which the metadata belongs.

* MethodName: the name of the method to call.

* Path: http request path.

* PathDescribe: the description of the path is easy to view.

* ParamsType: the parameters are separated by commas (,) in the order of interface parameter types.

* RpcExpand: other configurations of the `grpc` interface, which support the `JSON` format, are as follows:

```json
{
  "timeout": 5000,
  "methodType": "SERVER_STREAMING"
}
```

* Interface: The fully qualified class name of the `grpc` interface.

* RpcType：choose `grpc`.

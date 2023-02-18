---
title: Brpc Plugin
keywords: ["brpc-plugin"]
description:  brpc-plugin
---

# 1. Overview

## 1.1 Plugin Name

* Brpc Plugin

## 1.2 Appropriate Scenario

* a plugin that converts http protocol requests into the Brpc framework protocol

## 1.3 Plugin code

* Core Module `shenyu-plugin-brpc`

* Core Class `org.apache.shenyu.plugin.brpc.BrpcPlugin`

## 1.4 Added Since Which shenyu version

* Since ShenYu 2.5.1

# 2. Brpc plugin


## 2.1 Plugin Setting

* Add related dependencies and enable plugin, please refer to: [Quick start with Brpc](../../quick-start/quick-start-brpc) .

* `Brpc` client access, please refer to: [Brpc Proxy](../../user-guide/brpc-proxy) .


## 2.2 Metadata

Each `Brpc` interface method, will correspond to a metadata, when the `Brpc` application client access to the `Apache ShenYu` gateway, will be automatically registered, can be viewed in the `shenyu-admin` background management system of the BasicConfig --> Metadata management.

<img src="/img/shenyu/plugin/brpc/metadata_en.png" width="100%" height="100%" />


* AppName: specifies the name of the application to which the metadata belongs.

* MethodName: the name of the method to call.

* Path: http request path.

* PathDescribe: the description of the path is easy to view.

* ParamsType: the parameters are separated by commas (,) in the order of interface parameter types.

* RpcExpand: description of each interface in a `Brpc` service. For example, here is the interface information for the `Brpc` service:



```json
{
    "methodInfo":[
        {
            "methodName":"getUser",
            "paramTypes":[
                {
                    "left":"java.lang.Long",
                    "right":"userId"
                }
            ]
        }
    ],
    "host": "127.0.0.1",
    "port": 8005
}
```


* Interface: The fully qualified class name of the `Brpc` interface.

* RpcType：choose `Brpc`.

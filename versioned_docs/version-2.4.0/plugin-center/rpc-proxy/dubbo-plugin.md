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

* `Dubbo` client access, please refer to: [Dubbo Proxy](../../user-guide/dubbo-proxy) .

* Set selector and rule, please refer to: [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule) .


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
{ "timeout": 10000,"group": "",version":"","loadbalance": "","retries": 1 }
```

* Interface: The fully-qualified name for dubbo interface .

* RpcType: Choose `dubbo` .


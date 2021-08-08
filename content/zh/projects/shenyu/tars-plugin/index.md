---
title: Tars插件
keywords: Tars
description:  Tars插件
---


## 说明

`Tars`插件是网关用于处理 `Tars协议`请求的核心处理插件。

## 插件设置

* 引入相关依赖，开启插件，请参考：[Tars快速开始](../quick-start-tars) 。
 
* `Tars`应用客户端接入，请参考：[Tars服务接入](../tars-proxy) 。


## 插件讲解

客户端接入`Apache ShenYu`网关后，会自动注册选择器和规则信息，可以在插件列表 `->` rpc proxy `->` tars 中查看。关于选择器和规则配置，请参考：[选择器和规则管理](../selector-and-rule)。



#### 选择器处理

<img src="/img/shenyu/plugin/tars/selector_zh.png" width="80%" height="80%" />


选择器处理，即`handle`字段，是网关匹配到流量以后，实际调用的`tars`服务，可以配置多个，设置负载均衡权重，具体的负载均衡策略，在规则中指定。更多信息请参考插件管理中的 [插件处理管理](../plugin-handle-explanation) 。

* 处理配置详解：

     * `host`：一般填写 `localhost`。
     
     * `ip:port`：`ip` 与端口，这里填写你真实服务的 `ip` + 端口。

     * `protocol`：：`http` 协议，一般填写 `http://` 或者 `https://` ，不填写默认为:`http://`
  
     * `startupTime`： 启用时间。
     
     * `weight`：负载均衡权重。
     
     * `warmupTime`：预热时间。
  
     * `status`：开启或关闭。
  
 
#### 规则处理

<img src="/img/shenyu/plugin/tars/rule_zh.png" width="80%" height="80%" />

规则处理，即`handle`字段，是网关对流量完成最终匹配后，采取何种处理规则。更多信息请参考插件管理中的 [插件处理管理](../plugin-handle-explanation) 。

* 处理配置详解：
    * `loadStrategy`：如果`http`客户端是一个集群，`Apache ShenYu`网关调用时采取哪种负载均衡策略，当前支持 `roundRobin`、`random`和`hash`。
    * `retryCount`：调用`http`客户端的重试次数。
    * `timeout`：调用`http`客户端的超时时间。

## 元数据

每一个`tars`接口方法，都会对应一条元数据，当`tars`应用客户端接入到`Apache ShenYu`网关时，会自动注册，可以在 `shenyu-admin`后台管理系统的基础配置 `-->` 元数据管理中查看。

<img src="/img/shenyu/plugin/tars/metadata_zh.png" width="80%" height="80%" />

* 应用名称：该条元数据所属的应用名称。

* 方法名称：需要调用的方法名。

* 路径：`tars`请求路径。

* 路径描述：对该路径的说明，方便查看。

* 参数类型：`tars`接口的参数类型列表，按照接口的参数类型顺序，通过半角逗号分隔。

* Rpc扩展参数：描述了一个`tars`服务中每个接口信息。比如，下面是`tars`服务的两个接口信息：

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

* 服务接口：在注解 `@ShenyuTarsService` 中指定的`serviceName` 。

* `Rpc`类型：下拉选择 `tars`。
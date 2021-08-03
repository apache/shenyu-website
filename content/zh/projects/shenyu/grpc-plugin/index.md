---
title: gRPC插件
keywords: gRPC
description:  gRPC插件
---


## 说明

`gRPC`插件是网关用于处理 `gRPC协议`请求的核心处理插件。

## 插件设置

* 引入相关依赖，开启插件，请参考：[gRPC快速开始](../quick-start-grpc) 。
 
* `gRPC`应用客户端接入，请参考：[gRPC服务接入](../grpc-proxy) 。


## 插件讲解


客户端接入`Apache ShenYu`网关后，会自动注册选择器和规则信息，可以在插件列表 `->` rpc proxy `->` grpc 中查看。 关于选择器和规则配置，请参考：[选择器和规则管理](../selector-and-rule)。



#### 选择器处理

<img src="/img/shenyu/plugin/grpc/grpc-1.png" width="80%" height="80%" />


选择器处理，即`handle`字段，是网关匹配到流量以后，可进行的处理操作。

* 处理配置详解：

     
     * `ip:port`：`ip` 与端口，这里填写你真实服务的 `ip` + 端口。

     * `protocol`：`http` 协议，一般填写 `http://` 或者 `https://` ，不填写默认为:`http://`
       
     * `weight`：服务权重。
     
     * `status`：开启或关闭。
     
     
## 元数据

每一个`grpc`接口方法，都会对应一条元数据，当`gRPC`应用客户端接入到`Apache ShenYu`网关时，会自动注册，可以在 `shenyu-admin`后台管理系统的基础配置 `-->` 元数据管理中查看。

<img src="/img/shenyu/plugin/grpc/grpc-2.png" width="80%" height="80%" />


* 应用名称：该条元数据所属的应用名称。

* 方法名称：需要调用的方法名。

* 路径：`http`请路径。

* 路径描述：对该路径的说明，方便查看。

* 参数类型：`grpc`接口的参数类型列表，按照接口的参数类型顺序，通过半角逗号分隔。

* Rpc扩展参数：`grpc`接口的其他配置，支持`json`格式，字段如下：

```json
{
  "timeout": 5000,
  "methodType": "BIDI_STREAMING"
}
```

* 服务接口：`grpc`接口的全限定类名

* `Rpc`类型：此处选择 `grpc`。
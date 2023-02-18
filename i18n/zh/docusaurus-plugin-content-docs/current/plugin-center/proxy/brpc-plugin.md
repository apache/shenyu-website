---
title: Brpc插件
keywords: ["Brpc"]
description:  Brpc插件
---


# 1. 概述

## 1.1 插件名称

* Brpc插件

## 1.2 适用场景

* 用来将`http协议` 转成 `Brpc协议`。

## 1.3 插件代码

* 核心模块 `shenyu-plugin-brpc`

* 核心类 `org.apache.shenyu.plugin.brpc.BrpcPlugin`

## 1.4 添加自哪个shenyu版本

* Since ShenYu 2.5.1

# 2. Brpc插件


## 2.1 插件设置

* 引入相关依赖，开启插件，请参考：[Brpc快速开始](../../quick-start/quick-start-brpc) 。

* `Brpc`应用客户端接入，请参考：[Brpc服务接入](../../user-guide/brpc-proxy) 。


## 2.2 元数据

每一个`Brpc`接口方法，都会对应一条元数据，当`Brpc`应用客户端接入到`Apache ShenYu`网关时，会自动注册，可以在 `shenyu-admin`后台管理系统的基础配置 `-->` 元数据管理中查看。

<img src="/img/shenyu/plugin/brpc/metadata.png" width="100%" height="100%" />

* 应用名称：该条元数据所属的应用名称。

* 方法名称：需要调用的方法名。

* 路径：`Brpc`请求路径。

* 路径描述：对该路径的说明，方便查看。

* 参数类型：`Brpc`接口的参数类型列表，按照接口的参数类型顺序，通过半角逗号分隔。

* Rpc扩展参数：描述了一个`Brpc`服务中每个接口信息。比如，下面是`Brpc`服务的接口信息：

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


* 服务接口：`Brpc`服务接口全限定名。

* `Rpc`类型：下拉选择 `Brpc`。

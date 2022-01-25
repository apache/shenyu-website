---
title: 多语言Http客户端
keywords: ["客户端"]
description: 多语言http客户端
---

## 说明

* 本文主要讲解其他语言的`http`服务如何接入网关。
* 如何自定义开发`shenyu-http-client`。

## 自定义开发

* 请求方式：`POST`
* 请求路径：`http://shenyu-admin/shenyu-client/springmvc-register` ，  其中 `shenyu-admin` 表示为 `admin` 后台管理系统的 `ip + port` 。


* 请求参数：`Apache ShenYu`网关默认的需要参数，通过`body`里面传入，`json`类型。

```json
{
    "appName": "xxx", //应用名称 必填
    "context": "/xxx", //请求前缀 必填
    "path": "xxx", //路径需要唯一 必填
    "pathDesc": "xxx", //路径描述
    "rpcType": "http", //rpc类型  必填
    "host": "xxx", //服务host 必填
    "port": xxx, //服务端口 必填
    "ruleName": "xxx", //可以同path一样  必填
    "enabled": "true", //是否开启
    "registerMetaData": "true" //是否需要注册元数据
}
```






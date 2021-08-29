---
title: Motan插件
keywords: ["Motan"]
description:  Motan插件
---

## 说明

`Motan`插件是网关用于处理 `Motan协议`请求的核心处理插件。

## 插件设置

* 引入相关依赖，开启插件，请参考：[Motan快速开始](../../quick-start/quick-start-motan) 。

* `Motan`应用客户端接入，请参考：[Motan服务接入](../../user-guide/motan-proxy) 。


## 插件讲解

客户端接入`Apache ShenYu`网关后，会自动注册选择器和规则信息，可以在插件列表 `->` rpc proxy `->` motan 中查看。 关于选择器和规则配置，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。

#### 元数据

每一个`motan`接口方法，都会对应一条元数据，当`motan`应用客户端接入到`Apache ShenYu`网关时，会自动注册，可以在 `shenyu-admin`后台管理系统的基础配置 `-->` 元数据管理中查看。

<img src="/img/shenyu/plugin/motan/metadata.png" width="60%" height="50%" />

* 应用名称：该条元数据所属的应用名称。

* 方法名称：需要调用的方法名。

* 路径：`motan`请求路径。

* 路径描述：对该路径的说明，方便查看。

* 参数类型：`motan`接口的参数类型列表，按照接口的参数类型顺序，通过半角逗号分隔。

* Rpc扩展参数：描述了一个`motan`服务中每个接口信息。比如，下面是`motan`服务的接口信息：

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

* 服务接口：`motan`服务接口全限定名。

* `Rpc`类型：下拉选择 `motan`。

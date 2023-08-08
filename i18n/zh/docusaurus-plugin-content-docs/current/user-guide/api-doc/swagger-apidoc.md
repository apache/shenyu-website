---
title: Shenyu注解注册API文档
keywords: ["api doc 接口 文档 register 注册"]
description: Shenyu注解注册API文档
---

此篇文介绍如何将 `Swagger API文档` 暴露到 `Apache ShenYu` 网关。

接入前，请正确启动 `shenyu-admin`。

## API文档暴露到网关

可以参考[shenyu-examples](https://github.com/apache/shenyu/tree/master/shenyu-examples)下面任意一个example的代码。

## 环境准备

* 需要参考 `运维部署` , 选择一种方式启动`shenyu-admin`.

* 在`Apache ShenYu`网关管理系统 --> 基础配置 --> 字典管理， 找到字典编码为 `apidoc`，修改 DictionaryValue值为: `true`，图中的示例是`custom`。

<img src="/img/shenyu/custom/custom_parameter_data_zh.png" width="70%" height="60%" />

## shenyu-bootstrap

### 添加Maven依赖

在网关的`pom.xml`文件中引入如下依赖.


### 配置文件调整



## 本地接口配置

## 运行shenyu-examples-websocket项目

1. 下载 [shenyu-examples-websocket](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-websocket/shenyu-example-spring-annotation-websocket)（`native-websocket` 和 `reactive-websocket` 可以参考[shenyu-examples-websocket](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-websocket) 下的子项目）

2. 运行`org.apache.shenyu.examples.websocket.TestAnnotationWebsocketApplication` main方法启动项目。

- examples项目会根据 `shenyu.register.serverLists` 配置的地址，通过 `http` 协议将 websocket 服务的信息同步给 `shenyu-admin`, 之后再由 `shenyu-admin` 同步给 `shenyu-bootstrap`。

成功启动会有如下日志：

```shell
2022-08-09 23:37:34.994  INFO 61398 --- [or_consumer_-21] o.a.s.r.client.http.utils.RegisterUtils  : metadata client register success: {"appName":"ws-annotation","contextPath":"/ws-annotation","path":"/ws-annotation/myWs","rpcType":"websocket","ruleName":"/ws-annotation/myWs","enabled":true,"pluginNames":[],"registerMetaData":false,"timeMillis":1660059454701} 
2022-08-09 23:37:35.019  INFO 61398 --- [or_consumer_-18] o.a.s.r.client.http.utils.RegisterUtils  : uri client register success: {"protocol":"ws://","appName":"ws-annotation","contextPath":"/ws-annotation","rpcType":"websocket","host":"192.168.1.3","port":8001} 
```

## 测试websocket请求

1. `shenyu-examples-websocket`项目成功启动之后会自动把加 `@ShenyuSpringWebSocketClient` 注解的接口方法注册到网关，并添加选择器和规则，可以通过访问 `shenyu-admin` 页面 -> 插件列表 -> Proxy -> Websocket 看到 `shenyu-examples-websocket` 服务注册的信息，如果没有，可以参考[Websocket插件](../plugin-center/proxy/websocket-plugin.md)手动添加配置。

<img src="/img/shenyu/plugin/websocket/auto_register_zh.png" width="60%" height="50%" />

2. 下面使用测试代码(见附件)模拟 `Websocket` 协议的请求方式来请求你的`Websocket`服务。

<img src="/img/shenyu/plugin/websocket/test_result_en.png" width="60%" height="50%" />


**示例**



更多可参考示例工程 [shenyu-examples-sdk](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-sdk)

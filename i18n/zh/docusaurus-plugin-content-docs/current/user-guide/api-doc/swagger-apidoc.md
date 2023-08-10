---
title: 远程拉取swagger API文档
keywords: ["swagger api doc 接口 文档聚合"]
description: 远程拉取swagger API文档
---

此篇文介绍如何将 `Swagger API文档` 暴露到 `Apache ShenYu` 网关。

## 环境准备

* 需要参考 `运维部署` , 选择一种方式启动`shenyu-admin`.

* 在`Apache ShenYu`网关管理系统 --> 基础配置 --> 字典管理， 找到字典编码为 `apidoc`，修改 DictionaryValue值为: `true`，如下图所示：

<img src="/img/shenyu/api-doc/apidoc-dictionary-cn.png" width="70%" height="60%" />

### 添加Maven依赖
目前支持哪些插件？？列举处理

## 运行shenyu-examples-http-swagger2项目

1. 下载 [shenyu-examples-http-swagger2](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-http-swagger2)

2. 运行`org.apache.shenyu.examples.http.ShenyuTestSwaggerApplication` main方法启动项目。

- examples项目会根据 `shenyu.register.serverLists` 配置的地址，通过 shenyu client 注解(比如`@ShenyuSpringMvcClient`) 将 服务启动信息同步给 `shenyu-admin`, 之后再由 `shenyu-admin` 远程拉取swagger文档，然后解析并聚合展示api文档。
  
<img src="/img/shenyu/plugin/websocket/test_result_en.png" width="60%" height="50%" />

## 查看聚合好的接口文档列表
在`Apache ShenYu`网关管理系统 --> 文档说明 --> API文档，可以看到已经聚合好接口文档。
<img src="/img/shenyu/api-doc/apidoc-swagger-list-cn.png" width="70%" height="60%" />

## 查看接口详情
<img src="/img/shenyu/api-doc/apidoc-detail-cn.png" width="70%" height="60%" />


**示例**

## 如何自动更新API文档

### 重启部署项目
使用shenyu client 注解上报启动时间 注解的接口方法注册到网
### 修改proxy插件选择器的启动时间
去proxy插件（比如）的selector下面修改启动时间晚于原启动时间。

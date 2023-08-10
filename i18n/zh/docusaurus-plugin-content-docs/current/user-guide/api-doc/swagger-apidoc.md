---
title: 拉取swagger注册API文档
keywords: ["swagger api doc 接口 文档聚合"]
description: 远程拉取swagger 注册 API文档
---

此篇文介绍如何将 `Swagger API文档` 暴露到 `Apache ShenYu` 网关。

## 1. 说明
远程拉取swagger文档，只适用于 divide 和 springCloud 两种代理插件。

## 2. 环境准备

* 需要参考 `运维部署` , 选择一种方式启动`shenyu-admin`.

* 在`Apache ShenYu`网关管理系统 --> 基础配置 --> 字典管理， 找到字典编码为 `apidoc`，修改 DictionaryValue值为: `true`。

<img src="/img/shenyu/api-doc/apidoc-dictionary-cn.png" width="70%" height="60%" />
![apidoc-detail-cn](/img/shenyu/api-doc/apidoc-detail-cn.png)



## 3. 运行shenyu-examples-http-swagger2项目

3.1. 下载 [shenyu-examples-http-swagger2](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-http-swagger2)

3.2. 运行`org.apache.shenyu.examples.http.ShenyuTestSwaggerApplication` main方法启动项目。

- examples项目会根据 `shenyu.register.serverLists` 配置的地址，通过 shenyu client 注解(比如`@ShenyuSpringMvcClient`) 将服务启动信息同步给 `shenyu-admin`, 之后再由 `shenyu-admin` 远程拉取swagger文档，然后解析并聚合展示api文档。
  
<img src="/img/shenyu/plugin/websocket/test_result_en.png" width="60%" height="50%" />
![apidoc-detail-cn](/img/shenyu/api-doc/apidoc-detail-cn.png)

## 4. 演示效果
### 4.1 API文档列表
在`Apache ShenYu`网关管理系统 --> 文档说明 --> API文档，可以看到已经聚合好的API文档。
<img src="/img/shenyu/api-doc/apidoc-swagger-list-cn.png" width="70%" height="60%" />
![apidoc-detail-cn](/img/shenyu/api-doc/apidoc-detail-cn.png)

### 4.2 接口详情效果
![apidoc-detail-cn](/img/shenyu/api-doc/apidoc-detail-cn.png)

## 5. 如何自动更新API文档

### 5.1 重启项目
正如上面示例，通过shenyu client 注解注册后端服务的启动时间。
### 5.2 修改proxy插件选择器的启动时间
proxy插件--> 选择器，修改目标服务的启动时间。注意：不能晚于原启动时间。
![app_proxy_startuptime_cn](/img/shenyu/api-doc/app_proxy_startuptime_cn.png)

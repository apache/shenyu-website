---
title: 拉取swagger注册API文档
keywords: ["swagger api 接口 文档聚合"]
description: 远程拉取swagger 注册 API文档
---

此篇文介绍如何将各个后端微服务的 `Swagger API文档` 聚合到 `Apache ShenYu` 网关。

## 1. 说明
远程拉取swagger文档，目前仅支持swaggger2.0，并且只支持 divide 和 springCloud 两种代理插件。

## 2. 环境准备
* 需要参考 `运维部署` , 选择一种方式启动`shenyu-admin`.

* 在`Apache ShenYu`网关管理系统 --> 基础配置 --> 字典管理， 找到字典编码为 `apidoc`的数据，修改 字典值为: `true`。

![apidoc-dictionary-cn](/img/shenyu/api-doc/apidoc-dictionary-cn.png)

## 3. 运行示例项目
3.1. 下载 [shenyu-examples-http-swagger2](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-http-swagger2)

3.2. 运行`org.apache.shenyu.examples.http.ShenyuTestSwaggerApplication` main方法启动项目。

examples项目会根据 `shenyu.register.serverLists` 配置的地址，通过 Shenyu client 注解(比如`@ShenyuSpringMvcClient`) 将服务启动信息同步给 `shenyu-admin`, 然后触发 `shenyu-admin` 远程拉取swagger文档并完成解析，最后聚合产出新的API文档。

## 4. 演示效果
### 4.1 API文档列表
在`Apache ShenYu`网关管理系统 --> 文档说明 --> API文档，你可以看到已经聚合好的API文档。

![apidoc-swagger-list-cn](/img/shenyu/api-doc/apidoc-swagger-list-cn.png)

### 4.2 API详情效果
![apidoc-detail-cn](/img/shenyu/api-doc/apidoc-detail-cn.png)

## 5. 如何自动更新API文档
### 5.1 重启项目
如上面示例那样，通过启动项目触发自动更新API文档。
### 5.2 修改proxy插件选择器的启动时间
在 proxy插件--> 选择器，找到目标服务，然后修改启动时间。
> 注意：新设置的启动时间一定不能早于原启动时间，否则不会触发自动拉取并刷新API文档。

![app_proxy_startuptime_cn](/img/shenyu/api-doc/app_proxy_startuptime_cn.png)

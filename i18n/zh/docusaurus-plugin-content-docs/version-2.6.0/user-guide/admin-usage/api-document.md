---
title: API文档管理
keywords: ["api doc 接口 文档"]
description: API文档管理
---

## 1. 背景与说明

前后端联调时，通常需要后端给出文档以详细说明接口的输入输出；

后端开发完成后，需要测试接入网关是否成功。

为了减少割裂感、提升前后端开发的用户体验，需要在shenyu-admin中看到API文档，以及直接对API进行测试。

## 2. 使用流程

大体的流程如下：
- 后端开发在shenyu-admin中产出API文档。
> 已经支持`远程拉取swagger`、`手动填写`、`客户端注册`3种方式。从功能完整性和使用体验上，目前更推荐`远程拉取swagger`，后2种方式将会在后面版本持续功能增强。
- 前端在shenyu-admin中查看API文档并开始开发。
> 联调期间开发人员(包括前后端)可以直接使用shenyu-admin中的接口调试功能发起API调用。

## 3. 设置全局的环境地址

实际使用中，可能你有多个网关地址（比如生产环境、测试环境，或者公网环境、内网环境），你可以在`Apache ShenYu`网关管理系统 --> 基础配置 --> 字典管理，配置多个网关地址。

![apidoc-env-cn](/img/shenyu/basicConfig/apiManagement/apidoc-env-cn.png)

> 字典类型：填写值必须是`apidocEnv`；
>
> 字典编码：网关地址的编码标识，无实际含义，建议以 `ENV_LABEL_`作为前缀，比如 `ENV_LABEL_OFFLINE`；
>
> 字典名称：表示网关类型，比如填写 `测试环境`、`生产环境`。该值将会出现在API文档详情页面；
> 
> 字典值：表示网关地址，比如 [http://localhost:9195](http://localhost:9195)。该值将会出现在API文档详情页面；
>
> 字典描述或备注：该网关地址用于何种场景，做一个简短描述。该值将会出现在API文档详情页面；
>
> 排序：数值大小决定了网关地址的展示顺序；
>
> 状态：打开或关闭。

## 4. 支持多种方式聚合API文档

### 4.1 手动填写API文档

点击菜单 "文档 -> API文档", 展示的页面中新增数据。

##### 创建项目

如果你还没有创建过项目或者你要把新建的API归类到新项目，这时需要你创建一个项目。

![app-create-cn](/img/shenyu/basicConfig/apiManagement/app-create-cn.png)

##### 增加API文档

![create-api-cn](/img/shenyu/basicConfig/apiManagement/create-api-cn.png)

### 4.2 远程拉取swagger注册API文档

 通过远程拉取swaager文档自动注册API文档。请参考[远程拉取swagger注册API文档](../api-doc/swagger-apidoc.md)

### 4.3 Shenyu客户端注解注册API文档

 通过Shenyu客户端注解自动注册API文档。请参考[客户端注册API文档](../api-doc/shenyu-annotation-apidoc.md)
> 若你没有查看完整接口文档详情的诉求，推荐使用这此方式。当你选择了这种自动注册方式，请关闭远程自动拉取swagger的注册方式，否则会有冲突。

## 5. 发布API

如果该API从未发布到proxy插件或你不打算使用shenyu客户端提供的注解注册URI，shenyu-admin的发布API功能为你提供了另一种可选方式，它将自动注册该API到网关，跟你使用shenyu客户端的注解效果一样。

![publish-api-cn](/img/shenyu/basicConfig/apiManagement/publish-api-cn.png)

点击保存后，你会看到，在选择器和规则下面插入了该API的注册数据。如下图所示：

![api-published-divide-list-cn](/img/shenyu/basicConfig/apiManagement/api-published-divide-list-cn.png)

## 6. 下线API(可选)

> 特别注意：点击下线后，该API虽然在API文档列表仍然可见，但会从proxy插件和元数据管理列表中删除，在你重新发布该API前，网关不会代理该API，当你通过网关请求该API时，会报异常。

![offline-api-cn](/img/shenyu/basicConfig/apiManagement/offline-api-cn.png)

## 7. 请求API（接口调试）

![api-debug-cn](/img/shenyu/basicConfig/apiManagement/api-debug-cn.png)

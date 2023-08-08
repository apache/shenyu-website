---
title: API文档管理
keywords: ["api doc 接口 文档"]
description: API文档管理
---

## 背景与说明

前后端联调时，通常需要后端给出文档以详细说明接口的输入输出；

后端开发完成后，需要测试接入网关是否成功。

为了减少割裂感、提升前后端开发的用户体验，需要在shenyu-admin中看到API文档，以及直接对API进行测试。


## 使用流程

大体的流程如下：
- 后端开发在shenyu-admin中产出API文档(已经支持`远程拉取swagger`、`手动填写`、`客户端注册`3种方式。从功能完整性和使用体验上，目前更推荐`远程拉取swagger`，后2种方式将会在后面版本持续功能增强)。
- 前端在shenyu-admin中查看API文档并开始开发。
> 联调期间开发人员(包括前后端)可以使用shenyu-admin中的测试功能直接请求API。

接下来我们看下具体操作：

### 手动填写API文档

在点击菜单 "文档 -> API文档" 展示的页面中新增数据。

> 通过客户端注册API文档请参考[客户端注册API文档](../api-document-register.md)

#### 创建项目

如果你还没有创建过项目或你的PAI需要归类到新项目，这时需要你创建一个项目。
<img src="/img/shenyu/basicConfig/apiManagement/create-tag-1-cn.png" width="80%" height="50%" />

#### 增加API文档

<img src="/img/shenyu/basicConfig/apiManagement/create-api-cn.png" width="80%" height="50%" />

这里出现列表的就是我们正在新增的API文档。

### 远程拉取swagger文档



#### 发布API

如果该API从未发布到proxy插件或你不打算使用shenyu客户端提供的注解注册URI，shenyu-admin的发布API功能为你提供了另一种可选方式，它将自动注册该API到网关，跟你使用shenyu客户端的注解效果一样。
<img src="/img/shenyu/basicConfig/apiManagement/publish-api-cn.png" width="80%" height="50%" />

#### 下线API(可选)

> 特别注意：点击下线后，该API虽然在API文档列表仍然可见，但会从proxy插件和元数据下面删除，在你重新发布该API前，网关不再代理该API。

<img src="/img/shenyu/basicConfig/apiManagement/offline-api-cn.png" width="80%" height="50%" />

### 请求API（接口调试）

<img src="/img/shenyu/basicConfig/apiManagement/api-debug-cn.png" width="80%" height="50%" />

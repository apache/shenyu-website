---
title: API文档管理
keywords: ["api doc 接口 文档"]
description: API文档管理
---

## 背景与说明

前后端联调时，通常需要后端给出文档以详细说明接口的输入输出；

后端开发完成后，需要测试接入网关是否成功。

为了减少割裂感、提升前后端开发的用户体验，需要在shenyu-admin中看到API文档，以及直接对API进行测试。

## 操作流程

大体的流程如下：
- 后端开发在shenyu-admin中产出API文档(同时支持`手动填写`和`客户端注册`2种方式，目前更推荐`客户端注册`)。
- 前端在shenyu-admin中查看API文档并开始开发。
> 联调期间开发人员(包括前后端)可能使用shenyu-admin中的测试功能直接请求API。

接下来我们看下具体操作：

### 手动填写API文档

在点击菜单 "文档 -> API文档" 展示的页面中新增数据。

> 通过客户端注册API文档请参考[客户端注册API文档](../api-document-register.md)

#### 增加标签

标签用于给API文档分类，标签下面既可以挂API，也可以挂标签，没有层级限制。
<img src="/img/shenyu/basicConfig/apiManagement/create-tag-1-cn.png" width="80%" height="50%" />

<img src="/img/shenyu/basicConfig/apiManagement/create-tag-2-cn.png" width="80%" height="50%" />

#### 增加API文档

<img src="/img/shenyu/basicConfig/apiManagement/create-api-cn.png" width="80%" height="50%" />

这里出现列表的就是我们正在新增的API文档。

#### 发布API

如果该API是从未发布到发布且用户并未接入shenyu客户端，shenyu-admin将会自动把API文档所描述的API暴露到网关。
<img src="/img/shenyu/basicConfig/apiManagement/publish-api-cn.png" width="80%" height="50%" />

#### 下线API(可选)

> 特别注意：点击下线后，API文档仍然可见，但暴露到网关的接口将会立即失效。

<img src="/img/shenyu/basicConfig/apiManagement/offline-api-cn.png" width="80%" height="50%" />

### 请求API

<img src="/img/shenyu/basicConfig/apiManagement/api-debug-cn.png" width="80%" height="50%" />

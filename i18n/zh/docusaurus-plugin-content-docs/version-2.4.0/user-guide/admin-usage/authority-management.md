---
title: 权限管理
keywords: ["权限", "authority"]
description: 权限管理详解
---

## 说明

- 管理和控制经过 `Apache ShenYu` 网关的请求的权限。
- 生成的 `AK/SK` ，配合 `sign` 插件使用，实现基于`URI`级别的精准权限管控。

## 使用教程

 第一步，我们可以直接在 `基础配置` --> `认证管理` 新增一条认证信息 。

<img src="/img/shenyu/basicConfig/authorityManagement/auth_manages_add_zh.jpg" width="100%" height="70%" />

 第二步，配置这条认证信息 。

<img src="/img/shenyu/basicConfig/authorityManagement/auth_param_zh.jpg" width="50%" height="40%"/>

- 应用名称：这个账号关联的应用名称，可手动填写或下拉选择（数据来自元数据管理中配置的应用名称）。
- 手机号：仅作为信息记录，在shenyu中无实际使用逻辑。
- APP参数：当请求的context path与应用名称相同时，向header中添加该值，键为 `appParam`。
- 用户ID：给该用户取一个名字，仅作为信息记录，在shenyu中无实际使用逻辑。
- 拓展信息：仅作为信息记录，在shenyu中无实际使用逻辑。
- 路径认证：开启后，该账号仅允许访问以下配置的资源路径。
- 资源路径：允许访问的资源路径，支持路径匹配，如 `/order/**` 。

点击确认后，生成一条认证信息，该信息包含 `AppKey` 和 `加密秘钥` ，即 `Sign` 插件中的 `AK/SK`  。

 `Sign`插件的详细使用说明请参考： [Sign插件](../sign-plugin) 。

#### 路径操作

对已创建的认证信息，可以在认证信息列表的末尾进行 `路径操作` 。

<img src="/img/shenyu/basicConfig/authorityManagement/auth_manage_modifyPath_zh.jpg" width="90%" height="80%"/>

- 左侧为可配置的路径列表，右侧为允许该账号访问的路径列表 。
- 勾选资源路径，点击中间的 `>` 或  `<` 将勾选的数据移动到对应列表中 。
- 左侧可配置路径列表可在账号信息行末尾点击 `编辑`，在弹框中的 `资源路径` 中进行添加 。


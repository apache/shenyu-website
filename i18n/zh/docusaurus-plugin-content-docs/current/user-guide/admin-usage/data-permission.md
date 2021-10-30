---
title: 数据权限管理
keywords: ["用户 插件 数据权限"]
description: 用户插件数据管理
---

## 背景与说明

为了实现插件所代理的不同 selector / rule 由不同的业务部门管理,需要对插件的 selector / rule 数据安全针对用户进行控制
用户未配置数据权限时候,是拥有所有数据权限的, 只要配置了权限就会进行数据权限控制。如下图所示：

<img src="/img/shenyu/basicConfig/dataPermission/data-permission-profile-zh.png" width="80%" height="50%" />


## 操作流程

大体的流程如下：
- 拥有管理用户权限的用户(包含 admin 用户) 新建用户。
- 拥有管理用户数据权限的用户(包含 admin 用户)点击操作中的 `配置数据权限`。
> 在此之前请确保插件列表中存在数据。如果没有则需要拥有管理插件权限的用户进行插件数据的增加。


接下来我们看下具体操作：

### 新建用户

在点击菜单 "系统管理 -> 用户管理" 展示的页面中新增数据。如下图所示：
<img src="/img/shenyu/basicConfig/dataPermission/create-user-cn.png" width="80%" height="50%" />

### 编辑数据权限

#### 增加插件数据

在插件列表中增加数据，本文以 `divide` 为例
<img src="/img/shenyu/basicConfig/dataPermission/plugin-data-cn.png" width="80%" height="50%" />

#### 增加菜单权限

给默认的角色赋予 divide 插件的权限。
<img src="/img/shenyu/basicConfig/dataPermission/role-permission-cn.png" width="80%" height="50%" />

默认的角色没有任何的菜单权限，如果赋予了用户，该用户将无法登录。将数据权限所在的菜单赋予该角色。

#### 配置用户的数据权限

新增用户后，我们看到普通用户之后会有一个编辑数据权限的按钮，可以对用户进行数据权限的管理。
<img src="/img/shenyu/basicConfig/dataPermission/permission-setting.png" width="80%" height="50%" />

这里的出现列表就是当时在插件中新增的数据。

### 新用户登录

新用户登录后只能看到已经赋予权限的数据。
<img src="/img/shenyu/basicConfig/dataPermission/new-user-login-cn.png" width="80%" height="50%" />

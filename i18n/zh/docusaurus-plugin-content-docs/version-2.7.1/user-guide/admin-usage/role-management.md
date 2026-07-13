---
title: 用户资源管理
keywords: ["用户 角色"]
description: 用户角色管理
---

本篇主要是讲述 `admin` 控制台通过用户关联的角色，角色赋予菜单和按钮等资源的权限来管理 `admin` 的操作权限。
<img src="/img/shenyu/basicConfig/roleManagement/role-profile.jpg" width="80%" height="50%" />

## 资源管理

在菜单栏中 ”系统管理 >> 资源管理“ 中增加菜单和按钮。

<img src="/img/shenyu/basicConfig/roleManagement/resource_dashboard.jpg" width="80%" height="50%" />

admin 用户显示了 shenyu 网关所有的菜单和按钮。如果需要自定义增加和删除，先增加菜单，在相应的菜单下，增加按钮。通过点击菜单中右侧的编辑小图标进行菜单的编辑


## 角色管理

通过菜单栏 ”系统管理 >> 角色管理“ 来关联角色和资源的权限。 默认会生成两个角色，一个超级管理员，一个普通用户。超级管理员为 admin 用户，不可更改，普通用户的角色可以更改其资源属性。 通过编辑相应的角色，赋予角色相应的菜单和按钮权限。

<img src="/img/shenyu/basicConfig/roleManagement/role_management.jpg" width="80%" height="50%" />


## 用户管理

通过菜单栏 ”系统管理 >> 用户管理“ 来管理登录到 admin 的用户。默认为 admin 用户，它拥有所有菜单权限和数据权限，不可更改， 不可删除， 只能修改用户名和密码。
可以通过按钮 ”新增数据“ 来增加用户。通过选择用户角色来管理该用户登录后所看到的菜单和按钮权限。当用户选择了多个角色时，取所有的角色的最大并集。更改用户的角色权限后，已经登录的用户只要刷新页面便能获得更改后的权限。

下面以新建用户为例，展示了新用户登录后的权限展示。

- 更改默认角色的权限

<img src="/img/shenyu/basicConfig/roleManagement/default-role-permission.jpg" width="80%" height="50%" />

- 新增角色并赋予相应的资源权限

<img src="/img/shenyu/basicConfig/roleManagement/default2-role-permission.jpg" width="80%" height="50%" />

- 新建用户，并赋予相应的角色

<img src="/img/shenyu/basicConfig/roleManagement/add-new-user.jpg" width="80%" height="50%" />

- 用户登录后查看自身的菜单和按钮权限

<img src="/img/shenyu/basicConfig/roleManagement/new-login.jpg" width="80%" height="50%" />

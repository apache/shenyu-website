---
title: 数据权限管理
keywords: ["用户 插件 数据权限"]
description: 用户插件数据管理
---

用户数据权限目前只实现了插件的数据管理。

大体的流程如下：管理员将普通用户可以访问的插件数据加入白名单中，将白名单中的数据所在的菜单和按钮绑定给该用户角色。 此用户便能对赋予他权限的数据进行管理。

接下来我们看下具体操作：
## 新建用户
在点击菜单 "系统管理 -> 用户管理" 展示的页面中新增数据。如下图所示：
<img src="/img/shenyu/basicConfig/dataPermission/create-user-cn.png" width="80%" height="50%" />

## 编辑数据权限
### 增加插件数据
在插件列表中增加数据，本文以 `divide` 为例
<img src="/img/shenyu/basicConfig/dataPermission/plugin-data-cn.png" width="80%" height="50%" />

### 增加菜单权限
给默认的角色赋予 divide 插件的权限。
<img src="/img/shenyu/basicConfig/dataPermission/role-permission-cn.png" width="80%" height="50%" />

默认的角色没有任何的菜单权限，如果赋予了用户，该用户将无法登录。将数据权限所在的菜单赋予该角色。

### 配置用户的数据权限
新增用户后，我们看到普通用户之后会有一个编辑数据权限的按钮，可以对用户进行数据权限的管理。
<img src="/img/shenyu/basicConfig/dataPermission/permission-setting.png" width="80%" height="50%" />

这里的出现列表就是当时在插件中新增的数据。

## 新用户登录
新用户登录后只能看到已经赋予权限的数据。
<img src="/img/shenyu/basicConfig/dataPermission/new-user-login-cn.png" width="80%" height="50%" />

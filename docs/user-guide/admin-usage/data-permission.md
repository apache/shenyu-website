---
title: Data Permission Management
keywords: ["user data permission"]
description: user data permission
---

Data Permission currently only enable data management for plugins.

The process as follows: the admin user add data that be managed by common users to the whitelist, and binds the resouce permission where the whitelisted data is located to the user role. This user will be able to manage the data given to him.

Now, let's look how to operation:
## Create User
Clicking the menu "System Manage -> User" to create user, like this:
<img src="/img/shenyu/basicConfig/dataPermission/create-new-user-en.png" width="80%" height="50%" />

## Edit Date Permission
### Add Plugin Data
Adding data in the plugin list, this article uses `divide` as an example, like:
<img src="/img/shenyu/basicConfig/dataPermission/plugin-data-en.png" width="80%" height="50%" />

### Add Resource Permission
Giving the `divide` plugin permission to the `default` role.
<img src="/img/shenyu/basicConfig/dataPermission/role-permission-setting-en.png" width="80%" height="50%" />

The `default` role has none permissions.The user can't login who we set `default` role to. So we must edit the permissons.

### 配置用户的数据权限
When we create the common users, we can edit data permissions by the `ConfigureDataPermission` button.

<img src="/img/shenyu/basicConfig/dataPermission/data-permission-en.png" width="80%" height="50%" />

The datas in this list are the same as the plugin list.

## New User Login
When the user login, he just can see the data given to him.
<img src="/img/shenyu/basicConfig/dataPermission/new-user-login-en.png" width="80%" height="50%" />

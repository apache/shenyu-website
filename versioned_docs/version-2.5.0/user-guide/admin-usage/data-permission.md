---
title: Data Permission Management
keywords: ["user data permission"]
description: user data permission
---
## Design Notes

In order to achieve the different selector / rule represented by the plugin managed by different business units, the need for the plugin selector / rule data security for the user to control
When the user does not configure data permissions, it has all the data permissions, as long as the permissions are configured, the data permissions will be controlled. As shown in the following picture.

<img src="/img/shenyu/basicConfig/dataPermission/data-permission-profile-en.png" width="80%" height="50%" />


## How to use

The Brief introduce is as follows.
- Users with administrative user resource permissions (including the admin user) create a new user.
- Users with administrative user data resource permissions (including admin user) click `ConfigureDataPermission` to manage the user's data permissions.
> Make sure the data exists in the plugin list before doing so. If not, you will have any data to configure.

Now, let's look how to operation step by step:

### Create User

Clicking the menu "System Manage -> User" to create user, like this:
<img src="/img/shenyu/basicConfig/dataPermission/create-new-user-en.png" width="80%" height="50%" />

### Edit Date

#### Add Plugin Data

Adding data in the plugin list, this article uses `divide` as an example, like:
<img src="/img/shenyu/basicConfig/dataPermission/plugin-data-en.png" width="80%" height="50%" />

#### Configure Resource Permission

Giving the `divide` plugin permission to the `default` role.
<img src="/img/shenyu/basicConfig/dataPermission/role-permission-setting-en.png" width="80%" height="50%" />

The `default` role has none permissions.The user can't login who we set `default` role to. So we must edit the permissons.

#### Configure Data Permission

When we create the common users, we can edit data permissions by the `ConfigureDataPermission` button.

<img src="/img/shenyu/basicConfig/dataPermission/data-permission-en.png" width="80%" height="50%" />

The datas in this list are the same as the plugin list.

## New User Login

When the user login, he just can see the data given to him.
<img src="/img/shenyu/basicConfig/dataPermission/new-user-login-en.png" width="80%" height="50%" />

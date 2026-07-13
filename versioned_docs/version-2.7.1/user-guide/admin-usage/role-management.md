---
title: Role Management
keywords: ["user role resource"]
description: user role resource permission management
---

This article focuses on the `admin` console to manage `admin` operation permissions through user-associated roles, roles that give permissions to resources such as menus and buttons.
<img src="/img/shenyu/basicConfig/roleManagement/role-profile-en.jpg" width="80%" height="50%" />

## Resource

Add Menus and Buttons Resource in "System Manage >> Resouce".

<img src="/img/shenyu/basicConfig/roleManagement/resource-dashboard-en.png" width="80%" height="50%" />

The admin user shows all menus and buttons of the `Shenyu` gateway. If you need to customize adding and removing, add the menu first and under the corresponding menu, add the button. Edit the menu by clicking on the small edit icon on the right side of the menu.


## Role

You can associate roles and resource permissions through the menu bar "System Administration >> Role Management". By default, two roles are created, one for super administrator and one for normal user. The super administrator is the admin user, which cannot be changed, and the normal user role can change its resource properties. By editing the corresponding role, you can give the role the appropriate menu and button permissions.


## User

You can manage the users logged into admin through the menu bar "System Administration >> User Management". The default user is admin, which has all menu and data permissions, cannot be changed or deleted, and can only change password or username.
You can add a user by pressing the "Add Data" button. The user role is selected to manage the menu and button permissions that the user sees after logging in. When a user selects more than one role, the maximum set of all roles is taken together. After changing a user's role permissions, users who are already logged in can simply refresh the page to get the changed permissions.

The following is an example of how the new user's permissions.

- editor default user role permission

<img src="/img/shenyu/basicConfig/roleManagement/default-role-en.png" width="80%" height="50%" />

- Add new roles and give the appropriate resource permissions

<img src="/img/shenyu/basicConfig/roleManagement/default2-role-en.png" width="80%" height="50%" />

- Create new users and give them the appropriate roles

<img src="/img/shenyu/basicConfig/roleManagement/add-new-user-en.png" width="80%" height="50%" />

- User login to view their menu and button permissions

<img src="/img/shenyu/basicConfig/roleManagement/new-login-en.png" width="80%" height="50%" />

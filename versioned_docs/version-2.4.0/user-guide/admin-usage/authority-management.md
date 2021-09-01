---
title: Authority Management
keywords: ["authority-management"]
description: authority-management
---
## Explanation

- Manage and control the permissions of requests passing through the Apache ShenYu gateway.
- Generate `AK/SK` and use it with the `Sign` plugin to achieve precise authority control based on URI level.

## Tutorial

### First, we can add a piece of authentication information in `BasicConfig` - `Authentication`

<img src="/img/shenyu/basicConfig/authorityManagement/auth_manages_add_en.jpg" width="100%" height="70%" />

### Then configure this authentication information

<img src="/img/shenyu/basicConfig/authorityManagement/auth_param_en.jpg" width="50%" height="40%"/>

- AppName：The application name associated with this account, it can can fill in or choose (data comes from the application name configured in the Metadata).
- TelPhone：Telphone information.
- AppParams：When the requested context path is the same as the AppName，add this value to the header, the key is `appParam`.
- UserId：Give the user a name, just as an information record.
- ExpandInfo：Description of the account.
- PathAuth：After opening, the account only allows access to the resource path configured below.
- ResourcePath：Allow access to the resource path, support path matching，e.g. `/order/**` .

After submit, a piece of authentication information is generated, which contains `AppKey` and `AppSecret`, which is the `AK/SK` in the `Sign` plugin.

Please refer to the detailed instructions of the `Sign` plugin： [Sign Plugin](../../plugin-center/authority-and-certification/sign-plugin).

### PathOperation

For the created authentication information, you can click `PathOperation` at the end of a piece of authentication information.

<img src="/img/shenyu/basicConfig/authorityManagement/auth_manage_modifyPath_en.jpg" width="90%" height="80%"/>

- On the left is a list of configurable paths, and on the right is a list of paths that allow the account to access.
- Check the resource path, click the `>` or `<` in the middle to move the checked data to the corresponding list.
- In the list of configurable paths on the left, click "Editor" at the end of the account information line, and add them in the "Resource Path" in the pop-up box.


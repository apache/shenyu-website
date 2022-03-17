---
title: FAQ
sidebar_position: 13
description: FAQ
author: "xiaoyu"
categories: "Apache ShenYu"
tags: ["community"]
---

### 1. In Windows environment,when cloning Apache Shenyu source code through Git, why prompt filename too long and how to solve it?

Answer:

To ensure the readability of source code,the Apache Shenyu Coding Specification requires that the naming of classes,methods and variables be literal and avoid abbreviations,which may result in  Some source files have long names. 

Since the Git version of Windows is compiled using msys,it uses the old version of Windows Api,limiting the file name to no more than 260 characters. 

The solutions are as follows: 

Open cmd.exe (you need to add git to environment variables) and execute the following command to allow git supporting log paths: 

```
git config --global core.longpaths true
```                                                                             

If we use windows 10, also need enable win32 log paths in registry editor or group strategy(need reboot):
> Create the registry key `HKLM\SYSTEM\CurrentControlSet\Control\FileSystem LongPathsEnabled` (Type: REG_DWORD) in registry editor, and be set to 1.
> Or click "setting" button in system menu, print "Group Policy" to open a new window "Edit Group Policy", and then click 'Computer Configuration' > 'Administrative Templates' > 'System' > 'Filesystem', and then turn on 'Enable Win32 long paths' option.

Reference material:

https://docs.microsoft.com/zh-cn/windows/desktop/FileIO/naming-a-file           




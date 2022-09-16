---
title: FAQ
sidebar_position: 13
description: FAQ
author: "xiaoyu"
categories: "Apache ShenYu"
tags: ["community"]
---

### 1. Why named ShenYu?

ShenYu is the honorific name of Chinese ancient monarch Xia Yu (also known in later times as Da Yu),
who left behind the touching story of the three times he crossed the Yellow River for the benefit of the people and successfully managed the flooding of the river.
He is known as one of the three greatest kings of ancient China, along with Yao and Shun.
* Firstly, the name ShenYu is to promote the traditional virtues of our Chinese civilisation.
* Secondly, the most important thing about the gateway is the governance of the traffic.
* Finally, the community will do things in a fair, just, open and meritocratic way, paying tribute to ShenYu while also conforming to the Apache Way.

### 2. Apache ShenYu History?

* 2018, Create projects and open source. Excellent architectural ideas and code style, leading reactor programming, once opened sourced, it has attracted much attention.
* 2020, Community development. Continuous release of versions and open community governance have attracted a large number of community members to join.
* 2021, Donate to the Apache Foundation. The Apache Foundation passed the unanimous vote and entered the smoothly.

### 3. In Windows environment,when cloning Apache Shenyu source code through Git, why prompt filename too long and how to solve it?

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

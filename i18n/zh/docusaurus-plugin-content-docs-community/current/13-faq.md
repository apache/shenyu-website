---
title: FAQ
sidebar_position: 13
description: FAQ
author: "xiaoyu"
categories: "Apache ShenYu"
tags: ["community"]
---
### 1. 项目名称为什么是神禹？

神禹是中国古代君主夏禹（后世亦称大禹）的尊称。为了造福百姓，他留下了三渡黄河，并成功治理黄河泛滥的感人事迹。他与尧、舜并称为中国古代三大帝王之一。
* 首先，神禹这个名字是为了弘扬中华文明的传统美德。
* 其次，网关最重要的是流量的治理。
* 最后，社区将以公平、公正、公开、择优的方式做事，在向神宇致敬的同时，也符合 Apache Way。

### 2. Apache ShenYu 历史？

* 2018，创建项目并开源，优秀的架构思想和代码风格，领先的 reactor 编程，一经开源就受到大家的关注。
* 2020，社区发展，持续发布版本与开放的社区治理方式，吸引了大量的社区成员加入。
* 2021，捐献给 Apache 基金会，Apache 基金会全票通过，顺利进入孵化器。

### 3. Windows 环境下，通过 Git 克隆 Apache Shenyu 源码时为什么提示文件名过长，如何解决？

为保证源码的可读性，Apache Shenyu 编码规范要求类、方法和变量的命名要做到顾名思义，避免使用缩写，因此可能导致部分源码文件命名较长。由于 Windows 版本的 Git 是使用 msys 编译的，它使用了旧版本的 Windows Api，限制文件名不能超过 260 个字符。

解决方案如下：

打开 cmd.exe（你需要将 git 添加到环境变量中）并执行下面的命令，可以让 git 支持长
文件名：

```
git config --global core.longpaths true
```
                                                                                
如果是 Windows 10，还需要通过注册表或组策略，解除操作系统的文件名长度限制（需要>重启）：
> 在注册表编辑器中创建 `HKLM\SYSTEM\CurrentControlSet\Control\FileSystem LongPathsEnabled`， 类型为 `REG_DWORD`，并设置为1。
> 或者从系统菜单点击设置图标，输入“编辑组策略”， 然后在打开的窗口依次进入“计算机
管理” > “管理模板” > “系统” > “文件系统”，在右侧双击“启用 win32 长路径”。


参考资料：
https://docs.microsoft.com/zh-cn/windows/desktop/FileIO/naming-a-file

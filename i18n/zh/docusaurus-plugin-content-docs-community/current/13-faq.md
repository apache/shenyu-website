---
title: FAQ
sidebar_position: 14
description: FAQ
author: "xiaoyu"
categories: "Apache ShenYu"
tags: ["community"]
---

### 1. Windows 环境下，通过 Git 克隆 Apache Shenyu 源码时为什么提示文件名过长，如何解决？

回答：

为保证源码的可读性，Apache Shenyu 编码规范要求类、方法和变量的命名要做到顾名思>义，避免使用缩写，因此可能导致部分源码文件命名较长。由于 Windows 版本的 Git 是使用 msys 编译的，它使用了旧版本的 Windows Api，限制文件名不能超过 260 个字符。

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

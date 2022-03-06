---
title: 本地调试运行 agent 模块
description: 本地调试运行 agent 模块
---

## 说明

* 本文将介绍如何在本地调试运行 `shenyu-agent` 模块

## 准备

1. 拉取 Apache ShenYu 代码
2. 安装 IDEA
3. 参考 [本地部署](../deployment/deployment-local.md) 完成代码的下载与编译

## 设置JVM启动参数

在 IDEA 中，将 `ShenyuBootstrapApplication.java` 的启动配置里的 VM options 设置为：

```shell
-javaagent:~/shenyu/shenyu-dist/shenyu-agent-dist/target/shenyu-agent/shenyu-agent.jar
```

其中，`-javaagent:` 后面跟着的参数为 `shenyu-agent.jar` 的绝对路径，由 `shenyu-dist` 打包。

## 运行/调试

接着，正常运行或调试启动 `ShenyuBootstrapApplication.java` 即可，shenyu-agent 模块可以正常断点调试。

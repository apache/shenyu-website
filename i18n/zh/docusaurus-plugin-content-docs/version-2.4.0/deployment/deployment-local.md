---
sidebar_position: 1
title: 本地部署
keywords: ["Deployment"]
description: 本地部署
---

本文介绍本地环境启动 `Apache ShenYu` 网关。

### 环境准备

* 本地正确安装JDK1.8+
* 本地正确安装Git
* 本地正确安装Maven
* 选择一款开发工具，比如IDEA

### 下载编译代码

* 下载代码

```
git clone https://github.com/apache/incubator-shenyu.git
cd incubator-shenyu
mvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests
```

* 使用开发工具启动 `org.apache.shenyu.admin.ShenyuAdminBootstrap`，访问 http://localhost:9095 ， 默认用户名和密码分别为: `admin` 和 `123456`。

  * 如果使用`h2`来存储，设置变量 `--spring.profiles.active = h2`

  * 如果使用`MySQL`来存储，修改 `application.yaml` 中的 `mysql` 配置。

* 使用开发工具启动 `org.apache.shenyu.bootstrap.ShenyuBootstrapApplication`。

* 使用 Windows 来运行代码时，可能会碰到 `filename too long` 的 Git 报错，可以通过使用管理员权限运行 `git config --system core.longpaths true` 命令来解决










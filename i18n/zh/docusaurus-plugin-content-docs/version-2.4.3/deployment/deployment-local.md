---
sidebar_position: 1
title: 本地部署
keywords: ["Deployment"]
description: 本地部署
---

本文介绍本地环境启动 `Apache ShenYu` 网关。

> 在阅读本文档前，你需要先阅读[部署先决条件](./deployment-before.md)文档来完成部署`shenyu`前的环境准备工作. 

### 环境准备

* 本地正确安装JDK1.8+
* 本地正确安装Git
* 本地正确安装Maven
* 选择一款开发工具，比如IDEA

### 下载编译代码

* 下载代码

```
> git clone https://github.com/apache/incubator-shenyu.git
> cd incubator-shenyu
> mvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests
```

* 使用开发工具启动 `org.apache.shenyu.admin.ShenyuAdminBootstrap`，访问 http://localhost:9095 ， 默认用户名和密码分别为: `admin` 和 `123456`。

  * 如果使用`h2`来存储，设置变量 `--spring.profiles.active = h2`

  * 如果使用`MySQL`来存储，修改 `application.yaml` 中的 `mysql` 配置。

  * 如果使用`PostgreSql`来存储，修改 `application.yaml` 中的 `spring.profiles.active` 配置为 `pg`。

* 使用开发工具启动 `org.apache.shenyu.bootstrap.ShenyuBootstrapApplication`。












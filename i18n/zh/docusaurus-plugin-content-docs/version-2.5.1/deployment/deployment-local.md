---
sidebar_position: 1
title: 本地部署
keywords: ["Deployment"]
description: 本地部署
---

本文介绍本地环境启动 `Apache ShenYu` 网关。

> 在阅读本文档前，你需要先阅读[部署先决条件](./deployment-before.md)文档来完成部署 `shenyu` 前的环境准备工作。

### 环境准备

* 本地正确安装JDK1.8+
* 本地正确安装Git
* 本地正确安装Maven
* 选择一款开发工具，比如IDEA

### 下载编译代码

* 下载代码

```
git clone https://github.com/apache/shenyu.git
cd shenyu
mvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests
```

* 使用开发工具启动 `org.apache.shenyu.admin.ShenyuAdminBootstrap`，访问 http://localhost:9095 ， 默认用户名和密码分别为: `admin` 和 `123456`。

  * 如果使用`h2`来存储，设置变量 `--spring.profiles.active = h2` 启动服务。

  * 如果使用`MySQL`来存储，需按照 [指引文档](./deployment-before.md#mysql) 初始化数据库和修改 `application-mysql.yml` 中的 `jdbc` 相关配置，再设置变量 `--spring.profiles.active = mysql` 启动服务。

  * 如果使用`PostgreSql`来存储，需按照 [指引文档](./deployment-before.md#postgresql) 初始化数据库和修改 `application-pg.yml` 中的 `jdbc` 相关配置，再设置变量 `--spring.profiles.active = pg` 启动服务。

  * 如果使用`Oracle`来存储，需按照 [指引文档](./deployment-before.md#oracle) 初始化数据库和修改 `application-oracle.yml` 中的 `jdbc` 相关配置，再设置变量 `--spring.profiles.active = oracle` 启动服务。

  * 如果使用`OpenGuass`来存储，需按照 [指引文档](./deployment-before.md#opengauss) 初始化数据库和修改 `application-og.yml` 中的 `jdbc` 相关配置，再设置变量 `--spring.profiles.active = og` 启动服务。

* 使用开发工具启动 `org.apache.shenyu.bootstrap.ShenyuBootstrapApplication`。












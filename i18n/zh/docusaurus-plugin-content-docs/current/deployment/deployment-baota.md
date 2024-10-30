---
sidebar_position: 8
title: 通过宝塔面板部署
description: 通过宝塔面板部署
---

本文介绍使用 `宝塔面板` 来部署 `Apache ShenYu` 网关。

> 在阅读本文档前，你需要先阅读[部署先决条件](./deployment-before.md)文档来完成部署 `shenyu` 前的环境准备工作。

### 前提

- 仅适用于宝塔面板9.2.0及以上版本
- 安装宝塔面板，前往[宝塔面板](https://www.bt.cn/new/download.html)官网，选择正式版的脚本下载安装


### 部署

1. 登录宝塔面板，在左侧菜单栏中点击 `Docker`
![Docker](/img/shenyu/deployment/baota/20241010103723.png) 

2. 首次会提示安装`Docker`和`Docker Compose`服务，点击立即安装，若已安装请忽略。
![安装环境](/img/shenyu/deployment/baota/20241010104431.png)

3. 安装完成后在`Docker-应用商店`中找到 `ShenYu`，点击`安装`
![安装](/img/shenyu/deployment/baota/20241010204817.png)

4. 设置域名等基本信息，点击`确定`
![设置](/img/shenyu/deployment/baota/20241010100617.png)
- 名称：应用名称，默认`shenyu_随机字符`
- 版本选择：默认`latest`
- 允许外部访问：如您需通过`IP+Port`直接访问，请勾选，如您已经设置了域名，请不要勾选此处
- 端口：默认`9095`，可自行修改
- api端口：默认`9195`，可自行修改

5. 提交后面板会自动进行应用初始化，大概需要`1-3`分钟，初始化完成后即可访问。


### 访问 ShenYu

- 请在浏览器地址栏中输入域名访问 `http://<宝塔面板IP>:9095`，即可访问 `ShenYu` 控制台。
![控制台](/img/shenyu/deployment/baota/20241010102246.png)

> 默认用户名`admin`默认密码`123456`

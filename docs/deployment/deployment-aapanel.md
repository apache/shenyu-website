---
sidebar_position: 6
title: aaPanel Deployment
keywords: ["aaPanel"]
description: aaPanel Deployment
---

This article introduces the use of `aaPanel` to deploy the `Apache ShenYu` gateway.

> Before you read this document, you need to complete some preparations before deploying Shenyu according to the [Deployment Prerequisites document](./deployment-before.md).

### Prerequisite

To install aaPanel, go to the [aaPanel](https://www.aapanel.com/new/download.html#install) official website and select the corresponding script to download and install.

### Deployment

aaPanel(Applicable versions 7.0.11 and above) Deployment guidelines

1. Log in to aaPanel and click `Docker` in the menu bar
   ![Docker](img/shenyu/deployment/aapanel/install.png)

2. The first time you will be prompted to install the `Docker` and `Docker Compose` services, click Install Now. If it is already installed, please ignore it.
   ![install](img/shenyu/deployment/aapanel/install2.png)

3. After the installation is complete, find `ShenYu` in `One-Click Install` and click `install`  

   ![install_HertzBeat](img/shenyu/deployment/aapanel/install-ShenYu.png)

4. Set the basic information such as domain name and click 'OK'

   ![add](img/shenyu/deployment/aapanel/addShenYu.png)
   


- Name: application name, default `ShenYu-random characters`
- Version selection: default `latest`
- Domain name: If you need to access directly through the domain name, please configure the domain name here and resolve the domain name to the server
- Allow external access: If you need direct access through `IP+Port`, please check. If you have set up a domain name, please do not check here.
- Port: Web management port `9095`, can be modified by yourself

After submission, the panel will automatically initialize the application, which will take about `1-3` minutes. It can be accessed after the initialization is completed.


### Visit ShenYu
- If you have set a domain name, please directly enter the domain name in the browser address bar, such as `http://demo.ShenYu.apache.org`, to access the `LobeChat`ShenYu console.
- If you choose to access through `IP+Port`, please enter the domain name in the browser address bar to access `http://<aaPanelIP>:9095` to access the `ShenYu` console.
![console](img/shenyu/deployment/aapanel/console.png)


---
title: "[开源之夏】Apache ShenYu e2e课题来袭 | 邀您深耕高性能网关]"
author: "moremind"
description: "Apache ShenYu OSPP 2023"
categories: "OSPP 2023"
tags: ["Apache ShenYu", "OSPP 2023"]
date: 2023-05-19
---


## 开源之夏

开源之夏是由中科院软件所`开源软件供应链点亮计划`发起并长期支持的一项暑期开源活动，旨在鼓励在校学生积极参与开源软件的开发维护，培养和发掘更多优秀的开发者，促进优秀开源软件社区的蓬勃发展，助力开源软件供应链建设。

## 学生开启报名

开源之夏 2023 学生报名 4 月 29 日正式开启啦！同学们可以在开源之夏官网 https://summer-ospp.ac.cn/ 挑选项目，与导师沟通并准备项目申请材料、提交申请。

![](https://new-blog-1251602255.cos.ap-shanghai.myqcloud.com/img/1683816359250.jpg)

## Apache ShenYu简介

Apache ShenYu是一款支持多语言、多协议(Dubbo,SpringCloud,gRPC,Motan,SofaTars, BRPC)、插件化设计、高度可动态化配置、高度可自主化开发的Java网关。内置丰富的插件支持，鉴权，限流，熔断，防火墙等等。流量配置动态化，性能极高。支持集群部署，支持 A/B Test，蓝绿发布等功能。

Apache ShenYu社区作为Apache基金会组织下的开源项目社区。截止目前在全球共聚集了340位贡献者，他们以“Apache Way”的精神参与ShenYu，为ShenYu做出贡献，与ShenYu共同成长！

## Apache ShenYu课题项目介绍

> **课题任务门槛不会太高的哦，且全程由社区导师倾心指导。**

### 项目背景

Shenyu是一个异步的，高性能的，跨语言的，响应式的`API`网关，但目前ShenYu缺少必要的end to end engine以及test case, end to end test是shenyu项目整体贯通的重要部分。

### 相关技能

了解Apache ShenYu的技术架构，了解Apache ShenYu的端到端测试框架，能够利用现有代码编写TestSpec,需要了解shenyu的数据同步框架包括websocket，http，zookeeper，nacos，apollo等中间件以及算法，能够编写docker-compose，了解testcontainer，docker等e2e开发必备工具。

### 相关任务

1.编写shenyu端到端测试框架，编写shenyu端到端测试引擎(难度:高)

2.需要在e2e中实现admin不同数据库(mysql,oracle,postgres,h2)的存储,保证数据存储正确

3.需要通过配置方式以及shenyu-client注册方式保证数据能够正确添加到shenyu-admin(难度:高)

4.使用不同的数据同步方式(websocket，http，zookeeper，nacos，apollo)保证admin到gateway的数据同步正确

5.添加alibaba dubbo,apache dubbo,sofa,tars,motan相关代理插件的端到端测试用例

6.编写特定的TestSpec修改admin字典，元数据，插件，选择器，规则数据，并且在修改后进行回归测试，保证调用逻辑正确(难度:高)

7.编写对应github ci文件，保证ci流程在github action运转正常

### 项目产出要求

1.编写对应的e2e测试用例

2.使用e2e实现admin使用不同的数据库存储数据的测试

3.实现不同数据同步方式同步数据的端到端测试

4.编辑对应的e2e文档

### 项目技术要求

1.遵循shenyu代码规范

2.深入理解spring webflux

3.深入理解shenyu的数据同步原理

4.深入理解shenyu client注册数据原理

5.深入了解shenyu的端到端测试引擎以及框架

### 项目成果仓库

* https://github.com/apache/shenyu
* https://github.com/apache/shenyu-website

#### 项目地址

* https://summer-ospp.ac.cn/org/prodetail/2362f0159?list=org&navpage=org

### 其他信息

* 项目难度：进阶

* 导师邮箱：hefengen@apache.org

## 你能从活动中获得什么？

### 开发经历

参与开源项目，成为大型开源项目的贡献者，了解多领域多难度梯度任务，给你丰富的大型开源项目实战经验，同时也是锻炼开发能力的好机会！

### 组委会奖励

1.你将获得结项奖金和结项证书：通过结项考核的学生将有机会获得优秀学生证书。

2.本次比赛共设有两个难度等级，不同等级对应不同奖金：

进阶难度：学生结项奖金税前人民币 12000 元

基础难度：学生结项奖金税前人民币 8000 元

本次比赛的奖金均由开源之夏组委会提供。

### Apache ShenYu社区深度交流

1.参与开源之夏@Apache ShenYu课题，你将能够同Apache ShenYu社区全球300+位贡献者交流。

2.参与开源之夏@Apache ShenYu课题，你将成为Apache ShenYu贡献者，在持续贡献者之后，更有机会成为Apache ShenYu Committer。

## 快速参与开源之夏

开源之夏2023 社区各项目课题将从4月29日开始接受学生参与项目申请，欢迎通过上方联系方式，与各导师沟通并准备项目申请材料。

![](https://new-blog-1251602255.cos.ap-shanghai.myqcloud.com/img/1683817405594.jpg)
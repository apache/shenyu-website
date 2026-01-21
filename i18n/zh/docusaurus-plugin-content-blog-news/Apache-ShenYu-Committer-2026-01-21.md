---
title: "【从深度使用到Apache ShenYu Committer】"
author: "Wei Wei"
description: "从深度使用到Apache ShenYu Committer"
categories: "Apache ShenYu Committers"
tags: ["Apache ShenYu"]
date: 2025-01-21
slug: Apache-ShenYu-Committer-2026-01-21
---

### 个人介绍

姓名: 魏巍

github: https://github.com/Wweiei/

email: weiwei@apache.org

大家好，我是魏巍，很荣幸受邀成为Apache ShenYu社区的Committer，能够和社区一起成长，为 ShenYu 项目尽自己的一份力量。

### 初识 Apache ShenYu 网关

第一次接触 Apache ShenYu 时间比较早，那时还叫 SOUL 网关，还处于 Apache 的孵化阶段。

当时公司有几个API管理的项目需要用到网关，经过与同期的其他开源网关的对比，Apache ShenYu 配置灵活，简洁易操作，插件丰富易扩展，并且和我们的技术栈十分匹配，最重要的是社区非常活跃，基于这些我们最终选定了 Apache Shenyu 作为网关的解决方案，并且将其用于我们的业务网关中。

### 开源贡献之路

在工作中由于业务需要，需要对 ShenYu 已有的大部分插件做改造，以及开发很多定制化的插件，所以我开始阅读 ShenYu 的源码，梳理整体的调用链路，分析大部分插件的具体实现原理。

从深度使用 Apache ShenYu 后，发现 ShenYu 项目无论是架构设计还是代码实现，都非常优秀，自己也从 ShenYu 项目中学习到了很多。这也使我越来越坚定的想成为 Apache ShenYu 社区的一名 Committer。

一直跟随着 ShenYu 的迭代升级，在不断的使用过程中，陆续发现了 ShenYu 在数据同步过程中存在的bug，同时在社区中结识了 Asia00，请教了他如何参与到 ShenYu 项目的建设中。

随后又订阅了 ShenYu 项目的邮件列表，参加双周会，关注issue列表，开始关注项目的发展动态。陆续提交了一些修复 bug 的 PR，承担了一些社区的开发任务。

在此特别感谢社区中帮助过我的伙伴们，感谢他们的耐心指导和帮助。

以下是我主要的贡献:

- 解决了2.7.0版本之后Admin到Bootstrap数据同步的若干bug
- 优化了mcp插件，支持入参object类型，并修复了mcp插件在页面编辑以及调用时的部分bug
- 优化dubbo plugin逻辑, 使其支持基于selector的配置
- 新增注册中心管理功能

### 社区参与和成长

我是从一个深度使用者成长为一个committer，从使用过程中发现问题开始研究源码，到陆陆续续发现bug提交issue和pr到社区，再到承担社区的一些开发任务。

每两周的周四，我都会参加 Apache ShenYu 社区的双周会，在会上可以听到 ShenYu 一些功能的讨论，可以知道社区的最新动态。

在使用的过程中，开发自定义插件、以及发现问题时需要一直深入阅读 ShenYu 源码，理解各个环节的实现原理。在这个过程中我的代码能力得到了很大的提升，在架构设计上 ShenYu 也给了我很多启发。

### 给开源开发者的建议

工作之后一直很向往开源，想为开源社区做贡献，但一直找不到方向。参与开源也是快速提升自己的一个过程。刚开始都会觉得很难，找不到可以参加的项目，不知道如何提 issue 和 pr，也不知道从哪里去领取任务。

对于像我一样的新手，开源一定要大胆尝试，勇于参与到社区中。当你在使用过程中发现问题的时候，一定要努力钻研，深入分析，找到问题的根本原因。然后大胆的向社区提交 issue 和 pr，提出自己的建议。

其次要保持对项目的关注，关注项目的issue列表，参与项目双周会，关注项目的最新动态，勇于挑战自己，承担社区的最新任务，参与到项目的讨论中，及时提出自己的想法和建议。

### 如何参与 ShenYu

如果你也想为 Apache ShenYu 贡献力量，可以从以下几点入手：

- 阅读 [贡献者指南](https://shenyu.apache.org/zh/community/contributor-guide)
- 参与 [GitHub Issues](https://github.com/apache/shenyu/issues) 讨论，寻找适合你的贡献机会

### 结语

很荣幸可以为 Apache ShenYu 尽一份自己的力，感谢社区各位小伙伴对我的帮助和支持。成为 Committer 是我的一个新起点。也希望有跟多的朋友能加入到 Apache ShenYu 社区中来，一起为开源事业贡献自己的力量。

---
title: "【从用户到Apache ShenYu Committer】"
author: "何凤恩"
description: "从用户到Apache ShenYu Committer"
categories: "Apache ShenYu Committers"
tags: ["Apache ShenYu"]
date: 2022-08-04
slug: Apache-ShenYu-Committer-2022-08-04
---  

### 个人介绍

大家好，我是[何凤恩](https://github.com/moremind) ，目前从事Java开发，非常荣幸在受邀成为Apache ShenYu社区的Committer，下面跟大家分享一下我参与Apache ShenYu社区这段时间的成长和建议。

### 初识ShenYu网关

最早接触shenyu在2021年3月左右，当时还叫soul，由于部门业务场景需要统一网关的使用，选择shenyu网关的主要原因是shenyu的插件化设计很符合我们所需的场景，当时主要使用的一些功能插件包括divide、sentinel熔断、ratelimiter、公司内部rpc的协议转换以及log2Mongo等。随着shenyu的不断升级发版，我们也在不断地升级我们的代码。

初次看到shenyu的代码时，我和大多数开发者一样都遇到这样几个问题：响应式编程到底是什么？响应式编程到底怎么写才对？shenyu的代码怎么会这么写呢？带着这些疑问，我阅读了很多遍shenyu的源码，然后自己调试shenyu，查看shenyu对于请求的处理以及各个插件的具体逻辑。再此期间也曾在shenyu的社区提过很多issues，感谢shenyu社区给予我的帮助。

### 开源之路

初次向shenyu提交代码还是在2022年3月，当时主要是在使用rpc进行协议转换时发现请求体丢失数据，然后发现是由于rpc参数转换插件丢失了数据，于是我第一次向shenyu提交了该bug的解决代码。

在后续的持续贡献中，主要是贡献了如下功能：
- springboot的升级改造
- springcloud插件的重构
- cache插件的重构
- logging模块以及各个logging插件的重构
- shenyu官网插件文档的重构

### 感谢社区的朋友们

在此特别感谢各位帮助过我的伙伴们(排名不分先后)：yu199195，qicz，li-keguo，dragon-zhang，renzhuyan，hutaishi，impactCn，yunlongn。

### 对于开源开发者的话

开源开发其实一件很有意义又很痛苦的事，很考验一个人的耐力，在无数的pr之后，可能会因为某些困难、问题放弃，而坚持下来的人，无论在技术还是沟通能力上，亦或者开源贡献上，都会有一定的收获。

开源不是一味的做任务，也不是被固定在某一个项目、某一个任务，而是你有空就可以参与任何一个项目。一个人获取会很快，但一群人会走的更远！

### 如何参与ShenYu

1.ShenYu在官网提供很全面的贡献者指南，https://shenyu.apache.org/zh/community/contributor-guide

2.如果你想参与shenyu的功能开发和问题修复，可关注shenyu的github issues，https://github.com/apache/shenyu/issues

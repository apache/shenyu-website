---
title: "我在 Apache ShenYu 社区的这几个月"
author: "SiGuo Duan"
description: "SiGuo Duan 回顾自己从改 CI 开始参与 ShenYu 的经历。"
categories: "Apache ShenYu Committers"
tags: ["Apache ShenYu"]
date: 2026-11-25
slug: Apache-ShenYu-Committer-2026-11-25
---

### 个人介绍

大家好，我是段嗣国，GitHub 账号为 [Duansg](https://github.com/Duansg)。目前从事于电商行业，主要聚焦在亿级商品中台业务的数据处理及管理的研发领域。很荣幸收到社区的邀请，成为 Apache ShenYu 的 Committer。

<!-- truncate -->

### 初识 Apache ShenYu

最初开始参与 ShenYu 从构建和测试流程入手。最初的几次改动都很小，主要是减少 CI 中重复执行的任务，让开发者在更新代码后能更快看到测试结果。随着对项目逐渐熟悉，我开始跟着社区里的问题读源码，也慢慢把服务注册、配置同步和网关处理请求的过程串了起来。

### 开源贡献与成长

除了早期的 CI 优化，我也参与了几项网关功能的改进。

- 在服务注册和配置同步方面，修复了上游实例上下线后状态没有正确保存的问题，让服务重新注册时也能保留原有的元数据启停设置。
- 在日志插件方面，补充了队列积压和入队丢弃的监控指标，完善了采样率校验以及请求、响应日志的大小限制。
- 在请求处理方面，修复了 URL 重写时部分参数编码发生变化的问题，并完善了网关插件和 SDK 对空 JSON 请求体、无响应体等情况的处理。

一次关于服务注册的评审让我印象很深。社区伙伴提醒我，验证实例下线时，也值得把它重新上线的过程走一遍。后来再看类似的改动，我也会把这两个方向放在一起考虑。

### 致谢

感谢 Hongyu Liu（Aias00）在参与过程中给予的指导与帮助，也感谢 Apache ShenYu 社区的每一位成员。无论是代码评审中的细致建议，还是日常技术交流中的经验分享，都让我受益匪浅。感谢大家共同营造了一个开放、友好且乐于协作的开源社区。

### 未来展望

衷心感谢各位社区伙伴的耐心 Review 和悉心指导。成为 Committer 以后，期望和 Apache ShenYu 一起继续秉持开源精神，吸引更多优秀的开发者，共同打造一个技术领先且充满活力的社区。

也希望下次能在社区里一起聊聊你碰到的问题。[ShenYu 贡献者指南](https://shenyu.apache.org/zh/community/contributor-guide/) · [GitHub Issues](https://github.com/apache/shenyu/issues)

---
title: "【你也可以成为Apache ShenYu Committer】" 
author: "张子成"
description: "你也可以成为Apache ShenYu Committer" 
categories: "Apache ShenYu Committers"
tags: ["Apache ShenYu"]
date: 2022-04-20
---  

### 新晋Committer介绍

大家好，我是[张子成](https://github.com/dragon-zhang) ，java/rust开发者，目前在某中型互联网公司从事中间件开发，工作方向包括网关/RPC/MQ。非常荣幸受邀成为Apache ShenYu社区的Committer，下面跟大家分享一下我与Apache ShenYu社区的相遇、相识、相知、成长和建议。

### 相遇
2021年8月中旬的时候，我加入现公司，转型为中间件开发(在上家做业务开发)，接到的第一个任务就是尽快熟悉公司的网关中间件，于是一款叫Soul的网关进入了我的视野(Soul是ShenYu的前身，ShenYu于2021年进入了Apache孵化器，以下的Soul/ShenYu都指代Apache ShenYu（incubating）)。

### 相识
在经过大概一周的学习后，我对Soul的主链路有了一定程度的认识。在后续2-3个月的时间里，随着不断地帮公司业务开发回答/解决问题，慢慢地我也发现了一些Soul不符合人体工程学的地方。

直到2021年12月的时候，出于公司需要和个人兴趣，我开始着手调研ShenYu，并考虑升级方案，此时才算真正开始接触ShenYu和社区。

### 相知
ShenYu是一个异步的，高性能的，跨语言的，响应式的API网关，其坚持插件化、全链路异步化的设计理念，目前已经集成了很多插件供用户选择，如果已有插件不满足需求，可以对着[官网文档](https://ShenYu.apache.org/zh/docs/next/developer/custom-plugin/) 自己上手做定制化开发。

ShenYu社区是活跃的、友善的，为了让更多的同学成为Contributor/Commiter，在github的[issues](https://github.com/apache/incubator-ShenYu/issues) 页面时不时就有[新任务](https://github.com/apache/incubator-ShenYu/issues?q=is%3Aopen+is%3Aissue+label%3A%22status%3A+volunteer+wanted%22) 发布，其中有不少[非常适合新人的任务](https://github.com/apache/incubator-ShenYu/issues?q=is%3Aopen+is%3Aissue+label%3A%22status%3A+volunteer+wanted%22+label%3A%22good+first+issue%22) 。即使发布的任务对你来说有一定难度，你仍然可以尝试提交PR，社区的小伙伴会review你的PR并提供一些指导建议，帮助你在思想碰撞中提升自己。

### 我的社区成长
首先感谢无偿帮助过我的小伙伴(排名不分先后)：yu199195，JooKS-me，KevinClair，lianjunwei，qicz，AhahaGe，hutaishi

#### 贡献与收获
- 学习如何同时兼容spring-boot 1.x和2.x，并贡献了非常多的方案。
- 熟悉project-reactor和spring-webflux的使用，然后贡献大量的优化。
- 熟悉netty后，贡献了netty线程池设置。
- 熟悉dubbo后，扩展了ShenYu中的dubbo线程池。
- 了解grpc和motan等RPC，贡献了共享线程池技术。
- 提供MemoryLimitedLinkedBlockingQueue和MemorySafeLRUMap，较好地解决了技术悖论。

#### 贡献Apache ShenYu的建议
1. 初窥门径

   从官网文档开始，首先是[admin/bootstrap的部署](https://ShenYu.apache.org/zh/docs/next/deployment/deployment-local/) ，其次选择一种你最熟悉的方式[接入ShenYu](https://ShenYu.apache.org/zh/docs/next/quick-start/quick-start-dubbo/) ，最后发起请求，验证是否接入成功。

2. 驾轻就熟
   
   在一段时间后，你对ShenYu的使用已经比较熟悉了。此时你可以从一种接入方式入手，看看数据最终是如何发送到admin并存储的。

3. 略有小成

   你已经熟悉了注册阶段的某一条链路，可以开始按照你的接入方式来梳理运行阶段bootstrap的主链路了，此时不建议深挖每个插件的细节。

4. 炉火纯青

   这个时候你已经对ShenYu的全局有一定认识了，也许在这个阶段你已经发现了一些ShenYu的小bug，或者你觉得ShenYu的某些使用姿势不符合人体工程学，那还等什么？

   到社区看看是否有人遇到了跟你一样的问题，你可以提交一些BUG/ISSUE/PR，社区会尽快回复你的。

5. 出类拔萃

   随着不断地参与社区，你对社区的贡献越来越多，最后能够帮助他人解决问题，能够指导他人。

   你一直保持好奇，深入学习，能立足于底层。

   你具备一定的大局观，可以从全局的角度看待优化。

   你能够看到问题本质，并解决根本问题。

#### 如何参与Apache ShenYu
1. 如何成为贡献者

   Apache ShenYu社区特意写了非常全面的[贡献者指南](https://ShenYu.apache.org/zh/community/contributor-guide)

2. Github [Issues](https://github.com/apache/incubator-ShenYu/issues)
3. 订阅邮件
   
   向dev-subscribe@ShenYu.apache.org 发送一封邮件；

   发送成功后，您会收到来自 dev-help@ShenYu.apache.org 的回信，请按照邮件的提示回复这封邮件，确认订阅；

   在回复确认后，您会收到一封欢迎邮件，表示您已经成功订阅了邮件。
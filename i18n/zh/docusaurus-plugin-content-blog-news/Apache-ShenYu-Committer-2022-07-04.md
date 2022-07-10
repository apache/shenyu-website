---
title: "【从CRUD Boy到Apache ShenYu Committer】" 
author: "鄢仁柱"
description: "从CRUD Boy到Apache ShenYu Committer" 
categories: "Apache ShenYu Committers"
tags: ["Apache ShenYu"]
date: 2022-07-04
---  

### 新晋Committer介绍

大家好，我是[鄢仁柱](https://github.com/renzhuyan) ，目前在微众银行做java/大数据业务开发。非常荣幸受邀成为Apache ShenYu社区的Committer，作为一名业务开发人员，平常关注点更多是在业务上，然后去写CRUD，而参与Apache Shenyu社区开源，让我有别样体验，更多关注点是放在代码本身，考虑如何支持各种协议、插件拓展、数据同步等。下面跟大家分享一下我参与Apache ShenYu社区这段时间的成长和建议。

### 初识Apache Shenyu社区

故事时间线还得回到2020年底开始说起，当时部门为了让我们能更好的成长，给我们报名了极客时间的JAVA进阶训练营，也就是在这个训练营里有幸结识了猫大人，在猫大人读源码活动的带领下，我第一次接触到了Apache Shenyu，当时还没进入Apache孵化器，还叫Soul（下面都称Apache Shenyu）。读Apache Shenyu源码活动，总共持续三周，在三周里我们每天读源码、写博客，从搭环境到跑示例工程，再到读插件链及数据同步等源码，收获巨大，对Apache Shenyu也有了一定的了解。

### 开始提交PR

一直到2021年5月份，我开始提交了我的第一个pr，当时是给Admin模块添加了一个单元测试，功能很小，但它的意义却是非凡的，它意味的我从学习开始到贡献，从自己玩开始到开源，在开源之路上有了一个很好的开始。

### 持续的开源贡献与收获

到目前为止，参与Apache Shenyu社区开源已有一年多一点时间，贡献了许多，也成长收获了许多。具体如下：
- 参与soul迁移至Apache孵化器，并改名为Apache Shenyu。
- 参与各模块单元测试的编写。
- 负责整合TarsResponsePlugin,GrpcResponsePlugin,SofaResponsePlugin,DubboResponsePlugin等重构为ResponsePlugin统一处理。
- 负责Admin Oracle数据库的支持。
- 负责Shenyu网关实例注册到Consul的支持。
- 参与一些已发现问题的修复、示例工程编写、jar包替换及升级、集成测试编写等。

### 感谢社区小伙伴

感谢无偿帮助过我或给过我启发的小伙伴(排名不分先后)：yu199195，dragon-zhang，li-keguo，qicz，moremind，zouchangfu，lianjunwei

### 给新人的一点建议

Apache Way有个理念：社区大于代码，坚信健康的社区比好的代码更重要。这一年多参与下来也让我感受到了Apache Shenyu社区这一点践行的非常好，双周会议、任务遵从共识自愿、社区公开透明、小伙伴们热心帮助等。所以今天同样将这句话送给新人，社区大于代码，在这里，你都可以试一试。

### 如何参与Apache ShenYu

1. 如何成为贡献者

   Apache ShenYu社区特意写了非常全面的[贡献者指南](https://ShenYu.apache.org/zh/community/contributor-guide)

2. Github [Issues](https://github.com/apache/incubator-ShenYu/issues)

3. 订阅邮件
   
   向dev-subscribe@ShenYu.apache.org 发送一封邮件；

   发送成功后，您会收到来自 dev-help@ShenYu.apache.org 的回信，请按照邮件的提示回复这封邮件，确认订阅；

   在回复确认后，您会收到一封欢迎邮件，表示您已经成功订阅了邮件。


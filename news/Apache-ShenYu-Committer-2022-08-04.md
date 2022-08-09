---
title: "[From Apache ShenYu User to Apache ShenYu Committer]"
author: "Fengen He"
description: "From Apache ShenYu User Boy to Apache ShenYu Committer"
categories: "Apache ShenYu Committers"
tags: ["Apache ShenYu"]
date: 2022-08-04
---  

### Introduction of new Committer

Hi, everyone, I'm [Fengen he](https://github.com/moremind), Working as a Java Developer,I am very honored to be invited to be the Committer of the Apache ShenYu community. Let me share with you my growth and suggestions during my participation in the Apache ShenYu community.

## First acquaintance with ShenYu gateway

The earliest contact with shenyu was around March 2021. It named soul at that time. Since the business scenarios of the department required the use of a unified gateway, the main reason for choosing the shenyu gateway was that the plug-in design of shenyu was very suitable for the scenarios we needed. Functional plug-ins include divide, sentinel fuse, ratelimiter, protocol conversion of the company's internal rpc, and log2Mongo, etc. With the continuous upgrade of shenyu version, we are also constantly upgrading our code.

When I read Shenyu's code, I like most developers, had the following questions: What exactly is reactive programming? How to write reactive programming? How can shenyu's code be written like this? With these questions, I read the source code of shenyu many times, and then debugged shenyu myself to see how shenyu handles requests and the specific logic of each plugin. During this period, I have also raised many issues in the shenyu community, thank the shenyu community for their help.

## My OpenSource experience

The first time I submitted the code to shenyu was in March 2022. At that time, it was mainly found that the request body lost data when using rpc for protocol conversion, and then I found that the data was lost due to the rpc parameter conversion plugin, so I submitted my code to solve the bug of shenyu. 

I contributed the following functions:
- springboot upgrade
- refactor springcloud plugin
- refactor cache plugin
- refactor logging module and logging plugins.
- refactor shenyu documents

### Thanks to the community

Special thanks to everyone who helped me (in no particular order):yu199195，qicz，li-keguo，dragon-zhang，renzhuyan，hutaishi，impactCn，yunlongn。

### 对于开源开发者的话

Open source development is actually a very meaningful and painful thing. It tests a person's endurance. After countless PRs, they may give up due to certain difficulties and problems, but those who persist, whether in terms of technology or communication skills , or open source contributions, there will be certain gains.

Open source is not about doing tasks blindly, nor is it fixed in a certain project or a certain task, but you can participate in any project when you are free. One person will get it quickly, but a group of people will go further!

### How to join Apache ShenYu

1. How to become a Contributor

   The Apache ShenYu community has purposely written a very comprehensive [Contributor Guide](https://ShenYu.apache.org/community/contributor-guide/)

2. Github [Issues](https://github.com/apache/incubator-ShenYu/issues)

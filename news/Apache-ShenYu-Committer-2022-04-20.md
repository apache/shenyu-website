---
title: "【You can also be an Apache ShenYu Committer】" 
author: "Zicheng Zhang"
description: "You can also be an Apache ShenYu Committer" 
categories: "Apache ShenYu Committers"
tags: ["Apache ShenYu"]
date: 2022-04-20
---  

### Introduction of new Committer

Hello everyone, my name is [Zicheng Zhang](https://github.com/dragon-zhang) , java/rust developer, currently engaged in middleware development in a medium-sized Internet company, work direction includes gateway/RPC/MQ. It is my honor to be invited by the Apache ShenYu community as the Committer. Let me share with you my first meet, acquaintance, understanding, growth and suggestions with the Apache ShenYu community.

### First Meet

In mid-August 2021, I joined the current company and transformed into middleware developer (doing business development in my previous company). The first task I received was to familiarize myself with the company's gateway middleware as soon as possible. So a gateway called Soul entered my field of vision (Soul is the predecessor of ShenYu, ShenYu entered the Apache incubator in 2021, the following Soul/ShenYu refers to Apache ShenYu(incubating) ).

### Acquaintance

After about a week of study, I have a certain degree of understanding of the code of Soul. In the following 2-3 months, as I continued to help the company's business developer to answer and solve problems, I gradually discovered some parts of the Soul that were not ergonomic.

Until December 2021, out of company needs and personal interests, I started to investigate ShenYu and consider an upgrade plan, and then I really started to contact ShenYu and the community.

### Understanding

ShenYu is an asynchronous, high-performance, cross-language, and responsive API gateway. It adheres to the design concept of plugin and full-link asynchronous. At present, many plugins have been integrated for users to choose. If the existing plugins does not meet your needs, you can start customized development by studying [the official website documents](https://ShenYu.apache.org/docs/next/developer/custom-plugin/) .

The ShenYu community is active and friendly. In order to allow more people to become Contributor/Committer, [new tasks](https://github.com/apache/incubator-ShenYu/issues?q=is%3Aopen+is%3Aissue+label%3A%22status%3A+volunteer+wanted%22) are released from time to time on the [issues](https://github.com/apache/incubator-ShenYu/issues) page of Github. There are many [tasks for novices](https://github.com/apache/incubator-ShenYu/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22). Even if the released task is a little difficult for you, you can still try to submit a PR. The community members will review your PR and provide some guidance and suggestions to help you improve yourself in the collision of ideas.

### My Community Grows

First, I would like to thank the friends in community who helped me for free (in no particular order): yu199195, JooKS-me, KevinClair, lianjunwei, qicz, AhahaGe, hutaishi

#### Contribution and Gain

- Learn how to be compatible with both spring-boot 1.x and 2.x, and contribute a lot of solutions.
- Get familiar with the use of project-reactor and spring-webflux, and then contribute a lot of optimizations.
- After getting familiar with netty, contributed netty thread pool settings.
- After getting familiar with dubbo, expanded the dubbo thread pool in ShenYu.
- Learn about RPCs such as grpc and motan, and contribute to shared thread pool technology.
- Provide MemoryLimitedLinkedBlockingQueue and MemorySafeLRUMap, which solved the technical paradox.

#### Suggestion for Contributing to Apache ShenYu

1. First meet

   Starting from the official website documentation, the first is [admin/bootstrap deployment](https://ShenYu.apache.org/docs/next/deployment/deployment-local/) , and then choose a way that you are most familiar with [to access ShenYu](https://ShenYu.apache.org/docs/next/quick-start/quick-start-dubbo/), and finally send a request to verify whether the access is successful.

2. Familiar
   
   After a period of time, you will be familiar with the use of ShenYu. At this point, you can start with an access way and see how the data is finally sent to ShenYu-admin and stored.

3. Slightly successful

   You are already familiar with a certain code in the registration phase, and you can start to sort out the main link of ShenYu-bootstrap in the running phase according to your access way. At this time, it is not recommended digging into the details of each plugin.

4. Understanding

   At this time, you already have a certain understanding of the overall situation of ShenYu. Maybe you have discovered some small bugs of ShenYu at this stage, or you think some of ShenYu's postures are not ergonomic, so what are you waiting for?

   Go to the community to see if anyone has the same problem as you, you can submit some BUG/ISSUE/PR, the community will reply you as soon as possible.

5. Outstanding

   As you continue to participate in the community, you contribute more and more to the community, and eventually you can help others solve problems and be able to mentor others.

   You are always curious, you learn deeply, and you can stand on the bottom.

   You have a certain big-picture view and can look at optimization from a global perspective.

   You can see the essence of the problem and solve the root problem.

#### How to join Apache ShenYu

1. How to become a Contributor

   The Apache ShenYu community has purposely written a very comprehensive [Contributor Guide](https://ShenYu.apache.org/community/contributor-guide/)

2. Github [Issues](https://github.com/apache/incubator-ShenYu/issues)

3. Subscribe emails
   
   Email dev-subscribe@ShenYu.apache.org;

   After the sending is successful, you will receive a reply from dev-subscribe@ShenYu.apache.org, please reply to this email according to the prompt of the email to confirm the subscription;

   After replying to confirm, you will receive a welcome email indicating that you have successfully subscribed to emails.
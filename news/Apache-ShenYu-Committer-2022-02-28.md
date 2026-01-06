---
title: "[The Open Source Path for Tech Veterans]"
author: "Haibo Duan"
description: "The Open Source Path for Tech Veterans"
categories: "Apache ShenYu Committers"
tags: ["Apache ShenYu"]
date: 2021-02-28
slug: Apache-ShenYu-Committer-2022-02-28
---

### Self Introduction:

Hello everyone, my name is Duan Haibo, my github account is [haibo-duan](https://github.com/haibo-duan). It is my honor to be invited by the Apache ShenYu community as the Committer. Here, I would like to share with you my growth and advice from participating in the Apache ShenYu community.

### Getting to know Apache ShenYu

In the last year's source code reading activity, Tt was my first time to hear about the Soul Gateway of the Dromara open source community officially joined the Apache Foundation incubator and renamed to ShenYu. Since ShenYu is the first open source project which named by Chinese traditional culture, which attracted me a lot since naming a procject can be frustrating for a programmer. Then, I followed to ShenYu's public account driven by curiosity. After that, I learned that ShenYu not only has the characteristics of high-performance, multi-protocol, and scalability, but also provides various plug-ins that can be used out of the box. With the mentality of learning, I forked the source code of ShenYu on github. I was amazed by the richness of the documentations and the great detailed description of the technical details. so I subscribed to ShenYu's email according to the description of the document, and tried to participate in the construction of the community.

### My way to Open source

There was a time that the community organized a code cleaning event, aiming to clean and optimize the current shenyu code. I took a look at the requirements of this task which was not difficult, so I optimized some codes according to the specification with the mentality of giving it a try, and then submitted the first PR. Everything is difficult at the beginning. There were a lot of things to learn in the first PR, including the format of PR, the branch of code, and the submission process. Fortunately, all of these were described in the [Contributor Guide](https://shenyu.apache.org/community/contributor-guide)  in great detail. What impressed me the most was ShenYu's checkstyle, which was very strict to the specification, including comments and spaces. Although I had paid a lot of attention to code specifications, there was still a little difficult for me to use this checkstyle at the beginning. However, I got used to this process soon, since the code after unified checkstyle let me feel extremely comfortable.

After the first PR from 0 to 1, the subsequent process was much easier. I found that the most time-consuming process of submitting a PR for local packaging was executing unit test cases. And I also found that there were still parts of the code that unit test code was not provided . Therefore, I decided to start participating in unit testing. First of all, I don't need to know too much source code since the tens of thousands of stock code in ShenYu is unable to be mastered in a day or two. In addition, results can be seen very quickly. In the process of writing unit test cases, I can not only find bugs in the source code to improve the code quality, but also understand the source code better.

At this time, some problems at work also required me to investigate the unit testing technology. When I learned about the new features of junit5, I found unit4 was used in Shenyu , so I sent an email to ask the ShenYu community if an upgrade was possible. After several rounds of discussions in the email, my proposal was accepted and I became the leader of this task. In the process of doing this task, I divided it into many small tasks due to the large amount of test code involved, and several new friends were attracted  to join together. In addition, in the task of this junit5 upgrade, it was also found that PowerMock was used in many previous use cases, which had a problem in the compatibility of the new version of jdk. So PowerMock had also been removed.

The ShenYu community is open and inclusive. After completing these tasks, I am very familiar with ShenYu's functional modules. In addition to continuing to follow up some issues in the community, I can also think more based on my own work experience, and propose some questions and ideas in the weekly meeting. At the same time, I received an invitation from the ShenYu community to officially become a committer. In my opinion, becoming an Apache committer is not only an honor, but also a responsibility. Being trusted by the community, I need to contribute more to the community then. Becoming an Apache committer is not the end, but just a higher beginning.

# My experience in Apahce ShenYu Community

In the process of participating in open source during this time, I have gained a lot, following are some of my experiences for your reference:

- Start small: Contributions to the open source community are regardless of size. It's a contribution to the community no matter it's a major feature improvement or an one-line documentation error. Therefore,do not miss doing any good thing no matter how insignificant it looks. As long as it is a valuable contribution, it's welcomed by the community.

- Active participation and continuous contribution:  Open source is a process of accumulating sand and building a tower. One time contribution may be limited, but as long as you participate in community activities actively, you can get promotion, no matter a proposal discussion in the email or the review code. You may not be as committed as you are in work, but as long as you make good use of your spare time and persist for a long time, you can still be successful.

- Participate in email discussions and put forward ideas boldly: The biggest characteristics of open source communities are democracy, openness and transparency. Here, any ideas and suggestions will be fully valued. If you have a great idea, you just need to send an email and you can discuss it with everyone in the community. Your emails will always be answered. And all discussions are public, you can see people's discussions about your question. In many cases, the process of discussing about the problem is often more valuable than solving the problem itself.

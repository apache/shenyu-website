---
title: "My First Few Months in the Apache ShenYu Community"
author: "SiGuo Duan"
description: "SiGuo Duan looks back on his journey contributing to ShenYu, starting with CI improvements."
categories: "Apache ShenYu Committers"
tags: ["Apache ShenYu"]
date: 2026-11-25
slug: Apache-ShenYu-Committer-2026-11-25
---

### Personal Introduction

Hello everyone, I'm SiGuo Duan, known as Duansg on GitHub. I work in e-commerce, focusing on developing systems for processing and managing product catalog data at a scale of hundreds of millions of items. I'm honored to have been invited by the community to become an Apache ShenYu Committer. [My GitHub profile](https://github.com/Duansg)

<!-- truncate -->

### Getting to Know Apache ShenYu

I began contributing to ShenYu through its build and test workflows. My first changes were small, mainly reducing repeated CI tasks so developers could get test results sooner after updating their code. As I became more familiar with the project, I started reading the source code to investigate issues raised in the community. Gradually, I began to understand how service registration, configuration synchronization, and gateway request processing fit together.

### Open Source Contributions and Growth

Beyond the early CI improvements, I have also contributed to several areas of the gateway.

- In service registration and configuration synchronization, I fixed issues where upstream instance status changes were not saved correctly when instances went online or offline. I also ensured that service re-registration preserves the existing enabled or disabled state of metadata.
- In the logging plugins, I added metrics for queue backlogs and records dropped at admission, improved sampling rate validation, and refined size limits for request and response logs.
- In request processing, I fixed issues where URL rewriting changed the encoding of some parameters and improved how gateway plugins and the SDK handle empty JSON request bodies and responses without a body.

One review of a service registration change left a lasting impression on me. A community member reminded me that, when testing an instance going offline, it was also worth testing what happens when it comes back online. Since then, I have considered both directions together when reviewing similar changes.

### Acknowledgements

I would like to thank Hongyu Liu (Aias00) for his guidance and support throughout my involvement, as well as every member of the Apache ShenYu community. I have learned a great deal from the thoughtful suggestions in code reviews and the experiences shared in technical discussions. Thank you all for making this an open, friendly community where people enjoy working together.

### Looking Ahead

My sincere thanks to everyone in the community for their patient reviews and guidance. As a Committer, I hope to continue supporting the spirit of open source alongside Apache ShenYu, welcoming more developers and helping build a technically strong and vibrant community.

I also look forward to discussing the issues you encounter in the community. [ShenYu contributor guide](https://shenyu.apache.org/community/contributor-guide/) · [GitHub Issues](https://github.com/apache/shenyu/issues)

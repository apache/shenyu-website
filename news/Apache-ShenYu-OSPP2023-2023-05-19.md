---
title: "[OSPP 2023 & Apache ShenYu e2e task is coming | Invite you to explore the high performance gateway]"
author: "moremind"
description: "Apache ShenYu OSPP 2023"
categories: "OSPP 2023"
tags: ["Apache ShenYu", "OSPP 2023"]
date: 2023-05-19
---


## OSPP 2023

Open Source Summer is a summer open source activity initiated and long-term supported by the "Open Source Software Supply Chain Lighting Project" of the Institute of Software, Chinese Academy of Sciences. 
It aims to encourage students to actively participate in the development and maintenance of open source software, and to cultivate and discover more excellent developers Promote the vigorous development of excellent open source software communities and help the construction of open source software supply chains.

## Participate in Open Source Summer

Open source summer 2023 student registration officially opens on April 29! Students can select projects on the official website of Open Source Summer https://summer-ospp.ac.cn/, communicate with mentor, prepare project application materials, and submit applications.

![](https://new-blog-1251602255.cos.ap-shanghai.myqcloud.com/img/1683816359250.jpg)

## Apache ShenYu Introduction

Apache ShenYu is a Java gateway that supports multi-language, multi-protocol (Dubbo, SpringCloud, gRPC, Motan, SofaTars, BRPC), plug-in design, highly dynamic configuration, and highly self-developed. Built-in rich plug-in support, authentication, current limit, circuit breaker, firewall, etc. The traffic configuration is dynamic and the performance is extremely high. Support cluster deployment, support A/B Test, blue-green release and other functions.

The Apache ShenYu community is an open source project community organized by the Apache Foundation. Up to now, a total of 340 contributors have gathered around the world. They participate in ShenYu in the spirit of "Apache Way", make contributions to ShenYu, and grow together with ShenYu!

## Apache ShenYu E2E Project Introduction

> **The task threshold will not be too high, and the whole process will be guided by community tutors.**

### Project Background

Shenyu is an asynchronous, high-performance, cross-language, responsive `API` gateway, but currently Shenyu lacks the necessary end to end engine and test case, end to end test is an important part of the shenyu project as a whole.

### Required Skills

Understand the technical architecture of Apache ShenYu, understand the end-to-end testing framework of Apache ShenYu, be able to use existing code to write TestSpec, need to understand shenyu's data synchronization framework including websocket, http, zookeeper, nacos, apollo and other middleware and algorithms, be able to write docker-compose, understand the necessary tools for e2e development such as testcontainer and docker.

### Tasks

1. Write shenyu end-to-end test framework, write shenyu end-to-end test engine (difficulty: high)

2. It is necessary to realize the storage of different databases (mysql, oracle, postgres, h2) of admin in e2e to ensure the correct data storage

3. It is necessary to ensure that the data can be correctly added to shenyu-admin through the configuration method and shenyu-client registration method (difficulty: high)

4. Use different data synchronization methods (websocket, http, zookeeper, nacos, apollo) to ensure correct data synchronization from admin to gateway

5. Add end-to-end test cases of alibaba dubbo, apache dubbo, sofa, tars, motan related proxy plug-ins

6. Write a specific TestSpec to modify the admin dictionary, metadata, plug-ins, selectors, and rule data, and perform a regression test after the modification to ensure that the calling logic is correct (difficulty: high)

7. Write the corresponding github ci file to ensure that the ci process works normally in github action

### Project Output Requirements

1. Write the corresponding e2e test case

2. Use e2e to realize the test that admin uses different databases to store data

3. Realize the end-to-end test of synchronizing data in different data synchronization methods

4. Edit the corresponding e2e document

### Project technical requirements

1. Follow shenyu code specification

2. In-depth understanding of spring webflux

3. In-depth understanding of shenyu's data synchronization principle

4. In-depth understanding of shenyu client registration data principles

5. In-depth understanding of shenyu's end-to-end test engine and framework

### Project Repository

* https://github.com/apache/shenyu
* https://github.com/apache/shenyu-website

#### Project Website

* https://summer-ospp.ac.cn/org/prodetail/2362f0159?list=org&navpage=org

### Other Information

* Project Difficulty: Advanced

* Mentor email: hefengen@apache.org

## What can you gain from the event?

### Development experience

Participate in open source projects, become a contributor to large-scale open source projects, understand multi-field and multi-difficulty gradient tasks, give you rich practical experience in large-scale open source projects, and it is also a good opportunity to exercise your development capabilities!

### Organizing committee awards

1. You will get a completion bonus and a completion certificate: Students who pass the completion assessment will have the opportunity to receive an outstanding student certificate.

2. There are two difficulty levels in this competition, and different levels correspond to different bonuses:

Advanced Difficulty: RMB 12,000 before tax for student completion bonus

Basic difficulty: RMB 8,000 before tax for student completion bonus

The prize money for this competition is provided by the Summer of Open Source Organizing Committee.

### Apache ShenYu community in-depth communication

1. Participate in the Summer of Open Source @Apache ShenYu project, you will be able to communicate with 300+ contributors in the Apache ShenYu community around the world.

2. Participate in the Summer of Open Source @Apache ShenYu project, you will become an Apache ShenYu contributor, and after continuing to contribute, you will have the opportunity to become an Apache ShenYu Committer.

## Quickly Participate in Open Source Summer

Open Source Summer 2023 community projects will start accepting students to participate in project applications from April 29th. Welcome to communicate with the tutors and prepare project application materials through the contact information above.

![](https://new-blog-1251602255.cos.ap-shanghai.myqcloud.com/img/1683817405594.jpg)

---
title: "[Google Summer of Code & Apache ShenYu task is coming | Invite you to explore the high performance gateway]"
author: "moremind"
description: "Apache ShenYu GSOC 2023"
categories: "GSOC 2023"
tags: ["Apache ShenYu", "GSOC 2023"]
date: 2023-04-18
slug: Apache-ShenYu-GSOC2023-2023-04-18
---

## Google Summer of Code & Apache ShenYu springcloud e2e task is coming | Invite you to explore the high performance gateway

### Description

Shenyu is a native API gateway for service proxy, protocol translation and API governance. but Shenyu lack of End-To-End Tests.

Relevant skills：
* Understand the architecture of ShenYu
* Understand SpringCloud micro-service and ShenYu SpringCloud proxy plugin.
* Understand ShenYu e2e framework and architecture.

How to coding
* please refer to `org.apache.shenyu.e2e.testcase.plugin.DividePluginCases`

How to test
* start shenyu admin in docker
* start shenyu boostrap in docker
* run test case `org.apache.shenyu.e2e.testcase.plugin.PluginsTest#testDivide`

### Task List

1. develop e2e tests of the springcloud plug-in.
2. write shenyu e2e springcloud plugin documentation in shenyu-website.
3. refactor the existing plugin test cases.


## Design and implement shenyu ingress-controller in k8s

### Background

Apache ShenYu is a Java native API Gateway for service proxy, protocol conversion and API governance. Currently, ShenYu has good usability and performance in microservice scenarios. However, ShenYu's support for Kubernetes is still relatively weak.

### Tasks

1. Discuss with mentors, and complete the requirements design and technical design of shenyu-ingress-controller.
2. Complete the initial version of shenyu-ingress-controller, implement the reconcile of k8s ingress api, and make ShenYu as the ingress gateway of k8s.
3. Complete the ci test of shenyu-ingress-controller, verify the correctness of the code.

### Relevant Skills

1. Know the use of Apache ShenYu
2. Familiar with Java and Golang
3. Familiar with Kubernetes and can use java or golang to develop Kubernetes Controller

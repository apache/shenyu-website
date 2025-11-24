---
title: "[Apache ShenYu 2.7.3 Version Release]"
description: "Apache ShenYu 2.7.3 Version Release"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2025-11-24
---

## Apache ShenYu

Apache ShenYu is a responsive API gateway developed using Java Reactor. With its high performance, dynamic and flexible traffic control, hot swap, easy deployment and other features, out of the box to provide users with a full lifecycle of 'API' gateway, including 'API' registration, service proxy, protocol conversion, 'API' documentation and 'API' governance and other functions. Apache ShenYu graduated as an Apache top-level project in 'July 2022'.

> website: https://shenyu.apache.org
>
> GitHub: https://github.com/apache/shenyu

## Version preview

This version primarily includes several bug fixes, dependency upgrades, and documentation improvements.

## What's Changed

- [chore] Bump actions/checkout from 3 to 4 by @dependabot in https://github.com/apache/shenyu/pull/6071
- [chore] Bump actions/setup-java from 3 to 4 by @dependabot in https://github.com/apache/shenyu/pull/6072
- [chore] Bump codecov/codecov-action from 3 to 4 by @dependabot in https://github.com/apache/shenyu/pull/6073
- [chore] Bump gradle/wrapper-validation-action from 1 to 2 by @dependabot in https://github.com/apache/shenyu/pull/6074
- [fix] Fix NPE in SpringMvcPlugin when handlerMethod is null by @Aias00 in https://github.com/apache/shenyu/pull/6075
- [feat] Support custom load balance algorithm in Dubbo plugin by @Aias00 in https://github.com/apache/shenyu/pull/6076
- [docs] Update quick start guide for Docker deployment by @Aias00 in https://github.com/apache/shenyu/pull/6077
- [chore] Bump docusaurus from 3.5.2 to 3.6.0 in /shenyu-website by @dependabot in https://github.com/apache/shenyu/pull/6078
- [fix] Resolve race condition in PluginDataSubscriber cache by @justinmclean in https://github.com/apache/shenyu/pull/6079

## Become a contributor

We welcome every contributor to join ShenYu, and welcome contributors to participate in ShenYu in the spirit of Apache Way!

See the contributor guidelines:

> https://shenyu.apache.org/zh/community/contributor-guide
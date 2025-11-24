---
title: "【Apache ShenYu 2.7.0.3 版本发布】"
description: "Apache ShenYu 2.7.0.3 版本发布"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2025-11-24
---

## 关于Apache ShenYu

`Apache ShenYu` 一款使用 `Java Reactor` 开发的响应式`API` 网关。以其高性能，动态灵活的流量管控，热插拔，易部署等特性，开箱即用为用户提供整套全生命周期的 `API`网关，包含 `API`注册、服务代理、协议转换、`API`文档与 `API`治理等功能。Apache ShenYu于`2022年7月`毕业成为`Apache`顶级项目。

> 官网: https://shenyu.apache.org
> GitHub: https://github.com/apache/shenyu

## 版本预览
此版本主要包含若干 bug 修复、依赖升级和文档改进，推荐所有用户升级。

## 改动内容

- [chore] Bump actions/checkout from 3 to 4 by @dependabot in https://github.com/apache/shenyu/pull/6071
- [chore] Bump actions/setup-java from 3 to 4 by @dependabot in https://github.com/apache/shenyu/pull/6072
- [chore] Bump codecov/codecov-action from 3 to 4 by @dependabot in https://github.com/apache/shenyu/pull/6073
- [chore] Bump gradle/wrapper-validation-action from 1 to 2 by @dependabot in https://github.com/apache/shenyu/pull/6074
- [fix] Fix NPE in SpringMvcPlugin when handlerMethod is null by @Aias00 in https://github.com/apache/shenyu/pull/6075
- [feat] Support custom load balance algorithm in Dubbo plugin by @Aias00 in https://github.com/apache/shenyu/pull/6076
- [docs] Update quick start guide for Docker deployment by @Aias00 in https://github.com/apache/shenyu/pull/6077
- [chore] Bump docusaurus from 3.5.2 to 3.6.0 in /shenyu-website by @dependabot in https://github.com/apache/shenyu/pull/6078
- [fix] Resolve race condition in PluginDataSubscriber cache by @justinmclean in https://github.com/apache/shenyu/pull/6079

## 成为贡献者

我们欢迎每一位贡献者的加入ShenYu，欢迎贡献者以Apache Way的精神参与ShenYu！

贡献者指南请参考：

> https://shenyu.apache.org/zh/community/contributor-guide
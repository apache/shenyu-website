---
title: "【Apache ShenYu 2.7.0.2 版本发布】"
description: "Apache ShenYu 2.7.0.2 版本发布"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2025-08-25
slug: Apache-ShenYu-release-version-2.7.0.2
---

## 关于Apache ShenYu

`Apache ShenYu` 一款使用 `Java Reactor` 开发的响应式`API` 网关。以其高性能，动态灵活的流量管控，热插拔，易部署等特性，开箱即用为用户提供整套全生命周期的 `API`网关，包含 `API`注册、服务代理、协议转换、`API`文档与 `API`治理等功能。Apache ShenYu于`2022年7月`毕业成为`Apache`顶级项目。

> 官网: https://shenyu.apache.org
> GitHub: https://github.com/apache/shenyu

## 版本预览

时隔一年，`Apache ShenYu`发布了2.7.0.2版本，该版本共计提交了`54+个 Pull Request`,新增约`19+个新特性`，新增了若干增强，重构了若干功能，并且修复了若干个bug。共计`20位`贡献者参与其中，累计贡献者达411+位。

> 版本记录：https://github.com/apache/shenyu/compare/v2.7.0.1...v2.7.0.2

## 改动内容

- [release] 2.7.0.1 发布 由 @Aias00 在 https://github.com/apache/shenyu/pull/6014
- [fix] 修复文档拉取错误 由 @Aias00 在 https://github.com/apache/shenyu/pull/6016
- [feat] 更新徽章 由 @Aias00 在 https://github.com/apache/shenyu/pull/6023
- [fix] 修复 h2 ai 代理 sql 缺少选择器处理 由 @fantasy-lotus 在 https://github.com/apache/shenyu/pull/6025
- 修复：更新 ai 代理插件处理为非必需 由 @fantasy-lotus 在 https://github.com/apache/shenyu/pull/6024
- [fix] 修复 README.md 快速开始（docker） 由 @fantasy-lotus 在 https://github.com/apache/shenyu/pull/6026
- 修复 AiTokenLimiterPlugin appendResponse 由 @HY-love-sleep 在 https://github.com/apache/shenyu/pull/6027
- [fix] 修复数据缓冲区泄漏 由 @Aias00 在 https://github.com/apache/shenyu/pull/5988
- 特性：ai-request-transformer 插件 由 @478320 在 https://github.com/apache/shenyu/pull/6033
- 修复 plugin-ai-request-transformer：修复 UI 错误 由 @478320 在 https://github.com/apache/shenyu/pull/6035
- 修复拼写错误和代码问题。由 @ttfont 在 https://github.com/apache/shenyu/pull/6036
- [fix] 修复 ci 修改 kafka 版本 由 @Aias00 在 https://github.com/apache/shenyu/pull/6039
- 升级 org.apache.kafka:kafka-clients 从 3.7.1 到 3.9.1 由 @dependabot[bot] 在 https://github.com/apache/shenyu/pull/6037
- [type:feat] 引导实例状态 由 @Aias00 在 https://github.com/apache/shenyu/pull/5950
- [type:fix] (logging-rabbitmq)：修复 Rabbitmq 日志配置修改后未正确刷新的问题。由 @yqw570994511 在 https://github.com/apache/shenyu/pull/6001
- 基于选择器修改 dubbo 插件配置 由 @Wweiei 在 https://github.com/apache/shenyu/pull/5953
- [type:fix] 不改变单例配置 由 @eye-gu 在 https://github.com/apache/shenyu/pull/6044
- [ISSUE #6045]修复 admin：修改 addproxyselector 函数有一些错误。由 @gitYupan 在 https://github.com/apache/shenyu/pull/6046
- [fix] 修复 ai request transformer 插件 由 @478320 在 https://github.com/apache/shenyu/pull/6047
- 升级 org.apache.zookeeper:zookeeper 从 3.9.2 到 3.9.3 由 @dependabot[bot] 在 https://github.com/apache/shenyu/pull/6042
- [fix] 修复 application.xml 由 @478320 在 https://github.com/apache/shenyu/pull/6048
- [type:feat] mcp 服务器插件 由 @Aias00 在 https://github.com/apache/shenyu/pull/5999
- 升级 org.apache.commons:commons-lang3 从 3.12.0 到 3.18.0 由 @dependabot[bot] 在 https://github.com/apache/shenyu/pull/6052
- [feat] 为流式令牌优化 aiTokenLimiterPlugin 由 @HY-love-sleep 在 https://github.com/apache/shenyu/pull/6055
- [fix] 修复配置导入 由 @liuqian1990 在 https://github.com/apache/shenyu/pull/6051
- [type:feature] 为 ShenYu Admin 添加 Swagger 导入功能 由 @guanzhenxing 在 https://github.com/apache/shenyu/pull/6050
- [feat] mcp 可流式 http 由 @ZWJzhangwanjie 在 https://github.com/apache/shenyu/pull/6061
- 特性：添加其他基础设施模块模板 由 @yuluo-yx 在 https://github.com/apache/shenyu/pull/6067
- 特性（单元测试）：为 ai 插件代理添加单元测试 由 @yuluo-yx 在 https://github.com/apache/shenyu/pull/6070
- 杂务：删除无用的空路径 由 @yuluo-yx 在 https://github.com/apache/shenyu/pull/6066
- e2e：暂时注释 由 @yuluo-yx 在 https://github.com/apache/shenyu/pull/6073
- 特性（单元测试）：为 ai 插件添加单元测试 由 @yuluo-yx 在 https://github.com/apache/shenyu/pull/6069
- 杂务（样式）：更新 application.yml 由 @yuluo-yx 在 https://github.com/apache/shenyu/pull/6064
- 特性（单元测试）：为 ai 提示添加单元测试 由 @yuluo-yx 在 https://github.com/apache/shenyu/pull/6075
- 特性：为 shenyu-common 工具添加单元测试 由 @yuluo-yx 在 https://github.com/apache/shenyu/pull/6077
- 特性（单元测试）：为 ai 插件添加单元测试 由 @yuluo-yx 在 https://github.com/apache/shenyu/pull/6078
- [feat] 基于规则 sql 添加 aiRequestTransformer 配置 由 @478320 在 https://github.com/apache/shenyu/pull/6053
- 特性：为 disruptor 添加单元测试 由 @yuluo-yx 在 https://github.com/apache/shenyu/pull/6079
- 特性：提取公共数据实体 由 @yuluo-yx 在 https://github.com/apache/shenyu/pull/6084
- 重构（基础设施）：重构 ShenYu-Infra 模块 由 @yuluo-yx 在 https://github.com/apache/shenyu/pull/6082
- [fix] 修复 LocalDispatcherFilter 中本地密钥验证的逻辑 由 @zhangshenghang 在 https://github.com/apache/shenyu/pull/6086
- [fix] 修复资源泄漏风险 由 @zhangshenghang 在 https://github.com/apache/shenyu/pull/6085
- 特性（单元测试）：更新基础设施 nacos 模块单元测试 由 @yuluo-yx 在 https://github.com/apache/shenyu/pull/6089
- [feat] 添加警报测试 由 @zhangshenghang 在 https://github.com/apache/shenyu/pull/6088
- 特性：为 infra-etcd 添加单元测试 由 @yuluo-yx 在 https://github.com/apache/shenyu/pull/6087
- [fix] 解决使用点符号的 JWT 值的重复头部问题 由 @zhangshenghang 在 https://github.com/apache/shenyu/pull/6092
- [feat]：添加 ai 响应转换器 由 @HY-love-sleep 在 https://github.com/apache/shenyu/pull/6095
- [test] 为 RoundRobinLoadBalancer 的选择逻辑和分布添加测试 由 @zhangshenghang 在 https://github.com/apache/shenyu/pull/6093
- 杂务（依赖）：升级 io.grpc:grpc-protobuf 从 1.53.0 到 1.54.2 在 /shenyu-examples/shenyu-examples-sofa/shenyu-examples-sofa-service 由 @dependabot[bot] 在 https://github.com/apache/shenyu/pull/6100
- 修复：修复漏洞 由 @Aias00 在 https://github.com/apache/shenyu/pull/6099
- 改进基于选择器的 dubbo 插件配置功能，添加注册表配置。由 @Wweiei 在 https://github.com/apache/shenyu/pull/6096
- 杂务：为 2.7.0.2 发布更新 LICENSE 和 pom.xml 由 @Aias00 在 https://github.com/apache/shenyu/pull/6104
- 同步仪表板 由 @VampireAchao 在 https://github.com/apache/shenyu/pull/6106

## 新贡献者

- @fantasy-lotus 在 https://github.com/apache/shenyu/pull/6025 中首次贡献
- @HY-love-sleep 在 https://github.com/apache/shenyu/pull/6027 中首次贡献
- @gitYupan 在 https://github.com/apache/shenyu/pull/6046 中首次贡献
- @liuqian1990 在 https://github.com/apache/shenyu/pull/6051 中首次贡献
- @guanzhenxing 在 https://github.com/apache/shenyu/pull/6050 中首次贡献
- @ZWJzhangwanjie 在 https://github.com/apache/shenyu/pull/6061 中首次贡献
- @yuluo-yx 在 https://github.com/apache/shenyu/pull/6067 中首次贡献
- @zhangshenghang 在 https://github.com/apache/shenyu/pull/6086 中首次贡献

## 成为贡献者

我们欢迎每一位贡献者的加入ShenYu，欢迎贡献者以Apache Way的精神参与ShenYu！

贡献者指南请参考：

> https://shenyu.apache.org/zh/community/contributor-guide

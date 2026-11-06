---
title: "【Apache ShenYu 2.7.2 版本发布】"
description: "Apache ShenYu 2.7.2 版本发布"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2026-11-06
slug: Apache-ShenYu-release-version-2.7.2
---

## Apache ShenYu 2.7.2

Apache ShenYu 2.7.2 现已发布。本版本包含从 2.7.1 到通过投票的 RC4 候选版本
之间的完整变更。

<!-- truncate -->

发布信息：

- GitHub Release：https://github.com/apache/shenyu/releases/tag/v2.7.2
- 源码与二进制包：https://shenyu.apache.org/download/
- Maven Central：https://central.sonatype.com/namespace/org.apache.shenyu
- 发布说明：https://github.com/apache/shenyu/blob/v2.7.2/RELEASE-NOTES.md
- 完整变更记录：https://github.com/apache/shenyu/compare/v2.7.1...v2.7.2

## 主要内容

- Request Transformer 支持重放只能读取一次的请求体，并保留下游执行错误。
- Redis 不可用时，敏感词检查遵循 `failClosed`；检查前解析 JSON Unicode 转义。
- Token Limiter 仅从 provider 协议字段读取 usage 信息。
- 依赖升级到 Spring Boot 3.5 和 Spring Cloud 2025.0.3，并提供 H2 2.x 与
  `logged` 字段迁移说明。
- 修正并审计 Maven 与发行包中的 LICENSE/NOTICE、Dashboard 资源和源码归档。

请使用 Apache ShenYu KEYS 中的公钥校验下载文件的 SHA-512 校验和与 PGP 签名。

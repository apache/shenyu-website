---
title: "【Apache ShenYu WASM 1.0.0 版本发布】"
description: "Apache ShenYu WASM 1.0.0 版本发布"
categories: "Apache ShenYu WASM"
tags: ["Apache ShenYu WASM", "WASM"]
date: 2024-01-06
---

## 关于Apache ShenYu

`Apache ShenYu` 一款使用 `Java Reactor` 开发的响应式`API` 网关。以其高性能，动态灵活的流量管控，热插拔，易部署等特性，开箱即用为用户提供整套全生命周期的 `API`网关，包含 `API`注册、服务代理、协议转换、`API`文档与 `API`治理等功能。Apache ShenYu于`2022年7月`毕业成为`Apache`顶级项目。

> 官网: https://shenyu.apache.org
> GitHub: https://github.com/apache/shenyu

## 关于Apache ShenYu WASM

`Apache ShenYu WASM` 一款基于 `Java Native Interface` 和 [wasmer](https://github.com/wasmerio/wasmer) 技术为Java开发的`WASM` SDK，具有跨平台、易使用的特性。

### 新特性

1.简化使用姿势
2.支持使用用户定义的动态链接库

> 具体使用请查看：https://github.com/apache/shenyu-wasm/blob/master/README.md

## 重构

1.从[wasmer-java](https://github.com/wasmerio/wasmer-java) 重构

> 具体pr请查看：https://github.com/apache/shenyu-wasm/pull/3

## 成为贡献者

我们欢迎每一位贡献者的加入ShenYu，欢迎贡献者以Apache Way的精神参与ShenYu！

贡献者指南请参考：

> https://shenyu.apache.org/zh/community/contributor-guide

## 特别鸣谢

感谢 [wasmer](https://github.com/wasmerio/wasmer) 和 [wasmer-java](https://github.com/wasmerio/wasmer-java) 的所有贡献者，没有你们就没有[shenyu-wasm](https://github.com/apache/shenyu-wasm) ！

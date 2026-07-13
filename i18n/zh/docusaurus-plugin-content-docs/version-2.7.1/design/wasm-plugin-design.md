---
title: WASM插件设计
keywords: ["WASM"]
description:  Apache ShenYu WASM插件设计
---

`Apache ShenYu`是一个Java原生，用于服务代理、协议转换和API管理的API网关。目前shenyu在Java语言中具有良好的可扩展性，然而shenyu对多种语言的支持仍然相对较弱。

`WASM`(即WebAssembly)字节码被设计为以大小和加载时间高效的二进制格式进行编码。WebAssembly旨在利用各种平台上可用的通用硬件功能，以机器码的速度在浏览器中执行。

`WASI`(即WebAssembly System Interface)则是让WASM可以运行在非浏览器环境中(比如linux)。

`WASMPlugin`的目标是能够运行WASM字节码。其他语言，只要这种语言的代码能被编译成WASM字节码(如Rust/golang/C++)，那么这种语言就可以用来编写ShenYu插件。

## 开发阶段

<img src="/img/shenyu/plugin/wasm/wasm-plugin-develop.png" />

## 准备阶段

<img src="/img/shenyu/plugin/wasm/wasm-plugin-prepare.png" />

## 运行阶段

<img src="/img/shenyu/plugin/wasm/wasm-plugin-runtime.png" />

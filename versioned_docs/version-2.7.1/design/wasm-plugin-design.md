---
title: WASM plugin design
keywords: ["WASM"]
description:  Apache ShenYu WASM plugin design
---

`Apache ShenYu` is a Java native API Gateway for service proxy, protocol conversion and API governance. Currently, ShenYu has good scalability in the Java language. However, ShenYu's support for multiple languages is still relatively weak.

`WASM`(WebAssembly) bytecode is designed to be encoded in a size- and load-time-efficient binary format. WebAssembly aims to leverage the common hardware features available on various platforms to execute in browsers at machine code speed.

`WASI`(WebAssembly System Interface) allows WASM to run in non browser environments such as Linux.

The goal of `WASMPlugin` is to be able to run WASM bytecode. Other languages, as long as their code can be compiled into WASM bytecode (such as Rust/golang/C++), can be used to write ShenYu plugins.

## Develop Phase

<img src="/img/shenyu/plugin/wasm/wasm-plugin-develop.png" />

## Prepare Phase

<img src="/img/shenyu/plugin/wasm/wasm-plugin-prepare.png" />

## Runtime Phase

<img src="/img/shenyu/plugin/wasm/wasm-plugin-runtime.png" />

---
sidebar_position: 8
title: ShenYu 基准测试报告
keywords: ["test", "benchmark-test"]
description: ShenYu 基准测试报告
---

### 硬件环境

后端Mock服务所在服务器:

- CPU: 4核8线程 Intel Cascade Lake @ 3.0GHz * 4
- RAM: 16G

网关节点所在服务器:

- CPU: 4核8线程 Intel Cascade Lake @ 3.0GHz * 4
- RAM: 16G

测试工具占用资源很少，安装在网关节点服务器。

### ShenYu 版本

- ShenYu Admin: 2.6.0
- ShenYu Bootstrap: 2.6.0

### 测试工具

wrk-4.2.0

### 测试用例说明

- 使用 Mock 服务模拟一个平均响应时长 20ms ，响应报文约 2k 的接口
- 每次测试时长 3 分钟
- JVM 配置：
    - -Xmx 4g 
    - -Xms 4g 
    - -Xmn 1g 
    - -Xss 512k 
    - -XX: +DisableExplicitGC 
    - -XX: LargePageSizeInBytes=128m
- shenyu-bootstrap 配置：
    - selector 缓存：关闭
    - rule 一级缓存：开启
    - 前缀树缓存：开启
    - selector-thread: 1
    - work-thread number: 4

### 基准测试结果

- 600 并发下直接访问后端服务

    | **QPS** | **50% latency (ms)** | **75% latency (ms)** | **90% latency (ms)** | **99% latency (ms)** | **平均响应时间(ms)** | **最大响应时间(ms)** |
    |:---------------:|:----------------------:|:----------------------:|:----------------------:|:----------------------:|:----------------:|:----------------:|
    | 29659.78      | 19.35                | 23.34                | 27.85                | 38.49                | 20.25          | 83.29          |


- 600、800、1000 并发下通过 ShenYu 访问服务

|             | **QPS**  | **50% latency (ms)** | **75% latency (ms)** | **90% latency (ms)** | **99% latency (ms)** | **平均响应时间(ms)** | **最大响应时间(ms)** |
|:-----------:|:--------:|:--------------------:|:--------------------:|:--------------------:|:--------------------:|:--------------:|:--------------:|
| **600并发**  | 13892.16 | 40.03                | 65.08                | 94.64                | 159.40               | 46.85          | 502.50         |
| **800并发**  | 13603.35 | 54.65                | 90.81                | 132.40               | 218.36               | 64.16          | 348.59         |
| **1000并发** | 13422.95 | 70.07                | 114.70               | 166.01               | 271.55               | 80.82          | 479.39         |

### 基准测试结果截图

- 直接访问后端

    <img src="/img/shenyu/benchmark-test/origin/1.jpg" width="100%" height="100%" />

- 通过 ShenYu 访问服务
    - 600 并发

        <img src="/img/shenyu/benchmark-test/600-currency/4-work-thread/1-no-selector-cache.jpg" width="100%" height="100%" />

        <img src="/img/shenyu/benchmark-test/600-currency/4-work-thread/2-no-selector-cache.jpg" width="100%" height="100%" />

    - 800 并发

        <img src="/img/shenyu/benchmark-test/800-currency/4-work-thread/1-no-selector-cache.jpg" width="100%" height="100%" />

        <img src="/img/shenyu/benchmark-test/800-currency/4-work-thread/2-no-selector-cache.jpg" width="100%" height="100%" />

    - 1000 并发

        <img src="/img/shenyu/benchmark-test/1000-currency/4-work-thread/1-no-selector-cache.jpg" width="100%" height="100%" />

        <img src="/img/shenyu/benchmark-test/1000-currency/4-work-thread/2-no-selector-cache.jpg" width="100%" height="100%" />
    
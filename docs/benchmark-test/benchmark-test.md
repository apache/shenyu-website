---
sidebar_position: 8
title: ShenYu Benchmark Test Report
keywords: ["test", "benchmark-test"]
description: ShenYu Benchmark Test Report
---

### Hardware

Back-end Mock Service Server:

- CPU: 4 cores and 8 threads Intel Cascade Lake @ 3.0GHz * 4
- RAM: 16G

Gateway node server:

- CPU: 4 cores and 8 threads Intel Cascade Lake @ 3.0GHz * 4
- RAM: 16G

The test tool takes up few resources and is installed on the gateway node server.

### ShenYu Version

- ShenYu Admin: 2.6.0
- ShenYu Bootstrap: 2.6.0

### Test Tool

wrk-4.2.0

### Test Case Description

- Use the Mock service to simulate an interface with an average response time of 20ms and about 2k response messages
- Each test lasts 3 minutes
- JVM Configuration：
    - -Xmx 4g 
    - -Xms 4g 
    - -Xmn 1g 
    - -Xss 512k 
    - -XX: +DisableExplicitGC 
    - -XX: LargePageSizeInBytes=128m
- shenyu-bootstrap Configuration：
    - selector cache: false
    - rule Level 1 Cache: true
    - trie tree cache: true
    - selector-thread: 1
    - work-thread number: 4

### Benchmark Test Results

- Direct access to back-end services under 600 concurrency

    | **QPS** | **50% latency (ms)** | **75% latency (ms)** | **90% latency (ms)** | **99% latency (ms)** | **Avg response time (ms)** | **Max response time (ms)** |
    |:---------------:|:----------------------:|:----------------------:|:----------------------:|:----------------------:|:----------------:|:----------------:|
    | 29659.78      | 19.35                | 23.34                | 27.85                | 38.49                | 20.25          | 83.29          |


- Access to back-end services via ShenYu under 600, 800, 1000 concurrency

|             | **QPS**  | **50% latency (ms)** | **75% latency (ms)** | **90% latency (ms)** | **99% latency (ms)** | **Avg response time (ms)** | **Max response time (ms)** |
|:-----------:|:--------:|:--------------------:|:--------------------:|:--------------------:|:--------------------:|:--------------:|:--------------:|
| **600 concurrency**  | 13892.16 | 40.03                | 65.08                | 94.64                | 159.40               | 46.85          | 502.50         |
| **800 concurrency**  | 13603.35 | 54.65                | 90.81                | 132.40               | 218.36               | 64.16          | 348.59         |
| **1000 concurrency** | 13422.95 | 70.07                | 114.70               | 166.01               | 271.55               | 80.82          | 479.39         |

### Screenshot of Benchmark Test Result

- Direct access to back-end services

    <img src="/img/shenyu/benchmark-test/origin/1.jpg" width="100%" height="100%" />

- Access to back-end services via ShenYu
    - 600 concurrency

        <img src="/img/shenyu/benchmark-test/600-currency/4-work-thread/1-no-selector-cache.jpg" width="100%" height="100%" />

        <img src="/img/shenyu/benchmark-test/600-currency/4-work-thread/2-no-selector-cache.jpg" width="100%" height="100%" />

    - 800 concurrency

        <img src="/img/shenyu/benchmark-test/800-currency/4-work-thread/1-no-selector-cache.jpg" width="100%" height="100%" />

        <img src="/img/shenyu/benchmark-test/800-currency/4-work-thread/2-no-selector-cache.jpg" width="100%" height="100%" />

    - 1000 concurrency

        <img src="/img/shenyu/benchmark-test/1000-currency/4-work-thread/1-no-selector-cache.jpg" width="100%" height="100%" />

        <img src="/img/shenyu/benchmark-test/1000-currency/4-work-thread/2-no-selector-cache.jpg" width="100%" height="100%" />

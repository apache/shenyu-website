---
sidebar_position: 8
title: ShenYu Benchmark Test Report
keywords: ["test", "benchmark-test"]
description: ShenYu Benchmark Test Report
---

### Hardware

Back-end Mock Service Server:

- CPU: 4 cores and 8 threads Intel Cascade Lake @ 3.0GHz
- RAM: 16G

Gateway node server:

- CPU: 4 cores and 8 threads Intel Cascade Lake @ 3.0GHz
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
- The HTTP request side is tested with `NettyClient` and `WebClient` respectively
- JVM Configuration：
    - -Xmx 4g 
    - -Xms 4g 
    - -Xmn 1g 
    - -Xss 512k 
    - -XX: +DisableExplicitGC 
    - -XX: LargePageSizeInBytes=128m
- shenyu-bootstrap 配置：
    
    ```yml
    matchCache:
        selector:
        selectorEnabled: false
        initialCapacity: 10000 # initial capacity in cache
        maximumSize: 10000 # max size in cache
        rule:
        initialCapacity: 10000 # initial capacity in cache
        maximumSize: 65536 # max size in cache
    trie:
        enabled: true
        childrenSize: 10000
        pathVariableSize: 1000
        pathRuleCacheSize: 1000
        matchMode: antPathMatch
    ```

- Netty 配置

    ```yml
    netty:
        http:
        # set to false, user can custom the netty tcp server config.
        webServerFactoryEnabled: true
        selectCount: 1
        workerCount: 8
        accessLog: false
        serverSocketChannel:
            soRcvBuf: 87380
            soBackLog: 128
            soReuseAddr: false
            connectTimeoutMillis: 10000
            writeBufferHighWaterMark: 65536
            writeBufferLowWaterMark: 32768
            writeSpinCount: 16
            autoRead: false
            allocType: "pooled"
            messageSizeEstimator: 8
            singleEventExecutorPerGroup: true
        socketChannel:
            soKeepAlive: false
            soReuseAddr: false
            soLinger: -1
            tcpNoDelay: true
            soRcvBuf: 87380
            soSndBuf: 16384
            ipTos: 0
            allowHalfClosure: false
            connectTimeoutMillis: 10000
            writeBufferHighWaterMark: 65536
            writeBufferLowWaterMark: 32768
            writeSpinCount: 16
            autoRead: false
            allocType: "pooled"
            messageSizeEstimator: 8
            singleEventExecutorPerGroup: true
    ```

- HttpClient 配置

    ```yml
    httpclient:
        strategy: webClient # netty
        connectTimeout: 45000
        responseTimeout: 3000
        readerIdleTime: 3000
        writerIdleTime: 3000
        allIdleTime: 3000
        readTimeout: 3000
        writeTimeout: 3000
        wiretap: false
        keepAlive: false
        maxInMemorySize: 1 #1mb
        pool:
        type: ELASTIC
        name: proxy
        maxConnections: 16
        acquireTimeout: 45000
        maxIdleTime: 3000
    ```

### Benchmark Test Results

- `Direct` access to back-end services under 600 concurrency

    | **QPS** | **50% latency (ms)** | **75% latency (ms)** | **90% latency (ms)** | **99% latency (ms)** | **Avg response time (ms)** | **Max response time (ms)** |
    |:---------------:|:----------------------:|:----------------------:|:----------------------:|:----------------------:|:----------------:|:----------------:|
    | 28998.20      | 19.81                | 23.78                | 28.26                | 41.24                | 20.92          | 402.90          |

- Access to back-end services via `NettyClient` under 600, 800, 1000 concurrency

    |             | **QPS**  | **50% latency (ms)** | **75% latency (ms)** | **90% latency (ms)** | **99% latency (ms)** | **Avg response time (ms)** | **Max response time (ms)** |
    |:-----------:|:--------:|:--------------------:|:--------------------:|:--------------------:|:--------------------:|:--------------:|:--------------:|
    | 600 concurrency  | 20472.95 | 19.37            | 25.36            | 32.89            | 69.92            | 22.09      | 1043.33    |
    | 800 concurrency  | 20703.55 | 23.57            | 31.32            | 40.11            | 77.28            | 26.11      | 576.47     |
    | 1000 concurrency | 20979.91 | 29.21            | 37.86            | 47.23            | 80.91            | 31.20      | 860.55     |
    | 1200 concurrency | 21129.88 | 32.45            | 42.40            | 52.68            | 96.10            | 35.06      | 1070       |

- Access to back-end services via `HttpClient` under 600, 800, 1000 concurrency

    |             | **QPS**  | **50% latency (ms)** | **75% latency (ms)** | **90% latency (ms)** | **99% latency (ms)** | **Avg response time (ms)** | **Max response time (ms)** |
    |:-----------:|:--------:|:--------------------:|:--------------------:|:--------------------:|:--------------------:|:--------------:|:--------------:|
    | 600 concurrency  | 18640.47 | 15.77            | 24.77            | 38.26            | 80.31            | 20.32      | 852.06     |
    | 800 concurrency  | 18723.44 | 18.12            | 28.69            | 44.96            | 95.3             | 23.52      | 765.26     |
    | 1000 concurrency | 18928.99 | 19.99            | 31.42            | 49.09            | 108.84           | 25.93      | 1040       |
    | 1200 concurrency | 18965.37 | 22.10            | 34.62            | 54.48            | 122.31           | 28.66      | 1075       |

### Screenshot of Benchmark Test Result

- `Direct` access to back-end services

    <img src="/img/shenyu/benchmark-test/origin/1.png" width="100%" height="100%" />

- Access to back-end services via `NettyClient`
    - 600 concurrency

    <img src="/img/shenyu/benchmark-test/netty/600-currency/8-thread/1-netty-cache-selector.png" width="100%" height="100%" />
    <img src="/img/shenyu/benchmark-test/netty/600-currency/8-thread/2-netty-cache-selector.png" width="100%" height="100%" />
    <img src="/img/shenyu/benchmark-test/netty/600-currency/8-thread/3-netty-cache-selector.png" width="100%" height="100%" />

    - 800 concurrency

    <img src="/img/shenyu/benchmark-test/netty/800-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
    <img src="/img/shenyu/benchmark-test/netty/800-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />
    <img src="/img/shenyu/benchmark-test/netty/800-currency/8-thread/3-netty-cache-selector.jpg" width="100%" height="100%" />        

    - 1000 concurrency

    <img src="/img/shenyu/benchmark-test/netty/1000-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
    <img src="/img/shenyu/benchmark-test/netty/1000-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />
    <img src="/img/shenyu/benchmark-test/netty/1000-currency/8-thread/3-netty-cache-selector.jpg" width="100%" height="100%" />

    - 1200 concurrency

    <img src="/img/shenyu/benchmark-test/netty/1200-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
    <img src="/img/shenyu/benchmark-test/netty/1200-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />
    <img src="/img/shenyu/benchmark-test/netty/1200-currency/8-thread/3-netty-cache-selector.jpg" width="100%" height="100%" />

- Access to back-end services via `HttpClient`
    - 600 concurrency

    <img src="/img/shenyu/benchmark-test/http/600-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
    <img src="/img/shenyu/benchmark-test/http/600-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />
    <img src="/img/shenyu/benchmark-test/http/600-currency/8-thread/3-netty-cache-selector.jpg" width="100%" height="100%" />

    - 800 concurrency

    <img src="/img/shenyu/benchmark-test/http/800-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
    <img src="/img/shenyu/benchmark-test/http/800-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />

    - 1000 concurrency

    <img src="/img/shenyu/benchmark-test/http/1000-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
    <img src="/img/shenyu/benchmark-test/http/1000-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />

    - 1200 concurrency

    <img src="/img/shenyu/benchmark-test/http/1200-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
    <img src="/img/shenyu/benchmark-test/http/1200-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />


---
sidebar_position: 8
title: 基准测试报告
keywords: ["test", "benchmark-test"]
description: ShenYu 基准测试报告
---

## 硬件环境

### 后端Mock服务所在服务器:

- CPU: 4核8线程 Intel Cascade Lake @ 3.0GHz 
- RAM: 16G

### 网关节点所在服务器:

- CPU: 4核8线程 Intel Cascade Lake @ 3.0GHz 
- RAM: 16G

测试工具占用资源很少，安装在网关节点服务器。

## ShenYu 版本

- ShenYu Admin: 2.6.0
- ShenYu Bootstrap: 2.6.0

## 测试工具

wrk-4.2.0

## 测试用例说明

### 说明

- 使用 Mock 服务模拟一个平均响应时长 20ms ，响应报文约 2k 的接口
- 每次测试时长 3 分钟
- HTTP 请求端分别使用 `NettyClient` 和 `WebClient` 进行测试
 
### JVM 配置

```
-Xmx 4g 
-Xms 4g 
-Xmn 1g 
-Xss 512k 
-XX: +DisableExplicitGC 
-XX: LargePageSizeInBytes=128m
```

### 公共配置
    
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

### netty 配置

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

### webClient 配置：

```yml
httpclient:
    strategy: webClient # netty
    connectTimeout: 45000 # 45000
    responseTimeout: 3000 # 3000
    readerIdleTime: 3000 # 3000
    writerIdleTime: 3000 # 3000
    allIdleTime: 3000 # 3000
    readTimeout: 3000 # 3000
    writeTimeout: 3000 # 3000
    wiretap: false # false
    keepAlive: false # false
    maxInMemorySize: 1 # 1
    pool:
        type: ELASTIC # ELASTIC
        name: proxy # proxy
        maxConnections: 16 # 16
        acquireTimeout: 45000 # 45000
        maxIdleTime: 3000 # 3000
```

## 基准测试结果

### 直接访问后端测试结果

#### 测试结果

    | **QPS** | **50% latency (ms)** | **75% latency (ms)** | **90% latency (ms)** | **99% latency (ms)** | **平均响应时间(ms)** | **最大响应时间(ms)** |
    |:---------------:|:----------------------:|:----------------------:|:----------------------:|:----------------------:|:----------------:|:----------------:|
    | 28998.20      | 19.81                | 23.78                | 28.26                | 41.24                | 20.92          | 402.90          |

#### 测试截图

<img src="/img/shenyu/benchmark-test/origin/1.png" width="100%" height="100%" />

### netty 测试结果

#### 测试结果

    |         | QPS      | 50% latency (ms) | 75% latency (ms) | 90% latency (ms) | 99% latency (ms) | 平均响应时间(ms) | 最大响应时间(ms) |
    |:---------:|:----------:|:------------------:|:------------------:|:------------------:|:------------------:|:------------:|:------------:|
    | 600  并发 | 20472.95 | 19.37            | 25.36            | 32.89            | 69.92            | 22.09      | 1043.33    |
    | 800  并发 | 20703.55 | 23.57            | 31.32            | 40.11            | 77.28            | 26.11      | 576.47     |
    | 1000 并发 | 20979.91 | 29.21            | 37.86            | 47.23            | 80.91            | 31.20      | 860.55     |
    | 1200 并发 | 21129.88 | 32.45            | 42.40            | 52.68            | 96.10            | 35.06      | 1070       |

#### 测试截图

##### 600 并发

<img src="/img/shenyu/benchmark-test/netty/600-currency/8-thread/1-netty-cache-selector.png" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/netty/600-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/netty/600-currency/8-thread/3-netty-cache-selector.jpg" width="100%" height="100%" />

##### 800 并发

<img src="/img/shenyu/benchmark-test/netty/800-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/netty/800-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/netty/800-currency/8-thread/3-netty-cache-selector.jpg" width="100%" height="100%" />        

##### 1000 并发

<img src="/img/shenyu/benchmark-test/netty/1000-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/netty/1000-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/netty/1000-currency/8-thread/3-netty-cache-selector.jpg" width="100%" height="100%" />

##### 1200 并发

<img src="/img/shenyu/benchmark-test/netty/1200-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/netty/1200-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/netty/1200-currency/8-thread/3-netty-cache-selector.jpg" width="100%" height="100%" />

### webClient 测试结果

#### 测试结果

    |         | QPS      | 50% latency (ms) | 75% latency (ms) | 90% latency (ms) | 99% latency (ms) | 平均响应时间(ms) | 最大响应时间(ms) |
    |:---------:|:----------:|:------------------:|:------------------:|:------------------:|:------------------:|:------------:|:------------:|
    | 600  并发 | 18640.47 | 15.77            | 24.77            | 38.26            | 80.31            | 20.32      | 852.06     |
    | 800  并发 | 18723.44 | 18.12            | 28.69            | 44.96            | 95.3             | 23.52      | 765.26     |
    | 1000 并发 | 18928.99 | 19.99            | 31.42            | 49.09            | 108.84           | 25.93      | 1040       |
    | 1200 并发 | 18965.37 | 22.10            | 34.62            | 54.48            | 122.31           | 28.66      | 1075       |

#### 测试截图

##### 600 并发

<img src="/img/shenyu/benchmark-test/http/600-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/http/600-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/http/600-currency/8-thread/3-netty-cache-selector.jpg" width="100%" height="100%" />

##### 800 并发

<img src="/img/shenyu/benchmark-test/http/800-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/http/800-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />

##### 1000 并发

<img src="/img/shenyu/benchmark-test/http/1000-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/http/1000-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />

##### 1200 并发

<img src="/img/shenyu/benchmark-test/http/1200-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/http/1200-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />        


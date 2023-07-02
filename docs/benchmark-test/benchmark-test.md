---
sidebar_position: 8
title: Benchmark Test Report
keywords: ["test", "benchmark-test"]
description: ShenYu Benchmark Test Report
---

## Hardware

### Back-end Mock Service Server:

- CPU: 4 cores and 8 threads Intel Cascade Lake @ 3.0GHz
- RAM: 16G

### Gateway node server:

- CPU: 4 cores and 8 threads Intel Cascade Lake @ 3.0GHz
- RAM: 16G

The test tool takes up few resources and is installed on the gateway node server.

## ShenYu Version

- ShenYu Admin: 2.6.0
- ShenYu Bootstrap: 2.6.0

## Test Tool

wrk-4.2.0

## Test Case Description

### Instruction

- Use the Mock service to simulate an interface with an average response time of 20ms and about 2k response messages
- Each test lasts 3 minutes
- JDK version: OpenJdk-1.8.0
- The HTTP request side is tested with `NettyClient` and `WebClient` respectively
- Log level is set to `WARN`
- Apache ShenYu Bootstrap deploy mode: standalone
- Apache ShenYu Admin deploy in `Back-end Mock Service Server`

### JVM Configuration

```
-Xmx 4g 
-Xms 4g 
-Xmn 1g 
-Xss 512k 
-XX: +DisableExplicitGC 
-XX: LargePageSizeInBytes=128m
```

### Public Configuration

* application.yml
    
```yml
matchCache:
  selector:
    selectorEnabled: true
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

```yaml
  file:
    enabled: false
    maxSize : 10
```

```yaml
  cross:
    enabled: false
```

```yaml
logging:
  level:
    root: warn
    org.springframework.boot: warn
    org.apache.ibatis: warn
    org.apache.shenyu.bonuspoint: warn
    org.apache.shenyu.lottery: warn
    org.apache.shenyu: warn
```

* logback.xml

```xml
    <root level="WARN">
        <appender-ref ref="ASYNC_STDOUT"/>
        <appender-ref ref="ASYNC_FILE"/>
        <appender-ref ref="ASYNC_ERROR_FILE"/>
    </root>
```

### WebClient Configuration

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

### Netty Client Configuration

```yml
httpclient:
  strategy: netty # netty
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

## Benchmark Test Results

* Direct Access to Back-end Test Result

| **QPS** | **50% latency (ms)** | **75% latency (ms)** | **90% latency (ms)** | **99% latency (ms)** | **平均响应时间(ms)** | **最大响应时间(ms)** |
|:---------------:|:----------------------:|:----------------------:|:----------------------:|:----------------------:|:----------------:|:----------------:|
| 28998.20      | 19.81                | 23.78                | 28.26                | 41.24                | 20.92          | 402.90          |

* netty

|   currency    | QPS      | 50% latency (ms) | 75% latency (ms) | 90% latency (ms) | 99% latency (ms) | 平均响应时间(ms) | 最大响应时间(ms) |
|:-------------:|:----------:|:------------------:|:------------------:|:------------------:|:------------------:|:------------:|:------------:|
| 600  currency | 20472.95 | 19.37            | 25.36            | 32.89            | 69.92            | 22.09      | 1043.33    |
|    800  currency    | 20703.55 | 23.57            | 31.32            | 40.11            | 77.28            | 26.11      | 576.47     |
|    1000 currency    | 20979.91 | 29.21            | 37.86            | 47.23            | 80.91            | 31.20      | 860.55     |
|    1200 currency    | 21129.88 | 32.45            | 42.40            | 52.68            | 96.10            | 35.06      | 1070       |

* webClient

| currency | QPS      | 50% latency (ms) | 75% latency (ms) | 90% latency (ms) | 99% latency (ms) | 平均响应时间(ms) | 最大响应时间(ms) |
|:--------:|:----------:|:------------------:|:------------------:|:------------------:|:------------------:|:------------:|:------------:|
| 600  currency  | 18640.47 | 15.77            | 24.77            | 38.26            | 80.31            | 20.32      | 852.06     |
| 800  currency  | 18723.44 | 18.12            | 28.69            | 44.96            | 95.3             | 23.52      | 765.26     |
| 1000 currency  | 18928.99 | 19.99            | 31.42            | 49.09            | 108.84           | 25.93      | 1040       |
| 1200 currency  | 18965.37 | 22.10            | 34.62            | 54.48            | 122.31           | 28.66      | 1075       |

### Direct Access to Back-end Test Result

#### Test Result

| **QPS** | **50% latency (ms)** | **75% latency (ms)** | **90% latency (ms)** | **99% latency (ms)** | **Avg response time (ms)** | **Max response time (ms)** |
|:---------------:|:----------------------:|:----------------------:|:----------------------:|:----------------------:|:----------------:|:----------------:|
| 28998.20      | 19.81                | 23.78                | 28.26                | 41.24                | 20.92          | 402.90          |

#### Screenshot of Test Result

<img src="/img/shenyu/benchmark-test/origin/1.png" width="100%" height="100%" />

### Access to Back-end Services via NettyClient Test Result

##### Test Result

| currency  | **QPS**  | **50% latency (ms)** | **75% latency (ms)** | **90% latency (ms)** | **99% latency (ms)** | **Avg response time (ms)** | **Max response time (ms)** |
|:-----------:|:--------:|:--------------------:|:--------------------:|:--------------------:|:--------------------:|:--------------:|:--------------:|
| 600 concurrency  | 20472.95 | 19.37            | 25.36            | 32.89            | 69.92            | 22.09      | 1043.33    |
| 800 concurrency  | 20703.55 | 23.57            | 31.32            | 40.11            | 77.28            | 26.11      | 576.47     |
| 1000 concurrency | 20979.91 | 29.21            | 37.86            | 47.23            | 80.91            | 31.20      | 860.55     |
| 1200 concurrency | 21129.88 | 32.45            | 42.40            | 52.68            | 96.10            | 35.06      | 1070       |

#### Screenshot of Test Result

##### 600 concurrency

<img src="/img/shenyu/benchmark-test/netty/600-currency/8-thread/1-netty-cache-selector.png" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/netty/600-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/netty/600-currency/8-thread/3-netty-cache-selector.jpg" width="100%" height="100%" />

##### 800 concurrency

<img src="/img/shenyu/benchmark-test/netty/800-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/netty/800-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/netty/800-currency/8-thread/3-netty-cache-selector.jpg" width="100%" height="100%" />        

##### 1000 concurrency

<img src="/img/shenyu/benchmark-test/netty/1000-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/netty/1000-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/netty/1000-currency/8-thread/3-netty-cache-selector.jpg" width="100%" height="100%" />

##### 1200 concurrency

<img src="/img/shenyu/benchmark-test/netty/1200-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/netty/1200-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/netty/1200-currency/8-thread/3-netty-cache-selector.jpg" width="100%" height="100%" />

### Access to Back-end Services via WebClient Test Result

#### Test Result

| currency  | **QPS**  | **50% latency (ms)** | **75% latency (ms)** | **90% latency (ms)** | **99% latency (ms)** | **Avg response time (ms)** | **Max response time (ms)** |
|:-----------:|:--------:|:--------------------:|:--------------------:|:--------------------:|:--------------------:|:--------------:|:--------------:|
| 600 concurrency  | 18640.47 | 15.77            | 24.77            | 38.26            | 80.31            | 20.32      | 852.06     |
| 800 concurrency  | 18723.44 | 18.12            | 28.69            | 44.96            | 95.3             | 23.52      | 765.26     |
| 1000 concurrency | 18928.99 | 19.99            | 31.42            | 49.09            | 108.84           | 25.93      | 1040       |
| 1200 concurrency | 18965.37 | 22.10            | 34.62            | 54.48            | 122.31           | 28.66      | 1075       |

#### Screenshot of Test Result

##### 600 concurrency

<img src="/img/shenyu/benchmark-test/http/600-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/http/600-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/http/600-currency/8-thread/3-netty-cache-selector.jpg" width="100%" height="100%" />

##### 800 concurrency

<img src="/img/shenyu/benchmark-test/http/800-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/http/800-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />

##### 1000 concurrency

<img src="/img/shenyu/benchmark-test/http/1000-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/http/1000-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />

##### 1200 concurrency

<img src="/img/shenyu/benchmark-test/http/1200-currency/8-thread/1-netty-cache-selector.jpg" width="100%" height="100%" />
<img src="/img/shenyu/benchmark-test/http/1200-currency/8-thread/2-netty-cache-selector.jpg" width="100%" height="100%" />


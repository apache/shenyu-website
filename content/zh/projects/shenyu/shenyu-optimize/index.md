---
title: ShenYu 性能优化
keywords: Apache ShenYu
description: ShenYu 性能优化
---

## 说明

* 本文主要介绍如何对 `Apache ShenYu` 进行优化。


## 本身消耗

* `Apache ShenYu`本身所有的操作，都是基于 `JVM` 内存来匹配，本身消耗时间大概在 `1-3ms` 左右。

## 底层Netty调优

* `Apache ShenYu`内置依赖 `spring-webflux` 而其底层是使用的 `netty` 。

* 我们可以自定义 `netty` 的相关参数来对 `Apache ShenYu` 进行优化，以下是示例：

```java
   @Bean
    public NettyReactiveWebServerFactory nettyReactiveWebServerFactory() {
        NettyReactiveWebServerFactory webServerFactory = new NettyReactiveWebServerFactory();
        webServerFactory.addServerCustomizers(new EventLoopNettyCustomizer());
        return webServerFactory;
    }

    private static class EventLoopNettyCustomizer implements NettyServerCustomizer {

        @Override
        public HttpServer apply(final HttpServer httpServer) {
            return httpServer
                    .tcpConfiguration(tcpServer -> tcpServer
                            .runOn(LoopResources.create("shenyu-netty", 1, DEFAULT_IO_WORKER_COUNT, true), false)
                            .selectorOption(ChannelOption.SO_REUSEADDR, true)
                            .selectorOption(ChannelOption.ALLOCATOR, PooledByteBufAllocator.DEFAULT)
                            .option(ChannelOption.TCP_NODELAY, true)
                            .option(ChannelOption.ALLOCATOR, PooledByteBufAllocator.DEFAULT));
        }
    }
```

* 这个类在 `shenyu-bootstrap` 中已经内置，在压测的时候，可以根据自己的需求来进行优化设置。

* 业务线程模型，请参考：[线程模型](../thread) 。









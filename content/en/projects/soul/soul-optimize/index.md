---
title: Soul Optimize
keywords: soul
description: performance optimization for soul
---

## Description

* This doc shows how to do performance optimization for soul.

## Time Consumption

* Soul is JVM driven and processing time for a single request is nearly between `1-3` ms.

## Netty Optimization

* `spring-webflux` is one of dependencies of soul, and it uses Netty in lower layer.
* The demo down below demonstrates tuning soul by customizing params in Netty.

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
                        .runOn(LoopResources.create("soul-netty", 1, DEFAULT_IO_WORKER_COUNT, true), false)
                        .selectorOption(ChannelOption.SO_REUSEADDR, true)
                        .selectorOption(ChannelOption.ALLOCATOR, PooledByteBufAllocator.DEFAULT)
                        .option(ChannelOption.TCP_NODELAY, true)
                        .option(ChannelOption.ALLOCATOR, PooledByteBufAllocator.DEFAULT));
    }
}
```

* Soul-bootstrap offers this class, you may modify it when benchmarking your app if necessary.
* You can get references of business thread model from [thread model](../thread)

---
title: Fetching Correct IP Address And Host
keywords: ShenYu
description: Fetching correct IP address and host
---

## Description

* This doc demonstrates how to get correct IP address and host when ShenYu serves behind nginx reverse proxy.
* After fetched real IP and host, you can match them with plugins and selectors.

## Default Implementation

*  The embedded implementation in ShenYu is :`org.dromara.shenyu.web.forwarde.ForwardedRemoteAddressResolver`。

*  You need to config `X-Forwarded-For` in `nginx` first to get correct IP address and host.


## Implement through a Plugin

* Declare a new class named "A" and implements `org.dromara.shenyu.plugin.api.RemoteAddressResolver`.

```java
public interface RemoteAddressResolver {

    /**
     * Resolve inet socket address.
     *
     * @param exchange the exchange
     * @return the inet socket address
     */
    default InetSocketAddress resolve(ServerWebExchange exchange) {
        return exchange.getRequest().getRemoteAddress();
    }

}
```

* Register defined class as a Spring Bean.

```java
   @Bean
   public SignService a() {
         return new A
   }
```






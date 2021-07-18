---
title: 正确获取IP与Host
keywords: ShenYu
description: 正确获取Ip与host
---

## 说明

* 本文是说明，如果网关前面有一层`nginx` 的时候，如何获取正确的`ip`与端口。
* 获取正确的之后，在插件以及选择器中，可以根据 `ip`，与`host`来进行匹配。

## 默认实现

* 在 `ShenYu` 网关自带实现为：`org.apache.shenyu.web.forward.ForwardedRemoteAddressResolver`。

* 它需要你在 `nginx` 设置 `X-Forwarded-For`，以便来获取正确的 `ip` 与 `host`。


## 扩展实现

* 新增一个类 `CustomRemoteAddressResolver`，实现`org.apache.shenyu.plugin.api.RemoteAddressResolver`

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

* 把你新增的实现类注册成为spring的bean，如下

```java
   @Bean
   public SignService customRemoteAddressResolver() {
         return new CustomRemoteAddressResolver();
   }
```






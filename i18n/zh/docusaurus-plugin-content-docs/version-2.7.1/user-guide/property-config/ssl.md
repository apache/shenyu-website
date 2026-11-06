---
title: 网关 SSL 配置
keywords: ["配置"]
description: 网关 SSL 配置
---

本文介绍如何配置 SSL 以及用户经常遇到的有关 SSL 配置的问题。

### 问题

`ShenYu` 是通过 tomcat 接收报文，但是实际转发是通过自身插件实现的转发。

所以配置 tomcat 的 SSL 是无法实现全链路进行 SSL 转发，只需要配置 `webClientPlugin` 便能实现全链路进行 SSL 转发。

### 属性配置

以 p12 证书为例。

```yaml
shenyu:
  httpclient:
    ssl:
      useInsecureTrustManager: false
      keyStoreType: PKCS12
      keyStorePath: classpath:keystore.p12
      keyStorePassword: 123456
      keyPassword: 123456
```

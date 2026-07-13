---
title: Gateway SSL Config
keywords: ["Config"]
description: Gateway SSL Config
---

This article explains how to configure SSL and the questions users often have about SSL configuration.

### question

`ShenYu` receives messages through tomcat, but the actual forwarding is achieved through its own plug-in.

Therefore, configuring tomcat's SSL cannot achieve full-link SSL forwarding. You only need to configure `webClientPlugin` to achieve full-link SSL forwarding.

### Property Config

Take the p12 certificate as an example.

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

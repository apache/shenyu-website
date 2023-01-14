---
title: Custom Sign Algorithm
keywords: ["Custom Sign"]
description: specify sign plugins for examination
---

## Description

* Users can customize the signature authentication algorithm to achieve verification.

## Extension

* The default implementation is `org.apache.shenyu.plugin.sign.service.ComposableSignService`.
    ```java
    @Bean
    @ConditionalOnMissingBean(value = SignService.class, search = SearchStrategy.ALL)
    public SignService signService() {
        return new ComposableSignService(new DefaultExtractor(), new DefaultSignProvider());
    }
    ```
* Declare a new class named `CustomSignService` and implements  `org.apache.shenyu.plugin.plugin.sign.service`.

```java
public interface SignService {

    /**
     * Gets verifyResult.
     * @param exchange exchange
     * @param requestBody requestBody
     * @return result
     */
    VerifyResult signatureVerify(ServerWebExchange exchange, String requestBody);

    /**
     * Gets verifyResult.
     * @param exchange exchange
     * @return result
     */
    VerifyResult signatureVerify(ServerWebExchange exchange);
}


```

* When returning is `isSuccess()` of VerifyResult, the sign verification passes. If there's false, the `getReason()` of VerifyResult will be return to the frontend to show.
* Register defined class as a Spring Bean.

```java
   @Bean
   public SignService customSignService() {
         return new CustomSignService();
   }
```
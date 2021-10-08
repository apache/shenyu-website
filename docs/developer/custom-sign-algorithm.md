---
title: Custom Sign Algorithm
keywords: ["Custom Sign"]
description: specify sign plugins for examination
---

## Description

* Users can customize the signature authentication algorithm to achieve verification.

## Extension

* The default implementation is `org.apache.shenyu.plugin.sign.service.DefaultSignService`.
* Declare a new class named `CustomSignService` and implements  `org.apache.shenyu.plugin.sign.api.SignService`.

```java
 public interface SignService {
 
     /**
      * Sign verify pair.
      *
      * @param exchange   the exchange
      * @return the pair
      */
     Pair<Boolean, String> signVerify(ServerWebExchange exchange);
 }

```

* When returning true in Pair, the sign verification passes. If there's false, the String in Pair will be return to the frontend to show.
* Register defined class as a Spring Bean.

```java
   @Bean
   public SignService customSignService() {
         return new CustomSignService();
   }
```

# Others

> If you only want to modify the signature algorithm, refer to the following.

- The default implementation of the signature algorithm is `org.apache.shenyu.common.utils.SignUtils#generateSign`.
-  Declare a new class named `CustomSignProvider` and implements  `org.apache.shenyu.plugin.sign.api.SignProvider`.

```java
/**
 * The Sign plugin sign provider.
 */
public interface SignProvider {

    /**
     * acquired sign.
     *
     * @param signKey sign key
     * @param params  params
     * @return sign
     */
    String generateSign(String signKey, Map<String, String> params);
}
```

- Put `CustomSignProvider` to `Spring IoC`

```java
@Bean
public SignProvider customSignProvider() {
    return new CustomSignProvider();
}
```


---
title: specify sign plugins for examination
keywords: soul
description: specify sign plugins for examination
---


## description

* Users can customize the signature authentication algorithm to achieve verification.

###  extension

*  The default implementation is `org.dromara.soul.plugin.sign.service.DefaultSignService`。

*  Declare a new class named "A" and implements  `org.dromara.soul.plugin.api.SignService`。

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

* When returning ture in Pair, the sign verification passes. If there's false, the String in Pair will be return to the frontend to show.

* Register defined class as a Spring Bean.

```java
   @Bean
   public SignService a() {
         return new A
   }
```




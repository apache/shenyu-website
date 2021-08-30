---
title: 自定义sign插件检验算法
description: 自定义sign插件检验
---


## 说明

* 用户可以自定义签名认证算法来实现验证。

## 扩展

*  默认的实现为 `org.apache.shenyu.plugin.sign.service.DefaultSignService`。

*  新增一个类 `CustomSignService` 实现  `org.apache.shenyu.plugin.api.SignService`。

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

* `Pair`中返回`true`，表示验证通过，为`false`的时候，会把`String`中的信息输出到前端。

* 把新增的实现类注册成为`Spring`的`bean`，如下

```java
   @Bean
public SignService customSignService() {
        return new CustomSignService();
        }
```




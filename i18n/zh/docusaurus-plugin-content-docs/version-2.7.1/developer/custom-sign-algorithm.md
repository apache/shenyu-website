---
title: 自定义sign插件检验算法
description: 自定义sign插件检验
---


## 说明

* 用户可以自定义签名认证算法来实现验证。

## 扩展

* 默认的实现为 `org.apache.shenyu.plugin.sign.service.ComposableSignService`。

  ```java
  @Bean
  @ConditionalOnMissingBean(value = SignService.class, search = SearchStrategy.ALL)
  public SignService signService() {
      return new ComposableSignService(new DefaultExtractor(), new DefaultSignProvider());
  }
  ```

  

* 新增一个类 `CustomSignService` 实现  `org.apache.shenyu.plugin.sign.api.SignService`。

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

* `VerifyResult`中`isSuccess()`返回`true`，表示验证通过，为`false`的时候，会把`getReason()`中的信息输出到前端。

* 把新增的实现类注册成为`Spring`的`bean`，如下

```java
@Bean
public SignService customSignService() {
    return new CustomSignService();
}
```

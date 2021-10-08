---
title: 自定义sign插件检验算法
description: 自定义sign插件检验
---


## 说明

* 用户可以自定义签名认证算法来实现验证。

## 扩展

* 默认的实现为 `org.apache.shenyu.plugin.sign.service.DefaultSignService`。

* 新增一个类 `CustomSignService` 实现  `org.apache.shenyu.plugin.sign.api.SignService`。

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

## 其他扩展

> 当你只希望修改签名算法时可以参考如下。

* 签名算法，默认使用的 `org.apache.shenyu.common.utils.SignUtils#generateSign`，还可以新增一个类 `CustomSignProvider` 实现 `org.apache.shenyu.plugin.sign.api.SignProvider`.

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

* 把新增的实现类 `CustomSignProvider` 注入到`Spring IoC`即可，如下

```java
@Bean
public SignProvider customSignProvider() {
    return new CustomSignProvider();
}
```

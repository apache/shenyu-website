---
title: "ShenYu网关学习Sign插件"
author: "唐甜"
description: "ShenYu网关学习Sign插件"
categories: "ShenYu"
tags: ["ShenYu"]
date: 2021-01-29
cover: "/img/architecture/shenyu-framework.png"
---


## 介绍
sign插件用来对请求进行签名认证的插件
## AK/SK 介绍
AK/SK（Access Key ID/Secret Access Key）即访问密钥，包含访问密钥ID（AK）和秘密访问密钥（SK）两部分，主要用于对用户的调用行为进行鉴权和认证。
## 插件使用-以（/dubbo/findAll）为例
### 在SoulBootstrap的 pom.xml 文件中添加 `sign` 的支持
```xml
  <!-- soul sign plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>soul-spring-boot-starter-plugin-sign</artifactId>
     <version>${last.version}</version>
  </dependency>
  <!-- soul sign plugin end-->
```
### 新增appKey，secretKey
![image.png](/img/shenyu/blog4/01.png)
![image.png](/img/shenyu/blog4/02.png)
![image.png](/img/shenyu/blog4/03.png)
![image.png](/img/shenyu/blog4/04.png)
## 配置选择器和规则器
添加选择器
![image.png](/img/shenyu/blog4/05.png)
添加规则器
![image.png](/img/shenyu/blog4/06.png)


### 增加获取鉴权服务
在自己服务中增加一个对外访问的方法
```java
    @GetMapping("/authUrl")
    public String authUrl() {
        Map<String, String> map = Maps.newHashMapWithExpectedSize(2);
        //timestamp为毫秒数的字符串形式 String.valueOf(LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli())
        String timetamp = String.valueOf(LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli()) ;
        System.out.println(timetamp);
        map.put("timestamp",timetamp);  //值应该为毫秒数的字符串形式
        map.put("path", "/dubbo/findAll");
        map.put("version", "1.0.0");
        List<String> storedKeys = Arrays.stream(map.keySet()
                .toArray(new String[]{}))
                .sorted(Comparator.naturalOrder())
                .collect(Collectors.toList());
        final String sign = storedKeys.stream()
                .map(key -> String.join("", key, map.get(key)))
                .collect(Collectors.joining()).trim()
                .concat("D19CF79F647A465AB9C5C66F430CAD28");//SECRETkey
        return DigestUtils.md5DigestAsHex(sign.getBytes()).toUpperCase();
    }

```


下面需要注意的
![image.png](/img/shenyu/blog4/07.png)
### 在网关中增加鉴权头信息
![image.png](/img/shenyu/blog4/08.png)
### 请求的结果演示
通过的返回
![image.png](/img/shenyu/blog4/09.png)
5min超时的返回
![image.png](/img/shenyu/blog4/10.png)
appKey填写错误的返回
![image.png](/img/shenyu/blog4/11.png)
签名错误的返回
![image.png](/img/shenyu/blog4/12.png)
禁用sign插件的返回
![image.png](/img/shenyu/blog4/13.png)
## sign插件的实现分析
### java中Pair
简单的说就是pair保存的是一对key value，而map可以保存多对key value。
SignPlugin插件调用DefaultSignService中signVerify方法
判断sign 插件是否可用，如果可用获取在global 插件存入的soulContext并调用verify方法
```java
if (signData != null && signData.getEnabled()) {
  final SoulContext soulContext = exchange.getAttribute(Constants.CONTEXT);
  assert soulContext != null;
  return verify(soulContext, exchange);
}
```
verify方法中
判断请求头信息是否正确
如果不正确就抛出 log.error("sign parameters are incomplete,{}", soulContext)异常
```java
if (StringUtils.isBlank(soulContext.getAppKey())
    || StringUtils.isBlank(soulContext.getSign())
    || StringUtils.isBlank(soulContext.getTimestamp())) {
  log.error("sign parameters are incomplete,{}", soulContext);
  return Pair.of(Boolean.FALSE, Constants.SIGN_PARAMS_ERROR);
}
```
判断请求时间是否超时
```java
    if (between > delay) {
            return Pair.of(Boolean.FALSE, String.format(SoulResultEnum.SING_TIME_IS_TIMEOUT.getMsg(), delay));
        }
```
没有超时继续调用sign方法
获取认证数据，这个数据在soulAdmin 中配置
```java
AppAuthData appAuthData = SignAuthDataCache.getInstance().obtainAuthData(soulContext.getAppKey());
```
后面对appAuthData数据进行判断，数据有错误就不通过
对获取的参数再次签名，判断传入的和再次签名的是否一样
```java
String sigKey = SignUtils.generateSign(appAuthData.getAppSecret(), buildParamsMap(soulContext));
```
如果都校验都通过就完成认证 访问请求。

---

title: JWT插件
keywords: ["JWT"]
description: JWT插件
----------------

# 1.概述

## 1.1 插件名称

* `jwt` 插件

## 1.2 适用场景

* 需要在网关统一鉴权。


## 1.3 插件功能

* `jwt` 插件，是针对 `http` 请求头的 `token`属性或者是 `authorization` 属性携带值进行鉴权判断，兼容 `OAuth2.0` 。

## 1.4 插件代码

* 核心模块为 `shenyu-plugin-jwt`.
* 核心类为 `org.apache.shenyu.plugin.jwt.JwtPlugin`.

## 1.5 添加自哪个ShenYu版本

* 自从 ShenYu 2.4.0

# 2.如何使用插件

## 2.1 插件使用流程图

![](/img/shenyu/plugin/plugin_use_zh.jpg)

## 2.2 导入pom

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-jwt</artifactId>
    <version>${project.version}</version>
</dependency>
```

## 2.3 启用插件

- 在 `shenyu-admin` 基础配置 --> 插件管理 --> `jwt` ，设置为开启。

## 2.4 配置插件

### 2.4.1 Config plugin in ShenYu-Admin

* 在ShenYu-Admin配置jwt插件的私钥，该私钥必须大于256位 。
* `secretKey` : 该私钥为使用jwt时生成token，并且他是必须的。

![](/img/shenyu/plugin/jwt/jwt-plugin-config-zh.jpg)

### 2.4.2 Selector config

* 插件选择器和规则的配置请查看: [插件和规则配置](../../user-guide/admin-usage/selector-and-rule.md).

### 2.4.3 Rule Config

![](/img/shenyu/plugin/jwt/jwt-plugin-rule-handle-zh.jpg)

* convert是jwt的转化
* jwtVal: jwt 请求体的名称
* headerVal: jwt请求头的名称

## 2.5 示例

### 2.5.1 使用jwt插件进行权限认证

#### 2.5.1.1 配置jwt插件

![](/img/shenyu/plugin/jwt/jwt-plugin-config-zh.jpg)

#### 2.5.1.2 配置选择器

![](/img/shenyu/plugin/jwt/jwt-plugin-selector-config-zh.jpg)

#### 2.5.1.3 配置规则

![](/img/shenyu/plugin/jwt/jwt-plugin-rule-handle-zh.jpg)

#### 2.5.1.4 在网页中生成jwt token

* 在你的浏览器中打开 `https://jwt.io/` ， 并且填充对应的参数 。
* 在 `https://jwt.io/` 的页面配置jwt请求头。
* 在 `https://jwt.io/` 的页面配置jwt参数体。
* 在 `https://jwt.io/` 的页面配置jwt签名参数。

![](/img/shenyu/plugin/jwt/jwt-web.jpg)

#### 2.5.1.5 使用Java代码生成jwt token

```java
public final class JwtPluginTest {
    
  public void generateJwtCode() {
    final String secreteKey = "shenyu-test-shenyu-test-shenyu-test";
    Map<String, String> map = new HashMap<>();
    map.put("id", "1");
    map.put("name", "xiaoming");
    Date date = new Date();
    date.setTime(1655524800000L);
    String token = Jwts.builder()
            .setIssuedAt(date)
            .setExpiration(new Date())
            .setClaims(map)
            .signWith(Keys.hmacShaKeyFor(secreteKey.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS256)
            .compact();
    System.out.println(token);
  }
}
```

#### 2.5.1.6 请求服务

##### 2.5.1.6.1 使用token方式请求服务

* 在你的请求头中附带 `token: eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoieGlhb21pbmciLCJpZCI6IjEifQ.LdRzGlB49alhq204chwF7pf3C0z8ZpuowPvoQdJmSRw` 字段并发起请求。

##### 2.5.1.6.2 使用认证方式请求服务

* 在你的请求头中附带 `Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoieGlhb21pbmciLCJpZCI6IjEifQ.LdRzGlB49alhq204chwF7pf3C0z8ZpuowPvoQdJmSRw` 并发起请求。

#### 2.5.1.7 验证请求结果

* 错误的签名

```
{
  "code": 401,
  "message": "Illegal authorization"
}
```

* 正确的签名

```
{
  "id": "123",
  "name": "hello world save order"
}
```

# 3.如何禁用插件

* 在 `shenyu-admin` 基础配置 --> 插件管理 --> `jwt` ，设置为关闭。

![](/img/shenyu/plugin/jwt/jwt-plugin-close_zh.jpg)

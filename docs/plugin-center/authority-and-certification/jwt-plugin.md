---

title: JWT plugin
keywords: ["JWT"]
description: JWT plugin
----------------------

# 1. Overview

## 1.1 Plugin Name
* `jwt` plugin

## 1.2 Appropriate Scenario
* Requires unified authentication by jwt at the gateway.


## 1.3 Plugin functionality
* The `jwt` plug-in is for the `token` attribute or `authorization` of the http request header to carry the attribute value for authentication judgment and judge `OAuth2.0` .

## 1.4 Plugin code
* Core module is ```shenyu-plugin-jwt```.
* * Core class is ```org.apache.shenyu.plugin.jwt.JwtPlugin```.

## 1.5 Added Since Which shenyu version
* Since ShenYu 2.4.0


# 2.How to use plugin

## 2.1 Plugin-use procedure chart
// pic

## 2.2 Import pom
```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-jwt</artifactId>
    <version>${project.version}</version>
</dependency>
```

## 2.3 Enable plugin
- In shenyu-admin --> BasicConfig --> Plugin --> jwt set Status enable.

## 2.4 Config plugin

### 2.4.1 Config plugin in ShenYu-Admin

* Config secretKey of jwt-plugin in shenyu-admin, the secretKey must more than 256 bit.
* `secretKey`: The private key when using `jwt` to generate `token`, it is required.

![](/img/shenyu/plugin/jwt/jwt-plugin-config-en.jpg)

### 2.4.2 Selector config

* Selector and rule Config. Please refer: [Selector and rule config](../../user-guide/admin-usage/selector-and-rule.md).

### 2.4.3 Rule Config

![](/img/shenyu/plugin/jwt/jwt-plugin-rule-handle-en.jpg)

* convert means jwt converter
* jwtVal: jwt of body name
* headerVal: jwt header name

## 2.5 Examples

### 2.5.1 Use jwt token for authentication judgment

#### 2.5.1.1 Config jwt-plugin

![](/img/shenyu/plugin/jwt/jwt-plugin-config-en.jpg)

#### 2.5.1.2 Config selector match service

![](/img/shenyu/plugin/jwt/jwt-plugin-selector-config-en.jpg)

#### 2.5.1.3 Config rule match service

![](/img/shenyu/plugin/jwt/jwt-plugin-rule-handle-en.jpg)

#### 2.5.1.4 Generate json web token(jwt) with website

* You can open `https://jwt.io/` in your browser and fill in the corresponding parameters.
* Config jwt header `HEADER` in `https://jwt.io/`
* Config jwt body `PAYLOAD` in `https://jwt.io/` 
* Config jwt signature `VERIFY SIGNATURE` in `https://jwt.io/`

#### 2.5.1.5 Generate json web token(jwt) with java code

```java
public final class JwtPluginTest {

  public void generateJwtCode() {
    final String secreteKey = "shenyu-test-shenyu-test-shenyu-test";
    Map<String, Object> map = new HashMap<>();
    map.put("userId", 1);
    Map<String, Object> multi = new HashMap<>();
    multi.put("shenyu", "1.2.3");
    map.put("web", multi);
    Date date = new Date();
    date.setTime(1636371125000L);
    String token = Jwts.builder()
            .setIssuedAt(date)
            .setExpiration(new Date())
            .setClaims(map)
            .signWith(Keys.hmacShaKeyFor(secreteKey.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS256)
            .compact();
  }
}
```

#### 2.5.1.6 Request with json web token(jwt)
#### 2.5.1.7 Validate request result
* error token request result
* normal token request result
### 2.5.2 Use authorization for authentication judgment
#### 2.5.2.1 Config jwt-plugin
#### 2.5.2.2 Config selector match service
#### 2.5.2.3 Config rule match service
#### 2.5.2.4 Generate authorization code
#### 2.5.2.5 Request with authorization code
#### 2.5.2.6 Validate request result



## Description

* The `jwt` plug-in is for the `token` attribute or `authorization` of the http request header to carry the attribute value for authentication judgment and judge `OAuth2.0` .

## Plugin Setting

Please refer to the `deployment` document, choose a way to start `shenyu-admin`. For example, through [Local Deployment](../../deployment/deployment-local) to start the `Apache ShenYu` management system .

* In `shenyu-admin` BasicConfig --> plugin -> `jwt` set to enable. If you don't want to use this function, please disable this plugin in the `shenyu-admin`.

  <img src="/img/shenyu/plugin/jwt/jwt_open_en.jpg" width="80%" height="80%" />

* Add configuration mode in plugin editing.

  * `{"secretKey":"","filterPath":[]}`

  * `secretKey`: The private key when using `jwt` to generate `token`, it is required.

  * `filterPath`：Authentication whitelist list, fill in the API path of the request interface.

  * e.g. `http://127.0.0.1:8080/cloud/shenyu` , filterPath just add `/cloud/shenyu`.

## Plugin Use

* Add support for `jwt` in the `pom.xml` file of the gateway.

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-jwt</artifactId>
    <version>${project.version}</version>
</dependency>
```

* For more instructions on selector and rule configuration, please refer to: [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule).

## Situation

* Requires unified authentication at the gateway.



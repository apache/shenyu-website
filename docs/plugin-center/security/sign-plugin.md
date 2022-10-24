---
title: Sign Plugin
keywords: ["sign"]
description: sign plugin
---


# 1. Overview

## 1.1 Plugin Name

* Sign Plugin

## 1.2 Appropriate Scenario

* Support http header to authorize
* Support http header and request body to authorize

## 1.3 Plugin functionality

* Process signature authentication of requests.

## 1.4 Plugin code

* Core Module: `shenyu-plugin-sign`

* Core Class: `org.apache.shenyu.plugin.sign.SignPlugin`

## 1.5 Added Since Which shenyu version

* Since ShenYu 2.4.0

# 2. How to use plugin

## 2.1 Plugin-use procedure chart

![](/img/shenyu/plugin/plugin_use_en.jpg)

## 2.2 Import pom

* Introducing `sign` dependency in the `pom.xml` file of the gateway

```xml
<!-- apache shenyu sign plugin start-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-sign</artifactId>
  <version>${project.version}</version>
</dependency>
<!-- apache shenyu sign plugin end-->
```

## 2.3 Enable plugin

* In `shenyu-admin`--> BasicConfig --> Plugin --> `sign` set to enable.

## 2.4 Config Plugin With Authorize

### 2.4.1 AK/SK Config

#### 2.4.1.1 Explanation

- Manage and control the permissions of requests passing through the Apache ShenYu gateway.
- Generate `AK/SK` and use it with the `Sign` plugin to achieve precise authority control based on URI level.

#### 2.4.1.2 Tutorial

First, we can add a piece of authentication information in `BasicConfig` - `Authentication`

<img src="/img/shenyu/basicConfig/authorityManagement/auth_manages_add_en.jpg" width="100%" height="70%" />

Then configure this authentication information

<img src="/img/shenyu/basicConfig/authorityManagement/auth_param_en.jpg" width="50%" height="40%"/>

- AppName：The application name associated with this account, it can can fill in or choose (data comes from the application name configured in the Metadata).
- TelPhone：Telphone information.
- AppParams：When the requested context path is the same as the AppName，add this value to the header, the key is `appParam`.
- UserId：Give the user a name, just as an information record.
- ExpandInfo：Description of the account.
- PathAuth：After opening, the account only allows access to the resource path configured below.
- ResourcePath：Allow access to the resource path, support path matching，e.g. `/order/**` .

After submit, a piece of authentication information is generated, which contains `AppKey` and `AppSecret`, which is the `AK/SK` in the `Sign` plugin.

Please refer to the detailed instructions of the `Sign` plugin： [Sign Plugin](../../plugin-center/authority-and-certification/sign-plugin).

#### 2.4.1.3 PathOperation

For the created authentication information, you can click `PathOperation` at the end of a piece of authentication information.

<img src="/img/shenyu/basicConfig/authorityManagement/auth_manage_modifyPath_en.jpg" width="90%" height="80%"/>

- On the left is a list of configurable paths, and on the right is a list of paths that allow the account to access.
- Check the resource path, click the `>` or `<` in the middle to move the checked data to the corresponding list.
- In the list of configurable paths on the left, click "Editor" at the end of the account information line, and add them in the "Resource Path" in the pop-up box.

### 2.4.2 Implementation of Gateway Technology

* Adopt `AK/SK` authentication technical scheme.
* Adopt authentication plug-in and Chain of Responsibility Pattern to realize.
* Take effect when the authentication plugin is enabled and all interfaces are configured for authentication.

### 2.4.3 Authentication Guide

* Step 1: `AK/SK` is assigned by the gateway. For example, the `AK` assigned to you is: `1TEST123456781` SK is: ` 506eeb535cf740d7a755cb49f4a1536'

* Step 2: Decide the gateway path you want to access, such as `/api/service/abc`

* Step 3: Construct parameters (the following are general parameters)

| Field      | Value    |  Description  |
| --------   | --------  | :--------: |
| timestamp  |  current timestamp(String)   |  The number of milliseconds of the current time（gateway will filter requests the before 5 minutes）    |
| path       | /api/service/abc  | The path that you want to request(Modify by yourself according to your configuration of gateway) |
| version       | 1.0.0  |  `1.0.0` is a fixed string value |

Sort the above three field natually according to the key, then splice fields and fields, finally splice SK. The following is a code example.
The above three fields are spliced with field values, and then 'SK' is spliced as the 'extSignKey`. The following is a code example.

#### 2.4.3.1 Generate sign with request header

Step 1: First, construct a `extSignKey`

```java

  //timestamp is string format of millisecond. String.valueOf(LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli())
  String timestamp = "1571711067186"; 
  String path = "/api/service/abc";
  String version = "1.0.0";
  String extSignKey = String.join("", "timestamp", timestamp, "path", path, "version", version, "506EEB535CF740D7A755CB4B9F4A1536");
```

* The returned extSignKey value should be:`timestamp1571711067186path/api/service/abcversion1.0.0506EEB535CF740D7A755CB4B9F4A1536`

Step 2: Md5 encryption and then capitalization.

```java
DigestUtils.md5DigestAsHex(extSignKey.getBytes()).toUpperCase()
```

* The final returned value is: `F6A9EE877F1C017AF60D8F1200517AA5`.

#### 2.4.3.2 Generate sign with request header and request body

Step 1: First, construct a `extSignKey`

```java

  //timestamp is string format of millisecond. String.valueOf(LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli())
  String timestamp = "1571711067186"; 
  String path = "/api/service/abc";
  String version = "1.0.0";
  String extSignKey = String.join("", "timestamp", timestamp, "path", path, "version", version, "506EEB535CF740D7A755CB4B9F4A1536");
```

* The returned extSignKey value should be:`timestamp1571711067186path/api/service/abcversion1.0.0506EEB535CF740D7A755CB4B9F4A1536`

Step 2: Construct a 'Map' named 'jsonMap'. And the 'jsonMap' must store the information of each node of the request body.

```java
  //Skip this step if there is no request body
  Map<String, String> jsonMap = Maps.newHashMapWithExpectedSize(2);
  // if your request body is:{"id":123,"name":"order"}
  jsonMap.put("id", "123");
  jsonMap.put("name", "order");
```

Step 3: Construct a 'Map' named 'queryMap'. And the 'queryMap' must store the information of each node of the uri request parameter.

```java
  //No url request parameter Skip this step
  Map<String, String> queryMap = Maps.newHashMapWithExpectedSize(2);
  // if your request uri is:/api/service/abc?code=10&desc="desc"
  queryMap.put("code", "10");
  queryMap.put("desc", "desc");
```

Step 4: `JsonMap 'and' queryMap 'respectively perform the natural sorting of' Key ', then' Key 'and' Value 'values are spliced to obtain' jsonSign 'and' querySign ', and finally' jsonSign ',' querySign 'and' extSignKey 'are spliced to' sign '.

```java
  Map<String, String> empityMap = new HashMap();
  String jsonSign = Optional.ofNullable(jsonMap).orElse(empityMap).keySet().stream()
          .sorted(Comparator.naturalOrder())
          .map(key -> String.join("", key, jsonMap.get(key)))
          .collect(Collectors.joining()).trim();
  String querySign = Optional.ofNullable(queryMap).orElse(empityMap).keySet().stream()
          .sorted(Comparator.naturalOrder())
          .map(key -> String.join("", key, queryMap.get(key)))
          .collect(Collectors.joining()).trim();
  String sign = String.join("", jsonSign, querySign, signKey);
```

* The returned sign value should be:`id123nameordercode10descdesctimestamp1571711067186path/api/service/abcversion1.0.0506EEB535CF740D7A755CB4B9F4A1536`

Step 5: Md5 encryption and then capitalization.

```java
DigestUtils.md5DigestAsHex(sign.getBytes()).toUpperCase()
```

* The final returned value is: `AC8EB7C4E0DAC57C4FCF8A9C58A3E445`.

### 2.4.4 Request GateWay

* If your visited path is:`/api/service/abc`.

* Address: http: domain name of gateway `/api/service/abc`.

* Set `header`，`header` Parameter：

| Field        | Value    |  Description  |
| --------   | -----:  | :----: |
| timestamp  |   `1571711067186`  |  Timestamp when signing   |
| appKey     | `1TEST123456781`  |  The AK value assigned to you |
| sign       | `AC8EB7C4E0DAC57C4FCF8A9C58A3E445`  | The signature obtained above |
| version       | `1.0.0`  | `1.0.0` is a fixed value. |

* The signature plugin will filter requests before `5` minutes by default

* If the authentication fails, will return code `401`, message may change.

```json
{
  "code": 401,
  "message": "sign is not pass,Please check you sign algorithm!",
  "data": null
}
```

### 2.4.5 Plugin Config

![](/img/shenyu/plugin/sign/sign_open_en.jpg)

### 2.4.6 Selector Config

![](/img/shenyu/plugin/sign/selector-en.png)

* Only those matched requests can be authenticated by signature.

* Selectors and rules, please refer to: [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule)

### 2.4.7 Rule Config

![](/img/shenyu/plugin/sign/rule-en.png)

* close(signRequestBody): generate signature with request header.  
* open(signRequestBody): generate signature with request header and request body.

## 2.5 Examples

### 2.5.1 Verify api with sign plugin

#### 2.5.1.1 Plugin Config

![](/img/shenyu/plugin/sign/sign_open_en.jpg)

#### 2.5.1.2 Selector Config

![](/img/shenyu/plugin/sign/example-selector-en.png)

#### 2.5.1.3 Rule Config

![](/img/shenyu/plugin/sign/example-rule-en.png)

#### 2.5.1.5 Add AppKey/SecretKey

![](/img/shenyu/plugin/sign/example-sign-auth-en.png)

#### 2.5.1.6 Request Service and check result

* build request params with `Authentication Guide`,

```java
public class Test1 {
  public static void main(String[] args) {
    //timestamp is string format of millisecond String.valueOf(LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli())
    String timestamp = "1660658725000";
    String path = "/http/order/save";
    String version = "1.0.0";
    String extSignKey = String.join("", "timestamp", timestamp, "path", path, "version", version, "2D47C325AE5B4A4C926C23FD4395C719");
    
    System.out.println(extSignKey);
    
    System.out.println(DigestUtils.md5DigestAsHex(extSignKey.getBytes()).toUpperCase());
  }
}
```

* signature without body: `timestamp1660658725000path/http/order/saveversion1.0.02D47C325AE5B4A4C926C23FD4395C719`
* sign without body result is: `A2D81371D99DD4ECB0D5EC6298E3C2EB`

![](/img/shenyu/plugin/sign/result.png)

```java
public class Test2 {
  public static void main(String[] args) {
    //timestamp is string format of millisecond String.valueOf(LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli())
    String timestamp = "1660659201000";
    String path = "/http/order/save";
    String version = "1.0.0";
    String extSignKey = String.join("", "timestamp", timestamp, "path", path, "version", version, "2D47C325AE5B4A4C926C23FD4395C719");
    
    Map<String, String> jsonMap = Maps.newHashMapWithExpectedSize(2);
    // if your request body is:{"id":123,"name":"order"}
    jsonMap.put("id", "123");
    jsonMap.put("name", "order");
    
    Map<String, String> queryMap = null;
    /* if you have uri params
    Map<String, String> queryMap = Maps.newHashMapWithExpectedSize(2);
    // if your request uri is:/api/service/abc?code=10&desc="desc"
    queryMap.put("code", "10");
    queryMap.put("desc", "desc");
    */
    Map<String, String> empityMap = new HashMap();
    String jsonSign = Optional.ofNullable(jsonMap).orElse(empityMap).keySet().stream()
          .sorted(Comparator.naturalOrder())
          .map(key -> String.join("", key, jsonMap.get(key)))
          .collect(Collectors.joining()).trim();
          
    String querySign = Optional.ofNullable(queryMap).orElse(empityMap).keySet().stream()
          .sorted(Comparator.naturalOrder())
          .map(key -> String.join("", key, queryMap.get(key)))
          .collect(Collectors.joining()).trim();
    String sign = String.join("", jsonSign, querySign, signKey);    
    
    System.out.println(sign);
    System.out.println(DigestUtils.md5DigestAsHex(sign.getBytes()).toUpperCase());
  }
}
```

*signature with body:`id123nameordertimestamp1660659201000path/http/order/saveversion1.0.02D47C325AE5B4A4C926C23FD4395C719`
*sign with body result is:`BF485842D2C08A3378308BA9992A309F`

![](/img/shenyu/plugin/sign/result-with-body.png)

# 3. How to disable plugin

* In `shenyu-admin`--> BasicConfig --> Plugin --> `sign` set to disabled.

# 4. Extension

* Please refer to: [dev-sign](../../developer/custom-sign-algorithm).

---
title: Sign Plugin
keywords: ["sign"]
description: sign plugin
---

## Description

* `Sign` is a native plugin of `Apache ShenYu` Gateway and is used to process signature authentication of requests.

## Plugin Setting

Please refer to the `deployment` document, choose a way to start `shenyu-admin`. For example, through [Local Deployment](../deployment-local) to start the `Apache ShenYu` management system.

* In `shenyu-admin` BasicConfig --> plugin -> `sign` set to enable. If you don't want to use this function, please disable this plugin in the `shenyu-admin`.

  <img src="/img/shenyu/plugin/sign/sign_open_en.jpg" width="80%" height="80%" />

* ## Plugin Usage

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

* Selectors and rules, please refer to: [Selector And Rule Config](../selector-and-rule).
* Only those matched requests can be authenticated by signature.


## Add AK/SK

* In `shenyu-admin` --> In authentication management, click `Add` to add a new AK/SK。please refer to: [Authentication](../authority-management).

## Implementation of Gateway Technology

* Adopt `AK/SK` authentication technical scheme.
* Adopt authentication plug-in and Chain of Responsibility Pattern to realize.
* Take effect when the authentication plugin is enabled and all interfaces are configured for authentication.


## Authentication Guide

* Step 1: `AK/SK` is assigned by the gateway. For example, the `AK` assigned to you is: `1TEST123456781` SK is: ` 506eeb535cf740d7a755cb49f4a1536'

* Step 2: Decide the gateway path you want to access, such as ` /api/service/abc`

* Step 3: Construct parameters (the following are general parameters)

| Field      | Value    |  Description  |
| --------   | --------  | :--------: |
| timestamp  |  current timestamp(String)   |  The number of milliseconds of the current time（gateway will filter requests the before 5 minutes）    |
| path       | /api/service/abc  | The path that you want to request(Modify by yourself according to your configuration of gateway) |
| version       | 1.0.0  |  `1.0.0` is a fixed string value |

Sort the above three field natually according to the key, then splice fields and fields, finally splice SK. The following is a code example.


Step 1: First, construct a Map.
```java

   Map<String, String> map = Maps.newHashMapWithExpectedSize(3);
   //timestamp is string format of millisecond. String.valueOf(LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli())
   map.put("timestamp","1571711067186");  // Value should be string format of milliseconds
   map.put("path", "/api/service/abc");
   map.put("version", "1.0.0");
```

Step 2: Sort the `Keys` naturally, then splice the key and values, and finally splice the `SK` assigned to you.
```java
List<String> storedKeys = Arrays.stream(map.keySet()
                .toArray(new String[]{}))
                .sorted(Comparator.naturalOrder())
                .collect(Collectors.toList());
final String sign = storedKeys.stream()
                .map(key -> String.join("", key, params.get(key)))
                .collect(Collectors.joining()).trim()
                .concat("506EEB535CF740D7A755CB4B9F4A1536");
```
* The returned sign value should be:`path/api/service/abctimestamp1571711067186version1.0.0506EEB535CF740D7A755CB4B9F4A1536`

Step 3: Md5 encryption and then capitalization.
```java
DigestUtils.md5DigestAsHex(sign.getBytes()).toUpperCase()
```

* The final returned value is: `A021BF82BE342668B78CD9ADE593D683`.

## Request GateWay

* If your visited path is:`/api/service/abc`.

* Address: http: domain name of gateway `/api/service/abc`.

* Set `header`，`header` Parameter：

| Field        | Value    |  Description  |
| --------   | -----:  | :----: |
| timestamp  |   `1571711067186`  |  Timestamp when signing   |
| appKey     | `1TEST123456781`  |  The AK value assigned to you |
| sign       | `A90E66763793BDBC817CF3B52AAAC041`  | The signature obtained above |
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

## Extension

* Please refer to: [dev-sign](../custom-sign-algorithm).

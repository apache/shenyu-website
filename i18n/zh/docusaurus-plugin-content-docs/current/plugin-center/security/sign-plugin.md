---
title: Sign插件
keywords: ["sign"]
description: sign插件
---


# 1. 概述

## 1.1 插件名称

* Sign插件

## 1.2 适用场景

* 支持请求头进行鉴权
* 支持请求体进行鉴权

## 1.3 插件功能

* 用来对请求进行签名认证

## 1.4 插件代码

* 核心模块: `shenyu-plugin-sign`

* 核心类: `org.apache.shenyu.plugin.sign.SignPlugin`

## 1.5 添加自哪个shenyu版本

* ShenYu 2.4.0

# 2. 如何使用插件

## 2.1 插件使用流程图

![](/img/shenyu/plugin/plugin_use_zh.jpg)

## 2.2 导入pom

* 在网关的 `pom.xml` 文件中添加 `sign` 的支持。

```xml
<!-- apache shenyu sign plugin start-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-sign</artifactId>
  <version>${project.version}</version>
</dependency>
<!-- apache shenyu sign plugin end-->
```

## 2.3 启用插件

- 在 `shenyu-admin` 基础配置 --> 插件管理 --> `sign` ，设置为开启。

## 2.4 插件的鉴权配置

### 2.4.1 AK/SK配置

#### 2.4.1.1 说明

- 管理和控制经过 `Apache ShenYu` 网关的请求的权限。
- 生成的 `AK/SK` ，配合 `sign` 插件使用，实现基于`URI`级别的精准权限管控。

#### 2.4.1.2 使用教程

第一步，我们可以直接在 `基础配置` --> `认证管理` 新增一条认证信息 。

<img src="/img/shenyu/basicConfig/authorityManagement/auth_manages_add_zh.jpg" width="100%" height="70%" />

第二步，配置这条认证信息 。

<img src="/img/shenyu/basicConfig/authorityManagement/auth_param_zh.jpg" width="50%" height="40%"/>

- 应用名称：这个账号关联的应用名称，可手动填写或下拉选择（数据来自元数据管理中配置的应用名称）。
- 手机号：仅作为信息记录，在shenyu中无实际使用逻辑。
- APP参数：当请求的context path与应用名称相同时，向header中添加该值，键为 `appParam`。
- 用户ID：给该用户取一个名字，仅作为信息记录，在shenyu中无实际使用逻辑。
- 拓展信息：仅作为信息记录，在shenyu中无实际使用逻辑。
- 路径认证：开启后，该账号仅允许访问以下配置的资源路径。
- 资源路径：允许访问的资源路径，支持路径匹配，如 `/order/**` 。

点击确认后，生成一条认证信息，该信息包含 `AppKey` 和 `加密秘钥` ，即 `Sign` 插件中的 `AK/SK`  。

#### 2.4.1.3 路径操作

对已创建的认证信息，可以在认证信息列表的末尾进行 `路径操作` 。

<img src="/img/shenyu/basicConfig/authorityManagement/auth_manage_modifyPath_zh.jpg" width="90%" height="80%"/>

- 左侧为可配置的路径列表，右侧为允许该账号访问的路径列表 。
- 勾选资源路径，点击中间的 `>` 或  `<` 将勾选的数据移动到对应列表中 。
- 左侧可配置路径列表可在账号信息行末尾点击 `编辑`，在弹框中的 `资源路径` 中进行添加 。

##  2.4.2 网关技术实现

* 采用 `AK/SK` 鉴权技术方案。
* 采用鉴权插件，责任链的模式来完成。
* 当鉴权插件开启，并配置所有接口鉴权时候生效。

## 2.4.3 鉴权使用指南

* 第一步：AK/SK由网关来进行分配，比如分配给你的AK为: `1TEST123456781`  	SK为：`506EEB535CF740D7A755CB4B9F4A1536`

* 第二步：确定好你要访问的网关路径 比如 `/api/service/abc`

* 第三步：构造参数（以下是通用参数）

| 字段        | 值    |  描述  |
| --------   | -----:  | :----: |
| timestamp  |  当前时间戳(String类型)   |  当前时间的毫秒数（网关会过滤掉5分钟之前的请求）    |
| path       | /api/service/abc  | 就是你需要访问的接口路径(根据你访问网关接口自己变更) |
| version       | 1.0.0  | 目前定为1.0.0 写死，String类型 |

对上述3个字段进行 `key` 的自然排序，然后进行字段与字段值拼接最后再拼接上 `SK` ，代码示例。

#### 2.4.3.1 无请求体的签名参数验证

第一步：首先构造一个 `Map` 。

```java
Map<String, String> map = Maps.newHashMapWithExpectedSize(3);
//timestamp为毫秒数的字符串形式 String.valueOf(LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli())
map.put("timestamp","1571711067186");  //值应该为毫秒数的字符串形式
map.put("path", "/api/service/abc");
map.put("version", "1.0.0");
```

第二步：进行 `Key` 的自然排序，然后 `Key`，`Value`值拼接最后再拼接分配给你的 `SK`。

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

* 你得到的 `sign` 值应该为：`path/api/service/abctimestamp1571711067186version1.0.0506EEB535CF740D7A755CB4B9F4A1536`

第三步：进行 `MD5` 加密后转成大写。

```java
DigestUtils.md5DigestAsHex(sign.getBytes()).toUpperCase()
```

* 最后得到的值为：`A021BF82BE342668B78CD9ADE593D683`

#### 2.4.3.2 有请求体，请求头的签名参数验证

第一步: 首先构造一个 `Map` 。并且该`map`必须存储请求体的每个节点信息

```java

   Map<String, String> map = Maps.newHashMapWithExpectedSize(3);
   //timestamp is string format of millisecond. String.valueOf(LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli())
   map.put("timestamp","1660659201000");  // Value should be string format of milliseconds
   map.put("path", "/http/order/save");
   map.put("version", "1.0.0");
   // if your request body is:{"id":123,"name":"order"}
   map.put("id", "1");
   map.put("name", "order")
```

第二步：进行 `Key` 的自然排序，然后 `Key`，`Value`值拼接最后再拼接分配给你的 `SK`。

```java
List<String> storedKeys = Arrays.stream(map.keySet()
                .toArray(new String[]{}))
                .sorted(Comparator.naturalOrder())
                .collect(Collectors.toList());
final String sign = storedKeys.stream()
                .map(key -> String.join("", key, params.get(key)))
                .collect(Collectors.joining()).trim()
                .concat("2D47C325AE5B4A4C926C23FD4395C719");
```

* 你得到的 `sign` 值应该为:`id123nameorderpath/http/order/savetimestamp1660659201000version1.0.02D47C325AE5B4A4C926C23FD4395C719`

第三步：进行 `MD5` 加密后转成大写。

```java
DigestUtils.md5DigestAsHex(sign.getBytes()).toUpperCase()
```

* 最后得到的值为: `35FE61C21F73E9AAFC46954C14F299D7`.

## 2.4.4 请求网关

* 假如你访问的路径为：`/api/service/abc`。

* 访问地址 ：http：网关的域名`/api/service/abc`。

* 设置`header`头，`header`头参数为：

| 字段        | 值    |  描述  |
| --------   | -----:  | :----: |
| timestamp  |   `1571711067186`  |  上述你进行签名的时候使用的时间值   |
| appKey     | `1TEST123456781`  | 分配给你的AK值 |
| sign       | `A90E66763793BDBC817CF3B52AAAC041`  | 上述得到的签名值 |
| version       | `1.0.0`  | 写死，就为这个值 |

* 签名插件会默认过滤 `5` 分钟之前的请求

* 如果认证不通过会返回 `code` 为 `401`， `message` 可能会有变动。

```json
{
  "code": 401,
  "message": "sign is not pass,Please check you sign algorithm!",
  "data": null
}
```

### 2.4.5 插件配置

![](/img/shenyu/plugin/sign/sign_open_zh.jpg)

### 2.4.6 选择器配置

![](/img/shenyu/plugin/sign/selector-zh.png)

* 只有匹配的请求，才会进行签名认证。

* 插件选择器和规则的配置请查看: [插件和规则配置](../../user-guide/admin-usage/selector-and-rule.md).

### 2.4.7 规则配置

![](/img/shenyu/plugin/sign/rule-en.png)

* close(signRequestBody): 仅使用请求头生成签名
* open(signRequestBody): 使用请求头、请求体共同生成签名

## 2.5 示例

### 2.5.1 使用sign插件进行签名验证

#### 2.5.1.1 插件配置

![](/img/shenyu/plugin/sign/sign_open_zh.jpg)

#### 2.5.1.2 选择器配置

![](/img/shenyu/plugin/sign/example-selector-zh.png)

#### 2.5.1.3 规则配置

![](/img/shenyu/plugin/sign/example-rule-zh.png)

#### 2.5.1.5 添加AppKey/SecretKey

![](/img/shenyu/plugin/sign/example-sign-auth-zh.png)

#### 2.5.1.6 Request Service and check result

* 构造请求参数，请查看`Authentication Guide`目录,

```java
public class Test1 {
  public static void main(String[] args) {
    Map<String, String> map = Maps.newHashMapWithExpectedSize(3);
    //timestamp为毫秒数的字符串形式 String.valueOf(LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli())
    map.put("timestamp","1660658725000");  //值应该为毫秒数的字符串形式
    map.put("path", "/http/order/save");
    map.put("version", "1.0.0");

    List<String> storedKeys = Arrays.stream(map.keySet()
                    .toArray(new String[]{}))
            .sorted(Comparator.naturalOrder())
            .collect(Collectors.toList());
    final String sign = storedKeys.stream()
            .map(key -> String.join("", key, map.get(key)))
            .collect(Collectors.joining()).trim()
            .concat("2D47C325AE5B4A4C926C23FD4395C719");
    System.out.println(sign);

    System.out.println(DigestUtils.md5DigestAsHex(sign.getBytes()).toUpperCase());
  }
}
```
* 无请求体签名: `path/http/order/savetimestamp1571711067186version1.0.02D47C325AE5B4A4C926C23FD4395C719`
* 无请求体签名结果: `9696D3E549A6AEBE763CCC2C7952DDC1`

![](/img/shenyu/plugin/sign/result.png)

```java
public class Test2 {
  public static void main(String[] args) {
    Map<String, String> map = Maps.newHashMapWithExpectedSize(3);
    //timestamp为毫秒数的字符串形式 String.valueOf(LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli())
    map.put("timestamp","1660659201000");  //值应该为毫秒数的字符串形式
    map.put("path", "/http/order/save");
    map.put("version", "1.0.0");
    map.put("id", "123");
    map.put("name", "order");

    List<String> storedKeys = Arrays.stream(map.keySet()
                    .toArray(new String[]{}))
            .sorted(Comparator.naturalOrder())
            .collect(Collectors.toList());
    final String sign = storedKeys.stream()
            .map(key -> String.join("", key, map.get(key)))
            .collect(Collectors.joining()).trim()
            .concat("2D47C325AE5B4A4C926C23FD4395C719");
    System.out.println(sign);

    System.out.println(DigestUtils.md5DigestAsHex(sign.getBytes()).toUpperCase());
  }
}
```

* 有请求体签名为:`id123nameorderpath/http/order/savetimestamp1660659201000version1.0.02D47C325AE5B4A4C926C23FD4395C719`
* 附带请求体签名结果:`35FE61C21F73E9AAFC46954C14F299D7`

![](/img/shenyu/plugin/sign/result-with-body.png)

# 3. 如何禁用插件

- 在 `shenyu-admin` 基础配置 --> 插件管理 --> `sign` ，设置为关闭。

# 4. 签名认证算法扩展

* 请参考开发者文档中的 [扩展签名算法](../../developer/custom-sign-algorithm)。

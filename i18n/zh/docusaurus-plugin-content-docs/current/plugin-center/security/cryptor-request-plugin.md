---
title: CryptorRequest 插件
keywords: ["CryptorRequest"]
description: CryptorRequest 插件
---

## 说明

* `cryptorRequest` 插件是通过 `fieldNames` 去匹配 `requestBody` 里面的参数进行 `解密` 处理，替换当前 `requestBody` 内容。

## 插件设置

1. 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `cryptorRequest` 设置为开启。

<img src="/img/shenyu/plugin/cryptor/enable-cryptor-request-plugin.png" width="80%" height="80%" />

2. 打开 `selector` 配置需要匹配的流量。

3. 打开 `selector` 对应的 `Rules` 配置。

  <img src="/img/shenyu/plugin/cryptor/cryptor-request-rules-config.png" width="80%" height="80%" />

* strategyName: 解密算法名称。当前基于 shenyu 的 SPI 机制，可自定义加解密算法，
  需要实现 `org.apache.shenyu.plugin.cryptor.strategy.CryptorStrategy` 接口。

  同时找到 `resources/META-INF/shenyu/` 底下的 `org.apache.shenyu.plugin.cryptor.strategy.CryptorStrategy` 文件，
  写上算法名称以及实现的 `CryptorStrategy` 接口的 class 的包名。

* fieldNames: 匹配的参数名，支持解析多层次的 json 格式匹配，使用 `.` 分割，例如 data.id 。

```json5
        {
          data: {
            "id": ""
          }  
        }
```

* decryptKey: 密钥，用于解密数据。

* encryptKey: 密钥，用于加密数据。

* way: 选择加密或解密。

## 插件使用

* 在网关的 `pom.xml` 文件中添加 `cryptorRequest` 的支持。

```xml
<!-- apache shenyu Cryptor Request plugin start-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-cryptor</artifactId>
  <version>${project.version}</version>
</dependency>
<!-- apache shenyu Cryptor Request plugin end-->
```

## 场景

防互联网黑产，恶意获取数据。提高数据安全性。




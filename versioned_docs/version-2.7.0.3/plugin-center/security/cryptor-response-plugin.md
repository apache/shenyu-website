---
title: CryptorResponse plugin
keywords: ["CryptorResponse"]
description: CryptorResponse plugin
---

## Description

* The `CryptorResponse` plug-in uses `fieldNames` to match the parameters in `responseBody` for `encryption` processing, replacing the corresponding content of the current `fieldNames`.

## Plugin Setting

1. In `shenyu-admin` BasicConfig --> plugin -> `cryptor_response` set to enable.

<img src="/img/shenyu/plugin/cryptor/enable-cryptor-response-plugin.png" width="80%" height="80%" />

2. Open `selector` to configure the traffic that needs to be matched.

3. Open the `Rules` configuration corresponding to the `selector`.

  <img src="/img/shenyu/plugin/cryptor/cryptor-response-rules-config.png" width="80%" height="80%" />

* strategyName: Algorithm name. Currently, based on shenyu's SPI mechanism, the encryption and decryption algorithms can be customized,
  Need to implement the `org.apache.shenyu.plugin.cryptor.strategy.CryptorStrategy` interface.

  At the same time find the `org.apache.shenyu.plugin.cryptor.strategy.CryptorStrategy` file under `resources/META-INF/shenyu/`,
  Write the name of the algorithm, and the package name of the class that implements the `CryptorStrategy` interface.


* fieldNames: Matching parameter name. Support parsing multi-level json format matching, using `.` segmentation, such as data.id.

```json5
    {
      data: {
        "id": ""
      }
    }
```

* decryptKey: Secret key. Used to decrypt data.

* encryptKey: Secret key. Used to encrypt data.

* way: Select encrypt or decrypt.

## Plugin Use

* Add support for `cryptorResponse` in the `pom.xml` file of shenyu-bootstrap.

```xml
<!-- apache shenyu Cryptor Response plugin start-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-cryptor</artifactId>
  <version>${project.version}</version>
</dependency>
<!-- apache shenyu Cryptor Response plugin end-->
```

## Situation

Prevent Internet hacking and obtain data maliciously. Improve data security.




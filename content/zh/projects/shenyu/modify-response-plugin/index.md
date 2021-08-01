---
title: ModifyResponse插件
keywords: modifyResponse
description: modifyResponse插件
---

## 说明

* `modifyResponse`插件是 `Apache ShenYu` 网关自带的，用来对响应进行修改的插件。



## 插件设置

-  在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `modifyResponse` 设置为开启。

## 插件使用

* 在网关的 `pom.xml` 文件中添加 `modifyResponse` 的支持。

```xml
  <!-- apache shenyu modify response plugin start-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-modify-response</artifactId>
  <version>${project.version}</version>
</dependency>
        <!-- apache shenyu modify response plugin end-->
```

* 选择器和规则设置，请参考：[选择器和规则管理](../selector-and-rule)。
  * 只有匹配的请求，才会修改响应。

## 修改响应插件使用指南
* 1.配置选择器
* 2.配置规则
* 3.修改响应状态码
![](/img/shenyu/plugin/modify-response/modifyStatus-cn.png)
* 4.修改响应请求头
![](/img/shenyu/plugin/modify-response/modifyHeader-cn.png)
* 5.修改响应内容
![](/img/shenyu/plugin/modify-response/modifyBody-cn.png)
* 参数详情:
  * `addHeaders`: 添加请求头，键值对形式
  * `setHeaders`: 添加请求头，键值对形式
  * `replaceHeaderKeys`: 替换请求头 `key` 的 `name`，`key` 是要被替换的值，`value` 是替换后的值
  * `removeHeaderKeys`: 移除的请求头的 `key`
  * `statusCode`: 响应状态码
  * `addBodyKeys`: 添加响应内容
  * `replaceBodyKeys`: 替换响应内容，`key` 是要被替换的值，`value` 是替换后的值
  * `removeBodyKeys`: 移除的响应内容的 `key`

修改响应体是通过 `JSONPath` 来实现的，`$.` 代表根目录

上面的配置，插件开启前，响应内容为
```json
{"id":3,"name":"hello world findById"}
```
插件开启后，响应内容为
```json
{"id2":3,"add":"4"}
```


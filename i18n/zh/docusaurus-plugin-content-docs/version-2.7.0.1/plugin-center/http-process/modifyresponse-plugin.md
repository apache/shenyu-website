---
title: ModifyResponse插件
keywords: ["modifyResponse"]
description: modifyResponse插件
---

# 1. 概述

## 1.1 插件名称

* 响应修改插件

## 1.2 适用场景

* 需要对接口的响应头部参数、响应HTTP状态码或响应体进行修改的场景

## 1.3 插件功能

* 修改HTTP响应状态码
* 添加、设置、覆盖或者移除响应头部参数
* 添加、覆盖或者移除响应体参数

## 1.4 插件代码

* 核心模块 ```shenyu-plugin-modify-response```
* 核心类 ```org.apache.shenyu.plugin.modify.response.ModifyResponsePlugin```

## 1.5 添加自哪个 shenyu 版本

* 2.4.0

# 2. 如何使用插件

## 2.1 插件使用流程图

![](/img/shenyu/plugin/modify-response/procedure-cn.png)

## 2.2 导入 pom

- 在网关的 `pom.xml` 文件中添加插件 maven 配置。

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-gateway</artifactId>
   <version>${project.version}</version>
</dependency>
```

## 2.3 启用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `modifyResponse` 设置为开启。

![](/img/shenyu/plugin/modify-response/enable-cn.png)

## 2.4 配置插件

* 选择器和规则设置，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。
* `shenyu-admin`插件列表 --> `HttpProcess` --> `modifyResponse`，先添加选择器，然后添加规则：
  * 添加选择器
    ![](/img/shenyu/plugin/modify-response/plugin-selector-config-cn.png)
  * 添加规则
    ![](/img/shenyu/plugin/modify-response/plugin-rule-config-cn.png)

## 2.5 示例

客户端项目可以直接使用 [shenyu-examples-http](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-http)，注意该示例项目的`contextPath`为`/http`，需要在`shenyu-admin`和`shenyu-gateway`启动完成后启动。

### 2.5.1 示例 设置HTTP响应状态码

#### 2.5.1.1 参考[本地部署](https://shenyu.apache.org/zh/docs/deployment/deployment-local)启动 admin 和网关

#### 2.5.1.2 参考 2.2 导入 pom 并重启网关

#### 2.5.1.3 参考 2.3 启用插件

#### 2.5.1.4 参考 2.4 配置插件规则

配置插件规则：

![](/img/shenyu/plugin/modify-response/status-code-rule-config-cn.png)

#### 2.5.1.5 接口调用

![](/img/shenyu/plugin/modify-response//status-code-invoke-interface.png)

### 2.5.2 示例  修改响应头部参数

#### 2.5.2.1 参考[本地部署](https://shenyu.apache.org/zh/docs/deployment/deployment-local)启动 admin 和网关

#### 2.5.2.2 参考 2.2 导入 pom 并重启网关

#### 2.5.2.3 参考 2.3 启用插件

#### 2.5.2.4 参考 2.4 配置插件规则

![](/img/shenyu/plugin/modify-response/header-rule-config-cn.png)

#### 2.5.2.5 接口调用

![](/img/shenyu/plugin/modify-response/header-invoke-interface.png)

### 2.5.3 示例  修改响应体

#### 2.5.3.1 参考[本地部署](https://shenyu.apache.org/zh/docs/deployment/deployment-local)启动 admin 和网关

#### 2.5.3.2 参考 2.2 导入 pom 并重启网关

#### 2.5.3.3 参考 2.3 启用插件

#### 2.5.3.4 参考 2.4 配置插件规则

配置插件规则：

![](/img/shenyu/plugin/modify-response/body-rule-config-cn.png)

#### 2.5.3.5 接口调用

![](/img/shenyu/plugin/modify-response/body-invoke-interface.png)

## 3. 如何禁用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `modifyResponse` 设置为禁用。

![](/img/shenyu/plugin/modify-response/disable-cn.png)

## 4. 插件规则参数列表

对于HTTP响应状态码：

* `statusCode`: 修改响应状态码

对于HTTP响应头部参数：

* `addHeaders`: 添加响应头部参数，键值对形式
* `setHeaders`: 设置响应头部参数，键值对形式
* `replaceHeaderKeys`: 替换响应头部参数，其中`key`参数为需要被替换的`key`，`value`参数为替换后的值
* `removeHeaderKeys`: 移除响应头部参数，其中`key`参数为需要被移除的`key`

对于HTTP响应体：

* `addBodyKeys`: 添加响应内容
* `replaceBodyKeys`: 替换响应内容，其中`key`参数为需要被替换的`key`，`value`参数为替换后的值
* `removeBodyKeys`: 移除响应内容，其中`key`参数为需要被移除的`key`

修改响应体是基于`JSONPath`实现的，`$.`代表根目录。对于下面的配置：

![](/img/shenyu/plugin/modify-response/body-rule-config-cn.png)

插件开启前，响应内容为：

```json
{
  "id": 3,
  "name": "hello world findById"
}
```

插件开启后，响应内容为：

```json
{
    "id2": 3, 
    "add": "4"
}
```

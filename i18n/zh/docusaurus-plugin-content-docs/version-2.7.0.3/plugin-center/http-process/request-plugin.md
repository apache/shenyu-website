---
title: Request插件
keywords: ["RequestPlugin"]
description: RequestPlugin
---

# 1. 概述

## 1.1 插件名称

- Request(请求)插件

## 1.2 适用场景

- 请求插件能够对 `uri` 的请求参数进行自定义修改。

## 1.3 插件功能

- `Apache ShenYu` 网关在对目标服务进行代理调用的时候，允许用户使用 `request` 插件对请求参数、请求头以及 `Cookie` 来添加、修改、移除请求头。

## 1.4 插件代码

- 核心模块 ```shenyu-plugin-redirect```
- 核心类 ```org.apache.shenyu.plugin.request.RequestPlugin```

## 1.5 添加自哪个 shenyu 版本

- 2.4.0

# 2. 如何使用插件

## 2.1 插件使用流程图

<img src="/img/shenyu/plugin/request/request-plugin-procedure-zh.png" width="40%" height="30%" />

## 2.2 导入 pom

- 在网关的 `pom.xml` 文件中添加插件 maven 配置，默认已经添加。

```xml
<!-- apache shenyu request plugin start-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-request</artifactId>
   <version>${project.version}</version>
</dependency>
<!-- apache shenyu request plugin end-->
```

## 2.3 启用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `request` 设置为开启。

  > 如果此处页面上存在需要配置 `ruleHandlePageType` 的选项，可以配置任一字符串，如：`custom`，对请求没有影响，后面版本会移除掉该选项。
  
  <img src="/img/shenyu/plugin/request/request-plugin-enable-zh.png" width="70%" height="60%" />

## 2.4 配置插件

- 选择器和规则，只有匹配的请求，才会进行转发和重定向，请参考：[选择器规则管理](../../user-guide/admin-usage/selector-and-rule)。
- `shenyu-admin`插件列表 --> `HttpProcess` --> `Request`，先添加选择器，然后添加规则：
- 添加选择器：

  <img src="/img/shenyu/plugin/request/request-plugin-selector-zh.png" width="70%" height="60%" />

- 添加规则：

  <img src="/img/shenyu/plugin/request/request-plugin-rule-zh.png" width="70%" height="60%" />

## 2.5 示例

### 2.5.1 添加请求参数

- 我们在 `规则` 配置自定义路径时，应该为一个可达的服务路径。
- 当匹配到请求后，根据自定义的路径，`Apache ShenYu`网关会进行服务跳转。
1. 参考[本地部署](https://shenyu.apache.org/zh/docs/deployment/deployment-local)启动 admin 和网关
2. 参考2.2导入 pom 并重启网关
3. 参考2.3启用插件
4. 启动 [shenyu-examples-http](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-http) 项目
5. 参考2.4及[选择器规则管理](../../user-guide/admin-usage/selector-and-rule)配置插件规则
6. 接口调用：[http-test-api.http](https://github.com/apache/shenyu/blob/master/shenyu-examples/shenyu-examples-http/src/main/http/http-test-api.http)
- 调用选择器和规则声明的接口，将会看到request插件中配置的请求参数。

  <img src="/img/shenyu/plugin/request/request-plugin-example-zh.png" width="70%" height="60%" />

# 3. 如何禁用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `Request` 设置为禁用。

  <img src="/img/shenyu/plugin/request/request-plugin-disable-zh.png" width="70%" height="60%" />

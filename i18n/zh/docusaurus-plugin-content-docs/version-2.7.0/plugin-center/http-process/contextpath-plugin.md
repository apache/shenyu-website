---
title: Context Path插件
keywords: ["contextPath"]
description: contextPath插件
---

# 1. 概述

## 1.1 插件名称

* 上下文路径插件

## 1.2 适用场景

* 不同的服务可以通过设置不同的上下文路径来做服务的流量治理

## 1.3 插件功能

* 设置服务的上下文路径
* 在接口调用的时候插件统一给服务的接口地址加上前缀

## 1.4 插件代码

* 核心模块 ```shenyu-plugin-context-path```
* 核心类 ```org.apache.shenyu.plugin.context.path.ContextPathPlugin```

## 1.5 添加自哪个 shenyu 版本

* 2.3.0

# 2. 如何使用插件

## 2.1 插件使用流程图

![](/img/shenyu/plugin/context-path/procedure-cn.png)

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

- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `contextPath` 设置为开启。

![](/img/shenyu/plugin/context-path/enable-cn.png)

## 2.4 配置插件

- 配置客户端项目的 contextPath

![](/img/shenyu/plugin/context-path/client-project-config.png)

- 选择器和规则设置，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。
- shenyu-admin contextPath 插件配置，可以配置 contextPath 和 addPrefix：contextPath 定义了 contextPath 的值，addPrefix 定义了接口调用时需要自动增加的的前缀。

![](/img/shenyu/plugin/context-path/plugin-config-cn.png)

## 2.5 示例

### 2.5.1 示例 设置服务的上下文路径

#### 2.5.1.1 参考[本地部署](https://shenyu.apache.org/zh/docs/deployment/deployment-local)启动 admin 和网关

#### 2.5.1.2 参考 2.2 导入 pom 并重启网关

#### 2.5.1.3 参考 2.3 启用插件

#### 2.5.1.4 客户端项目配置 contextPath

客户端项目可以直接使用 [shenyu-examples-http](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-http)，并在 application.yml 中配置 contextPath。

![](/img/shenyu/plugin/context-path/client-project-config.png)

配置完成后启动，可以看到 shenyu-admin 中多了一条 context 的 selector 和 rule 配置。
 
![](/img/shenyu/plugin/context-path/context-path-selector-and-rule-cn.png)

#### 2.5.1.5 接口调用

![](/img/shenyu/plugin/context-path/invoke-interface.png)

### 2.5.2 示例 增加前缀

#### 2.5.2.1 参考[本地部署](https://shenyu.apache.org/zh/docs/deployment/deployment-local)启动 admin 和网关

#### 2.5.2.2 参考 2.2 导入 pom 并重启网关

#### 2.5.2.3 参考 2.3 启用插件

#### 2.5.2.4 客户端项目配置 contextPath

客户端项目可以直接使用 [shenyu-examples-http](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-http)，并在 application.yml 中配置 contextPath。

![](/img/shenyu/plugin/context-path/client-project-config.png)

配置完成后启动，可以看到 shenyu-admin 中多了一条 context 的 selector 和 rule 配置。

![](/img/shenyu/plugin/context-path/context-path-selector-and-rule-cn.png) 

#### 2.5.2.5 修改 addPrefix 的值

![](/img/shenyu/plugin/context-path/add-prefix-cn.png)

#### 2.5.2.6 修改选择器和条件配置中 uri 的值，删除掉 addPrefix 部分，由于本例使用了 http 协议的服务，因此需要修改 divide 插件。

![](/img/shenyu/plugin/context-path/remove-add-prefix-cn.png)

#### 2.5.2.7 接口调用

![](/img/shenyu/plugin/context-path/invoke-interface-add-prefix.png)

### 2.5.3 示例 应用切流

#### 2.5.3.1 参考[本地部署](https://shenyu.apache.org/zh/docs/deployment/deployment-local)启动 admin 和网关

#### 2.5.3.2 参考 2.2 导入 pom 并重启网关

#### 2.5.3.3 参考 2.3 启用插件

#### 2.5.3.4 客户端项目启动

客户端项目可以直接使用 [shenyu-examples-http](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-http)和 [shenyu-examples-https](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-https)。

启动后，可以看到 shenyu-admin 中多了2条 context 的 selector 和 rule 配置。

![](/img/shenyu/plugin/context-path/context-path-selectors-cn.jpg)

#### 2.5.3.5 修改 rewriteContextPath 的值

![](/img/shenyu/plugin/context-path/rewrite-context-path-cn.jpg)

注意：percentage可以调节切流比例，0~100，默认100，表示全部切流。

#### 2.5.2.6 接口调用

![](/img/shenyu/plugin/context-path/invoke-interface-rewrite-context-path.jpg)

# 3. 如何禁用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `contextPath` 设置为禁用。

![](/img/shenyu/plugin/context-path/disable-cn.png)

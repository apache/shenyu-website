---
title: Divide插件
keywords: ["divide"]
description: divide插件
---

# 1. 概述

## 1.1 插件名称

* `divide`插件

## 1.2 适用场景

* 处理 `http协议` 请求
* 支持流量治理，例如a/b 测试、灰度测试
* 服务负载均衡
* 设置接口的超时时间

## 1.3 插件功能

* 支持根据 uri、header、query 等请求信息做流量的治理
* 支持设置请求的负载均衡策略，同时支持服务预热，目前支持三种策略：ip hash（带虚拟节点的一致性哈希）、round-robbin（加权轮询）、random（加权随机）
* 支持设置接口级别请求头最大值、请求体最大值、请求超时时间
* 支持设置超时重试策略和重试次数，目前重试策略支持：current（重试之前失败的服务器）和failover（重试其它服务器）

## 1.4 插件代码

* 核心模块 ```shenyu-plugin-divide```
* 核心类 ```org.apache.shenyu.plugin.divide.DividePlugin```

# 2. 如何使用插件

## 2.1 插件使用流程图

![](/img/shenyu/plugin/divide/procedure-cn.png)

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

- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `divide` 设置为开启。

![](/img/shenyu/plugin/divide/enable-cn.png)

## 2.4 配置插件

### 2.4.1 在客户端项目配置文件中配置接入参数

  * 客户端接入方式和服务器地址，下面的示例使用了 http 接入方式，目前客户端支持的接入的方式有以下几种：http、zookeeper、etcd、nacos、consul，详细的接入配置参数请参考[客户端接入配置](i18n/zh/docusaurus-plugin-content-docs/current/user-guide/property-config/register-center-access.md)。
  * 客户端配置，包含协议名称以及服务的路由地址，这里请使用 http 协议，并且必须配置 contextPath 的值作为每个服务的路由地址。
  
```yaml
  shenyu:
    register:
      registerType: http
      serverLists: http://localhost:9095
      props:
        username: admin
        password: 123456
    client:
      http: # http 协议
        props:
          contextPath: /http # 每个服务的路由地址
```      

### 2.4.2 在 shenyu-admin 配置文件中配置 upstream 有效性的检测参数

下面的示例使用了 http 接入方式，目前客户端支持的接入的方式有以下几种：http、zookeeper、etcd、nacos、consul，详细的接入配置参数请参考[客户端接入配置](i18n/zh/docusaurus-plugin-content-docs/current/user-guide/property-config/register-center-access.md)。

> 只有 http 类型的注册中心才支持 upstream 检测

```yaml
  shenyu:
    register:
      registerType: http # 只有 http 类型的注册中心才支持检测 upstream
      serverLists: 
      props:
        checked: true # 默认为 ture，设置为 false，不检测
        zombieCheckTimes: 5 # 僵尸 upstream 最大检测次数，超过 5 次不再检测其有效性，默认为 5
        scheduledTime: 10 # 定时检测时间间隔，默认 10 秒
        zombieRemovalTimes: 60 # upstream 多少秒不在线认定为僵尸 upstream，默认 60 秒
```

### 2.4.3 在 shenyu-admin 配置 divide 插件的选择器和规则信息

客户端启动之后会在 shenyu-admin -> 插件列表 -> Proxy -> Divide 自动注册[选择器和规则](../../user-guide/admin-usage/selector-and-rule)信息。
![](/img/shenyu/plugin/divide/select-and-rule-cn.png)

#### 2.4.3.1 选择器的配置

divide 选择器示例，通用选择器配置请参考[选择器和规则](../../user-guide/admin-usage/selector-and-rule)。

![](/img/shenyu/plugin/divide/selector-cn.png)

##### 2.4.3.1.1 选择器处理信息配置

- `host`：填写 `localhost`，该字段暂时没使用。
- `ip:port`：`ip` 与端口，这里填写你真实服务的 `ip` + 端口。
- `protocol`：：`http` 协议，填写 `http://` 或者 `https://`，不填写默认为：`http://`
- `startupTime`： 启动时间，单位毫秒。
- `weight`：负载均衡权重，服务启动自动注册的默认值为 50。
- `warmupTime`：预热时间，单位毫秒，在预热中的服务器会计算瞬时权重，计算值会小于实际配置的权重，以保护刚启动的服务器，服务启动注册的默认值为 10。举个例子预热时间 100 毫秒，目前启动了 50 毫秒，配置的权重 50， 实际的权重是 25。
- `status`：开启或关闭，开始状态此处理器才有效。

#### 2.4.3.2 规则的处理信息配置

divide 规则示例，通用规则配置请参考[选择器和规则](../../user-guide/admin-usage/selector-and-rule)。

![](/img/shenyu/plugin/divide/rule-cn.png)

##### 2.4.3.2.1 规则处理信息配置

- `loadStrategy`：如果`http`客户端是一个集群，`Apache ShenYu`网关调用时采取哪种负载均衡策略，当前支持 `roundRobin`、`random` 和 `hash`。
- `timeout`：调用`http`客户端的超时时间。
- `retryCount`：调用`http`客户端超时失败的重试次数。
- `headerMaxSize`：请求`header`的最大值。
- `requestMaxSize`：请求体的最大值。
- `retryStrategy`：从`2.4.3版本`开始支持，失败后的重试策略，默认`current`以保持对低版本的兼容。 比如下游有3个服务`http://localhost:1111`、`http://localhost:1112`和`http://localhost:1113`，假设第一次负载均衡到`http://localhost:1111`并且`调用失败`。使用`current`策略会继续重试调用`http://localhost:1111`；使用`failover`策略会通过`负载均衡`重试调用到其他服务如`http://localhost:1112`，此时如果又失败了，则调用到`http://localhost:1113`，直到没有可用的服务为止。

## 2.5 示例

### 2.5.1 示例 A/B 测试

待补充

### 2.5.2 示例 灰度测试

待补充

# 3. 如何禁用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `divide` 设置为禁用。

![](/img/shenyu/plugin/divide/disable-cn.png)

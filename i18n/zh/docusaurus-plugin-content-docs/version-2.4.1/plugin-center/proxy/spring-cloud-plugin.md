---
title: Spring Cloud插件
keywords: ["SpringCloud"]
description: Spring Cloud插件
---


# 1. 概述

## 1.1 插件名称

* SpringCloud插件

## 1.2 适用场景

* 用来将`http协议` 转成 `Spring Cloud协议`。
* 用于SpringCloud微服务灰度流量控制。

## 1.3 插件功能

* 将`http协议` 转成 `Spring Cloud协议`。

## 1.4 插件代码

* 核心模块 `shenyu-plugin-springcloud`

* 核心类 `org.apache.shenyu.plugin.springcloud.SpringCloudPlugin`

## 1.5 添加自哪个shenyu版本

* 2.4.0

# 2. 如何使用插件

* 引入相关依赖，开启插件，请参考：[Spring Cloud快速开始](../../quick-start/quick-start-springcloud) 。

* `Spring Cloud`应用客户端接入，请参考：[Spring Cloud服务接入](../../user-guide/spring-cloud-proxy) 。

## 2.1 插件使用流程图

![](/img/shenyu/plugin/plugin_use_zh.jpg)

## 2.2 导入pom

* Eureka Registry

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-springcloud</artifactId>
  <version>${project.version}</version>
</dependency>

<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
  <version>${eureka-client.version}</version>
</dependency>

<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-commons</artifactId>
  <version>${spring-cloud-commons.version}</version>
</dependency>

<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-httpclient</artifactId>
  <version>${project.version}</version>
</dependency>
```

* Nacos Registry

```xml
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-springcloud</artifactId>
  <version>${project.version}</version>
</dependency>

<dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
  <version>${nacos-discovery.version}</version>
</dependency>

<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-commons</artifactId>
  <version>${spring-cloud-commons.version}</version>
</dependency>

<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-httpclient</artifactId>
  <version>${project.version}</version>
</dependency>
```

## 2.3 在ShenYu Bootstrap配置SpringCloud

### 2.3.1 配置SpringCloud的Eureka服务注册发现

```yaml
spring:
  cloud:
    discovery:
      enabled: true

eureka:
  client:
    enabled: true
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/
  instance:
    prefer-ip-address: true
```

### 2.3.2 配置SpringCloud的Nacos服务注册发现

```yaml
spring:
  cloud:
    discovery:
      enabled: true
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848 # Spring Cloud Alibaba Dubbo use this.
        enabled: true
        namespace: ShenyuRegisterCenter
```

### 2.3.3 配置SpringCloud插件负载均衡

> *注意*
> 
> 在ShenYu 2.5.0(包括)之后，ShenYu使用自有的`shenyu-loadbalancer`作为负载均衡客户端，你只需要在springcloud插件的规则配置中配置负载均衡。
> 如果你没有配置负载均衡，将使用默认的`roundRobin`算法。
>
> 在ShenYu 2.4.3(包括)之前，ShenYu使用`Ribbon`作为负载均衡客户端，你必须如下配置负载均衡。

```yaml
spring:
  cloud:
    loadbalancer:
      ribbon:
        enabled: true
```

## 2.4 启用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理-> `springCloud` ，设置为开启。

<img src="/img/shenyu/quick-start/springcloud/springcloud_open_en.png" width="60%" height="50%" />

## 2.5 配置插件

### 2.5.1 插件配置

* 你必须配置你的服务注册发现中心并将插件打开。

### 2.5.2 选择器和灰度流量配置

![](/img/shenyu/plugin/springcloud/selector_zh_2.png)

* 灰度路由

如果您想在springCloud插件中使用灰色路由，可以单击“灰色”按钮。

![](/img/shenyu/plugin/springcloud/gray_zh_2.png)

* 灰度发布可以在发布新版本应用时，自定义控制新版本应用流量比重，渐进式完成新版本应用的全量上线，最大限度地控制新版本发布带来的业务风险，降低故障带来的影响面，同时支持快速回滚。

当开启灰度是，网关的负载平衡算法将从当前节点列表中选择一个节点进行路由，并且您可以通过修改节点权重以更改负载平衡算法中节点的权重。

<img src="/img/shenyu/plugin/springcloud/gray.png" width="80%" height="80%" />

需要注意的是，如果您的业务实例没有使用`shenyu-client-springcloud`的客户端进行业务注册发现，您应该在当前选择器页面上手动添加节点信息进行灰度路由。

* 处理配置详解：

  * `serviceId`:serviceId。

  * `gray`：启用灰度路由。

    * `protocol`：协议默认值为'http://'。

    * `upstreamUrl`: 服务器节点地址。

    * `weight`: 服务器节点权重。

    * `status`:true：服务器可用，false：服务器不可用。

    * `timestamp`：节点的启动时间。

    * `warmup`：节点的预热时间，参与负载均衡计算。


### 2.5.3 规则配置

规则处理，即`handle`字段，是网关对流量完成最终匹配后，可以进行处理的操作。更多信息请参考插件管理中的 [插件处理管理](../../user-guide/admin-usage/plugin-handle-explanation) 。

* 使用 `shenyu-client-springcloud` 的规则配置

![](/img/shenyu/plugin/springcloud/rule_zh_2.png)

* 规则配置详解：

  * `timeout`：设置请求超时时间。
  * `loadbalance`：负载均衡算法，有三个可选项：`roundRobin`,`random`,`hash` 

* 未使用 `shenyu-client-springcloud` 的规则配置

![](/img/shenyu/plugin/springcloud/rule_zh.png)

* 规则配置详解：

  * `path`：请求路径。
  * `timeout`：设置请求超时时间。

## 2.6 示例

### 2.6.1 使用ShenYu访问SpringCloud服务

#### 2.6.1.1 准备工作

- 启动 `Eureka` 或 `Nacos` 服务注册发现中心, 如果你使用eureka, 启动 `shenyu-examples-eureka`即可
- 启动 `ShenYu Admin` 
- 启动 `shenyu-examples-springcloud`

#### 2.6.1.2 插件配置

- 在 `shenyu-admin` --> 基础配置 --> 插件管理-> `springCloud` ，设置为开启。

- 在`ShenYu Bootstrap`配置服务注册发现中心, 请查看 [2.3 在ShenYu Bootstrap配置SpringCloud](#2.3 在ShenYu Bootstrap配置SpringCloud)

#### 2.6.1.3 选择器配置

![](/img/shenyu/plugin/springcloud/selector_zh_2.png)

如果你想使用注册到ShenYu的灰度流量，你必须配置灰度路由。

![](/img/shenyu/plugin/springcloud/gray_zh_2.png)

#### 2.6.1.4 规则配置

如果你使用`shenyu-client-springcloud`注册服务到`ShenYu`,你可以不用配置规则，如果你想改变规则，请查看[2.5.3 规则配置](#2.5.3 规则配置)

#### 2.6.1.5 请求服务并且验证结果

![](/img/shenyu/plugin/springcloud/springcloud-request.png)

### 2.6.2 使用ShenYu访问未注册到ShenYu的SpringCloud服务

#### 2.6.2.1 准备工作

- 启动 `Eureka` 或 `Nacos` 服务注册发现中心, 如果你使用eureka, 启动 `shenyu-examples-eureka`即可
- 启动 `ShenYu Admin`
- 启动 `shenyu-examples-springcloud`

#### 2.6.2.2 插件配置

- 在 `shenyu-admin` --> 基础配置 --> 插件管理-> `springCloud` ，设置为开启。

- 在`ShenYu Bootstrap`配置服务注册发现中心, 请查看 [2.3 在ShenYu Bootstrap配置SpringCloud](#2.3 在ShenYu Bootstrap配置SpringCloud)

#### 2.6.2.3 选择器配置

![](/img/shenyu/plugin/springcloud/selector_zh_2.png)

如果你想使用未注册到ShenYu的灰度流量，你必须配置灰度流量相关的配置

![](/img/shenyu/plugin/springcloud/gray_zh_2.png)

#### 2.6.2.4 规则配置

![](/img/shenyu/plugin/springcloud/rule_zh.png)

你必须在规则配置中配置`path`字段，`path`字段为你的服务uri，例如：`/springcloud/new/feature/gateway/not`, `timeout`为你的服务允许的超时时间。

#### 2.6.2.5 通过配置访问未注册的服务

##### 2.6.2.5.1 在请求头使用 `rpc_type`字段进行访问

```
### shengyu getway proxy not support
POST http://localhost:9195/springcloud/new/feature/gateway/not
Accept: application/json
Content-Type: application/json
rpc_type: springCloud
```

##### 2.6.2.5.2 在ShenYuAdmin 添加元信息

![](/img/shenyu/plugin/springcloud/springcloud_metadata_zh.png)

#### 2.6.2.6 请求服务并且验证结果

![](/img/shenyu/plugin/springcloud/springcloud-request-unregistered.png)


# 3. 如何禁用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理-> `springCloud` ，设置为关闭。

---
title: Tars插件
keywords: ["Tars"]
description:  Tars插件
---

# 1. 概述

## 1.1 插件名称

- Tars插件

## 1.2 适用场景

- 协议转换，将 http 协议的请求转换成 Tars 框架协议的服务处理的插件
- 服务负载均衡

## 1.3 插件功能

- 将 http 协议的请求转换成 Tars 框架协议

## 1.4 插件代码

- 核心模块`shenyu-plugin-tars`
- 核心类`org.apache.shenyu.plugin.tars.TarsPlugin`

## 1.5 添加自哪个shenyu版本

- 2.3.0

# 2. 如何使用插件

## 2.1 插件使用流程图

![produce_chart_zh](/img/shenyu/plugin/tars/produce_chart_zh.png)

## 2.2 导入pom

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-client-tars</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
```

## 2.3 在客户端项目中配置

1. 在 application.yml 中配置 Tars 的配置

```yaml
shenyu:
  register:
    registerType: http #zookeeper #etcd #nacos #consul
    serverLists: http://localhost:9095 #localhost:2181 #http://localhost:2379 #localhost:8848
    props:
      username: admin
      password: 123456
  client:
    tars:
      props:
        contextPath: /tars
        appName: tars
        port: 21715
        host: 192.168.41.103 # client IP
```

2. 在接口上添加`@ShenyuTarsService`和`@ShenyuTarsClient`注解

```java
@TarsServant("HelloObj")
@ShenyuTarsService(serviceName = "ShenyuExampleServer.ShenyuExampleApp.HelloObj")
public class HelloServantImpl implements HelloServant {
  
    @Override
    @ShenyuTarsClient("/hello")
    public String hello(final int no, final String name) {
        return String.format("hello no=%s, name=%s, time=%s", no, name, System.currentTimeMillis());
    }
}
```



## 2.4 启用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理-> `tars` ，设置为开启。

![enable_tars_zh](/img/shenyu/plugin/tars/enable_tars_zh.png)

## 2.5 配置插件

### 2.5.1 配置插件

![plugin_config_zh](/img/shenyu/plugin/tars/plugin_config_zh.png)

- `multiSelectorHandle`：设置为可以多个选择器处理，在选择器列表可配置多个选择器处理服务。
- `multiRuleHandle`：设置为可以多个规则处理，在规则列表配置多个处理规则，建议配置为 single rule。
- `threadpool`：业务线程池类型，有`fixed`、`eager`、`cached`、`limited`和`shared`共5种类型，前面4种与dubbo官方提供的线程池一一对应，不多解释，这里单独说下`shared`，正如其名，`所有proxy插件`共用一个`shared`线程池，这样做的好处是能够减少线程池数量，进而降低内存、提高资源利用率。
- `corethreads`：业务线程池核心线程数。
- `threads`：业务线程池最大线程数。
- `queues`：业务线程池阻塞队列长度，0表示`无界阻塞队列`。

### 2.5.2 选择器配置

> 流量需要经过选择器匹配。

![selector_config_zh](/img/shenyu/plugin/tars/selector_config_zh.png)

- 通过`@ShenyuTarsClient`注解自动配置选择器。

### 2.5.3 规则配置

> 流量经过选择器匹配成功之后，会进入规则来进行最终的流量匹配。

![rule_config_zh](/img/shenyu/plugin/tars/rule_config_zh.png)

- 通过`@ShenyuTarsClient`注解自动配置规则。

### 2.5.4 元数据配置

> 当`Tars` 应用客户端接入到`Apache ShenYu`网关时，会自动注册，可以在 `shenyu-admin`后台管理系统的基础配置 `-->` 元数据管理中查看，每一个`Tars`接口方法，都会对应一条元数据。

![metadata_config_zh](/img/shenyu/plugin/tars/metadata_config_zh.png)

- 应用名称：该条元数据所属的应用名称。

- 方法名称：需要调用的方法名。

- 路径：`http`请路径。

- 路径描述：对该路径的说明，方便查看。

- 参数类型：按照接口的参数类型顺序。

- Rpc扩展参数：接口的扩展参数配置，`json`格式。

  示例：`{"loadbalance":"hash","retries":3,"timeout":-1}`

  - `loadbalance`：负载均衡策略，当前支持 roundRobin、random 和 hash。
  - `retries`：调用客户端超时失败的重试次数。
  - `timeout`：调用客户端的超时时间。

- 服务接口：`Tars`接口的全限定类名。
- `Rpc`类型：自动注册默认为 `tars`。

## 2.6 示例

### 2.6.1 使用 ShenYu 访问 Tars 服务

#### 2.6.1.1 准备工作

- 启动 `ShenYu Admin`。
- 启动 `Shenyu Bootstrap`。

#### 2.6.1.2 插件配置

- 打开插件，在 `shenyu-admin` --> 基础配置 --> 插件管理-> `tars` ，设置为开启。
- 根据实际情况调整 [shenyu-examples-tars](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-tars) 项目中 application.yml 和 ShenyuExampleServer.ShenyuExampleApp.config.conf 文件并启动。

#### 2.6.2.6 请求服务并且验证结果

![check_request_zh](/img/shenyu/plugin/tars/check_request_zh.png)

# 3. 如何禁用插件

- 在 shenyu-admin --> 基础配置 --> 插件管理 --> 关闭 Tars 插件状态

![close_tars_zh](/img/shenyu/plugin/tars/close_tars_zh.png)

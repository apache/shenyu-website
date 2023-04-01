---
title: Tars Plugin   
keywords: ["Tars"]
description: Tars Plugin
---

# 1. Overview

## 1.1 Plugin name

- Tars plugin

## 1.2 Appropriate scenario

- Protocol conversion, a plugin that converts http protocol requests into the Tars framework protocol
- Service Load Balancing.

## 1.3 Plugin functionality

- Converting http protocol requests to Tars framework protocol.

## 1.4 Plugin code

- Core Module `shenyu-plugin-tars`
- Core Class `org.apache.shenyu.plugin.tars.TarsPlugin`

## 1.5 Added since which shenyu version

- 2.3.0

# 2. How to use plugin

## 2.1 Plugin-use procedure chart

![image-20221206221707914](/img/shenyu/plugin/tars/produce_chart_en.png)

## 2.2 Import pom

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-client-tars</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
```

## 2.3 Configure in the client project

1. Configure the Tars configuration in application.yml.

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

2. Add the `@ShenyuTarsService` and `@ShenyuTarsClient` and  annotation to the interface.

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



## 2.4 Enable plugin

- In shenyu-admin --> BasicConfig --> Plugin --> `tars` set Status enabled.

![enable_tars_en](/img/shenyu/plugin/tars/enable_tars_en.png)


## 2.5 Config plugin

### 2.5.1 Config plugin

![plugin_config_en](/img/shenyu/plugin/tars/plugin_config_en.png)

- `multiSelectorHandle`：Set to enable multiple selector processing, multiple selector processing services can be configured in the selector list.
- `multiRuleHandle`：Set to multiple rules processing, configure multiple processing rules in the rule list, it is recommended to configure as single rule.
- `threadpool`：There are five types of business thread pools: `fixed`, `eager`, `cached`, `limited` and `shared`. The first 4 types correspond to the thread pools officially provided by dubbo. Let's talk about `shared`, as its name implies, `all proxy plugins` share a `shared` thread pool, the advantage of this is that it can reduce the number of thread pools, thereby reducing memory and improving resource utilization.
- `corethreads`：The number of core threads in the business thread pool.
- `threads`：The maximum number of threads in the business thread pool.
- `queues`：The length of the blocking queue of the business thread pool, 0 means `unbounded blocking queue`.

### 2.5.2 Selector config

> Flow needs to be matched by selector.

![selector_config_en](/img/shenyu/plugin/tars/selector_config_en.png)

Automatically configure the selectors with the `@ShenyuTarsClient` annotation.

### 2.5.3 Rule Config

> After the traffic has been successfully matched by the selector, it will enter the rules for the final traffic matching.

![rule_config_en](/img/shenyu/plugin/tars/rule_config_en.png)

Automatically configure the rules with the `@ShenyuTarsClient` annotation.

### 2.5.4 Metadata config

> When the `Tars` application client accesses the `Apache ShenYu` gateway, it will be automatically registered, and can be viewed in the `shenyu-admin` backend management system's basic configuration `-->` metadata management, each `Tars` interface method, will correspond to a metadata.

![metadata_config_en](/img/shenyu/plugin/tars/metadata_config_en.png)

- AppName: specifies the name of the application to which the metadata belongs.

- MethodName: the name of the method to call.

- Path: http request path.

- PathDescribe: the description of the path is easy to view.

- ParamsType: the parameters are separated by commas (,) in the order of interface parameter types.

- RpcExpand: other configurations of the `Tars` interface, which support the `JSON` format.

  examples：`{"loadbalance":"hash","retries":3,"timeout":-1}`

  - `loadbalance`：Load balancing policy, currently supports roundRobin, random and hash.
  - `retries`：Number of retries to call client timeout failures.
  - `timeout`：Calling the client's timeout time.

- Interface: The fully qualified class name of the `Tars` interface.

- RpcType：Auto-registration defaults to `Tars`.

## 2.6 Examples

### 2.6.1 Using ShenYu to access the Tars service

#### 2.6.1.1 Preparation

- Start `ShenYu Admin`.
- Start `Shenyu Bootstrap`.

#### 2.6.1.2 Plugin Config

- In shenyu-admin --> BasicConfig --> Plugin --> `tars` set Status enabled, And adjust the registry configuration as needed.
- Adjust to the actual situation [shenyu-examples-tars](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-tars) application.yml configuration in the project and start it.

#### 2.6.2.6 Request service and check result

![check_request_zh](/img/shenyu/plugin/tars/check_request_zh.png)

# 3. How to disable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `tars` set Status disable.

![close_tars_en](/img/shenyu/plugin/tars/close_tars_en.png)

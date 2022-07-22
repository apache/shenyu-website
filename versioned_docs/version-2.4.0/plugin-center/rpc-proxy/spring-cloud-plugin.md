---
title: Spring Cloud Plugin
keywords: ["SpringCloud"]
description: SpringCloud Plugin
---

# 1. Overview

## 1.1 Plugin Name

* SpringCloud Plugin

## 1.2 Appropriate Scenario

* transform http to springcloud
* springcloud gray flow control

## 1.3 Plugin functionality

* transform http protocol into springCloud protocol.

## 1.4 Plugin code

* Core Module `shenyu-plugin-springcloud`

* Core Class `org.apache.shenyu.plugin.springcloud.SpringCloudPlugin`

## 1.5 Added Since Which shenyu version

Since ShenYu 2.4.0

# 2. How to use plugin

* Add related dependencies and enable plugin, please refer to: [Quick start with Spring Cloud](../../quick-start/quick-start-springcloud) .

* `Spring Cloud` client access, please refer to: [Spring Cloud Proxy](../../user-guide/spring-cloud-proxy) .

## 2.1 Plugin-use procedure chart

![](/img/shenyu/plugin/logging/logging-console/loggingConsole-use-en.png)

## 2.2 Import pom

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

## 2.3 Config SpringCloud in ShenYu-Boostrap

### 2.3.1 Config SpringCloud Registry With Eureka

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

### 2.3.2 Config SpringCloud Registry With Nacos

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

### 2.3.3 Config SpringCloud LoadBalancer

> *Notice*
> 
> After ShenYu 2.5.0(include), ShenYu use `shenyu-loadbalancer` as loadbalancer client, you just config loadbalance in springcloud plugin rule.
> if you don't config loadbalance, springcloud plugin will use `roundRobin` algorithm.
> 
> Before ShenYu 2.4.3(include), ShenYu use `Ribbon` as loadbalancer client, you must config loadbalancer as follows.

```yaml
spring:
  cloud:
    loadbalancer:
      ribbon:
        enabled: false
```

## 2.4 Enable plugin

- In shenyu-admin --> BasicConfig --> Plugin --> `springCloud` set Status enabled.

<img src="/img/shenyu/quick-start/springcloud/springcloud_open_en.png" width="60%" height="50%" />

## 2.5 Config plugin

### 2.5.1 Plugin config

* you must config springcloud registry and set springcloud plugin enabled.

### 2.5.2 Selector And Gray Config

![](/img/shenyu/plugin/springcloud/selector_en_2.png)

* Gray routing

if you want to user gray route in springCloud-plugin, you can click the `gray` button.

![](/img/shenyu/plugin/springcloud/gray_en_2.png)

* Gray level publishing can customize and control the traffic proportion of new version applications when publishing new version applications, gradually complete the full launch of new version applications, maximize the business risk caused by new version publishing, reduce the impact surface caused by faults, and support rapid roll back.

when the gray is open,Gateway load balancing will select one node from the current node list for routing and you can modify node weights to change the weight of nodes in the load balancing algorithm.

<img src="/img/shenyu/plugin/springcloud/gray.png" width="80%" height="80%" />

It should be noted that,if your business instance not use the client jar of `shenyu-client-springcloud`, You should add gray node information manually on this selector page.

* `serviceId`: your springcloud service id

* `gray`：enable gray routing.

  * `protocol`: protocol default is 'http://'.

  * `upstreamUrl`: the server instance host, ip:port.

  * `weight`: the server instance and participate in load balancing calculation.

  * `status`: true: the server is available，false: the server is unavailable.

  * `timestamp`: the server's start time.

  * `warmup`: the server's warm up time and and participate in load balancing calculation.
  
### 2.5.3 Rule Config

Rule Handler, the `handle` field, can be performed by the gateway after the final matching of traffic. For more information, please refer to [Plugin handle management](../plugin-handle-explanation) in Plugin Config.

* use `shenyu-client-springcloud` rule config

![](/img/shenyu/plugin/springcloud/rule_en_2.png)

* details：

  * `timeout`：set time out.
  * `loadbalance`：loadbalance algorithm,there are three options: `roundRobin`,`random`,`hash`

* not use `shenyu-client-springcloud` rule config

![](/img/shenyu/plugin/springcloud/rule_en.png)

* details：

  * `path`：request path.
  * `timeout`：set time out.

## 2.6 Examples

### 2.6.1 Use ShenYu Request SpringCloud Service

#### 2.6.1.1 Preparation

- Start `Eureka` or `Nacos` Registry, if you use eureka, start `shenyu-examples-eureka` in `shenyu-example`
- Start `ShenYu Admin` application
- Start `shenyu-examples-springcloud`

#### 2.6.1.2 Plugin Config

- In shenyu-admin --> BasicConfig --> Plugin --> `springCloud` set Status enabled.

- Config SpringCloud Registry in `ShenYu Bootstrap`, please read [2.3 Config SpringCloud in ShenYu-Boostrap](#2.3 Config SpringCloud in ShenYu-Boostrap)

#### 2.6.1.3 Selector Config

![](/img/shenyu/plugin/springcloud/selector_en_2.png)

if your want to use gray flow and the gray flow have registered to `ShenyYu`, you must config gray upstream as follows.

![](/img/shenyu/plugin/springcloud/gray_en_2.png)

#### 2.6.1.4 Rule Config

if you use `shenyu-client-springcloud` register service to `ShenYu`, you don't config rule, if you want to change rule config,
please read [2.5.3 Rule Config](#2.5.3 Rule Config)

#### 2.6.1.5 Request SpringCloud Service and Check Result

![](/img/shenyu/plugin/springcloud/springcloud-request.png)

### 2.6.2 Use ShenYu Request Unregistered SpringCloud Service

#### 2.6.2.1 Preparation

- Start `Eureka` or `Nacos` Registry, if you use eureka, start `shenyu-examples-eureka` in `shenyu-example`
- Start `ShenYu Admin` application
- Start `shenyu-examples-springcloud`

#### 2.6.2.2 Plugin Config

- In shenyu-admin --> BasicConfig --> Plugin --> `springCloud` set Status enabled.

- Config SpringCloud Registry in `ShenYu Bootstrap`, please read [2.3 Config SpringCloud in ShenYu-Boostrap](#2.3 Config SpringCloud in ShenYu-Boostrap)

#### 2.6.2.3 Selector Config

![](/img/shenyu/plugin/springcloud/selector_en_2.png)

if your want to use gray flow and the gray flow unregister to `ShenyYu`, you must config gray upstream as follows.

![](/img/shenyu/plugin/springcloud/gray_en_2.png)

#### 2.6.2.4 Rule Config

![](/img/shenyu/plugin/springcloud/rule_en.png)

you must config `path` in rule config, `path` is your service uri, for example: `/springcloud/new/feature/gateway/not`,
`timeout` is your service allow timeout.

#### 2.6.2.5 Access Unregistered Services Through Configuration

##### 2.6.2.5.1 use the field `rpc_type` in http request header

```
### shengyu getway proxy not support
POST http://localhost:9195/springcloud/new/feature/gateway/not
Accept: application/json
Content-Type: application/json
rpc_type: springCloud
```

##### 2.6.2.5.2 add meta_data in ShenYu Admin

![](/img/shenyu/plugin/springcloud/springcloud_metadata_en.png)

#### 2.6.2.6 Request SpringCloud Service and Check Result

![](/img/shenyu/plugin/springcloud/springcloud-request-unregistered.png)

# 3. How to disable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `springCloud` set Status disable.

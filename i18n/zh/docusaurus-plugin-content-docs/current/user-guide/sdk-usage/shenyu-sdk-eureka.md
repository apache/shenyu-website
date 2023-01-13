---
title: 使用Eureka接入
keywords: ["Sdk 使用", "Eureka"]
description: Sdk使用
---

## 背景说明

Shenyu提供了Shenyu-Sdk方便让服务能够快速接入shenyu网关， 客户端服务只需要依赖该sdk， 并做些简单配置， 即可类似调用本地接口一样调用网关暴露的API。

<img src="/img/shenyu/sdk/shenyu-sdk_process.png" width="80%" height="50%" />

客户端接入网关时可使用注册中心做服务发现，支持的注册中心有`nacos、eureka、etcd、zookeeper、consul`, 下面为`shenyu-bootstrap`及`应用客户端`使用**eureka**为注册中心时的相关指引。

## 环境准备

需要参考 `运维部署` , 选择一种方式启动`shenyu-admin`及`shenyu-bootstrap`.

## shenyu-bootstrap

### 添加Maven依赖

在网关的`pom.xml`文件中引入如下依赖.

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    <version>${eureka-client.version}</version>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-loadbalancer</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

### 配置文件调整

在网关的`yml`配置文件中添加如下配置.

```yaml
spring:
  cloud:
    discovery:
      enabled: true # 启用服务发现
  
eureka:
  client:
    enabled: true
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/ # 此处填你的eureka注册中心地址
  instance:
    prefer-ip-address: true
```

## 应用客户端

### 添加Maven依赖

在应用客户端的`pom.xml`文件中引入如下依赖.

- Shenyu-Sdk 核心包

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-sdk-core</artifactId>
        <version>2.5.1-SNAPSHOT</version>
    </dependency>

    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-sdk</artifactId>
        <version>2.5.1-SNAPSHOT</version>
    </dependency>
</dependencies>
```

- Shenyu-Sdk http实现包

> http客户端实现， 目前提供实现okhttp, httpclient. 其他客户端实现可继承`AbstractShenyuSdkClient`实现。

```xml
<!-- httpclient -->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-sdk-httpclient</artifactId>
    <version>2.5.1-SNAPSHOT</version>
</dependency>

<!-- okhttp -->
<!-- 
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-sdk-okhttp</artifactId>
    <version>2.5.1-SNAPSHOT</version>
</dependency>
-->
```

### 配置文件调整

在应用客户端的`yml`配置文件中添加如下配置.

```yaml
shenyu:
  sdk:
    enabled: true
    register-type: eureka 
    server-lists: http://localhost:8761/eureka/
    props:
      retry:
        enable: true
        period: 100
        maxPeriod: 1000
        maxAttempts: 5
      algorithm: roundRobin
      scheme: http
      
# registerType : 服务注册类型，填写 eureka
# serverList: 为eureka注册类型时，配置成你的eureka注册中心地址，集群环境请使用（,）分隔
# retry 失败重试相关配置
# retry.period: 重试等待时间
# retry.maxPeriod: 最大重试等待时间 
# retry.maxAttempts: 最大重试次数
# algorithm: 负载均衡
# scheme: 请求协议头
```


## 本地接口配置

1. 在项目启动类上标注`@EnableShenyuClients(basePackages = "org.apache.shenyu.examples.sdk.http.api")`, 其中`basePackages`中维护的是Shenyu-Sdk对应维护网关API接口的所在包位置.
   
2. 创建interface并使用`@ShenyuClient(name = "xxx", contextId = "ShenyuSdkApiName")`注解标注, 其中`name`表示网关服务名.假如你需要定义多个bean来维护网关的API, 可以使用`contextId`作为对应的bean别名.

3. 在定义接口中添加所要映射shenyu网关中的接口方法， 其中`@xxMapping`中的`value`对应值是网关中对应请求的路径。

**示例**

项目启动类

```java
@SpringBootApplication
@EnableShenyuClients(basePackages = "org.apache.shenyu.examples.sdk.http.api")
public class ShenyuSdkHttpExampleApplication {

    /**
     * main.
     *
     * @param args args
     */
    public static void main(final String[] args) {
        SpringApplication.run(ShenyuSdkHttpExampleApplication.class, args);
    }
}
```

网关API接口

```java
@ShenyuClient(name = "shenyu-bootstrap", contextId = "ShenyuSdkApiName")
public interface ShenyuHttpClientApi {

    /**
     * findById.
     * test Get.
     *
     * @param id id
     * @return SdkTestDto
     */
    @GetMapping("/http/shenyu/client/findById")
    SdkTestDto findById(@RequestParam("id") String id);
}
```

更多可参考示例工程 [shenyu-examples-sdk](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-sdk)

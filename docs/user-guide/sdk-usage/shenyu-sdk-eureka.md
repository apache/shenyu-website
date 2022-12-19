---
title: Using Eureka with Shenyu-SDK
keywords: ["Using Shenyu-Sdk", "Eureka"]
description: Using Shenyu-Sdk
---

## Background explanation

Shenyu offers Shenyu-Sdk to make it easy for services to quickly integrate with the Shenyu gateway. By simply depending on the SDK and doing some simple configuration, client services can call the gateway's exposed APIs as if they were calling local interfaces.

<img src="/img/shenyu/sdk/shenyu-sdk_process.png" width="80%" height="50%" />

The registration center supported by the gateway for client access includes (nacos, eureka, etcd, zookeeper, consul), and the following is the relevant guide for using **eureka** registration center when `shenyu-bootstrap` and `application client` are used.

## Environment preparation

Refer to `Deployment` guide, and choose a way to start `shenyu-admin` and `shenyu-bootstrap`.

## shenyu-bootstrap

### Maven dependency

In the gateway's `pom.xml` file, introduce the following dependencies.

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

### Edit the configuration file

Add the following configuration to the gateway's `yml` configuration file.

```yaml
spring:
  cloud:
    discovery:
      enabled: true # Enable service discovery
  
eureka:
  client:
    enabled: true
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/ # Enter your eureka registry center address here
  instance:
    prefer-ip-address: true
```

## Client Application

### Maven dependency

In the `pom.xml` file of the application client, introduce the following dependencies.

- Shenyu-Sdk Core

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

- Shenyu-Sdk http implementation

> HTTP client implementation, offering okhttp and httpclient as implementation options. Other implementations can be created by extending the `AbstractShenyuSdkClient` class.

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

### Edit the configuration file

Add the following configuration in the application client's `yml` configuration file.

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
      
# registerType: service registration type, fill in eureka
# serverList: Enter the eureka server address(es), separated by commas in English.
# scheme: Request protocol.

# retry: Configuration related to failure retries.
# retry.period: Retry waiting time.
# retry.maxPeriod: Maximum retry waiting time .
# retry.maxAttempts: Maximum retry count.
```


## Writing the local interface for the SDK

1. In the project startup class, annotate `@EnableShenyuClients(basePackages = "org.apache.shenyu.examples.sdk.http.api")`, where `basePackages` maintains the package location of Shenyu-Sdk's corresponding maintained gateway API interface.

2. Create an interface and use the `@ShenyuClient(name = "xxx", contextId = "ShenyuSdkApiName")` annotation to mark it, where `name` represents the gateway service name. If you need to define multiple beans to maintain the gateway's API, you can use `contextId` as the corresponding bean alias.

3. In the defined interface, add the methods of the interface to be mapped to the shenyu gateway, where the `value` of `@xxMapping` corresponds to the path of the corresponding request in the gateway.

**Example**

Project startup class

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

Shenyu-SDK interface

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

For more information, refer to the sample project [shenyu-examples-sdk](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-sdk)
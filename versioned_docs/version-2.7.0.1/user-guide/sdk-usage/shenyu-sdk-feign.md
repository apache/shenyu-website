---
title: Using Shenyu-SDK-Feign
keywords: ["Using Shenyu-Sdk", "feign"]
description: Using Shenyu-Sdk-Feign
---

## Shenyu sdk-feign

> Integrate `open Feign` to implement declarative SDK call gateway API.
> Like 'shenyu sdk', 'shenyu sdk feign' is another option;
> for more information see :
> * please refer to: [shenyu-sdk-consul](../../user-guide/sdk-usage/shenyu-sdk-consul)
> * please refer to: [shenyu-sdk-etcd](../../user-guide/sdk-usage/shenyu-sdk-etcd)
> * please refer to: [shenyu-sdk-eureka](../../user-guide/sdk-usage/shenyu-sdk-eureka)
> * please refer to: [shenyu-sdk-nacos](../../user-guide/sdk-usage/shenyu-sdk-nacos)
> * please refer to: [shenyu-sdk-zookeeper](../../user-guide/sdk-usage/shenyu-sdk-zookeeper)

### Maven dependency

In the `pom.xml` file of the application client, introduce the following dependencies(Compatible with `FeignClient`).

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-openfeign</artifactId>
        <version>${spring-cloud.version}</version>
    </dependency>
    
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-sdk-feign</artifactId>
        <version>2.6.1-SNAPSHOT</version>
    </dependency>
</dependencies>
```


### Edit the configuration file

Add the following configuration in the application client's `yml` configuration file.

```yaml
shenyu:
  sdk:
    enabled: true
    register-type: consul
    server-lists: localhost
    props:
      algorithm: roundRobin
      scheme: http

# if not use openFeign and springCloud-loadBalance, feign client options must be enabled.
feign:
  client:
    httpclient:
      enabled: true

# registerType: service registration type, fill in consul.
# serverLists: consul client agent address (sidecar deployment mode (single machine or cluster), can also be the address of consul server agent (can only connect to one consul server agent node, if it is a cluster, then there will be a single point of failure problem)).

# algorithm: load balance algorithm.
# scheme: Request protocol.

```

## Writing the local interface for the SDK

1. In the project startup class, annotate `@EnableShenyuClients(basePackages = "org.apache.shenyu.examples.sdk.http.api")`, where `basePackages` maintains the package location of Shenyu-Sdk's corresponding maintained gateway API interface.

2. Create an interface and use the `@ShenyuClient(name = "xxx", contextId = "ShenyuSdkApiName")` annotation to mark it, where `name` represents the gateway service name. If you need to define multiple beans to maintain the gateway's API, you can use `contextId` as the corresponding bean alias.

3. In the defined interface, add the methods of the interface to be mapped to the shenyu gateway, where the `value` of `@xxMapping` corresponds to the path of the corresponding request in the gateway.

**Example**

Project startup class

```java
import org.apache.shenyu.sdk.feign.EnableShenyuClients;

@SpringBootApplication
@EnableShenyuClients(basePackages = "org.apache.shenyu.examples.sdk.feign.api")
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
import org.apache.shenyu.sdk.feign.ShenyuClient;

@ShenyuClient(name = "shenyu-gateway", contextId = "ShenyuSdkApiName", path = "/feign/shenyu/client")
public interface ShenyuFeignClientApi {

    /**
     * findById.
     * test Get.
     *
     * @param id id
     * @return SdkTestDto
     */
    @GetMapping("/findById")
    SdkTestDto findById(@RequestParam("id") String id);

    /**
     * annoTest.
     *
     * @param cookie     cookie
     * @param header     header
     * @param id         id
     * @param requestDto requestDto
     * @return sdkTestDto
     */
    @PostMapping("/{id}/anno")
    SdkTestDto annoTest(@CookieValue("cookie") String cookie, @RequestHeader("header") String header, @PathVariable("id") String id, @RequestBody SdkTestDto requestDto);

}
```

For more information, refer to the sample project [shenyu-examples-sdk-feign](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-sdk/shenyu-examples-sdk-feign)

---
title: 使用 Shenyu-SDK-Feign
keywords: ["Shenyu-Sdk 使用", "feign"]
description: Shenyu-Sdk-Feign 使用
---

## Shenyu sdk-feign

> 集成`openFeign`来实现声明式SDK调用网关API.
> 与`shenyu-sdk`一样, `shenyu-sdk-feign`是另外一个选项;
> 详情请看 :
> * 请参照: [shenyu-sdk-consul](../../user-guide/sdk-usage/shenyu-sdk-consul)
> * 请参照: [shenyu-sdk-etcd](../../user-guide/sdk-usage/shenyu-sdk-etcd)
> * 请参照: [shenyu-sdk-eureka](../../user-guide/sdk-usage/shenyu-sdk-eureka)
> * 请参照: [shenyu-sdk-nacos](../../user-guide/sdk-usage/shenyu-sdk-nacos)
> * 请参照: [shenyu-sdk-zookeeper](../../user-guide/sdk-usage/shenyu-sdk-zookeeper)

### 添加Maven依赖

在客户端应用的`pom.xml`文件中引入如下依赖(与`FeignClient`兼容).

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


### 配置文件

在客户端应用的`yml`配置文件中添加以下配置.

```yaml
shenyu:
  sdk:
    enabled: true
    register-type: consul
    server-lists: localhost
    props:
      algorithm: roundRobin
      scheme: http

# 如果不使用`openFeign`和`springCloud-loadBalance`，则必须启用外部客户端选项。.
feign:
  client:
    httpclient:
      enabled: true
      
# registerType : 服务注册类型，填写 etcd
# serverList: 为etcd注册类型时，填写etcd地址，多个地址用英文逗号分隔

# algorithm: 负载均衡算法.
# scheme: 请求协议.

```

## 本地接口配置

1. 在项目启动类上标注`@EnableShenyuClients(basePackages = "org.apache.shenyu.examples.sdk.feign.api")`, 其中`basePackages`中维护的是Shenyu-Sdk对应维护网关API接口的所在包位置.

2. 创建interface并使用`@ShenyuClient(name = "xxx", contextId = "ShenyuSdkApiName")`注解标注, 其中`name`表示网关服务名.假如你需要定义多个bean来维护网关的API, 可以使用`contextId`作为对应的bean别名.

3. 在定义接口中添加所要映射shenyu网关中的接口方法， 其中`@xxMapping`中的`value`对应值是网关中对应请求的路径。

**示例**

项目启动类

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

网关API接口

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

更多可参考示例工程 [shenyu-examples-sdk-feign](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-sdk/shenyu-examples-sdk-feign)

---
title: Brpc服务接入
description: Brpc服务接入
---

此篇文介绍如何将 `Brpc` 服务接入到 `Apache ShenYu` 网关，`Apache ShenYu` 网关使用 `Brpc` 插件来接入`Brpc`服务。

接入前，请正确启动 `shenyu-admin`，并开启`Brpc`插件，在网关端和`Brpc`服务端引入相关依赖。可以参考前面的 [Brpc快速开始](../../quick-start/quick-start-brpc) 。


应用客户端接入的相关配置请参考：[客户端接入配置](../property-config/register-center-access.md)。

数据同步的相关配置请参考：[数据同步配置](../property-config/use-data-sync.md)。

## 在网关中引入 Brpc 插件


引入网关对`Brpc`的代理插件，在网关的 `pom.xml` 文件中增加如下依赖：


```xml
  <!-- apache shenyu brpc plugin -->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-brpc</artifactId>
      <version>${project.version}</version>
  </dependency>
```

* 重启你的网关服务。

## Brpc服务接入网关

可以参考： [shenyu-examples-brpc](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-brpc)

1. 在由`Brpc`构建的微服务中，引入如下依赖：

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-client-brpc</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
```

2. 在 `application.yaml` 配置文件增加如下配置：

```yaml
server:
  port: 8011
  address: 0.0.0.0
  servlet:
    context-path: /
spring:
  main:
    allow-bean-definition-overriding: true
  application:
    name: brpc-exmaples

shenyu:
  register:
    registerType: http #zookeeper #etcd #nacos #consul
    serverLists: http://localhost:9095 #localhost:2181 #http://localhost:2379 #localhost:8848
    props:
      username: admin
      password: 123456
  client:
    brpc:
      props:
        contextPath: /brpc
        ipAndPort: brpc
        appName: brpc
        port: 8005
        host: 127.0.0.1

# starlight
starlight:
  server:
    enable: true
    port: 8005
```

3. 在`Brpc`服务接口实现类的方法上加上注解`@ShenyuBrpcClient`，启动你的服务提供者，成功注册后，在后台管理系统进入`插件列表 -> rpc proxy -> brpc`，会看到自动注册的选择器和规则信息。

示例：

```java
@ShenyuBrpcService
public class BrpcDemoServiceImpl implements BrpcDemoService {
    @Override
    @ShenyuBrpcClient("/connect")
    public void connect() {
        LOG.info("Connect Success");
    }
}
```

## 用户请求

可以通过 `http` 的方式来请求你的`Brpc`服务。`Apache ShenYu`网关需要有一个路由前缀，这个路由前缀就是接入网关配置的 `contextPath`。比如： `http://localhost:9195/brpc/connect` 。

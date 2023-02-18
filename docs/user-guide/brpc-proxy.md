---
title: Brpc Proxy
description: Brpc Proxy
---

This document is intended to help the `Brpc` service access the `Apache ShenYu` gateway. The `Apache ShenYu` gateway uses the `Brpc` plugin to handle `Brpc` service.

Before the connection, start `shenyu-admin` correctly, start `Brpc` plugin, and add related dependencies on the gateway and `Brpc` application client. Refer to the previous [Quick start with Brpc](../quick-start/quick-start-brpc) .

For details about client access configuration, see [Application Client Access Config](property-config/register-center-access.md) .

For details about data synchronization configurations, see [Data Synchronization Config](property-config/use-data-sync.md) .

## Add Brpc plugin in gateway

Add the following dependencies to the gateway's `pom.xml` file:


```xml
  <!-- apache shenyu brpc plugin -->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-brpc</artifactId>
      <version>${project.version}</version>
  </dependency>
```

* Restart your gateway service.

## Brpc service access gateway

Please refer to: [shenyu-examples-brpc](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-brpc)

1. In the microservice built by `Brpc`, add the following dependencies:

```xml
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-client-brpc</artifactId>
      <version>${shenyu.version}</version>
  </dependency>
```

2. Add the following configuration to the `application.yaml` configuration file:

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
        port: ${starlight.server.port}

# starlight
starlight:
  server:
    enable: true
    port: 8005
```


3. Add `@ShenyuBrpcClient` annotation to the method of `Brpc` service interface implementation class, start your service provider, after successful registration, go to PluginList -> rpc proxy -> brpc in the background management system, you will see automatic registration of selectors and rules information.

Example:

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

## User Request

You can request your `Brpc` service by Http. The `Apache ShenYu` gateway needs to have a route prefix which is the `contextPath` configured by the access gateway. For example: `http://localhost:9195/brpc/connect` .

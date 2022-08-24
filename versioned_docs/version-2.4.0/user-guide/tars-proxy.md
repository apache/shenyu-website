---
title: Tars Proxy
description: Tars服务接入
---

This document is intended to help the `Tars` service access the `Apache ShenYu` gateway. The `Apache ShenYu` gateway uses the `tars` plugin to handle `tars` service.

Before the connection, start `shenyu-admin` correctly, start `tars` plugin, and add related dependencies on the gateway and `tars` application client. Refer to the previous [Quick start with Tars](../quick-start/quick-start-tars) .

For details about client access configuration, see [Application Client Access Config](./register-center-access) .

For details about data synchronization configurations, see [Data Synchronization Config](./use-data-sync)).

## Add tars plugin in gateway

Add the following dependencies to the gateway's `pom.xml` file:

```xml
        <!-- apache shenyu tars plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-tars</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>com.tencent.tars</groupId>
            <artifactId>tars-client</artifactId>
            <version>1.7.2</version>
        </dependency>
        <!-- apache shenyu tars plugin end-->
```

* Restart your gateway service.

## Tars service access gateway

Please refer to： [shenyu-examples-tars](https://github.com/apache/incubator-shenyu/tree/v2.4.0/shenyu-examples/shenyu-examples-tars)

1. In the microservice built by `Tars`, add the following dependencies:

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-client-tars</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
```

2. Add the following configuration to the `application.yaml` configuration file:

```yaml
shenyu:
  client:
    registerType: http #zookeeper #etcd #nacos #consul
    serverLists: http://localhost:9095 #localhost:2181 #http://localhost:2379 #localhost:8848
    props:
      contextPath: /tars
      appName: tars
      port: 21715
      host: 192.168.41.103
      nacosNameSpace: ShenyuRegisterCenter
```

3. Add `@ShenyuTarsService` Annotation on the tars service interface implementation class and `@ShenyuTarsClient` on the method, start your service provider, and register successfully. In the background management system, enter PluginList -> rpc proxy -> tars, you will see the automatic registration of selectors and rules information.

Example:

```java
    @TarsServant("HelloObj")
    @ShenyuTarsService(serviceName = "ShenyuExampleServer.ShenyuExampleApp.HelloObj")
    public class HelloServantImpl implements HelloServant {
        @Override
        @ShenyuTarsClient(path = "/hello", desc = "hello")
        public String hello(int no, String name) {
            return String.format("hello no=%s, name=%s, time=%s", no, name, System.currentTimeMillis());
        }

        @Override
        @ShenyuTarsClient(path = "/helloInt", desc = "helloInt")
        public int helloInt(int no, String name) {
            return 1;
        }
    }

```

## User Request

You can request your tars service by Http. The `Apache ShenYu` gateway needs to have a route prefix which is the `contextPath` configured by the access gateway. For example: `http://localhost:9195/tars/hello` .

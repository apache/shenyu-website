---
title: Motan Proxy
description: Motan Proxy
---


This document is intended to help the `Motan` service access the `Apache ShenYu` gateway. The `Apache ShenYu` gateway uses the `Motan` plugin to handle `motan` service.

Before the connection, start `shenyu-admin` correctly, start `Motan` plugin, and add related dependencies on the gateway and `Motan` application client. Refer to the previous [Quick start with Motan](../quick-start/quick-start-motan) .

For details about client access configuration, see [Application Client Access Config](./register-center-access) .

For details about data synchronization configurations, see [Data Synchronization Config](./use-data-sync) .

## Add motan plugin in gateway


Add the following dependencies to the gateway's `pom.xml` file:



```xml
  <!-- apache shenyu motan plugin -->
          <dependency>
              <groupId>org.apache.shenyu</groupId>
              <artifactId>shenyu-spring-boot-starter-plugin-motan</artifactId>
              <version>${project.version}</version>
          </dependency>
  
          <dependency>
              <groupId>com.weibo</groupId>
              <artifactId>motan-core</artifactId>
              <version>1.1.9</version>
          </dependency>
  
          <dependency>
              <groupId>com.weibo</groupId>
              <artifactId>motan-registry-zookeeper</artifactId>
              <version>1.1.9</version>
          </dependency>
  
          <dependency>
              <groupId>com.weibo</groupId>
              <artifactId>motan-transport-netty4</artifactId>
              <version>1.1.9</version>
          </dependency>
  
          <dependency>
              <groupId>com.weibo</groupId>
              <artifactId>motan-springsupport</artifactId>
              <version>1.1.9</version>
          </dependency>
```

* Restart your gateway service.

## Motan service access gateway

Please refer to: [shenyu-examples-motan](https://github.com/apache/incubator-shenyu/tree/v2.4.0/shenyu-examples/shenyu-examples-motan)

* In the microservice built by `Motan`, add the following dependencies:


```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-client-motan</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
```


Add `@ShenyuMotanClient` annotation to the method of `Motan` service interface implementation class, start your service provider, after successful registration, go to PluginList -> rpc proxy -> motan in the background management system, you will see automatic registration of selectors and rules information.

Example:

```java
    @MotanService(export = "demoMotan:8002")
    public class MotanDemoServiceImpl implements MotanDemoService {
        @Override
        @ShenyuMotanClient(path = "/hello")
        public String hello(String name) {
            return "hello " + name;
        }
    }
```

## User Request

You can request your `motan` service by Http. The `Apache ShenYu` gateway needs to have a route prefix which is the `contextPath` configured by the access gateway. For example: `http://localhost:9195/motan/hello` .

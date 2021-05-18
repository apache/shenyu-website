---
title: Quick start with http
description: Quick start with http
---

This document introduces how to quickly access the ShenYu Gateway using Http. You can get the code example of this document by clicking [here](https://github.com/dromara/shenyu/tree/master/shenyu-examples/shenyu-examples-http).

## Environment to prepare

Please refer to the [setup](../shenyu-set-up) and launch `shenyu-admin` and `shenyu-bootstrap`.

Introducing gateway to HTTP proxy plugin

* Add the following dependencies to the `shenyu-bootstrap`'s `pom.xml` file:

```xml
<!--if you use http proxy start this-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-divide</artifactId>
    <version>${last.version}</version>
</dependency>

<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-httpclient</artifactId>
    <version>${last.version}</version>
</dependency>
```

## Run the shenyu-examples-http project

Download[shenyu-examples-http](https://github.com/dromara/shenyu/tree/master/shenyu-examples/shenyu-examples-http)

Execute the `org.dromara.shenyu.examples.http.ShenyuTestHttpApplication` main method to start project.

The following log appears when the startup is successful:
```shell
2021-02-10 00:57:07.561  INFO 3700 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : http client register success: {"appName":"http","context":"/http","path":"/http/test/**","pathDesc":"","rpcType":"http","host":"192.168.50.13","port":8188,"ruleName":"/http/test/**","enabled":true,"registerMetaData":false} 
2021-02-10 00:57:07.577  INFO 3700 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : http client register success: {"appName":"http","context":"/http","path":"/http/order/save","pathDesc":"Save order","rpcType":"http","host":"192.168.50.13","port":8188,"ruleName":"/http/order/save","enabled":true,"registerMetaData":false} 
2021-02-10 00:57:07.587  INFO 3700 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : http client register success: {"appName":"http","context":"/http","path":"/http/order/path/**/name","pathDesc":"","rpcType":"http","host":"192.168.50.13","port":8188,"ruleName":"/http/order/path/**/name","enabled":true,"registerMetaData":false} 
2021-02-10 00:57:07.596  INFO 3700 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : http client register success: {"appName":"http","context":"/http","path":"/http/order/findById","pathDesc":"Find by id","rpcType":"http","host":"192.168.50.13","port":8188,"ruleName":"/http/order/findById","enabled":true,"registerMetaData":false} 
2021-02-10 00:57:07.606  INFO 3700 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : http client register success: {"appName":"http","context":"/http","path":"/http/order/path/**","pathDesc":"","rpcType":"http","host":"192.168.50.13","port":8188,"ruleName":"/http/order/path/**","enabled":true,"registerMetaData":false} 
2021-02-10 00:57:08.023  INFO 3700 --- [           main] o.s.b.web.embedded.netty.NettyWebServer  : Netty started on port(s): 8188
2021-02-10 00:57:08.026  INFO 3700 --- [           main] o.d.s.e.http.ShenyuTestHttpApplication     : Started ShenyuTestHttpApplication in 2.555 seconds (JVM running for 3.411) 
```

## Enable the Divide plugin to handle HTTP requests

* enabled the `divide` plugin in the `shenyu-admin` plugin management.

## Testing http request

The `shenyu-examples-http` project will automatically register interface methods annotated with `@ShenyuSpringMvcClient` in the shenyu gateway after successful startup.

Open Plugin Management -> divide to see the list of plugin rule configurations

![](/img/soul/quick-start/http/rule-list.png)

Use PostMan to simulate HTTP to request your http service

![](/img/soul/quick-start/http/postman-test.png)

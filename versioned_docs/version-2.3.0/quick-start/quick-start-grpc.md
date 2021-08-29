---
title: Quick start with grpc
description: Quick start with grpc
---

This document introduces how to quickly access the Soul Gateway using Grpc. You can get the code example of this document by clicking [here](https://github.com/dromara/soul/tree/2.3.0/soul-examples/soul-examples-grpc).

## Environment to prepare

Please refer to the [setup](../users-guide/soul-set-up) and launch `soul-admin` and `soul-bootstrap`.

Note: `soul-bootstrap` need to import grpc dependencies
```xml
<dependency>
    <groupId>org.dromara</groupId>
    <artifactId>soul-spring-boot-starter-plugin-grpc</artifactId>
    <version>${project.version}</version>
</dependency>
```

## Run the soul-examples-grpc project

Download [soul-examples-grpc](https://github.com/dromara/soul/tree/2.3.0/soul-examples/soul-examples-grpc)

Run the following command under `soul-examples-grpc` to generate Java code
```shell
mvn protobuf:compile 
mvn protobuf:compile-custom 
```

Execute the `org.dromara.soul.examples.grpc.SoulTestGrpcApplication` main method to start project.

The following log appears when the startup is successful:
```shell
2021-02-10 01:57:02.154  INFO 76 --- [           main] o.d.s.e.grpc.SoulTestGrpcApplication     : Started SoulTestGrpcApplication in 2.088 seconds (JVM running for 3.232)
2021-02-10 01:57:02.380  INFO 76 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : grpc client register success: {"appName":"127.0.0.1:8080","contextPath":"/grpc","path":"/grpc/echo","pathDesc":"","rpcType":"grpc","serviceName":"echo.EchoService","methodName":"echo","ruleName":"/grpc/echo","parameterTypes":"echo.EchoRequest,io.grpc.stub.StreamObserver","rpcExt":"{\"timeout\":-1}","enabled":true} 
```

## Grpc plugin settings

* enabled the `grpc` plugin in the `soul-admin` plugin management.

## Testing

The `soul-examples-grpc` project will automatically register interface methods annotated with `@SoulGrpcClient` in the soul gateway after successful startup.

Open Plugin Management -> grpc to see the list of plugin rule configurations

![](/img/soul/quick-start/grpc/rule-list.png)

Use PostMan to simulate HTTP to request your Grpc service

![](/img/soul/quick-start/grpc/postman-test.png)

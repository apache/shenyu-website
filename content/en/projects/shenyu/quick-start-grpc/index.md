---
title: Quick start with grpc
description: Quick start with grpc
---

This document introduces how to quickly access the ShenYu Gateway using Grpc. You can get the code example of this document by clicking [here](https://github.com/dromara/shenyu/tree/master/shenyu-examples/shenyu-examples-grpc).

## Environment to prepare

Please refer to the [setup](../shenyu-set-up) and launch `shenyu-admin` and `shenyu-bootstrap`.

Note: `shenyu-bootstrap` need to import grpc dependencies
```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-grpc</artifactId>
    <version>${project.version}</version>
</dependency>
```

## Run the shenyu-examples-grpc project

Download [shenyu-examples-grpc](https://github.com/dromara/shenyu/tree/master/shenyu-examples/shenyu-examples-grpc)

Run the following command under `shenyu-examples-grpc` to generate Java code
```shell
mvn protobuf:compile 
mvn protobuf:compile-custom 
```

Execute the `org.dromara.shenyu.examples.grpc.ShenyuTestGrpcApplication` main method to start project.

The following log appears when the startup is successful:
```shell
2021-02-10 01:57:02.154  INFO 76 --- [           main] o.d.s.e.grpc.ShenyuTestGrpcApplication     : Started ShenyuTestGrpcApplication in 2.088 seconds (JVM running for 3.232)
2021-02-10 01:57:02.380  INFO 76 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : grpc client register success: {"appName":"127.0.0.1:8080","contextPath":"/grpc","path":"/grpc/echo","pathDesc":"","rpcType":"grpc","serviceName":"echo.EchoService","methodName":"echo","ruleName":"/grpc/echo","parameterTypes":"echo.EchoRequest,io.grpc.stub.StreamObserver","rpcExt":"{\"timeout\":-1}","enabled":true} 
```

## Grpc plugin settings

* enabled the `grpc` plugin in the `shenyu-admin` plugin management.

## Testing

The `shenyu-examples-grpc` project will automatically register interface methods annotated with `@ShenyuGrpcClient` in the shenyu gateway after successful startup.

Open Plugin Management -> grpc to see the list of plugin rule configurations

![](/img/shenyu/quick-start/grpc/rule-list.png)

Use PostMan to simulate HTTP to request your Grpc service

![](/img/shenyu/quick-start/grpc/postman-test.png)

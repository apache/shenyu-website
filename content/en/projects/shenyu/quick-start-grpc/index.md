---
title: Quick start with gRPC
description: Quick start with gRPC
---

This document introduces how to quickly access the ShenYu Gateway using gRPC. You can get the code example of this document by clicking [here](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-grpc).

## 1. Prepare For Environment.

Please refer to the [setup](../shenyu-set-up) and launch `shenyu-admin` and `shenyu-bootstrap`.

Note: `shenyu-bootstrap` need to import gRPC dependencies
```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-grpc</artifactId>
    <version>${project.version}</version>
</dependency>
```

## 2. Run the shenyu-examples-grpc project.

Download [shenyu-examples-grpc](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-grpc)

Run the following command under `shenyu-examples-grpc` to generate Java code
```shell
mvn protobuf:compile 
mvn protobuf:compile-custom 
```

Execute the `org.dromara.shenyu.examples.grpc.ShenyuTestGrpcApplication` main method to start project.

The following log appears when the startup is successful:
```shell
2021-06-18 19:33:32.866  INFO 11004 --- [or_consumer_-19] o.a.s.r.client.http.utils.RegisterUtils  : grpc client register success: {"appName":"127.0.0.1:8080","contextPath":"/grpc","path":"/grpc/clientStreamingFun","pathDesc":"clientStreamingFun","rpcType":"grpc","serviceName":"stream.StreamService","methodName":"clientStreamingFun","ruleName":"/grpc/clientStreamingFun","parameterTypes":"io.grpc.stub.StreamObserver","rpcExt":"{\"timeout\":5000,\"methodType\":\"CLIENT_STREAMING\"}","enabled":true,"host":"172.20.10.6","port":8080,"registerMetaData":false} 
2021-06-18 19:33:32.866  INFO 11004 --- [or_consumer_-17] o.a.s.r.client.http.utils.RegisterUtils  : grpc client register success: {"appName":"127.0.0.1:8080","contextPath":"/grpc","path":"/grpc/echo","pathDesc":"echo","rpcType":"grpc","serviceName":"echo.EchoService","methodName":"echo","ruleName":"/grpc/echo","parameterTypes":"echo.EchoRequest,io.grpc.stub.StreamObserver","rpcExt":"{\"timeout\":5000,\"methodType\":\"UNARY\"}","enabled":true,"host":"172.20.10.6","port":8080,"registerMetaData":false} 
2021-06-18 19:33:32.866  INFO 11004 --- [or_consumer_-20] o.a.s.r.client.http.utils.RegisterUtils  : grpc client register success: {"appName":"127.0.0.1:8080","contextPath":"/grpc","path":"/grpc/bidiStreamingFun","pathDesc":"bidiStreamingFun","rpcType":"grpc","serviceName":"stream.StreamService","methodName":"bidiStreamingFun","ruleName":"/grpc/bidiStreamingFun","parameterTypes":"io.grpc.stub.StreamObserver","rpcExt":"{\"timeout\":5000,\"methodType\":\"BIDI_STREAMING\"}","enabled":true,"host":"172.20.10.6","port":8080,"registerMetaData":false} 
2021-06-18 19:33:32.866  INFO 11004 --- [or_consumer_-21] o.a.s.r.client.http.utils.RegisterUtils  : grpc client register success: {"appName":"127.0.0.1:8080","contextPath":"/grpc","path":"/grpc/unaryFun","pathDesc":"unaryFun","rpcType":"grpc","serviceName":"stream.StreamService","methodName":"unaryFun","ruleName":"/grpc/unaryFun","parameterTypes":"stream.RequestData,io.grpc.stub.StreamObserver","rpcExt":"{\"timeout\":5000,\"methodType\":\"UNARY\"}","enabled":true,"host":"172.20.10.6","port":8080,"registerMetaData":false} 
2021-06-18 19:33:32.866  INFO 11004 --- [or_consumer_-18] o.a.s.r.client.http.utils.RegisterUtils  : grpc client register success: {"appName":"127.0.0.1:8080","contextPath":"/grpc","path":"/grpc/serverStreamingFun","pathDesc":"serverStreamingFun","rpcType":"grpc","serviceName":"stream.StreamService","methodName":"serverStreamingFun","ruleName":"/grpc/serverStreamingFun","parameterTypes":"stream.RequestData,io.grpc.stub.StreamObserver","rpcExt":"{\"timeout\":5000,\"methodType\":\"SERVER_STREAMING\"}","enabled":true,"host":"172.20.10.6","port":8080,"registerMetaData":false} 
```

## 3. gRPC plugin setting.

Enabled the `gRPC` plugin in the `shenyu-admin` plugin management.

<img src="/img/shenyu/quick-start/grpc/grpc-on-en.png" width="80%" height="50%" />


## 4. Testing.

The `shenyu-examples-grpc` project will automatically register interface methods annotated with `@ShenyuGrpcClient` in the shenyu gateway after successful startup.

Open Plugin Management -> gRPC to see the list of plugin rule configurations.

![](/img/shenyu/quick-start/grpc/grpc-service-en.png)

Use `postman` to simulate `http` to request your gRPC service. The following is the request body.

```json
{
    "data": [
        {
            "message": "hello grpc"
        }
    ]
}
```

![](/img/shenyu/quick-start/grpc/grpc-echo.png)

The parameters are passed in json format. The name of the key is `data` by default, and you can reset it in `GrpcConstants.JSON_DESCRIPTOR_PROTO_FIELD_NAME`. The input of value is based on the proto file defined by you.

## 5. Streaming.
The shenyu can support streaming of gRPC. The following shows the calls of the four method types of gRPC. In streaming, you can pass multiple parameters in the form of an array.


- `UNARY`

The request body like this.
```json
{
    "data": [
        {
            "text": "hello grpc"
        }
    ]
}
```
Then, call gRPC service by `UNARY` method type.

![](/img/shenyu/quick-start/grpc/grpc-unary.png)

- `CLIENT_STREAMING`

The request body like this.
```json
{
    "data": [
        {
            "text": "hello grpc"
        }, 
        {
            "text": "hello grpc"
        }, 
        {
            "text": "hello grpc"
        }
    ]
}
```
Then, call gRPC service by `CLIENT_STREAMING` method type.

![](/img/shenyu/quick-start/grpc/grpc-client-stream.png)

- `SERVER_STREAMING`

The request body like this.
```json
{
    "data": [
        {
            "text": "hello grpc"
        }
    ]
}
```
Then, call gRPC service by `SERVER_STREAMING` method type.

![](/img/shenyu/quick-start/grpc/grpc-server-stream.png)

- `BIDI_STREAMING`


The request body like this.
```json
{
    "data": [
        {
            "text": "hello grpc"
        }, 
        {
            "text": "hello grpc"
        }, 
        {
            "text": "hello grpc"
        }
    ]
}
```
Then, call gRPC service by `BIDI_STREAMING` method type.

![](/img/shenyu/quick-start/grpc/grpc-bidi-stream.png)
---
title: gRPC Proxy
keywords: ["gRPC"]
description: gRPC access shenyu gateway
---

This document is intended to help the `gRPC` service access the `Apache ShenYu` gateway. The `Apache ShenYu` gateway uses the `gRPC` plugin to handle `gRPC` service.

Before the connection, start `shenyu-admin` correctly, start `gRPC` plugin, and add related dependencies on the gateway and `gRPC` application client. Refer to the previous [Quick start with gRPC](../quick-start/quick-start-grpc) .

For details about client access configuration, see [Application Client Access Config](./register-center-access) .

For details about data synchronization configurations, see [Data Synchronization Config](./use-data-sync) .

## Add gRPC plugin in gateway

Add the following dependencies in the gateway's `pom.xml` file:

```xml
        <!-- apache shenyu grpc plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-grpc</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- apache shenyu grpc plugin end-->
```

* Restart the gateway service.

## gRPC service access gateway

You can refer to：[shenyu-examples-grpc](https://github.com/apache/shenyu/tree/v2.4.3/shenyu-examples/shenyu-examples-grpc) .

1. In the microservice built by `gRPC`, add the following dependencies:


```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-client-grpc</artifactId>
            <version>${shenyu.version}</version>
            <exclusions>
                <exclusion>
                    <artifactId>guava</artifactId>
                    <groupId>com.google.guava</groupId>
                </exclusion>
            </exclusions>
        </dependency>
```

Execute command to generate java code in  `shenyu-examples-grpc` project.

```shell
mvn protobuf:compile 
mvn protobuf:compile-custom 
```

2. Add the following configuration to application.yaml:

```yaml
shenyu:
  register:
    registerType: http #zookeeper #etcd #nacos #consul
    serverLists: http://localhost:9095 #localhost:2181 #http://localhost:2379 #localhost:8848
    props:
      username: admin
      password: 123456
  client:
    grpc:
      props:
        contextPath: /grpc
        appName: grpc
        ipAndPort: 127.0.0.1:38080
        port: 38080
```

3. Add `@ShenyuGrpcClient` Annotation on the `gRPC` service interface implementation class. Start your service provider, after successful registration, in the background management system go to PluginList -> rpc proxy -> gRPC, you will see automatic registration of selectors and rules information.

Example:

```java
    @Override
    @ShenyuGrpcClient(path = "/echo", desc = "echo")
    public void echo(EchoRequest request, StreamObserver<EchoResponse> responseObserver) {
        System.out.println("Received: " + request.getMessage());
        EchoResponse.Builder response = EchoResponse.newBuilder()
                .setMessage("ReceivedHELLO")
                .addTraces(Trace.newBuilder().setHost(getHostname()).build());
        responseObserver.onNext(response.build());
        responseObserver.onCompleted();
    }

```

## User Request

You can request your gRPC service by Http. The `Apache ShenYu` gateway needs to have a route prefix that you access to configure `contextPath`.



If your `proto` file is defined as follows:


```protobuf
message EchoRequest {
  string message = 1;
}
```

So the request parameters look like this:

```json
{
    "data": [
        {
            "message": "hello grpc"
        }
    ]
}
```

The parameters are currently passed in `json` format, and the name of `key` defaults to `data`, which you can reset in `GrpcConstants.JSON_DESCRIPTOR_PROTO_FIELD_NAME`; The `value` is passed in according to the `proto` file you define.


the Apache ShenYu can support streaming calls to `gRPC` service, passing multiple arguments in the form of an array.

If your `proto` file is defined as follows:

```protobuf
message RequestData {
  string text = 1;
}
```

The corresponding method call request parameters are as follows:

- `UNARY`

```json
{
    "data": [
        {
            "text": "hello grpc"
        }
    ]
}
```

- `CLIENT_STREAMING`

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

- `SERVER_STREAMING`


```json
{
    "data": [
        {
            "text": "hello grpc"
        }
    ]
}
```

- `BIDI_STREAMING`

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

---
title: gRPC服务接入
description: gRPC服务接入
---

此篇文章是介绍 `gRPC` 服务接入到 `ShenYu` 网关，`ShenYu` 网关使用 `grpc` 插件来接入`gRPC`服务。

接入前，请正确启动 `shenyu-admin`，并开启`grpc`插件，在网关端和`grpc`服务端引入相关依赖。可以参考前面的 [环境搭建](../shenyu-set-up) 和 [gRPC快速开始](../quick-start-grpc)。


应用客户端接入配置请参考：[应用客户端接入](../register-center-design)。

数据同步请参考：[数据同步](../data-sync)。

## 在网关中引入 grpc 插件


引入网关对`gRPC`的代理插件，在网关的 `pom.xml` 文件中增加如下依赖：

```xml
        <!--shenyu grpc plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-grpc</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!--shenyu grpc plugin end-->
```

* 重启你的网关服务。

## gRPC服务接入网关

可以参考： [shenyu-examples-grpc](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-grpc)

* 在由`gRPC`构建的微服务中，引入如下依赖：

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

在 `shenyu-examples-grpc` 下执行以下命令生成 `java` 代码。
```shell
mvn protobuf:compile //编译消息对象
mvn protobuf:compile-custom //依赖消息对象,生成接口服务
```


在`gRPC`服务接口实现类上加上 `@ShenyuGrpcClient` 注解。启动你的服务提供者，成功注册后，在后台管理系统进入`插件列表 -> rpc proxy -> grpc`，会看到自动注册的选择器和规则信息。

示例：

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

## 用户请求

可以通过 `http` 的方式来请求你的`grpc`服务。`ShenYu`网关需要有一个路由前缀，这个路由前缀就是你接入项目进行配置 `contextPath`。

如果你的`proto`文件定义如下：

```protobuf
message EchoRequest {
  string message = 1;
}
```

那么请求参数如下所示：
```json
{
    "data": [
        {
            "message": "hello grpc"
        }
    ]
}
```

当前是以 `json` 的格式传递参数，`key`的名称默认是`data`，你可以在 `GrpcConstants.JSON_DESCRIPTOR_PROTO_FIELD_NAME` 中进行重置；`value`的传入则根据你定义的 `proto` 文件。

`shenyu` 可以支持 `gRPC` 的流式调用，通过数组的形式传递多个参数。


如果你的`proto`文件定义如下：
```protobuf
message RequestData {
  string text = 1;
}
```

对应的方法调用请求参数如下：

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

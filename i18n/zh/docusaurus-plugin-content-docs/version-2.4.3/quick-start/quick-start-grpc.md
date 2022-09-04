---
title: gRPC快速开始
description: gRPC快速开始
---

本文档演示如何将`gRPC`服务接入到`Apache ShenYu`网关。您可以直接在工程下找到本文档的 [示例代码](https://github.com/apache/shenyu/tree/v2.4.3/shenyu-examples/shenyu-examples-grpc) 。

## 环境准备

请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](../deployment/deployment-local) 启动`Apache ShenYu`后台管理系统。

启动成功后，需要在基础配置`->`插件管理中，把`gRPC` 插件设置为开启。

<img src="/img/shenyu/quick-start/grpc/grpc-plugin-enable.png" width="60%" height="50%" />

启动网关，如果是通过源码的方式，直接运行`shenyu-bootstrap`中的`ShenyuBootstrapApplication`。

> 注意，在启动前，请确保网关已经引入相关依赖。

引入网关对`gRPC`的代理插件，在网关的 `pom.xml` 文件中增加如下依赖：

```xml
        <!-- apache shenyu grpc plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-grpc</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- apache shenyu grpc plugin end-->
```

## 运行 shenyu-examples-grpc 项目

下载 [shenyu-examples-grpc](https://github.com/apache/shenyu/tree/v2.4.3/shenyu-examples/shenyu-examples-grpc)

在 `shenyu-examples-grpc` 下执行以下命令生成 `java` 代码:

```shell
mvn protobuf:compile //编译消息对象
mvn protobuf:compile-custom //依赖消息对象,生成接口服务
```

或者，如果你是通过 `IntelliJ IDEA` 打开 `Apache ShenYu` 工程，你可以在 `Maven` 工具栏中选中 `protobuf:compile` 和 `protobuf:compile-custom`，然后右键 `Run Maven Build` 一键生成 `proto` 文件对应的 `java`代码。


<img src="/img/shenyu/quick-start/grpc/gen-proto.png" width="40%" height="50%" />


运行 `org.apache.shenyu.examples.grpc.ShenyuTestGrpcApplication` 中的 `main` 方法启动项目。

成功启动会有如下日志，表示将 `gRPC` 服务成功注册到 `shenyu-admin` 中。

```shell
2021-06-18 19:33:32.866  INFO 11004 --- [or_consumer_-19] o.a.s.r.client.http.utils.RegisterUtils  : grpc client register success: {"appName":"127.0.0.1:8080","contextPath":"/grpc","path":"/grpc/clientStreamingFun","pathDesc":"clientStreamingFun","rpcType":"grpc","serviceName":"stream.StreamService","methodName":"clientStreamingFun","ruleName":"/grpc/clientStreamingFun","parameterTypes":"io.grpc.stub.StreamObserver","rpcExt":"{\"timeout\":5000,\"methodType\":\"CLIENT_STREAMING\"}","enabled":true,"host":"172.20.10.6","port":8080,"registerMetaData":false} 
2021-06-18 19:33:32.866  INFO 11004 --- [or_consumer_-17] o.a.s.r.client.http.utils.RegisterUtils  : grpc client register success: {"appName":"127.0.0.1:8080","contextPath":"/grpc","path":"/grpc/echo","pathDesc":"echo","rpcType":"grpc","serviceName":"echo.EchoService","methodName":"echo","ruleName":"/grpc/echo","parameterTypes":"echo.EchoRequest,io.grpc.stub.StreamObserver","rpcExt":"{\"timeout\":5000,\"methodType\":\"UNARY\"}","enabled":true,"host":"172.20.10.6","port":8080,"registerMetaData":false} 
2021-06-18 19:33:32.866  INFO 11004 --- [or_consumer_-20] o.a.s.r.client.http.utils.RegisterUtils  : grpc client register success: {"appName":"127.0.0.1:8080","contextPath":"/grpc","path":"/grpc/bidiStreamingFun","pathDesc":"bidiStreamingFun","rpcType":"grpc","serviceName":"stream.StreamService","methodName":"bidiStreamingFun","ruleName":"/grpc/bidiStreamingFun","parameterTypes":"io.grpc.stub.StreamObserver","rpcExt":"{\"timeout\":5000,\"methodType\":\"BIDI_STREAMING\"}","enabled":true,"host":"172.20.10.6","port":8080,"registerMetaData":false} 
2021-06-18 19:33:32.866  INFO 11004 --- [or_consumer_-21] o.a.s.r.client.http.utils.RegisterUtils  : grpc client register success: {"appName":"127.0.0.1:8080","contextPath":"/grpc","path":"/grpc/unaryFun","pathDesc":"unaryFun","rpcType":"grpc","serviceName":"stream.StreamService","methodName":"unaryFun","ruleName":"/grpc/unaryFun","parameterTypes":"stream.RequestData,io.grpc.stub.StreamObserver","rpcExt":"{\"timeout\":5000,\"methodType\":\"UNARY\"}","enabled":true,"host":"172.20.10.6","port":8080,"registerMetaData":false} 
2021-06-18 19:33:32.866  INFO 11004 --- [or_consumer_-18] o.a.s.r.client.http.utils.RegisterUtils  : grpc client register success: {"appName":"127.0.0.1:8080","contextPath":"/grpc","path":"/grpc/serverStreamingFun","pathDesc":"serverStreamingFun","rpcType":"grpc","serviceName":"stream.StreamService","methodName":"serverStreamingFun","ruleName":"/grpc/serverStreamingFun","parameterTypes":"stream.RequestData,io.grpc.stub.StreamObserver","rpcExt":"{\"timeout\":5000,\"methodType\":\"SERVER_STREAMING\"}","enabled":true,"host":"172.20.10.6","port":8080,"registerMetaData":false} 
```

## 简单测试

`shenyu-examples-grpc`项目成功启动之后会自动把加 `@ShenyuGrpcClient` 注解的接口方法注册到网关。

打开 `插件列表 -> rpc proxy -> grpc` 可以看到插件规则配置列表。


<img src="/img/shenyu/quick-start/grpc/grpc-service.png" width="80%" height="50%" />

下面使用 `postman` 模拟 `http` 的方式来请求你的 `gRPC` 服务。
请求参数如下：

```json
{
    "data": [
        {
            "message": "hello grpc"
        }
    ]
}
```

<img src="/img/shenyu/quick-start/grpc/grpc-echo.png" width="80%" height="50%" />

当前是以 `json` 的格式传递参数，`key`的名称默认是`data`，你可以在 `GrpcConstants.JSON_DESCRIPTOR_PROTO_FIELD_NAME` 中进行重置；`value`的传入则根据你定义的 `proto` 文件。

## 流式调用

`Apache ShenYu` 可以支持 `gRPC` 的流式调用，下面展示的是 `gRPC` 四种方法类型的调用。 在流式调用中，你可以通过数组的形式传递多个参数。

- `UNARY`

请求参数如下：

```json
{
    "data": [
        {
            "text": "hello grpc"
        }
    ]
}
```

通过`postman` 模拟 `http` 请求，发起`UNARY`调用。

<img src="/img/shenyu/quick-start/grpc/grpc-unary.png" width="80%" height="50%" />

- `CLIENT_STREAMING`

请求参数如下：

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

通过`postman` 模拟 `http` 请求，发起`CLIENT_STREAMING`调用。

<img src="/img/shenyu/quick-start/grpc/grpc-client-stream.png" width="80%" height="50%" />

- `SERVER_STREAMING`

请求参数如下：

```json
{
    "data": [
        {
            "text": "hello grpc"
        }
    ]
}
```

通过`postman` 模拟 `http` 请求，发起`SERVER_STREAMING`调用。

<img src="/img/shenyu/quick-start/grpc/grpc-server-stream.png" width="80%" height="50%" />

- `BIDI_STREAMING`

请求参数如下：

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

通过`postman` 模拟 `http` 请求，发起`BIDI_STREAMING`调用。

<img src="/img/shenyu/quick-start/grpc/grpc-bidi-stream.png" width="80%" height="50%" />


---
title: Brpc快速开始
description: Brpc快速开始
---


本文档演示如何将`Brpc`服务接入到`Apache ShenYu`网关。您可以直接在工程下找到本文档的[示例代码](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-brpc) 。

## 环境准备

请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](../deployment/deployment-local) 启动`Apache ShenYu`后台管理系统。

启动成功后，需要在基础配置`->`插件管理中，把`brpc` 插件设置为开启。

![](/img/shenyu/quick-start/brpc/brpc_open.png)

启动网关，如果是通过源码的方式，直接运行`shenyu-bootstrap`中的`ShenyuBootstrapApplication`。

> 注意，在启动前，请确保网关已经引入相关依赖。

引入网关对`Brpc`的代理插件，在网关的 `pom.xml` 文件中增加如下依赖：

```xml
        <!-- apache shenyu brpc plugin -->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-brpc</artifactId>
            <version>${project.version}</version>
        </dependency>
```


## 运行shenyu-examples-brpc项目

下载 [shenyu-examples-brpc](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-brpc) 。

运行`org.apache.shenyu.examples.brpc.service.TestBrpcApplication`main方法启动项目。

成功启动会有如下日志：

```shell
2023-01-11 23:09:37.593  INFO 96741 --- [or_consumer_-19] o.a.s.r.client.http.utils.RegisterUtils  : metadata client register success: {"appName":"brpc","contextPath":"/brpc","path":"/brpc/allName","rpcType":"brpc","serviceName":"org.apache.shenyu.examples.brpc.api.service.BrpcDemoService","methodName":"allName","ruleName":"/brpc/allName","rpcExt":"{\"methodInfo\":[{\"methodName\":\"allName\",\"paramTypes\":[]}]}","enabled":true,"host":"127.0.0.1","port":8005,"pluginNames":[],"registerMetaData":false,"timeMillis":1673449777487,"addPrefixed":false} 
2023-01-11 23:09:37.611  INFO 96741 --- [or_consumer_-21] o.a.s.r.client.http.utils.RegisterUtils  : metadata client register success: {"appName":"brpc","contextPath":"/brpc","path":"/brpc/userMap","rpcType":"brpc","serviceName":"org.apache.shenyu.examples.brpc.api.service.BrpcDemoService","methodName":"userMap","ruleName":"/brpc/userMap","parameterTypes":"java.lang.Long","rpcExt":"{\"methodInfo\":[{\"methodName\":\"userMap\",\"paramTypes\":[{\"left\":\"java.lang.Long\",\"right\":\"userId\"}]}]}","enabled":true,"host":"127.0.0.1","port":8005,"pluginNames":[],"registerMetaData":false,"timeMillis":1673449777488,"addPrefixed":false} 
2023-01-11 23:09:37.611  INFO 96741 --- [or_consumer_-17] o.a.s.r.client.http.utils.RegisterUtils  : uri client register success: {"appName":"brpc","contextPath":"/brpc","rpcType":"brpc","host":"127.0.0.1","port":8005} 
2023-01-11 23:09:37.612  INFO 96741 --- [or_consumer_-20] o.a.s.r.client.http.utils.RegisterUtils  : metadata client register success: {"appName":"brpc","contextPath":"/brpc","path":"/brpc/getUserByIdAndName","rpcType":"brpc","serviceName":"org.apache.shenyu.examples.brpc.api.service.BrpcDemoService","methodName":"getUserByIdAndName","ruleName":"/brpc/getUserByIdAndName","parameterTypes":"java.lang.Long,java.lang.String","rpcExt":"{\"methodInfo\":[{\"methodName\":\"getUserByIdAndName\",\"paramTypes\":[{\"left\":\"java.lang.Long\",\"right\":\"userId\"},{\"left\":\"java.lang.String\",\"right\":\"name\"}]}]}","enabled":true,"host":"127.0.0.1","port":8005,"pluginNames":[],"registerMetaData":false,"timeMillis":1673449777488,"addPrefixed":false} 
2023-01-11 23:09:37.611  INFO 96741 --- [or_consumer_-18] o.a.s.r.client.http.utils.RegisterUtils  : metadata client register success: {"appName":"brpc","contextPath":"/brpc","path":"/brpc/connect","rpcType":"brpc","serviceName":"org.apache.shenyu.examples.brpc.api.service.BrpcDemoService","methodName":"connect","ruleName":"/brpc/connect","rpcExt":"{\"methodInfo\":[{\"methodName\":\"connect\",\"paramTypes\":[]}]}","enabled":true,"host":"127.0.0.1","port":8005,"pluginNames":[],"registerMetaData":false,"timeMillis":1673449777486,"addPrefixed":false} 
2023-01-11 23:09:37.612  INFO 96741 --- [or_consumer_-22] o.a.s.r.client.http.utils.RegisterUtils  : metadata client register success: {"appName":"brpc","contextPath":"/brpc","path":"/brpc/getUser","rpcType":"brpc","serviceName":"org.apache.shenyu.examples.brpc.api.service.BrpcDemoService","methodName":"getUser","ruleName":"/brpc/getUser","parameterTypes":"java.lang.Long","rpcExt":"{\"methodInfo\":[{\"methodName\":\"getUser\",\"paramTypes\":[{\"left\":\"java.lang.Long\",\"right\":\"userId\"}]}]}","enabled":true,"host":"127.0.0.1","port":8005,"pluginNames":[],"registerMetaData":false,"timeMillis":1673449777489,"addPrefixed":false} 

```



## 测试Http请求

`shenyu-examples-brpc`项目成功启动之后会自动把加 `@ShenyuBrpcClient` 注解的接口方法注册到网关，并添加选择器和规则，如果没有，可以手动添加。

打开`插件列表 -> rpc proxy -> brpc`可以看到插件规则配置列表：

![](/img/shenyu/quick-start/brpc/rule-list.png)

使用 `IDEA HTTP Client` 插件模拟`http`的方式来请求你的`Brpc`服务[使用`shenyu`代理]:

![](/img/shenyu/quick-start/brpc/idea-http-test-brpc.png)



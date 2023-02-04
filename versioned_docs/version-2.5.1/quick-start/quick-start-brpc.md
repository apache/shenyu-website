---
title:  Quick start with Brpc
description: Brpc quick start
---

This document introduces how to quickly access the Apache ShenYu gateway using Brpc. You can get the code example of this document by clicking [here](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-brpc).


## Environment to prepare


Please refer to the deployment to select a way to start shenyu-admin. For example, start the Apache ShenYu gateway management system through [local deployment](../deployment/deployment-local) .

After successful startup, you need to open the Brpc plugin on in the BasicConfig `->` Plugin.

<img src="/img/shenyu/quick-start/brpc/brpc_open_en.png" width="60%" height="50%" />

If you are a startup gateway by means of source, can be directly run the ShenyuBootstrapApplication of shenyu-bootstrap module.

> Note: Before starting, make sure the gateway has added dependencies.

Import the gateway proxy plugin for `Brpc` and add the following dependencies to the gateway's `pom.xml` file:


```xml
        <!-- apache shenyu brpc plugin -->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-brpc</artifactId>
            <version>${project.version}</version>
        </dependency>
```



## Run the shenyu-examples-brpc project

Download [shenyu-examples-brpc](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-brpc).

Run main method of `org.apache.shenyu.examples.brpc.service.TestBrpcApplication` to start this project.

The following log appears when the startup is successful:

```shell
2023-01-11 23:09:37.593  INFO 96741 --- [or_consumer_-19] o.a.s.r.client.http.utils.RegisterUtils  : metadata client register success: {"appName":"brpc","contextPath":"/brpc","path":"/brpc/allName","rpcType":"brpc","serviceName":"org.apache.shenyu.examples.brpc.api.service.BrpcDemoService","methodName":"allName","ruleName":"/brpc/allName","rpcExt":"{\"methodInfo\":[{\"methodName\":\"allName\",\"paramTypes\":[]}]}","enabled":true,"host":"127.0.0.1","port":8005,"pluginNames":[],"registerMetaData":false,"timeMillis":1673449777487,"addPrefixed":false} 
2023-01-11 23:09:37.611  INFO 96741 --- [or_consumer_-21] o.a.s.r.client.http.utils.RegisterUtils  : metadata client register success: {"appName":"brpc","contextPath":"/brpc","path":"/brpc/userMap","rpcType":"brpc","serviceName":"org.apache.shenyu.examples.brpc.api.service.BrpcDemoService","methodName":"userMap","ruleName":"/brpc/userMap","parameterTypes":"java.lang.Long","rpcExt":"{\"methodInfo\":[{\"methodName\":\"userMap\",\"paramTypes\":[{\"left\":\"java.lang.Long\",\"right\":\"userId\"}]}]}","enabled":true,"host":"127.0.0.1","port":8005,"pluginNames":[],"registerMetaData":false,"timeMillis":1673449777488,"addPrefixed":false} 
2023-01-11 23:09:37.611  INFO 96741 --- [or_consumer_-17] o.a.s.r.client.http.utils.RegisterUtils  : uri client register success: {"appName":"brpc","contextPath":"/brpc","rpcType":"brpc","host":"127.0.0.1","port":8005} 
2023-01-11 23:09:37.612  INFO 96741 --- [or_consumer_-20] o.a.s.r.client.http.utils.RegisterUtils  : metadata client register success: {"appName":"brpc","contextPath":"/brpc","path":"/brpc/getUserByIdAndName","rpcType":"brpc","serviceName":"org.apache.shenyu.examples.brpc.api.service.BrpcDemoService","methodName":"getUserByIdAndName","ruleName":"/brpc/getUserByIdAndName","parameterTypes":"java.lang.Long,java.lang.String","rpcExt":"{\"methodInfo\":[{\"methodName\":\"getUserByIdAndName\",\"paramTypes\":[{\"left\":\"java.lang.Long\",\"right\":\"userId\"},{\"left\":\"java.lang.String\",\"right\":\"name\"}]}]}","enabled":true,"host":"127.0.0.1","port":8005,"pluginNames":[],"registerMetaData":false,"timeMillis":1673449777488,"addPrefixed":false} 
2023-01-11 23:09:37.611  INFO 96741 --- [or_consumer_-18] o.a.s.r.client.http.utils.RegisterUtils  : metadata client register success: {"appName":"brpc","contextPath":"/brpc","path":"/brpc/connect","rpcType":"brpc","serviceName":"org.apache.shenyu.examples.brpc.api.service.BrpcDemoService","methodName":"connect","ruleName":"/brpc/connect","rpcExt":"{\"methodInfo\":[{\"methodName\":\"connect\",\"paramTypes\":[]}]}","enabled":true,"host":"127.0.0.1","port":8005,"pluginNames":[],"registerMetaData":false,"timeMillis":1673449777486,"addPrefixed":false} 
2023-01-11 23:09:37.612  INFO 96741 --- [or_consumer_-22] o.a.s.r.client.http.utils.RegisterUtils  : metadata client register success: {"appName":"brpc","contextPath":"/brpc","path":"/brpc/getUser","rpcType":"brpc","serviceName":"org.apache.shenyu.examples.brpc.api.service.BrpcDemoService","methodName":"getUser","ruleName":"/brpc/getUser","parameterTypes":"java.lang.Long","rpcExt":"{\"methodInfo\":[{\"methodName\":\"getUser\",\"paramTypes\":[{\"left\":\"java.lang.Long\",\"right\":\"userId\"}]}]}","enabled":true,"host":"127.0.0.1","port":8005,"pluginNames":[],"registerMetaData":false,"timeMillis":1673449777489,"addPrefixed":false} 

```

## Test

The `shenyu-examples-brpc` project will automatically register interface methods annotated with `@ShenyuBrpcClient` in the Apache ShenYu gateway after successful startup.


Open PluginList -> rpc proxy -> brpc to see the list of plugin rule configurations:


<img src="/img/shenyu/quick-start/brpc/rule-list.png" width="100%" height="100%" />

Use IDEA HTTP Client Plugin to simulate HTTP to request your Brpc service[Shenyu proxy]:

![](/img/shenyu/quick-start/brpc/idea-http-test-brpc.png)

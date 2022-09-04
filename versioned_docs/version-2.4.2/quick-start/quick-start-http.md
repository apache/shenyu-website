---
title: Quick start with Http
description: Quick start with http
---

This document introduces how to quickly access the Apache ShenYu gateway using Http. You can get the code example of this document by clicking [here](https://github.com/apache/shenyu/tree/v2.4.2/shenyu-examples/shenyu-examples-http).

## Environment to prepare

Please refer to the deployment to select a way to start shenyu-admin. For example, start the Apache ShenYu gateway management system through [local deployment](../deployment/deployment-local) .

After successful startup, you need to open the Divide plugin on in the BasicConfig `->` Plugin. In the Apache ShenYu gateway, the HTTP request is handled by the Divide plugin.

<img src="/img/shenyu/quick-start/http/http_open_en.png" width="60%" height="50%" />

If you are a startup gateway by means of source, can be directly run the ShenyuBootstrapApplication of shenyu-bootstrap module.

> Note: Before starting, make sure the gateway has added dependencies.


Add the following dependencies to the gateway's `pom.xml` file:


```xml
        <!--if you use http proxy start this-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-divide</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-httpclient</artifactId>
            <version>${project.version}</version>
        </dependency>
```


## Run the shenyu-examples-http project

Download [shenyu-examples-http](https://github.com/apache/shenyu/tree/v2.4.2/shenyu-examples/shenyu-examples-http)

Execute the `org.apache.shenyu.examples.http.ShenyuTestHttpApplication` main method to start project.

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



## Test

The `shenyu-examples-http` project will automatically register interface methods annotated with `@ShenyuSpringMvcClient` in the Apache ShenYu gateway after successful startup.

Open PluginList -> Proxy -> divide to see the list of plugin rule configurations:

![](/img/shenyu/quick-start/http/rule-list.png)

Use PostMan to simulate HTTP to request your http service:

![](/img/shenyu/quick-start/http/postman-test.png)

Use IDEA HTTP Client Plugin to simulate HTTP to request your http service[local:no Shenyu proxy]:

![](/img/shenyu/quick-start/http/idea-http-test-local.png)

Use IDEA HTTP Client Plugin to simulate HTTP to request your http service[Shenyu proxy]:

![](/img/shenyu/quick-start/http/idea-http-test-proxy.png)

---
title:  Quick start with Motan
description: Motan quick start
---

This document introduces how to quickly access the Apache ShenYu gateway using Motan RPC. You can get the code example of this document by clicking [here](https://github.com/apache/shenyu/tree/v2.5.0/shenyu-examples/shenyu-examples-motan).


## Environment to prepare


Please refer to the deployment to select a way to start shenyu-admin. For example, start the Apache ShenYu gateway management system through [local deployment](../deployment/deployment-local) .

After successful startup, you need to open the Sofa plugin on in the BasicConfig `->` Plugin.

<img src="/img/shenyu/quick-start/motan/motan_open_en.png" width="60%" height="50%" />

If you are a startup gateway by means of source, can be directly run the ShenyuBootstrapApplication of shenyu-bootstrap module.

> Note: Before starting, make sure the gateway has added dependencies.
> Start up zookeeper in local.

Import the gateway proxy plugin for `Motan` and add the following dependencies to the gateway's `pom.xml` file:


```xml
        <!-- apache shenyu motan plugin -->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-motan</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>com.weibo</groupId>
            <artifactId>motan-core</artifactId>
            <version>1.1.9</version>
        </dependency>

        <dependency>
            <groupId>com.weibo</groupId>
            <artifactId>motan-registry-zookeeper</artifactId>
            <version>1.1.9</version>
        </dependency>

        <dependency>
            <groupId>com.weibo</groupId>
            <artifactId>motan-transport-netty4</artifactId>
            <version>1.1.9</version>
        </dependency>

        <dependency>
            <groupId>com.weibo</groupId>
            <artifactId>motan-springsupport</artifactId>
            <version>1.1.9</version>
        </dependency>
```



## Run the shenyu-examples-motan project

Download [shenyu-examples-motan](https://github.com/apache/shenyu/tree/v2.5.0/shenyu-examples/shenyu-examples-motan) .

Run main method of `org.apache.shenyu.examples.motan.service.TestMotanApplication` to start this project.

log info as follows after starting:

```shell
2021-07-18 16:46:25.388  INFO 96 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8081 (http) with context path ''
2021-07-18 16:46:25.393  INFO 96 --- [           main] o.a.s.e.m.service.TestMotanApplication   : Started TestMotanApplication in 3.89 seconds (JVM running for 4.514)
2021-07-18 16:46:25.396  INFO 96 --- [           main] info                                     : [ZookeeperRegistry] Url (null) will set to available to Registry [zookeeper://localhost:2181/default_rpc/com.weibo.api.motan.registry.RegistryService/1.0/service]
2021-07-18 16:46:25.399  INFO 96 --- [       Thread-6] o.a.s.c.c.s.ShenyuClientShutdownHook     : hook Thread-0 will sleep 3000ms when it start
2021-07-18 16:46:25.399  INFO 96 --- [       Thread-6] o.a.s.c.c.s.ShenyuClientShutdownHook     : hook SpringContextShutdownHook will sleep 3000ms when it start
2021-07-18 16:46:25.445  INFO 96 --- [ntLoopGroup-3-2] info                                     : NettyChannelHandler channelActive: remote=/192.168.1.8:49740 local=/192.168.1.8:8002
2021-07-18 16:46:25.445  INFO 96 --- [ntLoopGroup-3-1] info                                     : NettyChannelHandler channelActive: remote=/192.168.1.8:49739 local=/192.168.1.8:8002
2021-07-18 16:46:25.925  INFO 96 --- [or_consumer_-17] o.a.s.r.client.http.utils.RegisterUtils  : motan client register success: {"appName":"motan","contextPath":"/motan","path":"/motan/hello","pathDesc":"","rpcType":"motan","serviceName":"org.apache.shenyu.examples.motan.service.MotanDemoService","methodName":"hello","ruleName":"/motan/hello","parameterTypes":"java.lang.String","rpcExt":"{\"methodInfo\":[{\"methodName\":\"hello\",\"params\":[{\"left\":\"java.lang.String\",\"right\":\"name\"}]}],\"group\":\"motan-shenyu-rpc\"}","enabled":true,"host":"192.168.220.1","port":8081,"registerMetaData":false} 

```



## Test

The `shenyu-examples-motan` project will automatically register the `@ShenyuMotanClient` annotated interface methods with the gateway and add selectors and rules. If not, you can manually add them.


Open PluginList -> rpc proxy -> motan to see the list of plugin rule configurations:


<img src="/img/shenyu/quick-start/motan/motan_service_en.png" width="60%" height="50%" />

Use PostMan to simulate HTTP to request your Motan service:

<img src="/img/shenyu/plugin/motan/motan_service.png" width="60%" height="50%" />



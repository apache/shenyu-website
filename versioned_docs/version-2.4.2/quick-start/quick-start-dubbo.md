---
title: Quick start with Dubbo
description: Quick start with Dubbo
---

This document introduces how to quickly access the Apache ShenYu gateway using Dubbo. You can get the code example of this document by clicking [here](https://github.com/apache/shenyu/tree/v2.4.2/shenyu-examples/shenyu-examples-dubbo).

## Environment to prepare

Please refer to the deployment to select a way to start shenyu-admin. For example, start the Apache ShenYu gateway management system through [local deployment](../deployment/deployment-local) .

After successful startup, you need to open the Dubbo plugin on in the BasicConfig `->` Plugin, and set your registry address. Please make sure the registry center is open locally.

<img src="/img/shenyu/quick-start/dubbo/dubbo_open_en.png" width="60%" height="50%" />

If you are a startup gateway by means of source, can be directly run the ShenyuBootstrapApplication of shenyu-bootstrap module.

> Note: Before starting, make sure the gateway has added dependencies.


If client is `apache dubbo`, registry center is `Zookeeper`, please refer to the following configuration:


```xml
        <!-- apache shenyu  apache dubbo plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-apache-dubbo</artifactId>
            <version>${project.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.dubbo</groupId>
            <artifactId>dubbo</artifactId>
            <version>2.7.5</version>
        </dependency>
        <!-- Dubbo zookeeper registry dependency start -->
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-client</artifactId>
            <version>4.0.1</version>
            <exclusions>
                <exclusion>
                    <artifactId>log4j</artifactId>
                    <groupId>log4j</groupId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-framework</artifactId>
            <version>4.0.1</version>
        </dependency>
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-recipes</artifactId>
            <version>4.0.1</version>
        </dependency>
        <!-- Dubbo zookeeper registry dependency end -->
        <!-- apache shenyu  apache dubbo plugin end-->
```

If client is `alibaba dubbo`, registry center is `Zookeeper`, please refer to the following configuration:


```xml
        <!-- apache shenyu alibaba dubbo plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-alibaba-dubbo</artifactId>
            <version>${project.version}</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>dubbo</artifactId>
            <version>${alibaba.dubbo.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-client</artifactId>
            <version>${curator.version}</version>
            <exclusions>
                <exclusion>
                    <artifactId>log4j</artifactId>
                    <groupId>log4j</groupId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-framework</artifactId>
            <version>${curator.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-recipes</artifactId>
            <version>${curator.version}</version>
        </dependency>
        <!-- apache shenyu  alibaba dubbo plugin end-->
```


## Run the shenyu-examples-dubbo project

Download [shenyu-examples-dubbo](https://github.com/apache/shenyu/tree/v2.4.2/shenyu-examples/shenyu-examples-dubbo) .

replace the register address in `shenyu-examples-alibaba-dubbo-service/src/main/resources/spring-dubbo.xml` with your local zk address, such as:

```xml
<dubbo:registry address="zookeeper://localhost:2181"/>
```

Execute the `org.apache.shenyu.examples.alibaba.dubbo.service.TestAlibabaDubboApplication` main method to start dubbo project.

The following log appears when the startup is successful:

```shell
2021-02-06 20:58:01.807  INFO 3724 --- [pool-2-thread-1] o.d.s.client.common.utils.RegisterUtils  : dubbo client register success: {"appName":"dubbo","contextPath":"/dubbo","path":"/dubbo/insert","pathDesc":"Insert a row of data","rpcType":"dubbo","serviceName":"org.dromara.shenyu.examples.dubbo.api.service.DubboTestService","methodName":"insert","ruleName":"/dubbo/insert","parameterTypes":"org.dromara.shenyu.examples.dubbo.api.entity.DubboTest","rpcExt":"{\"group\":\"\",\"version\":\"\",\"loadbalance\":\"random\",\"retries\":2,\"timeout\":10000,\"url\":\"\"}","enabled":true} 
2021-02-06 20:58:01.821  INFO 3724 --- [pool-2-thread-1] o.d.s.client.common.utils.RegisterUtils  : dubbo client register success: {"appName":"dubbo","contextPath":"/dubbo","path":"/dubbo/findAll","pathDesc":"Get all data","rpcType":"dubbo","serviceName":"org.dromara.shenyu.examples.dubbo.api.service.DubboTestService","methodName":"findAll","ruleName":"/dubbo/findAll","parameterTypes":"","rpcExt":"{\"group\":\"\",\"version\":\"\",\"loadbalance\":\"random\",\"retries\":2,\"timeout\":10000,\"url\":\"\"}","enabled":true} 
2021-02-06 20:58:01.833  INFO 3724 --- [pool-2-thread-1] o.d.s.client.common.utils.RegisterUtils  : dubbo client register success: {"appName":"dubbo","contextPath":"/dubbo","path":"/dubbo/findById","pathDesc":"Query by Id","rpcType":"dubbo","serviceName":"org.dromara.shenyu.examples.dubbo.api.service.DubboTestService","methodName":"findById","ruleName":"/dubbo/findById","parameterTypes":"java.lang.String","rpcExt":"{\"group\":\"\",\"version\":\"\",\"loadbalance\":\"random\",\"retries\":2,\"timeout\":10000,\"url\":\"\"}","enabled":true} 
2021-02-06 20:58:01.844  INFO 3724 --- [pool-2-thread-1] o.d.s.client.common.utils.RegisterUtils  : dubbo client register success: {"appName":"dubbo","contextPath":"/dubbo","path":"/dubbo/findByListId","pathDesc":"","rpcType":"dubbo","serviceName":"org.dromara.shenyu.examples.dubbo.api.service.DubboMultiParamService","methodName":"findByListId","ruleName":"/dubbo/findByListId","parameterTypes":"java.util.List","rpcExt":"{\"group\":\"\",\"version\":\"\",\"loadbalance\":\"random\",\"retries\":2,\"timeout\":10000,\"url\":\"\"}","enabled":true} 
2021-02-06 20:58:01.855  INFO 3724 --- [pool-2-thread-1] o.d.s.client.common.utils.RegisterUtils  : dubbo client register success: {"appName":"dubbo","contextPath":"/dubbo","path":"/dubbo/findByIdsAndName","pathDesc":"","rpcType":"dubbo","serviceName":"org.dromara.shenyu.examples.dubbo.api.service.DubboMultiParamService","methodName":"findByIdsAndName","ruleName":"/dubbo/findByIdsAndName","parameterTypes":"java.util.List,java.lang.String","rpcExt":"{\"group\":\"\",\"version\":\"\",\"loadbalance\":\"random\",\"retries\":2,\"timeout\":10000,\"url\":\"\"}","enabled":true} 
2021-02-06 20:58:01.866  INFO 3724 --- [pool-2-thread-1] o.d.s.client.common.utils.RegisterUtils  : dubbo client register success: {"appName":"dubbo","contextPath":"/dubbo","path":"/dubbo/batchSave","pathDesc":"","rpcType":"dubbo","serviceName":"org.dromara.shenyu.examples.dubbo.api.service.DubboMultiParamService","methodName":"batchSave","ruleName":"/dubbo/batchSave","parameterTypes":"java.util.List","rpcExt":"{\"group\":\"\",\"version\":\"\",\"loadbalance\":\"random\",\"retries\":2,\"timeout\":10000,\"url\":\"\"}","enabled":true} 
2021-02-06 20:58:01.876  INFO 3724 --- [pool-2-thread-1] o.d.s.client.common.utils.RegisterUtils  : dubbo client register success: {"appName":"dubbo","contextPath":"/dubbo","path":"/dubbo/findByArrayIdsAndName","pathDesc":"","rpcType":"dubbo","serviceName":"org.dromara.shenyu.examples.dubbo.api.service.DubboMultiParamService","methodName":"findByArrayIdsAndName","ruleName":"/dubbo/findByArrayIdsAndName","parameterTypes":"[Ljava.lang.Integer;,java.lang.String","rpcExt":"{\"group\":\"\",\"version\":\"\",\"loadbalance\":\"random\",\"retries\":2,\"timeout\":10000,\"url\":\"\"}","enabled":true} 
2021-02-06 20:58:01.889  INFO 3724 --- [pool-2-thread-1] o.d.s.client.common.utils.RegisterUtils  : dubbo client register success: {"appName":"dubbo","contextPath":"/dubbo","path":"/dubbo/saveComplexBeanTestAndName","pathDesc":"","rpcType":"dubbo","serviceName":"org.dromara.shenyu.examples.dubbo.api.service.DubboMultiParamService","methodName":"saveComplexBeanTestAndName","ruleName":"/dubbo/saveComplexBeanTestAndName","parameterTypes":"org.dromara.shenyu.examples.dubbo.api.entity.ComplexBeanTest,java.lang.String","rpcExt":"{\"group\":\"\",\"version\":\"\",\"loadbalance\":\"random\",\"retries\":2,\"timeout\":10000,\"url\":\"\"}","enabled":true} 
2021-02-06 20:58:01.901  INFO 3724 --- [pool-2-thread-1] o.d.s.client.common.utils.RegisterUtils  : dubbo client register success: {"appName":"dubbo","contextPath":"/dubbo","path":"/dubbo/batchSaveAndNameAndId","pathDesc":"","rpcType":"dubbo","serviceName":"org.dromara.shenyu.examples.dubbo.api.service.DubboMultiParamService","methodName":"batchSaveAndNameAndId","ruleName":"/dubbo/batchSaveAndNameAndId","parameterTypes":"java.util.List,java.lang.String,java.lang.String","rpcExt":"{\"group\":\"\",\"version\":\"\",\"loadbalance\":\"random\",\"retries\":2,\"timeout\":10000,\"url\":\"\"}","enabled":true} 
2021-02-06 20:58:01.911  INFO 3724 --- [pool-2-thread-1] o.d.s.client.common.utils.RegisterUtils  : dubbo client register success: {"appName":"dubbo","contextPath":"/dubbo","path":"/dubbo/saveComplexBeanTest","pathDesc":"","rpcType":"dubbo","serviceName":"org.dromara.shenyu.examples.dubbo.api.service.DubboMultiParamService","methodName":"saveComplexBeanTest","ruleName":"/dubbo/saveComplexBeanTest","parameterTypes":"org.dromara.shenyu.examples.dubbo.api.entity.ComplexBeanTest","rpcExt":"{\"group\":\"\",\"version\":\"\",\"loadbalance\":\"random\",\"retries\":2,\"timeout\":10000,\"url\":\"\"}","enabled":true} 
2021-02-06 20:58:01.922  INFO 3724 --- [pool-2-thread-1] o.d.s.client.common.utils.RegisterUtils  : dubbo client register success: {"appName":"dubbo","contextPath":"/dubbo","path":"/dubbo/findByStringArray","pathDesc":"","rpcType":"dubbo","serviceName":"org.dromara.shenyu.examples.dubbo.api.service.DubboMultiParamService","methodName":"findByStringArray","ruleName":"/dubbo/findByStringArray","parameterTypes":"[Ljava.lang.String;","rpcExt":"{\"group\":\"\",\"version\":\"\",\"loadbalance\":\"random\",\"retries\":2,\"timeout\":10000,\"url\":\"\"}","enabled":true} 
```

Note: When you need to expose `multiple protocols` at the same time, please do not configure `shenyu.client.dubbo.props.port`.

## Test

The `shenyu-examples-dubbo` project will automatically register interface methods annotated with `@ShenyuDubboClient` in the Apache ShenYu gateway after successful startup.

Open PluginList -> rpc proxy -> dubbo to see the list of plugin rule configurations:

![](/img/shenyu/quick-start/dubbo/rule-list.jpg)

Use `PostMan` to simulate `HTTP` to request your `Dubbo` service:

![](/img/shenyu/quick-start/dubbo/postman-findbyid.jpg)

Complex multi-parameter example: The related interface implementation class is `org.apache.shenyu.examples.alibaba.dubbo.service.impl.DubboMultiParamServiceImpl#batchSaveAndNameAndId`.

```java
@Override
@ShenyuDubboClient(path = "/batchSaveAndNameAndId")
public DubboTest batchSaveAndNameAndId(List<DubboTest> dubboTestList, String id, String name) {
    DubboTest test = new DubboTest();
    test.setId(id);
    test.setName("hello world shenyu alibaba dubbo param batchSaveAndNameAndId :" + name + ":" + dubboTestList.stream().map(DubboTest::getName).collect(Collectors.joining("-")));
    return test;
}
```

![](/img/shenyu/quick-start/dubbo/postman-multiparams.jpg)

When your arguments do not match, the following exception will occur:

```java
2021-02-07 22:24:04.015 ERROR 14860 --- [:20888-thread-3] o.d.shenyu.web.handler.GlobalErrorHandler  : [e47b2a2a] Resolved [ShenyuException: org.apache.dubbo.remoting.RemotingException: java.lang.IllegalArgumentException: args.length != types.length
java.lang.IllegalArgumentException: args.length != types.length
	at org.apache.dubbo.common.utils.PojoUtils.realize(PojoUtils.java:91)
	at org.apache.dubbo.rpc.filter.GenericFilter.invoke(GenericFilter.java:82)
	at org.apache.dubbo.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:81)
	at org.apache.dubbo.rpc.filter.ClassLoaderFilter.invoke(ClassLoaderFilter.java:38)
	at org.apache.dubbo.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:81)
	at org.apache.dubbo.rpc.filter.EchoFilter.invoke(EchoFilter.java:41)
	at org.apache.dubbo.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:81)
	at org.apache.dubbo.rpc.protocol.dubbo.DubboProtocol$1.reply(DubboProtocol.java:150)
	at org.apache.dubbo.remoting.exchange.support.header.HeaderExchangeHandler.handleRequest(HeaderExchangeHandler.java:100)
	at org.apache.dubbo.remoting.exchange.support.header.HeaderExchangeHandler.received(HeaderExchangeHandler.java:175)
	at org.apache.dubbo.remoting.transport.DecodeHandler.received(DecodeHandler.java:51)
	at org.apache.dubbo.remoting.transport.dispatcher.ChannelEventRunnable.run(ChannelEventRunnable.java:57)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
	at java.lang.Thread.run(Thread.java:748)
] for HTTP POST /dubbo/batchSaveAndNameAndId
```

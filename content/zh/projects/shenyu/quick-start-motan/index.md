---
title: Motan快速开始
description: Motan快速开始
---


本文档演示如何将`Motan`服务接入到`ShenYu`网关。您可以直接在工程下找到本文档的[示例代码](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-motan) 。

## 环境准备

请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](../deployment-local) 启动`ShenYu`后台管理系统。

启动成功后，需要在基础配置`->`插件管理中，把`motan` 插件设置为开启。


<img src="/img/shenyu/plugin/motan/motan-1.png" width="60%" height="50%" />


启动网关，如果是通过源码的方式，直接运行`shenyu-bootstrap`中的`ShenyuBootstrapApplication`。

> 注意，在启动前，请确保网关已经引入相关依赖。
> 本地已经成功启动zookeeper。

引入网关对`Motan`的代理插件，在网关的 `pom.xml` 文件中增加如下依赖：

```xml
        <!--shenyu motan plugin -->
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


## 运行shenyu-examples-motan项目

下载 [shenyu-examples-motan](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-motan)

运行`org.apache.shenyu.examples.motan.service.TestMotanApplication`main方法启动项目。

成功启动会有如下日志：
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



## 测试Http请求
`shenyu-examples-motan`项目成功启动之后会自动把加 `@ShenyuMotanClient` 注解的接口方法注册到网关，并添加选择器和规则，如果没有，可以手动添加。

打开`插件列表 -> rpc proxy -> motan`可以看到插件规则配置列表：


<img src="/img/shenyu/plugin/motan/motan-2.png" width="60%" height="50%" />

下面使用`postman`模拟`http`的方式来请求你的`motan`服务：

<img src="/img/shenyu/plugin/motan/motan-3.png" width="60%" height="50%" />



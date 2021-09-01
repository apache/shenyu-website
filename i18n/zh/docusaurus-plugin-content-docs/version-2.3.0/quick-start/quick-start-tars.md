---
title: Tars快速开始
description: Tars快速开始
---

本文档将演示如何快速使用Tars接入Soul网关。您可以直接在工程下找到本文档的[示例代码](https://github.com/dromara/soul/tree/2.3.0/soul-examples/soul-examples-tars)。

## 环境准备

请参考[配置网关环境](../users-guide/soul-set-up)并启动`soul-admin`和`soul-bootstrap`。

注：`soul-bootstrap`需要引入tars依赖

```xml
<dependency>
    <groupId>org.dromara</groupId>
    <artifactId>soul-spring-boot-starter-plugin-tars</artifactId>
    <version>${project.version}</version>
</dependency>

<dependency>
    <groupId>com.tencent.tars</groupId>
    <artifactId>tars-client</artifactId>
    <version>1.7.2</version>
</dependency>
```

## 运行soul-examples-tars项目

下载[soul-examples-tars](https://github.com/dromara/soul/tree/2.3.0/soul-examples/soul-examples-tars)

修改`application.yml`中的`host`为你本地ip

修改配置`src/main/resources/SoulExampleServer.SoulExampleApp.config.conf`：

* 建议弄清楚 config 的主要配置项含义, 参考开发指南
* config 中的 ip 要注意提供成本机的
* local=..., 表示开放的本机给 tarsnode 连接的端口, 如果没有 tarsnode, 可以掉这项配置
* `locator`: registry服务的地址，必须是有ip port的，如果不需要registry来定位服务，则不需要配置；
* `node=tars.tarsnode.ServerObj@xxxx`，表示连接的 tarsnode 的地址，如果本地没有 tarsnode， 这项配置可以去掉

更多config配置说明请参考[Tars官方文档](https://github.com/TarsCloud/TarsJava/blob/master/docs/tars_java_user_guide.md)

运行`org.dromara.soul.examples.tars.SoulTestTarsApplication`main方法启动项目。

**注：** 服务启动时需要在启动命令中指定配置文件地址 **-Dconfig=xxx/SoulExampleServer.SoulExampleApp.config.conf**

如果不加`-Dconfig`参数配置会可能会如下抛异常：

```xml
com.qq.tars.server.config.ConfigurationException: error occurred on load server config
	at com.qq.tars.server.config.ConfigurationManager.loadServerConfig(ConfigurationManager.java:113)
	at com.qq.tars.server.config.ConfigurationManager.init(ConfigurationManager.java:57)
	at com.qq.tars.server.core.Server.loadServerConfig(Server.java:90)
	at com.qq.tars.server.core.Server.<init>(Server.java:42)
	at com.qq.tars.server.core.Server.<clinit>(Server.java:38)
	at com.qq.tars.spring.bean.PropertiesListener.onApplicationEvent(PropertiesListener.java:37)
	at com.qq.tars.spring.bean.PropertiesListener.onApplicationEvent(PropertiesListener.java:31)
	at org.springframework.context.event.SimpleApplicationEventMulticaster.doInvokeListener(SimpleApplicationEventMulticaster.java:172)
	at org.springframework.context.event.SimpleApplicationEventMulticaster.invokeListener(SimpleApplicationEventMulticaster.java:165)
	at org.springframework.context.event.SimpleApplicationEventMulticaster.multicastEvent(SimpleApplicationEventMulticaster.java:139)
	at org.springframework.context.event.SimpleApplicationEventMulticaster.multicastEvent(SimpleApplicationEventMulticaster.java:127)
	at org.springframework.boot.context.event.EventPublishingRunListener.environmentPrepared(EventPublishingRunListener.java:76)
	at org.springframework.boot.SpringApplicationRunListeners.environmentPrepared(SpringApplicationRunListeners.java:53)
	at org.springframework.boot.SpringApplication.prepareEnvironment(SpringApplication.java:345)
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:308)
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1226)
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1215)
	at org.dromara.soul.examples.tars.SoulTestTarsApplication.main(SoulTestTarsApplication.java:38)
Caused by: java.lang.NullPointerException
	at java.io.FileInputStream.<init>(FileInputStream.java:130)
	at java.io.FileInputStream.<init>(FileInputStream.java:93)
	at com.qq.tars.common.util.Config.parseFile(Config.java:211)
	at com.qq.tars.server.config.ConfigurationManager.loadServerConfig(ConfigurationManager.java:63)
	... 17 more
The exception occurred at load server config
```

成功启动会有如下日志：

```shell
[SERVER] server starting at tcp -h 127.0.0.1 -p 21715 -t 60000...
[SERVER] server started at tcp -h 127.0.0.1 -p 21715 -t 60000...
[SERVER] server starting at tcp -h 127.0.0.1 -p 21714 -t 3000...
[SERVER] server started at tcp -h 127.0.0.1 -p 21714 -t 3000...
[SERVER] The application started successfully.
The session manager service started...
[SERVER] server is ready...
2021-02-09 13:28:24.643  INFO 16016 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 55290 (http) with context path ''
2021-02-09 13:28:24.645  INFO 16016 --- [           main] o.d.s.e.tars.SoulTestTarsApplication     : Started SoulTestTarsApplication in 4.232 seconds (JVM running for 5.1)
2021-02-09 13:28:24.828  INFO 16016 --- [pool-2-thread-1] o.d.s.client.common.utils.RegisterUtils  : tars client register success: {"appName":"127.0.0.1:21715","contextPath":"/tars","path":"/tars/helloInt","pathDesc":"","rpcType":"tars","serviceName":"SoulExampleServer.SoulExampleApp.HelloObj","methodName":"helloInt","ruleName":"/tars/helloInt","parameterTypes":"int,java.lang.String","rpcExt":"{\"methodInfo\":[{\"methodName\":\"helloInt\",\"params\":[{},{}],\"returnType\":\"java.lang.Integer\"},{\"methodName\":\"hello\",\"params\":[{},{}],\"returnType\":\"java.lang.String\"}]}","enabled":true} 
2021-02-09 13:28:24.837  INFO 16016 --- [pool-2-thread-1] o.d.s.client.common.utils.RegisterUtils  : tars client register success: {"appName":"127.0.0.1:21715","contextPath":"/tars","path":"/tars/hello","pathDesc":"","rpcType":"tars","serviceName":"SoulExampleServer.SoulExampleApp.HelloObj","methodName":"hello","ruleName":"/tars/hello","parameterTypes":"int,java.lang.String","rpcExt":"{\"methodInfo\":[{\"methodName\":\"helloInt\",\"params\":[{},{}],\"returnType\":\"java.lang.Integer\"},{\"methodName\":\"hello\",\"params\":[{},{}],\"returnType\":\"java.lang.String\"}]}","enabled":true} 
```

## tars 插件设置

* 在 `soul-admin` 插件管理中，把`tars` 插件设置为开启。

## 测试

`soul-examples-tars`项目成功启动之后会自动把加 `@SoulTarsClient` 注解的接口方法注册到网关。

打开插件管理->tars可以看到插件规则配置列表

![](/img/soul/quick-start/tars/rule-list.png)

下面使用postman模拟http的方式来请求你的tars服务

![](/img/soul/quick-start/tars/postman-test.png)


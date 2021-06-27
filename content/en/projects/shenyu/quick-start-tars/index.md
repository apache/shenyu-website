---
title: Quick start with Tars
description: Quick start with Tars
---

This document introduces how to quickly access the ShenYu Gateway using Tars. You can get the code example of this document by clicking [here](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-tars).

## Environment to prepare

Please refer to the [setup](../shenyu-set-up) and launch `shenyu-admin` and `shenyu-bootstrap`.

Note: `shenyu-bootstrap` need to import tars dependencies

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-tars</artifactId>
    <version>${project.version}</version>
</dependency>

<dependency>
    <groupId>com.tencent.tars</groupId>
    <artifactId>tars-client</artifactId>
    <version>1.7.2</version>
</dependency>
```

## Run the shenyu-examples-tars project

Download [shenyu-examples-tars](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-tars)

Modify `host` in `application.yml` to be your local IP

Modify config `src/main/resources/ShenyuExampleServer.ShenyuExampleApp.config.conf`:

* It is recommended to make clear the meaning of the main configuration items of config, [refer to the development guide](https://github.com/TarsCloud/TarsJava/blob/master/docs/tars_java_user_guide.md)
* bind IP in config should pay attention to providing cost machine
* local=..., Indicates the open port that the native machine connects to the tarsnode. If there is no tarsnode, this configuration can be dropped
* `locator`: Indicates the address (frame address) of the main control center, which is used to obtain the IP list according to the service name, If Registry is not required to locate the service, this configuration can be dropped
* `node=tars.tarsnode.ServerObj@xxxx`, Indicates the address of the connected tarsnode. If there is no tarsnode locally, this configuration can be removed

More config configuration instructions, Please refer to[TARS Official Documentation](https://github.com/TarsCloud/TarsJava/blob/master/docs/tars_java_user_guide.md)

Execute the `org.apache.shenyu.examples.tars.ShenyuTestTarsApplication` main method to start project.

**Note:** The `configuration file address` needs to be specified in the startup command when the service starts **-Dconfig=xxx/ShenyuExampleServer.ShenyuExampleApp.config.conf**

If the `-Dconfig` parameter is not added, the configuration may throw the following exceptions:
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
	at org.apache.shenyu.examples.tars.ShenyuTestTarsApplication.main(ShenyuTestTarsApplication.java:38)
Caused by: java.lang.NullPointerException
	at java.io.FileInputStream.<init>(FileInputStream.java:130)
	at java.io.FileInputStream.<init>(FileInputStream.java:93)
	at com.qq.tars.common.util.Config.parseFile(Config.java:211)
	at com.qq.tars.server.config.ConfigurationManager.loadServerConfig(ConfigurationManager.java:63)
	... 17 more
The exception occurred at load server config
```

The following log appears when the startup is successful:
```shell
[SERVER] server starting at tcp -h 127.0.0.1 -p 21715 -t 60000...
[SERVER] server started at tcp -h 127.0.0.1 -p 21715 -t 60000...
[SERVER] server starting at tcp -h 127.0.0.1 -p 21714 -t 3000...
[SERVER] server started at tcp -h 127.0.0.1 -p 21714 -t 3000...
[SERVER] The application started successfully.
The session manager service started...
[SERVER] server is ready...
2021-02-09 13:28:24.643  INFO 16016 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 55290 (http) with context path ''
2021-02-09 13:28:24.645  INFO 16016 --- [           main] o.d.s.e.tars.ShenyuTestTarsApplication     : Started ShenyuTestTarsApplication in 4.232 seconds (JVM running for 5.1)
2021-02-09 13:28:24.828  INFO 16016 --- [pool-2-thread-1] o.d.s.client.common.utils.RegisterUtils  : tars client register success: {"appName":"127.0.0.1:21715","contextPath":"/tars","path":"/tars/helloInt","pathDesc":"","rpcType":"tars","serviceName":"ShenyuExampleServer.ShenyuExampleApp.HelloObj","methodName":"helloInt","ruleName":"/tars/helloInt","parameterTypes":"int,java.lang.String","rpcExt":"{\"methodInfo\":[{\"methodName\":\"helloInt\",\"params\":[{},{}],\"returnType\":\"java.lang.Integer\"},{\"methodName\":\"hello\",\"params\":[{},{}],\"returnType\":\"java.lang.String\"}]}","enabled":true} 
2021-02-09 13:28:24.837  INFO 16016 --- [pool-2-thread-1] o.d.s.client.common.utils.RegisterUtils  : tars client register success: {"appName":"127.0.0.1:21715","contextPath":"/tars","path":"/tars/hello","pathDesc":"","rpcType":"tars","serviceName":"ShenyuExampleServer.ShenyuExampleApp.HelloObj","methodName":"hello","ruleName":"/tars/hello","parameterTypes":"int,java.lang.String","rpcExt":"{\"methodInfo\":[{\"methodName\":\"helloInt\",\"params\":[{},{}],\"returnType\":\"java.lang.Integer\"},{\"methodName\":\"hello\",\"params\":[{},{}],\"returnType\":\"java.lang.String\"}]}","enabled":true} 
```

## Tars plugin settings

* enabled the `tars` plugin in the `shenyu-admin` plugin management.

## Testing

The `shenyu-examples-tars` project will automatically register interface methods annotated with `@ShenyuTarsClient` in the shenyu gateway after successful startup.

Open Plugin Management -> tars to see the list of plugin rule configurations

![](/img/shenyu/quick-start/tars/rule-list.png)

Use PostMan to simulate HTTP to request your tars service

![](/img/shenyu/quick-start/tars/postman-test.png)


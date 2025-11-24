---
title: Motan服务接入
description: Motan服务接入
---

此篇文介绍如何将 `Motan` 服务接入到 `Apache ShenYu` 网关，`Apache ShenYu` 网关使用 `motan` 插件来接入`Motan`服务。

接入前，请正确启动 `shenyu-admin`，并开启`motan`插件，在网关端和`motan`服务端引入相关依赖。可以参考前面的 [Motan快速开始](../../quick-start/quick-start-motan) 。


应用客户端接入的相关配置请参考：[客户端接入配置](../property-config/register-center-access.md)。

数据同步的相关配置请参考：[数据同步配置](../property-config/use-data-sync.md)。

## 在网关中引入 motan 插件


引入网关对`Motan`的代理插件，在网关的 `pom.xml` 文件中增加如下依赖：

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

* 重启你的网关服务。

## Motan服务接入网关

可以参考： [shenyu-examples-motan](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-motan)

1. 在由`Motan`构建的微服务中，引入如下依赖：

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-client-motan</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
```

2. 在 `application.yaml` 配置文件增加如下配置：

```yaml
shenyu:
  register:
    registerType: http #zookeeper #etcd #nacos #consul
    serverLists: http://localhost:9095 #localhost:2181 #http://localhost:2379 #localhost:8848
    props:
      username: admin
      password: 123456
  client:
    motan:
      props:
        contextPath: /motan
        ipAndPort: motan
        appName: motan
        port: 8081
      package-path: org.apache.shenyu.examples.motan.service
      basicServiceConfig:
        exportPort: 8002
motan:
  registry:
    protocol: zookeeper
    address: 127.0.0.1:2181
```

3. 在`Motan`服务接口实现类的方法上加上注解`@ShenyuMotanClient`，启动你的服务提供者，成功注册后，在后台管理系统进入`插件列表 -> rpc proxy -> motan`，会看到自动注册的选择器和规则信息。

示例：

```java
@MotanService(export = "demoMotan:8002")
public class MotanDemoServiceImpl implements MotanDemoService {
    @Override
    @ShenyuMotanClient(path = "/hello")
    public String hello(String name) {
        return "hello " + name;
    }
}
```

## 用户请求

可以通过 `http` 的方式来请求你的`motan`服务。`Apache ShenYu`网关需要有一个路由前缀，这个路由前缀就是接入网关配置的 `contextPath`。比如： `http://localhost:9195/motan/hello` 。

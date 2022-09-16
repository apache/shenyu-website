---
title: Tars服务接入
description: Tars服务接入
---

此篇文介绍如何将 `Tars` 服务接入到 `Apache ShenYu` 网关，`Apache ShenYu` 网关使用 `tars` 插件来接入`Tars`服务。

接入前，请正确启动 `shenyu-admin`，并开启`tars`插件，在网关端和`tars`服务端引入相关依赖。可以参考前面的 [Tars快速开始](../quick-start/quick-start-tars) 。


应用客户端接入的相关配置请参考：[客户端接入配置](./register-center-access)。

数据同步的相关配置请参考：[数据同步配置](./use-data-sync)。

## 在网关中引入 tars 插件


引入网关对`Tars`的代理插件，在网关的 `pom.xml` 文件中增加如下依赖：

```xml
        <!-- apache shenyu tars plugin start-->
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
        <!-- apache shenyu tars plugin end-->
```

* 重启你的网关服务。

## Tars服务接入网关

可以参考： [shenyu-examples-tars](https://github.com/apache/shenyu/tree/v2.4.2/shenyu-examples/shenyu-examples-tars)

1. 在由`Tars`构建的微服务中，引入如下依赖：

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-client-tars</artifactId>
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
    tars:
      props:
        contextPath: /tars
        appName: tars
        port: 21715
        host: 192.168.41.103
```

3. 在`Tars`服务接口实现类上加上 `@ShenyuTarsService` 注解，在方法上加上注解`@ShenyuTarsClient`，启动你的服务提供者，成功注册后，在后台管理系统进入`插件列表 -> rpc proxy -> tars`，会看到自动注册的选择器和规则信息。

示例：

```java
    @TarsServant("HelloObj")
    @ShenyuTarsService(serviceName = "ShenyuExampleServer.ShenyuExampleApp.HelloObj")
    public class HelloServantImpl implements HelloServant {
        @Override
        @ShenyuTarsClient(path = "/hello", desc = "hello")
        public String hello(int no, String name) {
            return String.format("hello no=%s, name=%s, time=%s", no, name, System.currentTimeMillis());
        }
    
        @Override
        @ShenyuTarsClient(path = "/helloInt", desc = "helloInt")
        public int helloInt(int no, String name) {
            return 1;
        }
    }

```

## 用户请求

可以通过 `http` 的方式来请求你的`tars`服务。`Apache ShenYu`网关需要有一个路由前缀，这个路由前缀就是接入网关配置的 `contextPath`。比如： `http://localhost:9195/tars/hello` 。

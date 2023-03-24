---
title: Websocket服务接入
description: Websocket服务接入
---
此篇文介绍如何将 `Websocket` 服务接入到 `Apache ShenYu` 网关，`Apache ShenYu` 网关使用 `Websocket` 插件来接入`Websocket`服务。

接入前，请正确启动 `shenyu-admin`，并开启`Websocket`插件，在网关端和`Websocket`服务端引入相关依赖。可以参考前面的 [Websocket快速开始](../quick-start/quick-start-websocket) 。

应用客户端接入的相关配置请参考：[客户端接入配置](../register-center-access.md)。

数据同步的相关配置请参考：[数据同步配置](../use-data-sync.md)。

## 在网关中引入 Websocket 插件

引入网关对`Websocket`的代理插件，在网关的 `pom.xml` 文件中增加如下依赖，默认已引入该依赖：

```xml
        <!--shenyu websocket plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-websocket</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* 重启你的网关服务。

## Websocket服务接入网关

> 参考示例： [shenyu-examples-websocket](https://github.com/apache/shenyu/tree/2.4.3-release/shenyu-examples/shenyu-examples-websocket)，包含 `annotation websocket`、`spring native websocket`、`spring reactive websocket`三种实现方式的示例

1. 在由`Websocket`构建的服务中，引入如下依赖：

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-client-websocket</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
```

2. 在 `application.yaml` 配置文件增加如下配置：

```yaml
shenyu:
  register:
    registerType: http
    serverLists: http://localhost:9095 # shenyu-admin服务端口
    props:
      username: admin
      password: 123456
  client:
    websocket:
      props:
        contextPath: /ws-annotation
        appName: ws-annotation
        port: 8001 # 需要和服务端口保持一致
```

3. 在`Websocket`服务接口实现类上加上 `@ShenyuSpringWebSocketClient` 注解，启动你的服务，成功注册后，在`shenyu-admin`管理系统进入`插件列表 -> Proxy -> Websocket`，会看到自动注册的选择器和规则信息。

示例：

```java
@ShenyuSpringWebSocketClient("/myWs")
@ServerEndpoint("/myWs")
public class WsServerEndpoint {
    @OnOpen
    public void onOpen(final Session session) {
        LOG.info("connect successful");
    }

    @OnClose
    public void onClose(final Session session) {
        LOG.info("connect closed");
    }

    @OnMessage
    public String onMsg(final String text) {
        return "server send message：" + text;
    }
}
```

## 用户请求

需要通过 `ws` 协议来请求你的`Websocket`服务。`Apache ShenYu`网关会配置一个路由前缀，这个路由前缀就是接入网关配置文件中的 `contextPath`。比如： `ws://localhost:9195/ws-annotation/myWs`，之后就可以正常建立连接发送和接收消息。

---
title: Websocket Proxy
description: Websocket Proxy
---

This document is intended to help the `Websocket` service access the `Apache ShenYu` gateway. The `Apache ShenYu` gateway uses the `Websocket` plugin to handle `Websocket` service.

Before the connection, start `shenyu-admin` correctly, start `Websocket` plugin, and add related dependencies on the gateway and `Websocket` application client. Refer to the previous [Quick start with Websocket](../../quick-start/quick-start-websocket) .

For details about client access configuration, see [Application Client Access Config](../property-config/register-center-access.md) .

For details about data synchronization configurations, see [Data Synchronization Config](../property-config/use-data-sync.md)).

## Add Websocket plugin in gateway

Add the following dependencies to the gateway's `pom.xml` file , which is introduced by default：

```xml
        <!--shenyu websocket plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-websocket</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* Restart your gateway service.

## Websocket service access gateway

> Please refer to： [shenyu-examples-websocket](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-websocket), Contains examples of the three implementations of  `annotation websocket`、`spring native websocket`、`spring reactive websocket`

1. In the `Websocket` service, add the following dependencies:

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-client-websocket</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
```

2. Add the following configuration to the `application.yaml` configuration file:

```yaml
shenyu:
  register:
    registerType: http
    serverLists: http://localhost:9095 # shenyu-admin ip and port
    props:
      username: admin
      password: 123456
  client:
    websocket:
      props:
        contextPath: /ws-annotation
        appName: ws-annotation
        port: 8001 # need to be consistent with the service port
```

3. Add `@ShenyuSpringWebSocketClient` annotation to the `Websocket` service interface implementation class, start your service and after successful registration, go to `Client List -> Proxy -> Websocket` in the `shenyu-admin` management system and you will see the auto-registered selector and rule information.

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

## User Request

You need to request your `Websocket` service via the `ws` protocol. The `Apache ShenYu` gateway will configure a routing prefix which is the `contextPath` in the access gateway configuration file. For example: `ws://localhost:9195/ws-annotation/myWs`, after which you can establish a connection to send and receive messages normally.


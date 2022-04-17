---
title: WebSocket Plugin
keywords: ["WebSocket"]
description: websocket plugin
---


The Apache ShenYu gateway implements support for the WebSocket proxy.


## Environment to prepare

Please refer to the deployment to select a way to start shenyu-admin. For example, start the Apache ShenYu gateway management system through [local deployment](../../deployment/deployment-local) .

After successful startup, you need to open the Websocket plugin on in the BasicConfig `->` Plugin. For `Websocket` plugin details.

You can see it in PluginList -> rpc proxy -> Websocket. For details about the selector and rule configuration, see [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule) .

Add the following dependencies to the gateway's `pom.xml` file:

```xml
  <!--if you use websocket proxy start this-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-websocket</artifactId>
  <version>${project.version}</version>
</dependency>

```

## Request Path

When using Apache ShenYu proxy websocket, assume that the request path is:

```
ws://localhost:9195/wesocket
```


---
title: WebSocket Proxy
keywords: Apache ShenYu
description: websocket plugin
---


The Apache ShenYu gateway implements support for the WebSocket proxy through the `Divide` plugin.


## Environment to prepare

Please refer to the deployment to select a way to start shenyu-admin. For example, start the Apache ShenYu gateway management system through [local deployment](../deployment-local) .

After successful startup, you need to open the Divide plugin on in the BasicConfig `->` Plugin. For `Divide` plugin details, please refer to: [Divide Plugin](../divide-plugin) .

<img src="/img/shenyu/quick-start/http/http_open_en.png" width="60%" height="50%" />


Add the following dependencies to the gateway's `pom.xml` file:

```xml
  <!--if you use http proxy start this-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-divide</artifactId>
  <version>${project.version}</version>
</dependency>

<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-httpclient</artifactId>
  <version>${project.version}</version>
</dependency>
```

## Request Path

When using Apache ShenYu proxy websocket, assume that the request path is:


```
ws://localhost:9195/?module=ws&method=/websocket&rpcType=websocket
```

details：

- `localhost:9195`: `ip` and port of gateway.

- `module`: filter conditions for selector.

- `method`: websocket paths are also used for rule matching.

- `rpcType` ：default is websocket.



## Selector And Rule

Add a selector configuration to the `Divide` plugin:

<img src="/img/shenyu/plugin/websocket/websocket_selector_en.png" width="80%"/>

Select the type `query` in the condition, and fill in the matching field and value (`module`, `ws`). You can customize the fields and the values, as long as they match the request.

For Handle, enter the address of the `webSocket` service.

Add a new rule under this selector:


<img src="/img/shenyu/plugin/websocket/websocket_rule_en.png" width="80%"/>


Select the type `query` in the condition, and fill in the matching field and value, which are `method` and `websocket` respectively. You can also customize the fields and the values, as long as they match the request.



With the above selector and rule configuration, your request will be matched and then request the real `WebSocket` address of the proxy: `127.0.0.1:8080/websocket`, thus the Apache ShenYu gateway will complete the proxy for `websocket`.

---
title:  Quick start with Websocket
description: Websocket quick start
---

This document introduces how to quickly access the Apache ShenYu gateway using Websocket.


## Environment to prepare

> Refer to [local deployment](../deployment/deployment-local) to deploy the Shenyu gateway.

1. Deploy the `shenyu-admin` service.

- After successful launch, you need to set the `Websocket` plugin to be enabled in the page's basic configuration `->`Plugin Management.

<img src="/img/shenyu/plugin/websocket/enable_websocket_en.png" width="60%" height="50%" />

2. Deploy the `shenyu-bootstrap` service.
- After starting, `shenyu-bootstrap` will synchronize the data via the `websocket` protocol according to the address configured in `shenyu.sync.websocket.url`.

> Note: Before starting, make sure that the gateway has introduced the relevant dependency, which is introduced by default.

Import the gateway proxy plugin for `Websocket` and add the following dependencies to the gateway's `pom.xml` file.


```xml
        <!--shenyu websocket plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-websocket</artifactId>
            <version>${project.version}</version>
        </dependency>
```



## Run the shenyu-examples-websocket project

1. Download [shenyu-examples-websocket](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-websocket/shenyu-example-spring-annotation-websocket) (`native-websocket` and `reactive-websocket` can refer to the subprojects under [shenyu-examples-websocket](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-websocket)).

2. Run main method of `org.apache.shenyu.examples.websocket.TestAnnotationWebsocketApplication` to start this project.
- The examples project will synchronize the websocket service information to `shenyu-admin` via the `http` protocol according to the address configured in `shenyu.register.serverLists`, and then to `shenyu-bootstrap` by `shenyu-admin`.

log info as follows after starting:

```shell
2022-08-09 23:37:34.994  INFO 61398 --- [or_consumer_-21] o.a.s.r.client.http.utils.RegisterUtils  : metadata client register success: {"appName":"ws-annotation","contextPath":"/ws-annotation","path":"/ws-annotation/myWs","rpcType":"websocket","ruleName":"/ws-annotation/myWs","enabled":true,"pluginNames":[],"registerMetaData":false,"timeMillis":1660059454701} 
2022-08-09 23:37:35.019  INFO 61398 --- [or_consumer_-18] o.a.s.r.client.http.utils.RegisterUtils  : uri client register success: {"protocol":"ws://","appName":"ws-annotation","contextPath":"/ws-annotation","rpcType":"websocket","host":"192.168.1.3","port":8001} 
```



## Test

1. The `shenyu-examples-websocket` project will automatically register the interface methods annotated with `@ShenyuSpringWebSocketClient` to the gateway and add selectors and rules after successful start, you can see the information of `shenyu-examples-websocket` service registration by visiting `shenyu-admin` page -> PluginList -> Proxy -> Websocket to see the `shenyu-examples-websocket` service registration information, if not, you can refer to [Websocket plugin](../plugin-center/proxy/websocket-plugin.md) to add the configuration manually.

<img src="/img/shenyu/plugin/websocket/auto_register_en.png" width="60%" height="50%" />

2. The following test code (see attachment) simulates the request method of the `Websocket` protocol to request your `Websocket` service.

<img src="/img/shenyu/plugin/websocket/test_result_en.png" width="60%" height="50%" />



## Annexes

**websocket debugging code**

- Create a file called websocket.html and copy the following code into the file.
- Open websocket.html with Chrome.

```html
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="content-type" content="text/html" />
    <title>Shenyu WebSocket Test</title>
    <script>
        var websocket;
        function connect() {
            try {
                websocket = new WebSocket(document.getElementById("url").value);
                websocket.onopen = onOpen;
                websocket.onerror = onError;
                websocket.onmessage = onReceive;
                websocket.onclose = onClose;
            } catch (e) {
                alert('[websocket] establish connection error.');
            }
        }
        function onOpen() {
            alert('[websocket] connect success.');
        }
        function onError(e) {
            alert("[websocket] connect error. code: " + e.code);
        }
        function onReceive(msg) {
            var show = document.getElementById("show");
            show.innerHTML += "[Server Response] => " + msg.data + "<br/>";
            show.scrollTop = show.scrollHeight;
        }
        function onClose(e) {
            console.log("[websocket] connect closed. code: " + e.code)
            alert("[websocket] connect closed.");
            document.getElementById("show").innerHTML = "";
            document.getElementById("msg").value = "";
            websocket = null;
        }
        function buttonClose() {
            if (websocket == null) {
                console.log("Please establish a connection first.")
            } else {
                websocket.close(1000);
                document.getElementById("show").innerHTML = "";
                document.getElementById("msg").value = "";
            }
        }
        function send() {
            if (websocket == null) {
                alert("Please establish a connection first.")
            } else {
                var msg = document.getElementById("msg").value;
                show.innerHTML += "[Client Request] => " + msg + "<br/>";
                websocket.send(msg);
            }
        }
    </script>
</head>
<body>
    <input id="url" type="text" value="ws://localhost:9195/ws-annotation/myWs"><br />
    <input id="msg" type="text"><br />
    <button id="connect" onclick="connect();">Connect</button>
    <button id="send" onclick="send();">Send</button>
    <button id="close" onclick="buttonClose();">Close</button></br>
    <div id="show" class="show"></div>
</body>
</html>
<style>
    input {
        width: 400px;
        margin-bottom: 10px;
    }
    .show {
        width: 600px;
        height: 400px;
        overflow-y: auto;
        border: 1px solid #333;
        margin-top: 10px;
    }
</style>
```

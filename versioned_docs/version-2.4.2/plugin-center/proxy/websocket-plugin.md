---
title: Websocket Plugin
keywords: ["Websocket"]
description: Websocket Plugin
---

# 1. Overview

## 1.1 Plugin Name
* Websocket Plugin.

## 1.2 Appropriate Scenario
* Forwarding scenarios, processing websocket protocol requests and forwarding them to other websocket protocol services on the backend.
* Service Load Balancing.

## 1.3 Plugin functionality
* Support traffic management based on host, uri, query and other request information.
* Supports setting load balancing policies for requests and also supports service warm-up, currently supports three policies: ip hash (consistent hashing with virtual nodes), round-robbin (weighted polling), random (weighted random).
* Support setting interface level request timeout time.
* Support setting the number of timeout retries.

## 1.4 Plugin code
* Core Module ```shenyu-plugin-websocket```.
* Core Class ```org.apache.shenyu.plugin.websocket.WebSocketPlugin```.

## 1.5 Added Since Which shenyu version
- 2.4.1

# 2. How to use plugin
## 2.1 Plugin-use procedure chart

![image-20220726223545558](/img/shenyu/plugin/websocket/procedure_chart_en.png)

**Explanation of terms**
- Shenyu gateway service：Include shenyu-admin and shenyu-bootstrap services.
- Client services：Real backend websocket service.

**Explanation of the process**
1. Start shenyu gateway service: Refer to the deployment, start shenyu-admin and shenyu-bootstrap to make sure shenyu gateway service is normal.
2. Enable the websocket plugin in shenyu-admin: Turn on the websocket plugin in the shenyu-admin plugin management page.
3. Configure and start the client service: start the client project (real websocket service on the back end) and configure the service information into the shenyu gateway, in two ways: manual configuration and automatic configuration.
4. Check if forwarding is normal: Check if forwarding is successful.

## 2.2 Enable plugin

- In shenyu-admin --> BasicConfig --> Plugin --> websocket is set to on.

![image-20220726224444058](/img/shenyu/plugin/websocket/enable_websocket_en.png)


## 2.3 Client Services configuration

### 2.3.1 Manual configuration

> Manually configure the client service on the shenyu-admin page, and the backend service will implement the websocket protocol forwarding without any changes.

1. Adding selectors to the websocket plugin.

![image-20220726225217950](/img/shenyu/plugin/websocket/add_selector_en.png)

2. Add rules to the websocket plugin.

![image-20220726225315550](/img/shenyu/plugin/websocket/add_rule_en.png)

3. Start the client service (backend websocket service).

4. Test the success of service forwarding.

- See Annex 5.1 for the test code.

![image-20220726222003131](/img/shenyu/plugin/websocket/test_result_en.png)

### 2.3.2 Automatic configuration

> If there are scenarios where you need to automate configuration to reduce workload, you can add annotations to the backend service to automate the configuration of the service to the shenyu gateway.

1. Add the plugin maven configuration to the pom.xml file in the backend service project.

```xml
  <dependency>
      <groupId>org.apache.shenyu</groupId>
  		<artifactId>shenyu-spring-boot-starter-plugin-websocket</artifactId>
      <version>${project.version}</version>
  </dependency>
```

2. Use the `@ShenyuSpringWebSocketClient` annotation, which will automatically register the websocket service to the shenyu gateway.
3. Adjust the plugin configuration, see 2.4.1 for details of the configuration parameters.
4. Start the client project (the backend `websocket service), see 2.5 for sample code.
5. Check whether the PluginList service registration information in the shenyu-admin page is registered successfully.
6. Test the success of service forwarding.

- See Annex 5.1 for the test code.

![image-20220726221945414](/img/shenyu/plugin/websocket/test_result_en.png)

## 2.4 Config plugin

### 2.4.1 Configure access parameters in the configuration file in the client service

* Client access method and server address, the parameters are: `shenyu.register.*`, the following example uses the http access method, currently the client supports the following access methods: http, zookeeper, etcd, nacos, consul, please refer to [client access configuration](.../.../user-guide/register-center-access) for detailed access configuration parameters.
* Client configuration with the parameter: `shenyu.client.websocket.*`, containing the service name, routing address and port, and the contextPath value must be configured as the routing address for each service.

```yaml
shenyu:
  register:
    registerType: http
    serverLists: http://localhost:9095 
    props:
      username: admin
      password: 123456
  client:
    websocket:
      props:
        contextPath: /ws-annotation 
        appName: ws-annotation
        port: 8001 # Need to be consistent with the service port
```

### 2.4.2 Configure the websocket plugin's selector and rule information in shenyu-admin

Using auto-configuration, after the client starts it will automatically register [selectors and rules](../../user-guide/admin-usage/selector-and-rule.md) in shenyu-admin -> Plugin List -> Proxy -> Websocket information.
![image-20220725222628106](/img/shenyu/plugin/websocket/auto_register_en.png)

#### 2.4.2.1 Configuration of selectors

The example of websocket selector configuration, please refer to [selectors and rules](../../user-guide/admin-usage/selector-and-rule.md) for general selector configuration.

![image-20220725222913298](/img/shenyu/plugin/websocket/config_selectors_en.png)

##### 2.4.2.1.1 Selector handler configuration

- `host`：Fill in `localhost`, this field is not used for now.
- `ip:port`：`ip` and port, here fill in the `ip` + port of your real service.
- `protocol`：`ws` protocol, do not fill in the default: `ws://`.
- `startupTime`：Start-up time in milliseconds.
- `weight`：The default value for load balancing weight, which is automatically registered for service startup, is 50.
- `warmupTime`：Warm-up time, in milliseconds, the server in warm-up will calculate the instantaneous weight, the calculated value will be less than the actual weight configured to protect the server just started, the default value of service start registration is 10. For example, the warm-up time is 100 milliseconds, currently started 50 milliseconds, the configured weight is 50, the actual weight is 25.
- `status`：open or close, the start state of this processor is only valid.

#### 2.4.2.2 Configuration of rules

The example of websocket rule configuration, please refer to [selectors and rules](../../user-guide/admin-usage/selector-and-rule.md) for general rule configuration .

![image-20220725223225388](/img/shenyu/plugin/websocket/config_rules_en.png)

#####  2.4.2.2.1 Rule handler configuration

- `loadStrategy`:  if the websocket client is a cluster, which load balancing strategy to take when the Apache ShenYu gateway is invoked, currently supports roundRobin, random and hash.
- `timeout`: The timeout period for calling the client.
- `retryCount`: The number of retries to call client timeout failures.

## 2.5 示例

### 2.5.1 Spring Annotation Websocket Example

[shenyu-example-spring-annotation-websocket](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-websocket/shenyu-example-spring-annotation-websocket)

### 2.5.2 Spring Native Websocket Example

[shenyu-example-spring-native-websocket](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-websocket/shenyu-example-spring-native-websocket)

### 2.5.3 Spring Reactive Websocket Example

[shenyu-example-spring-reactive-websocket](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-websocket/shenyu-example-spring-reactive-websocket)

# 3. How to disable plugin

- shenyu-admin --> BasicConfig --> Plugin  --> Close websocket plugin status.

![image-20220726231206572](/img/shenyu/plugin/websocket/close_websocket_en.png)

# 4. Frequently Asked Questions

**4.1  Websocket connection establishment error 1002**

Possible causes: client service is not normal, shenyu gateway and client project can not establish a normal connection, please check the gateway to the client network, client service is normal.

**4.2 Multiple client services are displayed as empty in the websocket selector**

Possible cause: BasicConfig -> Plugin -> websocket -> multiSelectorHandle option select multiple handle.

![image-20220726222250136](/img/shenyu/plugin/websocket/questions_multiSelectorHandle_en.png)

# 5. Annexes

## 5.1 websocket debugging code

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

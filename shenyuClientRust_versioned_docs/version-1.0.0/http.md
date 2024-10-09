---
description: http
title: Http Example
---
# The Http type Register

**1.Fist make sure The ShenYuAdmin is Started, and ShenYuAdmin service active port is 9095.**

```log
//Or you will see this error :
 
2024-10-09T07:23:26.970200Z ERROR shenyu_client_rust::core: Can't get register token
2024-10-09T07:23:29.015550Z ERROR shenyu_client_rust::core: [ERROR], register metadata to http://127.0.0.1:9095/shenyu-client/register-metadata failed, app_name: shenyu_client_app, path: /health, contextPath: /xxx
2024-10-09T07:23:31.039558Z ERROR shenyu_client_rust::core: [ERROR], register metadata to http://127.0.0.1:9095/shenyu-client/register-metadata failed, app_name: shenyu_client_app, path: /users, contextPath: /xxx
2024-10-09T07:23:33.089412Z ERROR shenyu_client_rust::core: [ERROR], register uri to http://127.0.0.1:9095/shenyu-client/register-uri failed, app_name: shenyu_client_app, host: 10.10.9.198, port: 3000
2024-10-09T07:23:35.124249Z ERROR shenyu_client_rust::core: [ERROR], register discover config to http://127.0.0.1:9095/shenyu-client/register-discoveryConfig failed, discovery_type: zookeeper, host: 10.10.9.198, port: 3000
 
```

**2.Step 1 Get shenyu_admin_client. (Register service need this)**

```yml
#  a yml-format config file
shenyu:
  register:
    register_type: "http"
    servers: "http://127.0.0.1:9095"
    props:
      username: "admin"
      password: "123456"
```

```markdown
//init config.
let config = ShenYuConfig::from_yaml_file("config.yml").unwrap();
// init shenyu client.
let client = ShenyuClient::new(config, app.app_name(), app.uri_infos(), 3000).unwrap();
```

```log
The adminToken like this :
{
    "code":200,
    "message":"login dashboard user success",
    "data":{
        "id":"1",
        "userName":"admin",
        "role":1,
        "enabled":true,
        "dateCreated":"2018-06-23 15:12:22",
        "dateUpdated":"2024-10-03 02:29:39",
        "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNzI4NTQ3NjQ3fQ.93LAuDP_MrJZeQB5A6gX-3-Vyxy9egw41QhnNHlUWEE"
    }
}

When you success get toekn, you will see this :
2024-10-09T08:07:27.721483Z  INFO shenyu_client_rust::core: [SUCCESS], get register token success, register token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNzI4NTQ3NjQ3fQ.93LAuDP_MrJZeQB5A6gX-3-Vyxy9egw41QhnNHlUWEE"

```

**3.Step 2 Register MetaData to ShenYu GateWay. **

```markdown
// register to shenyu admin.
client.register().expect("TODO: panic message");
```

```log
2024-10-03T02:29:39.392390Z  INFO shenyu_client_rust::core: [SUCCESS], register metadata success, register data: Object {
"appName": String("shenyu_client_app"),
"contextPath": String("/xxx"),
"enabled": Bool(true),
"host": String("10.1.0.187"),
"methodName": String("get"),
"parameterTypes": String(""),
"path": String("/xxx/health"),
"pathDesc": String(""),
"pluginNames": Array [],
"port": Number(4000),
"registerMetaData": String(""),
"rpcExt": String(""),
"rpcType": String("http"),
"ruleName": String("/xxx/health"),
"serviceName": String("shenyu_client_app"),
}
2024-10-03T02:29:39.398917Z  INFO shenyu_client_rust::core: [SUCCESS], register metadata success, register data: Object {
"appName": String("shenyu_client_app"),
"contextPath": String("/xxx"),
"enabled": Bool(true),
"host": String("10.1.0.187"),
"methodName": String("post"),
"parameterTypes": String(""),
"path": String("/xxx/create_user"),
"pathDesc": String(""),
"pluginNames": Array [],
"port": Number(4000),
"registerMetaData": String(""),
"rpcExt": String(""),
"rpcType": String("http"),
"ruleName": String("/xxx/create_user"),
"serviceName": String("shenyu_client_app"),
}
2024-10-03T02:29:39.404389Z  INFO shenyu_client_rust::core: [SUCCESS], register metadata success, register data: Object {
"appName": String("shenyu_client_app"),
"contextPath": String("/xxx"),
"enabled": Bool(true),
"host": String("10.1.0.187"),
"methodName": String("get"),
"parameterTypes": String(""),
"path": String("/xxx/"),
"pathDesc": String(""),
"pluginNames": Array [],
"port": Number(4000),
"registerMetaData": String(""),
"rpcExt": String(""),
"rpcType": String("http"),
"ruleName": String("/xxx/"),
"serviceName": String("shenyu_client_app"),
}
2024-10-03T02:29:39.409866Z  INFO shenyu_client_rust::core: [SUCCESS], register uri success, register data: Object {
"appName": String("shenyu_client_app"),
"contextPath": String("/xxx"),
"eventType": String("REGISTER"),
"host": String("10.1.0.187"),
"port": Number(4000),
"protocol": String("http"),
"rpcType": String("http"),
}
2024-10-03T02:29:39.433662Z  INFO shenyu_client_rust::core: [SUCCESS], register discover config success, register data: Object {
"discoveryType": String("zookeeper"),
"handler": String("{}"),
"listenerNode": String("/shenyu/discovery/http_example"),
"name": String("defaultzookeeper"),
"pluginName": String(""),
"props": Object {
"baseSleepTimeMilliseconds": String("1000"),
"connectionTimeoutMilliseconds": String("60000"),
"maxRetries": String("4"),
"maxSleepTimeMilliseconds": String("5000"),
"sessionTimeoutMilliseconds": String("8"),
},
"selectorName": String("/xxx"),
"serverList": String("127.0.0.1:2181"),
}

```

**3.Step 3 Offline register from ShenYu GateWay. **

```log
2024-10-03T02:29:50.311159Z  INFO shenyu_client_rust::core: [SUCCESS], offline success, register data: Object {
"appName": String("shenyu_client_app"),
"contextPath": String("/xxx"),
"eventType": String("REGISTER"),
"host": String("10.1.0.187"),
"port": Number(4000),
"protocol": String("http"),
}
```

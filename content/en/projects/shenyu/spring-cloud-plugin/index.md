---
title: Spring Cloud Plugin
keywords: SpringCloud
description: SpringCloud Plugin
---

## Explanation

* This plugin is the core of transforming `http` protocol into `springCloud protocol`.


## Plugin Setting

* Add related dependencies and enable plugin, please refer to: [Quick start with Spring Cloud](../quick-start-springcloud) .
 
* `Spring Cloud` client access, please refer to: [Spring Cloud Proxy](../spring-cloud-proxy) .


## Plugin Detail


After the client accesses the `ShenYu` gateway, it will automatically register the selector and rule information. For details about the selector and rule configuration, see [Selector and Rule Config](../selector-and-rule) .



#### Selector Handler

<img src="/img/shenyu/plugin/springcloud/spring-cloud-plugin-en-1.png" width="80%" height="80%" />


Selector Handler, the `handle` field, is an operation that can be processed by the gateway after matching the traffic. For more information, please refer to [Plugin handle management](../plugin-handle-explanation) in Plugin Config.



* details：

     * `serviceId`：service Id.
     
#### Rule Handler

<img src="/img/shenyu/plugin/springcloud/spring-cloud-plugin-en-2.png" width="80%" height="80%" />

Rule Handler, the `handle` field, can be performed by the gateway after the final matching of traffic. For more information, please refer to [Plugin handle management](../plugin-handle-explanation) in Plugin Config.

* details：

     * `path`：request path.
     * `timeout`：set time out.
     
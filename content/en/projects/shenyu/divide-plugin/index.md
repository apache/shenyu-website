---
title: Divide Plugin
keywords: divide
description: divide plugin
---

## Explanation

* `Divide` is the core processing plugin for gateway to process `http` requests.

## Plug-in Setting

* Introduce related dependencies and enable plug-ins, please refer to: [Quick start http](../quick-start-http)

* `Http` client，please refer to：[Http proxy](../http-proxy)。

## Plug-in details

The `divide` plugin is a plugin for forward proxying of `http`. All requests of the `http` type are called by the plugin for load balancing.

<img src="/img/shenyu/basicConfig/pluginHandle/selector1_en.png" width="80%" height="80%" />

After the client connects to the `ShenYu` gateway, it will automatically register the selector and rule information. For the selector and rule configuration, please refer to:[Selector And Rule](../selector-and-rule)。


#### selector setting

<img src="/img/shenyu/basicConfig/pluginHandle/selector2_en.png" width="80%" height="80%" />


selector setting: corresponding to the `handle` field of [selector and rule management] (../selector-and-rule), it is the `http` configuration that is actually called after the gateway matches the traffic. You can configure multiple and set the load The balance weight, the specific load balancing strategy, is specified in the rules. For more information, please refer to [Plugin Handling Management](../plugin-handle-explanation) in Plugin Management.
* detailed processing setting：

  * `host`：input `localhost`，this field is ignored。

  * `ip:port`：IP and port, input your true service `ip` + port here。

  * `protocol`：：HTTP protocol，input `http://` or `https://` ，default is:`http://`

  * `startupTime`： enabling the time。

  * `weight`：load balancing weight。

  * `warmupTime`：warm-up time。

  * `status`：open or closed。

  * `ip + port` check

    * there will be a scheduled task in `shenyu-admin` to scan the configured `ip` port, if it is found offline, choose to delete the `ip + port`.

    * can be configured as follows:

```yaml
shenyu:
  register:
    registerType: http 
    serverLists: 
    props:
      sessionTimeout: 5000
      connectionTimeout: 2000
      checked: true  # default is true, set to false, no detection
      zombieCheckTimes: 5
      scheduledTime: 10 # timing detection interval, the default is 10 seconds

 ```  

#### rule setting

 <img src="/img/shenyu/basicConfig/pluginHandle/rule1_en.png" width="80%" height="80%" />

rule setting，corresponding to the `handle` field of [selector and rule management] (../selector-and-rule)，It is the processing rule that the gateway adopts after the final matching of the traffic is completed. For more information, please refer to [Plugin Processing Management](../plugin-handle-explanation) in Plugin Managemen.

* detailed processing setting：
  * `loadStrategy`: if the `http` client is a cluster, which load balancing strategy is adopted when the `ShenYu` gateway is called, currently supports `roundRobin`, `random` and `hash`.
  * `retryCount`: number of retries for calling the `http` client.
  * `timeout`: timeout period for calling the `http` client.
  * `headerMaxSize`: maximum value of the requested `header`.
  * `requestMaxSize`: maximum size of the request body.

 

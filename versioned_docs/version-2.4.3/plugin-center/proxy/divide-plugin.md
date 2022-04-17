---
title: Divide Plugin
keywords: ["divide"]
description: divide plugin
---

## Explanation

* `Divide` is the core processing plugin for gateway to process `http` requests.

## Plugin Setting

* Add related dependencies and enable plugin, please refer to: [Quick start with Http](../../quick-start/quick-start-http)

* `Http` client access, please refer to：[Http proxy](../../user-guide/http-proxy) .

## Plugin detail

The `divide` plugin is a plugin for forward proxying of `http`. All requests of the `http` type are called by the plugin for load balancing.

<img src="/img/shenyu/plugin/divide/plugin-en.png" width="80%" height="80%" />


After the client connects to the `Apache ShenYu` gateway, it will automatically register the selector and rule information. For the selector and rule configuration, please refer to:[Selector And Rule](../../user-guide/admin-usage/selector-and-rule)。


#### Selector Handler

<img src="/img/shenyu/plugin/divide/selector_en.png" width="80%" height="80%" />


Selector Handler, corresponding to the `handle` field of [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule) , it is the `http` configuration that is actually called after the gateway matches the traffic. You can configure multiple and set the load The balance weight, the specific load balancing strategy, is specified in the rules. For more information, please refer to [Plugin handle management](../../user-guide/admin-usage/plugin-handle-explanation) in Plugin Config.

* detailed processing setting：

  * `host`: input `localhost`,this field is ignored.

  * `ip:port`: ip and port, input your true service `ip` + port here.

  * `protocol`: `HTTP` protocol, input `http://` or `https://`, default is:`http://` .

  * `startupTime`: enabling the time.

  * `weight`: load balancing weight.

  * `warmupTime`: warm-up time.

  * `status`: open or closed.

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

#### Rule Handler

 <img src="/img/shenyu/plugin/divide/rule_en.png" width="80%" height="80%" />

Rule Handler, corresponding to the `handle` field of [Selector And Rule Config](../../user-guide/admin-usage/selector-and-rule). It is the processing rule that the gateway adopts after the final matching of the traffic is completed. For more information, please refer to [Plugin handle management](../../user-guide/admin-usage/plugin-handle-explanation) in Plugin Config.

* detailed processing setting：
  * `loadStrategy`: if the `http` client is a cluster, which load balancing strategy is adopted when the `Apache ShenYu` gateway is called, currently supports `roundRobin`, `random` and `hash`.
  * `retryCount`: number of retries for calling the `http` client.
  * `timeout`: timeout period for calling the `http` client.
  * `headerMaxSize`: maximum value of the requested `header`.
  * `requestMaxSize`: maximum size of the request body.
  * `retryStrategy`: supported since `2.4.3`, the retry strategy `after failure`, the default `current` remains compatible with lower versions. 
    
    For example, there are 3 downstream services `http:localhost:1111`, `http:localhost:1112` and `http:localhost:1113`, assuming the first load balancing to `http:localhost:1111` and `call failed`. 
    
    Using the `current` policy will continue to retry the call to `http:localhost:1111`; 
    
    Using the `failover` policy will retry the call to other services such as `http:localhost:1112` through the `loadStrategy`, if it fails again at this time , call to `http:localhost:1113` until no service is available.
  
---
slug: demo-collection
title: Apache ShenYu Demo Collection
tags: [Apache ShenYu]
---

### Context-Path Plugin

1. start shenyu-admin
2. start shenyu-bootstrap
3. Modify shenyu-examples-http (we just use shenyu's example here)
   **In `HttpTestController.java`, slightly modify the path value of the class annotation @RequestMapping to `"/v1/test"`**, as shown in the figure below.
   ![context-path-RequestMapping](/img/activities/code-analysis-context-path-plugin/context-path-RequestMapping.png)
4. start shenyu-examples-http

At this point, our services are up.

Then we request the path `http://localhost:9195/http/test/findByUserId?userId=1001` and the result returns 404.

![context-path-404](/img/activities/code-analysis-context-path-plugin/context-path-404.png)

Let's analyze the process of the gateway processing this request:

1. Request the gateway's path `/http/test/findByUserId`
2. After various plugin processing...
3. Then to the context-path plugin.
   We can find such a rule in the admin, set the contextPath to `/http`, and set the addPrefix to empty. In fact, this setting makes shenyu replace `/http` with `nothing` in the request path before sending a request to the target service.
   ![context-path-rules-without-prefix](/img/activities/code-analysis-context-path-plugin/context-path-rules-without-prefix.png)

Then you should know by now, we only need to fill in `/v1` in the space of addPrefix to request the target service correctly!

![context-path-rules-with-prefix](/img/activities/code-analysis-context-path-plugin/context-path-rules-with-prefix.png)

![context-path-success](/img/activities/code-analysis-context-path-plugin/context-path-success.png)

### Param-Mapping Plugin

1. start shenyu-admin
2. start bootstrap
3. start shenyu-examples-http

At this point, our services are all up, and then open the admin web page to perform related configuration.

1. start `param-mapping` plugin
2. add the selector and rule of `param-mapping` plugi. Here we only add the relevant configuration of `/request/parameter`, as shown in the figure below.
   ![param-mapping-selector](/img/activities/code-analysis-param-mapping-plugin/param-mapping-selector.png)
   ![param-mapping-rules](/img/activities/code-analysis-param-mapping-plugin/param-mapping-rules.png)

Finally, make a request to `/http/request/parameter`.

![param-mapping-request](/img/activities/code-analysis-param-mapping-plugin/param-mapping-request.png)

The above configuration of Rules will replace the `id` in the request body with `userId` and `name` with `userName`

In addition, you can configure `addParameterKeys` and `removeParameterKeys` in the rule, please refer to [Param-mapping plugin document](../docs/plugin-center/http-handle/param-mapping-plugin#parammappingplugin-guide)

---
slug: demo-collection
title: Apache ShenYu Demo集合
tags: [Apache ShenYu]
---

### Context-Path插件

1. 启动 shenyu-admin
2. 启动 shenyu-bootstrap
3. 修改一下 shenyu-examples-http（我们这里直接用shenyu的example）
   **在HttpTestController.java中，将类注解@RequestMapping的path值稍作修改**，改成`"/v1/test"`，如下图所示。
   ![context-path-RequestMapping](/img/activities/code-analysis-context-path-plugin/context-path-RequestMapping.png)
4. 启动 shenyu-examples-http

到这里，我们的服务就都起来了。

然后我们请求接口 `http://localhost:9195/http/test/findByUserId?userId=1001` ，结果返回404。

![context-path-404](/img/activities/code-analysis-context-path-plugin/context-path-404.png)

我们分析一下网关处理这个请求的过程的流程：

1. 请求网关的 `/http/test/findByUserId`

2. 经过各种插件的处理。。。

3. 然后到了context_path插件。

   我们可以在admin里面发现有这样一条规则，将contextPath设置为`/http`，addPrefix设置为空。实际上，这样的设置使得shenyu在向目标服务发送请求前，将请求路径中的`/http`替换成了`空`。(详细内容见后续的源码分析)

   ![context-path-rules-without-prefix](/img/activities/code-analysis-context-path-plugin/context-path-rules-without-prefix.png)

那么你现在应该知道了，我们只需要在addPrefix的空格里填上`/v1`就能正确地请求到目标服务了！

![context-path-rules-with-prefix](/img/activities/code-analysis-context-path-plugin/context-path-rules-with-prefix.png)

![context-path-success](/img/activities/code-analysis-context-path-plugin/context-path-success.png)

### Param-Mapping插件

1. 启动 shenyu-admin
2. 启动 bootstrap
3. 启动 shenyu-examples-http

到这里，我们的服务就都开起来了，接下来打开admin网页，进行相关配置。

1. 开启 `param-mapping` 插件
2. 添加 `param-mapping` 插件的选择器和规则，这里我们只添加 `/request/parameter` 的相关配置，如下图。
   ![param-mapping-selector](/img/activities/code-analysis-param-mapping-plugin/param-mapping-selector.png)
   ![param-mapping-rules](/img/activities/code-analysis-param-mapping-plugin/param-mapping-rules.png)

最后，向 `/http/request/parameter` 发起请求。

![param-mapping-request](/img/activities/code-analysis-param-mapping-plugin/param-mapping-request.png)

上面Rules的配置会将请求体中的 `id` 替换成 `userId` ，`name` 替换成 `userName`

另外，rule中还可以配置 `addParameterKeys`、`removeParameterKeys`，请参考[Param-mapping插件文档](../docs/plugin-center/http-handle/param-mapping-plugin#parammappingplugin-guide)

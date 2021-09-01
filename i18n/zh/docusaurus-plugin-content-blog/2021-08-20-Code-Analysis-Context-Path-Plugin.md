---
title: Context-Path插件源码分析
author: Kunshuai Zhu
author_title: Apache ShenYu Contributor
author_url: https://github.com/JooKS-me
author_image_url: https://avatars1.githubusercontent.com/u/62384022?v=4
tags: [Context-Path, Apache ShenYu]
---

## Demo跑起来

1. 启动ShenYu Admin

2. 启动ShenYu Bootstrap

3. 修改一下shenyu-examples-http（我们这里直接用shenyu的example）

   **在HttpTestController.java中，将类注解@RequestMapping的path值稍作修改**，改成`"/v1/test"`，如下图所示。

   ![context-path-RequestMapping](/img/activities/code-analysis-context-path-plugin/context-path-RequestMapping.png)

4. 启动shenyu-examples-http

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

## 分析源码

首先，看`ContextPathPlugin#doExecute`方法，这是这个插件的核心。

```java
protected Mono<Void> doExecute(final ServerWebExchange exchange, final ShenyuPluginChain chain, final SelectorData selector, final RuleData rule) {
    ...
    // 1. 从JVM缓存中取得contextMappingHandle
    ContextMappingHandle contextMappingHandle = ContextPathPluginDataHandler.CACHED_HANDLE.get().obtainHandle(CacheKeyUtils.INST.getKey(rule));
    ...
    // 2. 根据contextMappingHandle设置shenyu上下文
    buildContextPath(shenyuContext, contextMappingHandle);
    return chain.execute(exchange);
}
```

1. 从JVM缓存中取得`contextMappingHandle`

   这里的`contextMappingHandle`是`ContextMappingHandle`类的实例，里面有两个成员变量：`contextPath`和`addPrefix`

   这两个变量在之前Admin里面的Rules表单里有出现过，是在数据同步的时候更新的。

2. 根据contextMappingHandle设置shenyu上下文

   下面是`ContextPathPlugin#buildContextPath`方法的源代码

   ```java
   private void buildContextPath(final ShenyuContext context, final ContextMappingHandle handle) {
       String realURI = "";
       // 1. 设置shenyu的context path，根据contextPath的长度将真实URI的前缀去掉
       if (StringUtils.isNoneBlank(handle.getContextPath())) {
           context.setContextPath(handle.getContextPath());
           context.setModule(handle.getContextPath());
           realURI = context.getPath().substring(handle.getContextPath().length());
       }
       // 加上前缀
       if (StringUtils.isNoneBlank(handle.getAddPrefix())) {
           if (StringUtils.isNotBlank(realURI)) {
               realURI = handle.getAddPrefix() + realURI;
           } else {
               realURI = handle.getAddPrefix() + context.getPath();
           }
       }
       context.setRealUrl(realURI);
   }
   ```

    - 设置shenyu的context path，**根据contextPath的长度将真实URI的前缀去掉**

      你可能会有疑问，**这里所谓的「根据contextPath的长度」会不会有问题呢？**

      实际上这样的判断是没有问题的，因为请求在被Selector和Rules匹配到之后，才会被插件处理。所以在设置好Selector和Rules的前提下，是完全可以满足转换特定contextPath的需求的。

然后，`ContextPathPlugin`类还有一个比较重要的方法`skip`，下面展示了部分代码。我们可以发现：**如果是对RPC服务的调用，就会直接跳过context_path插件。**

```java
public Boolean skip(final ServerWebExchange exchange) {
    ...
    return Objects.equals(rpcType, RpcTypeEnum.DUBBO.getName())
            || Objects.equals(rpcType, RpcTypeEnum.GRPC.getName())
            || Objects.equals(rpcType, RpcTypeEnum.TARS.getName())
            || Objects.equals(rpcType, RpcTypeEnum.MOTAN.getName())
            || Objects.equals(rpcType, RpcTypeEnum.SOFA.getName());
}
```

最后，context_path插件还有另一个类`ContextPathPluginDataHandler`。这个类的作用是订阅插件的数据，当插件配置被修改、删除、增加时，就往JVM缓存里面修改、删除、新增数据。

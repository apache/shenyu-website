---
slug: code-analysis-context-path
title: Code Analysis For Context-Path Plugin
author: Kunshuai Zhu
author_title: Apache ShenYu Contributor
author_url: https://github.com/JooKS-me
author_image_url: https://avatars1.githubusercontent.com/u/62384022?v=4
tags: [Context-Path, Apache ShenYu]
---

> Before you start, you can run[the Demo Of Context-Path Plugin](demo-collection#context-path-plugin)

### Body

First, look at the `ContextPathPlugin#doExecute` method, which is the core of this plugin.

```java
protected Mono<Void> doExecute(final ServerWebExchange exchange, final ShenyuPluginChain chain, final SelectorData selector, final RuleData rule) {
    ...
    // 1. get the contextMappingHandle from the JVM cache
    ContextMappingHandle contextMappingHandle = ContextPathPluginDataHandler.CACHED_HANDLE.get().obtainHandle(CacheKeyUtils.INST.getKey(rule));
    ...
    // 2. set shenyu context according to contextMappingHandle
    buildContextPath(shenyuContext, contextMappingHandle);
    return chain.execute(exchange);
}
```

1. Get the `contextMappingHandle` from the JVM cache

   The `contextMappingHandle` here is an instance of the `ContextMappingHandle` class, which has two member variables: `contextPath` and `addPrefix`

   These two variables have appeared in the Rules form in the Admin before, and they are updated when the data is synchronized.

2. Set shenyu context according to contextMappingHandle

   Below is the source code of the `ContextPathPlugin#buildContextPath` method

   ```java
   private void buildContextPath(final ShenyuContext context, final ContextMappingHandle handle) {
       String realURI = "";
       // 1. set the context path of shenyu, remove the prefix of the real URI according to the length of the contextPath
       if (StringUtils.isNoneBlank(handle.getContextPath())) {
           context.setContextPath(handle.getContextPath());
           context.setModule(handle.getContextPath());
           realURI = context.getPath().substring(handle.getContextPath().length());
       }
       // add prefix
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

    - Set the context path of shenyu, **remove the prefix of the real URI according to the length of the contextPath**

      You may be wondering whether **there is a problem with the so-called "according to the length of the contextPath" here**?

      In fact, such a judgment is not a problem, because the request will be processed by the plugin only after it is matched by the Selector and Rules. Therefore, under the premise of setting up Selector and Rules, it is completely possible to meet the needs of converting a specific contextPath.

Then, the `ContextPathPlugin` class has a more important method `skip`, part of the code is shown below. We can find: **If it is a call to the RPC service, the context_path plugin will be skipped directly.**

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

Finally, the context-path plugin has another class `ContextPathPluginDataHandler`. The function of this class is to subscribe to the data of the plug-in. When the plugin configuration is modified, deleted, or added, the data is modified, deleted, or added to the JVM cache.

---
slug: code-analysis-context-path
title: Context-Path插件源码分析
author: Kunshuai Zhu
author_title: Apache ShenYu Contributor
author_url: https://github.com/JooKS-me
author_image_url: https://avatars1.githubusercontent.com/u/62384022?v=4
tags: [Context-Path, Apache ShenYu]
---

> 开始前，可以参考 [这篇文章](./start-demo) 运行shenyu网关

### 正文

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

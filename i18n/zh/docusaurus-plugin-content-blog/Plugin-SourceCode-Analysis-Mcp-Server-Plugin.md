---
title: McpServer 插件源码分析
author: yusiheng
author_title: Apache ShenYu Contributor
author_url: https://github.com/478320
tags: [plugin,mcp,Apache ShenYu]
---

在 shenyu 网关中，启动该插件，shenyu 将成为一个功能丰富的 mcpServer,
你可以通过简单配置来将一个服务作为 tool 注册到 shenyu 网关中，并使用网关提供的扩展功能。

> 本文基于`shenyu-2.7.0.2`版本进行源码分析， 在本篇中我将追踪 Shenyu Mcp 插件链路，对 Mcp 插件的 sse 通信方式进行源码分析

### 前言

> shenyu 网关的 mcp 插件基于 spring-ai-mcp 扩展而来，为了更好的了解 mcp 插件的工作原理
> ，我将简单介绍 mcp 官方提供的 jdk 中各个 java 类是如何协同运作的

我想先简单介绍三个 Mcp 官方提供的 java 类

>1. `McpServer`
>
>该类负责管理，tool，Resource，promote 等资源
>
>2. `TransportProvider`
>
>根据客户端和服务端之间通信协议，提供之相对应的通讯方法
>
>3. `Session`
>
>处理请求数据、响应数据和通知数据，提供一些基本方法和其对应的处理器，查询工具，调用工具都在此处执行

### 1. 服务注册

在 shenyu admin 的 McpServer 中插件填写 endpoint 和 tool 信息后，这些信息将自动注册到 shenyu bootstrap 中，
数据同步源码可以参考官网[websocket数据同步](https://shenyu.incubator.apache.org/zh/blog/DataSync-SourceCode-Analysis-WebSocket-Data-Sync)

shenyu bootstrap 将在 `McpServerPluginDataHandler` 的 `handler()` 方法中接收到 admin 同步来的数据。

`handlerSelector()` 方法接收 url 数据创建 McpServer

`handlerRule()` 方法接收 tool 信息，注册 tool

这两个方法共同组成了 Shenyu Mcp 插件的服务注册部分，下面我将对这个两个方法，详细展开分析

#### 1.1 Transport，McpServer注册

我们先来分析 `handlerSelector()` 方法，也就是 McpServer 的注册

* `handlerSelector()` 方法 工作内容如下

1. 捕捉用户在 Selector 上的填写的 url，这个 url 将作为一个 key 存储 McpServer TransportProvider 等信息
2. 序列化创建 `ShenyuMcpServer`，`ShenyuMcpServer` 将 SelectorId 和这些 url 也就是这些 key 绑定，以此来实现 selectorId 和 key 的绑定。

> 注意 `ShenyuMcpServer` 是 Shenyu 用于绑定 SelectorId 和 url 的对象，和 `McpServer` 没有继承关系，功能也完全不同

3. 调用 `ShenyuMcpServerManager` 的 `getOrCreateMcpServerTransport()` 方法注册 McpServer TransportProvider
```java
public class McpServerPluginDataHandler implements PluginDataHandler {
    @Override
    public void handlerSelector(final SelectorData selectorData) {
        // 获取URI
        String uri = selectorData.getConditionList().stream()
                .filter(condition -> Constants.URI.equals(condition.getParamType()))
                .map(ConditionData::getParamValue)
                .findFirst()
                .orElse(null);
        
        // 构建McpServer
        ShenyuMcpServer shenyuMcpServer = GsonUtils.getInstance().fromJson(Objects.isNull(selectorData.getHandle()) ? DEFAULT_MESSAGE_ENDPOINT : selectorData.getHandle(), ShenyuMcpServer.class);
        shenyuMcpServer.setPath(path);
        // 缓存shenyuMcpServer
        CACHED_SERVER.get().cachedHandle(
                selectorData.getId(),
                shenyuMcpServer);
        String messageEndpoint = shenyuMcpServer.getMessageEndpoint();
        // 尝试获取或者注册transportProvider
        shenyuMcpServerManager.getOrCreateMcpServerTransport(uri, messageEndpoint);
    }
    
}
```
> `ShenyuMcpServerManager` 该类是 ShenYu 中 McpServer 的管理中心，不仅储存了 `McpAsyncServer` `CompositeTransportProvider` 等内容，注册 Transport 和 McpServer
的方法也在其中
* `getOrCreateMcpServerTransport()` 方法工作内容具体如下

1. 处理传递来的 url 去除/streamablehttp 以及 /message后缀 使其恢复为原始的 url
2. 尝试获取 `CompositeTransportProvider` 对象，该对象是 Transport 的复合对象，包含了多种协议对应的 Transport
3. 如果没有获取到，则调用 `createSseTransport()` 方法创建 `CompositeTransportProvider` 对象
4. 创建 `McpAsyncServer` 对象，保存 Transport 对象到 Map 中，将 Transport 注册到 `McpAsyncServer` 中
```java
@Component
public class ShenyuMcpServerManager {
    public ShenyuSseServerTransportProvider getOrCreateMcpServerTransport(final String uri, final String messageEndPoint) {
        // 去除/streamablehttp 以及 /message后缀
        String normalizedPath = processPath(uri);
        return getOrCreateTransport(normalizedPath, SSE_PROTOCOL,
                () -> createSseTransport(normalizedPath, messageEndPoint));
    }
    
    private <T> T getOrCreateTransport(final String normalizedPath, final String protocol,
                                       final java.util.function.Supplier<T> transportFactory) {
        // 获取复合Transport实例
        CompositeTransportProvider compositeTransport = getOrCreateCompositeTransport(normalizedPath);

        T transport = switch (protocol) {
            case SSE_PROTOCOL -> (T) compositeTransport.getSseTransport();
            case STREAMABLE_HTTP_PROTOCOL -> (T) compositeTransport.getStreamableHttpTransport();
            default -> null;
        };
        // 如果缓存中没有该实例，则需要重新创建
        if (Objects.isNull(transport)) {
            // 调用createSseTransport()方法，创建一个新的transport并存储
            transport = transportFactory.get();
            // 创建McpAsyncServer，并注册transport
            addTransportToSharedServer(normalizedPath, protocol, transport);
        }

        return transport;
    }
}
```
##### 1.1.1 Transport注册
* `createSseTransport()` 方法
> 该方法在 `getOrCreateMcpServerTransport()` 方法被调用，用于创建 Transport

```java
@Component
public class ShenyuMcpServerManager {
    private ShenyuSseServerTransportProvider createSseTransport(final String normalizedPath, final String messageEndPoint) {
        String messageEndpoint = normalizedPath + messageEndPoint;
        ShenyuSseServerTransportProvider transportProvider = ShenyuSseServerTransportProvider.builder()
                .objectMapper(objectMapper)
                .sseEndpoint(normalizedPath)
                .messageEndpoint(messageEndpoint)
                .build();
        // 向Manager的routeMap中注册transportProvider的两个函数
        registerRoutes(normalizedPath, messageEndpoint, transportProvider::handleSseConnection, transportProvider::handleMessage);
        return transportProvider;
    }
}
```
##### 1.1.2 mcpServer注册
* `addTransportToSharedServer()` 方法
> 该方法在 `getOrCreateMcpServerTransport()` 方法被调用，用于创建 McpServer 并保存

该方法创建了一个新的 McpServer并存储到 `sharedServerMap` 中，并将上一步得到的 TransportProvider 存入 `compositeTransportMap` 中
```java
@Component
public class ShenyuMcpServerManager {
    private void addTransportToSharedServer(final String normalizedPath, final String protocol, final Object transportProvider) {
        // 获取或者创建并注册 McpServer
        getOrCreateSharedServer(normalizedPath);

        // 将新增的传输协议存进compositeTransportMap中
        compositeTransport.addTransport(protocol, transportProvider);
        
    }

    private McpAsyncServer getOrCreateSharedServer(final String normalizedPath) {
        return sharedServerMap.computeIfAbsent(normalizedPath, path -> {
            // 获取传输协议
            CompositeTransportProvider compositeTransport = getOrCreateCompositeTransport(path);

            // 选择Server拥有的能力
            var capabilities = McpSchema.ServerCapabilities.builder()
                    .tools(true)
                    .logging()
                    .build();

            // 创建McpServer并存储
            McpAsyncServer server = McpServer
                    .async(compositeTransport)
                    .serverInfo("MCP Shenyu Server (Multi-Protocol)", "1.0.0")
                    .capabilities(capabilities)
                    .tools(Lists.newArrayList())
                    .build();
            
            return server;
        });
    }
}
```

#### 1.2 Tools注册

* `handlerRule()` 方法 工作内容如下

1. 捕捉用户在 Tool 上的填写的 tool 配置信息，这些信息将全部用于 tool 的构建
2. 序列化创建 `ShenyuMcpServerTool` 获取 tool 信息

> 注意 `ShenyuMcpServerTool` 也是 Shenyu 存储 tool 信息的工具，和 `McpServerTool` 没有继承关系

3. 调用 `addTool()` 方法， 利用该 tool 信息创建 tool，并根据 SelectorId 将 tool 注册到与之匹配的 McpServer 中

```java
public class McpServerPluginDataHandler implements PluginDataHandler {
    @Override
    public void handlerRule(final RuleData ruleData) {
        Optional.ofNullable(ruleData.getHandle()).ifPresent(s -> {
            // 序列化一个新的 ShenyuMcpServerTool
            ShenyuMcpServerTool mcpServerTool = GsonUtils.getInstance().fromJson(s, ShenyuMcpServerTool.class);
            // 缓存mcpServerTool
            CACHED_TOOL.get().cachedHandle(CacheKeyUtils.INST.getKey(ruleData), mcpServerTool);
            // 获取并构建 mcp schema
            List<McpServerToolParameter> parameters = mcpServerTool.getParameters();
            String inputSchema = JsonSchemaUtil.createParameterSchema(parameters);
            ShenyuMcpServer server = CACHED_SERVER.get().obtainHandle(ruleData.getSelectorId());
            if (Objects.nonNull(server)) {
                // 向Manager的sharedServerMap中存储Tool信息
                shenyuMcpServerManager.addTool(server.getPath(),
                        StringUtils.isBlank(mcpServerTool.getName()) ? ruleData.getName()
                                : mcpServerTool.getName(),
                        mcpServerTool.getDescription(),
                        mcpServerTool.getRequestConfig(),
                        inputSchema);
            }
        });
    }
}
```
* `addTool()`方法
> 该方法被 `handlerRule()` 方法调用，用于新增工具

该方法做了下述工作
1. 将上一步传来的 tool 信息转换为 `shenyuToolDefinition` 对象
2. 利用转换来的 `shenyuToolDefinition` 对象创建 `ShenyuToolCallback` 对象
> `ShenyuToolCallback` 重写了 `ToolCallBack` 的 `call()` 方法，并将该 `call()` 方法注册到了 `AsyncToolSpecification` 中，
> 此后调用 tool 的 `call()` 方法，则实际会调用这个重写的 `call()` 方法

3. 将 `ShenyuToolCallback` 转换为 `AsyncToolSpecification` 并注册到相关的 mcpServer 中
```java
public class McpServerPluginDataHandler implements PluginDataHandler {
    public void addTool(final String serverPath, final String name, final String description,
                        final String requestTemplate, final String inputSchema) {
        String normalizedPath = normalizeServerPath(serverPath);
        // 构建Definition对象
        ToolDefinition shenyuToolDefinition = ShenyuToolDefinition.builder()
                .name(name)
                .description(description)
                .requestConfig(requestTemplate)
                .inputSchema(inputSchema)
                .build();
        
        ShenyuToolCallback shenyuToolCallback = new ShenyuToolCallback(shenyuToolDefinition);

        // 获取到先前注册的 McpServer， 并向其中注册Tool
        McpAsyncServer sharedServer = sharedServerMap.get(normalizedPath);
        for (AsyncToolSpecification asyncToolSpecification : McpToolUtils.toAsyncToolSpecifications(shenyuToolCallback)) {
            sharedServer.addTool(asyncToolSpecification).block();
        }        
    }
}
```
到此为止，服务注册分析完毕

服务注册一图览
![](/img/activities/code-analysis-mcp-server-plugin/Mcp-server-register-zh.png)

### 2. 插件调用

客户端先后会发送后缀为 `/sse` 和 `/message` 的两种消息，这两种消息都会被 `Shenyu McpServer plugin` 捕捉，`Shenyu McpServer plugin`
会对 `/sse` 消息和 `/message` 消息做不同处理。收到 `/sse` 消息时 plugin 会创建 session 对象并保存，最后返回 session id
供 message 消息使用。收到 `/message` 消息时，会根据 `/message` 消息携带的 method 信息，选择执行的方法
如：获取工作列表，工具调用，获取资源列表等等

* `doExecute()` 方法 工作内容如下

1. 路径匹配，判断 mcp plugin 是否注册该路径
2. 调用 `routeByProtocol()` 方法，根据请求协议选择合适的处理方案

> 本篇是对 sse 请求方式的解析，因此接着进入 `handleSseRequest()` 方法
```java
public class McpServerPlugin extends AbstractShenyuPlugin {
    @Override
    protected Mono<Void> doExecute(final ServerWebExchange exchange,
                                   final ShenyuPluginChain chain,
                                   final SelectorData selector,
                                   final RuleData rule) {
        final String uri = exchange.getRequest().getURI().getRawPath();
        // 判断 Mcp 插件是否注册了该路由规则，没有则不执行
        if (!shenyuMcpServerManager.canRoute(uri)) {
            return chain.execute(exchange);
        }
        final ServerRequest request = ServerRequest.create(exchange, messageReaders);
        // 根据 uri 判断路由协议，选择对应的处理方案
        return routeByProtocol(exchange, chain, request, selector, uri);
    }

    private Mono<Void> routeByProtocol(final ServerWebExchange exchange,
                                       final ShenyuPluginChain chain,
                                       final ServerRequest request,
                                       final SelectorData selector,
                                       final String uri) {

        if (isStreamableHttpProtocol(uri)) {
            return handleStreamableHttpRequest(exchange, chain, request, uri);
        } else if (isSseProtocol(uri)) {
            // 处理sse请求
            return handleSseRequest(exchange, chain, request, selector, uri);
        } 
    }
}
```
`handlerSseRequest()` 方法
> 该方法由 `routeByProtocol()` 方法调用，根据请求后缀判断客户端是要创建 session 还是调用工具

```java
public class McpServerPlugin extends AbstractShenyuPlugin {
    private Mono<Void> handleSseRequest(final ServerWebExchange exchange,
                                        final ShenyuPluginChain chain,
                                        final ServerRequest request,
                                        final SelectorData selector,
                                        final String uri) {
        ShenyuMcpServer server = McpServerPluginDataHandler.CACHED_SERVER.get().obtainHandle(selector.getId());
        String messageEndpoint = server.getMessageEndpoint();
        // 获取传输者
        ShenyuSseServerTransportProvider transportProvider
                = shenyuMcpServerManager.getOrCreateMcpServerTransport(uri, messageEndpoint);
        // 根据请求的后缀判断是 sse 连接请求还是 message 调用请求
        if (uri.endsWith(messageEndpoint)) {
            setupSessionContext(exchange, chain);
            return handleMessageEndpoint(exchange, transportProvider, request);
        } else {
            return handleSseEndpoint(exchange, transportProvider, request);
        }
    }
}
```
#### 2.1 客户端发送 sse 请求

> 如果我们客户端发送的是后缀为 `/sse` 的请求，那么将会执行 `handleSseEndpoint()` 方法

* `handleSseEndpoint()` 方法主要做了如下工作

1. 配置 sse 请求头
2. 调用 `ShenyuSseServerTransportProvider` 的 `createSseFlux()` 创建 sse 流
```java
public class McpServerPlugin extends AbstractShenyuPlugin {
    private Mono<Void> handleSseEndpoint(final ServerWebExchange exchange,
                                         final ShenyuSseServerTransportProvider transportProvider,
                                         final ServerRequest request) {
        // 配置 sse 请求头
        configureSseHeaders(exchange);

        // 创建 sse 流
        return exchange.getResponse()
                .writeWith(transportProvider
                        .createSseFlux(request));
    }
}
```
* `createSseFlux()` 方法
> 该方法被 `handleSseEndpoint()`调用 主要用于创建并保存 session
1. 创建 session ，创建 session 的工厂在创建 session 时会将一系列 handler 注册到 session 中，这些 handler 是真正执行
   callTool 的对象
2. 将 session 保存，session复用
3. 将 session id 作为 endpoint 的请求参数返回给客户端，在调用 message 方法时会使用该 endpoint

```java
public class ShenyuSseServerTransportProvider implements McpServerTransportProvider {
    public Flux<ServerSentEvent<?>> createSseFlux(final ServerRequest request) {
        return Flux.<ServerSentEvent<?>>create(sink -> {
                    WebFluxMcpSessionTransport sessionTransport = new WebFluxMcpSessionTransport(sink);
                    // 创建 McpServerSession 并暂存插件链信息
                    McpServerSession session = sessionFactory.create(sessionTransport);
                    String sessionId = session.getId();
                    sessions.put(sessionId, session);

                    // 将 session id等信息传递回客户端
                    String endpointUrl = this.baseUrl + this.messageEndpoint + "?sessionId=" + sessionId;
                    ServerSentEvent<String> endpointEvent = ServerSentEvent.<String>builder()
                            .event(ENDPOINT_EVENT_TYPE)
                            .data(endpointUrl)
                            .build();
                }).doOnSubscribe(subscription -> LOGGER.info("SSE Flux subscribed"))
                .doOnRequest(n -> LOGGER.debug("SSE Flux requested {} items", n));
    }
}

```
#### 2.2 客户端发送 message 请求

> 如果我们客户端发送的是后缀为 `/message` 的请求，那么将会执行 把当前 `ShenyuPluginChain` 信息存入 session 中，并调用 `handleMessageEndpoint()` 方法，
> 后续工具调用时会继续执行该插件链，因此 mcp plugin 后的插件会对进入 tool 的请求造成影响

* `handleMessageEndpoint()` 方法，调用 `ShenyuSseServerTransportProvider` 的 `handleMessageEndpoint()` 方法
```
if (uri.endsWith(messageEndpoint)) {
       setupSessionContext(exchange, chain);
       return handleMessageEndpoint(exchange, transportProvider, request);
} 
```
```java
public class McpServerPlugin extends AbstractShenyuPlugin {
    private Mono<Void> handleMessageEndpoint(final ServerWebExchange exchange,
                                             final ShenyuSseServerTransportProvider transportProvider,
                                             final ServerRequest request) {
        // 处理message请求
        return transportProvider.handleMessageEndpoint(request)
                .flatMap(result -> {
                    return exchange.getResponse()
                            .writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(responseBody.getBytes())));
                });
    }
}
```
* `handleMessageEndpoint()` 方法
> 该方法由 `McpServerPlugin.handleMessageEndpoint()` 调用，将请求交给 session 处理

session 的 `handler()` 方法会对 message 的不同，而进行对应的操作
例如 ： 当 message 中 method 是 "tools/call" 时，则会使用工具调用的 handler() 执行 `call()` 方法调用工具
相关源码在此不过多赘述

```java
public class ShenyuSseServerTransportProvider implements McpServerTransportProvider {
    public Mono<MessageHandlingResult> handleMessageEndpoint(final ServerRequest request) {
        // 获取到session
        String sessionId = request.queryParam("sessionId").get();
        McpServerSession session = sessions.get(sessionId);
        return request.bodyToMono(String.class)
                .flatMap(body -> {
                    McpSchema.JSONRPCMessage message = McpSchema.deserializeJsonRpcMessage(objectMapper, body);
                    return session.handle(message);
                });
    }
}

```
至此 `Shenyu Mcp Plugin` 服务调用源码分析完毕

流程图一览
![](/img/activities/code-analysis-mcp-server-plugin/Mcp-server-execute-zh.png)

### 3. 工具调用

> 如果客户端传递的消息是调用工具的消息，那么 session 将使用工具调用的 handler() 并执行 tool 的 `call()` 方法，
> 在服务注册中，我们说明了 tool 在被调用时，实际执行的是 `ShenyuToolCallback()` 的 `call()` 方法

因此执行工具调用时会执行以下方法
* `call()` 主要工作内容如下

1. 获取 session id
2. 获取 `requestTemplate` 即 shenyu 提供的额外功能的配置信息
3. 获取上一步暂存的 shenyu 插件链，并将工具调用的信息交给插件链继续执行
4. 异步等待工具响应

插件链执行完成后，会将调用 tool 请求真正的发送到 tool 所在的服务之中

```java
public class ShenyuToolCallback implements ToolCallback {
    @NonNull
    @Override
    public String call(@NonNull final String input, final ToolContext toolContext) {
        // 从 mcp 请求中提取 sessionId
        final McpSyncServerExchange mcpExchange = extractMcpExchange(toolContext);
        final String sessionId = extractSessionId(mcpExchange);
        // 提取requestTemplate信息
        final String configStr = extractRequestConfig(shenyuTool);

        // 利用sessionId 获取到先前暂存的插件执行链
        final ServerWebExchange originExchange = getOriginExchange(sessionId);
        final ShenyuPluginChain chain = getPluginChain(originExchange);

        // 执行工具调用
        return executeToolCall(originExchange, chain, sessionId, configStr, input);

    }

    private String executeToolCall(final ServerWebExchange originExchange,
                                   final ShenyuPluginChain chain,
                                   final String sessionId,
                                   final String configStr,
                                   final String input) {

        final CompletableFuture<String> responseFuture = new CompletableFuture<>();
        final ServerWebExchange decoratedExchange = buildDecoratedExchange(
                originExchange, responseFuture, sessionId, configStr, input);
        // 执行插件链，调用实际工具
        chain.execute(decoratedExchange)
                .subscribe();

        // 等待响应
        final String result = responseFuture.get(DEFAULT_TIMEOUT_SECONDS, TimeUnit.SECONDS);
        return result;

    }
}
```
至此Shenyu MCP Plugin 工具调用分析完毕

![](/img/activities/code-analysis-mcp-server-plugin/Mcp-server-tool-call-zh.png)

---

### 4. 小结
本文源码分析从 mcp 服务注册开始，到 mcp 插件的服务调用，再到 tool 的调用。
mcpServer 插件让 shenyu 成为一个功能强大，集中管理的 mcpServer。

---
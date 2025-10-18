---
title: McpServer Plugin Source Code Analysis  
author: yusiheng
author_title: Apache ShenYu Contributor
author_url: https://github.com/478320
tags: [plugin,mcp,Apache ShenYu]
---

In the Shenyu gateway, when you start this plugin, Shenyu becomes a fully-featured McpServer.  
You can easily register a service as a tool within the Shenyu gateway by simple configuration and use the extended functions the gateway offers.

> This article is based on version `shenyu-2.7.0.2`. Here, I will track the Shenyu Mcp plugin chain and analyze the source code of its SSE communication.

### Introduction

> The Shenyu gateway's Mcp plugin is built on top of the spring-ai-mcp extension. To better understand how the Mcp plugin works, I’ll briefly introduce how some official Mcp Java classes collaborate within its JDK.

I want to start by introducing three key official Mcp Java classes:

>1. **McpServer**  
    > This class manages resources like tools, Resource, promote, etc.
>2. **TransportProvider**  
    > Provides corresponding communication methods based on client-server communication protocols.
>3. **Session**  
    > Handles request data, response data, and notifications, offers some basic methods and corresponding handlers, and executes tool queries and calls here.

### 1. Service Registration

In Shenyu Admin, after filling in endpoint and tool information for the McpServer plugin, this info is automatically registered into Shenyu bootstrap.  
You can refer to the official [websocket data sync source code](https://shenyu.incubator.apache.org/blog/DataSync-SourceCode-Analysis-WebSocket-Data-Sync) for details.

Shenyu bootstrap receives the data synced from admin in the `handler()` method of `McpServerPluginDataHandler`.

- `handlerSelector()` receives URL data and creates McpServer.
- `handlerRule()` receives tool info and registers tools.

These two methods together form the service registration part of the Shenyu Mcp plugin. Below, I will analyze these two methods in detail.

#### 1.1 Transport and McpServer Registration

Let’s analyze the `handlerSelector()` method, which handles McpServer registration.

* What `handlerSelector()` does:

```java
public class McpServerPluginDataHandler implements PluginDataHandler {
    @Override
    public void handlerSelector(final SelectorData selectorData) {
        // Get URI
        String uri = selectorData.getConditionList().stream()
                .filter(condition -> Constants.URI.equals(condition.getParamType()))
                .map(ConditionData::getParamValue)
                .findFirst()
                .orElse(null);
        
        // Build McpServer
        ShenyuMcpServer shenyuMcpServer = GsonUtils.getInstance().fromJson(Objects.isNull(selectorData.getHandle()) ? DEFAULT_MESSAGE_ENDPOINT : selectorData.getHandle(), ShenyuMcpServer.class);
        shenyuMcpServer.setPath(path);
        // Cache shenyuMcpServer
        CACHED_SERVER.get().cachedHandle(
                selectorData.getId(),
                shenyuMcpServer);
        String messageEndpoint = shenyuMcpServer.getMessageEndpoint();
        // Try to get or register transportProvider
        shenyuMcpServerManager.getOrCreateMcpServerTransport(uri, messageEndpoint);
    }
    
}
```

> `ShenyuMcpServerManager` is the management center of McpServer in Shenyu. It not only stores `McpAsyncServer`, `CompositeTransportProvider`, etc., but also contains methods to register Transport and McpServer.

* The `getOrCreateMcpServerTransport()` method works as follows:

```java
@Component
public class ShenyuMcpServerManager {
    public ShenyuSseServerTransportProvider getOrCreateMcpServerTransport(final String uri, final String messageEndPoint) {
        // Remove /streamablehttp and /message suffixes
        String normalizedPath = processPath(uri);
        return getOrCreateTransport(normalizedPath, SSE_PROTOCOL,
                () -> createSseTransport(normalizedPath, messageEndPoint));
    }
    
    private <T> T getOrCreateTransport(final String normalizedPath, final String protocol,
                                       final java.util.function.Supplier<T> transportFactory) {
        // Get composite Transport instance
        CompositeTransportProvider compositeTransport = getOrCreateCompositeTransport(normalizedPath);

        T transport = switch (protocol) {
            case SSE_PROTOCOL -> (T) compositeTransport.getSseTransport();
            case STREAMABLE_HTTP_PROTOCOL -> (T) compositeTransport.getStreamableHttpTransport();
            default -> null;
        };
        // If instance is missing in cache, create a new one
        if (Objects.isNull(transport)) {
            // Call createSseTransport() to create and store a new transport
            transport = transportFactory.get();
            // Create McpAsyncServer and register the transport
            addTransportToSharedServer(normalizedPath, protocol, transport);
        }

        return transport;
    }
}
```

##### 1.1.1 Transport Registration

* `createSseTransport()` method
> This method is called within `getOrCreateMcpServerTransport()` and is used to create a Transport

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
        // Register the two functions of transportProvider to the Manager's routeMap
        registerRoutes(normalizedPath, messageEndpoint, transportProvider::handleSseConnection, transportProvider::handleMessage);
        return transportProvider;
    }
}
```

##### 1.1.2 McpServer Registration

* `addTransportToSharedServer()` method
> This method is called within `getOrCreateMcpServerTransport()` and is used to create and save McpServer

This method creates a new McpServer, stores it in `sharedServerMap`, and saves the TransportProvider obtained above into `compositeTransportMap`.

```java
@Component
public class ShenyuMcpServerManager {
    private void addTransportToSharedServer(final String normalizedPath, final String protocol, final Object transportProvider) {
        // Get or create and register McpServer
        getOrCreateSharedServer(normalizedPath);

        // Save the new transport protocol into compositeTransportMap
        compositeTransport.addTransport(protocol, transportProvider);
        
    }

    private McpAsyncServer getOrCreateSharedServer(final String normalizedPath) {
        return sharedServerMap.computeIfAbsent(normalizedPath, path -> {
            // Get transport protocols
            CompositeTransportProvider compositeTransport = getOrCreateCompositeTransport(path);

            // Select server capabilities
            var capabilities = McpSchema.ServerCapabilities.builder()
                    .tools(true)
                    .logging()
                    .build();

            // Create and store McpServer
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

#### 1.2 Tools Registration

* `handlerRule()` method works as follows:

1. Captures the tool configuration info users fill in for the Tool, all used to build the tool
2. Deserializes to create `ShenyuMcpServerTool` and obtains tool info

> Note: `ShenyuMcpServerTool` is also a Shenyu-side object for storing tool info, unrelated by inheritance to `McpServerTool`

3. Calls `addTool()` method to create the tool using this info and registers the tool to the matching McpServer based on SelectorId

```java
public class McpServerPluginDataHandler implements PluginDataHandler {
    @Override
    public void handlerRule(final RuleData ruleData) {
        Optional.ofNullable(ruleData.getHandle()).ifPresent(s -> {
            // Deserialize a new ShenyuMcpServerTool
            ShenyuMcpServerTool mcpServerTool = GsonUtils.getInstance().fromJson(s, ShenyuMcpServerTool.class);
            // Cache mcpServerTool
            CACHED_TOOL.get().cachedHandle(CacheKeyUtils.INST.getKey(ruleData), mcpServerTool);
            // Build MCP schema
            List<McpServerToolParameter> parameters = mcpServerTool.getParameters();
            String inputSchema = JsonSchemaUtil.createParameterSchema(parameters);
            ShenyuMcpServer server = CACHED_SERVER.get().obtainHandle(ruleData.getSelectorId());
            if (Objects.nonNull(server)) {
                // Save tool info into Manager's sharedServerMap
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

* `addTool()` method
> This method is called by `handlerRule()` to add a new tool

This method performs:

1. Converts the previous tool info into a `shenyuToolDefinition` object
2. Creates a `ShenyuToolCallback` object using the converted `shenyuToolDefinition`
> `ShenyuToolCallback` overrides the `call()` method of `ToolCallBack` and registers this overridden method to `AsyncToolSpecification`, so calling the tool's `call()` will actually invoke this overridden method

3. Converts `ShenyuToolCallback` to `AsyncToolSpecification` and registers it to the corresponding McpServer

```java
public class McpServerPluginDataHandler implements PluginDataHandler {
    public void addTool(final String serverPath, final String name, final String description,
                        final String requestTemplate, final String inputSchema) {
        String normalizedPath = normalizeServerPath(serverPath);
        // Build Definition object
        ToolDefinition shenyuToolDefinition = ShenyuToolDefinition.builder()
                .name(name)
                .description(description)
                .requestConfig(requestTemplate)
                .inputSchema(inputSchema)
                .build();
        
        ShenyuToolCallback shenyuToolCallback = new ShenyuToolCallback(shenyuToolDefinition);

        // Get previously registered McpServer and register the Tool
        McpAsyncServer sharedServer = sharedServerMap.get(normalizedPath);
        for (AsyncToolSpecification asyncToolSpecification : McpToolUtils.toAsyncToolSpecifications(shenyuToolCallback)) {
            sharedServer.addTool(asyncToolSpecification).block();
        }        
    }
}
```

With this, service registration analysis is complete.

Service registration overview diagram  
![](/img/activities/code-analysis-mcp-server-plugin/Mcp-server-register-en.png)

### 2. Plugin Execution

Clients will send two types of messages with `/sse` and `/message` suffixes. These messages are captured by the Shenyu McpServer plugin, which handles them differently. When receiving `/sse` messages, the plugin creates and saves a session object, then returns a session id for `/message` usage. When receiving `/message` messages, the plugin executes methods based on the method info carried by the `/message` message, such as fetching work lists, tool invocation, and resource lists.

* `doExecute()` method works as follows:

1. Matches the path and checks if the Mcp plugin registered it
2. Calls `routeByProtocol()` to choose the appropriate handling plan based on the request protocol

> This article focuses on the SSE request mode, so we enter the `handleSseRequest()` method

```java
public class McpServerPlugin extends AbstractShenyuPlugin {
    @Override
    protected Mono<Void> doExecute(final ServerWebExchange exchange,
                                   final ShenyuPluginChain chain,
                                   final SelectorData selector,
                                   final RuleData rule) {
        final String uri = exchange.getRequest().getURI().getRawPath();
        // Check if Mcp plugin registered this route; if not, continue chain without handling
        if (!shenyuMcpServerManager.canRoute(uri)) {
            return chain.execute(exchange);
        }
        final ServerRequest request = ServerRequest.create(exchange, messageReaders);
        // Choose handling method based on URI protocol
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
            // Handle SSE requests
            return handleSseRequest(exchange, chain, request, selector, uri);
        } 
    }
}
```

* `handleSseRequest()` method
> Called by `routeByProtocol()` to determine if the client wants to create a session or call a tool based on URI suffix

```java
public class McpServerPlugin extends AbstractShenyuPlugin {
    private Mono<Void> handleSseRequest(final ServerWebExchange exchange,
                                        final ShenyuPluginChain chain,
                                        final ServerRequest request,
                                        final SelectorData selector,
                                        final String uri) {
        ShenyuMcpServer server = McpServerPluginDataHandler.CACHED_SERVER.get().obtainHandle(selector.getId());
        String messageEndpoint = server.getMessageEndpoint();
        // Get the transport provider
        ShenyuSseServerTransportProvider transportProvider
                = shenyuMcpServerManager.getOrCreateMcpServerTransport(uri, messageEndpoint);
        // Determine if the request is an SSE connection or a message call
        if (uri.endsWith(messageEndpoint)) {
            setupSessionContext(exchange, chain);
            return handleMessageEndpoint(exchange, transportProvider, request);
        } else {
            return handleSseEndpoint(exchange, transportProvider, request);
        }
    }
}
```

#### 2.1 Client Sends SSE Request

> If the client sends a request ending with `/sse`, the `handleSseEndpoint()` method is executed

* `handleSseEndpoint()` mainly does:

1. Sets SSE request headers
2. Calls `ShenyuSseServerTransportProvider.createSseFlux()` to create the SSE stream

```java
public class McpServerPlugin extends AbstractShenyuPlugin {
    private Mono<Void> handleSseEndpoint(final ServerWebExchange exchange,
                                         final ShenyuSseServerTransportProvider transportProvider,
                                         final ServerRequest request) {
        // Configure SSE request headers
        configureSseHeaders(exchange);

        // Create SSE stream
        return exchange.getResponse()
                .writeWith(transportProvider
                        .createSseFlux(request));
    }
}
```

* `createSseFlux()` method
> Called by `handleSseEndpoint()`; mainly used to create and save a session
> 1. Creates session; the session factory registers a series of handlers, which are the objects actually executing tool calls
> 2. Saves the session for reuse
> 3. Sends the session id as a parameter of the endpoint URL back to the client, to be used when calling the message endpoint

```java
public class ShenyuSseServerTransportProvider implements McpServerTransportProvider {
    public Flux<ServerSentEvent<?>> createSseFlux(final ServerRequest request) {
        return Flux.<ServerSentEvent<?>>create(sink -> {
                    WebFluxMcpSessionTransport sessionTransport = new WebFluxMcpSessionTransport(sink);
                    // Create McpServerSession and temporarily store plugin chain info
                    McpServerSession session = sessionFactory.create(sessionTransport);
                    String sessionId = session.getId();
                    sessions.put(sessionId, session);

                    // Send session id info back to client
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

#### 2.2 Client Sends Message Request

> If the client sends a request ending with `/message`, the current `ShenyuPluginChain` info is saved into the session, and `handleMessageEndpoint()` is called.  
> Subsequent tool calls continue executing this plugin chain, so plugins after the Mcp plugin will affect tool requests.

* `handleMessageEndpoint()` method, calls `ShenyuSseServerTransportProvider.handleMessageEndpoint()` to process

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
        // Handle message requests
        return transportProvider.handleMessageEndpoint(request)
                .flatMap(result -> {
                    return exchange.getResponse()
                            .writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(responseBody.getBytes())));
                });
    }
}
```

* `handleMessageEndpoint()` method
> Called by `McpServerPlugin.handleMessageEndpoint()`, hands over the request to the session for processing

The session's `handler()` method performs different actions depending on the message.  
For example, when the method in the message is `"tools/call"`, the tool invocation handler executes the `call()` method to call the tool.  
The related source is omitted here.

```java
public class ShenyuSseServerTransportProvider implements McpServerTransportProvider {
    public Mono<MessageHandlingResult> handleMessageEndpoint(final ServerRequest request) {
        // Get session
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

At this point, the Shenyu Mcp Plugin service invocation source code analysis is complete.

Process flow overview  
![](/img/activities/code-analysis-mcp-server-plugin/Mcp-server-execute-en.png)

### 3. Tool Invocation

> If the client sends a message to invoke a tool, the session will use the tool invocation handler to execute the tool’s `call()` method.  
> From service registration, we know the tool call actually runs the `call()` method of `ShenyuToolCallback`.

Therefore, the tool invocation executes the following:

* `call()` method mainly does:

1. Gets session id
2. Gets `requestTemplate`, the extra configuration provided by Shenyu
3. Gets the previously stored Shenyu plugin chain and passes the tool call info to the chain for continued execution
4. Asynchronously waits for the tool response

After the plugin chain completes, the tool call request is actually sent to the service hosting the tool.

```java
public class ShenyuToolCallback implements ToolCallback {
    @NonNull
    @Override
    public String call(@NonNull final String input, final ToolContext toolContext) {
        // Extract sessionId from MCP request
        final McpSyncServerExchange mcpExchange = extractMcpExchange(toolContext);
        final String sessionId = extractSessionId(mcpExchange);
        // Extract requestTemplate info
        final String configStr = extractRequestConfig(shenyuTool);

        // Get the previously stored plugin chain by sessionId
        final ServerWebExchange originExchange = getOriginExchange(sessionId);
        final ShenyuPluginChain chain = getPluginChain(originExchange);
        
        // Execute the tool call
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
        // Execute plugin chain, call the actual tool
        chain.execute(decoratedExchange)
                .subscribe();

        // Wait for response
        final String result = responseFuture.get(DEFAULT_TIMEOUT_SECONDS, TimeUnit.SECONDS);
        return result;
    }
}
```

This concludes the Shenyu MCP Plugin tool invocation analysis.

![](/img/activities/code-analysis-mcp-server-plugin/Mcp-server-tool-call-en.png)

---

### 4. Summary

This article analyzed the source code from Mcp service registration, through Mcp plugin service invocation, to tool invocation.  
The McpServer plugin makes Shenyu a powerful and centralized McpServer.

---

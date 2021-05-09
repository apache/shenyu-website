---
title: "ShenYu网关学习Redirect插件原理解析"
author: "阿行"
description: "ShenYu网关学习Redirect插件原理解析"
categories: "Soul"
tags: ["Soul"]
date: 2021-03-16
cover: "/img/soul/blog6/01.jpg"
---

# 介绍

`Soul` 网关在对目标服务进行代理调用的时候，可以使用 `redirect` 插件来重定向请求。其中包含两种场景：一种把 `redirectUrl` 配置为第三方URL 地址，直接使用 `308` 进行转发跳转，另一种是把 `redirectUrl` 配置以 `/` 开头的转发到网关自身。

## 插件配置

- 在 `soul-admin` –> 插件管理 –> `redirect`，设置为开启。
- 在 `soul-bootstrap` 项目的 `pom.xml` 文件中添加 `redirect` 的 `maven` 依赖。
- 在 `soul- admin` 后台设置选择器规则，只有匹配的请求，才会进行转发和重定向，请详细看：[选择器规则](https://dromara.org/zh/projects/soul/selector-and-rule)。

## Maven 依赖

在 `soul-bootstrap` 工程的 `pom.xml` 文件中添加插件依赖。

```xml
<dependency>
  <groupId>org.dromara</groupId>
  <artifactId>soul-spring-boot-starter-plugin-redirect</artifactId>
  <version>${last.version}</version>
</dependency>
```

## 场景

> 顾名思义，`redirect` 插件就是对 `uri` 的重新转发和重定向。

### 重定向

- 我们在 `Rule` 配置自定义路径时，应该为一个可达的服务路径。
- 当匹配到请求后，根据自定义的路径，`ShenYu 网关`会进行 `308` 服务跳转。

![重定向配置](https://dromara.org/img/soul/plugin/redirect/redirect-01.png)

### 网关自身接口转发

- 当满足匹配规则时，服务内部会使用 `DispatcherHandler` 内部接口转发。
- 要实现网关自身接口转发，我们需要在配置路径使用 `/` 作为前缀开始，具体配置如下图。

![自身接口转发](https://dromara.org/img/soul/plugin/redirect/redirect-02.png)

## 源码解析

在解析 `redirect` 重定向源码之前，有必要说一些大前提，我们明白 ShenYu 网关基于 SpringBoot WebFlux 实现，其中对于 `WebFlux` 如果默认什么都不配置，请求会默认执行 `DispatcherHandler` 处理，这个是响应式 `MVC` 的处理核心，可以看一下初始化：

```java
protected void initStrategies(ApplicationContext context) {
  Map<String, HandlerMapping> mappingBeans = BeanFactoryUtils.beansOfTypeIncludingAncestors(context, HandlerMapping.class, true, false);
  ArrayList<HandlerMapping> mappings = new ArrayList(mappingBeans.values());
  AnnotationAwareOrderComparator.sort(mappings);
  // handlerMapping 相关
  this.handlerMappings = Collections.unmodifiableList(mappings);
  Map<String, HandlerAdapter> adapterBeans = BeanFactoryUtils.beansOfTypeIncludingAncestors(context, HandlerAdapter.class, true, false);
  // handlerAdapter 相关
  this.handlerAdapters = new ArrayList(adapterBeans.values());
  AnnotationAwareOrderComparator.sort(this.handlerAdapters);
  Map<String, HandlerResultHandler> beans = BeanFactoryUtils.beansOfTypeIncludingAncestors(context, HandlerResultHandler.class, true, false);
  // resultHandler 相关
  this.resultHandlers = new ArrayList(beans.values());
  AnnotationAwareOrderComparator.sort(this.resultHandlers);
}
```

再之后就是我们熟悉的 `MVC` 核心处理 `DispatcherHandler#handle` 方法

```java
public Mono<Void> handle(ServerWebExchange exchange) {
    return this.handlerMappings == null ? this.createNotFoundError() : Flux.fromIterable(this.handlerMappings).concatMap((mapping) -> {
        return mapping.getHandler(exchange);
    }).next().switchIfEmpty(this.createNotFoundError()).flatMap((handler) -> {
        return this.invokeHandler(exchange, handler);
    }).flatMap((result) -> {
        return this.handleResult(exchange, result);
    });
}
```

搞清楚默认 `DispatcherHandler` 如何处理，我们再来说一下 ShenYu 网关，`SoulWebHandler` 实现了 `WebHandler` 接口，再把 `BeanName` 声明为 `webHandler` 替代了之前 `DispatcherHandler` 注册成默认处理 `handler`。

```java
@Bean("webHandler")
public SoulWebHandler soulWebHandler(final ObjectProvider<List<SoulPlugin>> plugins) {
  List<SoulPlugin> pluginList = plugins.getIfAvailable(Collections::emptyList);
  List<SoulPlugin> soulPlugins = pluginList.stream()
    .sorted(Comparator.comparingInt(SoulPlugin::getOrder)).collect(Collectors.toList());
  soulPlugins.forEach(soulPlugin -> log.info("load plugin:[{}] [{}]", soulPlugin.named(), soulPlugin.getClass().getName()));
  return new SoulWebHandler(soulPlugins);
}
```

到此为止我们明白了，默认请求都通过了 `SoulWebHandler#handle` 处理，如果我们需要转发到网关自身的 `MVC` 如何做呢？下面通过初始化`RedirectPlugin` 的时候把 `DispatcherHandler` 注入，根据具体请求再由 `DispatcherHandler` 分发，具体核心代码如下：

```java
@Override
protected Mono<Void> doExecute(final ServerWebExchange exchange, final SoulPluginChain chain,
                               final SelectorData selector, final RuleData rule) {
  final String handle = rule.getHandle();
  final RedirectHandle redirectHandle = GsonUtils.getInstance().fromJson(handle, RedirectHandle.class);
  if (Objects.isNull(redirectHandle) || StringUtils.isBlank(redirectHandle.getRedirectURI())) {
    log.error("uri redirect rule can not configuration: {}", handle);
    return chain.execute(exchange);
  }
  // 处理以 / 开头自身转发
  if (redirectHandle.getRedirectURI().startsWith(ROOT_PATH_PREFIX)) {
    ServerHttpRequest request = exchange.getRequest().mutate()
      .uri(Objects.requireNonNull(UriUtils.createUri(redirectHandle.getRedirectURI()))).build();
    ServerWebExchange mutated = exchange.mutate().request(request).build();
    return dispatcherHandler.handle(mutated);
  } else {
    // 否则就 308 跳转
    ServerHttpResponse response = exchange.getResponse();
    response.setStatusCode(HttpStatus.PERMANENT_REDIRECT);
    response.getHeaders().add(HttpHeaders.LOCATION, redirectHandle.getRedirectURI());
    return response.setComplete();
  }
}
```

### 参考链接：

- [Spring WebFlux 的设计及工作原理剖析](https://learnku.com/articles/30263#replies)
- [Spring WebFlux 工作原理](https://www.processon.com/view/link/5d0763ede4b039f39f3b5a8a)


---
title: Param-Mapping插件源码分析
author: Kunshuai Zhu
author_title: Apache ShenYu Contributor
author_url: https://github.com/JooKS-me
author_image_url: https://avatars1.githubusercontent.com/u/62384022?v=4
tags: [Param-Mapping, Apache ShenYu]
---

> 开始前，可以参考 [这篇文章](./start-demo) 运行shenyu网关

### 正文

先看一下这个插件的结构，如下图。

![param-mapping-structure](/img/activities/code-analysis-param-mapping-plugin/param-mapping-structure.png)

猜测：handler是用来做数据同步的；strategy中文意思是策略，可能是对各种请求体做了适配，应该是这个插件的重点；`ParamMappingPlugin` 应该是 `ShenyuPlugin` 的实现。

首先，看一下 `ParamMappingPlugin` ，里面主要是对 `doExecute` 方法的重写。

```java
public Mono<Void> doExecute(final ServerWebExchange exchange, final ShenyuPluginChain chain, final SelectorData selector, final RuleData rule) {
    ... // paramMappingHandle判断是否为空
    // 根据首部行中的contentType确定请求体类型
    HttpHeaders headers = exchange.getRequest().getHeaders();
    MediaType contentType = headers.getContentType();
  	// *
    return match(contentType).apply(exchange, chain, paramMappingHandle);
}
```

- match方法是根据contentType返回对应的 `Operator`

  ```java
  private Operator match(final MediaType mediaType) {
      if (MediaType.APPLICATION_JSON.isCompatibleWith(mediaType)) {
          return operatorMap.get(MediaType.APPLICATION_JSON.toString());
      } else if (MediaType.APPLICATION_FORM_URLENCODED.isCompatibleWith(mediaType)) {
          return operatorMap.get(MediaType.APPLICATION_FORM_URLENCODED.toString());
      } else {
          return operatorMap.get(Constants.DEFAULT);
      }
  }
  ```

  从match方法的代码可以看出，目前有 `DefaultOperator`、`FormDataOperator`、`JsonOperator`三种，支持 `x-www-form-urlencoded` 和 `json` 两种格式的请求体。

那么我们就来看一下上面三种Operator究竟是怎么样的吧。

#### 一、DefaultOperator

虚晃一枪，它的apply方法只是继续执行插件链，并没有实质功能。当请求体没有匹配到Operator时，就会通过 `DefaultOperator` 跳过。

#### 二、FormDataOperator

这个类是用来处理 `x-www-form-urlencoded` 格式的请求体的。

主要是看apply方法，但是这个apply方法长得有点奇怪。

```java
public Mono<Void> apply(final ServerWebExchange exchange, final ShenyuPluginChain shenyuPluginChain, final ParamMappingHandle paramMappingHandle) {
    return exchange.getFormData()
            .switchIfEmpty(Mono.defer(() -> Mono.just(new LinkedMultiValueMap<>())))
            .flatMap(multiValueMap -> {
                ...
            });
}
```

省略号中的代码是对请求体的处理，如下。

```java
// 判空
if (Objects.isNull(multiValueMap) || multiValueMap.isEmpty()) {
    return shenyuPluginChain.execute(exchange);
}
// 将form-data转化成json
String original = GsonUtils.getInstance().toJson(multiValueMap);
LOG.info("get from data success data:{}", original);
// *修改请求体*
String modify = operation(original, paramMappingHandle);
if (StringUtils.isEmpty(modify)) {
    return shenyuPluginChain.execute(exchange);
}
...
// 将修改后的json，转换成LinkedMultiValueMap。注意一下这一行，后面会提到！
LinkedMultiValueMap<String, String> modifyMap = GsonUtils.getInstance().toLinkedMultiValueMap(modify);
...
final BodyInserter bodyInserter = BodyInserters.fromValue(modifyMap);
...
// 修改exchange中的请求体，然后继续执行插件链
return bodyInserter.insert(cachedBodyOutputMessage, new BodyInserterContext())
        .then(Mono.defer(() -> shenyuPluginChain.execute(exchange.mutate()
                .request(new ModifyServerHttpRequestDecorator(httpHeaders, exchange.getRequest(), cachedBodyOutputMessage))
                .build())
        )).onErrorResume((Function<Throwable, Mono<Void>>) throwable -> release(cachedBodyOutputMessage, throwable));
```

> PS: 省略的部分是设置请求头等操作。

上面比较重要的应该是打星的修改请求体，也就是 `operation` 方法的调用。这里因为参数类型的原因，会先调用 `Operator` 接口的默认方法（而不是 `FormDataOperator` 重写的）。

```java
default String operation(final String jsonValue, final ParamMappingHandle paramMappingHandle) {
    DocumentContext context = JsonPath.parse(jsonValue);
    // 调用重写的operation方法，添加addParameterKey
    operation(context, paramMappingHandle);
    // 对设置的replacedParameterKey进行替换
    if (!CollectionUtils.isEmpty(paramMappingHandle.getReplaceParameterKeys())) {
        paramMappingHandle.getReplaceParameterKeys().forEach(info -> {
            context.renameKey(info.getPath(), info.getKey(), info.getValue());
        });
    }
    // 对设置的removeParameterKey进行删除
    if (!CollectionUtils.isEmpty(paramMappingHandle.getRemoveParameterKeys())) {
        paramMappingHandle.getRemoveParameterKeys().forEach(info -> {
            context.delete(info);
        });
    }
    return context.jsonString();
}
```

梳理下来可以发现，这里引入的json工具[JsonPath](https://github.com/json-path/JsonPath)使得请求体的加工变得简单、清晰很多。

**另外，我们可以注意到 `FormDataOperator` 重写了 `operation(DocumentContext, ParamMappingHandle)` 方法。**

**为什么要重写呢？** 接口中有对应处理addParameterKey的默认方法啊。

```java
// Operator接口中的默认方法
default void operation(final DocumentContext context, final ParamMappingHandle paramMappingHandle) {
    if (!CollectionUtils.isEmpty(paramMappingHandle.getAddParameterKeys())) {
        paramMappingHandle.getAddParameterKeys().forEach(info -> {
            context.put(info.getPath(), info.getKey(), info.getValue()); //不同之处
        });
    }
}

// FormDataOperator重写的方法
@Override
public void operation(final DocumentContext context, final ParamMappingHandle paramMappingHandle) {
    if (!CollectionUtils.isEmpty(paramMappingHandle.getAddParameterKeys())) {
        paramMappingHandle.getAddParameterKeys().forEach(info -> {
            context.put(info.getPath(), info.getKey(), Arrays.asList(info.getValue()));
        });
    }
}
```

实际上，在 `FormDataOperator#apply` 中有这么一行（前面有提到）：`LinkedMultiValueMap<String, String> modifyMap = GsonUtils.getInstance().toLinkedMultiValueMap(modify);`

这一行是将修改后的json转换成 `LinkedMultiValueMap`，`GsonUtils#toLinkedMultiValueMap` 如下。

```java
public LinkedMultiValueMap<String, String> toLinkedMultiValueMap(final String json) {
    return GSON.fromJson(json, new TypeToken<LinkedMultiValueMap<String, String>>() {
    }.getType());
}
```

而 `LinkedMultiValueMap` 类中的属性 `targetMap` 定义为：`private final Map<K, List<V>> targetMap`

因此，json字符串中的value必须是列表形式的，不然Gson就会抛出转换错误的异常，这也就是为什么 `FormDataOperator` 要重写operator方法。

**那么为什么要用 `LinkedMultiValueMap` 呢？**

回到 `FormDataOperator#apply` 方法的第一行 `exchange.getFormData` 。而SpringMVC中，`DefaultServerWebExchange#getFormData` 的返回值类型就是 `Mono<MultiValueMap<String, String>>` ，而 `LinkedMultiValueMap` 是 `MultiValueMap` 的子类。并且，`getFormData` 方法就是针对 `x-www-form-urlencoded` 格式的请求体的。

![param-mapping-getFormData](/img/activities/code-analysis-param-mapping-plugin/param-mapping-getFormData.png)

#### 三、JsonOperator

显然，这个类是用来处理Json格式的请求体的。

```java
public Mono<Void> apply(final ServerWebExchange exchange, final ShenyuPluginChain shenyuPluginChain, final ParamMappingHandle paramMappingHandle) {
    ServerRequest serverRequest = ServerRequest.create(exchange, MESSAGE_READERS);
    Mono<String> mono = serverRequest.bodyToMono(String.class).switchIfEmpty(Mono.defer(() -> Mono.just(""))).flatMap(originalBody -> {
        LOG.info("get body data success data:{}", originalBody);
        // 调用默认的operation方法修改请求体
        String modify = operation(originalBody, paramMappingHandle);
        return Mono.just(modify);
    });
    BodyInserter bodyInserter = BodyInserters.fromPublisher(mono, String.class);
    ... //处理首部行
    CachedBodyOutputMessage outputMessage = new CachedBodyOutputMessage(exchange, headers);
    // 修改exchange中的请求体，然后继续执行插件链
    return bodyInserter.insert(outputMessage, new BodyInserterContext())
            .then(Mono.defer(() -> {
                ServerHttpRequestDecorator decorator = new ModifyServerHttpRequestDecorator(headers, exchange.getRequest(), outputMessage);
                return shenyuPluginChain.execute(exchange.mutate().request(decorator).build());
            })).onErrorResume((Function<Throwable, Mono<Void>>) throwable -> release(outputMessage, throwable));
}
```

`JsonOperator` 的处理流程与 `FormDataOperator` 大致类似。

### 总结

最后，用一张图来简单总结一下。

![param-mapping-summary](/img/activities/code-analysis-param-mapping-plugin/param-mapping-summary.jpg)

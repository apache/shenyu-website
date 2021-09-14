---
slug: code-analysis-param-mapping
title: Code Analysis For Param-Mapping Plugin
author: Kunshuai Zhu
author_title: Apache ShenYu Contributor
author_url: https://github.com/JooKS-me
author_image_url: https://avatars1.githubusercontent.com/u/62384022?v=4
tags: [Param-Mapping, Apache ShenYu]
---

> Before starting, you can refer to [this article](./start-demo) to start the gateway

### Body

Let's take a look at the structure of this plugin first, as shown in the figure below.

![param-mapping-structure](/img/activities/code-analysis-param-mapping-plugin/param-mapping-structure.png)

Guess: handler is used for data synchronization; strategy may be adapted to various request bodies, which should be the focus of this plugin; `ParamMappingPlugin` should be the implementation of `ShenyuPlugin`.

First, take a look at the `ParamMappingPlugin`, the focus is on the override of the `doExecute` method.

```java
public Mono<Void> doExecute(final ServerWebExchange exchange, final ShenyuPluginChain chain, final SelectorData selector, final RuleData rule) {
    ... // judge whether paramMappingHandle is null
    // Determine the request body type according to the contentType in the header line
    HttpHeaders headers = exchange.getRequest().getHeaders();
    MediaType contentType = headers.getContentType();
  	// *
    return match(contentType).apply(exchange, chain, paramMappingHandle);
}
```

- The match method returns the corresponding `Operator` according to contentType

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

  As can be seen from the code of the match method, there are currently three types of `DefaultOperator`, `FormDataOperator`, and `JsonOperator`, which support the request body in two formats: `x-www-form-urlencoded` and `json`.

So let's take a look at what the above three operators are like.

#### 1. DefaultOperator

Nothing happens, its apply method just continues to execute the plug-in chain, and has no real function. When the request body does not match the Operator, it will be skipped by `DefaultOperator`.

#### 2. FormDataOperator

This class is used to process the request body in the format of `x-www-form-urlencoded`.

Mainly depends on the `apply` method, but it looks a bit strange.

```java
public Mono<Void> apply(final ServerWebExchange exchange, final ShenyuPluginChain shenyuPluginChain, final ParamMappingHandle paramMappingHandle) {
    return exchange.getFormData()
            .switchIfEmpty(Mono.defer(() -> Mono.just(new LinkedMultiValueMap<>())))
            .flatMap(multiValueMap -> {
                ...
            });
}
```

The code in the ellipsis is the processing of the request body, as follows.

```java
// judge whether it is empty
if (Objects.isNull(multiValueMap) || multiValueMap.isEmpty()) {
    return shenyuPluginChain.execute(exchange);
}
// convert form-data to json
String original = GsonUtils.getInstance().toJson(multiValueMap);
LOG.info("get from data success data:{}", original);
// *modify request body*
String modify = operation(original, paramMappingHandle);
if (StringUtils.isEmpty(modify)) {
    return shenyuPluginChain.execute(exchange);
}
...
// Convert the modified json into LinkedMultiValueMap. Pay attention to this line, it will be mentioned later!
LinkedMultiValueMap<String, String> modifyMap = GsonUtils.getInstance().toLinkedMultiValueMap(modify);
...
final BodyInserter bodyInserter = BodyInserters.fromValue(modifyMap);
...
// modify the request body in the exchange, and then continue to execute the plugin chain
return bodyInserter.insert(cachedBodyOutputMessage, new BodyInserterContext())
        .then(Mono.defer(() -> shenyuPluginChain.execute(exchange.mutate()
                .request(new ModifyServerHttpRequestDecorator(httpHeaders, exchange.getRequest(), cachedBodyOutputMessage))
                .build())
        )).onErrorResume((Function<Throwable, Mono<Void>>) throwable -> release(cachedBodyOutputMessage, throwable));
```

> PS: The omitted part is to set the request first and other operations.

The more important thing above should be the modification request body of the star, that is, the call of the `operation` method. Here, because of the parameter type, the default method of the `Operator` interface will be called first (instead of being overridden by the `FormDataOperator`).

```java
default String operation(final String jsonValue, final ParamMappingHandle paramMappingHandle) {
    DocumentContext context = JsonPath.parse(jsonValue);
    // call the override operation method and add addParameterKey
    operation(context, paramMappingHandle);
    // replace the related replacedParameterKey
    if (!CollectionUtils.isEmpty(paramMappingHandle.getReplaceParameterKeys())) {
        paramMappingHandle.getReplaceParameterKeys().forEach(info -> {
            context.renameKey(info.getPath(), info.getKey(), info.getValue());
        });
    }
    // Delete the related removeParameterKey
    if (!CollectionUtils.isEmpty(paramMappingHandle.getRemoveParameterKeys())) {
        paramMappingHandle.getRemoveParameterKeys().forEach(info -> {
            context.delete(info);
        });
    }
    return context.jsonString();
}
```

After sorting it out, we can find that the json tool [JsonPath](https://github.com/json-path/JsonPath) imported here makes the processing of the request body much simpler and clearer.

**In addition, we can notice that the `FormDataOperator` overrides the `operation(DocumentContext, ParamMappingHandle)` method.**

**Why override it?** There is a default method for handling addParameterKey in the interface.

```java
// Default method in Operator interface
default void operation(final DocumentContext context, final ParamMappingHandle paramMappingHandle) {
    if (!CollectionUtils.isEmpty(paramMappingHandle.getAddParameterKeys())) {
        paramMappingHandle.getAddParameterKeys().forEach(info -> {
            context.put(info.getPath(), info.getKey(), info.getValue()); //不同之处
        });
    }
}

// method overridden by FormDataOperator
@Override
public void operation(final DocumentContext context, final ParamMappingHandle paramMappingHandle) {
    if (!CollectionUtils.isEmpty(paramMappingHandle.getAddParameterKeys())) {
        paramMappingHandle.getAddParameterKeys().forEach(info -> {
            context.put(info.getPath(), info.getKey(), Arrays.asList(info.getValue()));
        });
    }
}
```

In fact, there is such a line in `FormDataOperator#apply` (mentioned earlier):
`LinkedMultiValueMap<String, String> modifyMap = GsonUtils.getInstance().toLinkedMultiValueMap(modify);`

This line converts the modified json into `LinkedMultiValueMap`, `GsonUtils#toLinkedMultiValueMap` is as follows.

```java
public LinkedMultiValueMap<String, String> toLinkedMultiValueMap(final String json) {
    return GSON.fromJson(json, new TypeToken<LinkedMultiValueMap<String, String>>() {
    }.getType());
}
```

The attribute `targetMap` in the `LinkedMultiValueMap` class is defined as: `private final Map<K, List<V>> targetMap`

Therefore, the value in the json string must be in the form of a list, otherwise Gson will throw a conversion error exception, which is why the `FormDataOperator` must override the operator method.

**But why use `LinkedMultiValueMap`?**

Go back to the first line `exchange.getFormData` of the `FormDataOperator#apply` method. In SpringMVC, the return value type of `DefaultServerWebExchange#getFormData` is `Mono<MultiValueMap<String, String>>`, and `LinkedMultiValueMap` is a subclass of `MultiValueMap`. And, the `getFormData` method is for the request body in the format of `x-www-form-urlencoded`.

![param-mapping-getFormData](/img/activities/code-analysis-param-mapping-plugin/param-mapping-getFormData.png)

#### 三、JsonOperator

Obviously, this class is used to process the request body in Json format.

```java
public Mono<Void> apply(final ServerWebExchange exchange, final ShenyuPluginChain shenyuPluginChain, final ParamMappingHandle paramMappingHandle) {
    ServerRequest serverRequest = ServerRequest.create(exchange, MESSAGE_READERS);
    Mono<String> mono = serverRequest.bodyToMono(String.class).switchIfEmpty(Mono.defer(() -> Mono.just(""))).flatMap(originalBody -> {
        LOG.info("get body data success data:{}", originalBody);
        // call the default operation method to modify the request body
        String modify = operation(originalBody, paramMappingHandle);
        return Mono.just(modify);
    });
    BodyInserter bodyInserter = BodyInserters.fromPublisher(mono, String.class);
    ... //process the header line
    CachedBodyOutputMessage outputMessage = new CachedBodyOutputMessage(exchange, headers);
    // modify the request body in the exchange, and then continue to execute the plugin chain
    return bodyInserter.insert(outputMessage, new BodyInserterContext())
            .then(Mono.defer(() -> {
                ServerHttpRequestDecorator decorator = new ModifyServerHttpRequestDecorator(headers, exchange.getRequest(), outputMessage);
                return shenyuPluginChain.execute(exchange.mutate().request(decorator).build());
            })).onErrorResume((Function<Throwable, Mono<Void>>) throwable -> release(outputMessage, throwable));
}
```

The processing flow of `JsonOperator` is roughly similar to that of `FormDataOperator`.

### Conclusion

Finally, use a picture to briefly summarize.

![param-mapping-summary](/img/activities/code-analysis-param-mapping-plugin/param-mapping-summary.jpg)

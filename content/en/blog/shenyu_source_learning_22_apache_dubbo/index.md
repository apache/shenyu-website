---
title: "ShenYu Gateway Learning Apache Dubbo Plugin"
author: "nuo-promise"
description: "ShenYu Gateway Learning Apache Dubbo Plugin"
categories: "ShenYu"
tags: ["ShenYu"]
date: 2021-03-23
cover: "/img/shenyu/blog8/08.jpg"
---

## 目标
- Apache Dubbo 插件介绍
   - 元数据介绍
- Apache Dubbo 插件配置
   - Bootstrap pom 配置
   - soul-admin 配置
   - dubbo服务pom配置
- Apache Dubbo 泛化调用介绍
   - 通过API方式使用泛化调用
   - 通过spring使用泛化调用
   - 泛化调用实现流程
- ShenYuDubbo 插件调用解析
   - ApachDubboPlugin泛化调用准备
   - ApacheDubboProxySerivce
   - DubboResponsePlugin
   - WebFluxResultUtils返回结果
- Dubbo泛化调用介绍
- 总结
- 参考
### Apache Dubbo 插件介绍
Apache Dubbo 是一款高性能、轻量级的开源Java服务框架,主要提供了六大核心能力,面向接口代理的高性能RPC调用,智能容错和负载均衡,服务自动注册与发现,高度可扩展能力,运行期流量调度,可视化的服务治理与运维。
网关中Dubbo插件主要是将  `Http协议` 转换成  `Dubbo协议`  ,也是网关实现Dubbo泛化调用的关键。而Dubbo插件需要配合 `元数据` 才能实现Dubbo调用。
#### 元数据介绍
元数据作用就是在进行协议转换时候要获取真实的请求 `path` 、`methodName` 、  `parameterTypes` 为泛化调用做好准备

![image.png](/img/shenyu/blog8/01.png)

- 在数据库中,我们有一张表单独存储Dubbo元信息，通过数据同步方案,会把这张表的数据同步到网关的JVM内存中
- 表结构如下
```sql
CREATE TABLE  IF NOT EXISTS `meta_data` (
`id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'id',
`app_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '应用名称',
`path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '路径,不能重复',
`path_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '路径描述',
`rpc_type` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'rpc类型',
`service_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '服务名称',
`method_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '方法名称',
`parameter_types` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '参数类型 多个参数类型 逗号隔开',
`rpc_ext` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'rpc的扩展信息，json格式',
`date_created` datetime(0) NOT NULL COMMENT '创建时间',
`date_updated` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
`enabled` tinyint(4) NOT NULL DEFAULT 0 COMMENT '启用状态',
PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;
```

- `path` 字段主要是在请求网关的时候,会根据你的 `path` 字段来匹配到一条数据,然后进行后续的处理流程
- `rpc_ext` 字段如果代理的接口是 `Dubbo` 类型的服务接口,同时设置了 `group` `version` 字段时候,那么信息就会存储到 `rpc_ext` 中 
- 每一个 `Dubbo` 接口方法会应对一条元数据,对比SpringCloud、http分别是只存储一条/contextPath/** 和不存储

### Apache Dubbo 插件配置

#### soul-bootstrap pom 配置

```java
<dependency>
 <groupId>org.apache.shenyu</groupId>
 <artifactId>soul-spring-boot-starter-plugin-apache-dubbo</artifactId>
 <version>${project.version}</version>
</dependency>
<dependency>
 <groupId>org.apache.dubbo</groupId>
 <artifactId>dubbo</artifactId>
 <version>2.7.5</version>
</dependency>
<dependency>
 <groupId>org.apache.curator</groupId>
 <artifactId>curator-client</artifactId>
 <version>${curator.version}</version>
</dependency>
<dependency>
 <groupId>org.apache.curator</groupId>
 <artifactId>curator-framework</artifactId>
 <version>${curator.version}</version>
</dependency>
<dependency>
 <groupId>org.apache.curator</groupId>
 <artifactId>curator-recipes</artifactId>
 <version>${curator.version}</version>
</dependency>
```

#### soul-admin 配置

![image.png](/img/shenyu/blog8/02.png)

> 登录soul-admin后台在插件管理页面打开Dubbo配置选项的开关,和填写注册中心的连接地址

#### dubbo服务pom配置
```java
<dependency>
 <groupId>org.apache.shenyu</groupId>
 <artifactId>soul-spring-boot-starter-client-apache-dubbo</artifactId>
 <version>${soul.version}</version>
</dependency>
```
```java
@SoulDubboClient(path = "/insert", desc = "Insert a row of data")
public DubboTest insert(final DubboTest dubboTest) {
    dubboTest.setName("hello world ShenYuApache Dubbo: " + dubboTest.getName());
    return dubboTest;
}
```
> 被代理的服务使用提供的 `soul-spring-boot-starter-client-apache-dubbo` 客户端依赖,同时使用`@SoulDubboClient` 注解,在启动时候将接口的名称,参数类型,参数内容注册到 `soul-admin` 端,然后 `admin` 端将数据同步到 `bootstrap` 端。

### Apache Dubbo 泛化调用介绍
泛化接口调用方式主要用于客户端没有API接口及模型类元的情况,参数及返回值中的所有POJO均用 `Map` 表示, 通常用于框架集成,可通过GenericSerivce调用所有服务实现。
#### 通过API方式使用泛化调用(网关目前使用方式)
```java
ReferenceConfig<GenericService> reference = new ReferenceConfig<>();
reference.setGeneric(true);
reference.setApplication(applicationConfig);
reference.setRegistry(registryConfig);
reference.setInterface(metaData.getServiceName());
reference.setProtocol("dubbo");
```
> 网关通过API方式声明注册使用泛化调用

#### 通过Spring使用泛化调用
```java
<dubbo:reference id="barService" interface="com.foo.BarService" generic="true" />
```
#### 泛化调用实现流程
```java
+-------------------------------------------+               +-------------------------------------------+
|  consumer 端                               |               | provider 端                                |
|                                           |               |                                           |
|                                           |               |                                           |
|                                           |               |                                           |
|                                           |               |                                           |
|                    +------------------+   |               |       +--------------+                    |
|                    |GenericImplFilter |   |  Invocation   |       |GenericFilter |                    |
|             +----> |                  +-------------------------> |              |                    |
|             |      +------------------+   |               |       +--------------+                    |
| +-----------+                             |               |                      |    +-----------+   |
| |           |                             |               |                      |    |           |   |
| |Client     |                             |               |                      +--> | Service   |   |
| |           |                             |               |                           |           |   |
| +-----------+                             |               |                           +-------+---+   |
|                                           |               |                                   |       |
|      ^             +------------------+   |               |       +--------------+            |       |
|      |             |GenericImplFilter |   |               |       |GenericFilter | <----------+       |
|      +-------------+                  | <-------------------------+              |                    |
|                    +------------------+   |               |       +--------------+                    |
|                                           |               |                                           |
|                                           |               |                                           |
|                                           |               |                                           |
|                                           |               |                                           |
+-------------------------------------------+               +-------------------------------------------+
```
> `GenericService` 这个接口和Java的反射调用非常像,只需提供调用的方法名称,参数的类型以及参数的值就可以直接调用对应方法了。
> - GenericFilter : 负责provider端参数的转换
>    - 调用时,将hashMap结构的参数转换成对应Pojo
>    - 返回结果是,将Pojo转换成hashMap
> 
![image.png](/img/shenyu/blog8/03.png)
> - GenericImplFilter : 负责consumer端参数的转换,将Pojo转换成hashMap接口
> 
![image.png](/img/shenyu/blog8/04.png)

```java
/**
 * Generic service interface
 *
 * @export
 */
public interface GenericService {

    /**
     * Generic invocation
     *
     * @param method         方法名，如：findPerson，如果有重载方法，需带上参数列表，如：findPerson(java.lang.String)
     * @param parameterTypes 参数类型
     * @param args           参数列表
     * @return invocation 返回值
     * @throws GenericException 方法抛出的异常
     */
    Object $invoke(String method, String[] parameterTypes, Object[] args) throws GenericException;

    default CompletableFuture<Object> $invokeAsync(String method, String[] parameterTypes, Object[] args) throws GenericException {
        Object object = $invoke(method, parameterTypes, args);
        if (object instanceof CompletableFuture) {
            return (CompletableFuture<Object>) object;
        }
        return CompletableFuture.completedFuture(object);
    }

}
```
### ShenYuDubbo 插件调用解析 
当业务请求发起时候,首先进入 `SoulWebHandler` (至于为什么成为请求入口自行查询,本文不作解释) 类的 `Handle` 方法,下面就带了 `plugins` 从 `DefaultSoulPluginChain` 类开始进入插件链调用。
```java
@Override
    public Mono<Void> handle(@NonNull final ServerWebExchange exchange) {
        return new DefaultSoulPluginChain(plugins).execute(exchange).subscribeOn(scheduler);
    }
```
```java
@Override
public Mono<Void> execute(final ServerWebExchange exchange) {
    // 响应式编程
    return Mono.defer(() -> {
        // 判断当前index 是否 < 插件数量
        if (this.index < plugins.size()) {
            // 依次从plugins 中获取一种插件进行调用
            SoulPlugin plugin = plugins.get(this.index++);
            // 判断此插件是否未打开
            Boolean skip = plugin.skip(exchange);
            if (skip) {
                return this.execute(exchange);
            }
            return plugin.execute(exchange, this);
        }
        return Mono.empty();
    });
}
```
> 本章只关注Apache Dubbo 所以我们重点放到Dubbo 插件的调用。
> ![image.png](/img/shenyu/blog8/05.png)
> 经过Debug网关程序我们知道其实是按照上面的顺序一个一个的进行判断调用。下面我们关注 `ApacheDubboPlugin` 

#### ApachDubboPlugin 泛化调用准备
```java
@Override
    protected Mono<Void> doExecute(final ServerWebExchange exchange, final SoulPluginChain chain, final SelectorData selector, final RuleData rule) {
        // 获取 dubbo_params 数据
        String body = exchange.getAttribute(Constants.DUBBO_PARAMS);
        // 获取 exchange context的属性值
        SoulContext soulContext = exchange.getAttribute(Constants.CONTEXT);
        assert soulContext != null;
        // 获取 exchange metaData 属性值
        MetaData metaData = exchange.getAttribute(Constants.META_DATA);
        // 判断metaData是否有误,如果有误直接返回 metaData 有误的返回信息
        if (!checkMetaData(metaData)) {
            assert metaData != null;
            log.error(" path is :{}, meta data have error.... {}", soulContext.getPath(), metaData.toString());
            exchange.getResponse().setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
            Object error = SoulResultWrap.error(SoulResultEnum.META_DATA_ERROR.getCode(), SoulResultEnum.META_DATA_ERROR.getMsg(), null);
            return WebFluxResultUtils.result(exchange, error);
        }
        // 判断 metaData的parameterTypes 和 body 是否为空,如果有误则返回Body错误信息
        if (StringUtils.isNoneBlank(metaData.getParameterTypes()) && StringUtils.isBlank(body)) {
            exchange.getResponse().setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
            Object error = SoulResultWrap.error(SoulResultEnum.DUBBO_HAVE_BODY_PARAM.getCode(), SoulResultEnum.DUBBO_HAVE_BODY_PARAM.getMsg(), null);
            return WebFluxResultUtils.result(exchange, error);
        }
        // 带着exchange、body、metaData 进行 Dubbo GenericsService的异步调用
        final Mono<Object> result = dubboProxyService.genericInvoker(body, metaData, exchange);
        return result.then(chain.execute(exchange));
    }
```
> 首先对泛化调用所需要的参数进行检查

#### ApacheDubboProxyService
```java
public Mono<Object> genericInvoker(final String body, final MetaData metaData, final ServerWebExchange exchange) throws SoulException {
    // issue(https://github.com/dromara/soul/issues/471), add dubbo tag route
    String dubboTagRouteFromHttpHeaders = exchange.getRequest().getHeaders().getFirst(Constants.DUBBO_TAG_ROUTE);
    if (StringUtils.isNotBlank(dubboTagRouteFromHttpHeaders)) {
        RpcContext.getContext().setAttachment(CommonConstants.TAG_KEY, dubboTagRouteFromHttpHeaders);
    }
    // 根据metaData路径获取ferference
    ReferenceConfig<GenericService> reference = ApplicationConfigCache.getInstance().get(metaData.getPath());
    if (Objects.isNull(reference) || StringUtils.isEmpty(reference.getInterface())) {
        ApplicationConfigCache.getInstance().invalidate(metaData.getPath());
        reference = ApplicationConfigCache.getInstance().initRef(metaData);
    }
    // 根据ferference 获取泛化调用的实例 GenericService
    GenericService genericService = reference.get();
    Pair<String[], Object[]> pair;
    if (ParamCheckUtils.dubboBodyIsEmpty(body)) {
        pair = new ImmutablePair<>(new String[]{}, new Object[]{});
    } else {
        // 根据body 和 parameterTypes 组织Dubbo 泛化调用的参数类型和参数值
        pair = dubboParamResolveService.buildParameter(body, metaData.getParameterTypes());
    }
    // 下面使用GenericSerice 默认方法$invokeAsync进行异步调用
    CompletableFuture<Object> future = genericService.$invokeAsync(metaData.getMethodName(), pair.getLeft(), pair.getRight());
    return Mono.fromFuture(future.thenApply(ret -> {
        if (Objects.isNull(ret)) {
            ret = Constants.DUBBO_RPC_RESULT_EMPTY;
        }
        // 等调用成功之后 将结果和类型复制到exchagne 对应的属性上
        exchange.getAttributes().put(Constants.DUBBO_RPC_RESULT, ret);
        exchange.getAttributes().put(Constants.CLIENT_RESPONSE_RESULT_TYPE, ResultEnum.SUCCESS.getName());
        return ret;
    })).onErrorMap(exception -> exception instanceof GenericException ? new SoulException(((GenericException) exception).getExceptionMessage()) : new SoulException(exception));
}
```

#### DubboResponsePlugin 

```java
@Override
public Mono<Void> execute(final ServerWebExchange exchange, final SoulPluginChain chain) {
    return chain.execute(exchange).then(Mono.defer(() -> {
        final Object result = exchange.getAttribute(Constants.DUBBO_RPC_RESULT);
        if (Objects.isNull(result)) {
            Object error = SoulResultWrap.error(SoulResultEnum.SERVICE_RESULT_ERROR.getCode(), SoulResultEnum.SERVICE_RESULT_ERROR.getMsg(), null);
            return WebFluxResultUtils.result(exchange, error);
        }
        Object success = SoulResultWrap.success(SoulResultEnum.SUCCESS.getCode(), SoulResultEnum.SUCCESS.getMsg(), JsonUtils.removeClass(result));
        return WebFluxResultUtils.result(exchange, success);
    }));
}
```

#### ![image.png](/img/shenyu/blog8/06.png)

#### WebFluxResultUtils 返回结果

![image.png](/img/shenyu/blog8/07.png)

### Dubbo泛化调用介绍
Dubbo泛化调用主要就分为两块分别是消费端如何使用 `GenericImplFilter` 拦截泛化调用、服务提供端如何使用 `GenericFilter` 拦截请求后把泛化参数序列化然后请求给具体服务。
#### 服务消费端org.apache.dubbo.rpc.filter.GenericImplFilter是如何拦截泛化调用
```java
@Activate(group = CommonConstants.CONSUMER, value = GENERIC_KEY, order = 20000)
public class GenericImplFilter implements Filter, Filter.Listener {
@Override
    public Result invoke(Invoker<?> invoker, Invocation invocation) throws RpcException {
        // ... 省略非核心代码
        // 判断是否为泛化调用
        if (isMakingGenericCall(generic, invocation)) {
            // 获取泛化参数
            Object[] args = (Object[]) invocation.getArguments()[2];
            // 如果泛化为nativeJava
            if (ProtocolUtils.isJavaGenericSerialization(generic)) {
                for (Object arg : args) {
                    if (!(byte[].class == arg.getClass())) {
                        error(generic, byte[].class.getName(), arg.getClass().getName());
                    }
                }
                // 如果泛化方式为bean
            } else if (ProtocolUtils.isBeanGenericSerialization(generic)) {
                for (Object arg : args) {
                    if (!(arg instanceof JavaBeanDescriptor)) {
                        error(generic, JavaBeanDescriptor.class.getName(), arg.getClass().getName());
                    }
                }
            }

            // 设置attachment ,以便与服务端调用
            invocation.setAttachment(
                    GENERIC_KEY, invoker.getUrl().getParameter(GENERIC_KEY));
        }
        // 发起远程调用
        return invoker.invoke(invocation);
    }
    private boolean isMakingGenericCall(String generic, Invocation invocation) {
        return (invocation.getMethodName().equals($INVOKE) || invocation.getMethodName().equals($INVOKE_ASYNC))
                && invocation.getArguments() != null
                && invocation.getArguments().length == 3
                && ProtocolUtils.isGeneric(generic);
    }
}
```
> GenericImplFilter 实现接口Filter(关于Dubbo中的Filter,不做介绍)然后执行Invoke方法,invoke方法主要做如下事情:
> - 参数校验,检查这个调用是否是泛化调用
> - 获取泛化参数
> - 判断泛化调用方式:遍历每个参数,然后依次判断参数的泛化方式是nativejava还是bean方式
> - 发起远程调用

#### 服务提供端通过GenericFilter拦截泛化请求
```java
@Activate(group = CommonConstants.PROVIDER, order = -20000)
public class GenericFilter implements Filter, Filter.Listener {
    @Override
    public Result invoke(Invoker<?> invoker, Invocation inv) throws RpcException {
        // 参数校验
        if ((inv.getMethodName().equals($INVOKE) || inv.getMethodName().equals($INVOKE_ASYNC))
                && inv.getArguments() != null
                && inv.getArguments().length == 3
                && !GenericService.class.isAssignableFrom(invoker.getInterface())) {
            // 获取参数名称、参数类型、参数值
            String name = ((String) inv.getArguments()[0]).trim();
            String[] types = (String[]) inv.getArguments()[1];
            Object[] args = (Object[]) inv.getArguments()[2];
            try {
                // 使用反射获取调用的方法
                Method method = ReflectUtils.findMethodByMethodSignature(invoker.getInterface(), name, types);
                Class<?>[] params = method.getParameterTypes();
                if (args == null) {
                    args = new Object[params.length];
                }
                // 获取泛化引用使用的泛化类型,true or bean or nativejava
                String generic = inv.getAttachment(GENERIC_KEY);
                if (StringUtils.isBlank(generic)) {
                    generic = RpcContext.getContext().getAttachment(GENERIC_KEY);
                }
                // 如果generic=true 则使用true方式对入参进行反序列化
                if (StringUtils.isEmpty(generic)
                        || ProtocolUtils.isDefaultGenericSerialization(generic)
                        || ProtocolUtils.isGenericReturnRawResult(generic)) {
                    args = PojoUtils.realize(args, params, method.getGenericParameterTypes());
                    // 如果 generic=nativejava,则使用nativejava方式对入参进行反序列化
                } else if (ProtocolUtils.isJavaGenericSerialization(generic)) {
                    for (int i = 0; i < args.length; i++) {
                        if (byte[].class == args[i].getClass()) {
                            try (UnsafeByteArrayInputStream is = new UnsafeByteArrayInputStream((byte[]) args[i])) {
                                args[i] = ExtensionLoader.getExtensionLoader(Serialization.class)
                                        .getExtension(GENERIC_SERIALIZATION_NATIVE_JAVA)
                                        .deserialize(null, is).readObject();
                            } catch (Exception e) {
                                throw new RpcException("Deserialize argument [" + (i + 1) + "] failed.", e);
                            }
                        } else {
                            throw new RpcException(...);
                        }
                    }
                    // 如果 generic=bean 则使用bean方式对入参进行反序列化
                } else if (ProtocolUtils.isBeanGenericSerialization(generic)) {
                    for (int i = 0; i < args.length; i++) {
                        if (args[i] instanceof JavaBeanDescriptor) {
                            args[i] = JavaBeanSerializeUtil.deserialize((JavaBeanDescriptor) args[i]);
                        } else {
                            throw new RpcException(...);
                        }
                    }
                } ...
                // 将本次请求传递到FilterChain的下一个Filter中,并返回结果result
                RpcInvocation rpcInvocation = new RpcInvocation(method, invoker.getInterface().getName(), args, inv.getAttachments(), inv.getAttributes());
                rpcInvocation.setInvoker(inv.getInvoker());
                rpcInvocation.setTargetServiceUniqueName(inv.getTargetServiceUniqueName());

                return invoker.invoke(rpcInvocation);
            } catch (NoSuchMethodException e) {
                throw new RpcException(e.getMessage(), e);
            } catch (ClassNotFoundException e) {
                throw new RpcException(e.getMessage(), e);
            }
        }
        // 如果不是泛化调用,直接把请求传给FilterChain的下一个Filter
        return invoker.invoke(inv);
    }
}
```
> 以上就是Dubbo服务提供端如何拦截泛化请求,并进行处理的大体流程:
> - 参数校验,判断此次请求是不是泛化调用
> - 获取参数名称、参数类型、参数值
> - 使用反射获取调用的方法,和使用的泛化方式 `true`  or `nativejava`  or `bean` 
> - 根据泛化方式,反序列化泛化参数
> - 将本次请求，包括调用的方法，参数和上下文信息传递给FilterChain的下一个Filter中,并返回Result结果
> - 根据泛化方式,反序列化Result结果返回给服务消费端

### 总结
以上从如何配置Dubbo插件到整个调用流程的分析,然后分别介绍服务消费端与服务提供端如何拦截泛化调用流程对参数进行序列化细节,希望对你有所帮助
### 参考
[https://my.oschina.net/u/4564034/blog/4409382](https://my.oschina.net/u/4564034/blog/4409382)

[https://qsli.github.io/2018/05/02/dubbo-generic-invoke/](https://qsli.github.io/2018/05/02/dubbo-generic-invoke/)

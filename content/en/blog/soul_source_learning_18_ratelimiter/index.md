---
title: "Soul Gateway Learning RateLimiter Plugin"
author: "baiyu"
description: "Soul Gateway Learning RateLimiter Plugin"
categories: "Soul"
tags: ["Soul"]
date: 2021-01-30
cover: "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9434447ebc674f58b65c26b65f855181~tplv-k3u1fbpfcp-watermark.image"
---

## 回顾

在之前的HTTP请求初探的文章中，大体梳理了Soul插件的处理流程，也得知了DividePlugin、GlobalPlugin，WebClientPlugin，WebCilentResponsePlugin插件的具体作用，在梳理流程中，发现Soul的插件是有**先后顺序**的，在DividePlugin插件之前做了很多前置插件的操作，其中包含了我们本章分析的主题**RateLimiterPlugin 限流插件**（其中一种）。

## 学习使用

### 阅读官方文档 对其有大概认知

<a href="https://dromara.org/zh/projects/soul/rate-limiter-plugin/">rateLimiter插件</a>

通过官方文档的阅读我们得知了**RateLimiterPlugin**的两个核心点**速率、容量**

以下搬运于官方文档
- 容量：是允许用户在一秒钟内执行的最大请求数。这是令牌桶可以保存的令牌数。
- 速率：是你允许用户每秒执行多少请求，而丢弃任何请求。这是令牌桶的填充速率。

可以看出**RateLimiterPlugin**限流核心在于**令牌桶算法**的实现。

ps：关于限流算法常见的有四种实现**令牌桶算法**，**漏斗算法**，**计数器（固定窗口）算法**，**滑动窗口算法**，详情看对应<a href="https://blog.csdn.net/weixin_41846320/article/details/95941361">博客介绍</a>

### 初步使用

#### 启用对应插件

在Soul网关**系统管理-插件管理**处，将状态更改为启用状态，注意此处需要填写redis相关配置，Soul令牌桶基于Redis。

为什么Soul的令牌桶算法要基于redis？

在集群部署情况下单机的令牌桶算法无法满足集群状态下的限流功能。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e25dd524c294b4f9c227e3f2127757f~tplv-k3u1fbpfcp-watermark.image)

#### 添加限流选择器、规则
在Soul网关**插件列表**处，选择rate_limiter处添加规则及选择器配置，不懂如何添加的可以先阅读<a href="https://juejin.cn/post/6922431625230417928">选择器\规则的匹配逻辑</a>.
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9cbbc63ed6214aeda8c70f8e34d7c19c~tplv-k3u1fbpfcp-watermark.image)
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25e67268dd5e4aa9a081a51963a03da8~tplv-k3u1fbpfcp-watermark.image)
在此处添加的容量及速率都为1 主要为了验证插件是否启用。

#### 接口对应访问

调用*http://127.0.0.1:9195/http/test/findByUserId?userId=10* 进行访问，速率高于1的情况下出现如下接口返回结果，代表插件成功使用。
```json
{
    "code": 429,
    "message": "You have been restricted, please try again later!",
    "data": null
}
```

### 源码阅读 带着问题读源码

#### 如何保证在页面修改redis配置后立即生效的，后台对应的redis连接立马变更的。

答案自然数据同步脱不了干系。

在修改插件的配置时，也发布了一个插件数据变更的事件通知，在之前梳理<a href="https://juejin.cn/post/6920609782349086727">Soul网关同步数据整体流程</a>时,已经得知修改的插件数据除了更改了JVM缓存内的数据外，还对对应的插件进行下发操作，如下图
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9434447ebc674f58b65c26b65f855181~tplv-k3u1fbpfcp-watermark.image)
而针对于**RateLimiterPlugin**而言，其主要实现了**handlePlugin**的接口，那这个对应的实现到底做了哪些事呢？

具体的方法为**RateLimiterPluginDataHandler的handlerPlugin**。

```java
public void handlerPlugin(final PluginData pluginData) {
        if (Objects.nonNull(pluginData) && pluginData.getEnabled()) {
            //加载限流插件配置 
            RateLimiterConfig rateLimiterConfig = GsonUtils.getInstance().fromJson(pluginData.getConfig(), RateLimiterConfig.class);
            //判断是否需要重新加载redis连接值
            if (Objects.isNull(Singleton.INST.get(ReactiveRedisTemplate.class))
                    || Objects.isNull(Singleton.INST.get(RateLimiterConfig.class))
                    || !rateLimiterConfig.equals(Singleton.INST.get(RateLimiterConfig.class))) {
                LettuceConnectionFactory lettuceConnectionFactory = createLettuceConnectionFactory(rateLimiterConfig);
                lettuceConnectionFactory.afterPropertiesSet();
                RedisSerializer<String> serializer = new StringRedisSerializer();
                RedisSerializationContext<String, String> serializationContext =
                        RedisSerializationContext.<String, String>newSerializationContext().key(serializer).value(serializer).hashKey(serializer).hashValue(serializer).build();
                ReactiveRedisTemplate<String, String> reactiveRedisTemplate = new ReactiveRedisTemplate<>(lettuceConnectionFactory, serializationContext);
                Singleton.INST.single(ReactiveRedisTemplate.class, reactiveRedisTemplate);
                Singleton.INST.single(RateLimiterConfig.class, rateLimiterConfig);
            }
        }
    }
```
上述代码有几个较为关键的点：

 在上述代码中将限流插件的配置和对应的redisTemplate实例放入了Singleton.INST对应map中。
 
 在插件数据过来时，判断是否存在redis连接实例，是否存在限流配置实例，判断当前的限流配置实例是否和传递的限流实例一致，不一致就认为配置是有更改的，就重新初始化限流实例和连接池实例放入Singleton.INST的map中，由此而言就保证了更改redis配置的热部署。
 
 if判断中的代码就是基于SpringDataRedis封装成一个对应redis连接池。
  
 ps：Singleton.INST是枚举实现的单例模式。
 
### 限流插件是底层是如何实现的呢？
 
#### Debug 调用链
 
**RateLimiterPlugin**由于需要对特定规则进行限流，所以依旧实现了**AbstractSoulPlugin**，之前依旧梳理过**AbstractSoulPlugin的excute**的方法和作用了，所以这里不重复解释，可观看<a href="https://juejin.cn/post/6921685390982119438">Http 调用流程梳理</a>，加深对该类的印象。
 
本节重点还是看具体的**doexcute**方法做了哪些事。
```java
   protected Mono<Void> doExecute(final ServerWebExchange exchange, final SoulPluginChain chain, final SelectorData selector, final RuleData rule) {
       final String handle = rule.getHandle();
       final RateLimiterHandle limiterHandle = GsonUtils.getInstance().fromJson(handle, RateLimiterHandle.class);
       return redisRateLimiter.isAllowed(rule.getId(), limiterHandle.getReplenishRate(), limiterHandle.getBurstCapacity())
               .flatMap(response -> {
                   if (!response.isAllowed()) {
                       //返回的错误信息 429错误编码
                       exchange.getResponse().setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
                       Object error = SoulResultWrap.error(SoulResultEnum.TOO_MANY_REQUESTS.getCode(), SoulResultEnum.TOO_MANY_REQUESTS.getMsg(), null);
                       return WebFluxResultUtils.result(exchange, error);
                   }
                   return chain.execute(exchange);
               });
   }
```
  
  在上述代码中可以看出是通过**redisRateLimiter.isAllowed**来判断是否获取令牌成功的。
  该方法如下
 ```java
    public Mono<RateLimiterResponse> isAllowed(final String id, final double replenishRate, final double burstCapacity) {
        if (!this.initialized.get()) {
            throw new IllegalStateException("RedisRateLimiter is not initialized");
        }
        //获取redis Key
        List<String> keys = getKeys(id);
        //封装lua脚本执行所需的参数 第一位是速率 第二位是容量 第三位是当前时间戳10位 第四位固定参数值1 代表申请的令牌数
        List<String> scriptArgs = Arrays.asList(replenishRate + "", burstCapacity + "", Instant.now().getEpochSecond() + "", "1");
        //执行lua脚本
        Flux<List<Long>> resultFlux = Singleton.INST.get(ReactiveRedisTemplate.class).execute(this.script, keys, scriptArgs);
        return resultFlux.onErrorResume(throwable -> Flux.just(Arrays.asList(1L, -1L)))
                .reduce(new ArrayList<Long>(), (longs, l) -> {
                    longs.addAll(l);
                    return longs;
                }).map(results -> {
                    //allowed 代表执行的结果 为1 代表执行成功
                    boolean allowed = results.get(0) == 1L;
                    Long tokensLeft = results.get(1);
                    RateLimiterResponse rateLimiterResponse = new RateLimiterResponse(allowed, tokensLeft);
                    log.info("RateLimiter response:{}", rateLimiterResponse.toString());
                    return rateLimiterResponse;
                }).doOnError(throwable -> log.error("Error determining if user allowed from redis:{}", throwable.getMessage()));
    }
 ```
#### 方法getKeys(id)

该方法是获取redis需要操作的key，一共获取了两个类型的Key，格式如下:

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55ce72f4e044405fbd3b1461905072f2~tplv-k3u1fbpfcp-watermark.image)
  
  中间那位特别长的数字是**规则ID**，因为限流的最小粒度是规则。
  
  第一个timestamp记录的是**上一次调用的时间戳**
  
  第二个tokens记录的是**上一次调用完成后剩余的令牌数量**
 
#### execute(this.script, keys, scriptArgs）

执行lua脚本 keys传递的是getKeys(id)返回值，scriptArgs传递的是所需的参数

通过阅读上述代码已经知晓 限流规则的具体实现是交给特定的lua脚本的。

ps：这里需要提醒一下限流算法是令牌桶算法，令牌桶算法一共有两种大体实现，一种是有个线程不断生成令牌，当请求进来时，先从对应的队列中获取令牌，但这种令牌生成方式在设定阈值特别大时，会非常消耗性能，所以有了第二种令牌桶算法，在获取令牌时实时计算令牌数量，而soul就是基于第二种实现的。
 
 
#### Lua限流算法分析
 
 ```lua
 -- 当前规则令牌剩余数量存储key
local tokens_key = KEYS[1]
-- 当前规则上次调用时间
local timestamp_key = KEYS[2]

-- 速率
local rate = tonumber(ARGV[1])
-- 容量
local capacity = tonumber(ARGV[2])
-- 时间戳
local now = tonumber(ARGV[3])
-- 值为1
local requested = tonumber(ARGV[4])
-- 容量除以速率 计算填充时间
local fill_time = capacity/rate
-- 计算过期时间 取下限
local ttl = math.floor(fill_time*2)

-- 获取当前存有的令牌数
local last_tokens = tonumber(redis.call("get", tokens_key))
if last_tokens == nil then
-- 将令牌数量赋值为设定的容量
  last_tokens = capacity
end
-- 获取上一次调用时间
local last_refreshed = tonumber(redis.call("get", timestamp_key))
if last_refreshed == nil then
  last_refreshed = 0
end
-- 计算出上次调用和本次调用之间的时间差
local delta = math.max(0, now-last_refreshed)
-- 计算出当前剩余的令牌数量
local filled_tokens = math.min(capacity, last_tokens+(delta*rate))
--  判断当前令牌数量 数量>=1 代表获取成功
local allowed = filled_tokens >= requested
local new_tokens = filled_tokens
local allowed_num = 0
if allowed then
  -- 申请一个令牌
  new_tokens = filled_tokens - requested
  allowed_num = 1
end

-- setex 设置过期key 过期时间 新值
redis.call("setex", tokens_key, ttl, new_tokens)
redis.call("setex", timestamp_key, ttl, now)

return { allowed_num, new_tokens }
 ```
推荐先了解一下lua**KEYS ARGS**的作用<a href="https://www.cnblogs.com/liuyu7177/p/10918250.html">redis lua 中keys[1] 和argv[1] 的理解</a>.

Lua代码整体逻辑还是非常明朗的，在这里细讲也讲不出个啥来，代码注释已经打全了。

本人在这里疑惑的有两点

- **ttl**参数的计算 乘2 的目的是为了怕不是整数？，所以进行的*2 取最小操作?
- **filled_tokens**参数的计算 核心代码last_tokens+(delta*rate)，其中delta参数是两个十位时间戳相减得来 ，但是rate是按秒来生成的，难道不应该是last_tokens+((delta/1000)*rate)吗？
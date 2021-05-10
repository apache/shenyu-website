---
title: "ShenYu Gateway Learning Resilience4j Plugin"
author: "yanbing"
description: "ShenYu Gateway Learning Resilience4j Plugin"
categories: "ShenYu"
tags: ["ShenYu"]
date: 2021-03-22
cover: "/img/soul/blog6/03.jpg"

---

## 目标
* 什么是Resilience4J
* soul的Resilience4j体验
 	- 限流
 	- 熔断
* Resilience4J插件源码解读

## 什么是Resilience4j
* Resilience4J是Spring Cloud Gateway推荐的容错方案，它是一个轻量级的容错库
* 借鉴了Hystrix而设计，并且采用JDK8 这个函数式编程，即lambda表达式
* 相比之下， Netflix Hystrix 对Archaius 具有编译依赖性，Resilience4j你无需引用全部依赖，可以根据自己需要的功能引用相关的模块即可
Hystrix不更新了，Spring提供Netflix Hystrix的替换方案，即Resilence4J
* Resilience4J 提供了一系列增强微服务的可用性功能：
    *  断路器 CircuitBreaker
    *  限流 RateLimiter
    *  基于信号量的隔离
    *  缓存
    *  限时 Timelimiter
    *  请求重启  Retry

* 官方提供的依赖包
 ```Java   
     <dependency>
            <groupId>io.github.resilience4j</groupId>
            <artifactId>resilience4j-circuitbreaker</artifactId>
            <version>${resilience.version}</version>
     </dependency>
  ```

## soul的Resilience4j体验
* 首先在soul-admin控制台插件管理开启Resilience4j
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210321112151395.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3ODY5MjQz,size_16,color_FFFFFF,t_70)


* 在soul网关添加依赖
 ```Java   
       <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>soul-spring-boot-starter-plugin-ratelimiter</artifactId>
            <version>${project.version}</version>
        </dependency>
  ```
* 启动三个服务,分别是一个soul-admin，一个soul-bootstrap，一个soul-examples-http

* 在soul-admin控制台找到插件列表的Resilience4j，自定义配置，如下图，
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210321112202189.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3ODY5MjQz,size_16,color_FFFFFF,t_70)



* [soul官网的配置介绍]( https://dromara.org/zh/projects/soul/resilience4j-plugin/)

```
* Resilience4j处理详解：

	* timeoutDurationRate：等待获取令牌的超时时间，单位ms，默认值：5000。

	* limitRefreshPeriod：刷新令牌的时间间隔，单位ms，默认值：500。

	* limitForPeriod：每次刷新令牌的数量，默认值：50。

	* circuitEnable：是否开启熔断，0：关闭，1：开启，默认值：0。

	* timeoutDuration：熔断超时时间，单位ms，默认值：30000。

	* fallbackUri：降级处理的uri。

	* slidingWindowSize：滑动窗口大小，默认值：100。

	* slidingWindowType：滑动窗口类型，0：基于计数，1：基于时间，默认值：0。

	* minimumNumberOfCalls：开启熔断的最小请求数，超过这个请求数才开启熔断统计，默认值：100。

	* waitIntervalFunctionInOpenState：熔断器开启持续时间，单位ms，默认值：10。

	* permittedNumberOfCallsInHalfOpenState：半开状态下的环形缓冲区大小，必须达到此数量才会计算失败率，默认值：10。

	* failureRateThreshold：错误率百分比，达到这个阈值，熔断器才会开启，默认值50。

	* automaticTransitionFromOpenToHalfOpenEnabled：是否自动从open状态转换为half-open状态，,true：是，false：否，默认值：false。
 ```
### 限流
* 参数配置
 如下是参数配置校验，参数值小于默认值，会直接赋值默认值，因此方便测试效果直接修改源码的配置
： 每次刷新令牌的数量为2 ，刷新令牌的时间间隔为1s，超时时间为1s

```java
    /**
     * check filed default value.
     *
     * @param resilience4JHandle {@linkplain Resilience4JHandle}
     * @return {@linkplain Resilience4JHandle}
     */
    public Resilience4JHandle checkData(final Resilience4JHandle resilience4JHandle) {
        resilience4JHandle.setTimeoutDurationRate(Math.max(resilience4JHandle.getTimeoutDurationRate(), Constants.TIMEOUT_DURATION_RATE));
		   //resilience4JHandle.setLimitRefreshPeriod(Math.max(resilience4JHandle.getLimitRefreshPeriod(), Constants.LIMIT_REFRESH_PERIOD));
		   //resilience4JHandle.setLimitForPeriod(Math.max(resilience4JHandle.getLimitForPeriod(), Constants.LIMIT_FOR_PERIOD));
        //每次刷新令牌的数量为2 ，刷新令牌的时间间隔为1s
        resilience4JHandle.setLimitRefreshPeriod(1000);
        resilience4JHandle.setLimitForPeriod(2);
        resilience4JHandle.setTimeoutDuration(1000);
        resilience4JHandle.setCircuitEnable(Math.max(resilience4JHandle.getCircuitEnable(), Constants.CIRCUIT_ENABLE));
		   //resilience4JHandle.setTimeoutDuration(Math.max(resilience4JHandle.getTimeoutDuration(), Constants.TIMEOUT_DURATION));
        resilience4JHandle.setFallbackUri(!"0".equals(resilience4JHandle.getFallbackUri()) ? resilience4JHandle.getFallbackUri() : "");
        resilience4JHandle.setSlidingWindowSize(Math.max(resilience4JHandle.getSlidingWindowSize(), Constants.SLIDING_WINDOW_SIZE));
        resilience4JHandle.setSlidingWindowType(Math.max(resilience4JHandle.getSlidingWindowType(), Constants.SLIDING_WINDOW_TYPE));
        resilience4JHandle.setMinimumNumberOfCalls(Math.max(resilience4JHandle.getMinimumNumberOfCalls(), Constants.MINIMUM_NUMBER_OF_CALLS));
        resilience4JHandle.setWaitIntervalFunctionInOpenState(Math.max(resilience4JHandle.getWaitIntervalFunctionInOpenState(), Constants.WAIT_INTERVAL_FUNCTION_IN_OPEN_STATE));
        resilience4JHandle.setPermittedNumberOfCallsInHalfOpenState(Math.max(resilience4JHandle.getPermittedNumberOfCallsInHalfOpenState(), Constants.PERMITTED_NUMBER_OF_CALLS_IN_HALF_OPEN_STATE));
        resilience4JHandle.setFailureRateThreshold(Math.max(resilience4JHandle.getFailureRateThreshold(), Constants.FAILURE_RATE_THRESHOLD));
        return resilience4JHandle;
    }
```

* 使用SuperBenchmarker工具，4个线程，执行10s

```java
C:\Users\v-yanb07>sb -u http://localhost:9195/http/test/findByUserId?userId=1 -c 4 -N 10
Starting at 2021-03-14 15:46:28
[Press C to stop the test]
23      (RPS: 1)
---------------Finished!----------------
Finished at 2021-03-14 15:46:51 (took 00:00:23.0477097)
24      (RPS: 1)                        Status 200:    25

RPS: 2.2 (requests/second)
Max: 2020ms
Min: 472ms
Avg: 1677ms

  50%   below 1994ms
  60%   below 1997ms
  70%   below 1999ms
  80%   below 1999ms
  90%   below 2001ms
  95%   below 2019ms
  98%   below 2020ms
  99%   below 2020ms
99.9%   below 2020ms
```
* 输出日志
 ```java
2021-03-14 12:16:35.252  INFO 379336 --- [ctor-http-nio-7] o.d.s.e.h.controller.HttpTestController  : 限流测试
2021-03-14 12:16:36.249  INFO 379336 --- [ctor-http-nio-4] o.d.s.e.h.controller.HttpTestController  : 限流测试
2021-03-14 12:16:36.250  INFO 379336 --- [ctor-http-nio-7] o.d.s.e.h.controller.HttpTestController  : 限流测试
2021-03-14 12:16:37.250  INFO 379336 --- [ctor-http-nio-7] o.d.s.e.h.controller.HttpTestController  : 限流测试
2021-03-14 12:16:37.250  INFO 379336 --- [ctor-http-nio-4] o.d.s.e.h.controller.HttpTestController  : 限流测试
2021-03-14 12:16:38.250  INFO 379336 --- [ctor-http-nio-7] o.d.s.e.h.controller.HttpTestController  : 限流测试
2021-03-14 12:16:38.250  INFO 379336 --- [ctor-http-nio-4] o.d.s.e.h.controller.HttpTestController  : 限流测试
2021-03-14 12:16:39.252  INFO 379336 --- [ctor-http-nio-7] o.d.s.e.h.controller.HttpTestController  : 限流测试
2021-03-14 12:16:39.252  INFO 379336 --- [ctor-http-nio-4] o.d.s.e.h.controller.HttpTestController  : 限流测试
 ```
控制台日志每秒输出两条，由此验证限流生效

### 熔断
* 从配置信息我们知道熔断器默认是关闭，我们需要开打
*  soul-examples-http调用接口处添加休眠时间
```java
    @GetMapping("/findByUserId")
    public UserDTO findByUserId(@RequestParam("userId") final String userId) throws Exception{
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(userId);
        userDTO.setUserName("hello world");
       log.info("限流测试");

        int i = RandomUtils.nextInt(1,3);
        if(i %2==0){
		//throw new Exception("异常抛出");
        Thread.currentThread().sleep(2000);
        }
        return userDTO;
    }
```

* Resilience4JHandle#checkData手动设置超时时间为1s

```java
    resilience4JHandle.setTimeoutDuration(1000);
```
 * pos接口调用
 >http://localhost:9195/http/test/findByUserId?userId=1
 
 多次请求时，有的请求返回正常数据，有的请求返回如下数据，表示超时熔断生效
  ```java
{
    "code": 500,
    "message": "Internal Server Error",
    "data": "404 NOT_FOUND"
}
 ```
## Resilience4J插件源码解读 
 soul网关Resilience4j插件源码大量使用了[响应式编程](https://developer.ibm.com/zh/languages/java/articles/j-cn-with-reactor-response-encode/)方式，首先需要对响应式编程了解

* Resilience4J插件目录结构

```
└─resilience4j
    │  Resilience4JPlugin.java                   //插件处理，核心类
    │  
    ├─build
    │      Resilience4JBuilder.java         	 //构建Resilience4JConf对象
    │      
    ├─conf
    │      Resilience4JConf.java
    │      
    ├─executor
    │      CombinedExecutor.java      		 	 //限流和熔断执行器
    │      Executor.java
    │      RateLimiterExecutor.java    	 		 //限流执行器
    │      
    ├─factory
    │      Resilience4JRegistryFactory.java    	 //限流和熔断对象构建
    │      
    └─handler
            Resilience4JHandler.java
```



* Resilience4JPlugn#doExecute
Resilience4JPlugn其他soul中插件一样继承AbstractSoulPlugin，只要开启了，通过链式机制执行，都会走到核心方法doExecute
```java
    @Override
    protected Mono<Void> doExecute(final ServerWebExchange exchange, final SoulPluginChain chain, final SelectorData selector, final RuleData rule) {
        final SoulContext soulContext = exchange.getAttribute(Constants.CONTEXT);
        assert soulContext != null;
        //获取配置信息对象
        Resilience4JHandle resilience4JHandle = GsonUtils.getGson().fromJson(rule.getHandle(), Resilience4JHandle.class);
        //校验配置信息，如果小于默认值，则赋值默认值
        resilience4JHandle = resilience4JHandle.checkData(resilience4JHandle);
        //circuitEnable配置：1 开启熔断组件 ，否则走限流组件
        if (resilience4JHandle.getCircuitEnable() == 1) {
            return combined(exchange, chain, rule);
        }

        return rateLimiter(exchange, chain, rule);
    }
  ```
- 限流 Resilience4JPlugin#rateLimiter 

```java
    private Mono<Void> rateLimiter(final ServerWebExchange exchange, final SoulPluginChain chain, final RuleData rule) {
    return ratelimiterExecutor.run(
            // chain.execute(exchange)  后续插件执行
            chain.execute(exchange), fallback(ratelimiterExecutor, exchange, null), Resilience4JBuilder.build(rule))
            .onErrorResume(throwable -> ratelimiterExecutor.withoutFallback(exchange, throwable))  
    

    //ratelimiterExecutor.run调用
    @Override
public <T> Mono<T> run(final Mono<T> toRun, final Function<Throwable, Mono<T>> fallback, final Resilience4JConf conf) {
    //限流器组件
    RateLimiter rateLimiter = Resilience4JRegistryFactory.rateLimiter(conf.getId(), conf.getRateLimiterConfig());
    //限流执行
    Mono<T> to = toRun.transformDeferred(RateLimiterOperator.of(rateLimiter));
    if (fallback != null) {
    //回调的执行
        return to.onErrorResume(fallback);
    }
    return to;
}


    // to.onErrorResume(fallback);
    default Mono<Void> fallback(ServerWebExchange exchange, String uri, Throwable t) {
    if (StringUtils.isBlank(uri)) {
        return withoutFallback(exchange, t);
    }
    DispatcherHandler dispatcherHandler = SpringBeanUtils.getInstance().getBean(DispatcherHandler.class);
    ServerHttpRequest request = exchange.getRequest().mutate().uri(Objects.requireNonNull(UriUtils.createUri(uri))).build();
    ServerWebExchange mutated = exchange.mutate().request(request).build();
    //回调的执行地方
    return dispatcherHandler.handle(mutated);
}    
  ```

-  熔断 Resilience4JPlugin#combined

```java
    private Mono<Void> combined(final ServerWebExchange exchange, final SoulPluginChain chain, final RuleData rule) {
        Resilience4JConf conf = Resilience4JBuilder.build(rule);
        return combinedExecutor.run(
                chain.execute(exchange).doOnSuccess(v -> {
                    HttpStatus status = exchange.getResponse().getStatusCode();
                    if (status == null || !status.is2xxSuccessful()) {
                        exchange.getResponse().setStatusCode(null);
                        throw new CircuitBreakerStatusCodeException(status == null ? HttpStatus.INTERNAL_SERVER_ERROR : status);
                    }
                }), fallback(combinedExecutor, exchange, conf.getFallBackUri()), conf);
    }


   //combinedExecutor#run执行的内容
    public <T> Mono<T> run(final Mono<T> run, final Function<Throwable, Mono<T>> fallback, final Resilience4JConf resilience4JConf) {
        RateLimiter rateLimiter = Resilience4JRegistryFactory.rateLimiter(resilience4JConf.getId(), resilience4JConf.getRateLimiterConfig());
        CircuitBreaker circuitBreaker = Resilience4JRegistryFactory.circuitBreaker(resilience4JConf.getId(), resilience4JConf.getCircuitBreakerConfig());
                     //断路器的操作
        Mono<T> to = run.transformDeferred(CircuitBreakerOperator.of(circuitBreaker))
                //限流操作
                .transformDeferred(RateLimiterOperator.of(rateLimiter))
                //设置超时时间
                .timeout(resilience4JConf.getTimeLimiterConfig().getTimeoutDuration())
                //如果超时了抛出超时异常
                .doOnError(TimeoutException.class, t -> circuitBreaker.onError(
                        resilience4JConf.getTimeLimiterConfig().getTimeoutDuration().toMillis(),
                        TimeUnit.MILLISECONDS,
                        t));
        if (fallback != null) {
            to = to.onErrorResume(fallback);
        }
        return to;
    }
  ```
## 总结
* soul网关提供限流和熔断，熔断默认是关闭的
* 参数值小于默认值，会直接使用默认值


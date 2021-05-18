---
title: "ShenYu网关学习Sentinel插件原理解析"
author: "骆潇龙"
description: "ShenYu网关学习Sentinel插件原理解析"
categories: "ShenYu"
tags: ["ShenYu"]
date: 2021-03-19
cover: "/img/shenyu/blog6/02.jpg"
---

# 概述
在业务网关中熔断和流量控制都是非常必要的功能。soul在实现这部分功能时使用了不同的成熟组件，用户可以根据自己的喜好选择。本文将介绍如何在soul中使用阿里的Sentinel组件实现熔断及流控功能。本文首先会介绍熔断和流控的场景及意义。然后介绍如何在soul上配置使用sentinel插件做流控和熔断。最后从源码的层面简略分析soul是如何使用Sentinel组件的。

# 熔断和流量控制

## 场景描述

业务网关作为流量的入口，有保护后继服务的职责。以下两个对服务有严重危害的场景在生产中经常会遇到，也是业务网关必须要关注处理的问题。一种情况是在比如双11或双12这些大型促销时，接口的请求量是平时是数倍，如果没有评估好容量，这种激增的请求很容易导致整个服务完全不可用。这种宕机往往不是因为业务逻辑的漏洞而是因为请求过多资源不够导致的。另一种情况是在整个服务体系中有一些核心服务，多个业务流程都依赖该服务。然而是服务都有出现处理不稳定或者服务损坏的情况，导致请求处理时间长或者老是频繁抛出异常。排除业务BUG的情况，可能就是突发的非常随机的阻塞，一般减缓请求量就会自动修复，但是如果不加保护就有出现多米诺效应导致整个服务不可用。此场景和第一种场景有略微不同，第一种场景是实际流量确实出现了不可处理的峰值，而第二种场景主要考虑的是服务本身出现了不可避免、不可预测的抖动而引发的连锁反应。

## 流量控制

针对第一种场景我们通常的做法是进行流量控制，核心思路是业务网关保证打到后面的请求是业务可以承受的量，多余的请求直接拒绝或者加入等待队列，保证服务不会宕掉，大部分请求还是可以正常处理。在考虑流量控制的策略时，我们应该主要思考以下几个问题：

1. 通过什么角度控制流量？
2. 阈值是多少？
3. 流量控制的策略是什么？

对于第一个问题，正常思路是通过QPS来监控流量，即每秒钟请求的数量超过某限额时进行流控。但其实还有一种思路是从并发数来监控流量。这种控制场景也是非常有意义的，例如当下游应用由于某种原因导致服务不稳定、响应延迟增加，对于网关来说，意味着吞吐量下降和更多的线程数占用，极端情况下甚至导致线程池耗尽。从某种意义上讲通过并发进行流控可以一定程度上保护网关服务本身。对于第二个问题阈值来说比较好理解，就是触发流控的边界，如果从QPS来考虑就是每秒达到多少时开始流控，从并发数来考量的话就是请求上下文的线程数目超过多少进行流控。对于第三个问题，我们一般有以下3中处理方案：

1. 直接拒绝，这种策略非常好理解就是当QPS高于阈值时直接拒接服务，不把请求传输到后面的服务中。
2. 预热启动，这个策略所针对的场景是系统长期处于低水位的情况下，可能出现流量突然增加时，而直接把系统拉升到高水位可能瞬间把系统压垮。预热启动的方式是让阈值缓慢增加，在一定时间内逐渐增加阈值直至达到设置，给冷系统一个预热的时间，避免冷系统被压垮。对于超出阈值的请求也是触发拒绝。
3. 匀速排队，此策略核心思路是以固定间隔时间让请求通过。当请求到来的时候，如果当前请求距离上个通过的请求通过的时间间隔不小于预设值，则让当前请求通过；否则，计算当前请求的预期通过时间，如果该请求的预期通过时间小于规则预设的 timeout 时间，则该请求会等待直到预设时间到来通过（排队等待处理）；若预期的通过时间超出最大排队时长，则直接拒接这个请求。

## 熔断

针对第二种场景通常的处理方式是设置服务熔断。简单的说就是当我们探测的一个服务出现了异常，则不再访问它以免更多的请求对它造成更大的压力。一段时间后如果探测到服务恢复了再将流量发送过去。我们首先需要判断出这个服务是否出现了不稳定\抖动的情况。然后思考如果发现了抖动的服务我们应该怎么办。如何判断服务是否恢复正常了。对于服务是否不稳定这一点我们一般可以通过一下3个方式进行判断。

1. 慢调用比例：当单位统计时长内请求数目大于设置的最小请求数目，并且超过最大忍受时间的请求大于阈值，则判断服务异常，触发熔断；
2. 异常比例：当单位统计时长内异常请求的比例大于阈值则我们判定服务异常，触发熔断；
3. 异常数：当单位时长内出现异常的请求的数量的达到阈值则判定服务异常，触发熔断；

当我们通过以上3个指标判断服务为异常并熔断服务后，对于一定时间内（熔断时长内）的请求我们可以选择直接报错，不阻塞上游服务，让请求方来自行决定如何处理。或者直接触发服务降级。服务降级粗略的可以理解为请求此业务的简版，该简版省掉了很多非核心流程，并且只是最终保证流程处理完（最终一致性）。和现实中的熔断一样服务熔断是会自动恢复的。一般是触发熔断后的一段时间内服务处于熔断状态不提供服务，然后进入半开状态，若接下来的少量请求没有报错且响应时间合理则服务恢复，如果还是异常则继续熔断。

# soul中的Sentinel插件

Sentinel是阿里开源的面向分布式服务架构的流量控制组件，主要以流量为切入点，从流量控制、熔断降级、系统自适应保护等多个维度来帮助您保障微服务的稳定性。Soul作为国内优秀的开源网关，将Sentinel整合为插件融入了自己的体系中，使用户通过简单的配置就可以使用Sentinel提供的流量控制和服务熔断功能。下面将简要介绍在soul中如何配置使用sentinel插件。

首先登陆soul管理平台在"插件列表" --> "sentinel"中配置插件。其中"选择器"的配置不是本文的重点不再介绍，点击"增加规则"来进行具体设置如下图。

![](https://rfc2616.oss-cn-beijing.aliyuncs.com/blog/soul16-02.png)

在这个配置页面中"名称"、"匹配方式"、"条件"、"日志打印"、"是否开启"、"执行顺序"属于soul插件的常规配置这里也不再赘述。我们重点需要关注的是"处理"中的配置项。这些配置项主要可以分为2组，前4个选项是关于熔断的配置，后4个选项是关于流量控制的配置。在soul中我们可以针对某一组请求同时设置它的流量控制和熔断策略。下面来重点分析下各个配置项如何使用。

## 熔断

首先来看熔断相关的配置，它有四个配置项"熔断阈值"、"是否开启熔断"、"熔断窗口大小"以及没有注名字的是服务异常判断方式。熔断开关表示是否开启熔断（1开\0不开）。熔断窗口大小指的是触发熔断后经过多少秒后进入半开状态，在半开状态如果请求正常则会进入正常状态如果请求依然不正常则继续熔断。熔断判定方式和熔断阈值需要结合来看。soul中使用了sentinel的3种服务异常判定方式。分别是：

1. 慢调用比例，在此模式下阈值指的是判定为慢调用的毫秒数。慢调用的比例默认是1不能更改即单位统计时长内全部超过阈值则触发熔断。该模式是sentinel的默认模式。
2. 异常比例，在此模式下阈值指的是单位统计时长内异常请求的比例上限，需要填写1个[0.0, 1.0]的数，表示0%-100%
3. 异常数策略，在该模式下阈值指的是单位统计时间内异常请求个数的上限。

需要注意的是soul对于单位统计时长（statIntervalMs）和熔断最小请求数（minRequestAmount）使用的是sentinel的默认参数。分别是1秒钟和5次。单位时长指定的是异常判断以是1秒钟为统计范围，下一秒重新开始计数。最小请求数指的是1秒钟内如果请求的次数少于5那么即使达到阈值也不会触发熔断。

![](https://rfc2616.oss-cn-beijing.aliyuncs.com/blog/soul16-03.png)

如上图配置表示的意思是，开启熔断配置，如果此服务在1秒钟内有5个请求都出现了异常那么则熔断10秒，10秒后进入如半开状态，如果请求都正常则变为正常状态，如果还不正常则继续熔断。熔断期间如果请求该服务则soul网关会直接返回请求错误，保护后端服务不会再接到请求。

## 流量控制

流量控制的相关配置有5个，从上到下从左到右分别是"流控效果"，"限流阈值"，"流控开关"，"限流阈值类型"。首先是限流类型，我们可以选择"QPS"或"并发线程数"，这个参数规定了我们从哪个角度来设置限流的阈值。阈值则是QPS的上限或者是线程数量，达到此阈值则会启动限流策略。具体的限流策略在"流控效果"中配置，流控策略里我们可以选择"直接拒绝"、"warm up（预热）"、"匀速排队"、"预热+匀速排队"。直接拒绝比较好理解，就是QPS或线程数达到阈值后，多余的请求直接报错返回。预热指的是在10秒钟内阈值逐步增长到指定阈值，即头2-3秒的阈值是低于设置阈值的，但阈值是逐步增长的，10秒后达到指定阈值，这样可以使系统有个预热过程。超过阈值的请求soul网关会直接报错返回。匀速队列这种模式会严格控制每个请求的时间间隔，如果流控类型是QPS阈值是10，那么soul会控制每100ms将1个请求传导到后端服务上。多余的请求首先会进入等待队列，每个请求最多等待500ms，如果请求预计等待时间超过500ms则直接报错返回。需要注意的是如果限流类型是并发线程数，那么流控效果只能是"直接拒绝"。如下图所示该配置表示的是soul网关会保证该服务的QPS不超过10，多余的请求将会直接报错。

![](https://rfc2616.oss-cn-beijing.aliyuncs.com/blog/soul16-04.png)

需要注意的是Sentinel组件独立运行于soul的每个网关中，如果网关是集群，那么在做流控时，实际传到后面服务中的量是需要乘上soul网关服务的数量的。即如果我们的soul网关部署了3个节点，通过nginx将所有请求平均负载到了每个节点上。对应1个接口我们配置的流控是10 qps，那么实际后向服务需要处理的QPS是10*3。熔断同样需要考虑这种情况，只有3个节点上某个服务都触发熔断时，那么该服务才不会再收到任何请求。

# Sentinel插件源码阅读

soul中Sentinel插件的源码主要有3块，"SentinelRuleHandle"负责处理当有Sentinel规则从管理节点同步过来时的处理逻辑，"SentinelPlugin"插件的处理逻辑，"SentinelFallbackHandler"对于触发了流控或熔断的处理逻辑。下面我一个个来看一下。首先是"SentinelRuleHandle"，源码如下：

```java
public class SentinelRuleHandle implements PluginDataHandler {
    
    @Override
    public void handlerRule(final RuleData ruleData) {
        // 处理新的sentinel配置
        SentinelHandle sentinelHandle = GsonUtils.getInstance().fromJson(ruleData.getHandle(), SentinelHandle.class);
        sentinelHandle.checkData(sentinelHandle);
        // 获取所有现有流控配置，删除与新配置同resourceName的配置
        List<FlowRule> flowRules = FlowRuleManager.getRules()
                .stream()
                .filter(r -> !r.getResource().equals(getResourceName(ruleData)))
                .collect(Collectors.toList());
        if (sentinelHandle.getFlowRuleEnable() == Constants.SENTINEL_ENABLE_FLOW_RULE) {
            // 如果开启了流控
            // 根据配置设置sentinel流控规则
            FlowRule rule = new FlowRule(getResourceName(ruleData));
            // 配置阈值
            rule.setCount(sentinelHandle.getFlowRuleCount());
            // 流控方式 QPS or 线程
            rule.setGrade(sentinelHandle.getFlowRuleGrade());
            // 流控行为: 0. default(reject directly), 1. warm up, 2. rate limiter, 3. warm up + rate limiter
            rule.setControlBehavior(sentinelHandle.getFlowRuleControlBehavior());
            flowRules.add(rule);
        }
        // 更新全部流控配置
        FlowRuleManager.loadRules(flowRules);
        // 获取所有现有熔断配置，删除与新配置同resourceName的配置
        List<DegradeRule> degradeRules = DegradeRuleManager.getRules()
                .stream()
                .filter(r -> !r.getResource().equals(getResourceName(ruleData)))
                .collect(Collectors.toList());
        if (sentinelHandle.getDegradeRuleEnable() == Constants.SENTINEL_ENABLE_DEGRADE_RULE) {
            // 如果开启了流控
            // 根据配置设置sentinel熔断规则
            DegradeRule rule = new DegradeRule(getResourceName(ruleData));
            // 熔断阈值
            rule.setCount(sentinelHandle.getDegradeRuleCount());
            // 熔断判断的依据 0: average RT, 1: exception ratio, 2: exception count
            rule.setGrade(sentinelHandle.getDegradeRuleGrade());
            // 熔断时间窗口
            rule.setTimeWindow(sentinelHandle.getDegradeRuleTimeWindow());
            degradeRules.add(rule);
        }
        // 更新全部熔断配置
        DegradeRuleManager.loadRules(degradeRules);
    }
    
    @Override
    public void removeRule(final RuleData ruleData) {
        // 删除指定规则
        FlowRuleManager.loadRules(FlowRuleManager.getRules()
                .stream()
                .filter(r -> !r.getResource().equals(getResourceName(ruleData)))
                .collect(Collectors.toList()));
        DegradeRuleManager.loadRules(DegradeRuleManager.getRules()
                .stream()
                .filter(r -> !r.getResource().equals(getResourceName(ruleData)))
                .collect(Collectors.toList()));
    }
    
    @Override
    public String pluginNamed() {
        return PluginEnum.SENTINEL.getName();
    }
    
    /**
     * return sentinel resource name.
     *
     * @param ruleData ruleData
     * @return string string
     */
    public static String getResourceName(final RuleData ruleData) {
        return ruleData.getSelectorId() + "_" + ruleData.getName();
    }
    
}
```

插件执行逻辑代码"SentinelPlugin"如下

```java
public class SentinelPlugin extends AbstractSoulPlugin {
    // 异常处理的handler
    private final SentinelFallbackHandler sentinelFallbackHandler;
    
    public SentinelPlugin(final SentinelFallbackHandler sentinelFallbackHandler) {
        this.sentinelFallbackHandler = sentinelFallbackHandler;
    }
    
    @Override
    protected Mono<Void> doExecute(final ServerWebExchange exchange, final SoulPluginChain chain, final SelectorData selector, final RuleData rule) {
        final SoulContext soulContext = exchange.getAttribute(Constants.CONTEXT);
        assert soulContext != null;
        // 从插件配置中生成sentinel使用的资源名称，该名称对应1个流控或熔断策略
        String resourceName = SentinelRuleHandle.getResourceName(rule);
        // 验证sentinel插件的配置信息
        SentinelHandle sentinelHandle = GsonUtils.getInstance().fromJson(rule.getHandle(), SentinelHandle.class);
        sentinelHandle.checkData(sentinelHandle);
        // 引入sentinel官方的Transformer，将请求交给sentinel处理
        return chain.execute(exchange).transform(new SentinelReactorTransformer<>(resourceName))
                .doOnSuccess(v -> {
                    HttpStatus status = exchange.getResponse().getStatusCode();
                    if (status == null || !status.is2xxSuccessful()) {
                        exchange.getResponse().setStatusCode(null);
                        throw new SentinelFallbackException(status == null ? HttpStatus.INTERNAL_SERVER_ERROR : status);
                    }
                })
                //sentinel 触发了流控或熔断而报错调用sentinelFallbackHandler返回错误信息
                .onErrorResume(throwable -> sentinelFallbackHandler.fallback(exchange, UriUtils.createUri(sentinelHandle.getFallbackUri()), throwable));
    }
    // 插件名sentinel
    @Override
    public String named() {
        return PluginEnum.SENTINEL.getName();
    }
    // 顺序 45 
    @Override
    public int getOrder() {
        return PluginEnum.SENTINEL.getCode();
    }
    
    public static class SentinelFallbackException extends HttpStatusCodeException {
        public SentinelFallbackException(final HttpStatus statusCode) {
            super(statusCode);
        }
    }
}
```

异常处理"SentinelFallbackHandler"，在soul中不管是熔断后请求的处理还是被流控的请求，都是有soul直接返回报错

```java
public class SentinelFallbackHandler implements FallbackHandler {
    
    @Override
    public Mono<Void> generateError(final ServerWebExchange exchange, final Throwable throwable) {
        Object error;
        
        if (throwable instanceof DegradeException) {
            // 触发熔断
            // http status 设为500
            exchange.getResponse().setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
            // request body 设置
            error = SoulResultWrap.error(SoulResultEnum.SERVICE_RESULT_ERROR.getCode(), SoulResultEnum.SERVICE_RESULT_ERROR.getMsg(), null);
        } else if (throwable instanceof FlowException) {
            // 流控报错 该错提示客户端再次尝试
            //  http status 设为429
            exchange.getResponse().setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
            // request body 设置
            error = SoulResultWrap.error(SoulResultEnum.TOO_MANY_REQUESTS.getCode(), SoulResultEnum.TOO_MANY_REQUESTS.getMsg(), null);
        } else if (throwable instanceof BlockException) {
            // FlowException的父类 该错提示服务已阻塞
            // http status 设为429
            exchange.getResponse().setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
            // request body 设置
            error = SoulResultWrap.error(SoulResultEnum.SENTINEL_BLOCK_ERROR.getCode(), SoulResultEnum.SENTINEL_BLOCK_ERROR.getMsg(), null);
        } else {
            return Mono.error(throwable);
        }
        return WebFluxResultUtils.result(exchange, error);
    }
}
```

# 总结

soul网关封装了优秀的流控组件——sentinel，为用户提供了好用的流量控制和熔断功能。需要注意的是soul在使用sentinel时部分参数是默认配置，如果有修改的需求则需要自行调整源码。其次soul网关可以分布式部署，但是使用sentinel时并没有用分布式流控，每个soul网关节点对于同一个资源的流控是独立但相同的。
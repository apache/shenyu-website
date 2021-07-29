---
title: "Apache ShenYu网关学习插件链实现"
author: "沈祥俊"
description: "Apache ShenYu网关学习插件链实现"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2021-01-21
cover: "/img/shenyu/blog6/mirco.png"
---

### 一、引言

**插件是 ShenYu 的灵魂。**

ShenYu 使用了插件化设计思想，实现了插件的热插拔，且极易扩展。内置丰富的插件支持，鉴权，限流，熔断，防火墙等等。

![image-20210122021834793](https://gitee.com/stephenshen/pic-bed/raw/master/img/20210122021834.png)

ShenYu 是如何实现插件化设计的呢？

在探究插件化设计之前，我们需要先了解下微内核架构（又称插件化架构）。



### 二、微内核架构

#### 1、架构释义

![img](/img/shenyu/blog6/mirco.png)

微内核架构也被称为插件化架构，是一种**面向功能进行拆分**的可扩展性架构，通常用于实现基于产品的应用。

应用逻辑被分割为独立的**插件模块**和**核心系统**，提供了可扩展性、灵活性、功能隔离和自定义处理逻辑的特性。

微内核架构的**本质**，是将变化封装在插件里面，从而达到快速灵活扩展的目的，而又不影响整体系统的稳定。



#### 2、设计关键点

核心系统设计的关键技术：

- **插件管理：**当前有哪些插件可用？如何加载这些插件？什么时候加载插件？

  常见的实现方法是插件注册表机制。

- **插件连接：**插件如何连接到核心系统？

  通常由核心系统制定连接规范，然后插件按照规范实现，核心系统按照规范加载即可。

  常见连接机制主要有：OSGi（Eclipse使用）、消息模式、依赖注入（Spring使用）。

- **插件通信：**插件与插件、插件与核心系统如何通信？

  通信必须经过核心系统，因此通常由核心系统提供插件通信机制。



### 三、ShenYu 的插件化设计

参照微内核架构来看，ShenYu 的 `soul-web` 模块相当于核心系统，`soul-plugin` 下的子模块相当于插件模块。

**插件管理方面：**

`soul-bootstrap` 模块的 pom 文件充当插件列表， 以硬编码的方式引入各插件。

在容器启动阶段，借助 springboot 的 starter 机制自动扫描并注册插件 bean 到 Spring 容器。

**插件连接方面：**

借助 springboot 支持的多实例自动注入能力（ObjectProvider<List> plugins），将插件 Bean 列表注入到网关的**插件链**，实现插件与网关的连接。

**插件通信方面：**

先在插件链初始化阶段完成插件排序，然后在插件处理时，借助贯穿整个插件链的 ServerWebExchange 完成向下游插件的定向传参，即某种意义上的插件通信机制。



### 四、ShenYu 的插件化实现

Apache ShenYu 网关中定义了一条插件链，所有的插件都在这条链上依次处理。

在探究插件链之前，我们先来看看插件实现。



#### 1、插件实现

ShenYu 中所有插件最终均继承自 SoulPlugin，其完整继承关系如下所示：

![SoulPlugin](https://gitee.com/stephenshen/pic-bed/raw/master/img/20210122022709.jpg)

可以看到，ShenYu 的插件生态极其丰富，正是如此丰富的插件支撑起了 Apache ShenYu 网关强大的扩展能力。

我们以常用的 DividePlugin 为例，分析插件内部所做工作。

DividePlugin 继承结构：

![DividePlugin](https://gitee.com/stephenshen/pic-bed/raw/master/img/20210122024517.jpg)

DividePlugin 继承自 AbstractSoulPlugin，最终实现了 SoulPlugin 接口。



1）先关注 SoulPlugin，该插件接口结构如下： 

![image-20210122025700589](https://gitee.com/stephenshen/pic-bed/raw/master/img/20210122025700.png)

- execute 方法：处理方法，需要传入 exchange交换区 和 SoulPluginChain插件链
- getOrder 方法：取得序号，用作插件排序
- named 方法：获得插件名
- skip 方法：判断是否跳过本次处理

每次处理时，将先进行 skip 判断，不跳过则执行 excute 处理方法。



2）再来看下 AbstractSoulPlugin，该抽象类结构如下：

![image-20210122030444704](https://gitee.com/stephenshen/pic-bed/raw/master/img/20210122030444.png)

重点关注 execute 方法，其核心代码如下：

```java
if (pluginData.getEnable()){
	// 获取插件数据
	final PluginData pluginData = BaseDataCache.getInstance().obtainPluginData(pluginName);
	// 获取选择器数据
	final Collection<SelectorData> selectors = BaseDataCache.getInstance().obtainSelectorData(pluginName);
	final SelectorData selectorData = matchSelector(exchange, selectors);
	// 获取规则
	final List<RuleData> rules = BaseDataCache.getInstance().obtainRuleData(selectorData.getId());
	RuleData rule;
  if (selectorData.getType() == SelectorTypeEnum.FULL_FLOW.getCode()) {
  	//get last
    rule = rules.get(rules.size() - 1);
  } else {
    rule = matchRule(exchange, rules);
  }
  // 执行具体处理
  return doExecute(exchange, chain, selectorData, rule);
}
// 继续执行后续插件处理
return chain.execute(exchange);
```

获取选择器数据和规则，然后传入 doExecute 方法进行具体处理，doExecute 方法为抽象方法，交由子类具体实现。



3）查看插件子类 DividePlugin，其结构如下：

![image-20210122032336069](https://gitee.com/stephenshen/pic-bed/raw/master/img/20210122032336.png)

重点关注 doExecute 方法，以下是核心代码：

```java
// 获取网关上下文和规则处理器
final SoulContext soulContext = exchange.getAttribute(Constants.CONTEXT);
final DivideRuleHandle ruleHandle = GsonUtils.getInstance().fromJson(rule.getHandle(), DivideRuleHandle.class);
// 获取上游列表
final List<DivideUpstream> upstreamList = UpstreamCacheManager.getInstance().findUpstreamListBySelectorId(selector.getId());
// 选择待分发的目标上游
final String ip = Objects.requireNonNull(exchange.getRequest().getRemoteAddress()).getAddress().getHostAddress();
DivideUpstream divideUpstream = LoadBalanceUtils.selector(upstreamList, ruleHandle.getLoadBalance(), ip);
// 设置 http url 
String domain = buildDomain(divideUpstream);
String realURL = buildRealURL(domain, soulContext, exchange);
exchange.getAttributes().put(Constants.HTTP_URL, realURL);
// 设置 http timeout
exchange.getAttributes().put(Constants.HTTP_TIME_OUT, ruleHandle.getTimeout());
exchange.getAttributes().put(Constants.HTTP_RETRY, ruleHandle.getRetry());
return chain.execute(exchange);
```

很明显，divide 插件只是完成目标上游服务的待分发，即根据选择器和规则找到对应服务，再通过负载均衡策略分配上游服务实例。

而调用上游服务的工作是由其他相应的 client 类插件完成。



#### 2、插件链实现

借由插件链，ShenYu 将众多插件整合到一起进行统一调度处理。

插件链继承结构：

![SoulPluginChain](https://gitee.com/stephenshen/pic-bed/raw/master/img/20210122035121.jpg)

可以看到，ShenYu 中插件链 SoulPluginChain 仅有一个默认实现类 DefaultSoulPluginChain。



1）DefaultSoulPluginChain 类结构如下：

![image-20210122040245671](https://gitee.com/stephenshen/pic-bed/raw/master/img/20210122040245.png)

其持有通过构造方法传入的插件链，看看 execute 方法：

```java
public Mono<Void> execute(final ServerWebExchange exchange) {
    // 反应式编程语法：Mono.defer
  	return Mono.defer(() -> {
        if (this.index < plugins.size()) {
            SoulPlugin plugin = plugins.get(this.index++);
            // 判断是否需要调过
          	Boolean skip = plugin.skip(exchange);
            if (skip) {
                return this.execute(exchange);
            }
          	// 依次执行插件处理逻辑
            return plugin.execute(exchange, this);
        }
        return Mono.empty();
    });
}
```

依次处理插件链上的插件，执行插件处理逻辑。

DefaultSoulPluginChain 是 SoulWebHandler 的内部类，看下 SoulWebHandler 的实现。



2）SoulWebHandler 结构如下：

![image-20210122035525261](https://gitee.com/stephenshen/pic-bed/raw/master/img/20210122035525.png)

SoulWebHandler 是 web 请求处理的起点，在此创建并开始插件链的处理。

同 DefaultSoulPluginChain 一样，SoulWebHandler 也是持有通过构造方法传入的插件链。

看看 handle 方法：

```java
public Mono<Void> handle(@NonNull final ServerWebExchange exchange) {
    MetricsTrackerFacade.getInstance().counterInc(MetricsLabelEnum.REQUEST_TOTAL.getName());
    Optional<HistogramMetricsTrackerDelegate> startTimer = MetricsTrackerFacade.getInstance().histogramStartTimer(MetricsLabelEnum.REQUEST_LATENCY.getName());
    return new DefaultSoulPluginChain(plugins).execute(exchange).subscribeOn(scheduler)
            .doOnSuccess(t -> startTimer.ifPresent(time -> MetricsTrackerFacade.getInstance().histogramObserveDuration(time)));
}
```

handle 方法负责插件链执行指标度量的采集，通过在 DefaultSoulPluginChain 执行时加订阅实现，DefaultSoulPluginChain 在此处完成初始化。

全局查找 SoulWebHandler 构造方法，定位到 SoulConfiguration 的 soulWebHandler 方法。



3）SoulConfiguration 结构如下：

![image-20210122042354171](https://gitee.com/stephenshen/pic-bed/raw/master/img/20210122042354.png)

SoulConfiguration 是 ShenYu 的核心配置类，负责自动装配网关所需的核心 bean 对象。

如装配 SoulWebHandler：

```java
@Bean("webHandler")
public SoulWebHandler soulWebHandler(final ObjectProvider<List<SoulPlugin>> plugins) {
    // 获取可用的插件
  	List<SoulPlugin> pluginList = plugins.getIfAvailable(Collections::emptyList);
    // 插件重排
  	final List<SoulPlugin> soulPlugins = pluginList.stream()
            .sorted(Comparator.comparingInt(SoulPlugin::getOrder)).collect(Collectors.toList());
    soulPlugins.forEach(soulPlugin -> log.info("load plugin:[{}] [{}]", soulPlugin.named(), soulPlugin.getClass().getName()));
    return new SoulWebHandler(soulPlugins);
}
```

注意此处的插件列表经过了一次重排，重排顺序参见 PluginEnum。



4）初始化 SoulWebHandler

soul-bootstrap 启动的过程中，所有插件是怎么形成 ObjectProvider<List<SoulPlugin>> plugins，然后初始化 SoulWebHandler 的呢？



SoulWebHandler 所在的配置类通过配置 @ComponentScan("org.dromara.soul")，通知 spring 扫描 org.dromara.soul 包。

借助 springboot 的 starter 机制，将 spring.factories 里指定的配置类自动加载到容器。

![DividePluginConfiguration](https://gitee.com/stephenshen/pic-bed/raw/master/img/20210122044810.png)

最后，借助 spring4.3 开始支持的 ObjectProvider，实现容器内插件 bean 的集合式注入，最终形成我们看到的插件链。



### 总结

本篇从微内核架构说起，并以此为框架分析 ShenYu 的插件化设计，再结合源码实现，基本理清了 ShenYu 中插件式设计的实现。

需要注意：

1）由 SoulConfiguration 自动装配 SoulWebHandler，此时 SoulWebHandler 持有插件列表，但未初始化插件链。

2）待调用 handle 方法处理请求时，才初始化插件链进入插件处理。
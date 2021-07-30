---
title: "Apache ShenYu网关学习divide插件源码解读"
author: "沈祥俊"
description: "Apache ShenYu网关学习divide插件源码解读"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2021-02-01
cover: "/img/shenyu/activite/shenyu-xmind.png"
---

## 插件概述



**插件定位**

divide 插件是一个 http 正向代理插件，所有的 http 请求都由该插件进行负载均衡处理（具体的负载均衡策略在规则中指定）。

**生效时机**

当请求头的 rpcType = http 且插件开启时，它将根据请求参数匹配规则，最终交由下游插件进行响应式代理调用。



## 插件处理流程



1）先回顾下请求处理类插件的通用流程（AbstractSoulPlugin # execute）：

```java
public Mono<Void> execute(final ServerWebExchange exchange, final SoulPluginChain chain) {
    // 获取插件数据
  	String pluginName = named();
    final PluginData pluginData = BaseDataCache.getInstance().obtainPluginData(pluginName);
    if (pluginData != null && pluginData.getEnabled()) {
        // 获取选择器数据
      	final Collection<SelectorData> selectors = BaseDataCache.getInstance().obtainSelectorData(pluginName);
        ...
        // 匹配选择器
        final SelectorData selectorData = matchSelector(exchange, selectors);
        ...
        // 获取规则数据
        final List<RuleData> rules = BaseDataCache.getInstance().obtainRuleData(selectorData.getId());
        ...
        // 匹配规则
        RuleData rule;
        if (selectorData.getType() == SelectorTypeEnum.FULL_FLOW.getCode()) {
            //get last
            rule = rules.get(rules.size() - 1);
        } else {
            rule = matchRule(exchange, rules);
        }
        ...
        // 执行自定义处理
        return doExecute(exchange, chain, selectorData, rule);
    }
  	// 继续执行插件链处理
    return chain.execute(exchange);
}
```

AbstractSoulPlugin 先匹配到对应的选择器和规则，匹配通过则执行插件的自定义处理。



2）再来看看 divide 插件的自定义处理流程（DividePlugin # doExecute）：

```java
protected Mono<Void> doExecute(final ServerWebExchange exchange, final SoulPluginChain chain, final SelectorData selector, final RuleData rule) {
    ...
  	// 准备规则处理对象（内部持有：负载均衡算法名、重试次数以及超时时间）
    final DivideRuleHandle ruleHandle = GsonUtils.getInstance().fromJson(rule.getHandle(), DivideRuleHandle.class);
  	// 获取选择器对应的可用服务列表
    final List<DivideUpstream> upstreamList = UpstreamCacheManager.getInstance().findUpstreamListBySelectorId(selector.getId());
    ...
    // 选择具体分发的服务实例ip（负载均衡）
    final String ip = Objects.requireNonNull(exchange.getRequest().getRemoteAddress()).getAddress().getHostAddress();
    DivideUpstream divideUpstream = LoadBalanceUtils.selector(upstreamList, ruleHandle.getLoadBalance(), ip);
    ...
    //设置 http url、超时时间以及重试次数
    String domain = buildDomain(divideUpstream);
    String realURL = buildRealURL(domain, soulContext, exchange);
    exchange.getAttributes().put(Constants.HTTP_URL, realURL);
    exchange.getAttributes().put(Constants.HTTP_TIME_OUT, ruleHandle.getTimeout());
    exchange.getAttributes().put(Constants.HTTP_RETRY, ruleHandle.getRetry());
  	// 继续执行插件链处理
    return chain.execute(exchange);
}
```

DividePlugin 先获取到选择器对应的可用服务列表，然后进行负载均衡选择即将分发的目标服务器实例ip，最后设置最终的 url、超时时间以及重试次数并交由插件链下游进行处理。

**注意：**

divide 插件自身只是负责根据选择器、规则和负载均衡策略选出待分发的服务器实例，并不直接向后端服务发起 http 请求。



## 主机探活

上面提到，divide 需要获取服务列表，看下获取的实现（UpstreamCacheManager # findUpstreamListBySelectorId）：

```java
public List<DivideUpstream> findUpstreamListBySelectorId(final String selectorId) {
    return UPSTREAM_MAP_TEMP.get(selectorId);
}
```

内部通过 UPSTREAM_MAP_TEMP 获取存活服务列表。



UpstreamCacheManager 内部维护了两份散列表：

- UPSTREAM_MAP：

  全量服务散列表，负责存放全量的上游服务信息，key 为 选择器 id，value 为使用相同选择器的服务列表。

- UPSTREAM_MAP_TEMP：

  临时服务散列表，负责存放活动的上游服务信息，key 为 选择器 id，value 为使用相同选择器的服务列表。



前面章节我们提到，数据同步时，submit 方法同时更新了 UPSTREAM_MAP 和 UPSTREAM_MAP_TEMP，但后续服务下线如何维护 UPSTREAM_MAP_TEMP 呢，一切还得从 ip 探活说起。



#### 3.1 探活时机

探活时机得从 UpstreamCacheManager 初始化说起：

```java
private UpstreamCacheManager() {
    // 探活开关检查
  	boolean check = Boolean.parseBoolean(System.getProperty("soul.upstream.check", "false"));
    if (check) {
      	// 启动定时探活任务
        new ScheduledThreadPoolExecutor(1, SoulThreadFactory.create("scheduled-upstream-task", false))
                .scheduleWithFixedDelay(this::scheduled,
                        30, Integer.parseInt(System.getProperty("soul.upstream.scheduledTime", "30")), TimeUnit.SECONDS);
    }
}
```

UpstreamCacheManager 初始化时，若探活开关打开，则创建定时探活任务，此处默认 30 秒执行一次。

此处共涉及到两个配置参数：

- soul.upstream.check	探活开关：默认为 ture，设置为false表示不检测
- soul.upstream.scheduledTime	探活时间间隔，默认10秒



#### 3.2 探活任务

1）接下来看看探活任务实现（UpstreamCacheManager # scheduled）：

```java
private void scheduled() {
    if (UPSTREAM_MAP.size() > 0) {
        UPSTREAM_MAP.forEach((k, v) -> {
          	// 活动检查
            List<DivideUpstream> result = check(v);
            if (result.size() > 0) {
                UPSTREAM_MAP_TEMP.put(k, result);
            } else {
                UPSTREAM_MAP_TEMP.remove(k);
            }
        });
    }
}
```

任务负责逐条遍历登记全量服务散列表，检查服务活性：

- 若存活数大于0，则更新存活服务散列表
- 否则，移除存活服务散列表相应内容



2）继续看服务列表活性检查处理（UpstreamCacheManager # check）：

```java
private List<DivideUpstream> check(final List<DivideUpstream> upstreamList) {
    List<DivideUpstream> resultList = Lists.newArrayListWithCapacity(upstreamList.size());
    for (DivideUpstream divideUpstream : upstreamList) {
        // 检查服务活性
      	final boolean pass = UpstreamCheckUtils.checkUrl(divideUpstream.getUpstreamUrl());
        if (pass) {
          	// 更新服务状态
            if (!divideUpstream.isStatus()) {
                divideUpstream.setTimestamp(System.currentTimeMillis());
                divideUpstream.setStatus(true);
                ...
            }
          	// 记录存活的服务
            resultList.add(divideUpstream);
        } else {
          	// 更新服务状态
            divideUpstream.setStatus(false);
            ...
        }
    }
    return resultList;
}
```

负责遍历服务列表，根据 url 检查各服务活性并登记存活的服务。



#### 3.3 活性检查

1）服务活性检查实现（UpstreamCheckUtils # checkUrl）：

```java
public static boolean checkUrl(final String url) {
    ...
    // 检查url是否为ip+端口格式
    if (checkIP(url)) {
      	// 处理 ip 和端口
        String[] hostPort;
        if (url.startsWith(HTTP)) {
            final String[] http = StringUtils.split(url, "\\/\\/");
            hostPort = StringUtils.split(http[1], Constants.COLONS);
        } else {
            hostPort = StringUtils.split(url, Constants.COLONS);
        }
      	// 测试主机是否可连通
        return isHostConnector(hostPort[0], Integer.parseInt(hostPort[1]));
    } else {
      	// 测试主机是否可达
        return isHostReachable(url);
    }
}
```

检查 url 是否为 ip + port 格式：

- 若为 ip + 端口格式，则测试主机是否可连接
- 否则，测试主机是否可达

2）测试主机是否可连接（UpstreamCheckUtils # isHostConnector）：

```java
private static boolean isHostConnector(final String host, final int port) {
    try (Socket socket = new Socket()) {
        socket.connect(new InetSocketAddress(host, port));
    } catch (IOException e) {
        return false;
    }
    return true;
}
```

通过 socket 的 connection 测试 ip 的连通性。

3）测试主机是否可达（UpstreamCheckUtils # isHostReachable）：

```java
private static boolean isHostReachable(final String host) {
    try {
        return InetAddress.getByName(host).isReachable(1000);
    } catch (IOException ignored) {
    }
    return false;
}
```

非 ip + 端口格式 url 尝试使用域名格式测试主机是否可达。

整体看下来，divide插件从缓存里拿到的服务器信息，来源于数据同步，由探活任务定期主动更新。



## 负载均衡

上面提到，divide 通过负载均衡算法挑选最终分发的服务 ip，看下负载均衡的实现（LoadBalanceUtils # selector）：

```java
public static DivideUpstream selector(final List<DivideUpstream> upstreamList, final String algorithm, final String ip) {
    LoadBalance loadBalance = ExtensionLoader.getExtensionLoader(LoadBalance.class).getJoin(algorithm);
    return loadBalance.select(upstreamList, ip);
}
```

内部使用 ExtensionLoader 实现 SPI 机制，然后通过算法名加载对应的负载均衡算法，执行负载均衡计算最终分发到的服务 ip。



soul网关里默认支持三种负载均衡策略

- HASH(需要计算，可能存在不均衡的情况)
- RANDOM(最简单最快，大量请求下几乎平均)
- ROUND_ROBIN(需要记录状态，有一定的影响，大数据量下随机和轮询并无太大结果上的差异)

默认为 RANDOM 随机算法，算法处理如下（RandomLoadBalance # doSelect）：

```java
public DivideUpstream doSelect(final List<DivideUpstream> upstreamList, final String ip) {
    int totalWeight = calculateTotalWeight(upstreamList);
    boolean sameWeight = isAllUpStreamSameWeight(upstreamList);
  	// 若权重不一致，则按总权重随机
    if (totalWeight > 0 && !sameWeight) {
        return random(totalWeight, upstreamList);
    }
  	// 按服务数随机
    return random(upstreamList);
}
```

判断服务列表内服务的权重是否一致：

- 若权重不一致，则按总权重随机
- 否则，按服务数随机



按总权重随机细节（RandomLoadBalance # random）：

```java
private DivideUpstream random(final int totalWeight, final List<DivideUpstream> upstreamList) {
    // 按总权重取随机数
    int offset = RANDOM.nextInt(totalWeight);
    // 确定随机值落在哪个段上
    for (DivideUpstream divideUpstream : upstreamList) {
        offset -= getWeight(divideUpstream);
        if (offset < 0) {
            return divideUpstream;
        }
    }
    return upstreamList.get(0);
}
```



## 总结

divide插件处理流程：

- 获取可用服务列表
  - 服务列表最初来自 `soul-admin` 数据同步
  - 可用服务列表默认每 30 秒主动探活更新

- 负载均衡
  - 扩展加载器加载目标负载均衡算法
  - 执行具体均衡策略
  - 返回一个最终选择的服务信息
- 设置最终服务的的url信息
- 交由插件链下游进行处理
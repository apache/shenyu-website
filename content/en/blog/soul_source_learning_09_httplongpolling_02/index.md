---
title: "Soul Gateway Learns Http Long Polling Analysis 02"
author: "zhuming"
description: "Soul Gateway Learns Http Long Polling Analysis"
categories: "Soul"
tags: ["Soul"]
date: 2021-01-27
cover: "/img/architecture/soul-framework.png"
---

## 后台与网关数据同步 (Http长轮询篇)

长轮询分析的最后一篇, 总结网关端的长轮询的实现, 以及数据流动方式.

网关端长轮询的流程总体也分两个模块: 一是启动时拉取, 二是轮询监听变化

## 网关启动时拉取数据

网关启动后, 会调用后台提供的接口拉取数据, 并将数据发送到各个插件的数据处理类中

下面展示下网关启动拉取数据的处理流程:
![01](/img/soul/zhuming/01.png)



这几个处理步骤被分散到下面这些类的方法协作中:

![02](/img/soul/zhuming/02.png)



HttpSyncDataService#start: 网关启动时, HttpSyncDataService 初始化会调用 `start()` 方法, 该方法会调用后台拉取数据, 并开启多个线程进行轮询监听 (这块在下个模块分析)

```java
public class HttpSyncDataService implements SyncDataService, AutoCloseable {
  
  private void start() {
    // 防止二次调用的CAS操作
    if (RUNNING.compareAndSet(false, true)) {
      // 这里是本次流程的重点, 调用拉取数据的方法
      this.fetchGroupConfig(ConfigGroupEnum.values());
      int threadSize = serverList.size();
      // 这里将在下个模块分析, 会根据后台集群开启线程轮询监听
      this.executor = new ThreadPoolExecutor(threadSize, threadSize, 60L, TimeUnit.SECONDS,
                                             new LinkedBlockingQueue<>(),
                                             SoulThreadFactory.create("http-long-polling", true));
      this.serverList.forEach(server -> this.executor.execute(new HttpLongPollingTask(server)));
    } else {
      log.info("soul http long polling was started, executor=[{}]", executor);
    }
  }
}
```



HttpSyncDataService#fetchGroupConfig: 作用仅是根据数据类型, 循环多次调用拉取数据方法(针对同一个后台会请求多次, 每次拉取某一种数据类型的信息), 这里的数据类型指的是 plugin、rule、selector 等

```java
private void fetchGroupConfig(final ConfigGroupEnum... groups) throws SoulException {
  for (int index = 0; index < this.serverList.size(); index++) {
    String server = serverList.get(index);
    try {
			// 根据传入的数据类型枚举, 多次调用拉取数据方法
      this.doFetchGroupConfig(server, groups);
      break;
    } catch (SoulException e) {
      if (index >= serverList.size() - 1) {
        throw e;
      }
      log.warn("fetch config fail, try another one: {}", serverList.get(index + 1));
    }
  }
}
```



HttpSyncDataService#doFetchGroupConfig: 请求后台的 `/configs/fetch` 接口, 拿到某个类型的数据, 并更新缓存. 更新缓存前会检测是否变动, 如果变动则结束, **数据未发生变动则睡眠30s** (由于是第一次启动, 数据为空的情况下肯定会更新缓存, 所以会直接结束)

```java
private void doFetchGroupConfig(final String server, final ConfigGroupEnum... groups) {
  StringBuilder params = new StringBuilder();
  for (ConfigGroupEnum groupKey : groups) {
    params.append("groupKeys").append("=").append(groupKey.name()).append("&");
  }
  // 具体请求路径, 拉取后台数据
  String url = server + "/configs/fetch?" + StringUtils.removeEnd(params.toString(), "&");
  log.info("request configs: [{}]", url);
  String json = null;
  try {
    json = this.httpClient.getForObject(url, String.class);
  } catch (RestClientException e) {
    String message = String.format("fetch config fail from server[%s], %s", url, e.getMessage());
    log.warn(message);
    throw new SoulException(message, e);
  }
  // 修改缓存信息
  boolean updated = this.updateCacheWithJson(json);
  // 判断是否修改, 修改则直接结束
  if (updated) {
    log.info("get latest configs: [{}]", json);
    return;
  }
  log.info("The config of the server[{}] has not been updated or is out of date. Wait for 30s to listen for changes again.", server);
  ThreadUtils.sleep(TimeUnit.SECONDS, 30);
}
```



HttpSyncDataService#updateCacheWithJson: 取出响应信息中的 `data` , 即变化的数据信息, 传给数据刷新工厂 DataRefreshFactory

```java
private DataRefreshFactory factory;

public HttpSyncDataService(...){
  this.factory = new DataRefreshFactory(pluginDataSubscriber, metaDataSubscribers, authDataSubscribers);
}

private boolean updateCacheWithJson(final String json) {
  JsonObject jsonObject = GSON.fromJson(json, JsonObject.class);
  JsonObject data = jsonObject.getAsJsonObject("data");
  return factory.executor(data);
}
```



DataRefreshFactory#executor: 将数据发送给各类数据刷新类 (这里没有去区别信息类型, 而是通知所有数据刷新类, 可考虑优化)

```java
public final class DataRefreshFactory {

  private static final EnumMap<ConfigGroupEnum, DataRefresh> ENUM_MAP = new EnumMap<>(ConfigGroupEnum.class);

  public DataRefreshFactory(final PluginDataSubscriber pluginDataSubscriber,
                              final List<MetaDataSubscriber> metaDataSubscribers,
                              final List<AuthDataSubscriber> authDataSubscribers) {
    // 注入各类型订阅器到 MAP 中
    ENUM_MAP.put(ConfigGroupEnum.PLUGIN, new PluginDataRefresh(pluginDataSubscriber));
    ENUM_MAP.put(ConfigGroupEnum.SELECTOR, new SelectorDataRefresh(pluginDataSubscriber));
    ENUM_MAP.put(ConfigGroupEnum.RULE, new RuleDataRefresh(pluginDataSubscriber));
    ENUM_MAP.put(ConfigGroupEnum.APP_AUTH, new AppAuthDataRefresh(authDataSubscribers));
    ENUM_MAP.put(ConfigGroupEnum.META_DATA, new MetaDataRefresh(metaDataSubscribers));
  }
  
  public boolean executor(final JsonObject data) {
    final boolean[] success = {false};
    // Tureen: 所有数据类型的 DataRefresh 全调用
    ENUM_MAP.values().parallelStream().forEach(dataRefresh -> success[0] = dataRefresh.refresh(data));
    return success[0];
  } 
}
```



AbstractDataRefresh#refresh: 判断是否要更新缓存, 若更新则调用各类型的 `refresh()` 方法

```java
@Override
public Boolean refresh(final JsonObject data) {
  boolean updated = false;
  JsonObject jsonObject = convert(data);
  if (null != jsonObject) {
    ConfigData<T> result = fromJson(jsonObject);
    if (this.updateCacheIfNeed(result)) {
      updated = true;
      // Turren: 调用 refresh
      refresh(result.getData());
    }
  }
  return updated;
}
```



PluginDataRefresh#refresh: 调用 plugin 的订阅器, 接下来会通知所有扩展插件的相关事件变动

```java
@Override
protected void refresh(final List<PluginData> data) {
  if (CollectionUtils.isEmpty(data)) {
    log.info("clear all plugin data cache");
    pluginDataSubscriber.refreshPluginDataAll();
  } else {
    pluginDataSubscriber.refreshPluginDataAll();
    // Turren: http同步, 调用插件数据订阅器
    data.forEach(pluginDataSubscriber::onSubscribe);
  }
}
```



## 网关轮询监听变化

网关启动时, 同时也开启了线程做后台监听请求, 监听请求做了while死循环来轮询, 在后台端会劫持住请求, 这块在后台总结中有具体分析 ([后台与网关数据同步 (Http长轮询篇 <二>)](https://blog.csdn.net/zm469568595/article/details/113207367)) 

下面展示下网关监听数据变动的整体流程:

![03](/img/soul/zhuming/03.png)





对应的实际代码实现如下:

![04](/img/soul/zhuming/04.png)



**网关端监听的流程实现都在 HttpSyncDataService 类中, 在最后会经由 `doFetchGroupConfig()` 传到到各类订阅器, 后面的流程与启动时的一致**



HttpSyncDataService#start: 启动线程执行 HttpLongPollingTask 这个 Runnable



HttpLongPollingTask#run: 开启循环调用轮询方法.

```java
@Override
public void run() {
  while (RUNNING.get()) {
    for (int time = 1; time <= retryTimes; time++) {
      try {
        doLongPolling(server);
      } catch (Exception e) {
        if (time < retryTimes) {
          log.warn("Long polling failed, tried {} times, {} times left, will be suspended for a while! {}",
                   time, retryTimes - time, e.getMessage());
          ThreadUtils.sleep(TimeUnit.SECONDS, 5);
          continue;
        }
        log.error("Long polling failed, try again after 5 minutes!", e);
        ThreadUtils.sleep(TimeUnit.MINUTES, 5);
      }
    }
  }
}
```



HttpLongPollingTask#doLongPolling: 得到监听请求的响应结果, 如果返回值中有变化的类型, 则调用数据拉取方法.

```java
private void doLongPolling(final String server) {
  // 从缓存中获取数据
  MultiValueMap<String, String> params = new LinkedMultiValueMap<>(8);
  for (ConfigGroupEnum group : ConfigGroupEnum.values()) {
    ConfigData<?> cacheConfig = factory.cacheConfigData(group);
    String value = String.join(",", cacheConfig.getMd5(), String.valueOf(cacheConfig.getLastModifyTime()));
    params.put(group.name(), Lists.newArrayList(value));
  }
  // 构建 http 请求信息
  HttpHeaders headers = new HttpHeaders();
  headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
  HttpEntity httpEntity = new HttpEntity(params, headers);
  String listenerUrl = server + "/configs/listener";
  log.debug("request listener configs: [{}]", listenerUrl);
  JsonArray groupJson = null;
  try {
    String json = this.httpClient.postForEntity(listenerUrl, httpEntity, String.class).getBody();
    groupJson = GSON.fromJson(json, JsonObject.class).getAsJsonArray("data");
  } catch (RestClientException e) {
    String message = String.format("listener configs fail, server:[%s], %s", server, e.getMessage());
    throw new SoulException(message, e);
  }
  // 得到变化的类型
  if (groupJson != null) {
    ConfigGroupEnum[] changedGroups = GSON.fromJson(groupJson, ConfigGroupEnum[].class);
    if (ArrayUtils.isNotEmpty(changedGroups)) {
      log.info("Group config changed: {}", Arrays.toString(changedGroups));
      // 拉取后台对应类型的数据
      this.doFetchGroupConfig(server, changedGroups);
    }
  }
}
```



LongPollingClient#doFetchGroupConfig: 

之前的启动里分析了这块的代码, 它与启动里最不同的点是, **如果拉取的数据与缓存比对后, 发现没有变化则睡眠30s, 会导致下次的监听延后30s**.

什么意思呢? 如果网关去 `fetch` 后台的数据, 拿回来比对后发现被骗了! 啥变化也没有, 就等30s 再启动下次监听, 这个期间如果后台发生数据变化肯定是没法通知到网关的. 

网关为什么这么做? 自然是为了防止大量的循环的无用拉取, 如果后台出现问题不断的通知数据变动, 但实际没有任何变动, 那么网关不延迟就会与后台产生大量无用的 网络IO 与 数据交换

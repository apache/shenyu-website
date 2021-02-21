---
title: "Soul网关学习Http长轮询解析01"
author: "朱明"
description: "Soul网关学习Http长轮询解析"
categories: "Soul"
tags: ["Soul"]
date: 2021-01-25
cover: "/img/architecture/soul-framework.png"
---

## 后台与网关数据同步 (Http长轮询篇)
### 配置
**后台信息模式切换**

在上篇分析 Zookeeper 同步的文章 ([Soul网关源码分析-11期](https://blog.csdn.net/zm469568595/article/details/113065463)) 中, 我们通过 DataSyncConfiguration 这个配置类做的切换, 这次有了经验, 直接贴配置

```yml
soul:
  sync:
    websocket:
      enabled: false
    http:
      enabled: true
```



**网关信息模式切换**

后台模式切换完成, 接下来就是网关, 继续照葫芦画瓢找到关键配置类上的参数设置. 这里也直接贴网关配置

```yml
soul:
  sync:
#		 websocket:
#			 urls: ws://localhost:9095/websocket
  http:
  	url: http://localhost:9095
```







### DataChangedListener 体系

后台数据初始化 DataSyncConfiguration 配置关键 Bean , 看看这里关于 Http 长轮询的 Bean

```java
@Configuration
public class DataSyncConfiguration {
  
  @Configuration
  @ConditionalOnProperty(name = "soul.sync.http.enabled", havingValue = "true")
  @EnableConfigurationProperties(HttpSyncProperties.class)
  static class HttpLongPollingListener {

    @Bean
    @ConditionalOnMissingBean(HttpLongPollingDataChangedListener.class)
    public HttpLongPollingDataChangedListener httpLongPollingDataChangedListener(final HttpSyncProperties httpSyncProperties) {
      return new HttpLongPollingDataChangedListener(httpSyncProperties);
    }
  }
}
```



HttpLongPollingDataChangedListener 继承自 AbstractDataChangedListener, 他们都实现自接口 DataChangedListener.

DataChangedListener 这个接口我们应该非常熟悉了, 它提供了众多不同数据类型变动的方法, 供 DataChangedEventDispatcher 调用, 这个类更是一个 "老朋友" 了, 作为一个中转站, 辛勤的**处理数据同步的事件分类及分发**

```java
public class DataChangedEventDispatcher implements ApplicationListener<DataChangedEvent>, InitializingBean {
  // 持有 DataChangedListener 集合
  private List<DataChangedListener> listeners;
  
  // 事件变动时, 通知 DataChangedListener 的不同事件类型的方法
  public void onApplicationEvent(final DataChangedEvent event) {
    for (DataChangedListener listener : listeners) {
      switch (event.getGroupKey()) {
        case APP_AUTH:
          listener.onAppAuthChanged((List<AppAuthData>) event.getSource(), event.getEventType());
          break;
        case PLUGIN:
          listener.onPluginChanged((List<PluginData>) event.getSource(), event.getEventType());
          break;
        case RULE:
          listener.onRuleChanged((List<RuleData>) event.getSource(), event.getEventType());
          break;
        case SELECTOR:
          listener.onSelectorChanged((List<SelectorData>) event.getSource(), event.getEventType());
          break;
        case META_DATA:
          listener.onMetaDataChanged((List<MetaData>) event.getSource(), event.getEventType());
          break;
        default:
          throw new IllegalStateException("Unexpected value: " + event.getGroupKey());
      }
    }
  }
}
```

```java
public interface DataChangedListener {
	
  default void onAppAuthChanged(List<AppAuthData> changed, DataEventTypeEnum eventType) {}

  default void onPluginChanged(List<PluginData> changed, DataEventTypeEnum eventType) {}

  default void onSelectorChanged(List<SelectorData> changed, DataEventTypeEnum eventType) {}

  default void onMetaDataChanged(List<MetaData> changed, DataEventTypeEnum eventType) {}

  default void onRuleChanged(List<RuleData> changed, DataEventTypeEnum eventType) {}
}
```



这两个的作用了解了, 那 AbstractDataChangedListener 又做了什么事情? 举个 onPluginChanged() 的例子:

```java
public abstract class AbstractDataChangedListener implements DataChangedListener, InitializingBean {
  
  protected static final ConcurrentMap<String, ConfigDataCache> CACHE = new ConcurrentHashMap<>();

	@Override
  public void onPluginChanged(final List<PluginData> changed, final DataEventTypeEnum eventType) {
    if (CollectionUtils.isEmpty(changed)) {
      return;
    }
    this.updatePluginCache();
    this.afterPluginChanged(changed, eventType);
  }
  
  // 修改缓存 (可重写)
  protected void updatePluginCache() {
    this.updateCache(ConfigGroupEnum.PLUGIN, pluginService.listAll());
  }
  
  protected <T> void updateCache(final ConfigGroupEnum group, final List<T> data) {
    String json = GsonUtils.getInstance().toJson(data);
    ConfigDataCache newVal = new ConfigDataCache(group.name(), json, Md5Utils.md5(json), System.currentTimeMillis());
    ConfigDataCache oldVal = CACHE.put(newVal.getGroup(), newVal);
    log.info("update config cache[{}], old: {}, updated: {}", group, oldVal, newVal);
  }
  
  // 钩子, 自定义结束数据变动后要干什么 (可重写)
  protected void afterPluginChanged(final List<PluginData> changed, final DataEventTypeEnum eventType) {
  }
}
```



对于一个插件数据变动方法 (onPluginChanged), 其实 AbstractDataChangedListener 就是定义了一个模板, 让子类可以按照指定步骤进行工作, 具体每个步骤的工作细节可以由子类自己实现.

其次, 如果不重写它的缓存更新, 就由这个类在 CACHE 中维护.







### 其他同步策略此时在干什么?

在 DataChangedEventDispatcher 调取 onPluginChanged() 之后, 长轮询模块会怎么实现呢?  **不妨先想想其他同步方式在此时做了什么**



举例 websocket 模式, 它自己重写了 onPluginChanged(), 发送 websocket 信息给持有会话, 其中就有网关.

```java
public class WebsocketDataChangedListener implements DataChangedListener {
  
	@Override
  public void onPluginChanged(final List<PluginData> pluginDataList, final DataEventTypeEnum eventType) {
    WebsocketData<PluginData> websocketData =
      new WebsocketData<>(ConfigGroupEnum.PLUGIN.name(), eventType.name(), pluginDataList);
    WebsocketCollector.send(GsonUtils.getInstance().toJson(websocketData), eventType);
  }
}
```



再看 zookeeper 模式, 它也重写了 onPluginChanged(), 去修改 zookeeper 上的节点信息, 这样网关端会监听到他们的节点变动.

```java
public class ZookeeperDataChangedListener implements DataChangedListener {
  
	@Override
  public void onPluginChanged(final List<PluginData> changed, final DataEventTypeEnum eventType) {
    for (PluginData data : changed) {
      String pluginPath = ZkPathConstants.buildPluginPath(data.getName());
      // delete
      if (eventType == DataEventTypeEnum.DELETE) {
        deleteZkPathRecursive(pluginPath);
        String selectorParentPath = ZkPathConstants.buildSelectorParentPath(data.getName());
        deleteZkPathRecursive(selectorParentPath);
        String ruleParentPath = ZkPathConstants.buildRuleParentPath(data.getName());
        deleteZkPathRecursive(ruleParentPath);
        continue;
      }
      //create or update
      insertZkNode(pluginPath, data);
    }
  }
}
```



可以知道, 到这个节骨眼, 其他同步策略已经在忙着通知网关了, 那 Http 长轮询也肯定要做这事.

这两个策略的通知方式也不同, websocket 是好人做到底, 直接找到 session 会话把信息亲自送过去. zookeeper 将节点信息改变后撒手不管, 网关自己监听到变更再做的同步.

那么我们的 Http 长轮询现在要以何种方式去通知网关呢? 接着看.







### 长轮询实现方式思考

先思考下我自己设计长轮询, 会怎么实现 ? 

正常的长轮询实现应该由网关主动请求, 后台接住这个请求并hold住, 如果有更新就直接返回, 没有就阻塞一定时间. 而后台则是做好数据的更新, hold住时检查数据是否有变化.

那这里涉及到三个点:

1. 数据怎样知道是有变化的, 是不是设置个最后更新时间, 与网关的请求时间比较, 得出是否有数据修改?
2. hold住之后, 后台怎么获知是否数据更新, 反复遍历还是阻塞等待?
3. 那些用于更新的数据放哪里, 用缓存的话, 考虑后台缓存与数据库的交互是怎样的.





### HttpLongPollingDataChangedListener 长轮询实现

围绕我们的思考, 看看 HttpLongPollingDataChangedListener 是如何实现的. 先看看关于父类 onPluginChanged() 这块的实现

```java
public class HttpLongPollingDataChangedListener extends AbstractDataChangedListener {
  
  private final ScheduledExecutorService scheduler;
  
  @Override
  protected void afterPluginChanged(final List<PluginData> changed, final DataEventTypeEnum eventType) {
    scheduler.execute(new DataChangeTask(ConfigGroupEnum.PLUGIN));
  }
}
```



Http 长轮询不会直接覆盖 onPluginChanged() 而是直接使用其父类的, 意味着使用了它的 CACHE, 那最终我们的信息获取肯定也少不了分析这个, 先暂放一边.

接下来的逻辑会调用到我们这块实现的 afterPluginChanged() 方法, 这里用了一个定时类型的线程池, 去跑一个 Runnable 类型的任务 DataChangeTask.

```java
class DataChangeTask implements Runnable {
  
  @Override
  public void run() {
    // 遍历 clients
    for (Iterator<LongPollingClient> iter = clients.iterator(); iter.hasNext();) {
      LongPollingClient client = iter.next();
      iter.remove();
      // 说明完成 response 响应了
      client.sendResponse(Collections.singletonList(groupKey));
      log.info("send response with the changed group,ip={}, group={}, changeTime={}", client.ip, groupKey, changeTime);
    }
  }
}
```



数据变动后使用线程池调到了这个方法, 拿取所有 `clients` , 一边遍历一边剔除元素, 且调用方法 sendResponse(), 像是标记已完成了响应.

我来猜测下它干了什么,  这里的 `clients` 很有可能就是网关被 hold 住的请求, 而 sendResponse() 则很有可能就是真的给请求上下文加了响应信息. 还有一个关键动作就是结束 hold, 让网关接收到响应信息, 并在集合中剔除这个请求.



我们现在追踪下 `client` 的产生, 它是 HttpLongPollingDataChangedListener 里的一个 BlockingQueue 阻塞队列, 在 LongPollingClient 中被定时检测

```java
class LongPollingClient implements Runnable {
  
  @Override
  public void run() {
    this.asyncTimeoutFuture = scheduler.schedule(() -> {
      clients.remove(LongPollingClient.this);
      List<ConfigGroupEnum> changedGroups = compareChangedGroup((HttpServletRequest) asyncContext.getRequest());
      sendResponse(changedGroups);
    }, timeoutTime, TimeUnit.MILLISECONDS);
    // 这里是关键, 表明来源
    clients.add(this);
  }
}
```



先不去分析这个 remove() 的检测代码块, 直接看到最后一句的 add(), 这里就是 `clients` 数据来源.

找到 LongPollingClient 被调用处, HttpLongPollingDataChangedListener#doLongPolling

```java
public void doLongPolling(final HttpServletRequest request, final HttpServletResponse response) {

  // ...

  // listen for configuration changed.
  // 开启同步阻塞请求
  final AsyncContext asyncContext = request.startAsync();

  // AsyncContext.settimeout() does not timeout properly, so you have to control it yourself
  asyncContext.setTimeout(0L);

  // block client's thread.
  // 线程池调用 LongPollingClient#run
  scheduler.execute(new LongPollingClient(asyncContext, clientIp, HttpConstants.SERVER_MAX_HOLD_TIMEOUT));
}
```



这里的最后一句会调用并添加 `client`, 这里有行关键代码阻塞住了请求:

````java
final AsyncContext asyncContext = request.startAsync();
````



而在 LongPollingClient#sendResponse 中, 刚刚也分析了, 除了包装注入响应信息, 还会将hold住的请求释放

```java
class LongPollingClient implements Runnable {
  
	void sendResponse(final List<ConfigGroupEnum> changedGroups) {
    // cancel scheduler
    if (null != asyncTimeoutFuture) {
      asyncTimeoutFuture.cancel(false);
    }
    generateResponse((HttpServletResponse) asyncContext.getResponse(), changedGroups);
    // 同步完成结束阻塞
    asyncContext.complete();
  }
}
```

 



这块分析完了再回到 doLongPolling(), 其中线程池调用这还有个关键点

```java
scheduler.execute(new LongPollingClient(asyncContext, clientIp, HttpConstants.SERVER_MAX_HOLD_TIMEOUT));
```



这里给 LongPollingClient 传入了 60S 的 timeout 时间, 做什么用的呢? 还记得我们在 LongPollingClient#run 时略过的一块代码吗

```java
class LongPollingClient implements Runnable {
  
  @Override
  public void run() {
    // 定时启动, 延迟时间根据 timeoutTime
    this.asyncTimeoutFuture = scheduler.schedule(() -> {
      // 移除管理的连接
      clients.remove(LongPollingClient.this);
      List<ConfigGroupEnum> changedGroups = compareChangedGroup((HttpServletRequest) asyncContext.getRequest());
      // 这个方法会将阻塞的请求释放
      sendResponse(changedGroups);
    }, timeoutTime, TimeUnit.MILLISECONDS);

    clients.add(this);
  }
}
```



这里我们已经搞懂了后台这块对长轮询流程的实现, 最后再看看 doLongPolling() 是怎么被调用到的, 找到调用类 ConfigController

```java
@ConditionalOnBean(HttpLongPollingDataChangedListener.class)
@RestController
@RequestMapping("/configs")
@Slf4j
public class ConfigController {
  
  @PostMapping(value = "/listener")
  public void listener(final HttpServletRequest request, final HttpServletResponse response) {
    longPollingListener.doLongPolling(request, response);
  }
}
```

看到这也基本明了, 后台通过这个 Controller 暴露 http 路径供网关调用并监听数据变化.







### 总结

* 后台通过 Controller 层暴露 API 给网关, 网关请求后台时后台并不是立即返回响应 (数据有无变化), 而是 hold 住请求最大 60 秒的时间. 这些被 hold 住的请求会加入到阻塞队列中作为内存缓存.
* 这 60 秒钟如果有数据变化, 通过 DataChangedEventDispatcher 分发到我们的 HttpLongPollingDataChangedListener , 则 **立即调用线程池** 在阻塞队列中遍历所有被 hold 住的请求, 塞入响应信息并释放掉.
* 如果 60 秒过后依然没有数据变化, hold 住的请求会被释放, 且阻塞队列的对应请求对象被剔除.



到这里, 我们已经理清它最最基本的长轮询逻辑, 那么对应下一开始的思考, 看有什么结论or疑惑.

> 1. 数据怎样知道是有变化的, 是不是设置个最后更新时间, 与网关的请求时间比较, 得出是否有数据修改?
> 2. hold住之后, 后台怎么获知是否数据更新, 反复遍历还是阻塞等待?
> 3. 那些用于更新的数据放哪里, 用缓存的话, 考虑后台缓存与数据库的交互是怎样的.



针对第 1 点, 我们是如何得知数据有变化的呢? 

* 目前我们分析的数据变动来源是 DataChangedEventDispatcher, 它可不仅仅只会在数据变动时告知我们信息, 每次手动点下后台同步这里立马就来调用了.

  那么这里肯定有新旧数据比对之类的东西了, 不然每次调用就直接把网关的阻塞请求放跑了, 这可不成, 白白的IO 消耗肯定不是个好设计.



针对第 2 点, 我们现在知道了模式是阻塞等待, 利用的是 `AsyncContext` 这种方式, 这块我也没有了解过, 会出个番外讨论一二.



针对第 3 点, 我们知道后台配置肯定修改完是要落盘到数据库的, 所以这块缓存与数据库的交互也是个值得分析的点. 这些疑问我会在下一章继续分析~




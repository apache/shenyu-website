---
title: "ShenYu Gateway Learns WebSocket Data Synchronization Analysis"
author: "fanjinpeng,zhuming"
description: "ShenYu Gateway Learns WebSocket Data Synchronization Analysis"
categories: "Soul"
tags: ["Soul"]
date: 2021-01-22
cover: "/img/architecture/soul-framework.png"
---

> Fanjinpeng

# 1.前情回顾

在第4篇中，我们分析了 HTTP 用户业务系统接入 ShenYu网关后，会调用 soul-admin 的注册接口，把需要网关代理的接口信息全部注册到 soul-admin 上，在最后，会通过 websocket 长连接，将soul-admin 接收到的接口信息同步给 ShenYu网关（即 soul-bootstrap），今天就来接着继续分析，数据是怎么同步到 soul-bootstrap 的。

不清楚流程的可以出门左转看下第4篇文章 [【Soul源码阅读】4.HTTP 用户接入 ShenYu调用 /soul-client/springmvc-register 接口逻辑分析](https://blog.csdn.net/hellboy0621/article/details/112727101)

# 2.soul-admin 与 soul-bootstrap 数据同步

这里为了验证数据同步流程，其实也没必要非得启动业务系统，完全可以只启动 soul-admin 和 soul-bootstrap 两个系统即可，可以在页面打开或关闭插件，看看这个流程是怎么实现的。

数据同步策略官网链接 https://dromara.org/zh-cn/docs/soul/user-dataSync.html

## 2.1 启动2个系统

都是按照项目默认启动的，无需修改任何配置文件。

## 2.2 页面操作查找接口

这里把 divide 插件启动，F12，看下前台会调用 soul-admin 哪个接口。

![open_divide_plugin](/img/soul/blog3/open_divide_plugin.png)

 可以看到前台向后台发送了一个 PUT 请求：http://localhost:9095/plugin/5 

## 2.3 后台接口

在项目中搜索这个接口

```java
// PluginController.java
@RestController
@RequestMapping("/plugin")
public class PluginController {
 
...
 
    /**
     * update plugin.
     *
     * @param id        primary key.
     * @param pluginDTO plugin.
     * @return {@linkplain SoulAdminResult}
     */
    @PutMapping("/{id}")
    public SoulAdminResult updatePlugin(@PathVariable("id") final String id, @RequestBody final PluginDTO pluginDTO) {
        Objects.requireNonNull(pluginDTO);
        pluginDTO.setId(id);
        final String result = pluginService.createOrUpdate(pluginDTO);
        if (StringUtils.isNoneBlank(result)) {
            return SoulAdminResult.error(result);
        }
        return SoulAdminResult.success(SoulResultMessage.UPDATE_SUCCESS);
    }
 
...
 
}
```

 进到实现类里 

```java
// PluginServiceImpl.java
/**
     * create or update plugin.
     *
     * @param pluginDTO {@linkplain PluginDTO}
     * @return rows
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public String createOrUpdate(final PluginDTO pluginDTO) {
        final String msg = checkData(pluginDTO);
        if (StringUtils.isNoneBlank(msg)) {
            return msg;
        }
        PluginDO pluginDO = PluginDO.buildPluginDO(pluginDTO);
        DataEventTypeEnum eventType = DataEventTypeEnum.CREATE;
        if (StringUtils.isBlank(pluginDTO.getId())) {
            pluginMapper.insertSelective(pluginDO);
        } else {
            eventType = DataEventTypeEnum.UPDATE;
            pluginMapper.updateSelective(pluginDO);
        }
 
        // publish change event.
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.PLUGIN, eventType,
                Collections.singletonList(PluginTransfer.INSTANCE.mapToData(pluginDO))));
        return StringUtils.EMPTY;
    }
```

 这里可以看出来，前半部分都是在操作数据库，把相关信息持久化；后半部分是发布了一个事件。  

## 2.4 发布事件

这里发布的事件用 DataChangedEvent 封装了一层，再看里面有1个枚举，这里有很多种类型：

```java
/**
 * configuration group.
 *
 * @author huangxiaofeng
 */
public enum ConfigGroupEnum {
 
    APP_AUTH,
 
    PLUGIN,
 
    RULE,
 
    SELECTOR,
 
    META_DATA;
 
...
 
}
```

看到这几种类型，如果对第4篇还有印象的话，可以看出当时发送事件的类型就是 SELECTOR 和 RULE，现在是 PLUGIN，虽然类型不同，但不影响我们继续分析后面的逻辑，我们继续。

另外一个 eventType 也是枚举，这里有 DELETE、CREATE、UPDATE、REFRESH、MYSELF 5种类型，此时是 UPDATE。

```java
/**
 * The enum Data event type.
 *
 * @author xiaoyu
 */
public enum DataEventTypeEnum {
    /**
     * delete event.
     */
    DELETE,
    /**
     * insert event.
     */
    CREATE,
    /**
     * update event.
     */
    UPDATE,
    /**
     * REFRESH data event type enum.
     */
    REFRESH,
    /**
     * Myself data event type enum.
     */
    MYSELF;
 
...
 
}
```

## 2.5 监听事件

找到监听事件的代码：

```java
// DataChangedEventDispatcher.java
@Component
public class DataChangedEventDispatcher implements ApplicationListener<DataChangedEvent>, InitializingBean {
 
    private ApplicationContext applicationContext;
 
    private List<DataChangedListener> listeners;
 
    public DataChangedEventDispatcher(final ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }
 
    @Override
    @SuppressWarnings("unchecked")
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
 
    @Override
    public void afterPropertiesSet() {
        Collection<DataChangedListener> listenerBeans = applicationContext.getBeansOfType(DataChangedListener.class).values();
        this.listeners = Collections.unmodifiableList(new ArrayList<>(listenerBeans));
    }
}
```

### 2.5.1 监听器注入

可以看到 DataChangedEventDispatcher 实现了 InitializingBean 接口，覆写了 afterPropertiesSet 方法，并且使用了 @Component，当 Spring 启动时，会在容器加载完成后调用这个覆写方法。
afterPropertiesSet 方法中，把 DataChangedListener 类型的 Bean 全部获取后，放到类属性 listeners 里。

那么问题来了，这些监听器是什么时候注入到容器中的呢？

先看下 DataChangedListener 接口定义：

```java
/**
 * Event listener, used to send notification of event changes,
 * used to support HTTP, websocket, zookeeper and other event notifications.
 *
 * @author huangxiaofeng
 * @author xiaoyu
 */
public interface DataChangedListener {
 
    /**
     * invoke this method when AppAuth was received.
     *
     * @param changed   the changed
     * @param eventType the event type
     */
    default void onAppAuthChanged(List<AppAuthData> changed, DataEventTypeEnum eventType) {
    }
 
    /**
     * invoke this method when Plugin was received.
     *
     * @param changed   the changed
     * @param eventType the event type
     */
    default void onPluginChanged(List<PluginData> changed, DataEventTypeEnum eventType) {
    }
 
    /**
     * invoke this method when Selector was received.
     *
     * @param changed   the changed
     * @param eventType the event type
     */
    default void onSelectorChanged(List<SelectorData> changed, DataEventTypeEnum eventType) {
    }
 
    /**
     * On meta data changed.
     *
     * @param changed   the changed
     * @param eventType the event type
     */
    default void onMetaDataChanged(List<MetaData> changed, DataEventTypeEnum eventType) {
 
    }
 
    /**
     * invoke this method when Rule was received.
     *
     * @param changed   the changed
     * @param eventType the event type
     */
    default void onRuleChanged(List<RuleData> changed, DataEventTypeEnum eventType) {
    }
 
}
```

可以看到接口中定义了5个方法，分别针对当监听到 appAuth、plugin、selector、metaData、rule 数据变动时对应的处理方法。

其继承关系：

![DataChangedListener](/img/soul/blog3/DataChangedListener.png)

 因为默认是采用的 websocket，这里的监听器对应的就是 WebsocketDataChangedListener，Alt + F7，搜索到这个类实例化的地方，就是如下的配置类： 

```java
// DataSyncConfiguration.java
@Configuration
public class DataSyncConfiguration {
 
    /**
     * http long polling.
     */
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
 
    /**
     * The type Zookeeper listener.
     */
    @Configuration
    @ConditionalOnProperty(prefix = "soul.sync.zookeeper", name = "url")
    @Import(ZookeeperConfiguration.class)
    static class ZookeeperListener {
        @Bean
        @ConditionalOnMissingBean(ZookeeperDataChangedListener.class)
        public DataChangedListener zookeeperDataChangedListener(final ZkClient zkClient) {
            return new ZookeeperDataChangedListener(zkClient);
        }
        @Bean
        @ConditionalOnMissingBean(ZookeeperDataInit.class)
        public ZookeeperDataInit zookeeperDataInit(final ZkClient zkClient, final SyncDataService syncDataService) {
            return new ZookeeperDataInit(zkClient, syncDataService);
        }
    }
 
    /**
     * The type Nacos listener.
     */
    @Configuration
    @ConditionalOnProperty(prefix = "soul.sync.nacos", name = "url")
    @Import(NacosConfiguration.class)
    static class NacosListener {
        @Bean
        @ConditionalOnMissingBean(NacosDataChangedListener.class)
        public DataChangedListener nacosDataChangedListener(final ConfigService configService) {
            return new NacosDataChangedListener(configService);
        }
    }
 
    /**
     * The WebsocketListener(default strategy).
     */
    @Configuration
    @ConditionalOnProperty(name = "soul.sync.websocket.enabled", havingValue = "true", matchIfMissing = true)
    @EnableConfigurationProperties(WebsocketSyncProperties.class)
    static class WebsocketListener {
        @Bean
        @ConditionalOnMissingBean(WebsocketDataChangedListener.class)
        public DataChangedListener websocketDataChangedListener() {
            return new WebsocketDataChangedListener();
        }
        @Bean
        @ConditionalOnMissingBean(WebsocketCollector.class)
        public WebsocketCollector websocketCollector() {
            return new WebsocketCollector();
        }
        @Bean
        @ConditionalOnMissingBean(ServerEndpointExporter.class)
        public ServerEndpointExporter serverEndpointExporter() {
            return new ServerEndpointExporter();
        }
    }
}
```

一共有4种同步数据策略，http长轮询、zookeeper、nacos、websocket（默认策略）。

看到 websocket 的注解 @ConditionalOnProperty(name = "soul.sync.websocket.enabled", havingValue = "true", matchIfMissing = true)，到配置文件中找到如下配置：

```yaml
soul:
  sync:
    websocket:
      enabled: true
```

到这里就真相大白了。

如果不想使用 websocket 的默认同步策略，在配置文件中写上对应的配置即可。

### 2.5.2 监听事件处理逻辑

为了防止大家再翻回去看，不方便，我这里再把处理逻辑代码贴出来：

```java
// DataChangedEventDispatcher.java
@Override
    @SuppressWarnings("unchecked")
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
```

这里遍历所有的监听器，对于目前的 websocket 只会有一个监听器，其他多个的情况暂时不知道什么时候会出现，这里存疑，后续碰到相关的 case 时再回来补充（// TODO）。

根据发布事件的类型走不同的逻辑，这里分的类型跟 DataChangedListener 接口中定义的方法一一对应。

这里的 listener 是 WebsocketDataChangedListener 的实例，会进到类中对应的方法：

```java
// WebsocketDataChangedListener.java
public class WebsocketDataChangedListener implements DataChangedListener {
 
    @Override
    public void onPluginChanged(final List<PluginData> pluginDataList, final DataEventTypeEnum eventType) {
        WebsocketData<PluginData> websocketData =
                new WebsocketData<>(ConfigGroupEnum.PLUGIN.name(), eventType.name(), pluginDataList);
        WebsocketCollector.send(GsonUtils.getInstance().toJson(websocketData), eventType);
    }
 
    @Override
    public void onSelectorChanged(final List<SelectorData> selectorDataList, final DataEventTypeEnum eventType) {
        WebsocketData<SelectorData> websocketData =
                new WebsocketData<>(ConfigGroupEnum.SELECTOR.name(), eventType.name(), selectorDataList);
        WebsocketCollector.send(GsonUtils.getInstance().toJson(websocketData), eventType);
    }
 
    @Override
    public void onRuleChanged(final List<RuleData> ruleDataList, final DataEventTypeEnum eventType) {
        WebsocketData<RuleData> configData =
                new WebsocketData<>(ConfigGroupEnum.RULE.name(), eventType.name(), ruleDataList);
        WebsocketCollector.send(GsonUtils.getInstance().toJson(configData), eventType);
    }
 
    @Override
    public void onAppAuthChanged(final List<AppAuthData> appAuthDataList, final DataEventTypeEnum eventType) {
        WebsocketData<AppAuthData> configData =
                new WebsocketData<>(ConfigGroupEnum.APP_AUTH.name(), eventType.name(), appAuthDataList);
        WebsocketCollector.send(GsonUtils.getInstance().toJson(configData), eventType);
    }
 
    @Override
    public void onMetaDataChanged(final List<MetaData> metaDataList, final DataEventTypeEnum eventType) {
        WebsocketData<MetaData> configData =
                new WebsocketData<>(ConfigGroupEnum.META_DATA.name(), eventType.name(), metaDataList);
        WebsocketCollector.send(GsonUtils.getInstance().toJson(configData), eventType);
    }
 
}
```

看到代码中，将数据封装为 WebsocketData 后，使用 WebsocketController.send 方法发送出去了。

## 2.6 同步数据给 soul-bootstrap

```java
// WebsocketCollector.java
@Slf4j
@ServerEndpoint("/websocket")
public class WebsocketCollector {
 
    private static final Set<Session> SESSION_SET = new CopyOnWriteArraySet<>();
 
    private static final String SESSION_KEY = "sessionKey";
 
    /**
     * On open.
     *
     * @param session the session
     */
    @OnOpen
    public void onOpen(final Session session) {
        log.info("websocket on open successful....");
        SESSION_SET.add(session);
    }
 
    /**
     * On message.
     *
     * @param message the message
     * @param session the session
     */
    @OnMessage
    public void onMessage(final String message, final Session session) {
        if (message.equals(DataEventTypeEnum.MYSELF.name())) {
            try {
                ThreadLocalUtil.put(SESSION_KEY, session);
                SpringBeanUtils.getInstance().getBean(SyncDataService.class).syncAll(DataEventTypeEnum.MYSELF);
            } finally {
                ThreadLocalUtil.clear();
            }
        }
    }
 
    /**
     * On close.
     *
     * @param session the session
     */
    @OnClose
    public void onClose(final Session session) {
        SESSION_SET.remove(session);
        ThreadLocalUtil.clear();
    }
 
    /**
     * On error.
     *
     * @param session the session
     * @param error   the error
     */
    @OnError
    public void onError(final Session session, final Throwable error) {
        SESSION_SET.remove(session);
        ThreadLocalUtil.clear();
        log.error("websocket collection error: ", error);
    }
 
    /**
     * Send.
     *
     * @param message the message
     * @param type    the type
     */
    public static void send(final String message, final DataEventTypeEnum type) {
        if (StringUtils.isNotBlank(message)) {
            if (DataEventTypeEnum.MYSELF == type) {
                try {
                    Session session = (Session) ThreadLocalUtil.get(SESSION_KEY);
                    if (session != null) {
                        session.getBasicRemote().sendText(message);
                    }
                } catch (IOException e) {
                    log.error("websocket send result is exception: ", e);
                }
                return;
            }
            for (Session session : SESSION_SET) {
                try {
                    session.getBasicRemote().sendText(message);
                } catch (IOException e) {
                    log.error("websocket send result is exception: ", e);
                }
            }
        }
    }
}
```

WebsocketController 使用了 @ServerEndpoint("/websocket") 注解，开启了一个 websocket 服务接口，等待连接。

当 soul-bootstrap 启动后，会连接这个 websocket，这时触发 onOpen 方法，将此次连接信息的 Session 存放在 SESSION_SET 这个 Set 集合里。

在 send 方法中，会先判断 DataEventTypeEnum type 是不是 MYSELF，这个 type 可以追溯到 2.3-2.4，此次是 UPDATE，关于什么时候是 MYSELF，还需要后续补充，此处存疑（// TODO）。

下面的 for 循环遍历所有的 websocket 连接 Session，发送变动数据。

到这里，默认的 websocket 同步数据策略就分析清楚了。

> Zhuming

## 后台与网关数据同步 (Websocket篇)

### 后台如何建立Websocket?

![05](/img/soul/blog1/05.png)
DataSyncConfiguration: 作为 Spring Bean 的配置工厂, 可以根据配置信息, 构建各类监听器, 包括 HTTP 长轮询方式、Zookeeper 方式、Nacos 方式、Websocket 方法.

```java
@Configuration
public class DataSyncConfiguration {
  
  // soul-admin 项目的配置信息中, 使用 soul.sync.websocket.enabled 开启或关闭 websocket
  @Configuration
  @ConditionalOnProperty(name = "soul.sync.websocket.enabled", havingValue = "true", matchIfMissing = true)
  @EnableConfigurationProperties(WebsocketSyncProperties.class)
  static class WebsocketListener {
    
    @Bean
    @ConditionalOnMissingBean(WebsocketCollector.class)
    public WebsocketCollector websocketCollector() {
      return new WebsocketCollector();
    }
  }
}
```

WebsocketListener: 作为 `DataSyncConfiguration` 的内部类, 负责 websocket 监听器初始化.
WebsocketCollector: 监听 websocket 连接及接收信息, 维护所有连接后台的 session 会话, 提供 `send()` 方法通知 session 信息.

### 网关如何建立Websocket? 

![06](/img/soul/blog1/06.png)



WebsocketSyncDataConfiguration: 作为 Spring Bean 的配置工厂, 是网关端构建 Websocket 通信的入口. (独立出一个启动项目 `soul-spring-boot-starter-sync-data-websocket` , 供网关自由选用)

```java
@Configuration
@ConditionalOnClass(WebsocketSyncDataService.class)
@ConditionalOnProperty(prefix = "soul.sync.websocket", name = "urls")
@Slf4j
public class WebsocketSyncDataConfiguration {
  
  // 收集所有注册为 Bean 的订阅器,  如 PluginDataSubscriber、MetaDataSubscriber、AuthDataSubscriber
  @Bean
  public SyncDataService websocketSyncDataService(final ObjectProvider<WebsocketConfig> websocketConfig, final ObjectProvider<PluginDataSubscriber> pluginSubscriber, final ObjectProvider<List<MetaDataSubscriber>> metaSubscribers, final ObjectProvider<List<AuthDataSubscriber>> authSubscribers) {
    log.info("you use websocket sync ShenYu data.......");
    return new WebsocketSyncDataService(websocketConfig.getIfAvailable(WebsocketConfig::new), pluginSubscriber.getIfAvailable(), metaSubscribers.getIfAvailable(Collections::emptyList), authSubscribers.getIfAvailable(Collections::emptyList));
  }
  
  // soul-bootstrap 项目的配置信息中, 使用 soul.sync.websocket 配置要建立连接的后台路径
  @Bean
  @ConfigurationProperties(prefix = "soul.sync.websocket")
  public WebsocketConfig websocketConfig() {
    return new WebsocketConfig();
  }
}
```

WebsocketSyncDataService: 获取所有注册为 Bean 的 `WebsocketConfig` 以及各种 `DataSubscriber` 订阅器, 构建实现了 `WebsocketClient` 的 `SoulWebsocketClient` 列表

SoulWebsocketClient: `Websocket` 通信类, 监听 websocket 连接及接收信息, 在接收到后台传来的信息后会通知各个订阅器.

```java
public final class SoulWebsocketClient extends WebSocketClient {
  
  private final WebsocketDataHandler websocketDataHandler;
  
	private void handleResult(final String result) {
    WebsocketData websocketData = GsonUtils.getInstance().fromJson(result, WebsocketData.class);
    ConfigGroupEnum groupEnum = ConfigGroupEnum.acquireByName(websocketData.getGroupType());
    // 根据传入信息得到数据变更的事件类型, 如 refresh、update、delete 等
    String eventType = websocketData.getEventType();
    String json = GsonUtils.getInstance().toJson(websocketData.getData());
    websocketDataHandler.executor(groupEnum, json, eventType);
  }
}
```

WebsocketDataHandler: 初始化时构建各类实现 `AbstractDataHandler` 的数据处理类并缓存. 

```java
public class WebsocketDataHandler {
  
  // 缓存所有 DataHandler 数据变动处理类
  private static final EnumMap<ConfigGroupEnum, DataHandler> ENUM_MAP = new EnumMap<>(ConfigGroupEnum.class);

  public WebsocketDataHandler(final PluginDataSubscriber pluginDataSubscriber,
                              final List<MetaDataSubscriber> metaDataSubscribers,
                              final List<AuthDataSubscriber> authDataSubscribers) {
    ENUM_MAP.put(ConfigGroupEnum.PLUGIN, new PluginDataHandler(pluginDataSubscriber));
    ENUM_MAP.put(ConfigGroupEnum.SELECTOR, new SelectorDataHandler(pluginDataSubscriber));
    ENUM_MAP.put(ConfigGroupEnum.RULE, new RuleDataHandler(pluginDataSubscriber));
    ENUM_MAP.put(ConfigGroupEnum.APP_AUTH, new AuthDataHandler(authDataSubscribers));
    ENUM_MAP.put(ConfigGroupEnum.META_DATA, new MetaDataHandler(metaDataSubscribers));
  }

  public void executor(final ConfigGroupEnum type, final String json, final String eventType) {
    // 根据数据变动事件类型, 调用相应的 DataHandler 数据处理类
    ENUM_MAP.get(type).handle(json, eventType);
  }
}
```
### 网关数据变动调用链

实现 Websocket 通信的入口类 `SoulWebsocketClient` 在接到后台通信后, 调用 `WebsocketDataHandler` 的 `executor()` 方法匹配信息类型, 并调用对应的 `DataHandler` 的 `handler()` 去处理信息.

![07](/img/soul/blog1/07.png)

AbstractDataHandler: 实现 `handler()` 方法, 根据事件的类型 (如刷新、更新、创建、删除等), 调用对应事件抽象方法.

```java
public abstract class AbstractDataHandler<T> implements DataHandler {

  // 根据数据的事件类型 (eventType) 分发到各自方法, 这些被调用的方法由子类实现, 因为不同类型的元数据处理类的处理方式不同
  @Override
  public void handle(final String json, final String eventType) {
    List<T> dataList = convert(json);
    if (CollectionUtils.isNotEmpty(dataList)) {
      DataEventTypeEnum eventTypeEnum = DataEventTypeEnum.acquireByName(eventType);
      switch (eventTypeEnum) {
        case REFRESH:
        case MYSELF:
          doRefresh(dataList);
          break;
        case UPDATE:
        case CREATE:
          doUpdate(dataList);
          break;
        case DELETE:
          doDelete(dataList);
          break;
        default:
          break;
      }
    }
  }
}
```

XXXDataHandler: 这里指的是 `AbstractDataHandler` 的各个实现类 (如 `PluginDataHandler` 等), 主要作用是调用其订阅器. 

不同的 `DataHandler` 调用的订阅方法不同:

* `PluginDataHandler` 会调用 `onSubscribe()` 通知插件元数据变更
* `SelectorDataHandler` 会调用 `onSelectorSubscribe()` 通知选择器元数据变更
* `RuleDataHandler` 会调用 `onRuleSubscribe()` 通知规则元数据变更

```java
@RequiredArgsConstructor
public class PluginDataHandler extends AbstractDataHandler<PluginData> {
  
  private final PluginDataSubscriber pluginDataSubscriber;
  
  @Override
  protected void doUpdate(final List<PluginData> dataList) {
    // 调用订阅器的 onSubscribe(), 发送数据对象 PluginData
    dataList.forEach(pluginDataSubscriber::onSubscribe);
  }
  
  // ...
}
```

CommonPluginDataSubscriber: 订阅器的 `onSubscribe()` 方法会通知到所有注入为 Bean 的 `PluginDataHandler` 类 (不要和前面的同名类混淆, 它是 `soul-plugin-base` 下的接口, 它的实现类在各个可插拔插件包)

![image-20210122172333111](/img/soul/blog1/image-20210122172333111.png)

```java
public class CommonPluginDataSubscriber implements PluginDataSubscriber {
  
  // 收集所有注册为 Bean 的数据处理器并缓存, 比如 HTTP 插件 divide 下的 DividePluginDataHandler
  private final Map<String, PluginDataHandler> handlerMap;
  
  // 插件元数据变动调用
  @Override
  public void onSubscribe(final PluginData pluginData) {
    BaseDataCache.getInstance().cachePluginData(pluginData);
    Optional.ofNullable(handlerMap.get(pluginData.getName())).ifPresent(handler -> handler.handlerPlugin(pluginData));
  }
  
  // 选择器元数据变动调用
  @Override
  public void onSelectorSubscribe(final SelectorData selectorData) {
    BaseDataCache.getInstance().cacheSelectData(selectorData);
    Optional.ofNullable(handlerMap.get(selectorData.getPluginName())).ifPresent(handler -> handler.handlerSelector(selectorData));
  }
  
  // 规则元数据变动调用
  @Override
  public void onRuleSubscribe(final RuleData ruleData) {
    BaseDataCache.getInstance().cacheRuleData(ruleData);
    Optional.ofNullable(handlerMap.get(ruleData.getPluginName())).ifPresent(handler -> handler.handlerRule(ruleData));
  }
}
```

### TIPS

整个大项目下存在两个同名的类 PluginDataHandler, 其中一个在项目 `soul-sync-data-websocket` 下, 用于通知插件元数据变更, 另一个在 `soul-plugin-base` 下, 用于定义各个插件的各个类型元数据更新. 

总结下这两个类命名的意义, **`soul-sync-data-websocket` 下类名的 "plugin" 指元数据的类型为插件类, `soul-plugin-base` 下类名的 "plugin" 指继承它的子类来自与各个可插播插件, 比如divide、dubbo插件等**

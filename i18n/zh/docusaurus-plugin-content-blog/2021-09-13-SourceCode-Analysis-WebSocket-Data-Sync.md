---
slug: code-analysis-websocket-data-sync
title: WebSocket数据同步源码分析
author: Liu Liang
author_title: Apache ShenYu Committer
author_url: https://github.com/midnight2104
tags: [websocket,data sync,Apache ShenYu]
---


在`ShenYu`网关中，数据同步是指，当在后台管理系统中，数据发送了更新后，如何将更新的数据同步到网关中。`Apache ShenYu` 网关当前支持`ZooKeeper`、`WebSocket`、`Http长轮询`、`Nacos` 、`etcd` 和 `Consul` 进行数据同步。本文的主要内容是基于`WebSocket`的数据同步源码分析。

> 本文基于`shenyu-2.4.0`版本进行源码分析，官网的介绍请参考 [数据同步原理](https://shenyu.apache.org/zh/docs/design/data-sync) 。


### 1. 关于WebSocket通信

`WebSocket`协议诞生于`2008`年，在`2011`年成为国际标准。它可以双向通信，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息。`WebSocket`协议建立在 `TCP` 协议之上，属于应用层，性能开销小，通信高效，协议标识符是`ws`。


### 2. Admin数据同步

我们从一个实际案例进行源码追踪，比如在后台管理系统中，新增一条选择器数据：

![](/img/activities/code-analysis-websocket-data-sync/add-selector.png)

#### 2.1 接收数据

- SelectorController.createSelector()

进入`SelectorController`类中的`createSelector()`方法，它负责数据的校验，添加或更新数据，返回结果信息。

```java
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/selector")
public class SelectorController {
    
    @PostMapping("")
    public ShenyuAdminResult createSelector(@Valid @RequestBody final SelectorDTO selectorDTO) { // @Valid 数校验
        // 添加或更新数据
        Integer createCount = selectorService.createOrUpdate(selectorDTO);
        // 返回结果信息
        return ShenyuAdminResult.success(ShenyuResultMessage.CREATE_SUCCESS, createCount);
    }
    
    // ......
}
```



#### 2.2 处理数据

- SelectorServiceImpl.createOrUpdate()

在`SelectorServiceImpl`类中通过`createOrUpdate()`方法完成数据的转换，保存到数据库，发布事件，更新`upstream`。

```java
@RequiredArgsConstructor
@Service
public class SelectorServiceImpl implements SelectorService {
    // 负责事件发布的eventPublisher
    private final ApplicationEventPublisher eventPublisher;
    
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int createOrUpdate(final SelectorDTO selectorDTO) {
        int selectorCount;
        // 构建数据 DTO --> DO
        SelectorDO selectorDO = SelectorDO.buildSelectorDO(selectorDTO);
        List<SelectorConditionDTO> selectorConditionDTOs = selectorDTO.getSelectorConditions();
        // 判断是添加还是更新
        if (StringUtils.isEmpty(selectorDTO.getId())) {
            // 插入选择器数据
            selectorCount = selectorMapper.insertSelective(selectorDO);
            // 插入选择器中的条件数据
            selectorConditionDTOs.forEach(selectorConditionDTO -> {
                selectorConditionDTO.setSelectorId(selectorDO.getId());
                selectorConditionMapper.insertSelective(SelectorConditionDO.buildSelectorConditionDO(selectorConditionDTO));
            });
            // check selector add
            // 权限检查
            if (dataPermissionMapper.listByUserId(JwtUtils.getUserInfo().getUserId()).size() > 0) {
                DataPermissionDTO dataPermissionDTO = new DataPermissionDTO();
                dataPermissionDTO.setUserId(JwtUtils.getUserInfo().getUserId());
                dataPermissionDTO.setDataId(selectorDO.getId());
                dataPermissionDTO.setDataType(AdminConstants.SELECTOR_DATA_TYPE);
                dataPermissionMapper.insertSelective(DataPermissionDO.buildPermissionDO(dataPermissionDTO));
            }

        } else {
            // 更新数据，先删除再新增
            selectorCount = selectorMapper.updateSelective(selectorDO);
            //delete rule condition then add
            selectorConditionMapper.deleteByQuery(new SelectorConditionQuery(selectorDO.getId()));
            selectorConditionDTOs.forEach(selectorConditionDTO -> {
                selectorConditionDTO.setSelectorId(selectorDO.getId());
                SelectorConditionDO selectorConditionDO = SelectorConditionDO.buildSelectorConditionDO(selectorConditionDTO);
                selectorConditionMapper.insertSelective(selectorConditionDO);
            });
        }
        // 发布事件
        publishEvent(selectorDO, selectorConditionDTOs);

        // 更新upstream
        updateDivideUpstream(selectorDO);
        return selectorCount;
    }
    
    
    // ......
    
}

```

在`Service`类完成数据的持久化操作，即保存数据到数据库，这个大家应该很熟悉了，就不展开。关于更新`upstream`操作，放到后面对应的章节中进行分析，重点关注发布事件的操作，它会进行数据同步。



`publishEvent()`方法的逻辑是：找到选择器对应的插件，构建条件数据，发布变更数据。

```java
       private void publishEvent(final SelectorDO selectorDO, final List<SelectorConditionDTO> selectorConditionDTOs) {
        // 找到选择器对应的插件
        PluginDO pluginDO = pluginMapper.selectById(selectorDO.getPluginId());
        // 构建条件数据
        List<ConditionData> conditionDataList =                selectorConditionDTOs.stream().map(ConditionTransfer.INSTANCE::mapToSelectorDTO).collect(Collectors.toList());
        // 发布变更数据
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.SELECTOR, DataEventTypeEnum.UPDATE,
                Collections.singletonList(SelectorDO.transFrom(selectorDO, pluginDO.getName(), conditionDataList))));
    }
```

发布变更数据通过`eventPublisher.publishEvent()`完成，这个`eventPublisher`对象是一个`ApplicationEventPublisher`类，这个类的全限定名是`org.springframework.context.ApplicationEventPublisher`。看到这儿，我们知道了发布数据是通过`Spring`相关的功能来完成的。

> 关于`ApplicationEventPublisher`：
>
> 当有状态发生变化时，发布者调用 `ApplicationEventPublisher` 的 `publishEvent` 方法发布一个事件，`Spring`容器广播事件给所有观察者，调用观察者的 `onApplicationEvent` 方法把事件对象传递给观察者。调用 `publishEvent`方法有两种途径，一种是实现接口由容器注入 `ApplicationEventPublisher` 对象然后调用其方法，另一种是直接调用容器的方法，两种方法发布事件没有太大区别。
>
> - `ApplicationEventPublisher`：发布事件；
> - `ApplicationEvent`：`Spring` 事件，记录事件源、时间和数据；
> - `ApplicationListener`：事件监听者，观察者。

在`Spring`的事件发布机制中，有三个对象，

一个是发布事件的`ApplicationEventPublisher`，在`ShenYu`中通过构造器注入了一个`eventPublisher`。

另一个对象是`ApplicationEvent`，在`ShenYu`中通过`DataChangedEvent`继承了它，表示事件对象。

```java
public class DataChangedEvent extends ApplicationEvent {
//......
}
```

最后一个是 `ApplicationListener`，在`ShenYu`中通过`DataChangedEventDispatcher`类实现了该接口，作为事件的监听者，负责处理事件对象。

```java
@Component
public class DataChangedEventDispatcher implements ApplicationListener<DataChangedEvent>, InitializingBean {

    //......
    
}
```



#### 2.3 分发数据

- DataChangedEventDispatcher.onApplicationEvent()

当事件发布完成后，会自动进入到`DataChangedEventDispatcher`类中的`onApplicationEvent()`方法，进行事件处理。

```java
@Component
public class DataChangedEventDispatcher implements ApplicationListener<DataChangedEvent>, InitializingBean {

  /**
     * 有数据变更时，调用此方法
     * @param event
     */
    @Override
    @SuppressWarnings("unchecked")
    public void onApplicationEvent(final DataChangedEvent event) {
        // 遍历数据变更监听器(一般使用一种数据同步的方式就好了)
        for (DataChangedListener listener : listeners) {
            // 哪种数据发生变更
            switch (event.getGroupKey()) {
                case APP_AUTH: // 认证信息
                    listener.onAppAuthChanged((List<AppAuthData>) event.getSource(), event.getEventType());
                    break;
                case PLUGIN:  // 插件信息
                    listener.onPluginChanged((List<PluginData>) event.getSource(), event.getEventType());
                    break;
                case RULE:    // 规则信息
                    listener.onRuleChanged((List<RuleData>) event.getSource(), event.getEventType());
                    break;
                case SELECTOR:   // 选择器信息
                    listener.onSelectorChanged((List<SelectorData>) event.getSource(), event.getEventType());
                    break;
                case META_DATA:  // 元数据
                    listener.onMetaDataChanged((List<MetaData>) event.getSource(), event.getEventType());
                    break;
                default:  // 其他类型，抛出异常
                    throw new IllegalStateException("Unexpected value: " + event.getGroupKey());
            }
        }
    }
    
}
```

当有数据变更时，调用`onApplicationEvent`方法，然后遍历所有数据变更监听器，判断是哪种数据类型，交给相应的数据监听器进行处理。

`ShenYu`将所有数据进行了分组，一共是五种：认证信息、插件信息、规则信息、选择器信息和元数据。

这里的数据变更监听器（`DataChangedListener`），就是数据同步策略的抽象，它的具体实现有：

![](/img/activities/code-analysis-websocket-data-sync/data-changed-listener.png)

这几个实现类就是当前`ShenYu`支持的同步策略：

- `WebsocketDataChangedListener`：基于`websocket`的数据同步；
- `ZookeeperDataChangedListener`：基于`zookeeper`的数据同步；
- `ConsulDataChangedListener`：基于`consul`的数据同步；
- `EtcdDataDataChangedListener`：基于`etcd`的数据同步；
- `HttpLongPollingDataChangedListener`：基于`http长轮询`的数据同步；
- `NacosDataChangedListener`：基于`nacos`的数据同步；

既然有这么多种实现策略，那么如何确定使用哪一种呢？

因为本文是基于`websocket`的数据同步源码分析，所以这里以`WebsocketDataChangedListener`为例，分析它是如何被加载并实现的。

通过在源码工程中进行全局搜索，可以看到，它的实现是在`DataSyncConfiguration`类完成的。

```java
/**
 * 数据同步配置类
 * 通过springboot条件装配实现
 * The type Data sync configuration.
 */
@Configuration
public class DataSyncConfiguration {
    
 /**
     * websocket数据同步（默认策略）
     * The WebsocketListener(default strategy).
     */
    @Configuration
    @ConditionalOnProperty(name = "shenyu.sync.websocket.enabled", havingValue = "true", matchIfMissing = true)
    @EnableConfigurationProperties(WebsocketSyncProperties.class)
    static class WebsocketListener {

        /**
         * Config event listener data changed listener.
         * 配置websocket数据变更监听器
         * @return the data changed listener
         */
        @Bean
        @ConditionalOnMissingBean(WebsocketDataChangedListener.class)
        public DataChangedListener websocketDataChangedListener() {
            return new WebsocketDataChangedListener();
        }

        /**
         * Websocket collector.
         * Websocket处理类：建立连接，发送消息，关闭连接等操作
         * @return the websocket collector
         */
        @Bean
        @ConditionalOnMissingBean(WebsocketCollector.class)
        public WebsocketCollector websocketCollector() {
            return new WebsocketCollector();
        }

        /**
         * Server endpoint exporter 
         *
         * @return the server endpoint exporter
         */
        @Bean
        @ConditionalOnMissingBean(ServerEndpointExporter.class)
        public ServerEndpointExporter serverEndpointExporter() {
            return new ServerEndpointExporter();
        }
    }
    
    //......
}

```

这个配置类是通过`SpringBoot`条件装配类实现的。在`WebsocketListener`类上面有几个注解：

- `@Configuration`：配置文件，应用上下文；

- `@ConditionalOnProperty(name = "shenyu.sync.websocket.enabled", havingValue = "true", matchIfMissing = true)`：属性条件判断，满足条件，该配置类才会生效。也就是说，当我们有如下配置时，就会采用`websocket`进行数据同步。不过，这里需要注意下`matchIfMissing = true`这个属性，它表示，如果你没有如下的配置，该配置类也会生效。基于`websocket`的数据同步时官方推荐的方式，也是默认采用的方式。

  ```properties
  shenyu:  
    sync:
      websocket:
        enabled: true
  ```

- `@EnableConfigurationProperties`：启用配置属性；



当我们主动配置，采用`websocket`进行数据同步时，`WebsocketDataChangedListener`就会生成。所以在事件处理方法`onApplicationEvent()`中，就会到相应的`listener`中。在我们的案例中，是新增加了一条选择器数据，数据通过采用的是`websocket`，所以，代码会进入到`WebsocketDataChangedListener`进行选择器数据变更处理。

```java
    @Override
    @SuppressWarnings("unchecked")
    public void onApplicationEvent(final DataChangedEvent event) {
        // 遍历数据变更监听器(一般使用一种数据同步的方式就好了)
        for (DataChangedListener listener : listeners) {
            // 哪种数据发生变更
            switch (event.getGroupKey()) {
                    
                // 省略了其他逻辑
                    
                case SELECTOR:   // 选择器信息
                    listener.onSelectorChanged((List<SelectorData>) event.getSource(), event.getEventType());   // WebsocketDataChangedListener进行选择器数据变更处理
                    break;
         }
    }
```


#### 2.4 Websocket数据变更监听器

- WebsocketDataChangedListener.onSelectorChanged()

  在`onSelectorChanged()`方法中，将数据进行了封装，转成`WebsocketData`，然后通过`WebsocketCollector.send()`发送数据。

```java
    // 选择器数据有更新
    @Override
    public void onSelectorChanged(final List<SelectorData> selectorDataList, final DataEventTypeEnum eventType) {
        // 构造 WebsocketData 数据
        WebsocketData<SelectorData> websocketData =
                new WebsocketData<>(ConfigGroupEnum.SELECTOR.name(), eventType.name(), selectorDataList);
        // 通过websocket发送数据
        WebsocketCollector.send(GsonUtils.getInstance().toJson(websocketData), eventType);
    }
```


#### 2.5 Websocket发送数据

- WebsocketCollector.send()

在`send()`方法中，判断了一下同步的类型，根据不同的类型，进行处理。

```java
@Slf4j
@ServerEndpoint(value = "/websocket", configurator = WebsocketConfigurator.class)
public class WebsocketCollector {
    
/**
     * Send.
     *
     * @param message the message
     * @param type    the type
     */
    public static void send(final String message, final DataEventTypeEnum type) {
        if (StringUtils.isNotBlank(message)) {
            // 如果是MYSELF（第一次的全量同步）
            if (DataEventTypeEnum.MYSELF == type) {
                // 从threadlocal中获取session
                Session session = (Session) ThreadLocalUtil.get(SESSION_KEY);
                if (session != null) {
                    // 向该session发送全量数据
                    sendMessageBySession(session, message);
                }
            } else {
                // 后续的增量同步
                // 向所有的session中同步变更数据
                SESSION_SET.forEach(session -> sendMessageBySession(session, message));
            }
        }
    }

    private static void sendMessageBySession(final Session session, final String message) {
        try {
            // 通过websocket的session把消息发送出去
            session.getBasicRemote().sendText(message);
        } catch (IOException e) {
            log.error("websocket send result is exception: ", e);
        }
    }
}
```



我们给的案例是一个新增操作 ，是一个增量同步，所以会走

`SESSION_SET.forEach(session -> sendMessageBySession(session, message));`

这个逻辑。

再通过

`session.getBasicRemote().sendText(message);`

将数据发送了出去。



至此，当`admin`端发生数据变更时，就将变更的数据以增量形式通过`WebSocket`发给了网关。

分析到这里，不知道大家有没有疑问呢？比如`session`是怎么来的？网关如何和`admin`建立连接的？

不要着急，我们接下来就进行网关端的同步分析。

不过，在继续源码分析前，我们用一张图将上面的分析过程串联起来。

![](/img/activities/code-analysis-websocket-data-sync/websocket-data-sync-admin.png)



### 3. 网关数据同步

假设`ShenYu`网关已经在正常运行了，使用的数据同步方式也是`websocket`。那么当在`admin`端新增一条选择器数据后，并且通过`WebSocket`发送到网关，那网关是如何接收并处理数据的呢？接下来我们就继续进行源码分析，一探究竟。

#### 3.1 WebsocketClient接收数据

- ShenyuWebsocketClient.onMessage()

在网关端有一个`ShenyuWebsocketClient`类，它继承了`WebSocketClient`，可以和`WebSocket`建立连接并通信。

```java
public final class ShenyuWebsocketClient extends WebSocketClient {
  // ......
}
```

当在`admin`端通过`websocket`发送数据后，`ShenyuWebsocketClient`就可以通过`onMessage()`接收到数据，然后就可以自己进行处理。

```java
public final class ShenyuWebsocketClient extends WebSocketClient {
      // 接受到消息后执行
    @Override
    public void onMessage(final String result) {
        // 处理接收到的数据
        handleResult(result);
    }
    
    private void handleResult(final String result) {
        // 数据反序列化
        WebsocketData websocketData = GsonUtils.getInstance().fromJson(result, WebsocketData.class);
        // 哪种数据类型，插件、选择器、规则...
        ConfigGroupEnum groupEnum = ConfigGroupEnum.acquireByName(websocketData.getGroupType());
        // 哪种操作类型，更新、删除...
        String eventType = websocketData.getEventType();
        String json = GsonUtils.getInstance().toJson(websocketData.getData());

        // 处理数据
        websocketDataHandler.executor(groupEnum, json, eventType);
    }
}
```



接收到数据后，首先进行了反序列化操作，读取数据类型和操作类型，紧接着，就交给`websocketDataHandler.executor()`进行处理。

#### 3.2 执行Websocket事件处理器

- WebsocketDataHandler.executor()

通过工厂模式创建了`Websocket`数据处理器，每种数据类型，都提供了一个处理器：

> 插件 --> 插件数据处理器;
>
> 选择器 --> 选择器数据处理器；
>
> 规则 --> 规则数据处理器；
>
> 认证信息 --> 认证数据处理器；
>
> 元数据 --> 元数据处理器。

```java

/**
 * 通过工厂模式创建 Websocket数据处理器
 * The type Websocket cache handler.
 */
public class WebsocketDataHandler {

    private static final EnumMap<ConfigGroupEnum, DataHandler> ENUM_MAP = new EnumMap<>(ConfigGroupEnum.class);

    /**
     * Instantiates a new Websocket data handler.
     * 每种数据类型，提供一个处理器
     * @param pluginDataSubscriber the plugin data subscriber
     * @param metaDataSubscribers  the meta data subscribers
     * @param authDataSubscribers  the auth data subscribers
     */
    public WebsocketDataHandler(final PluginDataSubscriber pluginDataSubscriber,
                                final List<MetaDataSubscriber> metaDataSubscribers,
                                final List<AuthDataSubscriber> authDataSubscribers) {
        // 插件 --> 插件数据处理器
        ENUM_MAP.put(ConfigGroupEnum.PLUGIN, new PluginDataHandler(pluginDataSubscriber));
        // 选择器 --> 选择器数据处理器
        ENUM_MAP.put(ConfigGroupEnum.SELECTOR, new SelectorDataHandler(pluginDataSubscriber));
        // 规则 --> 规则数据处理器
        ENUM_MAP.put(ConfigGroupEnum.RULE, new RuleDataHandler(pluginDataSubscriber));
        // 认证信息 --> 认证数据处理器
        ENUM_MAP.put(ConfigGroupEnum.APP_AUTH, new AuthDataHandler(authDataSubscribers));
        // 元数据 --> 元数据处理器
        ENUM_MAP.put(ConfigGroupEnum.META_DATA, new MetaDataHandler(metaDataSubscribers));
    }

    /**
     * Executor.
     *
     * @param type      the type
     * @param json      the json
     * @param eventType the event type
     */
    public void executor(final ConfigGroupEnum type, final String json, final String eventType) {
        // 根据数据类型，找到对应的数据处理器
        ENUM_MAP.get(type).handle(json, eventType);
    }
}

```



不同的数据类型，有不同的数据处理方式，所以有不同的实现类。但是它们之间也有相同的处理逻辑，所以可以通过模板方法设计模式来实现。相同的逻辑放在抽象类中的`handle()`方法中，不同逻辑就交给各自的实现类。

![](/img/activities/code-analysis-websocket-data-sync/data-handler.png)



我们的案例是新增了一条选择器数据，所以会交给`SelectorDataHandler`（ 选择器 --> 选择器数据处理器）进行数据处理。



#### 3.3 判断事件类型

- AbstractDataHandler.handle()

实现数据变更的通用逻辑处理：根据不同的操作类型调用不同方法。

```java

public abstract class AbstractDataHandler<T> implements DataHandler {

    /**
     * Convert list.
     * 不同的逻辑由各自实现类去实现
     * @param json the json
     * @return the list
     */
    protected abstract List<T> convert(String json);

    /**
     * Do refresh.
     * 不同的逻辑由各自实现类去实现
     * @param dataList the data list
     */
    protected abstract void doRefresh(List<T> dataList);

    /**
     * Do update.
     * 不同的逻辑由各自实现类去实现
     * @param dataList the data list
     */
    protected abstract void doUpdate(List<T> dataList);

    /**
     * Do delete.
     * 不同的逻辑由各自实现类去实现
     * @param dataList the data list
     */
    protected abstract void doDelete(List<T> dataList);

    // 通用逻辑，抽象类实现
    @Override
    public void handle(final String json, final String eventType) {
        List<T> dataList = convert(json);
        if (CollectionUtils.isNotEmpty(dataList)) {
            DataEventTypeEnum eventTypeEnum = DataEventTypeEnum.acquireByName(eventType);
            switch (eventTypeEnum) {
                case REFRESH:
                case MYSELF:
                    doRefresh(dataList);  //刷新数据，全量同步
                    break;
                case UPDATE:
                case CREATE:
                    doUpdate(dataList); // 更新或创建数据，增量同步
                    break;
                case DELETE:
                    doDelete(dataList);  // 删除数据
                    break;
                default:
                    break;
            }
        }
    }
}
```

新增一条选择器数据，是新增操作，通过`switch-case`进入到`doUpdate()`方法中。

#### 3.4 进入具体的数据处理器

- SelectorDataHandler.doUpdate()

```java

/**
 * 选择器数据处理器
 * The type Selector data handler.
 */
@RequiredArgsConstructor
public class SelectorDataHandler extends AbstractDataHandler<SelectorData> {

    private final PluginDataSubscriber pluginDataSubscriber;

    //......

    // 更新操作
    @Override
    protected void doUpdate(final List<SelectorData> dataList) {
        dataList.forEach(pluginDataSubscriber::onSelectorSubscribe);
    }
}
```

遍历数据，进入`onSelectorSubscribe()`方法。

- PluginDataSubscriber.onSelectorSubscribe()

它没有其他逻辑，直接调用`subscribeDataHandler()`方法。在方法中，更具数据类型（插件、选择器或规则），操作类型（更新或删除），去执行不同逻辑。

```java
/**
 * 通用插件数据订阅者，负责处理所有插件、选择器和规则信息
 * The type Common plugin data subscriber.
 */
public class CommonPluginDataSubscriber implements PluginDataSubscriber {
    //......
     // 处理选择器数据
    @Override
    public void onSelectorSubscribe(final SelectorData selectorData) {
        subscribeDataHandler(selectorData, DataEventTypeEnum.UPDATE);
    }    
    
    // 订阅数据处理器，处理数据的更新或删除
    private <T> void subscribeDataHandler(final T classData, final DataEventTypeEnum dataType) {
        Optional.ofNullable(classData).ifPresent(data -> {
            // 插件数据
            if (data instanceof PluginData) {
                PluginData pluginData = (PluginData) data;
                if (dataType == DataEventTypeEnum.UPDATE) { // 更新操作
                    // 将数据保存到网关内存
                    BaseDataCache.getInstance().cachePluginData(pluginData);
                    // 如果每个插件还有自己的处理逻辑，那么就去处理
                    Optional.ofNullable(handlerMap.get(pluginData.getName())).ifPresent(handler -> handler.handlerPlugin(pluginData));
                } else if (dataType == DataEventTypeEnum.DELETE) {  // 删除操作
                    // 从网关内存移除数据
                    BaseDataCache.getInstance().removePluginData(pluginData);
                    // 如果每个插件还有自己的处理逻辑，那么就去处理
                    Optional.ofNullable(handlerMap.get(pluginData.getName())).ifPresent(handler -> handler.removePlugin(pluginData));
                }
            } else if (data instanceof SelectorData) {  // 选择器数据
                SelectorData selectorData = (SelectorData) data;
                if (dataType == DataEventTypeEnum.UPDATE) { // 更新操作
                    // 将数据保存到网关内存
                    BaseDataCache.getInstance().cacheSelectData(selectorData);
                    // 如果每个插件还有自己的处理逻辑，那么就去处理 
                    Optional.ofNullable(handlerMap.get(selectorData.getPluginName())).ifPresent(handler -> handler.handlerSelector(selectorData));
                } else if (dataType == DataEventTypeEnum.DELETE) {  // 删除操作
                    // 从网关内存移除数据
                    BaseDataCache.getInstance().removeSelectData(selectorData);
                    // 如果每个插件还有自己的处理逻辑，那么就去处理
                    Optional.ofNullable(handlerMap.get(selectorData.getPluginName())).ifPresent(handler -> handler.removeSelector(selectorData));
                }
            } else if (data instanceof RuleData) {  // 规则数据
                RuleData ruleData = (RuleData) data;
                if (dataType == DataEventTypeEnum.UPDATE) { // 更新操作
                    // 将数据保存到网关内存
                    BaseDataCache.getInstance().cacheRuleData(ruleData);
                    // 如果每个插件还有自己的处理逻辑，那么就去处理
                    Optional.ofNullable(handlerMap.get(ruleData.getPluginName())).ifPresent(handler -> handler.handlerRule(ruleData));
                } else if (dataType == DataEventTypeEnum.DELETE) { // 删除操作
                    // 从网关内存移除数据
                    BaseDataCache.getInstance().removeRuleData(ruleData);
                    // 如果每个插件还有自己的处理逻辑，那么就去处理
                    Optional.ofNullable(handlerMap.get(ruleData.getPluginName())).ifPresent(handler -> handler.removeRule(ruleData));
                }
            }
        });
    }
    
}
```



那么新增一条选择器数据，会进入下面的逻辑：

```java
// 将数据保存到网关内存
BaseDataCache.getInstance().cacheSelectData(selectorData);
// 如果每个插件还有自己的处理逻辑，那么就去处理                  
Optional.ofNullable(handlerMap.get(selectorData.getPluginName())).ifPresent(handler -> handler.handlerSelector(selectorData));
```

一是将数据保存到网关的内存中。`BaseDataCache`是最终缓存数据的类，通过单例模式实现。选择器数据就存到了`SELECTOR_MAP`这个`Map`中。在后续使用的时候，也是从这里拿数据。

```java
public final class BaseDataCache {
    // 私有变量
    private static final BaseDataCache INSTANCE = new BaseDataCache();
  	// 私有构造器
    private BaseDataCache() {
    }
    
    /**
     * Gets instance.
     *  公开方法
     * @return the instance
     */
    public static BaseDataCache getInstance() {
        return INSTANCE;
    }
    
    /**
    *  缓存选择器数据的Map
     * pluginName -> SelectorData.
     */
    private static final ConcurrentMap<String, List<SelectorData>> SELECTOR_MAP = Maps.newConcurrentMap();
    
    public void cacheSelectData(final SelectorData selectorData) {
        Optional.ofNullable(selectorData).ifPresent(this::selectorAccept);
    }
        
   /**
     * cache selector data.
     * 缓存选择器数据
     * @param data the selector data
     */
    private void selectorAccept(final SelectorData data) {
        String key = data.getPluginName();
        if (SELECTOR_MAP.containsKey(key)) { // 更新操作，先删除再插入
            List<SelectorData> existList = SELECTOR_MAP.get(key);
            final List<SelectorData> resultList = existList.stream().filter(r -> !r.getId().equals(data.getId())).collect(Collectors.toList());
            resultList.add(data);
            final List<SelectorData> collect = resultList.stream().sorted(Comparator.comparing(SelectorData::getSort)).collect(Collectors.toList());
            SELECTOR_MAP.put(key, collect);
        } else {  // 新增操作，直接放到Map中
            SELECTOR_MAP.put(key, Lists.newArrayList(data));
        }
    }
    
}
```



二是如果每个插件还有自己的处理逻辑，那么就去处理。  通过`idea`编辑器可以看到，当新增一条选择器后，有如下的插件还有处理。这里我们就不再展开了。

![](/img/activities/code-analysis-websocket-data-sync/handler-selector.png)

经过以上的源码追踪，并通过一个实际的案例，在`admin`端新增一条选择器数据，就将`websocket`数据同步的流程分析清除了。

我们还是用下面的一张图将网关端的数据同步流程串联一下：

![](/img/activities/code-analysis-websocket-data-sync/websocket-data-sync-gateway.png)

数据同步的流程已经分析完了，但是还有一些问题没有分析到，就是网关是如何跟`admin`建立连接的？

### 4. 网关和admin建立websocket连接

- websocket配置

在网关的配置文件中有如下配置，并且引入了相关依赖，就会启动`websocket`相关服务。

```yaml
shenyu:
    file:
      enabled: true
    cross:
      enabled: true
    dubbo :
      parameter: multi
    sync:
        websocket :  # 使用websocket进行数据同步
             urls: ws://localhost:9095/websocket   # admin端的websocket地址
```

在网关中引入`websocket`的依赖。

```xml
<!--shenyu data sync start use websocket-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-sync-data-websocket</artifactId>
    <version>${project.version}</version>
</dependency>
```

- Websocket数据同步配置

通过`springboot`的条件装配，创建相关的`bean`。在网关启动的时候，如果我们配置了`shenyu.sync.websocket.urls`，那么`Websocket`数据同步配置就会被加载。这里通过`spring boot starter`完成依赖的加载。

```java

/**
 * Websocket数据同步配置
 * 通过springboot实现条件注入
 * Websocket sync data configuration for spring boot.
 */
@Configuration
@ConditionalOnClass(WebsocketSyncDataService.class)
@ConditionalOnProperty(prefix = "shenyu.sync.websocket", name = "urls")
@Slf4j
public class WebsocketSyncDataConfiguration {

    /**
     * Websocket sync data service.
     * Websocket数据同步服务
     * @param websocketConfig   the websocket config
     * @param pluginSubscriber the plugin subscriber
     * @param metaSubscribers   the meta subscribers
     * @param authSubscribers   the auth subscribers
     * @return the sync data service
     */
    // 创建websocketSyncDataService
    @Bean
    public SyncDataService websocketSyncDataService(final ObjectProvider<WebsocketConfig> websocketConfig, final ObjectProvider<PluginDataSubscriber> pluginSubscriber,
                                           final ObjectProvider<List<MetaDataSubscriber>> metaSubscribers, final ObjectProvider<List<AuthDataSubscriber>> authSubscribers) {
        log.info("you use websocket sync shenyu data.......");
        return new WebsocketSyncDataService(websocketConfig.getIfAvailable(WebsocketConfig::new), pluginSubscriber.getIfAvailable(),
                metaSubscribers.getIfAvailable(Collections::emptyList), authSubscribers.getIfAvailable(Collections::emptyList));
    }

    /**
     * Config websocket config.
     *
     * @return the websocket config
     */
    @Bean
    @ConfigurationProperties(prefix = "shenyu.sync.websocket")
    public WebsocketConfig websocketConfig() {
        return new WebsocketConfig();  // 创建WebsocketConfig
    }
}
```



在项目的`resources/META-INF`目录先新建`spring.factories`文件，在文件中指明配置类。

![](/img/activities/code-analysis-websocket-data-sync/websocket-springboot-starter.png)



- Websocket数据同步服务

在`WebsocketSyncDataService`中做了如下几件事情：

- 读取配置中的`urls`，这个表示`admin`端的同步地址，有多个的话，使用","分割；
- 创建调度线程池，一个`admin`分配一个，用于执行定时任务；
- 创建`ShenyuWebsocketClient`，一个`admin`分配一个，用于和`admin`建立`websocket`通信；
- 开始和`admin`端的`websocket` 建立连接；
- 执行定时任务，每隔10秒执行一次。主要作用是判断`websocket`连接是否已经断开，如果已经断开，则尝试重连。如果没有断开，就进行 `ping-pong` 检测。

```java

/**
 * Websocket数据同步服务
 * Websocket sync data service.
 */
@Slf4j
public class WebsocketSyncDataService implements SyncDataService, AutoCloseable {

    private final List<WebSocketClient> clients = new ArrayList<>();

    private final ScheduledThreadPoolExecutor executor;

    /**
     * Instantiates a new Websocket sync cache.
     * 创建Websocket数据同步服务
     * @param websocketConfig      the websocket config
     * @param pluginDataSubscriber the plugin data subscriber
     * @param metaDataSubscribers  the meta data subscribers
     * @param authDataSubscribers  the auth data subscribers
     */
    public WebsocketSyncDataService(final WebsocketConfig websocketConfig,
                                    final PluginDataSubscriber pluginDataSubscriber,
                                    final List<MetaDataSubscriber> metaDataSubscribers,
                                    final List<AuthDataSubscriber> authDataSubscribers) {
        // admin端的同步地址，有多个的话，使用","分割
        String[] urls = StringUtils.split(websocketConfig.getUrls(), ",");
        // 创建调度线程池，一个admin分配一个
        executor = new ScheduledThreadPoolExecutor(urls.length, ShenyuThreadFactory.create("websocket-connect", true));
        for (String url : urls) {
            try {
                //创建WebsocketClient，一个admin分配一个
                clients.add(new ShenyuWebsocketClient(new URI(url), Objects.requireNonNull(pluginDataSubscriber), metaDataSubscribers, authDataSubscribers));
            } catch (URISyntaxException e) {
                log.error("websocket url({}) is error", url, e);
            }
        }
        try {
            for (WebSocketClient client : clients) {
                // 和websocket server建立连接
                boolean success = client.connectBlocking(3000, TimeUnit.MILLISECONDS);
                if (success) {
                    log.info("websocket connection is successful.....");
                } else {
                    log.error("websocket connection is error.....");
                }

                // 执行定时任务，每隔10秒执行一次
                // 主要作用是判断websocket连接是否已经断开，如果已经断开，则尝试重连。
                // 如果没有断开，就进行 ping-pong 检测
                executor.scheduleAtFixedRate(() -> {
                    try {
                        if (client.isClosed()) {
                            boolean reconnectSuccess = client.reconnectBlocking();
                            if (reconnectSuccess) {
                                log.info("websocket reconnect server[{}] is successful.....", client.getURI().toString());
                            } else {
                                log.error("websocket reconnection server[{}] is error.....", client.getURI().toString());
                            }
                        } else {
                            client.sendPing();
                            log.debug("websocket send to [{}] ping message successful", client.getURI().toString());
                        }
                    } catch (InterruptedException e) {
                        log.error("websocket connect is error :{}", e.getMessage());
                    }
                }, 10, 10, TimeUnit.SECONDS);
            }
            /* client.setProxy(new Proxy(Proxy.Type.HTTP, new InetSocketAddress("proxyaddress", 80)));*/
        } catch (InterruptedException e) {
            log.info("websocket connection...exception....", e);
        }

    }

    @Override
    public void close() {
        // 关闭 websocket client
        for (WebSocketClient client : clients) {
            if (!client.isClosed()) {
                client.close();
            }
        }
        // 关闭线程池
        if (Objects.nonNull(executor)) {
            executor.shutdown();
        }
    }
}
```

- ShenyuWebsocketClient

在`ShenYu`中创建的`WebSocket`客户端，用于和`admin`端通信。第一次成功建立连接后，同步全量数据，后续进行增量同步。

```java

/**
 * 在ShenYu中自定义的WebSocket客户端
 * The type shenyu websocket client.
 */
@Slf4j
public final class ShenyuWebsocketClient extends WebSocketClient {
    
    private volatile boolean alreadySync = Boolean.FALSE;
    
    private final WebsocketDataHandler websocketDataHandler;
    
    /**
     * Instantiates a new shenyu websocket client.
     * 创建ShenyuWebsocketClient
     * @param serverUri             the server uri  服务端uri
     * @param pluginDataSubscriber the plugin data subscriber 插件数据订阅器
     * @param metaDataSubscribers   the meta data subscribers 元数据订阅器
     * @param authDataSubscribers   the auth data subscribers 认证数据订阅器
     */
    public ShenyuWebsocketClient(final URI serverUri, final PluginDataSubscriber pluginDataSubscriber,final List<MetaDataSubscriber> metaDataSubscribers, final List<AuthDataSubscriber> authDataSubscribers) {
        super(serverUri);
        this.websocketDataHandler = new WebsocketDataHandler(pluginDataSubscriber, metaDataSubscribers, authDataSubscribers);
    }

    // 成功建立连接后执行
    @Override
    public void onOpen(final ServerHandshake serverHandshake) {
        // 防止重新建立连接时，再次执行，所以用alreadySync进行判断
        if (!alreadySync) {
            // 同步所有数据，MYSELF 类型
            send(DataEventTypeEnum.MYSELF.name());
            alreadySync = true;
        }
    }

    // 接收到消息后执行
    @Override
    public void onMessage(final String result) {
        // 处理接收到的数据
        handleResult(result);
    }
    
    // 关闭后执行
    @Override
    public void onClose(final int i, final String s, final boolean b) {
        this.close();
    }
    
    // 失败后执行
    @Override
    public void onError(final Exception e) {
        this.close();
    }
    
    @SuppressWarnings("ALL")
    private void handleResult(final String result) {
        // 数据反序列化
        WebsocketData websocketData = GsonUtils.getInstance().fromJson(result, WebsocketData.class);
        // 哪种数据类型，插件、选择器、规则...
        ConfigGroupEnum groupEnum = ConfigGroupEnum.acquireByName(websocketData.getGroupType());
        // 哪种操作类型，更新、删除...
        String eventType = websocketData.getEventType();
        String json = GsonUtils.getInstance().toJson(websocketData.getData());

        // 处理数据
        websocketDataHandler.executor(groupEnum, json, eventType);
    }
}

```


### 5. 总结

本文通过一个实际案例，对`websocket`的数据同步原理进行了源码分析。涉及到的主要知识点如下：

- `websocket`支持双向通信，性能好，推荐使用；
- 通过`Spring`完成事件发布和监听；
- 通过抽象`DataChangedListener`接口，支持多种同步策略，面向接口编程；
- 使用工厂模式创建 `WebsocketDataHandler`，实现不同数据类型的处理；
- 使用模板方法设计模式实现`AbstractDataHandler`，处理通用的操作类型；
- 使用单例设计模式实现缓存数据类`BaseDataCache`；
- 通过`SpringBoot`的条件装配和`starter`加载机制实现配置类的加载。


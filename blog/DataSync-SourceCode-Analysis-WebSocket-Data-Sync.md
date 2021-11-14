---
title: WebSocket Data Synchronization Source Code Analysis
author: midnight2104
author_title: Apache ShenYu Committer
author_url: https://github.com/midnight2104
tags: [websocket,data sync,Apache ShenYu]
---


In `ShenYu` gateway, data synchronization refers to how to synchronize the updated data to the gateway after the data is sent in the background management system. The Apache ShenYu gateway currently supports data synchronization for `ZooKeeper`, `WebSocket`, `http long poll`, `Nacos`, `etcd` and `Consul`. The main content of this article is based on `WebSocket` data synchronization source code analysis.


> This paper based on `shenyu-2.4.0` version of the source code analysis, the official website of the introduction of please refer to the [Data Synchronization Design](https://shenyu.apache.org/docs/design/data-sync/) .


### 1. About WebSocket Communication

The WebSocket protocol was born in 2008 and became an international standard in 2011. It can be two-way communication, the server can take the initiative to push information to the client, the client can also take the initiative to send information to the server. The WebSocket protocol is based on the TCP protocol and belongs to the application layer, with low performance overhead and high communication efficiency. The protocol identifier is `ws`.


### 2. Admin Data Sync

Let's trace the source code from a real case, such as adding a selector data in the background management system:

![](/img/activities/code-analysis-websocket-data-sync/add-selector.png)

#### 2.1 Accept Changed Data

- SelectorController.createSelector()

Enter the createSelector() method of the `SelectorController` class, which validates data, adds or updates data, and returns results.


```java
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/selector")
public class SelectorController {
    
    @PostMapping("")
    public ShenyuAdminResult createSelector(@Valid @RequestBody final SelectorDTO selectorDTO) { // @Valid 数校验
        // create or update data
        Integer createCount = selectorService.createOrUpdate(selectorDTO);
        // return result
        return ShenyuAdminResult.success(ShenyuResultMessage.CREATE_SUCCESS, createCount);
    }
    
    // ......
}
```



#### 2.2 Handle Data

- SelectorServiceImpl.createOrUpdate()

Convert data in the `SelectorServiceImpl` class using the `createOrUpdate()` method, save it to the database, publish the event, update `upstream`.


```java
@RequiredArgsConstructor
@Service
public class SelectorServiceImpl implements SelectorService {
    // eventPublisher
    private final ApplicationEventPublisher eventPublisher;
    
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int createOrUpdate(final SelectorDTO selectorDTO) {
        int selectorCount;
        // build data DTO --> DO
        SelectorDO selectorDO = SelectorDO.buildSelectorDO(selectorDTO);
        List<SelectorConditionDTO> selectorConditionDTOs = selectorDTO.getSelectorConditions();
        // insert or update ?
        if (StringUtils.isEmpty(selectorDTO.getId())) {
            //  insert into data
            selectorCount = selectorMapper.insertSelective(selectorDO);
            // insert into condition data
            selectorConditionDTOs.forEach(selectorConditionDTO -> {
                selectorConditionDTO.setSelectorId(selectorDO.getId());
                selectorConditionMapper.insertSelective(SelectorConditionDO.buildSelectorConditionDO(selectorConditionDTO));
            });
            // check selector add
            if (dataPermissionMapper.listByUserId(JwtUtils.getUserInfo().getUserId()).size() > 0) {
                DataPermissionDTO dataPermissionDTO = new DataPermissionDTO();
                dataPermissionDTO.setUserId(JwtUtils.getUserInfo().getUserId());
                dataPermissionDTO.setDataId(selectorDO.getId());
                dataPermissionDTO.setDataType(AdminConstants.SELECTOR_DATA_TYPE);
                dataPermissionMapper.insertSelective(DataPermissionDO.buildPermissionDO(dataPermissionDTO));
            }

        } else {
            // update data, delete and then insert
            selectorCount = selectorMapper.updateSelective(selectorDO);
            //delete rule condition then add
            selectorConditionMapper.deleteByQuery(new SelectorConditionQuery(selectorDO.getId()));
            selectorConditionDTOs.forEach(selectorConditionDTO -> {
                selectorConditionDTO.setSelectorId(selectorDO.getId());
                SelectorConditionDO selectorConditionDO = SelectorConditionDO.buildSelectorConditionDO(selectorConditionDTO);
                selectorConditionMapper.insertSelective(selectorConditionDO);
            });
        }
        // publish event
        publishEvent(selectorDO, selectorConditionDTOs);

        // update upstream
        updateDivideUpstream(selectorDO);
        return selectorCount;
    }
    
    
    // ......
    
}

```

In the `Service` class to persist data, i.e. to the database, this should be familiar, not expand. The update upstream operation is analyzed in the corresponding section below, focusing on the publish event operation, which performs data synchronization.



The logic of the `publishEvent()`  method is to find the plugin corresponding to the selector, build the conditional data, and publish the change data.


```java
       private void publishEvent(final SelectorDO selectorDO, final List<SelectorConditionDTO> selectorConditionDTOs) {
        // find plugin of selector
        PluginDO pluginDO = pluginMapper.selectById(selectorDO.getPluginId());
        // build condition data
        List<ConditionData> conditionDataList =                selectorConditionDTOs.stream().map(ConditionTransfer.INSTANCE::mapToSelectorDTO).collect(Collectors.toList());
        // publish event
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.SELECTOR, DataEventTypeEnum.UPDATE,
                Collections.singletonList(SelectorDO.transFrom(selectorDO, pluginDO.getName(), conditionDataList))));
    }
```

Change data released by `eventPublisher.PublishEvent()` is complete, the `eventPublisher` object is a `ApplicationEventPublisher` class, The fully qualified class name is `org.springframework.context.ApplicationEventPublisher`. Here we see that publishing data is done through `Spring` related functionality.


> `ApplicationEventPublisher`：
>
> When a state change, the publisher calls `ApplicationEventPublisher` of `publishEvent` method to release an event, `Spring` container broadcast event for all observers, The observer's `onApplicationEvent` method is called to pass the event object to the observer. There are two ways to call `publishEvent` method, one is to implement the interface by the container injection `ApplicationEventPublisher` object and then call the method, the other is a direct call container, the method of two methods of publishing events not too big difference.
> 
> - `ApplicationEventPublisher`: publish event;
> - `ApplicationEvent`: `Spring` event, record the event source, time, and data;
> - `ApplicationListener`: event listener, observer.

In Spring event publishing mechanism, there are three objects,


An object is a publish event `ApplicationEventPublisher`, in `ShenYu` through the constructor in the injected a `eventPublisher`.


The other object is `ApplicationEvent` , inherited from `ShenYu` through `DataChangedEvent`, representing the event object.


```java
public class DataChangedEvent extends ApplicationEvent {
//......
}
```

The last object is `ApplicationListener` in `ShenYu` in through `DataChangedEventDispatcher` class implements this interface, as the event listener, responsible for handling the event object.


```java
@Component
public class DataChangedEventDispatcher implements ApplicationListener<DataChangedEvent>, InitializingBean {

    //......
    
}
```



#### 2.3 Dispatch Data

- DataChangedEventDispatcher.onApplicationEvent()

Released when the event is completed, will automatically enter the `DataChangedEventDispatcher` class `onApplicationEvent()` method of handling events.


```java
@Component
public class DataChangedEventDispatcher implements ApplicationListener<DataChangedEvent>, InitializingBean {

  /**
     * This method is called when there are data changes
   * @param event
     */
    @Override
    @SuppressWarnings("unchecked")
    public void onApplicationEvent(final DataChangedEvent event) {
        // Iterate through the data change listener (usually using a data synchronization approach is fine)
      for (DataChangedListener listener : listeners) {
            // What kind of data has changed
        switch (event.getGroupKey()) {
                case APP_AUTH: // app auth data
                    listener.onAppAuthChanged((List<AppAuthData>) event.getSource(), event.getEventType());
                    break;
                case PLUGIN:  // plugin data
                    listener.onPluginChanged((List<PluginData>) event.getSource(), event.getEventType());
                    break;
                case RULE:    // rule data
                    listener.onRuleChanged((List<RuleData>) event.getSource(), event.getEventType());
                    break;
                case SELECTOR:   // selector data
                    listener.onSelectorChanged((List<SelectorData>) event.getSource(), event.getEventType());
                    break;
                case META_DATA:  // metadata
                    listener.onMetaDataChanged((List<MetaData>) event.getSource(), event.getEventType());
                    break;
                default:  // Other types throw exception
                  throw new IllegalStateException("Unexpected value: " + event.getGroupKey());
            }
        }
    }
    
}
```

When there is a data change, the `onApplicationEvent` method is called and all the data change listeners are iterated to determine the data type and handed over to the appropriate data listener for processing.

ShenYu groups all the data into five categories: APP_AUTH, PLUGIN, RULE, SELECTOR and META_DATA.

Here the data change listener (`DataChangedListener`) is an abstraction of the data synchronization policy. Its concrete implementation is:


![](/img/activities/code-analysis-websocket-data-sync/data-changed-listener.png)

These implementation classes are the synchronization strategies currently supported by ShenYu:

- `WebsocketDataChangedListener`: data synchronization based on Websocket; 
- `ZookeeperDataChangedListener`:data synchronization based on Zookeeper; 
- `ConsulDataChangedListener`: data synchronization based on Consul;
- `EtcdDataDataChangedListener`：data synchronization based on etcd;
- `HttpLongPollingDataChangedListener`：data synchronization based on http long polling;
- `NacosDataChangedListener`：data synchronization based on nacos;

Given that there are so many implementation strategies, how do you decide which to use?

Because this paper is based on `websocket` data synchronization source code analysis, so here to `WebsocketDataChangedListener` as an example, the analysis of how it is loaded and implemented.

A global search in the source code project shows that its implementation is done in the `DataSyncConfiguration` class.

```java
/**
 * Data Sync Configuration
 * By springboot conditional assembly
 * The type Data sync configuration.
 */
@Configuration
public class DataSyncConfiguration {
    
 /**
     * The WebsocketListener(default strategy).
     */
    @Configuration
    @ConditionalOnProperty(name = "shenyu.sync.websocket.enabled", havingValue = "true", matchIfMissing = true)
    @EnableConfigurationProperties(WebsocketSyncProperties.class)
    static class WebsocketListener {

        /**
         * Config event listener data changed listener.
         * @return the data changed listener
         */
        @Bean
        @ConditionalOnMissingBean(WebsocketDataChangedListener.class)
        public DataChangedListener websocketDataChangedListener() {
            return new WebsocketDataChangedListener();
        }

        /**
         * Websocket collector.
         * Websocket collector class: establish a connection, send a message, close the connection and other operations
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

This configuration class is implemented through the `SpringBoot` conditional assembly class. The `WebsocketListener` class has several annotations:


- `@Configuration`: Configuration file, application context;

- `@ConditionalOnProperty(name = "shenyu.sync.websocket.enabled", havingValue = "true", matchIfMissing = true)`: attribute condition. The configuration class takes effect only when the condition is met. That is, when we have the following configuration, `websocket` is used for data synchronization. Note, however, the `matchIfMissing = true` attribute, which means that this configuration class will work if you don't have the following configuration. Data synchronization based on `webSocket` is officially recommended and the default.

  ```properties
  shenyu:  
    sync:
      websocket:
        enabled: true
  ```

- `@EnableConfigurationProperties`：enable configuration properties;


When we take the initiative to configuration, use the `websocket` data synchronization, `WebsocketDataChangedListener` is generated. So in the event handler `onApplicationEvent()`, it goes to the corresponding `listener`. In our case, a selector is to increase the new data, the data by adopting the `websocket`, so, the code will enter the `WebsocketDataChangedListener` selector data change process.


```java
    @Override
    @SuppressWarnings("unchecked")
    public void onApplicationEvent(final DataChangedEvent event) {
        // Iterate through the data change listener (usually using a data synchronization approach is fine)
        for (DataChangedListener listener : listeners) {
            // What kind of data has changed
             switch (event.getGroupKey()) {
                    
                // other logic is omitted
              case SELECTOR:   // selector data
                    listener.onSelectorChanged((List<SelectorData>) event.getSource(), event.getEventType());   // WebsocketDataChangedListener handle selector data
                    break;
         }
    }
```



#### 2.4 Websocket Data Changed Listener

- WebsocketDataChangedListener.onSelectorChanged()

In the `onSelectorChanged()` method, the data is encapsulated into `WebsocketData` and then sent via `webSocketCollector.send()`.


```java
    // selector data has been updated
    @Override
    public void onSelectorChanged(final List<SelectorData> selectorDataList, final DataEventTypeEnum eventType) {
        // build WebsocketData 
        WebsocketData<SelectorData> websocketData =
                new WebsocketData<>(ConfigGroupEnum.SELECTOR.name(), eventType.name(), selectorDataList);
        // websocket send data
        WebsocketCollector.send(GsonUtils.getInstance().toJson(websocketData), eventType);
    }
```



#### 2.5 Websocket Send Data

- WebsocketCollector.send()

In the `send()` method, the type of synchronization is determined and processed according to the different types.

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
            // If it's MYSELF (first full synchronization)
          if (DataEventTypeEnum.MYSELF == type) {
                // get the session from ThreadLocal
            Session session = (Session) ThreadLocalUtil.get(SESSION_KEY);
                if (session != null) {
                    // send full data to the session
                   sendMessageBySession(session, message);
                }
            } else {
                // subsequent incremental synchronization
                // synchronize change data to all sessions
               SESSION_SET.forEach(session -> sendMessageBySession(session, message));
            }
        }
    }

    private static void sendMessageBySession(final Session session, final String message) {
        try {
            // The message is sent through the Websocket session
           session.getBasicRemote().sendText(message);
        } catch (IOException e) {
            log.error("websocket send result is exception: ", e);
        }
    }
}
```



The example we give is a new operation, an incremental synchronization, so it goes

`SESSION_SET.forEach(session -> sendMessageBySession(session, message));`


then through

`session.getBasicRemote().sendText(message);`

the data was sent out.

At this point, when data changes occur on the admin side, the changed data is increments sent to the gateway through the `WebSocket`.

At this point, do you have any questions? For example, where does session come from? How does the gateway establish a connection with admin?

Don't worry, let's do the synchronization analysis on the gateway side.

However, before continuing with the source code analysis, let's use a diagram to string together the above analysis process.

![](/img/activities/code-analysis-websocket-data-sync/websocket-data-sync-admin-en.png)



### 3. Gateway Data Sync

Assume `ShenYu` gateway is already in normal operation, using the data synchronization mode is also `websocket`. How does the gateway receive and process new selector data from admin and send it to the gateway via WebSocket? Let's continue our source code analysis to find out.


#### 3.1 WebsocketClient Accept Data

- ShenyuWebsocketClient.onMessage()

There is a `ShenyuWebsocketClient` class on the gateway, which inherits from `WebSocketClient` and can establish a connection and communicate with `WebSocket`.

```java
public final class ShenyuWebsocketClient extends WebSocketClient {
  // ......
}
```

After sending data via `websocket` on the admin side, `ShenyuWebsocketClient` can receive data via `onMessage()` and then process it itself.


```java
public final class ShenyuWebsocketClient extends WebSocketClient {
      // execute after receiving the message
    @Override
    public void onMessage(final String result) {
        // handle accept data
        handleResult(result);
    }
    
    private void handleResult(final String result) {
        // data deserialization
        WebsocketData websocketData = GsonUtils.getInstance().fromJson(result, WebsocketData.class);
        // which data types, plug-ins, selectors, rules...
        ConfigGroupEnum groupEnum = ConfigGroupEnum.acquireByName(websocketData.getGroupType());
        // which operation type, update, delete...      
        String eventType = websocketData.getEventType();
        String json = GsonUtils.getInstance().toJson(websocketData.getData());

        // handle data
        websocketDataHandler.executor(groupEnum, json, eventType);
    }
}
```

After receiving the data, first has carried on the deserialization operation, read the data type and operation type, then hand over to `websocketDataHandler.executor()` for processing.

#### 3.2 Execute Websocket Data Handler

- WebsocketDataHandler.executor()

A `Websocket` data handler is created in factory mode, providing one handler for each data type:


> plugin --> PluginDataHandler;
>
> selector --> SelectorDataHandler;
>
> rule --> RuleDataHandler;
>
> auth --> AuthDataHandler;
>
> metadata --> MetaDataHandler.

```java

/**
 * Create Websocket data handlers through factory mode
 * The type Websocket cache handler.
 */
public class WebsocketDataHandler {

    private static final EnumMap<ConfigGroupEnum, DataHandler> ENUM_MAP = new EnumMap<>(ConfigGroupEnum.class);

    /**
     * Instantiates a new Websocket data handler.
     * @param pluginDataSubscriber the plugin data subscriber
     * @param metaDataSubscribers  the meta data subscribers
     * @param authDataSubscribers  the auth data subscribers
     */
    public WebsocketDataHandler(final PluginDataSubscriber pluginDataSubscriber,
                                final List<MetaDataSubscriber> metaDataSubscribers,
                                final List<AuthDataSubscriber> authDataSubscribers) {
        // plugin --> PluginDataHandler
        ENUM_MAP.put(ConfigGroupEnum.PLUGIN, new PluginDataHandler(pluginDataSubscriber));
        // selector --> SelectorDataHandler
        ENUM_MAP.put(ConfigGroupEnum.SELECTOR, new SelectorDataHandler(pluginDataSubscriber));
        // rule --> RuleDataHandler
        ENUM_MAP.put(ConfigGroupEnum.RULE, new RuleDataHandler(pluginDataSubscriber));
        // auth --> AuthDataHandler
        ENUM_MAP.put(ConfigGroupEnum.APP_AUTH, new AuthDataHandler(authDataSubscribers));
        // metadata --> MetaDataHandler
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
        // find the corresponding data handler based on the data type
        ENUM_MAP.get(type).handle(json, eventType);
    }
}

```

Different data types have different ways of handling data, so there are different implementation classes. But they also have the same processing logic between them, so they can be implemented through the template approach to design patterns. The same logic is placed in the `handle()` method of the abstract class, and the different logic is handed over to the respective implementation class.


![](/img/activities/code-analysis-websocket-data-sync/data-handler.png)

In our case, a new selector is added, so it will be passed to the `SelectorDataHandler` for data processing.


#### 3.3 Determine the Event Type

- AbstractDataHandler.handle()

Implement common logical handling of data changes: invoke different methods based on different operation types.

```java

public abstract class AbstractDataHandler<T> implements DataHandler {

    /**
     * Convert list.
     * The different logic is implemented by the respective implementation classes
     * @param json the json
     * @return the list
     */
    protected abstract List<T> convert(String json);

    /**
     * Do refresh.
     * The different logic is implemented by the respective implementation classes
     * @param dataList the data list
     */
    protected abstract void doRefresh(List<T> dataList);

    /**
     * Do update.
     * The different logic is implemented by the respective implementation classes
     * @param dataList the data list
     */
    protected abstract void doUpdate(List<T> dataList);

    /**
     * Do delete.
     * The different logic is implemented by the respective implementation classes
     * @param dataList the data list
     */
    protected abstract void doDelete(List<T> dataList);

    // General purpose logic, abstract class implementation
    @Override
    public void handle(final String json, final String eventType) {
        List<T> dataList = convert(json);
        if (CollectionUtils.isNotEmpty(dataList)) {
            DataEventTypeEnum eventTypeEnum = DataEventTypeEnum.acquireByName(eventType);
            switch (eventTypeEnum) {
                case REFRESH:
                case MYSELF:
                    doRefresh(dataList);  //Refreshes data and synchronizes all data
                    break;
                case UPDATE:
                case CREATE:
                    doUpdate(dataList); // Update or create data, incremental synchronization
                    break;
                case DELETE:
                    doDelete(dataList);  // delete data
                    break;
                default:
                    break;
            }
        }
    }
}
```

New selector data, new operation, through `switch-case` into `doUpdate()` method.

#### 3.4 Enter the Specific Data Handler

- SelectorDataHandler.doUpdate()

```java

/**
 * The type Selector data handler.
 */
@RequiredArgsConstructor
public class SelectorDataHandler extends AbstractDataHandler<SelectorData> {

    private final PluginDataSubscriber pluginDataSubscriber;

    //......

    // update data
    @Override
    protected void doUpdate(final List<SelectorData> dataList) {
        dataList.forEach(pluginDataSubscriber::onSelectorSubscribe);
    }
}
```

Iterate over the data and enter the `onSelectorSubscribe()` method.

- PluginDataSubscriber.onSelectorSubscribe()

It has no additional logic and calls the `subscribeDataHandler()` method directly. Within methods, there are data types (plugins, selectors, or rules) and action types (update or delete) to perform different logic.

```java
/**
 * The common plugin data subscriber, responsible for handling all plug-in, selector, and rule information
 */
public class CommonPluginDataSubscriber implements PluginDataSubscriber {
    //......
     // handle selector data
    @Override
    public void onSelectorSubscribe(final SelectoData selectorData) {
        subscribeDataHandler(selectorData, DataEventTypeEnum.UPDATE);
    }    
    
    // A subscription data handler that handles updates or deletions of data
    private <T> void subscribeDataHandler(final T classData, final DataEventTypeEnum dataType) {
        Optional.ofNullable(classData).ifPresent(data -> {
            // plugin data
            if (data instanceof PluginData) {
                PluginData pluginData = (PluginData) data;
                if (dataType == DataEventTypeEnum.UPDATE) { // update
                    // save the data to gateway memory
                     BaseDataCache.getInstance().cachePluginData(pluginData);
                    // If each plugin has its own processing logic, then do it
                    Optional.ofNullable(handlerMap.get(pluginData.getName())).ifPresent(handler -> handler.handlerPlugin(pluginData));
                } else if (dataType == DataEventTypeEnum.DELETE) {  // delete
                    // delete the data from gateway memory
                    BaseDataCache.getInstance().removePluginData(pluginData);
                    // If each plugin has its own processing logic, then do it
                    Optional.ofNullable(handlerMap.get(pluginData.getName())).ifPresent(handler -> handler.removePlugin(pluginData));
                }
            } else if (data instanceof SelectorData) {  // selector data
                SelectorData selectorData = (SelectorData) data;
                if (dataType == DataEventTypeEnum.UPDATE) { // update
                    // save the data to gateway memory
                    BaseDataCache.getInstance().cacheSelectData(selectorData);
                    // If each plugin has its own processing logic, then do it 
                    Optional.ofNullable(handlerMap.get(selectorData.getPluginName())).ifPresent(handler -> handler.handlerSelector(selectorData));
                } else if (dataType == DataEventTypeEnum.DELETE) {  // delete
                    // delete the data from gateway memory
                    BaseDataCache.getInstance().removeSelectData(selectorData);
                    // If each plugin has its own processing logic, then do it
                    Optional.ofNullable(handlerMap.get(selectorData.getPluginName())).ifPresent(handler -> handler.removeSelector(selectorData));
                }
            } else if (data instanceof RuleData) {  // rule data
                RuleData ruleData = (RuleData) data;
                if (dataType == DataEventTypeEnum.UPDATE) { // update
                    // save the data to gateway memory
                    BaseDataCache.getInstance().cacheRuleData(ruleData);
                    // If each plugin has its own processing logic, then do it
                    Optional.ofNullable(handlerMap.get(ruleData.getPluginName())).ifPresent(handler -> handler.handlerRule(ruleData));
                } else if (dataType == DataEventTypeEnum.DELETE) { // delete
                    // delete the data from gateway memory
                    BaseDataCache.getInstance().removeRuleData(ruleData);
                    // If each plugin has its own processing logic, then do it
                    Optional.ofNullable(handlerMap.get(ruleData.getPluginName())).ifPresent(handler -> handler.removeRule(ruleData));
                }
            }
        });
    }
    
}
```

Adding a selector will enter the following logic:

```java
// save the data to gateway memory
BaseDataCache.getInstance().cacheSelectData(selectorData);
// If each plugin has its own processing logic, then do it
Optional.ofNullable(handlerMap.get(selectorData.getPluginName())).ifPresent(handler -> handler.handlerSelector(selectorData));
```

One is to save the data to the gateway's memory. BaseDataCache is the class that ultimately caches data, implemented in a singleton pattern. The selector data is stored in the `SELECTOR_MAP` Map. In the subsequent use, also from this data.


```java
public final class BaseDataCache {
    // private instance
    private static final BaseDataCache INSTANCE = new BaseDataCache();
  	// private constructor
    private BaseDataCache() {
    }
    
    /**
     * Gets instance.
     *  public method
     * @return the instance
     */
    public static BaseDataCache getInstance() {
        return INSTANCE;
    }
    
    /**
      * A Map of the cache selector data
     * pluginName -> SelectorData.
     */
    private static final ConcurrentMap<String, List<SelectorData>> SELECTOR_MAP = Maps.newConcurrentMap();
    
    public void cacheSelectData(final SelectorData selectorData) {
        Optional.ofNullable(selectorData).ifPresent(this::selectorAccept);
    }
        
   /**
     * cache selector data.
     * @param data the selector data
     */
    private void selectorAccept(final SelectorData data) {
        String key = data.getPluginName();
        if (SELECTOR_MAP.containsKey(key)) { // Update operation, delete before insert
            List<SelectorData> existList = SELECTOR_MAP.get(key);
            final List<SelectorData> resultList = existList.stream().filter(r -> !r.getId().equals(data.getId())).collect(Collectors.toList());
            resultList.add(data);
            final List<SelectorData> collect = resultList.stream().sorted(Comparator.comparing(SelectorData::getSort)).collect(Collectors.toList());
            SELECTOR_MAP.put(key, collect);
        } else {  // Add new operations directly to Map
            SELECTOR_MAP.put(key, Lists.newArrayList(data));
        }
    }
    
}
```

Second, if each plugin has its own processing logic, then do it. Through the `IDEA` editor, you can see that after adding a selector, there are the following plugins and processing. We're not going to expand it here.


![](/img/activities/code-analysis-websocket-data-sync/handler-selector.png)

After the above source tracing, and through a practical case, in the `admin` side to add a selector data, will `websocket` data synchronization process analysis cleared.

Let's use the following figure to concatenate the data synchronization process on the gateway side:

![](/img/activities/code-analysis-websocket-data-sync/websocket-data-sync-gateway-en.png)


The data synchronization process has been analyzed, but there are still some problems that have not been analyzed, that is, how does the gateway establish a connection with admin?

### 4. The Gateway Establishes a Websocket Connection with Admin

- websocket config

With the following configuration in the gateway configuration file and the dependency introduced, the `websocket` related service is started.


```yaml
shenyu:
    file:
      enabled: true
    cross:
      enabled: true
    dubbo :
      parameter: multi
    sync:
        websocket :  # Use websocket for data synchronization
          urls: ws://localhost:9095/websocket   # websocket address of admin
```

Add a dependency on websocket in the gateway.


```xml
<!--shenyu data sync start use websocket-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-sync-data-websocket</artifactId>
    <version>${project.version}</version>
</dependency>
```

- Websocket Data Sync Config

The associated bean is created by conditional assembly of springboot. In the gateway started, if we configure the `shenyu.sync.websocket.urls`, then `websocket` data synchronization configuration will be loaded. The dependency loading is done through the `springboot starter`.


```java

/**
 * WebsocketSyncDataService
 * Conditional injection is implemented through SpringBoot
 * Websocket sync data configuration for spring boot.
 */
@Configuration
@ConditionalOnClass(WebsocketSyncDataService.class)
@ConditionalOnProperty(prefix = "shenyu.sync.websocket", name = "urls")
@Slf4j
public class WebsocketSyncDataConfiguration {

    /**
     * Websocket sync data service.
     * @param websocketConfig   the websocket config
     * @param pluginSubscriber the plugin subscriber
     * @param metaSubscribers   the meta subscribers
     * @param authSubscribers   the auth subscribers
     * @return the sync data service
     */
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
        return new WebsocketConfig();  
    }
}
```

Start a new `spring.factories` file in the `resources/META-INF` directory of your project and specify the configuration classes in the file.

![](/img/activities/code-analysis-websocket-data-sync/websocket-springboot-starter.png)


- WebsocketSyncDataService

The following things are done in 'WebsocketSyncDataService' :

- Read configuration `urls`, which represent the admin side of the synchronization address, if there are more than one, use "," split;

- Create a scheduling thread pool, with each `admin` assigned one to perform scheduled tasks;

- Create `ShenyuWebsocketClient`, assign one to each `admin`, set up `websocket` communication with `admin`;

- Start connection with admin end `websocket`;

- Executes a scheduled task every 10 seconds. The main function is to determine whether the `websocket` connection has been disconnected, if so, try to reconnect. If not, a `ping-pong` test is performed.

```java

/**
 * Websocket sync data service.
 */
@Slf4j
public class WebsocketSyncDataService implements SyncDataService, AutoCloseable {

    private final List<WebSocketClient> clients = new ArrayList<>();

    private final ScheduledThreadPoolExecutor executor;

    /**
     * Instantiates a new Websocket sync cache.
     * @param websocketConfig      the websocket config
     * @param pluginDataSubscriber the plugin data subscriber
     * @param metaDataSubscribers  the meta data subscribers
     * @param authDataSubscribers  the auth data subscribers
     */
    public WebsocketSyncDataService(final WebsocketConfig websocketConfig,
                                    final PluginDataSubscriber pluginDataSubscriber,
                                    final List<MetaDataSubscriber> metaDataSubscribers,
                                    final List<AuthDataSubscriber> authDataSubscribers) {
        // If there are multiple synchronization addresses on the admin side, use commas (,) to separate them
        String[] urls = StringUtils.split(websocketConfig.getUrls(), ",");
        // Create a scheduling thread pool, one for each admin
        executor = new ScheduledThreadPoolExecutor(urls.length, ShenyuThreadFactory.create("websocket-connect", true));
        for (String url : urls) {
            try {
                //Create a WebsocketClient and assign one to each admin
                clients.add(new ShenyuWebsocketClient(new URI(url), Objects.requireNonNull(pluginDataSubscriber), metaDataSubscribers, authDataSubscribers));
            } catch (URISyntaxException e) {
                log.error("websocket url({}) is error", url, e);
            }
        }
        try {
            for (WebSocketClient client : clients) {
                // Establish a connection with the WebSocket Server
                boolean success = client.connectBlocking(3000, TimeUnit.MILLISECONDS);
                if (success) {
                    log.info("websocket connection is successful.....");
                } else {
                    log.error("websocket connection is error.....");
                }

                // Run a scheduled task every 10 seconds
                // The main function is to check whether the WebSocket connection is disconnected. If the connection is disconnected, retry the connection.
                // If it is not disconnected, the ping-pong test is performed
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
        // close websocket client
        for (WebSocketClient client : clients) {
            if (!client.isClosed()) {
                client.close();
            }
        }
        // close threadpool
        if (Objects.nonNull(executor)) {
            executor.shutdown();
        }
    }
}
```

- ShenyuWebsocketClient

The `WebSocket` client created in `ShenYu` to communicate with the `admin` side. After the connection is successfully established for the first time, full data is synchronized and incremental data is subsequently synchronized.

```java

/**
 * The type shenyu websocket client.
 */
@Slf4j
public final class ShenyuWebsocketClient extends WebSocketClient {
    
    private volatile boolean alreadySync = Boolean.FALSE;
    
    private final WebsocketDataHandler websocketDataHandler;
    
    /**
     * Instantiates a new shenyu websocket client.
     * @param serverUri             the server uri  
     * @param pluginDataSubscriber the plugin data subscriber 
     * @param metaDataSubscribers   the meta data subscribers 
     * @param authDataSubscribers   the auth data subscribers 
     */
    public ShenyuWebsocketClient(final URI serverUri, final PluginDataSubscriber pluginDataSubscriber,final List<MetaDataSubscriber> metaDataSubscribers, final List<AuthDataSubscriber> authDataSubscribers) {
        super(serverUri);
        this.websocketDataHandler = new WebsocketDataHandler(pluginDataSubscriber, metaDataSubscribers, authDataSubscribers);
    }

    // Execute after the connection is successfully established
    @Override
    public void onOpen(final ServerHandshake serverHandshake) {
        // To prevent re-execution when reconnecting, use alreadySync to determine
        if (!alreadySync) {
            // Synchronize all data, type MYSELF
            send(DataEventTypeEnum.MYSELF.name());
            alreadySync = true;
        }
    }

    // Execute after receiving the message
    @Override
    public void onMessage(final String result) {
        // handle data
        handleResult(result);
    }
    
    // Execute after shutdown
    @Override
    public void onClose(final int i, final String s, final boolean b) {
        this.close();
    }
    
    // Execute after error
    @Override
    public void onError(final Exception e) {
        this.close();
    }
    
    @SuppressWarnings("ALL")
    private void handleResult(final String result) {
        // Data deserialization
        WebsocketData websocketData = GsonUtils.getInstance().fromJson(result, WebsocketData.class);
        // Which data types, plugins, selectors, rules...
        ConfigGroupEnum groupEnum = ConfigGroupEnum.acquireByName(websocketData.getGroupType());
        // Which operation type, update, delete...
        String eventType = websocketData.getEventType();
        String json = GsonUtils.getInstance().toJson(websocketData.getData());

        // handle data
        websocketDataHandler.executor(groupEnum, json, eventType);
    }
}

```

### 5. Summary

This paper through a practical case, the data synchronization principle of websocket source code analysis. The main knowledge points involved are as follows:

- `WebSocket` supports bidirectional communication and has good performance. It is recommended.

- Complete event publishing and listening via `Spring`;

- Support multiple synchronization strategies through abstract `DataChangedListener` interface, interface oriented programming;

- Use factory mode to create `WebsocketDataHandler` to handle different data types;

- Implement `AbstractDataHandler` using template method design patterns to handle general operation types;

- Use singleton design pattern to cache data class `BaseDataCache`;

- Loading of configuration classes via conditional assembly of SpringBoot and starter loading mechanism.


---
title: Etcd Data Synchronization Source Code Analysis
author: 4zd
author_title: Apache ShenYu Contributor
author_url: https://github.com/4zd
tags: [etcd,data sync,Apache ShenYu]
---

> [Apache ShenYu](https://shenyu.apache.org/zh/docs/index) is an asynchronous, high-performance, cross-language, responsive API gateway.

In `ShenYu` gateway, data synchronization refers to how to synchronize the updated data to the gateway after the data is sent in the background management system. The Apache ShenYu gateway currently supports data synchronization for `ZooKeeper`, `WebSocket`, `http long poll`, `Nacos`, `Etcd` and `Consul`. The main content of this article is based on `Etcd` data synchronization source code analysis.

> This paper based on `shenyu-2.4.0` version of the source code analysis, the official website of the introduction of please refer to the [Data Synchronization Design](https://shenyu.apache.org/docs/design/data-sync/) .

### 1. About Etcd

[Etcd](https://etcd.io) is a strongly consistent, distributed key-value store that provides a reliable way to store data that needs to be accessed by a distributed system or cluster of machines.

### 2. Admin Data Sync

We traced the source code from a real case, such as updating a selector data in the `Divide` plugin to a weight of 90 in a background administration system:

![](/img/activities/code-analysis-zookeeper-data-sync/update-selector-en.png)

#### 2.1 Accept Data

- SelectorController.createSelector()

Enter the createSelector() method of the `SelectorController` class, which validates data, adds or updates data, and returns results.

```java
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/selector")
public class SelectorController {
    
    @PutMapping("/{id}")
    public ShenyuAdminResult updateSelector(@PathVariable("id") final String id, @Valid @RequestBody final SelectorDTO selectorDTO) {
        // set the current selector data ID
        selectorDTO.setId(id);
        // create or update operation
        Integer updateCount = selectorService.createOrUpdate(selectorDTO);
        // return result 
        return ShenyuAdminResult.success(ShenyuResultMessage.UPDATE_SUCCESS, updateCount);
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
                default:  // other types throw exception
                  throw new IllegalStateException("Unexpected value: " + event.getGroupKey());
            }
        }
    }
    
}
```

When there is a data change, the `onApplicationEvent` method is called and all the data change listeners are iterated to determine the data type and handed over to the appropriate data listener for processing.

ShenYu groups all the data into five categories: `APP_AUTH`, `PLUGIN`, `RULE`, `SELECTOR` and `META_DATA`.

Here the data change listener (`DataChangedListener`) is an abstraction of the data synchronization policy. Its concrete implementation is:

![](/img/activities/code-analysis-zookeeper-data-sync/data-changed-listener.png)

These implementation classes are the synchronization strategies currently supported by ShenYu:

- `WebsocketDataChangedListener`: data synchronization based on Websocket;
- `ZookeeperDataChangedListener`:data synchronization based on Zookeeper;
- `ConsulDataChangedListener`: data synchronization based on Consul;
- `EtcdDataDataChangedListener`：data synchronization based on etcd;
- `HttpLongPollingDataChangedListener`：data synchronization based on http long polling;
- `NacosDataChangedListener`：data synchronization based on nacos;

Given that there are so many implementation strategies, how do you decide which to use?

Because this paper is based on `Etcd` data synchronization source code analysis, so here to `EtcdDataDataChangedListener` as an example, the analysis of how it is loaded and implemented.

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
     * The type Etcd listener.
     */
    @Configuration
    @ConditionalOnProperty(prefix = "shenyu.sync.etcd", name = "url")
    @EnableConfigurationProperties(EtcdProperties.class)
    static class EtcdListener {

        @Bean
        public EtcdClient etcdClient(final EtcdProperties etcdProperties) {
            Client client = Client.builder()
                    .endpoints(etcdProperties.getUrl())
                    .build();
            return new EtcdClient(client);
        }

        /**
         * Config event listener data changed listener.
         *
         * @param etcdClient the etcd client
         * @return the data changed listener
         */
        @Bean
        @ConditionalOnMissingBean(EtcdDataDataChangedListener.class)
        public DataChangedListener etcdDataChangedListener(final EtcdClient etcdClient) {
            return new EtcdDataDataChangedListener(etcdClient);
        }

        /**
         * data init.
         *
         * @param etcdClient        the etcd client
         * @param syncDataService the sync data service
         * @return the etcd data init
         */
        @Bean
        @ConditionalOnMissingBean(EtcdDataInit.class)
        public EtcdDataInit etcdDataInit(final EtcdClient etcdClient, final SyncDataService syncDataService) {
            return new EtcdDataInit(etcdClient, syncDataService);
        }
    }
    
    // other code is omitted......
}

```

This configuration class is implemented through the SpringBoot conditional assembly class. The `EtcdListener` class has several annotations:

- `@Configuration`: Configuration file, application context;

- `@ConditionalOnProperty(prefix = "shenyu.sync.etcd", name = "url")`: attribute condition. The configuration class takes effect only when the condition is met. That is, when we have the following configuration, `etcd` is used for data synchronization.

  ```properties
  shenyu:  
    sync:
       etcd:
            url: localhost:2181
  ```
  
- `@EnableConfigurationProperties(EtcdProperties.class)`：import `EtcdProperties`; The properties in the class `EtcdProperties` is relative to the properties which is with `shenyu.sync.etcd` as prefix in the configuration file.

```java
 @Data
@ConfigurationProperties(prefix = "shenyu.sync.etcd")
public class EtcdProperties {

  private String url;

  private Integer sessionTimeout;

  private Integer connectionTimeout;

  private String serializer;
}
```

When the `shenyu.sync.etcd.url` property is set in the configuration file, `Admin` would use the `etcd` data synchronization, `EtcdListener` is generated and the beans with type `EtcdClient`, `EtcdDataDataChangedListener` and `EtcdDataInit` would also be generated. 

* The bean with the type `EtcdClient` would be generated, named `etcdClient`. This bean configues the connection properties of the `etcd` server based on the configuration file and can operate the `etcd`nodes directly.
* The bean with the type `EtcdDataDataChangedListener` would be generated, named `etcdDataDataChangedListener`.  This bean use the bean `etcdClient` as a member variable and so when the event is listened, `etcdDataDataChangedListener` would call the callback method and use the `etcdClient`  to operate the `etcd` nodes.
* The bean with the type `EtcdDataInit` would be generated, named `etcdDataInit`. This bean use the bean `etcdClient` and `syncDataService` as member variables, and use `etcdClient` to judge whether the data are initialized, if not, would use `syncDataService` to refresh data. We would dive into the details later.       

So in the event handler `onApplicationEvent()`, it goes to the corresponding `listener`. In our case, it is a selector data update, data synchronization is `etcd`, so, the code will enter the `EtcdDataDataChangedListener` selector data change process.

```java
    @Override
    @SuppressWarnings("unchecked")
    public void onApplicationEvent(final DataChangedEvent event) {
        // Iterate through the data change listener (usually using a data synchronization approach is fine)
        for (DataChangedListener listener : listeners) {
            // what kind of data has changed
         switch (event.getGroupKey()) {
                    
                // other code logic is omitted
                    
                case SELECTOR:   // selector data
                    listener.onSelectorChanged((List<SelectorData>) event.getSource(), event.getEventType());   // In our case, will enter the EtcdDataDataChangedListener selector data change process
                    break;
         }
    }
```

#### 2.4 Etcd Data Changed Listener

- EtcdDataDataChangedListener.onSelectorChanged()

In the `onSelectorChanged()` method, determine the type of action, whether to refresh synchronization or update or create synchronization. Determine whether the node is in `etcd` based on the current selector data.

```java

/**
 * EtcdDataDataChangedListener.
 */
@Slf4j
public class EtcdDataDataChangedListener implements DataChangedListener {
    @Override
    public void onSelectorChanged(final List<SelectorData> changed, final DataEventTypeEnum eventType) {
        if (eventType == DataEventTypeEnum.REFRESH && !changed.isEmpty()) {
            String selectorParentPath = DefaultPathConstants.buildSelectorParentPath(changed.get(0).getPluginName());
            etcdClient.deleteEtcdPathRecursive(selectorParentPath);
        }
        for (SelectorData data : changed) {
            String selectorRealPath = DefaultPathConstants.buildSelectorRealPath(data.getPluginName(), data.getId());
            if (eventType == DataEventTypeEnum.DELETE) {
                etcdClient.delete(selectorRealPath);
                continue;
            }
            //create or update
            updateNode(selectorRealPath, data);
        }
    }
  
}
```

This part is very important. The variable `changed` represents the `SelectorData` list, the variable `eventType` reprents the event type. When the event type is `REFRESH` and the `SelectorData` has changed, all the `selector` nodes under this `plugin` would be deleted in `etcd`. We should notice that the condition that the `SelectorData` has changed is necessary, otherwise a bug would appear that all the selector nodes would be deleted when no `SelectorData` data has changed. 

As long as the changed data is correctly written to the `etcd` node, the `admin` side of the operation is complete. 

In our current case, updating one of the selector data in the `Divide` plugin with a weight of 90 updates specific nodes in the graph.

![](/img/activities/code-analysis-zookeeper-data-sync/zookeeper-node.png)


We series the above update flow with a sequence diagram.


![](/img/activities/code-analysis-etcd-data-sync/etcd-sync-sequence-admin-en.png)


### 3. Gateway Data Sync

Assume that the ShenYu gateway is already running properly, and the data synchronization mode is also `etcd`. How does the gateway receive and process the selector data after updating it on the admin side and sending the changed data to etcd? Let's continue our source code analysis to find out.

#### 3.1 EtcdClient Accept Data

- EtcdClient.watchDataChange()

There is a `EtcdSyncDataService` class on the gateway, which subscribing to the data node through `etcdClient` and can sense when the data changes.


```java
/**
 * Data synchronize of etcd.
 */
@Slf4j
public class EtcdSyncDataService implements SyncDataService, AutoCloseable {
    private void subscribeSelectorDataChanges(final String path) {
      etcdClient.watchDataChange(path, (updateNode, updateValue) -> cacheSelectorData(updateValue),
              this::unCacheSelectorData);
    }
  //other codes omitted
}
```

Etcd's  `Watch` mechanism notifies subscribing clients of node changes. In our case, updating the selector information goes to the `watchDataChange()` method. `cacheSelectorData()` is used to process data.


#### 3.2 Handle Data

- EtcdSyncDataService.cacheSelectorData()

The data is not null, and caching the selector data is again handled by `PluginDataSubscriber`.

```java
    private void cacheSelectorData(final SelectorData selectorData) {
        Optional.ofNullable(selectorData)
                .ifPresent(data -> Optional.ofNullable(pluginDataSubscriber).ifPresent(e -> e.onSelectorSubscribe(data)));
    }
```

`PluginDataSubscriber` is an interface, it is only a `CommonPluginDataSubscriber` implementation class, responsible for data processing plugin, selector and rules.



#### 3.3 Common Plugin Data Subscriber

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

#### 3.4 Data cached to Memory


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

![](/img/activities/code-analysis-zookeeper-data-sync/handler-selector.png)

After the above source tracking, and through a practical case, in the `admin` end to update a selector data, the `ZooKeeper` data synchronization process analysis is clear.


Let's series the data synchronization process on the gateway side through the sequence diagram:


![](/img/activities/code-analysis-etcd-data-sync/etcd-sync-sequence-gateway-en.png)

The data synchronization process has been analyzed. In order to prevent the synchronization process from being interrupted, other logic is ignored during the analysis. We also need to analyze the process of Admin synchronization data initialization and gateway synchronization operation initialization.


### 4. Admin Data Sync  initialization

When `admin` starts, the current data will be fully synchronized to `etcd`, the implementation logic is as follows:


```java

/**
 * EtcdDataInit.
 */
@Slf4j
public class EtcdDataInit implements CommandLineRunner {

  private final EtcdClient etcdClient;

  private final SyncDataService syncDataService;

  public EtcdDataInit(final EtcdClient client, final SyncDataService syncDataService) {
    this.etcdClient = client;
    this.syncDataService = syncDataService;
  }

  @Override
  public void run(final String... args) throws Exception {
    final String pluginPath = DefaultPathConstants.PLUGIN_PARENT;
    final String authPath = DefaultPathConstants.APP_AUTH_PARENT;
    final String metaDataPath = DefaultPathConstants.META_DATA;
    if (!etcdClient.exists(pluginPath) && !etcdClient.exists(authPath) && !etcdClient.exists(metaDataPath)) {
      log.info("Init all data from database");
      syncDataService.syncAll(DataEventTypeEnum.REFRESH);
    }
  }
}

```

Check whether there is data in `etcd`, if not, then synchronize.

`EtcdDataInit` implements the `CommandLineRunner` interface. It is an interface provided by `SpringBoot` that executes the `run()` method after all `Spring Beans` initializations and is often used for initialization operations in a project.


- SyncDataService.syncAll()

Query data from the database, and then perform full data synchronization, all authentication information, plugin information, selector information, rule information, and metadata information. Synchronous events are published primarily through `eventPublisher`. After publishing the event via `publishEvent()`, the `ApplicationListener` performs the event change operation. In `ShenYu` is mentioned in `DataChangedEventDispatcher`.

```java
@Service
public class SyncDataServiceImpl implements SyncDataService {
    // eventPublisher
    private final ApplicationEventPublisher eventPublisher;
    
     /***
     * sync all data
     * @param type the type
     * @return
     */
    @Override
    public boolean syncAll(final DataEventTypeEnum type) {
        // app auth data
        appAuthService.syncData();
        // plugin data
        List<PluginData> pluginDataList = pluginService.listAll();
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.PLUGIN, type, pluginDataList));
        // selector data
        List<SelectorData> selectorDataList = selectorService.listAll();
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.SELECTOR, type, selectorDataList));
        // rule data
        List<RuleData> ruleDataList = ruleService.listAll();
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.RULE, type, ruleDataList));
        // metadata
        metaDataService.syncData();
        return true;
    }
    
}
```

### 5. Gateway Data Sync Init 

The initial operation of data synchronization on the gateway side is mainly the node in the subscription `etcd`. When there is a data change, the changed data will be received. This relies on the `Watch` mechanism of `etcd`. In `ShenYu`, the one responsible for `etcd` data synchronization is `EtcdSyncDataService`, also mentioned earlier.

The function logic of `EtcdSyncDataService` is completed in the process of instantiation: the subscription to `Shenyu` data synchronization node in `etcd` is completed. Subscription here is divided into two kinds, one kind is existing node data updated above, through this `etcdClient.subscribeDataChanges()` method; Another kind is under the current node, add or delete nodes change namely child nodes, it through `etcdClient.subscribeChildChanges()` method.

`EtcdSyncDataService` code is a bit too much, here we use plugin data read and subscribe to track, other types of data operation principle is the same.


```java
/**
 * Data synchronize of etcd.
 */
@Slf4j
public class EtcdSyncDataService implements SyncDataService, AutoCloseable {
    /**
     * Instantiates a new Zookeeper cache manager.
     *
     * @param etcdClient             the etcd client
     * @param pluginDataSubscriber the plugin data subscriber
     * @param metaDataSubscribers  the meta data subscribers
     * @param authDataSubscribers  the auth data subscribers
     */
    public EtcdSyncDataService(final EtcdClient etcdClient, final PluginDataSubscriber pluginDataSubscriber,
                                    final List<MetaDataSubscriber> metaDataSubscribers, final List<AuthDataSubscriber> authDataSubscribers) {
        this.etcdClient = etcdClient;
        this.pluginDataSubscriber = pluginDataSubscriber;
        this.metaDataSubscribers = metaDataSubscribers;
        this.authDataSubscribers = authDataSubscribers;
        watcherData();
        watchAppAuth();
        watchMetaData();
    }

    private void watcherData() {
        final String pluginParent = DefaultPathConstants.PLUGIN_PARENT;
        List<String> pluginZKs = etcdClientGetChildren(pluginParent);
        for (String pluginName : pluginZKs) {
            watcherAll(pluginName);
        }

        etcdClient.watchChildChange(pluginParent, (updateNode, updateValue) -> {
            if (!updateNode.isEmpty()) {
                watcherAll(updateNode);
            }
        }, null);
    }

    private void watcherAll(final String pluginName) {
        watcherPlugin(pluginName);
        watcherSelector(pluginName);
        watcherRule(pluginName);
    }

    private void watcherPlugin(final String pluginName) {
        String pluginPath = DefaultPathConstants.buildPluginPath(pluginName);
        cachePluginData(etcdClient.get(pluginPath));
        subscribePluginDataChanges(pluginPath, pluginName);
    }

    private void cachePluginData(final String dataString) {
        final PluginData pluginData = GsonUtils.getInstance().fromJson(dataString, PluginData.class);
        Optional.ofNullable(pluginData)
                .flatMap(data -> Optional.ofNullable(pluginDataSubscriber)).ifPresent(e -> e.onSubscribe(pluginData));
    }

    private void subscribePluginDataChanges(final String pluginPath, final String pluginName) {
    etcdClient.watchDataChange(pluginPath, (updatePath, updateValue) -> {
      final String dataPath = buildRealPath(pluginPath, updatePath);
      final String dataStr = etcdClient.get(dataPath);
      final PluginData data = GsonUtils.getInstance().fromJson(dataStr, PluginData.class);
      Optional.ofNullable(data)
              .ifPresent(d -> Optional.ofNullable(pluginDataSubscriber).ifPresent(e -> e.onSubscribe(d)));
    }, deleteNode -> deletePlugin(pluginName));
  }
  
}

```

The above source code is given comments, I believe you can understand. The main logic for subscribing to plug-in data is as follows:

> 1. Create the current plugin path
> 3. Read the current node data on etcd and deserialize it
> 4. The plugin data is cached in the gateway memory
> 5. Subscribe to the plug-in node


### 6. Summary

This paper through a practical case, `etcd` data synchronization principle source code analysis. The main knowledge points involved are as follows:

- Data synchronization based on `etcd` is mainly implemented through `watch` mechanism;

- Complete event publishing and listening via `Spring`;

- Support multiple synchronization strategies through abstract `DataChangedListener` interface, interface oriented programming;

- Use singleton design pattern to cache data class `BaseDataCache`;

- Loading of configuration classes via conditional assembly of `SpringBoot` and `starter` loading mechanism.

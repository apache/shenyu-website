---
slug: code-analysis-zookeeper-data-sync
title: ZooKeeper Data Synchronization Source Code Analysis
author: midnight2104
author_title: Apache ShenYu Committer
author_url: https://github.com/midnight2104
tags: [zookeeper,data sync,Apache ShenYu]
---

> [Apache ShenYu](https://shenyu.apache.org/zh/docs/index) is an asynchronous, high-performance, cross-language, responsive API gateway.

In `ShenYu` gateway, data synchronization refers to how to synchronize the updated data to the gateway after the data is sent in the background management system. The Apache ShenYu gateway currently supports data synchronization for `ZooKeeper`, `WebSocket`, `http long poll`, `Nacos`, `etcd` and `Consul`. The main content of this article is based on `WebSocket` data synchronization source code analysis.

> This paper based on `shenyu-2.4.0` version of the source code analysis, the official website of the introduction of please refer to the [Data Synchronization Design](https://shenyu.apache.org/docs/design/data-sync/) .

### 1. About ZooKeeper

Apache ZooKeeper is a software project of the Apache Software Foundation that provides open source distributed configuration services, synchronization services, and naming registries for large-scale distributed computing. ZooKeeper nodes store their data in a hierarchical namespace, much like a file system or a prefix tree structure. Clients can read and write on nodes and thus have a shared configuration service in this way.

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

Because this paper is based on `zookeeper` data synchronization source code analysis, so here to `ZookeeperDataChangedListener` as an example, the analysis of how it is loaded and implemented.

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
     * zookeeper data sunc
     * The type Zookeeper listener.
     */
    @Configuration
    @ConditionalOnProperty(prefix = "shenyu.sync.zookeeper", name = "url")  // The condition property is loaded only when it is met
    @Import(ZookeeperConfiguration.class)
    static class ZookeeperListener {

        /**
         * Config event listener data changed listener.
         * @param zkClient the zk client
         * @return the data changed listener
         */
        @Bean
        @ConditionalOnMissingBean(ZookeeperDataChangedListener.class)
        public DataChangedListener zookeeperDataChangedListener(final ZkClient zkClient) {
            return new ZookeeperDataChangedListener(zkClient);
        }

        /**
         * Zookeeper data init zookeeper data init.
         * @param zkClient        the zk client
         * @param syncDataService the sync data service
         * @return the zookeeper data init
         */
        @Bean
        @ConditionalOnMissingBean(ZookeeperDataInit.class)
        public ZookeeperDataInit zookeeperDataInit(final ZkClient zkClient, final SyncDataService syncDataService) {
            return new ZookeeperDataInit(zkClient, syncDataService);
        }
    }
    
    // other code is omitted......
}

```

This configuration class is implemented through the SpringBoot conditional assembly class. The ZookeeperListener class has several annotations:

- `@Configuration`: Configuration file, application context;

- `@ConditionalOnProperty(prefix = "shenyu.sync.zookeeper", name = "url")`: attribute condition. The configuration class takes effect only when the condition is met. That is, when we have the following configuration, `ZooKeeper` is used for data synchronization.

  ```properties
  shenyu:  
    sync:
       zookeeper:
            url: localhost:2181
            sessionTimeout: 5000
            connectionTimeout: 2000
  ```

- ` @Import(ZookeeperConfiguration.class)`：import `ZookeeperConfiguration`；

```java
  @EnableConfigurationProperties(ZookeeperProperties.class)  // enable zookeeper properties
  public class ZookeeperConfiguration {

    /**
     * register zkClient in spring ioc.
     * @param zookeeperProp the zookeeper configuration
     * @return ZkClient {@linkplain ZkClient}
        */
      @Bean
      @ConditionalOnMissingBean(ZkClient.class)
      public ZkClient zkClient(final ZookeeperProperties zookeeperProp) {
        return new ZkClient(zookeeperProp.getUrl(), zookeeperProp.getSessionTimeout(), zookeeperProp.getConnectionTimeout()); // 读取zk配置信息，并创建zkClient
      }
  }
```

```java
@Data
@ConfigurationProperties(prefix = "shenyu.sync.zookeeper") // zookeeper properties
public class ZookeeperProperties {

    private String url;

    private Integer sessionTimeout;

    private Integer connectionTimeout;

    private String serializer;
}
```

When we take the initiative to configuration, use the `zookeeper` data synchronization, `zookeeperDataChangedListener` is generated. So in the event handler `onApplicationEvent()`, it goes to the corresponding `listener`. In our case, it is a selector data update, data synchronization is `zookeeper`, so, the code will enter the `ZookeeperDataChangedListener` selector data change process.

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
                    listener.onSelectorChanged((List<SelectorData>) event.getSource(), event.getEventType());   // In our case, will enter the ZookeeperDataChangedListener selector data change process
                    break;
         }
    }
```

#### 2.4 Zookeeper Data Changed Listener

- ZookeeperDataChangedListener.onSelectorChanged()

In the `onSelectorChanged()` method, determine the type of action, whether to refresh synchronization or update or create synchronization. Determine whether the node is in `zk` based on the current selector data.

```java

/**
 * use ZooKeeper to publish change data
 */
public class ZookeeperDataChangedListener implements DataChangedListener {
    
    // The selector information changed
    @Override
    public void onSelectorChanged(final List<SelectorData> changed, final DataEventTypeEnum eventType) {
        // refresh
        if (eventType == DataEventTypeEnum.REFRESH && !changed.isEmpty()) {
            String selectorParentPath = DefaultPathConstants.buildSelectorParentPath(changed.get(0).getPluginName());
            deleteZkPathRecursive(selectorParentPath);
        }
        // changed data
        for (SelectorData data : changed) {
            // build selector real path
            String selectorRealPath = DefaultPathConstants.buildSelectorRealPath(data.getPluginName(), data.getId());
            // delete
            if (eventType == DataEventTypeEnum.DELETE) {
                deleteZkPath(selectorRealPath);
                continue;
            }
            // selector parent path
            String selectorParentPath = DefaultPathConstants.buildSelectorParentPath(data.getPluginName());
            // create parent node
            createZkNode(selectorParentPath);
            // insert or update data
            insertZkNode(selectorRealPath, data);
        }
    }

	// create zk node
    private void createZkNode(final String path) {
        // create only if it does not exist
        if (!zkClient.exists(path)) {
            zkClient.createPersistent(path, true);
        }
    }

    // insert zk node
    private void insertZkNode(final String path, final Object data) {
        // create zk node
        createZkNode(path);
        // write data by zkClient 
        zkClient.writeData(path, null == data ? "" : GsonUtils.getInstance().toJson(data));
    }
    
}
```

As long as the changed data is correctly written to the `zk` node, the `admin` side of the operation is complete. `ShenYu` uses `zk` for data synchronization, `zk` nodes are carefully designed.

In our current case, updating one of the selector data in the `Divide` plugin with a weight of 90 updates specific nodes in the graph.

![](/img/activities/code-analysis-zookeeper-data-sync/zookeeper-node.png)


We series the above update flow with a sequence diagram.


![](/img/activities/code-analysis-zookeeper-data-sync/zk-sync-sequence-admin-en.png)


### 3. Gateway Data Sync

Assume that the ShenYu gateway is already running properly, and the data synchronization mode is also `Zookeeper`. How does the gateway receive and process the selector data after updating it on the admin side and sending the changed data to ZK? Let's continue our source code analysis to find out.

#### 3.1 ZkClient Accept Data

- ZkClient.subscribeDataChanges()

There is a `ZookeeperSyncDataService` class on the gateway, which subscribing to the data node through `ZkClient` and can sense when the data changes.


```java
/**
 * ZookeeperSyncDataService
 */
public class ZookeeperSyncDataService implements SyncDataService, AutoCloseable {
    
private void subscribeSelectorDataChanges(final String path) {
       // zkClient subscribe data 
        zkClient.subscribeDataChanges(path, new IZkDataListener() {
            @Override
            public void handleDataChange(final String dataPath, final Object data) {
                cacheSelectorData(GsonUtils.getInstance().fromJson(data.toString(), SelectorData.class)); // zk node data changed
            }

            @Override
            public void handleDataDeleted(final String dataPath) {
                unCacheSelectorData(dataPath);  // zk node data deleted
            }
        });
    }
 
    // ...
}
```

ZooKeeper's  `Watch` mechanism notifies subscribing clients of node changes. In our case, updating the selector information goes to the `handleDataChange()` method. `cacheSelectorData()` is used to process data.


#### 3.2 Handle Data

- ZookeeperSyncDataService.cacheSelectorData()

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


![](/img/activities/code-analysis-zookeeper-data-sync/zk-sync-sequence-gateway-en.png)

The data synchronization process has been analyzed. In order to prevent the synchronization process from being interrupted, other logic is ignored during the analysis. We also need to analyze the process of Admin synchronization data initialization and gateway synchronization operation initialization.


### 4. Admin Data Sync  initialization

When `admin` starts, the current data will be fully synchronized to `zk`, the implementation logic is as follows:


```java

/**
 * Zookeeper data init
 */
public class ZookeeperDataInit implements CommandLineRunner {

    private final ZkClient zkClient;

    private final SyncDataService syncDataService;

    /**
     * Instantiates a new Zookeeper data init.
     *
     * @param zkClient        the zk client
     * @param syncDataService the sync data service
     */
    public ZookeeperDataInit(final ZkClient zkClient, final SyncDataService syncDataService) {
        this.zkClient = zkClient;
        this.syncDataService = syncDataService;
    }

    @Override
    public void run(final String... args) {
        String pluginPath = DefaultPathConstants.PLUGIN_PARENT;
        String authPath = DefaultPathConstants.APP_AUTH_PARENT;
        String metaDataPath = DefaultPathConstants.META_DATA;
        // Determine whether data exists in zk
        if (!zkClient.exists(pluginPath) && !zkClient.exists(authPath) && !zkClient.exists(metaDataPath)) {
            syncDataService.syncAll(DataEventTypeEnum.REFRESH);
        }
    }
}

```

Check whether there is data in `zk`, if not, then synchronize.


`ZookeeperDataInit` implements the `CommandLineRunner` interface. It is an interface provided by `SpringBoot` that executes the `run()` method after all `Spring Beans` initializations and is often used for initialization operations in a project.


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

The initial operation of data synchronization on the gateway side is mainly the node in the subscription `zk`. When there is a data change, the changed data will be received. This relies on the `Watch` mechanism of `ZooKeeper`. In `ShenYu`, the one responsible for `zk` data synchronization is `ZookeeperSyncDataService`, also mentioned earlier.

The function logic of `ZookeeperSyncDataService` is completed in the process of instantiation: the subscription to `Shenyu` data synchronization node in `zk` is completed. Subscription here is divided into two kinds, one kind is existing node data updated above, through this `zkClient.subscribeDataChanges()` method; Another kind is under the current node, add or delete nodes change namely child nodes, it through `zkClient.subscribeChildChanges()` method.

`ZookeeperSyncDataService` code is a bit too much, here we use plugin data read and subscribe to track, other types of data operation principle is the same.


```java

/**
 *  zookeeper sync data service
 */
public class ZookeeperSyncDataService implements SyncDataService, AutoCloseable {
    // At instantiation time, the data is read from the ZK and the node is subscribed
    public ZookeeperSyncDataService(/* omit the construction argument */ ) {
        this.zkClient = zkClient;
        this.pluginDataSubscriber = pluginDataSubscriber;
        this.metaDataSubscribers = metaDataSubscribers;
        this.authDataSubscribers = authDataSubscribers;
        // watch plugin, selector and rule data
        watcherData();
        // watch app auth data
        watchAppAuth();
        // watch metadata
        watchMetaData();
    }
    
    private void watcherData() {
        // plugin node path
        final String pluginParent = DefaultPathConstants.PLUGIN_PARENT;
        // all plugin nodes
        List<String> pluginZKs = zkClientGetChildren(pluginParent);
        for (String pluginName : pluginZKs) {
            // watch plugin, selector, rule data node
            watcherAll(pluginName);
        }
        //subscribing to child nodes (adding or removing a plugin)
        zkClient.subscribeChildChanges(pluginParent, (parentPath, currentChildren) -> {
            if (CollectionUtils.isNotEmpty(currentChildren)) {
                for (String pluginName : currentChildren) {
                    // you need to subscribe to all plugin, selector, and rule data for the child node
                      watcherAll(pluginName);
                }
            }
        });
    }
    
    private void watcherAll(final String pluginName) {
        // watch plugin
        watcherPlugin(pluginName);
        // watch selector
        watcherSelector(pluginName);
        // watch rule
        watcherRule(pluginName);
    }

    private void watcherPlugin(final String pluginName) {
        // plugin path
        String pluginPath = DefaultPathConstants.buildPluginPath(pluginName);
        // create if not exist
        if (!zkClient.exists(pluginPath)) {
            zkClient.createPersistent(pluginPath, true);
        }
        // read the current node data on zk and deserialize it
        PluginData pluginData = null == zkClient.readData(pluginPath) ? null
                : GsonUtils.getInstance().fromJson((String) zkClient.readData(pluginPath), PluginData.class);
        // cached into gateway memory
        cachePluginData(pluginData);
        // subscribe plugin data
        subscribePluginDataChanges(pluginPath, pluginName);
    }
    
   private void cachePluginData(final PluginData pluginData) {
    //omit implementation logic, is actually the CommonPluginDataSubscriber operation, can connect with the front
    }
    
    private void subscribePluginDataChanges(final String pluginPath, final String pluginName) {
        // subscribe data changes
        zkClient.subscribeDataChanges(pluginPath, new IZkDataListener() {

            @Override
            public void handleDataChange(final String dataPath, final Object data) {  // update
                 //omit implementation logic, is actually the CommonPluginDataSubscriber operation, can connect with the front
            }

            @Override
            public void handleDataDeleted(final String dataPath) {   // delete
                  // Omit implementation logic, is actually the CommonPluginDataSubscriber operation, can connect with the front

            }
        });
    }
    
}    
```

The above source code is given comments, I believe you can understand. The main logic for subscribing to plug-in data is as follows:

> 1. Create the current plugin path
> 2. Create a path if it does not exist
> 3. Read the current node data on zK and deserialize it
> 4. The plugin data is cached in the gateway memory
> 5. Subscribe to the plug-in node


### 6. Summary

This paper through a practical case, `Zookeeper` data synchronization principle source code analysis. The main knowledge points involved are as follows:

- Data synchronization based on `ZooKeeper` is mainly implemented through `watch` mechanism;

- Complete event publishing and listening via `Spring`;

- Support multiple synchronization strategies through abstract `DataChangedListener` interface, interface oriented programming;

- Use singleton design pattern to cache data class `BaseDataCache`;

- Loading of configuration classes via conditional assembly of `SpringBoot` and `starter` loading mechanism.

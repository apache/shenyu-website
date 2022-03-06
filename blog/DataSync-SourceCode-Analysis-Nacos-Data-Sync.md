---
title: Nacos Data Synchronization Source Code Analysis
author: 4zd
author_title: Apache ShenYu Contributor
author_url: https://github.com/4zd
tags: [nacos,data sync,Apache ShenYu]
---

> [Apache ShenYu](https://shenyu.apache.org/zh/docs/index) is an asynchronous, high-performance, cross-language, responsive API gateway.

In `ShenYu` gateway, data synchronization refers to how to synchronize the updated data to the gateway after the data is sent in the background management system. The Apache ShenYu gateway currently supports data synchronization for `ZooKeeper`, `WebSocket`, `http long poll`, `Nacos`, `etcd` and `Consul`. The main content of this article is based on `Nacos` data synchronization source code analysis.

> This paper based on `shenyu-2.4.0` version of the source code analysis, the official website of the introduction of please refer to the [Data Synchronization Design](https://shenyu.apache.org/docs/design/data-sync/) .

### 1. About Nacos

[`Nacos`](https://github.com/alibaba/nacos)  can be used for dynamic service discovery and configuration and service management. `Shenyu` use `Nacos` as an option to sync data.

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

Because this paper is based on `nacos` data synchronization source code analysis, so here to `NacosDataChangedListener` as an example, the analysis of how it is loaded and implemented.

A global search in the source code project shows that its implementation is done in the `DataSyncConfiguration` class.

```java
/**
 * The type Data sync configuration.
 */
@Configuration
public class DataSyncConfiguration {
	// some codes omitted here
  
    /**
     * The type Nacos listener.
     */
    @Configuration
    @ConditionalOnProperty(prefix = "shenyu.sync.nacos", name = "url")
    @Import(NacosConfiguration.class)
    static class NacosListener {

        /**
         * Data changed listener data changed listener.
         *
         * @param configService the config service
         * @return the data changed listener
         */
        @Bean
        @ConditionalOnMissingBean(NacosDataChangedListener.class)
        public DataChangedListener nacosDataChangedListener(final ConfigService configService) {
            return new NacosDataChangedListener(configService);
        }

        /**
         * Nacos data init zookeeper data init.
         *
         * @param configService the config service
         * @param syncDataService the sync data service
         * @return the nacos data init
         */
        @Bean
        @ConditionalOnMissingBean(NacosDataInit.class)
        public NacosDataInit nacosDataInit(final ConfigService configService, final SyncDataService syncDataService) {
            return new NacosDataInit(configService, syncDataService);
        }
    }  
  
  // some codes omitted here
}

```

This configuration class is implemented through the SpringBoot conditional assembly class. The `NacosListener` class has several annotations:

- `@Configuration`: Configuration file, application context;

- `@ConditionalOnProperty(prefix = "shenyu.sync.nacos", name = "url")`: attribute condition. The configuration class takes effect only when the condition is met. That is, when we have the following configuration, `nacos` is used for data synchronization.

  ```properties
  shenyu:  
    sync:
       nacos:
            url: localhost:8848
  ```
  
- `@Import(NacosConfiguration.class)`：import  a configration class `NacosConfiguration`, which provides a method `ConfigService nacosConfigService(final NacosProperties nacosProp)` to convert the nacos properties to a bean with the `ConfigService` type. We would take a look at how to generate the bean and then analyze the property configuration class and the property configuration file.  

```java
/**
 * Nacos configuration.
 */
@EnableConfigurationProperties(NacosProperties.class)
public class NacosConfiguration {

    /**
     * register configService in spring ioc.
     *
     * @param nacosProp the nacos configuration
     * @return ConfigService {@linkplain ConfigService}
     * @throws Exception the exception
     */
    @Bean
    @ConditionalOnMissingBean(ConfigService.class)
    public ConfigService nacosConfigService(final NacosProperties nacosProp) throws Exception {
        Properties properties = new Properties();
        if (nacosProp.getAcm() != null && nacosProp.getAcm().isEnabled()) {
            // Use aliyun ACM service
            properties.put(PropertyKeyConst.ENDPOINT, nacosProp.getAcm().getEndpoint());
            properties.put(PropertyKeyConst.NAMESPACE, nacosProp.getAcm().getNamespace());
            // Use subaccount ACM administrative authority
            properties.put(PropertyKeyConst.ACCESS_KEY, nacosProp.getAcm().getAccessKey());
            properties.put(PropertyKeyConst.SECRET_KEY, nacosProp.getAcm().getSecretKey());
        } else {
            properties.put(PropertyKeyConst.SERVER_ADDR, nacosProp.getUrl());
            if (StringUtils.isNotBlank(nacosProp.getNamespace())) {
                properties.put(PropertyKeyConst.NAMESPACE, nacosProp.getNamespace());
            }
            if (StringUtils.isNotBlank(nacosProp.getUsername())) {
                properties.put(PropertyKeyConst.USERNAME, nacosProp.getUsername());
            }
            if (StringUtils.isNotBlank(nacosProp.getPassword())) {
                properties.put(PropertyKeyConst.PASSWORD, nacosProp.getPassword());
            }
        }
        return NacosFactory.createConfigService(properties);
    }
}
```

There are two steps in this method. Firstly, `Properties` object is generated and populated with the specified nacos path value and authority values on whether the alyun ACM service is used. Secondly, the nacos factory class would use its static factory method to create a `configService` object via reflect methods and then populate the object with the `Properties` object generated in the first step.

Now, let's analyze the `NacosProperties` class and its counterpart property file.

```java
/**
 * The type Nacos config.
 */
@ConfigurationProperties(prefix = "shenyu.sync.nacos")
public class NacosProperties {

    private String url;

    private String namespace;

    private String username;

    private String password;

    private NacosACMProperties acm;

    /**
     * Gets the value of url.
     *
     * @return the value of url
     */
    public String getUrl() {
        return url;
    }

    /**
     * Sets the url.
     *
     * @param url url
     */
    public void setUrl(final String url) {
        this.url = url;
    }

    /**
     * Gets the value of namespace.
     *
     * @return the value of namespace
     */
    public String getNamespace() {
        return namespace;
    }

    /**
     * Sets the namespace.
     *
     * @param namespace namespace
     */
    public void setNamespace(final String namespace) {
        this.namespace = namespace;
    }

    /**
     * Gets the value of username.
     *
     * @return the value of username
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username.
     *
     * @param username username
     */
    public void setUsername(final String username) {
        this.username = username;
    }

    /**
     * Gets the value of password.
     *
     * @return the value of password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password.
     *
     * @param password password
     */
    public void setPassword(final String password) {
        this.password = password;
    }

    /**
     * Gets the value of acm.
     *
     * @return the value of acm
     */
    public NacosACMProperties getAcm() {
        return acm;
    }

    /**
     * Sets the acm.
     *
     * @param acm acm
     */
    public void setAcm(final NacosACMProperties acm) {
        this.acm = acm;
    }

    public static class NacosACMProperties {

        private boolean enabled;

        private String endpoint;

        private String namespace;

        private String accessKey;

        private String secretKey;

        /**
         * Gets the value of enabled.
         *
         * @return the value of enabled
         */
        public boolean isEnabled() {
            return enabled;
        }

        /**
         * Sets the enabled.
         *
         * @param enabled enabled
         */
        public void setEnabled(final boolean enabled) {
            this.enabled = enabled;
        }

        /**
         * Gets the value of endpoint.
         *
         * @return the value of endpoint
         */
        public String getEndpoint() {
            return endpoint;
        }

        /**
         * Sets the endpoint.
         *
         * @param endpoint endpoint
         */
        public void setEndpoint(final String endpoint) {
            this.endpoint = endpoint;
        }

        /**
         * Gets the value of namespace.
         *
         * @return the value of namespace
         */
        public String getNamespace() {
            return namespace;
        }

        /**
         * Sets the namespace.
         *
         * @param namespace namespace
         */
        public void setNamespace(final String namespace) {
            this.namespace = namespace;
        }

        /**
         * Gets the value of accessKey.
         *
         * @return the value of accessKey
         */
        public String getAccessKey() {
            return accessKey;
        }

        /**
         * Sets the accessKey.
         *
         * @param accessKey accessKey
         */
        public void setAccessKey(final String accessKey) {
            this.accessKey = accessKey;
        }

        /**
         * Gets the value of secretKey.
         *
         * @return the value of secretKey
         */
        public String getSecretKey() {
            return secretKey;
        }

        /**
         * Sets the secretKey.
         *
         * @param secretKey secretKey
         */
        public void setSecretKey(final String secretKey) {
            this.secretKey = secretKey;
        }
    }

}
```

When the property `shenyu.sync.nacos.url` is set in the property file, the `shenyu` admin would choose the `nacos` to sync data. At this time, the configuration class `NacosListener` would take effect and a bean with the type `NacosDataChangedListener` and another bean with the type `NacosDataInit` would both be generated.

* `nacosDataChangedListener`, the bean with the type `NacosDataChangedListener` , takes the bean with the type `ConfigService` as a member variable. `ConfigService` is an api provided by `nacos` and can be used to send request to nacos server to modify configurations once the `nacosDataChangedListener` has accepted an event and trigger the callback method.

* `nacosDataInit`, the bean with the type `NacosDataInit`, takes the bean `configService` and the bean `syncDataService` as memeber variables. It use `configService` to call the `Nacos` api to judge whether the configurations have been initialized, and would use `syncDataService` to refresh them if the answer is no. 

  As mentioned above, some operations of the  `listener` would be triggered in the event handle method `onApplicationEvent()`. In this example, we update selector data and choose `nacos` to sync data, so the code about logic of the selector data changes in the `NacosDataChangedListener` class would be called.

```java
    //DataChangedEventDispatcher.java
    @Override
    @SuppressWarnings("unchecked")
    public void onApplicationEvent(final DataChangedEvent event) {
          // Iterate through the data change listener (usually using a data synchronization approach is fine)
        for (DataChangedListener listener : listeners) {
          // What kind of data has changed
          switch (event.getGroupKey()) {
                 // some codes omitted
                  case SELECTOR:   // selector data
                      listener.onSelectorChanged((List<SelectorData>) event.getSource(), event.getEventType());
                      break;
              }
          }
      }
```


#### 2.4 Nacos Data Changed Listener

- NacosDataChangedListener.onSelectorChanged()

In the `onSelectorChanged()` method, determine the type of action, whether to refresh synchronization or update or create synchronization. Determine whether the node is in `etcd` based on the current selector data.

```java
/**
 * Use nacos to push data changes.
 */
public class NacosDataChangedListener implements DataChangedListener {
    @Override
    public void onSelectorChanged(final List<SelectorData> changed, final DataEventTypeEnum eventType) {
        updateSelectorMap(getConfig(NacosPathConstants.SELECTOR_DATA_ID));
        switch (eventType) {
            case DELETE:
                changed.forEach(selector -> {
                    List<SelectorData> ls = SELECTOR_MAP
                            .getOrDefault(selector.getPluginName(), new ArrayList<>())
                            .stream()
                            .filter(s -> !s.getId().equals(selector.getId()))
                            .sorted(SELECTOR_DATA_COMPARATOR)
                            .collect(Collectors.toList());
                    SELECTOR_MAP.put(selector.getPluginName(), ls);
                });
                break;
            case REFRESH:
            case MYSELF:
                SELECTOR_MAP.keySet().removeAll(SELECTOR_MAP.keySet());
                changed.forEach(selector -> {
                    List<SelectorData> ls = SELECTOR_MAP
                            .getOrDefault(selector.getPluginName(), new ArrayList<>())
                            .stream()
                            .sorted(SELECTOR_DATA_COMPARATOR)
                            .collect(Collectors.toList());
                    ls.add(selector);
                    SELECTOR_MAP.put(selector.getPluginName(), ls);
                });
                break;
            default:
                changed.forEach(selector -> {
                    List<SelectorData> ls = SELECTOR_MAP
                            .getOrDefault(selector.getPluginName(), new ArrayList<>())
                            .stream()
                            .filter(s -> !s.getId().equals(selector.getId()))
                            .sorted(SELECTOR_DATA_COMPARATOR)
                            .collect(Collectors.toList());
                    ls.add(selector);
                    SELECTOR_MAP.put(selector.getPluginName(), ls);
                });
                break;
        }
        publishConfig(NacosPathConstants.SELECTOR_DATA_ID, SELECTOR_MAP);
    }
  }
```

This is the core part. The variable `changed` represents the list , which needs to be updated, with the elements of the `SelectorData` type. The variable `eventType` represents the event type. The variable `SELECTOR_MAP` is with the type `ConcurrentMap<String, List<SelectorData>>`, so the key of the map is with the `String` type and the value is the selector list of this plugin.  The value of the constant `NacosPathConstants.SELECTOR_DATA_ID` is `shenyu.selector.json`. The steps are as follows, firstly, use the method `getConfig` to call the api of `Nacos` to fetch the config with the `group` value of `shenyu.selector.json` from `Nacos` and call the `updateSelectorMap` method to use the config fetched above to update the `SELECTOR_MAP` so that the we refresh the selector config from `Nacos`. Secondly, we can update `SELECTOR_MAP` according to the event type and then use the `publishConfig` method to call the `Nacos` api to update all the config with the `group` value of `shenyu.selector.json`.

As long as the changed data is correctly written to the `Nacos` node, the `admin` side of the operation is complete. 

In our current case, updating one of the selector data in the `Divide` plugin with a weight of 90 updates specific nodes in the graph.

![](/img/activities/code-analysis-zookeeper-data-sync/zookeeper-node.png)


We series the above update flow with a sequence diagram.


![](/img/activities/code-analysis-nacos-data-sync/nacos-sync-sequence-admin-en.png)


### 3. Gateway Data Sync

Assume that the ShenYu gateway is already running properly, and the data synchronization mode is also `nacos`. How does the gateway receive and process the selector data after updating it on the `admin` side and sending the changed data to `nacos`? Let's continue our source code analysis to find out.

#### 3.1 NacosSyncDataService Accept Data

The gateway side use `NacosSyncDataService` to watch `nacos` and fetch the data update, but before we dive into this part, let us take a look on how the bean with the type `NacosSyncDataService` is generated. The answer is it's defined in the Spring config class `NacosSyncDataConfiguration`. Let's focus on the annotation `@ConditionalOnProperty(prefix = "shenyu.sync.nacos", name = "url")` on the class `NacosSyncDataConfiguration` again. We have met this annotation when we  analyzed the `NacosListener` class on the `Admin` side before, this config class would take effect only and if only the condition on this annotation is matched. In other words, when we have the config as below on the gateway side, the gateway would use `nacos` to sync data and the config class `NacosSyncDataConfiguration` would take effect.

```properties
shenyu:  
  sync:
     nacos:
          url: localhost:8848
```

```java
/**
 * Nacos sync data configuration for spring boot.
 */
@Configuration
@ConditionalOnClass(NacosSyncDataService.class)
@ConditionalOnProperty(prefix = "shenyu.sync.nacos", name = "url")
public class NacosSyncDataConfiguration {

    private static final Logger LOGGER = LoggerFactory.getLogger(NacosSyncDataConfiguration.class);

    /**
     * Nacos sync data service.
     *
     * @param configService     the config service
     * @param pluginSubscriber the plugin subscriber
     * @param metaSubscribers   the meta subscribers
     * @param authSubscribers   the auth subscribers
     * @return the sync data service
     */
    @Bean
    public SyncDataService nacosSyncDataService(final ObjectProvider<ConfigService> configService, final ObjectProvider<PluginDataSubscriber> pluginSubscriber,
                                           final ObjectProvider<List<MetaDataSubscriber>> metaSubscribers, final ObjectProvider<List<AuthDataSubscriber>> authSubscribers) {
        LOGGER.info("you use nacos sync shenyu data.......");
        return new NacosSyncDataService(configService.getIfAvailable(), pluginSubscriber.getIfAvailable(),
                metaSubscribers.getIfAvailable(Collections::emptyList), authSubscribers.getIfAvailable(Collections::emptyList));
    }

    /**
     * Nacos config service config service.
     *
     * @param nacosConfig the nacos config
     * @return the config service
     * @throws Exception the exception
     */
    @Bean
    public ConfigService nacosConfigService(final NacosConfig nacosConfig) throws Exception {
        Properties properties = new Properties();
        if (nacosConfig.getAcm() != null && nacosConfig.getAcm().isEnabled()) {
            properties.put(PropertyKeyConst.ENDPOINT, nacosConfig.getAcm().getEndpoint());
            properties.put(PropertyKeyConst.NAMESPACE, nacosConfig.getAcm().getNamespace());
            properties.put(PropertyKeyConst.ACCESS_KEY, nacosConfig.getAcm().getAccessKey());
            properties.put(PropertyKeyConst.SECRET_KEY, nacosConfig.getAcm().getSecretKey());
        } else {
            properties.put(PropertyKeyConst.SERVER_ADDR, nacosConfig.getUrl());
            if (StringUtils.isNotBlank(nacosConfig.getNamespace())) {
                properties.put(PropertyKeyConst.NAMESPACE, nacosConfig.getNamespace());
            }
            if (nacosConfig.getUsername() != null) {
                properties.put(PropertyKeyConst.USERNAME, nacosConfig.getUsername());
            }
            if (nacosConfig.getPassword() != null) {
                properties.put(PropertyKeyConst.PASSWORD, nacosConfig.getPassword());
            }
        }
        return NacosFactory.createConfigService(properties);
    }

    /**
     * Http config http config.
     *
     * @return the http config
     */
    @Bean
    @ConfigurationProperties(prefix = "shenyu.sync.nacos")
    public NacosConfig nacosConfig() {
        return new NacosConfig();
    }
}
```

Let's focus on the part of code above which is about the  generation of the bean `nacosSyncDataService`:

```java
@Bean
public SyncDataService nacosSyncDataService(final ObjectProvider<ConfigService> configService, final ObjectProvider<PluginDataSubscriber> pluginSubscriber,
                                           final ObjectProvider<List<MetaDataSubscriber>> metaSubscribers, final ObjectProvider<List<AuthDataSubscriber>> authSubscribers) {
        LOGGER.info("you use nacos sync shenyu data.......");
        return new NacosSyncDataService(configService.getIfAvailable(), pluginSubscriber.getIfAvailable(),
                metaSubscribers.getIfAvailable(Collections::emptyList), authSubscribers.getIfAvailable(Collections::emptyList));
}
```

As we can see, the bean is generated by the construction method of the Class `NacosSyncDataService`. Let's dive into the construction method.

```java
public NacosSyncDataService(final ConfigService configService, final PluginDataSubscriber pluginDataSubscriber,
                                final List<MetaDataSubscriber> metaDataSubscribers, final List<AuthDataSubscriber> authDataSubscribers) {

        super(configService, pluginDataSubscriber, metaDataSubscribers, authDataSubscribers);
        start();
}
```

```java
    public void start() {
        watcherData(NacosPathConstants.PLUGIN_DATA_ID, this::updatePluginMap);
        watcherData(NacosPathConstants.SELECTOR_DATA_ID, this::updateSelectorMap);
        watcherData(NacosPathConstants.RULE_DATA_ID, this::updateRuleMap);
        watcherData(NacosPathConstants.META_DATA_ID, this::updateMetaDataMap);
        watcherData(NacosPathConstants.AUTH_DATA_ID, this::updateAuthMap);
    }
```

```java
    protected void watcherData(final String dataId, final OnChange oc) {
        Listener listener = new Listener() {
            @Override
            public void receiveConfigInfo(final String configInfo) {
                oc.change(configInfo);
            }

            @Override
            public Executor getExecutor() {
                return null;
            }
        };
        oc.change(getConfigAndSignListener(dataId, listener));
        LISTENERS.computeIfAbsent(dataId, key -> new ArrayList<>()).add(listener);
    }
```

As we can see, the construction method calls the `start` method and calls the `watcherData` method to create a listener which relates itself to a callback method `oc`, since we're analyzing the changes on the component with the `selector` type, the relative callback method is `updateSelectorMap`. This callback method is used to handle data.


#### 3.2 Handle Data

- NacosCacheHandler.updateSelectorMap()

The data is not null, and caching the selector data is again handled by `PluginDataSubscriber`.

```java
    protected void updateSelectorMap(final String configInfo) {
        try {
            List<SelectorData> selectorDataList = GsonUtils.getInstance().toObjectMapList(configInfo, SelectorData.class).values().stream().flatMap(Collection::stream).collect(Collectors.toList());
            selectorDataList.forEach(selectorData -> Optional.ofNullable(pluginDataSubscriber).ifPresent(subscriber -> {
                subscriber.unSelectorSubscribe(selectorData);
                subscriber.onSelectorSubscribe(selectorData);
            }));
        } catch (JsonParseException e) {
            LOG.error("sync selector data have error:", e);
        }
    }
```

`PluginDataSubscriber` is an interface, it is only a `CommonPluginDataSubscriber` implementation class, responsible for data processing plugin, selector and rules.



#### 3.3 Common Plugin Data Subscriber

- PluginDataSubscriber.unSelectorSubscribe()
- PluginDataSubscriber.onSelectorSubscribe()

It has no additional logic and calls the `unSelectorSubscribe()`and`subscribeDataHandler()` method directly. Within methods, there are data types (plugins, selectors, or rules) and action types (update or delete) to perform different logic.


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
  
    @Override
    public void unSelectorSubscribe(final SelectorData selectorData) {
        subscribeDataHandler(selectorData, DataEventTypeEnum.DELETE);
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


![](/img/activities/code-analysis-nacos-data-sync/nacos-sync-sequence-gateway-en.png)

The data synchronization process has been analyzed. In order to prevent the synchronization process from being interrupted, other logic is ignored during the analysis. We have analyzed the process of  gateway synchronization operation initialization in the `start` method of `NacosSyncDataService` class. We also need to analyze the process of Admin synchronization data initialization.


### 4. Admin Data Sync  initialization

On the `admin` side, the bean with the type `NacosDataInit`, is defined and generated in the `NacosListener`, if the configuration of the admin side decides to use `nacos` to sync data, when `admin` starts, the current data will be fully synchronized to `nacos`, the implementation logic is as follows:


```java

/**
 * The type Nacos data init.
 */
public class NacosDataInit implements CommandLineRunner {

    private static final Logger LOG = LoggerFactory.getLogger(NacosDataInit.class);

    private final ConfigService configService;

    private final SyncDataService syncDataService;

    /**
     * Instantiates a new Nacos data init.
     * @param configService the nacos config service
     * @param syncDataService the sync data service
     */
    public NacosDataInit(final ConfigService configService, final SyncDataService syncDataService) {
        this.configService = configService;
        this.syncDataService = syncDataService;
    }

    @Override
    public void run(final String... args) {
        String pluginDataId = NacosPathConstants.PLUGIN_DATA_ID;
        String authDataId = NacosPathConstants.AUTH_DATA_ID;
        String metaDataId = NacosPathConstants.META_DATA_ID;
        if (dataIdNotExist(pluginDataId) && dataIdNotExist(authDataId) && dataIdNotExist(metaDataId)) {
            syncDataService.syncAll(DataEventTypeEnum.REFRESH);
        }
    }

    private boolean dataIdNotExist(final String pluginDataId) {
        try {
            String group = NacosPathConstants.GROUP;
            long timeout = NacosPathConstants.DEFAULT_TIME_OUT;
            return configService.getConfig(pluginDataId, group, timeout) == null;
        } catch (NacosException e) {
            LOG.error("Get data from nacos error.", e);
            throw new ShenyuException(e.getMessage());
        }
    }
}
```

Check whether there is data in `nacos`, if not, then synchronize.

`NacosDataInit` implements the `CommandLineRunner` interface. It is an interface provided by `SpringBoot` that executes the `run()` method after all `Spring Beans` initializations and is often used for initialization operations in a project.


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


### 5. Summary

This paper through a practical case, `nacos` data synchronization principle source code analysis. The main knowledge points involved are as follows:

- Data synchronization based on `nacos` is mainly implemented through `watch` mechanism;

- Complete event publishing and listening via `Spring`;

- Support multiple synchronization strategies through abstract `DataChangedListener` interface, interface oriented programming;

- Use singleton design pattern to cache data class `BaseDataCache`;

- Loading of configuration classes via conditional assembly of `SpringBoot` and `starter` loading mechanism.

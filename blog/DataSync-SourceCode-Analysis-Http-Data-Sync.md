---
title: Http Long Polling Data Synchronization Source Code Analysis
author: midnight2104
author_title: Apache ShenYu Committer
author_url: https://github.com/midnight2104
tags: [http,data sync,Apache ShenYu]
---

> [Apache ShenYu](https://shenyu.apache.org/zh/docs/index) is an asynchronous, high-performance, cross-language, responsive API gateway.

In `ShenYu` gateway, data synchronization refers to how to synchronize the updated data to the gateway after the data is sent in the background management system. The Apache ShenYu gateway currently supports data synchronization for `ZooKeeper`, `WebSocket`, `http long poll`, `Nacos`, `etcd` and `Consul`. The main content of this article is based on `http long poll` data synchronization source code analysis.

> This paper based on `shenyu-2.5.0` version of the source code analysis, the official website of the introduction of please refer to the [Data Synchronization Design](https://shenyu.apache.org/docs/design/data-sync/) .

### 1. Http Long Polling

Here is a direct quote from the official website with the relevant description.

> The mechanism of `Zookeeper` and `WebSocket` data synchronization is relatively simple, while `Http long polling` is more complex. `Apache ShenYu` borrowed the design ideas of `Apollo` and `Nacos`, took their essence, and implemented `Http long polling` data synchronization function by itself. Note that this is not the traditional `ajax` long polling!

![](/img/shenyu/dataSync/http-long-polling-en.png)

`Http Long Polling` mechanism as shown above, `Apache ShenYu` gateway active request `shenyu-admin` configuration service, read timeout time is `90s`, means that the gateway layer request configuration service will wait at most `90s`, so as to facilitate `shenyu-admin` configuration service timely response to change data, so as to achieve quasi real-time push.

The `Http long polling` mechanism is initiated by the gateway requesting `shenyu-admin`, so for this source code analysis, we start from the gateway side.

### 2. Gateway Data Sync

#### 2.1 Load Configuration

The `Http long polling` data synchronization configuration is loaded through `spring boot starter` mechanism when we introduce the relevant dependencies and have the following configuration in the configuration file.

Introduce dependencies in the `pom` file.

```xml
<!--shenyu data sync start use http-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-sync-data-http</artifactId>
    <version>${project.version}</version>
</dependency>
```

Add the following configuration to the `application.yml` configuration file.

```yaml
shenyu:
    sync:
       http:
          url : http://localhost:9095
```

When the gateway is started, the configuration class `HttpSyncDataConfiguration` is executed, loading the corresponding `Bean`.

```java

/**
 * Http sync data configuration for spring boot.
 */
@Configuration
@ConditionalOnClass(HttpSyncDataService.class)
@ConditionalOnProperty(prefix = "shenyu.sync.http", name = "url")
@EnableConfigurationProperties(value = HttpConfig.class)
public class HttpSyncDataConfiguration {

    private static final Logger LOGGER = LoggerFactory.getLogger(HttpSyncDataConfiguration.class);

    /**
     * Rest template.
     *
     * @param httpConfig the http config
     * @return the rest template
     */
    @Bean
    public RestTemplate restTemplate(final HttpConfig httpConfig) {
        OkHttp3ClientHttpRequestFactory factory = new OkHttp3ClientHttpRequestFactory();
        factory.setConnectTimeout(Objects.isNull(httpConfig.getConnectionTimeout()) ? (int) HttpConstants.CLIENT_POLLING_CONNECT_TIMEOUT : httpConfig.getConnectionTimeout());
        factory.setReadTimeout(Objects.isNull(httpConfig.getReadTimeout()) ? (int) HttpConstants.CLIENT_POLLING_READ_TIMEOUT : httpConfig.getReadTimeout());
        factory.setWriteTimeout(Objects.isNull(httpConfig.getWriteTimeout()) ? (int) HttpConstants.CLIENT_POLLING_WRITE_TIMEOUT : httpConfig.getWriteTimeout());
        return new RestTemplate(factory);
    }

    /**
     * AccessTokenManager.
     *
     * @param httpConfig   the http config.
     * @param restTemplate the rest template.
     * @return the access token manager.
     */
    @Bean
    public AccessTokenManager accessTokenManager(final HttpConfig httpConfig, final RestTemplate restTemplate) {
        return new AccessTokenManager(restTemplate, httpConfig);
    }

    /**
     * Http sync data service.
     *
     * @param httpConfig         the http config
     * @param pluginSubscriber   the plugin subscriber
     * @param restTemplate       the rest template
     * @param metaSubscribers    the meta subscribers
     * @param authSubscribers    the auth subscribers
     * @param accessTokenManager the access token manager
     * @return the sync data service
     */
    @Bean
    public SyncDataService httpSyncDataService(final ObjectProvider<HttpConfig> httpConfig,
                                               final ObjectProvider<PluginDataSubscriber> pluginSubscriber,
                                               final ObjectProvider<RestTemplate> restTemplate,
                                               final ObjectProvider<List<MetaDataSubscriber>> metaSubscribers,
                                               final ObjectProvider<List<AuthDataSubscriber>> authSubscribers,
                                               final ObjectProvider<AccessTokenManager> accessTokenManager) {
        LOGGER.info("you use http long pull sync shenyu data");
        return new HttpSyncDataService(
                Objects.requireNonNull(httpConfig.getIfAvailable()),
                Objects.requireNonNull(pluginSubscriber.getIfAvailable()),
                Objects.requireNonNull(restTemplate.getIfAvailable()),
                metaSubscribers.getIfAvailable(Collections::emptyList),
                authSubscribers.getIfAvailable(Collections::emptyList),
                Objects.requireNonNull(accessTokenManager.getIfAvailable())
        );
    }
}
```

`HttpSyncDataConfiguration` is the configuration class for `Http long polling` data synchronization, responsible for creating `HttpSyncDataService` (responsible for the concrete implementation of `http` data synchronization) 、 `RestTemplate` and `AccessTokenManager` (responsible for the access token processing). It is annotated as follows.

- `@Configuration`: indicates that this is a configuration class.
- `@ConditionalOnClass(HttpSyncDataService.class)`: conditional annotation indicating that the class `HttpSyncDataService` is to be present.
- `@ConditionalOnProperty(prefix = "shenyu.sync.http", name = "url")`: conditional annotation to have the property `shenyu.sync.http.url` configured.
- `@EnableConfigurationProperties(value = HttpConfig.class)`: indicates that the annotation `@ConfigurationProperties(prefix = "shenyu.sync.http")` on `HttpConfig` will take effect, and the configuration class `HttpConfig` will be injected into the Ioc container.


#### 2.2 Property initialization

- HttpSyncDataService

In the constructor of `HttpSyncDataService`, complete the property initialization.

```java
public class HttpSyncDataService implements SyncDataService {

    // omitted attribute field ......

    public HttpSyncDataService(final HttpConfig httpConfig,
                               final PluginDataSubscriber pluginDataSubscriber,
                               final RestTemplate restTemplate,
                               final List<MetaDataSubscriber> metaDataSubscribers,
                               final List<AuthDataSubscriber> authDataSubscribers,
                               final AccessTokenManager accessTokenManager) {
          // 1. accessTokenManager
          this.accessTokenManager = accessTokenManager;
          // 2. create data refresh factory
          this.factory = new DataRefreshFactory(pluginDataSubscriber, metaDataSubscribers, authDataSubscribers);
          // 3. shenyu-admin url
          this.serverList = Lists.newArrayList(Splitter.on(",").split(httpConfig.getUrl()));
          // 4. restTemplate
          this.restTemplate = restTemplate;
          // 5. start a long polling task
          this.start();
    }

    //......
}
```

Other functions and related fields are omitted from the above code, and the initialization of the properties is done in the constructor, mainly.

- the role of `accessTokenManager` is to request `admin` and update the `access token` regularly.

- creating data processors for subsequent caching of various types of data (plugins, selectors, rules, metadata and authentication data).

- obtaining the `admin` property configuration, mainly to obtain the `url` of the `admin`, `admin` with possible clusters, multiple split by a comma `(,)`.

- using `RestTemplate`, for launching requests to `admin`.

- Start the long polling task.

#### 2.3 Start the long polling task.

- HttpSyncDataService#start()

In the `start()` method, two things are done, one is to get the full amount of data, that is, to request the `admin` side to get all the data that needs to be synchronized, and then cache the acquired data into the gateway memory. The other is to open a multi-threaded execution of a long polling task.

```java
public class HttpSyncDataService implements SyncDataService {

    // ......

    private void start() {
        // It could be initialized multiple times, so you need to control that.
        if (RUNNING.compareAndSet(false, true)) {
            // fetch all group configs.
            // Initial startup, get full data
            this.fetchGroupConfig(ConfigGroupEnum.values());
            // one backend service, one thread
            int threadSize = serverList.size();
            // ThreadPoolExecutor
            this.executor = new ThreadPoolExecutor(threadSize, threadSize, 60L, TimeUnit.SECONDS,
                    new LinkedBlockingQueue<>(),
                    ShenyuThreadFactory.create("http-long-polling", true));
            // start long polling, each server creates a thread to listen for changes.
            this.serverList.forEach(server -> this.executor.execute(new HttpLongPollingTask(server)));
        } else {
            LOG.info("shenyu http long polling was started, executor=[{}]", executor);
        }
    }

    // ......
}
```

##### 2.3.1 Fetch Data

- HttpSyncDataService#fetchGroupConfig()

`ShenYu` groups all the data that needs to be synchronized, there are 5 data types, namely plugins, selectors, rules, metadata and authentication data.

```java
public enum ConfigGroupEnum {
    APP_AUTH, // app auth data
    PLUGIN, // plugin data
    RULE, // rule data
    SELECTOR, // selector data
    META_DATA; // meta data
}
```

The `admin` may be a cluster, and here a request is made to each `admin` in a round-robin fashion, and if one succeeds, then the operation to get the full amount of data from the `admin` and cache it to the gateway is executed successfully. If there is an exception, the request is launched to the next `admin`.

```java
public class HttpSyncDataService implements SyncDataService {

    // ......

    private void fetchGroupConfig(final ConfigGroupEnum... groups) throws ShenyuException {
        // It is possible that admins are clustered, and here requests are made to each admin by means of a loop.
        for (int index = 0; index < this.serverList.size(); index++) {
            String server = serverList.get(index);
            try {
                // do execute
                this.doFetchGroupConfig(server, groups);
                // If you have a success, you are successful and can exit the loop
                break;
            } catch (ShenyuException e) {
                // An exception occurs, try executing the next
                // The last one also failed to execute, throwing an exception
                // no available server, throw exception.
                if (index >= serverList.size() - 1) {
                    throw e;
                }
                LOG.warn("fetch config fail, try another one: {}", serverList.get(index + 1));
            }
        }
    }

    // ......
}
```

- HttpSyncDataService#doFetchGroupConfig()

In this method, the request parameters are first assembled, then the request is launched through `httpClient` to `admin` to get the data, and finally the obtained data is updated to the gateway memory.

```java
public class HttpSyncDataService implements SyncDataService {

    // ......

    // Launch a request to the admin backend management system to get all synchronized data
    private void doFetchGroupConfig(final String server, final ConfigGroupEnum... groups) {
        // 1. build request parameters, all grouped enumeration types
        StringBuilder params = new StringBuilder();
        for (ConfigGroupEnum groupKey : groups) {
            params.append("groupKeys").append("=").append(groupKey.name()).append("&");
        }
        // admin url:  /configs/fetch
        String url = server + Constants.SHENYU_ADMIN_PATH_CONFIGS_FETCH + "?" + StringUtils.removeEnd(params.toString(), "&");
        LOG.info("request configs: [{}]", url);
        String json;
        try {
            HttpHeaders headers = new HttpHeaders();
            // set accessToken
            headers.set(Constants.X_ACCESS_TOKEN, this.accessTokenManager.getAccessToken());
            HttpEntity<String> httpEntity = new HttpEntity<>(headers);
            // 2. get a request for change data
            json = this.restTemplate.exchange(url, HttpMethod.GET, httpEntity, String.class).getBody();
        } catch (RestClientException e) {
            String message = String.format("fetch config fail from server[%s], %s", url, e.getMessage());
            LOG.warn(message);
            throw new ShenyuException(message, e);
        }
        // update local cache
        // 3. Update data in gateway memory
        boolean updated = this.updateCacheWithJson(json);
        if (updated) {
            LOG.debug("get latest configs: [{}]", json);
            return;
        }
        // not updated. it is likely that the current config server has not been updated yet. wait a moment.
        LOG.info("The config of the server[{}] has not been updated or is out of date. Wait for 30s to listen for changes again.", server);
        // No data update on the server side, just wait 30s
        ThreadUtils.sleep(TimeUnit.SECONDS, 30);
    }

    // ......
}
```

From the code, we can see that the `admin` side provides the interface to get the full amount of data is `/configs/fetch`, so we will not go further here and put it in the later analysis.

If you get the result data from `admin` and update it successfully, then this method is finished. If there is no successful update, then it is possible that there is no data update on the server side, so wait `30s`.

Here you need to explain in advance, the gateway in determining whether the update is successful, there is a comparison of the data operation, immediately mentioned.


- HttpSyncDataService#updateCacheWithJson()

Update the data in the gateway memory. Use `GSON` for deserialization, take the real data from the property `data` and give it to `DataRefreshFactory` to do the update.

```java
public class HttpSyncDataService implements SyncDataService {

    // ......

    private boolean updateCacheWithJson(final String json) {
        // Using GSON for deserialization
        JsonObject jsonObject = GSON.fromJson(json, JsonObject.class);
        // if the config cache will be updated?
        return factory.executor(jsonObject.getAsJsonObject("data"));
    }

    // ......
}
```

- DataRefreshFactory#executor()

Update the data according to different data types and return the updated result. The specific update logic is given to the `dataRefresh.refresh()` method. In the update result, one of the data types is updated, which means that the operation has been updated.

```java
public final class DataRefreshFactory {
    
    // ......
    
    public boolean executor(final JsonObject data) {
        // update data
        List<Boolean> result = ENUM_MAP.values().parallelStream()
                .map(dataRefresh -> dataRefresh.refresh(data))
                .collect(Collectors.toList());
        // one of the data types is updated, which means that the operation has been updated.
        return result.stream().anyMatch(Boolean.TRUE::equals);
    }
    
    // ......
}
```

- AbstractDataRefresh#refresh()

The data update logic uses the template method design pattern, where the generic operation is done in the abstract method and the different implementation logic is done by subclasses. 5 data types have some differences in the specific update logic, but there is also a common update logic, and the class diagram relationship is as follows.

![](/img/activities/code-analysis-http-data-sync/data-refresh.png)

In the generic `refresh()` method, it is responsible for data type conversion, determining whether an update is needed, and the actual data refresh operation.

```java
public abstract class AbstractDataRefresh<T> implements DataRefresh {

    // ......

    @Override
    public Boolean refresh(final JsonObject data) {
        // convert data
        JsonObject jsonObject = convert(data);
        if (Objects.isNull(jsonObject)) {
            return false;
        }

        boolean updated = false;
        // get data
        ConfigData<T> result = fromJson(jsonObject);
        // does it need to be updated
        if (this.updateCacheIfNeed(result)) {
            updated = true;
            // real update logic, data refresh operation
            refresh(result.getData());
        }

        return updated;
    }

    // ......
}
```

- AbstractDataRefresh#updateCacheIfNeed()

The process of data conversion, which is based on different data types, we will not trace further to see if the data needs to be updated logically. The method name is `updateCacheIfNeed()`, which is implemented by method overloading.

```java
public abstract class AbstractDataRefresh<T> implements DataRefresh {

    // ......

    // result is data
    protected abstract boolean updateCacheIfNeed(ConfigData<T> result);

    // newVal is the latest value obtained
    // What kind of data type is groupEnum
    protected boolean updateCacheIfNeed(final ConfigData<T> newVal, final ConfigGroupEnum groupEnum) {
        // If it is the first time, then it is put directly into the cache and returns true, indicating that the update was made this time
        if (GROUP_CACHE.putIfAbsent(groupEnum, newVal) == null) {
            return true;
        }
        ResultHolder holder = new ResultHolder(false);
        GROUP_CACHE.merge(groupEnum, newVal, (oldVal, value) -> {
            // md5 value is the same, no need to update
            if (StringUtils.equals(oldVal.getMd5(), newVal.getMd5())) {
                LOG.info("Get the same config, the [{}] config cache will not be updated, md5:{}", groupEnum, oldVal.getMd5());
                return oldVal;
            }

            // The current cached data has been modified for a longer period than the new data and does not need to be updated.
            // must compare the last update time
            if (oldVal.getLastModifyTime() >= newVal.getLastModifyTime()) {
                LOG.info("Last update time earlier than the current configuration, the [{}] config cache will not be updated", groupEnum);
                return oldVal;
            }
            LOG.info("update {} config: {}", groupEnum, newVal);
            holder.result = true;
            return newVal;
        });
        return holder.result;
    }

    // ......
}
```

As you can see from the source code above, there are two cases where updates are not required.

- The `md5` values of both data are the same, so no update is needed;
- The current cached data has been modified longer than the new data, so no update is needed.

In other cases, the data needs to be updated.

At this point, we have finished analyzing the logic of the `start()` method to get the full amount of data for the first time, followed by the long polling operation. For convenience, I will paste the `start()` method once more.

```java
public class HttpSyncDataService implements SyncDataService {

    // ......

    private void start() {
        // It could be initialized multiple times, so you need to control that.
        if (RUNNING.compareAndSet(false, true)) {
            // fetch all group configs.
            // Initial startup, get full data
            this.fetchGroupConfig(ConfigGroupEnum.values());
            // one backend service, one thread
            int threadSize = serverList.size();
            // ThreadPoolExecutor
            this.executor = new ThreadPoolExecutor(threadSize, threadSize, 60L, TimeUnit.SECONDS,
                    new LinkedBlockingQueue<>(),
                    ShenyuThreadFactory.create("http-long-polling", true));
            // start long polling, each server creates a thread to listen for changes.
            this.serverList.forEach(server -> this.executor.execute(new HttpLongPollingTask(server)));
        } else {
            LOG.info("shenyu http long polling was started, executor=[{}]", executor);
        }
    }

    // ......
}
```

##### 2.3.2 Execute Long Polling Task

- HttpLongPollingTask#run()

The long polling task is `HttpLongPollingTask`, which implements the `Runnable` interface and the task logic is in the `run()` method. The task is executed continuously through a `while()` loop, i.e., long polling. There are three retries in each polling logic, one polling task fails, wait `5s` and continue, `3` times all fail, wait `5` minutes and try again.

Start long polling, an `admin` service, and create a thread for data synchronization.

```java
class HttpLongPollingTask implements Runnable {

    private final String server;

    HttpLongPollingTask(final String server) {
        this.server = server;
    }

    @Override
    public void run() {
        // long polling
        while (RUNNING.get()) {
            // Default retry 3 times
            int retryTimes = 3;
            for (int time = 1; time <= retryTimes; time++) {
                try {
                    doLongPolling(server);
                } catch (Exception e) {
                    if (time < retryTimes) {
                        LOG.warn("Long polling failed, tried {} times, {} times left, will be suspended for a while! {}",
                                time, retryTimes - time, e.getMessage());
                        // long polling failed, wait 5s and continue
                        ThreadUtils.sleep(TimeUnit.SECONDS, 5);
                        continue;
                    }
                    // print error, then suspended for a while.
                    LOG.error("Long polling failed, try again after 5 minutes!", e);
                    // 3 次都失败了，等 5 分钟再试
                    ThreadUtils.sleep(TimeUnit.MINUTES, 5);
                }
            }
        }
        LOG.warn("Stop http long polling.");
    }
}
```

- HttpSyncDataService#doLongPolling()

Core logic for performing long polling tasks.

- Assembling request parameters based on data types: `md5` and `lastModifyTime`.
- Assembling the request header and request body.
- Launching a request to `admin` to determine if the group data has changed.
- Based on the group that has changed, go back and get the data.

```java
public class HttpSyncDataService implements SyncDataService {
    private void doLongPolling(final String server) {
        // build request params: md5 and lastModifyTime
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>(8);
        for (ConfigGroupEnum group : ConfigGroupEnum.values()) {
            ConfigData<?> cacheConfig = factory.cacheConfigData(group);
            if (cacheConfig != null) {
                String value = String.join(",", cacheConfig.getMd5(), String.valueOf(cacheConfig.getLastModifyTime()));
                params.put(group.name(), Lists.newArrayList(value));
            }
        }
        // build request head and body
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        // set accessToken
        headers.set(Constants.X_ACCESS_TOKEN, this.accessTokenManager.getAccessToken());
        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(params, headers);
        String listenerUrl = server + Constants.SHENYU_ADMIN_PATH_CONFIGS_LISTENER;

        JsonArray groupJson;
        //Initiate a request to admin to determine if the group data has changed
        //Here it just determines whether a group has changed or not
        try {
            String json = this.restTemplate.postForEntity(listenerUrl, httpEntity, String.class).getBody();
            LOG.info("listener result: [{}]", json);
            JsonObject responseFromServer = GsonUtils.getGson().fromJson(json, JsonObject.class);
            groupJson = responseFromServer.getAsJsonArray("data");
        } catch (RestClientException e) {
            String message = String.format("listener configs fail, server:[%s], %s", server, e.getMessage());
            throw new ShenyuException(message, e);
        }
        // Depending on the group where the change occurred, go back and get the data
        /**
         * The official website explains here.
         * After the gateway receives the response message, it only knows which Group has made the configuration change, and it still needs to request the configuration data of that Group again.
         * There may be a question here: why not write out the changed data directly?
         * We also discussed this issue in depth during development, because the http long polling mechanism can only guarantee quasi-real time, if the processing at the gateway layer is not timely, * or the administrator frequently updates the configuration, it is very difficult to get the information from the gateway layer.
         * If it is not processed in time at the gateway level, or if the administrator updates the configuration frequently, it is very likely to miss the push of a configuration change, so for security reasons, we only inform a group that the information has changed.
         *For security reasons, we only notify a group of changes.
         * Personal understanding.
         * If the change data is written out directly, when the administrator frequently updates the configuration, the first update will remove the client from the blocking queue and return the response information to the gateway.
         * If a second update is made at this time, the current client is not in the blocking queue, so this time the change is missed.
         * The same is true for untimely processing by the gateway layer.
         * This is a long polling, one gateway one synchronization thread, there may be time consuming process.
         * If the admin has data changes, the current gateway client is not in the blocking queue and will not get the data.
         */
        if (groupJson != null) {
            // fetch group configuration async.
            ConfigGroupEnum[] changedGroups = GSON.fromJson(groupJson, ConfigGroupEnum[].class);
            if (ArrayUtils.isNotEmpty(changedGroups)) {
                log.info("Group config changed: {}", Arrays.toString(changedGroups));
                // Proactively get the changed data from admin, depending on the grouping, and take the data in full
                this.doFetchGroupConfig(server, changedGroups);
            }
        }
        if (Objects.nonNull(groupJson) && groupJson.size() > 0) {
            // fetch group configuration async.
            ConfigGroupEnum[] changedGroups = GsonUtils.getGson().fromJson(groupJson, ConfigGroupEnum[].class);
            LOG.info("Group config changed: {}", Arrays.toString(changedGroups));
            // Proactively get the changed data from admin, depending on the grouping, and take the data in full
            this.doFetchGroupConfig(server, changedGroups);
        }
    }
}
```

One special point needs to be explained here: In the long polling task, why don't you get the changed data directly? Instead, we determine which group data has been changed, and then request `admin` again to get the changed data?

The official explanation here is.

> After the gateway receives the response information, it only knows which Group has changed its configuration, and it needs to request the configuration data of that Group again.
> There may be a question here: Why not write out the changed data directly?
> We have discussed this issue in depth during development, because the `http` long polling mechanism can only guarantee quasi-real time, and if it is not processed in time at the gateway layer, it will be very difficult to update the configuration data.
If the gateway layer is not processed in time, or the administrator updates the configuration frequently, it is likely to miss the push of a configuration change, so for security reasons, we only inform a group that the information has changed.

My personal understanding is that.

> If the change data is written out directly, when the administrator updates the configuration frequently, the first update will remove the `client` from blocking queue and return the response information to the gateway. If a second update is made at this time, then the current `client` is not in the blocking queue, so this time the change is missed. The same is true for the gateway layer's untimely processing. This is a long polling, one gateway one synchronization thread, there may be a time-consuming process. If `admin` has data changes, the current gateway client is not in the blocking queue and will not get the data.

We have not yet analyzed the processing logic of the `admin` side, so let's talk about it roughly. At the `admin` end, the gateway `client` will be put into the blocking queue, and when there is a data change, the gateway `client` will come out of the queue and send the change data. So, if the gateway `client` is not in the blocking queue when there is a data change, then the current changed data is not available.

When we know which grouping data has changed, we actively get the changed data from `admin` again, and get the data in full depending on the grouping. The call method is `doFetchGroupConfig()`, which has been analyzed in the previous section.

At this point of analysis, the data synchronization operation on the gateway side is complete. The long polling task is to keep making requests to `admin` to see if the data has changed, and if any group data has changed, then initiate another request to `admin` to get the changed data, and then update the data in the gateway's memory.

Long polling task flow at the gateway side.

![](/img/activities/code-analysis-http-data-sync/http-long-polling-sequence-en.png)

### 3. Admin Data Sync

From the previous analysis, it can be seen that the gateway side mainly calls two interfaces of `admin`.

- `/configs/listener`: determine whether the group data has changed.
- `/configs/fetch`: get the changed group data.

If we analyze directly from these two interfaces, some parts may not be well understood, so let's start analyzing the data synchronization process from the `admin` startup process.

#### 3.1 Load Configuration

If the following configuration is done in the configuration file `application.yml`, it means that the data synchronization is done by `http long polling`.

```yaml
shenyu:
  sync:
      http:
        enabled: true
```

When the program starts, the configuration of the data synchronization class is loaded through `springboot` conditional assembly. In this process, `HttpLongPollingDataChangedListener` is created to handle the implementation logic related to long polling.

```java
/**
 * Data synchronization configuration class
 * Conditional assembly via springboot
 * The type Data sync configuration.
 */
@Configuration
public class DataSyncConfiguration {

    /**
     * http long polling.
     */
    @Configuration
    @ConditionalOnProperty(name = "shenyu.sync.http.enabled", havingValue = "true")
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

#### 3.2 Data change listener instantiation

- HttpLongPollingDataChangedListener

The data change listener is instantiated and initialized by means of a constructor. In the constructor, a blocking queue is created to hold clients, a thread pool is created to execute deferred tasks and periodic tasks, and information about the properties of long polling is stored.

```java
    public HttpLongPollingDataChangedListener(final HttpSyncProperties httpSyncProperties) {
        // default client (here is the gateway) 1024
        this.clients = new ArrayBlockingQueue<>(1024);
        // create thread pool
        // ScheduledThreadPoolExecutor can perform delayed tasks, periodic tasks, and normal tasks
        this.scheduler = new ScheduledThreadPoolExecutor(1,
                ShenyuThreadFactory.create("long-polling", true));
        // http sync properties
        this.httpSyncProperties = httpSyncProperties;
    }
```

In addition, it has the following class diagram relationships.

![](/img/activities/code-analysis-http-data-sync/data-changed-listener.png)

The `InitializingBean` interface is implemented, so the `afterInitialize()` method is executed during the initialization of the `bean`. Execute periodic tasks via thread pool: updating the data in memory `(CACHE)` is executed every `5` minutes and starts after `5` minutes. Refreshing the local cache is reading data from the database to the local cache (in this case the memory), done by `refreshLocalCache()`.

```java
public class HttpLongPollingDataChangedListener extends AbstractDataChangedListener {

    // ......

    /**
     * is called in the afterPropertiesSet() method of the InitializingBean interface, which is executed during the initialization of the bean
     */
    @Override
    protected void afterInitialize() {
        long syncInterval = httpSyncProperties.getRefreshInterval().toMillis();
        // Periodically check the data for changes and update the cache

        // Execution cycle task: Update data in memory (CACHE) is executed every 5 minutes and starts after 5 minutes
        // Prevent the admin from starting up first for a while and then generating data; then the gateway doesn't get the full amount of data when it first connects
        scheduler.scheduleWithFixedDelay(() -> {
            LOG.info("http sync strategy refresh config start.");
            try {
                // Read data from database to local cache (in this case, memory)
                this.refreshLocalCache();
                LOG.info("http sync strategy refresh config success.");
            } catch (Exception e) {
                LOG.error("http sync strategy refresh config error!", e);
            }
        }, syncInterval, syncInterval, TimeUnit.MILLISECONDS);
        LOG.info("http sync strategy refresh interval: {}ms", syncInterval);
    }

    // ......
}
```

- refreshLocalCache()

Update for each of the 5 data types.

```java
public abstract class AbstractDataChangedListener implements DataChangedListener, InitializingBean {

    // ......

    // Read data from database to local cache (in this case, memory)
    private void refreshLocalCache() {
        //update app auth data
        this.updateAppAuthCache();
        //update plugin data
        this.updatePluginCache();
        //update rule data
        this.updateRuleCache();
        //update selector data
        this.updateSelectorCache();
        //update meta data
        this.updateMetaDataCache();
    }

    // ......
}
```

The logic of the 5 update methods is similar, call the `service` method to get the data and put it into the memory `CACHE`. Take the updateRuleData method `updateRuleCache()` for example, pass in the rule enumeration type and call `ruleService.listAll()` to get all the rule data from the database.

```java
    /**
     * Update rule cache.
     */
    protected void updateRuleCache() {
        this.updateCache(ConfigGroupEnum.RULE, ruleService.listAll());
    }
```


- updateCache()

Update the data in memory using the data in the database.

```java
public abstract class AbstractDataChangedListener implements DataChangedListener, InitializingBean {

    // ......

    // cache Map
    protected static final ConcurrentMap<String, ConfigDataCache> CACHE = new ConcurrentHashMap<>();

    /**
     * if md5 is not the same as the original, then update lcoal cache.
     * @param group ConfigGroupEnum
     * @param <T> the type of class
     * @param data the new config data
     */
    protected <T> void updateCache(final ConfigGroupEnum group, final List<T> data) {
        // data serialization
        String json = GsonUtils.getInstance().toJson(data);
        // pass in md5 value and modification time
        ConfigDataCache newVal = new ConfigDataCache(group.name(), json, Md5Utils.md5(json), System.currentTimeMillis());
        // update group data
        ConfigDataCache oldVal = CACHE.put(newVal.getGroup(), newVal);
        log.info("update config cache[{}], old: {}, updated: {}", group, oldVal, newVal);
    }

    // ......
}
```

The initialization process is to start periodic tasks to update the memory data by fetching data from the database at regular intervals.

Next, we start the analysis of two interfaces.

- `/configs/listener`: determines if the group data has changed.
- `/configs/fetch`: fetching the changed group data.

#### 3.3  Data change polling interface

- `/configs/listener`: determines if the group data has changed.

The interface class is `ConfigController`, which only takes effect when using `http long polling` for data synchronization. The interface method `listener()` has no other logic and calls the `doLongPolling()` method directly.

```java
   
/**
 * This Controller only when HttpLongPollingDataChangedListener exist, will take effect.
 */
@ConditionalOnBean(HttpLongPollingDataChangedListener.class)
@RestController
@RequestMapping("/configs")
public class ConfigController {

    private final HttpLongPollingDataChangedListener longPollingListener;

    public ConfigController(final HttpLongPollingDataChangedListener longPollingListener) {
        this.longPollingListener = longPollingListener;
    }
    
    // Omit other logic

    /**
     * Listener.
     * Listen for data changes and perform long polling
     * @param request  the request
     * @param response the response
     */
    @PostMapping(value = "/listener")
    public void listener(final HttpServletRequest request, final HttpServletResponse response) {
        longPollingListener.doLongPolling(request, response);
    }

}
```

- HttpLongPollingDataChangedListener#doLongPolling()

Perform long polling tasks: If there are data changes, they will be responded to the client (in this case, the gateway side) immediately. Otherwise, the client will be blocked until there is a data change or a timeout.

```java
public class HttpLongPollingDataChangedListener extends AbstractDataChangedListener {

    // ......

    /**
     * Execute long polling: If there is a data change, it will be responded to the client (here is the gateway side) immediately.
     * Otherwise, the client will otherwise remain blocked until there is a data change or a timeout.
     * @param request
     * @param response
     */
    public void doLongPolling(final HttpServletRequest request, final HttpServletResponse response) {
        // compare group md5
        // Compare the md5, determine whether the data of the gateway and the data of the admin side are consistent, and get the data group that has changed
        List<ConfigGroupEnum> changedGroup = compareChangedGroup(request);
        String clientIp = getRemoteIp(request);
        // response immediately.
        // Immediate response to the gateway if there is changed data
        if (CollectionUtils.isNotEmpty(changedGroup)) {
            this.generateResponse(response, changedGroup);
            Log.info("send response with the changed group, ip={}, group={}", clientIp, changedGroup);
            return;
        }

        // No change, then the client (in this case the gateway) is put into the blocking queue
        // listen for configuration changed.
        final AsyncContext asyncContext = request.startAsync();
        // AsyncContext.settimeout() does not timeout properly, so you have to control it yourself
        asyncContext.setTimeout(0L);
        // block client's thread.
        scheduler.execute(new LongPollingClient(asyncContext, clientIp, HttpConstants.SERVER_MAX_HOLD_TIMEOUT));
    }
}
```

- HttpLongPollingDataChangedListener#compareChangedGroup()

To determine whether the group data has changed, the judgment logic is to compare the `md5` value and `lastModifyTime` at the gateway side and the `admin` side.

- If the `md5` value is different, then it needs to be updated.
- If the `lastModifyTime` on the `admin` side is greater than the `lastModifyTime` on the gateway side, then it needs to be updated.

```java
 /**
     * Determine if the group data has changed
     * @param request
     * @return
     */
    private List<ConfigGroupEnum> compareChangedGroup(final HttpServletRequest request) {
        List<ConfigGroupEnum> changedGroup = new ArrayList<>(ConfigGroupEnum.values().length);
        for (ConfigGroupEnum group : ConfigGroupEnum.values()) {
            // The md5 value and lastModifyTime of the data on the gateway side
            String[] params = StringUtils.split(request.getParameter(group.name()), ',');
            if (params == null || params.length != 2) {
                throw new ShenyuException("group param invalid:" + request.getParameter(group.name()));
            }
            String clientMd5 = params[0];
            long clientModifyTime = NumberUtils.toLong(params[1]);
            ConfigDataCache serverCache = CACHE.get(group.name());
            // do check. determine if the group data has changed
            if (this.checkCacheDelayAndUpdate(serverCache, clientMd5, clientModifyTime)) {
                changedGroup.add(group);
            }
        }
        return changedGroup;
    }
```

- LongPollingClient

No change data, then the client (in this case the gateway) is put into the blocking queue. The blocking time is 60 seconds, i.e. after 60 seconds remove and respond to the client.

```java
class LongPollingClient implements Runnable {
      // omitted other logic
    
        @Override
        public void run() {
            try {
                // Removal after 60 seconds and response to the client
                this.asyncTimeoutFuture = scheduler.schedule(() -> {
                    clients.remove(LongPollingClient.this);
                    List<ConfigGroupEnum> changedGroups = compareChangedGroup((HttpServletRequest) asyncContext.getRequest());
                    sendResponse(changedGroups);
                }, timeoutTime, TimeUnit.MILLISECONDS);

                // Add to blocking queue
                clients.add(this);

            } catch (Exception ex) {
                log.error("add long polling client error", ex);
            }
        }

        /**
         * Send response.
         *
         * @param changedGroups the changed groups
         */
        void sendResponse(final List<ConfigGroupEnum> changedGroups) {
            // cancel scheduler
            if (null != asyncTimeoutFuture) {
                asyncTimeoutFuture.cancel(false);
            }
            // Groups responding to changes
            generateResponse((HttpServletResponse) asyncContext.getResponse(), changedGroups);
            asyncContext.complete();
        }
    }
```


#### 3.4  Get Change Data Interface

- `/configs/fetch`: get change data;

Get the grouped data and return the result according to the parameters passed in by the gateway. The main implementation method is `longPollingListener.fetchConfig()`.

```java

@ConditionalOnBean(HttpLongPollingDataChangedListener.class)
@RestController
@RequestMapping("/configs")
public class ConfigController {

    private final HttpLongPollingDataChangedListener longPollingListener;

    public ConfigController(final HttpLongPollingDataChangedListener longPollingListener) {
        this.longPollingListener = longPollingListener;
    }

    /**
     * Fetch configs shenyu result.
     * @param groupKeys the group keys
     * @return the shenyu result
     */
    @GetMapping("/fetch")
    public ShenyuAdminResult fetchConfigs(@NotNull final String[] groupKeys) {
        Map<String, ConfigData<?>> result = Maps.newHashMap();
        for (String groupKey : groupKeys) {
            ConfigData<?> data = longPollingListener.fetchConfig(ConfigGroupEnum.valueOf(groupKey));
            result.put(groupKey, data);
        }
        return ShenyuAdminResult.success(ShenyuResultMessage.SUCCESS, result);
    }
    
  // Other interfaces are omitted

}
```

- AbstractDataChangedListener#fetchConfig()

Data fetching is taken directly from `CACHE`, and then matched and encapsulated according to different grouping types.

```java
public abstract class AbstractDataChangedListener implements DataChangedListener, InitializingBean {
    
    // ......
    
    /**
     * fetch configuration from cache.
     * @param groupKey the group key
     * @return the configuration data
     */
    public ConfigData<?> fetchConfig(final ConfigGroupEnum groupKey) {
        // get data from CACHE
        ConfigDataCache config = CACHE.get(groupKey.name());
        switch (groupKey) {
            case APP_AUTH: // app auth data
                return buildConfigData(config, AppAuthData.class);
            case PLUGIN: // plugin data
                return buildConfigData(config, PluginData.class);
            case RULE:   // rule data
                return buildConfigData(config, RuleData.class);
            case SELECTOR:  // selector data
                return buildConfigData(config, SelectorData.class);
            case META_DATA: // meta data 
                return buildConfigData(config, MetaData.class);
            default:  // other data type, throw exception
                throw new IllegalStateException("Unexpected groupKey: " + groupKey);
        }
    }
    
    // ......
}
```

#### 3.5 Data Change

In the previous `websocket` data synchronization and `zookeeper` data synchronization source code analysis article, we know that the `admin` side data synchronization design structure is as follows.

![](/img/activities/code-analysis-http-data-sync/data-changed-listener-admin.png)

Various data change listeners are subclasses of `DataChangedListener`.

When the data is modified on the `admin` side, event notifications are sent through the `Spring` event handling mechanism. The sending logic is as follows.

```java

/**
 * Event forwarders, which forward the changed events to each ConfigEventListener.
 * Data change event distributor: synchronize the change data to ShenYu gateway when there is a data change in admin side
 * Data changes rely on Spring's event-listening mechanism: ApplicationEventPublisher --> ApplicationEvent --> ApplicationListener
 *
 */
@Component
public class DataChangedEventDispatcher implements ApplicationListener<DataChangedEvent>, InitializingBean {

  // other logic omitted

    /**
     * Call this method when there are data changes
     * @param event
     */
    @Override
    @SuppressWarnings("unchecked")
    public void onApplicationEvent(final DataChangedEvent event) {
        // Iterate through the data change listeners (it's generally good to use a kind of data synchronization)
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
                    // pull and save API document on seletor changed
                    applicationContext.getBean(LoadServiceDocEntry.class).loadDocOnSelectorChanged((List<SelectorData>) event.getSource(), event.getEventType());
                    break;
                case META_DATA:  // meta data
                    listener.onMetaDataChanged((List<MetaData>) event.getSource(), event.getEventType());
                    break;
                default:  // other data type, throw exception
                    throw new IllegalStateException("Unexpected value: " + event.getGroupKey());
            }
        }
    }
}
```

Suppose, the plugin information is modified and the data is synchronized by `http long polling`, then the actual call to `listener.onPluginChanged()` is `org.apache.shenyu.admin.listener. AbstractDataChangedListener#onPluginChanged`.

```java
    /**
     * In the operation of the admin, there is an update of the plugin occurred
     * @param changed   the changed
     * @param eventType the event type
     */
    @Override
    public void onPluginChanged(final List<PluginData> changed, final DataEventTypeEnum eventType) {
        if (CollectionUtils.isEmpty(changed)) {
            return;
        }
        // update CACHE
        this.updatePluginCache();
        // execute change task
        this.afterPluginChanged(changed, eventType);
    }
```

There are two processing operations, one is to update the memory `CACHE`, which was analyzed earlier, and the other is to execute the change task, which is executed in the thread pool.

- HttpLongPollingDataChangedListener#afterPluginChanged()

```java
    @Override
    protected void afterPluginChanged(final List<PluginData> changed, final DataEventTypeEnum eventType) {
        // execute by thread pool
        scheduler.execute(new DataChangeTask(ConfigGroupEnum.PLUGIN));
    }
```

- DataChangeTask

Data change task: remove the clients in the blocking queue in turn and send a response to notify the gateway that a group of data has changed.

```java
class DataChangeTask implements Runnable {
		//other logic omitted
  
        @Override
        public void run() {
            // If the client in the blocking queue exceeds the given value of 100, it is executed in batches
            if (clients.size() > httpSyncProperties.getNotifyBatchSize()) {
                List<LongPollingClient> targetClients = new ArrayList<>(clients.size());
                clients.drainTo(targetClients);
                List<List<LongPollingClient>> partitionClients = Lists.partition(targetClients, httpSyncProperties.getNotifyBatchSize());
               // batch execution
                partitionClients.forEach(item -> scheduler.execute(() -> doRun(item)));
            } else {
                // execute task
                doRun(clients);
            }
        }

        private void doRun(final Collection<LongPollingClient> clients) {
            // Notify all clients that a data change has occurred
            for (Iterator<LongPollingClient> iter = clients.iterator(); iter.hasNext();) {
                LongPollingClient client = iter.next();
                iter.remove();
                // send response to client
                client.sendResponse(Collections.singletonList(groupKey));
                Log.info("send response with the changed group,ip={}, group={}, changeTime={}", client.ip, groupKey, changeTime);
            }
        }
    }
```

At this point, the data synchronization logic on the `admin` side is analyzed. In the `http long polling` based data synchronization is, it has three main functions.

- providing a data change listening interface.
- providing the interface to get the changed data.
- When there is a data change, remove the client in the blocking queue and respond to the result.

Finally, three diagrams describe the long polling task flow on the `admin` side.

- `/configs/listener` data change listener interface.

![](/img/activities/code-analysis-http-data-sync/http-long-polling-listener-en.png)

- `/configs/fetch` fetch change data interface.

![](/img/activities/code-analysis-http-data-sync/http-long-polling-fetch-en.png)

- Update data in the admin backend management system for data synchronization.

![](/img/activities/code-analysis-http-data-sync/http-long-polling-admin-update-en.png)


### 4. Summary

This article focuses on the source code analysis of `http long polling` data synchronization in the `ShenYu` gateway. The main knowledge points involved are as follows.

- `http long polling` is initiated by the gateway side, which constantly requests the `admin` side.
- change data at group granularity (authentication information, plugins, selectors, rules, metadata).
- `http long polling` results in getting only the change group, and another request needs to be initiated to get the group data.
- Whether the data is updated or not is determined by the `md5` value and the modification time `lastModifyTime`.

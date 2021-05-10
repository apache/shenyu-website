---
title: "ShenYu网关学习Zookeeper数据同步01"
author: "李权"
description: "ShenYu网关学习Zookeeper数据同步"
categories: "Soul"
tags: ["Soul"]
date: 2021-01-20
cover: "/img/architecture/soul-framework.png"
---

#### 启动 soul-admin、soul-bootstrap， 使用zookeeper同步数据到网关

###### 一、配置环境
1、soul-admin 服务配置，需要重启服务

soul-admin/src/main/resources/application.yml
```yaml
soul:
  sync:
      zookeeper:
          url: localhost:2181
          sessionTimeout: 5000
          connectionTimeout: 2000
```
2、soul-bootstrap 网关服务配置，需要重启

soul-bootstrap/pom.xml
```xml
<!--soul data sync start use zookeeper-->
<dependency>
    <groupId>org.dromara</groupId>
    <artifactId>soul-spring-boot-starter-sync-data-zookeeper</artifactId>
    <version>${project.version}</version>
</dependency>
```
soul-bootstrap/src/main/resources/application-local.yml

```yaml
soul :
    sync:
        zookeeper:
             url: localhost:2181
             sessionTimeout: 5000
             connectionTimeout: 2000
```
###### 二、启动服务
1、 启动 zookeeper
```
zookeeper ./bin/zkServer.sh start
/usr/bin/java
ZooKeeper JMX enabled by default
Using config: /Documents/soft/zookeeper/bin/../conf/zoo.cfg
Starting zookeeper ... STARTED
```

2、soul-admin 网关后台服务启动，服务启动后可以看到发起的ZooKeeper请求调用

```

2021-01-20 17:34:48.752  INFO 64500 --- [-localhost:2181] org.I0Itec.zkclient.ZkEventThread        : Starting ZkClient event thread.
2021-01-20 17:34:48.761  INFO 64500 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:zookeeper.version=3.5.6-c11b7e26bc554b8523dc929761dd28808913f091, built on 10/08/2019 20:18 GMT
2021-01-20 17:34:48.761  INFO 64500 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:host.name=10.7.254.31
2021-01-20 17:34:48.761  INFO 64500 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:java.version=1.8.0_261
2021-01-20 17:34:48.761  INFO 64500 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:java.vendor=Oracle Corporation
......
2021-01-20 17:34:48.806  INFO 64500 --- [localhost:2181)] org.apache.zookeeper.ClientCnxn          : Opening socket connection to server localhost/0:0:0:0:0:0:0:1:2181. Will not attempt to authenticate using SASL (unknown error)
2021-01-20 17:34:48.826  INFO 64500 --- [localhost:2181)] org.apache.zookeeper.ClientCnxn          : Socket connection established, initiating session, client: /0:0:0:0:0:0:0:1:58214, server: localhost/0:0:0:0:0:0:0:1:2181
2021-01-20 17:34:48.857  INFO 64500 --- [localhost:2181)] org.apache.zookeeper.ClientCnxn          : Session establishment complete on server localhost/0:0:0:0:0:0:0:1:2181, sessionid = 0x1000b5e22f50001, negotiated timeout = 5000
2021-01-20 17:34:48.861  INFO 64500 --- [ain-EventThread] org.I0Itec.zkclient.ZkClient             : zookeeper state changed (SyncConnected)
```

3、soul-bootstrap 网关服务启动，服务启动后可以看到发起的ZooKeeper请求调用

```
2021-01-20 17:35:58.996  INFO 64583 --- [           main] s.b.s.d.z.ZookeeperSyncDataConfiguration : you use zookeeper sync soul data.......
2021-01-20 17:35:59.003  INFO 64583 --- [-localhost:2181] org.I0Itec.zkclient.ZkEventThread        : Starting ZkClient event thread.
......

2021-01-20 17:35:59.012  INFO 64583 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:user.home=/Users/liquan
2021-01-20 17:35:59.012  INFO 64583 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:os.memory.total=310MB
2021-01-20 17:35:59.018  INFO 64583 --- [           main] org.apache.zookeeper.ZooKeeper           : Initiating client connection, connectString=localhost:2181 sessionTimeout=5000 watcher=org.I0Itec.zkclient.ZkClient@114a5e0
2021-01-20 17:35:59.121  INFO 64583 --- [localhost:2181)] org.apache.zookeeper.ClientCnxn          : Session establishment complete on server localhost/127.0.0.1:2181, sessionid = 0x1000b5e22f50002, negotiated timeout = 5000
2021-01-20 17:35:59.126  INFO 64583 --- [ain-EventThread] org.I0Itec.zkclient.ZkClient             : zookeeper state changed (SyncConnected)
```

4、查看 zookeeper 上的soul网关同步的注册信息
![在这里插入图片描述](/img/soul/blog5/zk1.png)


###### 三、ShenYu 网关 Zookeeper 数据同步原理解析
在 soul-admin 启动后在控制台中看到了 org.I0Itec.zkclient.ZkClient，以此为入口进行跟踪调试。

1、ZookeeperConfiguration 作用：注册 zkClient 到Spring容器。
```java
// EnableConfigurationProperties 作用：使用 @ConfigurationProperties 注解的类生效。如果一个配置类只配置@ConfigurationProperties注解，而没有使用@Component，那么在IOC容器中是获取不到properties 配置文件转化的bean。@EnableConfigurationProperties 相当于把使用@ConfigurationProperties 的类进行了一次注入。
// @ConditionalOnMissingBean 容器中没有指定的类，就进行注入，@ConditionalOnBean与之相反
/**
 * ZookeeperConfiguration .
 * @author xiaoyu(Myth)
 */
@EnableConfigurationProperties(ZookeeperProperties.class)
public class ZookeeperConfiguration {
    /**
     * register zkClient in spring ioc.
     *
     * @param zookeeperProp the zookeeper configuration
     * @return ZkClient {@linkplain ZkClient}
     */
    @Bean
    @ConditionalOnMissingBean(ZkClient.class)
    public ZkClient zkClient(final ZookeeperProperties zookeeperProp) {
        return new ZkClient(zookeeperProp.getUrl(), zookeeperProp.getSessionTimeout(), zookeeperProp.getConnectionTimeout());
    }
}
```
soul-admin 启动后，会实读取 zookeeper 配置信息，向容器中注入 zkClient 和 zookeeper建立连接。
![在这里插入图片描述](/img/soul/blog5/zk2.png)

![在这里插入图片描述](/img/soul/blog5/zk3.png)

2、实例化 ZkClient 的调用栈中会调用 DataChangedEventDispatcher 的 afterPropertiesSet 方法。

org.dromara.soul.admin.listener.DataChangedEventDispatcher 作用：事件转发器，将更改的事件转发到每个ConfigEventListener。

此类 实现了 InitializingBean，在DataChangedEventDispatcher初始化过程中，会执行afterPropertiesSet方法。

afterPropertiesSet 方法会在容器中查找类型是 DataChangedListener.class 的bean。

```java
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
            .......
            default:
                throw new IllegalStateException("Unexpected value: " + event.getGroupKey());
        }
    }
     ......
    @Override
    public void afterPropertiesSet() {
        Collection<DataChangedListener> listenerBeans = applicationContext.getBeansOfType(DataChangedListener.class).values();
        this.listeners = Collections.unmodifiableList(new ArrayList<>(listenerBeans));
    }
}
```
3、afterPropertiesSet 方法的执行会查找 DataChangedListener.class 相关类的实例化。

org.dromara.soul.admin.config.DataSyncConfiguration 作用：数据同步配置类。

ZookeeperDataChangedListener 数据变化监听器，作用：应该是监听元数据变化，然后同步到zookeeper。

ZookeeperDataInit zookeeper数据初始化，作用：向zookeeper同步初始化数据。
```java
/**
 * The type Zookeeper listener. 
 */
@Configuration
@ConditionalOnProperty(prefix = "soul.sync.zookeeper", name = "url")
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
     * Zookeeper data init zookeeper data init
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
```
4、org.dromara.soul.admin.listener.zookeeper.ZookeeperDataInit 作用：负责向zookeeper同步初始化数据。此类实现了 CommandLineRunner。

CommandLineRunner：作用：SpringBoot在项目启动后会遍历所有实现CommandLineRunner的实体类并执行run方法，如果需要按照一定的顺序去执行，那么就需要在实体类上使用一个@Order注解（或者实现Order接口）来表明顺序。

run 方法会调用 syncDataService.syncAll方法。
```java
public class ZookeeperDataInit implements CommandLineRunner {
    private final ZkClient zkClient;
    private final SyncDataService syncDataService;
    /**
     * Instantiates a new Zookeeper data init.
     * @param zkClient        the zk client
     * @param syncDataService the sync data service
     */
    public ZookeeperDataInit(final ZkClient zkClient, final SyncDataService syncDataService) {
        this.zkClient = zkClient;
        this.syncDataService = syncDataService;
    }
    @Override
    public void run(final String... args) {
        String pluginPath = ZkPathConstants.PLUGIN_PARENT;
        String authPath = ZkPathConstants.APP_AUTH_PARENT;
        String metaDataPath = ZkPathConstants.META_DATA;
        if (!zkClient.exists(pluginPath) && !zkClient.exists(authPath) && !zkClient.exists(metaDataPath)) {
            syncDataService.syncAll(DataEventTypeEnum.REFRESH);
        }
    }
}
```
5、org.dromara.soul.admin.service.sync.SyncDataServiceImpl

syncAll 方法会调用事件发布器进行事件发布，事件类型是 DataEventTypeEnum.REFRESH。
```java
/**
 * The type sync data service.
 * @author xiaoyu(Myth)
 */
@Service("syncDataService")
public class SyncDataServiceImpl implements SyncDataService {
    // 发布事件，也就是把某个事件告诉的所有与这个事件相关的监听器
    private final ApplicationEventPublisher eventPublisher;
    ......
    @Override
    public boolean syncAll(final DataEventTypeEnum type) {
        appAuthService.syncData();
        List<PluginData> pluginDataList = pluginService.listAll();
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.PLUGIN, type, pluginDataList));
        List<SelectorData> selectorDataList = selectorService.listAll();
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.SELECTOR, type, selectorDataList));
        List<RuleData> ruleDataList = ruleService.listAll();
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.RULE, type, ruleDataList));
        metaDataService.syncData();
        return true;
    }
    ......
}
```

![在这里插入图片描述](/img/soul/blog5//zk4.png)

6、事件发布后 org.dromara.soul.admin.listener.DataChangedEventDispatcher 类的onApplicationEvent 方法会监听事件变化，遍历所有的监听者进行数据同步处理，这里的监听者实现类是 ZookeeperDataChangedListener，根据对应的事件类型通过 zkClient 向
zookeeper 同步数据。
 
![在这里插入图片描述](/img/soul/blog5//zk5.png)

7、soul-admin 初始化到数据到zookeeper思维导图

![在这里插入图片描述](/img/soul/blog5//zk6.png)

###### 四、总结
soul-admin 启动就会同步网关数据 rule、metaData、selector、plugin 等到 zookeeper。数据变化会发布 DataChangedEvent事件，监听事件将数据同步至zookeeper。


[ShenYu网关数据同步原理](https://dromara.org/projects/shenyu/data-sync/)

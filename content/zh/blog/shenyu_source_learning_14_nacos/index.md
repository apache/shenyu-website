---
title: "Apache ShenYu网关学习Nacos数据同步"
author: "李权"
description: "Apache ShenYu网关学习Nacos数据同步"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2021-01-26
cover: "/img/shenyu/blog5/ns15.png"
---
本篇分析一下Nacos同步数据原理

1、先配置一下环境
* soul-admin
soul-admin/src/main/resources/application.yml
```yaml
soul:
  sync:
      nacos:
        url: localhost:8848
        namespace: 1c10d748-af86-43b9-8265-75f487d20c6c
  #      acm:
  #        enabled: false
  #        endpoint: acm.aliyun.com
  #        namespace:
  #        accessKey:
  #        secretKey:
```
soul-admin/pom.xml，这里默认配置是有的
```xml
<dependency>
    <groupId>com.alibaba.nacos</groupId>
    <artifactId>nacos-client</artifactId>
    <version>${nacos-client.version}</version>
</dependency>
```
* soul-bootstrap 
soul-bootstrap/src/main/resources/application-local.yml
```yaml
soul :
    sync:
        nacos:
          url: localhost:8848
          namespace: 1c10d748-af86-43b9-8265-75f487d20c6c
#          acm:
#            enabled: false
#            endpoint: acm.aliyun.com
#            namespace:
#            accessKey:
#            secretKey:
```
soul-bootstrap/pom.xml，下面的配置默认是没有的，需要手动添加
```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>soul-spring-boot-starter-sync-data-nacos</artifactId>
    <version>${project.version}</version>
</dependency>
```
* 启动服务
```
1、启动 nacos
2、启动 soul-admin
3、启动 soul-bootstrap
```
2、上面看着挺顺利，这个过程遇到了坑，soul-bootstrap 启动不起来报空指针异常，下面详细记录一下。
首先soul-admin启动后不会主动向nacos同步网关数据，需要手动同步，官网这一点没有提到。这个问题绊了我好久，最后是看到了群里其他同学遇到了同样的问题，参考了他们的文章才解决，下面记录一下解决过程。

1）soul-bootstrap 启动的时候遇到了如下的错误，NullPointerException。

soul-bootstrap 启动的时候会去，nacos获取网关数据，看到下面的断点，拿到的是空数据。
```
Error starting ApplicationContext. To display the conditions report re-run your application with 'debug' enabled.
2021-01-25 16:49:06.052 ERROR 5273 --- [           main] o.s.boot.SpringApplication               : Application run failed
org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'nacosSyncDataService' defined in class path resource [org/dromara/soul/springboot/starter/sync/data/nacos/NacosSyncDataConfiguration.class]: Bean instantiation via factory method failed; nested exception is org.springframework.beans.BeanInstantiationException: Failed to instantiate [org.dromara.soul.sync.data.api.SyncDataService]: Factory method 'nacosSyncDataService' threw exception; nested exception is java.lang.NullPointerException
......
	at org.dromara.soul.bootstrap.SoulBootstrapApplication.main(SoulBootstrapApplication.java:37) [classes/:na]
Caused by: org.springframework.beans.BeanInstantiationException: Failed to instantiate [org.dromara.soul.sync.data.api.SyncDataService]: Factory method 'nacosSyncDataService' threw exception; nested exception is java.lang.NullPointerException
	at org.springframework.beans.factory.support.SimpleInstantiationStrategy.instantiate(SimpleInstantiationStrategy.java:185) ~[spring-beans-5.2.2.RELEASE.jar:5.2.2.RELEASE]
	at org.springframework.beans.factory.support.ConstructorResolver.instantiate(ConstructorResolver.java:651) ~[spring-beans-5.2.2.RELEASE.jar:5.2.2.RELEASE]
	... 19 common frames omitted
Caused by: java.lang.NullPointerException: null
	at org.dromara.soul.sync.data.nacos.handler.NacosCacheHandler.updateMetaDataMap(NacosCacheHandler.java:128) ~[classes/:na]
	at org.dromara.soul.sync.data.nacos.handler.NacosCacheHandler.watcherData(NacosCacheHandler.java:167) ~[classes/:na]
	at org.dromara.soul.sync.data.nacos.NacosSyncDataService.start(NacosSyncDataService.java:59) ~[classes/:na]
	at org.dromara.soul.sync.data.nacos.NacosSyncDataService.<init>(NacosSyncDataService.java:49) ~[classes/:na]
	at org.dromara.soul.springboot.starter.sync.data.nacos.NacosSyncDataConfiguration.nacosSyncDataService(NacosSyncDataConfiguration.java:66) ~[classes/:na]
	at org.dromara.soul.springboot.starter.sync.data.nacos.NacosSyncDataConfiguration$$EnhancerBySpringCGLIB$$cce084b7.CGLIB$nacosSyncDataService$0(<generated>) ~[classes/:na]
	at org.dromara.soul.springboot.starter.sync.data.nacos.NacosSyncDataConfiguration$$EnhancerBySpringCGLIB$$cce084b7$$FastClassBySpringCGLIB$$3830e886.invoke(<generated>) ~[classes/:na]
	at org.springframework.cglib.proxy.MethodProxy.invokeSuper(MethodProxy.java:244) ~[spring-core-5.2.2.RELEASE.jar:5.2.2.RELEASE]
	at org.springframework.context.annotation.ConfigurationClassEnhancer$BeanMethodInterceptor.intercept(ConfigurationClassEnhancer.java:363) ~[spring-context-5.2.2.RELEASE.jar:5.2.2.RELEASE]
	at org.dromara.soul.springboot.starter.sync.data.nacos.NacosSyncDataConfiguration$$EnhancerBySpringCGLIB$$cce084b7.nacosSyncDataService(<generated>) ~[classes/:na]
......
	at org.springframework.beans.factory.support.SimpleInstantiationStrategy.instantiate(SimpleInstantiationStrategy.java:154) ~[spring-beans-5.2.2.RELEASE.jar:5.2.2.RELEASE]
	... 20 common frames omitted
```

![在这里插入图片描述](/img/shenyu/blog5/ns1.png)

2）到nacos去看一下是否有网关的数据，根据配置的 “namespace: 1c10d748-af86-43b9-8265-75f487d20c6c” 结果是什么都没有。

![在这里插入图片描述](/img/shenyu/blog5/ns2.png)

![在这里插入图片描述](/img/shenyu/blog5/ns3.png)

3、尝试去soul-admin手动同步，nacos也看不到数据，必须需要手动创建命名空间“1c10d748-af86-43b9-8265-75f487d20c6c”，如下图。

![在这里插入图片描述](/img/shenyu/blog5/ns4.png)

4、去soul-admin 手动同步数据后，就看到了nacos上有了网关的配置信息，这时候soul-bootstrap 还是启动不起来，因为这里还缺少元数据信息。元数据只有 dubbo、springcloud 服务有数据，http是没有元数据的，所以还得去启动一下dubbo服务。然后在soul-admin同步一下元数据。

![在这里插入图片描述](/img/shenyu/blog5/ns5.png)

soul-admin 点击同步数据，将元数据会同步到nacos

![在这里插入图片描述](/img/shenyu/blog5/ns6.png)

soul-admin 点击同步数据，将认证数据会同步到nacos

![在这里插入图片描述](/img/shenyu/blog5/ns7.png)

这时候 nacos 已经看到了全部的网关数据

![在这里插入图片描述](/img/shenyu/blog5/ns8.png)

5、再去启动soul-bootstrap，终于启动成功
```
2021-01-25 17:56:54.798  INFO 10051 --- [           main] o.d.s.w.configuration.SoulConfiguration  : load plugin:[monitor] [org.dromara.soul.plugin.monitor.MonitorPlugin]
2021-01-25 17:56:54.798  INFO 10051 --- [           main] o.d.s.w.configuration.SoulConfiguration  : load plugin:[response] [org.dromara.soul.plugin.httpclient.response.WebClientResponsePlugin]
2021-01-25 17:56:54.990  INFO 10051 --- [           main] d.s.s.s.s.d.n.NacosSyncDataConfiguration : you use nacos sync soul data.......
2021-01-25 17:56:58.890  INFO 10051 --- [           main] o.s.b.a.e.web.EndpointLinksResolver      : Exposing 2 endpoint(s) beneath base path '/actuator'
2021-01-25 17:56:59.758  INFO 10051 --- [           main] o.s.b.web.embedded.netty.NettyWebServer  : Netty started on port(s): 9195
2021-01-25 17:56:59.764  INFO 10051 --- [           main] o.d.s.b.SoulBootstrapApplication         : Started SoulBootstrapApplication in 8.401 seconds (JVM running for 9.95)
```
6、小结：

配置下来感觉使用nacos同步数据不是很友好，配置过程遇到了很多坑，首先soul-admin 不会主动同步网关数据到nacos，需要手动同步。soul-bootstrap必须依赖所有的网关配置数据 soul.plugin、soul.selector、soul.selector、soul.meta、soul.auth，缺一不可。如果网关只代理http服务（无元数据），soul-bootstrap是启动不起来的。官网这一块没有做详细说明，对小白不是很友好。

我们知道soul-admin启动后不会自动向nacos同步数据，需要手动操作。

下面分析一下soul-admin，nacos，soul-bootstrap同步数据的过程。

##### soul-admin 如何同步网关数据？

1、插件信息更新后会发布一个DataChangedEvent事件

```java
/**
 * create or update plugin
 * @param pluginDTO {@linkplain PluginDTO}
 * @return rows
 */
@Override
@Transactional(rollbackFor = Exception.class)
public String createOrUpdate(final PluginDTO pluginDTO) {
    ......
    // publish change event.
    eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.PLUGIN, eventType,
            Collections.singletonList(PluginTransfer.INSTANCE.mapToData(pluginDO))));
    return StringUtils.EMPTY;
}
```

2、由监听事件处理类 DataChangedEventDispatcher 负责调用具体的监听实现类对 DataChangedEvent事件进行处理，这里的具体实现类是NacosDataChangedListener。

> org.dromara.soul.admin.listener.DataChangedEventDispatcher

> DataChangedEventDispatcher初始化完成后会执行 afterPropertiesSet()，在容器中获取所有类型是DataChangedListener.class的bean

```java

@Override
public void afterPropertiesSet() {
    Collection<DataChangedListener> listenerBeans = applicationContext.getBeansOfType(DataChangedListener.class).values();
    this.listeners = Collections.unmodifiableList(new ArrayList<>(listenerBeans));
}
```

>> DataChangedEventDispatcher 监听到变更事件后，会执行 onApplicationEvent，遍历所有的监听类对监听事件进行处理，这里是NacosDataChangedListener，如下图的debug。

```java 

@Override
@SuppressWarnings("unchecked")
public void onApplicationEvent(final DataChangedEvent event) {
    for (DataChangedListener listener : listeners) {
        switch (event.getGroupKey()) {
            ......
            case RULE:
                listener.onRuleChanged((List<RuleData>) event.getSource(), event.getEventType());
                break;
            ......
            default:
                throw new IllegalStateException("Unexpected value: " + event.getGroupKey());
        }
    }
}
```

![在这里插入图片描述](/img/shenyu/blog5/ns9.png)

3、NacosDataChangedListener 会执行 onRuleChanged，updateRuleMap 先将网关数据同步至内存，在通过publishConfig同步至nacos。
> org.dromara.soul.admin.listener.nacos.NacosDataChangedListener 
```java
// 执行监听事件
@Override
public void onRuleChanged(final List<RuleData> changed, final DataEventTypeEnum eventType) {
    updateRuleMap(getConfig(RULE_DATA_ID));
    switch (eventType) {
        ......
        default:
            changed.forEach(rule -> {
                List<RuleData> ls = RULE_MAP
                        .getOrDefault(rule.getSelectorId(), new ArrayList<>())
                        .stream()
                        .filter(s -> !s.getId().equals(rule.getSelectorId()))
                        .sorted(RULE_DATA_COMPARATOR)
                        .collect(Collectors.toList());
                ls.add(rule);
                RULE_MAP.put(rule.getSelectorId(), ls);
            });
            break;
    }
    publishConfig(RULE_DATA_ID, RULE_MAP);
}
// 同步至内存
private void updateRuleMap(final String configInfo) {
    JsonObject jo = GsonUtils.getInstance().fromJson(configInfo, JsonObject.class);
    Set<String> set = new HashSet<>(RULE_MAP.keySet());
    ......
    RULE_MAP.keySet().removeAll(set);
}
// 同步至nacos
@SneakyThrows
private void publishConfig(final String dataId, final Object data) {
    configService.publishConfig(dataId, GROUP, GsonUtils.getInstance().toJson(data));
}
```

![在这里插入图片描述](/img/shenyu/blog5/ns10.png)

4、DataChangedEventDispatcher 、NacosDataChangedListener 类继承关系

![在这里插入图片描述](/img/shenyu/blog5/ns11.png)

![在这里插入图片描述](/img/shenyu/blog5/ns12.png)

5、小结

> 1、例如 soul-admin 更新网关数据，发布一个DataChangedEvent事件，eventPublisher.publishEvent(new DataChangedEvent())
> 2、DataChangedEventDispatcher --> onApplicationEvent()方法监听事件到事件，判断监听类是 NacosDataChangedListener
> 3、NacosDataChangedListener --> onRuleChanged()处理事件
> 4、同步至内存 updateRuleMap(getConfig(RULE_DATA_ID))
> 5、同步至nacos publishConfig(RULE_DATA_ID, RULE_MAP)

##### soul-bootstrap 如何同步网关数据？
1、soul-bootstrap 添加了nacos依赖 soul-spring-boot-starter-sync-data-nacos，服务启动后会自动注入NacosSyncDataConfiguration
> org.dromara.soul.springboot.starter.sync.data.nacos.NacosSyncDataConfiguration
>> NacosSyncDataService 负责读取和同步nacos网关数据
```java
@Configuration
@ConditionalOnClass(NacosSyncDataService.class)
@ConditionalOnProperty(prefix = "soul.sync.nacos", name = "url")
@Slf4j
public class NacosSyncDataConfiguration {
    // 注入nacos数据同步服务
    @Bean
    public SyncDataService nacosSyncDataService(final ObjectProvider<ConfigService> configService, final ObjectProvider<PluginDataSubscriber> pluginSubscriber,
                                           final ObjectProvider<List<MetaDataSubscriber>> metaSubscribers, final ObjectProvider<List<AuthDataSubscriber>> authSubscribers) {
        log.info("you use nacos sync soul data.......");
        return new NacosSyncDataService(configService.getIfAvailable(), pluginSubscriber.getIfAvailable(),
                metaSubscribers.getIfAvailable(Collections::emptyList), authSubscribers.getIfAvailable(Collections::emptyList));
    }
    // 注入nacos客户端配置服务
    @Bean
    public ConfigService nacosConfigService(final NacosConfig nacosConfig) throws Exception {
        Properties properties = new Properties();
        ......
        return NacosFactory.createConfigService(properties);
    }
    // 注入nacos配置服务
    @Bean
    @ConfigurationProperties(prefix = "soul.sync.nacos")
    public NacosConfig nacosConfig() {
        return new NacosConfig();
    }
}
```
2、org.dromara.soul.sync.data.nacos.NacosSyncDataService
> 初始化会执行 start
>> watcherData 负责监听nacos网关数据
>>> updatePluginMap 同步网关数据到内存

```java
public void start() {
    ......
    watcherData(RULE_DATA_ID, this::updateRuleMap);
    ......
}
@SneakyThrows
private String getConfigAndSignListener(final String dataId, final Listener listener) {
    return configService.getConfigAndSignListener(dataId, GROUP, 6000, listener);
}
protected void watcherData(final String dataId, final OnChange oc) {
    Listener listener = new Listener() {
        @Override
        public void receiveConfigInfo(final String configInfo) {
            oc.change(configInfo);
        }
        ......
    };
    oc.change(getConfigAndSignListener(dataId, listener));
    LISTENERS.getOrDefault(dataId, new ArrayList<>()).add(listener);
}
```

![在这里插入图片描述](/img/shenyu/blog5/ns13.png)

3、NacosSyncDataService 类关系图

![在这里插入图片描述](/img/shenyu/blog5/ns14.png)

4、小结
> 1、soul-bootstrap 启动向容器自动注入 NacosSyncDataConfiguration
> 2、NacosSyncDataConfiguration 类中会向容器注入 NacosSyncDataService
> 3、NacosSyncDataService --> start() --> watcherData() 监听nacos，同步网关数据到内存
> 4、watcherData() --> updatePluginMap()

##### 总结

![在这里插入图片描述](/img/shenyu/blog5/ns15.png)


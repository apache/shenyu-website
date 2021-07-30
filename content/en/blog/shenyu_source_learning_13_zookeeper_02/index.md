---
title: "Apache ShenYu Gateway Learns Zookeeper Data Synchronization 02"
author: "liquan"
description: "Apache ShenYu Gateway Learns Zookeeper Data Synchronization"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2021-01-21
cover: "/img/architecture/shenyu-framework.png"
---

#### 启动admin，与网关。 admin操作，使用zookeeper同步数据到网关

[上一篇](https://dromara.org/blog/soul_source_learning_13_zookeeper_01)，通过soul-admin启动过程为入口，分析了soul-admin 启动就会同步网关数据 rule、metaData、selector、plugin 等到 zookeeper。

数据变化会发布 DataChangedEvent事件，监听事件将数据同步至zookeeper。
本篇接着上一篇继续跟踪源码分析zookeeper同步数据到网关原理：

* soul-admin 变更网关数据，跟踪数据同步过程。
* soul-bootstrap 如何获取zookeeper数据的，如何感知网关数据变化的。

###### 一、soul-admin 变更网关数据，跟踪数据同步过程
1、在网关后台尝试更改divide插件状态，debug跟踪。

![在这里插入图片描述](/img/shenyu/blog5/zk7.png)

2、插件更新后会发布一个DataChangedEvent事件

![在这里插入图片描述](/img/shenyu/blog5/zk8.png)

3、org.dromara.soul.admin.listener.DataChangedEventDispatcher --> onApplicationEvent() 负责监听事件

![在这里插入图片描述](/img/shenyu/blog5/zk9.png)

4、org.dromara.soul.admin.listener.zookeeper.ZookeeperDataChangedListener 负责同步数据至zookeeper

![在这里插入图片描述](/img/shenyu/blog5/zk10.png)

###### 二、soul-bootstrap 如何获取zookeeper数据的，如何感知网关数据变化的。
1、soul-bootstrap 依赖
```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>soul-spring-boot-starter-sync-data-zookeeper</artifactId>
    <version>${project.version}</version>
</dependency>
```
2、soul-bootstrap 启动后会自动注入org.dromara.soul.spring.boot.sync.data.zookeeper.ZookeeperSyncDataConfiguration

读取Zookeeper配置向容器中注入ZkClient。

SyncDataService 向容器注入数据同步服务bean，从Spring容器中获取，ZkClient（zookeeper客户端）， pluginSubscriber（插件数据订阅）、metaSubscribers （元数据订阅）、authSubscribers（权限订阅）。
```java
public class ZookeeperSyncDataConfiguration {
    /**
     * Sync data service sync data service.
     * @param zkClient          the zk client
     * @param pluginSubscriber the plugin subscriber
     * @param metaSubscribers   the meta subscribers
     * @param authSubscribers   the auth subscribers
     * @return the sync data service
     */
    @Bean
    public SyncDataService syncDataService(final ObjectProvider<ZkClient> zkClient, final ObjectProvider<PluginDataSubscriber> pluginSubscriber,
                                           final ObjectProvider<List<MetaDataSubscriber>> metaSubscribers, final ObjectProvider<List<AuthDataSubscriber>> authSubscribers) {
        log.info("you use zookeeper sync ShenYu data.......");
        return new ZookeeperSyncDataService(zkClient.getIfAvailable(), pluginSubscriber.getIfAvailable(),
                metaSubscribers.getIfAvailable(Collections::emptyList), authSubscribers.getIfAvailable(Collections::emptyList));
    }
    /**
     * register zkClient in spring ioc.
     * @param zookeeperConfig the zookeeper configuration
     * @return ZkClient {@linkplain ZkClient}
     */
    @Bean
    public ZkClient zkClient(final ZookeeperConfig zookeeperConfig) {
        return new ZkClient(zookeeperConfig.getUrl(), zookeeperConfig.getSessionTimeout(), zookeeperConfig.getConnectionTimeout());
    }
}
```
3、org.dromara.soul.sync.data.zookeeper.ZookeeperSyncDataService 初始化，也就是soul-bootstrap启动后就会从zookeeper获取数据，同步至内存。
* watcherData()--> watcherAll() --> watcherPlugin() --> cachePluginData()。
* zkClient.subscribeDataChanges() 监听 当前节点和子节点的内容修改、删除。
```java
public class ZookeeperSyncDataService implements SyncDataService, AutoCloseable {
    private final ZkClient zkClient;
    private final PluginDataSubscriber pluginDataSubscriber;
    private final List<MetaDataSubscriber> metaDataSubscribers;
    private final List<AuthDataSubscriber> authDataSubscribers;
    /**
     * Instantiates a new Zookeeper cache manager.
     * @param zkClient             the zk client
     * @param pluginDataSubscriber the plugin data subscriber
     * @param metaDataSubscribers  the meta data subscribers
     * @param authDataSubscribers  the auth data subscribers
     */
    public ZookeeperSyncDataService(final ZkClient zkClient, final PluginDataSubscriber pluginDataSubscriber,
                                    final List<MetaDataSubscriber> metaDataSubscribers, final List<AuthDataSubscriber> authDataSubscribers) {
        this.zkClient = zkClient;
        this.pluginDataSubscriber = pluginDataSubscriber;
        this.metaDataSubscribers = metaDataSubscribers;
        this.authDataSubscribers = authDataSubscribers;
        watcherData();
        watchAppAuth();
        watchMetaData();
    }
    ......
	private void watcherData() {
	    final String pluginParent = ZkPathConstants.PLUGIN_PARENT;
	    List<String> pluginZKs = zkClientGetChildren(pluginParent);
	    for (String pluginName : pluginZKs) {
	        watcherAll(pluginName);
	    }
	    zkClient.subscribeChildChanges(pluginParent, (parentPath, currentChildren) -> {
	        if (CollectionUtils.isNotEmpty(currentChildren)) {
	            for (String pluginName : currentChildren) {
	                watcherAll(pluginName);
	            }
	        }
	    });
	}
    ......
	private void watcherPlugin(final String pluginName) {
	    String pluginPath = ZkPathConstants.buildPluginPath(pluginName);
	    if (!zkClient.exists(pluginPath)) {
	        zkClient.createPersistent(pluginPath, true);
	    }
	    cachePluginData(zkClient.readData(pluginPath));
	    subscribePluginDataChanges(pluginPath, pluginName);
	}
}
```
4、debug过程

![在这里插入图片描述](/img/shenyu/blog5/zk11.png)

###### 三、soul-bootstrap 是如何感知网关数据变化的
1、org.dromara.soul.sync.data.zookeeper.ZookeeperSyncDataService 
cacheRuleData 方法上打上断点，更新插件规则，观察是否会进入此断点。
```java
private void cacheRuleData(final RuleData ruleData) {
    Optional.ofNullable(ruleData)
            .ifPresent(data -> Optional.ofNullable(pluginDataSubscriber).ifPresent(e -> e.onRuleSubscribe(data)));
}
```
2、soul-admin后台操作更改divide插件规则，首先soul-admin会发布事件，并监听事件同步更新数据至zookeeper。

![在这里插入图片描述](/img/shenyu/blog5/zk12.png)

3、soul-bootstrap 确实收到了插件数据的更新，根据Soul官网介绍的"zookeeper 的同步原理"这里主要是依赖 zookeeper 的 watch 机制。

org.dromara.soul.sync.data.zookeeper.ZookeeperSyncDataService 类：

zkClient.subscribeDataChanges() 监听 当前节点和子节点的内容修改、删除。
```java
zkClient.subscribeChildChanges(groupParentPath, (parentPath, currentChildren) -> {
    if (CollectionUtils.isNotEmpty(currentChildren)) {
        List<String> addSubscribePath = addSubscribePath(childrenList, currentChildren);
        // Get the newly added node data and subscribe to that node
        addSubscribePath.stream().map(addPath -> {
            String realPath = buildRealPath(parentPath, addPath);
            cacheRuleData(zkClient.readData(realPath));
            return realPath;
        }).forEach(this::subscribeRuleDataChanges);
    }
});
private void subscribeRuleDataChanges(final String path) {
    zkClient.subscribeDataChanges(path, new IZkDataListener() {
        @Override
        public void handleDataChange(final String dataPath, final Object data) {
            cacheRuleData((RuleData) data);
        }
        @Override
        public void handleDataDeleted(final String dataPath) {
            unCacheRuleData(dataPath);
        }
    });
}
```

![在这里插入图片描述](/img/shenyu/blog5/zk13.png)

###### 四、总结

![在这里插入图片描述](/img/shenyu/blog5/zk14.png)

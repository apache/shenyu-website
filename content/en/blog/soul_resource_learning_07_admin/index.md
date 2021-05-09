---
title: "ShenYu Gateway Learning Admin Source Code Analysis"
author: "zenglinhui"
description: "ShenYu Gateway Learning Admin Source Code Analysis"
categories: "Soul"
tags: ["Soul"]
date: 2021-01-20
cover: "/img/architecture/soul-framework.png"
---

# 源码分析
1. **页面操作源码分析**

在分析源码之前，先看下图，页面显示加载的插件列表会对应后端的请求，根据后端请求，找到对应的controller类
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210117034006267.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
然后找到对应的方法，在上图可以看到这里是访问 plugin 中默认为空的 mapping，传入到分页相关的参数，然后去查询数据库中对应的插件记录
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210117034215738.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
数据库中对应的表为下图所示，divide 状态是启用，在上一篇中，就是用这个插件来测试网关
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210117035235400.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
同时请求的还有选择器，请求的 controller 见下图。在上篇的演示中，我们直接在页面把选择器中的条件 CRUD，可以实时反应到网关中去，而不需要重启网关，所以这里除了query方法中，增加、删除、和修改方法中,在保存到数据库之后都有一个 publishEvent 方法。就是这个事件方法，可以让用户直接在 ShenYu 后台配置规则，从而达到时时生效的目地
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210117040000892.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
```
public int createOrUpdate(final SelectorDTO selectorDTO) {
        int selectorCount;
        SelectorDO selectorDO = SelectorDO.buildSelectorDO(selectorDTO);
        List<SelectorConditionDTO> selectorConditionDTOs = selectorDTO.getSelectorConditions();
        if (StringUtils.isEmpty(selectorDTO.getId())) {
            selectorCount = selectorMapper.insertSelective(selectorDO);
            selectorConditionDTOs.forEach(selectorConditionDTO -> {
                selectorConditionDTO.setSelectorId(selectorDO.getId());
                selectorConditionMapper.insertSelective(SelectorConditionDO.buildSelectorConditionDO(selectorConditionDTO));
            });
        } else {
            selectorCount = selectorMapper.updateSelective(selectorDO);
            //delete rule condition then add
            selectorConditionMapper.deleteByQuery(new SelectorConditionQuery(selectorDO.getId()));
            selectorConditionDTOs.forEach(selectorConditionDTO -> {
                selectorConditionDTO.setSelectorId(selectorDO.getId());
                SelectorConditionDO selectorConditionDO = SelectorConditionDO.buildSelectorConditionDO(selectorConditionDTO);
                selectorConditionMapper.insertSelective(selectorConditionDO);
            });
        }
        publishEvent(selectorDO, selectorConditionDTOs);
        return selectorCount;
    }
```
2. **与soul-bootstrap 数据同步(websocket)源码分析**

之前介绍了 admin 页面操作之后把数据保存数据库，然后用了 spring 自带的响应式编程把数据同步到 bootstrap 项目，以达到动态刷新网关规则及插件，而不用添加配置后去重启网关。
当 soul-bootstrap 启动时，看日志会打出来这么一段
```
2021-01-21 00:33:39.620  INFO 14276 --- [0.0-9095-exec-5] o.d.s.a.l.websocket.WebsocketCollector   : websocket on open successful....
```
那么问题来了，它用 websocket 和谁连接了，又是怎么连接的？下面通过找到打日志的代码，再通过打断点的方式来调试一下，这里是打日志出来的地方
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210121004835890.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
先来分析一下这个代码：
- 从 websocketConfig 这个配置里面拿到配的请求地址，这个配置文件当然是在下图的这个地方配的
- 拿到这个配置地址后，创建了一个定时的线程池，线程池大小为 urls.length，线程名称前缀为"websocket-connect"的守护线程。这里为什么要创建守护线程，因为这只是为了保证 bootstrap 和 admin 的 websocket 连接不断，类似于心跳的作用，所以用守护线程是最好的
- 根据创建的 client 端，一个一个的去请求配置文件配的地址，然后打印之前所找到的日志
- 后面就启动线程去判断 client 是否关闭，如果关闭就会去重新连接(初始间隔10秒，然后每30秒去执行一次检查，所以如果你看到控制台有时会打印多个连接成功的日志，说明重连了)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210121005138940.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
- 我们再来看看在 admin 后台操作的数据是怎么同步到 bootstrap 中的呢，之前有说过，在后台保存或者更新数据之后，会调用 publishEvent 方法，这个是 spring 自带响应式编程的方法，既然是响应式，那就是基于事件的，那就得有 listener 
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210121011826544.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)

一找果不其然，上图画红框的地方是不是很眼熟，没错，监听器，和websocket相关的监听器，如果还是有点看不明白监听和之前的 publishEvent 有什么关系，那就把监听器里的代码打上断点，调试一把。我这里为了方便，就点了这个同步所有数据
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210121012123937.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
这里进的是 DataChangedEventDispatcher 这个类，调用了event 相关的方法，在左下角这个地方，是不是看到了熟悉了方法了，没错就是上面说的 publishEvent
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210121012240486.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)

- 然后会跳转到 WebsocketDataChangedListener 这个类中，这里重点看一下在调试方法中 send 方法
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021012101272614.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
- 这里通过 send 方法把更新的数据发到 bootstrap 中，到此 admin 怎么同步数据到 bootstrap 中就真相大白了
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210121013002688.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
3. **与soul-bootstrap 数据同步(zookeeper)源码分析**
话不多说，先上图，把 websocket 的配置先注释掉，打开 zookeeper 的配置，前提是把本地或者远程的 zookeeper 服务打开，然后启动 soul-admin 
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210121152407500.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
首先进入了 ZookeeperDataInit 类的 run 方法，这个方法执行完之后，奇怪的一点是跳到了 WebsocketDataChangedListener 类中去了
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210121233759520.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
这一点没弄明白，等这个类里面的 onPluginChanged 方法执行完了之后，回到了 ZookeeperDataChangedListener 类里来了
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210121234036652.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
如果不是删除的话，就会更新 zkNode 节点数据
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210121234326495.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
更新 zk 节点的方法
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210121234628900.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
而且之后的 onSelectorChanged、onMetaDataChanged 、onRuleChanged 方法都会先走 WebsocketDataChangedListener 类里面相对应的方法，然后才会进 ZookeeperDataChangedListener 类的方法。如果插件数据有更改，也是通过上面的步骤重新来一遍。
这里面同步数据会进两个 Listener 类的问题到这还没解决，突然想到在 pom 文件里面有对 websocket 的依赖，因为 application.yml 文件中已经把 websocket 这个配置注释掉了(不是把enable=false)，先把这个依赖注释掉再看，然后看着代码编译都不通过了。还有一个办法是把 websocket 改成不启用，改完重启发现不会再跳到 websocket 相关的类中了
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210122000547192.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
4. **与soul-bootstrap 数据同步(http)源码分析**

老规矩，改 yml 文件中的配置，然后找到对应的 listener 类打断点调试，这里如果是用 http 的话 websocket 相关的类还是会被访问到，所以这里一样的不能直接注释
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210122005803207.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)

下面来看看里面的代码：
这里一个构造方法，里面实例化了一个 clients 数组阻塞队列，大小为1024。一个定时任务线程池，线程数为1，名字前缀为 "long-polling" 的后台守护线程，看名字可以知道，这是用来长轮询的。一个相关的属性配置
初始化前方法里面启动了定时线程，间隔5分钟之后，每5分钟执行一次，去执行 refreshLocalCache 这个刷新本地缓存的方法
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210122004153175.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
```
    private void refreshLocalCache() {
        this.updateAppAuthCache();
        this.updatePluginCache();
        this.updateRuleCache();
        this.updateSelectorCache();
        this.updateMetaDataCache();
    }
```
如果是手动点同步数据时，会去执行下面这些相关的方法，也是通过定时线程池来执行，只不过是立即执行
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210122010007881.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
五分钟后，执行相关的刷新方法，打印的日志
```
2021-01-22 01:00:19.007  INFO 20800 --- [-long-polling-2] a.l.h.HttpLongPollingDataChangedListener : http sync strategy refresh config start.
2021-01-22 01:00:19.010  INFO 20800 --- [-long-polling-2] o.d.s.a.l.AbstractDataChangedListener    : update config cache[APP_AUTH], old: {group='APP_AUTH', md5='d751713988987e9331980363e24189ce', lastModifyTime=1611248118794}, updated: {group='APP_AUTH', md5='d751713988987e9331980363e24189ce', lastModifyTime=1611248419010}
2021-01-22 01:00:19.012  INFO 20800 --- [-long-polling-2] o.d.s.a.l.AbstractDataChangedListener    : update config cache[PLUGIN], old: {group='PLUGIN', md5='70b269257d47f0f6404ae7b7e976d8f1', lastModifyTime=1611248295740}, updated: {group='PLUGIN', md5='70b269257d47f0f6404ae7b7e976d8f1', lastModifyTime=1611248419012}
2021-01-22 01:00:19.069  INFO 20800 --- [-long-polling-2] o.d.s.a.l.AbstractDataChangedListener    : update config cache[RULE], old: {group='RULE', md5='5811b56257e31109621976d39fc226aa', lastModifyTime=1611248301607}, updated: {group='RULE', md5='5811b56257e31109621976d39fc226aa', lastModifyTime=1611248419069}
2021-01-22 01:00:19.075  INFO 20800 --- [-long-polling-2] o.d.s.a.l.AbstractDataChangedListener    : update config cache[SELECTOR], old: {group='SELECTOR', md5='70bad5ebb1cf6e3fc55278eef2df42f3', lastModifyTime=1611248299419}, updated: {group='SELECTOR', md5='70bad5ebb1cf6e3fc55278eef2df42f3', lastModifyTime=1611248419075}
2021-01-22 01:00:19.077  INFO 20800 --- [-long-polling-2] o.d.s.a.l.AbstractDataChangedListener    : update config cache[META_DATA], old: {group='META_DATA', md5='5f79d821e3b601330631a2d53294fb34', lastModifyTime=1611248302571}, updated: {group='META_DATA', md5='5f79d821e3b601330631a2d53294fb34', lastModifyTime=1611248419077}
2021-01-22 01:00:19.077  INFO 20800 --- [-long-polling-2] a.l.h.HttpLongPollingDataChangedListener : http sync strategy refresh config success.
```
5. ShenYu 中还有其它方法同步数据，这些后面有精力再分析，soul-admin 源码先分析到这，如果后续再分析的话，会另外再写一遍文章，这里就先到此为止
# 总结
soul-admin 中还有功能现在还没有使用到，还有很多好玩的东西，这篇会持续更新，到用到的时候再去具体分析里面的源码。
1. 2021-01-20分析了 soul-admin 用websocket 同步数据到 soul-bootstrap 中
2. 2021-01-21分析了 soul-admin 用 zookeeper 同步数据到 soul-bootstrap 中
3. 2021-01-21分析了 soul-admin 用 http 同步数据到 soul-bootstrap 中

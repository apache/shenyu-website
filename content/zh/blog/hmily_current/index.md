---
title: "Hmily: 轻松搞定高并发分布式事务"
author: "xiaoyu"
description: "Hmily针对高并发事务的配置优化"
categories: "hmily"
tags: ["hmily"]
date: 2018-11-14
cover: "/hmily-2.0.2.png"
---

### Hmily高并发事务处理

开始先打个小小的广告
Hmily在参开源中国年度受欢迎投票 https://www.oschina.net/project/top_cn_2018?origin=zhzd 点击链接，搜索Hmily帮忙投下票,在第11横排第二个，感谢大家！
也欢迎大家关注，或者提交pr，让Hmily变的更好，更完美。
 gitHub: [https://github.com/yu199195/hmily]
 gitee:  [https://gitee.com/shuaiqiyu/hmily]

接下来回答一下 社区的一些问题，和大家一些疑惑的地方！

### 1. Hmily的性能问题？
答：Hmily是采用AOP切面的方式与你的RPC方法绑定，无非就是在你RPC调用的时候，保存了日志（通过异步disruptor），传递了一些参数。现在confrim，cancel也都为异步的调用，因此其性能与你的rpc性能一样。记住Hmily不生产事务，Hmily只是分布式事务的搬运工。之前Hmily在AOP切面加了一把锁，导致了性能下降，也就是Spring cloud 中国社区做的那篇文章。现在已经全部修复，并且全部异步化。其实那么测试时不合理的，因为是压测的demo，都是默认的配置。下文我会讲解，怎么样才能提高Hmiy性能。

###  2. 关于RPC调用超时Hmily是怎么处理的？
答： 我们支持在分布式环境中调用一个RPC方法，如果超时了。比如dubbo设置的超时时间是100ms,可能你的方法用了140ms,但是你的方法是执行成功了的。但是对调用方来说，你是失败的。这个时候需要回滚。所以Hmily的做法是。调用者认为你是失败的，不会将加入的回滚调用链条中。因此超时的rpc接口方，进行自身的回滚。会有一个定时任务来进行回滚，因为日志状态是try阶段，会调用cancel方法进行回滚，从而到达最终一致性！

###  3.Hmily支持集群部署的问题？以及集群环境中，定时任务日志恢复的问题？
答：Hmily是和你的应用AOP切面绑定在一起的，天然支持集群。集群环境中定时恢复问题，其实几乎没有，除非你的集群同时一下挂掉，才会有这个问题。当你集群同时挂掉，在恢复的时候，日志会有一个version字段，更新成功的，才会去进行恢复。

###  4.Hmily是异步保存日志的，那么很极端情况下（代码刚好执行到这一行,然后jvm退出，断电啦什么的），日志还没保存那怎么处理呢？
答:这种想法的，肯定是没看源码，或者是看了没怎么看懂。在AOP切面中，会先进行日志的异步保存，注意状态是PRE_TRY。在try执行完成后，更新为try。就算存在可能你说的什么断电，什么你在打断电调试，然后kill服务之类的。（Mysql我都可以让他事务失效，你信不信？）我只能说，不要花大力气去解决那些偶然的事情，最好的解决办法是不解决它。
Hmily针对高并发时候的参数配置调优。
可能这部门内容针对熟悉Hmily的人来说，不熟悉的也没关系。直接上github上看相关文档就好。
hmily支持Spring bean xml 方式的配置，同时也支持spring boot start yml方式的配置。
```xml
 <bean id="hmilyTransactionBootstrap" class="com.hmily.tcc.core.bootstrap.HmilyTransactionBootstrap">
        <property name="serializer" value="kryo"/>
        <property name="recoverDelayTime" value="120"/>
        <property name="retryMax" value="3"/>
        <property name="loadFactor" value="2"/>
        <property name="scheduledDelay" value="120"/>
        <property name="scheduledThreadMax" value="4"/>
        <property name="bufferSize" value="4096"/>
        <property name="consumerThreads" value="32"/>
        <property name="started" value="false"/>
        <property name="asyncThreads" value="32"/>
        <property name="repositorySupport" value="db"/>
        <property name="tccDbConfig">
            <bean class="com.hmily.tcc.common.config.TccDbConfig">
                <property name="url"
                          value="jdbc:mysql://192.168.1.98:3306/tcc?useUnicode=true&amp;characterEncoding=utf8"/>
                <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </bean>
        </property>
    </bean>
  ```  
* serializer :这里我推荐使用是kroy。当然hmily也支持hessian,protostuff,jdk。在我们测试中表现为: 
               kroy>hessian>protostuff>jdk

* recoverDelayTime :定时任务延迟时间（单位是秒，默认120。这个参数只是要大于你的rpc调用的超时时间设置。

* retryMax : 最大重复次数，默认3次。当你的服务down机，定时任务会执行retryMax次数去执行你的cancel还是confrim。

* bufferSize: disruptor的bufferSize,当高并发的时候，可以调大。注意是 2n次方

* consumerThreads distuptor消费线程数量,高并发的时候，可以调大。

* started: 注意在是发起方的时候，把此属性设置为true。参与方为false。

* asyncThreads 异步执行confirm和cancel线程池线程的大小，高并发的时候请调大

* 接下来是最重要的事务日志的存储 在我们的压测中，推荐使用mongo。表现为 mongodb>redis集群>mysql>zookeeper

* 如果你采用mongodb存储日志,配置如下(url可以配置成mongdb集群的url)
```xml
       <property name="repositorySupport" value="mongodb"/>
        <property name="tccMongoConfig">
            <bean class="com.hmily.tcc.common.config.TccMongoConfig">
                <property name="mongoDbUrl"  value="192.168.1.68:27017"/>
                <property name="mongoDbName" value="happylife"/>
                <property name="mongoUserName" value="xiaoyu"/>
                <property name="mongoUserPwd" value="123456"/>
            </bean>
        </property>
 ```    

* 如果你采用redis存储日志,配置如下：

  * redis单节点
    
```xml
   <property name="repositorySupport" value="redis" />
    <property name="tccRedisConfig">
        <bean class="com.hmily.tcc.common.config.TccRedisConfig">
            <property name="hostName"
                      value="192.168.1.68"/>
            <property name="port" value="6379"/>
            <property name="password" value=""/>
        </bean>
    </property>
```

* redis哨兵模式集群:

   ```xml
   <property name="repositorySupport" value="redis"/>
    <property name="tccRedisConfig">
        <bean class="com.hmily.tcc.common.config.TccRedisConfig">
            <property name="masterName" value="aaa"/>
            <property name="sentinel" value="true"/>
            <property name="sentinelUrl" value="192.168.1.91:26379;192.168.1.92:26379;192.168.1.93:26379"/>
            <property name="password" value="123456"/>
        </bean>
    </property>
    ```
* redis集群:

   ```xml
   <property name="repositorySupport" value="redis"/>
    <property name="tccRedisConfig">
        <bean class="com.hmily.tcc.common.config.TccRedisConfig">
            <property name="cluster" value="true"/>
            <property name="clusterUrl" value="192.168.1.91:26379;192.168.1.92:26379;192.168.1.93:26379"/>
            <property name="password" value="123456"/>
        </bean>
    </property>
    ```
* 如果你采用zookeeper存储日志,配置如下：
       ```xml
        <property name="repositorySupport" value="zookeeper"/>
        <property name="tccZookeeperConfig">
            <bean class="om.hmily.tcc.common.config.TccZookeeperConfig">
                <property name="host"  value="192.168.1.73:2181"/>
                <property name="sessionTimeOut" value="100000"/>
                <property name="rootPath" value="/tcc"/>
            </bean>
        </property>
       ``` 
* 数据库的配置在上面已经有了，使用file方式的存储我就不介绍了.
* 以上就是今天分享的内容，一个注解，几行配置轻轻松松搞定高并发分布式事务！

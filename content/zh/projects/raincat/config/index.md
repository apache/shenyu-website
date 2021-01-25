---
title: TxTransactionBootstrap配置详解
keywords: configuration
description:  TxTransactionBootstrap配置详解
---




###  @TxTransaction annotation详解

*   该注解为分布式事务的切面（AOP point），如果业务方的service服务需要参与分布式事务，则需要加上此注解。


###  TxTransactionBootstrap 详解：

```xml
<context:component-scan base-package="org.dromara.raincat.*"/>
<aop:aspectj-autoproxy expose-proxy="true"/>
<bean id="txTransactionBootstrap" class="org.dromara.raincat.core.bootstrap.TxTransactionBootstrap">
    <property name="txManagerUrl" value="http://localhost:8761"/>
    <property name="serializer" value="kryo"/>
    <property name="nettySerializer" value="kryo"/>
    <property name="bufferSize" value="4096"/>
    <property name="nettyThreadMax" value="16"/>
    <property name="refreshInterval" value="30"/>
    <property name="delayTime" value="30"/>
    <property name="heartTime" value="10"/>
    <property name="compensation" value="true"/>
    <property name="recoverDelayTime" value="60"/>
    <property name="retryMax" value="3"/>
    <property name="compensationRecoverTime" value="60"/>
    <property name="compensationCacheType" value="db"/>
    <property name="txDbConfig">
        <bean class="org.dromara.raincat.common.config.TxDbConfig">
            <property name="url"
                      value="jdbc:mysql://192.168.1.98:3306/tx?useUnicode=true&amp;characterEncoding=utf8"/>
            <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
            <property name="username" value="root"/>
            <property name="password" value="123456"/>
        </bean>
    </property>
</bean>
```  

* txManagerUrl：填写你启动的txManager的ip端口，注意添加http://前缀。

* serializer :事务日志序列化方式，这里我推荐使用是kroy。当然也支持hessian,protostuff,jdk。在我们测试中表现为: 
               kroy>hessian>protostuff>jdk。

* nettySerializer： 与txManager通信对象的序列化方法，注意与txManager中的序列化方式配置一样。

* bufferSize: disruptor的bufferSize,当高并发的时候，可以调大。注意是 2n次方。

* nettyThreadMax ： netty客户端工作线程数量。

* refreshInterval: 拉取txmanager配置信息间隔时间，单位秒。

* delayTime ： 客户端与txmanager通信最大延迟时间。

* heartTime ： 与txmanager保持心跳时间间隔，单位秒。

* compensation： 是否需要补偿，一般情况下不需要，极端情况下设置为true。

    * recoverDelayTime：事务恢复延迟时间，只有当 compensation：为ture才有用。

    * compensationRecoverTime： 补偿间隔时间 只有当 compensation：为ture才有用。

    * retryMax ： 事务补偿最大重试次数。


* compensationCacheType：使用何种方式存储日志，支持的有db，redis，mongo，zookeeper等。

* 接下来是最重要的事务日志的存储 在我们的压测中，推荐使用mongo。表现为 mongodb>redis集群>mysql>zookeeper

* 如果你采用mongodb存储日志,配置如下(url可以配置成mongdb集群的url)

```xml
<property name="compensationCacheType" value="mongodb"/>
<property name="txMongoConfig">
    <bean class="org.dromara.raincat.common.config.TxMongoConfig">
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
    <property name="compensationCacheType" value="redis" />
    <property name="txRedisConfig">
        <bean class="org.dromara.raincat.common.config.TxRedisConfig">
            <property name="hostName"
                      value="192.168.1.68"/>
            <property name="port" value="6379"/>
            <property name="password" value=""/>
        </bean>
    </property>
    ```

    * redis哨兵模式集群:

   ```xml
   <property name="compensationCacheType" value="redis"/>
    <property name="txRedisConfig">
        <bean class="org.dromara.hmily.common.config.TxRedisConfig">
            <property name="masterName" value="aaa"/>
            <property name="sentinel" value="true"/>
            <property name="sentinelUrl" value="192.168.1.91:26379;192.168.1.92:26379;192.168.1.93:26379"/>
            <property name="password" value="123456"/>
        </bean>
    </property>
    ```
    * redis集群:

    ```xml
    <property name="compensationCacheType" value="redis"/>
    <property name="txRedisConfig">
        <bean class="org.dromara.hmily.common.config.TxRedisConfig">
            <property name="cluster" value="true"/>
            <property name="clusterUrl" value="192.168.1.91:26379;192.168.1.92:26379;192.168.1.93:26379"/>
            <property name="password" value="123456"/>
        </bean>
    </property>
    ```

* 如果你采用zookeeper存储日志,配置如下：

    ```xml
    <property name="compensationCacheType" value="zookeeper"/>
    <property name="txZookeeperConfig">
        <bean class="org.dromara.hmily.common.config.TxZookeeperConfig">
            <property name="host"  value="192.168.1.73:2181"/>
            <property name="sessionTimeOut" value="100000"/>
            <property name="rootPath" value="/tcc"/>
        </bean>
    </property>
    ``` 

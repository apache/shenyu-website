---
title: TxTransactionBootstrap Configuration
keywords: configuration
description:  TxTransactionBootstrap Configuration
---



###  @TxTransaction annotation 

*   This annotation is the aspect of distributed transaction, it need to be added when the business side need distributed transaction.


###  TxTransactionBootstrap Configuration：

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

* `txManagerUrl` is the ip and port of the` txManager`, and  please add the `http:// prefix` at head.

* `serializer` is the way of transaction log serialization, which `Kroy` is recommended, and `Hessian`, `Protostuff`, `Jdk` are also supported. In our performance test, it is shown as: `Kroy`>`Hessian`>`Protostuff`>`Jdk`.
           
* `nettySerializer` is the serialization way of communicating with `txManager`, and it need to be the same as the serialization way configured in `txManager`. 

* `bufferSize` is the  bufferSize of disruptor and can be adjusted larger when the concurrency at a high level. Note that it should be `2n` power. 

* `nettyThreadMax` is the number of Netty client work thread.

* `refreshInterval` is the interval of pulling `txmanager` configuration, and the unit is seconds.

* `delayTime` is the maximum communication delay time between the client and `txmanager`.

* `heartTime` is the heartbeat interval with `txmanager`, and the unit is seconds.

* `compensation`  is a boolean value to configure whether the compensation is required, most of time it is not required, you can set `true ` in some cases.
* `recoverDelayTime` is the transaction recovery delay time which is only useful when `compensation: true`. 
    
* `compensationRecoverTime` is the compensation interval which is only useful when `compensation: true`.
    
* `retryMax` is the maximum number of retry times for transaction compensation.


* `compensationCacheType` is a property of how to store logs, supporting DB, Redis, Mongodb, Zookeeper, etc.

* Mongodb is recommended to store the most important transaction log. In our stress test, it appears as Mongodb>Redis cluster>Mysql>Zookeeper.

* If you use Mongodb to store logs, the configuration is as follows (URL can be configured the same as the Mongdb cluster's).

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

* If you use Redis to store logs, the configuration is as follows:

  * Redis single node:

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

  * Redis sentinel:

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

    * Redis cluster:

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

* If you use zookeeper to store logs, the configuration is as follows.

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

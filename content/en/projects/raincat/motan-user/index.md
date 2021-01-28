---
title: Motan user guide
keywords: motan
description: motan user  guide
---



### Firstly, you should bootstrap `raincat-manager`, please refer to how to [bootstrap Txmanager](start-manager.md) for details. Then, please add following dependency in maven at your service, and add `@TxTransaction` annotation in your distributed transaction method.

```xml
       <dependency>
           <groupId>org.dromara</groupId>
           <artifactId>raincat-motan</artifactId>
           <version>2.0.0-RELEASE</version>
       </dependency>
```

# Configure `TxTransactionBootstrap` by Spring XML
```xml
    <context:component-scan base-package="org.dromara.*"/>
    <aop:aspectj-autoproxy expose-proxy="true"/>
    <bean id="txTransactionBootstrap" class="org.dromara.raincat.core.bootstrap.TxTransactionBootstrap">
        <property name="txManagerUrl" value="http://localhost:8761"/>
        <property name="serializer" value="kryo"/>
        <property name="nettySerializer" value="kryo"/>
        <property name="compensation" value="true"/>
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

# Configure `TxTransactionBootstrap` by Spring boot starter

* Firstly, please add maven dependency `raincat-spring-boot-starter-motan`.
```xml
 <dependency>
     <groupId>org.dromara</groupId>
     <artifactId>raincat-spring-boot-starter-motan</artifactId>
     <version>2.0.0-RELEASE</version>
 </dependency>
```

* Secondly, please configure the `application.yml` like follows.

```yml
org:
   dromara:
     raincat:
       txManagerUrl: http://localhost:8761
       serializer: kroy
       nettySerializer: kroy
       compensation: true
       compensationCacheType : db
       txDbConfig :
              driverClassName  : com.mysql.jdbc.Driver
              url :  jdbc:mysql://192.168.1.98:3306/tx?useUnicode=true&amp;characterEncoding=utf8
              username : root
              password : 123456
```

* `txManagerUrl` is the ip and port that you bootstrap `txManager` . Please add `http://` at head.
* `serializer` is the way of transaction log serialization.
* `nettySerializer` is the serialization way of how to communicate with `txManager`. Please be caution that It should be consistent with the configuration in `txManager`.

* `compensation` is the property whether compensation is required or not, the service will compensate itself in some cases.
* `compensationCacheType` is the storage types of log, support Redis, Mongodb, Zookeeper, etc. For details, please refer to the [config](config.md).

**NOTICE**: You need to open AOP when you want to use XML to configure.





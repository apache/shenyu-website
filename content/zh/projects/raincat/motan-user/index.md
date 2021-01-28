---
title: motan用户指南
keywords: motan
description:  motan用户指南
---



### 首先启动raincat-manager，具体怎么启动参考 [启动manager](../raincat-manager-starter)

### jar包依赖，在你的服务端添加jar包，并在需要参与分布式事务的方法上添加 @TxTransaction注解

```java
       <dependency>
           <groupId>org.dromara</groupId>
           <artifactId>raincat-motan</artifactId>
           <version>2.0.0-RELEASE</version>
       </dependency>
```

# Spring XML方式配置 TxTransactionBootstrap
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

# Spring boot start方式配置 TxTransactionBootstrap

* 首先依赖raincat 提供的spring-boot-starter-springcloud
```xml
 <dependency>
     <groupId>org.dromara</groupId>
     <artifactId>raincat-spring-boot-starter-motan</artifactId>
     <version>2.0.0-RELEASE</version>
 </dependency>
```

* 配置 application.yml

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

* txManagerUrl：填写你启动的txManager的ip端口，注意添加http://

* serializer： 是指事务日志的序列化方式

* nettySerializer： 与txManager通信对象的序列化方法，注意与txManager中的序列化方式配置一样。

* compensation ：是否需要补偿，极端情况下，服务自身会进行补偿。

* compensationCacheType： 存储日志类型，当然还有支持redis，mongo，zookeeper等等，具体可以参考 [配置详解](../config)。

### 配置扫描raincat包，与开启AOP代理（XML方式配置的时候必须加上，starter方式不需要）。



---
title: springcloud快速体验
keywords: springcloud
description: springcloud快速体验
---


### 环境准备

  *   #### JDK 1.8+

  *   #### Maven 3.2.x

  *   #### Git

  *   ### redis

  *   ### mysql


### 代码拉取

 ```
   > git clone https://github.com/yu199195/Raincat.git

   > cd Raincat

   > mvn -DskipTests clean install -U
   ```

### 执行demo 模块的sql语句。

   [sql语句] (https://github.com/yu199195/Raincat/blob/master/raincat-sample/raincat-springcloud-sample/sql/springcloud-sample.sql) 


### 使用你的工具 idea 或者eclipse 打开项目。  


### 修改raincat-manager项目下，application.yml中的redis配置

```yml
tx:
  manager:
    netty :
       port: 9998
       serialize: kryo
       maxConnection: 100
       maxThreads : 16
       delayTime : 5
       heartTime : 20
    redis :
       cluster : false
       hostName : 192.168.1.91
       port: 6379
       password : foobaredbbexONE123
```

### 启动raincat-manager （执行TxManagerApplication中的main方法）


### 修改alipay项目的application.yml中的数据库配置

```yml
spring:
    datasource:
        driver-class-name:  com.mysql.jdbc.Driver
        url: jdbc:mysql://192.168.1.98:3306/alipay?useUnicode=true&characterEncoding=utf8
        username: root
        password: 123456
    application:
      name: alipay-service
```
* 修改 applicationContext.xml中的数据库配置

```xml
 <bean id="txTransactionBootstrap" class="org.dromara.raincat.core.bootstrap.TxTransactionBootstrap">
        <property name="txManagerUrl" value="http://127.0.0.1:8761"/>
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

* 启动Alipay项目。（执行AliPayApplication中的main方法）


### 其他项目类似，启动wechat项目，启动pay项目。 

###  访问 http://127.0.0.1:8881/swagger-ui.html

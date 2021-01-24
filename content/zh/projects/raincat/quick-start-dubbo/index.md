---
title: dubbo 快速体验
keywords: dubbo
description:  dubbo快速体验
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

   [sql语句](https://github.com/yu199195/Raincat/tree/master/raincat-sample/raincat-dubbo-sample/sql) 


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


###  修改order项目的application.yml中的数据库配置

```yml
spring:
    datasource:
        driver-class-name:  com.mysql.jdbc.Driver
        url: jdbc:mysql://192.168.1.98:3306/order?useUnicode=true&characterEncoding=utf8
        username: root
        password: 123456
    application:
      name: order-service
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
* 修改 spring-dubbo.xml中的zookeeper配置

```xml
    <dubbo:registry protocol="zookeeper" address="localhost:2181"/>
```

* 在spring-dubbo中修改你的zookeeper地址

 ```xml
  <dubbo:registry protocol="zookeeper" address="192.168.1.148:2181"/>
```

* 启动order项目。（执行OrderApplication中的main方法）


### 其他项目类似，启动stock项目，启动consume项目。 

###  访问 http://127.0.0.1:8087/swagger-ui.html
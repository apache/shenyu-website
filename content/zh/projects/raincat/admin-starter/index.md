 ---
title: 启动raincat-admin
keywords: raincat-admin
description:  启动raincat-admin
---



# raincat-admin 启动教程
* 启动前提：分布式事务项目已经部署并且运行起来，用户根据自己的RPC框架进行使用
* [dubbo 用户](https://github.com/yu199195/Raincat/wiki/dubbo%E7%94%A8%E6%88%B7%E6%8C%87%E5%8D%97)
* [springcloud 用户](https://github.com/yu199195/Raincat/wiki/springcloud%E7%94%A8%E6%88%B7%E6%8C%87%E5%8D%97)


# 启动方式一：自己打包进行部署。

* 首先用户使用的JDK必须是1.8+  本地安装了git ,maven ，执行以下命令

```
git clone https://github.com/yu199195/Raincat.git

maven clean install
```

* 使用你的开发工具打开项目，比如idea Eclipse

### 修改application.yml

```yml

server:
   port: 8888
   context-path: /admin

spring:
   application:
      name: raincat-admin
   profiles:
     active: db

tx:
  admin :
    userName : admin
    password : admin
  redis:
    hostName: localhost
    port : 6379
    #password:
    cluster : false
      # nodes: 127.0.0.1:70001;127.0.1:7002
      # redirects: 20
```

* userName，password 是你登录的用户名与密码。

* reids配置为你的txManager的redis配置。

* spring.profiles.active 是你激活的方式，意思就是你采用什么方式来存储日志的，就激活什么方式，然后修改对应的yml。比如这里使用的db那么我们找到application-db.yml

```yml
recover:
   application:
      list : alipay-service,wechat-service,pay-service
   serializer :
      support: kryo
   retry :
      max: 10
   db:
      driver :  com.mysql.jdbc.Driver
      url: jdbc:mysql://localhost:3306/tx?useUnicode=true&amp;characterEncoding=utf8
      username: root
      password: 123456
```
* application.list是指你微服务的applicationName，用逗号分隔。

* serializer : 事务日志的序列化方式

* retry.max ： 最大重试次数。


### 修改index.html

```html
<!--href 修改成你的ip 端口-->
<a id="serverIpAddress" style="display: none" href="http://192.168.1.132:8888/admin">
```

### 运行 AdminApplication 中的main方法。


### 在浏览器访问  http://ip:port/admin  ,输入用户名，密码登录。



# 启动方式二：从maven中心仓库获取adminjar包 .

```xml
<dependency>
     <groupId>org.dromara</groupId>
     <artifactId>raincat-admin</artifactId>
     <version>2.0.0-RELEASE</version>
 </dependency>

```

* 创建config文件夹，创建application.yml等，然后修改启动。




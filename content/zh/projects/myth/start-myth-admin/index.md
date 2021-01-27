---
title: Myth-admin 启动教程
description: Myth-admin startup tutorial
---

启动前提：分布式事务项目已经部署并且运行起来，用户根据自己的RPC框架进行使用

* 首先用户使用的JDK必须是1.8+  本地安装了git ,maven ，执行以下命令

```
git clone https://github.com/yu199195/myth.git

maven clean install
```

* 使用你的开发工具打开项目，比如idea Eclipse

### 步骤一：
* 修改  myth-admin项目中的application.properties文件

```java
server.port=8888
server.context-path=/myth-admin
server.address=0.0.0.0
spring.application.name=myth-admin


#激活方式 指的是存储事务日志采取的方式 同业务模块一样
spring.profiles.active=db


# myth 管理后台用户名
myth.admin.userName=admin

# myth 管理后台密码
myth.admin.password=admin


# 各项目的事务日志存储路径的后缀，这里一定需要指定
myth.repository.suffix.list=account-service,inventory-service,order-service


# 各项目支持的序列化方式 每个项目需要配置成一样的
myth.serializer.support=kryo

myth.retry.max=10

#dbSuport
myth.db.driver=com.mysql.jdbc.Driver
myth.db.url=jdbc:mysql://192.168.1.68:3306/myth?useUnicode=true&amp;characterEncoding=utf8
myth.db.username=xiaoyu
myth.db.password=Wgj@555888

#redis
myth.redis.cluster=false
myth.redis.hostName=192.168.1.68
myth.redis.port=6379
myth.redis.password=
#myth.redis.clusterUrl=127.0.0.1:70001;127.0.1:7002

#mongo
myth.mongo.url=192.168.1.68:27017
myth.mongo.dbName=happylife
#myth.mongo.userName=xiaoyu
myth.mongo.password=123456

#zookeeper
myth.zookeeper.host=192.168.1.116:2181
myth.zookeeper.sessionTimeOut=200000
```


## 配置解释

* 关于 myth.repository.suffix.list配置：这里需要配置每个参与myth分布式事务的系统模块的资源后缀，多个模块用 "," 分隔，这里必须要配置。

* 关于 myth.serializer.support 配置，这里是指参与Tcc分布式事务系统中，配置事务补偿信息的序列化方式。

* 关于 spring.profiles.active 配置 admin项目激活的类型，支持db，file，mongo，zookeeper，
  这里是指参与Myth分布式事务系统中，配置事务补偿信息存储方式，如果您用db存储，那这里就配置成db，同时配置好db等信息。 其他方式同理。 注意，每个模块请使用相同的序列化方式和存储类型

* 关于 myth.admin 等配置。 这里就是管理后台登录的用户与密码，用户可以进行自定义更改。


### 步骤二：修改本项目static 文件夹下的 index.html

```html
<!--href 修改成你的ip 端口-->
<a id="serverIpAddress" style="display: none" href="http://localhost:8888/admin">
```

### 步骤三: 运行 MythAdminApplication 中的main方法。

### 步骤四:在浏览器访问  http://ip:port/myth-admin/index.html  ,输入用户名，密码登录。

__如有任何问题欢迎加入QQ群：162614487 进行讨论__

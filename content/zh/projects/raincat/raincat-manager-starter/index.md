---
title: 启动raincat-manager
keywords: raincat-manager
description:  启动raincat-manager
---


# 启动raincat-manager

### 方式一：自己拉取代码编译：https://github.com/yu199195/Raincat

* 修改application.yml 中的redis配置

```yml
transactionWaitMaxTime: 500
redisSaveMaxTime: 3000
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

* transactionWaitMaxTime 事务最大等待时间

* redisSaveMaxTime redis存储最大等待时间

* tx:manager:netty 解释
   
   * port 是只netty长连接的netty端口（可以自行修改）

   * serialize netty自定义序列化协议（推荐使用kroy这个要与客户端的序列化协议对应）

   * maxConnection 最大长连接数量

   * maxThreads netty work线程数量

   * heartTime 心跳时间（单位秒）

### 启动方式二：直接从maven中央仓库获取raincat-manager jar包。

   * 建立config目录，新增applicationyml配置文件并修改。覆盖jar包里面的applicationyml。具体的请参考springboot配置文件读取顺序。






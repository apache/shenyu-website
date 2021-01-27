---
title: Bootstrap raincat-manager
keywords: raincat-manager
description: Bootstrap raincat-manager
---

# Bootstrap raincat-manager

## Bootstrap method 

### Method 1: Pull the code from github and compile it by yourself: https://github.com/yu199195/Raincat

* Modify the Redis configuration in `application.yml`.

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

* `transactionWaitMaxTime` is the transaction maximum waiting time.

* `redisSaveMaxTime` is the Redis maximum waiting time.

* `tx:manager:netty`
  * `port` is the Netty port for long connections which you can modify by yourself.
   
* `serialize`  is the Netty serialization protocol (Kroy in recommended), and it should be consistent with the serialization protocol at client.
   
* `maxConnection` is the maximum number of long connections.
   
* `maxThreads` is the number of Netty worker thread.
   
* `heartTime`  is the heartbeat interval (seconds).

### Method 2: Obtain the `raincat-manager` jar from the maven central warehouse.

   *  Please create a `config` directory, and configure `application.yml  `. Then modify the `yml ` file and start up the application. If you want to know more details, please refer to the springboot configuration file.






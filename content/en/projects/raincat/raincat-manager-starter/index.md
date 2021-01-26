| title                     | keywords        | description               |
| ------------------------- | --------------- | ------------------------- |
| Bootstrap raincat-manager | raincat-manager | Bootstrap raincat-manager |

# Raincat manager starter

There are two kinds of way to bootstrap the raincat-manager.

1. Pull the code and compile it yourself: https://github.com/yu199195/Raincat 

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

- `transactionWaitMaxTime` Transaction maximum waiting time.
- `redisSaveMaxTime` Redis maximum waiting time.
- `tx:manager:netty`
  - `port` is the Netty port for long connections which you can modify by yourself.
  - `serialize`  is the Netty serialization protocol (Kroy in recommended), and it should be consistent with the serialization protocol at client.
  - `maxConnection` Maximum number of long connections.
  - `maxThreads netty work` is the number of threads. 
  - `heartTime` is the Heartbeat time (seconds).

2. You can also obtain the `raincat-manager` jar directly from the maven central warehouse, then create a `config` directory, and configure `application.yml  `. Please refer to the springboot configuration file for details. 


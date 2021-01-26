| title             | keywords | description       |
| ----------------- | -------- | ----------------- |
| dubbo quick start | dubbo    | Dubbo quick start |

# Dubbo quick start

## Environment 

* **JDK1.8**

- **Maven 3.2.x**
- **Git**
- **Redis**
- **Mysql**

## Pull the code

```shell
> git clone https://github.com/yu199195/Raincat.git

  > cd Raincat

  > mvn -DskipTests clean install -U
```

## Prepare the database

Execute the SQL statement in demo.

[SQL statement](https://github.com/yu199195/Raincat/tree/master/raincat-sample/raincat-dubbo-sample/sql)

## Configuration

* Please open the project in IDEA or Eclipse, and modify the Redis configuration in `application.yml`.

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

Then, bootstrap the `raincat-manager` by executing the `main()` in `TxManagerApplication`. 

* Modify the database configuration in `application.yml`.

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

* Modify the Zookeeper configuration in `spring-dubbo.xml`.

```xml
    <dubbo:registry protocol="zookeeper" address="localhost:2181"/>

```

* Modify the Zookeeper configuration in `spring-dubbo.xml`.

```xml
 <dubbo:registry protocol="zookeeper" address="192.168.1.148:2181"/>
```

* Start the order project. (Execute the `main`method in `OrderApplication`) 

* Bootstrap the stock project and consume project like others. Please access the following address.[http://127.0.0.1:8087/swagger-ui.html](http://127.0.0.1:8087/swagger-ui.html).


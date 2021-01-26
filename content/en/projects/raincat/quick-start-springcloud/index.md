| title                   | keywords    | description             |
| ----------------------- | ----------- | ----------------------- |
| springcloud quick start | springcloud | springcloud quick start |

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

* Modify the database configuration in `applicationContext.xml`.

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

* Bootstrap the Alipay project by executing the `main` method in `AliPayApplication`.

* Bootstrap the `wechat` project and `pay` project like others. Please access the following address.[http://127.0.0.1:8087/swagger-ui.html](http://127.0.0.1:8087/swagger-ui.html).
# Configuration

## TxManager configuration

* `application.properties ` is the configuration file that can be used to configure the http port of `tmManager`, Redis and Netty related configuration. Notice:  Due to `tmManage ` register itself, the port of http(`server.port`) should be consistent with Eureka port.

```java
server.port=8761   // port of txManager
tx.manager.netty.port=9998  //Tcp port exposed to business part
tx.manager.netty.serialize=kryo  //Serialization of Netty, need to be consistent with business part.
```

* The `bootstrap.yml` is mainly configure the properities of Eureka, like `renew` time, registed address.

* Deploy cluster configuration
  * The `server.port` can be modified in `application.properities`, such as  the first node is ` server.port=8761 tx.manager.netty.port=9998`, the second node is `server.port=8762 tx.manager.netty.port=9999`.
  * The `eureka:client:serviceUrl:defaultZone: ` can be modified  in `boostrap.yml`, and then bootstrap the following nodes `http://localhost:8761/eureka/`and `http://localhost:8762/eureka/ `.

## Business side configuration：

`@TxTransaction` is an an annotation of distributed transaction aspect(AOP), and need to be added when the business side's service handle distributed transactions.

* `applicationContext.xml ` configuration:

```xml
<!-- Aspect AOP configuration, whether use AOP or not-->
   <aop:aspectj-autoproxy expose-proxy="true"/>
   <!--Package used for scanning distributed transactions-->
   <context:component-scan base-package="com.raincat.*"/>
   <!--Bootstrap configuration-->
   <bean id="txTransactionBootstrap" class="com.raincat.core.bootstrap.TxTransactionBootstrap">
       <property name="txManagerUrl" value="http://192.168.1.66:8761"/>
       <property name="serializer" value="kryo"/>
       <property name="nettySerializer" value="kryo"/>
       <property name="blockingQueueType" value="Linked"/>
       <property name="compensation" value="true"/>
       <property name="compensationCacheType" value="db"/>
       <property name="txDbConfig">
           <bean class="com.raincat.common.config.TxDbConfig">
               <property name="url"
                         value="jdbc:mysql://192.168.1.78:3306/order?useUnicode=true&amp;characterEncoding=utf8"/>
               <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
               <property name="password" value="password"/>
               <property name="username" value="xiaoyu"/>
           </bean>
       </property>
   </bean>

```

* `TxTransactionBootstrap` configuration:

```xml
<!-- Configure the IP:PORT of http request in TxManager, and this file
  need to be changed when TxManager configuration need change. -->
   <property name="txManagerUrl" value="http://192.168.1.66:8761"/>

   <!-- Serilization way used in communicating with txManager, spi expansion support kroy，hessian and protostuff, which kroy is recommended. -->
   <property name="nettySerializer" value="kryo"/>

   <!-- The type of queue in thread pool, spi expansion support Linked, Array, Synchronous. -->
   <property name="blockingQueueType" value="Linked"/>

   <!-- The rejection strategy in thread pool, spi expansion support Abort, Blocking, CallerRuns, Discarded, Rejected.-->
   <property name="rejectPolicy" value="Abort"/>

   <!-- Use local compensation, default is opened-->
   <property name="compensation" value="true"/>  
   <!-- Local serilization way and support spi expansion such as java, kroy, hessian, protostuff.(kyro is recommended) -->
   <property name="serializer" value="kryo"/>
```

* Local data storage configuration and detailed explanation are as follows. (spi extension supports DB, Redis, Zookeeper, Mongodb, File), please refer to the sample project configuration for details.

  1. The local data storage can be database, which is able to support Mysql, Oracle and sqlServer. When the mode is cluster, the database can create the table automatically,  and the table name is the ` tx_transaction_{module name}`. Every module should be configured the same compensation way. Please use one database if you use DB to storage data.

  ```xml
   <!-- compensation type -->
          <property name="compensationCacheType" value="db"/>
          <property name="txDbConfig">
              <bean class="com.raincat.common.config.TxDbConfig">
                  <!-- Url of DB -->
                  <property name="url"
                            value="jdbc:mysql://192.168.1.78:3306/order?useUnicode=true&amp;characterEncoding=utf8"/>
                  <!-- Name of DB driver -->          
                  <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
                  <property name="password" value="1234567"/>
                  <property name="username" value="xiaoyu"/>
              </bean>
          </property>
  
  ```

  2. The local data storage can be Redis, which is recommended when the business mode is cluster.  Please refer to ` com.happylifeplat.transaction.core.config.TxRedisConfig` for more information.

  ```xml
  <!-- The compensation type is Redis -->
       <property name="compensationCacheType" value="redis"/>
       <property name="txRedisConfig">
          <bean class="com.raincat.common.config.TxRedisConfig">
            <!--redis host-->
            <property name="hostName"  value="192.168.1.78"/>
            <!--redis port-->
            <property name="port" value="6379"/>
            <!-- Configure the Redis password if necessary.-->
            <property name="password" value=""/>    
         </bean>
      </property>
  ```

  3. The local data storage can be Zookeeper, which is recommended when the business mode is cluster.  

  ```xml
  <!-- The compensation type is Zookeeper -->
        <property name="compensationCacheType" value="zookeeper"/>
        <property name="txZookeeperConfig">
            <bean class="com.raincat.common.config.TxZookeeperConfig">
                <!-- zookeeper host：port -->
                <property name="host"  value="192.168.1.66:2181"/>
                <!-- zookeeper session time out duration -->
                <property name="sessionTimeOut" value="2000"/>
                <!--zookeeper root path ->
                <property name="rootPath" value="/tx"/>
            </bean>
        </property>
  ```

  4. The local data storage can be Mongodb, which can be adopted when the business mode is single node. The set will be created automatically, which named `tx_transaction_{module name}`. Mongodb connection  is adopted by `Sha1` recommended in version 3.4.0, ranther than `CR` mode. By the way, you should open the anthorization of Mongodb.

  ```xml
  <!-- The compensation type is Mongodb-->
          <property name="compensationCacheType" value="mongodb"/>
           <property name="txMongoConfig">
              <bean class="com.raincat.common.config.TxMongoConfig">
                  <!-- The URL of Mongodb -->
                  <property name="mongoDbUrl"  value="192.168.1.78:27017"/>
                  <!-- The DB name of Mongodb-->
                  <property name="mongoDbName" value="happylife"/>
                  <!-- The user name of Mongodb-->
                  <property name="mongoUserName" value="xiaoyu"/>
                  <!-- The password of Mongodb -->
                  <property name="mongoUserPwd" value="123456"/>
              </bean>
          </property>
  ```

  5. The local data storage can be File, which can be adopted when the business mode is single node. The file name should be `TX_{prefix configuration}_{module name}`.

     ```xml
     <!-- The compensation type is file -->
           <property name="compensationCacheType" value="file"/>
           <property name="txFileConfig">
                  <bean class="com.raincat.common.config.TxFileConfig">
                      <!-- Specify the file name if necessary, default is current path. -->
                      <property name="path"  value=""/>
                      <!-- Specify the file prefix, generate the file name. -->
                      <property name="prefix" value="consume"/>
                  </bean>
            </property>
     ```

     


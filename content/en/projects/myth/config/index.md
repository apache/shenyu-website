* ### @Myth

   *  #####  source code parsing for annotation

```java
/**
 * Myth is the annotation of distributed transaction framework. 
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface Myth {


    /**
     * The destination name for this listener, resolved through the container-wide
     */
    String destination();


    /**
     * Target interface class
     * If you are a SpringCloud user, you need to specify the target interface service.
     * (Since SpringCloud is an HTTP request that cannot be invoked through reflection serialization, this property is added.)
     * If you are a Dubbo user, you do not need to specify it.
     * If you are a Motan user, you do not need to specify it, too.
     *
     * @return Class
     */
    Class target() default Object.class;


    /**
     * The method name of target interface 
     * If you are a SpringCloud user, you need to specify the method name of the target.
     * （Since SpringCloud is an HTTP request that cannot be invoked through reflection serialization, this property is added.）
     * If you are a Dubbo user, you do not need to specify it.
     * If you are a Motan user, you do not need to specify it, too.
     *
     * @return String
     */
    String targetMethod() default "";


    /**
     * Whether there is a transaction, Here specifically refers to the invoker have a database operation.（Is there a transaction operation）
     * 
     * @return PropagationEnum
     */
    PropagationEnum propagation() default PropagationEnum.PROPAGATION_REQUIRED;


    /**
     * MQ message pattern
     *
     * @return MessageTypeEnum
     */
    MessageTypeEnum pattern() default MessageTypeEnum.P2P;

```


   *  ##### The usage of Annotation: add the @Myth annotation to interface method and implementation class(Dubbo,motan added to the API interface. The SpringCloud needs to be added to FeignClient). Refer to the demo project for details.


* ###  applicationContext.xml  for details:

```xml

  <!-- aspect configuration, whether to open the AOP aspect-->
  <aop:aspectj-autoproxy expose-proxy="true"/>
  <!--The package of the scanning framework-->
  <context:component-scan base-package="com.github.myth.*"/>
  <!--The property configuration of start class -->
  <bean id="mythTransactionBootstrap" class="com.github.myth.core.bootstrap.MythTransactionBootstrap">
      <property name="repositorySuffix" value="account-service"/>
      <property name="serializer" value="kryo"/>
      <property name="coordinatorQueueMax" value="5000"/>
      <property name="coordinatorThreadMax" value="8"/>
      <property name="rejectPolicy" value="Abort"/>
      <property name="blockingQueueType" value="Linked"/>
      <property name="repositorySupport" value="db"/>
      <property name="mythDbConfig">
          <bean class="com.github.myth.common.config.MythDbConfig">
              <property name="url"
                        value="jdbc:mysql://192.168.1.68:3306/myth?useUnicode=true&amp;characterEncoding=utf8"/>
              <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
              <property name="password" value="Wgj@555888"/>
              <property name="username" value="xiaoyu"/>
          </bean>
      </property>
  </bean>

```


* ### MythTransactionBootstrap  for details (refer  to `com.github.myth.common.config.MythConfig`)

```xml
  <!--Serialization of data storage. The SPI extension supports Java, Kroy, Hessian, ProtoStuff, and Kroy is recommended-->
  <property name="serializer" value="kryo"/>

  <!--The thread pool maximum queue to coordinate resources.-->
  <property name="coordinatorQueueMax" value="5000"/>

  <!--The maximum number of threads in the coordination resource thread pool.-->
  <property name="coordinatorThreadMax" value="4"/>

  <!-- The type of queue thread pool. The SPI extension supports Linked, Array, and SynchronousQueue-->
  <property name="blockingQueueType" value="Linked"/>

  <!--Rejection policies in the thread pool. The SPI extensions supports Abort, Blocking, Callerruns, Discarded and Rejected.-->
  <property name="rejectPolicy" value="Abort"/>

  <!--Log storage. The SPI extension supports DB, Redis, ZooKeeper, MongoDB and File -->
  <property name="repositorySupport" value="db"/>

```

* ### When the invoker of a transaction is configured, specify that a timed task is required to recover. (The participants of the transaction do not need to be configured.)

```xml
       <property name="needRecover" value="true"/>
       <property name="scheduledDelay" value="120"/>
       <property name="scheduledThreadMax" value="4"/>
```

* ### The transaction log is stored in a database.

```xml
       <property name="repositorySupport" value="db"/>
       <property name="mythDbConfig">
              <bean class="com.github.myth.common.config.MythDbConfig">
                   <property name="url"
                       value="jdbc:mysql://192.168.1.68:3306/myth?useUnicode=true&amp;characterEncoding=utf8"/>
                  <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
                  <property name="password" value="Wgj@555888"/>
                  <property name="username" value="xiaoyu"/>
             </bean>
      </property>
```

* ### The transaction log is stored in Redis, which is recommended when the business module is clustered.

```xml

        <!--Configuration log storage type for Redis-->
        <property name="repositorySupport" value="redis" />
        <property name="mythRedisConfig">
            <bean class="com.github.myth.common.config.MythRedisConfig">
                <!--Redis is configured for cluster mode-->
                <!--<property name="cluster"
                      value="true"/>
                <property name="clusterUrl"  value="127.0.0.1:6379;127.0.0.2:6378"/> -->   
                <property name="hostName"
                          value="192.168.1.68"/>
                <property name="port" value="6379"/>
                <property name="password" value=""/>
            </bean>
      </property>
```

* ###  The transaction log is stored in ZooKeeper, which is recommended when the business module is clustered.
```xml
         <!--配置日志存储类型为zookeeper-->
         <property name="repositorySupport" value="zookeeper"/>
         <property name="mythZookeeperConfig">
             <bean class="com.github.myth.common.config.MythZookeeperConfig">
                 <property name="host"  value="192.168.1.73:2181"/>
                 <property name="sessionTimeOut" value="100000"/>
                 <property name="rootPath" value="/myth"/>
             </bean>
        </property>
```
* ### The transaction log is stored in **MongoDB**, where the mongodb connection mode is version 3.4.0, and SHA1 is recommended instead of CR .  At the same time, mongodb should enable permission authentication, users need to be careful.

```xml
        <!--Configure the log storage type to mongodb-->
        <property name="repositorySupport" value="mongodb"/>
        <property name="mythMongoConfig">
           <bean class="com.github.myth.common.config.MythMongoConfig">
               <!--mongodb url-->
               <property name="mongoDbUrl"  value="192.168.1.78:27017"/>
               <!--mongodb database-->
               <property name="mongoDbName" value="happylife"/>
               <!--mongodb username-->
               <property name="mongoUserName" value="xiaoyu"/>
               <!--mongodb password-->
               <property name="mongoUserPwd" value="123456"/>
           </bean>
       </property>
```
*  ### The local data is stored as file
```xml
     <!--Configure the log storage type to file-->
     <property name="repositorySupport" value="file"/>
     <property name="MythFileConfig">
            <bean class="com.github.myth.common.config.MythFileConfig">

                <property name="path"  value=""/>
                <!--Specifies the file prefix to build name of file.-->
                <property name="prefix" value="consume"/>
            </bean>
      </property>
```
* ### @Myth

   *  ##### 注解源码解析

```java
   /**
 * myth分布式事务框架注解
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface Myth {


    /**
     * The destination name for this listener, resolved through the container-wide
     */
    String destination();


    /**
     * 目标接口类
     * 如果是springcloud用户，需要指定目标的接口服务
     * （因为springcloud是http的请求，通过反射序列化方式没办法调用，所有加了这个属性）
     * 如果是dubbo用户 则不需要指定
     * 如果是motan用户 则不需要指定
     *
     * @return Class
     */
    Class target() default Object.class;


    /**
     * 目标接口方法名称
     * 如果是springcloud用户，需要指定目标的方法名称
     * （因为springcloud是http的请求，通过反射序列化方式没办法调用，所有加了这个属性）
     * 如果是dubbo用户 则不需要指定
     * 如果是motan用户 则不需要指定
     *
     * @return String
     */
    String targetMethod() default "";


    /**
     * 是否有事务 这里具体指的是发起方是否有进行数据库的操作（是否有事务操作）
     *
     * @return PropagationEnum
     */
    PropagationEnum propagation() default PropagationEnum.PROPAGATION_REQUIRED;


    /**
     * mq 消息模式
     *
     * @return MessageTypeEnum
     */
    MessageTypeEnum pattern() default MessageTypeEnum.P2P;

```


   *  ##### 注解使用： 在接口方法和实现类上添加@Myth注解（dubbo,motan 加在api接口上，springcloud则需要加在feignClient上），具体参考demo工程。


* ###  applicationContext.xml 详解：

```xml

  <!-- Aspect 切面配置，是否开启AOP切面-->
  <aop:aspectj-autoproxy expose-proxy="true"/>
  <!--扫描框架的包-->
  <context:component-scan base-package="com.github.myth.*"/>
  <!--启动类属性配置-->
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


* ### MythTransactionBootstrap 详解（具体参见com.github.myth.common.config.MythConfig）

```xml
  <!--数据保存序列化方式  spi扩展支持 java kroy，hessian protostuff 推荐使用kroy-->
  <property name="serializer" value="kryo"/>

  <!--协调资源线程池最大队列-->
  <property name="coordinatorQueueMax" value="5000"/>

  <!--协调资源线程池最大线程-->
  <property name="coordinatorThreadMax" value="4"/>

  <!--  线程池中的队列类型 spi扩展支持 Linked Array SynchronousQueue-->
  <property name="blockingQueueType" value="Linked"/>

  <!--线程池中的拒绝策略 spi扩展支持 Abort Blocking CallerRuns Discarded Rejected-->
  <property name="rejectPolicy" value="Abort"/>

  <!--日志存储方式  spi扩展支持db，redis，zookeeper，mongodb，file -->
  <property name="repositorySupport" value="db"/>

```

* ### 当事务的发起者配置时候，请指定需要定时任务来恢复（事务的参与者不需要配置）

```xml
       <property name="needRecover" value="true"/>
       <property name="scheduledDelay" value="120"/>
       <property name="scheduledThreadMax" value="4"/>
```

* ### 事务日志采用数据库存储

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

* ### 事务日志采用redis存储，当业务模块为集群时，推荐使用

```xml

        <!--配置日志存储类型为reids-->
        <property name="repositorySupport" value="redis" />
        <property name="mythRedisConfig">
            <bean class="com.github.myth.common.config.MythRedisConfig">
                <!--redis 为集群模式的配置-->
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

* ###  事务日志采用zookeeper存储，当业务模块为集群时，推荐使用
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
* ### 事务日志采用 **mongodb存储**,这里mongdb连接方式采用3.4.0版本推荐使用的Sha1,不是CR模式，同时mongdb应该开启权限认证，使用者需要注意

```xml
        <!--配置日志存储类型为mongodb-->
        <property name="repositorySupport" value="mongodb"/>
        <property name="mythMongoConfig">
           <bean class="com.github.myth.common.config.MythMongoConfig">
               <!--mongodb url-->
               <property name="mongoDbUrl"  value="192.168.1.78:27017"/>
               <!--mongodb 数据库-->
               <property name="mongoDbName" value="happylife"/>
               <!--mongodb 用户名-->
               <property name="mongoUserName" value="xiaoyu"/>
               <!--mongodb 密码-->
               <property name="mongoUserPwd" value="123456"/>
           </bean>
       </property>
```
*  ### 本地数据存储为file
```xml
     <!--配置日志存储类型为file-->
     <property name="repositorySupport" value="file"/>
     <property name="MythFileConfig">
            <bean class="com.github.myth.common.config.MythFileConfig">

                <property name="path"  value=""/>
                <!--指定文件前缀，生成文件名称-->
                <property name="prefix" value="consume"/>
            </bean>
      </property>
```
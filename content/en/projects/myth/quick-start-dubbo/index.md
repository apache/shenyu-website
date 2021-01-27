*  #####  cd  https://github.com/yu199195/myth/tree/master/myth-demo/myth-demo-dubbo

*  #####  Modifiy application.yml on Indicator Item  And Modifiy you jdbc url And choose you Message Oriented Middleware

     ```yml
     spring:
       datasource:
        driver-class-name:  com.mysql.jdbc.Driver
        url: jdbc:mysql://192.168.1.68:3306/myth_account?useUnicode=true&characterEncoding=utf8
        username: xiaoyu
        password: Wgj@555888
    #activemq:
    #   broker-url: tcp://120.76.52.162:61616
    #   user: happylife
    #   password: happylifeplat01
    #   trust-all: true
    #rabbitmq:
    #    host: localhost
    #    port: 5672
    #    username: guest
    #    password: guest
    rocketmq:
        namesrvAddr: 192.168.1.148:9876
        consumerGroupName: account
        instanceName: account
    #kafka:
      #  consumer:
      #     bootstrap-servers: localhost:9092
      #     group-id: test
      #     auto-offset-reset: earliest
      #     enable-auto-commit: true
      #     auto-commit-interval: 100
      #    key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      #     value-deserializer: org.apache.kafka.common.serialization.ByteArrayDeserializer
    ```
*  #####  Modifiy applicationContext.xml on Indicator Item And choose repositorySupport and modifiy it
    * ### If you use database compensation , You have to create a new database  for example：myth
     ```xml
     <context:component-scan base-package="com.github.myth.*"/>
   <aop:aspectj-autoproxy expose-proxy="true"/>
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

* #####  Modifiy spring-dubbo.xml on Indicator Item And  modifiy zookeeper url
  
    ```xml
   <dubbo:application name="account-service"/>

  <dubbo:registry protocol="zookeeper" address="192.168.1.148:2181"/>

  <dubbo:protocol accesslog="true" name="dubbo" port="20888"/>

  <dubbo:service interface="com.github.myth.demo.dubbo.account.api.service.AccountService"
                 ref="accountService"/>
  ```
*  #####  run  DubboAccountApplication.java

*  #####  run  DubboInventoryApplication.java

*  #####  run  DubboOrderApplication.java  
     ### this mq sender so befer:

    * ####   in applicationContext.xml  choose import you mq sender config  

      ```xml
      <import resource="spring-rocketmq.xml"/>
      <!--<import resource="spring-rabbitmq.xml"/>-->
      <!--<import resource="spring-kafka.xml"/>-->
      <!--<import resource="spring-activemq.xml"/>-->
      ```

   *  ####  modifiy you mq config for example

     ```xml
       <bean id="defaultMQProducer" class="org.apache.rocketmq.client.producer.DefaultMQProducer"
             init-method="start" destroy-method="shutdown">
         <constructor-arg name="producerGroup" value="producerGroup" />
         <property name="namesrvAddr" value="192.168.1.148:9876" />
         <property name="retryTimesWhenSendFailed" value="10" />
      </bean>

      <bean id="rocketmqSendService" class="com.github.myth.rocketmq.service.RocketmqSendServiceImpl">
          <property name="defaultMQProducer" ref="defaultMQProducer"/>
       </bean>
     ```

*  ####  http://127.0.0.1:8083/swagger-ui.html
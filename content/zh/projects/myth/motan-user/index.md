---
title: Motan 用户
description: Myth Motan User
---

* 在motan api 项目引入myth-annotation jar包

```xml
       <dependency>
           <groupId>com.github.myth</groupId>
           <artifactId>myth-annotation</artifactId>
       </dependency>
```

* 在motan interface 方法上加上@Myth注解 ,并设置消息队列名称,此队列就是消息中间件发消息的队列：

```java
    @Myth(destination = "account")
    boolean payment(AccountDTO accountDTO);   
```

* 在motan 服务提供方（事务的参与方法，被调用方）

  * 引入myth-motan 包
      ```xml
      <dependency>
           <groupId>com.github.myth</groupId>
           <artifactId>myth-motan</artifactId>
       </dependency>
     ```
  * 配置 MythTransactionBootstrap启动类,可以采用xml方式，或者@Bean的方式,具体配置可以参考:[配置详解](https://github.com/yu199195/myth/wiki/Configuration)

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
* 在你接口的实现方法上加上@Myth

* 监听消息队列（注解方法上写的消息队列名称),调用框架提供       的MythMqReceiveService.processMessage方法。列如使用jms，具体可以参考demo工程。

     ```java
     @JmsListener(destination = "account",containerFactory = "queueListenerContainerFactory")
     public void receiveQueue(byte[] message) {
       LOGGER.info("=========扣减账户信息接收到Myth框架传入的信息==========");
       final Boolean success = mythMqReceiveService.processMessage(message);
       if(success){
           //消费成功，消息出队列，否则不消费
       }
   }
   ```

* 在motan 消费方（事务的发起者，调用方）

   * 引入myth-motan 包
    ```xml
    <dependency>
         <groupId>com.github.myth</groupId>
         <artifactId>myth-motan</artifactId>
     </dependency>
    ```

   * 配置 MythTransactionBootstrap启动类,可以采用xml方式，或者@Bean的方式,具体配置可以参考:[配置详解](https://github.com/yu199195/myth/wiki/Configuration)
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
       <property name="needRecover" value="true"/>
       <property name="scheduledDelay" value="120"/>
       <property name="scheduledThreadMax" value="4"/>
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
   * 注意：在消费方请配置自动恢复策略:防止在极端情况下消息发送失败的情况
     ```xml
     <!-设置为true，表明采用恢复策略-->
     <property name="needRecover" value="true"/>
     <!--调度延迟时间-->
     <property name="scheduledDelay" value="120"/>
     <!--调度线程线程大小-->
     <property name="scheduledThreadMax" value="4"/>
     ```
   * 选择你的消息中间件类型，来引入不同的jar包

    * 如果你是使用jms（activemq），引入jar包，并配置ActivemqSendServiceImpl。
       ```xml
       <dependency>
           <groupId>com.github.myth</groupId>
           <artifactId>myth-jms</artifactId>
       </dependency>
       ```
       ```xml
       <bean id="activemqSendService" class="com.github.myth.jms.service.ActivemqSendServiceImpl">    
           <property name="jmsTemplate" ref="jmsTemplate"/>
       </bean>
       ```
    * 如果你是使用 rabbitmq,引入jar包，并配置RabbitmqSendServiceImpl。

          ```xml
          <dependency>
              <groupId>com.github.myth</groupId>
              <artifactId>myth-rabbitmq</artifactId>
          </dependency>
   
          ```
          ```xml
          <bean id="rabbitmqSendService" class="com.github.myth.rabbitmq.service.RabbitmqSendServiceImpl">
            <property name="amqpTemplate" ref="amqpTemplate"/>
         </bean>
         ```
    * 如果你是使用 kafka,引入jar包，并配置KafkaSendServiceImpl。

        ```xml
          <dependency>
             <groupId>com.github.myth</groupId>
             <artifactId>myth-kafka</artifactId>
         </dependency>
        ```
        ```xml
        <bean id="KafkaSendService" class="com.github.myth.kafka.service.KafkaSendServiceImpl" >
           <property name="kafkaTemplate" ref="kafkaTemplate"/>
        </bean>      
        ```

    * 如果你是使用 rocketmq,引入jar包，并配置RocketmqSendServiceImpl。
   
        ```xml
              <dependency>
                 <groupId>com.github.myth</groupId>
                 <artifactId>myth-rocketmq</artifactId>
              </dependency>
        ```

        ```xml
        <bean id="rocketmqSendService"   class="com.github.myth.rocketmq.service.RocketmqSendServiceImpl">
          <property name="defaultMQProducer" ref="defaultMQProducer"/>
        </bean>    
        ```

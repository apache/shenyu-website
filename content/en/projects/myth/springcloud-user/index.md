---
title: SpringCloud User
description: Myth SpringCloud User
---

 * In the springcloud service provider (the participating method of the transaction, the called party).

     * add myth-springcloud dependency
         ```xml
          <dependency>
              <groupId>com.github.myth</groupId>
              <artifactId>myth-springcloud</artifactId>
          </dependency>
        ```
     * Configure MythTransactionBootstrap to start the class, either as XML or as @Bean. Specific configuration can refer to here:[configuration for details](https://github.com/yu199195/myth/wiki/Configuration).

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
   * Add @Myth to the implementation method of springcloud service.

   * Listen to the message queue (message queue name written in the annotations method), invoke the framework provides MythMqReceiveService.processMessage() method. If you use JMS, you can refer to the Demo project for details.

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

   * In the springcloud consumer (the invoker of the transaction, the caller)

      * add myth-springcloud dependency
       ```xml
       <dependency>
            <groupId>com.github.myth</groupId>
            <artifactId>myth-springcloud</artifactId>
        </dependency>
       ```

      * Set feignClient to add @Myth annotation to the interface, the target must be set to the service interface you actually call, and it must be set correctly.
       ```java
        @FeignClient(value = "account-service", configuration = MyConfiguration.class)
        public interface AccountClient {
          
               @Myth(destination = "account", target = AccountService.class)
              Boolean payment(@RequestBody AccountDTO accountDO);
        }
       ```
      * FeignClient config: configuration = MyConfiguration.class
       ```java
             @Configuration
             public class MyConfiguration {

              @Bean
              @Scope("prototype")
              public Feign.Builder feignBuilder() {
                    return Feign.builder()
                  .requestInterceptor(new MythRestTemplateInterceptor())
                       .invocationHandlerFactory(invocationHandlerFactory());
            }

              @Bean
              public InvocationHandlerFactory invocationHandlerFactory() {
                     return (target, dispatch) -> {
                     MythFeignHandler handler = new MythFeignHandler();
                     handler.setTarget(target);
                    handler.setHandlers(dispatch);
                   return handler;
               };
            }
           }
       ```
      * The MythTransactionBootstrap startup class can be configured in xml or @Bean. Please refer to the specific configuration:[configuration for details](https://github.com/yu199195/myth/wiki/Configuration)
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
      * Note: Please configure the automatic recovery strategy on the consumer side to prevent the message sending failure in extreme cases.
        ```xml
        <!-Set to true, show that the recovery strategy-->
        <property name="needRecover" value="true"/>
        <!--Scheduling delay time-->
        <property name="scheduledDelay" value="120"/>
        <!--The thread size of the scheduling thread-->
        <property name="scheduledThreadMax" value="4"/>
        ```

     *  Select your messaging middleware type to import different jar.

       *  If you are using JMS (ActiveMQ), import the jar package and configure the ActiveMQSendServiceImpl.
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
       * If you are using RabbitMQ, import the jar package and configure the RabbitMQSendServiceImpl.

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
       *  If you are using Kafka, import the jar package and configure KafkasendServiceImpl.

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

       *  If you are using RocketMQ, import the jar package and configure the RocketMQSendServiceImpl.

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

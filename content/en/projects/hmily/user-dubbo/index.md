---
title: Dubbo user guide
keywords: dubbo
description: Dubbo user guide
---

# The Dubbo Interface Sectioon

*  Introduce the jar packages into your interface project.

```xml
      <dependency>
          <groupId>org.dromara</groupId>
          <artifactId>hmily-annotation</artifactId>
          <version>{last.version}</version>
      </dependency>
```

* Add the `@Hmily` annotation on the interface method in which you need to perform Hmily distributed transactions.
```java
public interface HelloService {

    @Hmily
    void say(String hello);
}
```

# The project with Dubbo implementation
 
  * Step 1 ： Introduce the jar package of the `hmily` dependency
  
  * Step 2 ： Add `Hmily` configuration
  
  * Step 3 ： Add the specific annotation to the implementation method. you need to complete the development of `confirm` and `cancel` method, if in `TCC` mode.

### Introduce The Maven dependency

##### Spring-Namespace

* for Alibaba-Dubbo Users

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-dubbo</artifactId>
           <version>{last.version}</version>
        </dependency>
```

* for Aapche-Dubbo Users

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-apache-dubbo</artifactId>
           <version>{last.version}</version>
        </dependency>
```

* the configuration should be made in the xml file like below

```xml
    <!-- set up to enable the aspectj-autoproxy -->
    <aop:aspectj-autoproxy expose-proxy="true"/>
    <bean id = "hmilyTransactionAspect" class="org.dromara.hmily.spring.aop.SpringHmilyTransactionAspect"/>
    <bean id = "hmilyApplicationContextAware" class="org.dromara.hmily.spring.HmilyApplicationContextAware"/>

```

##### Spring-Boot

* for Alibaba-Dubbo Users

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-spring-boot-starter-dubbo</artifactId>
           <version>{last.version}</version>
        </dependency>
```

* for Aapche-Dubbo Users

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-spring-boot-starter-apache-dubbo</artifactId>
           <version>{last.version}</version>
        </dependency>
```

## Introduce the Hmily configuration

  * new a configuration file named `hmily.yml` under the `resource` directory of the current project
  
  * the specific parameter configuration can refer to [configuration detail](../config),[Local configuration mode](../config-local), [Zookeeper configuration mode](../config-zookeeper), [nacos configuration mode](../config-nacos),[apollo configuration mode](../config-apollo)
  
  
## Add annotations on the implementation interface

We have completed the integration described above,and the next we will talk about the specific implementation.

##### TCC Mode

 * Add `@HmilyTCC (confirmMethod = "confirm", cancelMethod = "cancel")` annotation to the concrete implementation of the interface method identified by '@Hmily'.

 * `confirmMethod` : the method name for confirm，The method parameter list and return type should be consistent with the identification method.

 * `cancelMethod` :  the method for cancel，The method parameter list and return type should be consistent with the identification method.
 
 * The `TCC` mode should ensure the idempotence of the `confirm` and `cancel` methods,Users need to develop these two methods by themselves,The confirmation and rollback behavior of all transactions are completely up tp users.The Hmily framework is just responsible for making calls.

```java

public class HelloServiceImpl implements HelloService  {

    @HmilyTCC(confirmMethod = "sayConfrim", cancelMethod = "sayCancel")
    public void say(String hello) {
         System.out.println("hello world");
    }
    
    public void sayConfrim(String hello) {
         System.out.println(" confirm hello world");
    }

    public void sayCancel(String hello) {
         System.out.println(" cancel hello world");
    }
}
``` 

# The users for using Dubbo annotation

 For the users using the '@Reference' annotation to inject the Dubbo service, please note that you may need to do configuration as below:
   
#### The users for using Spring Namespace
 
 In your xml configuration, you need to inject the `org.dromara.hmily.spring.annotation.RefererAnnotationBeanPostProcessor` into a spring bean.
```xml
 <bean id = "refererAnnotationBeanPostProcessor" class="org.dromara.hmily.spring.annotation.RefererAnnotationBeanPostProcessor"/>
```   

#### The users for using Spring Boot

 You need to enable the annotation support in the YML configuration file:
```yml
hmily.support.rpc.annotation = true 
```      
or inject it into the project explicitly:
```java
@Bean
public BeanPostProcessor refererAnnotationBeanPostProcessor() {
    return new RefererAnnotationBeanPostProcessor();
}
```

### TAC Mode(Under development, not released)

  * Add `@HmilyTAC` annotation to the concrete implementation of the interface method identified by '@Hmily'.  
  
## Important Notes
  Before invoking any RPC calls, when you need to aggregate RPC calls to be a distributed transaction, you need to add an annotation to the method of aggregate RPC calls which means to enable a global transaction.

#### Load balance
  * If the service is deployed with several nodes, the load balance algorithm is better to use `hmily`, so that the calls of `try`, `confirm`, and `cancel` will fall on the same node to make full use of the cache and improve efficiency.
    
  * There are serval load balance algorithms supported such as `hmilyConsistentHash`, `hmilyLeastActive`,  `hmilyRandom`, `hmilyRoundRobin`, all of which are inherited from Dubbo's native algorithm.
    
```xml
   <dubbo:reference  interface="xxx"  id="xxx" loadbalance="hmilyConsistentHash"/>           
```      
    
#### Set up to never try
    
  * the Dubbo interface which required distributed transaction should be set to never retry by caller.

```xml
   <dubbo:reference  interface="xxx"  id="xxx" retries="0"/>           
```  

#### Exception
  
  * Do not catch any exceptions of the `try`, `confirm`, `cancel` method by yourself. Any exceptions should be thrown to the Hmily framework to handle.

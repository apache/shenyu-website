---
title: Grpc User Guide
keywords: Grpc
description: Grpc User Guide
---

# Grpc User Guide

* Unary synchronous calls to GRPC are supported only at present.

* Introduce the jar packages

* Introduce the `Hmily` configuration

* Add `@HmilyTCC` or `@HmilyTAC` annotation on the concrete implementation method(Service provider).

## Introduce The Maven dependency

**Spring-Namespace**      

  * Introduce the `hmily-grpc` dependency 
   
```xml
        <dependency>
                  <groupId>org.dromara</groupId>
                  <artifactId>hmily-grpc</artifactId>
                  <version>{last.version}</version>
          </dependency>
```
* make the configuration in the XML configuration file as below:     
```xml
    <!--Configure the base packages that the Hmily framework need to scan -->
    <context:component-scan base-package="org.dromara.hmily.*"/>
    <!-- set up to enable the aspectj-autoproxy -->
    <aop:aspectj-autoproxy expose-proxy="true"/>
    <!-- Configure the bean parameters for Hmily startup -->
    <bean id="hmilyApplicationContextAware" class="org.dromara.hmily.spring.HmilyApplicationContextAware"/>
 
```

**Spring-Boot**      

 * Introduce the `hmily-spring-boot-starter-grpc` dependency      
```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-spring-boot-starter-grpc</artifactId>
            <version>{last.version}</version>
        </dependency>
```
## Introduce the `Hmily` configuration

* new a configuration file named `hmily.yml` under the `resource` directory of the current project

* the specific parameter configuration can refer to [configuration detail](../config),[Local configuration mode](../config-local), [Zookeeper configuration mode](../config-zookeeper), [nacos configuration mode](../config-nacos),[apollo configuration mode](../config-apollo)

## Grpc Filter configuration

+ Add filter `GrpcHmilyTransactionFilter` to `GRPC` client.
+ Add filter `GrpcHmilyServerFilter` to `GRPC` server.

## Grpc client call

* Use the GrpcHmilyClient to make the remote call instead of the original call.

```java
AccountResponse response = GrpcHmilyClient.syncInvoke(accountServiceBlockingStub, "payment", request, AccountResponse.class);
```
The input parameters are the called AbstratcSub, the method name, the specific parameter, and the return value type,respectively.

##### TCC Mode

 * Add the `@HmilyTCC(confirmMethod = "confirm", cancelMethod = "cancel")` annotation on the concrete implementation of the transaction method on the server side.

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


## Important Notes

#### Exception
  
  * Do not catch any exceptions of the `try`, `confirm`, `cancel` method by yourself. Any exceptions should be thrown to the Hmily framework to handle.

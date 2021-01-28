---
title: Grpc用户指南
keywords: Grpc
description: Grpc用户指南
---

# Grpc用户指南

* 目前只支持grpc的一元同步调用

* 引入jar包

* 引入hmily配置

* 在具体的实现方法上（服务提供端），加上`@HmilyTCC` or `HmilyTAC` 注解

## 引入依赖

**Spring-Namespace**      

  * 引入依赖     
   
```xml
        <dependency>
                  <groupId>org.dromara</groupId>
                  <artifactId>hmily-grpc</artifactId>
                  <version>{last.version}</version>
          </dependency>
```
* 在xml中进行如下配置          
```xml
    <!--配置扫码hmily框架的包-->
    <context:component-scan base-package="org.dromara.hmily.*"/>
    <!--设置开启aspectj-autoproxy-->
    <aop:aspectj-autoproxy expose-proxy="true"/>
    <!--配置Hmily启动的bean参数-->
    <bean id="hmilyApplicationContextAware" class="org.dromara.hmily.spring.HmilyApplicationContextAware"/>
 
```

**Spring-Boot**      

 * 引入依赖        
```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-spring-boot-starter-grpc</artifactId>
            <version>{last.version}</version>
        </dependency>
```
## 引入Hmily配置

* 在项目的 `resource` 新建文件名为: `hmily.ym` 配置文件。

* 具体的参数配置可以参考[配置详解](../config),[本地配置模式](../config-local), [zookeeper配置模式](../config-zookeeper), [nacos配置模式](../config-nacos),[apollo配置模式](../config-apollo)

## Grpc拦截器配置

* 在 `grpc`客户端中添加拦截器 `GrpcHmilyTransactionFilter`。
+ 在 `grpc`服务端中添加拦截器 `GrpcHmilyServerFilter`。

## Grpc客户端调用

* 使用GrpcHmilyClient代替原来的调用方式来进行远程调用。

```java
AccountResponse response = GrpcHmilyClient.syncInvoke(accountServiceBlockingStub, "payment", request, AccountResponse.class);
```
入参分别为被调用的AbstratcSub,方法名,具体的参数以及返回值类型

##### TCC模式

 * 对服务端事务方法的具体实现,加上` @HmilyTCC(confirmMethod = "confirm", cancelMethod = "cancel")`

 * `confirmMethod` : 确认方法名称，该方法参数列表与返回类型应与标识方法一致。

 * `cancelMethod` :  回滚方法名称，该方法参数列表与返回类型应与标识方法一致。
 
 * `TCC`模式应该保证 `confirm` 和 `cancel` 方法的幂等性，用户需要自行去开发这个2个方法，所有的事务的确认与回滚，完全由用户决定。Hmily框架只是负责来进行调用

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


## 重要注意事项

#### 异常
  
  * `try`, `confirm`, `cancel` 方法的所有异常不要自行`catch` 任何异常都应该抛出给 `Hmily`框架处理。
---
title: SpringCloud用户指南
keywords: SpringCloud
description: Hmily-SpringCloud分布式事务用户指南
---

# Spring-Cloud 用户指南

  * 步骤一: 引入依赖jar包
  
  * 步骤二：引入`hmily`配置
  
  * 步骤三：在具体的实现方法上（服务提供端），加上`HmilyTCC` or `HmilyTAC` 注解
  
  * 步骤四：在feignClient调用方法上（消费方），加上`Hmily`


## 1.引入依赖

#### Spring-Namespace

* 引入依赖

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-springcloud</artifactId>
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

#### Spring-Boot-Starter

* 引入依赖

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-spring-boot-starter-springcloud</artifactId>
            <version>{last.version}</version>
        </dependency>
```

## 2.新增hmily配置

  * 在项目的 `resource` 添加文件名为:`hmily.yml` 的配置文件
  
  * 具体的参数配置可以参考[配置详解](../config),[本地配置模式](../config-local), [zookeeper配置模式](../config-zookeeper), [nacos配置模式](../config-nacos),[apollo配置模式](../config-apollo)

## 3. 服务实现方添加注解

#### TCC模式

   * 只需要在参与hmily分布式事务调用的具体实现方法上加`@HmilyTCC(confirmMethod = "confirm", cancelMethod = "cancel")`
  
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
#### TAC模式（在开发，未发布）

  * 只需要在参与分布式事务调用的具体实现方法上加`@HmilyTAC`

## 服务消费端（FeignClient）

  * 在服务被调用方的`@FeignClient` 接口方法上加上 `@Hmily`注解。

```java
@FeignClient(value = "helle-service")
public interface HelloService {

    @Hmily
    @RequestMapping("/helle-service/sayHello")
    void say(String hello);
}

```

# 重要注意事项

  在调用任何RPC调用之前，当你需要聚合rpc调用成为一次分布式事务的时候，需要在聚合RPC调用的方法上，先行添加 `@HmilyTCC` 或者 `@HmilyTAC` 注解,表示开启全局事务。

#### 负载均衡
 
* 如果服务部署了几个节点， 负载均衡算法最好使用 `hmily`自带, 这样 `try`, `confirm`, `cancel` 调用会落在同一个节点
  充分利用了缓存，提搞了效率。在你的yaml配置如下：
  
```yaml

hmily.ribbon.rule.enabled = true

```  

#### 开启hystrix

* 如果用户配置了`feign.hystrix.enabled = true`, 默认使用线程池模式， 将会开启 `HmilyHystrixConcurrencyStrategy`
  它在hystrix使用线程池模式的时候，能够照样通过`threadLoacl` 进行RPC传参数。
  

#### 设置永不重试
    
* 需要进行分布式事务的SpringCloud微服务的调用方需要设置不重试，如下是参考：

```yaml
ribbon:
    MaxAutoRetriesNextServer : 0
    MaxAutoRetries: 0
```

#### 异常
  
  * `try`, `confirm`, `cancel` 方法的所有异常不要自行`catch` 任何异常都应该抛出给 `Hmily`框架处理。
  

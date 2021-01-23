---
title: tars用户指南
keywords: tars
description: tars用户指南
---

# Tars用户指南

* 引入jar包

* 引入hmily配置

* 在需要进行Hmily分布式事务的自动生成的Servant接口方法上加上 `@Hmily` 标识。

* 在具体的实现方法上（服务提供端），加上`@HmilyTCC` or `HmilyTAC` 注解

## 引入依赖

**Spring-Namespace**      

  * 引入依赖     
   
```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-tars</artifactId>
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
    <bean id="hmilyCommunicatorBeanPostProcessor" class="org.dromara.hmily.tars.spring.TarsHmilyCommunicatorBeanPostProcessor"/>
    <bean id="tarsHmilyStartupBean" class="org.dromara.hmily.tars.spring.TarsHmilyFilterStartupBean"/>
```

**Spring-Boot**      

 * 引入依赖        
```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-spring-boot-starter-tars</artifactId>
            <version>{last.version}</version>
        </dependency>
```
## 引入Hmily配置

* 在项目的 `resource` 新建文件名为: `hmily.ym` 配置文件。

* 具体的参数配置可以参考[配置详解](https://dromara.org/zh-cn/docs/hmily/config.html),[本地配置模式](https://dromara.org/zh-cn/docs/hmily/config-local.html), [zookeeper配置模式](https://dromara.org/zh-cn/docs/hmily/config-zookeeper.html), [nacos配置模式](https://dromara.org/zh-cn/docs/hmily/config-nacos.html),[apollo配置模式](https://dromara.org/zh-cn/docs/hmily/config-apollo.html)

## 实现接口上添加注解

上述我们已经完成了集成，下面将讲述具体的实现。

##### TCC模式

 * 对`@Hmily` 标识的接口方法的具体实现上，加上` @HmilyTCC(confirmMethod = "confirm", cancelMethod = "cancel")`

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
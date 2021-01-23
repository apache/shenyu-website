---
title: Spring Cloud User Guide
keywords: Spring Cloud
description: Hmily-Spring Cloud Distributed Transaction User Guide
---

# Spring-Cloud User Guide
  * Step 1: Introduce the jar packages

  * Step 2: Introduce the `Hmily` configuration

  * Step 3: Add `@HmilyTCC` or `@HmilyTAC` annotation on the concrete implementation method(Service provider).

  * Step 4: Add `@Hmily` annotation on the feignClient call method(Consumer side).


## 1.Introduce The Maven dependency

#### Spring-Namespace

* Introduce the `hmily-springcloud` dependency

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-springcloud</artifactId>
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

#### Spring-Boot-Starter

* Introduce the `hmily-spring-boot-starter-springcloud` dependency

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-spring-boot-starter-springcloud</artifactId>
            <version>{last.version}</version>
        </dependency>
```

## 2.Introduce the `Hmily` configuration

* new a configuration file named `hmily.yml` under the `resource` directory of the current project

* the specific parameter configuration can refer to [configuration detail](config_en.md),[Local configuration mode](config-local_en.md), [Zookeeper configuration mode](config-zookeeper_en.md), [nacos configuration mode](config-nacos_en.md),[apollo configuration mode](config-apollo_en.md)

## 3. Add annotations on the service implementation method

#### TCC Mode

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
### TAC Mode(Under development, not released)

  * Add `@HmilyTAC` annotation to the concrete implementation of the interface method identified by '@Hmily'.

## Service Consumer(FeignClient)
  * Add the `@Hmily` annotation on the service caller's interface methods.

```java
@FeignClient(value = "helle-service")
public interface HelloService {

    @Hmily
    @RequestMapping("/helle-service/sayHello")
    void say(String hello);
}

```

## Important Notes

  Before invoking any RPC calls, when you need to aggregate RPC calls to be a distributed transaction, you need to add an annotation to the method of aggregate RPC calls which means to enable a global transaction.

#### Load balance
  * If the service is deployed with several nodes, the load balance algorithm is better to use `hmily`, so that the calls of `try`, `confirm`, and `cancel` will fall on the same node to make full use of the cache and improve efficiency. make the configuration in your yml file as below:

```yaml

hmily.ribbon.rule.enabled = true

```

#### Enable the Hystrix
* If the user have configured `feign.hystrix.enabled = true`, the thread pool pattern is used by default, and then the `HmilyHystrixConcurrencyStrategy` Strategy will be enabled.When the Hystrix uses the thread pool pattern, it can still pass parameters through 'threadLoacl' in RPC call.


#### Set up to never try

  * The callers of SpringCloud microservices that require distributed transactions need to be set up to never retry, there is a reference example as shown below:

```yaml
ribbon:
    MaxAutoRetriesNextServer : 0
    MaxAutoRetries: 0
```

#### Exception

  * Do not catch any exceptions of the `try`, `confirm`, `cancel` method by yourself. Any exceptions should be thrown to the Hmily framework to handle.


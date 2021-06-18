---
title: Sofa RPC Proxy
keywords: sofa
description: sofa access shenyu gateway
---

## Description

* This article is about sofa users using sofa plugin support,and the tutorial of connecting your own sofa service to the shenyu gateway.
* Before connecting, please start `shenyu-admin` correctly and [Setup Environment](../shenyu-set-up) Ok。

## Introduce the plugin that the gateway supports for sofa

* Add the following dependencies in the gateway's `pom.xml` file：
* Replace the sofa version with yours, and replace the jar package in the registry with yours, The following is a reference。

 ```xml
<dependency>
    <groupId>com.alipay.sofa</groupId>
    <artifactId>sofa-rpc-all</artifactId>
    <version>5.7.6</version>
</dependency>
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-client</artifactId>
    <version>4.0.1</version>
</dependency>
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-framework</artifactId>
    <version>4.0.1</version>
</dependency>
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-recipes</artifactId>
    <version>4.0.1</version>
</dependency>
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-sofa</artifactId>
    <version>${last.version}</version>
</dependency>
```

* Restart the gateway service.

## sofa service access gateway, you can refer to：[shenyu-examples-sofa](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-sofa)

* Springboot

    * Introduce the following dependencies :
 ```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-client-sofa</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
 ```

  * backend server register center config, please look:[register center access](../register-center-access).

* Spring

   * Introduce the following dependencies:
 ```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-client-sofa</artifactId>
            <version>${project.version}</version>
        </dependency>
   ```
   * Add the following in the xml file of your bean definition:
   
  ```xml
        <bean id ="sofaServiceBeanPostProcessor" class ="org.apache.shenyu.client.sofa.SofaServiceBeanPostProcessor">
             <constructor-arg  ref="shenyuRegisterCenterConfig"/>
        </bean>

     <bean id="shenyuRegisterCenterConfig" class="org.apache.shenyu.register.common.config.ShenyuRegisterCenterConfig">
       <property name="registerType" value="http"/>
       <property name="serverList" value="http://localhost:9095"/>
       <property name="props">
            <map>
                 <entry key="contextPath" value="/your contextPath"/>
                 <entry key="appName" value="your name"/>
                 <entry key="isFull" value="false"/>
            </map>
       </property>
    </bean>
   ```

## Plugin Settings

* First in the `shenyu-admin` plugin management, set the `sofa` plugin to open.

* Secondly, configure your registered address in the `sofa` plugin, or the address of other registry.

```yaml
{"protocol":"zookeeper","register":"127.0.0.1:2181"}
```

## Interface registered to the gateway

* For your sofa service implementation class, add @ShenyuSofaClient annotation to the method，Indicates that the interface method is registered to the gateway.

* Start your provider and output the log `sofa client register success`. You’re done. Your sofa interface has been published to the shenyu gateway. If you still don’t understand, you can refer to the `shenyu-test-sofa` project.

## sofa user request and parameter description

* To put it bluntly, it is to request your sofa service through http
* ShenYu gateway needs to have a routing prefix, this routing prefix is for you to access the project for configuration `contextPath`

```yaml
# For example, if you have an order service, it has an interface and its registration path /order/test/save

# Now it's to request the gateway via post：http://localhost:9195/order/test/save

# Where localhost:9195 is the IP port of the gateway，default port is 9195 ，/order is the contextPath of your sofa access gateway configuration
```

* Parameter passing：

   * Access the gateway through http post，and pass through body and json.
   * For more parameter type transfer, please refer to the interface definition in [shenyu-examples-sofa](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-sofa) and the parameter transfer method.

* Single java bean parameter type (default)
* Customize multi-parameter support:
* In the gateway project you built，add a new class A，implements org.apache.shenyu.plugin.api.sofa.SofaParamResolveService。

 ```java
    public interface SofaParamResolveService {
    
        /**
         * Build parameter pair.
         * this is Resolve http body to get sofa param.
         *
         * @param body           the body
         * @param parameterTypes the parameter types
         * @return the pair
         */
        Pair<String[], Object[]> buildParameter(String body, String parameterTypes);
    }
  ```

  * `body` is the json string passed by body in http. 

  * `parameterTypes`: list of matched method parameter types, If there are multiple, use `,` to separate.

  * In Pair，left is the parameter type，and right is the parameter value. This is the standard for sofa generalization calls.

  * Register your class as a String bean and override the default implementation.

 ```java
@Bean
public SofaParamResolveService A() {
    return new A();
}
```

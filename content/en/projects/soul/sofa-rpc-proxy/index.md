---
title: sofa access soul gateway
keywords: sofa
description: sofa access soul gateway
---

## Description

* This article is about sofa users using sofa plug-in support,and the tutorial of connecting your own sofa service to the soul gateway.
  
* Before connecting, please start `soul-admin` correctly and [Setup Environment](../soul-set-up) Ok。

* backend server register center config, please look:[register center access config](../use-register-center)

## Introduce the plug-in that the gateway supports for sofa

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
            <groupId>org.dromara</groupId>
            <artifactId>soul-spring-boot-starter-plugin-sofa</artifactId>
            <version>${last.version}</version>
        </dependency>

  ```

* Restart the gateway service。

## sofa service access gateway, you can refer to：[soul-examples-sofa](https://github.com/dromara/soul/tree/master/soul-examples/soul-examples-sofa)

 * Springboot

    * Introduce the following dependencies :
 ```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>soul-spring-boot-starter-client-sofa</artifactId>
            <version>${soul.version}</version>
        </dependency>
 ```

  * Add the following configuration to your yml file, backend server register center config, please look:[register center access config](../use-register-center)：

   ```yaml
        client:
          registerType: http
          serverLists: http://localhost:9095
          props:
            contextPath: /http
            appName: http
            isFull: false
        # registerType : register type, support http/zookeeper
        # serverList: when register type is http，set Soul-Admin address list，pls note 'http://' is necessary.
        #             when register type is zookeeper，set zookeeper address list
        # contextPath: your project's route prefix through soul gateway, such as /order ，/product etc，gateway will route based on it.
        # appName：your project name,the default value is`spring.application.name`.
        # isFull: set true means providing proxy for your entire service, or only a few controller.
  ```

* Spring

   * Introduce the following dependencies ：
 ```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>soul-client-sofa</artifactId>
            <version>${project.version}</version>
        </dependency>
   ```
   * Add the following in the xml file of your bean definition ：
   
  ```xml
        <bean id ="sofaServiceBeanPostProcessor" class ="org.dromara.soul.client.sofa.SofaServiceBeanPostProcessor">
             <constructor-arg  ref="sofaConfig"/>
        </bean>

        <bean id="sofaConfig" class="org.dromara.soul.client.sofa.common.config.SofaConfig">
             <property name="adminUrl" value="http://localhost:9095"/>
             <property name="contextPath" value="/your contextPath"/>
             <property name="appName" value="your name"/>
        </bean>
   ```

## sofa Plugin settings

* First in the `soul-admin` plugin management, set the `sofa` plugin to open。

* Secondly, configure your registered address in the `sofa` plugin, or the address of other registry.

```yaml
{"protocol":"zookeeper","register":"127.0.0.1:2181"}
```

## Interface registered to the gateway

* For your sofa service implementation class, add @SoulSofaClient annotation to the method，Indicates that the interface method is registered to the gateway.

* Start your provider and output the log `sofa client register success`. You’re done. Your sofa interface has been published to the soul gateway. If you still don’t understand, you can refer to the `soul-test-sofa` project.

## sofa user request and parameter description

* To put it bluntly, it is to request your sofa service through http

* Soul gateway needs to have a routing prefix, this routing prefix is ​​for you to access the project for configuration `contextPath`

```yaml
# For example, if you have an order service, it has an interface and its registration path /order/test/save

# Now it's to request the gateway via post：http://localhost:9195/order/test/save

# Where localhost:9195 is the IP port of the gateway，default port is 9195 ，/order is the contextPath of your sofa access gateway configuration
```

* Parameter passing：

   * Access the gateway through http post，and pass through body and json。

   * For more parameter type transfer, please refer to the interface definition in [soul-examples-sofa](https://github.com/dromara/soul/tree/master/soul-examples/soul-examples-sofa) and the parameter transfer method。

* Single java bean parameter type （default）

* Customize multi-parameter support:

  * In the gateway project you built，add a new class A，implements org.dromara.soul.plugin.api.sofa.SofaParamResolveService。

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

  *  `parameterTypes`: list of matched method parameter types,if there are multiple,use `,` to separate。

  *  In Pair，left is the parameter type，and right is the parameter value. This is the standard for sofa generalization calls.

  * Register your class as a String bean and override the default implementation。

 ```java
    @Bean
     public SofaParamResolveService A() {
             return new A();
     }
  ```

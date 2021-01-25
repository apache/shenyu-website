---
title: Integrate dubbo with soul gateway
keywords: soul
description: Integrate dubbo with soul gateway
---


## Features

* This chapter is a guide about integrating dubbo service with soul gateway.

* Support alibaba dubbo（< 2.7.x）and apache dubbo (>=2.7.x).

* Pls start `soul-admin` successfully beofore integrating , and [Environement Setup](setup.md) is Ok.


## Configure soul gateway as dubbo proxy


* Add these dependencies in gateway's `pom.xml`：

  * alibaba dubbo user, configure the dubbo version and registry center with yours.
  
    ```xml
    <!--soul alibaba dubbo plugin start-->
    <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-alibaba-dubbo</artifactId>
      <version>${last.version}</version>
    </dependency>
    <!-- soul  alibaba dubbo plugin end-->
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>dubbo</artifactId>
      <version>2.6.5</version>
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
    ```
  
  * apache dubbo user, configure the dubbo version and registry center with yours.
  
    ```xml
    <!--soul apache dubbo plugin start-->
    <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-spring-boot-starter-plugin-apache-dubbo</artifactId>
       <version>${last.version}</version>
    </dependency>
    <!--soul apache dubbo plugin end-->
    
    <dependency>
       <groupId>org.apache.dubbo</groupId>
       <artifactId>dubbo</artifactId>
       <version>2.7.5</version>
    </dependency>
    <!-- Dubbo Nacos registry dependency start -->
    <dependency>
       <groupId>org.apache.dubbo</groupId>
       <artifactId>dubbo-registry-nacos</artifactId>
       <version>2.7.5</version>
    </dependency>
    <dependency>
       <groupId>com.alibaba.nacos</groupId>
       <artifactId>nacos-client</artifactId>
       <version>1.1.4</version>
    </dependency>
    <!-- Dubbo Nacos registry dependency  end-->
    
    <!-- Dubbo zookeeper registry dependency start-->
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
    <!-- Dubbo zookeeper registry dependency end -->
    ```

* restart gateway service.

## dubbo integration with gateway,pls refer to : [soul-test-dubbo](https://github.com/Dromara/soul/tree/master/soul-test/soul-test-dubbo)

 * alibaba dubbo user
   
    * springboot
      
       * Add these dependencies:
        
        ```xml
        <dependency>
             <groupId>org.dromara</groupId>
             <artifactId>soul-spring-boot-starter-client-alibaba-dubbo</artifactId>
             <version>${last.version}</version>
        </dependency>
        ```
      
        * Add these config values in your yaml file ：
  
        ```yaml
        soul:
          dubbo:
            adminUrl: http://localhost:9095
            contextPath: /dubbo
            appName: dubbo    
            # adminUrl: 'ip + port' of your soul-admin project, pls note 'http://' is necessary.
            # contextPath: your project's route prefix through soul gateway, such as /order ，/product etc，gateway will route based on it.
            # appName：your project name,default value is the application name in dubbo config.
        ```    
    
* spring
     
   * Add these dependencies：
    
    ```xml
   <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-client-alibaba-dubbo</artifactId>
       <version>${last.version}</version>
    </dependency>
   ```
   * Inject these properties into your Sping beans XML file：      
    
    ```xml
    <bean id ="alibabaDubboServiceBeanPostProcessor" class ="org.dromara.soul.client.alibaba.dubbo.AlibabaDubboServiceBeanPostProcessor">
       <constructor-arg  ref="dubboConfig"/>
    </bean>
    
    <bean id="dubboConfig" class="org.dromara.soul.client.dubbo.common.config.DubboConfig">
       <property name="adminUrl" value="http://localhost:9095"/>     
       <property name="contextPath" value="/your contextPath"/>
       <property name="appName" value="your application name"/>
    </bean>
    ``` 
   
* apache dubbo user
   
  * springboot
      
     * add these dependencies:
       
        ```xml
        <dependency>
             <groupId>org.dromara</groupId>
             <artifactId>soul-spring-boot-starter-client-apache-dubbo</artifactId>
             <version>${last.version}</version>
        </dependency>
        ```
      
     * Add these config values in your yaml file ：
     
          ```yaml
          soul:
            dubbo:
              adminUrl: http://localhost:9095
              contextPath: /dubbo
              appName: dubbo
         
             # adminUrl: 'ip + port' of your soul-admin project, pls note 'http://' is necessary.
             # contextPath: your project's route prefix through soul gateway, such as /order ，/product etc，gateway will route based on it.
             # appName：your project name,default value is the application name in dubbo config.
          ```
   
   * spring
      
     * Add these dependencies ：
       
     ```xml
       <dependency>
           <groupId>org.dromara</groupId>
           <artifactId>soul-client-apache-dubbo</artifactId>
           <version>${last.version}</version>
        </dependency>
     ```

    * Injecct these properties into your Spring beans XML file ：
       
    ```xml
    <bean id ="apacheDubboServiceBeanPostProcessor" class ="org.dromara.soul.client.apache.dubbo.ApacheDubboServiceBeanPostProcessor">
       <constructor-arg  ref="dubboConfig"/>
    </bean>
    
    <bean id="dubboConfig" class="org.dromara.soul.client.dubbo.common.config.DubboConfig">
       <property name="adminUrl" value="http://localhost:9095"/>     
       <property name="contextPath" value="/your contextPath"/>
       <property name="appName" value="your application name"/>
    </bean>
    ``` 

## dubbo configuration

* firstly enable `dubbo` option in `soul-admin`.

* then configure your registry address in `dubbo `.

```yaml
{"register":"zookeeper://localhost:2181"}   or {"register":"nacos://localhost:8848"}
```

## configure the interface with gateway

* you can add the annotation `@SoulDubboClient` to your dubbo service implementation class, so that the interface method will be configured with gateway.

* start your provider and get the log `dubbo client register success `，then your dubbo interface has been added with soul gateway successfully.Pls refer to `soul-test-dubbo`
  project.

## dubbo user request and parameter explanation.

* communicate with dubbo service through Http transport protocol.

* soul gateway need a route prefix which configured when accessing the project.
 
```yaml
# for example: you have an order service and it has a interface, his registry address: /order/test/save

# now we can communicate with gateway through POST request http://localhost:9195/order/test/save

# localhost:9195 is gateway's ip port，default port is 9195 ，/order is the contextPath you set through gateway.
```

* parameter deliver：
   
   * communicate with gateway through body or json of http post request.
   
   * more parameter types, pls refer to the interface definition in  [soul-test-dubbo](https://github.com/Dromara/soul/tree/master/soul-test/soul-test-dubbo) and parameter passing
     method.

* Single java bean parameter type (defaulta).

* Multi-parameter type support, add this config value in gateway's yaml file:

```yaml
soul :
    dubbo :
      parameter: multi
```

* Support for customized multi-parameter type

  * create a new implementation class A in your gateway project of `org.dromara.soul.web.dubbo.DubboParamResolveService`.
  
```java
public interface DubboParamResolveService {

   /**
    * Build parameter pair.
    * this is Resolve http body to get dubbo param.
    *
    * @param body           the body
    * @param parameterTypes the parameter types
    * @return the pair
    */
   Pair<String[], Object[]> buildParameter(String body, String parameterTypes);
}
```
  
  * `body` is the json string in http request.
  
  * `parameterTypes`: the list of method parameter types that are matched，split with `,`.
  
  *  in Pair，left is parmeter type，right is parameter value, it's the standard of dubbo generalization calls.
  
  *  Inject your class into Spring bean, cover the default implementation.
  
```java
@Bean
public DubboParamResolveService A() {
      return new A();
}
```
## Service governance
* Tag route
    * Add `Dubbo_Tag_Route` when send request, the current request will be routed to the provider of the specified tag, which is only valid for the current request.
* Explicit Target
    * Set the `url` property in the annotation `@SoulDubboClient`.
    * Update the configuration in Admin.
    * It's valid for all request.
* Param valid and SoulException
    * Set `validation="soulValidation"`.
    * When `SoulException` is thrown in the interface, exception information will be returned. It should be noted that `SoulException` is thrown explicitly.
    ```java
    @Service(validation = "soulValidation")
    public class TestServiceImpl implements TestService {
    
            @Override
            @SoulDubboClient(path = "/test", desc = "test method")
            public String test(@Valid HelloServiceRequest name) throws SoulException {
                if (true){
                    throw new SoulException("Param binding error.");
                }
                return "Hello " + name.getName();
            }
    }
    ```
  
    * Request param
  
    ```java
        public class HelloServiceRequest implements Serializable {
        
            private static final long serialVersionUID = -5968745817846710197L;
        
            @NotEmpty(message = "name cannot be empty")
            private String name;
        
            @NotNull(message = "age cannot be null")
            private Integer age;
        
            public String getName() {
                return name;
            }
        
            public void setName(String name) {
                this.name = name;
            }
        
            public Integer getAge() {
                return age;
            }
        
            public void setAge(Integer age) {
                this.age = age;
            }
        }
    ```
  
    * Send request
  
    ```json
    {
        "name": ""
    }
    ```
  
    * Response
    
    ```json
    {
        "code": 500,
        "message": "Internal Server Error",
        "data": "name cannot be empty,age cannot be null"
    }
    ```
  
    * Error message
    
    ```json
    {
        "code": 500,
        "message": "Internal Server Error",
        "data": "Param binding error."
    }
    ```
## Let's break down this process: http --> gateway --> dubbo provider

* It basically switches from HTTP request to Dubbo protocol，then invoke Dubbo service and return to the result.

* Two things need to notice after intgeration with gateway, one is the added annoation `@SoulDubboClient`, another is a path used to speicify the request path.

* And you added a config value of `contextPath`.

* If you still remember, then we can start.

* If you have a function like this, the config value in contextPath is `/dubbo`

```java
    @Override
    @SoulDubboClient(path = "/insert", desc = "insert data")
    public DubboTest insert(final DubboTest dubboTest) {
        return dubboTest;
    }
```

* so our request path is: http://localhost:9195/dubbo/insert ,localhost:9195 is the gateway's domain name,if you changed before,so does with yours here..

* how about the request parameter？`DubboTest` is a java bean object，has 2 parameters，id and name ，so we can transfer the value's json type through request body.

```
{"id":"1234","name":"XIAO5y"}
```

* if your interface has no parameter, then the value is:

```
{}
```

* if your interface has multi-parameter, pls refer to the guide above.

---
title: Integrate Http with shenyu gateway
keywords: shenyu
description: Integrate Http with shenyu gateway
---

## Features

* This chapter is a guide about integrating Http service with shenyu gateway.
* ShenYu gateway uses divide plugin handling http request, pls enable it in shenyu-admin background.
* Please start `shenyu-admin` successfully before integrating and [Environment Setup](../shenyu-set-up) is Ok.

## Configure shenyu gateway as Http proxy.

* Add these dependencies in gateway's `pom.xml`:

```xml
  <!--if you use http proxy start this-->
   <dependency>
       <groupId>org.apache.shenyu</groupId>
       <artifactId>shenyu-spring-boot-starter-plugin-divide</artifactId>
       <version>${last.version}</version>
   </dependency>

   <dependency>
       <groupId>org.apache.shenyu</groupId>
       <artifactId>shenyu-spring-boot-starter-plugin-httpclient</artifactId>
       <version>${last.version}</version>
   </dependency>
```

* pls restart the gateway.

## Http request via shenyu gateway（springMVC user）

* pls make sure divide plugin has enabled in `shenyu-admin` background.

##### add Shenyu-Client methods（available for SpringMVC,SpringBoot user）

* `SpringBoot User`
  
   * Add these dependencies in your local maven repository `pom.xml`:
    
    ```xml
         <dependency>
             <groupId>org.apache.shenyu</groupId>
             <artifactId>shenyu-spring-boot-starter-client-springmvc</artifactId>
             <version>${last.version}</version>
         </dependency>
    ```
  
   * Backend server register center config, please look:[register center access](../register-center-access).  

* `SpringMVC User`

   * Add these dependencies in your local maven repository `pom.xml`: 
    
    ```xml
           <dependency>
               <groupId>org.apache.shenyu</groupId>
               <artifactId>shenyu-client-springmvc</artifactId>
               <version>${last.version}</version>
           </dependency>
    ```     
  * Inject these properties into your Spring beans XML file:   

    ```xml
        <bean id ="springMvcClientBeanPostProcessor" class ="org.apache.shenyu.client.springmvc.init.SpringMvcClientBeanPostProcessor">
             <constructor-arg  ref="shenyuRegisterCenterConfig"/>
        </bean>
        
        <bean id="shenyuRegisterCenterConfig" class="org.apache.shenyu.register.common.config.ShenyuRegisterCenterConfig;">
             <property name="registerType" value="http"/>
             <property name="serverList" value="http://localhost:9095"/>
             <property name="props">
                  <map>
                    <entry key="contextPath" value="/your contextPath"/>
                    <entry key="appName" value="your server name"/>
                    <entry key="port" value="your server port"/>
                    <entry key="isFull" value="false"/>
                  </map>
             </property>
        </bean>
    ``` 
    
* Add this annotation `@ShenyuSpringMvcClient` in your `controller` interface.
  
   * You can apply the annotation to class-level in a controller.the name of the path variable is prefix and '/**' will apply proxy for entire interfaces. 
  
   * Example1: both `/test/payment` and `/test/findByUserId` will be handled by proxy service.
   
    ```java
      @RestController
      @RequestMapping("/test")
      @ShenyuSpringMvcClient(path = "/test/**")
      public class HttpTestController {
          
          @PostMapping("/payment")
          public UserDTO post(@RequestBody final UserDTO userDTO) {
              return userDTO;
          }
       
          @GetMapping("/findByUserId")
          public UserDTO findByUserId(@RequestParam("userId") final String userId) {
              UserDTO userDTO = new UserDTO();
              userDTO.setUserId(userId);
              userDTO.setUserName("hello world");
              return userDTO;
          }      
       }
    ```
   * Example2: `/order/save` will be handled by proxy service, but `/order/findById` won't.
   
    ```java
      @RestController
      @RequestMapping("/order")
      @ShenyuSpringMvcClient(path = "/order")
      public class OrderController {
      
          @PostMapping("/save")
          @ShenyuSpringMvcClient(path = "/save")
          public OrderDTO save(@RequestBody final OrderDTO orderDTO) {
              orderDTO.setName("hello world save order");
              return orderDTO;
          }
     
          @GetMapping("/findById")
          public OrderDTO findById(@RequestParam("id") final String id) {
              OrderDTO orderDTO = new OrderDTO();
              orderDTO.setId(id);
              orderDTO.setName("hello world findById");
              return orderDTO;
          }
      }
    ```

* Kick off your project with your interface, which is integrated with shenyu gateway.

## Configure shenyu gateway as an Http proxy（other framework）

* first of all, enable the divide plugin in `shenyu-admin`, then add selector and rule which will filter the request.
* if you don't know how to configure, pls refer to [selector guide](../selector-and-rule).
* you can also develop your cutomized http-client，refer to [multi-language Http client development](../developer-shenyu-client)。

## User request

* Send the request as before, only two points need to notice.
* Firstly，the domain name that requested before in your service, now need to replace with gateway's domain name.
* Secondly，shenyu gateway needs a route prefix which comes from `contextPath`, it configured during the integration with gateway, you can change it freely in divide plugin of `shenyu-admin`, if you are familiar with it.
    * for example, if you have an order service and it has a interface, the request url: http://localhost:8080/test/save
    
    * Now need to change to:  http://localhost:9195/order/test/save
    
    * We can see localhost:9195 is your gateway's ip port，default port number is 9195 ，/order is your contextPath which you configured with gateway.
    
    * other parameters doesn't change in request method.
    
    * Any questions, pls join the group and we can talk about it.

* Then you can visit, very easy and simple.

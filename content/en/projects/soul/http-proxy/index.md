---
title: Integrate Http with soul gateway
keywords: soul
description: Integrate Http with soul gateway
---

## Features

* This chapter is a guide about integrating Http service with soul gateway.

* soul gateway uses divide plugin handling http request, pls enable it in soul-admin backgroud.

* Pls start `soul-admin` successfully beofore integrating , and [Environement Setup](../soul-set-up) is Ok.

## Configure soul gateway as Http proxy.

* Add these dependencies in gateway's `pom.xml`：

```xml
  <!--if you use http proxy start this-->
   <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-spring-boot-starter-plugin-divide</artifactId>
       <version>${last.version}</version>
   </dependency>

   <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-spring-boot-starter-plugin-httpclient</artifactId>
       <version>${last.version}</version>
   </dependency>
```

* pls restart the gateway.

## Http request via soul gateway（springMVC user）

* pls make sure divide plugin has enabled in `soul-admin` background.

##### add Soul-Client methods（available for SpringMVC,SpringBoot user）

* SpringBoot user
  
   * Add these dependencies in your local maven repository `pom.xml`: 
    
    ```xml
         <dependency>
             <groupId>org.dromara</groupId>
             <artifactId>soul-spring-boot-starter-client-springmvc</artifactId>
             <version>${last.version}</version>
         </dependency>
    ```
   * Add these config values in your yaml file ：  
    
    ```yaml
       soul:
         http:
           adminUrl: http://localhost:9095
           port: the port exposed by your application server
           contextPath: /http
           appName: http
           full: false  
       # adminUrl: 'ip + port' of your soul-admin project, pls note 'http://' is necessary.
       # port: your project port number
       # contextPath: your project's route prefix through soul gateway, such as /order ，/product etc，gateway will route based on it.
       # appName：your project name,the default value is`spring.application.name`.
       # full: set true means providing proxy for your entire service, or only a few controller.
    ``` 
 * SpringMVC user
   * Add these dependencies in your local maven repository `pom.xml`: 
    
    ```xml
           <dependency>
               <groupId>org.dromara</groupId>
               <artifactId>soul-client-springmvc</artifactId>
               <version>${last.version}</version>
           </dependency>
    ```     
  * Inject these properties into your Spring beans XML file:   

    ```xml
        <bean id ="springMvcClientBeanPostProcessor" class ="org.dromara.soul.client.springmvc.init.SpringMvcClientBeanPostProcessor">
             <constructor-arg  ref="soulSpringMvcConfig"/>
        </bean>
        
        <bean id="soulSpringMvcConfig" class="org.dromara.soul.client.springmvc.config.SoulSpringMvcConfig">
             <property name="adminUrl" value="http://localhost:9095"/>
             <property name="port" value="your port"/>
             <property name="contextPath" value="/your contextPath"/>
             <property name="appName" value="your application name"/>
             <property name="full" value="false"/>
        </bean>
    ``` 
* Add this annotation `@SoulSpringMvcClient` in your `controller` interface.
  
   * you can apply the annotation to class-level in a controller.the name of the path variable is prefix and '/**' will apply proxy for entire interfaces. 
  
   * example: （1）：both `/test/payment` and `/test/findByUserId` will be handled by proxy service.
   
    ```java
      @RestController
      @RequestMapping("/test")
      @SoulSpringMvcClient(path = "/test/**")
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
   * example （2）：`/order/save` will be handled by proxy service, but `/order/findById` won't.
   
    ```java
      @RestController
      @RequestMapping("/order")
      @SoulSpringMvcClient(path = "/order")
      public class OrderController {
      
          @PostMapping("/save")
          @SoulSpringMvcClient(path = "/save")
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

* Kick off your project with your interface, which is  integrated with soul gateway.

## Configure soul gateway as an Http proxy（other framework）

* first of all, enable the divide plugin in `soul-admin`, then add selector and rule which will filter the request.

* if you don't know how to configure, pls refer to [selector guide](../selector-and-rule).

* you can also develop your cutomized http-client，refer to [multi-language Http client development](../developer-soul-client)。

## User request

* Send the request as before, only two points need to notice.

* firstly，the domain name that requested before in your service, now need to replace with gateway's domain name.

* secondly，soul gateway needs a route prefix which comes from `contextPath`, it configured during the integration with gateway, you can change it freely in divide plugin of `soul-admin`, if your familiar with it.
 
```yaml

# for example, if you have an order service and it has a interface, the request url: http://localhost:8080/test/save

# Now need to change to:  http://localhost:9195/order/test/save

# We can see localhost:9195 is your gateway's ip port，default port number is 9195 ，/order is your contextPath which you configured with gateway.

# other parameters doesn't change in request method.

# Any questions, pls join the group and we can talk about it.

```
* then you can visit, very easy and simple.

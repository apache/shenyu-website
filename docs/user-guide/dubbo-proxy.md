---
title: Dubbo Proxy
keywords: ["Dubbo"]
description: Dubbo Client Access
---

This document is intended to help the `Dubbo` service access the `Apache ShenYu` gateway. The `Apache ShenYu` gateway uses the `Dubbo` plugin to handle `dubbo` service.

Support Alibaba Dubbo(< 2.7.x) and Apache Dubbo (>=2.7.x).

Before the connection, start `shenyu-admin` correctly, start `Dubbo` plugin, and add related dependencies on the gateway and `Dubbo` application client. Refer to the previous [Quick start with Dubbo](../quick-start/quick-start-dubbo) .

For details about client access configuration, see [Application Client Access Config](docs/user-guide/property-config/register-center-access.md) .

For details about data synchronization configurations, see [Data Synchronization Config](docs/user-guide/property-config/use-data-sync.md) .

## Add dubbo plugin in gateway

Add these dependencies in gateway's `pom.xml`.

Alibaba dubbo user, configure the dubbo version and registry center with yours.

```xml
<!-- apache shenyu alibaba dubbo plugin start-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-alibaba-dubbo</artifactId>
   <version>${project.version}</version>
</dependency>
<!-- apache shenyu  alibaba dubbo plugin end-->
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

Apache dubbo user, configure the dubbo version and registry center with yours.

```xml
<!-- apache shenyu apache dubbo plugin start-->
<dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-spring-boot-starter-plugin-apache-dubbo</artifactId>
   <version>${project.version}</version>
</dependency>
<!-- apache shenyu apache dubbo plugin end-->

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

## Dubbo service access gateway

Dubbo integration with gateway, please refer to : [shenyu-examples-dubbo](https://github.com/apache/incubator-shenyu/tree/v2.4.0/shenyu-examples/shenyu-examples-dubbo) .

* Alibaba Dubbo User
  * SpringBoot

      Add these dependencies:

   ```xml
   <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-spring-boot-starter-client-alibaba-dubbo</artifactId>
        <version>${shenyu.version}</version>
   </dependency>
   ```

  * Spring

      Add these dependencies：

       ```xml
          <dependency>
             <groupId>org.apache.shenyu</groupId>
             <artifactId>shenyu-client-alibaba-dubbo</artifactId>
             <version>${shenyu.version}</version>
          </dependency>
       ```

      Inject these properties into your Spring beans XML file：

       ```xml
       <bean id="clientConfig" class="org.apache.shenyu.register.common.config.PropertiesConfig">
            <property name="props">
              <map>
                <entry key="contextPath" value="/你的contextPath"/>
                <entry key="appName" value="你的名字"/>
              </map>
            </property>
        </bean>

        <bean id="shenyuRegisterCenterConfig" class="org.apache.shenyu.register.common.config.ShenyuRegisterCenterConfig">
          <property name="registerType" value="http"/>
          <property name="serverList" value="http://localhost:9095"/>
        </bean>

        <bean id="shenyuClientRegisterRepository" class="org.apache.shenyu.client.core.register.ShenyuClientRegisterRepositoryFactory" factory-method="newInstance">
              <property name="shenyuRegisterCenterConfig" ref="shenyuRegisterCenterConfig"/>
        </bean>

        <bean id ="alibabaDubboServiceBeanListener" class ="org.apache.shenyu.client.alibaba.dubbo.AlibabaDubboServiceBeanListener">
          <constructor-arg name="clientConfig" ref="clientConfig"/>
          <constructor-arg name="shenyuClientRegisterRepository" ref="shenyuClientRegisterRepository"/> 
        </bean>
       ```

* Apache Dubbo User

  * SpringBoot

      Add these dependencies:

      ```xml
       <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-client-apache-dubbo</artifactId>
            <version>${shenyu.version}</version>
       </dependency>
       ```
    
       Add these in your client project's application.yml:  

       ```yml
       dubbo:
         registry:
           address: dubbo register address
           port: dubbo service port
  
       shenyu:
         register:
           registerType: shenyu service register type #http #zookeeper #etcd #nacos #consul
           serverLists: shenyu service register address #http://localhost:9095 #localhost:2181 #http://localhost:2379 #localhost:8848
         client:
           dubbo:
             props:
               contextPath: /your contextPath
               appName: your app name
       ```

  * Spring

      Add these dependencies:

      ```xml
         <dependency>
             <groupId>org.apache.shenyu</groupId>
             <artifactId>shenyu-client-apache-dubbo</artifactId>
             <version>${shenyu.version}</version>
          </dependency>
       ```

      Injecct these properties into your Spring beans XML file:

      ```xml
      <bean id = "apacheDubboServiceBeanListener" class="org.apache.shenyu.client.apache.dubbo.ApacheDubboServiceBeanListener">
          <constructor-arg ref="clientPropertiesConfig"/>
          <constructor-arg ref="clientRegisterRepository"/>
      </bean>

       <!-- Config register repository according to your register type -->
       <bean id="shenyuRegisterCenterConfig" class="org.apache.shenyu.register.common.config.ShenyuRegisterCenterConfig">
           <property name="registerType" value="your service registerType"/>
           <property name="serverLists" value="your service register serverLists"/>
       </bean>

       <!-- Client properties config -->
       <bean id="clientPropertiesConfig"
          class="org.apache.shenyu.register.common.config.ShenyuClientConfig.ClientPropertiesConfig">
          <property name="props">
              <map>
                  <entry key="contextPath" value="/your contextPath"/>
                  <entry key="appName" value="your appName"/>
              </map>
          </property>
       </bean>

      <!-- Config register repository according to your register type -->
      <bean id="clientRegisterRepository" class="org.apache.shenyu.register.client.http.HttpClientRegisterRepository">
          <constructor-arg ref="shenyuRegisterCenterConfig"/>
      </bean>

      <bean id="shenyuClientShutdownHook" class="org.apache.shenyu.client.core.shutdown.ShenyuClientShutdownHook">
          <constructor-arg ref="shenyuRegisterCenterConfig"/>
          <constructor-arg ref="clientRegisterRepository"/>
      </bean>
      ```
    
      Add these in your client project's application.yml:
  
      ```yml
      dubbo:
        registry:
          address: dubbo register address
          port: dubbo service port
      ```

## Dubbo configuration

* Enable `dubbo` option in `shenyu-admin`.
* Configure your registry address in `dubbo`.

```yaml
{"register":"zookeeper://localhost:2181"}   or {"register":"nacos://localhost:8848"}
```

### Configure the interface with gateway

* you can add the annotation `@ShenyuDubboClient` to your dubbo service implementation class, so that the interface method will be configured with gateway.

* Start your provider. After successful startup, go to PluginList -> rpc Proxy -> dubbo in the backend management system. You will see auto-registered selectors and rules information.

### Dubbo user request and parameter explanation.

* Communicate with dubbo service through Http transport protocol.
* Apache ShenYu gateway need a route prefix which configured when accessing the project.

```yaml
# for example: you have an order service and it has a interface, registry address: /order/test/save

# now we can communicate with gateway through POST request http://localhost:9195/order/test/save

# localhost:9195 is gateway's ip port，default port is 9195 ，/order is the contextPath you set through gateway.
```

* parameter deliver:
  * communicate with gateway through body or json of http post request.
  * more parameter types, please refer to the interface definition in  [shenyu-examples-dubbo](https://github.com/apache/incubator-shenyu/tree/v2.4.0/shenyu-examples/shenyu-examples-dubbo) and parameter passing
      method.
* Single java bean parameter type (`default`).
* Multi-parameter type support, add this config value in gateway's yaml file:

```yaml
shenyu:
  dubbo:
    parameter: multi
```

* Support for customized multi-parameter type
* Create a new implementation class `MyDubboParamResolveService` in your gateway project of `org.apache.shenyu.web.dubbo.DubboParamResolveService`.

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
* in Pair，left is parmeter type，right is parameter value, it's the standard of dubbo generalization calls.
* Inject your class into Spring bean, cover the default implementation.

```java
@Bean
public DubboParamResolveService myDubboParamResolveService() {
      return new MyDubboParamResolveService();
}
```

## Service governance

* Tag route
  * Add `Dubbo_Tag_Route` when send request, the current request will be routed to the provider of the specified tag, which is only valid for the current request.
* Explicit Target
  * Set the `url` property in the annotation `@ShenyuDubboClient`.
  * Update the configuration in Admin.
  * It's valid for all request.
* Param valid and ShenyuException
  * Set `validation="shenyuValidation"`.
  * When `ShenyuException` is thrown in the interface, exception information will be returned. It should be noted that `ShenyuException` is thrown explicitly.

    ```java
    @Service(validation = "shenyuValidation")
    public class TestServiceImpl implements TestService {

            @Override
            @ShenyuDubboClient(path = "/test", desc = "test method")
            public String test(@Valid HelloServiceRequest name) throws ShenyuException {
                if (true){
                    throw new ShenyuException("Param binding error.");
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


## Http --> Gateway --> Dubbo Provider

It basically switches from HTTP request to Dubbo protocol, then invoke Dubbo service and return to the result.
Two things need to notice after intgeration with gateway, one is the added annoation `@ShenyuDubboClient`, another is a path used to speicify the request path.
And you added a config value of `contextPath`.

If you have a function like this, the config value in contextPath is `/dubbo`

```java
    @Override
    @ShenyuDubboClient(path = "/insert", desc = "insert data")
    public DubboTest insert(final DubboTest dubboTest) {
        return dubboTest;
    }
```

So our request path is: http://localhost:9195/dubbo/insert, localhost:9195 is the gateway's domain name,if you changed before,so does with yours here..

`DubboTest` is a java bean object，has 2 parameters, id and name, so we can transfer the value's json type through request body.

```
{"id":"1234","name":"XIAO5y"}
```

If your interface has no parameter, then the value is:

```
{}
```

If the interface has multiple parameters, refer to the multi-parameter type support described above.

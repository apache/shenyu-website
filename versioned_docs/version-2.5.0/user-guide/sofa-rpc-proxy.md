---
title: Sofa Proxy
keywords: ["Sofa"]
description: sofa access shenyu gateway
---

This document is intended to help the `Sofa` service access the `Apache ShenYu` gateway. The `Apache ShenYu` gateway uses the `Sofa` plugin to handle `sofa` service.

Before the connection, start `shenyu-admin` correctly, start `Sofa` plugin, and add related dependencies on the gateway and `Sofa` application client. Refer to the previous [Quick start with Sofa](../quick-start/quick-start-sofa) .

For the use of the plugin, see：[Sofa Plugin](../plugin-center/proxy/sofa-plugin.md)

For details about client access configuration, see [Application Client Access Config](property-config/register-center-access.md) .

For details about data synchronization configurations, see [Data Synchronization Config](property-config/use-data-sync.md) .

## Add sofa plugin in gateway

> In the current version, this dependency has been introduced by default.

1. Add the following dependencies in the gateway's `pom.xml` file：

 ```xml
        <dependency>
            <groupId>com.alipay.sofa</groupId>
            <artifactId>sofa-rpc-all</artifactId>
            <version>5.7.6</version>
            <exclusions>
                <exclusion>
                    <groupId>net.jcip</groupId>
                    <artifactId>jcip-annotations</artifactId>
                </exclusion>
            </exclusions>
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
            <version>${project.version}</version>
        </dependency>
 ```

2. Restart the gateway service.

## Sofa service access gateway

Please refer to：[shenyu-examples-sofa](https://github.com/apache/incubator-shenyu/tree/v2.5.0/shenyu-examples/shenyu-examples-sofa)

1. Based on the `springboot` project，Introduce the following dependencies：

 ```xml
         <dependency>
             <groupId>com.alipay.sofa</groupId>
             <artifactId>rpc-sofa-boot-starter</artifactId>
             <version>${rpc-sofa-boot-starter.version}</version>
         </dependency>
 				<dependency>
             <groupId>org.apache.shenyu</groupId>
             <artifactId>shenyu-spring-boot-starter-client-sofa</artifactId>
             <version>${shenyu.version}</version>
         </dependency>
 ```

2. Configure in application.yml

```yaml
com:
  alipay:
    sofa:
      rpc:
        registry-address: zookeeper://127.0.0.1:2181 # consul # nacos
        bolt-port: 8888
shenyu:
  register:
    registerType: http #zookeeper #etcd #nacos #consul
    serverLists: http://localhost:9095 #localhost:2181 #http://localhost:2379 #localhost:8848
    props:
      username: admin
      password: 123456
  client:
    sofa:
      props:
        contextPath: /sofa
        ipAndPort: sofa
        appName: sofa
        port: 8888
```

3. Configure the service interface exposed by the sofa service in the xml file in the resources.

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:sofa="http://sofastack.io/schema/sofaboot"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
            http://sofastack.io/schema/sofaboot https://sofastack.io/schema/sofaboot.xsd"
       default-autowire="byName">
    <sofa:service ref="sofaSingleParamService" interface="org.apache.shenyu.examples.sofa.api.service.SofaSingleParamService">
        <sofa:binding.bolt/>
    </sofa:service>
    <sofa:service ref="sofaMultiParamService" interface="org.apache.shenyu.examples.sofa.api.service.SofaMultiParamService">
        <sofa:binding.bolt/>
    </sofa:service>
</beans>
```

4. Add the `@ShenyuSofaClient` annotation to the interface

```java
@ShenyuSofaClient("/demo")
@Service
public class SofaClientMultiParamServiceImpl implements SofaClientMultiParamService {
    
    @Override
    @ShenyuSofaClient("/findByIdsAndName")
    public SofaSimpleTypeBean findByIdsAndName(final List<Integer> ids, final String name) {
        return new SofaSimpleTypeBean(ids.toString(), "hello world shenyu sofa param findByIdsAndName ：" + name);
    }
}
```

5. Start the `sofa` service, and after successful registration:
- Go to `PluginList -> Proxy -> Sofa` in the backend management system, you will see the information of auto-registered selectors and rules.
- Go to `BasicConfig -> Metadata` and search by app name . You will see the metadata of sofa, each `sofa` interface method, will correspond to a metadata.

## User request and parameter description

- The gateway can be requested by means of `http` to request your `sofa` service.
  - ShenYu gateway needs to have a routing prefix, this routing prefix is for you to access the project for configuration `contextPath` .

> For example, if you have an `order` service, it has an interface and its registration path `/order/test/save`
>
> Now it's to request the gateway via post：`http://localhost:9195/order/test/save`
>
> Where `localhost:9195` is the IP port of the gateway, default port is `9195`, `/order` is the `contextPath` of your sofa access gateway configuration.


* Parameter passing：
  - Access the gateway through http post，and pass through body and json.
  - For more parameter type transfer, please refer to the interface definition in [shenyu-examples-sofa](https://github.com/apache/incubator-shenyu/tree/v2.5.0/shenyu-examples/shenyu-examples-sofa) and the parameter transfer method.

* Single java bean parameter type (default)
* Customize multi-parameter support:
* In the gateway project you built, add a new class `MySofaParamResolveService`, implements `org.apache.shenyu.plugin.api.sofa.SofaParamResolveService` .

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
 public SofaParamResolveService mySofaParamResolveService() {
   return new MySofaParamResolveService();
 }
 ```



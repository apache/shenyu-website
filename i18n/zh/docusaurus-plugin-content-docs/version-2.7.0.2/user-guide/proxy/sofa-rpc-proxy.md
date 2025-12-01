---
title: Sofa服务接入
keywords: ["Sofa"]
description: sofa 接入 Apache ShenYu 网关
---

此篇文章是介绍 `sofa` 服务接入到 `Apache ShenYu` 网关，`Apache ShenYu` 网关使用 `sofa` 插件来接入`sofa`服务。

接入前，请正确启动 `shenyu-admin`，并开启`sofa`插件，在网关端和`sofa`服务端引入相关依赖。可以参考前面的 [Sofa快速开始](../../quick-start/quick-start-sofa)。

关于插件使用可请参考：[Sofa插件](../../plugin-center/proxy/sofa-plugin.md)

应用客户端接入的相关配置请参考：[客户端接入配置](../property-config/register-center-access.md)。

数据同步的相关配置请参考：[数据同步配置](../property-config/use-data-sync.md)。

## 在网关中引入 sofa 插件

> 当前版本，默认已经引入此依赖

1. 在网关的 `pom.xml` 文件中增加如下依赖：

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

2. 重启网关服务。

## sofa服务接入网关

可以参考示例：[shenyu-examples-sofa](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-sofa)

1. `springboot`构建，引入以下依赖：

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

2. 在 application.yml 中配置

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

3. 在 resources 目录下xml 文件中配置 sofa 服务暴露的服务接口

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:sofa="http://sofastack.io/schema/sofaboot"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
            http://sofastack.io/schema/sofaboot https://sofastack.io/schema/sofaboot.xsd"
       default-autowire="byName">
        <!-- 示例 sofa 接口 -->
    <sofa:service ref="sofaSingleParamService" interface="org.apache.shenyu.examples.sofa.api.service.SofaSingleParamService">
        <sofa:binding.bolt/>
    </sofa:service>
        <!-- 示例 sofa 接口 -->
    <sofa:service ref="sofaMultiParamService" interface="org.apache.shenyu.examples.sofa.api.service.SofaMultiParamService">
        <sofa:binding.bolt/>
    </sofa:service>
</beans>
```

4. 在接口上增加`@ShenyuSofaClient`注解

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

5. 启动`sofa`服务，成功注册后
- 进入后台管理系统的 `插件列表 -> Proxy -> Sofa`，会看到自动注册的选择器、规则信息。
- 进入后台管理系统的 `基础配置-> 元数据管理`，搜索appName（通过）可以看到元数据，每一个`sofa`接口方法，都会对应一条元数据。



## sofa用户请求及参数说明

- 可以通过 `http` 的方式来请求网关，从而请求到你的 `sofa` 服务。
  - `Apache ShenYu` 网关需要有一个路由前缀，这个路由前缀就是接入网关配置的 `contextPath`。

> 比如你有一个 `order` 服务 它有一个接口，它的注册路径 `/order/test/save`
>
> 现在就是通过 `post` 方式请求网关：http://localhost:9195/order/test/save
>
> 其中 `localhost:9195` 为网关的 `ip` 端口，默认端口是 `9195` ，`/order` 是你`sofa`接入网关配置的 `contextPath`


* 参数传递：

  * 通过 `http`协议， `post` 方式访问网关，通过在`http body`中传入`json`类型参数。
  * 更多参数类型传递，可以参考 [shenyu-examples-sofa](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-sofa) 中的接口定义，以及参数传递方式。

* 单个`java bean`参数类型 （默认）
* 自定义实现多参数支持：
  * 在你搭建的网关项目中，新增一个类 `MySofaParamResolveService`，实现 `org.apache.shenyu.plugin.api.sofa.SofaParamResolveService`接口。

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

* `body`为`http`中`body`传的`json`字符串。

* `parameterTypes`: 匹配到的方法参数类型列表，如果有多个，则使用`,`分割。

* `Pair`中，`left`为参数类型，`right`为参数值，这是`sofa`泛化调用的标准。

* 把你的类注册成`Spring`的`bean`，覆盖默认的实现。

 ```java
 @Bean
 public SofaParamResolveService mySofaParamResolveService() {
   return new MySofaParamResolveService();
 }
 ```


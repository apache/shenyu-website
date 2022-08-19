---
title: Dubbo服务接入
keywords: ["Dubbo"]
description: Dubbo服务接入
---


## 说明

* 此篇文章是介绍 `dubbo` 服务接入到 `Apache ShenYu` 网关，`Apache ShenYu` 网关使用 `dubbo` 插件来接入`Dubbo`服务。
* 当前支持 `alibaba dubbo（< 2.7.x）` 以及 `apache dubbo (>=2.7.x)`。
* 接入前，请正确启动 `shenyu-admin`，并开启`dubbo`插件，在网关端和`Dubbo`服务端引入相关依赖。可以参考前面的 [Dubbo快速开始](../quick-start/quick-start-dubbo)。


应用客户端接入的相关配置请参考：[客户端接入配置](property-config/register-center-access.md)。

数据同步的相关配置请参考：[数据同步配置](property-config/use-data-sync.md)。

## 在网关中引入 dubbo 插件

* 在网关的 `pom.xml` 文件中增加如下依赖：

  * `alibaba dubbo` 用户, `dubbo` 版本换成你的，引入你需要的注册中心依赖，以下是参考。

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

  * `apache dubbo` 用户，`dubbo` 版本换成你的，引入你需要的注册中心依赖，如下是参考。

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


* 重启网关服务。

## dubbo 服务接入网关

可以参考：[shenyu-examples-dubbo](https://github.com/apache/incubator-shenyu/tree/v2.4.0/shenyu-examples/shenyu-examples-dubbo)

* alibaba dubbo 用户

如果是`springboot`构建，引入以下依赖：

```xml
<dependency>
     <groupId>org.apache.shenyu</groupId>
     <artifactId>shenyu-spring-boot-starter-client-alibaba-dubbo</artifactId>
     <version>${shenyu.version}</version>
</dependency>
```


如果是`spring`构建，引入以下依赖：

```xml
<dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-client-alibaba-dubbo</artifactId>
   <version>${shenyu.version}</version>
</dependency>
```

并在你的 `bean` 定义的 `xml` 文件中新增如下 ：

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


* apache dubbo 用户

如果是`springboot`构建，引入以下依赖：

 ```xml
<dependency>
     <groupId>org.apache.shenyu</groupId>
     <artifactId>shenyu-spring-boot-starter-client-apache-dubbo</artifactId>
     <version>${shenyu.version}</version>
</dependency>
 ```

需要在你的 `客户端项目` 定义的 `application.yml` 文件中新增如下：

```yaml
dubbo:
  registry:
    address: dubbo注册中心地址

shenyu:
  register:
    registerType: shenyu服务注册类型 #http #zookeeper #etcd #nacos #consul
    serverLists: shenyu服务注册地址 #http://localhost:9095 #localhost:2181 #http://localhost:2379 #localhost:8848
  client:
    dubbo:
      props:
        contextPath: /你的contextPath
        appName: 你的应用名称
```


如果是`spring`构建，引入以下依赖：

```xml
<dependency>
   <groupId>org.apache.shenyu</groupId>
   <artifactId>shenyu-client-apache-dubbo</artifactId>
   <version>${shenyu.version}</version>
</dependency>
```

需要在你的 `bean` 定义的 `xml` 文件中新增如下 ：

```xml
<bean id = "apacheDubboServiceBeanListener" class="org.apache.shenyu.client.apache.dubbo.ApacheDubboServiceBeanListener">
    <constructor-arg ref="clientPropertiesConfig"/>
    <constructor-arg ref="clientRegisterRepository"/>
</bean>

<!-- 根据实际的注册类型配置注册中心 -->
<bean id="shenyuRegisterCenterConfig" class="org.apache.shenyu.register.common.config.ShenyuRegisterCenterConfig">
    <property name="registerType" value="你的服务注册类型"/>
    <property name="serverLists" value="你的服务注册地址"/>
</bean>

<!-- 客户端属性配置 -->
<bean id="clientPropertiesConfig"
      class="org.apache.shenyu.register.common.config.ShenyuClientConfig.ClientPropertiesConfig">
<property name="props">
  <map>
    <entry key="contextPath" value="/你的contextPath"/>
    <entry key="appName" value="你的应用名字"/>
  </map>
</property>
</bean>

<!-- 根据实际的注册类型配置客户端注册仓库 -->
<bean id="clientRegisterRepository" class="org.apache.shenyu.register.client.http.HttpClientRegisterRepository">
    <constructor-arg ref="shenyuRegisterCenterConfig"/>
</bean>

<bean id="shenyuClientShutdownHook" class="org.apache.shenyu.client.core.shutdown.ShenyuClientShutdownHook">
    <constructor-arg ref="shenyuRegisterCenterConfig"/>
    <constructor-arg ref="clientRegisterRepository"/>
</bean>
```

需要在你的 `客户端项目` 定义的 `application.yml` 文件中新增如下：  

```yaml
dubbo:
  registry:
    address: dubbo注册中心地址
    port: dubbo服务端口号
```

## dubbo 插件设置

* 首先在 `shenyu-admin` 插件管理中，把`dubbo` 插件设置为开启。

* 其次在 `dubbo` 插件中配置你的注册地址，或者其他注册中心的地址。

```yaml
{"register":"zookeeper://localhost:2181"}   or {"register":"nacos://localhost:8848"}
```

## 接口注册到网关

* 在 `dubbo` 服务实现类的方法上加上 `@ShenyuDubboClient` 注解，表示该接口方法注册到网关。

* 启动你的提供者，成功启动后，进入后台管理系统的`插件列表 -> rpc proxy -> dubbo`，会看到自动注册的选择器和规则信息。


## dubbo用户请求及参数说明

可以通过 `http` 的方式来请求你的 `dubbo` 服务。`Apache ShenYu` 网关需要有一个路由前缀，这个路由前缀就是你接入项目进行配置 `contextPath`

> 比如你有一个 order服务 它有一个接口，它的注册路径 /order/test/save
> 现在就是通过 post 方式请求网关：http://localhost:9195/order/test/save
> 其中 localhost:9195 为网关的 ip 端口，默认端口是 9195 ，/order 是你 dubbo 接入网关配置的 contextPath


* 参数传递：

  * 通过 `http`协议， `post` 方式访问网关，通过在`http body`中传入`json`类型参数。

  * 更多参数类型传递，可以参考 [shenyu-examples-dubbo](https://github.com/apache/incubator-shenyu/tree/v2.4.0/shenyu-examples/shenyu-examples-dubbo) 中的接口定义，以及参数传递方式。

* 单个 `java bean`参数类型（默认）

* 多参数类型支持，在网关的`yaml` 配置中新增如下配置：

```yaml
shenyu:
    dubbo:
      parameter: multi
```

* 自定义实现多参数支持:

  * 在你搭建的网关项目中，新增一个类 `MyDubboParamResolveService`，实现 `org.apache.shenyu.web.dubbo.DubboParamResolveService`接口。

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

  * `body` 为 `http` 中 `body` 传的 `json` 字符串。

  * `parameterTypes`: 匹配到的方法参数类型列表，如果有多个，则使用 `,` 分割。

  * `Pair` 中，`left` 为参数类型，`right` 为参数值，这是 `dubbo` 泛化调用的标准

  * 把你的类注册成 `Spring` 的 `bean`，覆盖默认的实现。

 ```java
  @Bean
  public DubboParamResolveService myDubboParamResolveService() {
          return new MyDubboParamResolveService();
  }
 ```

## 服务治理

* 标签路由
  * 请求时在 `header` 中添加 `Dubbo_Tag_Route`，并设置对应的值，之后当前请求就会路由到指定 `tag` 的 `provider`，只对当前请求有效。
* 服务提供者直连
  * 设置 `@ShenyuDubboClient` 注解中的 `url` 属性。
  * 修改 `Admin` 控制台修改元数据内的 `url` 属性。
  * 对所有请求有效。
* 参数验证和自定义异常
  * 指定 `validation = "shenyuValidation"`。
  * 在接口中抛出 `ShenyuException` 时，异常信息会返回，需要注意的是显式抛出 `ShenyuException`。

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

  * 请求参数

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

  * 发送请求

    ```json
    {
        "name": ""
    }
    ```

  * 返回

    ```json
    {
        "code": 500,
        "message": "Internal Server Error",
        "data": "name cannot be empty,age cannot be null"
    }
    ```

  * 当按照要求传递请求参数时，会返回自定义异常的信息

    ```json
    {
        "code": 500,
        "message": "Internal Server Error",
        "data": "Param binding error."
    }
    ```

## Http --> 网关 --> Dubbo Provider

实际上就是把 `http` 请求，转成 `dubbo` 协议，内部使用 `dubbo 泛化`来进行调用。
`dubbo` 服务在接入网关的时候，加上了 `@ShenyuDubboClient` 注解，并设置了 `path` 字段来指定请求路径。
然后在`yml`中配置了 `contextPath`。

假如有一个这样的方法, `contextPath` 配置的是 `/dubbo`。

```java
@Override
@ShenyuDubboClient(path = "/insert", desc = "插入一条数据")
public DubboTest insert(final DubboTest dubboTest) {
    return dubboTest;
}
```

那么请求的路径为：`http://localhost:9195/dubbo/insert`，`localhost:9195`是网关的地址，如果你更改了，这里也要改。

请求参数： `DubboTest` 是一个 `javabean` 对象，有 2 个字段，`id` 与 `name` ，那么我们通过 `body` 中传递这个对象的 `json` 数据就好。

```
{"id": "1234", "name": "XIAO5y"}
```

如果接口中，没有参数，那么`body` 传值为：

```
{}
```

如果接口有很多个参数，请参考上面介绍过的多参数类型支持。

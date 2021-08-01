---
title: Sofa服务接入
keywords: sofa
description: sofa 接入 Apache ShenYu 网关
---

此篇文章是介绍 `sofa` 服务接入到 `Apache ShenYu` 网关，`Apache ShenYu` 网关使用 `sofa` 插件来接入`sofa`服务。

接入前，请正确启动 `shenyu-admin`，并开启`sofa`插件，在网关端和`sofa`服务端引入相关依赖。可以参考前面的 [Sofa快速开始](../quick-start-sofa)。

应用客户端接入的相关配置请参考：[客户端接入配置](../register-center-access)。

数据同步的相关配置请参考：[数据同步配置](../use-data-sync)。

## 在网关中引入 sofa 插件

* 在网关的 `pom.xml` 文件中增加如下依赖：
* `sofa`版本换成你的，引入你需要的注册中心依赖，以下是参考。

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

* 重启网关服务。

## sofa服务接入网关

可以参考：[shenyu-examples-sofa](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-sofa)

如果是`springboot`构建，引入以下依赖：

 ```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-client-sofa</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
 ```



如果是`spring`构建，引入以下依赖：
   
 ```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-client-sofa</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
   ```
并在你的 `bean`定义的`xml`文件中新增如下 ：
  ```xml
        <bean id ="sofaServiceBeanPostProcessor" class ="org.apache.shenyu.client.sofa.SofaServiceBeanPostProcessor">
             <constructor-arg  ref="shenyuRegisterCenterConfig"/>
        </bean>
        <bean id="shenyuRegisterCenterConfig" class="org.apache.shenyu.register.common.config.ShenyuRegisterCenterConfig">
               <property name="registerType" value="http"/>
               <property name="serverList" value="http://localhost:9095"/>
               <property name="props">
                  <map>
                    <entry key="contextPath" value="/你的contextPath"/>
                    <entry key="appName" value="你的名字"/>
                    <entry key="ifFull" value="false"/>
                  </map>
                </property>
        </bean>
   ```

## sofa 插件设置

* 首先在 `shenyu-admin` 插件管理中，把`sofa` 插件设置为开启。

* 其次在 `sofa` 插件中配置你的注册地址或者其他注册中心的地址.

```yaml
{"protocol":"zookeeper","register":"127.0.0.1:2181"}
```

## 接口注册到网关

* 在`sofa`服务的类或者方法上加上 `@ShenyuSofaClient` 注解，表示该类或接口方法注册到网关。

* 启动`sofa`服务提供者，成功注册后，进入后台管理系统的 `插件列表 -> rpc proxy -> sofa`，会看到自动注册的选择器和规则信息。

## sofa用户请求及参数说明

可以通过 `http` 的方式来请求你的 `sofa` 服务。`Apache ShenYu` 网关需要有一个路由前缀，这个路由前缀就是接入网关配置的 `contextPath`。

> 比如你有一个 `order` 服务 它有一个接口，它的注册路径 `/order/test/save`
>
> 现在就是通过 `post` 方式请求网关：http://localhost:9195/order/test/save
>
> 其中 `localhost:9195` 为网关的 `ip` 端口，默认端口是 `9195` ，`/order` 是你`sofa`接入网关配置的 `contextPath`


* 参数传递：

   * 通过 `http`协议， `post` 方式访问网关，通过在`http body`中传入`json`类型参数。
   * 更多参数类型传递，可以参考 [shenyu-examples-sofa](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-sofa) 中的接口定义，以及参数传递方式。

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

  *  `parameterTypes`: 匹配到的方法参数类型列表，如果有多个，则使用`,`分割。

  *  `Pair`中，`left`为参数类型，`right`为参数值，这是`sofa`泛化调用的标准。

  * 把你的类注册成`Spring`的`bean`，覆盖默认的实现。

 ```java
    @Bean
     public SofaParamResolveService mySofaParamResolveService() {
             return new MySofaParamResolveService();
     }
  ```

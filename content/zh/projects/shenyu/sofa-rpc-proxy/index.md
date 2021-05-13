---
title: Sofa 接入网关
keywords: sofa
description: sofa 接入 shenyu 网关
---

## 说明

* 此篇文章是 sofa 用户使用 sofa 插件支持，以及自己的 sofa 服务接入 shenyu 网关的教程。
* 接入前，请正确的启动 `shenyu-admin` 以及[搭建环境](../shenyu-set-up) Ok。

## 引入网关对sofa支持的插件

* 在网关的 `pom.xml` 文件中增加如下依赖：
* sofa版本换成你的，注册中心的jar包换成你的，以下是参考。

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

* 重启网关服务。

## sofa服务接入网关，可以参考：[shenyu-examples-sofa](https://github.com/dromara/shenyu/tree/master/shenyu-examples/shenyu-examples-sofa)

 * springboot

    * 引入以下依赖
 ```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-client-sofa</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
 ```

  * 注册中心详细接入配置请参考：[注册中心接入](../register-center-access)

* spring

   * 引入以下依赖 ：
   
 ```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-client-sofa</artifactId>
            <version>${project.version}</version>
        </dependency>
   ```
   * 在你的 bean定义的xml文件中新增如下 ：
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

* 你sofa服务实现类的，方法上加上 @ShenyuSofaClient 注解，表示该接口方法注册到网关。

* 启动你的提供者，输出日志 `sofa client register success` 大功告成，你的sofa接口已经发布到 shenyu 网关.如果还有不懂的，可以参考 `shenyu-test-sofa`项目。

## sofa用户请求以及参数说明

* 说白了，就是通过http的方式来请求你的sofa服务

* shenyu网关需要有一个路由前缀，这个路由前缀就是你接入项目进行配置 `contextPath`

```yaml
# 比如你有一个 order服务 它有一个接口，它的注册路径 /order/test/save

# 现在就是通过 post方式请求网关：http://localhost:9195/order/test/save

# 其中 localhost:9195 为网关的ip端口，默认端口是9195 ，/order 是你sofa接入网关配置的 contextPath
```

* 参数传递：

   * 通过 http post 方式访问网关，通过body，json类型传递。
   * 更多参数类型传递，可以参考[shenyu-examples-sofa](https://github.com/dromara/shenyu/tree/master/shenyu-examples/shenyu-examples-sofa) 中的接口定义，以及参数传递方式。

* 单个java bean参数类型 （默认）
* 自定义实现多参数支持：
  * 在你搭建的网关项目中，新增一个类 A，实现 `org.apache.shenyu.plugin.api.sofa.SofaParamResolveService`。

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

  * `body`为http中body传的json字符串。

  *  `parameterTypes`: 匹配到的方法参数类型列表，如果有多个，则使用`,`分割。

  *  Pair中，left为参数类型，right为参数值，这是sofa泛化调用的标准。

  * 把你的类注册成Spring的bean，覆盖默认的实现。

 ```java
    @Bean
     public SofaParamResolveService A() {
             return new A();
     }
  ```

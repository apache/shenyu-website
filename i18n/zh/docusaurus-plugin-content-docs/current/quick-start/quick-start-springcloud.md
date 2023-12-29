---
title: Spring Cloud快速开始
description: Spring Cloud快速开始
---

本文档演示如何将`Spring Cloud`服务接入到`Apache ShenYu`网关。您可以直接在工程下找到本文档的[示例代码](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-springcloud) 。

## 环境准备

请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](../deployment/deployment-local) 启动`Apache ShenYu`后台管理系统。

启动成功后，需要在基础配置`->`插件管理中，把`springCloud` 插件设置为开启。

<img src="/img/shenyu/quick-start/springcloud/springCloud-plugin-enable.png" width="60%" height="50%" />


启动网关，如果是通过源码的方式，直接运行`shenyu-bootstrap`中的`ShenyuBootstrapApplication`。

> 注意，在启动前，请确保网关已经引入相关依赖。

引入网关对`Spring Cloud`的代理插件，并添加相关注册中心依赖：

```xml
<!-- apache shenyu springCloud plugin start-->
               <dependency>
                    <groupId>org.apache.shenyu</groupId>
                    <artifactId>shenyu-spring-boot-starter-plugin-springcloud</artifactId>
                    <version>${project.version}</version>
                </dependency>

                <dependency>
                    <groupId>org.springframework.cloud</groupId>
                    <artifactId>spring-cloud-commons</artifactId>
                    <version>2.2.0.RELEASE</version>
                </dependency>

                <dependency>
                    <groupId>org.apache.shenyu</groupId>
                    <artifactId>shenyu-spring-boot-starter-plugin-httpclient</artifactId>
                    <version>${project.version}</version>
                </dependency>
        <!-- springCloud if you config register center is eureka please dependency end-->
                <dependency>
                    <groupId>org.springframework.cloud</groupId>
                    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
                    <version>2.2.0.RELEASE</version>
                </dependency>
        <!-- apache shenyu springCloud plugin end-->

```

`eureka`配置信息如下：

```yml
eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/
  instance:
    prefer-ip-address: true
```

特别注意: 请保证`springCloud`注册中心服务发现配置为开启

* 配置方式

```yml
spring:
  cloud:
    discovery:
      enabled: true
```

* 代码方式

```java
@SpringBootApplication
@EnableDiscoveryClient
public class ShenyuBootstrapApplication {
    
    /**
     * Main Entrance.
     *
     * @param args startup arguments
     */
    public static void main(final String[] args) {
        SpringApplication.run(ShenyuBootstrapApplication.class, args);
    }
}
```

启动`shenyu-bootstrap`项目。

## 运行shenyu-examples-springcloud

示例项目中我们使用 `eureka` 作为 `Spring Cloud`的注册中心。你可以使用本地的`eureka`，也可以使用示例中提供的应用。

下载 [shenyu-examples-eureka](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-eureka) 、[shenyu-examples-springcloud](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-springcloud) .

启动`eureka`服务，运行`org.apache.shenyu.examples.eureka.EurekaServerApplication`main方法启动项目。

启动`spring cloud`服务，运行`org.apache.shenyu.examples.springcloud.ShenyuTestSpringCloudApplication`main方法启动项目。

从`2.4.3`开始，用户可以不配置`shenyu.client.springCloud.props.port`。

成功启动会有如下日志：

```shell
2021-02-10 14:03:51.301  INFO 2860 --- [           main] o.s.s.concurrent.ThreadPoolTaskExecutor  : Initializing ExecutorService 'applicationTaskExecutor'
2021-02-10 14:03:51.669  INFO 2860 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : springCloud client register success: {"appName":"springCloud-test","context":"/springcloud","path":"/springcloud/order/save","pathDesc":"","rpcType":"springCloud","ruleName":"/springcloud/order/save","enabled":true} 
2021-02-10 14:03:51.676  INFO 2860 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : springCloud client register success: {"appName":"springCloud-test","context":"/springcloud","path":"/springcloud/order/path/**","pathDesc":"","rpcType":"springCloud","ruleName":"/springcloud/order/path/**","enabled":true} 
2021-02-10 14:03:51.682  INFO 2860 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : springCloud client register success: {"appName":"springCloud-test","context":"/springcloud","path":"/springcloud/order/findById","pathDesc":"","rpcType":"springCloud","ruleName":"/springcloud/order/findById","enabled":true} 
2021-02-10 14:03:51.688  INFO 2860 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : springCloud client register success: {"appName":"springCloud-test","context":"/springcloud","path":"/springcloud/order/path/**/name","pathDesc":"","rpcType":"springCloud","ruleName":"/springcloud/order/path/**/name","enabled":true} 
2021-02-10 14:03:51.692  INFO 2860 --- [pool-1-thread-1] o.d.s.client.common.utils.RegisterUtils  : springCloud client register success: {"appName":"springCloud-test","context":"/springcloud","path":"/springcloud/test/**","pathDesc":"","rpcType":"springCloud","ruleName":"/springcloud/test/**","enabled":true} 
2021-02-10 14:03:52.806  WARN 2860 --- [           main] ockingLoadBalancerClientRibbonWarnLogger : You already have RibbonLoadBalancerClient on your classpath. It will be used by default. As Spring Cloud Ribbon is in maintenance mode. We recommend switching to BlockingLoadBalancerClient instead. In order to use it, set the value of `spring.cloud.loadbalancer.ribbon.enabled` to `false` or remove spring-cloud-starter-netflix-ribbon from your project.
2021-02-10 14:03:52.848  WARN 2860 --- [           main] iguration$LoadBalancerCaffeineWarnLogger : Spring Cloud LoadBalancer is currently working with default default cache. You can switch to using Caffeine cache, by adding it to the classpath.
2021-02-10 14:03:52.921  INFO 2860 --- [           main] o.s.c.n.eureka.InstanceInfoFactory       : Setting initial instance status as: STARTING
2021-02-10 14:03:52.949  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Initializing Eureka in region us-east-1
2021-02-10 14:03:53.006  INFO 2860 --- [           main] c.n.d.provider.DiscoveryJerseyProvider   : Using JSON encoding codec LegacyJacksonJson
2021-02-10 14:03:53.006  INFO 2860 --- [           main] c.n.d.provider.DiscoveryJerseyProvider   : Using JSON decoding codec LegacyJacksonJson
2021-02-10 14:03:53.110  INFO 2860 --- [           main] c.n.d.provider.DiscoveryJerseyProvider   : Using XML encoding codec XStreamXml
2021-02-10 14:03:53.110  INFO 2860 --- [           main] c.n.d.provider.DiscoveryJerseyProvider   : Using XML decoding codec XStreamXml
2021-02-10 14:03:53.263  INFO 2860 --- [           main] c.n.d.s.r.aws.ConfigClusterResolver      : Resolving eureka endpoints via configuration
2021-02-10 14:03:53.546  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Disable delta property : false
2021-02-10 14:03:53.546  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Single vip registry refresh property : null
2021-02-10 14:03:53.547  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Force full registry fetch : false
2021-02-10 14:03:53.547  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Application is null : false
2021-02-10 14:03:53.547  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Registered Applications size is zero : true
2021-02-10 14:03:53.547  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Application version is -1: true
2021-02-10 14:03:53.547  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Getting all instance registry info from the eureka server
2021-02-10 14:03:53.754  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : The response status is 200
2021-02-10 14:03:53.756  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Starting heartbeat executor: renew interval is: 30
2021-02-10 14:03:53.758  INFO 2860 --- [           main] c.n.discovery.InstanceInfoReplicator     : InstanceInfoReplicator onDemand update allowed rate per min is 4
2021-02-10 14:03:53.761  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Discovery Client initialized at timestamp 1612937033760 with initial instances count: 0
2021-02-10 14:03:53.762  INFO 2860 --- [           main] o.s.c.n.e.s.EurekaServiceRegistry        : Registering application SPRINGCLOUD-TEST with eureka with status UP
2021-02-10 14:03:53.763  INFO 2860 --- [           main] com.netflix.discovery.DiscoveryClient    : Saw local status change event StatusChangeEvent [timestamp=1612937033763, current=UP, previous=STARTING]
2021-02-10 14:03:53.765  INFO 2860 --- [nfoReplicator-0] com.netflix.discovery.DiscoveryClient    : DiscoveryClient_SPRINGCLOUD-TEST/host.docker.internal:springCloud-test:8884: registering service...
2021-02-10 14:03:53.805  INFO 2860 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8884 (http) with context path ''
2021-02-10 14:03:53.807  INFO 2860 --- [           main] .s.c.n.e.s.EurekaAutoServiceRegistration : Updating port to 8884
2021-02-10 14:03:53.837  INFO 2860 --- [nfoReplicator-0] com.netflix.discovery.DiscoveryClient    : DiscoveryClient_SPRINGCLOUD-TEST/host.docker.internal:springCloud-test:8884 - registration status: 204
2021-02-10 14:03:54.231  INFO 2860 --- [           main] o.d.s.e.s.ShenyuTestSpringCloudApplication : Started ShenyuTestSpringCloudApplication in 6.338 seconds (JVM running for 7.361) 
```


## 测试Http请求

`shenyu-examples-springcloud`项目成功启动之后会自动把加 `@ShenyuSpringCloudClient` 注解的接口方法注册到网关。

打开`插件列表 -> rpc proxy -> springCloud` 可以看到插件规则配置列表：


![](/img/shenyu/quick-start/springcloud/rule-list.png)

下面使用`postman`模拟`http`的方式来请求你的`SpringCloud`服务：

![](/img/shenyu/quick-start/springcloud/postman-test.png)

使用 `IDEA HTTP Client` 插件模拟`http`的方式来请求你的`SpringCloud`服务[本地访问，不使用`shenyu`代理]:

![](/img/shenyu/quick-start/springcloud/idea-http-test-local.png)

使用 `IDEA HTTP Client` 插件模拟`http`的方式来请求你的`SpringCloud`服务[使用`shenyu`代理]:

![](/img/shenyu/quick-start/springcloud/idea-http-test-proxy.png)

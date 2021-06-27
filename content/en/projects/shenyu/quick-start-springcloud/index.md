---
title: Quick start with SpringCloud
description: Quick start with SpringCloud
---

This document introduces how to quickly access the ShenYu Gateway using SpringCloud. You can get the code example of this document by clicking [here](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-springcloud).

## Environment to prepare

Please refer to the [setup](../shenyu-set-up) and launch `shenyu-admin` and `shenyu-bootstrap`.

* Add the following dependencies to the `shenyu-bootstrap`'s `pom.xml` file:

```xml
<!--shenyu springCloud plugin start-->
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
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
    <version>2.2.0.RELEASE</version>
</dependency>

<!-- If using Eureka as a registry needs to be introduced -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    <version>2.2.0.RELEASE</version>
</dependency>

<!--shenyu springCloud plugin start end-->
```

Startup the `shenyu-bootstrap` project

## Run the shenyu-examples-springcloud and shenyu-examples-eureka project

In the example project we use `eureka` as the SpringCloud registry

Download [shenyu-examples-eureka](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-eureka) and [shenyu-examples-springcloud](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-springcloud)

1. Startup the Eureka service

Execute the `org.apache.shenyu.examples.eureka.EurekaServerApplication` main method to start project.

2. Startup the Spring Cloud service

Execute the `org.apache.shenyu.examples.springcloud.ShenyuTestSpringCloudApplication` main method to start project.

The following log appears when the startup is successful:
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

## Enable the springCloud plugin

* enabled the `springCloud` plugin in the `shenyu-admin` plugin management.

## Testing http request

The `shenyu-examples-springcloud` project will automatically register interface methods annotated with `@ShenyuSpringCloudClient` in the shenyu gateway after successful startup.

Open Plugin Management -> springcloud to see the list of plugin rule configurations

![](/img/shenyu/quick-start/springcloud/rule-list.png)

Use PostMan to simulate HTTP to request your SpringCloud service

![](/img/shenyu/quick-start/springcloud/postman-test.png)

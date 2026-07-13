---
title: Quick start with Spring Cloud
description: Quick start with SpringCloud
---

This document introduces how to quickly access the Apache ShenYu gateway using Spring Cloud. You can get the code example of this document by clicking [here](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-springcloud) .

## Environment to prepare


Please refer to the operation and maintenance deployment content and choose a way to start `shenyu-admin`. For example, start the `Apache ShenYu` backend management system through [local deployment](../deployment/deployment-local).

To start the gateway, if it is through source code, directly run `ShenyuBootstrapApplication` in `shenyu-bootstrap`.

## Startup sequence

- Start `shenyu-admin`
- Start `shenyu-bootstrap`
- Start the registration center, such as the `eureka` project under `shenyu-examples`
- Configure `shenyu-examples-springcloud` registration discovery

```yaml
shenyu:
  discovery:
    enable: true
    type: eureka
    serverList: ${eureka.client.serviceUrl.defaultZone}
    registerPath: ${spring.application.name}
    props:
      nacosNameSpace: ShenyuRegisterCenter
```

## Run `shenyu-examples-springcloud`

## Configure the registration center related information on the admin side

- Currently, the SpringCloudPlugin plugin on Shenyu implements support for service discovery of the registry center. However, it is not possible to dynamically switch the registry center. In order to allow users to use the plugin more clearly and switch the configuration of the registry center more conveniently, shenyu supports developers to configure and switch the registry center on the admin page, thereby reducing the user's usage cost and experience.

Specific operation process:

- Start shenyu-admin
- Start shenyu-bootstrap
- Start the registry center, such as the eureka project under shenyu-examples
- Start shenyu-examples-springcloud under shenyu-examples
- Configure the relevant information of the registry center on the admin system interface and click Confirm

Take the eureka registry center configuration as an example to show how to configure the relevant information of the registry center on the page:

<img src="/img/shenyu/quick-start/springcloud/springCloud-dynamic-register-operate-en.png" width="60%" height="50%" />

As shown in the figure above, registerType indicates the type of registration center, and the following registration centers are supported:

- eureka
- nacos
- zookeeper
- apollo
- consul
- etcd
- polaris
- kubernetes

serverLists indicates the IP address of the registration center, and props is the additional configuration items for the registration center, such as namespace, username, etc. After clicking OK, eureka is used as the registration center of springCloudPlugin.

## Run the shenyu-examples-springcloud project

In the example project we used `Eureka` as the registry for `Spring Cloud`. You can use the local `Eureka` or the application provided in the example.

Download [shenyu-examples-eureka](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-eureka) 、[shenyu-examples-springcloud](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-springcloud) .

Startup the Eureka service:
Execute the `org.apache.shenyu.examples.eureka.EurekaServerApplication` main method to start project.

Startup the Spring Cloud service:
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

- After starting `shenyu-examples-springcloud`
- You can see the newly registered data on the `divide` plugin of the admin system

## Test

The `shenyu-examples-springcloud` project will automatically register interface methods annotated with `@ShenyuSpringMvcClient` in the Apache ShenYu gateway after successful startup.

![](/img/shenyu/quick-start/springcloud/rule-list.png)

Use PostMan to simulate HTTP to request your SpringCloud service:

![](/img/shenyu/quick-start/springcloud/postman-test.png)

Use IDEA HTTP Client Plugin to simulate HTTP to request your SpringCloud service[local:no Shenyu proxy]:

![](/img/shenyu/quick-start/springcloud/idea-http-test-local.png)

Use IDEA HTTP Client Plugin to simulate HTTP to request your SpringCloud service[Shenyu proxy]:

![](/img/shenyu/quick-start/springcloud/idea-http-test-proxy.png)

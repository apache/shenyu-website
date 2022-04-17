---
title: Application Client Access Config
keywords: ["register center"]
description: register center access
---


Application client access means to access your microservice to ShenYu gateway, currently supports HTTP, Dubbo, Spring Cloud, gRPC, Motan, Sofa, Tars and other protocols access.

Connecting the application client to ShenYu gateway is realized through the registration center, which involves the registration of the client and the synchronization of the server data. The registry supports HTTP, ZooKeeper, Etcd, Consul, and Nacos.

This article describes how to configure the application client to access the Apache ShenYu gateway. For related principles, see [Application Client Access](../design/register-center-design) in the design document .

<img src="/img/shenyu/register/app-client-access-config-en.png" width="70%" height="60%" />


### Http Registry Config

#### shenyu-admin config

Set the register type to '`Http` in the `yml` file. The configuration information is as follows:

```yaml
shenyu:
  register:
    registerType: http
    props:
      	checked: true  # is checked
      	zombieCheckTimes: 5 # how many times does it fail to detect the service
      	scheduledTime: 10 # timed detection interval time
```

<img src="/img/shenyu/register/register-http-admin-yml.png" width="70%" height="60%" />


#### shenyu-client config

The following shows the configuration information registered through `Http` when the `Http` service accesses the `Apache ShenYu` gateway as a client. Other clients (such as `Dubbo` and `Spring Cloud`) can be configured in the same way.

```yaml
shenyu:
  register:
    registerType: http
    serverLists: http://localhost:9095
  client:
    http:
    	props:
      		contextPath: /http
      		appName: http
      		port: 8188  
      		isFull: false
# registerType : register type, set http
# serverList: when register type is http，set shenyu-admin address list，pls note 'http://' is necessary.
# port: your project port number; apply to springmvc/tars/grpc
# contextPath: your project's route prefix through shenyu gateway, such as /order ，/product etc，gateway will route based on it.
# appName：your project name,the default value is`spring.application.name`.
# isFull: set true means providing proxy for your entire service, or only a few controller. apply to springmvc/springcloud
```


<img src="/img/shenyu/register/register-http-client-yml.png" width="70%" height="60%" />



### Zookeeper Registry Config

#### shenyu-admin config

First add the related dependencies to the `pom` file (already added by default) :

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-server-zookeeper</artifactId>
            <version>${project.version}</version>
        </dependency>
```

<img src="/img/shenyu/register/register-zk-admin-pom.png" width="70%" height="60%" />


* In the `yml` file, set the register type to `zookeeper` and enter the service address and parameters of `zookeeper`. The configuration information is as follows:

```yaml
shenyu:
  register:
    registerType: zookeeper
    serverLists: localhost:2181
    props:
      sessionTimeout: 5000
      connectionTimeout: 2000
```

<img src="/img/shenyu/register/register-zk-admin-yml.png" width="70%" height="60%" />


#### shenyu-client config

The following shows the configuration information registered by `zookeeper` when the `Http` service accesses the `Apache ShenYu` gateway as a client. Other clients (such as `Dubbo` and `Spring Cloud`) can be configured in the same way.


* First add dependencies to the `pom` file:


```xml
        <!-- apache shenyu zookeeper register center -->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-server-zookeeper</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
```

<img src="/img/shenyu/register/register-zk-client-pom.png" width="70%" height="60%" />

* Then set the register type to `zookeeper` in `yml` and enter the service address and related parameters as follows:

```yaml
shenyu:
  register:
    registerType: zookeeper
    serverLists: localhost:2181
  client:
    http:
    	props:
      		contextPath: /http
      		appName: http
      		port: 8189  
      		isFull: false
# registerType : register type, set zookeeper
# serverList: when register type is zookeeper，set zookeeper address list
# port: your project port number; apply to springmvc/tars/grpc
# contextPath: your project's route prefix through shenyu gateway, such as /order ，/product etc，gateway will route based on it.
# appName：your project name,the default value is`spring.application.name`.
# isFull: set true means providing proxy for your entire service, or only a few controller. apply to springmvc/springcloud
```

<img src="/img/shenyu/register/register-zk-client-yml.png" width="70%" height="60%" />


### Etcd Registry Config

#### shenyu-admin config

First add the related dependencies to the `pom` file (already added by default) :

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-server-etcd</artifactId>
            <version>${project.version}</version>
        </dependency>
```

<img src="/img/shenyu/register/register-etcd-admin-pom.png" width="70%" height="60%" />


* Then set register type to `etcd` in `yml` and enter `etcd` service address and parameters. The configuration information is as follows:


```yaml
shenyu:
  register:
    registerType: etcd
    serverLists : http://localhost:2379
    props:
      etcdTimeout: 5000
      etcdTTL: 5
```

<img src="/img/shenyu/register/register-etcd-admin-yml.png" width="70%" height="60%" />

#### shenyu-client config

The following shows the configuration information registered by `Etcd` when the `Http` service accesses the `Apache ShenYu` gateway as a client. Other clients (such as `Dubbo` and `Spring Cloud`) can be configured in the same way.


* First add dependencies to the `pom` file:


```xml
        <!-- apache shenyu etcd register center -->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-server-etcd</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
```

<img src="/img/shenyu/register/register-etcd-client-pom.png" width="70%" height="60%" />


* Then set the register type to `etcd` in `yml` and enter the `etcd` service address and related parameters as follows:

```yaml
shenyu:
  register:
    registerType: etcd 
    serverLists: http://localhost:2379
  client:
    http:
    	props:
      		contextPath: /http
      		appName: http
      		port: 8189  
      		isFull: false
# registerType : register type, set etcd 
# serverList: when register type is etcd, add etcd address list
# port: your project port number; apply to springmvc/tars/grpc
# contextPath: your project's route prefix through shenyu gateway, such as /order ，/product etc，gateway will route based on it.
# appName：your project name,the default value is`spring.application.name`.
# isFull: set true means providing proxy for your entire service, or only a few controller. apply to springmvc/springcloud
```


<img src="/img/shenyu/register/register-etcd-client-yml.png" width="70%" height="60%" />


### Consul Registry Config

#### shenyu-admin config

First add the related dependencies to the `pom` file :

```xml
        <!-- apache shenyu consul register start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-server-consul</artifactId>
            <version>${project.version}</version>
        </dependency>

        <!-- apache shenyu consul register start -->
        <dependency>
            <groupId>com.ecwid.consul</groupId>
            <artifactId>consul-api</artifactId>
            <version>${consul.api.version}</version>
        </dependency>
        <!-- apache shenyu consul register end-->

```



* In the `yml` file to configure the registry as `consul`, the unique configuration of consul is configured under the props node, the configuration information is as follows:


```yaml
shenyu:
  register:
    registerType: consul
    serverLists: localhost:8500
    props:
      delay: 1
      wait-time: 55
      name: shenyuAdmin
      instanceId: shenyuAdmin
      hostName: localhost
      port: 8500
      tags: test1,test2
      preferAgentAddress: false
      enableTagOverride: false

# registerType : register type, set consul.
# serverLists: consul client agent address (sidecar deployment (single machine or cluster), or the address of consul server agent (only one node of consul server agent can be connected, if it is a cluster, then there will be a single point of failure))
# delay: The interval of each polling of monitoring metadata, in seconds, the default value is 1 second.
# wait-time: The waiting time for each polling of metadata monitoring, in seconds, the default value is 55 second.
# instanceId: Required, Consul needs to find specific services through instanceId.
# name: The name where the service is registered to consul. 
# hostName: When registering the type for consul, fill in the address of the registered service instance. The service instance address registered in the registry will not be used for client calls, so this configuration does not need to be filled in. Port and preferAgentAddress are the same.
# port: When registering the type for consul, fill in the port of the registered service instance.
# tags: Corresponding to the tags configuration in the consul configuration
# preferAgentAddress：Using the address corresponding to the agent on the consul client side as the address of the registered service instance will override the manual configuration of hostName
# enableTagOverride：Corresponding to the enableTagOverride configuration in the consul configuration

```


#### shenyu-client config

Register configuration information through the `Consul` method (the registry of the springCloud service itself can be selected at will, and there will be no conflict with the registry selected by shenyu, eureka is used in the example).


* First add dependencies to the `pom` file:

```xml
<!-- apache shenyu consul register center -->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-register-client-consul</artifactId>
    <version>${shenyu.version}</version>
</dependency>
```


* Then set the register type to `consul` in `yml` and config `shenyu.register.props`, and related parameters as follows:

```yaml
shenyu:
  register:
  registerType: consul
  serverLists: localhost:8500
  props:
    name: shenyuSpringCloudExample
    instanceId: shenyuSpringCloudExample
    hostName: localhost
    port: 8500
    tags: test1,test2
    preferAgentAddress: false
    enableTagOverride: false
client:
  springCloud:
    props:
      contextPath: /springcloud
      port: 8884
# registerType : register type, set consul.
# serverLists: consul client agent address (sidecar deployment (single machine or cluster), or the address of consul server agent (only one node of consul server agent can be connected, if it is a cluster, then there will be a single point of failure))
# delay: The interval of each polling of monitoring metadata, in seconds, the default value is 1 second.
# wait-time: The waiting time for each polling of metadata monitoring, in seconds, the default value is 55 second.
# instanceId: Required, Consul needs to find specific services through instanceId.
# name: The name where the service is registered to consul. 
# hostName: When registering the type for consul, fill in the address of the registered service instance. The service instance address registered in the registry will not be used for client calls, so this configuration does not need to be filled in. Port and preferAgentAddress are the same.
# port: When registering the type for consul, fill in the port of the registered service instance.
# tags: Corresponding to the tags configuration in the consul configuration
# preferAgentAddress：Using the address corresponding to the agent on the consul client side as the address of the registered service instance will override the manual configuration of hostName
# enableTagOverride：Corresponding to the enableTagOverride configuration in the consul configuration
```



### Nacos Registry Config

#### shenyu-admin config

First add the related dependencies to the `pom` file (already added by default) :

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-server-nacos</artifactId>
            <version>${project.version}</version>
        </dependency>
```

<img src="/img/shenyu/register/register-nacos-admin-pom.png" width="70%" height="60%" />


* Then in the `yml` file, configure the registry as `nacos`, fill in the related `nacos` service address and parameters, and `nacos` namespace (need to be consistent with `shenyu-client`), the configuration information is as follows:


```yaml
shenyu:
  register:
    registerType: nacos
    serverLists : localhost:8848
    props:
      nacosNameSpace: ShenyuRegisterCenter
```

<img src="/img/shenyu/register/register-nacos-admin-yml.png" width="70%" height="60%" />


#### shenyu-client config

The following shows the configuration information registered by `Nacos` when the `Http` service accesses the `Apache ShenYu` gateway as a client. Other clients (such as `Dubbo` and `Spring Cloud`) can be configured in the same way.


* First add dependencies to the `pom` file:

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-client-nacos</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
```

<img src="/img/shenyu/register/register-nacos-client-pom.png" width="70%" height="60%" />


* Then in `yml` configure registration mode as `nacos`, and fill in `nacos` service address and related parameters, also need `nacos` namespace (need to be consistent with `shenyu-admin`), IP (optional, then automatically obtain the local IP address) and port, configuration information is as follows:

```yaml
shenyu:
  register:
    registerType: nacos
    serverLists: localhost:8848
    props:
      nacosNameSpace: ShenyuRegisterCenter
  client:
    http:
    	props:
      		contextPath: /http
      		appName: http
      		port: 8188  
      		isFull: false
# registerType : register type, set nacos 
# serverList: when register type is nacos, add nacos address list
# port: your project port number; apply to springmvc/tars/grpc
# contextPath: your project's route prefix through shenyu gateway, such as /order ，/product etc，gateway will route based on it.
# appName：your project name,the default value is`spring.application.name`.
# isFull: set true means providing proxy for your entire service, or only a few controller. apply to springmvc/springcloud
# nacosNameSpace: nacos namespace
```

<img src="/img/shenyu/register/register-nacos-client-yml.png" width="70%" height="60%" />

### Register different type API at same time

> follow example use the http and dubbo.

the `yml` configuration like follow:

```yaml
shenyu:
  register:
    registerType: nacos
    serverLists: localhost:8848
  client:
    http:
    	props:
      		contextPath: /http
      		appName: http
      		port: 8188  
      		isFull: false
    dubbo:
    	props:
      		contextPath: /dubbo
      		appName: dubbo
      		port: 28080
    props:
      nacosNameSpace: ShenyuRegisterCenter
# registerType : register type, set nacos 
# serverList: when register type is nacos, add nacos address list
# http.port: your project port number; apply to springmvc
# http.contextPath: your project's route prefix through shenyu gateway, such as /order ，/product etc，gateway will route based on it.
# http.appName：your project name,the default value is`spring.application.name`.
# http.isFull: set true means providing proxy for your entire service, or only a few controller. apply to springmvc/springcloud
# dubbo.contextPath: your project dubbo service's context path
# dubbo.port: your project dubbo rpc port
# dubbo.appName: your project dubbo appliation name
# nacosNameSpace: nacos namespace
```



In conclusion, this paper mainly describes how to connect your microservices (currently supporting `Http`, `Dubbo`, `Spring Cloud`, `gRPC`, `Motan`, `Sofa`, `Tars` and other protocols) to the `Apache ShenYu` gateway. the Apache ShenYu gateway support registry has `Http`, `Zookeeper`, `Etcd`, `Consul`, `Nacos` and so on. This paper introduces the different ways to register configuration information when `Http` service is used as the client to access `Apache ShenYu` gateway.


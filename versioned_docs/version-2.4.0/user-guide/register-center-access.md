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

Set the register type to `http` in the `yml` file. The configuration information is as follows:

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
  client:
    registerType: http
    serverLists: http://localhost:9095
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
            <artifactId>shenyu-register-client-zookeeper</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
```

<img src="/img/shenyu/register/client_register_zk_pom.png" width="70%" height="60%" />

* Then set the register type to `zookeeper` in `yml` and enter the service address and related parameters as follows:

```yaml
shenyu:
  client:
    registerType: zookeeper
    serverLists: localhost:2181
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
```

<img src="/img/shenyu/register/register-etcd-admin-yml.png" width="70%" height="60%" />

#### shenyu-client config

The following shows the configuration information registered by `Etcd` when the `Http` service accesses the `Apache ShenYu` gateway as a client. Other clients (such as `Dubbo` and `Spring Cloud`) can be configured in the same way.


* First add dependencies to the `pom` file:


```xml
        <!-- apache shenyu etcd register center -->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-client-etcd</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
```

<img src="/img/shenyu/register/client_register_etcd_pom.png" width="70%" height="60%" />


* Then set the register type to `etcd` in `yml` and enter the `etcd` service address and related parameters as follows:

```yaml
shenyu:
  client:
    registerType: etcd 
    serverLists: http://localhost:2379
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

        <!--spring-cloud-starter-consul-discovery need add by yourself, suggest use 2.2.6.RELEASE version, other version maybe can't work-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-consul-discovery</artifactId>
            <version>2.2.6.RELEASE</version>
        </dependency>
        <!-- apache shenyu consul register end-->

```

<img src="/img/shenyu/register/register-consul-admin-pom.png" width="70%" height="60%" />

* In the `yml` file to configure the registry as `consul`, you also need to configure `spring.cloud.consul`, the configuration information is as follows:


```yaml
shenyu:
  register:
    registerType: consul
    props:
      delay: 1
      wait-time: 55

spring:
  cloud:
    consul:
      discovery:
        instance-id: shenyu-admin-1
        service-name: shenyu-admin
        tags-as-metadata: false
      host: localhost
      port: 8500

# registerType : register type, set consul.
# delay: The interval of each polling of monitoring metadata, in seconds, the default value is 1 second.
# wait-time: The waiting time for each polling of metadata monitoring, in seconds, the default value is 55 second.
# instance-id: Required, Consul needs to find specific services through instance-id.
# service-name: The name where the service is registered to consul. If not configured, the value of `spring.application.name` will be taken by default.
# host: Consul server host, the default value is localhost.
# port: Consul server port, the default value is 8500.
# tags-as-metadata: false, Required, This option must be set to false, otherwise the URI information will not be found, will cause to selector and upstream cache unable to update.

```

<img src="/img/shenyu/register/register-consul-admin-yml.png" width="70%" height="60%" />


#### shenyu-client config

> Note that the `consul` registry is currently incompatible with the `Spring Cloud` service and will conflict with the `Eureka/Nacos` registry.


The following shows the configuration information registered by `Consul` when the `Http` service accesses the `Apache ShenYu` gateway as a client. Other clients (such as `Dubbo` and `Spring Cloud`) can be configured in the same way.


* First add dependencies to the `pom` file:

```xml
        <!-- apache shenyu consul register center -->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-client-consul</artifactId>
            <version>${shenyu.version}</version>
        </dependency>

        <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-starter-consul-discovery</artifactId>
           <version>2.2.6.RELEASE</version>
        </dependency>
```

<img src="/img/shenyu/register/client_register_consul_pom.png" width="70%" height="60%" />


* Then set the register type to `consul` in `yml` and config `spring.cloud.consul`, and related parameters as follows:

```yaml
shenyu:
  client:
    registerType: consul 
    props:
      contextPath: /http
      appName: http
      port: 8188  
      isFull: false

spring:
  cloud:
    consul:
      discovery:
        instance-id: shenyu-http-1
        service-name: shenyu-http
      host: localhost
      port: 8500
# registerType : register type, set consul.
# port: your project port number; apply to springmvc/tars/grpc
# contextPath: your project's route prefix through shenyu gateway, such as /order ，/product etc，gateway will route based on it.
# appName：your project name,the default value is`spring.application.name`.
# isFull: set true means providing proxy for your entire service, or only a few controller. apply to springmvc
# instance-id: Required, Consul needs to find specific services through instance-id.
# service-name: The name where the service is registered to consul. If not configured, the value of `spring.application.name` will be taken by default.
# host: Consul server host, the default value is localhost.
# port: Consul server port, the default value is 8500.
```

<img src="/img/shenyu/register/register-consul-client-yml.png" width="70%" height="60%" />




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

<img src="/img/shenyu/register/client_register_nacos_pom.png" width="70%" height="60%" />


* Then in `yml` configure registration mode as `nacos`, and fill in `nacos` service address and related parameters, also need `nacos` namespace (need to be consistent with `shenyu-admin`), IP (optional, then automatically obtain the local IP address) and port, configuration information is as follows:

```yaml
shenyu:
  client:
    registerType: nacos
    serverLists: localhost:8848
    props:
      contextPath: /http
      appName: http
      port: 8188  
      isFull: false
      nacosNameSpace: ShenyuRegisterCenter
# registerType : register type, set nacos 
# serverList: when register type is nacos, add nacos address list
# port: your project port number; apply to springmvc/tars/grpc
# contextPath: your project's route prefix through shenyu gateway, such as /order ，/product etc，gateway will route based on it.
# appName：your project name,the default value is`spring.application.name`.
# isFull: set true means providing proxy for your entire service, or only a few controller. apply to springmvc/springcloud
# nacosNameSpace: nacos namespace
``` 

<img src="/img/shenyu/register/register-nacos-client-yml.png" width="70%" height="60%" />

In conclusion, this paper mainly describes how to connect your microservices (currently supporting `Http`, `Dubbo`, `Spring Cloud`, `gRPC`, `Motan`, `Sofa`, `Tars` and other protocols) to the `Apache ShenYu` gateway. the Apache ShenYu gateway support registry has `Http`, `Zookeeper`, `Etcd`, `Consul`, `Nacos` and so on. This paper introduces the different ways to register configuration information when `Http` service is used as the client to access `Apache ShenYu` gateway.


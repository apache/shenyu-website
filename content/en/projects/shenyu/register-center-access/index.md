---
title: Register Center Access
keywords: shenyu
description: register center access
---

## Explain

Explain register center access config

## HTTP Registry

#### Shenyu-Admin 

* Set the config in application.yml

```yaml
shenyu:
  register:
    registerType: http
    props:
      checked: true  # is checked
      zombieCheckTimes: 5 # How many times does it fail to detect the service
      scheduledTime: 10 # Timed detection interval time
```

#### Shenyu-Client

* Set the config in application.yml

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
# serverList: when register type is http，set Shenyu-Admin address list，pls note 'http://' is necessary.
# port: your project port number; apply to springmvc/tars/grpc
# contextPath: your project's route prefix through shenyu gateway, such as /order ，/product etc，gateway will route based on it.
# appName：your project name,the default value is`spring.application.name`.
# isFull: set true means providing proxy for your entire service, or only a few controller. apply to springmvc/springcloud
``` 

## Zookeeper Registry

#### Shenyu-Admin 

* Add dependency in pom.xml (Default has been added):

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>shenyu-register-server-zookeeper</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* Set the config in application.yml

```yaml
shenyu:
  register:
    registerType: zookeeper
    serverLists : localhost:2181
    props:
      sessionTimeout: 5000
      connectionTimeout: 2000
```

#### Shenyu-Client

* Add dependency in pom.xml (Default has been added):

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>shenyu-register-client-zookeeper</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* Set the config in application.yml

```yaml
shenyu:
  client:
    registerType: zookeeper
    serverLists: localhost:2181
    props:
      contextPath: /http
      appName: http
      port: 8188  
      isFull: false
# registerType : register type, set zookeeper
# serverList: when register type is zookeeper，set zookeeper address list
# port: your project port number; apply to springmvc/tars/grpc
# contextPath: your project's route prefix through shenyu gateway, such as /order ，/product etc，gateway will route based on it.
# appName：your project name,the default value is`spring.application.name`.
# isFull: set true means providing proxy for your entire service, or only a few controller. apply to springmvc/springcloud
``` 


## Etcd Registry

#### Shenyu-Admin

* Add dependency in pom.xml (Default has been added):

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>shenyu-register-server-etcd</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* Set the config in application.yml

```yaml
shenyu:
  register:
    registerType: etcd
    serverLists : http://localhost:2379
    props:
      etcdTimeout: 5000
      etcdTTL: 5
```

#### Shenyu-Client

* Add dependency in pom.xml (Default has been added):

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>shenyu-register-client-etcd</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* Set the config in application.yml

```yaml
shenyu:
  client:
    registerType: etcd
    serverLists: http://localhost:2379
    props:
      contextPath: /http
      appName: http
      port: 8188  
      isFull: false
# registerType : register type, set etcd 
# serverList: when register type is etcd, add etcd address list
# port: your project port number; apply to springmvc/tars/grpc
# contextPath: your project's route prefix through shenyu gateway, such as /order ，/product etc，gateway will route based on it.
# appName：your project name,the default value is`spring.application.name`.
# isFull: set true means providing proxy for your entire service, or only a few controller. apply to springmvc/springcloud
``` 

## Consul Registry

#### Shenyu-Admin 

* Add dependency in pom.xml :

```xml
               <!--shenyu-register-server-consul (Default has been added)-->
               <dependency>
                   <groupId>org.dromara</groupId>
                   <artifactId>shenyu-register-server-consul</artifactId>
                   <version>${project.version}</version>
               </dependency>

               <!--spring-cloud-starter-consul-discovery need add by yourself, suggest use 2.2.6.RELEASE version, other version maybe can't work-->
               <dependency>
                   <groupId>org.springframework.cloud</groupId>
                   <artifactId>spring-cloud-starter-consul-discovery</artifactId>
                   <version>2.2.6.RELEASE</version>
               </dependency>
```

* Set the config in application.yml, additional need add spring.cloud.consul：

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

#### Shenyu-Client

**Note, consul registry is not compatible with current and SpringCloud will and Eureka / Nacos registry conflicts** 

* Add dependency in pom.xml (need add by yourself, suggest use 2.2.6.RELEASE version, other version maybe can't work)：

```xml
            <dependency>
               <groupId>org.springframework.cloud</groupId>
               <artifactId>spring-cloud-starter-consul-discovery</artifactId>
               <version>2.2.6.RELEASE</version>
           </dependency>
```

* Set the config in application.yml, additional need add spring.cloud.consul：

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

## Nacos Registry

#### Shenyu-Admin

* Add dependency in pom.xml (Default has been added):

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>shenyu-register-server-nacos</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* Set the config in application.yml

```yaml
shenyu:
  register:
    registerType: nacos
    serverLists : localhost:8848
    props:
      nacosNameSpace: ShenyuRegisterCenter
```

#### Shenyu-Client

* Add dependency in pom.xml (Default has been added):

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>shenyu-register-client-nacos</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* Set the config in application.yml

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
# registerType : register type, set etcd 
# serverList: when register type is etcd, add etcd address list
# port: your project port number; apply to springmvc/tars/grpc
# contextPath: your project's route prefix through shenyu gateway, such as /order ，/product etc，gateway will route based on it.
# appName：your project name,the default value is`spring.application.name`.
# isFull: set true means providing proxy for your entire service, or only a few controller. apply to springmvc/springcloud
# nacosNameSpace: nacos namespace
``` 

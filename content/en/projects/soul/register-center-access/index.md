                               ---
title: register center access
keywords: soul
description: register center access
---

## Explain

Explain register center access config

## HTTP Registry

### Soul-Admin 

* Set the config in application.yml

```yaml
soul:
  register:
    registerType: http
    props:
      checked: true  # is checked
      zombieCheckTimes: 5 # How many times does it fail to detect the service
      scheduledTime: 10 # Timed detection interval time
```

### Soul-Client

* Set the config in application.yml

```yaml
soul:
  client:
    registerType: http
    serverLists: http://localhost:9095
    props:
      contextPath: /http
      appName: http
      port: 8188
      isFull: false
# registerType : register type, set http
# serverList: when register type is http，set Soul-Admin address list，pls note 'http://' is necessary.
# port: your project port number; apply to springmvc/tars/grpc
# contextPath: your project's route prefix through soul gateway, such as /order ，/product etc，gateway will route based on it.
# appName：your project name,the default value is`spring.application.name`.
# isFull: set true means providing proxy for your entire service, or only a few controller. apply to springmvc/springcloud
``` 

## Zookeeper Registry

### Soul-Admin 

* Add dependency in pom.xml (Default has been added):

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>soul-register-server-zookeeper</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* Set the config in application.yml

```yaml
soul:
  register:
    registerType: zookeeper
    serverLists : localhost:2181
    props:
      sessionTimeout: 5000
      connectionTimeout: 2000
```

### Soul-Client

* Add dependency in pom.xml (Default has been added):

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>soul-register-client-zookeeper</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* Set the config in application.yml

```yaml
soul:
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
# contextPath: your project's route prefix through soul gateway, such as /order ，/product etc，gateway will route based on it.
# appName：your project name,the default value is`spring.application.name`.
# isFull: set true means providing proxy for your entire service, or only a few controller. apply to springmvc/springcloud
``` 

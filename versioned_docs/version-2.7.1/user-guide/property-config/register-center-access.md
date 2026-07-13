---
title: Application Client Access Config
keywords: ["register center"]
description: register center access
---

> *Notice*
> After ShenYu version 2.6.1, the ShenYu register just support http type, and the middleware register type has been removed.
> So, please use the http register type to register your service.
> ShenYu Register Center isn't microservice register center, it just register metadata, selector data, rule data to shenyu-admin, and then shenyu-admin will sync data to shenyu-gateway.

Application client access means to access your microservice to ShenYu gateway, currently supports HTTP, Dubbo, Spring Cloud, gRPC, Motan, Sofa, Tars and other protocols access. Currently, ShenYu just support HTTP register type.

This article describes how to configure the application client to access the Apache ShenYu gateway. For related principles, see [Application Client Access](../../design/register-center-design) in the design document .

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
    props:
      username: admin
      password: 123456
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

<img src="/img/shenyu/register/register-http-client-yml.jpg" width="70%" height="60%" />


### Register different type API at same time

> follow example use the http and dubbo.

the `yml` configuration like follow:

```yaml
shenyu:
  register:
    registerType: http
    serverLists: localhost:9195
    props:
      username: admin
      password: 123456
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
# dubbo.appName: your project dubbo application name
# nacosNameSpace: nacos namespace
```

In conclusion, this paper mainly describes how to connect your microservices (currently supporting `Http`, `Dubbo`, `Spring Cloud`, `gRPC`, `Motan`, `Sofa`, `Tars` and other protocols) to the `Apache ShenYu` gateway. the Apache ShenYu gateway support registry has `Http` This paper introduces the different ways to register configuration information when `Http` service is used as the client to access `Apache ShenYu` gateway.


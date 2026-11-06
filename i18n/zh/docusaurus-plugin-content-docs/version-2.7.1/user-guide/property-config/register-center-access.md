---
title: 客户端接入配置
description: 客户端接入配置
---

> *注意*
> 在Apache ShenYu version 2.6.1, ShenYu注册中心只支持http类型，中间件注册类型已经被移除。
> 所以，请使用http注册类型来注册你的服务。
> ShenYu注册中心不是微服务注册中心，它只是将元数据、选择器数据、规则数据注册到shenyu-admin，然后shenyu-admin将数据同步到shenyu-gateway。

应用客户端接入是指将你的微服务接入到`Apache ShenYu`网关，当前支持`Http`、 `Dubbo`、 `Spring Cloud`、 `gRPC`、 `Motan`、 `Sofa`、 `Tars`等协议的接入。


将应用客户端接入到`Apache ShenYu`网关是通过注册中心来实现的，涉及到客户端注册和服务端同步数据。注册类型支持`Http`。


本篇文章介绍将应用客户端接入到`Apache ShenYu`网关，应该如何配置。相关原理请参考设计文档中的 [客户端接入原理](../../design/register-center-design) 。


<img src="/img/shenyu/register/register-center-config-dir-zh.png" width="70%" height="60%" />


### Http方式注册配置

#### shenyu-admin配置

在 `yml`文件中配置注册类型为`http`，配置信息如下：

```yaml
shenyu:
  register:
    enabled: true
    registerType: http
    props:
      checked: true  #是否开启检测
      zombieCheckTimes: 5 #失败几次后剔除服务
      scheduledTime: 10 #定时检测间隔时间 （秒）
```

<img src="/img/shenyu/register/register-http-admin-yml.png" width="70%" height="60%" />


#### shenyu-client配置

下面展示的是`http`服务作为客户端接入到`Apache ShenYu`网关时，通过`Http`方式注册配置信息。其他客户端接入时（`Dubbo`、 `Spring Cloud`等），配置方式同理。

在微服务中的 `yml`文件配置注册方式设置为`http`，并填写`shenyu-admin`服务地址列表，配置信息如下：

```yaml
shenyu:
  register:
    enabled: true
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
# registerType : 服务注册类型，填写 http
# serverList: 为http注册类型时，填写Shenyu-Admin项目的地址，注意加上http://，多个地址用英文逗号分隔
# port: 你本项目的启动端口，目前springmvc/tars/grpc需要进行填写
# contextPath: 为你的这个mvc项目在shenyu网关的路由前缀， 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
# isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller；目前适用于springmvc/springcloud
```


<img src="/img/shenyu/register/register-http-client-yml.jpg" width="70%" height="60%" />

### 同时注册多种服务类型

> 以同时注册http和dubbo服务举例。
在`yml`参考如下配置即可：

```yaml
shenyu:
  register:
    registerType: http
    serverLists: localhost
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
# registerType : 服务注册类型，填写 nacos
# serverList: 为nacos注册类型时，填写nacos地址，多个地址用英文逗号分隔
# http.port: 你本项目的启动Http端口,目前springmvc/SpringCloud需要进行填写
# http.contextPath: 为你的这个mvc项目在shenyu网关的路由前缀，比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# http.appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
# http.isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller；目前适用于springmvc/springcloud
# dubbo.contextPath: 为你的项目中对应dubbo接口的contextPath
# dubbo.port: dubbo服务端口
# dubbo.appName: dubbo应用名称
# nacosNameSpace: nacos的命名空间
```


总结，本文主要介绍了如何将你的微服务（当前支持`Http`、 `Dubbo`、 `Spring Cloud`、 `gRPC`、 `Motan`、 `Sofa`、 `Tars`等协议）接入到`Apache ShenYu`网关。介绍了注册中心的原理，`Apache ShenYu`网关支持的注册中心有`Http`方式。介绍了以`http`服务作为客户端接入到`Apache ShenYu`网关时，使用不同方式注册配置信息。




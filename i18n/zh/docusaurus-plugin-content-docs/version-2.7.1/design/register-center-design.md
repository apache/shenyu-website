---
title: 客户端注册设计
keywords: ["客户端接入"]
description: 客户端接入原理
---

> *注意*
> 在Apache ShenYu version 2.6.1, ShenYu注册中心只支持http类型，中间件注册类型已经被移除。
> 所以，请使用http注册类型来注册你的服务。
> ShenYu注册中心不是微服务注册中心，它只是将元数据、选择器数据、规则数据注册到shenyu-admin，然后shenyu-admin将数据同步到shenyu-gateway。

应用客户端接入是指将你的微服务接入到`Apache ShenYu`网关，当前支持`Http`、 `Dubbo`、 `Spring Cloud`、 `gRPC`、 `Motan`、 `Sofa`、 `Tars`等协议的接入。


将应用客户端接入到`Apache ShenYu`网关是通过注册中心来实现的，涉及到客户端注册和服务端同步数据。注册中心支持`Http`。


<img src="/img/shenyu/register/register-center-dir-zh.png" width="70%" height="60%" />

客户端接入的相关配置请参考用户文档中的 [客户端接入配置](../user-guide/property-config/register-center-access.md) 。


## 设计原理

### 注册中心客户端

![](/img/shenyu/register/client.png)

在你的微服务配置中声明注册中心客户端类型，如`Http`。
应用程序启动时使用`SPI`方式加载并初始化对应注册中心客户端，通过实现`Spring Bean`相关的后置处理器接口，在其中获取需要进行注册的服务接口信息，将获取的信息放入`Disruptor`中。

注册中心客户端从`Disruptor`中读取数据，并将接口信息注册到`shenyu-admin`，`Disruptor`在其中起数据与操作解耦的作用，利于扩展。

### 注册中心服务端

![](/img/shenyu/register/server.png)

在`shenyu-admin`配置中声明注册中心服务端类型，如`Http`。当`shenyu-admin`启动时，读取配置类型，加载并初始化对应的注册中心服务端，注册中心服务端收到`shenyu-client`注册的接口信息后，将其放入`Disruptor`中，然后会触发注册处理逻辑，将服务接口信息更新并发布同步事件。

`Disruptor`在其中起到数据与操作解耦，利于扩展。如果注册请求过多，导致注册异常，也有数据缓冲作用。

### Http注册原理

`Http`服务注册原理较为简单，在`shenyu-client`启动后，会调用`shenyu-admin`的相关服务注册接口，上传数据进行注册。

`shenyu-admin` 收到请求后进行数据更新和数据同步事件发布，将接口信息同步到`Apache ShenYu`网关。


### SPI扩展

| *SPI 名称*                       | *详细说明*               |
| -------------------------------- | --------------------------- |
| ShenyuClientRegisterRepository     | ShenYu网关客户端接入注册服务资源      |

| *已知实现类*                      | *详细说明*               |
| -------------------------------- | --------------------------- |
| HttpClientRegisterRepository     | 基于Http请求的实现 |


| *SPI 名称*                       | *详细说明*                 |
| -------------------------------- | ----------------------------- |
| ShenyuServerRegisterRepository     | ShenYu网关客户端注册的后台服务资源      |

| *已知实现类*                       | *详细说明*                 |
| -------------------------------- | ----------------------------- |
| ShenyuHttpRegistryController       | 使用Http服务接口来处理客户端注册请求        |


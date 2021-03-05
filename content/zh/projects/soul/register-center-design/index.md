---
title: 注册中心设计
keywords: soul
description: 注册中心设计
---

## 说明
* 本篇主要讲解注册中心原理

## 原理分析
注册中心主要是用于服务的动态发现，注册流程图如下：

![register-center](https://github.com/lw1243925457/SE-Notes/blob/master/profession/%E7%BC%96%E7%A8%8B%E7%B1%BB/%E5%BC%80%E6%BA%90/soul/picture/register-center.png)

### Client
启动后使用SPI根据配置的注册方式加载相应的注册中心客户端（HTTP/Zookeeper等）,并初始化distrupt

在Spring容器加载过程中，将需要注册的服务数据放入distrupt中

注册客户端收到注册数据，调用注册逻辑将服务注册到Soul-Admin

distrupt在其中起数据与操作解耦的作用，利于扩展

### Server 
Soul-Admin启动时，使用SPI更加配置的注册中心类型，启动加载相应的注册中心服务端（HTTP/Zookeeper等），并初始化distrupt

注册中心服务端接收到注册请求或者数据，将其放入distrupt中

distrupt消费者受到数据后，调用相应的服务注册处理逻辑

distrupt在其中起到数据与操作解耦，利于扩展；同时比较注册请求过多，导致注册异常，有数据缓冲作用

## Http 注册中心
HTTP服务注册原理较为简单，在Soul-Client启动后，会调用Soul-Admin的相关服务注册接口，上传数据进行注册

Soul-Admin web服务接口收到请求后进行数据更新和数据同步事件发布

## Zookeeper 注册中心
Zookeeper设计的存储结构如下：

```angular2html
/soul/register/metadata/{rpcTyep}/{contextPath}/{contextPath-rule}：存放具体注册数据 MetaDataRegisterDTO

              /uri     /{rpcType}/{contextPath}/{ip:port}:存放服务地址信息 URIRegisterDTO
```

Zookeeper客户端在Soul-Client启动时，将注册的元数据MetaDataRegisterDTO写到zookeeper节点

Soul-Admin会监听配置的节点，依赖于Zookeeper的Watch机制

在收到MetaDataRegisterDTO节点变更后，触发selector和rule的数据变更和数据同步事件发布

收到URIRegisterDTO节点变更后，触发selector的upstream的更新和数据同步事件发布
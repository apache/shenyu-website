                               ---
title: 注册中心接入配置
keywords: soul
description: 注册中心接入配置
---

## 说明

说明然后使用不同的注册方式，快速接入。

## HTTP方式注册

### Soul-Admin配置

在 application.yml 配置注册中心为HTTP即可，如下：

```yaml
soul:
  register:
    registerType: http
    props:
      checked: true  #是否开启检测
      zombieCheckTimes: 5 #失败几次后剔除服务
      scheduledTime: 10 #定时检测间隔时间 （秒）
```

### Soul-Client配置

在 application.yml 中配置注册方式为HTTP，并填写Soul-Admin服务地址列表，如下：

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
# registerType : 服务注册类型，填写 http
# serverList: 为http注册类型时，填写Soul-Admin项目的地址，注意加上http://，多个地址用英文逗号分隔
# port: 你本项目的启动端口，目前springmvc/tars/grpc需要进行填写
# contextPath: 为你的这个mvc项目在soul网关的路由前缀，这个你应该懂意思把？ 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
# isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller；目前适用于springmvc/springcloud
``` 

## Zookeeper方式注册

### Soul-Admin配置

* 首先在 pom.xml 文件中加入相关的依赖（默认已经引入）：

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>soul-register-server-zookeeper</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* 在 application.yml 配置注册中心为Zookeeper，填写相关zookeeper服务地址和参数，如下：

```yaml
soul:
  register:
    registerType: zookeeper
    serverLists : localhost:2181
    props:
      sessionTimeout: 5000
      connectionTimeout: 2000
```

### Soul-Client配置

* 首先在 pom.xml 文件中加入相关的依赖（默认已经引入）：

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>soul-register-client-zookeeper</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* 在 application.yml 中配置注册方式为Zookeeper，并填写Zookeeper服务地址和相关参数，如下：

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
# registerType : 服务注册类型，填写 zookeeper
# serverList: 为zookeeper注册类型时，填写zookeeper地址，多个地址用英文分隔
# port: 你本项目的启动端口,目前springmvc/tars/grpc需要进行填写
# contextPath: 为你的这个mvc项目在soul网关的路由前缀，这个你应该懂意思把？ 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
# isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller；目前适用于springmvc/springcloud
``` 

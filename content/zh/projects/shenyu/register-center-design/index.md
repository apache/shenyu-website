---
title: 注册中心设计
keywords: shenyu
description: 注册中心设计
---

## 设计原理

* 本篇主要讲解注册中心原理及使用

## Client

![](/img/shenyu/register/client.png)

配置中声明使用的注册中心客户端类型，如HTTP/Zookeeper

应用程序启动时使用SPI方式加载并初始化对应注册中心客户端

通过实现Spring Bean相关的后处理器接口，在其中获取需要进行注册的服务接口信息，将获取的信息放入Disruptor中

注册中心客户端从Disruptor中读取数据，并将接口信息注册到Shenyu-Admin

Disruptor在其中起数据与操作解耦的作用，利于扩展

## Server 

![](/img/shenyu/register/server.png)

在Shenyu-Admin配置中声明使用的注册中心服务端类型，如HTTP/Zookeeper

Shenyu-Admin启动时，更加配置的类型，加载并初始化对应的注册中心服务端

注册中心服务端收到Shenyu-Client注册的接口信息后，将其放入Disruptor中，然后会触发注册处理逻辑，将服务接口信息更新并发布同步事件

Disruptor在其中起到数据与操作解耦，利于扩展；同时比较注册请求过多，导致注册异常，有数据缓冲作用

## Http 注册

HTTP服务注册原理较为简单，在Shenyu-Client启动后，会调用Shenyu-Admin的相关服务注册接口，上传数据进行注册

Shenyu-Admin web服务接口收到请求后进行数据更新和数据同步事件发布

## Zookeeper 注册

Zookeeper存储结构如下：

```
shenyu
   ├──regsiter
   ├    ├──metadata
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────${contextPath}
   ├    ├     ├               ├──${ruleName} : save metadata data of MetaDataRegisterDTO
   ├    ├──uri
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────${contextPath}
   ├    ├     ├               ├──${ip:prot} : save uri data of URIRegisterDTO
   ├    ├     ├               ├──${ip:prot}
```

Shenyu-Client启动时，将服务接口信息（MetaDataRegisterDTO/URIRegisterDTO）写到如上的zookeeper节点中。

Shenyu-Admin使用Zookeeper的Watch机制，对数据的更新和删除等事件进行监听，数据变更后触发对应的注册处理逻辑。

在收到MetaDataRegisterDTO节点变更后，触发selector和rule的数据变更和数据同步事件发布。

收到URIRegisterDTO节点变更后，触发selector的upstream的更新和数据同步事件发布。

## Etcd 注册

Etcd的键值存储结构如下：

```
shenyu
   ├──regsiter
   ├    ├──metadata
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────${contextPath}
   ├    ├     ├               ├──${ruleName} : save metadata data of MetaDataRegisterDTO
   ├    ├──uri
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────${contextPath}
   ├    ├     ├               ├──${ip:prot} : save uri data of URIRegisterDTO
   ├    ├     ├               ├──${ip:prot}
```

Shenyu-Client启动时，将服务接口信息（MetaDataRegisterDTO/URIRegisterDTO）以Ephemeral方式写到如上的Etcd节点中。

Shenyu-Admin使用Etcd的Watch机制，对数据的更新和删除等事件进行监听，数据变更后触发对应的注册处理逻辑。

在收到MetaDataRegisterDTO节点变更后，触发selector和rule的数据变更和数据同步事件发布。

收到URIRegisterDTO节点变更后，触发selector的upstream的更新和数据同步事件发布。

## Consul 注册

Consul的Metadata和URI分两部分存储，URIRegisterDTO随着服务注册记录在服务的metadata里，服务下线时随着服务节点一起消失。

![](/img/shenyu/register/Consul-ui.png)

Consul的MetaDataRegisterDTO存在Key/Value里，键值存储结构如下：

```
shenyu
   ├──regsiter
   ├    ├──metadata
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────${contextPath}
   ├    ├     ├               ├──${ruleName} : save metadata data of MetaDataRegisterDTO

```

Shenyu-Client启动时，将服务接口信息（MetaDataRegisterDTO/URIRegisterDTO）分别放在ServiceInstance的Metadata（URIRegisterDTO）和KeyValue（MetaDataRegisterDTO），按照上述方式进行存储。

Shenyu-Admin通过监听Catalog和KeyValue的index的变化，来感知数据的更新和删除，数据变更后触发对应的注册处理逻辑。

在收到MetaDataRegisterDTO节点变更后，触发selector和rule的数据变更和数据同步事件发布。

收到URIRegisterDTO节点变更后，触发selector的upstream的更新和数据同步事件发布。

## Nacos 注册

Nacos分为两部分：URI 和 Metadata。

URI 使用实例注册方式，在服务异常的情况下，相关URI数据节点会自动进行删除，并发送事件到订阅端，订阅端进行相关的下线处理。

Metadata 使用配置注册方式，没有相关上下线操作，当有URI实例注册时，会相应的发布Metadata配置，订阅端监听数据变化，进行更新处理。

URI 实例注册命令规则如下：

```
shenyu.register.service.${rpcType}
```

初始监听所有的RpcType节点，其下的{contextPath}实例会对应注册到其下，根据IP和Port进行区分，并携带其对应的contextPath信息。

URI 实例上下线之后，触发selector的upstream的更新和数据同步事件发布。

URI 实例上线时，会发布对应的 Metadata 数据，其节点名称命令规则如下：

```
shenyu.register.service.${rpcType}.${contextPath}
```

订阅端会对所有的Metadata配置继续监听，当初次订阅和配置更新后，触发selector和rule的数据变更和数据同步事件发布。

## SPI 扩展

| *SPI 名称*                       | *详细说明*               |
| -------------------------------- | --------------------------- |
| ShenyuClientRegisterRepository     | ShenYu网关客户端接入注册服务资源      |

| *已知实现类*                      | *详细说明*               |
| -------------------------------- | --------------------------- |
| HttpClientRegisterRepository     | 基于Http请求的实现 |
| ZookeeperClientRegisterRepository| 基于Zookeeper注册的实现 |
| EtcdClientRegisterRepository     | 基于etcd注册的实现 |
| ConsulClientRegisterRepository   | 基于consul注册的实现 |
| NacosClientRegisterRepository    | 基于Nacos注册的实现 |


| *SPI 名称*                       | *详细说明*                 |
| -------------------------------- | ----------------------------- |
| ShenyuServerRegisterRepository     | ShenYu网关客户端注册的后台服务资源      |

| *已知实现类*                       | *详细说明*                 |
| -------------------------------- | ----------------------------- |
| ShenyuHttpRegistryController       | 使用Http服务接口来处理客户端注册请求        |
| ZookeeperServerRegisterRepository| 使用Zookeeper来处理客户端注册节点 |
| EtcdServerRegisterRepository     | 使用etcd来处理客户端注册节点 |
| ConsulServerRegisterRepository   | 使用consul来处理客户端注册节点 |
| NacosServerRegisterRepository    | 使用Nacos来处理客户端注册节点 |




---
title: 注册中心接入配置
keywords: shenyu
description: 注册中心接入配置
---

## 快速接入

说明然后使用不同的注册方式，快速接入。

## HTTP方式注册

#### Shenyu-Admin配置

在 application.yml 配置注册中心为HTTP即可，如下：

```yaml
shenyu:
  register:
    registerType: http
    props:
      checked: true  #是否开启检测
      zombieCheckTimes: 5 #失败几次后剔除服务
      scheduledTime: 10 #定时检测间隔时间 （秒）
```

#### Shenyu-Client配置

在 application.yml 中配置注册方式为HTTP，并填写Shenyu-Admin服务地址列表，如下：

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
# registerType : 服务注册类型，填写 http
# serverList: 为http注册类型时，填写Shenyu-Admin项目的地址，注意加上http://，多个地址用英文逗号分隔
# port: 你本项目的启动端口，目前springmvc/tars/grpc需要进行填写
# contextPath: 为你的这个mvc项目在shenyu网关的路由前缀，这个你应该懂意思把？ 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
# isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller；目前适用于springmvc/springcloud
``` 

## Zookeeper方式注册

#### Shenyu-Admin配置

* 首先在 pom.xml 文件中加入相关的依赖（默认已经引入）：

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-server-zookeeper</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* 在 application.yml 配置注册中心为Zookeeper，填写相关zookeeper服务地址和参数，如下：

```yaml
shenyu:
  register:
    registerType: zookeeper
    serverLists : localhost:2181
    props:
      sessionTimeout: 5000
      connectionTimeout: 2000
```

#### Shenyu-Client配置

* 首先在 pom.xml 文件中加入相关的依赖（默认已经引入）：

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-client-zookeeper</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* 在 application.yml 中配置注册方式为Zookeeper，并填写Zookeeper服务地址和相关参数，如下：

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
# registerType : 服务注册类型，填写 zookeeper
# serverList: 为zookeeper注册类型时，填写zookeeper地址，多个地址用英文分隔
# port: 你本项目的启动端口,目前springmvc/tars/grpc需要进行填写
# contextPath: 为你的这个mvc项目在shenyu网关的路由前缀，这个你应该懂意思把？ 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
# isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller；目前适用于springmvc/springcloud
``` 

## Etcd方式注册

#### Shenyu-Admin配置

* 首先在 pom.xml 文件中加入相关的依赖（默认已经引入）：

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-server-etcd</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* 在 application.yml 配置注册中心为etcd, 填写相关etcd服务地址和参数，如下：

```yaml
shenyu:
  register:
    registerType: etcd
    serverLists : http://localhost:2379
    props:
      etcdTimeout: 5000
      etcdTTL: 5
```

#### Shenyu-Client配置

* 首先在 pom.xml 文件中加入相关的依赖（默认已经引入）：

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-client-etcd</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* 在 application.yml 中配置注册方式为etcd, 并填写etcd服务地址和相关参数，如下：

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
# registerType : 服务注册类型，填写 etcd
# serverList: 为etcd注册类型时，填写etcd地址，多个地址用英文分隔
# port: 你本项目的启动端口,目前springmvc/tars/grpc需要进行填写
# contextPath: 为你的这个mvc项目在shenyu网关的路由前缀，这个你应该懂意思把？ 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
# isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller；目前适用于springmvc/springcloud
``` 

## Consul方式注册

#### Shenyu-Admin配置

* 首先在 pom.xml 文件中加入相关的依赖：

```xml
               <!--shenyu-register-server-consul默认已经引入-->
               <dependency>
                   <groupId>org.apache.shenyu</groupId>
                   <artifactId>shenyu-register-server-consul</artifactId>
                   <version>${project.version}</version>
               </dependency>

               <!--spring-cloud-starter-consul-discovery需要用户自行引入，建议选用2.2.6.RELEASE版本，其他版本不保证正常工作-->
               <dependency>
                   <groupId>org.springframework.cloud</groupId>
                   <artifactId>spring-cloud-starter-consul-discovery</artifactId>
                   <version>2.2.6.RELEASE</version>
               </dependency>
```

* 在 application.yml 配置注册中心为consul, 额外还需要配置spring.cloud.consul, 如下：

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

# registerType : 服务注册类型，填写 consul
# delay: 对Metadata的监控每次轮询的间隔时长，单位为秒，默认1秒
# wait-time: 对Metadata的监控单次请求的等待时间（长轮询机制），单位为秒，默认55秒
# instance-id: consul服务必填，consul需要通过instance-id找到具体服务
# service-name 服务注册到consul时所在的组名，不配置的话，会默认取 `spring.application.name` 的值
# host: 为 consul 注册类型时，填写 consul 地址，默认localhost
# port: 为 consul 注册类型时，填写 consul 端口， 默认是8500
# tags-as-metadata: false， 必填，如果不填默认为true，则无法读取metadata里的URI信息导致selector的upstream数据更新失败。

```

#### Shenyu-Client配置

**注意，consul注册中心目前和SpringCloud服务不兼容，会和Eureka/Nacos注册中心冲突** 

* 首先在 pom.xml 文件中加入相关的依赖（需要自行引入）：

```xml
            <dependency>
               <groupId>org.springframework.cloud</groupId>
               <artifactId>spring-cloud-starter-consul-discovery</artifactId>
               <version>2.2.6.RELEASE</version>
           </dependency>
```

* 在 application.yml 中配置注册方式为consul, 额外还需要配置spring.cloud.consul, 如下：

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
# registerType : 服务注册类型，填写 consul
# shenyu.client.props.port: 你本项目的启动端口,目前springmvc/tars/grpc需要进行填写
# contextPath: 为你的这个mvc项目在shenyu网关的路由前缀，这个你应该懂意思把？ 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
# isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller；目前适用于springmvc
# instance-id: consul服务必填，consul需要通过instance-id找到具体服务
# service-name 服务注册到consul时所在的组名，不配置的话，会默认取 `spring.application.name` 的值
# host: 为 consul 注册类型时，填写 consul 地址，默认localhost
# spring.cloud.consul.port: 为 consul 注册类型时，填写 consul 端口， 默认是8500
``` 

## Nacos方式注册

#### Shenyu-Admin配置

* 首先在 pom.xml 文件中加入相关的依赖（默认已经引入）：

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-server-nacos</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* 在 application.yml 配置注册中心为nacos, 填写相关nacos服务地址和参数，还有Nacos的命名空间（需要和Shenyu-Client保持一致），如下：

```yaml
shenyu:
  register:
    registerType: nacos
    serverLists : localhost:8848
    props:
      nacosNameSpace: ShenyuRegisterCenter
```

#### Shenyu-Client配置

* 首先在 pom.xml 文件中加入相关的依赖（默认已经引入）：

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-client-nacos</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* 在 application.yml 中配置注册方式为nacos, 并填写nacos服务地址和相关参数，需要命名空间（需要和Shenyu-Admin端保持一致），IP（可不填，则自动获取本机ip）和端口，如下：

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
# registerType : 服务注册类型，填写 etcd
# serverList: 为etcd注册类型时，填写etcd地址，多个地址用英文分隔
# port: 你本项目的启动端口,目前springmvc/tars/grpc需要进行填写
# contextPath: 为你的这个mvc项目在shenyu网关的路由前缀，这个你应该懂意思把？ 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
# isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller；目前适用于springmvc/springcloud
# nacosNameSpace: nacos的命名空间
``` 

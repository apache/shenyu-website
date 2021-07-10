---
title: 应用客户端接入
keywords: shenyu
description: 应用客户端接入
---

应用客户端接入是指将你的微服务接入到`ShenYu`网关，当前支持`Http`、 `Dubbo`、 `Spring Cloud`、 `gRPC`、 `Motan`、 `Sofa`、 `Tars`等协议的接入。 

<img src="/img/shenyu/register/register-content.png" width="70%" height="60%" />

## 设计原理

将应用客户端接入到`ShenYu`网关是通过注册中心来实现的，涉及到客户端注册和服务端同步数据。注册中心支持`Http`、`Zookeeper`、`Etcd`、`Consul`和`Nacos`。

### 注册中心客户端

![](/img/shenyu/register/client.png)

在你的微服务配置中声明注册中心客户端类型，如`Http`或`Zookeeper`。
应用程序启动时使用`SPI`方式加载并初始化对应注册中心客户端，通过实现`Spring Bean`相关的后置处理器接口，在其中获取需要进行注册的服务接口信息，将获取的信息放入`Disruptor`中。

注册中心客户端从`Disruptor`中读取数据，并将接口信息注册到`shenyu-admin`，`Disruptor`在其中起数据与操作解耦的作用，利于扩展。

### 注册中心服务端 

![](/img/shenyu/register/server.png)

在`shenyu-admin`配置中声明注册中心服务端类型，如`Http`或`Zookeeper`。当`shenyu-admin`启动时，读取配置类型，加载并初始化对应的注册中心服务端，注册中心服务端收到`shenyu-client`注册的接口信息后，将其放入`Disruptor`中，然后会触发注册处理逻辑，将服务接口信息更新并发布同步事件。

`Disruptor`在其中起到数据与操作解耦，利于扩展。如果注册请求过多，导致注册异常，也有数据缓冲作用。

### Http注册原理

`Http`服务注册原理较为简单，在`shenyu-client`启动后，会调用`shenyu-admin`的相关服务注册接口，上传数据进行注册。

`shenyu-admin` 收到请求后进行数据更新和数据同步事件发布，将接口信息同步到`ShenYu`网关。

### Zookeeper注册原理

`Zookeeper`存储结构如下：

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

`shenyu-client`启动时，将服务接口信息（`MetaDataRegisterDTO/URIRegisterDTO`）写到如上的`zookeeper`节点中。

`shenyu-admin`使用`Zookeeper`的`Watch`机制，对数据的更新和删除等事件进行监听，数据变更后触发对应的注册处理逻辑。在收到`MetaDataRegisterDTO`节点变更后，触发`selector`和`rule`的数据变更和数据同步事件发布。收到`URIRegisterDTO`节点变更后，触发`selector`的`upstream`的更新和数据同步事件发布。

## Etcd注册原理

`Etcd`的键值存储结构如下：

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

`shenyu-client`启动时，将服务接口信息（`MetaDataRegisterDTO/URIRegisterDTO`）以`Ephemeral`方式写到如上的`Etcd`节点中。

`shenyu-admin`使用`Etcd`的`Watch`机制，对数据的更新和删除等事件进行监听，数据变更后触发对应的注册处理逻辑。在收到`MetaDataRegisterDTO`节点变更后，触发`selector`和`rule`的数据变更和数据同步事件发布。收到`URIRegisterDTO`节点变更后，触发`selector`的`upstream`的更新和数据同步事件发布。

## Consul注册原理

`Consul`的`Metadata`和`URI`分两部分存储，`URIRegisterDTO`随着服务注册记录在服务的`metadata`里，服务下线时随着服务节点一起消失。

`Consul`的`MetaDataRegisterDTO`存在`Key/Value`里，键值存储结构如下：

```
shenyu
   ├──regsiter
   ├    ├──metadata
   ├    ├     ├──${rpcType}
   ├    ├     ├      ├────${contextPath}
   ├    ├     ├               ├──${ruleName} : save metadata data of MetaDataRegisterDTO

```

`shenyu-client`启动时，将服务接口信息（`MetaDataRegisterDTO/URIRegisterDTO`）分别放在`ServiceInstance`的`Metadata`（`URIRegisterDTO`）和`KeyValue`（`MetaDataRegisterDTO`），按照上述方式进行存储。

`shenyu-admin`通过监听`Catalog`和`KeyValue`的`index`的变化，来感知数据的更新和删除，数据变更后触发对应的注册处理逻辑。在收到`MetaDataRegisterDTO`节点变更后，触发`selector`和`rule`的数据变更和数据同步事件发布。收到`URIRegisterDTO`节点变更后，触发`selector`的`upstream`的更新和数据同步事件发布。

## Nacos注册原理

`Nacos`注册分为两部分：`URI` 和 `Metadata`。`URI` 使用实例注册方式，在服务异常的情况下，相关`URI`数据节点会自动进行删除，并发送事件到订阅端，订阅端进行相关的下线处理。`Metadata` 使用配置注册方式，没有相关上下线操作，当有`URI`实例注册时，会相应的发布`Metadata`配置，订阅端监听数据变化，进行更新处理。

`URI `实例注册命令规则如下：

```
shenyu.register.service.${rpcType}
```

初始监听所有的`RpcType`节点，其下的`{contextPath}`实例会对应注册到其下，根据`IP`和`Port`进行区分，并携带其对应的`contextPath`信息。`URI` 实例上下线之后，触发`selector`的`upstream`的更新和数据同步事件发布。

`URI` 实例上线时，会发布对应的 `Metadata` 数据，其节点名称命令规则如下：

```
shenyu.register.service.${rpcType}.${contextPath}
```

订阅端会对所有的`Metadata`配置继续监听，当初次订阅和配置更新后，触发`selector`和`rule`的数据变更和数据同步事件发布。

### SPI扩展

| *SPI 名称*                       | *详细说明*               |
| -------------------------------- | --------------------------- |
| ShenyuClientRegisterRepository     | ShenYu网关客户端接入注册服务资源      |

| *已知实现类*                      | *详细说明*               |
| -------------------------------- | --------------------------- |
| HttpClientRegisterRepository     | 基于Http请求的实现 |
| ZookeeperClientRegisterRepository| 基于Zookeeper注册的实现 |
| EtcdClientRegisterRepository     | 基于Etcd注册的实现 |
| ConsulClientRegisterRepository   | 基于Consul注册的实现 |
| NacosClientRegisterRepository    | 基于Nacos注册的实现 |


| *SPI 名称*                       | *详细说明*                 |
| -------------------------------- | ----------------------------- |
| ShenyuServerRegisterRepository     | ShenYu网关客户端注册的后台服务资源      |

| *已知实现类*                       | *详细说明*                 |
| -------------------------------- | ----------------------------- |
| ShenyuHttpRegistryController       | 使用Http服务接口来处理客户端注册请求        |
| ZookeeperServerRegisterRepository| 使用Zookeeper来处理客户端注册节点 |
| EtcdServerRegisterRepository     | 使用Etcd来处理客户端注册节点 |
| ConsulServerRegisterRepository   | 使用Consul来处理客户端注册节点 |
| NacosServerRegisterRepository    | 使用Nacos来处理客户端注册节点 |



## 接入配置

介绍将应用客户端接入到`ShenYu`网关，应该如何配置。

### Http方式注册配置

#### shenyu-admin配置

在 `yml`文件中配置注册类型为`http`，配置信息如下：

```yaml
shenyu:
  register:
    registerType: http
    props:
      checked: true  #是否开启检测
      zombieCheckTimes: 5 #失败几次后剔除服务
      scheduledTime: 10 #定时检测间隔时间 （秒）
```

<img src="/img/shenyu/register/register-http-admin-yml.png" width="70%" height="60%" />


#### shenyu-client配置

下面展示的是`http`服务作为客户端接入到`ShenYu`网关时，通过`Http`方式注册配置信息。其他客户端接入时（`Dubbo`、 `Spring Cloud`等），配置方式同理。

在微服务中的 `yml`文件配置注册方式设置为`http`，并填写`shenyu-admin`服务地址列表，配置信息如下：

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
# contextPath: 为你的这个mvc项目在shenyu网关的路由前缀， 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
# isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller；目前适用于springmvc/springcloud
``` 


<img src="/img/shenyu/register/register-http-client-yml.png" width="70%" height="60%" />

### Zookeeper方式注册配置

#### shenyu-admin配置

* 首先在 `pom` 文件中加入相关的依赖（默认已经引入）：

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-server-zookeeper</artifactId>
            <version>${project.version}</version>
        </dependency>
```

<img src="/img/shenyu/register/register-zk-admin-pom.png" width="70%" height="60%" />


* 然后在`yml`文件中配置注册类型为`zookeeper`，填写`zookeeper`服务地址和参数，配置信息如下：

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


#### shenyu-client配置

下面展示的是`http`服务作为客户端接入到`ShenYu`网关时，通过`Zookeeper`方式注册配置信息。其他客户端接入时（`Dubbo`、 `Spring Cloud`等），配置方式同理。

* 首先在 `pom`文件中加入相关的依赖：

```xml
        <!--shenyu zookeeper register center -->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-server-zookeeper</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
```
<img src="/img/shenyu/register/register-zk-client-pom.png" width="70%" height="60%" />

* 然后在 `yml` 中配置注册类型为`zookeeper`，并填写`Zookeeper`服务地址和相关参数，如下：

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
# registerType : 服务注册类型，填写 zookeeper
# serverList: 为zookeeper注册类型时，填写zookeeper地址，多个地址用英文分隔
# port: 你本项目的启动端口,目前springmvc/tars/grpc需要进行填写
# contextPath: 为你的这个mvc项目在shenyu网关的路由前缀， 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
# isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller；目前适用于springmvc/springcloud
``` 

<img src="/img/shenyu/register/register-zk-client-yml.png" width="70%" height="60%" />


### Etcd方式注册配置

#### shenyu-admin配置

* 首先在 `pom` 文件中加入相关的依赖（默认已经引入）：

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-server-etcd</artifactId>
            <version>${project.version}</version>
        </dependency>
```

<img src="/img/shenyu/register/register-etcd-admin-pom.png" width="70%" height="60%" />


* 然后在 `yml` 配置注册类型为`etcd`, 填写`etcd`服务地址和参数，配置信息如下：

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

#### shenyu-client配置

下面展示的是`http`服务作为客户端接入到`ShenYu`网关时，通过`Etcd`方式注册配置信息。其他客户端接入时（`Dubbo`、 `Spring Cloud`等），配置方式同理。


* 首先在 `pom` 文件中加入相关的依赖：

```xml
        <!--shenyu etcd register center -->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-server-etcd</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
```

<img src="/img/shenyu/register/register-etcd-client-pom.png" width="70%" height="60%" />


* 然后在 `yml` 中配置注册类型为`etcd`, 并填写`etcd`服务地址和相关参数，如下：

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
# registerType : 服务注册类型，填写 etcd
# serverList: 为etcd注册类型时，填写etcd地址，多个地址用英文分隔
# port: 你本项目的启动端口,目前springmvc/tars/grpc需要进行填写
# contextPath: 为你的这个mvc项目在shenyu网关的路由前缀， 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
# isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller；目前适用于springmvc/springcloud
``` 


<img src="/img/shenyu/register/register-etcd-client-yml.png" width="70%" height="60%" />

### Consul方式注册配置

#### shenyu-admin配置

* 首先在 pom.xml 文件中加入相关的依赖：

```xml
        <!--shenyu consul register start-->
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
        <!--shenyu consul register end-->

```

<img src="/img/shenyu/register/register-consul-admin-pom.png" width="70%" height="60%" />

* 在 `yml`文件配置注册中心为`consul`, 额外还需要配置`spring.cloud.consul`, 配置信息如下：

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

<img src="/img/shenyu/register/register-consul-admin-yml.png" width="70%" height="60%" />


#### shenyu-client配置

**注意，`consul`注册中心目前和`SpringCloud`服务不兼容，会和`Eureka/Nacos`注册中心冲突** 

下面展示的是`http`服务作为客户端接入到`ShenYu`网关时，通过`Consul`方式注册配置信息。其他客户端接入时（`Dubbo`、 `Spring Cloud`等），配置方式同理。

* 首先在 `pom` 文件中加入相关的依赖：

```xml
            <dependency>
               <groupId>org.springframework.cloud</groupId>
               <artifactId>spring-cloud-starter-consul-discovery</artifactId>
               <version>2.2.6.RELEASE</version>
           </dependency>
```

<img src="/img/shenyu/register/register-consul-client-pom.png" width="70%" height="60%" />


* 然后在 `yml`文件中配置注册方式为`consul`, 额外还需要配置`spring.cloud.consul`, 配置信息如下：

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
# contextPath: 为你的这个mvc项目在shenyu网关的路由前缀， 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
# isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller；目前适用于springmvc
# instance-id: consul服务必填，consul需要通过instance-id找到具体服务
# service-name 服务注册到consul时所在的组名，不配置的话，会默认取 `spring.application.name` 的值
# host: 为 consul 注册类型时，填写 consul 地址，默认localhost
# spring.cloud.consul.port: 为 consul 注册类型时，填写 consul 端口， 默认是8500
``` 

<img src="/img/shenyu/register/register-consul-client-yml.png" width="70%" height="60%" />


### Nacos方式注册配置

#### shenyu-admin配置

* 首先在 `pom` 文件中加入相关的依赖（默认已经引入）：

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-server-nacos</artifactId>
            <version>${project.version}</version>
        </dependency>
```

<img src="/img/shenyu/register/register-nacos-admin-pom.png" width="70%" height="60%" />


* 然后在 `yml`文件中配置注册中心为`nacos`, 填写相关`nacos`服务地址和参数，还有`nacos`的命名空间（需要和`shenyu-client`保持一致），配置信息如下：

```yaml
shenyu:
  register:
    registerType: nacos
    serverLists : localhost:8848
    props:
      nacosNameSpace: ShenyuRegisterCenter
```

<img src="/img/shenyu/register/register-nacos-admin-yml.png" width="70%" height="60%" />


#### shenyu-client配置

下面展示的是`http`服务作为客户端接入到`ShenYu`网关时，通过`Nacos`方式注册配置信息。其他客户端接入时（`Dubbo`、 `Spring Cloud`等），配置方式同理。


* 首先在 `pom`文件中加入相关的依赖：

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-client-nacos</artifactId>
            <version>${project.version}</version>
        </dependency>
```

<img src="/img/shenyu/register/register-nacos-client-pom.png" width="70%" height="60%" />


* 然后在 `yml` 中配置注册方式为`nacos`, 并填写`nacos`服务地址和相关参数，还需要`Nacos`命名空间（需要和`shenyu-admin`端保持一致），IP（可不填，则自动获取本机ip）和端口，配置信息如下：

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
# contextPath: 为你的这个mvc项目在shenyu网关的路由前缀，比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
# isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller；目前适用于springmvc/springcloud
# nacosNameSpace: nacos的命名空间
``` 
<img src="/img/shenyu/register/register-nacos-client-yml.png" width="70%" height="60%" />

总结，本文主要介绍了如何将你的微服务（当前支持`Http`、 `Dubbo`、 `Spring Cloud`、 `gRPC`、 `Motan`、 `Sofa`、 `Tars`等协议）接入到`ShenYu`网关。介绍了注册中心的原理，`ShenYu`网关支持的注册中心有`Http`、`Zookeeper`、`Etcd`、`Consul`、`Nacos`等方式。还介绍了以`http`服务作为客户端接入到`ShenYu`网关时，使用不同方式注册配置信息。

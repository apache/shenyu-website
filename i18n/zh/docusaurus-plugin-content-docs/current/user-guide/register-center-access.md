---
title: 客户端接入配置
description: 客户端接入配置
---

应用客户端接入是指将你的微服务接入到`Apache ShenYu`网关，当前支持`Http`、 `Dubbo`、 `Spring Cloud`、 `gRPC`、 `Motan`、 `Sofa`、 `Tars`等协议的接入。


将应用客户端接入到`Apache ShenYu`网关是通过注册中心来实现的，涉及到客户端注册和服务端同步数据。注册中心支持`Http`、`Zookeeper`、`Etcd`、`Consul`和`Nacos`。


本篇文章介绍将应用客户端接入到`Apache ShenYu`网关，应该如何配置。相关原理请参考设计文档中的 [客户端接入原理](../design/register-center-design) 。


<img src="/img/shenyu/register/register-center-config-dir-zh.png" width="70%" height="60%" />


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

下面展示的是`http`服务作为客户端接入到`Apache ShenYu`网关时，通过`Http`方式注册配置信息。其他客户端接入时（`Dubbo`、 `Spring Cloud`等），配置方式同理。

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

下面展示的是`http`服务作为客户端接入到`Apache ShenYu`网关时，通过`Zookeeper`方式注册配置信息。其他客户端接入时（`Dubbo`、 `Spring Cloud`等），配置方式同理。

* 首先在 `pom`文件中加入相关的依赖：

```xml
        <!-- apache shenyu zookeeper register center -->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-client-zookeeper</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
```
<img src="/img/shenyu/register/client_register_zk_pom.png" width="70%" height="60%" />

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
# serverList: 为zookeeper注册类型时，填写zookeeper地址，多个地址用英文逗号分隔
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
```

<img src="/img/shenyu/register/register-etcd-admin-yml.png" width="70%" height="60%" />

#### shenyu-client配置

下面展示的是`http`服务作为客户端接入到`Apache ShenYu`网关时，通过`Etcd`方式注册配置信息。其他客户端接入时（`Dubbo`、 `Spring Cloud`等），配置方式同理。


* 首先在 `pom` 文件中加入相关的依赖：

```xml
        <!-- apache shenyu etcd register center -->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-client-etcd</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
```

<img src="/img/shenyu/register/client_register_etcd_pom.png" width="70%" height="60%" />


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
# serverList: 为etcd注册类型时，填写etcd地址，多个地址用英文逗号分隔
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
        <!-- apache shenyu consul register start-->
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
        <!-- apache shenyu consul register end-->

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

下面展示的是`http`服务作为客户端接入到`Apache ShenYu`网关时，通过`Consul`方式注册配置信息。其他客户端接入时（`Dubbo`、 `Spring Cloud`等），配置方式同理。

* 首先在 `pom` 文件中加入相关的依赖：

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

下面展示的是`http`服务作为客户端接入到`Apache ShenYu`网关时，通过`Nacos`方式注册配置信息。其他客户端接入时（`Dubbo`、 `Spring Cloud`等），配置方式同理。


* 首先在 `pom`文件中加入相关的依赖：

```xml
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-register-client-nacos</artifactId>
            <version>${shenyu.version}</version>
        </dependency>
```

<img src="/img/shenyu/register/client_register_nacos_pom.png" width="70%" height="60%" />


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
# registerType : 服务注册类型，填写 nacos
# serverList: 为nacos注册类型时，填写nacos地址，多个地址用英文逗号分隔
# port: 你本项目的启动端口,目前springmvc/tars/grpc需要进行填写
# contextPath: 为你的这个mvc项目在shenyu网关的路由前缀，比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
# isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller；目前适用于springmvc/springcloud
# nacosNameSpace: nacos的命名空间
``` 
<img src="/img/shenyu/register/register-nacos-client-yml.png" width="70%" height="60%" />

总结，本文主要介绍了如何将你的微服务（当前支持`Http`、 `Dubbo`、 `Spring Cloud`、 `gRPC`、 `Motan`、 `Sofa`、 `Tars`等协议）接入到`Apache ShenYu`网关。介绍了注册中心的原理，`Apache ShenYu`网关支持的注册中心有`Http`、`Zookeeper`、`Etcd`、`Consul`、`Nacos`等方式。介绍了以`http`服务作为客户端接入到`Apache ShenYu`网关时，使用不同方式注册配置信息。

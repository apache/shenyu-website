---
title: 注册中心接入配置
keywords: ["soul"]
description: 注册中心接入配置
---

## 说明

说明然后使用不同的注册方式，快速接入。

## HTTP方式注册

#### Soul-Admin配置

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

#### Soul-Client配置

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

#### Soul-Admin配置

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

#### Soul-Client配置

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

## Etcd方式注册

#### Soul-Admin配置

* 首先在 pom.xml 文件中加入相关的依赖（默认已经引入）：

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>soul-register-server-etcd</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* 在 application.yml 配置注册中心为etcd, 填写相关etcd服务地址和参数，如下：

```yaml
soul:
  register:
    registerType: etcd
    serverLists : http://localhost:2379
    props:
      etcdTimeout: 5000
      etcdTTL: 5
```

#### Soul-Client配置

* 首先在 pom.xml 文件中加入相关的依赖（默认已经引入）：

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>soul-register-client-etcd</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* 在 application.yml 中配置注册方式为etcd, 并填写etcd服务地址和相关参数，如下：

```yaml
soul:
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
# contextPath: 为你的这个mvc项目在soul网关的路由前缀，这个你应该懂意思把？ 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
# isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller；目前适用于springmvc/springcloud
``` 

## Consul方式注册

#### Soul-Admin配置

* 首先在 pom.xml 文件中加入相关的依赖：

```xml
               <!--soul-register-server-consul默认已经引入-->
               <dependency>
                   <groupId>org.dromara</groupId>
                   <artifactId>soul-register-server-consul</artifactId>
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
soul:
  register:
    registerType: consul
    props:
      delay: 1
      wait-time: 55

spring:
  cloud:
    consul:
      discovery:
        instance-id: soul-admin-1
        service-name: soul-admin
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

#### Soul-Client配置

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
soul:
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
        instance-id: soul-http-1
        service-name: soul-http
      host: localhost
      port: 8500
# registerType : 服务注册类型，填写 consul
# soul.client.props.port: 你本项目的启动端口,目前springmvc/tars/grpc需要进行填写
# contextPath: 为你的这个mvc项目在soul网关的路由前缀，这个你应该懂意思把？ 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
# isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller；目前适用于springmvc
# instance-id: consul服务必填，consul需要通过instance-id找到具体服务
# service-name 服务注册到consul时所在的组名，不配置的话，会默认取 `spring.application.name` 的值
# host: 为 consul 注册类型时，填写 consul 地址，默认localhost
# spring.cloud.consul.port: 为 consul 注册类型时，填写 consul 端口， 默认是8500
``` 

## Nacos方式注册

#### Soul-Admin配置

* 首先在 pom.xml 文件中加入相关的依赖（默认已经引入）：

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>soul-register-server-nacos</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* 在 application.yml 配置注册中心为nacos, 填写相关nacos服务地址和参数，还有Nacos的命名空间（需要和Soul-Client保持一致），如下：

```yaml
soul:
  register:
    registerType: nacos
    serverLists : localhost:8848
    props:
      nacosNameSpace: SoulRegisterCenter
```

#### Soul-Client配置

* 首先在 pom.xml 文件中加入相关的依赖（默认已经引入）：

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>soul-register-client-nacos</artifactId>
            <version>${project.version}</version>
        </dependency>
```

* 在 application.yml 中配置注册方式为nacos, 并填写nacos服务地址和相关参数，需要命名空间（需要和Soul-Admin端保持一致），IP（可不填，则自动获取本机ip）和端口，如下：

```yaml
soul:
  client:
    registerType: nacos
    serverLists: localhost:8848
    props:
      contextPath: /http
      appName: http
      port: 8188  
      isFull: false
      nacosNameSpace: SoulRegisterCenter
# registerType : 服务注册类型，填写 etcd
# serverList: 为etcd注册类型时，填写etcd地址，多个地址用英文分隔
# port: 你本项目的启动端口,目前springmvc/tars/grpc需要进行填写
# contextPath: 为你的这个mvc项目在soul网关的路由前缀，这个你应该懂意思把？ 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
# isFull: 设置true 代表代理你的整个服务，false表示代理你其中某几个controller；目前适用于springmvc/springcloud
# nacosNameSpace: nacos的命名空间
``` 

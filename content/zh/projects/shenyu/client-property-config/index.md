---
title: 客户端属性配置
keywords: Apache ShenYu
description: Client属性配置
---

本篇主要讲解如何在客户端接入时配置 `ShenYu` 的相关属性。

在你的微服务中设置`shenyu`属性，比如，在[shenyu-examples-http](https://github.com/apache/incubator-shenyu/tree/master/shenyu-examples/shenyu-examples-http) 中相关配置如下：

<img src="/img/shenyu/config/shenyu_client_application_config.png" width="80%" height="70%" />

### 属性配置

```yaml
shenyu:
  client:
    registerType: http #zookeeper #etcd #nacos #consul
    serverLists: http://localhost:9095 #localhost:2181 #http://localhost:2379 #localhost:8848
    props:
      contextPath: /http
      appName: http
      port: 8189
      nacosNameSpace: ShenyuRegisterCenter

```


### 属性详解

##### shenyu.client 配置

这是客户端接入的相关配置，客户端接入原理请参考：[客户端接入原理](../register-center-design) ，客户端接入配置请参考： [客户端接入配置](../register-center-access) 。

|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|registerType                   |String |  http      | 必填     |使用哪种方式进行服务注册，当前支持 `http`、`zookeeper`、`etcd`、`consul`和`nacos` 。|
|serverLists                |String |  无    |  必填  |配置中心的地址。集群时，多个地址用 `,` 分开 。|
|props    | | |   | 使用不同注册类型时，属性取值不同。|


- `props`配置

微服务由不同协议构建时，属性配置略有不同，通用属性如下：


|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|contextPath                   |String |  无      | 是     |服务在网关中的路由前缀|
|appName                |String |  无    |  是  |服务名称。`springcloud`服务无需配置，请通过`spring.application.name`配置。|
|host    |String | 无 | 是  | 服务地址|
|port    |int | 无 | 是  | 服务端口|
|isFull    |boolean | false | 否  | 是否代理整个服务，目前适用于`springmvc`/`springcloud`|
|ipAndPort    |String | 无 | 否  | 服务的IP和端口地址，目前适用于`gRPC`。|
|shutdownWaitTime    |int | 3000 | 否  | 服务停止等待时间（毫秒）|
|delayOtherHooksExecTime    |int | 2000 | 否  | `hook`执行时间（毫秒）|
|applicationShutdownHooksClassName    |String | `java.lang.ApplicationShutdownHooks` | 否  | `hook`执行类|
|applicationShutdownHooksFieldName    |String | `hooks` | 否  | `hook`执行字段|


使用不同的注册类型时，属性取值不同。
当注册类型为`http`时，暂未提供其他属性配置。



当注册类型为`zookeeper`时，支持的属性配置如下：

|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|sessionTimeout                   | int |  30000      | 否     |session超时时间（毫秒）|
|connectionTimeout                | int |  3000    |  否  |连接超时时间（毫秒）|

当注册类型为`etcd`时，支持的属性配置如下：

|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|etcdTimeout                   | int |  30000      | 否     |etcd超时时间（毫秒）|
|etcdTTL                | int |  5    |  否  |租约生存时间（秒）|

当注册类型为`nacos`时，支持的属性配置如下：

|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|nacosNameSpace            | String |  无      | 是     |命名空间|
|username                | String | 空字符串   |  否  |用户名|
|password                | String |  空字符串    |  否  |密码|
|accessKey                | String |  空字符串    |  否  |accessKey|
|secretKey                | String |  空字符串    |  否  |secretKey|

当注册类型为`consul`时，暂未提供其他属性配置。请通过`spring.cloud.consul`进行配置。
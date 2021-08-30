---
title: Admin属性配置
keywords: ["配置"]
description: Admin属性配置
---

本篇主要讲解如何在 `admin`端配置 `ShenYu` 的相关属性。


<img src="/img/shenyu/config/shenyu_admin_application_config.png" width="80%" height="70%" />


### 属性配置

```yaml
shenyu:
  register:
    registerType: http #http #zookeeper #etcd #nacos #consul
    serverLists: #localhost:2181 #http://localhost:2379 #localhost:8848
    props:
      sessionTimeout: 5000
      connectionTimeout: 2000
      checked: true
      zombieCheckTimes: 5
      scheduledTime: 10
      nacosNameSpace: ShenyuRegisterCenter
  database:
    dialect: mysql
    init_script: "META-INF/schema.sql"
    init_enable: true
  sync:
    websocket:
      enabled: true
#      zookeeper:
#        url: localhost:2181
#        sessionTimeout: 5000
#        connectionTimeout: 2000
#      http:
#        enabled: true
#      nacos:
#        url: localhost:8848
#        namespace: 1c10d748-af86-43b9-8265-75f487d20c6c
#        username:
#        password:
#        acm:
#          enabled: false
#          endpoint: acm.aliyun.com
#          namespace:
#          accessKey:
#          secretKey:
#    etcd:
#      url: http://localhost:2379
#    consul:
#      url: http://localhost:8500
  aes:
    secret:
      key: 2095132720951327
      iv: 6075877187097700
  ldap:
    enabled: false
    url: ldap://xxxx:xxx
    bind-dn: cn=xxx,dc=xxx,dc=xxx
    password: xxxx
    base-dn: ou=xxx,dc=xxx,dc=xxx
    object-class: person
    login-field: cn
  jwt:
    expired-seconds: 86400000
  shiro:
    white-list:
      - /
      - /favicon.*
      - /static/**
      - /index**
      - /plugin
      - /platform/**
      - /websocket
      - /configs/**
      - /shenyu-client/**
      - /error
      - /actuator/health
      - /swagger-ui.html
      - /webjars/**
      - /swagger-resources/**
      - /v2/api-docs
      - /csrf
  swagger:
    enable: true

```


### 属性详解

##### shenyu.register 配置

这是客户端接入的相关配置，客户端接入原理请参考：[客户端接入原理](../../design/register-center-design) ，客户端接入配置请参考： [客户端接入配置](../register-center-access) 。

|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|registerType                   |String |  http      | 必填     |使用哪种方式进行服务注册，当前支持 `http`、`zookeeper`、`etcd`、`consul`和`nacos` 。|
|serverLists                |String |  无    |  非必填  |配置中心的地址。使用`http`方式时，不需要填写，其他类型需要填写。集群时，多个地址用 `,` 分开 。|
|props    | | |   | 使用不同注册类型时，属性取值不同。|




- `props`配置

使用不同的注册类型时，属性取值不同。

当注册类型为`http`时，支持的属性配置如下：

|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|checked                   |boolean |  false      | 否     |是否开启检测|
|zombieCheckTimes                |int |  5    |  否  |失败几次后剔除服务|
|scheduledTime    |int | 10 | 否  | 定时检测间隔时间 （秒）|

当注册类型为`zookeeper`时，支持的属性配置如下：

|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|sessionTimeout                   | int |  30000      | 否     |session超时时间（毫秒）|
|connectionTimeout                | int |  3000    |  否  |连接超时时间（毫秒）|

当注册类型为`etcd`时，暂时没有属性配置。

当注册类型为`nacos`时，支持的属性配置如下：

|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|nacosNameSpace            | String |  无      | 是     |命名空间|
|username                | String | 空字符串   |  否  |用户名|
|password                | String |  空字符串    |  否  |密码|
|accessKey                | String |  空字符串    |  否  |accessKey|
|secretKey                | String |  空字符串    |  否  |secretKey|

当注册类型为`consul`时，支持的属性配置如下：

|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|delay            | int |  1      | 否     |对`Metadata`的监控每次轮询的间隔时长，单位为秒，默认`1`秒。|
|wait-time                | int | 55   |  否  |对`Metadata`的监控单次请求的等待时间（长轮询机制），单位为秒，默认`55`秒。|
|metadata-path                | String |  `shenyu/register`    |  否  |`Metadata`路径名称，默认是`shenyu/register`。|


##### shenyu.database 配置

`shenyu-admin`启动时，数据库的相关配置。

|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|dialect            | String |  h2      | 否     |admin启动时，使用哪种数据库。|
|init_script               | String | `META-INF/schema.h2.sql`   |  否  |数据库初始化脚本|
|init_enable                | boolean |  true    |  否  |是否进行初始化|


##### shenyu.sync 配置

`Admin`端和网关使用数据同步的相关配置。

使用`websocket`进行数据同步的属性配置如下：


|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|enabled                | boolean |  true    |  否  |是否启用`websocket`进行数据同步|

使用`zookeeper`进行数据同步的属性配置如下：


|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|url                | String |  无    |  是  |`zookeeper`的连接地址|
|sessionTimeout                | int |  无    |  是  |`session`的超时时间（毫秒）|
|connectionTimeout                | int |  无    |  是  |连接超时时间（毫秒）|


使用`http长轮询`进行数据同步的属性配置如下：

|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|enabled                | boolean |  true    |  否 |是否启用|
|refreshInterval                | int |  5 （分钟）    |  否  |定时从数据库获取数据并加载到内存|
|notifyBatchSize                | int |  100    |  否  |批量通知客户端|


使用`nacos`进行数据同步的属性配置如下：

|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|url                | String |  无    | 是 |`nacos`连接地址|
|namespace                | String |  无    |  是  |命名空间|
|username                | String |  无    |  否  |用户名|
|password                | String |  无    |  否  |密码|
|acm                |    |        |  否  |阿里云ACM服务配置|

- `acm`配置

|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|enabled                | boolean |  false    |  否 |是否启用|
|endpoint                | String |  无    |  是  |ACM服务地址|
|namespace                | String |  无    |  否  |namespace|
|accessKey                | String |  无    |  否  |accessKey|
|secretKey                | String |  无    |  否  |secretKey|


使用`etcd`进行数据同步的属性配置如下：

|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|url                | String |  无    | 是 |`etcd`连接地址|



使用`consul`进行数据同步的属性配置如下：

|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|url                | String |  无    | 是 |`consul`连接地址|


##### shenyu.aes.secret 配置

`aes`加密算法的相关配置。


|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|key | String |  `2095132720951327`    |  否  |key|
|iv | String |  无    |  否  |初始向量|


##### shenyu.ldap 配置

`Spring`中`ldap`的相关配置。


|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
|enabled | boolean |  true    |  否  |是否启用|
|url | String |  无    |  是  |`ldap`连接地址|
|bind-dn | String |  无    |  否  | UserDn |
|password | String |  无    |  否  |密码|
|base-dn | String |  无    |  否  | searchBase |
|object-class | String |  `person`    |  否  | filter |
|login-field | String |  `cn`    |  否  | searchBase|
|connectTimeout | int |  3000   |  否  |连接超时时间（毫秒）|
|readTimeout | int |  3000     |  否  |读取操作超时时间（毫秒）|


##### shenyu.jwt 配置

`jwt`的相关配置如下：


|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| expired-seconds | long |  24 * 60 * 60 * 1000L    |  否  |过期时间（毫秒）|


##### shenyu.shiro 配置

`shiro`的相关配置如下：


|名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
|:------------------------ |:----- |:-------: |:-------:|:----------------------------|
| white-list | List |  无  |  否  |白名单列表|

---
title: 网关属性配置
keywords: Apache ShenYu
description: 网关属性配置
---

本篇主要讲解如何在 `Apache Shenyu` 网关配置 `ShenYu` 的相关属性。

<img src="/img/shenyu/config/shenyu_gateway_application_config.jpg" width="80%" height="70%" />

### 属性配置

```yaml
shenyu:
  file:
    enabled: true
  cross:
    enabled: true
  exclude:
    enabled: false
    paths:
      - /favicon.ico
  sync:
    websocket:
      urls: ws://localhost:9095/websocket
#    zookeeper:
#      url: localhost:2181
#      sessionTimeout: 5000
#      connectionTimeout: 2000
#    http:
#      url: http://localhost:9095
#    nacos:
#      url: localhost:8848
#      namespace: 1c10d748-af86-43b9-8265-75f487d20c6c
#      username:
#      password:
#      acm:
#        enabled: false
#        endpoint: acm.aliyun.com
#        namespace:
#        accessKey:
#        secretKey:
#    etcd:
#      url: http://localhost:2379
#    consul:
#      url: http://localhost:8500
#      waitTime: 1000
#      watchDelay: 1000

```

### 属性详解

##### 过滤器相关配置

- `shenyu.file` 配置

文件过滤器的相关配置。

| 名称    | 类型    | 默认值 | 是否必填 | 说明                 |
| :------ | :------ | :----: | :------: | :------------------- |
| enabled | Boolean | false  |    否    | 是否开启文件大小过滤 |



- `shenyu.cross` 配置

跨域相关配置。

| 名称    | 类型    | 默认值 | 是否必填 | 说明             |
| :------ | :------ | :----: | :------: | :--------------- |
| enabled | Boolean | false  |    否    | 是否支持跨域请求 |



- `shenyu.exclude` 配置

拒绝指定请求经过网关的相关配置

| 名称    | 类型    | 默认值 | 是否必填 | 说明                                       |
| :------ | :------ | :----: | :------: | :----------------------------------------- |
| enabled | Boolean | false  |    否    | 是否拒绝指定请求经过网关                   |
| paths   | Array   |   无   |    是    | 匹配该列表的请求不经过网关（支持路径匹配） |



##### shenyu.sync 配置

网关和`Admin`端使用数据同步的相关配置。

使用`websocket`进行数据同步的属性配置如下：

| 名称 | 类型   | 默认值 | 是否必填 | 说明                                               |
| :--- | :----- | :----: | :------: | :------------------------------------------------- |
| urls | String |   无   |    是    | `Admin`的websocket服务地址，多个地址用 `,` 分开 。 |



使用`zookeeper`进行数据同步的属性配置如下：

| 名称              | 类型   | 默认值 | 是否必填 | 说明                        |
| :---------------- | :----- | :----: | :------: | :-------------------------- |
| url               | String |   无   |    是    | `zookeeper`的连接地址       |
| sessionTimeout    | int    |   无   |    是    | `session`的超时时间（毫秒） |
| connectionTimeout | int    |   无   |    是    | 连接超时时间（毫秒）        |



使用`http长轮询`进行数据同步的属性配置如下：

| 名称 | 类型   | 默认值 | 是否必填 | 说明              |
| :--- | :----- | :----: | :------: | :---------------- |
| url  | String |   无   |    是    | `Admin`的服务地址 |



使用`nacos`进行数据同步的属性配置如下：

| 名称      | 类型   | 默认值 | 是否必填 | 说明              |
| :-------- | :----- | :----: | :------: | :---------------- |
| url       | String |   无   |    是    | `nacos`连接地址   |
| namespace | String |   无   |    是    | 命名空间          |
| username  | String |   无   |    否    | 用户名            |
| password  | String |   无   |    否    | 密码              |
| acm       |        |        |    否    | 阿里云ACM服务配置 |

- `acm`配置

| 名称      | 类型    | 默认值 | 是否必填 | 说明        |
| :-------- | :------ | :----: | :------: | :---------- |
| enabled   | boolean | false  |    否    | 是否启用    |
| endpoint  | String  |   无   |    是    | ACM服务地址 |
| namespace | String  |   无   |    否    | namespace   |
| accessKey | String  |   无   |    否    | accessKey   |
| secretKey | String  |   无   |    否    | secretKey   |



使用`etcd`进行数据同步的属性配置如下：

| 名称 | 类型   | 默认值 | 是否必填 | 说明           |
| :--- | :----- | :----: | :------: | :------------- |
| url  | String |   无   |    是    | `etcd`连接地址 |



使用`consul`进行数据同步的属性配置如下：

| 名称       | 类型   | 默认值 | 是否必填 | 说明                                         |
| :--------- | :----- | :----: | :------: | :------------------------------------------- |
| url        | String |   无   |    是    | `consul`连接地址                             |
| waitTime   | int    |   无   |    是    | 请求consul服务拉取配置信息的超时时间（毫秒） |
| watchDelay | int    |   无   |    是    | 同步间隔（毫秒）                             |

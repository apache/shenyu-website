---
title: 版本发布
keywords: ["release-notes"]
description: release-notes
---

### 2.3.0

##### soul-admin
- Sign 插件新增是否开启APP 认证的字段。
- 优化Divide 插件，使用通用的插件模板。
- 插件处理管理中添加默认值和规则检查。
- 新增资源管理模块，使用户可以添加插件，调整菜单和按钮资源等。
- 新增菜单和数据的权限控制。
- 新增支持H2来存储数据。

##### soul-bootstrap
- 新增 Tars 插件，支持 tars RPC 协议。
- 新增 Sofa 插件 ，支持 sofa RPC 协议。
- 新增 GRPC 插件，全面支持 GRPC 协议。
- 新增 sentinel 插件
- 新增 Resilience4j 插件
- 新增 context-path 插件，支持自定义的 context path
- 新增 Dubbo 插件的表单提交
- 新增插件管理功能
- 新增dist包模块
- 添加测试用例，覆盖率达到百分之七十。
- 新增 zookeeper 作为注册中心的方式接入soul网关。
- 新增 Nacos 作为注册中心的方式接入soul网关。
- 新增 Consul 作为注册中心的方式接入soul网关。
- 新增 Etcd 作为注册中心的方式接入soul网关。

### 2.2.0
- 完全的插件化架构设计，插件热插拔。
- 完整支持dubbo所有版本，alibaba-dubbo ，apache-dubbo。
- 支持dubbo泛化调用，多参数，复杂参数接口。
- 增强monitor插件，移除influxdb支持，新增内存，CPU，QPS，TPS，响应迟延等metrics，支持接入Prometheus。
- springCloud插件支持eureka与nacos二种注册中心。
- waf插件增强,支持黑白名单，以及混合模式。
- 抽离Hystrix熔断功能，独立成插件支持。
- 修护Zookeeper数据同步方式bug，新增nacos同步数据方式。
- 多种soul-client支持，提供传统spring，以及springboot等方式接入。
- 优化 soul-admin后台控制界面。
- 负载均衡算法bug修护。
- 修护大文件上传时候的bug。

---
title: 版本发布
keywords: changelog
description:  changelog
---

### 2.3.0

##### soul-admin
- Add 'open' field to allow app path authentication or not in sign plugin. 
- Optimize divide plugin to use common plugin template in soul-dashboard. 
- Add default values and rule checks in plugin handler. 
- Add resource management to allow user to add plugin, adjust menu and button resource and so on in soul-dashboard and soul-admin.
- Add menu and data permission in soul-admin. 
- Add H2 stroe for soul-admin 
##### soul-bootstrap
- Add tars plugin 
- Add sentinel plugin
-- Add sofa plugin 
- Add Resilience4j plugin for soul-plugin. 
- Add Context path mapping plugin for soul-plugin. 
- Add Grpc plugin supports grpc protocol. 
- Support form submission for dubbo plugin.
- feat(plugin handle): 
- Add dist package module 
- Add test cases for soul-admin 
- Add register center for consul 
- Add register center for etcd 
- Add register center for nacos 
- Add register center for zookeeper 


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

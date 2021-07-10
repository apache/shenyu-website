---
title: "【Apache Shenyu 网关发布里程碑的2.3.0版本】新增支持GRPC，Tars，Sofa协议" 
author: "xiaoyu"
description: "Apache Shenyu 网关发布里程碑的2.3.0版本，新增支持GRPC，Tars，Sofa协议" 
categories: "ShenYu"
tags: ["Apache ShenYu"]
date: 2020-07-05
cover: "/img/architecture/shenyu-framework.png"
---  

距离上一次发布长达半年之久，在这半年的时间里，我与我的社区小伙伴们，做了太多太多的事情。
完成了将近 `200` 多次PR，发表了将近`300` 篇文章的源码解析，新增贡献者 `120` 多位，晋升了 `7` 位committer，并且全部获得正版 `jetbrains` 全家桶。非常感谢他们，在他们的帮助下，我们完成了非常多非常多的功能。

## shenyu-admin（dashboard）
`admin`是整个网关的控制面板，掌管所有的流量，规则的匹配。
- 整合`shiro`框架，完成了用户按钮级别的权限控制。
- 模板化插件，让用户无需感知前端页面，只专注于数据的配置。
- admin整个后端的国际化，支持中英文切换。
- 新增支持`H2`来存储数据。
- admin界面的美观优化（表格，按钮）。
- 新增单元测试，覆盖率达到百分之七十。

## Shenyu 网关插件
### 插件新增
- 新增`GRPC`插件，全面支持`GRPC`协议。
- 新增`Tars`插件，支持腾讯 `tars RPC`协议。
- 新增`Sofa` 插件，支持 `sofa RPC`协议。
- 新增 `Sentinel` 插件，整合 `sentinel`框架的熔断限流功能。
- 新增 `Resilience4j` 插件，整合 `Resilience4j`框架的熔断限流功能。
- 新增 `Rediect` 插件，支持用户的重定向。
- 新增 `Context-path`插件，支持用户自定义 `context-path`

### 插件优化
- `Divide` 插件：节点探活方式的优化，流量预热方式的优化。
- `Ratelimiter`插件：新增并发，漏桶等不同的限流算法，供用户选择。
- `Sgin` 插件：修复必须设置 url 的 bug，新增是否验证 标记，可以用来做开放平台的URI认证。
- `Dubbo`插件：新增 form 表单，URI 参数请求， 新增注册中心直连，参数校验等功能。

## Shenyu Client
##### shenyu-client只是提供一种快速接入网关的客户端，不是必须的。如果用户不使用，可以在shenyu-admin自行配置规则即可。
- `spring-mvc`客户端的优化，支持`spring`， `spring-boot`所有版本。
- `spring-cloud`客户端的优化，支持`spring`， `spring-boot`所有版本。
- `dubbo`客户端的优化，支持`spring`， `spring-boot`所有版本。
- 新增 `shenyu-grpc-client` 支持 `grpc-java`用户接入。
- 新增 `shenyu-tars-client` 支持 `tars-java`用户接入。
- 新增 `shenyu-sofa-client` 支持 `sofa-java`用户接入。

##### 在之前的版本中，只支持http方式接入,而这次新增注册中心方式接入。
- 新增 `zookeeper` 作为注册中心的方式接入`shenyu`网关。
- 新增 `Nacos` 作为注册中心的方式接入`shenyu`网关。
- 新增 `Consul` 作为注册中心的方式接入`shenyu`网关。
- 新增 `Etcd` 作为注册中心的方式接入`shenyu`网关。
- 使用方式请参考: https://shenyu.apache.org/zh/projects/shenyu/register-center-design/

## Shenyu 数据同步
- 修复 `Nacos` 配置中心同步未设置 `NameSpace` 的Bug。
- 优化 `Websocket` 同步方式。
- 解决 `shenyu-admin` 集群部署时候，`Http` 长轮询方式同步数据 Bug。

## 鸣谢
这是一次具有里程碑意义的发布，也是 shenyu 网关，正式正规的一次变革，我们的 dashboard, 代码，文档， issue， PR 全部英文国际化，整个项目的单元测试覆盖率达到了百分之70。再次感谢你们的辛苦付出。虽然我们完成了非常多的功能（在上面我没有完全列举），但是在接下来，我们会有更多的挑战，我相信有你们在，这并不是我们的终点，而是我们腾飞起点。

## 加入我们
目前 shenyu 处于高速发展阶段，如果你追求写高质量的代码，或者想深刻的理解API网关，或者享受开源的乐趣，结识很多优秀的朋友，欢迎大家加入我们的社区。
- github : https://github.com/apache/incubator-shenyu
- gitee :  https://gitee.com/Apache-ShenYu/incubator-shenyu
- qq群 ：429951241
- 目前微信群加入不了，想加入的可以在github 提issue留言，或者进入QQ群后再问。

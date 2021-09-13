---
title: Release Notes
sidebar_position: 13
keywords: ["release-notes"]
description: release-notes
---

### 2.4.0

#### New Features

- Support reading init_script file which is not under resource/directory
- Display the plugin menus in categories
- Admin add execute Multi-path sql script
- IpUtils add a parameter to select the network ip
- Add parameter-mapping plugin
- Support Consul as shenyu-register-center
- Support Etcd as shenyu-sync-data-center
- Add sentinel customized fallbackhandler
- Add response plugin
- Add JWT plugin
- Add Request plugin
- Add Motan plugin
- Add Logging plugin
- Add Modify-response plugin
- Add Oauth2 plugin
- Add Menu Resource Permissions
- Add Data Permissions

#### API Changes

- Change the project name from Soul to ShenYu
- Change the group id from org.dromara to org.apache.shenyu

#### Enhancement

- H2 support insert ingore into in Mysql model
- Improvements For the Apache Dubbo plugin
- Optimization of GRPC plugin

#### Refactor

- Refactor code about "async invoke" is not supported in Dubbo lower than 2.7.3
- Replace the term Operator by Predicate
- Refine judge conditions operator
- Refactor PredicateJudge module using SPI
- Refactor code about client register

#### Bug Fix

- Fix the JwtUtil.getUserId method bug
- Fix the shenyu-spring-boot-starter bug
- The encoded urlPath will be re-encoded in WebClientPlugin
- Replace The Risky Cryptographic Algorithm "AES/ECB/NoPadding"
- ReadTimeoutHandler on a channel which in a PooledConnectionProvider would cause an unexpected ReadTimeoutException
- Got ClassNotFoundException while start my Gateway in 2.4.8 spring boot

### 2.3.0

#### soul-admin

- Add `open` field to allow app path authentication or not in sign plugin.
- Optimize divide plugin to use common plugin template in soul-dashboard.
- Add default values and rule checks in plugin handler.
- Add resource management to allow user to add plugin, adjust menu and button resource and so on in soul-dashboard and soul-admin.
- Add menu and data permission in soul-admin.
- Add H2 store for soul-admin.

#### soul-bootstrap

- Add tars plugin
- Add sentinel plugin
- Add sofa plugin
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

- Complete plug-in architecture design, plug-in hot-swappable.
- Fully supports all versions of dubbo, alibaba-dubbo, apache-dubbo.
- Support dubbo generalization call, multi-parameter, complex parameter interface.
- Enhance the monitoring plug-in, remove influxdb support, increase memory, CPU, QPS, TPS, response delay and other indicators, and support access to Prometheus.
- The springCloud plug-in supports two registration centers, eureka and nacos.
- Waf plug-in enhancements, black and white albums, and mixed modes.
- Removed the Hystrix fuse function, independent as a plug-in support.
- Modify the data synchronization method bug in Zookeeper, and add the nacos synchronization method.
- Diversified customer support, providing traditional and springboot access to spring.
- Optimize the soul-background control interface.
- Load balancing algorithm bug repair.
- Fix bugs when uploading large files.

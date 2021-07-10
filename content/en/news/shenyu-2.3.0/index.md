---
title: "【Apache Shenyu gateway release milestone version 2.3.0】New support for grpc, tars and sofa protocols!"
author: "xiaoyu"
description: "Apache Shenyu gateway release milestone version 2.3.0 New support for grpc, tars and sofa protocols"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2020-07-05
cover: "/img/architecture/shenyu-framework.png"
---

It's half a year since the last release. In this half a year, our community friends and I have done too much. Completed nearly 200 PR, published nearly 300 articles of source code analysis, added more than 120 contributors, promoted 7 members of the commiter who  won the legitimate JetBrains. We have completed many, many functions  With their help. Thank you very much.


## shenyu-admin（dashboard）

Admin is the control panel of the whole gateway, which is in charge of all traffic and rules matching.
- The Shiro framework is integrated into admin to complete the  permission control in user button level. 
- Templated plug-ins allow users to focus on data configuration without perceiving front-end pages.
- The internationalization of the whole backend of admin , supports switching between Chinese and English. 
- New support for H2 to store data.
- Beautiful optimization of admin interface (table, button).
- New unit tests have been added, with a coverage rate of 70%.


## Shenyu gateway plugin

### New plugins
- Add Grpc plugin to fully support grpc protocol.
- Add Tars plugin to support Tencent tars RPC Protocol.
- Add sofa plugin supports the sofa RPC Protocol.
- Add sentinel plugin to integrate the fusing and current limiting function of sentinel framework.
- Add The resilience4j plugin to integrate the fusing and current limiting function of resilience4j framework.
- Add the redisect plugin to support user redirection.
- Add context path plugin to support user-defined context path

###  plugins optimization
- Divide plugin: optimization of node detection mode and flow preheating mode.
- Ratelimit plugin: add some different current limiting algorithms  such as concurrent, leaky bucket and other for users to choose .
- Sgin plugin: fix the bug that URL must be set; add whether to verify flag, which can be used for URI authentication of open platform.
- Dubbo plugin: add form, URI parameter request, direct connection to registration center , parameter verification and other functions.

## Shenyu Client
Shenyu client only provides a client to access the shenyu gateway with a quick way, which is not necessary. you can configure the rules in Shenyu admin If you don't use Shenyu Client. 

- Spring MVC client optimization, support spring, spring boot all versions.
- Spring cloud client optimization, support spring, spring boot all versions.
- Dubbo client optimization, support spring, spring boot all versions.
- Shenyu grpc client is added to support grpc Java user access.
- Shenyu tars client is added to support tars Java user access.
- Shenyu sofa client is added to support sofa Java user access.

In the previous version, only HTTP access is supported, but  the registry access is added this time.
- Zookeeper is added as the registration center to access Shenyu gateway.
- Nacos is added as the registration center to access Shenyu gateway.
- Consul is added as the registration center to access Shenyu gateway.
- Etcd is added as the registration center to access Shenyu gateway.
- Please refer to https://shenyu.apache.org/en/projects/shenyu/register-center-design/

## Shenyu data synchronization
- Fix bugs in Nacos configuration center that do not have namespace set.
- Optimize websocket synchronization mode.
- Solve the HTTP long polling synchronous data bug when  the shenyu admin in deployed in cluster


## Thanks
This is a milestone release and a formal change of Shenyu gateway. Our dashboard, code, documents, issue and PR are all internationalized in English, and the unit test coverage of the whole project has reached 70%.Thank you again for your hard work. Although we have completed a lot of functions (I did not fully list them above), we will have more challenges in the future. I believe that with you, this is not our end, but our starting point.

## Join us
At present, Shenyu is in the stage of rapid development. If you want to write high-quality code, or want to deeply understand the API gateway, or enjoy the fun of open source, you are welcome to join our community

 - github : https://github.com/apache/incubator-shenyu 
 - gitee : https://gitee.com/Apache-ShenYu/incubator-shenyu 
 - QQ group：429951241 


---
title: "[Apache ShenYu 2.5.1 Version Release]"
description: "Apache ShenYu 2.5.1 Version Release"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2022-02-04
---  

Just after Chinese New Year, Apache ShenYu ushered in version 2.5.1. This release has 259 pull requests and 64 contributors. Several new features were added, bugs were fixed, and several optimizations were made.


### New Features

1. Add brpc example
2. Add spring boot starter plugin brpc&admin
3. Add brpc-plugin
4. Add shenyu-client-api-doc
5. Add sdk duplicate class check
6. Support diff nacos namespace
7. Add array method of expression in mock plugin
8. Support generation of mock data on request
9. Support user specify http request domain
10. Add MockRequestRecord
11. Development shenyu-register-instance-eureka
12. Support API document Api doc detail mapper
13. Add api doc ddl
14. Add TagMapper and TagRelationMapper
15. Add api and api_rule_relation mapper
16. Not config rule
17. Refactor message readers
18. Add sentinel rule handle parameter
19. Add shenyu-e2e test engine
20. Make an Apache Shenyu SSO authentication plugin based on casdoor
21. Add logging-tencent-cls plugin
22. Support clickhouse-logging-pugin
23. Add logging-pulsar plugin
24. Add new plugin: key-auth
25. Fix sign plugin DataBufferLimitException error
26. Fix context-path error

### API Changes

### Enhancement

1. Add simpler client annotations for motan
2. Add simpler client annotations for websocket
3. Add configuration in starter for motan plugin
4. Add convenience annotation for shenyu-client-springcloud and shenyu-client-springmvc

### Refactor

1. Refactor some code for mock request of api doc
2. Refactor logging-clickhouse
3. Polish maven dependencies of dubbo
4. Refactor sign plugin
5. Update ShenyuExtConfiguration
6. Remove unnecessary singleton
7. Fix generating mock data in multithreading
8. Refactor sdk test and processArgument
9. Refactor DefaultSignService
10. Fix shenyu-admin rule
11. Optimized ShaUtil
12. Fix cache too large
13. Fix ConcurrentModificationException
14. Fix sync data in etcd
15. Refactor shenyu sdk client
16. Optimize request timeout response
17. Refactor log module
18. Refactor shenyu-client-springcloud
19. Refactor MotanServiceEventListener
20. Refactor shenyu-admin sync data listener
21. Refactor shenyu-client-tars
22. Refactor client sdks alibaba dubbo
23. Refactor springmvc client
24. Refactor admin mapper config
25. Refactor shenyu-plugin-logging
26. Optimize random algorithm
27. Refactor random loadbalancer
28. Refactor logging-kafka

### Bug Fix

1. Remove redundant cookie setting
2. Fix appAuth delete
3. fix Cryptor-Request Plugin
4. To avoid load the same ext plugins repeatedly
5. Fix the TagRelationQuery
6. Fix upgrade sql
7. Fix Nacos register NPE
8. Fix sandbox json parsing
9. Prevent the first time from failing to load
10. Fix plugin update bug by modifying config field setter
11. Fix postgresql sql
12. Fix the postgresql error during ShenYu-Admin startup
13. Fix sentinel can't fuse
14. Fix TencentClsLogCollectClient
15. Fix change password error
16. Fix selector page
17. Fix request plugin can't replaceCookie
18. Fix RateLimiterPlugin concurrent handler error

Special thanks to the following contributors for their support and participation in version 2.5.1 (in no particular order).

> dragon-zhang, zhengpeng, mahaitao, 愿凌飞, hdgaadd, dayu, SongTao Zhuang, Misaya295 , Shawn Jim , yunlongn , Will , moremind , RayayChung , Kevin Clair , huanccwang , 柯杨 , Kunshuai Zhu , fantiq , youzipi , class , kyeongsun , 杨阳洋 , Liming Deng , 杨文杰 , xcsnx , hnxiaoyuan , dependabot , xiaoyu , wzhangNJ , Zihao Huang , ywj1352 , pandaapo , WuLang , Nineteen , kyeongsun , ableYang , Runqi Zhao , WeiS , Luke.Z , lahmxu , Sinsy , Daming , BoyuLi4 , jakiuncle , Bowen Li , huanccwang , gitchenjh , DamonXue , Wu Daifu , Jiageng , nuo-promise , Guocheng Tang , likeguo , Sixh-PrFor , throwable , renzhuyan , wangteng , qinghai777 , zly123987123 , 奕仁 , 尔等同学 , qifanyyy , Jairo , ousinka

---
title: "[Apache ShenYu 2.7.0.1 Version Release]"
description: "Apache ShenYu 2.7.0.1 Version Release"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2025-05-03
---

## Apache ShenYu

Apache ShenYu is a responsive API gateway developed using Java Reactor. With its high performance, dynamic and flexible traffic control, hot swap, easy deployment and other features, out of the box to provide users with a full lifecycle of 'API' gateway, including 'API' registration, service proxy, protocol conversion, 'API' documentation and 'API' governance and other functions. Apache ShenYu graduated as an Apache top-level project in 'July 2022'.

> website: https://shenyu.apache.org
> 
> GitHub: https://github.com/apache/shenyu

## Version preview

Three months later, Apache ShenYu released version 2.7.0.1, which submitted a total of `72+ Pull requests`, added about `17+ new features`, added several enhancements, refactored several features, and fixed several bugs. A total of `32` contributors participated, with a cumulative total of 403+ contributors.

> version records: https://github.com/apache/shenyu/compare/v2.7.0...v2.7.0.1
> 

## What's Changed

* fixed some bug when using http-polling mode by @xesprni in https://github.com/apache/shenyu/pull/5889
* [type:refactor] plugin-jwt SPI extension for parsing JWT payloads to ensure compatibility with older versions of JWT tools by @ISKonst in https://github.com/apache/shenyu/pull/5882
* [type:fix] support dubbo method configure by @eye-gu in https://github.com/apache/shenyu/pull/5891
* [type:release] release 2.7.0 by @Aias00 in https://github.com/apache/shenyu/pull/5892
* [type:refactor]Add test case for RestTemplateConfiguration by @po-168 in https://github.com/apache/shenyu/pull/5894
* [type:refactor]Add test case for ShenyuControllerEndpoint by @po-168 in https://github.com/apache/shenyu/pull/5898
* [type:refactor] Optimize code for shenyu-sync-data by @po-168 in https://github.com/apache/shenyu/pull/5872
* [type:refactor] Optimize code for shenyu-registry by @po-168 in https://github.com/apache/shenyu/pull/5876
* [type:refactor] Optimize code for shenyu-register-common by @po-168 in https://github.com/apache/shenyu/pull/5875
* [type:refactor]Add test case for CollapseSlashesFilter by @po-168 in https://github.com/apache/shenyu/pull/5904
* [type:optimize] Optimize BodyParamUtils with Caffeine cache by @g0ne150 in https://github.com/apache/shenyu/pull/5905
* [type:fix] remove duplicate entry '1792749362445840479' for key resource.PRIMARY from resource table  by @cntigers in https://github.com/apache/shenyu/pull/5908
* Revert "[type:fix] remove duplicate entry '1792749362445840479' for key resource.PRIMARY from resource table " by @moremind in https://github.com/apache/shenyu/pull/5910
* [type:refactor]Add test case for ShenyuPluginClassLoaderHolder by @po-168 in https://github.com/apache/shenyu/pull/5909
* [type:fix]fix namespace delete error by @liyabing12138 in https://github.com/apache/shenyu/pull/5916
* [type:fix] remove duplicate entry '1792749362445840479' for key resource.PRIMARY from resource table apache#5895 by @cntigers in https://github.com/apache/shenyu/pull/5911
* fixed RateLimiter remoteAddress issues Please reply #5340. by @wlngo in https://github.com/apache/shenyu/pull/5504
* [type:refactor] Optimize code for shenyu-kubernetes-controller by @po-168 in https://github.com/apache/shenyu/pull/5877
* upgrede upload/dowmload-artifact version v3 to v4 by @dyp314417995 in https://github.com/apache/shenyu/pull/5926
* [type:feature] use checkstyle to avoid ==null check by @eye-gu in https://github.com/apache/shenyu/pull/5927
* [Volunteer #5641] Improper word usage in Plugin Logging-Kafka configuration#namesrvAddr   by @deepPublicGit in https://github.com/apache/shenyu/pull/5918
* [type:refactor] Optimize code for shenyu-spring-boot-starter by @po-168 in https://github.com/apache/shenyu/pull/5873
* [type:fix] The rule cache can not be deleted in shenyu-bootstrap when use nacos as sync center by @Wweiei in https://github.com/apache/shenyu/pull/5929
* perf(logging): Optimize the performance of log collection by @zongmingzhi in https://github.com/apache/shenyu/pull/5931
* [type:fix]Fix upgrade sql by @xcsnx in https://github.com/apache/shenyu/pull/5932
* [type:fix]fix 2.6.1 to 2.7.0 upgrade.sql by @xcsnx in https://github.com/apache/shenyu/pull/5933
* [type:feature] support dubbo protobuf serialization by @eye-gu in https://github.com/apache/shenyu/pull/5903
* [type:feat] add ai proxy plugin by @Aias00 in https://github.com/apache/shenyu/pull/5938
* [type:fix] use wasm32-wasip1 target by @eye-gu in https://github.com/apache/shenyu/pull/5936
* [type:feature] add ai proxy plugin sql by @Aias00 in https://github.com/apache/shenyu/pull/5939
* [type:feat] add shenyu infra module by @moremind in https://github.com/apache/shenyu/pull/5941
* [type:feat] ai proxy selector config by @Aias00 in https://github.com/apache/shenyu/pull/5942
* [type:fix] set dubbo method config in reference by @eye-gu in https://github.com/apache/shenyu/pull/5944
* [type:fix] fix h2 database wrong json by @eye-gu in https://github.com/apache/shenyu/pull/5948
* [type:feature] parse return type when build api doc by @eye-gu in https://github.com/apache/shenyu/pull/5946
* [type:feat] add Logging-Kafka Plugin e2e and make independent of Logging-rocketmq e2e by @jakiuncle in https://github.com/apache/shenyu/pull/5709
* [refactor] ai proxy plugin refactor by @Aias00 in https://github.com/apache/shenyu/pull/5952
* [fix] fix logging gzip messy by @Aias00 in https://github.com/apache/shenyu/pull/5955
* [feat] add jdbc properties by @Aias00 in https://github.com/apache/shenyu/pull/5951
* [fix] fix upload jar checkfile by @Aias00 in https://github.com/apache/shenyu/pull/5958
* [type:refactor] remove springcloud plugin and refactor discovery plugin. by @yunlongn in https://github.com/apache/shenyu/pull/5812
* [type:fix] fix 2.6.1 shenyu-client register failed by @Wweiei in https://github.com/apache/shenyu/pull/5960
* Configuring gitpod with java by @kerwin612 in https://github.com/apache/shenyu/pull/5957
* [type:feat] ai token limiter plugin by @Aias00 in https://github.com/apache/shenyu/pull/5956
* [fix] fix upgrade sql bug by @Aias00 in https://github.com/apache/shenyu/pull/5963
* [type:fix]fix delete namespace  by @xcsnx in https://github.com/apache/shenyu/pull/5964
* [fix] fix heartbeat logic by @Aias00 in https://github.com/apache/shenyu/pull/5970
* [type:feat] add ai prompt plugin by @Aias00 in https://github.com/apache/shenyu/pull/5962
* [refactor] refactor create user default ns rel by @Aias00 in https://github.com/apache/shenyu/pull/5975
* [type:refactor] Optimize code for assert keyword #5967 by @yqw570994511 in https://github.com/apache/shenyu/pull/5968
* [type:fix] fix(plugin-base): avoid NPE in MetaDataCache cache by @yqw570994511 in https://github.com/apache/shenyu/pull/5985
* fix(logging-clickhouse): avoid unnecessary config refresh when clickhouse config unchanged. by @yqw570994511 in https://github.com/apache/shenyu/pull/5984
* [type:bugfix]Add more retry strategies by @JerryDtj in https://github.com/apache/shenyu/pull/5969
* [ci] upgrade codeql version for ci error by @Aias00 in https://github.com/apache/shenyu/pull/5994
* [type:fix] fix(admin): Ensure data consistency by adding @Transactional by @yqw570994511 in https://github.com/apache/shenyu/pull/5992
* Added cache MD5 judgment by @JerryDtj in https://github.com/apache/shenyu/pull/5995
* [type:fix] (admin-appAuth): Fix path validation logic defects by @yqw570994511 in https://github.com/apache/shenyu/pull/5993
* [type:fix] fix(admin): Fix dirty data issue caused by cache deletion order in AlertDispatchServiceImpl. by @yqw570994511 in https://github.com/apache/shenyu/pull/5991
* [fix] fix ai plugin sql by @Aias00 in https://github.com/apache/shenyu/pull/5990
* fix admin:import comfig error. by @478320 in https://github.com/apache/shenyu/pull/5997
* [type:fix] (logging-elasticsearch): Fixed the issue where Elasticsearch log configuration was not refreshed correctly after modification. by @yqw570994511 in https://github.com/apache/shenyu/pull/6004
* [fix] fix ci by @Aias00 in https://github.com/apache/shenyu/pull/5998
* [type:fix] (logging-tencent): Fixed the issue where Tencent log configuration was not refreshed correctly after modification. by @yqw570994511 in https://github.com/apache/shenyu/pull/6002
* [type:fix] (logging-aliyun): Fixed the issue where Aliyun log configuration was not refreshed correctly after modification. by @yqw570994511 in https://github.com/apache/shenyu/pull/6000
* [feat] Supports generating Elasticsearch indices daily and creating an alias for them. by @Aias00 in https://github.com/apache/shenyu/pull/5977
* [refactor] refactor ai plugins by @Aias00 in https://github.com/apache/shenyu/pull/5986
* [fix] fix http check by @Aias00 in https://github.com/apache/shenyu/pull/5989
* [fix] fix java doc by @Aias00 in https://github.com/apache/shenyu/pull/6008
* [type:refactor] refactor ai plugin by @moremind in https://github.com/apache/shenyu/pull/6010
* [fix] fix license by @Aias00 in https://github.com/apache/shenyu/pull/6011
* [release] modify pom version to 2.7.0.1-SNAPSHOT by @Aias00 in https://github.com/apache/shenyu/pull/6012

## New Contributors

* @xesprni made their first contribution in https://github.com/apache/shenyu/pull/5889
* @g0ne150 made their first contribution in https://github.com/apache/shenyu/pull/5905
* @cntigers made their first contribution in https://github.com/apache/shenyu/pull/5908
* @liyabing12138 made their first contribution in https://github.com/apache/shenyu/pull/5916
* @deepPublicGit made their first contribution in https://github.com/apache/shenyu/pull/5918
* @zongmingzhi made their first contribution in https://github.com/apache/shenyu/pull/5931
* @yqw570994511 made their first contribution in https://github.com/apache/shenyu/pull/5968
* @JerryDtj made their first contribution in https://github.com/apache/shenyu/pull/5969

## Become a contributor

We welcome every contributor to join ShenYu, and welcome contributors to participate in ShenYu in the spirit of Apache Way!

See the contributor guidelines:

> https://shenyu.apache.org/zh/community/contributor-guide

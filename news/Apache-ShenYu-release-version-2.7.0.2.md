---
title: "[Apache ShenYu 2.7.0.2 Version Release]"
description: "Apache ShenYu 2.7.0.2 Version Release"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2025-08-25
---

## Apache ShenYu

Apache ShenYu is a responsive API gateway developed using Java Reactor. With its high performance, dynamic and flexible traffic control, hot swap, easy deployment and other features, out of the box to provide users with a full lifecycle of 'API' gateway, including 'API' registration, service proxy, protocol conversion, 'API' documentation and 'API' governance and other functions. Apache ShenYu graduated as an Apache top-level project in 'July 2022'.

> website: https://shenyu.apache.org
> 
> GitHub: https://github.com/apache/shenyu

## Version preview

Three months later, Apache ShenYu released version 2.7.0.2, which submitted a total of `54+ Pull requests`, added about `19+ new features`, added several enhancements, refactored several features, and fixed several bugs. A total of `20` contributors participated, with a cumulative total of 411+ contributors.

> version records: https://github.com/apache/shenyu/compare/v2.7.0.1...v2.7.0.2
> 

## What's Changed

- [release] 2.7.0.1 release by @Aias00 in https://github.com/apache/shenyu/pull/6014
- [fix] fix doc pulling error by @Aias00 in https://github.com/apache/shenyu/pull/6016
- [feat] update badge by @Aias00 in https://github.com/apache/shenyu/pull/6023
- [fix] fix h2 ai proxy sql lack of selector handle by @fantasy-lotus in https://github.com/apache/shenyu/pull/6025
- fix：update ai proxy plugin_handle to not required by @fantasy-lotus in https://github.com/apache/shenyu/pull/6024
- [fix] fix README.md quickstart(docker) by @fantasy-lotus in https://github.com/apache/shenyu/pull/6026
- fix AiTokenLimiterPlugin appendResponse by @HY-love-sleep in https://github.com/apache/shenyu/pull/6027
- [fix] fix data buffer leak by @Aias00 in https://github.com/apache/shenyu/pull/5988
- feat: ai-request-transformer plugin by @478320 in https://github.com/apache/shenyu/pull/6033
- fix plugin-ai-request-transformer :fix UI error by @478320 in https://github.com/apache/shenyu/pull/6035
- Fix spelling errors and code issues. by @ttfont in https://github.com/apache/shenyu/pull/6036
- [fix] fix ci modify kafka version by @Aias00 in https://github.com/apache/shenyu/pull/6039
- Bump org.apache.kafka:kafka-clients from 3.7.1 to 3.9.1 by @dependabot[bot] in https://github.com/apache/shenyu/pull/6037
- [type:feat] bootstrap instances status by @Aias00 in https://github.com/apache/shenyu/pull/5950
- [type:fix] (logging-rabbitmq): Fixed the issue where Rabbitmq log configuration was not refreshed correctly after modification. by @yqw570994511 in https://github.com/apache/shenyu/pull/6001
- modify dubbo plugin configuration based on selector by @Wweiei in https://github.com/apache/shenyu/pull/5953
- [type:fix] not change singletion config by @eye-gu in https://github.com/apache/shenyu/pull/6044
- [ISSUE #6045]Fix admin : modify addproxyselector function have some error. by @gitYupan in https://github.com/apache/shenyu/pull/6046
- [fix] ai request transformer plugin by @478320 in https://github.com/apache/shenyu/pull/6047
- Bump org.apache.zookeeper:zookeeper from 3.9.2 to 3.9.3 by @dependabot[bot] in https://github.com/apache/shenyu/pull/6042
- [fix] fix application.xml by @478320 in https://github.com/apache/shenyu/pull/6048
- [type:feat] mcp server plugin by @Aias00 in https://github.com/apache/shenyu/pull/5999
- Bump org.apache.commons:commons-lang3 from 3.12.0 to 3.18.0 by @dependabot[bot] in https://github.com/apache/shenyu/pull/6052
- [feat] optimize aiTokenLimiterPlugin for streaming tokens by @HY-love-sleep in https://github.com/apache/shenyu/pull/6055
- [fix] fix config import by @liuqian1990 in https://github.com/apache/shenyu/pull/6051
- [type:feature] Add Swagger Import Functionality to ShenYu Admin by @guanzhenxing in https://github.com/apache/shenyu/pull/6050
- [feat] mcp streamable http by @ZWJzhangwanjie in https://github.com/apache/shenyu/pull/6061
- feat: add other infra module template by @yuluo-yx in https://github.com/apache/shenyu/pull/6067
- feat(ut): add ai plugin proxy unit test by @yuluo-yx in https://github.com/apache/shenyu/pull/6070
- chore: delete useless empty paths by @yuluo-yx in https://github.com/apache/shenyu/pull/6066
- e2e: comment for now by @yuluo-yx in https://github.com/apache/shenyu/pull/6073
- feat(ut): add ai plugin unit test by @yuluo-yx in https://github.com/apache/shenyu/pull/6069
- chore(style): Update application.yml by @yuluo-yx in https://github.com/apache/shenyu/pull/6064
- feat(ut): add ai prompt unit test by @yuluo-yx in https://github.com/apache/shenyu/pull/6075
- feat: add shenyu-common utils unit test by @yuluo-yx in https://github.com/apache/shenyu/pull/6077
- feat(ut): add ai plugin unit test by @yuluo-yx in https://github.com/apache/shenyu/pull/6078
- [feat] add aiRequestTransformer config based on rule sql by @478320 in https://github.com/apache/shenyu/pull/6053
- feat: add diruptor unit test by @yuluo-yx in https://github.com/apache/shenyu/pull/6079
- feat: extracted public data entities by @yuluo-yx in https://github.com/apache/shenyu/pull/6084
- refactor(infra): Refactor ShenYu-Infra module by @yuluo-yx in https://github.com/apache/shenyu/pull/6082
- [fix] correct logic in local key validation in LocalDispatcherFilter by @zhangshenghang in https://github.com/apache/shenyu/pull/6086
- [fix] resource leak risk by @zhangshenghang in https://github.com/apache/shenyu/pull/6085
- feat(ut): update infra nacos module unit test by @yuluo-yx in https://github.com/apache/shenyu/pull/6089
- [feat] Add alert test by @zhangshenghang in https://github.com/apache/shenyu/pull/6088
- feat: add infra-etcd unit test by @yuluo-yx in https://github.com/apache/shenyu/pull/6087
- [fix] resolve duplicate header issue for JWT values with dot notation by @zhangshenghang in https://github.com/apache/shenyu/pull/6092
- [feat]: add ai response transformer by @HY-love-sleep in https://github.com/apache/shenyu/pull/6095
- [test] add RoundRobinLoadBalancer tests for selection logic and distribution by @zhangshenghang in https://github.com/apache/shenyu/pull/6093
- chore(deps): bump io.grpc:grpc-protobuf from 1.53.0 to 1.54.2 in /shenyu-examples/shenyu-examples-sofa/shenyu-examples-sofa-service by @dependabot[bot] in https://github.com/apache/shenyu/pull/6100
- fix: fix vulnerability by @Aias00 in https://github.com/apache/shenyu/pull/6099
- improve the function of dubbo plugin configuration based on selector, add registry config. by @Wweiei in https://github.com/apache/shenyu/pull/6096
- chore: update LICENSE and pom.xml for release 2.7.0.2 by @Aias00 in https://github.com/apache/shenyu/pull/6104
- sync dashboard by @VampireAchao in https://github.com/apache/shenyu/pull/6106

## New Contributors

- @fantasy-lotus made their first contribution in https://github.com/apache/shenyu/pull/6025
- @HY-love-sleep made their first contribution in https://github.com/apache/shenyu/pull/6027
- @gitYupan made their first contribution in https://github.com/apache/shenyu/pull/6046
- @liuqian1990 made their first contribution in https://github.com/apache/shenyu/pull/6051
- @guanzhenxing made their first contribution in https://github.com/apache/shenyu/pull/6050
- @ZWJzhangwanjie made their first contribution in https://github.com/apache/shenyu/pull/6061
- @yuluo-yx made their first contribution in https://github.com/apache/shenyu/pull/6067
- @zhangshenghang made their first contribution in https://github.com/apache/shenyu/pull/6086

## Become a contributor

We welcome every contributor to join ShenYu, and welcome contributors to participate in ShenYu in the spirit of Apache Way!

See the contributor guidelines:

> https://shenyu.apache.org/zh/community/contributor-guide

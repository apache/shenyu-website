---
title: "[Apache ShenYu 2.7.0 Version Release]"
description: "Apache ShenYu 2.7.0 Version Release"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2025-01-15
slug: Apache-ShenYu-release-version-2.7.0
---

## Apache ShenYu

Apache ShenYu is a responsive API gateway developed using Java Reactor. With its high performance, dynamic and flexible traffic control, hot swap, easy deployment and other features, out of the box to provide users with a full lifecycle of 'API' gateway, including 'API' registration, service proxy, protocol conversion, 'API' documentation and 'API' governance and other functions. Apache ShenYu graduated as an Apache top-level project in 'July 2022'.

> website: https://shenyu.apache.org
> 
> GitHub: https://github.com/apache/shenyu

## Version preview

Six months later, Apache ShenYu released version 2.7.0, which submitted a total of `254+ Pull requests`, added about `17+ new features`, added several enhancements, refactored several features, and fixed several bugs. A total of `61` contributors participated, with a cumulative total of 350+ contributors.

> version records: https://github.com/apache/shenyu/compare/v2.6.1...v2.7.0
> 

### ✨ New Features

1.Upgrade dockerfile java runtime version 8 to 17

> specific pr please see: https://github.com/apache/shenyu/pull/5374

2.Upgrade SpringBoot to 3.x

> specific pr please see: https://github.com/apache/shenyu/pull/5583

3.Support ShenYu Admin Cluster

> specific pr please see: https://github.com/apache/shenyu/pull/5544
> 
> https://github.com/apache/shenyu/pull/5592

4.Upgrade checkstyle plugin to 3.4.0

> specific pr please see: https://github.com/apache/shenyu/pull/5614

5.Datasource support OceanBase

> specific pr please see: https://github.com/apache/shenyu/pull/5617

6.Supports batch modification of selector/rule status

> specific pr please see: https://github.com/apache/shenyu/pull/5499

7.Supports batch modification of PathAuth status 

> specific pr please see: https://github.com/apache/shenyu/pull/5488

8.Upgrade apache dubbo version 

> specific pr please see: https://github.com/apache/shenyu/pull/5527

9.Support `Contribute with Gitpod`

> specific pr please see: https://github.com/apache/shenyu/pull/5610

10.Support Configs Export And Import 

> specific pr please see: https://github.com/apache/shenyu/pull/5474

11.Add shenyu client heartbeat 

> specific pr please see: https://github.com/apache/shenyu/pull/5659

12.Support Namespace 

> the specific use please see: https://shenyu.apache.org/docs/user-guide/admin-usage/namepsace
> 
> specific pr please see: https://github.com/apache/shenyu/pull/5584
>
> https://github.com/apache/shenyu/pull/5715
>
> https://github.com/apache/shenyu/pull/5716
>
> https://github.com/apache/shenyu/pull/5719
>
> https://github.com/apache/shenyu/pull/5729
>
> https://github.com/apache/shenyu/pull/5734
>
> https://github.com/apache/shenyu/pull/5735
>
> https://github.com/apache/shenyu/pull/5740
>
> https://github.com/apache/shenyu/pull/5746
>
> https://github.com/apache/shenyu/pull/5757
>
> https://github.com/apache/shenyu/pull/5760
>
> https://github.com/apache/shenyu/pull/5765
>
> https://github.com/apache/shenyu/pull/5769
>
> https://github.com/apache/shenyu/pull/5771
>
> https://github.com/apache/shenyu/pull/5779
>
> https://github.com/apache/shenyu/pull/5786
>
> https://github.com/apache/shenyu/pull/5790
>
> https://github.com/apache/shenyu/pull/5798
>
> https://github.com/apache/shenyu/pull/5799
>
> https://github.com/apache/shenyu/pull/5823
>
> https://github.com/apache/shenyu/pull/5847
>
> https://github.com/apache/shenyu/pull/5857

13.Support k8s dynamically scale 

> specific pr please see: https://github.com/apache/shenyu/pull/5686

14.Invalidate Previous Tokens on New Login by Implementing Client ID Validation

> specific pr please see: https://github.com/apache/shenyu/pull/5600

15.Support for gray release in divide-plugin

> specific pr please see: https://github.com/apache/shenyu/pull/5763

16.Support Kubernetes registry

> specific pr please see: https://github.com/apache/shenyu/pull/5769

### ⚡ Enhancement

1.Add rocketmq logging e2e test

> specific pr please see: https://github.com/apache/shenyu/pull/5439

2.Enhance metrics-ratelimiter collect

> specific pr please see: https://github.com/apache/shenyu/pull/5461

3.Enhance metrics collection for Sentinel, Resilience4j, and Hystrix

> specific pr please see: https://github.com/apache/shenyu/pull/5468

4.Arrange sofa common tools dependencies

> specific pr please see: https://github.com/apache/shenyu/pull/5609

6.Add missing license

> specific pr please see: https://github.com/apache/shenyu/pull/5503

7.Set up callback for send message on Kafka

> specific pr please see: https://github.com/apache/shenyu/pull/5748

8.Use the loadbalance configuration from metadata for Dubbo

> specific pr please see: https://github.com/apache/shenyu/pull/5806

9.Add non null validation for upstream which obtained from select

> specific pr please see: https://github.com/apache/shenyu/pull/5804

10.Set timeout which from rule handle to dubbo rpc context

> specific pr please see: https://github.com/apache/shenyu/pull/5778

11.Publish event when enable selector and rule

> specific pr please see: https://github.com/apache/shenyu/pull/5762

12.Remove closed session from the NAMESPACE_SESSION_MAP

> specific pr please see: https://github.com/apache/shenyu/pull/5734  

13.Add test case for ShenyuClientURIExecutorSubscriber

> specific pr please see: https://github.com/apache/shenyu/pull/5413

14.Add test case for `ShenyuClientIllegalArgumentException`

> specific pr please see: https://github.com/apache/shenyu/pull/5408

15.Add test case for `ShenyuClientRegisterEventPublisher`

> specific pr please see: https://github.com/apache/shenyu/pull/5417

16.Add test case for `ShenyuClientMetadataExecutorSubscriber`

> specific pr please see: https://github.com/apache/shenyu/pull/5404

17.Add test case for `AbstractWasmPluginDataHandler`

> specific pr please see: https://github.com/apache/shenyu/pull/5451

18.Add test case for `ShenyuClientRegisterRepositoryFactoryTest`

> specific pr please see: https://github.com/apache/shenyu/pull/5443

19.Add test case for `AbstractWasmDiscoveryHandler`

> specific pr please see: https://github.com/apache/shenyu/pull/5453

20.Upgrade sofa rpc version support

> specific pr please see: https://github.com/apache/shenyu/pull/5526

21.Add header key of Sign plugin to CrossFilter config

> specific pr please see: https://github.com/apache/shenyu/pull/5627

22.Encrypt the password

> specific pr please see: https://github.com/apache/shenyu/pull/5436

23.Add AbstractShenyuWasmPluginTest

> specific pr please see: https://github.com/apache/shenyu/pull/5450

24.RewritePlugin/ContextPathPlugin supports across application and plugin

> specific pr please see: https://github.com/apache/shenyu/pull/5438

25.Remove duplicate path check

> specific pr please see: https://github.com/apache/shenyu/pull/5514

26.Remove Alibaba Dubbo Support

> specific pr please see: https://github.com/apache/shenyu/pull/5500

27.Support docker env set http path

> specific pr please see: https://github.com/apache/shenyu/pull/5833

28.Add some code refactor improve

> specific pr please see: https://github.com/apache/shenyu/pull/5613

29.Support get token from cookie\header\param

> specific pr please see: https://github.com/apache/shenyu/pull/5547

30.Make the default value of ShenyuDubboService annotation equal to that of DubboService annotation

> specific pr please see: https://github.com/apache/shenyu/pull/5816

31.Add db script into admin package

> specific pr please see: https://github.com/apache/shenyu/pull/5724

32.Get rid of the dead code and add some improvements

> specific pr please see: https://github.com/apache/shenyu/pull/5849
> 
> https://github.com/apache/shenyu/pull/5803
> 
> https://github.com/apache/shenyu/pull/5789

33.MotanServiceEventListenerTest case optimization

> specific pr please see: https://github.com/apache/shenyu/pull/5745

34.Delete duplicate maven in shenyu-registry-eureka.xml

> specific pr please see: https://github.com/apache/shenyu/pull/5836

35.Jwt dependency updated

> specific pr please see: https://github.com/apache/shenyu/pull/5480

36.Print plugin execute time

> specific pr please see: https://github.com/apache/shenyu/pull/5437

37.Discovery Local support upstream health check in Admin

> specific pr please see: https://github.com/apache/shenyu/pull/5596

38.Close rule cache

> specific pr please see: https://github.com/apache/shenyu/pull/5589

39.Less concurrency

> specific pr please see: https://github.com/apache/shenyu/pull/5587

40.Optimize logic to avoid "orElse" execution，Update VersionTwoExtractor.java

> specific pr please see: https://github.com/apache/shenyu/pull/5415

### ♻️ Refactor

1.Admin distributed lock by spring-integration-jdbc

> specific pr please see: https://github.com/apache/shenyu/pull/5457

2.Refactor beanUtils

> specific pr please see: https://github.com/apache/shenyu/pull/5497

3.Remove macos ci

> specific pr please see: https://github.com/apache/shenyu/pull/5559

4.Update logging plugin DataBuffer deprecated method

> specific pr please see: https://github.com/apache/shenyu/pull/5620

5.Modify e2e k8s to docker compose

> specific pr please see: https://github.com/apache/shenyu/pull/5710

6.Migrate Admin swagger from springfox to springdoc

> specific pr please see: https://github.com/apache/shenyu/pull/5630

7.Refactor springcloud plugin

> specific pr please see: https://github.com/apache/shenyu/pull/5695

8.Refactor some code

> specific pr please see: https://github.com/apache/shenyu/pull/5568

9.Delete SO_SNDBUF & SO_RCVBUF

> specific pr please see: https://github.com/apache/shenyu/pull/5502

10.Refactor shenyu-sync-data-http : replace log %s -> {}.

> specific pr please see: https://github.com/apache/shenyu/pull/5465

11.Optimizing the node type listener

> specific pr please see: https://github.com/apache/shenyu/pull/5435

12.Refactor plugin lifecycle

> specific pr please see: https://github.com/apache/shenyu/pull/5432

13.Adjust code order and remove invalid input parameters

> specific pr please see: https://github.com/apache/shenyu/pull/5397

### 🐛 Bug Fix

1.Fix duplicate header for request plugin

> specific pr please see: https://github.com/apache/shenyu/pull/5846

2.Fix proxy.selector and discovery not delete when delete divide selector

> specific pr please see: https://github.com/apache/shenyu/pull/5845

3.Fix LoggingPlugin error log catch

> specific pr please see: https://github.com/apache/shenyu/pull/5842

4.Fix logging plugin sample bug

> specific pr please see: https://github.com/apache/shenyu/pull/5429

5.Fix memory overflow

> specific pr please see: https://github.com/apache/shenyu/pull/5407

6.Fix rewrite integrated test

> specific pr please see: https://github.com/apache/shenyu/pull/5445

7.Fix AbstractWasmPluginDataHandlerTest

> specific pr please see: https://github.com/apache/shenyu/pull/5464

8.Fix missing PRIMARY KEY in sql-script/h2/schema.sql

> specific pr please see: https://github.com/apache/shenyu/pull/5481

9.Fix Data dictionary page data sorting exception

> specific pr please see: https://github.com/apache/shenyu/pull/5483

10.FIx doc error

> specific pr please see: https://github.com/apache/shenyu/pull/5505

11.Resolve dashboard routing mismatch post context-path update

> specific pr please see: https://github.com/apache/shenyu/pull/5510

12.Fix etcd sync config problem

> specific pr please see: https://github.com/apache/shenyu/pull/5535

13.Fix consul sync problem

> specific pr please see: https://github.com/apache/shenyu/pull/5546

14.Fix the bug of being unable to query without registration

> specific pr please see: https://github.com/apache/shenyu/pull/5578

15.Fix Plugin Edit Page Issue by Correcting Plugin ID Query and Updating Data Type

> specific pr please see: https://github.com/apache/shenyu/pull/5622

16.Fix class AdminConstants has word spelling error

> specific pr please see: https://github.com/apache/shenyu/pull/5637

17.Fix shenyu-examples-springmvc start failed

> specific pr please see: https://github.com/apache/shenyu/pull/5664

18.Fix dashboard menu children sort not working problem

> specific pr please see: https://github.com/apache/shenyu/pull/5691

19.Fix ShenyuApacheDubboXmlProviderApplication config

> specific pr please see: https://github.com/apache/shenyu/pull/5811

20.Fix data sync dataId for proxy selector and discovery is not unique

> specific pr please see: https://github.com/apache/shenyu/pull/5783

21.Filter disable dict option

> specific pr please see: https://github.com/apache/shenyu/pull/5776

22.Fix SpringCloudParser MetaData null data

> specific pr please see: https://github.com/apache/shenyu/pull/5737

23.Fix client register validation

> specific pr please see: https://github.com/apache/shenyu/pull/5764

24.Config dubbo serialize-check-status=DISABLE

> specific pr please see: https://github.com/apache/shenyu/pull/5756

25.Fix example TestApacheDubboXmlApplication start failed

> specific pr please see: https://github.com/apache/shenyu/pull/5754

26.Fix the nacos data sync model missing the contextPath configuration

> specific pr please see: https://github.com/apache/shenyu/pull/5722

27.Fix SPI create non singleton objects in multi-threaded scenarios

> specific pr please see: https://github.com/apache/shenyu/pull/5713

28.Fix BadSqlGrammarException

> specific pr please see: https://github.com/apache/shenyu/pull/5707

29.Fix ListUtil->merge exception

> specific pr please see: https://github.com/apache/shenyu/pull/5642

30.Fix metaData disable not filtered

> specific pr please see: https://github.com/apache/shenyu/pull/5638

31.Fix divide logging request method

> specific pr please see: https://github.com/apache/shenyu/pull/5607

32.Fix e2e chunk header error

> specific pr please see: https://github.com/apache/shenyu/pull/5593

33.Fix cookie error and sql check

> specific pr please see: https://github.com/apache/shenyu/pull/5567

34.Fixed NPE issue

> specific pr please see: https://github.com/apache/shenyu/pull/5539
>
> https://github.com/apache/shenyu/pull/5530

35.Fix Invalid path error

> specific pr please see: https://github.com/apache/shenyu/pull/5533

36.Fix hot load issue

> specific pr please see: https://github.com/apache/shenyu/pull/5509

37.Fix e2e test case can not run wget command

> specific pr please see: https://github.com/apache/shenyu/pull/5519

38.Fix fallback issue

> specific pr please see: https://github.com/apache/shenyu/pull/5496

39.Resolve the sql error in rule-sqlmap.xml

> specific pr please see: https://github.com/apache/shenyu/pull/5644

40.Fix readYmlBuildRepository NPE

> specific pr please see: https://github.com/apache/shenyu/pull/5819

41.Fix nacos cannot be registered in the Shenyu-examples-SpringCloud project

> specific pr please see: https://github.com/apache/shenyu/pull/5825

42.Fix springCloud ruleData path setting didn't used

> specific pr please see: https://github.com/apache/shenyu/pull/5841
> 
> https://github.com/apache/shenyu/pull/5843

43.Fix shenyu-plugin-logging-elasticsearch : modify setIndexName of ElasticSearchLogConfig

> specific pr please see: https://github.com/apache/shenyu/pull/5830

44.Fix Not first offline from the gateway when stopping service

> specific pr please see: https://github.com/apache/shenyu/pull/5507

45.Fix k8s liveness probe can not run wget command error

> specific pr please see: https://github.com/apache/shenyu/pull/5513

46.Fix AbstractNodeDataSyncService load discoverUpstream on startup

> specific pr please see: https://github.com/apache/shenyu/pull/5473

## Contributors

Special thanks to the following contributors for their support and participation in the '2.7.0' release (in no particular order).

0xmkzt,Divyansh200102,IceFoxs,JJellyfish,Kerwin Bryant,M.G. Ting,Misaya295,NanMu,Qi Xu,RayayChung,Ricco Chen,Sinsy,
VampireAchao,WindSearcher,Wweiei,Yu Siheng,aias00,caaaaaat,crazyStar,crudboy,dragon-zhang,dyjxg4xygary,dyp314417995,
eye-gu,frank,hdgaadd,hql0312,j@ckzh0u,jerbo99,loongs-zhang,mmengLong,moremind,po-168,tomsun28,ttfont,wlngo,wyfvsfy,
xcsnx,xiangqianZ,xiaoyu,yunlongn,ywwana,zhengke zhou,zhengpeng,ywj1352

## Become a contributor

We welcome every contributor to join ShenYu, and welcome contributors to participate in ShenYu in the spirit of Apache Way!

See the contributor guidelines:

> https://shenyu.apache.org/zh/community/contributor-guide

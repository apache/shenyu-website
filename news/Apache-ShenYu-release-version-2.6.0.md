---
title: "[Apache ShenYu 2.6.0 Version Release]"
description: "Apache ShenYu 2.6.0 Version Release"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2023-08-15
slug: Apache-ShenYu-release-version-2.6.0
---

## Apache ShenYu

Apache ShenYu is a responsive API gateway developed using Java Reactor. With its high performance, dynamic and flexible traffic control, hot swap, easy deployment and other features, out of the box to provide users with a full lifecycle of 'API' gateway, including 'API' registration, service proxy, protocol conversion, 'API' documentation and 'API' governance and other functions. Apache ShenYu graduated as an Apache top-level project in 'July 2022'.

> website: https://shenyu.apache.org
> 
> GitHub: https://github.com/apache/shenyu

## Version preview

Six months later, Apache ShenYu released version 2.6.0, which submitted a total of `280+ Pull requests`, added about `20+ new features`, added several enhancements, refactored several features, and fixed several bugs. A total of `78` contributors participated, with a cumulative total of 350+ contributors.

> version records: https://github.com/apache/shenyu/compare/v2.5.1...v2.6.0
> 
### New Feature

1. Supports the plug-in upload function and gateway hot load plug-in

> the specific use please see: https://shenyu.apache.org/zh/docs/next/developer/custom-plugin
>
> specific pr please see: https://github.com/apache/shenyu/pull/4392

2. Apollo is supported as the data synchronization and registry

```yaml
sheneyu:
  sync:
    apollo:
      appId: shenyu
      meta: http://localhost:8080
      env: dev
      clusterName: test
      namespace: application
```

> specific pr please see: https://github.com/apache/shenyu/pull/4532

3. The springboot client can be dynamically configured on the shenyu client

4. Add the TCP plug-in

> the specific use please see: https://shenyu.apache.org/zh/docs/next/plugin-center/proxy/tcp-plugin
>
> specific pr please see: https://github.com/apache/shenyu/pull/4607
>
> https://github.com/apache/shenyu/pull/4766

![](https://shenyu.apache.org/zh/assets/images/card_list_zh-5a32a8ec1b2a8eed4c649bb3e4f1c7f3.png)

![](https://shenyu.apache.org/zh/assets/images/discovery-design-3081f14fec1ef9322d39bd1b998f42a3.png)

5. Support springmvn(boot) to collect api-meta data from shenyu client

> specific pr please see: https://github.com/apache/shenyu/pull/4600

6. Add support for the shenyu ingress controller

> the specific use please see: https://shenyu.apache.org/zh/docs/user-guide/kubernetes-controller/build-deploy
>
> https://shenyu.apache.org/zh/docs/user-guide/kubernetes-controller/config
>
> specific pr please see: https://github.com/apache/shenyu/pull/4620
>
> 配置如下：
>
> ```yaml
> shenyu:
>   netty:
>     http:
>       sni:
>         enabled: true
>         mod: k8s #k8s模式适用
>         defaultK8sSecretNamespace: shenyu-ingress #默认secret资源的namespace
>         defaultK8sSecretName: default-cert #默认secret资源名字
> ```
>
>

7. Add a zookeeper, naocs, Apollo, HttpLongPolling, consul as shenyu service discovery

> specific pr please see: https://github.com/apache/shenyu/pull/4636
>
> https://github.com/apache/shenyu/pull/4657
>
> https://github.com/apache/shenyu/pull/4802
>
> https://github.com/apache/shenyu/pull/4795
>
> https://github.com/apache/shenyu/pull/4800
>
> https://github.com/apache/shenyu/issues/4562

8. Add Huawei Cloud lts log collection

> specific pr please see: https://github.com/apache/shenyu/pull/4812

9. Add opengauss database support

> specific pr please see: https://github.com/apache/shenyu/pull/4856

10.添加polaris作为shenyu的数据同步和注册中心

```yaml
shenyu:
  sync:
    polaris:
      url: 127.0.0.1:8093
      namespace:
      fileGroup:
```

> specific pr please see: https://github.com/apache/shenyu/pull/4410
>
> https://github.com/apache/shenyu/pull/4897

11. Add shenyu matching cache

```yaml
shenyu:
  selectorMatchCache:
    ## selector L1 cache
    cache:
      enabled: false
      initialCapacity: 10000 # initial capacity in cache
      maximumSize: 10000 # max size in cache
    ## selector L2 cache, use trie as L2 cache
    trie:
      enabled: false
      cacheSize: 128 # the number of plug-ins
      matchMode: antPathMatch
  ruleMatchCache:
    ## rule L1 cache
    cache:
      enabled: true
      initialCapacity: 10000 # initial capacity in cache
      maximumSize: 65536 # max size in cache
    ## rule L2 cache, use trie as L2 cache
    trie:
      enabled: false
      cacheSize: 1024 # the number of selectors
      matchMode: antPathMatch
```

> the specific use please see: https://shenyu.apache.org/zh/docs/next/user-guide/property-config/client-property-config
>
> specific pr please see: https://github.com/apache/shenyu/pull/4417
>
> https://github.com/apache/shenyu/pull/4536

12. Added support for prometheus for shenyu admin

> specific pr please see: https://github.com/apache/shenyu/pull/4336

13. Expose the endpoints of shenyu actuator

> Note: You can use pr to view the memory data of shenyu gateway
>
> specific pr please see: https://github.com/apache/shenyu/pull/4637
>
> Check the configuration of actuator:
>
> ```yaml
> management:
>   endpoints:
>     web:
>       exposure:
>         include: "*" # or health,info
> ```

## Enhanced

1. Add tags attribute to API doc client

> the specific use please see: https://shenyu.apache.org/docs/user-guide/api-doc/shenyu-annotation-apidoc
>
> specific pr please see: https://github.com/apache/shenyu/pull/4362

2. Add Brpc integration tests

> specific pr please see: https://github.com/apache/shenyu/pull/4319

3.Brpc supports shared thread pools

> specific pr please see: https://github.com/apache/shenyu/pull/4402

4. Add mapping types for cryptorRequst and cryptorResponse

> specific pr please see: https://github.com/apache/shenyu/pull/4418

5. Encryption plug-in supports multiple field encryption

> specific pr please see: https://github.com/apache/shenyu/pull/4435

6. Add the p2c load balancing algorithm

> specific pr please see: https://github.com/apache/shenyu/pull/4451

7. Generate a plug-in string using base64 and store it in the plug-in data

> the specific use please see: https://shenyu.apache.org/zh/docs/next/developer/custom-plugin
>
> specific pr please see: https://github.com/apache/shenyu/pull/4473

8. Add the shortest response load balancing algorithm

> specific pr please see: https://github.com/apache/shenyu/pull/4488

9. Add a hash load balancing test case

> specific pr please see: https://github.com/apache/shenyu/pull/4383

10. Add the DetailSerivice test case

> specific pr please see: https://github.com/apache/shenyu/pull/4450

11. Provide broad routing policies

> Specific configurations are as follows:
>
> ```yaml
> shenyu:
>     switchConfig:
>        local: true
>        collapseSlashes: false #true表示开启宽泛路径支持
> ```
>
> specific pr please see: https://github.com/apache/shenyu/pull/4522

12. Add shenyu-common enums package test cases

> specific pr please see: https://github.com/apache/shenyu/pull/4541

13. Add shenyu-common dto package test cases

> specific pr please see: https://github.com/apache/shenyu/pull/4549/

14. Add the model package test case of add shenyu-admin

> specific pr please see: https://github.com/apache/shenyu/issues/4540

15. Add the shenyu match cache test case

> specific pr please see: https://github.com/apache/shenyu/pull/4557

16. Support k8s probe

> specific pr please see: https://github.com/apache/shenyu/pull/4567

17. Add a service package test for shenyu-admin

> specific pr please see: https://github.com/apache/shenyu/pull/4579

18. Add json support to the API documentation

> specific pr please see: https://github.com/apache/shenyu/pull/4591

19. The SPEL of the mock plugin is secure by default

> specific pr please see: https://github.com/apache/shenyu/pull/4606

20. Add ` ShenyuClientApiDocExecutorSubscriber ` test cases

> specific pr please see: https://github.com/apache/shenyu/pull/4632

21. Add test cases for shenyu-client-sofa module

> specific pr please see: https://github.com/apache/shenyu/pull/4688

22. Add 'tag relation' to 'shenyu api doc'

> specific pr please see: https://github.com/apache/shenyu/pull/4362

23. Add start and stop scripts for windows

> specific pr please see: https://github.com/apache/shenyu/pull/4673

24. Add a test case for 'ShenyuSdkClientFactory'

> specific pr please see: https://github.com/apache/shenyu/pull/4645

25. Add websocket synchronization support for shenyu e2e springcloud plugin

> specific pr please see: https://github.com/apache/shenyu/pull/4698

26. Support divide plugin automatically offline

> specific pr please see: https://github.com/apache/shenyu/pull/4702

27. Add the springcloud service instance cache

> specific pr please see: https://github.com/apache/shenyu/pull/4705
>
> the specific use please see: https://shenyu.apache.org/zh/docs/next/plugin-center/proxy/spring-cloud-plugin
>
> ```yaml
> shenyu:
>     springCloudCache:
>        enabled: false # 为true是开启springcloud缓存
> ```

28. Changing the password supports i18n

> specific pr please see: https://github.com/apache/shenyu/pull/4758

29.shenyu discovery supports websocket synchronization

> specific pr please see: https://github.com/apache/shenyu/pull/4768

30. Upgrade 'springboot' version to '2.7.13'

> specific pr please see: https://github.com/apache/shenyu/pull/4783

31. Add nacos and zookeeper synchronization test for e2e-springcloud

> specific pr please see: https://github.com/apache/shenyu/pull/4747

32. Add 'api doc client' annotation generation property

> specific pr please see: https://github.com/apache/shenyu/pull/4845

33. Support 'zookeeper' client automatically offline

> specific pr please see: https://github.com/apache/shenyu/pull/4806

34. Support 'Apollo client' automatic offline

> specific pr please see: https://github.com/apache/shenyu/pull/4855

35. Support swagger documents and store them in a database

> specific pr please see: https://github.com/apache/shenyu/pull/4849

36. Support 'nacos client' automatic offline

> specific pr please see: https://github.com/apache/shenyu/pull/4890

37. Add the alibaba dubbo e2e test case

> specific pr please see: https://github.com/apache/shenyu/pull/4859

38. Add the apache dubbo e2e test case

> specific pr please see: https://github.com/apache/shenyu/pull/4899

39. Add shenyu spring sdk test cases

> specific pr please see: https://github.com/apache/shenyu/pull/4913

40. Add sofa e2e test

> specific pr please see: https://github.com/apache/shenyu/pull/4919

41. Add a test case for Apollo data synchronization

> specific pr please see: https://github.com/apache/shenyu/pull/4918

42. Add the Connection pool configuration for the database (hakari)

> specific pr please see: https://github.com/apache/shenyu/pull/4938

43. Add 'idea icon' for shenyu

> specific pr please see: https://github.com/apache/shenyu/pull/4951

## Refactor

1. Reconstruct shenyu admin

> specific pr please see: https://github.com/apache/shenyu/pull/4355

2. Optimize the least active balance algorithm

> specific pr please see: https://github.com/apache/shenyu/pull/4342

3. Optimize the compatibility of the first version of shenyu sign plugin

> specific pr please see: https://github.com/apache/shenyu/pull/4332
>
> the specific use please see: https://shenyu.apache.org/docs/plugin-center/security/sign-plugin

4. Optimize the shenyu upstream check logic

> specific pr please see: https://github.com/apache/shenyu/pull/4386

5. Optimize the global version of the project

> specific pr please see: https://github.com/apache/shenyu/pull/4394

6. Optimize the code of 'ShenyuConsulConfigWatch'

> specific pr please see: https://github.com/apache/shenyu/pull/4400

7. Optimize shenyu prefix tree matching logic

> specific pr please see: https://github.com/apache/shenyu/pull/4414

8. Optimize the verification when the rule condition is submitted

> specific pr please see: https://github.com/apache/shenyu/pull/4403

9. Optimize the shenyu-client-websocket client registration code

> specific pr please see: https://github.com/apache/shenyu/pull/4462

10. Add shenyu admin's Micrometer dependent license

> specific pr please see: https://github.com/apache/shenyu/pull/4409

11. Update the maven-assembly-plugin packaging plug-in to version 3.5.0

> specific pr please see: https://github.com/apache/shenyu/pull/4673

12. Optimize the ordering of global plug-ins

> specific pr please see: https://github.com/apache/shenyu/pull/4429

13. Use BearerToken instead of StatelessToken in shenyu admin

> specific pr please see: https://github.com/apache/shenyu/pull/4516

14. Reconstructs the shenyu-logging module

> specific pr please see: https://github.com/apache/shenyu/pull/4526

15. Verify api doc

> specific pr please see: https://github.com/apache/shenyu/pull/4564

16. Optimize shenyu prefix tree and support '*' matching

> specific pr please see: https://github.com/apache/shenyu/pull/4569

17. Optimize the hot loading of plug-ins

> specific pr please see: https://github.com/apache/shenyu/pull/4392

18. Optimize the putPlugin method of 'ShenyuWebHandler'

> specific pr please see: https://github.com/apache/shenyu/pull/4598

19. Refactor Shenyu webfilter

> specific pr please see: https://github.com/apache/shenyu/pull/4614

20. Refactor the oauth2 plguin plug-in

> specific pr please see: https://github.com/apache/shenyu/pull/4624

21. Refactor the continued field of the shenyu selector

> specific pr please see: https://github.com/apache/shenyu/pull/4635

22. Refactor shenyu selection and rule matching cache

> specific pr please see: https://github.com/apache/shenyu/pull/4578

23. Deleted unused generics from the shenyu client

> specific pr please see: https://github.com/apache/shenyu/pull/4653

24. Refactor shenyu's support for sentinel plug-ins

> specific pr please see: https://github.com/apache/shenyu/pull/4669

25. Expose cached data through actuator terminals

> specific pr please see: https://github.com/apache/shenyu/pull/4637
>
> https://github.com/apache/shenyu/pull/4658
26. Refactor the checkUserPassword method to boot without printing a known error log

> specific pr please see: https://github.com/apache/shenyu/pull/4697

27. Add parameters for printing logs

> specific pr please see: https://github.com/apache/shenyu/pull/4637

28. Reconstructs shenyu global exception handling

> specific pr please see: https://github.com/apache/shenyu/pull/4709

29. Added shenyu plugin to upload integration test

> specific pr please see: https://github.com/apache/shenyu/pull/4679

30. Optimize grammar candy

> specific pr please see: https://github.com/apache/shenyu/pull/4700

31. Optimize discovery_handler_id of discovery_upstream

> specific pr please see: https://github.com/apache/shenyu/pull/4710

32. Reconstruct the shenyu-plugin module and archive proxy plug-ins by category

> specific pr please see: https://github.com/apache/shenyu/pull/4765

33. Refactor the cache of AlibabaDubboConfigCache

> specific pr please see: https://github.com/apache/shenyu/pull/4772

34. Remove hutool dependencies

> specific pr please see: https://github.com/apache/shenyu/pull/4773

35. Refactor 'ShenyuClientShutdownHook'

> specific pr please see: https://github.com/apache/shenyu/pull/4780

36. Add BaseAnnotationApiBeansExtractor Extractor

> specific pr please see: https://github.com/apache/shenyu/pull/4787

37. Support multi-client registration

> specific pr please see: https://github.com/apache/shenyu/pull/4790

38. Refactoring Shenyu-e2e supports Shenyu's check style

> specific pr please see: https://github.com/apache/shenyu/pull/4799

39. Optimize shenyu client registration logic

> specific pr please see: https://github.com/apache/shenyu/pull/4809

40. Add a domain test for the shenyu divide plugin

> specific pr please see: https://github.com/apache/shenyu/pull/4803

41. Update the extension of the rpc_ext field

> specific pr please see: https://github.com/apache/shenyu/pull/4821

42. Optimize consul connection operations

> specific pr please see: https://github.com/apache/shenyu/pull/4832

43. Refactor the yaml addition of springcloud for shenyu e2e

> specific pr please see: https://github.com/apache/shenyu/pull/4837

44. Add integration tests for the k8s ingress controller

> specific pr please see: https://github.com/apache/shenyu/pull/4820

45. Split the document field of the apidoc detail interface and add fields such as requestHeaders and responseParameters

> specific pr please see: https://github.com/apache/shenyu/pull/4865

46. Add a swagger example project to test the functionality of the API documentation

> specific pr please see: https://github.com/apache/shenyu/pull/4825

47. Optimize the display of shenyu admin's form fields in json format

> specific pr please see: https://github.com/apache/shenyu/pull/4873

48. Reconstruct the observability of shenyu logs

> specific pr please see: https://github.com/apache/shenyu/pull/4874

49. Add the bootstrap boot log

> specific pr please see: https://github.com/apache/shenyu/pull/4879

50. Refactor swagger's api documentation

> specific pr please see: https://github.com/apache/shenyu/pull/4892

51. Upgrade grpc version to 1.53.0

> specific pr please see: https://github.com/apache/shenyu/pull/4841

52. Refactor api metadata handlers

> specific pr please see: https://github.com/apache/shenyu/pull/4948

53. Optimize code and pom dependencies

> specific pr please see: https://github.com/apache/shenyu/pull/4945

## Bug Fixes

1. Optimize the h2 path

> specific pr please see: https://github.com/apache/shenyu/pull/4351

2. Fix the invocation error of the encryption response plug-in

> specific pr please see: https://github.com/apache/shenyu/pull/4331

3. Fix the jdk8 Map computeIfAbsent performance bug

> specific pr please see: https://github.com/apache/shenyu/pull/4338

4. Fix zombieRemovalTimes code

> specific pr please see: https://github.com/apache/shenyu/pull/4368

5. Rectify the sql error after the upgrade

> specific pr please see: https://github.com/apache/shenyu/pull/4374

6. Delete the detectorOfflineLinks tag

> specific pr please see: https://github.com/apache/shenyu/pull/4382

7. Ignore flat pom

> specific pr please see: https://github.com/apache/shenyu/pull/4390

8. Repair the LOG invocation method

> specific pr please see: https://github.com/apache/shenyu/pull/4387

9. Fix the NPE of sheyu-example-springcloud using nacos

> specific pr please see: https://github.com/apache/shenyu/pull/4396

10. Fix Shenyu-admin name type dispute

> specific pr please see: https://github.com/apache/shenyu/pull/4340

11. Restore the load balancing spi resource

> specific pr please see: https://github.com/apache/shenyu/pull/4411

12. Rectify sql script errors

> specific pr please see: https://github.com/apache/shenyu/pull/4412

13. Fix jackson's 24 hour format and time zone

> specific pr please see: https://github.com/apache/shenyu/pull/4413

14. Fix JwtUtils error

> specific pr please see: https://github.com/apache/shenyu/pull/4420

15. Fix dubbo caller cache bug

> specific pr please see: https://github.com/apache/shenyu/pull/4433

16. Delete the lost HOST

> specific pr please see: https://github.com/apache/shenyu/pull/4425

17. Repair SpringMvcClientEventListener test cases

> specific pr please see: https://github.com/apache/shenyu/pull/4252

18. Fix the zombie update PENDING_SYNC error

> specific pr please see: https://github.com/apache/shenyu/pull/4430

19. Repair memory leaks in the windlfu

> specific pr please see: https://github.com/apache/shenyu/pull/4486

20. Fix the rule query failure caused by too many rules

> specific pr please see: https://github.com/apache/shenyu/pull/4499

21. Fix missing actuator dependencies and port errors in sample http

> specific pr please see: https://github.com/apache/shenyu/pull/4506

22. Fix http and https errors on UpstreamCheckUtils

> specific pr please see: https://github.com/apache/shenyu/pull/4509

23. Fix memory leak caused by FileFilter

> specific pr please see: https://github.com/apache/shenyu/pull/4507

24. Fix the zookeeper synchronization error

> specific pr please see: https://github.com/apache/shenyu/pull/4906

25. The memory leak repair MemorySafeWindowTinyLFUMap errors

> specific pr please see: https://github.com/apache/shenyu/pull/4524

26. Fix ApiDoc path missing separator

> specific pr please see: https://github.com/apache/shenyu/pull/4528

27. Fix shenyu trie's NPE

> specific pr please see: https://github.com/apache/shenyu/pull/4533

28. Fix plugin skip error

> specific pr please see: https://github.com/apache/shenyu/pull/4589

29. Rectify the oracle sql error

> specific pr please see: https://github.com/apache/shenyu/pull/4595

30. Fix shenyu admin can not load shenyu icon issue

> specific pr please see: https://github.com/apache/shenyu/pull/4605

31. Fix the hystrix fallback bug

> specific pr please see: https://github.com/apache/shenyu/pull/4593

32. Fix the warm-up time for divide and springcloud

> specific pr please see: https://github.com/apache/shenyu/pull/4619

33. Fix springcloud service selector

> specific pr please see: https://github.com/apache/shenyu/pull/4639

34. Fix shenyu-spring-boot-starter-plugin-mock add spring.factories

> specific pr please see: https://github.com/apache/shenyu/pull/4644

35. Fix shenyu-client-mvc and shenyu-client-springcloud lost ip

> specific pr please see: https://github.com/apache/shenyu/pull/4681

36. Fix empty rule data and selector data in cache

> specific pr please see: https://github.com/apache/shenyu/pull/4716

37. Fix api documentation module update api details error

> specific pr please see: https://github.com/apache/shenyu/pull/4720

38. Fix getting topic from configuration in KafkaLogCollectClient

> specific pr please see: https://github.com/apache/shenyu/pull/4756

39. Fix thread safety issue with loggingConsole plugin

> specific pr please see: https://github.com/apache/shenyu/pull/4763

40. Fix brpc integration test response size

> specific pr please see: https://github.com/apache/shenyu/pull/4784

41. Fix plugn-Dubco-common selector update gray release to remove cache

> specific pr please see: https://github.com/apache/shenyu/pull/4762

42. Fix shenyu admin menu name bug

> specific pr please see: https://github.com/apache/shenyu/pull/4805

43. Fix the problem that shenyu admin cannot configure consul ports

> specific pr please see: https://github.com/apache/shenyu/pull/4843

44. Fix shenyu client metadata and uri cannot be synchronized with apollo to admin

> specific pr please see: https://github.com/apache/shenyu/pull/4851

45. Fix PathVariable annotation url does not match

> specific pr please see: https://github.com/apache/shenyu/pull/4852

46. Fixed an issue where URIs could not be updated in PathPattern mode

> specific pr please see: https://github.com/apache/shenyu/pull/4854

47. Fix the client close method call twice

> specific pr please see: https://github.com/apache/shenyu/pull/4867

48. Fix shenyu error processing consul configuration

> specific pr please see: https://github.com/apache/shenyu/pull/4872

49. Delete the unused configuration from the Request and modifyResponse plug-ins

> specific pr please see: https://github.com/apache/shenyu/pull/4882

50. Fix the http registration metadata error

> specific pr please see: https://github.com/apache/shenyu/pull/4889

51. Fixed an issue where websocket lost user-defined close status

> specific pr please see: https://github.com/apache/shenyu/pull/4844

52. Fix consul register lost meta path property when special symbol

> specific pr please see: https://github.com/apache/shenyu/pull/4885

53. Fix etcd synchronization errors

> specific pr please see: https://github.com/apache/shenyu/pull/4911

54. Rectify multiple synchronization event errors on shenyu admin

> specific pr please see: https://github.com/apache/shenyu/pull/4941

55. Fix Shenyu motan plugin execution error

> specific pr please see: https://github.com/apache/shenyu/pull/4934

## Contributors

Special thanks to the following contributors for their support and participation in the '2.6.0' release (in no particular order).

midnight2104,koonchen,847850277,balloon72,yu199195,iwangjie,damonxue,tian-pengfei,caojiajun,dragon-zhang,u3breeze,li-keguo,SuperMonkeyC,mahaitao617,tomsun28,moremind,liaolzy,Ceilzcx,misaya295,BoyuLi4,HaiqiQin,starlight2003,stulzq,ywj1352,yunlongn,aFlyBird0,dengliming,plutokaito,xuyicheng1995,lan-dian,sachin10fi,zuobiao-zhou, hudongdong129,crudboy,aoshiguchen,VampireAchao,JooKS-me,Redick01,huanccwang,lijay7674,omernaci,peng-heng,December-Pb,6freeair2016,jieyangxchen,lianjunwei,u3breeze,eurecalulu,wanyaoasiainfo,wanyaoasiainfo,Kakk22,xuziyang,menglujing,xcsnx,yu1183688986,lahmXu,fabian4,ileonli,VampireAchao,GOODBOY008,TeslaCN

## Become a contributor

We welcome every contributor to join ShenYu, and welcome contributors to participate in ShenYu in the spirit of Apache Way!

See the contributor guidelines:

> https://shenyu.apache.org/zh/community/contributor-guide

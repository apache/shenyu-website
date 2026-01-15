---
title: "【Apache ShenYu 2.6.0 版本发布】"
description: "Apache ShenYu 2.6.0 版本发布"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2023-08-15
slug: Apache-ShenYu-release-version-2.6.0
---

## 关于Apache ShenYu

`Apache ShenYu` 一款使用 `Java Reactor` 开发的响应式`API` 网关。以其高性能，动态灵活的流量管控，热插拔，易部署等特性，开箱即用为用户提供整套全生命周期的 `API`网关，包含 `API`注册、服务代理、协议转换、`API`文档与 `API`治理等功能。Apache ShenYu于`2022年7月`毕业成为`Apache`顶级项目。

> 官网: https://shenyu.apache.org
> GitHub: https://github.com/apache/shenyu

## 版本预览

时隔半年，`Apache ShenYu`发布了2.6.0版本，该版本共计提交了`280+个 Pull Request`,新增约`20+个新特性`，新增了若干增强，重构了若干功能，并且修复了若干个bug。共计`78位`贡献者参与其中，累计贡献者达350+位。

> 版本记录：https://github.com/apache/shenyu/compare/v2.5.1...v2.6.0

### 新特性

1.支持插件上传功能，支持网关热加载插件

> 具体使用请查看：https://shenyu.apache.org/zh/docs/next/developer/custom-plugin
>
> 具体pr请查看：https://github.com/apache/shenyu/pull/4392

2.支持使用Apollo作为数据同步和注册中心

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

> 具体pr请查看：https://github.com/apache/shenyu/pull/4532

3.支持springboot client在shenyu client中动态配置

4.添加TCP插件

> 具体使用请查看：https://shenyu.apache.org/zh/docs/next/plugin-center/proxy/tcp-plugin
>
> 具体pr请查看：https://github.com/apache/shenyu/pull/4607
>
> https://github.com/apache/shenyu/pull/4766

![](https://shenyu.apache.org/zh/assets/images/card_list_zh-5a32a8ec1b2a8eed4c649bb3e4f1c7f3.png)

![](https://shenyu.apache.org/zh/assets/images/discovery-design-3081f14fec1ef9322d39bd1b998f42a3.png)

5.支持springmvn(boot)在shenyu client中收集api-meta data

> 具体pr请查看：https://github.com/apache/shenyu/pull/4600

6.添加shenyu ingress controller的支持

> 具体使用请查看：https://shenyu.apache.org/zh/docs/user-guide/kubernetes-controller/build-deploy
>
> https://shenyu.apache.org/zh/docs/user-guide/kubernetes-controller/config
>
> 具体pr请查看：https://github.com/apache/shenyu/pull/4620
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

7.添加zookeeper,naocs,apollo,HttpLongPolling,consul作为shenyu服务发现

> 具体pr请查看：https://github.com/apache/shenyu/pull/4636
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

8.添加华为云lts日志收集

> 具体pr请查看：https://github.com/apache/shenyu/pull/4812

9.添加opengauss数据库支持

> 具体pr请查看：https://github.com/apache/shenyu/pull/4856

10.添加polaris作为shenyu的数据同步和注册中心

```yaml
shenyu:
  sync:
    polaris:
      url: 127.0.0.1:8093
      namespace:
      fileGroup:
```

> 具体pr请查看：https://github.com/apache/shenyu/pull/4410
>
> https://github.com/apache/shenyu/pull/4897

11.添加shenyu匹配缓存

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

> 具体使用请查看：https://shenyu.apache.org/zh/docs/next/user-guide/property-config/client-property-config
>
> 具体pr请查看：https://github.com/apache/shenyu/pull/4417
>
> https://github.com/apache/shenyu/pull/4536

12.新增shenyu admin对prometheus的支持

> 具体pr请查看：https://github.com/apache/shenyu/pull/4336

13.暴露shenyu actuator端点

> 说明：可通过pr查看shenyu网关的内存数据
>
> 具体pr请查看：https://github.com/apache/shenyu/pull/4637
>
> 如何关闭请查看actuator配置：
>
> ```yaml
> management:
>   endpoints:
>     web:
>       exposure:
>         include: "*" # or health,info
> ```

## 增强

1.对API doc client增加tags属性

> 具体使用请查看：https://shenyu.apache.org/docs/user-guide/api-doc/shenyu-annotation-apidoc
>
> 具体pr请查看：https://github.com/apache/shenyu/pull/4362

2.添加Brpc的集成测试

> 具体pr请查看：https://github.com/apache/shenyu/pull/4319

3.Brpc支持共享线程池

> 具体pr请查看：https://github.com/apache/shenyu/pull/4402

4.为加密插件(cryptorRequst和cryptorResponse)增加映射类型

> 具体pr请查看：https://github.com/apache/shenyu/pull/4418

5.加密插件支持多个个字段加密

> 具体pr请查看：https://github.com/apache/shenyu/pull/4435

6.添加p2c负载均衡算法

> 具体pr请查看：https://github.com/apache/shenyu/pull/4451

7.使用base64生成插件字符串，并存储到插件数据中

> 具体使用请查看：https://shenyu.apache.org/zh/docs/next/developer/custom-plugin
>
> 具体pr请查看：https://github.com/apache/shenyu/pull/4473

8.添加最短响应负载均衡算法

> 具体pr请查看：https://github.com/apache/shenyu/pull/4488

9.添加hash负载均衡测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/4383

10.添加`DetailSerivice`测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/4450

11.提供宽泛的路径策略

> 具体配置如下：
>
> ```yaml
> shenyu:
>     switchConfig:
>        local: true
>        collapseSlashes: false #true表示开启宽泛路径支持
> ```
>
> 具体pr请查看：https://github.com/apache/shenyu/pull/4522

12.添加shenyu-common的enums包测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/4541

13.添加shenyu-common的dto包测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/4549/

14.添加Add shenyu-admin的model包测试用例

> 具体pr请查看：https://github.com/apache/shenyu/issues/4540

15.添加shenyu match cache测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/4557

16.支持k8s探针

> 具体pr请查看：https://github.com/apache/shenyu/pull/4567

17.添加shenyu-admin的service包测试

> 具体pr请查看：https://github.com/apache/shenyu/pull/4579

18.在API文档中添加json支持

> 具体pr请查看：https://github.com/apache/shenyu/pull/4591

19.mock插件的SPEL默认为安全的

> 具体pr请查看：https://github.com/apache/shenyu/pull/4606

20.添加`ShenyuClientApiDocExecutorSubscriber`的测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/4632

21.为shenyu-client-sofa模块添加测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/4688

22.为`shenyu api doc`添加`tag relation`

> 具体pr请查看：https://github.com/apache/shenyu/pull/4362

23.添加windows下的启动、停止脚本

> 具体pr请查看：https://github.com/apache/shenyu/pull/4673

24.添加`ShenyuSdkClientFactory`的测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/4645

25.添加shenyu e2e springcloud plugin的websocket同步支持

> 具体pr请查看：https://github.com/apache/shenyu/pull/4698

26.支持divide插件自动下线

> 具体pr请查看：https://github.com/apache/shenyu/pull/4702

27.添加springcloud service instance缓存

> 具体pr请查看：https://github.com/apache/shenyu/pull/4705
>
> 具体使用请查看：https://shenyu.apache.org/zh/docs/next/plugin-center/proxy/spring-cloud-plugin
>
> ```yaml
> shenyu:
>     springCloudCache:
>        enabled: false # 为true是开启springcloud缓存
> ```

28.更改密码支持i18n

> 具体pr请查看：https://github.com/apache/shenyu/pull/4758

29.shenyu discovery支持websocket同步

> 具体pr请查看：https://github.com/apache/shenyu/pull/4768

30.升级`springboot`版本到`2.7.13`

> 具体pr请查看：https://github.com/apache/shenyu/pull/4783

31.为e2e-springcloud添加nacos，zookeeper同步测试

> 具体pr请查看：https://github.com/apache/shenyu/pull/4747

32.添加`api doc client`注解生成属性

> 具体pr请查看：https://github.com/apache/shenyu/pull/4845

33.支持`zookeeper`客户端自动下线

> 具体pr请查看：https://github.com/apache/shenyu/pull/4806

34.支持`Apollo client`自动下线

> 具体pr请查看：https://github.com/apache/shenyu/pull/4855

35.支持swagger文档，并将文档存储到数据库

> 具体pr请查看：https://github.com/apache/shenyu/pull/4849

36.支持`nacos client`自动下线

> 具体pr请查看：https://github.com/apache/shenyu/pull/4890

37.添加alibaba dubbo e2e 测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/4859

38.添加apache dubbo e2e 测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/4899

39.添加shenyu spring sdk测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/4913

40.添加sofa e2e测试

> 具体pr请查看：https://github.com/apache/shenyu/pull/4919

41.添加Apollo数据同步的测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/4918

42.添加数据库的连接池配置(hakari)

> 具体pr请查看：https://github.com/apache/shenyu/pull/4938

43.为shenyu添加`idea icon`

> 具体pr请查看：https://github.com/apache/shenyu/pull/4951

## 重构

1.重构shenyu admin

> 具体pr请查看：https://github.com/apache/shenyu/pull/4355

2.优化least active balance算法

> 具体pr请查看：https://github.com/apache/shenyu/pull/4342

3.优化shenyu sign插件的第一个版本的兼容性

> 具体pr请查看：https://github.com/apache/shenyu/pull/4332
>
> 具体使用请查看：https://shenyu.apache.org/docs/plugin-center/security/sign-plugin

4.优化shenyu upstream check逻辑

> 具体pr请查看：https://github.com/apache/shenyu/pull/4386

5.优化项目的全局版本

> 具体pr请查看：https://github.com/apache/shenyu/pull/4394

6.优化`ShenyuConsulConfigWatch`的代码

> 具体pr请查看：https://github.com/apache/shenyu/pull/4400

7.优化shenyu前缀树匹配逻辑

> 具体pr请查看：https://github.com/apache/shenyu/pull/4414

8.优化rule condition提交时的校验

> 具体pr请查看：https://github.com/apache/shenyu/pull/4403

9.优化shenyu-client-websocket的客户端注册代码

> 具体pr请查看：https://github.com/apache/shenyu/pull/4462

10.添加shenyu admin依赖Micrometer的许可证

> 具体pr请查看：https://github.com/apache/shenyu/pull/4409

11.更新 maven-assembly-plugin打包插件到3.5.0版本

> 具体pr请查看：https://github.com/apache/shenyu/pull/4673

12.优化全局插件的排序

> 具体pr请查看：https://github.com/apache/shenyu/pull/4429

13.在shenyu admin中使用BearerToken替代StatelessToken

> 具体pr请查看：https://github.com/apache/shenyu/pull/4516

14.重构shenyu-logging模块

> 具体pr请查看：https://github.com/apache/shenyu/pull/4526

15.对api doc支持校验

> 具体pr请查看：https://github.com/apache/shenyu/pull/4564

16.优化shenyu前缀树，并支持`*`匹配

> 具体pr请查看：https://github.com/apache/shenyu/pull/4569

17.优化插件的热加载

> 具体pr请查看：https://github.com/apache/shenyu/pull/4392

18.优化`ShenyuWebHandler`的putPlugin方法

> 具体pr请查看：https://github.com/apache/shenyu/pull/4598

19.重构Shenyu webfilter

> 具体pr请查看：https://github.com/apache/shenyu/pull/4614

20.重构 oauth2 plguin插件

> 具体pr请查看：https://github.com/apache/shenyu/pull/4624

21.重构shenyu选择器的continued字段

> 具体pr请查看：https://github.com/apache/shenyu/pull/4635

22.重构shenyu选择和规则的匹配缓存

> 具体pr请查看：https://github.com/apache/shenyu/pull/4578

23.删除了shenyu客户端中未使用的泛型

> 具体pr请查看：https://github.com/apache/shenyu/pull/4653

24.重构shenyu对sentinel插件的支持

> 具体pr请查看：https://github.com/apache/shenyu/pull/4669

25.将缓存数据通过actuator端点暴露

> 具体pr请查看：https://github.com/apache/shenyu/pull/4637 
>
> https://github.com/apache/shenyu/pull/4658

26.重构`checkUserPassword`方法，启动时不打印已知错误日志

> 具体pr请查看：https://github.com/apache/shenyu/pull/4697

27.添加打印日志的参数

> 具体pr请查看：https://github.com/apache/shenyu/pull/4637

28.重构shenyu全局异常处理

> 具体pr请查看：https://github.com/apache/shenyu/pull/4709

29.添加了shenyu插件上传的集成测试

> 具体pr请查看：https://github.com/apache/shenyu/pull/4679

30.优化语法糖

> 具体pr请查看：https://github.com/apache/shenyu/pull/4700

31.优化discovery_upstream的discovery_handler_id字段

> 具体pr请查看：https://github.com/apache/shenyu/pull/4710

32.重构shenyu-plugin模块，将proxy插件分类归档

> 具体pr请查看：https://github.com/apache/shenyu/pull/4765

33.重构`AlibabaDubboConfigCache`的缓存

> 具体pr请查看：https://github.com/apache/shenyu/pull/4772

34.移除hutool的依赖

> 具体pr请查看：https://github.com/apache/shenyu/pull/4773

35.重构`ShenyuClientShutdownHook`

> 具体pr请查看：https://github.com/apache/shenyu/pull/4780

36.Extractor添加BaseAnnotationApiBeansExtractor

> 具体pr请查看：https://github.com/apache/shenyu/pull/4787

37.支持多客户端注册

> 具体pr请查看：https://github.com/apache/shenyu/pull/4790

38.重构Shenyu-e2e支持Shenyu的check style

> 具体pr请查看：https://github.com/apache/shenyu/pull/4799

39.优化shenyu客户端注册逻辑

> 具体pr请查看：https://github.com/apache/shenyu/pull/4809

40.添加shenyu divide插件的域名测试

> 具体pr请查看：https://github.com/apache/shenyu/pull/4803

41.更新rpc_ext字段的扩展

> 具体pr请查看：https://github.com/apache/shenyu/pull/4821

42.优化consul的连接操作

> 具体pr请查看：https://github.com/apache/shenyu/pull/4832

43.重构shenyu e2e的springcloud的yaml添加方式

> 具体pr请查看：https://github.com/apache/shenyu/pull/4837

44.为k8s ingress controller添加集成测试

> 具体pr请查看：https://github.com/apache/shenyu/pull/4820

45.拆分apidoc明细接口的document字段，增加requestHeaders、responseParameters等字段

> 具体pr请查看：https://github.com/apache/shenyu/pull/4865

46.加swagger示例项目，测试API文档的相关功能

> 具体pr请查看：https://github.com/apache/shenyu/pull/4825

47.优化shenyu admin的json格式表单字段的显示

> 具体pr请查看：https://github.com/apache/shenyu/pull/4873

48.重构shenyu日志可观测性

> 具体pr请查看：https://github.com/apache/shenyu/pull/4874

49.添加bootstrap启动日志

> 具体pr请查看：https://github.com/apache/shenyu/pull/4879

50.重构swagger的api文档

> 具体pr请查看：https://github.com/apache/shenyu/pull/4892

51.升级grpc版本至1.53.0

> 具体pr请查看：https://github.com/apache/shenyu/pull/4841

52.重构api元数据处理函数

> 具体pr请查看：https://github.com/apache/shenyu/pull/4948

53.优化代码和pom依赖

> 具体pr请查看：https://github.com/apache/shenyu/pull/4945

## Bug修复

1.优化h2的路径

> 具体pr请查看：https://github.com/apache/shenyu/pull/4351

2.修复加密响应插件的调用错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/4331

3.修复jdk8 Map computeIfAbsent性能bug

> 具体pr请查看：https://github.com/apache/shenyu/pull/4338

4.修复zombieRemovalTimes代码

> 具体pr请查看：https://github.com/apache/shenyu/pull/4368

5.修复升级后的sql错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/4374

6.删除detectorOfflineLinks标签

> 具体pr请查看：https://github.com/apache/shenyu/pull/4382

7.忽略扁平化的pom

> 具体pr请查看：https://github.com/apache/shenyu/pull/4390

8.修复LOG调用方法

> 具体pr请查看：https://github.com/apache/shenyu/pull/4387

9.使用nacos修复sheyu-example-springcloud的NPE

> 具体pr请查看：https://github.com/apache/shenyu/pull/4396

10.修复 Shenyu-admin名称的类型争论

> 具体pr请查看：https://github.com/apache/shenyu/pull/4340

11.修复负载平衡spi资源

> 具体pr请查看：https://github.com/apache/shenyu/pull/4411

12.修复sql脚本错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/4412

13.修复jackson的24小时格式和时区

> 具体pr请查看：https://github.com/apache/shenyu/pull/4413

14.修复JwtUtils错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/4420

15.修复dubbo调用者缓存bug

> 具体pr请查看：https://github.com/apache/shenyu/pull/4433

16.修复丢失HOST的删除操作

> 具体pr请查看：https://github.com/apache/shenyu/pull/4425

17.修复SpringMvcClientEventListener测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/4252

18.修复zombie更新PENDING_SYNC的错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/4430

19.修复windlfu的内存泄漏

> 具体pr请查看：https://github.com/apache/shenyu/pull/4486

20.修复因规则过多导致规则查询失败的问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/4499

21.修复示例http中缺少执行器依赖项和端口错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/4506

22.修复UpstreamCheckUtils的http和https错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/4509

23.修复FileFilter造成内存泄漏的问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/4507

24.修复zookeeper同步错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/4906

25.修复MemorySafeWindowTinyLFUMap内存泄漏错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/4524

26.修复ApiDoc路径缺少分隔符的问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/4528

27.修复 shenyu trie的NPE

> 具体pr请查看：https://github.com/apache/shenyu/pull/4533

28.修复插件跳过错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/4589

29.修复oracle sql错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/4595

30.修复shenyu admin中无法加载shenyu图标的问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/4605

31.修复hystrix fallback的bug

> 具体pr请查看：https://github.com/apache/shenyu/pull/4593

32.修复divide和springcloud的预热时间

> 具体pr请查看：https://github.com/apache/shenyu/pull/4619

33.修复springcloud服务选择器

> 具体pr请查看：https://github.com/apache/shenyu/pull/4639

34.修复 shenyu-spring-boot-starter-plugin-mock添加spring.factories

> 具体pr请查看：https://github.com/apache/shenyu/pull/4644

35.修复 shenyu-client-mvc和shenyu-client-springcloud丢失ip

> 具体pr请查看：https://github.com/apache/shenyu/pull/4681

36.修复缓存中规则数据和选择器数据为空的问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/4716

37.修复api文档模块更新api详情错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/4720

38.修复从KafkaLogCollectClient中的配置获取topic

> 具体pr请查看：https://github.com/apache/shenyu/pull/4756

39.修复loggingConsole插件的线程安全问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/4763

40.修复brpc集成测试响应大小

> 具体pr请查看：https://github.com/apache/shenyu/pull/4784

41.修复plugn-dubbo-common的选择器更新灰色发布删除缓存的问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/4762

42.修复shenyu admin菜单名称bug

> 具体pr请查看：https://github.com/apache/shenyu/pull/4805

43.修复shenyu admin无法配置consul端口的问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/4843

44.修复shenyu客户端元数据和uri无法与apollo同步到admin的问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/4851

45.修复PathVariable注解url无法匹配的问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/4852

46.修复PathPattern模式下无法更新uri的问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/4854

47.修复客户端关闭方法调用两次

> 具体pr请查看：https://github.com/apache/shenyu/pull/4867

48.修复 shenyu 错误处理 consul 配置

> 具体pr请查看：https://github.com/apache/shenyu/pull/4872

49.从Request、modifyResponse插件中删除未使用的配置

> 具体pr请查看：https://github.com/apache/shenyu/pull/4882

50.修复http注册元数据错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/4889

51.修复websocket丢失用户自定义关闭状态的问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/4844

52.修复consul寄存器在特殊符号时丢失元路径的属性

> 具体pr请查看：https://github.com/apache/shenyu/pull/4885

53.修复etcd同步错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/4911

54.修复shenyu admin多次同步事件错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/4941

55.修复 Shenyu motan插件执行错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/4934

## 贡献者

特别感谢以下贡献者对 `2.6.0`版本的支持和参与（排名不分先后）。

midnight2104,koonchen,847850277,balloon72,yu199195,iwangjie,damonxue,tian-pengfei,caojiajun,dragon-zhang,u3breeze,li-keguo,SuperMonkeyC,mahaitao617,tomsun28,moremind,liaolzy,Ceilzcx,misaya295,BoyuLi4,HaiqiQin,starlight2003,stulzq,ywj1352,yunlongn,aFlyBird0,dengliming,plutokaito,xuyicheng1995,lan-dian,sachin10fi,zuobiao-zhou, hudongdong129,crudboy,aoshiguchen,VampireAchao,JooKS-me,Redick01,huanccwang,lijay7674,omernaci,peng-heng,December-Pb,6freeair2016,jieyangxchen,lianjunwei,u3breeze,eurecalulu,wanyaoasiainfo,wanyaoasiainfo,Kakk22,xuziyang,menglujing,xcsnx,yu1183688986,lahmXu,fabian4,ileonli,VampireAchao,GOODBOY008,TeslaCN

## 成为贡献者

我们欢迎每一位贡献者的加入ShenYu，欢迎贡献者以Apache Way的精神参与ShenYu！

贡献者指南请参考：

> https://shenyu.apache.org/zh/community/contributor-guide

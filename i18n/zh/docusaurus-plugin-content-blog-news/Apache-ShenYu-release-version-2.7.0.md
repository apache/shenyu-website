---
title: "【Apache ShenYu 2.7.0 版本发布】"
description: "Apache ShenYu 2.7.0 版本发布"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2025-01-15
slug: Apache-ShenYu-release-version-2.7.0
---

## 关于Apache ShenYu

`Apache ShenYu` 一款使用 `Java Reactor` 开发的响应式`API` 网关。以其高性能，动态灵活的流量管控，热插拔，易部署等特性，开箱即用为用户提供整套全生命周期的 `API`网关，包含 `API`注册、服务代理、协议转换、`API`文档与 `API`治理等功能。Apache ShenYu于`2022年7月`毕业成为`Apache`顶级项目。

> 官网: https://shenyu.apache.org
> GitHub: https://github.com/apache/shenyu

## 版本预览

时隔一年，`Apache ShenYu`发布了2.7.0版本，该版本共计提交了`254+个 Pull Request`,新增约`17+个新特性`，新增了若干增强，重构了若干功能，并且修复了若干个bug。共计`61位`贡献者参与其中，累计贡献者达350+位。

> 版本记录：https://github.com/apache/shenyu/compare/v2.6.1...v2.7.0

### 新特性

1.升级 Java版本，从`jdk8`升级到`jdk17`

> 具体pr请查看：https://github.com/apache/shenyu/pull/5374

2.升级 SpringBoot 版本，升级到 3.x

> 具体pr请查看：https://github.com/apache/shenyu/pull/5583

3.支持 shenyu admin 集群模式

> 具体pr请查看：https://github.com/apache/shenyu/pull/5544
> 
> https://github.com/apache/shenyu/pull/5592

4.升级 checkstyle 插件版本到 3.4.0

> 具体pr请查看：https://github.com/apache/shenyu/pull/5614

5.数据源支持 OceanBase

> 具体pr请查看：https://github.com/apache/shenyu/pull/5617

6.支持批量修改选择器/规则状态

> 具体pr请查看：https://github.com/apache/shenyu/pull/5499

7.支持批量修改 PathAuth 状态

> 具体pr请查看：https://github.com/apache/shenyu/pull/5488

8.升级 apache dubbo 版本

> 具体pr请查看：https://github.com/apache/shenyu/pull/5527

9.支持 `Contribute with Gitpod`

> 具体pr请查看：https://github.com/apache/shenyu/pull/5610

10.支持配置批量导出和导入

> 具体pr请查看：https://github.com/apache/shenyu/pull/5474

11.添加 shenyu 客户端心跳

> 具体pr请查看：https://github.com/apache/shenyu/pull/5659

12.支持命名空间 

> 具体pr请查看：https://github.com/apache/shenyu/pull/5584
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

13.支持 k8s 动态扩展

> 具体pr请查看：https://github.com/apache/shenyu/pull/5686

14.通过实现客户端 ID 验证使新登录时失效先前的令牌

> 具体pr请查看：https://github.com/apache/shenyu/pull/5600

15.支持 divide-plugin 的灰度发布

> 具体pr请查看：https://github.com/apache/shenyu/pull/5763

16.支持 Kubernetes 作为注册中心

> 具体pr请查看：https://github.com/apache/shenyu/pull/5769

### 增强

1.添加 RocketMQ 日志的e2e测试

> 具体pr请查看：https://github.com/apache/shenyu/pull/5439

2.增强指标限流器的收集功能

> 具体pr请查看：https://github.com/apache/shenyu/pull/5461

3.增强 Sentinel、Resilience4j 和 Hystrix 的指标收集

> 具体pr请查看：https://github.com/apache/shenyu/pull/5468

4.整理 SOFA commons-tools 依赖

> 具体pr请查看：https://github.com/apache/shenyu/pull/5609

6.添加缺失的许可证声明

> 具体pr请查看：https://github.com/apache/shenyu/pull/5503

7.为 Kafka 消息发送设置回调机制

> 具体pr请查看：https://github.com/apache/shenyu/pull/5748

8.使用元数据中的负载均衡配置用于 Dubbo

> 具体pr请查看：https://github.com/apache/shenyu/pull/5806

9.为从选择器获取的 Upstream 添加非空校验

> 具体pr请查看：https://github.com/apache/shenyu/pull/5804

10.将规则处理中的超时设置到 Dubbo RPC 上下文

> 具体pr请查看：https://github.com/apache/shenyu/pull/5778

11.在启用选择器和规则时发布事件

> 具体pr请查看：https://github.com/apache/shenyu/pull/5762

12.从命名空间会话映射中移除已关闭的会话

> 具体pr请查看：https://github.com/apache/shenyu/pull/5734  

13.为 ShenyuClientURIExecutorSubscriber 添加测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/5413

14.为 ShenyuClientIllegalArgumentException 添加测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/5408

15.为 ShenyuClientRegisterEventPublisher 添加测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/5417

16.为 ShenyuClientMetadataExecutorSubscriber 添加测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/5404

17.为 AbstractWasmPluginDataHandler 添加测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/5451

18.为 ShenyuClientRegisterRepositoryFactoryTest 添加测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/5443

19.为 AbstractWasmDiscoveryHandler 添加测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/5453

20.升级 SOFA RPC 版本支持

> 具体pr请查看：https://github.com/apache/shenyu/pull/5526

21.将签名插件的请求头键添加到跨域过滤器配置中

> 具体pr请查看：https://github.com/apache/shenyu/pull/5627

22.加密密码

> 具体pr请查看：https://github.com/apache/shenyu/pull/5436

23.添加 AbstractShenyuWasmPlugin 测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/5450

24.重写插件/上下文路径插件支持跨应用和插件

> 具体pr请查看：https://github.com/apache/shenyu/pull/5438

25.移除重复路径检查

> 具体pr请查看：https://github.com/apache/shenyu/pull/5514

26.移除 Alibaba Dubbo 支持

> 具体pr请查看：https://github.com/apache/shenyu/pull/5500

27.支持通过 Docker 环境变量设置 HTTP 路径

> 具体pr请查看：https://github.com/apache/shenyu/pull/5833

28.添加代码重构改进

> 具体pr请查看：https://github.com/apache/shenyu/pull/5613

29.支持从 cookie、header、param 中获取令牌

> 具体pr请查看：https://github.com/apache/shenyu/pull/5547

30.使 ShenyuDubboService 注解的默认值与 DubboService 注解保持一致

> 具体pr请查看：https://github.com/apache/shenyu/pull/5816

31.将数据库脚本添加到管理包中

> 具体pr请查看：https://github.com/apache/shenyu/pull/5724

32.清理无用代码并进行改进

> 具体pr请查看：https://github.com/apache/shenyu/pull/5849
> 
> https://github.com/apache/shenyu/pull/5803
> 
> https://github.com/apache/shenyu/pull/5789

33.优化 MotanServiceEventListener 测试用例

> 具体pr请查看：https://github.com/apache/shenyu/pull/5745

34.删除 shenyu-registry-eureka.xml 中重复的 Maven 配置

> 具体pr请查看：https://github.com/apache/shenyu/pull/5836

35.更新 JWT 依赖

> 具体pr请查看：https://github.com/apache/shenyu/pull/5480

36.打印插件执行时间

> 具体pr请查看：https://github.com/apache/shenyu/pull/5437

37.Admin 中的本地发现支持 upstream 健康检查

> 具体pr请查看：https://github.com/apache/shenyu/pull/5596

38.关闭规则缓存

> 具体pr请查看：https://github.com/apache/shenyu/pull/5589

39.减少并发

> 具体pr请查看：https://github.com/apache/shenyu/pull/5587

40.优化逻辑以避免 "orElse" 执行，更新 VersionTwoExtractor

> 具体pr请查看：https://github.com/apache/shenyu/pull/5415

### 重构

1.使用 spring-integration-jdbc 实现 Admin 分布式锁

> 具体pr请查看：https://github.com/apache/shenyu/pull/5457

2.重构 beanUtils

> 具体pr请查看：https://github.com/apache/shenyu/pull/5497

3.移除 macOS CI

> 具体pr请查看：https://github.com/apache/shenyu/pull/5559

4.更新日志插件中已弃用的 DataBuffer 方法

> 具体pr请查看：https://github.com/apache/shenyu/pull/5620

5.将 e2e k8s 测试修改为 docker compose

> 具体pr请查看：https://github.com/apache/shenyu/pull/5710

6.将 Admin swagger 从 springfox 迁移到 springdoc

> 具体pr请查看：https://github.com/apache/shenyu/pull/5630

7.重构 springcloud 插件

> 具体pr请查看：https://github.com/apache/shenyu/pull/5695

8.重构部分代码

> 具体pr请查看：https://github.com/apache/shenyu/pull/5568

9.删除 SO_SNDBUF 和 SO_RCVBUF

> 具体pr请查看：https://github.com/apache/shenyu/pull/5502

10.重构 shenyu-sync-data-http：将日志 %s 替换为 {}

> 具体pr请查看：https://github.com/apache/shenyu/pull/5465

11.优化节点类型监听器

> 具体pr请查看：https://github.com/apache/shenyu/pull/5435

12.重构插件生命周期

> 具体pr请查看：https://github.com/apache/shenyu/pull/5432

13.调整代码顺序并移除无效的输入参数

> 具体pr请查看：https://github.com/apache/shenyu/pull/5397

### 修复

1.修复请求插件的重复请求头问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5846

2.修复删除 divide 选择器时代理选择器和发现未删除的问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5845

3.修复日志插件错误日志捕获问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5842

4.修复日志插件示例 bug

> 具体pr请查看：https://github.com/apache/shenyu/pull/5429

5.修复内存溢出问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5407

6.修复重写集成测试

> 具体pr请查看：https://github.com/apache/shenyu/pull/5445

7.修复 AbstractWasmPluginDataHandlerTest

> 具体pr请查看：https://github.com/apache/shenyu/pull/5464

8.修复 sql-script/h2/schema.sql 中缺少主键的问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5481

9.修复数据字典页面数据排序异常

> 具体pr请查看：https://github.com/apache/shenyu/pull/5483

10.修复文档错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/5505

11.解决仪表盘路由与上下文路径更新不匹配的问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5510

12.修复 etcd 同步配置问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5535

13.修复 consul 同步问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5546

14.修复未注册无法查询的错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/5578

15.修复插件编辑页面问题：修正插件 ID 查询和更新数据类型

> 具体pr请查看：https://github.com/apache/shenyu/pull/5622

16.修复 AdminConstants 类拼写错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/5637

17.修复 shenyu-examples-springmvc 启动失败问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5664

18.修复仪表盘菜单子项排序不生效问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5691

19.修复 ShenyuApacheDubboXmlProviderApplication 配置

> 具体pr请查看：https://github.com/apache/shenyu/pull/5811

20.修复代理选择器和发现的数据同步 ID 不唯一问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5783

21.过滤禁用的字典选项

> 具体pr请查看：https://github.com/apache/shenyu/pull/5776

22.修复 SpringCloudParser 元数据空数据问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5737

23.修复客户端注册验证

> 具体pr请查看：https://github.com/apache/shenyu/pull/5764

24.配置 dubbo 序列化检查状态为禁用

> 具体pr请查看：https://github.com/apache/shenyu/pull/5756

25.修复示例 TestApacheDubboXmlApplication 启动失败问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5754

26.修复 nacos 数据同步模型缺少上下文路径配置

> 具体pr请查看：https://github.com/apache/shenyu/pull/5722

27.修复 SPI 在多线程场景下创建非单例对象问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5713

28.修复错误的 SQL 语法异常

> 具体pr请查看：https://github.com/apache/shenyu/pull/5707

29.修复 ListUtil->merge 异常

> 具体pr请查看：https://github.com/apache/shenyu/pull/5642

30.修复元数据禁用未过滤问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5638

31.修复 divide 日志请求方法

> 具体pr请查看：https://github.com/apache/shenyu/pull/5607

32.修复 e2e chunk header 错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/5593

33.修复 cookie 错误和 SQL 检查

> 具体pr请查看：https://github.com/apache/shenyu/pull/5567

34.修复空指针异常问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5539
>
> https://github.com/apache/shenyu/pull/5530

35.修复无效路径错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/5533

36.修复热加载问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5509

37.修复 e2e 测试用例无法运行 wget 命令

> 具体pr请查看：https://github.com/apache/shenyu/pull/5519

38.修复降级问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5496

39.解决 rule-sqlmap.xml 中的 SQL 错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/5644

40.修复 readYmlBuildRepository 空指针异常

> 具体pr请查看：https://github.com/apache/shenyu/pull/5819

41.修复 nacos 无法在 Shenyu-examples-SpringCloud 项目中注册问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5825

42.修复 springCloud 规则数据路径设置未使用问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5841
> 
> https://github.com/apache/shenyu/pull/5843

43.修复 shenyu-plugin-logging-elasticsearch：修改 ElasticSearchLogConfig 的 setIndexName

> 具体pr请查看：https://github.com/apache/shenyu/pull/5830

44.修复停止服务时未首先从网关下线问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5507

45.修复 k8s 存活探针无法运行 wget 命令错误

> 具体pr请查看：https://github.com/apache/shenyu/pull/5513

46.修复 AbstractNodeDataSyncService 启动时加载发现上游问题

> 具体pr请查看：https://github.com/apache/shenyu/pull/5473

## 贡献者

特别感谢以下贡献者对 `2.7.0`版本的支持和参与（排名不分先后）。

0xmkzt,Divyansh200102,IceFoxs,JJellyfish,Kerwin Bryant,M.G. Ting,Misaya295,NanMu,Qi Xu,RayayChung,Ricco Chen,Sinsy,
VampireAchao,WindSearcher,Wweiei,Yu Siheng,aias00,caaaaaat,crazyStar,crudboy,dragon-zhang,dyjxg4xygary,dyp314417995,
eye-gu,frank,hdgaadd,hql0312,j@ckzh0u,jerbo99,loongs-zhang,mmengLong,moremind,po-168,tomsun28,ttfont,wlngo,wyfvsfy,
xcsnx,xiangqianZ,xiaoyu,yunlongn,ywwana,zhengke zhou,zhengpeng,ywj1352

## 成为贡献者

我们欢迎每一位贡献者的加入ShenYu，欢迎贡献者以Apache Way的精神参与ShenYu！

贡献者指南请参考：

> https://shenyu.apache.org/zh/community/contributor-guide

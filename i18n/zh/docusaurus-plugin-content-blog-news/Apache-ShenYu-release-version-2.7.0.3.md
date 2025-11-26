---
title: "【Apache ShenYu 2.7.0.3 版本发布】"
description: "Apache ShenYu 2.7.0.3 版本发布"
categories: "Apache ShenYu"
tags: ["Apache ShenYu"]
date: 2025-11-24
---

## 关于Apache ShenYu

`Apache ShenYu` 一款使用 `Java Reactor` 开发的响应式`API` 网关。以其高性能，动态灵活的流量管控，热插拔，易部署等特性，开箱即用为用户提供整套全生命周期的 `API`网关，包含 `API`注册、服务代理、协议转换、`API`文档与 `API`治理等功能。Apache ShenYu于`2022年7月`毕业成为`Apache`顶级项目。

> 官网: https://shenyu.apache.org
> GitHub: https://github.com/apache/shenyu

## 版本预览

三个月后，Apache ShenYu 发布了 2.7.0.3 版本，该版本共合并了 77 个 Pull Requests，新增了 29 项新功能，并进行了多项改进、重构了多项功能，修复了多个错误
版本记录：https://github.com/apache/shenyu/compare/v2.7.0.2...v2.7.0.3

## 更新内容

- feat(ut): 添加一些测试，由 @yuluo-yx 在 [#6105](https://github.com/apache/shenyu/pull/6105) 中贡献
- [type: release] 2.7.0.2 版本发布，由 @Aias00 在 [#6111](https://github.com/apache/shenyu/pull/6111) 中贡献
- Bugfix: 修复 NacosConfig 测试错误，由 @Wweiei 在 [#6116](https://github.com/apache/shenyu/pull/6116) 中贡献
- Bugfix: 修复 MCP Server 插件 requestConfig 过长的问题，由 @Wweiei 在 [#6115](https://github.com/apache/shenyu/pull/6115) 中贡献
- fix: 修复 redisRateLimiter 类型转换错误，关联 [#6103](https://github.com/apache/shenyu/issues/6103)，由 @yuluo-yx 在 [#6120](https://github.com/apache/shenyu/pull/6120) 中贡献
- [fix] 修复 EtcdInstanceRegisterRepositoryTest 运行错误，由 @Wweiei 在 [#6127](https://github.com/apache/shenyu/pull/6127) 中贡献
- 将 pom.xml 中的注释更新为英文，由 @yuluo-yx 在 [#6128](https://github.com/apache/shenyu/pull/6128) 中贡献
- fix: 修复使用 Nacos 数据同步时 ShenyuBootstrapApplication 启动失败的问题，由 @Wweiei 在 [#6124](https://github.com/apache/shenyu/pull/6124) 中贡献
- fix: 增加 MCP 工具默认超时时间并改进错误处理，由 @Aias00 在 [#6131](https://github.com/apache/shenyu/pull/6131) 中贡献
- fix: 使用 java.util.Base64 替换已弃用的 Base64 类，由 @Aias00 在 [#6132](https://github.com/apache/shenyu/pull/6132) 中贡献
- 同步控制台，由 @Wweiei 在 [#6133](https://github.com/apache/shenyu/pull/6133) 中贡献
- 修复在 Nacos 数据同步方式下删除选择器后缓存未正确删除的问题，由 @17661152 在 [#6140](https://github.com/apache/shenyu/pull/6140) 中贡献
- feat(ut): 为 shenyu-registry-api 添加单元测试，由 @yuluo-yx 在 [#6135](https://github.com/apache/shenyu/pull/6135) 中贡献
- feat: 重构注册中心保留关键字字段，由 @Wweiei 在 [#6139](https://github.com/apache/shenyu/pull/6139) 中贡献
- feat: 为同步数据 API 添加单元测试，由 @yuluo-yx 在 [#6142](https://github.com/apache/shenyu/pull/6142) 中贡献
- chore: 将中文注释更新为英文并添加许可证，由 @yuluo-yx 在 [#6146](https://github.com/apache/shenyu/pull/6146) 中贡献
- feat: 重构选择器保留关键字字段，由 @Wweiei 在 [#6141](https://github.com/apache/shenyu/pull/6141) 中贡献
- chore: 将中文翻译为英文，由 @yuluo-yx 在 [#6149](https://github.com/apache/shenyu/pull/6149) 中贡献
- [type:optimize] 优化 EurekaInstanceRegisterRepository 中的实例比较逻辑，由 @yqw570994511 在 [#6154](https://github.com/apache/shenyu/pull/6154) 中贡献
- [feat] 重构规则保留关键字字段，由 @Wweiei 在 [#6147](https://github.com/apache/shenyu/pull/6147) 中贡献
- chore: 将中文翻译为英文，由 @yuluo-yx 在 [#6151](https://github.com/apache/shenyu/pull/6151) 中贡献
- [type:optimize] 优化 NacosInstanceRegisterRepository 中的实例比较逻辑，由 @yqw570994511 在 [#6153](https://github.com/apache/shenyu/pull/6153) 中贡献
- feat: 添加更友好的提示信息以方便调试，由 @yuluo-yx 在 [#6157](https://github.com/apache/shenyu/pull/6157) 中贡献
- test: 为 FallbackShenyuClientRegisterService 添加更多测试，由 @yuluo-yx 在 [#6155](https://github.com/apache/shenyu/pull/6155) 中贡献
- feat: 适配其他数据库用于 tag 和 appAuth，由 @yuluo-yx 在 [#6152](https://github.com/apache/shenyu/pull/6152) 中贡献
- [feat] mcpServer 支持对象和数组参数，由 @Wweiei 在 [#6150](https://github.com/apache/shenyu/pull/6150) 中贡献
- feat: 同步控制台，由 @Wweiei 在 [#6160](https://github.com/apache/shenyu/pull/6160) 中贡献
- 修改示例测试 MotanPluginTest 的测试数据，由 @ywwana 在 [#6164](https://github.com/apache/shenyu/pull/6164) 中贡献
- [fix] 修复数据同步 bug，由 @ywwana 在 [#6165](https://github.com/apache/shenyu/pull/6165) 中贡献
- [feat] motan 插件支持基于选择器的配置，由 @478320 在 [#6058](https://github.com/apache/shenyu/pull/6058) 中贡献
- chore: 修复拼写错误，由 @yuluo-yx 在 [#6172](https://github.com/apache/shenyu/pull/6172) 中贡献
- [type:fix] 修复 e2e_kafka，由 @xcsnx 在 [#6170](https://github.com/apache/shenyu/pull/6170) 中贡献
- chore: 添加新行，由 @yuluo-yx 在 [#6171](https://github.com/apache/shenyu/pull/6171) 中贡献
- [fix] 修复 AiResponseTransformerPluginTest 运行错误，由 @Wweiei 在 [#6169](https://github.com/apache/shenyu/pull/6169) 中贡献
- [feat] 重构 discovery_upstream 表的保留关键字字段，由 @Wweiei 在 [#6167](https://github.com/apache/shenyu/pull/6167) 中贡献
- [type:fix] 修复 oracle schema.sql，由 @eye-gu 在 [#6162](https://github.com/apache/shenyu/pull/6162) 中贡献
- [feat] 网关和客户端状态管理，由 @xchoox 在 [#6057](https://github.com/apache/shenyu/pull/6057) 中贡献
- [feat]: shenyu mcp 插件自动注册，由 @478320 在 [#6163](https://github.com/apache/shenyu/pull/6163) 中贡献
- [feat] 插件配置基于选择器进行缓存，由 @478320 在 [#6068](https://github.com/apache/shenyu/pull/6068) 中贡献
- feat: AI 代理增强（集成 SpringAI、降级机制和代理 apikey），由 @fantasy-lotus 在 [#6145](https://github.com/apache/shenyu/pull/6145) 中贡献
- [type:fix] 修复初始化 sql，由 @eye-gu 在 [#6176](https://github.com/apache/shenyu/pull/6176) 中贡献
- 修复 mcp-auto-register 的一些 bug，由 @478320 在 [#6180](https://github.com/apache/shenyu/pull/6180) 中贡献
- feat: 使用增强版替换旧的 ai 代理，由 @fantasy-lotus 在 [#6174](https://github.com/apache/shenyu/pull/6174) 中贡献
- 修复 shenyu-registry-nacos：修改 nacos 实例检查逻辑，由 @BraveheartStone 在 [#6178](https://github.com/apache/shenyu/pull/6178) 中贡献
- fix: 修复 doSelectMaster，由 @fantasy-lotus 在 [#6185](https://github.com/apache/shenyu/pull/6185) 中贡献
- fix: 修复 shenyu-sync-data-http 同步密码错误，由 @yuluo-yx 在 [#6181](https://github.com/apache/shenyu/pull/6181) 中贡献
- feat: ai 代理同步控制台，由 @fantasy-lotus 在 [#6186](https://github.com/apache/shenyu/pull/6186) 中贡献
- [fix] TagVO 的 "name" 字段已更改，由 @Wweiei 在 [#6190](https://github.com/apache/shenyu/pull/6190) 中贡献
- feat: 适配其他数据库用于服务发现的 sql 字段，由 @yuluo-yx 在 [#6166](https://github.com/apache/shenyu/pull/6166) 中贡献
- chore(deps): 将 org.apache.zookeeper:zookeeper 从 3.9.3 升级到 3.9.4，由 @dependabot[bot] 在 [#6183](https://github.com/apache/shenyu/pull/6183) 中贡献
- [type:feat] 添加单元测试，由 @xchoox 在 [#6182](https://github.com/apache/shenyu/pull/6182) 中贡献
- [feat] loggingRabbitMQ 插件支持基于选择器的配置，由 @478320 在 [#6059](https://github.com/apache/shenyu/pull/6059) 中贡献
- [feat] sofa 插件支持基于选择器的配置，由 @478320 在 [#6062](https://github.com/apache/shenyu/pull/6062) 中贡献
- [feat]: loggingKafka 插件支持基于选择器的配置，由 @478320 在 [#6074](https://github.com/apache/shenyu/pull/6074) 中贡献
- [type:optimize] 优化 LogCollectUtils，由 @liangjh98 在 [#6191](https://github.com/apache/shenyu/pull/6191) 中贡献
- [type:feat] 修改 bootstrap 心跳上报机制，由 @xchoox 在 [#6187](https://github.com/apache/shenyu/pull/6187) 中贡献
- [type:feat] HTTP 和 WebSocket 同步模式支持心跳检测，由 @xchoox 在 [#6179](https://github.com/apache/shenyu/pull/6179) 中贡献
- feat: 为 shenyu-register-client-api 添加单元测试，由 @yuluo-yx 在 [#6192](https://github.com/apache/shenyu/pull/6192) 中贡献
- [feat] github ci，由 @Aias00 在 [#6031](https://github.com/apache/shenyu/pull/6031) 中贡献
- infra: 新增 Issue 创建时自动通知的 GitHub Action，由 @yuluo-yx 在 [#6198](https://github.com/apache/shenyu/pull/6198) 中贡献
- feat: 为 shenyu-register-client-beat 模块添加单元测试，由 @yuluo-yx 在 [#6193](https://github.com/apache/shenyu/pull/6193) 中贡献
- infra: 新增 Issue 标签管理 GitHub Action，由 @yuluo-yx 在 [#6197](https://github.com/apache/shenyu/pull/6197) 中贡献
- [feat] mvnd，由 @Aias00 在 [#6041](https://github.com/apache/shenyu/pull/6041) 中贡献
- [ISSUE #6144] 修复通过 Nacos 发现下游服务时，下游服务重启后旧 IP 覆盖新 IP 的问题。该问题导致通过 ShenYu 调用下游服务时报错 “Can not find healthy upstream URL, please check your configuration!”，由 @BraveheartStone 在 [#6201](https://github.com/apache/shenyu/pull/6201) 中贡献
- [fix] 修复 MCP Server 中由 shenyuContext 设置的 GET 请求路径截断问题，由 @MaMengzhen 在 [#6209](https://github.com/apache/shenyu/pull/6209) 中贡献
- fix: 修复别名 shenyu-access-lo… 下存在多个索引时的问题，由 @wusuobuzai 在 [#6203](https://github.com/apache/shenyu/pull/6203) 中贡献
- 修复活跃提交者列表中的拼写错误，由 @yuluo-yx 在 [#6205](https://github.com/apache/shenyu/pull/6205) 中贡献
- feat: 为 shenyu-registry-k8s 模块添加单元测试，由 @yuluo-yx 在 [#6206](https://github.com/apache/shenyu/pull/6206) 中贡献
- fix: 移除 MotanProxyServiceTest 中不必要的 mock 返回值，由 @Aias00 在 [#6210](https://github.com/apache/shenyu/pull/6210) 中贡献
- feat(ci): 使用本地 issue-manager 脚本替换 prow action，由 @yuluo-yx 在 [#6211](https://github.com/apache/shenyu/pull/6211) 中贡献
- 修复 Mcp 自动注册 bug，由 @478320 在 [#6212](https://github.com/apache/shenyu/pull/6212) 中贡献
- feat: 增强 mcp server 自动注册功能，由 @478320 在 [#6213](https://github.com/apache/shenyu/pull/6213) 中贡献
- fix: 修复因 mvnd 缓存导致使用过时依赖的问题，由 @478320 在 [#6217](https://github.com/apache/shenyu/pull/6217) 中贡献
- 修复多个选择器连接不同注册中心的问题，由 @yunlongn 在 [#6218](https://github.com/apache/shenyu/pull/6218) 中贡献
- feat: 通过 swagger 文档导入 mcp server 配置，由 @478320 在 [#6219](https://github.com/apache/shenyu/pull/6219) 中贡献
- refactor: 提取插件、选择器和规则数据类的公共基础数据，由 @yuluo-yx 在 [#6215](https://github.com/apache/shenyu/pull/6215) 中贡献
- feat: 移除 shenyu-infra-x-module 模块，由 @yuluo-yx 在 [#6216](https://github.com/apache/shenyu/pull/6216) 中贡献
- chore: 修复某些文件中的拼写错误，由 @khanhkhanhlele 在 [#6224](https://github.com/apache/shenyu/pull/6224) 中贡献
- fix: 修复 shenyu-examples-mcp，由 @478320 在 [#6226](https://github.com/apache/shenyu/pull/6226) 中贡献
- 修复 shenyu mcp 相关 bug，由 @478320 在 [#6227](https://github.com/apache/shenyu/pull/6227) 中贡献
- chore: 使用新依赖及其版本更新 LICENSE，由 @Aias00 在 [#6234](https://github.com/apache/shenyu/pull/6234) 中贡献

## 新贡献者

- @17661152 首次贡献于 [#6140](https://github.com/apache/shenyu/pull/6140)
- @xchoox 首次贡献于 [#6057](https://github.com/apache/shenyu/pull/6057)
- @BraveheartStone 首次贡献于 [#6178](https://github.com/apache/shenyu/pull/6178)
- @liangjh98 首次贡献于 [#6191](https://github.com/apache/shenyu/pull/6191)
- @MaMengzhen 首次贡献于 [#6209](https://github.com/apache/shenyu/pull/6209)
- @wusuobuzai 首次贡献于 [#6203](https://github.com/apache/shenyu/pull/6203)
- @khanhkhanhlele 首次贡献于 [#6224](https://github.com/apache/shenyu/pull/6224)

## 成为贡献者

我们欢迎每一位贡献者的加入ShenYu，欢迎贡献者以Apache Way的精神参与ShenYu！

贡献者指南请参考：

> https://shenyu.apache.org/zh/community/contributor-guide

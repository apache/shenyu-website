---
sidebar_position: 2
title: 升级到 2.7.2
keywords: ["upgrade", "2.7.2", "migration"]
description: Apache ShenYu 2.7.2 的数据库、配置和集成迁移说明。
---

本文以已发布的 `v2.7.2` 源码和发行包为依据。替换 Admin 或 Bootstrap 前，请阅读[发布说明](https://github.com/apache/shenyu/blob/v2.7.2/RELEASE-NOTES.md)，并将发行版配置与现有部署逐项比较。将原配置、数据库备份与旧版程序一起保留，用于回滚。

## 运行环境与依赖

使用 JDK 17 或更高版本。发行版采用 Spring Boot `3.5.16`、Spring Cloud `2025.0.3` 和 H2 `2.3.232`。自定义网关与扩展应对齐[发行版 POM](https://github.com/apache/shenyu/blob/v2.7.2/pom.xml) 的依赖管理，不要将 ShenYu 2.7.2 与旧示例中的 Spring Boot 2.x 混用。使用 `${shenyu.version}` 的 Maven 示例时，将该属性设为 `2.7.2`。`${project.version}` 示例指的是 ShenYu 源码工程版本；在独立版本号的业务工程中，应将其替换为 `2.7.2`。

发布说明还列出了未解决的依赖安全公告及受影响配置。仅升级版本不能证明所有可选集成都不受影响。

## 数据库迁移与升级顺序

全新安装使用 [v2.7.2 初始化脚本](https://github.com/apache/shenyu/tree/v2.7.2/db/init)。已有部署需要执行迁移；初始化脚本不会升级已有表结构。

1. 停止所有 Admin 写入，备份数据库、配置与旧版程序。停止 Admin 前，确认网关配置已完成同步。
2. 对于已有的 2.7.1 MySQL、PostgreSQL、Oracle、openGauss 或 OceanBase 数据库，执行[发行版升级目录](https://github.com/apache/shenyu/tree/v2.7.2/db/upgrade) 中对应方言的 `2.7.1-upgrade-2.7.2-<dialect>.sql`。该脚本包含数据权限去重和实例心跳时间持久化等变更。更早版本应先完成中间版本的迁移。
3. **v2.7.2 发行版还要求执行名为 `2.7.2-upgrade-2.7.3-<dialect>.sql` 的脚本。** 虽然文件名及上游升级指南中的部分标题仍带有 2.7.3，这些脚本已包含在本次发行版中，且发布说明明确要求执行。审阅并一次性执行对应方言的完整脚本，其中包含 `loged` 列重命名、实例标识唯一约束、API 调试请求头存储以及其他发行版表结构变更。不要因文件名跳过，也不要盲目重复执行。
4. 先升级全部 Bootstrap，或将 Bootstrap 与 Admin 一起升级。新版 Admin 发出的 `logged` 字段无法被旧版 Bootstrap 正确识别。数据库迁移和兼容的 Bootstrap 部署完成前，保持 Admin 停止状态。
5. 为 Admin 配置必填的 JWT 签名密钥后启动，验证登录与配置同步，再测试代表性路由和插件，最后恢复正常配置写入。

MySQL 重命名列的语句使用 MySQL 8.0 语法。对于 MySQL 5.7，应结合现有列定义审阅等价的 `CHANGE COLUMN` 语句。实例标识唯一约束还要求使用现代 InnoDB 索引格式，不要改成截断的前缀索引。去重规则和数据库差异见[发行版数据库升级指南](https://github.com/apache/shenyu/blob/v2.7.2/db/upgrade/upgrade-guide.md)。

### 持久化 H2 数据库

H2 驱动从 `1.4.200` 升级到 `2.3.232`。不要用新驱动直接打开旧版持久化数据库文件。

1. 停止 Admin 写入并备份原数据库。
2. 使用 H2 1.4.200 的 `SCRIPT` 导出数据。
3. 按照 [H2 迁移指南](https://www.h2database.com/html/migration-to-v2.html)，通过 `RUNSCRIPT FROM 'backup.sql' FROM_1X` 导入新建的 H2 2.3.232 数据库。
4. 对导入后的数据库执行发行版表结构迁移。早于 2.7.2 的数据库需先添加 `instance_info.last_heart_beat_time BIGINT DEFAULT 0 NOT NULL`，再执行发行版中的 `2.7.2-upgrade-2.7.3-h2.sql`；其余中间版本变更需与发行版初始化表结构核对。
5. 验证迁移后的数据和表结构，再将 Admin 切换到新数据库。

默认内存 H2 数据库没有需要迁移的持久化文件。回滚时必须同时恢复旧版 Admin 和原数据库备份，不要让旧程序连接迁移后的数据库。

## Admin 认证与 API 客户端

显式配置 `shenyu.jwt.secret-key`，或提供环境变量 `SHENYU_JWT_SECRETKEY`。密钥为空或使用旧版公开密钥、默认密钥时，Admin 会拒绝启动。所有 Admin 实例必须使用同一个签名密钥。升级和回滚都会使已有登录会话失效，需要重新登录。详见 [Admin 配置](../user-guide/property-config/admin-property-config.md#shenyujwt-配置)。

`selector`、`rule` 数据库列、Admin REST DTO/VO 和网关侧 `RuleData` 均使用 `logged`，替代原来的 `loged`。兼容期内 Admin 仍通过别名接受旧 REST 请求字段，但响应只返回 `logged`；读取响应字段的客户端需要同步修改。已存储的限流规则 handle JSON 仍支持旧拼写。Admin 禁用 Shiro RememberMe；自定义安全管理器应保留该行为，除非已单独迁移到修复后的实现。

## 网关配置与路由

* HTTP keep-alive 默认改为 `true`，连接池默认改为 `FIXED`，获取连接的超时为 `3000` ms。按部署容量配置 `pool.maxConnections`，并将 `pool.maxIdleTime` 设得低于上游空闲连接超时。需要恢复对应旧行为时，可分别使用 `keepAlive: false` 和 `pool.type: ELASTIC`。
* `responseTimeout` 默认 `3000` ms，限制响应读取之间的间隔，也作用于收到响应头之后。检查 SSE、长轮询和 Token 流。非正值仅关闭这一超时；单独配置的读取、空闲、路由、重试及调用方超时仍然有效。
* 同时核对单次请求超时与整个重试序列的预算。`current` 策略超出总预算时返回 HTTP 504，耗尽重试次数时返回 HTTP 408。各策略的预算公式见发布说明。
* 匹配缓存使用 `selectorMatchCache.cache` 和 `ruleMatchCache.cache`。移除旧的 `trie` 配置，并核对[网关配置](../user-guide/property-config/gateway-property-config.md)中的纯路径条件限制与 TTL 陈旧窗口。
* 无效的 CORS `origin-regex` 正则表达式现在会导致网关启动失败，部署前需完成验证。
* Divide 的 `headerMaxSize` 统计字段名、字段值、行格式和结束 CRLF。检查接近旧限制边界的请求。
* `leastActive` 现在统计活动 WebSocket 会话和 Apache Dubbo 灰度路由调用。Divide 之外的 `shortestResponse`，以及 gRPC、TCP、Java SDK 路径，仍按发布说明中的回退规则工作。
* 修改 MCP Server 选择器的消息端点会重建 SSE 传输，已有客户端需要重新连接并初始化。

## 注册中心依赖与扩展 API

SDK 库、SDK Starter 和 `shenyu-registry-core` 不再传递引入注册中心实现。需要在应用运行时依赖中显式声明与 `registerType` 对应的提供者，并使用 `2.7.2` 版本：

| 注册中心 | Artifact |
| --- | --- |
| ZooKeeper | `shenyu-registry-zookeeper` |
| etcd | `shenyu-registry-etcd` |
| Nacos | `shenyu-registry-nacos` |
| Eureka | `shenyu-registry-eureka` |
| Kubernetes | `shenyu-registry-kubernetes` |
| Apollo | `shenyu-registry-apollo` |

`shenyu-spring-boot-starter-registry` 保留原有五种提供者的兼容聚合，Apollo 仍需显式引入。Consul 和 Polaris 需要单独提供兼容的 SPI 实现。`shenyu.sdk.register-type=local` 不需要注册中心实现。详见[发行版提供者指南](https://github.com/apache/shenyu/blob/v2.7.2/shenyu-registry/README.md)。

自定义 `DiscoveryUpstreamDataSubscriber` 实现必须将 `unSubscribe(DiscoverySyncData)` 改为 `unSubscribe(DiscoveryUpstreamKey)` 并重新编译。`MemorySafeLRUMap` 已弃用但仍保留；`WindowTinyLFUMap` 按条目数量限制容量，不能直接等价替代内存压力淘汰。未使用的 `MemorySafeWindowTinyLFUMap` 已移除。Apollo 适配器已声明弃用并计划转移到 plugin-store，但本版本仍提供，详见 [Apollo 迁移指南](https://github.com/apache/shenyu/blob/v2.7.2/docs/plugin-store-apollo.md)。

## 外部插件迁移

Motan、SOFA、Tars、Hystrix、Casdoor，以及 Consul 同步和注册扩展不再由默认发行包提供。需要从 [plugin-store](https://github.com/apache/shenyu-plugin-store) 安装兼容的扩展版本，并保留原有插件配置。不要把核心网关版本当作这些扩展的发布版本。Consul、Casdoor 和 Hystrix 的具体切换说明分别见发行版中的 [Consul](https://github.com/apache/shenyu/blob/v2.7.2/docs/plugin-store-consul.md)、[Casdoor](https://github.com/apache/shenyu/blob/v2.7.2/docs/plugin-store-casdoor.md) 和 [Hystrix](https://github.com/apache/shenyu/blob/v2.7.2/docs/plugin-store-hystrix.md) 迁移文档。Hystrix 为旧版兼容插件，新部署应使用 Resilience4j。

## AI 与可选功能

* [AI 请求转换](../plugin-center/ai/ai-request-transformer.md)在转换失败时重放原始请求体，并保留下游错误，不会重复执行插件链。
* [敏感词插件](../plugin-center/ai/ai-sensitive-word.md)在无法执行检查时遵循 `failClosed`，并检查解码后的 JSON 字符串，包括 Unicode 转义。Redis 刷新失败时，已有词库缓存或规则内词表仍可用于检查。
* [AI Token 限流](../plugin-center/ai/ai-token-limiter.md)只读取协议约定的输出用量字段，不会把生成内容或元数据中的同名字段计入用量。
* Agent Gateway 默认顺序从 `198` 改为 `169`。检查重叠的 MCP 选择器和自定义顺序。其插件配置只接受 `aggregation`，已有任意字段需在保存或导入前移除。工具、远端聚合、HTTP 工具、资源及结构化内容过滤均需显式启用，并满足各自的授权与失败处理要求，详见[发布说明](https://github.com/apache/shenyu/blob/v2.7.2/RELEASE-NOTES.md)。
* 缓存请求合并仅在启用 `singleFlightEnabled` 后生效，默认关闭。协调范围仅限单个网关实例，并保留原有缓存资格与失败回退行为。
* WASM 执行期限和内存限制默认关闭。启用前请阅读[限制约定](https://github.com/apache/shenyu/blob/v2.7.2/docs/wasm-execution-limits.md)。

## 验证与回滚

验证 Admin 登录、选择器和规则更新是否同步到每个网关、代表性 HTTP/RPC 路由、流式响应、注册发现以及已启用的 AI 插件。将错误、延迟、连接池饱和情况和 Token 用量与升级前进行比较。

验证失败时，停止写入，并将旧版程序、配置与匹配的数据库备份一起恢复。备份之后产生的数据变更需要单独制定恢复方案。回滚后重新登录。旧部署继续使用 2.7.1 历史文档，不要将历史示例重写为 2.7.2。

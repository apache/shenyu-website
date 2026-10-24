---
title: Tracing插件
keywords: ["Tracing", "OpenTelemetry", "OTLP", "traceparent", "Jaeger", "Tempo"]
description: Apache ShenYu 网关的分布式追踪
---

# 1. 概述

## 1.1 插件名称

* 分布式追踪插件

## 1.2 插件作用

Tracing 插件基于 [OpenTelemetry](https://opentelemetry.io/) 把一次请求的调用链贯穿客户端、网关与上游服务：

* **入站上下文**：读取客户端携带的 W3C `traceparent`、`tracestate` 以及 W3C `baggage`；没有合法上下文的请求会开启一条新的 trace。
* **每个请求一个 server span**：网关为请求创建 OpenTelemetry span，名称由请求方法与命中的路由组成，并记录路由信息与请求结果。
* **出站上下文**：把网关 span 的上下文注入到发往上游的 HTTP 请求，使上游延续同一条 trace，其 span 成为网关 span 的子 span。
* **导出**：配置了端点后，span 通过 OTLP over HTTP 导出到任意兼容的后端（Jaeger、Tempo、OpenTelemetry Collector 等）。
* **日志关联**：请求的 trace id 通过 exchange 属性 `shenyu-agent-trace-id` 暴露，logging 插件会把它写进访问日志记录。

插件的 order 为 `0`，在插件链里先于其它业务插件执行（只有 global handler 排在它之前），因此它的 span 覆盖该请求的其余全部插件。

## 1.3 默认关闭

只有 `shenyu.tracing.enabled=true` 时才会生效：starter 只在此时创建 OpenTelemetry SDK 与 tracing 插件。开关保持默认值时，网关行为与未引入插件时完全一致。

# 2. 接入方式

## 2.1 引入依赖

在网关中引入 tracing starter。走 HTTP 的路由继续使用网关已有的 http client 插件，由它完成 trace 上下文的注入。

```xml
<!-- apache shenyu tracing plugin start-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-tracing</artifactId>
    <version>${project.version}</version>
</dependency>
<!-- apache shenyu tracing plugin end-->
```

starter 已内置 OpenTelemetry SDK 与 OTLP over HTTP exporter，不需要额外依赖。

## 2.2 开启插件

```yml
shenyu:
  tracing:
    enabled: true
    otlp:
      endpoint: http://otel-collector:4318
```

启动时网关会打印真正生效的配置。span 没有到达后端时，这是第一个要看的日志：

```text
shenyu tracing: service name shenyu-gateway, sampler ParentBased{...}, span creation enabled, spans exported http://otel-collector:4318/v1/traces
```

# 3. 配置项

所有配置都在 `shenyu.tracing` 下。

| 配置项               | 默认值           | 说明                                                                                                                       |
|:---------------------|:-----------------|:---------------------------------------------------------------------------------------------------------------------------|
| `enabled`            | `false`          | 是否开启插件。为 `false` 时不创建 span，也不做任何注入。                                                                     |
| `serviceName`        | `shenyu-gateway` | span 的 `service.name` 资源属性，后端里网关的服务名。                                                                          |
| `createSpan`         | `true`           | 网关是否创建自己的 span。已经由 Java agent 等方案埋点的部署设为 `false`，见[第 10 节](#10-与-java-agent-共存)。                |
| `sampler`            | `parent_based`   | `parent_based`、`always_on`、`always_off` 或 `ratio`，见[第 4 节](#4-采样)。                                                    |
| `sampleRatio`        | `0.1`            | `ratio` 采样器的比例，取值 `0` 到 `1`。只被 `ratio` 使用，且只作用于没有父上下文的请求。                                        |
| `resourceAttributes` | 无               | 追加到每个 span 的资源属性，例如 `deployment.environment`。                                                                    |
| `otlp.endpoint`      | 无               | collector 的 traces 端点。留空时 span 完全不导出。                                                                            |
| `otlp.timeout`       | `10s`            | 单次导出请求的超时时间，使用 duration 写法，例如 `10s`、`500ms`。                                                              |
| `otlp.headers`       | 无               | 导出请求的 header，例如 collector 要求的 `authorization`。                                                                     |

一份完整的配置：

```yml
shenyu:
  tracing:
    enabled: true
    serviceName: shenyu-gateway
    createSpan: true
    sampler: parent_based
    sampleRatio: 0.1
    resourceAttributes:
      deployment.environment: prod
      service.version: 2.7.2
    otlp:
      endpoint: http://otel-collector:4318
      timeout: 10s
      headers:
        authorization: Bearer <token>
```

## 3.1 端点写法

`otlp.endpoint` 是 collector 的 traces 端点：

* 不带 path 的端点，例如 `http://otel-collector:4318`，会自动补上 `/v1/traces`，避免把 collector 的根路径当作 traces 端点而静默丢数据。
* 已经带 path 的端点，例如 `http://otel-collector:4318/v1/traces`，按原样使用；端点上的 query 与 fragment 也会保留。

# 4. 采样

采样器只决定请求的 span 是否被记录与导出，不会改变请求是否被转发。

| 采样器         | 对应的 OpenTelemetry 采样器                   | 行为                                                                                                                                                    |
|:---------------|:----------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `parent_based` | `parentBased(alwaysOn)`                       | 沿用客户端的采样决策；客户端没有决策时采样。这是默认值。                                                                                                  |
| `always_on`    | `alwaysOn()`                                  | 所有请求都采样，**包括**客户端已经决定不采样的请求。                                                                                                     |
| `always_off`   | `alwaysOff()`                                 | 所有请求都不采样，**包括**客户端已经决定采样的请求。                                                                                                     |
| `ratio`        | `parentBased(traceIdRatioBased(sampleRatio))` | 与 `parent_based` 一样沿用客户端决策；对**没有父上下文**的请求按 `sampleRatio` 采样。带合法 `traceparent` 的请求沿用其客户端的决策，因此不会被比例重新采样。 |

说明：

* `sampleRatio` 会被收敛到 `0` 到 `1`，越界时会打印日志；无法解析的值等同于不采样。
* 采样标志会传给上游：未采样的请求依然会被传播，只是网关 span 的 sampled 标志为 0，上游不会因此开始收集客户端并不需要的 trace。
* 生产环境建议使用 `parent_based`，这样每一跳都尊重调用方的决策；排障时可以临时用 `always_on`；`always_off` 可以在不摘依赖、不改路由的情况下关闭追踪；`ratio` 只对完全没有 trace 上下文的入口流量（例如移动端直连、压测流量）有意义。
* `always_on` 与 `always_off` 都不是按路由生效的开关，它们作用于网关的所有请求。

# 5. 上下文传播

## 5.1 入站

网关读取客户端的 W3C trace 上下文与 W3C baggage：

* `traceparent`、`tracestate` 用于延续客户端的 trace，`baggage` 随之一并携带。
* 请求没有合法上下文，或者上下文格式非法时，会开启新的 trace。非法的 header 不会报错，请求照常转发。
* 请求中出现重复的 `traceparent` 时，按“没有上下文”处理：重复的 trace 上下文 header 是已知的注入手段。请求照常转发，但会开启新 trace。
* 只支持 W3C 格式，不读取 B3（见[第 11 节](#11-暂不支持)）。

## 5.2 出站

网关 span 的上下文由 http client 插件注入到发往上游的 HTTP 请求，`WebClient` 与 Netty 两条路径都覆盖：

* 写入网关 span 的上下文之前，会先删掉出站请求中来自客户端的 `traceparent` 与 `tracestate`，因此离开网关的 trace 上下文有且只有一份，且属于网关 span。经由网关调用的上游，其 parent 永远是网关 span，而不是客户端的 span。
* `baggage` 不属于 trace 本身，按客户端发送的原样透传。
* 未开启追踪，或 `createSpan=false` 且没有任何埋点设置活跃上下文时，不做任何注入：客户端的 header 原样转发。
* `baggage` 会被上游接收并可能被其记录，不要在其中放置密钥等敏感信息。

注入是一个扩展点：`TraceContextPropagator` 是 ShenYu 的 SPI，tracing 插件注册了 `http` 协议的实现。某个协议插件如果要传播自己的协议，可以增加该协议的 propagator 实现并把自己的 carrier 交给它。目前只提供了 `http` 的实现，因此不通过 HTTP 请求上游的协议还没有覆盖（见[第 11 节](#11-暂不支持)）。

# 6. 网关 span

## 6.1 名称

span 名称为 `{method} {route}`，例如 `GET /http/order/findById`。其中 route 取上游注册的 api 路径，因此名称是有界值，不会随流量增长：

| 场景                            | span 名称                  |
|:--------------------------------|:---------------------------|
| 命中路由                        | `GET /http/order/findById` |
| 未命中路由（例如 404）          | `GET`                      |
| 既没有方法也没有路由            | `shenyu-gateway`           |

## 6.2 属性

| 属性                        | 记录范围                                                         |
|:----------------------------|:-----------------------------------------------------------------|
| `http.request.method`       | 所有请求                                                         |
| `http.route`                | 命中已注册 api 的请求                                            |
| `shenyu.rpc.type`           | 所有请求，例如 `http`                                            |
| `shenyu.route.module`       | 所有请求，命中路由所属模块（通常是应用名）                       |
| `shenyu.route.method`       | 非 http 类协议的请求，命中的 api 方法                            |
| `shenyu.context.path`       | 经过 context path 插件的请求                                     |
| `shenyu.upstream.host`      | 已路由到上游的请求                                               |
| `shenyu.selector.id`        | HTTP 路由的 divide 插件；其它协议不暴露该值                      |
| `http.response.status_code` | span 结束时已知状态码的请求                                      |
| `shenyu.error.type`         | 仅 error span：`timeout` 或异常类型                              |
| `shenyu.cancelled`          | 被客户端取消的请求                                               |

只记录有界值：原始请求路径与 query string 都不会作为属性，路由取自命中 api 的元数据。这样属性与 span 名称的基数不会随流量增长，也避免把 query string 里常见的个人数据写进后端。

## 6.3 状态与错误

状态遵循 OpenTelemetry 的 http 约定：

| 结果                                  | span 状态                                        |
|:--------------------------------------|:-------------------------------------------------|
| 响应 `2xx` / `3xx`                    | `UNSET`                                          |
| 响应 `4xx`（客户端错误）              | `UNSET`，客户端错误不算网关的失败                |
| 响应 `5xx`（服务端错误）              | `ERROR`，描述为 `HTTP 500`                       |
| 超时，异常或 `408` / `504`            | `ERROR`，并记录 `shenyu.error.type=timeout`      |
| 其它异常                              | `ERROR`，描述为异常类型                          |
| 客户端取消请求                        | 状态不变，记录 `shenyu.cancelled=true`           |

异常会以 OpenTelemetry 的 exception event 记录，其中带有异常类型、message 与堆栈。span 的状态描述本身只写异常类型，不会把异常 message 变成状态描述。

被客户端错误“答复”的失败，例如限流拒绝请求并返回 `429`，其 span 状态与直接响应同样状态时一致，保持 `UNSET`。这样按 `ERROR` span 统计的看板统计的是网关与上游的失败，而不是被拒绝的客户端请求。

# 7. 日志与 trace 关联

请求的 trace id 会被写入 exchange 属性 `shenyu-agent-trace-id`：

* logging 插件读取该属性并写进访问日志记录的 `traceId` 字段，因此可以用后端的 trace id 找到对应的访问日志，反之亦然。
* 网关的请求级日志也会在请求结束后输出该 trace id：

```text
shenyu chain handle uri:/http/order/findById, traceId:4bf92f3577b34da6a3ce929d0e0e4736, cost:12
```

该日志为 `debug` 级别。需要在普通部署的日志里看到 trace id 时开启：

```yml
logging:
  level:
    org.apache.shenyu.web.handler: debug
```

# 8. 导出到后端

exporter 使用 OTLP over HTTP，当前主流后端都支持，不需要为每家后端更换专用 exporter。下面的例子只有端点不同。

## 8.1 OpenTelemetry Collector

```yaml
# otel-collector.yml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318

exporters:
  otlphttp:
    endpoint: http://tempo:4318

service:
  pipelines:
    traces:
      receivers: [ otlp ]
      exporters: [ otlphttp ]
```

```yml
shenyu:
  tracing:
    enabled: true
    otlp:
      endpoint: http://otel-collector:4318
```

## 8.2 Jaeger

较新的 Jaeger 直接接受 OTLP，网关可以直接导出，不需要中间的 collector；对于自身不接受 OTLP 的版本，在它前面放一个 OpenTelemetry Collector，并让网关指向该 collector。

```yml
shenyu:
  tracing:
    enabled: true
    otlp:
      endpoint: http://jaeger:4318
```

## 8.3 Grafana Tempo

Tempo 默认在 `4318` 上提供 OTLP over HTTP 接收端。

```yml
shenyu:
  tracing:
    enabled: true
    otlp:
      endpoint: http://tempo:4318
```

## 8.4 导出行为

* span 由 OpenTelemetry SDK 批量收集与导出，因此 span 到达后端会有一个小延迟，而不是随响应一起到达。批量参数使用 SDK 默认值，没有作为 ShenYu 配置项开放。
* 导出问题永远不会影响请求转发。exporter 无法创建时（例如端点不是合法 url）会打印日志，span 留在进程内；exporter 连不上 collector 时丢弃该批 span，请求照常返回。插件的集成测试会停掉 collector 来验证请求仍然正常转发。
* 启动日志与失败日志里的端点会被去掉 user info、query 与 fragment，因此写在端点 url 里的 token 不会进日志。

# 9. 性能与安全

## 9.1 性能

* 生产环境保持 `parent_based`：调用方没有采样的请求不会产生导出开销，且每一跳都尊重调用方的决策。排障时可临时改为 `always_on`，`ratio` 只用于没有 trace 上下文的入口流量。
* 每个请求只创建并结束一个 span，导出在 SDK 自己的线程上执行，请求不会被 collector 阻塞。剩下的开销只是向出站请求注入几个 header。
* 属性与 span 名称都是有界值，即使网关路由很多，后端的基数也不会膨胀。

## 9.2 安全

* 重复的 `traceparent` 会被拒绝，且客户端的 `traceparent`、`tracestate` 会在写入网关 span 上下文之前被替换，客户端无法伪造上游调用的 parent。
* `baggage` 原样透传，会到达延续该 trace 的每一跳；不要在其中放置凭据或个人数据。
* `otlp.headers` 通常带有 collector 的 token，`resourceAttributes` 可能带有部署信息。把它们放在部署的密钥/环境变量配置里，而不是共享文件；collector 不在本机时使用 TLS（`https`）。
* 原始请求路径与 query string 不会作为属性记录，query 里的个人数据不会进后端。`shenyu.upstream.host`、`http.route`、`shenyu.selector.id` 会被记录，能读到 trace 的人可以看到内部拓扑。

# 10. 与 Java agent 共存

已经对网关做过埋点的部署（例如使用 OpenTelemetry Java agent）设置 `createSpan: false`：

* 此时插件不再为请求创建第二个 span，只做传播：有埋点的活跃上下文（agent 的 span）时延续它，没有时回退到客户端的 header。该上下文的 trace id 照常暴露给日志。
* 进程内的全局 `OpenTelemetry` 实例不会被替换，agent 自己的 SDK、exporter 与采样配置保持不变。

有两个需要知道的限制：

* 埋点的活跃上下文是线程绑定的，而响应式网关会切换线程。当 agent 的 span 不是执行 tracing 插件的线程上的活跃上下文时，插件会回退到客户端的 header。
* agent 会自己给 http client 埋点。它的注入可能发生在插件注入之后，上游可能把 agent 的 span 记为 parent。trace 仍然是同一条，只是上游 span 的直接 parent 不同。

# 11. 暂不支持

* **B3 传播**：只读写 W3C trace context 与 W3C baggage。
* **OTLP over gRPC**：exporter 是 OTLP over HTTP；gRPC transport 刻意没有打包，因为 grpc 插件已经给网关带来了自己的 grpc 依赖。
* **管理台开关**：目前只能用 `shenyu.tracing.enabled` 开关，还不支持在管理台开启/关闭。
* **AI proxy 的追踪**：AI proxy 使用自己的 web client，trace 上下文不会被注入到它发出的请求，其上游调用不会延续网关的 trace。
* **非 HTTP 协议的出站传播**：`TraceContextPropagator` SPI 是扩展点，但目前只提供了 `http` 实现；dubbo、grpc、sofa、tars、websocket 路由尚未传播，自己发请求的协议插件同样不在覆盖范围内。
* **按路由追踪**：插件追踪网关的所有请求，没有为部分路由开启追踪的规则或选择器。

# 12. 常见问题

| 现象                                            | 排查方向                                                                                                       |
|:------------------------------------------------|:---------------------------------------------------------------------------------------------------------------|
| 后端没有任何 span                               | `shenyu.tracing.enabled`、starter 是否在 classpath、`otlp.endpoint` 是否配置。启动日志会报告真正使用的采样器与端点。 |
| span 比请求晚几秒才到                          | 正常现象，SDK 是批量导出的                                                                                      |
| 客户端采样了，但没有导出                        | 看采样器；`always_off` 与 `ratio=0` 都会丢弃请求。启动日志会报告真正构建出的采样器                                |
| 上游没有收到 `traceparent`                      | 追踪未开启、`createSpan=false` 且没有 agent、或者该路由不发 HTTP 请求（AI proxy、dubbo 等）                       |
| 上游 `traceparent` 延续的是客户端 span          | 追踪未开启：客户端 header 原样透传，插件不会改写。开启后 parent 永远是网关 span                                  |
| 上游的 parent 是 agent 的 span                  | 见[第 10 节](#10-与-java-agent-共存)                                                                            |
| `4xx` 响应不是 `ERROR` span                     | 设计如此，客户端错误不算网关的失败                                                                              |
| 访问日志里没有 trace id                         | 需要配置部署里的 logging 插件，且该请求确实带 trace                                                             |

---
title: 链路追踪接入
keywords: ["Tracing"]
description: Tracing access
---

此篇文章是介绍如何使用 `Apache ShenYu Agent`中的tracing功能。

## 目录结构。

```text
.
├── conf
│   ├── logback.xml
│   ├── shenyu-agent.yaml
│   └── tracing-point.yaml
├── plugins
│   ├── shenyu-agent-plugin-tracing-common-${latest.release.version}.jar
│   ├── shenyu-agent-plugin-tracing-jaeger-${latest.release.version}-SNAPSHOT.jar
│   ├── shenyu-agent-plugin-tracing-opentelemetry-${latest.release.version}-SNAPSHOT.jar
│   └── shenyu-agent-plugin-tracing-zipkin-${latest.release.version}-SNAPSHOT.jar
└── shenyu-agent.jar
```

## 编辑配置文件(shenyu-agent.yaml)

```yaml
appName: shenyu-agent
supports:
  tracing:
    - jaeger
    - opentelemetry
    - zipkin

plugins:
  tracing:
    jaeger:
      host: "localhost"
      port: 5775
      props:
        SERVICE_NAME: "shenyu-agent"
        JAEGER_SAMPLER_TYPE: "const"
        JAEGER_SAMPLER_PARAM: "1"
    zipkin:
      host: 
      port: 
      props:
    opentelemetry:
      props:
        otel.traces.exporter: jaeger #zipkin #otlp
        otel.resource.attributes: "service.name=shenyu-agent"
        otel.exporter.jaeger.endpoint: "http://localhost:14250/api/traces"
```

- 在 supports 中选择要使用的插件,如果不需要则去除
- 在 plugins 中配置插件的参数，其中各插件props参数的具体使用见下面几个表格：

##### jaeger

| 名称                 |  类型  | 默认值       | 说明                     |
| :------------------- | :----: | :----------- | :----------------------- |
| SERVICE_NAME         | String | shenyu-agent | 在traces系统中显示的名称 |
| JAEGER_SAMPLER_TYPE  | String | const        | Jaeger 采样率类型        |
| JAEGER_SAMPLER_PARAM | String | 1            | Jaeger 采样率参数        |

##### opentelemetry

| 名称                     |  类型  | 默认值                    | 说明                                   |
| :----------------------- | :----: | :------------------------ | :------------------------------------- |
| otel.traces.exporter     | String | jaeger                    | traces导出器类型，若不填默认是otlp     |
| otel.resource.attributes | String | service.name=shenyu-agent | otel资源属性，若填写多个，可用逗号分隔 |

opentelemetry 插件使用的sdk基于 `opentelemetry-sdk-extension-autoconfigure` 初始化，更多使用请参考 [OpenTelemetry SDK自动配置说明](https://github.com/open-telemetry/opentelemetry-java/tree/v1.9.1/sdk-extensions/autoconfigure#opentelemetry-sdk-autoconfigure)

##### Zipkin
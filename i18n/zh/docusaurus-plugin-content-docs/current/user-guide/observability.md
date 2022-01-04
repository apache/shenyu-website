---
title: 可观测性接入
keywords: ["Observability"]
description: Observability access
---

此篇文章是介绍如何将 `Apache ShenYu` 网关接入可观测性系统。

`Apache ShenYu` 利用 `java agent` 和 `字节码增强` 技术实现了无痕埋点，使得用户无需引入依赖即可接入第三方可观测性系统，获取 Traces、Metrics 和 Logging 。

## 下载并编译代码

- 下载代码

```shell
> git clone https://github.com/apache/incubator-shenyu.git
```

- 使用Maven编译代码

```shell
> cd incubator-shenyu
> mvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests
```

编译成功后，在 `~/shenyu/shenyu-dist/shenyu-agent-dist/target/shenyu-agent` 目录下，可以看见 `shenyu-agent` 模块编译后的jar包和相关配置文件。

```text
.
├── conf
│   ├── logback.xml
│   ├── shenyu-agent.yaml
│   └── tracing-point.yaml
├── plugins
│   ├── shenyu-agent-plugin-tracing-common-2.4.2-SNAPSHOT.jar
│   ├── shenyu-agent-plugin-tracing-jaeger-2.4.2-SNAPSHOT.jar
│   ├── shenyu-agent-plugin-tracing-opentelemetry-2.4.2-SNAPSHOT.jar
│   └── shenyu-agent-plugin-tracing-zipkin-2.4.2-SNAPSHOT.jar
└── shenyu-agent.jar
```

## 编辑配置文件

```yaml
appName: shenyu-agent
supports:
  tracing:
    - jaeger
#    - opentelemetry
  metrics:
    - 
  logging:
    - 
  
plugins:
  tracing:
    jaeger:
      host: "localhost"
      port: 5775
      props:
        SERVICE_NAME: "shenyu-agent"
        JAEGER_SAMPLER_TYPE: "const"
        JAEGER_SAMPLER_PARAM: "1"
    opentelemetry:
      props:
        otel.traces.exporter: jaeger #zipkin #otlp
        otel.resource.attributes: "service.name=shenyu-agent"
        otel.exporter.jaeger.endpoint: "http://localhost:14250/api/traces"
  metrics:
    prometheus:
      host: "localhost"
      port: 8081
      props:
  logging:
    elasticSearch:
      host: "localhost"
      port: 8082
      props:
    kafka:
      host: "localhost"
      port: 8082
      props:
```

- 在 supports 中选择要使用的插件
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

## 使用

在启动 `Apache ShenYu` 网关的启动脚本中，最后运行jar包时加上-javaagent参数即可，即：

```shell
nohup java ${JAVA_OPTS}\
-javaagent:${SHENYU_AGENT_PATH}/shenyu-agent.jar\
-classpath ${CLASS_PATH} ${MAIN_CLASS} >> ${LOG_FILES} 2>&1 &
```

其中 `${SHENYU_AGENT_PATH}` 为 `shenyu-agent` 目录的路径

> 开发者可将-javaagent参数添加到IDE启动配置的JVM参数中

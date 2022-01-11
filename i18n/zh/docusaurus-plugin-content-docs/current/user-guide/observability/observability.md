---
title: 可观测性
keywords: ["Observability"]
description: Observability
---

此篇文章是介绍 `Apache ShenYu Agent` 模块。

## Java agent

`Apache ShenYu` 利用 `java agent` 和 `字节码增强` 技术实现了无痕埋点，使得用户无需引入依赖即可接入第三方可观测性系统，获取 Traces、Metrics 和 Logging 。

## Tracing

链路跟踪，通过探针收集调用链数据，第三方系统（Jaeger，Zipkin）来拉取数据后展示。

## Metrics

系统统计指标，通过探针收集，写入prometheus等第三方时序数据库，然后展示。

## Logging

将网关日志信息，写入elasticSearch（或者发送到消息中间件），然后展示。

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
│   ├── shenyu-agent-plugin-xxxxx.jar
└── shenyu-agent.jar
```

## shenyu-agent.yaml 数据结构

```yaml
appName: shenyu-agent
supports:
  tracing:
    - pluginName
  metrics:
    - pluginName
  logging:
    - pluginName
  
plugins:
  tracing:
    pluginName:
      host: 
      port:
      props:
  metrics:
    pluginName:
      host: 
      port:
      props:
  logging:
    pluginName:
      host: 
      port:
      props:
```

- 在 supports 中选择要使用的插件
- 在 plugins 中配置插件的参数，其中各插件props参数的具体使用见下面几个表格：


## 使用

部署请参考 [部署shenyu-agent](../../deployment/deployment-agent.md)

> 开发者可将-javaagent参数添加到IDE启动配置的JVM参数中

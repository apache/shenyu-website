---
title: Observability
keywords: ["Observability"]
description: Observability access
---

This article introduces how to connect the `Apache ShenYu` gateway to the observability system.

`Apache ShenYu` uses `java agent` and `bytecode enhancement` technology to achieve seamless embedding, so that users can access third-party observability systems without introducing dependencies, and obtain Traces, Metrics and Logging.

## Download and compile the code

- Download code

```shell
> git clone https://github.com/apache/incubator-shenyu.git
```

- Use Maven to compile the code

```shell
> cd incubator-shenyu
> mvn clean install -Dmaven.javadoc.skip=true -B -Drat.skip=true -Djacoco.skip=true -DskipITs -DskipTests
```

After the compilation is successful, you can see the compiled jar package and related configuration files of the `shenyu-agent` module in the `~/shenyu/shenyu-dist/shenyu-agent-dist/target/shenyu-agent` directory.

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

## Edit configuration file

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

- Select the plugin to be used in `supports`
- Configure the parameters of the plug-in in `plugins`. The specific usage of each plug-in props parameter is shown in the following tables:

#### jaeger

| Name                 |  Type  | Default      | Description                             |
| :------------------- | :----: | :----------- | :-------------------------------------- |
| SERVICE_NAME         | String | shenyu-agent | The name displayed in the traces system |
| JAEGER_SAMPLER_TYPE  | String | const        | Jaeger sample rate type                 |
| JAEGER_SAMPLER_PARAM | String | 1            | Jaeger sample rate parameters           |

#### opentelemetry

| Name                     |  Type  | Default                   | Description                                                  |
| :----------------------- | :----: | :------------------------ | :----------------------------------------------------------- |
| otel.traces.exporter     | String | jaeger                    | Traces exporter type, if not filled in, the default is otlp  |
| otel.resource.attributes | String | service.name=shenyu-agent | otel resource attributes, if you fill in more than one, they can be separated by commas |

The SDK used by the opentelemetry plugin is initialized based on `opentelemetry-sdk-extension-autoconfigure`. For more usage, please refer to [OpenTelemetry SDK AutoConfiguration Instructions](https://github.com/open-telemetry/opentelemetry-java/tree/v1.9.1/sdk-extensions/autoconfigure#opentelemetry-sdk-autoconfigure)

## For use

In the startup script to start the `Apache ShenYu` gateway, add the -javaagent parameter when running the jar package at the end, namely:

```shell
nohup java ${JAVA_OPTS}\
-javaagent:${SHENYU_AGENT_PATH}/shenyu-agent.jar\
-classpath ${CLASS_PATH} ${MAIN_CLASS} >> ${LOG_FILES} 2>&1 &
```

Where `${SHENYU_AGENT_PATH}` is the path of the `shenyu-agent` directory

> Developers can add the `-javaagent` parameter to the JVM parameter of the IDE startup configuration

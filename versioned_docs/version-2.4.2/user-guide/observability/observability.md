---
title: Observability
keywords: ["Observability"]
description: Observability access
---

This article introduces the `Apache ShenYu Agent` module.

## Java agent

`Apache ShenYu` uses `java agent` and `bytecode enhancement` technology to achieve seamless embedding, so that users can access third-party observability systems without introducing dependencies, and obtain Traces, Metrics and Logging.

## Tracing

Link tracking, call chain data is collected via probes and third party systems (Jaeger, Zipkin) to pull the data and then display it.

## Metrics

System statistics metrics, collected by probes, are written to third-party timing databases such as prometheus and then displayed.

## Logging

Take the shenyu gateway log information, write it to elasticSearch (or send it to the messaging middleware), and display it.

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
│   ├── shenyu-agent-plugin-xxx.jar
└── shenyu-agent.jar
```

## shenyu-agent.yaml 

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

- Select the plugin to be used in `supports`
- Configure the parameters of the plug-in in `plugins`. The specific usage of each plug-in props parameter is shown in the following tables:


## For use

For deployment, please refer to [Binary Packages Deployment](../../deployment/deployment-package.md#start-shenyu-bootstrap-with-shenyu-agent) or [Docker Deployment](../../deployment/deployment-docker.md#start-shenyu-bootstrap-with-shenyu-agent)

> Developers can add the `-javaagent` parameter to the JVM parameter of the IDE startup configuration

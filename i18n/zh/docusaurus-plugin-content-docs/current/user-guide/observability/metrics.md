---
title: 指标 
keywords: ["Metrics"]
description: Metrics access
---

此篇文章是介绍如何使用 `Apache ShenYu Agent`中的metrics功能。

## 目录结构

```text
.
├── conf
│   ├── logback.xml
│   ├── shenyu-agent.yaml
│   ├── metrics-point.yaml
|   └── metrics-meta.yaml
├── plugins
│   ├── shenyu-agent-plugin-metrics-api-${latest.release.version}.jar
│   ├── shenyu-agent-plugin-metrics-common-${latest.release.version}.jar
│   └── shenyu-agent-plugin-metrics-prometheus-${latest.release.version}.jar
└── shenyu-agent.jar
```

## 配置文件

配置文件 `shenyu-agent.yaml` 位于 `shenyu-agent-dist` 模块中：

```yaml
appName: shenyu-agent
supports:
  metrics:
    - prometheus

plugins:
  metrics:
    prometheus:
      host: "localhost"
      port: 8081
      props:
        jvm_enabled: false
        jmx_config:
```

- 在 supports 中选择要使用的插件，如果不需要则去除。
- 在 plugins 中配置插件的参数，其中各插件props参数的具体使用见下面几个表格：


| 名称              |   类型   | 默认值     | 说明                                                                         |
|:----------------|:------:|:--------|:---------------------------------------------------------------------------|
| jvm_enabled     | String | false   | 是否打开 jvm 监控                                                                |
| jmx_config      |  yaml  |         | jmc 配置，采用 yaml 的格式，具体看 {@link io.prometheus.jmx.JmxCollector#loadConfig()} |

## 指标

### shenyu 自定义指标

|               name                | type      | labels             |           help            |
|:---------------------------------:|:---------:|:------------------:|:-------------------------:|
|       shenyu_request_total        | counter   |                    |       ShenYu 请求的总量        |
|    shenyu_request_throw_total     | counter   |                    |       ShenYu 发生异常总量       |
|     shenyu_http_request_total     | counter   | {path,method}      |     ShenYu http 插件的总量     |
|    shenyu_dubbo_request_total     | counter   | {path}             |    ShenYu dubbo 插件的总量     |
|     shenyu_grpc_request_total     | counter   | {path}             |     ShenYu grpc 插件的总量     |
|    shenyu_motan_request_total     | counter   | {path}             |    ShenYu motan 插件的总量     |
|     shenyu_sofa_request_total     | counter   | {path}             |     ShenYu sofa 插件的总量     |
|     shenyu_tars_request_total     | counter   | {path}             |     ShenYu tars 插件的总量     |
| shenyu_spring_cloud_request_total | counter   | {path}             | ShenYu spring cloud 插件的总量 |
|      shenyu_request_undone        | gauge     |                    |     ShenYu 请求还未完成的数量      |
|   shenyu_execute_latency_millis   | histogram | {path,le}          |      ShenYu 执行耗时统计图       |

### jmx 指标

| name                            | type    | labals | help                                                           |
|:-------------------------------:|:-------:|:------:|:--------------------------------------------------------------:|
| jmx_config_reload_success_total | counter |        | Number of times configuration have successfully been reloaded. |
| jmx_config_reload_failure_total | counter |        | Number of times configuration have failed to be reloaded.      |
| jmx_scrape_duration_seconds     | gauge   |        | Time this JMX scrape took, in seconds.                         |
| jmx_scrape_error                | gauge   |        | Non-zero if this scrape failed.                                |
| jmx_scrape_cached_beans         | gauge   |        | Number of beans with their matching rule cached                |
| jmx_scrape_duration_seconds     | gauge   |        | Time this JMX scrape took, in seconds.                         |
| jmx_scrape_error                | gauge   |        | Non-zero if this scrape failed.                                |
| jmx_scrape_cached_beans         | gauge   |        | Number of beans with their matching rule cached                |

### jvm 指标

#### StandardExports

| name                          | type    | labels | help                                                   |
|:-----------------------------:|:-------:|:------:|:------------------------------------------------------:|
| process_cpu_seconds_total     | counter |        | Total user and system CPU time spent in seconds.       |
| process_start_time_seconds    | gauge   |        | Start time of the process since unix epoch in seconds. |
| process_open_fds              | gauge   |        | Number of open file descriptors.                       |
| process_max_fds               | gauge   |        | Maximum number of open file descriptors.               |
| process_virtual_memory_bytes  | gauge   |        | Virtual memory size in bytes.                          |
| process_resident_memory_bytes | gauge   |        | Resident memory size in bytes.                         |

#### MemoryPoolsExports

| name                                       | type  | labels                 | help                                                              |
|:------------------------------------------:|:-----:|:----------------------:|:-----------------------------------------------------------------:|
| jvm_memory_objects_pending_finalization    | gauge | {area="heap\|nonheap"} | The number of objects waiting in the finalizer queue.             |
| jvm_memory_bytes_used                      | gauge | {area="heap\|nonheap"} | Used bytes of a given JVM memory area.                            |
| jvm_memory_bytes_committed                 | gauge | {area="heap\|nonheap"} | Committed (bytes) of a given JVM memory area.                     |
| jvm_memory_bytes_max                       | gauge | {area="heap\|nonheap"} | Max (bytes) of a given JVM memory area.                           |
| jvm_memory_bytes_init                      | gauge | {area="heap\|nonheap"} | Initial bytes of a given JVM memory area.                         |
| jvm_memory_pool_bytes_used                 | gauge | {pool}                 | Used bytes of a given JVM memory pool.                            |
| jvm_memory_pool_bytes_committed            | gauge | {pool}                 | Committed bytes of a given JVM memory pool.                       |
| jvm_memory_pool_bytes_max                  | gauge | {pool}                 | Max bytes of a given JVM memory pool.                             |
| jvm_memory_pool_bytes_init                 | gauge | {pool}                 | Initial bytes of a given JVM memory pool.                         |
| jvm_memory_pool_collection_used_bytes      | gauge | {pool}                 | Used bytes after last collection of a given JVM memory pool.      |
| jvm_memory_pool_collection_committed_bytes | gauge | {pool}                 | Committed after last collection bytes of a given JVM memory pool. |
| jvm_memory_pool_collection_max_bytes       | gauge | {pool}                 | Max bytes after last collection of a given JVM memory pool.       |
| jvm_memory_pool_collection_init_bytes      | gauge | {pool}                 | Initial after last collection bytes of a given JVM memory pool.   |

#### MemoryAllocationExports

| name                                  | type    | labels | help                                                                                       |
|:-------------------------------------:|:-------:|:------:|:------------------------------------------------------------------------------------------:|
| jvm_memory_pool_allocated_bytes_total | counter | {pool} | Total bytes allocated in a given JVM memory pool. Only updated after GC, not continuously. |
|                                       |         |        |                                                                                            |
|                                       |         |        |                                                                                            |

#### BufferPoolsExports

| name                           | type  | labels | help                                       |
|:------------------------------:|:-----:|:------:|:------------------------------------------:|
| jvm_buffer_pool_used_bytes     | gauge | {pool} | Used bytes of a given JVM buffer pool.     |
| jvm_buffer_pool_capacity_bytes | gauge | {pool} | Bytes capacity of a given JVM buffer pool. |
| jvm_buffer_pool_used_buffers   | gauge | {pool} | Used buffers of a given JVM buffer pool.   |

#### GarbageCollectorExports

| name                      | type    | labels | help                                                    |
|:-------------------------:|:-------:|:------:|:-------------------------------------------------------:|
| jvm_gc_collection_seconds | summary | {gc}   | Time spent in a given JVM garbage collector in seconds. |

#### ThreadExports

| name                           | type    | labels  | help                                                                                                   |
|:------------------------------:|:-------:|:-------:|:------------------------------------------------------------------------------------------------------:|
| jvm_threads_current            | gauge   |         | Current thread count of a JVM                                                                          |
| jvm_threads_daemon             | gauge   |         | Daemon thread count of a JVM                                                                           |
| jvm_threads_peak               | gauge   |         | Peak thread count of a JVM                                                                             |
| jvm_threads_started_total      | counter |         | Started thread count of a JVM                                                                          |
| jvm_threads_deadlocked         | gauge   |         | Cycles of JVM-threads that are in deadlock waiting to acquire object monitors or ownable synchronizers |
| jvm_threads_deadlocked_monitor | gauge   |         | Cycles of JVM-threads that are in deadlock waiting to acquire object monitors                          |
| jvm_threads_state              | gauge   | {state} | Current count of threads by state                                                                      |

#### ClassLoadingExports

| name                       | type    | labels | help                                                                                    |
|:--------------------------:|:-------:|:------:|:---------------------------------------------------------------------------------------:|
| jvm_classes_loaded         | gauge   |        | The number of classes that are currently loaded in the JVM                              |
| jvm_classes_loaded_total   | counter |        | The total number of classes that have been loaded since the JVM has started execution   |
| jvm_classes_unloaded_total | counter |        | The total number of classes that have been unloaded since the JVM has started execution |

#### VersionInfoExports

| name | type | labels                                                                            | help            |
|:----:|:----:|:---------------------------------------------------------------------------------:|:---------------:|
| jvm  | info | {version(java.runtime.version),vendor(java.vm.vendor),runtime(java.runtime.name)} | VM version info |

## 测试

- 启动项目

  根据 shenyu-agent.yaml 中的配置信息打开浏览器
  例如: http://localhost:8081/metrics

  ![](/img/shenyu/agent/shenyu-agent-plugin-metrics-prometheus.png)


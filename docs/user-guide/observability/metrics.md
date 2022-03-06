---
title: Metrics 
keywords: ["Metrics"]
description: Metrics access
---

This article introduces how to use the `Apache ShenYu Agent Tracing`.

`Apache ShenYu` uses `java agent` and `bytecode enhancement` technology to achieve seamless embedding, so that users can access third-party observability systems without introducing dependencies, and obtain Traces, Metrics and Logging.

## Catalog Structure

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

## Edit shenyu-agent.yaml

the `shenyu-agent.yaml` location in `shenyu-agent-dist`：

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

- Select the plugin to be used in `supports`
- Configure the parameters of the plug-in in `plugins`. The specific usage of each plug-in props parameter is shown in the following tables:


| 名称              |   类型   | 默认值     | 说明                                                                                             |
|:----------------|:------:|:--------|:-----------------------------------------------------------------------------------------------|
| jvm_enabled     | String | false   | open jvm monitor                                                                               |
| jmx_config      |  yaml  |         | jmc config，use yaml format，can look {@link io.prometheus.jmx.JmxCollector#loadConfig()} method |

## metrics

### shenyu gateway custom metrics

| name                              | type      | labels             | help                                                  |
|:---------------------------------:|:---------:|:------------------:|:-----------------------------------------------------:|
| shenyu_request_total 1            | counter   |                    | ShenYu gateway request total                          |
| shenyu_request_throw_total 1      | counter   |                    | ShenYu gateway request total when an exception occurs |
| shenyu_http_request_total 1       | counter   | {path,method}      | ShenYu gateway request total of http                  |
| shenyu_dubbo_request_total 1      | counter   | {path}             | ShenYu gateway request total of dubbo                 |
| shenyu_grpc_request_total         | counter   | {path}             | ShenYu gateway request total of grpc                  |
| shenyu_motan_request_total        | counter   | {path}             | ShenYu gateway request total of motan                 |
| shenyu_sofa_request_total         | counter   | {path}             | ShenYu gateway request total of sofa                  |
| shenyu_tars_request_total         | counter   | {path}             | ShenYu gateway request total of tars                  |
| shenyu_spring_cloud_request_total | counter   | {path}             | ShenYu gateway request total of spring cloud          |
| shenyu_http_server_error_total    | counter   | {path,method,code} | ShenYu gateway request total about httpstatus in 5xx  |
| shenyu_http_cliend_error_total    | counter   | {path,method,code} | ShenYu gateway request total about httpstatus in 4xx  |
| shenyu_request_undone 1           | gauge     |                    | ShenYu gateway request is not completed               |
| shenyu_execute_latency_millis 1   | histogram | {path,le}          | ShenYu gateway execute time interval                  |
| shenyu_request_object_size        | gauge     | {path}             | ShenYu gateway request object size                    |
| shenyu_response_object_size       | gauge     | {path}             | ShenYu gateway response object size                   |

### jmx metrics

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

### jvm metrics

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


## test

- start shenyu-bootstrap

  According to shenyu-agent.yaml and open browser.
  input url, for example: http://localhost:8081/metrics

  ![](/img/shenyu/agent/shenyu-agent-plugin-metrics-prometheus.png)


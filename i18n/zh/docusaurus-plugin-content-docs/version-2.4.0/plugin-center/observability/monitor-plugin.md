---
title: Monitor插件
keywords: ["monitor"]
description: monitor插件
---

## 说明

* `monitor`插件是网关用来监控自身运行状态（`JVM`相关），请求的响应迟延，`QPS`、`TPS`等相关`metrics`。

## 技术方案

* 流程图
  ![](/img/shenyu/plugin/monitor/shenyu-metrics.png)

* 异步或者同步的方式，在 `Apache ShenYu` 网关里面进行 `metrics` 埋点。

* `prometheus` 服务端通过 `http` 请求来拉取  `metrics`，再使用 `Grafana ` 展示。

## 插件设置

* 在 `shenyu-admin`--> 基础配置 --> 插件管理-> `monitor` ，设置为开启。

* 在 `monitor` 插件中新增以下配置：

```yaml
{"metricsName":"prometheus","host":"localhost","port":"9190","async":"true"}

# port : 为暴露给 prometheus服务来拉取的端口
# host : 不填写则为 Apache ShenYu 网关的host.
# async :"true" 为异步埋点， false 为同步埋点
```

* 如果用户不使用，则在 `shenyu-admin` 后台把此插件停用。

<img src="/img/shenyu/plugin/monitor/monitor_open.png" width="70%" height="60%" />


## 插件使用

* 在网关的 `pom.xml` 文件中添加 `monitor` 的依赖。

```xml
        <!-- apache shenyu monitor plugin starter-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-monitor</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- apache shenyu monitor plugin end-->
```
* 选择器和规则配置，请参考: [选择器和规则管理](../selector-and-rule)。
* 只有当匹配的`url`，才会进行`url`请求埋点。

## metrics信息

* 所有的`JVM`，线程，内存，等相关信息都会埋点，可以在 `Grafana` 面板中，新增一个 `JVM` 模块，则会完全展示 具体请看：https://github.com/prometheus/jmx_exporter

* 另外还有如下自定义的 `metrics`

| 名称                      | 类型                  |标签名称       | 说明                  |
|:------------------------ |:--------------------- |:-------------|:-------------------- |
|request_total             |Counter                | 无           |收集ShenYu网关所有的请求 |
|http_request_total        |Counter                 | path,type    |收集monitor插件匹配的请求|

## 收集 metrics

用户需部署`Prometheus` 服务来采集

* 选择对应环境的 [下载地址](https://prometheus.io/download/)安装
* 修改配置文件：`prometheus.yml`

 ```yaml
 scrape_configs:
   # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
   - job_name: 'prometheus'
     # metrics_path defaults to '/metrics'
     # scheme defaults to 'http'.
     static_configs:
     - targets: ['localhost:9190']
 ```
**注：** `job_name`跟`monitor`插件配置的`metricsName`相对应

* 配置完成之后 `window` 下可以直接双击 `prometheus.exe` 启动即可，默认启动端口为 `9090` ，可通过http://localhost:9090/ 验证是否成功

## 面板展示

推荐使用 `Grafana`，用户可以自定义查询来个性化显示面板盘。

下面介绍 `Grafana` 部署（`windows`版）

* 安装 `Grafana`

[下载地址](https://dl.grafana.com/oss/release/grafana-7.4.2.windows-amd64.zip) 解压进入 `bin` 目录然后双击 `grafana-server.exe` 运行 访问 `http://localhost:3000/?orgId=1` admin/admin 验证是否成功

* 配置 `Prometheus` 数据源

![](/img/shenyu/monitor/prometheus-datasource.png)

* 配置 `JVM` 面板

点击`Create` - `Import`，输入 `dashboards` 的 `id`（推荐`8563`）

![](/img/shenyu/monitor/jvm-import.png)

最终`JVM`监控面板效果如下：

![](/img/shenyu/monitor/jvm.png)

* 配置自定义metric面板`request_total`、`http_request_total`

点击 `Create` - `Import` 输入`dashboards` 的 [面板json配置](https://shenyu.apache.org/img/shenyu/monitor/request_metric_dashboard.json)

最终自定义 `Http` 请求监控面板效果如下：

![](/img/shenyu/monitor/request-metric.png)



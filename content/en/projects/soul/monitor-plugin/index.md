---
title: plugin-monitor
keywords: monitor
description: monitor plugin
---

## Explanation

* monitor plugin is used to monitor its own running status(JVM-related) by gateway, include request response delay, QPS, TPS, and other related metrics.

## Technical Solutions

* Flow Diagram 
    ![](https://yu199195.github.io/images/soul/soul-metrics.png)

* Make even tracking in soul gateway by asynchronous or synchronous mode. 

* The `prometheus` server pulls metrics' through http request, and then displays it by `Grafana`.

## Plugin Setting

* In `soul-admin`--> plugin management-> monitor, set to enable.

* Add the following configuration in the monitor plugin.

```yaml
{"metricsName":"prometheus","host":"localhost","port":"9191","async":"true"}

# port : Pulled ports for exposing to prometheus service.
# host : If not filled in, it is the host of soul Gateway.
# async :"true" is asynchronous event tracking， false is synchronous event tracking.
```

* If the user don't use, please disable the plugin in the backgroud.

## Plugin Setting

* Introduce `monitor` dependency in the pom.xml file of the gateway.

```xml
  <!-- soul monitor plugin start-->
  <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-monitor</artifactId>
      <version>${last.version}</version>
  </dependency>
  <!-- soul monitor plugin end-->
``` 
* Selectors and rules, please refer to: [selector](docs/en-us/soul/selector.md)。
     
   * Only when the url is matched, the url will request event tracking.

## metrics Detail

* All JVM，thread，memory，and other related infomation will be made event tracking，you can add a JVM module in the Granfana' panel, and it will be fully displayed, please refer to： https://github.com/prometheus/jmx_exporter

* There are also the following custom `metrics` 

| Name                      |type                  |target       | description                  |
|:------------------------ |:--------------------- |:-------------|:-------------------- |
|request_total             |Counter                | none           |collecting all requests of Soul Gateway |
|http_request_total        |Counter                 | path,type    |collecting all matched requests of monitor| 
 
## Collect metrics

 * Users build their own `Prometheus` service, and add the following configuration in prometheus.yml file:
 
 ```yaml
 scrape_configs:
   # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
   - job_name: 'shardingSphere-proxy'
     # metrics_path defaults to '/metrics'
     # scheme defaults to 'http'.
     static_configs:
     - targets: ['localhost:9191']
 ```
 
## Panel Presentation
 
 It is recommended to use Grafana'. Users can customize the query to personalize the display panel, and we will provide the default configuration panel later.

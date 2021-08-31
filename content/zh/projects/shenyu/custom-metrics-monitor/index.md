---
title: 自定义指标监控
keywords: Apache ShenYu
description: 自定义指标监控
---


## 说明

* 在自定义开发前，请先自定义搭建好网关环境，请参考: [自定义部署](../deployment-custom)

* 本文介绍如何对 `org.apache.shenyu.metrics.spi.MetricsBootService` 进行自定义扩展。

## 扩展实现

* 新增一个类 `${you class}`，实现 `org.apache.shenyu.metrics.spi.MetricsBootService`

```java
public class ${you class} implements MetricsBootService {
   
   	/**
     * Start metrics tracker.
     *
     * @param metricsConfig metrics config
     * @param metricsRegister the metrics register
     */
    public void start(MetricsConfig metricsConfig, MetricsRegister metricsRegister){
				//自定义监控逻辑
    }
    
    /**
     * Stop metrics tracker.
     */
    public void stop() {
      	//自定义关闭逻辑
    }
}
```

* 在项目 `resources` 目录下，新建 `META-INF/shenyu` 目录， 并且新增文件名为 : `org.apache.shenyu.metrics.spi.MetricsBootService`.
内容新增 `${you spi name}` = `${you class path}`:

```
${you spi name} = ${you class path}
```

* 在 `Admin` 后台 ---> 基础管理 ---> 插件管理 ,  找到 `Monitor` 插件，编辑插件信息，注意``metricsName要为: `${you spi name}`。

<img src="/img/shenyu/custom/custom-metrics-monitor-zh.jpg" width="40%" height="30%" />








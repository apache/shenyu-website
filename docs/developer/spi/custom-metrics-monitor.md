---
title: Custom Metrics Monitor
keywords: ["MetricsMonitor"]
description: custom Metrics Monitor
---


## Explanation

* Before custom development, please customize and build the gateway environment first, please refer to: [custom deployment](../deployment-custom)

* This article describes how to customize the extension of  `org.apache.shenyu.metrics.spi.MetricsBootService`.

## Extension

* Create a new project and introduce the following dependencies:

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-plugin-base</artifactId>
        <version>${project.version}</version>
    </dependency>
</dependencies>
```

* Create a new class `${you class}`，implements `org.apache.shenyu.metrics.spi.MetricsBootService`

```
public class ${you class} implements MetricsBootService {
   
   	/**
     * Start metrics tracker.
     *
     * @param metricsConfig metrics config
     * @param metricsRegister the metrics register
     */
    public void start(MetricsConfig metricsConfig, MetricsRegister metricsRegister){
				//your code
    }
    
    /**
     * Stop metrics tracker.
     */
    public void stop() {
      	//your code
    }
}
```

* In the project  `resources` directory，Create a new `META-INF/shenyu` directory， and the new file name is : `org.apache.shenyu.metrics.spi.MetricsBootService`.
add `${you spi name}` = `${you class path}`:

```
${you spi name} = ${you class path}
```

* Package the project and copy it to the `lib` or `ext-lib` directory of the gateway (bootstrap-bin).

* In the `Admin` service ---> BasicConfig ---> Plugin ,  Find the `Monitor` plugin,  edit config, pay attention to the `metricsName` name: `${you spi name}`.

<img src="/img/shenyu/custom/custom-metrics-monitor-en.jpg" width="40%" height="30%" />

---
title: Custom Load Balancer
keywords: ["LoadBalance"]
description: Custom Load Balance
---

* This paper describes how to customize the extension of  `org.apache.shenyu.loadbalancer.spi.LoadBalancer`.

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

* Create a new class  `CustomLoadBalancer`, extends `org.apache.shenyu.loadbalancer.spi.AbstractLoadBalancer`.

```java
public class CustomLoadBalancer extends AbstractLoadBalancer {

    @Override
    public Upstream doSelect(final List<Upstream> upstreamList, final String ip) {
        // custom load balancer
    }
}
```

* In the project's META-INF/services directory, create key-value as following in `org.apache.shenyu.loadbalancer.spi.LoadBalancer` file.

```shell script
${spi name}=${custom class path}
``` 

`${spi name}` represents the name of `spi` and `${custom class path}` represents the fully qualified name of the class. Such as:

```shell script
custom=xxx.xxx.xxx.CustomLoadBalancer
```

* Package the project and copy it to the `lib` or `ext-lib` directory of the gateway (bootstrap-bin).

* In the `Apache ShenYu` gateway management system --> BasicConfig --> Dictionary,  find the dictionary code as `LOAD_BALANCE`, add a new piece of data, pay attention to the dictionary name: `${spi name}`.

<img src="/img/shenyu/custom/custom_load_balancer_en.png" width="80%" height="70%" />

> DictionaryType: `loadBalance`;
>
> DictionaryCode: `LOAD_BALANCE`;
>
> DictionaryName: `${spi name}`, input your custom spi name;
>
> DictionaryValue: When used, the value of the drop-down box, do not repeat with the existing;
>
> DictionaryDescribe: desc your custom match strategy;
>
> Sort: to sort;

* When adding selectors or rules, you can use custom MatchType:

<img src="/img/shenyu/custom/use_custom_load_balancer_en.png" width="90%" height="80%" />

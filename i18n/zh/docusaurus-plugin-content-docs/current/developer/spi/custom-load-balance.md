---
title: 自定义负载均衡策略
description: 自定义负载均衡策略
---

本文介绍如何对 `org.apache.shenyu.loadbalancer.spi.LoadBalancer` 进行自定义扩展。

* 新建一个工程，引入如下依赖：

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.shenyu</groupId>
        <artifactId>shenyu-plugin-base</artifactId>
        <version>${project.version}</version>
    </dependency>
</dependencies>
```

* 新增一个类 `CustomLoadBalancer`，继承`org.apache.shenyu.loadbalancer.spi.AbstractLoadBalancer`。

```java
public class CustomLoadBalancer extends AbstractLoadBalancer {

    @Override
    public Upstream doSelect(final List<Upstream> upstreamList, final String ip) {
        // 自定义负载均衡实现逻辑
    }
}
```

* 在工程的META-INF/services目录创建 `org.apache.shenyu.loadbalancer.spi.LoadBalancer`文件中添加如下内容：

```shell script
${spi name}=${custom class path}
``` 

`${spi name}`表示`spi`的名称，`${custom class path}`表示该类的全限定名。比如：

```shell script
custom=xxx.xxx.xxx.CustomLoadBalancer
```

* 将工程打包，拷贝到网关 (bootstrap-bin) 的 `lib` 或 `ext-lib` 目录。

* 在`Apache ShenYu`网关管理系统 --> 基础配置 --> 字典管理， 找到字典编码为 `LOAD_BALANCE`，新增一条数据，注意字典名称要为: `${spi name}`，图中的示例是`custom`。

<img src="static/img/shenyu/241/custom_load_balancer_zh.png" width="80%" height="70%" />

> 字典类型：`loadBalance`；
>
> 字典编码：`LOAD_BALANCE`；
>
> 字典名称：`${spi name}`，填写自定义`spi`的名称；
>
> 字典值：使用时，下拉框的值，不要和现有的重复；
>
> 字典描述或备注信息：描述信息；
>
> 排序： 排序；

* 在添加选择器或规则时，就可以使用自定义的匹配方式：

<img src="static/img/shenyu/241/use_custom_load_balancer_zh.png" width="90%" height="80%" />

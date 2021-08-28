---
title: Hystrix插件
keywords: ["Hystrix"]
description: hystrix插件
---


## 说明

* `hystrix`插件是网关用来对流量进行熔断的核心实现。
* 隔离模式支持 `thread` 和 `semaphore` 。


## 插件设置

请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](../deployment-local) 启动`Apache ShenYu`后台管理系统。

* 在 基础配置 `-->`  插件管理 `-->` `hystrix`，设置为开启。 如果用户不使用，可以将其关闭。

<img src="/img/shenyu/plugin/hystrix/hystrix_open.png" width="80%" height="80%" />


## 在网关中引入 hystrix 插件

* 在网关的 `pom.xml` 文件中添加 `hystrix`的依赖。

```xml
        <!-- apache shenyu hystrix plugin start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-hystrix</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- apache shenyu hystrix plugin end-->
``` 

##  hystrix 插件配置

关于选择器和规则配置的更多说明，请参考：[选择器和规则管理](../selector-and-rule)， 这里只对部分字段进行了介绍。

####  选择器配置

用于对流量第一次筛选，不需要特殊处理字段。

<img src="/img/shenyu/plugin/hystrix/selector.png" width="80%" height="80%" />

####  规则配置

用于对流量最终筛选，有规则处理逻辑，隔离模式支持 `thread` 和 `semaphore` 。

<img src="/img/shenyu/plugin/hystrix/rule.png" width="80%" height="80%" />


* `hystrix`处理详解：

  * 跳闸最小请求数量：最小的请求量，至少要达到这个量才会触发熔断。

  * 错误百分比阀值： 这段时间内，发生异常的百分比。

  * 最大并发量： 最大的并发量。

  * 跳闸休眠时间`(ms)`：熔断以后恢复的时间。

  * 分组`Key`： 一般设置为:`contextPath` 。

  * 失败降级`URL`： 默认为 `/fallback/hystrix`。

  * 命令`Key`： 一般设置为具体的路径接口。


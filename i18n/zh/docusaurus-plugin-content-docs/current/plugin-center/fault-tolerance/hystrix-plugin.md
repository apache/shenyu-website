---
title: Hystrix插件
keywords: ["Hystrix"]
description: hystrix插件
---

# 1. 概述

## 1.1 插件名称

* Hystrix插件

## 1.2 适用场景

* 服务不稳定，使用hystrix熔断保护服务

## 1.3 插件功能

* 熔断流量
* 保护网关代理的服务
* 隔离模式支持 `thread` 和 `semaphore`

## 1.4 插件代码

* 核心模块: `shenyu-plugin-hystrix`

* 核心类: `org.apache.shenyu.plugin.hystrix.HystrixPlugin`

## 1.5 添加自哪个shenyu版本

ShenYu 2.4.0

# 2. 如何使用插件

## 2.1 插件使用流程图

![](/img/shenyu/plugin/plugin_use_zh.jpg)

## 2.2 导入pom

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

## 2.3 启用插件

在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `hystrix` 设置为开启。

## 2.4 配置插件

### 2.4.1 插件配置

* 无配置，但你应该打开hystrix插件。

### 2.4.2 选择器配置

用于对流量第一次筛选，不需要特殊处理字段。

关于选择器和规则配置的更多说明，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)， 这里只对部分字段进行了介绍。

![](/img/shenyu/plugin/hystrix/selector.png)

### 2.4.3 规则配置

用于对流量最终筛选，有规则处理逻辑，隔离模式支持 `thread` 和 `semaphore` 。

![](/img/shenyu/plugin/hystrix/rule.png)

* `hystrix`处理详解：

  * 跳闸最小请求数量：最小的请求量，至少要达到这个量才会触发熔断。

  * 错误百分比阀值： 这段时间内，发生异常的百分比。
  
  * 超时时间`(ms)`：执行超时时间。

  * 最大并发量： 最大的并发量。

  * 跳闸休眠时间`(ms)`：熔断以后恢复的时间。

  * 分组`Key`： 一般设置为:`contextPath` 。

  * 失败降级`URL`： 默认为 `/fallback/hystrix`。

  * 命令`Key`： 一般设置为具体的路径接口。


## 2.5 示例

### 2.5.1 使用hystrix熔断保护服务

#### 2.5.1.1 准备工作

- 启动 ShenYu Admin
- 启动 ShenYu Bootstrap
- 启动一个后端服务

#### 2.5.1.2 选择器配置

![](/img/shenyu/plugin/hystrix/selector.png)

#### 2.5.1.3 规则配置

* 以下图片的规则仅为测试使用，实际情况取决于特定的场景而定。

![](/img/shenyu/plugin/hystrix/hystrix-example-rule-zh.png)

* 测试案例

```java
@RestController
@RequestMapping("/test")
@ShenyuSpringMvcClient("/test/**")
public class HttpTestController {
    @PostMapping("/testHystrix")
    public ResultBean ok() {
        Random random = new Random();
        int num = random.nextInt(100);
        if (num > 20) {
            throw new RuntimeException();
        }
        return new ResultBean(200, "ok", null);
    }
}
```

#### 2.5.1.4 使用`Apache Jmeter`发送请求

![](/img/shenyu/plugin/hystrix/hystrix-send-request.png)

#### 2.5.1.5 验证结果

![](/img/shenyu/plugin/hystrix/hystrix-result.png)

# 3. 如何禁用插件

在 `shenyu-admin` --> 基础配置 --> 插件管理 --> `hystrix` 设置为关闭。

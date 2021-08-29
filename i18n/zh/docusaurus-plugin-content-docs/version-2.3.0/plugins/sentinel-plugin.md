---
sidebar_position: 7
title: Sentinel插件
keywords: ["soul"]
description: sentinel插件
---

## 说明

* sentinel插件是网关用来对流量进行限流与熔断的可选选择之一。
* sentinel为网关熔断限流提供能力。

## 插件设置

* 在 `soul-admin` -->  插件管理 --> `sentinel`，设置为开启。
* 如果用户不使用，则在 `soul-admin` 后台把此插件停用。


## 插件使用

* 在网关的 pom.xml 文件中添加 sentinel的支持。

```xml
  <!-- soul sentinel plugin start-->
  <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-sentinel</artifactId>
       <version>${last.version}</version>
  </dependency>
  <!-- soul sentinel plugin end-->
``` 

* 选择器和规则，请详细看：[选择器规则](../admin/selector-and-rule)

* Sentinel处理详解：

    * 是否开启流控(1或0) ：是否开启sentinel的流控。
    
    * 流控效果 ： 流控效果（直接拒绝 / 排队等待 / 慢启动模式），不支持按调用关系限流。
    
    * 限流阈值类型 ： 限流阈值类型，QPS 或线程数模式。
    
    * 是否开启熔断(1或0) ：是否开启sentinel熔断。
    
    * 熔断类型： 熔断策略，支持秒级 RT/秒级异常比例/分钟级异常数。
    
    * 熔断阈值: 阈值。
    
    * 熔断窗口大小: 降级的时间，单位为 s。
    
    * 熔断URI: 熔断后的降级uri。


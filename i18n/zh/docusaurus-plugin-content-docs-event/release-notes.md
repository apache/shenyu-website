---
title: 版本发布
sidebar_position: 1
keywords: ["release-notes"]
description: release-notes
---

# 2.4.1

## 新功能

- `admin`端支持`PostgreSQL`。
- 支持动态加载插件。
- 支持本地修改数据。
- 添加`Websocket`插件。
- 添加`CryptorRequest`插件。
- 添加`CryptorResponsePlugin`。
- 支持`Spring Cloud`灰度分布。
- 支持`Apache Dubbo`灰度分布。
- 实现`dubbo`的异步调用。
- 支持外部跨域配置。
- 支持`Sign`插件的自定义。

## API 更改

- 重构`shenyu`配置文件。

## 增强

- 优化`dubbo` 的异步调用。
- 添加负载均衡公共模块。
- 优化`SQL`初始化语句。
- 重构`Admin`端的`PageHelper`。
- 优化`GlobalErrorHandler`。
- 将`ShenyuPlugin`的`skip`方法接口的返回值优化为`boolean`。
- 优化注册规则
- 修改`dubbo`和`sofa`参数解析服务。
- 重构`sign`插件接口。
- 移除`websocket`过滤器。

## 重构

- 移除`lombok`依赖。
- 移除`mapstruct`依赖。
- 支持`JDK8 ~ JDK15`。
- `motan`插件添加`plugin_handle`的`SQL`语句。

## 错误修复

- 修复`jwt`插件的`JsonSyntaxException`。
- 修复`resilience4j`插件`sql`脚本。
- 修复`disruptor`。
- 修复`HealthCheckTask`死锁问题。
- 修复`client`重试连接。
- 修复`nacos`默认分组。
- 修复`maven`和`docker`问题。
- 修复`admin`返回值问题。
- 修复`LDAP`查询问题。
- 修复`IP`地址查询错误问题。
- 修复`Gson`序列化的问题。
- 修复`context path`插件问题。
- 修复`monitor`插件初始化的`bug`。
- 修复`GlobalErrorHandler`对象映射问题。
- 修复`modify response`插件排序问题。
- 修复注册问题。
- 修复`sofa`插件注册元数据和参数解析。
- 修复`motan` ,`dubbo`, `sofa`插件元数据初始化。

---
title: Sofa插件
keywords: sofa
description: sofa插件
---

## 说明

* sofa插件是将`http协议` 转换成`sofa协议` 的插件，也是网关实现sofa泛化调用的关键。
* sofa插件需要配合元数据才能实现dubbo的调用，具体请看：[元数据](../meta-data)。

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-sofa</artifactId>
    <version>${last.version}</version>
</dependency>
```

## 插件设置

* 在 `shenyu-admin` --> 插件管理-> `sofa` 设置为开启。

* 在sofa插件的配置中，配置如下：配置sofa的注册中心。
```yaml
{"protocol":"zookeeper","register":"127.0.0.1:2181"}
```
* 插件需要配合依赖 `starter` 进行使用，具体请看：[sofa用户](../sofa-rpc-proxy)。

* 选择器和规则，请详细看：[选择器规则](../selector-and-rule)。

## 元数据

* 每一个sofa接口方法，都会对应一条元数据，可以在 shenyu-admin -->元数据管理，进行查看。

* 路径：就是你http请求的路径。 

* rpc扩展参数，对应为sofa接口的一些配置，调整的话，请在这里修改，支持json格式，以下字段：

```yaml
{"loadbalance":"hash","retries":3,"timeout":-1}
```



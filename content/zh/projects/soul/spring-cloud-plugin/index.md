---
title: springcloud插件
keywords: springcloud
description: springcloud插件
---

## 说明

* 该插件是用来将`http协议` 转成` springCloud协议` 的核心。

## 引入网关 springCloud的插件支持

* 在网关的 pom.xml 文件中引入如下依赖。

```xml
  <!--soul springCloud plugin start-->
  <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-spring-boot-starter-plugin-springcloud</artifactId>
        <version>${last.version}</version>
  </dependency>

  <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-spring-boot-starter-plugin-httpclient</artifactId>
       <version>${last.version}</version>
   </dependency>
   <!--soul springCloud plugin end-->

   <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-commons</artifactId>
        <version>2.2.0.RELEASE</version>
   </dependency>
   <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
        <version>2.2.0.RELEASE</version>
   </dependency>
```

## 插件设置

* 在 `soul-admin` --> 插件管理-> springCloud，设置为开启。
* 插件需要配合依赖 `starter` 进行使用，具体请看：[springCloud用户](../spring-cloud-proxy)。
* 选择器和规则，请详细看：[选择器规则](../selector-and-rule)。

## 详解

* 应用名称：就是你根据条件匹配以后，需要调用的你的具体的应用名称。
* soul会从springCloud的注册中心上面，根据应用名称获取对应的服务真实ip地址，发起http代理调用。


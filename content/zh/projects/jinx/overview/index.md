---
title: "Jinx 介绍"
aliases: "/jinx/docs/Home"
description: "Spring-boot框架采用netty取代tomcat来做http服务"
---

Spring-boot框架采用netty取代tomcat来做http服务


#### Spring-boot用户

* 首先引起jar包

```java
<dependency>
    <groupId>com.happylife.netty</groupId>
     <artifactId>happylife-netty</artifactId>
      <version>1.0-SNAPSHOT</version>
</dependency>
```  

* 在spring-boot的Application类中加上如下代码：

```java
@Bean
public EmbeddedServletContainerFactory servletContainer(){
  NettyContainerConfig nettyContainerConfig = new NettyContainerConfig();
  NettyEmbeddedServletContainerFactory factory = new NettyEmbeddedServletContainerFactory(nettyContainerConfig);
  return factory;
}
```
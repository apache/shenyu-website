---
title: "Jinx Introduction"
aliases: "/jinx/docs/Home"
description: Spring-boot framework which use netty as httpServer instead of tomcat.
---

Spring-boot framework which use netty as httpServer instead of tomcat.

#### Spring-boot user

* import jar

```
<dependency>
    <groupId>com.happylife.netty</groupId>
     <artifactId>happylife-netty</artifactId>
      <version>1.0-SNAPSHOT</version>
</dependency>
```  

* Add the following code to the application class of spring boot:

```java
@Bean
public EmbeddedServletContainerFactory servletContainer(){
  NettyContainerConfig nettyContainerConfig = new NettyContainerConfig();
  NettyEmbeddedServletContainerFactory factory = new NettyEmbeddedServletContainerFactory(nettyContainerConfig);
  return factory;
}
```
---
title: OAuth2 Plugin
keywords: OAuth2
description: OAuth2 plugin
---

## Description

* The `OAuth2` plugin is implemented using `Webflux OAuth2`, used to support `OAuth` protocol.

## Plugin Setting

Please refer to the `deployment` document, choose a way to start `shenyu-admin`. For example, [Local Deployment](../deployment-local).

* In `shenyu-admin` BasicConfig --> plugin -> `oauth2` set to enable. If you don't want to use this function, please disable this plugin in the `shenyu-admin`.

  <img src="/img/shenyu/plugin/oauth2/oauth2_open_en.jpg" width="80%" height="80%" />

* Add configuration mode in plugin editing.

## Plugin Use

- Add support for `oauth2` to the pom file of the gateway

```xml
  <!-- apache shenyu oauth2 plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-oauth2</artifactId>
      <version>${project.version}</version>
  </dependency>
  <!-- apache shenyu oauth2 plugin end-->
  
```

- Configure the relevant configuration of `spring.security.oauth2` in the configuration file of the gateway. For detailed configuration instructions, please refer to [Spring Webflux OAuth2](https://docs.spring.io/spring-security/site/docs/current/reference/html5/#webflux-oauth2)
- Configure the selector and rule as the request address that you need `OAuth2` authorization, and release all requests by default. For more instructions on selector and rule configuration, please refer to: [Selector And Rule Config](../selector-and-rule).


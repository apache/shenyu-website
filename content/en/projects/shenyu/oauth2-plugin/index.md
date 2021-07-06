---
title: OAuth2 Plugin
keywords: oauth2
description: oauth2 plugin
---

## Explanation

* The OAuth2 plugin is implemented using Webflux OAuth2, so its configuration can refer to [Spring Webflux OAuth2](https://docs.spring.io/spring-security/site/docs/current/reference/html5/#webflux-oauth2).**Use OAuth2 plugin has two preconditions are indispensable**.
  * Ensure that the OAuth2 dependency is added to the pom of the gateway
  * Ensure that the corresponding OAuth2 configuration exists in the gateway `application.yml` configuration file

## Plugin Setting

- Enable plugin, `shenyu-admin` –> plugin management–> `oauth2` set to enable.
- If the user does not want to use this plugin, please disable this plugin in the admin background.
- Add selector and rules to intercept you want intercept request in the admin background.

## Plugin Use

- Add support for `oauth2` to the pom file of the gateway

```xml
  <!-- shenyu oauth2 plugin start-->
  <dependency>
      <groupId>org.apache.shenyu</groupId>
      <artifactId>shenyu-spring-boot-starter-plugin-oauth2</artifactId>
      <version>${last.version}</version>
  </dependency>
  <!-- shenyu oauth2 plugin end-->
  
``` 

- Configure the selector and rule as the request address that you need OAuth2 authorization, and release all requests by default.
---
title: WebSocket代理
keywords: ["WebSocket"]
description: websocket代理
---

`Apache ShenYu` 网关通过`Websocket`插件实现了对`websocket`代理的支持。


## 环境准备

请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](../deployment-local) 启动`Apache ShenYu`后台管理系统。

启动成功后，需要在基础配置`->`插件管理中，把`websocket` 插件设置为开启。

选择器和规则配置，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。

在网关的 `pom.xml` 文件中引入`websocket`插件的相关依赖：

```xml
  <!--if you use http proxy start this-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-websocket</artifactId>
  <version>${project.version}</version>
</dependency>

```

## 请求路径

使用 Apache ShenYu 代理websocket的时候，只需要使用ws协议开头，后面路径为真实Websocket路径：

```
ws://localhost:9195/xxx
```


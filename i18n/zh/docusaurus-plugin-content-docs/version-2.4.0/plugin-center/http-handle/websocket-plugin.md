---
title: WebSocket代理
keywords: ["WebSocket"]
description: websocket代理
---

`Apache ShenYu` 网关通过`Divide`插件实现了对`websocket`代理的支持。


## 环境准备

请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](../../deployment/deployment-local) 启动`Apache ShenYu`后台管理系统。

启动成功后，需要在基础配置`->`插件管理中，把`divide` 插件设置为开启。 `Divide`插件的相关使用，请参考：[Divide插件](./divide-plugin) 。


<img src="/img/shenyu/quick-start/http/http-plugin-enable.png" width="60%" height="50%" />


在网关的 `pom.xml` 文件中引入`divide`插件的相关依赖：

```xml
  <!--if you use http proxy start this-->
<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-divide</artifactId>
  <version>${project.version}</version>
</dependency>

<dependency>
  <groupId>org.apache.shenyu</groupId>
  <artifactId>shenyu-spring-boot-starter-plugin-httpclient</artifactId>
  <version>${project.version}</version>
</dependency>
```

## 请求路径

使用 Apache ShenYu 代理websocket的时候，假设其请求路径为：

```
ws://localhost:9195/?module=ws&method=/websocket&rpcType=websocket
```

参数详解：

- `localhost:9195`： 是网关启动的`ip`和端口。

- `module`（必填）：用于选择器的筛选条件。

- `method` （参数）: websocket路径，同时也用做规则匹配。

- `rpcType` ：websocket 必填，且必须为websocket 。



## 选择器和规则设置

在 `divide`插件中新增一个选择器配置：

<img src="/img/shenyu/plugin/websocket/websocket_selector.png" width="80%"/>

在条件中选择`query`类型，填写匹配字段和取值，这里分别是`module`，`ws` 。这里的字段和取值，完全可以自定义，只要能够匹配上请求就行。
在处理操作中，填写`websocket`服务的地址。

在这一条选择器下新增一条规则：

<img src="/img/shenyu/plugin/websocket/websocket_rule.png" width="80%"/>


在条件中选择`query`类型，填写匹配字段和取值，这里分别是`method`，`/websocket` 。这里的字段和取值，也可以自定义，只要能够匹配上请求就行。

通过以上的选择器和规则配置，你的请求就会被匹配上，然后再请求代理的的真实`websocket`地址：`127.0.0.1:8080/websocket`，这样 Apache ShenYu 网关就完成了`websocket`的代理。


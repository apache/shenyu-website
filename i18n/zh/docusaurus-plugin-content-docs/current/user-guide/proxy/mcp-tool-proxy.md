---
title: McpTool 服务接入
keywords: ["Mcp"]
description: McpTool 服务接入
---

本文介绍如何将 `mcpTool` 服务接入到 `Apache ShenYu` 网关。ShenYu 网关通过 `mcpServer` 插件连接 `mcpTool` 服务。

接入前，请先正确启动 `shenyu-admin`，在网关侧启用 `mcpServer` 插件，并在网关和 `mcpTool` 应用服务侧添加相关依赖。快速开始可参考 [McpServer 快速开始](../../quick-start/quick-start-mcpServer)。

客户端接入配置请参考[客户端接入配置](../property-config/register-center-access)，数据同步配置请参考[数据同步配置](../property-config/use-data-sync)。

## 网关添加 mcpServer 插件

在网关 `pom.xml` 中添加依赖：

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-mcp-server</artifactId>
    <version>${project.version}</version>
</dependency>
```

## Spring MVC McpTool 接入

示例工程可参考 [shenyu-examples-mcp](https://github.com/apache/shenyu/tree/v2.7.1/shenyu-examples/shenyu-examples-mcp)。

### Spring Boot 项目

在 `mcpTool` 服务的 `pom.xml` 中添加依赖：

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-client-mcp</artifactId>
    <version>${shenyu.version}</version>
</dependency>
```

在 `application.yaml` 中添加配置：

```yaml
shenyu:
  register:
    registerType: http
    serverLists: http://localhost:9095
    props:
      username: admin
      password: 123456
  client:
    mcp:
      props:
        contextPath: /mcp
        appName: mcp
```

### Spring 项目

在 HTTP 服务的 `pom.xml` 中添加依赖：

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-client-mcp</artifactId>
    <version>${shenyu.version}</version>
</dependency>
```

然后在 XML 配置中声明注册中心配置、客户端配置和 `McpServiceEventListener`。

## 使用注解注册工具

在 Controller 类或接口上添加 `@ShenyuMcpTool` 注解。只有带有 `@ShenyuMcpTool` 注解的接口会被识别为 `mcpTool`。

```java
@GetMapping("/findById")
@ShenyuMcpTool
public OrderDTO findById(@ShenyuMcpToolParam final String id) {
    OrderDTO dto = new OrderDTO();
    dto.setId(id);
    return dto;
}
```

当前支持 `@RequestMapping`、`@GetMapping`、`@PostMapping`、`@DeleteMapping` 和 `@PutMapping`，并且只会取第一个 path。

服务启动后，接口会自动接入网关。可以在 ShenYu Admin 的 `Plugin List -> HTTP process -> mcpServer` 中查看自动创建的 endpoints 和 tools。

## 非 Spring MVC 场景

非 Spring MVC 或其他语言服务可在 ShenYu Admin 中先找到 `mcpServer` 插件，再手动添加选择器和规则来匹配流量。选择器和规则配置请参考[选择器和规则管理](../admin-usage/selector-and-rule)。

## 客户端请求

`mcpTool` 服务接入网关后，`McpClient` 应使用选择器中配置的 `endPoint` 作为请求地址。

* 原本的 `endPoint` 域名是业务服务地址，接入后需要改为 ShenYu 网关地址。
* ShenYu 网关需要带上接入项目中配置的 `contextPath`。
* 例如 `contextPath` 为 `/mcp` 时，`endPoint` 可配置为 `http://localhost:9195/mcp/sse`。
* `mcpServer` 插件本身不负责请求转发，如需远程工具调用，请同时启用对应的代理插件。可参考 [McpServer 快速开始](../../quick-start/quick-start-mcpServer)。

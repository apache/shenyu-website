---
title: McpServer快速开始
description: McpServer快速开始
---

本文档演示如何将`McpServer`服务接入到`Apache ShenYu`网关。您可以直接在工程下找到本文档的[示例代码](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-mcp) 。

## 环境准备

请参考运维部署的内容，选择一种方式启动`shenyu-admin`。比如，通过 [本地部署](../deployment/deployment-local) 启动`Apache ShenYu`后台管理系统。

启动成功后，需要在基础配置`->`插件管理中，把`McpServer` `divide`插件设置为开启。注意：本文使用`divide`插件用于 ToolCall()，如需使用 http 以外的其他协议，请开启相关的插件，并更换相关依赖

![](/img/shenyu/quick-start/mcpServer/mcp-server-enable-zh.png)

![](/img/shenyu/quick-start/mcpServer/divide-enable-zh.png)

启动网关，如果是通过源码的方式，直接运行`shenyu-bootstrap`中的`ShenyuBootstrapApplication`。

> 注意，在启动前，请确保网关已经引入相关依赖。

引入网关对`McpServer`的支持插件，确保网关的 `pom.xml` 文件中存在如下依赖：

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

        <!--Mcp Server Plugin Start-->
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-plugin-mcp-server</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!--Mcp Server Plugin end-->
```

## 运行shenyu-examples-mcp项目

下载 [shenyu-examples-mcp](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-mcp) .

运行相应的`main`方法启动项目。

成功启动会有如下日志：

```shell
2025-11-07T22:39:35.596+08:00  INFO 4336 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8150 (http) with context path ''
2025-11-07T22:39:35.673+08:00  INFO 4336 --- [           main] o.a.shenyu.ShenyuTestMcpApplication      : Started ShenyuTestMcpApplication in 2.125 seconds (process running for 2.571)
2025-11-07T22:39:36.086+08:00  INFO 4336 --- [or_consumer_-65] o.a.s.r.client.http.utils.RegisterUtils  : login success: {"id":"1","userName":"admin","role":1,"enabled":true,"dateCreated":"2025-11-07 22:39:25","dateUpdated":"2025-11-07 22:39:25","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNzYyNjEyNzc2fQ.kSfDHEMBR99G4pUv28Bw2ZV3CcUxZTFH91Nyb7IJZxA","expiredTime":86400000} 
2025-11-07T22:39:36.153+08:00  INFO 4336 --- [or_consumer_-65] o.a.s.r.client.http.utils.RegisterUtils  : mcp client register success: {"metaDataRegisterDTO":{"appName":"/order","contextPath":"/order","path":"http://localhost:8150","pathDesc":"","rpcType":"mcp","serviceName":"","methodName":"findAll","ruleName":"findAllOrder","parameterTypes":"","enabled":true,"host":"192.168.219.1","port":-1,"pluginNames":[],"registerMetaData":false,"timeMillis":1762526375637,"addPrefixed":false,"namespaceId":"649330b6-c2d7-4edc-be8e-8a54df9eb385"},"namespaceId":"649330b6-c2d7-4edc-be8e-8a54df9eb385","mcpConfig":"{\"name\":\"findAllOrder\",\"parameters\":[],\"requestConfig\":\"{\\\"requestTemplate\\\":{\\\"url\\\":\\\"/order/findAll\\\",\\\"method\\\":\\\"Get\\\",\\\"argsPosition\\\":{},\\\"argsToJsonBody\\\":\\\"false\\\",\\\"headers\\\":[{\\\"aaa\\\":\\\"bbb\\\"}]}}\",\"description\":\"find all order\"}"} 
2025-11-07T22:39:36.153+08:00  INFO 4336 --- [or_consumer_-66] o.a.s.r.client.http.utils.RegisterUtils  : mcp client register success: {"metaDataRegisterDTO":{"appName":"/order","contextPath":"/order","path":"http://localhost:8150","pathDesc":"","rpcType":"mcp","serviceName":"","methodName":"findByName","ruleName":"findByName","parameterTypes":"java.lang.String","enabled":true,"host":"192.168.219.1","port":-1,"pluginNames":[],"registerMetaData":false,"timeMillis":1762526375655,"addPrefixed":false,"namespaceId":"649330b6-c2d7-4edc-be8e-8a54df9eb385"},"namespaceId":"649330b6-c2d7-4edc-be8e-8a54df9eb385","mcpConfig":"{\"name\":\"findByName\",\"parameters\":[{\"name\":\"name\",\"in\":\"query\",\"description\":\"name\",\"required\":false}],\"requestConfig\":\"{\\\"requestTemplate\\\":{\\\"url\\\":\\\"/order/findByName\\\",\\\"method\\\":\\\"GET\\\",\\\"argsPosition\\\":{\\\"name\\\":\\\"query\\\"},\\\"argsToJsonBody\\\":\\\"false\\\",\\\"headers\\\":[]}}\",\"description\":\"findByName\"}"} 
2025-11-07T22:39:36.153+08:00  INFO 4336 --- [or_consumer_-67] o.a.s.r.client.http.utils.RegisterUtils  : mcp client register success: {"metaDataRegisterDTO":{"appName":"/order","contextPath":"/order","path":"http://localhost:8150","pathDesc":"","rpcType":"mcp","serviceName":"","methodName":"findById","ruleName":"findOrderById","parameterTypes":"java.lang.String","enabled":true,"host":"192.168.219.1","port":-1,"pluginNames":[],"registerMetaData":false,"timeMillis":1762526375670,"addPrefixed":false,"namespaceId":"649330b6-c2d7-4edc-be8e-8a54df9eb385"},"namespaceId":"649330b6-c2d7-4edc-be8e-8a54df9eb385","mcpConfig":"{\"name\":\"findOrderById\",\"parameters\":[{\"name\":\"id\",\"in\":\"path\",\"description\":\"the id of order\",\"required\":true,\"type\":\"string\"}],\"requestConfig\":\"{\\\"requestTemplate\\\":{\\\"url\\\":\\\"/order/findById\\\",\\\"method\\\":\\\"Get\\\",\\\"argsPosition\\\":{\\\"id\\\":\\\"path\\\"},\\\"argsToJsonBody\\\":\\\"false\\\",\\\"headers\\\":[{\\\"aaa\\\":\\\"bbb\\\"}]}}\",\"description\":\"find order by id\"}"} 
```

## 测试

`shenyu-examples-mcp`项目成功启动之后会自动把加 `@ShenyuMcpTool` `@ShenyuSpringMvcClient`注解的接口方法注册到网关。


打开`插件列表 -> mcp -> McpServer` `插件列表 -> proxy -> divide`可以看到插件规则配置列表：

![](/img/shenyu/quick-start/mcpServer/mcp-server-rule-list.png)

![](/img/shenyu/quick-start/mcpServer/divide-rule-list.png)

请确保`divide` 插件，`selector -> Modify -> Discovery Config` 中有如下配置

![](/img/shenyu/quick-start/mcpServer/divide-discovery-upstream-config.png)

下面使用`自定义Agent`模拟客户端通过`mcp sse`的方式来调用`shenyu Mcp Server`服务：

创建`mcp`客户端，并在其中添加如下url。如果你使用的是市面上Agent，请在其相关配置中添加如下url

![](/img/shenyu/quick-start/mcpServer/create-mcp-client.png)

![](/img/shenyu/quick-start/mcpServer/add-url.png)

令 Agent 发起工具调用

![](/img/shenyu/quick-start/mcpServer/user-question-zh.png)

![](/img/shenyu/quick-start/mcpServer/agent-result-zh.png)

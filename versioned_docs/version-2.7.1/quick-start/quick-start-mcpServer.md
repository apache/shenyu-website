---
title: Quick start with Mcp Server
description: Quick start with Mcp Server
---

This document introduces how to quickly access the Apache ShenYu gateway using McpServer . You can get the code example of this document by clicking [here](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-mcp).

## Environment to prepare

Please refer to the deployment to select a way to start shenyu-admin. For example, start the Apache ShenYu gateway management system through [local deployment](../deployment/deployment-local) .

After successful startup, you need to open the Divide and McpServer plugin on in the BasicConfig `->` Plugin.

![](/img/shenyu/quick-start/mcpServer/mcp-server-enable-en.png)

![](/img/shenyu/quick-start/mcpServer/divide-enable-en.png)

If you are a startup gateway by means of source, can be directly run the ShenyuBootstrapApplication of shenyu-bootstrap module.

> Note: Before starting, make sure the gateway has added dependencies.

To support `McpServer`, include the following dependencies in the gateway's `pom.xml` file:

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

## Running the shenyu-examples-mcp Project

Download [shenyu-examples-mcp](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-mcp).

Execute the `org.apache.shenyu.examples.http.ShenyuTestHttpApplication` main method to start project.

The following log appears when the startup is successful:

```shell
2025-11-07T22:39:35.596+08:00  INFO 4336 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8150 (http) with context path ''
2025-11-07T22:39:35.673+08:00  INFO 4336 --- [           main] o.a.shenyu.ShenyuTestMcpApplication      : Started ShenyuTestMcpApplication in 2.125 seconds (process running for 2.571)
2025-11-07T22:39:36.086+08:00  INFO 4336 --- [or_consumer_-65] o.a.s.r.client.http.utils.RegisterUtils  : login success: {"id":"1","userName":"admin","role":1,"enabled":true,"dateCreated":"2025-11-07 22:39:25","dateUpdated":"2025-11-07 22:39:25","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNzYyNjEyNzc2fQ.kSfDHEMBR99G4pUv28Bw2ZV3CcUxZTFH91Nyb7IJZxA","expiredTime":86400000} 
2025-11-07T22:39:36.153+08:00  INFO 4336 --- [or_consumer_-65] o.a.s.r.client.http.utils.RegisterUtils  : mcp client register success: {"metaDataRegisterDTO":{"appName":"/order","contextPath":"/order","path":"http://localhost:8150","pathDesc":"","rpcType":"mcp","serviceName":"","methodName":"findAll","ruleName":"findAllOrder","parameterTypes":"","enabled":true,"host":"192.168.219.1","port":-1,"pluginNames":[],"registerMetaData":false,"timeMillis":1762526375637,"addPrefixed":false,"namespaceId":"649330b6-c2d7-4edc-be8e-8a54df9eb385"},"namespaceId":"649330b6-c2d7-4edc-be8e-8a54df9eb385","mcpConfig":"{\"name\":\"findAllOrder\",\"parameters\":[],\"requestConfig\":\"{\\\"requestTemplate\\\":{\\\"url\\\":\\\"/order/findAll\\\",\\\"method\\\":\\\"Get\\\",\\\"argsPosition\\\":{},\\\"argsToJsonBody\\\":\\\"false\\\",\\\"headers\\\":[{\\\"aaa\\\":\\\"bbb\\\"}]}}\",\"description\":\"find all order\"}"} 
2025-11-07T22:39:36.153+08:00  INFO 4336 --- [or_consumer_-66] o.a.s.r.client.http.utils.RegisterUtils  : mcp client register success: {"metaDataRegisterDTO":{"appName":"/order","contextPath":"/order","path":"http://localhost:8150","pathDesc":"","rpcType":"mcp","serviceName":"","methodName":"findByName","ruleName":"findByName","parameterTypes":"java.lang.String","enabled":true,"host":"192.168.219.1","port":-1,"pluginNames":[],"registerMetaData":false,"timeMillis":1762526375655,"addPrefixed":false,"namespaceId":"649330b6-c2d7-4edc-be8e-8a54df9eb385"},"namespaceId":"649330b6-c2d7-4edc-be8e-8a54df9eb385","mcpConfig":"{\"name\":\"findByName\",\"parameters\":[{\"name\":\"name\",\"in\":\"query\",\"description\":\"name\",\"required\":false}],\"requestConfig\":\"{\\\"requestTemplate\\\":{\\\"url\\\":\\\"/order/findByName\\\",\\\"method\\\":\\\"GET\\\",\\\"argsPosition\\\":{\\\"name\\\":\\\"query\\\"},\\\"argsToJsonBody\\\":\\\"false\\\",\\\"headers\\\":[]}}\",\"description\":\"findByName\"}"} 
2025-11-07T22:39:36.153+08:00  INFO 4336 --- [or_consumer_-67] o.a.s.r.client.http.utils.RegisterUtils  : mcp client register success: {"metaDataRegisterDTO":{"appName":"/order","contextPath":"/order","path":"http://localhost:8150","pathDesc":"","rpcType":"mcp","serviceName":"","methodName":"findById","ruleName":"findOrderById","parameterTypes":"java.lang.String","enabled":true,"host":"192.168.219.1","port":-1,"pluginNames":[],"registerMetaData":false,"timeMillis":1762526375670,"addPrefixed":false,"namespaceId":"649330b6-c2d7-4edc-be8e-8a54df9eb385"},"namespaceId":"649330b6-c2d7-4edc-be8e-8a54df9eb385","mcpConfig":"{\"name\":\"findOrderById\",\"parameters\":[{\"name\":\"id\",\"in\":\"path\",\"description\":\"the id of order\",\"required\":true,\"type\":\"string\"}],\"requestConfig\":\"{\\\"requestTemplate\\\":{\\\"url\\\":\\\"/order/findById\\\",\\\"method\\\":\\\"Get\\\",\\\"argsPosition\\\":{\\\"id\\\":\\\"path\\\"},\\\"argsToJsonBody\\\":\\\"false\\\",\\\"headers\\\":[{\\\"aaa\\\":\\\"bbb\\\"}]}}\",\"description\":\"find order by id\"}"} 
```

## Testing

The `shenyu-examples-http` project will automatically register interface methods annotated with `@ShenyuMcpTool` and `@ShenyuSpringMvcClient` in the Apache ShenYu gateway after successful startup.

Go to Plugin List -> mcp -> McpServer and Plugin List -> proxy -> divide to view the plugin rule configuration list:

![](/img/shenyu/quick-start/mcpServer/mcp-server-rule-list.png)

![](/img/shenyu/quick-start/mcpServer/divide-rule-list.png)

Please ensure that the `divide` plugin's `discovery upstream` contains the following configuration:

![](/img/shenyu/quick-start/mcpServer/divide-discovery-upstream-config.png)

Below, a custom Agent is used to simulate a client calling the `shenyu Mcp Server` service through `mcp sse`:

Create an `mcp` client and add the following URL in it. If you are using a commercial Agent, please add the URL in its relevant configuration.

![](/img/shenyu/quick-start/mcpServer/create-mcp-client.png)

![](/img/shenyu/quick-start/mcpServer/add-url.png)

Let the Agent initiate a tool call.

![](/img/shenyu/quick-start/mcpServer/user-question-en.png)

![](/img/shenyu/quick-start/mcpServer/agent-result-en.png)

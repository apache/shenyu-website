---
title: Sofa Plugin   
keywords: ["sofa"]
description: Sofa Plugin
---

# 1. Overview

## 1.1 Plugin name

- Sofa plugin

## 1.2 Appropriate scenario

- Protocol conversion, a plugin that converts http protocol requests into the sofa framework protocol
- Service Load Balancing.

## 1.3 Plugin functionality

- Converting http protocol requests to sofa framework protocol.

## 1.4 Plugin code

- Core Module `shenyu-plugin-sofa`
- Core Class `org.apache.shenyu.plugin.sofa.SofaPlugin`

## 1.5 Added since which shenyu version

- 2.3.0

# 2. How to use plugin

## 2.1 Plugin-use procedure chart

![image-20220828222022336](/img/shenyu/plugin/sofa/procedure_chart_en.png)

## 2.2 Import pom

```xml
        <dependency>
            <groupId>com.alipay.sofa</groupId>
            <artifactId>rpc-sofa-boot-starter</artifactId>
            <version>${rpc-sofa-boot-starter.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.shenyu</groupId>
            <artifactId>shenyu-spring-boot-starter-client-sofa</artifactId>
            <version>${project.version}</version>
            <exclusions>
                <exclusion>
                    <artifactId>guava</artifactId>
                    <groupId>com.google.guava</groupId>
                </exclusion>
            </exclusions>
        </dependency>
```

## 2.3 Configure in the client project

1. Configure the sofa configuration in application.yml.

```yaml
com:
  alipay:
    sofa:
      rpc:
        registry-address: zookeeper://127.0.0.1:2181 # consul # nacos
        bolt-port: 8888
shenyu:
  register:
    registerType: http #zookeeper #etcd #nacos #consul
    serverLists: http://localhost:9095 #localhost:2181 #http://localhost:2379 #localhost:8848
    props:
      username: admin
      password: 123456
  client:
    sofa:
      props:
        contextPath: /sofa
        ipAndPort: sofa
        appName: sofa
        port: 8888
```

2. Configure the service interface exposed by the sofa service in the xml file in the resources directory.

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:sofa="http://sofastack.io/schema/sofaboot"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
            http://sofastack.io/schema/sofaboot https://sofastack.io/schema/sofaboot.xsd"
       default-autowire="byName">
		<!-- 示例 sofa 接口 -->
    <sofa:service ref="sofaSingleParamService" interface="org.apache.shenyu.examples.sofa.api.service.SofaSingleParamService">
        <sofa:binding.bolt/>
    </sofa:service>
		<!-- 示例 sofa 接口 -->
    <sofa:service ref="sofaMultiParamService" interface="org.apache.shenyu.examples.sofa.api.service.SofaMultiParamService">
        <sofa:binding.bolt/>
    </sofa:service>
</beans>
```

3. Add the `@ShenyuSofaClient` annotation to the interface.

```java
@ShenyuSofaClient("/demo")
@Service
public class SofaClientMultiParamServiceImpl implements SofaClientMultiParamService {
    
    @Override
    @ShenyuSofaClient("/findByIdsAndName")
    public SofaSimpleTypeBean findByIdsAndName(final List<Integer> ids, final String name) {
        return new SofaSimpleTypeBean(ids.toString(), "hello world shenyu sofa param findByIdsAndName ：" + name);
    }
}
```

## 2.4 Enable plugin

- In shenyu-admin --> BasicConfig --> Plugin --> `sofa` set Status enabled.

  ![image-20220829193836286](/img/shenyu/plugin/sofa/enable_sofa_en.png)


## 2.5 Config plugin

### 2.5.1 Registry Config

![image-20220829193913149](/img/shenyu/plugin/sofa/sofa_registry_en.png)

- `protocol`:  Register center protocol, currently supports zookeeper、consul、nacos.
- `register`: The service IP and PORT of the registry.
- `threadpool`：There are five types of business thread pools: `fixed`, `eager`, `cached`, `limited` and `shared`. The first 4 types correspond to the thread pools officially provided by dubbo. Let's talk about `shared`, as its name implies, `all proxy plugins` share a `shared` thread pool, the advantage of this is that it can reduce the number of thread pools, thereby reducing memory and improving resource utilization.
- `corethreads`：The number of core threads in the business thread pool.
- `threads`：The maximum number of threads in the business thread pool.
- `queues`：The length of the blocking queue of the business thread pool, 0 means `unbounded blocking queue`.

### 2.5.2 Selector config

> Flow needs to be matched by selector.

![image-20220829193948830](/img/shenyu/plugin/sofa/selector_config_en.png)

- Automatically configure the selector with the `@ShenyuSofaClient` annotation.

### 2.5.3 Rule Config

> After the traffic has been successfully matched by the selector, it will enter the rules for the final traffic matching.

![image-20220829194018202](/img/shenyu/plugin/sofa/rule_config_en.png)

- Automatically configure the selector with the `@ShenyuSofaClient` annotation.

### 2.5.4 Metadata config

> When the `sofa` application client accesses the `Apache ShenYu` gateway, it will be automatically registered, and can be viewed in the `-shenyu-admin` backend management system's basic configuration `-->` metadata management, each `sofa` interface method, will correspond to a metadata.

![image-20220829194058044](/img/shenyu/plugin/sofa/metadata_config_en.png)

- AppName: specifies the name of the application to which the metadata belongs.

- MethodName: the name of the method to call.

- Path: http request path.

- PathDescribe: the description of the path is easy to view.

- ParamsType: the parameters are separated by commas (,) in the order of interface parameter types.

- RpcExpand: other configurations of the `sofa` interface, which support the `JSON` format.

  examples：`{"loadbalance":"hash","retries":3,"timeout":-1}`

    - `loadbalance`：Load balancing policy, currently supports roundRobin, random and hash.
    - `retries`：Number of retries to call client timeout failures.
    - `timeout`：Calling the client's timeout time.

- Interface: The fully qualified class name of the `sofa` interface.

- RpcType：choose `sofa`.

## 2.6 Examples

### 2.6.1 Accessing the sofa service via Zookeeper using ShenYu

#### 2.6.1.1 Preparation

- Start `Zookeeper` service.
- Start `ShenYu Admin`.
- Start `Shenyu Bootstrap`.

#### 2.6.1.2 Plugin Config

- In shenyu-admin --> BasicConfig --> Plugin --> `sofa` set Status enabled, And adjust the registry configuration as needed.
- Adjust to the actual situation [shenyu-examples-sofa](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-sofa) application.yml configuration in the project and start it.

#### 2.6.2.6 Request service and check result

![image-20220828012420068](/img/shenyu/plugin/sofa/check_request_zh.png)

# 3. How to disable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `sofa` set Status disable.

![image-20220829194151368](/img/shenyu/plugin/sofa/close_sofa_en.png)







---
title: Sofa插件
keywords: ["sofa"]
description: sofa插件
---

# 1. 概述

## 1.1 插件名称

- sofa插件

## 1.2 适用场景

- 协议转换，将 http 协议的请求转换成 sofa 框架协议的服务处理的插件
- 服务负载均衡

## 1.3 插件功能

- 将 http 协议的请求转换成 sofa 框架协议

## 1.4 插件代码

- 核心模块`shenyu-plugin-sofa`
- 核心类`org.apache.shenyu.plugin.sofa.SofaPlugin`

## 1.5 添加自哪个shenyu版本

- 2.3.0

# 2. 如何使用插件

## 2.1 插件使用流程图

![image-20220827001111840](/img/shenyu/plugin/sofa/procedure_chart_zh.png)

## 2.2 导入pom

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

## 2.3 在客户端项目中配置

- 在 application.yml 中配置 sofa 的配置

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

- 在 resources 目录下xml 文件中配置 sofa 服务暴露的服务接口

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

## 2.4 启用插件

- 在 `shenyu-admin` --> 基础配置 --> 插件管理-> `sofa` ，设置为开启。

  ![image-20220827003924276](/img/shenyu/plugin/sofa/enable_sofa_zh.png)


## 2.5 配置插件

### 2.5.1 配置注册中心参数

![image-20220827004626827](/img/shenyu/plugin/sofa/sofa_registry_config_zh.png)

- `protocol`: 注册中心协议，目前支持 zookeeper、consul、nacos。
- `register`: 注册中心的服务 IP 和 PORT。
- `threadpool`：业务线程池类型，有`fixed`、`eager`、`cached`、`limited`和`shared`共5种类型，前面4种与dubbo官方提供的线程池一一对应，不多解释，这里单独说下`shared`，正如其名，`所有proxy插件`共用一个`shared`线程池，这样做的好处是能够减少线程池数量，进而降低内存、提高资源利用率。
- `corethreads`：业务线程池核心线程数。
- `threads`：业务线程池最大线程数。
- `queues`：业务线程池阻塞队列长度，0表示`无界阻塞队列`。

### 2.5.2 选择器配置

> 流量需要经过选择器匹配。

![image-20220827004904249](/img/shenyu/plugin/sofa/selector_config_zh.png)

- 通过`@ShenyuSofaClient`注解自动配置选择器。

### 2.5.3 规则配置

> 流量经过选择器匹配成功之后，会进入规则来进行最终的流量匹配。

![image-20220827004945226](/img/shenyu/plugin/sofa/rule_config_zh.png)

- 通过`@ShenyuSofaClient`注解自动配置选择器。

### 2.5.4 元数据配置

> 当`sofa` 应用客户端接入到`Apache ShenYu`网关时，会自动注册，可以在 `shenyu-admin`后台管理系统的基础配置 `-->` 元数据管理中查看，每一个`sofa`接口方法，都会对应一条元数据。

![image-20220827005042417](/img/shenyu/plugin/sofa/metadata_config_zh.png)

- 应用名称：该条元数据所属的应用名称。

- 方法名称：需要调用的方法名。

- 路径：`http`请路径。

- 路径描述：对该路径的说明，方便查看。

- 参数类型：按照接口的参数类型顺序。

- Rpc扩展参数：接口的扩展参数配置，`json`格式。

  示例：`{"loadbalance":"hash","retries":3,"timeout":-1}`

    - `loadbalance`：负载均衡策略，当前支持 roundRobin、random 和 hash。
    - `retries`：调用客户端超时失败的重试次数。
    - `timeout`：调用客户端的超时时间。

- 服务接口：`sofa`接口的全限定类名。
- `Rpc`类型：下拉选择 `sofa`。

## 2.6 示例

### 2.6.1 使用 ShenYu 访问 sofa 服务

#### 2.6.1.1 准备工作

- 启动 `Zookeeper` 服务注册发现中心
- 启动 `ShenYu Admin`。
- 启动 `Shenyu Bootstrap`。

#### 2.6.1.2 插件配置

- 打开插件，在 `shenyu-admin` --> 基础配置 --> 插件管理-> `sofa` ，设置为开启，并且根据需要调整注册中心配置。
- 根据实际情况调整 [shenyu-examples-sofa](https://github.com/apache/shenyu/tree/v2.5.0/shenyu-examples/shenyu-examples-sofa) 项目中 application.yml 配置并启动。

#### 2.6.2.6 请求服务并且验证结果

![image-20220828012420068](/img/shenyu/plugin/sofa/check_request_zh.png)

# 3. 如何禁用插件

- 在 shenyu-admin --> 基础配置 --> 插件管理 --> 关闭 sofa 插件状态

![image-20220827010106265](/img/shenyu/plugin/sofa/close_sofa_zh.png)

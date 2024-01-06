---
title: Discovery模块
keywords: [ "Discovery" ]
description: Discovery模块
---

# 1. 概述

## 1.1 模块名称

Discovery

## 1.2 设计

设计图
![discovery-design.png](/img/shenyu/plugin/discovery/discovery-design.png)

数据库设计
![db-design.png](/img/shenyu/plugin/discovery/db-design.png)

## 1.3 说明

Discovery 模块赋予了 ShenYu 网关一种主动感知和响应被代理服务列表变化的能力。
通过 Discovery 网关 admin 服务的主动监听，ShenYu 网关能够及时掌握被代理服务的变动情况。
这一功能的设计具有灵活性，可以根据需要在**选择器级别**或**插件级别**进行配置。
目前，已经引入了 Discovery 功能的插件包括 TCP 插件、Divide 插件、Websocket 插件和 gRPC 插件。


### 1.3.1 监听模式

LOCAL, ZOOKEEPER, NACOS, EUREKA, ETCD

- LOCAL 模式: 主要依靠手动维护 upstream 列表，并推送到网关；
- ZOOKEEPER 模式: 监听 ZooKeeper 中指定节点下临时节点的变化来获取数据；
- NACOS 模式：监听 Nacos 中指定服务名称下实例的变化来获取数据；
- EUREKA 模式： 监听 Eureka 中指定服务名称下实例的变化来获取数据；
- ETCD 模式：通过监听 etcd 中指定节点键值对的变化来获取数据。


### 1.3.2 作用范围

- 插件级别：影响整个插件，所有该插件下的选择器都将默认采用当前的监听模式；
- 选择器级别：适用于当前选择器，对于当前插件下的不同选择器，可以使用不同的监听模式。

# 2. 使用

## 2.1 插件级别配置

### 2.1.1 服务发现配置

- 在支持 Discovery 模块的插件中（当前只有 TCP 插件支持在admin控制台页面，进行插件级别 discovery 配置，其他插件见。。。）， 点击 `服务发现配置`， 在弹出的表单中，选择需要的监听模式，
  并填写服务发现名称、注册服务器URL、注册中心配置参数等：


![config-discovery-plugin-zh.png](/img/shenyu/plugin/discovery/config-discovery-plugin-zh.png)

![config-discovery-plugin-modal-zh.png](/img/shenyu/plugin/discovery/config-discovery-plugin-modal-zh.png)

### 2.1.2 在选择器中使用
- 点击 `添加选择器`，在新增选择器页面中，我们发现 `类型` 强制选择刚才配置的插件级监听模式，表示所添加的选择器也将采用相同的配置。
  此时，仅需输入需要监听的 `监听节点` ：

  ![add-selector-under-plugin-discovery-zh.png](/img/shenyu/plugin/discovery/add-selector-under-plugin-discovery-zh.png)

- 这里的 `转换处理` 是指, ShenYu 规定的 upstream 注册数据是以下 JSON 格式传输

    ```json
    {
        "url": "127.0.0.1::6379",  // upstream 的 url
        "protocol": "tcp",  // upstream 的 通信协议
        "status": 0,  // upstream 节点的状态 (0, healthy, 1 unhealthy)
        "weight": 10  // 计算负载均衡时使用
    }
    ```

- 如果您的服务别名与ShenYu定义的JSON格式不匹配，您可以在 `转换处理` 中进行别名映射。
  例如，如上图所示，如果您需要将"status"改为"healthy"，而保留其他键不变，
  进行如下操作：起一个新的别名，将"status"映射为"healthy"，
  同时保留原有JSON键的形式。

- 进行选择器剩余的属性的配置，详情见具体插件对应的文档。

## 2.2 选择器级别配置

- 在支持 Discovery 模块的插件中，点击 `添加选择器`，在 `服务发现` 标签页中，
  配置类型、监听节点、服务器URL列表、注册中心参数等字段内容，配置内容仅对当前选择器有效，每次新增选择器需要重新配置。

![add-selector-zh.png](/img/shenyu/plugin/discovery/add-selector-zh.png)

- 对于Divide、Grpc、Websocket插件，添加选择器页面有 `导入后台服务发现配置` 功能，
  指的是，如果在服务接入 ShenYu 网关时配置了 shenyu-discovery 相关的属性，可以选择导入并沿用后台的配置，如下图我们首先点击 `导入后台服务发现配置` 查看后台配置:

![config-import-zh.png](/img/shenyu/plugin/discovery/config-import-zh.png)

- 如果确认导入，点击后台配置弹出框中的 `导入` 按钮后，后台的服务发现属性将会自动填充进表单，
  此时仅需要再配置监听节点：

![after-import-zh.png](/img/shenyu/plugin/discovery/after-import-zh.png)

> __注意__：如果确认导入后台配置，后台的服务发现属性将会自动填充进表单，并沿用之前的discovery对象，
此时，在表单中修改服务发现属性将无效，依然保持后台配置。

- 若选择了 LOCAL 模式，则无需接入注册中心, 用户需要手动维护 upstream 列表。


## 3.1 不同模式下的配置

### 3.1 LOCAL模式

- LOCAL模式只支持**选择器级别**的配置。无需接入注册中心, 用户需要手动维护 upstream 列表。这里的列表是一个可编辑表格，
  点击表格每行的 `编辑` 按钮，可以对 upstream 的每个参数进行修改：

![local-selector-zh.png](/img/shenyu/plugin/discovery/local-selector-zh.png)

### 3.2 ZooKeeper/Nacos/Eureka/Etcd模式

- ZooKeeper/Nacos/Eureka/Etcd模式下，支持插件级别和选择器级别的服务发现配置。
- 针对每个模式下的注册中心属性，以zookeeper为例，用户可以在`shenyu-admin` --> 基础配置 --> 字典管理 中，搜索字典名称为“zookeeper”，对默认属性对应的字典值进行修改编辑
  （__注意__：不可修改字典类型和字典名称）。
- 这些模式下，网关会动态地从注册中心获取服务实例信息，服务实例的新增、下线、修改等，将会实时显示在 upstrea 列表中。


![zk_dict.png](/img/shenyu/plugin/tcp/zk_dict_zh.png)

# 4.配合 Shenyu-client 使用

## 4.1 概括

配合shenyu-client使用 需要依赖
使用中间件 zookeeper, nacos , etcd, eureka 模式 依赖admin 自动感知上下线
使用local模式 需要 手动维护 upstream列表

## 4.2 示例

shenyu-client 使用详情见 shenyu-client 模块

### 4.2.1 Local示例

Local模式 不需要配置注册中心

1.如果选择使用shenyu-client自动注册为Local模式并且把当前列表注册上去

![divide-local-discovery-success.png.png](/img/shenyu/plugin/discovery/divide-local-discovery-success.png)

2. 如果不使用shenyu-client 你可以自己手动配置

![config_local_selector.png](/img/shenyu/plugin/discovery/config_local_selector.png)

手动自行添加
![config_local_selector_2.png](/img/shenyu/plugin/discovery/config_local_selector_2.png)
手动配置Rule
![config_local_selector_3.png](/img/shenyu/plugin/discovery/config_local_selector_3.png)

测试连接

```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

### 4.2.2 Zookeeper示例

以 Divide为例

添加依赖

```xml

<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-discovery-zookeeper</artifactId>
    <version>${project.version}</version>
</dependency>

<dependency>
<groupId>org.apache.shenyu</groupId>
<artifactId>shenyu-spring-boot-starter-client-http</artifactId>
</dependency>
```

```yaml
shenyu:
  discovery:
    enable: true
    type: zookeeper
    serverList: ${your.zookeeper.ip}:{your.zookeeper.port}
    registerPath: /shenyu/discovery/demo_http_common
    props:
      baseSleepTimeMilliseconds: 1000
      maxRetries: 4
      maxSleepTimeMilliseconds: 5000
      connectionTimeoutMilliseconds: 60000
      sessionTimeoutMilliseconds: 8
```

启动项目 shenyu-examples-http

上述说明组册成功
![divide-zookeeper-discovery-success.png](/img/shenyu/plugin/discovery/divide-zookeeper-discovery-success.png)

![divide-zookeeper-discovery-success_2.png](/img/shenyu/plugin/discovery/divide-zookeeper-discovery-success_2.png)

测试连接

```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

### 4.2.3 Etcd示例

添加依赖

```xml

<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-discovery-etcd</artifactId>
    <version>${project.version}</version>
</dependency>

<dependency>
<groupId>org.apache.shenyu</groupId>
<artifactId>shenyu-spring-boot-starter-client-http</artifactId>
</dependency>
```

```yaml
shenyu:
  discovery:
    enable: true
    type: etcd
    serverList: http://${your.etcd.host}:${your.etcd.port}
    registerPath: shenyu_discovery_demo_http_common
    props:
      etcdTimeout: 3000
      etcdTTL: 5
```

启动shenyu-examples-http

上述说明组册成功
![divide-etcd-discovery-success.png](/img/shenyu/plugin/discovery/divide-etcd-discovery-success.png)

测试连接

```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

### 4.2.4 Eureka示例

添加依赖

```xml

<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-discovery-eureka</artifactId>
    <version>${project.version}</version>
</dependency>

<dependency>
<groupId>org.apache.shenyu</groupId>
<artifactId>shenyu-spring-boot-starter-client-http</artifactId>
</dependency>
```

```yaml
shenyu:
  discovery:
    enable: true
    type: eureka
    serverList: http://${your.eureka.host}:${your.eureka.port}/eureka
    registerPath: shenyu_discovery_demo_http_common
    props:
      eurekaClientRefreshInterval: 10
      eurekaClientRegistryFetchIntervalSeconds: 10
```

上述说明组册成功
![divide-eureka-discovery-success.png](/img/shenyu/plugin/discovery/divide-eureka-discovery-success.png)

测试连接

```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

### 4.2.4 Nacos示例

```xml

<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-discovery-nacos</artifactId>
    <version>${project.version}</version>
</dependency>

<dependency>
<groupId>org.apache.shenyu</groupId>
<artifactId>shenyu-spring-boot-starter-client-http</artifactId>
</dependency>
```

上述说明组册成功
![divide-nacos-discovery-success.png](/img/shenyu/plugin/discovery/divide-nacos-discovery-success.png)

测试连接

```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

## 4.3 修改权重和状态

status : 0 健康 , 1 不健康

weight : 权重 详情见 权重算法 shenyu-loadbalancer 模块

![change-weight-status.png](/img/shenyu/plugin/discovery/change-weight-status.png)

## 4.4 测试报告

[测试报告](https://www.yuque.com/eureca/pgotw1/hkqkk5laubspgwl3#UojLR)





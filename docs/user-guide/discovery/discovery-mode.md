---
title: Discovery
keywords: [ "Discovery" ]
description: Discovery
---

# Discovery

## 1. Overview

### 1.1 Module Name

Discovery

### 1.2 Design

- Module Design Diagram
  ![discovery-design.png](/img/shenyu/plugin/discovery/discovery-design.png)



- Database Design

![db-design.png](/img/shenyu/plugin/discovery/db-design.png)


### 1.3 Module Functionality

The Discovery module endows the ShenYu Gateway with the ability to actively perceive and respond to changes in the list of services being proxied. 
By actively listening to the admin service of the Discovery Gateway, the ShenYu Gateway can promptly track changes in the services being proxied. 
This functionality is designed to be flexible and can be configured at either the selector level or the plugin level, as needed. 
Currently, plugins that have incorporated the Discovery feature include TCP, Divide, Websocket, and gRPC plugins.


### 1.4 监听模式

LOCAL, ZOOKEEPER, NACOS, EUREKA, ETCD

- LOCAL Mode: Primarily relies on manual maintenance of the upstream list and pushing it to the gateway.
- ZOOKEEPER Mode: Monitors changes in ephemeral nodes under a specified node in ZooKeeper to obtain data.
- NACOS Mode: Listens for changes in instances under a specified service name in Nacos to obtain data.
- EUREKA Mode: Listens for changes in instances under a specified service name in Eureka to obtain data.
- ETCD Mode: Obtains data by monitoring changes in key-value pairs under specified nodes in etcd.


### 1.5 Scope of Effect

- Plugin Level: Impacts the entire plugin, 
and all selectors under that plugin will default to the current listening mode.
- Selector Level: Applies to the current selector, 
allowing different selectors under the same plugin to use different listening modes.

## 2. Usage

### 2.1 Plugin-Level Configuration

#### 2.1.1 Service Discovery Configuration

- In plugins that support the Discovery module (currently, only the TCP plugin supports plugin-level discovery 
configuration on the admin console page; other plugins can configure plugin-level discovery through shenyu-client, 
as described in the "Using Shenyu-client" section below), click on `Discovery Config`. In the popup form, 
select the desired listening mode and fill in the service discovery name, registration server URL, registry configuration parameters, etc.:


![config-discovery-plugin-zh.png](/img/shenyu/plugin/discovery/config-discovery-plugin-zh.png)

![config-discovery-plugin-modal-zh.png](/img/shenyu/plugin/discovery/config-discovery-plugin-modal-zh.png)

#### 2.1.2 Usage within Selectors
- To add a new selector, click on `Add Selector`. In the new selector page, you will notice that the `Type` field enforces the previously configured plugin-level listening mode,
indicating that the added selector will also adopt the same configuration. 
At this point, simply input the desired `Listening Node`:

  ![add-selector-under-plugin-discovery-zh.png](/img/shenyu/plugin/discovery/add-selector-under-plugin-discovery-zh.png)

- The `Handler` here refers to ShenYu's specified JSON format for transmitting upstream registration data, 
as shown below:

    ```json
    {
        "url": "127.0.0.1::6379",  // URL of the upstream
        "protocol": "tcp",  // Communication protocol of the upstream
        "status": 0,  // Status of the upstream node (0 for healthy, 1 for unhealthy)
        "weight": 10  // Used for load balancing calculations
    }
    ```

- If your service alias does not match ShenYu's defined JSON format, 
you can perform alias mapping in `Handler`.
For example, as shown in the above image, 
if you need to change `status` to "healthy" while keeping other keys unchanged, 
follow these steps: create a new alias, map `status` to `healthy`, 
and retain the original JSON keys' format.
- Configure the remaining properties for the selector according to the specific plugin's documentation.

### 2.2 Selector-Level Configuration

- In plugins that support the Discovery module, click on `Add Selecto`. 
In the `Service Discovery` tab, configure the fields such as type, 
listening node, server URL list, and registry properties. 
This configuration only applies to the current selector and must be reconfigured each time a new selector is added.

![add-selector-zh.png](/img/shenyu/plugin/discovery/add-selector-zh.png)

- For the Divide, gRPC, and Websocket plugins, 
the `Import Background Discovery Config` function on the selector creation page 
allows you to import and use the backend configuration if the service connecting to the ShenYu Gateway 
was configured with shenyu-discovery-related properties (see usage with shenyu-client). 
As shown in the following image, click `Import Background Discovery Config` to view the backend configuration:
![config-import-zh.png](/img/shenyu/plugin/discovery/config-import-zh.png)

- If you confirm the import, clicking the `Import` button in the backend configuration popup will automatically populate the form with the backend service discovery properties. 
At this point, you only need to configure the listening node:

![after-import-zh.png](/img/shenyu/plugin/discovery/after-import-zh.png)

> __Note__: If you confirm importing the backend configuration, 
the backend service discovery properties will be automatically filled in the form and will continue to use the previous discovery object. 
In this case, modifying service discovery properties in the form will be ineffective, and the backend configuration will be retained.

- If you choose the LOCAL mode, there is no need to connect to a registry, and users must manually maintain the upstream list.


## 3. 不同模式下的配置

### 3.1 local模式

- local模式只支持**选择器级别**的配置。无需接入注册中心，用户需要手动维护 upstream 列表。这里的列表是一个可编辑表格，
  点击表格每行的 `编辑` 按钮，可以对 upstream 的每个参数进行修改：

![local-selector-zh.png](/img/shenyu/plugin/discovery/local-selector-zh.png)

### 3.2 ZooKeeper/Nacos/Eureka/Etcd模式

- ZooKeeper/Nacos/Eureka/Etcd模式下，支持插件级别和选择器级别的服务发现配置。
- 针对每个模式下的注册中心属性，以zookeeper为例，用户可以在`shenyu-admin` --> 基础配置 --> 字典管理 中，搜索字典名称为“zookeeper”，对默认属性对应的字典值进行修改编辑
  （__注意__：不可修改字典类型和字典名称）。
- 这些模式下，网关会动态地从注册中心获取服务实例信息，服务实例的新增、下线、修改等，将会实时显示在 upstream 列表中。


![zk_dict.png](/img/shenyu/plugin/tcp/zk_dict_zh.png)

## 4. 配合 Shenyu-client 使用

### 4.1 介绍

- 与 shenyu-client 配合使用需要依赖对应模式的注册中心中间件：zookeeper，nacos，etcd，eureka，这些模式可以通过Shenyu Admin实现自动感知服务的上线和下线。
- 另外，如果您使用了 local 模式，则需要手动维护upstream列表。
- shenyu-client 使用详见 shenyu-client 模块。

### 4.2 Local 模式示例

#### 4.2.1 使用shenyu-client

- shenyu-client 默认为 Local模式，无需进行特殊的 discovery 配置，便可以自动把当前服务注册上去；
- 对于自动注册上来的服务，可以手动在页面的upstream列表进行添加、修改和删除：

![local-selector-zh.png](/img/shenyu/plugin/discovery/local-selector-zh.png)

#### 4.2.2 不使用shenyu-client


- 如果不使用shenyu-client，也可以手动在 `添加选择器` 的 `服务发现` 标签页上添加、修改、删除服务信息：

![add-selector-local-zh.png](/img/shenyu/plugin/discovery/add-selector-local-zh.png)

- 配置选择器其他信息：

![add-selector-basic-zh.png](/img/shenyu/plugin/discovery/add-selector-basic-zh.png)

- 配置规则：

![rule-zh.png](/img/shenyu/plugin/discovery/rule-zh.png)

- 测试连接

```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

### 4.2 Zookeeper模式示例

（以 Divide 插件为例）
- 添加依赖

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

- application.yml 中添加如下配置

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
- 启动服务 shenyu-examples-http
- 服务注册成功，在选择器页面可以看到自动注册上来的服务实例列表：

![zk-selector-zh.png](/img/shenyu/plugin/discovery/zk-selector-zh.png)

- 用户可以点击服务实例列表中的 `编辑`，对服务实例信息进行编辑（非Local模式下，URL由注册中心维护，不可手动编辑）：

![edit-zk-upstream-zh.png](/img/shenyu/plugin/discovery/edit-zk-upstream-zh.png)

- 测试连接

```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

### 4.3 Etcd示例

- 添加依赖

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

- application.yml 中添加如下配置

```yaml
shenyu:
   discovery:
      enable: true
      protocol: http://
      type: etcd
      serverList: http://${your.etcd.host}:${your.etcd.port}
      registerPath: /shenyu/test/http_common
      props:
         etcdTimeout: 3000
         etcdTTL: 5
```

- 启动服务 shenyu-examples-http，同样地，在选择器页面可以看到自动注册上来的服务实例列表，并可进行编辑：

![zk-selector-zh.png](/img/shenyu/plugin/discovery/zk-selector-zh.png)

- 测试连接

```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

### 4.4 Eureka示例

- 添加依赖

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
- application.yml 中添加如下配置（此处的 `registerPath` 可以理解为需要监听的服务的名称）

```yaml
shenyu:
   discovery:
      enable: true
      protocol: http://
      type: eureka
      serverList: http://${your.eureka.host}:${your.eureka.port}/eureka
      registerPath: shenyu_discovery_demo_http_common
      props:
         eurekaClientRefreshInterval: 10
         eurekaClientRegistryFetchIntervalSeconds: 10
```

- 启动服务 shenyu-examples-http，同样地，在选择器页面可以看到自动注册上来的服务实例列表，并可进行编辑：

![eureka-selector-zh.png](/img/shenyu/plugin/discovery/eureka-selector-zh.png)

- 测试连接

```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

### 4.5 Nacos示例

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
- application.yml 中添加如下配置（此处的 `registerPath` 同样可以理解为需要监听的服务的名称）

```yaml
shenyu:
   discovery:
      enable: true
      protocol: http://
      type: nacos
      serverList: ${your.nacos.host}:${your.nacos.port}
      registerPath: shenyu_discovery_demo_http_common
      props:
         groupName: SHENYU_GROUP
```

- 启动服务 shenyu-examples-http，同样地，在选择器页面可以看到自动注册上来的服务实例列表，并可进行编辑：

![nacos-selector-zh.png](/img/shenyu/plugin/discovery/nacos-selector-zh.png)

- 测试连接

```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

> __注意__：通过shenyu-client配置服务发现，本质上是配置插件级别的服务发现，同一种服务发现模式下，
实际上只有一个discovery对象（即：只能够配置同一套类型-服务器URL-服务发现参数），监听节点可以有多个。

> __注意__：Divide插件和Grpc插件中，可以通过在application.yml文件中配置protocol来修改协议，Websocket
插件的协议默认均为ws

![ws-selector-zh.png](/img/shenyu/plugin/discovery/ws-selector-zh.png)



## 5. 注意事项

- local 模式下，可以在服务列表页面上手动对 upstream 的所有参数进行修改；
- 非local模式下，可以对除URL、开始时间以外的参数进行手动修改；
- 手动修改服务实例的状态（status：open/close），权重（weight），仅对当前插件生效；
- 对于同一插件，后台通过shenyu-client配置discovery相关参数后，本质上是配置插件级别的服务发现，
  控制台页面上可以手动添加选择器以配置选择器级别的服务发现，但实际上只有一个discovery对象（即：只能够配置同一套类型-服务器URL-服务发现参数），监听节点可以有多个。



## 6. 测试报告

[测试报告](https://www.yuque.com/eureca/pgotw1/hkqkk5laubspgwl3#UojLR)





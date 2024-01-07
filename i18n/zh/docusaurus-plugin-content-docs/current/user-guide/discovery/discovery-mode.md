---
title: 服务发现模块
keywords: [ "Discovery" ]
description: 服务发现模块模块
---

# 服务发现模块

## 1. 概述

### 1.1 模块名称

Discovery

### 1.2 设计

- 模块设计图
![discovery-design.png](/img/shenyu/plugin/discovery/discovery-design.png)



- 数据库设计

![db-design.png](/img/shenyu/plugin/discovery/db-design.png)


### 1.3 模块功能

Discovery 模块赋予了 ShenYu 网关一种主动感知和响应被代理服务列表变化的能力。
通过 Discovery 网关 admin 服务的主动监听，ShenYu 网关能够及时掌握被代理服务的变动情况。
这一功能的设计具有灵活性，可以根据需要在**选择器级别**或**插件级别**进行配置。
目前，已经引入了 Discovery 功能的插件包括 TCP 插件、Divide 插件、Websocket 插件和 gRPC 插件。


### 1.4 监听模式

LOCAL, ZOOKEEPER, NACOS, EUREKA, ETCD

- LOCAL 模式: 主要依靠手动维护 upstream 列表，并推送到网关；
- ZOOKEEPER 模式: 监听 ZooKeeper 中指定节点下临时节点的变化来获取数据；
- NACOS 模式：监听 Nacos 中指定服务名称下实例的变化来获取数据；
- EUREKA 模式： 监听 Eureka 中指定服务名称下实例的变化来获取数据；
- ETCD 模式：通过监听 etcd 中指定节点键值对的变化来获取数据。


### 1.5 作用范围

- 插件级别：影响整个插件，所有该插件下的选择器都将默认采用当前的监听模式；
- 选择器级别：适用于当前选择器，对于当前插件下的不同选择器，可以使用不同的监听模式。

## 2. 使用

### 2.1 插件级别配置

#### 2.1.1 服务发现配置

- 在支持 Discovery 模块的插件中（当前只有 TCP 插件支持在admin控制台页面，进行插件级别 discovery 配置，其他插件可以通过 shenyu-client 进行插件级别 discovery 配置，见下文中的“配合Shenyu-client使用”）， 点击 `服务发现配置`， 在弹出的表单中，选择需要的监听模式，
  并填写服务发现名称、注册服务器URL、注册中心配置参数等：


![config-discovery-plugin-zh.png](/img/shenyu/plugin/discovery/config-discovery-plugin-zh.png)

![config-discovery-plugin-modal-zh.png](/img/shenyu/plugin/discovery/config-discovery-plugin-modal-zh.png)

#### 2.1.2 在选择器中使用

- 点击 `添加选择器`，在新增选择器页面中，我们发现 `类型` 强制选择刚才配置的插件级监听模式，表示所添加的选择器也将采用相同的配置。
  此时，仅需输入需要监听的 `监听节点` ：

  ![add-selector-under-plugin-discovery-zh.png](/img/shenyu/plugin/discovery/add-selector-under-plugin-discovery-zh.png)

- 这里的 `转换处理` 是指，ShenYu 规定的 upstream 注册数据是以下 JSON 格式传输，包括：
  - url: upstream 的 url
  - protocol: upstream 的通信协议
  - status: upstream 节点的状态 (0: healthy, 1: unhealthy)
  - weight: 权重，计算负载均衡时使用
  

  ```json
  {
      "url": "127.0.0.1::6379", 
      "protocol": "tcp",
      "status": 0,
      "weight": 10
  }
  ```

- 如果您的服务别名与ShenYu定义的JSON格式不匹配，您可以在 `转换处理` 中进行别名映射。
  例如，如上图所示，如果您需要将"status"改为"healthy"，而保留其他键不变，
  进行如下操作：起一个新的别名，将"status"映射为"healthy"，
  同时保留原有JSON键的形式。
- 进行选择器剩余的属性的配置，详情见具体插件对应的文档。

### 2.2 选择器级别配置

- 在支持 Discovery 模块的插件中，点击 `添加选择器`，在 `服务发现` 标签页中，
  配置类型、监听节点、服务器URL列表、注册中心参数等字段内容，配置内容仅对当前选择器有效，每次新增选择器需要重新配置。

![add-selector-zh.png](/img/shenyu/plugin/discovery/add-selector-zh.png)

- 对于Divide、gRPC、Websocket插件，添加选择器页面有 `导入后台服务发现配置` 功能，
  指的是，如果服务接入 ShenYu 网关时配置了 shenyu-discovery 相关的属性（见配合shenyu-client使用），可以选择导入并沿用后台的配置，如下图我们首先点击 `导入后台服务发现配置` 查看后台配置:

![config-import-zh.png](/img/shenyu/plugin/discovery/config-import-zh.png)

- 如果确认导入，点击后台配置弹出框中的 `导入` 按钮后，后台的服务发现属性将会自动填充进表单，
  此时仅需要再配置监听节点：

![after-import-zh.png](/img/shenyu/plugin/discovery/after-import-zh.png)

> **注意**：如果确认导入后台配置，后台的服务发现属性将会自动填充进表单，并沿用之前的discovery对象，
此时，在表单中修改服务发现属性将无效，依然保持后台配置。

- 若选择了 LOCAL 模式，则无需接入注册中心，用户需要手动维护 upstream 列表。


## 3. 不同模式下的配置

### 3.1 local模式

- local模式只支持**选择器级别**的配置。无需接入注册中心，用户需要手动维护 upstream 列表。这里的列表是一个可编辑表格，
  点击表格每行的 `编辑` 按钮，可以对 upstream 的每个参数进行修改：

![local-selector-zh.png](/img/shenyu/plugin/discovery/local-selector-zh.png)

### 3.2 ZooKeeper/Nacos/Eureka/Etcd模式

- ZooKeeper/Nacos/Eureka/Etcd模式下，支持插件级别和选择器级别的服务发现配置。
- 针对每个模式下的注册中心属性，以zookeeper为例，用户可以在`shenyu-admin` --> 基础配置 --> 字典管理 中，搜索字典名称为“zookeeper”，对默认属性对应的字典值进行修改编辑
  （**注意**：不可修改字典类型和字典名称）。
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
<dependencies>
  <dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-discovery-zookeeper</artifactId>
    <version>${project.version}</version>
  </dependency>

  <dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-client-http</artifactId>
  </dependency>
</dependencies>
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
<dependencies>
  <dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-discovery-etcd</artifactId>
    <version>${project.version}</version>
  </dependency>

  <dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-client-http</artifactId>
  </dependency>
</dependencies>
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

![etcd-selector-zh.png](/img/shenyu/plugin/discovery/etcd-selector-zh.png)

- 测试连接

```text
curl http://localhost:9195/http/hello

hello! I'm Shenyu-Gateway System. Welcome!% 
```

### 4.4 Eureka示例

- 添加依赖

```xml
<dependencies>
  <dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-discovery-eureka</artifactId>
    <version>${project.version}</version>
  </dependency>

  <dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-client-http</artifactId>
  </dependency>
</dependencies>
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
<dependencies>
  <dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-discovery-eureka</artifactId>
    <version>${project.version}</version>
  </dependency>

  <dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-client-http</artifactId>
  </dependency>
</dependencies>
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

> **注意**：通过shenyu-client配置服务发现，本质上是配置插件级别的服务发现，同一种服务发现模式下，
实际上只有一个discovery对象（即：只能够配置同一套类型-服务器URL-服务发现参数），监听节点可以有多个。


![ws-selector-zh.png](/img/shenyu/plugin/discovery/ws-selector-zh.png)

> **注意**：Divide插件和Grpc插件中，可以通过在application.yml文件中配置protocol来修改协议，Websocket
插件的协议默认均为ws



## 5. 注意事项

- local 模式下，可以在服务列表页面上手动对 upstream 的所有参数进行修改；
- 非local模式下，可以对除URL、开始时间以外的参数进行手动修改；
- 手动修改服务实例的状态（status：open/close），权重（weight），仅对当前插件生效；
- 对于同一插件，后台通过shenyu-client配置discovery相关参数后，本质上是配置插件级别的服务发现，
控制台页面上可以手动添加选择器以配置选择器级别的服务发现，但实际上只有一个discovery对象（即：只能够配置同一套类型-服务器URL-服务发现参数），监听节点可以有多个。



## 6. 测试报告

[测试报告](https://www.yuque.com/eureca/pgotw1/hkqkk5laubspgwl3#UojLR)





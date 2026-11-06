---
title: Dubbo插件
keywords: ["dubbo"]
description: dubbo插件
---

## 说明

* `dubbo`插件是将 `http协议` 转换成 `dubbo协议` 的插件，也是网关实现`dubbo`泛化调用的关键。
* `dubbo`插件需要配合元数据才能实现`dubbo`的调用。
* `apache dubbo` 和 `alibaba dubbo`，都是使用该一插件。

## 插件设置

* 引入相关依赖，开启插件，请参考：[Dubbo快速开始](../../quick-start/quick-start-dubbo) 。

* `Dubbo`应用客户端接入，请参考：[Dubbo服务接入](../../user-guide/proxy/dubbo-proxy.md) 。

* 选择器和规则配置，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule)。

* 自`2.4.3版本`起dubbo插件新增字段及含义：

<img src="/img/shenyu/plugin/dubbo/dubbo_plugin.png" width="80%" height="80%" />

  * `corethreads`：业务线程池核心线程数。

  * `queues`：业务线程池阻塞队列长度，0表示`无界阻塞队列`。

  * `threadpool`：业务线程池类型，有`fixed`、`eager`、`cached`、`limited`和`shared`共5种类型，前面4种与dubbo官方提供的线程池一一对应，不多解释，这里单独说下`shared`，正如其名，`所有proxy插件`共用一个`shared`线程池，这样做的好处是能够减少线程池数量，进而降低内存、提高资源利用率。

  * `threads`：业务线程池最大线程数。

## 插件详解

客户端接入`Apache ShenYu`网关后，会自动注册选择器和规则信息，关于选择器和规则配置，请参考：[选择器和规则管理](../../user-guide/admin-usage/selector-and-rule) 。

#### 选择器处理

<img src="/img/shenyu/plugin/dubbo/selector_zh_new.png" width="80%" height="80%" />

选择器处理，即`handle`字段，是网关匹配到流量以后，可以进行处理的操作。更多信息请参考插件管理中的 [插件处理管理](../../user-guide/admin-usage/plugin-handle-explanation) 。

* 处理配置详解：

  * `host`：host地址。
    
  * `ip:port`：ip+port地址。
      
  * `protocol`：协议默认值为'http'。
   
  * `group`：dubbo服务的组。
    
  * `version`：dubbo服务版本号。
    
  * `weight`：服务实例的权重。
    
  * `warmupTime`：服务预热时间。
    
  * `startupTime`：服务开启时间。
    
  * `status`：true: 服务节点可用，false: 服务节点不可用.
        
  * `gray`：灰度状态.

灰度路由

如果您想在dubbo插件中使用灰色路由，可以单击“灰色”按钮。

* 灰度发布可以在发布新版本应用时，自定义控制新版本应用流量比重，渐进式完成新版本应用的全量上线，最大限度地控制新版本发布带来的业务风险，降低故障带来的影响面，同时支持快速回滚。

当开启灰度是，网关的负载平衡算法将从当前节点列表中选择一个节点进行路由，并且您可以通过修改节点权重以更改负载平衡算法中节点的权重。

需要注意的是，如果您的业务实例没有使用'shenyu-client-apache-dubbo'或者'shenyu-client-alibaba-dubbo'的客户端进行业务注册发现，您应该在当前选择器页面上手动添加节点信息进行灰度路由。

#### 规则处理

<img src="/img/shenyu/plugin/dubbo/rule_zh.png" width="80%" height="80%" />

规则处理，即`handle`字段，是网关对流量完成最终匹配后，可以进行处理的操作。更多信息请参考插件管理中的 [插件处理管理](../../user-guide/admin-usage/plugin-handle-explanation) 。

* 处理配置详解：

  * `loadbalance`：负载均衡策略，如果选择灰度节点失败，将会使用默认的负载均衡方式。

* Apache ShenYu将获得相应服务的真实IP，并从dubbo注册中心发起rpc代理调用。

## 元数据

每一个`dubbo`接口方法，都会对应一条元数据，当`dubbo`应用客户端接入到`Apache ShenYu`网关时，会自动注册，可以在 `shenyu-admin`后台管理系统的基础配置 `-->` 元数据管理中查看。

<img src="/img/shenyu/plugin/dubbo/dubbo-metadata-zh.jpg" width="50%"/>

* 应用名称：该条元数据所属的应用名称。

* 方法名称：需要调用的方法名。

* 路径：`http`请求路径。

* 路径描述：对该路径的说明，方便查看。

* 参数类型：`dubbo`接口的参数类型列表，此处有两种声明方式。例如一个接口为 `update(Integer id, String name, Integer age)`

  方式一、类型列表

    ```yaml
    java.lang.Integer,java.lang.String,java.lang.Integer
    ```

  * 按照接口的参数类型顺序，通过半角逗号分隔。
  * 请求传参时需**严格按照参数类型顺序传参**，没有值的用 `null`占位 。请求体示例：`{"id":1,"name": null,"age":18}`

  方式二、名称映射

    ```yaml
    {"id":"java.lang.Integer","name":"java.lang.String","age":"java.lang.Integer"}
    ```

  * 使用 `"参数名":"参数类型"`表示一个参数，按接口参数类型顺序设置，半角逗号分隔。
  * 请求时无需关注顺序，也无需使用null占位。请求体示例: `{"name":"Mike","id":1}`

* Rpc扩展参数：`dubbo`接口的其他配置，支持`json`格式，字段如下：

```yaml
{"timeout":10000,"group":"",version":"","loadbalance":"","retries":1}
```

* 服务接口：`dubbo`接口的全限定类名

* `Rpc`类型：此处选择 `dubbo`。

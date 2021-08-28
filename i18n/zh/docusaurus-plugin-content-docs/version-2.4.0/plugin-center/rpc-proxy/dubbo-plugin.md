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

* 引入相关依赖，开启插件，请参考：[Dubbo快速开始](../quick-start-dubbo) 。

* `Dubbo`应用客户端接入，请参考：[Dubbo服务接入](../dubbo-proxy) 。

* 选择器和规则配置，请参考：[选择器和规则管理](../selector-and-rule)。

## 元数据

每一个`dubbo`接口方法，都会对应一条元数据，当`dubbo`应用客户端接入到`Apache ShenYu`网关时，会自动注册，可以在 `shenyu-admin`后台管理系统的基础配置 `-->` 元数据管理中查看。

<img src="/img/shenyu/plugin/dubbo/dubbo-metadata-zh.jpg" width="50%"/>

* 应用名称：该条元数据所属的应用名称。

* 方法名称：需要调用的方法名。

* 路径：`http`请路径。

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

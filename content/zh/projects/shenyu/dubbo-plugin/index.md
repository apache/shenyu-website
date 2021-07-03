---
title: Dubbo插件
keywords: dubbo
description: dubbo插件
---

## 说明

* dubbo插件是将 `http协议` 转换成 `dubbo协议` 的插件，也是网关实现dubbo泛化调用的关键。
* dubbo插件需要配合元数据才能实现dubbo的调用，具体请看: [元数据](../meta-data)。
* apache dubbo 和 alibaba dubbo用户，都是使用该同一插件。

```xml
<!--if you use dubbo start this-->
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-alibaba-dubbo</artifactId>
    <version>${last.version}</version>
</dependency>

<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-apache-dubbo</artifactId>
    <version>${last.version}</version>
</dependency>
```

## 插件设置

* 在 `shenyu-admin` --> 插件管理-> `dubbo` 设置为开启。

![](/img/shenyu/quick-start/dubbo/dubbo-enable-zh.jpg)

* 在dubbo插件的配置中，配置如下：配置dubbo的注册中心。
```yaml
{"register":"zookeeper://localhost:2181"} or {"register":"nacos://localhost:8848"} 
```
* 插件需要配合依赖 `starter` 进行使用，具体请看：[dubbo用户](../dubbo-proxy)。

* 选择器和规则，请详细看：[选择器规则](../selector-and-rule)。

## 元数据

* 每一个dubbo接口方法，都会对应一条元数据，可以在 `shenyu-admin` --> 元数据管理，进行查看。

<img src="/img/shenyu/plugin/dubbo/dubbo-metadata-zh.jpg" width="50%"/>

* 应用名称：该条元数据所属的应用名称。

* 方法名称：需要调用的方法名。

* 路径：就是你http请求的路径。

* 路径描述：对该路径的说明，方便查看。

* 参数类型：dubbo接口的参数类型列表，此处有两种声明方式

    ​	例如：接口为 `update(Integer id, String name, Integer age)`

    * 方式一、类型列表

        ```yaml
        java.lang.Integer,java.lang.String,java.lang.Integer
        ```

        * 按照接口的参数类型顺序，通过半角逗号分隔。
        * 请求传参时需**严格按照参数类型顺序传参**，没有值的用 `null`占位 。请求体示例：`{"id":1,"name": null,"age":18}`

    * 方式二、名称映射

        ```yaml
        {"id":"java.lang.Integer","name":"java.lang.String","age":"java.lang.Integer"}
        ```

        * 使用 `"参数名":"参数类型"`表示一个参数，按接口参数类型顺序设置，半角逗号分隔。
        * 请求时无需关注顺序，也无需使用null占位。请求体示例: `{"name":"Mike","id":1}`

* rpc扩展参数：对应为dubbo接口的一些配置，调整的话，请在这里修改，支持json格式，以下字段：

```yaml
{"timeout":10000,"group":"",version":"","loadbalance":"","retries":1}
```

* 服务接口：dubbo接口的全限定类名

* Rpc类型：此处选择 `dubbo`
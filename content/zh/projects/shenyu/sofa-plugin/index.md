---
title: Sofa插件
keywords: sofa
description: sofa插件
---

## 说明

* `sofa`插件是将`http协议` 转换成`sofa协议` 的插件，也是网关实现`sofa`泛化调用的关键。
* `sofa`插件需要配合元数据才能实现`sofa服务`的调用。


## 插件设置

* 引入相关依赖，开启插件，请参考：[Sofa快速开始](../quick-start-sofa) 。
 
* `Sofa`应用客户端接入，请参考：[Sofa服务接入](../sofa-proxy) 。

* 选择器和规则配置，请参考：[选择器和规则管理](../selector-and-rule)。

## 元数据

* 每一个`sofa`接口方法，都会对应一条元数据，当`sofa` 应用客户端接入到`ShenYu`网关时，会自动注册，可以在 `shenyu-admin`后台管理系统的基础配置 `-->` 元数据管理中查看。


<img src="/img/shenyu/plugin/sofa/sofa-1.png" width="80%"/>


* 应用名称：该条元数据所属的应用名称。

* 方法名称：需要调用的方法名。

* 路径：`http`请路径。

* 路径描述：对该路径的说明，方便查看。

* 参数类型：按照接口的参数类型顺序，通过半角逗号分隔。
    


* Rpc扩展参数：`sofa`接口的其他配置，支持`json`格式，字段如下：

```yaml
{"loadbalance":"hash","retries":3,"timeout":-1}
```

* 服务接口：`sofa`接口的全限定类名

* `Rpc`类型：下来选择 `sofa`。

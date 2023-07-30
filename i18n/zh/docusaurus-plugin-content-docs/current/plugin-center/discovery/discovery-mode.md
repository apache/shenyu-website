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

`Discovery`网管admin服务主动监听 注册到网管服务. 使得shenyu网管具备主动发现被代理服务列表的变化
`Discovery` 可以针对 选择器级别, 也可以针对 插件级别.
目前 引入 `Discovery` 插件为 TCP 插件.

### 1.3.1 监听模式

LOCAL , ZOOKEEPER , NACOS(待支持) , ERURKA(待支持) ....

LOCAL 模式 : 主要依靠手动维护 upstream 列表 推送到网管

ZOOKEEPER 模式 : 监听 zk 下指定节点下的 临时节点变化来获取数据

### 1.3.2 作用范围

插件级: 作用于整个插件,该插件下所以的选择都会默认使用当前监听模式
选择器级别: 作用于当前选择器,当前插件下有不同选择器使用不同的监听模式

# 2. 使用

## 2.1 插件级别配置

1. 在支持Discovery模块的插件中 点击 `Discovery configuration` 选择响应的监听模式
   下图以`Zookeeper`为例

   ![config_zk_plugin.png](/img/shenyu/plugin/discovery/config_zk_plugin.png)

2. 在选择器中使用 点击 `Add` 在新增选择器页面点击 `DiscoveryConfig` 发现Type 类型强制选择刚才配置的插件级监听模块
   此时 收入需要监听的 `ListenerNode` 我们以 : /shenyu/discovery 为例

   ![add_listener_node.png](/img/shenyu/plugin/discovery/add_listener_node.png)

   注意: 这里的 Handler 配置, shenyu 规定的upstream 注册数据是以下 json 形式发送
    ```json
    {
        "url": "127.0.0.1::6379",  // upstream 的 url
        "protocol": "tcp", // upstream 的 通信协议
        "status": 0, // upstream 节点的状态 (0, healthy, 1 unhealthy)
        "weight": 10 // 计算负载均衡时使用
    }
    ```
   如果 你的服务 别名和shenyu 定义的 json 格式不同时候 可以在 handler 起别名
   如上图 我需要吧status 改为 healthy. 其他为改 保存 原有 json-key 的形式

3. 进行后续selector属性配置 详情见具体plugin

## 2.2 选择器级别配置

类似于插件级别配置. 把 上述的 `1`,`2` 步骤合并在一起
![discovery-seletor-config.png](/img/shenyu/plugin/discovery/discovery-seletor-config.png)

注意: 使用选择器级别时候. 每次都必须重新配置

若选择了 LOCAL 模式 则无需接入注册中心, 手动维护upstream列表

![discovery-local-mode.png](/img/shenyu/plugin/discovery/discovery-local-mode.png)

# 3. 配置

## 3.1 注册信息配置

### 3.1.1 基本配置
![common-config.png](/img/shenyu/plugin/discovery/common-config.png)

- Type 注册类型 [LOCAL|ZOOKEEPER]
- ListenerNode 注册的监听节点 如`/shenyu/discovery`
- Handler 处理 upstream 注册信息的别名问题
- ServerList 注册中心链接url


### 3.1.2 数据详解
- upstream 注册数据为:

```json
{
  "protocol": "tcp",
  "url": "127.0.0.1:6379",
  "status": 0,
  "weight": 1,
  "props": "{}"
}
```

- 若注册的数据与默认的json格式不同时，可以在“转换处理”中设置别名：

```json
{
  "${yourProtocol}": "tcp",
  "${yourUrl}": "127.0.0.1:6379",
  "${yourStatus}": 1,
  "${yourWeight}": 1,
  "${yourProps}": "{}"
}
```

## 3.2 不同模式下的配置

### 3.1 LOCAL

LOCAL模式下 只支持 选择器级别
无需指定链接 注册中心配置 只需手动维护 upstream 列表
![discovery-local-mode.png](/img/shenyu/plugin/discovery/discovery-local-mode.png)

### 3.2 ZOOKEEPER

ZOOKEEPER模式下 支持 插件级别 和 选择器级别



详情见 `shenyu-discovery-zookeeper#ZookeeperDiscoveryService#init`
```json
{
  "baseSleepTimeMilliseconds": "1000",
  "maxRetries": "3",
  "maxSleepTimeMilliseconds": "1000",
  "connectionTimeoutMilliseconds": "1000",
  "sessionTimeoutMilliseconds": "1000",
  "namespace": "",
  "digest": null
}
```
- 用户可以在`shenyu-admin` --> 基础配置 --> 字典管理 中，搜索字典名称为“zookeeper”，对默认属性对应的字典值进行修改编辑
  （__注意__：不可修改字典类型和字典名称）：

![zk_dict.png](/img/shenyu/plugin/tcp/zk_dict_zh.png)


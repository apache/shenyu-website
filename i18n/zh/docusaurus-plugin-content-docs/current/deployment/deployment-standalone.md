---
sidebar_position: 1
title: 单机部署
keywords: ["Deployment"]
description: 单机部署
---

本文介绍单机环境启动 `Apache ShenYu` 网关。

### 环境准备

* 本地正确安装JDK1.8+

### 启动 Apache ShenYu Bootstrap

* 下载 `apache-shenyu-incubating-2.4.1-bootstrap-bin.tar.gz`

* 解压缩 `apache-shenyu-incubating-2.4.1-bootstrap-bin.tar.gz`。 进入 bin 目录。

```
> windwos : start.bat 

> linux : ./start.sh 
```

### 选择器及规则配置

参考[本地模式](../developer/local-model#新增选择器与规则)进行选择器及规则的配置。

示例：

* 如服务地址是`http://127.0.0.1:8080/helloworld`,直接访问将返回如下

```json
{
  "name" : "Shenyu",
  "data" : "hello world"
}
```

* 按照如下进行选择器和规则配置

```json
{
    "pluginName": "divide",
    "selectorHandler": "[{\"upstreamUrl\":\"127.0.0.1:8080\"}]",
    "conditionDataList": [{
        "paramType": "uri",
        "operator": "match",
        "paramValue": "/**"
    }],
    "ruleDataList": [{
        "ruleHandler": "{\"loadBalance\":\"random\"}",
        "conditionDataList": [{
            "paramType": "uri",
            "operator": "match",
            "paramValue": "/**"
        }]
    }]
}
```

* 通过`http://localhost:9195/helloworld`请求服务，返回如下：

```json
{
  "name" : "Shenyu",
  "data" : "hello world"
}
```
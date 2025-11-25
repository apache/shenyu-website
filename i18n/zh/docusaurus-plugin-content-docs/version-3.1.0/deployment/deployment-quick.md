---
sidebar_position: 1
title: 单机快速部署
keywords: ["Deployment"]
description: 单机快速部署
---

本文介绍单机环境快速启动 `Apache ShenYu` 网关。

> 在阅读本文档前，你需要先阅读[部署先决条件](./deployment-before.md)文档来完成部署 `shenyu` 前的环境准备工作。

### 环境准备

* 本地正确安装JDK1.8+

### 启动 Apache ShenYu Bootstrap

* 下载 [apache-shenyu-$\{current.version}-bootstrap-bin.tar.gz](https://archive.apache.org/dist/shenyu/2.6.0/apache-shenyu-2.6.0-bootstrap-bin.tar.gz)

* 解压缩 `apache-shenyu-$\{current.version}-bootstrap-bin.tar.gz`。 进入 bin 目录。

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

### 使用postman

> Headers 中添加 `localKey: 123456`。如果需要自定义 localKey，可以使用 sha512 工具根据明文生成 key，并更新 `shenyu.local.sha512Key` 属性。
> 
> 请求方式POST，地址`http://localhost:9195/shenyu/plugin/selectorAndRules`，body 选择raw json，内容如下：

```
Headers

localKey: 123456
```

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

### 使用curl

```bash
curl --location --request POST 'http://localhost:9195/shenyu/plugin/selectorAndRules' \
--header 'Content-Type: application/json' \
--header 'localKey: 123456' \
--data-raw '{
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
}'
```

* 通过`http://localhost:9195/helloworld`请求服务，返回如下：

```json
{
  "name" : "Shenyu",
  "data" : "hello world"
}
```

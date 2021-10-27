---
sidebar_position: 1
title: Standalone Deployment
keywords: ["Deployment"]
description: Standalone Deployment
---

This article introduces how to start the `Apache ShenYu` gateway in the standalone environment.

### Environmental preparation

* Install JDK1.8+ locally

### Start Apache ShenYu Bootstrap

* download `apache-shenyu-incubating-2.4.1-bootstrap-bin.tar.gz`

* unzip `apache-shenyu-incubating-2.4.1-bootstrap-bin.tar.gz`。 go to the `bin` directory.

```
> windwos : start.bat 

> linux : ./start.sh 
```

### Selector and rule configuration

please refer to [Developer Local Model](../developer/local-model#add-selector-and-rules) add the selector and rule.

example：

* your service address is`http://127.0.0.1:8080/helloworld` and the response like follow:

```json
{
  "name" : "Shenyu",
  "data" : "hello world"
}
```

* use the follow data to add selector and rule

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

* open `http://localhost:9195/helloworld`:

```json
{
  "name" : "Shenyu",
  "data" : "hello world"
}
```
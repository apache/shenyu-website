---
sidebar_position: 1
title: Local Quick Deployment
keywords: ["Deployment"]
description: Local Quick Deployment
---

This article introduces how to quick start the `Apache ShenYu` gateway in the standalone environment.

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

### by postman
> `POST` method，address`http://localhost:9195/shenyu/plugin/selectorAndRules`,body use `raw json` content：

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

### by curl

```bash
curl --location --request POST 'http://localhost:9195/shenyu/plugin/selectorAndRules' \
--header 'Content-Type: application/json' \
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

* open `http://localhost:9195/helloworld`:

```json
{
  "name" : "Shenyu",
  "data" : "hello world"
}
```

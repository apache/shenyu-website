---
title: Pull the swagger registration API document
keywords: ["swagger api Interface Document Aggregation"]
description: Remotely pull swagger registration API documentation
---

This article introduces how to aggregate the `Swagger API documentation` of each backend microservice to the `Apache ShenYu` gateway management system.

## 1. Description

Remotely pull swagger documents, currently only supports swagger2.0, and only supports Divide and SpringCloud proxy plug-ins.

## 2. Environment Preparation

### 2.1 Run `shenyu-admin`

Please refer to the `deployment` document, choose a way to run `shenyu-admin`.

### 2.2 Enable the global switch for remotely pulling swagger documents.

It is enabled by default. In the `Apache ShenYu` gateway management system --> BasicConfig --> Dictionary, find the data whose DictionaryType is `apidoc`, and modify the dictionary value: `true`.
> 【Notice】DictionaryValue: `true` means the switch is on, `false` means it is off. If it is closed, `shenyu-admin` will not automatically pull the swagger documents of each microservice.

![apidoc-dictionary-en](/img/shenyu/api-doc/apidoc-dictionary-en.png)

## 3. Run the Sample Project

3.1. Download [shenyu-examples-http-swagger2](https://github.com/apache/shenyu/tree/master/shenyu-examples/shenyu-examples-http-swagger2)

3.2. Run `org.apache.shenyu.examples.http.ShenyuTestSwaggerApplication` main method to start the project.

The examples project will synchronize the service startup information to `shenyu-admin` through the Shenyu client annotation (such as `@ShenyuSpringMvcClient`) according to the address configured by `shenyu.register.serverLists`, and then trigger `shenyu-admin` to remotely pull the swagger document And complete the analysis, and finally aggregate to produce a new API document.

## 4. Demonstration Effect

### 4.1 List of API Documents

In `Apache ShenYu` Gateway Management System --> Document --> API Document, you can see the aggregated API documents.

![apidoc-swagger-list-en](/img/shenyu/api-doc/apidoc-swagger-list-en.png)

### 4.2 API Details Effect

![apidoc-detail-en](/img/shenyu/api-doc/apidoc-detail-en.png)

## 5. How to Automatically Update API Documentation

### 5.1 Restart Project

As in the example above, an automatic update of the API docs is triggered by starting the project.

### 5.2 Modify the startup time of the proxy plugin selector.

In the PlugiList --> Proxy --> selector, find the target service, and then modify the startup time.
> Note: The startup time of the new setting must not be earlier than the original startup time, otherwise the API document will not be automatically pulled and refreshed.

![app-proxy-startuptime-en](/img/shenyu/api-doc/app-proxy-startuptime-en.png)

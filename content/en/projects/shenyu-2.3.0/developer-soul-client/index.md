---
title: A multilingual HTTP client
keywords: soul
description: A multilingual HTTP client
---

## Description

* This document focuses on how to access gateways for HTTP services in other languages.
* How to customize the development of soul-http-client.

## Customize Http Client

* Request Method: `POST`
* Request Path: `http://soul-admin/soul-client/springmvc-register`, soul-admin represents `IP + Port` of admin
* Request Params：passing `JSON` type parameters through the body.

```json
{
	"appName": "xxx", //required
	"context": "/xxx", //required
	"path": "xxx", //required
	"pathDesc": "xxx", 
	"rpcType": "http", //required
	"host": "xxx", //required
	"port": xxx, //required
	"ruleName": "xxx", //required
	"enabled": "true", //required
	"registerMetaData": "true" //required
}
```





---
title: 自定义Response数据Format
keywords: ["Response"]
description: 自定义Response数据Format,支持json和xml
---

## 说明

* 此篇文章是介绍如何自定义响应数据结果格式，支持json和xml两种。

## 自定义Format

> 通过在请求头指定`Format`参数进行，取值只能为`json`,`xml`,默认为`json`。当取值不合法时，会有对应的提示，并默认使用`json`:

`the format xx is invalid, just support [json, xml]`

```
curl --location --request GET 'http://localhost:9195/helloworld' \
--header 'Format: json' \
```

![](/img/shenyu/user-guide/dubbo-json-response-data.jpg)
![](/img/shenyu/user-guide/dubbo-xml-response-data.jpg)
![](/img/shenyu/user-guide/shenyu-json-response-data.png)
![](/img/shenyu/user-guide/shenyu-xml-response-data.png)

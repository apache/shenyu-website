---
title: 自定义Response数据Format
keywords: ["Response"]
description: 自定义Response数据Format,支持json和xml
---


## 说明

* 此篇文章是介绍如何自定义响应数据结果格式，支持json和xml两种。

## 自定义Format

> 通过在请求头指定`Format`参数进行，取值只能为`json`,`xml`,默认为`json`。当取值不合法时，会有对应的提示，并默认使用`json`。

```
curl --location --request GET 'http://localhost:9195/helloworld' \
--header 'Format: json' \
```

![](https://user-images.githubusercontent.com/2174082/145175879-c529bab3-784a-4812-92cb-140541c2449c.jpg)
![](https://user-images.githubusercontent.com/2174082/145175903-14d3f17a-9175-4c36-a2ba-7272ae8dbc04.jpg)
![](https://user-images.githubusercontent.com/2174082/145176033-9e2cd971-6896-487c-9dee-ca0e697374c9.png)
![](https://user-images.githubusercontent.com/2174082/145176079-bb63b797-6e41-4073-8ebe-3c79f2269e11.png)
---
title: Custom Response Data Format
keywords: ["Response"]
description: Custom Response Data Format, support json and xml
---

* This document is intended to custom the response data format，support json and xml.

## How?

> By specifying the Format parameter in the request header, the value can only be `JSON`, `XML`, the default is `JSON`. If the value is invalid will propmpt and `JSON` is used by default  

```
curl --location --request GET 'http://localhost:9195/helloworld' \
--header 'Format: json' \
```

![](https://user-images.githubusercontent.com/2174082/145175879-c529bab3-784a-4812-92cb-140541c2449c.jpg)
![](https://user-images.githubusercontent.com/2174082/145175903-14d3f17a-9175-4c36-a2ba-7272ae8dbc04.jpg)
![](https://user-images.githubusercontent.com/2174082/145176033-9e2cd971-6896-487c-9dee-ca0e697374c9.png)
![](https://user-images.githubusercontent.com/2174082/145176079-bb63b797-6e41-4073-8ebe-3c79f2269e11.png)

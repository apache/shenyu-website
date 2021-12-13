---
title: Custom Response Data Format
keywords: ["Response"]
description: Custom Response Data Format, support json and xml
---

* This document is intended to custom the response data format，support json and xml.

## How?

> By specifying the Format parameter in the request header, the value can only be `JSON`, `XML`, the default is `JSON`. If the value is invalid will propmpt and `JSON` is used by default:

`the format xx is invalid, just support [json, xml]`

```
curl --location --request GET 'http://localhost:9195/helloworld' \
--header 'Format: json' \
```

![](/img/shenyu/user-guide/dubbo-json-response-data.jpg)
![](/img/shenyu/user-guide/dubbo-xml-response-data.jpg)
![](/img/shenyu/user-guide/shenyu-json-response-data.png)
![](/img/shenyu/user-guide/shenyu-xml-response-data.png)


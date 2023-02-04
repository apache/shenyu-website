---
title: Mock Plugin
keywords: ["mock"]
description: mock plugin
---

# 1. Overview

## 1.1 Plugin Name

* Mock Plugin

## 1.2 Appropriate Scenario

* Specify the status code and response body for the request to facilitate testing.

## 1.3 Plugin functionality

* Set the status code and body of the request.
* Support configuration `${}` placeholder to automatically generate data.

## 1.4 Plugin Code

* Core module ```shenyu-plugin-mock```
* Core class ```org.apache.shenyu.plugin.mock.MockPlugin```

## 1.5 Added since which shenyu version

* 2.5.0

# 2. How to use plugin

## 2.1 Import pom

- import maven config in shenyu-bootstrap project's `pom.xml` file.

```xml
<dependency>
    <groupId>org.apache.shenyu</groupId>
    <artifactId>shenyu-spring-boot-starter-plugin-mock</artifactId>
    <version>${project.version}</version>
</dependency>
```

## 2.2 Enable plugin

- In `shenyu-admin` --> BasicConfig --> Plugin --> `mock` set Status enable.

![](/img/shenyu/plugin/mock/enable-mock-plugin-en.png)

## 2.3 Config plugin

- Selector and rule config, please refer: [Selector and rule config](../../user-guide/admin-usage/selector-and-rule).
- shenyu-admin mock plugin configuration, supports configuring httpStatusCode and responseContent
    - httpStatusCode:the status code of the request.
    - responseContent:the response body of the request,support configuring `${}` placeholders to generate random data.

![](/img/shenyu/plugin/mock/mock-rule-configuration-en.png)

## 2.4 `${}` supported syntax

**~~`${int|min-max}`~~**
- **Description:** Generate random integers from `min` to `max`, inclusive of `min` and `max`.
- **Example:** `${int|10-20}`

**~~`${double|min-max|format}`~~**
- **Description:** Generate random floating point numbers from `min` to `max`, formatted according to `format`.
- **Example:** `${double|10-20}` , `${double|10-20.5|%.2f}`

**~~`${email}`~~**
- **Description:** Generate random email addresses.

**~~`${phone}`~~**
- **Description:** Generate random 13-digit mobile number.

**~~`${zh|min-max}`~~**
- **Description:** Generate random Chinese strings of length `min` to `max`.
- **Example:** `${zh|10-20}`

**~~`${en|min-max}`~~**
- **Description:** Generate random English strings of length `min` to `max`.
- **Example:** `${en|10-20}`

**~~`${bool}`~~**
- **Description:** Generate a random `boolean` value i.e. `true` or `false`.

**~~`${list|[arg1,arg2...]}`~~**
- **Description:** Randomly returns any value in a list as a string.
- **Example:** `${list|[gril,boy]}` will return `boy` or `girl`

**~~`${current|format}`~~**
- **Description:** Returns the current time and uses `format` to format, `format` can be default, the default is `YYYY-MM-dd HH:mm:ss`.
- **Example:** `${current}`，`${current|YYYY-MM-dd}`

**~~`${array|item|length}`~~**
- **Description:** According to the `item` format definition, an array of length `length` can be generated. All the above data generation rules can be nested in `item`, and the result will be automatically added with `[]`.
- **Example:** `${array|{"name":"test"}|3}` result is `[{"name":"test"},{"name":"test"},{"name":"test"}]`，`${array|{"age":${int|18-65}}|3}`.

**${expression|expression}**

`Spel` expressions are currently supported with built-in functions and arguments, which fully replace the old ${} syntax

- **`${expression|#int(min,max)}`**

  - **Description:** Generate random integers from `min` to `max`, inclusive of `min` and `max`.

  - **Example：** `${expression|#int(1,2)}`

- **`${expression|#double(min,max)}`**

  - **Description:** Generate random floating point numbers from `min` to `max`, formatted according to `format`.
  - **Example:**`${expression|#double(10.5,12.0)}`,`${expression|#double(10.5,12.0,'￥%.2f')}`

- **`${expression|#email()}`**

  - **Description:** Generate random email addresses.

- **`${expression|#phone()}`**

  - **Description:** Generate random 13-digit mobile number.

- **`${expression|zh(min,max)}`**

  - **Description:** Generate random Chinese strings of length `min` to `max`.
  - **Example：** `${expression|#zh(1,10)}`

- **`${expression|#bool()}`**

  - **Description:** Generate a random `boolean` value i.e. `true` or `false`.

- **`${expression|#oneOf(arg1,arg2...)}`**

  - **Description:** Randomly returns any value in a list.
  - **Example：** `${expression|#oneOf('shenyu','number',1)}`  will return `'shenyu'` or `'number'`or`1`

- **`${expression|current()}`**

  + **Description:** Returns the current time and uses `format` to format, `format` can be default, the default is `YYYY-MM-dd HH:mm:ss`.
  + **Example：**  `${expression|#current()}`，`${expression|#current('YYYY-MM-dd')}`

- **`${expression|#array(item,length)}`**

  - **Description:** According to the `item` format definition, an array of length `length` can be generated. 

  - **Example:** `expression|#array('shenyu',3)` would generate `["shenyu","shenyu","shenyu"]`.

    You can use it nested like`${expression|#array(#bool(),2)}`or`${expression|#array(#array('shenyu',2),2)}`

- **`${expression|#req}`**

  - **Description:** Req is built-in request parameters ,which can generate response data based on request content
  - **Example:**`${expression|#req.method}`、`${expression|#req.queries['query_name']}`、`${req.queries.query_name}`、`${expression|#req.uri}`。`jsonPath` is used when the request body is json . For example ,when the request body is `{"name":"shenyu"}`，`${expression|#req.json.name}`would return "shenyu"
+ **`${expression|spel}`**

  + **Description**：Use Spel expressions directly to generate data
  + **Example**：`${expression|T(java.time.LocalDate).now()}`、`${expression|1==1}`

It is recommended to use the new '${}' syntax. The old syntax may be removed at an later date.

Function replaceable table:

| old                        | new                                 |
| :------------------------- | :---------------------------------- |
| ${int\|min-max}            | ${expression\|#int(min,max)}        |
| ${double\|min-max\|format} | ${expression\|#double(min,max)}     |
| ${email}                   | ${expression\|#email()}             |
| ${phone}                   | ${expression\|#phone()}             |
| ${zh\|min-max}             | ${expression\|#zh(min,max)}         |
| ${en\|min-max}             | ${expression\|#en(min,max)}         |
| ${list\|[arg1,arg2...]}    | ${expression\|#oneOf(arg1,agr2...)} |
| ${current\|format}         | ${expression\|#current(format)}     |
| ${bool}                    | ${expression\|#bool()}              |
| ${array\|item\|length}     | ${expression#array(item,length)}    |

**You do not need to use add `""` on both sides of `${}`, the generated content will be prefixed and suffixed according to the definition of generator**


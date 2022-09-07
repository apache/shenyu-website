---
title: A multilingual HTTP client
keywords: ["Http Client"]
description: A multilingual HTTP client
---

## Description

* This document focuses on how to access gateways for `HTTP` services in other languages.
* To access the gateway, you need to get the token first, and then you can call the registration service or metadata interface according to your needs.



## Get token

- **Request Method**

  `GET`

- **Request Path**
    - `http://{shenyu-admin}/platform/login`
    - Where `shenyu-admin` is the `ip + port` of the `admin` backend management system.


- **Request Params**

    - `query` parameter, the account password is the username and password of the admin service.

      | Field     | Type   | Not Null | Desc                  |
            | -------- | ------ | --------- | --------------------- |
      | userName | String | Yes       | shenyu admin account  |
      | password | String | Yes       | shenyu admin password |

- **Return Data**

  | Field    |             | Type    | Desc                          |
          | ------- | ----------- | ------- | ----------------------------- |
  | code    |             | Integer | Return code                   |
  | message |             | String  | Return message                |
  | data    |             | Object  | Return data                   |
  |         | id          | Integer | user id                       |
  |         | userName    | String  | account                       |
  |         | role        | Integer | role id                       |
  |         | enabled     | Boolean | status                        |
  |         | dateCreated | String  | create time                   |
  |         | dateUpdated | String  | update time                   |
  |         | token       | String  | token                         |
  |         | expiredTime | Long    | timeout time, in milliseconds |

  **Example**

    ```json
    {
        "code": 200,
        "message": "login dashboard user success",
        "data": {
            "id": "1",
            "userName": "admin",
            "role": 1,
            "enabled": true,
            "dateCreated": "2022-09-07 22:08:23",
            "dateUpdated": "2022-09-07 22:08:23",
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNjYyNjQ2MzU5fQ.WBXBgCcGsnnC00pRbDOtqCVoAaZr8MKH6WE6kY-NGaI",
            "expiredTime": 86400000
        }
    }
    ```



## Registration Services

- **Request Method**

  `POST`

- **Request Path**
    - `http://{shenyu-admin}/shenyu-client/register-uri`
    - Where `shenyu-admin` is the `ip + port` of the `admin` backend management system.


* **Request Params**

    - `Header`

        - `contentType: application/json`

        - `X-Access-Token: {token}`，token is the token obtained by `Get token`.

    - `Body`，`json` format

      | Field        | Type    | Not Null | Desc                                                                                                                                                                                                                 |
                            | ----------- | ------- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| ------------------------------------------------------------ |
      | protocol    | String  | Yes       | protocol type                                                                                                                                                                                                      |
      | appName     | String  | Yes       | app name                                                                                                                                                                                                           |
      | contextPath | String  | Yes       | service path                                                                                                                                                                                                       |
      | rpcType     | String  | Yes       | rpc type, supported type reference [RpcTypeEnum](https://github.com/apache/shenyu/blob/v2.4.2/shenyu-common/src/main/java/org/apache/shenyu/common/enums/RpcTypeEnum.java)                                         |
      | host        | String  | Yes       | service IP                                                                                                                                                                                                         |
      | port        | Integer | Yes       | service port                                                                                                                                                                                                       |
      | eventType   | String  | Yes       | event type, supported types reference [EventType](https://github.com/apache/shenyu/blob/v2.4.2/shenyu-register-center/shenyu-register-common/src/main/java/org/apache/shenyu/register/common/enums/EventType.java) |

  **Example**

    ```json
    {
        "protocol": "http",
        "appName": "app",
        "contextPath": "/test",
        "rpcType": "http",
        "host": "127.0.0.1",
        "port": "8080",
        "eventType": "REGISTER"
    }
    ```

- **Return Data**

  A successful registration returns `success`.

## Registration Metadata

- **Request Method**

  `POST`

- **Request Path**

    - `http://{shenyu-admin}/shenyu-client/register-metadata`
    - Where `shenyu-admin` is the `ip + port` of the `admin` backend management system.

- **Request Params**

    - `Header`

        - `contentType: application/json`

        - `X-Access-Token: {token}`，token is the token obtained by `Get token`.

    - `Body`，`json` format.

      | Field             | Type    | Not Null | Desc                                                                                                                                                                         |
                            | ---------------- | ------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------| ------------------------------------------------------------ |
      | appName          | String  | Yes       | app name                                                                                                                                                                   |
      | contextPath      | String  | Yes       | service path                                                                                                                                                               |
      | path             | String  | Yes       | path                                                                                                                                                                       |
      | pathDesc         | String  | Yes       | path description                                                                                                                                                           |
      | rpcType          | String  | Yes       | rpc type, supported type reference [RpcTypeEnum](https://github.com/apache/shenyu/blob/v2.4.2/shenyu-common/src/main/java/org/apache/shenyu/common/enums/RpcTypeEnum.java) |
      | serviceName      | String  | Yes       | service name                                                                                                                                                               |
      | methodName       | String  | Yes       | method name                                                                                                                                                                |
      | ruleName         | String  | Yes       | rule name                                                                                                                                                                  |
      | parameterTypes   | String  | Yes       | parameter Type                                                                                                                                                             |
      | rpcExt           | String  | Yes       | rpc expansion parameters                                                                                                                                                   |
      | enabled          | Boolean | No        | status                                                                                                                                                                     |
      | host             | String  | Yes       | service IP                                                                                                                                                                 |
      | port             | Integer | Yes       | service port                                                                                                                                                               |
      | pluginNames      | List    | No        | plugin name list                                                                                                                                                           |
      | registerMetaData | Boolean | No        | whether to register metadata                                                                                                                                               |

      **examples**

      ```json
      {
          "appName": "app",
          "contextPath": "/",
          "path": "/test",
          "rpcType": "http",
          "serviceName": "test service",
          "parameterTypes": "java.lang.String",
          "pathDesc": "test path",
          "methodName": "test method",
          "ruleName": "test rule",
          "rpcExt": "{\"loadbalance\":\"hash\",\"retries\":3,\"timeout\":-1}",
          "enabled": true,
          "host": "127.0.0.1",
          "port": 8080,
          "pluginNames": [],
          "registerMetaData": true
      }
      ```

- **Return Data**

  A successful registration returns `success`.



---
title: 多语言Http客户端
keywords: ["客户端"]
description: 多语言http客户端
---

## 说明

* 本文主要讲解其他语言的`http`服务如何接入网关。
* 接入网关需要先获取 token, 然后可以根据需求调用注册服务或元数据接口



## 获取 token

- **请求方式**

  `GET`

- **请求路径**
    - `http://{shenyu-admin}/platform/login`
    - 其中 `shenyu-admin` 表示为 `admin` 后台管理系统的 `ip + port`


- **请求参数**

    - `query`参数，账号密码为 admin 服务的用户名和密码

      | 字段     | 类型   | 是否必填 | 描述   |
           | -------- | ------ | -------- | ------ |
      | userName | String | 是       | 用户名 |
      | password | String | 是       | 密码   |

- **返回数据**

  | 字段    |             | 类型    | 描述                 |
    | ------- | ----------- | ------- | -------------------- |
  | code    |             | Integer | 返回码               |
  | message |             | String  | 返回信息             |
  | data    |             | Object  | 返回对象             |
  |         | id          | Integer | 用户id               |
  |         | userName    | String  | 账号                 |
  |         | role        | Integer | 角色                 |
  |         | enabled     | Boolean | 是否启用             |
  |         | dateCreated | String  | 创建时间             |
  |         | dateUpdated | String  | 更新时间             |
  |         | token       | String  | token                |
  |         | expiredTime | Long    | 超时时间，单位：毫秒 |

  **示例**

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

## 注册服务

- **请求方式**

  `POST`

- **请求路径**
    - `http://{shenyu-admin}/shenyu-client/register-uri`
    - 其中 `shenyu-admin` 表示为 `admin` 后台管理系统的 `ip + port`


- **请求参数**

    - `Header`参数

        - `contentType: application/json`

        - `X-Access-Token: {token}`，token 为调用登陆接口获取的 token

    - `Body`参数，`json`类型

      | 字段        | 类型    | 是否必填 | 描述                                                         |
            | ----------- | ------- | -------- | ------------------------------------------------------------ |
      | protocol    | String  | 是       | 协议类型                                                     |
      | appName     | String  | 是       | 应用名称                                                     |
      | contextPath | String  | 是       | 项目路径                                                     |
      | rpcType     | String  | 是       | rpc类型，支持的类型参考 [RpcTypeEnum](https://github.com/apache/shenyu/blob/v2.4.0/shenyu-common/src/main/java/org/apache/shenyu/common/enums/RpcTypeEnum.java) |
      | host        | String  | 是       | 客户端IP                                                     |
      | port        | Integer | 是       | 客户端端口                                                   |
      | eventType   | String  | 是       | 事件类型，支持的类型参考 [EventType](https://github.com/apache/shenyu/blob/v2.4.0/shenyu-register-center/shenyu-register-common/src/main/java/org/apache/shenyu/register/common/enums/EventType.java) |

  **示例**

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

- **返回数据**

  注册成功会返回 `success`




## 注册元数据

- **请求方式**

  `POST`

- **请求路径**
    - `http://{shenyu-admin}/shenyu-client/register-metadata`
    - 其中 `shenyu-admin` 表示为 `admin` 后台管理系统的 `ip + port`

- **请求参数**
    - `Header`参数

        - `contentType: application/json`

        - `X-Access-Token: {token}`，token 为调用登陆接口获取的 token

    - `Body`参数，`json`类型

      | 字段             | 类型         | 是否必填 | 描述                                                         |
          | ---------------- | ------------ | -------- | ------------------------------------------------------------ |
      | appName          | String       | 是       | 应用名称                                                     |
      | contextPath      | String       | 是       | 项目路径                                                     |
      | path             | String       | 是       | 路径                                                         |
      | pathDesc         | String       | 是       | 路径描述                                                     |
      | rpcType          | String       | 是       | rpc类型，支持的类型参考 [RpcTypeEnum](https://github.com/apache/shenyu/blob/v2.4.0/shenyu-common/src/main/java/org/apache/shenyu/common/enums/RpcTypeEnum.java) |
      | serviceName      | String       | 是       | 服务名称                                                     |
      | methodName       | String       | 是       | 方法名称                                                     |
      | ruleName         | String       | 是       | 规则名称                                                     |
      | parameterTypes   | String       | 是       | 参数类型                                                     |
      | rpcExt           | String       | 是       | Rpc拓展参数                                                  |
      | enabled          | Boolean      | 否       | 状态                                                         |
      | host             | String       | 是       | 服务 IP                                                      |
      | port             | Integer      | 是       | 服务端口                                                     |
      | pluginNames      | List | 是       | 插件名称列表                                                 |
      | registerMetaData | Boolean      | 否       | 是否注册元数据                                               |

      **示例**

      ```json
      {
          "appName": "app",
          "contextPath": "/",
          "path": "/test",
          "rpcType": "http",
          "serviceName": "测试服务",
          "parameterTypes": "java.lang.String",
          "pathDesc": "测试路径",
          "methodName": "测试方法",
          "ruleName": "测试规则",
          "rpcExt": "{\"loadbalance\":\"hash\",\"retries\":3,\"timeout\":-1}",
          "enabled": true,
          "host": "127.0.0.1",
          "port": 8080,
          "pluginNames": [],
          "registerMetaData": true
      }
      ```

- **返回数据**

  注册成功会返回 `success`



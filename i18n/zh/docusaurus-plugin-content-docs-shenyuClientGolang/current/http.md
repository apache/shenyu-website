---
title: "HTTP示例" 
---  

# 以Http方式注册到ShenYu网关

**1.首先确保ShenYuAdmin是启动的，并且ShenYuAdmin服务启动的端口是9095 .**

```go
如果没启动,你将看到如下错误:
 
2022-05-05 15:24:28 [WARN] [github.com/apache/shenyu-client-golang/example/http_client/main.go:53] MetaDataRegister has error: The errCode is ->:503, The errMsg is  ->:Please check ShenYu admin service status

caused by:
Post "http://127.0.0.1:9095/shenyu-client/register-metadata": dial tcp 127.0.0.1:9095: connect: connection refused
2022-05-05 15:24:28 [INFO] [github.com/apache/shenyu-client-golang/example/http_client/main.go:55] finish register metadata ,the result is-> false
2022-05-05 15:24:28 [WARN] [github.com/apache/shenyu-client-golang/example/http_client/main.go:68] UrlRegister has error: The errCode is ->:503, The errMsg is  ->:Please check ShenYu admin service status

caused by:
Post "http://127.0.0.1:9095/shenyu-client/register-uri": dial tcp 127.0.0.1:9095: connect: connection refused
2022-05-05 15:24:28 [INFO] [github.com/apache/shenyu-client-golang/example/http_client/main.go:70] finish UrlRegister ,the result is-> false
 
```

**2.获取shenyu_admin_client. (注册服务需要这个实例)**

```go
//初始化 ShenYuAdminClient
adminClient := &model.ShenYuAdminClient{
    UserName: "admin",  //需要用户提供
    Password: "123456", //需要用户提供
}

adminToken, err := clients.NewShenYuAdminClient(adminClient)

adminToken像这样 :
{
    "code":200,
    "message":"login dashboard user success",
    "data":{
        "id":"1",
        "userName":"admin",
        "role":1,
        "enabled":true,
        "dateCreated":"2018-06-23 15:12:22",
        "dateUpdated":"2022-03-09 15:08:14",
        "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNjUwNjc5OTQ2fQ.K92Il2kmJ0X3FgjY4igW35-pw9nsf5VKdUyqBoyIaF4"
    }
}

当你成功获取到Token,你将看到这些:
this is ShenYu Admin client token -> eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNjUwNjc5OTQ2fQ.K92Il2kmJ0X3FgjY4igW35-pw9nsf5VKdUyqBoyIaF4

```

**3.注册元数据到ShenYu网关. (需要上一步的adminToken去调用)**

```go
//元数据注册(需要上一步的token: adminToken.AdminTokenData)
metaData := &model.MetaDataRegister{
  AppName: "testMetaDataRegister", //需要用户提供
  Path:    "/your/path",           //需要用户提供
  Enabled: true,                   //需要用户提供
  Host:    "127.0.0.1",            //需要用户提供
  Port:    "8080",                 //需要用户提供
 }
 result, err := clients.RegisterMetaData(adminToken.AdminTokenData, metaData)
 if err != nil {
  logger.Warn("MetaDataRegister has error:",err)
 }
 logger.Info("finish register metadata ,the result is->", result)


当你注册成功,你将看到这些:
finish register metadata ,the result is-> true
```

**4.以URL的方式注册到ShenYu网关. (需要上一步的adminToken去调用)**

```go
//URI注册(需要上一步的token: adminToken.AdminTokenData)
//初始化 URI注册
 urlRegister := &model.URIRegister{
  Protocol:    "testMetaDataRegister", //需要用户提供
  AppName:     "testURLRegister",      //需要用户提供
  ContextPath: "contextPath",          //需要用户提供
  RPCType:     constants.RPCTYPE_HTTP, //需要用户提供
  Host:        "127.0.0.1",            //需要用户提供
  Port:        "8080",                 //需要用户提供
 }
 result, err = clients.UrlRegister(adminToken.AdminTokenData, urlRegister)
 if err != nil {
  logger.Warn("UrlRegister has error:", err)
 }
 logger.Info("finish UrlRegister ,the result is->", result)
         //做你的逻辑处理
```

**5.完整的成功日志**

```go
2022-05-05 15:43:56 [INFO] [github.com/apache/shenyu-client-golang/clients/admin_client/shenyu_admin_client.go:51] Get ShenYu Admin response, body is -> {200 login dashboard user success {1 admin 1 true 2018-06-23 15:12:22 2022-03-09 15:08:14 eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNjUxODIzMDM2fQ.gMzPKaNlXEd1Q517qQamOpg358W9L0-0cZN3lkk06WE}}
2022-05-05 15:43:56 [INFO] [github.com/apache/shenyu-client-golang/example/http_client/main.go:40] this is ShenYu Admin client token -> eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNjUxODIzMDM2fQ.gMzPKaNlXEd1Q517qQamOpg358W9L0-0cZN3lkk06WE
2022-05-05 15:43:57 [INFO] [github.com/apache/shenyu-client-golang/example/http_client/main.go:55] finish register metadata ,the result is-> true
2022-05-05 15:43:57 [INFO] [github.com/apache/shenyu-client-golang/example/http_client/main.go:70] finish UrlRegister ,the result is-> true

```

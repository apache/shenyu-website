---
description: http
title: Http Example
---

# Http Example

## The Http type Register

**1.Fist make sure The ShenYuAdmin is Started, and ShenYuAdmin service active port is 9095.**

```go
Or you will see this error :
 
2022-05-05 15:24:28 [WARN] [github.com/apache/shenyu-client-golang/example/http_client/main.go:53] MetaDataRegister has error: The errCode is ->:503, The errMsg is  ->:Please check ShenYu admin service status

caused by:
Post "http://127.0.0.1:9095/shenyu-client/register-metadata": dial tcp 127.0.0.1:9095: connect: connection refused
2022-05-05 15:24:28 [INFO] [github.com/apache/shenyu-client-golang/example/http_client/main.go:55] finish register metadata ,the result is-> false
2022-05-05 15:24:28 [WARN] [github.com/apache/shenyu-client-golang/example/http_client/main.go:68] UrlRegister has error: The errCode is ->:503, The errMsg is  ->:Please check ShenYu admin service status

caused by:
Post "http://127.0.0.1:9095/shenyu-client/register-uri": dial tcp 127.0.0.1:9095: connect: connection refused
2022-05-05 15:24:28 [INFO] [github.com/apache/shenyu-client-golang/example/http_client/main.go:70] finish UrlRegister ,the result is-> false
 
```

**2.Step 1 Get shenyu_admin_client. (Register service need this)**

```go
//init ShenYuAdminClient
adminClient := &model.ShenYuAdminClient{
    UserName: "admin",  //require user provide
    Password: "123456", //require user provide
}

adminToken, err := clients.NewShenYuAdminClient(adminClient)

The adminToken like this :
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

When you success get toekn, you will see this :
this is ShenYu Admin client token -> eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNjUwNjc5OTQ2fQ.K92Il2kmJ0X3FgjY4igW
---
description: Nacos
sidebar_position: 3
title: Nacos 示例
---

# Nacos 方式注册 ShenYu 网关

## ASP.NET Core 项目

对于 ASP.NET Core 项目，我们可以参考这个 [example code](https://github.com/apache/shenyu-client-dotnet/tree/main/examples/AspNetCoreExample)。你需要做以下步骤。

1. 将 ShenYu 加入到 ASP.NET Core 项目依赖中。

```shell
dotnet add package <todo-shenyu-asp.net-core package>
```

2. 在 `Startup.ConfigureServices` 中加入 `ShenyuRegister` service。

```c#
public void ConfigureServices(IServiceCollection services)
{
    ...
    services.AddShenyuRegister(this.Configuration);
    ...
}
```

3. 在 `appsettings.json` 中进行配置。

```json
{
  "Shenyu": {
    "Register": {
      "RegisterType": "nacos",
      "ServerList": "localhost:8848",
      "Props": {
        // your nacos user name
        "UserName": "nacos",
        // your nacos password
        "Password": "nacos",
        // align with the namespace set in admin project
        "Namespace": "ShenyuRegisterCenter",
        // when want to aliyun AccessKey ,can ignore
        "AccessKey": "",
        // when want to aliyun SecretKey,can ignore
        "SecretKey": ""
      }
    },
    "Client": {
      "AppName": "dotnet-example",
      "ContextPath": "/dotnet",
      "IsFull": false,
      "ClientType": "http"
    }
  }
}
```

4. 开启允许通过 ip 访问

当运行 ASP.NET Core 项目时，默认只能通过 `localhost` 访问。想要允许 ip 访问，需要设置下 `ASPNETCORE_URLS` 环境变量。

```shell
export ASPNETCORE_URLS=http://+:5000
```

5. 启动 application

```shell
# build project
dotnet build --configuration Release
# start project
cd examples/AspNetCoreExample/bin/Release/netcoreapp3.1
dotnet AspNetCoreExample.dll
```

至此，你已经完成所有的步骤，可以进入 `shenyu-admin` 页面看到这些 API 已经注册到 ShenYu.

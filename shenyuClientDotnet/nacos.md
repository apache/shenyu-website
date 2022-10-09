---
description: Nacos
sidebar_position: 3
title: Nacos Example
---

# Nacos Registration get start

## ASP.NET Core project

For ASP.NET Core project, we can refer to the example code at `examples/AspNetCoreExample`. What you need to do is quite
simple and straightforward.

1. add the Shenyu ASP.NET Core dependency into project.

```shell
dotnet add package <todo-shenyu-asp.net-core package>
```

2. in `Startup.ConfigureServices` method, add the `ShenyuRegister` service.

```c#
public void ConfigureServices(IServiceCollection services)
{
    ...
    services.AddShenyuRegister(this.Configuration);
    ...
}
```

3. set your `Shenyu` configurations in `appsettings.json`.

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

4. enable calling via ip.

When running on your local machine, ASP.NET Core service can only be called from `localhost`. To enable calling by IP,
you can replace `https://localhost:{port};http://localhost:{port}` with `https://*:{port};http://*:{port}`

Setting by environment variables `ASPNETCORE_URLS`. e.g. `ASPNETCORE_URLS "http://*:5000"`

```shell
export ASPNETCORE_URLS=http://+:5000
```

5. start the application.

```shell
# build project
dotnet build --configuration Release
# start project
cd examples/AspNetCoreExample/bin/Release/netcoreapp3.1
dotnet AspNetCoreExample.dll
```

That's all! After finished above steps, you can start your project in IDE or below commands and you can
visit `shenyu-admin` portal to see the APIs have been registered in Shenyu.

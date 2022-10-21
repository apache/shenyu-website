---
description: Etcd
sidebar_position: 4
title: Etcd Example
---

# Etcd Registration get start

## ASP.NET Core project

For ASP.NET Core project, we can refer to the example code at [example code](https://github.com/apache/shenyu-client-dotnet/tree/main/examples/AspNetCoreExample). What you need to do is quite
simple and straightforward.

1. add the Shenyu ASP.NET Core dependency into project.

```shell
dotnet add package Apache.ShenYu.AspNetCore
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
      "ServerList": "http://127.0.0.1:2379",
      "RegisterType": "etcd",
      "Props": {
        // etcd userName,if have not set ectd server userName,this parmas can empty
        "UserName": "",
        // etcd password,if have not set ectd server password,this parmas can empty
        "Password": "",
        // 3000 ms default
        "EtcdTimeout": 4000,
        // 5 ms default
        "EtcdTTL": 15
      }
    },
    "Client": {
      "AppName": "dotnetexampleetcd",
      "ContextPath": "/etcddotnet",
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

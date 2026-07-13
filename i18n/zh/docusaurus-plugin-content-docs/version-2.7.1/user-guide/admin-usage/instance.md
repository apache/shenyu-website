# 服务健康状态可视化

## 1. 背景与说明

目前Apache ShenYu Admin同时管理Client上报服务与Apache ShenYu网关，但目前ShenYu Admin对这一系列服务的管理较为缺失，特别是可视化管理方面。

现在Apache ShenYu Admin已经支持对Client和Apache ShenYu网关存活状态的监测和可视化。

## 2.启用心跳检测服务

存活状态的监测需要Shenyu Client和网关上报心跳信息，其中Shenyu Client、网关采用http和websocket数据同步的方式已经支持心跳上报，无需额外配置。

但网关采用中间件的数据同步方式仍需手动设置心跳上报配置，配置方法如下：

### 1.配置填写

打开网关的```application.yml``` 文件找到 ```heartbeat``` 配置项。填写admin的ip地址和登录密码

```yaml
  heartbeat:
    enabled: true
    serverLists: http://localhost:9095
    props:
      username: admin
      password: 123456
```

## 2.可视化界面

用户登录shenyu-admin后台，选择【基础配置-实例管理】，即可看见实例状态总览

<img src="/img/shenyu/basicConfig/instance/instance-visual.png" width="80%" height="50%" />


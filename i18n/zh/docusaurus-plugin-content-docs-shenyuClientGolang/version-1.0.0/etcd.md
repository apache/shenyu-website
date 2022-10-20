---
title: "Etcd示例"
---  

## 以Etcd方式注册到ShenYu网关

**1.首先确保你的Etcd环境是正确，然后设置这些Etcd必要的参数 .**

```go
    //开始创建ShenYuEtcdClient 
    ecp := &etcd_client.EtcdClientParam{
    EtcdServers: []string{"http://127.0.0.1:2379"}, //需要用户提供
    UserName : "" // 可选参数etcd访问账号名
    Password : "" // 可选参数etcd访问密码
    TTL:    50, // 可选参数 key生存时间
    }

    sdkClient := shenyu_sdk_client.GetFactoryClient(constants.ETCD_CLIENT)
    client, createResult, err := sdkClient.NewClient(ecp)
    if !createResult && err != nil {
    logger.Fatal("Create ShenYuEtcdClient error : %v", err)
    }
    
    etcd := client.(*etcd_client.ShenYuEtcdClient)
    defer etcd.Close()
```

**2.  准备你要注册服务的元数据信息**

```go
//元数据是必要的参数，这将注册到shenyu网关使用
    metaData1 := &model.MetaDataRegister{
        AppName: "testMetaDataRegister1", //需要用户提供
        Path:    "your/path1",            //需要用户提供
        Enabled: true,                    //需要用户提供
        Host:    "127.0.0.1",             //需要用户提供
        Port:    "8080",                  //需要用户提供
    }
    
    metaData2 := &model.MetaDataRegister{
        AppName: "testMetaDataRegister2", //需要用户提供
        Path:    "your/path2",            //需要用户提供
        Enabled: true,                    //需要用户提供
        Host:    "127.0.0.1",             //需要用户提供
        Port:    "8181",                  //需要用户提供
    }
```

**3.使用客户端进行节点信息注册**

```go
   //可以进行多个实例注册 
    registerResult1, err := etcd.RegisterServiceInstance(metaData1)
    if !registerResult1 && err != nil {
    logger.Fatal("Register etcd Instance error : %v", err)
    }
    
    registerResult2, err := etcd.RegisterServiceInstance(metaData2)
    if !registerResult2 && err != nil {
    logger.Fatal("Register etcd Instance error : %v", err)
    }
    //做你的逻辑处理
```

**4.使用客户端进行注册节点信息删除**

```go
    //选择性调用
    deRegisterResult1, err := etcd.DeregisterServiceInstance(metaData1)
        if err != nil {
            panic(err)
        }

    deRegisterResult2, err := etcd.DeregisterServiceInstance(metaData2)
        if err != nil {
            panic(err)
        }
```

**5.使用客户端获取注册节点的信息**

```go
   //开始调用GetServiceInstanceInfo
    instanceDetail, err := etcd.GetServiceInstanceInfo(metaData1)
    nodes1, ok := instanceDetail.([]*model.MetaDataRegister)
    if !ok {
    logger.Fatal("get etcd client metaData error %v:", err)
    }
    
    //range nodes
    for index, node := range nodes1 {
    	nodeJson, err := json.Marshal(node)
        if err == nil {
        logger.Info("GetNodesInfo ,success Index", index, string(nodeJson))
        }
}

    instanceDetail2, err := etcd.GetServiceInstanceInfo(metaData2)
    nodes2, ok := instanceDetail2.([]*model.MetaDataRegister)
    if !ok {
    logger.Fatal("get etcd client metaData error %v:", err)
    }

```

## 完整的成功日志

```go
2022-08-16 10:18:55 [INFO] [github.com/shenyu-client-golang/clients/etcd_client/etcd_client.go:66] Create customer etcd client success!
2022-08-16 10:18:55 [INFO] [github.com/shenyu-client-golang/clients/etcd_client/etcd_client.go:142] RegisterServiceInstance,result:true
2022-08-16 10:18:55 [INFO] [github.com/shenyu-client-golang/clients/etcd_client/etcd_client.go:142] RegisterServiceInstance,result:true
2022-08-16 10:18:56 [INFO] [github.com/shenyu-client-golang/example/etcd_client/etcd_client.go:71] GetNodesInfo ,success Index 0 {"appName":"testMetaDataRegister1","path":"your/path1","contextPath":"","ruleName":"","rpcType":"","enabled":true,"host":"127.0.0.1","port":"8080","pluginNames":null,"registerMetaData":false,"timeMillis":0}
2022-08-16 10:18:56 [INFO] [github.com/shenyu-client-golang/example/etcd_client/etcd_client.go:85] GetNodesInfo ,success Index 0 {"appName":"testMetaDataRegister2","path":"your/path2","contextPath":"","ruleName":"","rpcType":"","enabled":true,"host":"127.0.0.1","port":"8181","pluginNames":null,"registerMetaData":false,"timeMillis":0}
2022-08-16 10:18:56 [INFO] [github.com/shenyu-client-golang/example/etcd_client/etcd_client.go:89] > DeregisterServiceInstance start
2022-08-16 10:19:33 [INFO] [github.com/shenyu-client-golang/example/etcd_client/etcd_client.go:101] DeregisterServiceInstance success !
```

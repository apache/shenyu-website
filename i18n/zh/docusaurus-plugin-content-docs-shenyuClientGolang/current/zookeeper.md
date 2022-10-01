---
title: "Zookeeper示例"
---  

## 以Zookeeper方式注册到ShenYu网关

**1.首先确保你的Zookeeper环境是正确，然后设置这些Zookeeper必要的参数 .**

```go
    //开始创建ShenYuZkClient 
    zcp := &zk_client.ZkClientParam{
    ZkServers: []string{"127.0.0.1:2181"}, //需要用户提供
    ZkRoot:    "/api",                     //需要用户提供
    }
    
    sdkClient := shenyu_sdk_client.GetFactoryClient(constants.ZOOKEEPER_CLIENT)
    client, createResult, err := sdkClient.NewClient(zcp)
    
    if !createResult && err != nil {
    logger.Fatal("Create ShenYuZkClient error : %v", err)
    }
    
    zc := client.(*zk_client.ShenYuZkClient)
    defer zc.Close()
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
    registerResult1, err := zc.RegisterServiceInstance(metaData1)
        if !registerResult1 && err != nil {
             logger.Fatal("Register zk Instance error : %v", err)
        }
    
    registerResult2, err := zc.RegisterServiceInstance(metaData2)
        if !registerResult2 && err != nil {
             logger.Fatal("Register zk Instance error : %v", err)
        }
    //做你的逻辑处理
```

**4.使用客户端进行注册节点信息删除**

```go
    //选择性调用
    deRegisterResult1, err := zc.DeregisterServiceInstance(metaData1)
        if err != nil {
            panic(err)
        }

    deRegisterResult2, err := zc.DeregisterServiceInstance(metaData2)
        if err != nil {
            panic(err)
        }
```

**5.使用客户端获取注册节点的信息**

```go
   //开始调用GetServiceInstanceInfo
    instanceDetail, err := zc.GetServiceInstanceInfo(metaData1)
    nodes1, ok := instanceDetail.([]*model.MetaDataRegister)
    if !ok {
    logger.Fatal("get zk client metaData error %v:", err)
    }
    
    //range nodes
    for index, node := range nodes1 {
    	nodeJson, err := json.Marshal(node)
        if err == nil {
        logger.Info("GetNodesInfo ,success Index", index, string(nodeJson))
        }
}

    instanceDetail2, err := zc.GetServiceInstanceInfo(metaData2)
    nodes2, ok := instanceDetail2.([]*model.MetaDataRegister)
    if !ok {
    logger.Fatal("get zk client metaData error %v:", err)
    }

```

## 完整的成功日志

```go
2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/example/zk_client/main.go:105] GetNodesInfo ,success Index 0 {"appName":"testMetaDataRegister1","path":"your/path1","contextPath":"","ruleName":"","rpcType":"","enabled":true,"host":"127.0.0.1","port":"8080","pluginNames":null,"registerMetaData":false,"timeMillis":0}
2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/example/zk_client/main.go:119] GetNodesInfo ,success Index 0 {"appName":"testMetaDataRegister2","path":"your/path2","contextPath":"","ruleName":"","rpcType":"","enabled":true,"host":"127.0.0.1","port":"8181","pluginNames":null,"registerMetaData":false,"timeMillis":0}
2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/example/zk_client/main.go:132] GetNodesInfo ,success Index 0 {"appName":"testMetaDataRegister3","path":"your/path3","contextPath":"","ruleName":"","rpcType":"","enabled":true,"host":"127.0.0.1","port":"8282","pluginNames":null,"registerMetaData":false,"timeMillis":0}
2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/example/zk_client/main.go:139] > DeregisterServiceInstance start
2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/clients/zk_client/zk_client.go:213] ensureName check, path is -> /api/testMetaDataRegister1
2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/clients/zk_client/zk_client.go:215] ensureName check result is -> true
2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/clients/zk_client/zk_client.go:213] ensureName check, path is -> /api/testMetaDataRegister2
2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/clients/zk_client/zk_client.go:215] ensureName check result is -> true
2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/clients/zk_client/zk_client.go:213] ensureName check, path is -> /api/testMetaDataRegister3
2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/clients/zk_client/zk_client.go:215] ensureName check result is -> true
2022-07-13 16:09:31 [INFO] [github.com/shenyu-client-golang/example/zk_client/main.go:156] DeregisterServiceInstance success !
```

---
description: Zookeeper
title: Zookeeper Example
---
## The Zookeeper type Register

**1.Fist make sure your Zookeeper env is correct,the set this necessary param.**

```go
    //Create ShenYuZkClient  start
    zcp := &zk_client.ZkClientParam{
    ZkServers: []string{"127.0.0.1:2181"}, //require user provide
    ZkRoot:    "/api",                     //require user provide
    }

    sdkClient := shenyu_sdk_client.GetFactoryClient(constants.ZOOKEEPER_CLIENT)
    client, createResult, err := sdkClient.NewClient(zcp)

    if !createResult && err != nil {
    logger.Fatal("Create ShenYuZkClient error : %v", err)
    }

    zc := client.(*zk_client.ShenYuZkClient)
    defer zc.Close()
    //Create ShenYuZkClient end
```

**2. Prepare your service metaData to register**

```go
//metaData is necessary param, this will be register to shenyu gateway to use
    metaData1 := &model.MetaDataRegister{
        AppName: "testMetaDataRegister1", //require user provide
        Path:    "your/path1",            //require user provide
        Enabled: true,                    //require user provide
        Host:    "127.0.0.1",             //require user provide
        Port:    "8080",                  //require user provide
    }

    metaData2 := &model.MetaDataRegister{
        AppName: "testMetaDataRegister2", //require user provide
        Path:    "your/path2",            //require user provide
        Enabled: true,                    //require user provide
        Host:    "127.0.0.1",             //require user provide
        Port:    "8181",                  //require user provide
    }
```

**3.use client to invoke RegisterServiceInstance**

```go
   //register multiple metaData
    registerResult1, err := zc.RegisterServiceInstance(metaData1)
        if !registerResult1 && err != nil {
        logger.Fatal("Register zk Instance error : %v", err)
    }

    registerResult2, err := zc.RegisterServiceInstance(metaData2)
        if !registerResult2 && err != nil {
        logger.Fatal("Register zk Instance error : %v", err)
    }
    //do your logic
```

**4.use client to invoke DeregisterServiceInstance**

```go
    //your can chose to invoke,not require
    deRegisterResult1, err := zc.DeregisterServiceInstance(metaData1)
        if err != nil {
        panic(err)
        }

    deRegisterResult2, err := zc.DeregisterServiceInstance(metaData2)
        if err != nil {
        panic(err)
        }
```

**5.use client to GetServiceInstanceInfo**

```go
    //GetServiceInstanceInfo start
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
    //GetServiceInstanceInfo end

```

## Entire Success log

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
